import { getSupabaseAdmin } from "./supabase";
import { logSupabaseError } from "./visitor-logs";

/**
 * Device-based risk score for a paid click.
 *
 * Identity = cookie (visitor_id) first, hardware fingerprint second.
 * Shared IPs are deliberately NOT used to identify a person — in Israel many
 * unrelated mobile users share the same carrier IP (CGNAT).
 */

/** Approximate average CPC (₪) — used only for the "estimated cost" line in alerts. */
export const AVG_CPC_ILS = 16;

/** Score at/above this → suspicious alert + included in the Google report. */
export const FRAUD_ALERT_THRESHOLD = 40;

/** Extra points added at exit when the visit had no real engagement. */
export const LOW_ENGAGEMENT_POINTS = 15;

const HISTORY_DAYS = 7;
const CONTACT_LOOKBACK_DAYS = 365;
const QUICK_RETURN_MINUTES = 30;

const SAFE_ID = /^[A-Za-z0-9-]{8,80}$/;

/** iOS fingerprints collide between different iPhones — never trust them alone. */
export function isIosUserAgent(ua: string | null | undefined): boolean {
  return !!ua && /iPhone|iPad|iPod/i.test(ua);
}

export interface DeviceRisk {
  score: number;
  reasons: string[];
  /** Paid clicks from this device in the last 7 days, excluding the current one. */
  priorPaidClicks: number;
  /** True when this device ever called / WhatsApp'd — treated as a real customer. */
  contactedBefore: boolean;
  minutesSinceLastClick: number | null;
}

type HistoryRow = {
  id: number;
  visitor_id: string | null;
  device_fingerprint: string | null;
  ip_address: string | null;
  created_at: string;
  clicked_action: boolean | null;
  source: string | null;
  gclid: string | null;
};

function israelHour(date: Date): number {
  return Number(
    date.toLocaleString("en-US", {
      timeZone: "Asia/Jerusalem",
      hour: "numeric",
      hour12: false,
    })
  ) % 24;
}

function deviceFilter(
  visitorId: string | null,
  fingerprint: string | null,
  useFingerprint: boolean
): string | null {
  const parts: string[] = [];
  if (visitorId && SAFE_ID.test(visitorId)) parts.push(`visitor_id.eq.${visitorId}`);
  if (useFingerprint && fingerprint && SAFE_ID.test(fingerprint)) {
    parts.push(`device_fingerprint.eq.${fingerprint}`);
  }
  return parts.length ? parts.join(",") : null;
}

/**
 * Compute the entry-time risk score. Call BEFORE inserting the current row.
 * Fail-open: on any DB error returns score 0 so real visits are never punished.
 */
