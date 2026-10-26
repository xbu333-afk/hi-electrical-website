import { type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AVG_CPC_ILS, FRAUD_ALERT_THRESHOLD } from "@/lib/fraud-score";
import { summarizeUserAgent } from "@/lib/user-agent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Google reviews invalid-click claims only for the last 60 days. */
const CLAIM_WINDOW_DAYS = 60;
const PAGE_SIZE = 1000;
/** A server hit younger than this may still be waiting for the browser to report. */
const NO_JS_GRACE_MS = 5 * 60_000;

const ACCOUNT_ID = "433-447-8858";

const COLS =
  "id, created_at, gclid, ip_address, country, city, keyword, page_path, user_agent, visitor_id, device_fingerprint, duration, clicked_action, touch_count, scroll_pct, first_interaction_ms, low_engagement, is_automation, fraud_score, fraud_reasons, fraud_reasons_en, loc_physical_ms, device_cookie, ip_provider, ip_type, ip_flags, ip_risk";

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
  ip_provider: string | null;
  ip_type: string | null;
  ip_flags: string[] | null;
  ip_risk: number | null;
};

type ServerHit = {
  gclid: string;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
  path: string | null;
  country: string | null;
  city: string | null;
  keyword: string | null;
};

/** One line in the report — either a scored browser visit or a no-JS server hit. */
type ReportItem = {
  kind: "scored" | "no_js";
  groupKey: string;
  created_at: string;
  gclid: string;
  ip: string | null;
  country: string | null;
  city: string | null;
  keyword: string | null;
  page: string | null;
  device: string;
  network: string;
  seconds: string;
  touches: string;
  scroll: string;
  firstInteraction: string;
  tapped: string;
  score: number;
  reasonsEn: string;
  reasonsHe: string;
  row?: Row;
};

function csvCell(val: string | number | null | undefined): string {
  const s = val === null || val === undefined ? "" : String(val);
  return `"${s.replace(/"/g, '""')}"`;
}

function esc(val: string | number | null | undefined): string {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function israelTime(iso: string): string {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    hour12: false,
  });
}

