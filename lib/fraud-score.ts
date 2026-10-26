import { getSupabaseAdmin } from "./supabase";
import { logSupabaseError } from "./visitor-logs";

/**
 * Repeat-click detection for paid clicks.
 *
 * Business rule (owner's policy): every visitor is excluded from the ads after
 * the first visit. Customers save the number. So ANY second paid click from the
 * same device is suspicious — whether or not they tapped "call" (a tap is not a
 * call, and fraudsters tap it to look real).
 *
 * "Same device" = any of:
 *   1. visitor_id     — JS cookie + localStorage
 *   2. device_cookie  — server-set HttpOnly first-party cookie (survives iOS
 *                       Safari's 7-day cap on JS cookies)
 *   3. device_fingerprint / device_fingerprint_v2 — hardware fingerprints;
 *                       NOT on iPhones (collide between different iPhones)
 *   4. device_hint + same IP within 60 minutes — "soft" match that also works
 *                       on iPhones (catches switching to an incognito tab)
 * A shared IP is never used to identify a person (Israeli carriers share IPs).
 */

/** Approximate average CPC (₪) — used only for the "estimated cost" line in alerts. */
export const AVG_CPC_ILS = 16;

/** Score at/above this → suspicious alert + included in the Google report. */
export const FRAUD_ALERT_THRESHOLD = 40;

/** Same as the "exclude all visitors" audience membership (~1 year). */
const LOOKBACK_DAYS = 365;
const QUICK_RETURN_MINUTES = 30;
/** device_hint + same IP inside this window counts as the same device. */
const SOFT_MATCH_MINUTES = 60;

const SAFE_ID = /^[A-Za-z0-9-]{8,80}$/;

/** iOS fingerprints collide between different iPhones — never trust them alone. */
export function isIosUserAgent(ua: string | null | undefined): boolean {
  return !!ua && /iPhone|iPad|iPod/i.test(ua);
}

export interface DeviceRisk {
  score: number;
  reasons: string[];
  /** Earlier paid clicks from this device in the last year (excluding this one). */
  priorPaidClicks: number;
  /** Earlier paid clicks from this device in the last 7 days. */
  priorPaidClicks7d: number;
  minutesSinceLastClick: number | null;
  firstClickAt: string | null;
}

type HistoryRow = {
  id: number;
  visitor_id: string | null;
  device_fingerprint_v2?: string | null;
  device_hint?: string | null;
  device_cookie?: string | null;
  device_fingerprint: string | null;
  ip_address: string | null;
  created_at: string;
};

function deviceFilter(ids: {
  visitorId: string | null;
  deviceCookie: string | null;
  fingerprint: string | null;
  fingerprintV2: string | null;
  useFingerprint: boolean;
}): string | null {
  const parts: string[] = [];
  if (ids.visitorId && SAFE_ID.test(ids.visitorId)) {
    parts.push(`visitor_id.eq.${ids.visitorId}`);
  }
  if (ids.deviceCookie && SAFE_ID.test(ids.deviceCookie)) {
    parts.push(`device_cookie.eq.${ids.deviceCookie}`);
  }
  if (ids.useFingerprint && ids.fingerprint && SAFE_ID.test(ids.fingerprint)) {
    parts.push(`device_fingerprint.eq.${ids.fingerprint}`);
  }
  if (ids.useFingerprint && ids.fingerprintV2 && SAFE_ID.test(ids.fingerprintV2)) {
    parts.push(`device_fingerprint_v2.eq.${ids.fingerprintV2}`);
  }
  return parts.length ? parts.join(",") : null;
}

const HISTORY_COLS =
  "id, visitor_id, device_cookie, device_fingerprint, device_fingerprint_v2, device_hint, ip_address, created_at";

async function fetchPriorPaidClicks(
  filter: string,
  sinceIso: string
): Promise<HistoryRow[]> {
  const res = await getSupabaseAdmin()
    .from("visitor_logs")
    .select(HISTORY_COLS)
    .or(filter)
    .eq("source", "mumooman")
    .not("gclid", "is", null)
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: false })
    .limit(100);
  if (res.error) {
    logSupabaseError("computeEntryRisk history", res.error);
    return [];
  }
  return (res.data ?? []) as unknown as HistoryRow[];
}

/** Same lite device hint from the same IP within the last hour. */
async function fetchSoftMatches(
  hint: string,
  ip: string,
  sinceIso: string
): Promise<HistoryRow[]> {
  const res = await getSupabaseAdmin()
    .from("visitor_logs")
    .select(HISTORY_COLS)
    .eq("device_hint", hint)
    .eq("ip_address", ip)
    .eq("source", "mumooman")
    .not("gclid", "is", null)
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: false })
    .limit(20);
  if (res.error) {
    logSupabaseError("computeEntryRisk soft match", res.error);
    return [];
  }
  return (res.data ?? []) as unknown as HistoryRow[];
}

