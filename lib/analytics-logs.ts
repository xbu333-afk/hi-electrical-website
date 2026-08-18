import { getSupabaseAdmin } from "@/lib/supabase";
import type { VisitorRow } from "@/lib/visitor-row";

const EXTENDED_COLS =
  "id, visitor_id, ip_address, page_path, pages_visited, source, device, city, country, gclid, user_agent, referrer, keyword, campaign_id, adgroup_id, creative, vt_device, loc_physical_ms, network, match_type, browser_language, device_fingerprint, duration, clicked_action, created_at";

const BASE_COLS =
  "id, visitor_id, ip_address, page_path, source, duration, clicked_action, created_at";

const PAGE_SIZE = 1000;

function mapBaseRow(r: Partial<VisitorRow>): VisitorRow {
  return {
    id: r.id ?? 0,
    visitor_id: r.visitor_id ?? "",
    ip_address: r.ip_address ?? "",
    page_path: r.page_path ?? "",
    pages_visited: null,
    source: r.source ?? "organic",
    device: null,
    city: null,
    country: null,
    gclid: null,
    user_agent: null,
    referrer: null,
    keyword: null,
    campaign_id: null,
    adgroup_id: null,
    creative: null,
    vt_device: null,
    loc_physical_ms: null,
    network: null,
    match_type: null,
    browser_language: null,
    device_fingerprint: null,
    duration: r.duration ?? null,
    clicked_action: r.clicked_action ?? false,
    created_at: r.created_at ?? "",
  };
}

function isColMissing(error: { code?: string; message?: string }): boolean {
  const msg = error.message ?? "";
  return (
    error.code === "PGRST204" ||
    /column.*does not exist/i.test(msg) ||
    /Could not find the .* column/i.test(msg)
  );
}

async function fetchPages(
  cols: string,
  rangeStartIso: string,
  rangeEndIso: string
): Promise<{ rows: Record<string, unknown>[]; error: { code?: string; message?: string } | null }> {
  const admin = getSupabaseAdmin();
  const all: Record<string, unknown>[] = [];
  let offset = 0;

  for (;;) {
    const { data, error } = await admin
      .from("visitor_logs")
      .select(cols)
      .gte("created_at", rangeStartIso)
      .lte("created_at", rangeEndIso)
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      return { rows: [], error };
    }

    const batch = ((data ?? []) as unknown) as Record<string, unknown>[];
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return { rows: all, error: null };
}

/** Load visitor_logs for a date range. Never deletes rows. */
export async function getVisitorLogsForRange(
  rangeStart: Date,
  rangeEnd: Date
): Promise<{ rows: VisitorRow[]; warning: string | null }> {
  const startIso = rangeStart.toISOString();
  const endIso = rangeEnd.toISOString();

  const extended = await fetchPages(EXTENDED_COLS, startIso, endIso);
  if (!extended.error) {
    return { rows: extended.rows as unknown as VisitorRow[], warning: null };
  }

  if (!isColMissing(extended.error)) {
    const msg = extended.error.message ?? JSON.stringify(extended.error);
    throw new Error(`Supabase query failed: ${msg}`);
  }

  const base = await fetchPages(BASE_COLS, startIso, endIso);
  if (base.error) {
    throw new Error(
      `Supabase base query failed: ${base.error.message ?? JSON.stringify(base.error)}`
    );
  }

  return {
    rows: (base.rows as unknown as Partial<VisitorRow>[]).map(mapBaseRow),
    warning: `חלק מהעמודות החדשות חסרות בטבלה. הרץ את migrations 002–009 ב-Supabase. שגיאת Supabase: ${extended.error.message ?? ""}`,
  };
}
