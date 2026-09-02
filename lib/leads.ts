import { getSupabaseAdmin } from "./supabase";
import type { ValueTrackParams } from "./valuetrack";
import type { VisitorDevice } from "./visitor-logs";

export interface LeadEntry extends ValueTrackParams {
  name: string;
  /** E.164 — תוצר normalizeIsraeliPhone */
  phone: string;
  /** בדיוק כפי שהוקלד, לחיוג ידני אם הנרמול טעה */
  phone_raw: string;
  city: string | null;
  issue: string | null;
  visitor_id: string | null;
  /** uuid — visitor_logs.id הוא uuid בבסיס הנתונים החי */
  visitor_log_id: string | null;
  gclid: string | null;
  source: "mumooman" | "organic";
  page_path: string;
  ip_address: string;
  user_agent: string | null;
  referrer: string | null;
  device: VisitorDevice;
  geo_city: string | null;
  country: string | null;
  whatsapp_message: string;
}

function logLeadError(context: string, error: unknown): void {
  if (error && typeof error === "object" && "message" in error) {
    const e = error as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };
    console.error(`[leads] ${context}:`, {
      message: e.message,
      code: e.code,
      details: e.details,
      hint: e.hint,
    });
    return;
  }
  console.error(`[leads] ${context}:`, error);
}

/**
 * מזהה השורה האחרונה ב-visitor_logs של אותו מבקר, כדי לקשור את הליד לסשן
 * ולמסע הגלישה שקדם לו.
 *
 * קריאה בלבד — לא נוגע במנגנון המעקב עצמו. נכשל בשקט (null) כי ליד בלי
 * קישור לסשן עדיף על ליד שאבד.
 */
export async function findRecentVisitorLogId(
  visitorId: string
): Promise<string | null> {
  const session = await findRecentVisitorSession(visitorId);
  return session?.visitor_log_id ?? null;
}

export type VisitorSessionAttribution = {
  visitor_log_id: string;
  /** שורת הסשן האחרונה עם GCLID אמיתי (אם יש) — לשימור ייחוס ממומן אחרי ניווט פנימי */
  paid: ({ gclid: string } & ValueTrackParams) | null;
};

const SESSION_ATTR_COLUMNS =
  "id, gclid, keyword, campaign_id, adgroup_id, creative, vt_device, loc_physical_ms, network, match_type";

/**
 * קורא את סשן המבקר לפי cookie hi_elec_vid (visitor_id):
 * - השורה האחרונה לקישור visitor_log_id
 * - השורה הממומנת האחרונה (עם GCLID) לשימור ייחוס כש־?gclid= נעלם מה-URL
 */
export async function findRecentVisitorSession(
  visitorId: string
): Promise<VisitorSessionAttribution | null> {
  const trimmed = visitorId.trim();
  if (!trimmed) return null;

  const db = getSupabaseAdmin();

  const { data: latest, error: latestErr } = await db
    .from("visitor_logs")
    .select("id")
    .eq("visitor_id", trimmed)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestErr) {
    logLeadError("findRecentVisitorSession/latest", latestErr);
    return null;
  }

  const visitorLogId = (latest?.id as string | undefined) ?? null;
  if (!visitorLogId) return null;

  const { data: paidRow, error: paidErr } = await db
    .from("visitor_logs")
    .select(SESSION_ATTR_COLUMNS)
    .eq("visitor_id", trimmed)
    .not("gclid", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (paidErr) {
    logLeadError("findRecentVisitorSession/paid", paidErr);
    return { visitor_log_id: visitorLogId, paid: null };
  }

  const rawGclid =
    typeof paidRow?.gclid === "string" ? paidRow.gclid.trim() : "";
  const gclid =
    rawGclid && !rawGclid.startsWith("gtm_") ? rawGclid : null;

  if (!gclid || !paidRow) {
    return { visitor_log_id: visitorLogId, paid: null };
  }

  return {
    visitor_log_id: visitorLogId,
    paid: {
      gclid,
      keyword: (paidRow.keyword as string | null) ?? null,
      campaign_id: (paidRow.campaign_id as string | null) ?? null,
      adgroup_id: (paidRow.adgroup_id as string | null) ?? null,
      creative: (paidRow.creative as string | null) ?? null,
      vt_device: (paidRow.vt_device as string | null) ?? null,
      loc_physical_ms: (paidRow.loc_physical_ms as string | null) ?? null,
      network: (paidRow.network as string | null) ?? null,
      match_type: (paidRow.match_type as string | null) ?? null,
    },
  };
}

/**
 * כמה לידים נשלחו מאותה כתובת IP בחלון הזמן האחרון.
 *
 * נכשל פתוח (0) בכוונה: תקלה בשאילתה לא תחסום לקוח אמיתי.
 */
export async function countRecentLeadsByIp(
  ip: string,
  windowMs: number
): Promise<number> {
  if (!ip || ip === "unknown") return 0;

  const since = new Date(Date.now() - windowMs).toISOString();
  const { count, error } = await getSupabaseAdmin()
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);

  if (error) {
    logLeadError("countRecentLeadsByIp", error);
    return 0;
  }

  return count ?? 0;
}

/** זורק אם הכתיבה נכשלה — הקורא אחראי להתריע בכל מקרה. */
export async function insertLead(entry: LeadEntry): Promise<number> {
  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .insert({
      name: entry.name,
      phone: entry.phone,
      phone_raw: entry.phone_raw,
      city: entry.city,
      issue: entry.issue,
      visitor_id: entry.visitor_id,
      visitor_log_id: entry.visitor_log_id,
      gclid: entry.gclid,
      source: entry.source,
      page_path: entry.page_path,
      ip_address: entry.ip_address,
      user_agent: entry.user_agent,
      referrer: entry.referrer,
      device: entry.device,
      geo_city: entry.geo_city,
      country: entry.country,
      keyword: entry.keyword,
      campaign_id: entry.campaign_id,
      adgroup_id: entry.adgroup_id,
      creative: entry.creative,
      vt_device: entry.vt_device,
      loc_physical_ms: entry.loc_physical_ms,
      network: entry.network,
      match_type: entry.match_type,
      whatsapp_message: entry.whatsapp_message,
    })
    .select("id")
    .single();

  if (error) {
    logLeadError("insert failed", error);
    throw error;
  }

  if (!data?.id) {
    const err = new Error("insert succeeded but no id returned");
    logLeadError("insert failed", err);
    throw err;
  }

  return data.id as number;
}
