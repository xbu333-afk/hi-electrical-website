import { getSupabaseAdmin } from "./supabase";

export type VisitorDevice = "mobile" | "desktop";

export interface VisitorLogEntry {
  visitor_id: string;
  ip_address: string;
  page_path: string;
  source: "mumooman" | "organic";
  device?: VisitorDevice;
  city?: string | null;
  duration?: number;
  clicked_action?: boolean;
}

export async function insertVisitorLog(
  entry: VisitorLogEntry
): Promise<number | undefined> {
  const { data, error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .insert({
      visitor_id: entry.visitor_id,
      ip_address: entry.ip_address,
      page_path: entry.page_path,
      pages_visited: [entry.page_path],
      source: entry.source,
      device: entry.device ?? null,
      city: entry.city ?? null,
      clicked_action: entry.clicked_action ?? false,
    })
    .select("id")
    .single();

  if (error) console.error("[visitor_logs] insert error:", error.message);
  return data?.id as number | undefined;
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
    // Fallback: update page_path only
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

export async function countTodayVisitsByIp(ip: string): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count, error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", startOfDay.toISOString());

  if (error) console.error("[visitor_logs] count error:", error.message);
  return count ?? 0;
}