export async function computeEntryRisk(opts: {
  visitorId: string | null;
  fingerprint: string | null;
  userAgent: string | null;
  ip: string;
  country: string | null;
  isDesktopOnMobileCampaign: boolean;
  isAutomation: boolean;
  now?: Date;
}): Promise<DeviceRisk> {
  const now = opts.now ?? new Date();
  const reasons: string[] = [];
  let score = 0;

  const useFingerprint = !isIosUserAgent(opts.userAgent);
  const filter = deviceFilter(opts.visitorId, opts.fingerprint, useFingerprint);

  let prior: HistoryRow[] = [];
  let contactedBefore = false;

  if (filter) {
    const admin = getSupabaseAdmin();
    const since7d = new Date(now.getTime() - HISTORY_DAYS * 86_400_000).toISOString();
    const since365d = new Date(
      now.getTime() - CONTACT_LOOKBACK_DAYS * 86_400_000
    ).toISOString();

    const [histRes, contactRes] = await Promise.all([
      admin
        .from("visitor_logs")
        .select(
          "id, visitor_id, device_fingerprint, ip_address, created_at, clicked_action, source, gclid"
        )
        .or(filter)
        .eq("source", "mumooman")
        .not("gclid", "is", null)
        .gte("created_at", since7d)
        .order("created_at", { ascending: false })
        .limit(50),
      admin
        .from("visitor_logs")
        .select("id", { count: "exact", head: true })
        .or(filter)
        .eq("clicked_action", true)
        .gte("created_at", since365d),
    ]);

    if (histRes.error) logSupabaseError("computeEntryRisk history", histRes.error);
    else prior = (histRes.data ?? []) as HistoryRow[];

    if (contactRes.error) logSupabaseError("computeEntryRisk contact", contactRes.error);
    else contactedBefore = (contactRes.count ?? 0) > 0;
  }

  const priorPaidClicks = prior.length;
  const last = prior[0];
  const minutesSinceLastClick = last
    ? Math.round((now.getTime() - new Date(last.created_at).getTime()) / 60_000)
    : null;

  // Hard signals — count even for past customers.
  if (opts.isAutomation) {
    score += 50;
    reasons.push("דפדפן אוטומטי (בוט)");
  }
  if (opts.country && opts.country !== "IL") {
    score += 40;
    reasons.push(`קליק מחוץ לישראל (${opts.country})`);
  }
  if (opts.isDesktopOnMobileCampaign) {
    score += 30;
    reasons.push("מחשב בקמפיין לנייד בלבד");
  }

  if (contactedBefore) {
    reasons.push("המכשיר הזה כבר התקשר/שלח וואטסאפ בעבר — כנראה לקוח");
    return {
      score: Math.min(score, 100),
      reasons,
      priorPaidClicks,
      contactedBefore,
      minutesSinceLastClick,
    };
  }

  if (priorPaidClicks > 0) {
    score += 20 * Math.min(priorPaidClicks, 4);
    reasons.push(
      `קליק ממומן מס' ${priorPaidClicks + 1} מאותו מכשיר ב-${HISTORY_DAYS} ימים, בלי שום פנייה`
    );
  }

  if (minutesSinceLastClick !== null && minutesSinceLastClick <= QUICK_RETURN_MINUTES) {
    score += 15;
    reasons.push(`חזר ולחץ שוב על המודעה אחרי ${minutesSinceLastClick} דק'`);
  }

  if (
    useFingerprint &&
    opts.fingerprint &&
    prior.some(
      (r) => r.device_fingerprint === opts.fingerprint && r.visitor_id !== opts.visitorId
    )
  ) {
    score += 15;
    reasons.push("אותו מכשיר עם עוגייה חדשה (גלישה בסתר / מחיקת עוגיות)");
  }

  const ips = new Set(prior.map((r) => r.ip_address).filter(Boolean));
  ips.add(opts.ip);
  if (priorPaidClicks > 0 && ips.size >= 3) {
    score += 10;
    reasons.push(`${ips.size} כתובות IP שונות לאותו מכשיר`);
  }

  if (priorPaidClicks > 0) {
    const hour = israelHour(now);
    if (hour >= 0 && hour < 5) {
      score += 10;
      reasons.push("קליקים חוזרים בשעות הלילה");
    }
  }

  return {
    score: Math.min(score, 100),
    reasons,
    priorPaidClicks,
    contactedBefore,
    minutesSinceLastClick,
  };
}

/** Final score used in reports: entry score + low-engagement penalty. */
export function finalFraudScore(row: {
  fraud_score: number | null;
  low_engagement: boolean | null;
}): number {
  const base = row.fraud_score ?? 0;
  return Math.min(base + (row.low_engagement ? LOW_ENGAGEMENT_POINTS : 0), 100);
}

/** Persist the score on the row. Silently ignores a missing-column error (migration 013 not run). */
export async function saveFraudScore(
  id: number,
  risk: DeviceRisk,
  isAutomation: boolean
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .update({
      fraud_score: risk.score,
      fraud_reasons: risk.reasons,
      is_automation: isAutomation,
    })
    .eq("id", id);
  if (error) logSupabaseError("saveFraudScore (run migration 013?)", error);
}
