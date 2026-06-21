/**
 * visitor_logs — Supabase table schema (run once in Supabase SQL editor):
 *
 * create table visitor_logs (
 *   id            uuid primary key default gen_random_uuid(),
 *   visitor_id    text not null,
 *   ip_address    text not null,
 *   page_path     text not null,
 *   source        text not null check (source in ('mumooman', 'organic')),
 *   duration      integer,
 *   clicked_action boolean not null default false,
 *   created_at    timestamptz not null default now(),
 *   updated_at    timestamptz not null default now()
 * );
 *
 * -- RLS: allow insert/select from service role only
 * alter table visitor_logs enable row level security;
 */

import { getSupabaseAdmin } from "./supabase";

export interface VisitorLogEntry {
  visitor_id: string;
  ip_address: string;
  page_path: string;
  source: "mumooman" | "organic";
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
      source: entry.source,
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
