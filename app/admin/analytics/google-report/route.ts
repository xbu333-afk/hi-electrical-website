import { type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  FRAUD_ALERT_THRESHOLD,
} from "@/lib/fraud-score";
import { summarizeUserAgent } from "@/lib/user-agent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Google reviews invalid-click claims only for the last 60 days. */
const CLAIM_WINDOW_DAYS = 60;
const PAGE_SIZE = 1000;

const COLS =
  "id, created_at, gclid, ip_address, country, city, keyword, page_path, user_agent, visitor_id, device_fingerprint, duration, clicked_action, touch_count, scroll_pct, first_interaction_ms, low_engagement, is_automation, fraud_score, fraud_reasons, fraud_reasons_en, loc_physical_ms, device_cookie";

type Row = {
  id: number;
  created_at: string;
  gclid: string;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  keyword: string | null;
  page_path: string | null;
  user_agent: string | null;
  visitor_id: string | null;
  device_fingerprint: string | null;
  duration: number | null;
  clicked_action: boolean | null;
  touch_count: number | null;
  scroll_pct: number | null;
  first_interaction_ms: number | null;
  low_engagement: boolean | null;
  is_automation: boolean | null;
  fraud_score: number | null;
  fraud_reasons: string[] | null;
  fraud_reasons_en: string[] | null;
  loc_physical_ms: string | null;
  device_cookie: string | null;
};

function csvCell(val: string | number | null | undefined): string {
  const s = val === null || val === undefined ? "" : String(val);
  return `"${s.replace(/"/g, '""')}"`;
}

function israelTime(iso: string): string {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    hour12: false,
  });
}

/**
 * CSV for Google's invalid-click (Click Quality) form:
 * paid clicks from the last 60 days whose final device-based score ≥ threshold.
 * Optional ?min=NN overrides the threshold.
 */
export async function GET(request: NextRequest) {
  const minParam = Number(request.nextUrl.searchParams.get("min"));
  const minScore =
    Number.isFinite(minParam) && minParam > 0 ? minParam : FRAUD_ALERT_THRESHOLD;
  const since = new Date(Date.now() - CLAIM_WINDOW_DAYS * 86_400_000).toISOString();

  const admin = getSupabaseAdmin();
  const rows: Row[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { data, error } = await admin
      .from("visitor_logs")
      .select(COLS)
      .eq("source", "mumooman")
      .not("gclid", "is", null)
      .not("fraud_score", "is", null)
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) {
      return new Response(
        `Supabase error — did you run migrations 013 and 015? ${error.message}`,
        { status: 500 }
      );
    }
    const batch = (data ?? []) as unknown as Row[];
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  const flagged = rows
    .map((r) => ({ r, score: r.fraud_score ?? 0 }))
    // Owner's rule: every repeat paid click is suspicious — even if they tapped
    // "call" (a tap is not a call). So no exemption for clicked_action.
    .filter(({ score }) => score >= minScore);

  const header = [
    "Click time (UTC)",
    "Click time (Israel)",
    "GCLID",
    "IP address",
    "Country",
    "City (IP-based)",
    "Google location ID (loc_physical_ms)",
    "Keyword",
    "Landing page",
    "Device / browser",
    "Device cookie ID",
    "Device fingerprint",
    "Seconds on site",
    "Touches",
    "Max scroll %",
    "ms to first interaction",
    "Second device cookie (server)",
    "Tapped call/WhatsApp",
    "Automated browser",
    "Risk score (0-100)",
    "Reasons (English)",
    "Reasons (Hebrew)",
  ]
    .map(csvCell)
    .join(",");

  const lines = flagged.map(({ r, score }) =>
    [
      new Date(r.created_at).toISOString(),
      israelTime(r.created_at),
      r.gclid,
      r.ip_address,
      r.country,
      r.city,
      r.loc_physical_ms,
      r.keyword,
      r.page_path,
      summarizeUserAgent(r.user_agent),
      r.visitor_id,
      r.device_fingerprint,
      r.duration ?? "",
      r.touch_count ?? "",
      r.scroll_pct ?? "",
      r.first_interaction_ms === null ? "none" : r.first_interaction_ms,
      r.device_cookie,
      r.clicked_action ? "yes" : "no",
      r.is_automation ? "yes" : "no",
      score,
      (r.fraud_reasons_en ?? []).join(" | ") +
        (r.low_engagement
          ? " | Visit lasted under 10 seconds with zero screen touches"
          : ""),
      (r.fraud_reasons ?? []).join(" | ") +
        (r.low_engagement ? " | ביקור של פחות מ-10 שניות בלי שום נגיעה" : ""),
    ]
      .map(csvCell)
      .join(",")
  );

  const csv = "﻿" + [header, ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="google-invalid-clicks-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