/**
 * Compute the entry-time risk score. Call BEFORE inserting the current row.
 * Fail-open: on any DB error returns score 0 so real visits are never punished.
 */
export async function computeEntryRisk(opts: {
  visitorId: string | null;
  deviceCookie: string | null;
  /** False when the server cookie was just created on this request. */
  deviceCookieExisted: boolean;
  fingerprint: string | null;
  fingerprintV2?: string | null;
  deviceHint?: string | null;
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
  const filter = deviceFilter({
    visitorId: opts.visitorId,
    // A brand-new server cookie can't match anything — skip it.
    deviceCookie: opts.deviceCookieExisted ? opts.deviceCookie : null,
    fingerprint: opts.fingerprint,
    fingerprintV2: opts.fingerprintV2 ?? null,
    useFingerprint,
  });

  const since = new Date(now.getTime() - LOOKBACK_DAYS * 86_400_000).toISOString();
  const softSince = new Date(now.getTime() - SOFT_MATCH_MINUTES * 60_000).toISOString();
  const [hard, soft] = await Promise.all([
    filter ? fetchPriorPaidClicks(filter, since) : Promise.resolve([] as HistoryRow[]),
    opts.deviceHint && SAFE_ID.test(opts.deviceHint) && opts.ip && opts.ip !== "unknown"
      ? fetchSoftMatches(opts.deviceHint, opts.ip, softSince)
      : Promise.resolve([] as HistoryRow[]),
  ]);

  const byId = new Map<number, HistoryRow>();
  for (const r of [...hard, ...soft]) byId.set(r.id, r);
  const hardIds = new Set(hard.map((r) => r.id));
  const softOnly = soft.filter((r) => !hardIds.has(r.id));
  const prior = [...byId.values()].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const priorPaidClicks = prior.length;
  const weekAgo = now.getTime() - 7 * 86_400_000;
  const priorPaidClicks7d = prior.filter(
    (r) => new Date(r.created_at).getTime() >= weekAgo
  ).length;
  const last = prior[0];
  const first = prior[prior.length - 1];
  const minutesSinceLastClick = last
    ? Math.round((now.getTime() - new Date(last.created_at).getTime()) / 60_000)
    : null;

  // ── Core rule: a second paid click from the same device ──────────────────
  if (priorPaidClicks > 0) {
    score += 50 + 15 * Math.min(priorPaidClicks - 1, 3);
    const firstDate = new Date(first.created_at).toLocaleDateString("he-IL", {
      timeZone: "Asia/Jerusalem",
    });
    reasons.push(
      `קליק ממומן מס' ${priorPaidClicks + 1} מאותו מכשיר (הראשון ב-${firstDate}) — אמור היה להיות מוחרג`
    );

    if (minutesSinceLastClick !== null && minutesSinceLastClick <= QUICK_RETURN_MINUTES) {
      score += 15;
      reasons.push(`חזר ולחץ שוב על המודעה אחרי ${minutesSinceLastClick} דק'`);
    }

    // Matched only through the server cookie / fingerprint / soft hint →
    // the visitor cleared the normal cookie or used incognito.
    if (opts.visitorId && !prior.some((r) => r.visitor_id === opts.visitorId)) {
      score += 10;
      reasons.push(
        softOnly.length > 0 && hard.length === 0
          ? `אותו סוג מכשיר מאותה כתובת IP תוך ${minutesSinceLastClick ?? "?"} דק' — כנראה עבר לגלישה בסתר`
          : "מחק עוגיות / גלישה בסתר — זוהה לפי עוגייה שנייה או טביעת מכשיר"
      );
    }

    const ips = new Set(prior.map((r) => r.ip_address).filter(Boolean));
    if (!ips.has(opts.ip)) {
      reasons.push(
        `כתובת IP חדשה (${ips.size + 1} כתובות שונות לאותו מכשיר)`
      );
    }
  }

  // ── Independent hard signals ──────────────────────────────────────────────
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

  return {
    score: Math.min(score, 100),
    reasons,
    priorPaidClicks,
    priorPaidClicks7d,
    minutesSinceLastClick,
    firstClickAt: first?.created_at ?? null,
  };
}

/** Persist the score on the row. Logs (doesn't throw) if a migration is missing. */
export async function saveFraudScore(
  id: number,
  risk: DeviceRisk,
  extra: {
    isAutomation: boolean;
    deviceCookie: string | null;
    fingerprintV2: string | null;
    deviceHint: string | null;
  }
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .update({
      fraud_score: risk.score,
      fraud_reasons: risk.reasons,
      is_automation: extra.isAutomation,
      device_cookie: extra.deviceCookie,
      device_fingerprint_v2: extra.fingerprintV2,
      device_hint: extra.deviceHint,
    })
    .eq("id", id);
  if (error) logSupabaseError("saveFraudScore (run migrations 013/015/016?)", error);
}
