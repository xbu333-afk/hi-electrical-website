import { getSupabaseAdmin } from "./supabase";

export type VisitorDevice = "mobile" | "desktop";

export interface VisitorHistory {
  today_count: number;
  week_count: number;
  total_count: number;
}

const ISRAEL_TZ = "Asia/Jerusalem";

export interface VisitorLogEntry {
  visitor_id: string;
  ip_address: string;
  page_path: string;
  source: "mumooman" | "organic";
  device?: VisitorDevice;
  city?: string | null;
  gclid?: string | null;
  user_agent?: string | null;
  duration?: number;
  clicked_action?: boolean;
}

function isSchemaMismatchError(error: {
  code?: string;
  message?: string;
}): boolean {
  const msg = error.message ?? "";
  return (
    error.code === "PGRST204" ||
    /column.*does not exist/i.test(msg) ||
    /Could not find the .* column/i.test(msg)
  );
}

export function logSupabaseError(context: string, error: unknown): void {
  if (error && typeof error === "object" && "message" in error) {
    const e = error as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };
    console.error(`[visitor_logs] ${context}:`, {
      message: e.message,
      code: e.code,
      details: e.details,
      hint: e.hint,
    });
    return;
  }
  console.error(`[visitor_logs] ${context}:`, error);
}

/** Midnight in Israel — correct for DST on Vercel (UTC servers). */
export function getIsraelStartOfDay(ref = new Date()): Date {
  const jerusalem = new Date(
    ref.toLocaleString("en-US", { timeZone: ISRAEL_TZ })
  );
  const msFromMidnight =
    jerusalem.getHours() * 3_600_000 +
    jerusalem.getMinutes() * 60_000 +
    jerusalem.getSeconds() * 1_000 +
    jerusalem.getMilliseconds();
  return new Date(ref.getTime() - msFromMidnight);
}

async function patchOptionalFields(
  id: number,
  entry: VisitorLogEntry
): Promise<void> {
  const optional: Record<string, unknown> = {
    pages_visited: [entry.page_path],
  };
  if (entry.device) optional.device = entry.device;
  if (entry.city) optional.city = entry.city;
  if (entry.gclid) optional.gclid = entry.gclid;
  if (entry.user_agent) optional.user_agent = entry.user_agent;

  const { error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .update({ ...optional, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error && !isSchemaMismatchError(error)) {
    logSupabaseError("optional fields update", error);
  }
}

export async function insertVisitorLog(entry: VisitorLogEntry): Promise<number> {
  const admin = getSupabaseAdmin();

  const baseRow = {
    visitor_id: entry.visitor_id,
    ip_address: entry.ip_address,
    page_path: entry.page_path,
    source: entry.source,
    clicked_action: entry.clicked_action ?? false,
  };

  const fullRow = {
    ...baseRow,
    pages_visited: [entry.page_path],
    device: entry.device ?? null,
    city: entry.city ?? null,
    gclid: entry.gclid ?? null,
    user_agent: entry.user_agent ?? null,
  };

  let { data, error } = await admin
    .from("visitor_logs")
    .insert(fullRow)
    .select("id")
    .single();

  if (error && isSchemaMismatchError(error)) {
    console.warn(
      "[visitor_logs] extended columns missing — retrying base insert:",
      error.message
    );
    ({ data, error } = await admin
      .from("visitor_logs")
      .insert(baseRow)
      .select("id")
      .single());

    if (!error && data?.id) {
      await patchOptionalFields(data.id as number, entry);
    }
  }

  if (error) {
    logSupabaseError("insert failed", error);
    throw error;
  }

  if (!data?.id) {
    const err = new Error("insert succeeded but no id returned");
    logSupabaseError("insert failed", err);
    throw err;
  }

  return data.id as number;
}

export async function updateVisitorLog(
  id: number,
  updates: Partial<Pick<VisitorLogEntry, "duration" | "clicked_action">>
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) console.error("[visitor_logs] update error:", error.message);
}

/** Append a page to the session's pages_visited list and set page_path to latest. */
export async function appendPageToLog(
  id: number,
  pagePath: string
): Promise<void> {
  const { data, error: fetchError } = await getSupabaseAdmin()
    .from("visitor_logs")
    .select("pages_visited, page_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("[visitor_logs] append fetch error:", fetchError.message);
    await getSupabaseAdmin()
      .from("visitor_logs")
      .update({ page_path: pagePath, updated_at: new Date().toISOString() })
      .eq("id", id);
    return;
  }

  const raw = data?.pages_visited;
  const pages: string[] = Array.isArray(raw)
    ? (raw as string[])
    : data?.page_path
      ? [data.page_path as string]
      : [];

  const last = pages[pages.length - 1];
  if (last !== pagePath) pages.push(pagePath);

  const { error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .update({
      page_path: pagePath,
      pages_visited: pages,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) console.error("[visitor_logs] append error:", error.message);
}

/**
 * Returns today/week/total visit counts for a specific visitor_id.
 * Called after the current visit is already inserted, so today_count ≥ 1.
 */
export async function getVisitorHistory(
  visitorId: string
): Promise<VisitorHistory> {
  const admin = getSupabaseAdmin();
  const startOfToday = getIsraelStartOfDay();
  const startOfWeek = new Date(Date.now() - 7 * 24 * 3_600_000);

  const [todayRes, weekRes, totalRes] = await Promise.all([
    admin
      .from("visitor_logs")
      .select("id", { count: "exact", head: true })
      .eq("visitor_id", visitorId)
      .gte("created_at", startOfToday.toISOString()),
    admin
      .from("visitor_logs")
      .select("id", { count: "exact", head: true })
      .eq("visitor_id", visitorId)
      .gte("created_at", startOfWeek.toISOString()),
    admin
      .from("visitor_logs")
      .select("id", { count: "exact", head: true })
      .eq("visitor_id", visitorId),
  ]);

  if (todayRes.error) logSupabaseError("getVisitorHistory today", todayRes.error);
  if (weekRes.error) logSupabaseError("getVisitorHistory week", weekRes.error);
  if (totalRes.error) logSupabaseError("getVisitorHistory total", totalRes.error);

  return {
    today_count: Math.max(todayRes.count ?? 0, 1),
    week_count: Math.max(weekRes.count ?? 0, 1),
    total_count: Math.max(totalRes.count ?? 0, 1),
  };
}

/**
 * Count visitor_logs rows for an IP within a sliding time window.
 * Used for enter Pushover cooldown (bypassed when gclid is present).
 */
export async function countRecentVisitsByIp(
  ip: string,
  windowMs: number
): Promise<number> {
  if (!ip || ip === "unknown") return 0;

  const since = new Date(Date.now() - windowMs).toISOString();
  const { count, error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);

  if (error) {
    logSupabaseError("countRecentVisitsByIp", error);
    return 0; // fail open — do not suppress notifications on query errors
  }

  return count ?? 0;
}

/**
 * Returns a map of visitor_id → total lifetime visit count.
 * Used by the admin dashboard CSV export to populate the "Total Lifetime Visits" column.
 */
export async function getVisitorTotalCounts(): Promise<Record<string, number>> {
  const { data, error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .select("visitor_id");

  if (error) {
    logSupabaseError("getVisitorTotalCounts", error);
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const vid = row.visitor_id as string;
    if (vid) counts[vid] = (counts[vid] ?? 0) + 1;
  }
  return counts;
}
