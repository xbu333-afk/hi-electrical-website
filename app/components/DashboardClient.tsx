"use client";

import { useState, useMemo } from "react";
import { getDeviceDisplay } from "@/lib/user-agent";
import { formatPageLabel } from "@/lib/page-labels";
import {
  detectSuspiciousGclidIps,
  detectIpSwitcherByVisitorId,
  detectIpSwitcherByFingerprint,
  detectGeoFraud,
  detectDesktopFraud,
} from "@/lib/fraud-detection";
import { SuspiciousIpsPanel } from "./SuspiciousIpsPanel";
import { formatAdsNetwork, formatMatchType } from "@/lib/valuetrack";
import type { GoogleAdsReportMeta } from "@/lib/google-ads-report-meta";

// ── Shared row type (used by page.tsx and this component) ─────────────────────
export interface VisitorRow {
  id: number;
  visitor_id: string;
  ip_address: string;
  page_path: string;
  pages_visited: string[] | null;
  source: string;
  device: string | null;
  city: string | null;
  gclid: string | null;
  user_agent: string | null;
  referrer: string | null;
  keyword: string | null;
  campaign_id: string | null;
  adgroup_id: string | null;
  creative: string | null;
  vt_device: string | null;
  loc_physical_ms: string | null;
  network: string | null;
  match_type: string | null;
  browser_language: string | null;
  device_fingerprint: string | null;
  country: string | null;
  duration: number | null;
  clicked_action: boolean;
  created_at: string;
}

// ── Date range helpers ────────────────────────────────────────────────────────
type DatePreset = "today" | "yesterday" | "week" | "month" | "custom";
type SourceFilter = "all" | "mumooman" | "organic" | "fraud";

const DATE_PRESETS: { id: DatePreset; label: string }[] = [
  { id: "today", label: "היום" },
  { id: "yesterday", label: "אתמול" },
  { id: "week", label: "השבוע" },
  { id: "month", label: "החודש" },
  { id: "custom", label: "מותאם אישית" },
];

/** Return UTC Date for Israel midnight, offset by -offsetDays days. */
function israelMidnight(offsetDays = 0): Date {
  const now = new Date();
  const israelStr = now.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
  const israelLocal = new Date(israelStr);
  israelLocal.setDate(israelLocal.getDate() - offsetDays);
  israelLocal.setHours(0, 0, 0, 0);
  const tzOffsetMs = now.getTime() - new Date(israelStr).getTime();
  return new Date(israelLocal.getTime() + tzOffsetMs);
}

function computeDateRange(
  preset: DatePreset,
  customStart: string,
  customEnd: string
): { rangeStart: Date; rangeEnd: Date } {
  const now = new Date();
  switch (preset) {
    case "today":
      return { rangeStart: israelMidnight(0), rangeEnd: now };
    case "yesterday":
      return {
        rangeStart: israelMidnight(1),
        rangeEnd: new Date(israelMidnight(0).getTime() - 1),
      };
    case "week":
      return {
        rangeStart: new Date(now.getTime() - 7 * 24 * 3600 * 1000),
        rangeEnd: now,
      };
    case "month":
      return {
        rangeStart: new Date(now.getTime() - 30 * 24 * 3600 * 1000),
        rangeEnd: now,
      };
    case "custom": {
      if (!customStart || !customEnd)
        return {
          rangeStart: new Date(now.getTime() - 7 * 24 * 3600 * 1000),
          rangeEnd: now,
        };
      // Parse as local dates; clamp to max 60 days
      const start = new Date(customStart + "T00:00:00");
      const end = new Date(customEnd + "T23:59:59");
      const MAX_MS = 60 * 24 * 3600 * 1000;
      const clampedStart =
        end.getTime() - start.getTime() > MAX_MS
          ? new Date(end.getTime() - MAX_MS)
          : start;
      return { rangeStart: clampedStart, rangeEnd: end };
    }
  }
}

// ── Formatting helpers ────────────────────────────────────────────────────────
function fmtDisplay(iso: string) {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtTimestampForCsv(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatPages(row: VisitorRow): { display: string; title: string } {
  const paths =
    Array.isArray(row.pages_visited) && row.pages_visited.length > 0
      ? row.pages_visited
      : [row.page_path];
  const labels = paths.map((p) => formatPageLabel(p));
  const title = labels.join(" → ");
  const display =
    labels.length > 1 ? `${labels[0]} (+${labels.length - 1})` : labels[0];
  return { display, title };
}

function fmtDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds}ש`;
  return `${Math.floor(seconds / 60)}ד ${seconds % 60}ש`;
}

function csvCell(val: string | null | undefined): string {
  return `"${(val ?? "").replace(/"/g, '""')}"`;
}

