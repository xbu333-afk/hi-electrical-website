"use client";

import { useState } from "react";
import type { SuspiciousIpGroup, IpSwitcherGroup, GeoFraudRow } from "@/lib/fraud-detection";
import { getDeviceDisplay } from "@/lib/user-agent";

// ── Helpers ───────────────────────────────────────────────────────────────────
function csvCell(val: string | null | undefined): string {
  return `"${(val ?? "").replace(/"/g, '""')}"`;
}

function fmtTimestamp(iso: string): string {
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

function fmtDisplay(iso: string): string {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Convert ISO 3166-1 alpha-2 code to flag emoji (e.g. "RU" → "🇷🇺"). */
function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "🌍";
  const a = code.toUpperCase().charCodeAt(0) - 65 + 0x1f1e6;
  const b = code.toUpperCase().charCodeAt(1) - 65 + 0x1f1e6;
  return String.fromCodePoint(a, b);
}

const COUNTRY_NAMES: Record<string, string> = {
  RU: "רוסיה", TR: "טורקיה", US: "ארצות הברית", JO: "ירדן",
  GB: "בריטניה", DE: "גרמניה", FR: "צרפת", CN: "סין",
  UA: "אוקראינה", PL: "פולין", IN: "הודו", BR: "ברזיל",
  IR: "איראן", SA: "ערב הסעודית", EG: "מצרים", SY: "סוריה",
  LB: "לבנון", PS: "שטחים פלסטיניים", AE: "איחוד האמירויות", NL: "הולנד",
};

// ── Google Ads Investigation Report CSV ───────────────────────────────────────
function exportGoogleAdsReport(
  gclidGroups: SuspiciousIpGroup[],
  ipSwitcherGroups: IpSwitcherGroup[],
  geoFraudRows: GeoFraudRow[],
  dateRangeLabel: string
) {
  const HEADERS = [
    "IP Address",
    "Timestamp",
    "GCLID",
    "User Agent",
    "Keyword",
    "Campaign ID",
    "Ad Group ID",
    "Network",
    "Device",
    "Browser Cookie ID (Visitor ID)",
    "Browser Language",
    "Fraud Type",
  ]
    .map(csvCell)
    .join(",");

  // Collect rows, deduplicating by (ip + gclid + timestamp)
  const seen = new Set<string>();
  const csvRows: string[] = [];

  function addRow(
    ip: string,
    ts: string,
    gclid: string | null,
    ua: string | null | undefined,
    keyword: string | null | undefined,
    campaignId: string | null | undefined,
    adgroupId: string | null | undefined,
    network: string | null | undefined,
    device: string | null | undefined,
    visitorId: string | null | undefined,
    browserLang: string | null | undefined,
    fraudType: string
  ) {
    if (!gclid) return; // Google Ads only accepts GCLID rows
    const key = `${ip}|${gclid}|${ts}`;
    if (seen.has(key)) return;
    seen.add(key);
    csvRows.push(
      [
        csvCell(ip),
        csvCell(fmtTimestamp(ts)),
        csvCell(gclid),
        csvCell(ua),
        csvCell(keyword),
        csvCell(campaignId),
        csvCell(adgroupId),
        csvCell(network),
        csvCell(device),
        csvCell(visitorId),
        csvCell(browserLang),
        csvCell(fraudType),
      ].join(",")
    );
  }

  for (const g of gclidGroups) {
    for (const r of g.gclid_rows) {
      addRow(
        r.ip_address,
        r.created_at,
        r.gclid,
        r.user_agent,
        r.keyword,
        r.campaign_id,
        r.adgroup_id,
        r.network,
        r.vt_device,
        r.visitor_id,
        r.browser_language,
        "Multiple GCLIDs from same IP"
      );
    }
  }

  for (const g of ipSwitcherGroups) {
    for (const r of g.rows) {
      addRow(
        r.ip_address,
        r.created_at,
        r.gclid,
        r.user_agent,
        r.keyword,
        r.campaign_id,
        r.adgroup_id,
        r.network,
        r.vt_device,
        r.visitor_id,
        r.browser_language,
        `IP Rotation (${g.unique_ip_count} IPs, Cookie: ${g.visitor_id.slice(0, 8)}…)`
      );
    }
  }

  for (const r of geoFraudRows) {
    const countryName = COUNTRY_NAMES[r.country] ?? r.country;
    addRow(
      r.ip_address,
      r.created_at,
      r.gclid,
      r.user_agent,
      r.keyword,
      r.campaign_id,
      r.adgroup_id,
      r.network,
      r.vt_device,
      r.visitor_id,
      r.browser_language,
      `Geographic Targeting Violation — Campaign targets Israel (IL) only; paid click from ${r.country} (${countryName}). GCLID charged for out-of-target impression.`
    );
  }

  const csv = "\uFEFF" + [HEADERS, ...csvRows].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const dateStr = new Date()
    .toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })
    .replace(/\//g, "-");
  a.download = `google-ads-investigation-${dateRangeLabel.replace(/[^a-z0-9]/gi, "_")}-${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Copy IP button ─────────────────────────────────────────────────────────────
function CopyIpButton({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ip);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = ip;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs bg-white border border-red-200 hover:bg-red-50 text-red-700 px-2 py-1 rounded-md transition whitespace-nowrap"
      title="העתק IP לחסימה בגוגל אדס"
    >
      {copied ? "✓ הועתק" : "📋 העתק IP"}
    </button>
  );
}

// ── Main Panel ─────────────────────────────────────────────────────────────────
export function SuspiciousIpsPanel({
  gclidGroups,
  ipSwitcherGroups,
  geoFraudRows,
  dateRangeLabel,
}: {
  gclidGroups: SuspiciousIpGroup[];
  ipSwitcherGroups: IpSwitcherGroup[];
  geoFraudRows: GeoFraudRow[];
  dateRangeLabel: string;
}) {
  const totalSuspicious =
    gclidGroups.length + ipSwitcherGroups.length + geoFraudRows.length;
  const hasAnyGclid =
    gclidGroups.flatMap((g) => g.gclid_rows).some((r) => r.gclid) ||
    ipSwitcherGroups.flatMap((g) => g.rows).some((r) => r.gclid) ||
    geoFraudRows.length > 0;

  return (
    <div className="bg-red-50 border-2 border-red-300 rounded-xl shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-red-200 flex flex-wrap items-center justify-between gap-3 bg-red-100/60">
        <div>
          <h2 className="text-lg font-bold text-red-900">
            🚨 Suspicious Activity Detection
          </h2>
          <p className="text-xs text-red-700 mt-0.5">
            {totalSuspicious === 0
              ? `אין פעילות חשודה — ${dateRangeLabel}`
              : [
                  gclidGroups.length > 0
                    ? `${gclidGroups.length} IPs עם GCLID כפול`
                    : null,
                  ipSwitcherGroups.length > 0
                    ? `${ipSwitcherGroups.length} מסובבי IP`
                    : null,
                  geoFraudRows.length > 0
                    ? `${geoFraudRows.length} קליקים מחו"ל`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" + ") + ` — ${dateRangeLabel}`}
          </p>
        </div>
        {hasAnyGclid && (
          <button
            type="button"
            onClick={() =>
              exportGoogleAdsReport(gclidGroups, ipSwitcherGroups, geoFraudRows, dateRangeLabel)
            }
            className="text-sm bg-white border border-red-300 hover:bg-red-50 text-red-800 font-medium px-4 py-2 rounded-lg shadow-sm transition whitespace-nowrap"
          >
            📥 ייצוא דוח חקירה לגוגל אדס (CSV)
          </button>
        )}
      </div>

      {totalSuspicious === 0 ? (
        <p className="px-5 py-8 text-center text-red-600/70 text-sm">
          אין פעילות חשודה בטווח הנבחר.
        </p>
      ) : (
        <div className="divide-y divide-red-100">

          {/* ── Section 1: GCLID Fraud (same IP, multiple GCLIDs) ── */}
          {gclidGroups.length > 0 && (
            <div>
              <div className="px-5 py-3 bg-red-100/30">
                <p className="text-xs font-semibold text-red-800 uppercase tracking-wide">
                  🎟️ GCLID כפול מאותו IP ({gclidGroups.length})
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-red-100/40 text-red-800 text-xs uppercase tracking-wide border-b border-red-200">
                      <th className="px-4 py-3 text-right font-medium">IP</th>
                      <th className="px-4 py-3 text-center font-medium">קליקים</th>
                      <th className="px-4 py-3 text-right font-medium">GCLID אחרון</th>
                      <th className="px-4 py-3 text-right font-medium">זמן אחרון</th>
                      <th className="px-4 py-3 text-center font-medium">מכשיר</th>
                      <th className="px-4 py-3 text-center font-medium">פעולה</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {gclidGroups.map((g) => {
                      const dev = getDeviceDisplay(null, g.latest_user_agent);
                      return (
                        <tr key={g.ip_address} className="hover:bg-red-100/30">
                          <td className="px-4 py-3 font-mono text-red-900 text-xs whitespace-nowrap font-semibold">
                            {g.ip_address}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center justify-center min-w-[2rem] bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {g.gclid_visit_count}
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 font-mono text-violet-800 text-xs max-w-[140px] truncate"
                            title={g.latest_gclid}
                          >
                            {g.latest_gclid.slice(0, 18)}…
                          </td>
                          <td className="px-4 py-3 text-red-800 text-xs whitespace-nowrap">
                            {fmtDisplay(g.latest_at)}
                          </td>
                          <td
                            className="px-4 py-3 text-xs whitespace-nowrap"
                            title={g.latest_user_agent ?? undefined}
                          >
                            <span className="inline-flex items-center gap-1 cursor-help">
                              <span className="text-base leading-none">{dev.icon}</span>
                              {dev.text && (
                                <span className="text-red-800/80">{dev.text}</span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <CopyIpButton ip={g.ip_address} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Section 2: IP Rotation (same visitor_id, multiple IPs) ── */}
          {ipSwitcherGroups.length > 0 && (
            <div>
              <div className="px-5 py-3 bg-orange-100/40">
                <p className="text-xs font-semibold text-orange-800 uppercase tracking-wide">
                  🔄 IP Rotation Detected — אותו דפדפן, IPs שונים ({ipSwitcherGroups.length})
                </p>
                <p className="text-xs text-orange-700 mt-0.5">
                  אותו Cookie ID (Visitor ID) זוהה עם מספר כתובות IP שונות — מעיד על שימוש ב-VPN או סיבוב IP סלולרי
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-orange-100/40 text-orange-800 text-xs uppercase tracking-wide border-b border-orange-200">
                      <th className="px-4 py-3 text-right font-medium">Cookie ID (Visitor)</th>
                      <th className="px-4 py-3 text-center font-medium">IPs שונים</th>
                      <th className="px-4 py-3 text-right font-medium">כתובות IP</th>
                      <th className="px-4 py-3 text-right font-medium">זמן אחרון</th>
                      <th className="px-4 py-3 text-center font-medium">מכשיר</th>
                      <th className="px-4 py-3 text-center font-medium">פעולה</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {ipSwitcherGroups.map((g) => {
                      const dev = getDeviceDisplay(null, g.latest_user_agent);
                      return (
                        <tr key={g.visitor_id} className="hover:bg-orange-50/50">
                          <td
                            className="px-4 py-3 font-mono text-orange-900 text-xs whitespace-nowrap font-semibold max-w-[160px] truncate"
                            title={g.visitor_id}
                          >
                            {g.visitor_id.slice(0, 16)}…
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center justify-center min-w-[2rem] bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {g.unique_ip_count}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs max-w-[200px]">
                            <div className="flex flex-wrap gap-1">
                              {g.unique_ips.map((ip) => (
                                <span
                                  key={ip}
                                  className="inline-block font-mono bg-orange-50 border border-orange-200 text-orange-800 px-1.5 py-0.5 rounded text-[10px]"
                                >
                                  {ip}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-orange-800 text-xs whitespace-nowrap">
                            {fmtDisplay(g.latest_at)}
                          </td>
                          <td
                            className="px-4 py-3 text-xs whitespace-nowrap"
                            title={g.latest_user_agent ?? undefined}
                          >
                            <span className="inline-flex items-center gap-1 cursor-help">
                              <span className="text-base leading-none">{dev.icon}</span>
                              {dev.text && (
                                <span className="text-orange-800/80">{dev.text}</span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 border border-orange-300 text-xs px-2 py-1 rounded-md whitespace-nowrap font-medium"
                              title="דווח כל IP בנפרד לגוגל אדס"
                            >
                              🔄 IP Rotation
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Section 3: Geographic Targeting Violations ── */}
          {geoFraudRows.length > 0 && (
            <div>
              <div className="px-5 py-3 bg-purple-100/40">
                <p className="text-xs font-semibold text-purple-800 uppercase tracking-wide">
                  🌍 הונאה גיאוגרפית — קליקים ממומנים מחוץ לישראל ({geoFraudRows.length})
                </p>
                <p className="text-xs text-purple-700 mt-0.5">
                  הקמפיין מוגדר לישראל בלבד — קליקים אלה עם GCLID חויבו על אף שמקורם מחו"ל. זכאים להחזר מגוגל.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-purple-100/40 text-purple-800 text-xs uppercase tracking-wide border-b border-purple-200">
                      <th className="px-4 py-3 text-right font-medium">IP</th>
                      <th className="px-4 py-3 text-right font-medium">מדינה</th>
                      <th className="px-4 py-3 text-right font-medium">GCLID</th>
                      <th className="px-4 py-3 text-right font-medium">זמן</th>
                      <th className="px-4 py-3 text-right font-medium">מילת מפתח</th>
                      <th className="px-4 py-3 text-center font-medium">מכשיר</th>
                      <th className="px-4 py-3 text-center font-medium">פעולה</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {geoFraudRows.map((r) => {
                      const dev = getDeviceDisplay(null, r.user_agent);
                      const flag = countryFlag(r.country);
                      const countryName = COUNTRY_NAMES[r.country] ?? r.country;
                      return (
                        <tr key={r.id} className="hover:bg-purple-50/50">
                          <td className="px-4 py-3 font-mono text-purple-900 text-xs whitespace-nowrap font-semibold">
                            {r.ip_address}
                          </td>
                          <td className="px-4 py-3 text-xs whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 bg-purple-100 border border-purple-300 text-purple-800 px-2 py-0.5 rounded-full font-medium">
                              {flag} {countryName} ({r.country})
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 font-mono text-violet-800 text-xs max-w-[140px] truncate"
                            title={r.gclid}
                          >
                            {r.gclid.slice(0, 18)}…
                          </td>
                          <td className="px-4 py-3 text-purple-800 text-xs whitespace-nowrap">
                            {fmtDisplay(r.created_at)}
                          </td>
                          <td className="px-4 py-3 text-xs max-w-[160px] truncate text-purple-900">
                            {r.keyword ? `🎯 ${r.keyword}` : <span className="text-gray-300">—</span>}
                          </td>
                          <td
                            className="px-4 py-3 text-xs whitespace-nowrap text-center"
                            title={r.user_agent ?? undefined}
                          >
                            <span className="inline-flex items-center gap-1 cursor-help">
                              <span className="text-base leading-none">{dev.icon}</span>
                              {dev.text && (
                                <span className="text-purple-800/80">{dev.text}</span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <CopyIpButton ip={r.ip_address} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