function utc(iso: string): string {
  return new Date(iso).toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function networkLabel(r: {
  ip_provider: string | null;
  ip_type: string | null;
  ip_flags: string[] | null;
}): string {
  const base = [r.ip_provider, r.ip_type].filter(Boolean).join(" · ");
  const flags = r.ip_flags?.length ? ` [${r.ip_flags.join(", ").toUpperCase()}]` : "";
  return (base || "") + flags;
}

async function loadAll<T>(
  build: (from: number, to: number) => PromiseLike<{ data: unknown; error: { message: string } | null }>
): Promise<{ rows: T[]; error: string | null }> {
  const rows: T[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { data, error } = await build(offset, offset + PAGE_SIZE - 1);
    if (error) return { rows, error: error.message };
    const batch = (data ?? []) as T[];
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  return { rows, error: null };
}

/**
 * Report for Google's invalid-click (Click Quality) form — last 60 days.
 *   ?format=csv  (default) spreadsheet with every flagged click + GCLID
 *   ?format=html printable English summary (Print → Save as PDF)
 *   ?min=NN      override the score threshold
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const format = params.get("format") === "html" ? "html" : "csv";
  const minParam = Number(params.get("min"));
  const minScore =
    Number.isFinite(minParam) && minParam > 0 ? minParam : FRAUD_ALERT_THRESHOLD;
  const sinceDate = new Date(Date.now() - CLAIM_WINDOW_DAYS * 86_400_000);
  const since = sinceDate.toISOString();

  const admin = getSupabaseAdmin();

  const scored = await loadAll<Row>((from, to) =>
    admin
      .from("visitor_logs")
      .select(COLS)
      .eq("source", "mumooman")
      .not("gclid", "is", null)
      .not("fraud_score", "is", null)
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .range(from, to)
  );
  if (scored.error) {
    return new Response(
      `Supabase error — did you run migrations 013–018? ${scored.error}`,
      { status: 500 }
    );
  }

  // All paid GCLIDs the browser reported (to find server hits with no browser run)
  const browserGclids = await loadAll<{ gclid: string }>((from, to) =>
    admin
      .from("visitor_logs")
      .select("gclid")
      .not("gclid", "is", null)
      .gte("created_at", new Date(sinceDate.getTime() - 86_400_000).toISOString())
      .range(from, to)
  );
  const paidTotal = browserGclids.rows.length;
  const seen = new Set(browserGclids.rows.map((r) => r.gclid));

  const hits = await loadAll<ServerHit>((from, to) =>
    admin
      .from("ad_click_hits")
      .select("gclid, created_at, ip_address, user_agent, path, country, city, keyword")
      .gte("created_at", since)
      .lte("created_at", new Date(Date.now() - NO_JS_GRACE_MS).toISOString())
      .order("created_at", { ascending: true })
      .range(from, to)
  );
  // Table may not exist yet (migration 018) — report still works without it.
  const noJs = hits.error ? [] : hits.rows.filter((h) => !seen.has(h.gclid));

  const items: ReportItem[] = [];

  for (const r of scored.rows) {
    const score = r.fraud_score ?? 0;
    if (score < minScore) continue;
    const lowEn = r.low_engagement
      ? " | Visit lasted under 10 seconds with zero screen touches"
      : "";
    const lowHe = r.low_engagement ? " | ביקור של פחות מ-10 שניות בלי שום נגיעה" : "";
    items.push({
      kind: "scored",
      groupKey: r.visitor_id || r.device_cookie || `row-${r.id}`,
      created_at: r.created_at,
      gclid: r.gclid,
      ip: r.ip_address,
      country: r.country,
      city: r.city,
      keyword: r.keyword,
      page: r.page_path,
      device: summarizeUserAgent(r.user_agent),
      network: networkLabel(r),
      seconds: r.duration != null ? String(r.duration) : "",
      touches: r.touch_count != null ? String(r.touch_count) : "",
      scroll: r.scroll_pct != null ? `${r.scroll_pct}%` : "",
      firstInteraction:
        r.first_interaction_ms == null ? "none" : `${r.first_interaction_ms} ms`,
      tapped: r.clicked_action ? "yes" : "no",
      score,
      reasonsEn: (r.fraud_reasons_en ?? []).join(" | ") + lowEn,
      reasonsHe: (r.fraud_reasons ?? []).join(" | ") + lowHe,
      row: r,
    });
  }

  for (const h of noJs) {
    items.push({
      kind: "no_js",
      groupKey: `nojs-${h.gclid}`,
      created_at: h.created_at,
      gclid: h.gclid,
      ip: h.ip_address,
      country: h.country,
      city: h.city,
      keyword: h.keyword,
      page: h.path,
      device: summarizeUserAgent(h.user_agent),
      network: "",
      seconds: "0",
      touches: "0",
      scroll: "",
      firstInteraction: "none",
      tapped: "no",
      score: 70,
      reasonsEn:
        "The landing page was requested from our server with this GCLID, but the page's JavaScript never executed in a browser — typical of automated/scripted clicks",
      reasonsHe: "הדף נטען מהשרת עם ה-GCLID אבל הדפדפן לא הריץ את הדף בכלל — אופייני לבוט/קליק אוטומטי",
    });
  }

  items.sort((a, b) => a.created_at.localeCompare(b.created_at));
  const date = new Date().toISOString().slice(0, 10);

  if (format === "html") {
    return new Response(renderHtml(items, { paidTotal, since: sinceDate, minScore }), {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const header = [
    "Type",
    "Click time (UTC)",
    "Click time (Israel)",
    "GCLID",
    "IP address",
    "Network provider / type [flags]",
    "Country",
    "City (IP-based)",
    "Google location ID (loc_physical_ms)",
    "Keyword",
    "Landing page",
    "Device / browser",
    "Device cookie ID",
    "Second device cookie (server)",
    "Seconds on site",
    "Touches",
    "Max scroll %",
    "Time to first interaction",
    "Tapped call/WhatsApp",
    "Automated browser",
    "Risk score (0-100)",
    "Reasons (English)",
    "Reasons (Hebrew)",
  ]
    .map(csvCell)
    .join(",");

  const lines = items.map((it) =>
    [
      it.kind === "no_js" ? "Browser never ran page" : "Repeat / suspicious click",
      utc(it.created_at),
      israelTime(it.created_at),
      it.gclid,
      it.ip,
      it.network,
      it.country,
      it.city,
      it.row?.loc_physical_ms ?? "",
      it.keyword,
      it.page,
      it.device,
      it.row?.visitor_id ?? "",
      it.row?.device_cookie ?? "",
      it.seconds,
      it.touches,
      it.scroll,
      it.firstInteraction,
      it.tapped,
      it.row?.is_automation ? "yes" : "no",
      it.score,
      it.reasonsEn,
      it.reasonsHe,
    ]
      .map(csvCell)
      .join(",")
  );

  const csv = "﻿" + [header, ...lines].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="google-invalid-clicks-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

function renderHtml(
  items: ReportItem[],
  meta: { paidTotal: number; since: Date; minScore: number }
): string {
  const groups = new Map<string, ReportItem[]>();
  for (const it of items) {
    const list = groups.get(it.groupKey) ?? [];
    list.push(it);
    groups.set(it.groupKey, list);
  }
  const deviceGroups = [...groups.values()]
    .filter((g) => g[0].kind === "scored")
    .sort((a, b) => b.length - a.length);
  const noJs = items.filter((i) => i.kind === "no_js");
  const vpnCount = items.filter((i) => i.row?.ip_flags?.length).length;
  const quickRepeats = items.filter((i) => /minute\(s\) after|seconds after/.test(i.reasonsEn)).length;
  const estCost = items.length * AVG_CPC_ILS;
  const today = new Date().toISOString().slice(0, 10);
  const from = meta.since.toISOString().slice(0, 10);

  const deviceSections = deviceGroups
    .map((g, idx) => {
      const rows = g
        .map(
          (it) => `<tr>
  <td>${esc(utc(it.created_at))}</td>
  <td class="mono">${esc(it.gclid)}</td>
  <td>${esc(it.ip)}<br><span class="muted">${esc(it.network)}</span></td>
  <td>${esc(it.keyword)}</td>
  <td>${esc(it.seconds)}s / ${esc(it.touches)} touches</td>
  <td>${esc(it.reasonsEn)}</td>
</tr>`
        )
        .join("");
      const first = g[0];
      return `<section class="device">
  <h3>Device ${idx + 1} — ${g.length} flagged paid click${g.length > 1 ? "s" : ""}</h3>
  <p class="muted">${esc(first.device)} · ${esc(first.city ?? "")} ${esc(first.country ?? "")}</p>
  <table><thead><tr><th>Time</th><th>GCLID</th><th>IP / network</th><th>Keyword</th><th>Engagement</th><th>Why flagged</th></tr></thead>
  <tbody>${rows}</tbody></table>
</section>`;
    })
    .join("");

  const noJsRows = noJs
    .map(
      (it) => `<tr><td>${esc(utc(it.created_at))}</td><td class="mono">${esc(it.gclid)}</td><td>${esc(it.ip)}</td><td>${esc(it.device)}</td><td>${esc(it.keyword)}</td><td>${esc(it.page)}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Invalid click report — ${ACCOUNT_ID} — ${today}</title>
<style>
  :root{--ink:#0f172a;--muted:#64748b;--line:#e2e8f0;--accent:#047857;--bg:#fff}
  body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);background:var(--bg);margin:0;padding:24px 16px;line-height:1.5}
  main{max-width:1100px;margin:0 auto}
  h1{font-size:1.5rem;margin:0 0 4px} h2{font-size:1.15rem;margin:28px 0 8px;border-bottom:2px solid var(--accent);padding-bottom:4px}
  h3{font-size:1rem;margin:20px 0 2px}
  .muted{color:var(--muted);font-size:.85rem}
  .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;margin:16px 0}
  .kpi{border:1px solid var(--line);border-radius:10px;padding:10px 12px}
  .kpi b{display:block;font-size:1.4rem}
  table{width:100%;border-collapse:collapse;font-size:.8rem;margin-top:6px}
  th,td{border:1px solid var(--line);padding:5px 6px;text-align:left;vertical-align:top}
  th{background:#f8fafc}
  .mono{font-family:ui-monospace,Menlo,monospace;font-size:.7rem;word-break:break-all;max-width:220px}
  .tablewrap{overflow-x:auto}
  .print{position:fixed;top:12px;right:12px;background:var(--accent);color:#fff;border:0;border-radius:8px;padding:8px 14px;font-weight:600;cursor:pointer}
  ol li{margin-bottom:4px}
  @media print{.print{display:none} body{padding:0} section.device{break-inside:avoid}}
</style></head>
<body><main>
<button class="print" onclick="window.print()">Print / Save as PDF</button>
<h1>Invalid click investigation request</h1>
<p class="muted">Google Ads account ${ACCOUNT_ID} · H.I Electrical Services · Period ${from} → ${today} (last ${CLAIM_WINDOW_DAYS} days) · Generated ${today}</p>

<div class="kpis">
  <div class="kpi"><span class="muted">Paid clicks logged with GCLID</span><b>${meta.paidTotal}</b></div>
  <div class="kpi"><span class="muted">Flagged clicks in this request</span><b>${items.length}</b></div>
  <div class="kpi"><span class="muted">Devices with repeat paid clicks</span><b>${deviceGroups.length}</b></div>
  <div class="kpi"><span class="muted">Browser never ran the page</span><b>${noJs.length}</b></div>
  <div class="kpi"><span class="muted">VPN / proxy / data-centre</span><b>${vpnCount}</b></div>
  <div class="kpi"><span class="muted">Estimated cost (≈₪${AVG_CPC_ILS} CPC)</span><b>₪${estCost}</b></div>
</div>

<h2>Summary</h2>
<ol>
  <li>Every visitor who lands from our ads is added to an "all visitors" exclusion audience. Our customers save our phone number, so a second paid click from the same device is not expected.</li>
  <li>Our site records every paid click with its GCLID, in two independent places: on the server when the landing page is requested, and in the browser when the page actually runs.</li>
  <li>The same device is recognised by a first-party cookie, a second server-set cookie and a device fingerprint — never by IP address alone (Israeli mobile carriers share IPs between many users).</li>
  <li>This request contains ${items.length} paid clicks: ${deviceGroups.length} devices that clicked our ads repeatedly${quickRepeats ? ` (${quickRepeats} clicks came within minutes or seconds of the previous one)` : ""}, ${noJs.length} clicks where the page was requested but never executed in a browser, and ${vpnCount} clicks from VPN / proxy / data-centre connections identified by an independent IP-intelligence service.</li>
  <li>We ask for a click-level review of the GCLIDs below. The full spreadsheet (CSV) with all fields is attached.</li>
</ol>

<h2>Devices with repeat paid clicks</h2>
<div class="tablewrap">${deviceSections || '<p class="muted">None in this period.</p>'}</div>

<h2>Clicks where the browser never executed the landing page</h2>
${
  noJs.length
    ? `<div class="tablewrap"><table><thead><tr><th>Time</th><th>GCLID</th><th>IP</th><th>Device / browser</th><th>Keyword</th><th>Page</th></tr></thead><tbody>${noJsRows}</tbody></table></div>`
    : '<p class="muted">None in this period.</p>'
}

<h2>Method</h2>
<p class="muted">Risk threshold: score ≥ ${meta.minScore}/100. Engagement (seconds on site, screen touches, scroll depth) is measured in the browser and reported when the tab is hidden or closed and every 15 seconds while visible. Network classification: proxycheck.io. Times are UTC.</p>
</main></body></html>`;
}