// ── Main Component ────────────────────────────────────────────────────────────
export function DashboardClient({
  allRows,
  warning,
  reportMeta,
}: {
  allRows: VisitorRow[];
  warning: string | null;
  reportMeta: GoogleAdsReportMeta;
}) {
  const [preset, setPreset] = useState<DatePreset>("today");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const { rangeStart, rangeEnd } = useMemo(
    () => computeDateRange(preset, customStart, customEnd),
    [preset, customStart, customEnd]
  );

  // Date-only filtered — used for fraud detection (always full picture)
  const filteredRows = useMemo(
    () =>
      allRows.filter((r) => {
        const ts = new Date(r.created_at).getTime();
        return ts >= rangeStart.getTime() && ts <= rangeEnd.getTime();
      }),
    [allRows, rangeStart, rangeEnd]
  );

  const fraudGroups = useMemo(
    () => detectSuspiciousGclidIps(filteredRows),
    [filteredRows]
  );
  const ipSwitcherGroups = useMemo(
    () => detectIpSwitcherByVisitorId(filteredRows),
    [filteredRows]
  );
  const fingerprintSwitcherGroups = useMemo(
    () => detectIpSwitcherByFingerprint(filteredRows),
    [filteredRows]
  );
  const fraudIps = useMemo(
    () => new Set(fraudGroups.map((g) => g.ip_address)),
    [fraudGroups]
  );
  const fraudVisitorIds = useMemo(
    () => new Set(ipSwitcherGroups.map((g) => g.visitor_id)),
    [ipSwitcherGroups]
  );
  const fraudFingerprints = useMemo(
    () =>
      new Set(fingerprintSwitcherGroups.map((g) => g.device_fingerprint)),
    [fingerprintSwitcherGroups]
  );
  const geoFraudRows = useMemo(
    () => detectGeoFraud(filteredRows),
    [filteredRows]
  );
  const geoFraudIds = useMemo(
    () => new Set(geoFraudRows.map((r) => r.id)),
    [geoFraudRows]
  );
  const desktopFraudRows = useMemo(
    () => detectDesktopFraud(filteredRows),
    [filteredRows]
  );
  const desktopFraudIds = useMemo(
    () => new Set(desktopFraudRows.map((r) => r.id)),
    [desktopFraudRows]
  );

  // Date + source filtered — used for stats, table, and CSV
  const displayRows = useMemo(() => {
    if (sourceFilter === "fraud") {
      return filteredRows.filter(
        (r) =>
          fraudIps.has(r.ip_address) ||
          fraudVisitorIds.has(r.visitor_id) ||
          (r.device_fingerprint != null &&
            fraudFingerprints.has(r.device_fingerprint)) ||
          geoFraudIds.has(r.id) ||
          desktopFraudIds.has(r.id)
      );
    }
    if (sourceFilter === "all") return filteredRows;
    return filteredRows.filter((r) =>
      sourceFilter === "mumooman"
        ? r.source === "mumooman"
        : r.source !== "mumooman"
    );
  }, [
    filteredRows,
    sourceFilter,
    fraudIps,
    fraudVisitorIds,
    fraudFingerprints,
    geoFraudIds,
    desktopFraudIds,
  ]);

  // Stats (based on displayRows — respects both date + source filters)
  const paidCount = displayRows.filter((r) => r.source === "mumooman").length;
  const clickedCount = displayRows.filter((r) => r.clicked_action).length;
  const gclidCount = displayRows.filter((r) => r.gclid).length;
  const suspiciousCount =
    fraudGroups.length +
    ipSwitcherGroups.length +
    fingerprintSwitcherGroups.length +
    geoFraudRows.length +
    desktopFraudRows.length;

  const dateRangeLabel =
    preset === "custom" && customStart && customEnd
      ? `${customStart} — ${customEnd}`
      : (DATE_PRESETS.find((p) => p.id === preset)?.label ?? preset);

  // ── All Visitors CSV ────────────────────────────────────────────────────────
  function handleAllVisitorsExport() {
    const HEADERS = [
      "שעה (ישראל)",
      "IP",
      "Visitor ID (Cookie)",
      "מקור",
      "מילת מפתח",
      "רשת",
      "התאמה",
      "מזהה קמפיין",
      "מזהה קבוצת מודעות",
      "עמוד",
      "מכשיר (Google Ads)",
      "עיר",
      "GCLID",
      "שהייה (שניות)",
      "יצר קשר",
      "User Agent",
      "Referrer",
      "Browser Language",
      "Device Fingerprint",
    ]
      .map(csvCell)
      .join(",");

    const rows = displayRows.map((r) =>
      [
        csvCell(fmtTimestampForCsv(r.created_at)),
        csvCell(r.ip_address),
        csvCell(r.visitor_id),
        csvCell(r.source === "mumooman" ? "ממומן" : "אורגני"),
        csvCell(r.keyword),
        csvCell(r.network ? formatAdsNetwork(r.network) : null),
        csvCell(r.match_type ? formatMatchType(r.match_type) : null),
        csvCell(r.campaign_id),
        csvCell(r.adgroup_id),
        csvCell(r.page_path),
        csvCell(r.vt_device),
        csvCell(r.city),
        csvCell(r.gclid),
        csvCell(r.duration != null ? String(r.duration) : null),
        csvCell(r.clicked_action ? "כן" : "לא"),
        csvCell(r.user_agent),
        csvCell(r.referrer),
        csvCell(r.browser_language),
        csvCell(r.device_fingerprint),
      ].join(",")
    );

    const csv = "\uFEFF" + [HEADERS, ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date()
      .toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })
      .replace(/\//g, "-");
    a.download = `all-visitors-${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div dir="rtl" className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              📊 דשבורד ניטור Anti-Fraud
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              ח.י שירותי חשמל —{" "}
              {new Date().toLocaleDateString("he-IL", {
                timeZone: "Asia/Jerusalem",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleAllVisitorsExport}
              className="flex items-center gap-2 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition whitespace-nowrap"
              title={`ייצוא ${displayRows.length} שורות — ${dateRangeLabel}`}
            >
              📋 ייצוא כל הכניסות (CSV)
            </button>
            <a
              href="/admin/auth/signout"
              className="text-sm bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition"
            >
              התנתק
            </a>
          </div>
        </div>

        {/* Migration warning */}
        {warning && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
            ⚠️ {warning}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
          {/* Source filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-600 ml-2 w-24">
              סנן לפי מקור:
            </span>
            {(
              [
                { id: "all", label: "🔍 הכל" },
                { id: "mumooman", label: "💰 ממומן" },
                { id: "organic", label: "🟢 אורגני" },
              ] as { id: SourceFilter; label: string }[]
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => setSourceFilter(s.id)}
                className={`text-sm px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                  sourceFilter === s.id
                    ? "bg-slate-800 text-white border-slate-800 font-medium"
                    : "bg-white text-slate-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => setSourceFilter("fraud")}
              className={`text-sm px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                sourceFilter === "fraud"
                  ? "bg-red-700 text-white border-red-700 font-medium"
                  : "bg-white text-red-700 border-red-200 hover:bg-red-50"
              }`}
            >
              🚨 הונאות{suspiciousCount > 0 ? ` (${suspiciousCount})` : ""}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Date filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-600 ml-2 w-24">
              סנן לפי תאריך:
            </span>
            {DATE_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`text-sm px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                  preset === p.id
                    ? "bg-blue-600 text-white border-blue-600 font-medium"
                    : "bg-white text-slate-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {p.label}
              </button>
            ))}
            {preset === "custom" && (
              <div className="flex items-center gap-2 flex-wrap mt-1 sm:mt-0">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  max={customEnd || new Date().toISOString().slice(0, 10)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <span className="text-slate-400 text-xs">עד</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  min={customStart || undefined}
                  max={new Date().toISOString().slice(0, 10)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {customStart && customEnd && (() => {
                  const days = Math.round(
                    (new Date(customEnd).getTime() - new Date(customStart).getTime()) /
                      (24 * 3600 * 1000)
                  );
                  return (
                    <span className={`text-xs ${days > 60 ? "text-red-500 font-medium" : "text-slate-400"}`}>
                      ({Math.min(days, 60)} ימים{days > 60 ? " — מקסימום 60" : ""})
                    </span>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label={`כניסות — ${dateRangeLabel}`} value={displayRows.length} color="blue" />
          <StatCard label="ממומן" value={paidCount} color="yellow" />
          <StatCard label="יצרו קשר" value={clickedCount} color="green" />
          <StatCard label="GCLIDs" value={gclidCount} color="purple" />
          <StatCard label="חשודים" value={suspiciousCount} color="red" />
        </div>

        {/* Suspicious IPs Panel */}
        <SuspiciousIpsPanel
          gclidGroups={fraudGroups}
          ipSwitcherGroups={ipSwitcherGroups}
          fingerprintSwitcherGroups={fingerprintSwitcherGroups}
          geoFraudRows={geoFraudRows}
          desktopFraudRows={desktopFraudRows}
          reportMeta={reportMeta}
          dateRangeLabel={dateRangeLabel}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
        />

        {/* Main Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-slate-500 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-right font-medium">שעה</th>
                  <th className="px-4 py-3 text-right font-medium">IP</th>
                  <th className="px-4 py-3 text-center font-medium">מכשיר</th>
                  <th className="px-4 py-3 text-right font-medium">עיר</th>
                  <th className="px-4 py-3 text-right font-medium">עמוד</th>
                  <th className="px-4 py-3 text-right font-medium">מקור</th>
                  <th className="px-4 py-3 text-right font-medium">מילת מפתח</th>
                  <th className="px-4 py-3 text-right font-medium">GCLID</th>
                  <th className="px-4 py-3 text-center font-medium">שהייה</th>
                  <th className="px-4 py-3 text-center font-medium">יצר קשר</th>
                  <th className="px-4 py-3 text-center font-medium">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayRows.map((row) => {
                  const isGclidFraud = fraudIps.has(row.ip_address);
                  const isIpSwitcher = fraudVisitorIds.has(row.visitor_id);
                  const isFingerprintSwitcher =
                    row.device_fingerprint != null &&
                    fraudFingerprints.has(row.device_fingerprint);
                  const isGeoFraud = geoFraudIds.has(row.id);
                  const isDesktopFraud = desktopFraudIds.has(row.id);
                  const fraud =
                    isGclidFraud ||
                    isIpSwitcher ||
                    isFingerprintSwitcher ||
                    isGeoFraud ||
                    isDesktopFraud;
                  const pages = formatPages(row);
                  const dev = getDeviceDisplay(row.device, row.user_agent);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-50 transition-colors ${fraud ? "bg-red-50" : ""}`}
                    >
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                        {fmtDisplay(row.created_at)}
                      </td>
                      <td
                        className="px-4 py-3 font-mono text-slate-700 text-xs whitespace-nowrap"
                        title={row.visitor_id ? `Cookie ID: ${row.visitor_id}` : undefined}
                      >
                        {row.ip_address}
                      </td>
                      <td
                        className="px-4 py-3 text-xs whitespace-nowrap"
                        title={row.user_agent ?? undefined}
                      >
                        <span className="inline-flex items-center gap-1 cursor-help">
                          <span className="text-base leading-none">{dev.icon}</span>
                          {dev.text && (
                            <span className="text-slate-600">{dev.text}</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                        {row.city ? (
                          <span title="מיקום משוער (Vercel)">📍 {row.city}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td
                        className="px-4 py-3 text-slate-800 text-xs max-w-[180px] truncate"
                        title={pages.title}
                      >
                        {pages.display}
                      </td>
                      <td className="px-4 py-3">
                        {row.source === "mumooman" ? (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            💰 ממומן
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🟢 אורגני
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-[160px]">
                        {row.keyword ? (
                          <span
                            className="block text-slate-800 truncate cursor-default"
                            title={[
                              row.keyword,
                              row.network
                                ? `רשת: ${formatAdsNetwork(row.network)}`
                                : null,
                              row.match_type
                                ? `התאמה: ${formatMatchType(row.match_type)}`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" | ")}
                          >
                            🎯 {row.keyword}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-[120px]">
                        {row.gclid ? (
                          <span
                            className="block font-mono text-violet-700 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded truncate cursor-default"
                            title={row.gclid}
                          >
                            🎟️ {row.gclid.slice(0, 14)}…
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs text-center whitespace-nowrap">
                        {fmtDuration(row.duration)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.clicked_action ? (
                          <span className="text-emerald-600 font-bold text-sm">
                            📞
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center space-y-0.5">
                        {isGclidFraud && (
                          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🚨 GCLID
                          </span>
                        )}
                        {isIpSwitcher && (
                          <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🔄 IP Switch
                          </span>
                        )}
                        {isFingerprintSwitcher && (
                          <span className="inline-flex items-center gap-1 bg-red-600 text-white border border-red-700 text-xs px-2 py-0.5 rounded-full whitespace-nowrap font-semibold">
                            🔴 Fingerprint IP
                          </span>
                        )}
                        {isGeoFraud && (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🌍 Geo ({row.country})
                          </span>
                        )}
                        {isDesktopFraud && (
                          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            💻 Desktop
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {displayRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-4 py-16 text-center text-slate-400"
                    >
                      אין נתונים בטווח התאריכים והסינון הנבחר
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-white border-blue-100 text-blue-700",
    yellow: "bg-white border-amber-100 text-amber-700",
    green: "bg-white border-emerald-100 text-emerald-700",
    purple: "bg-white border-violet-100 text-violet-700",
    red: "bg-white border-red-100 text-red-700",
  };
  const labelColors: Record<string, string> = {
    blue: "text-blue-500",
    yellow: "text-amber-500",
    green: "text-emerald-500",
    purple: "text-violet-500",
    red: "text-red-500",
  };
  return (
    <div
      className={`rounded-xl border shadow-sm p-5 flex flex-col gap-1 ${colors[color]}`}
    >
      <span className="text-3xl font-bold">{value}</span>
      <span className={`text-xs font-medium ${labelColors[color]}`}>
        {label}
      </span>
    </div>
  );
}
