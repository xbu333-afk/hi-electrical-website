"use client";

import { useState } from "react";
import type {
  FraudClickRow,
  SuspiciousIpGroup,
} from "@/lib/fraud-detection";

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

function CopyIpButton({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = ip;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

function exportGoogleFraudCsv(clicks: FraudClickRow[]) {
  const headers = ["IP Address", "Timestamp", "GCLID", "User Agent"]
    .map(csvCell)
    .join(",");

  const rows = clicks.map((r) =>
    [
      csvCell(r.ip_address),
      csvCell(fmtTimestamp(r.created_at)),
      csvCell(r.gclid),
      csvCell(r.user_agent),
    ].join(",")
  );

  const csv = "\uFEFF" + [headers, ...rows].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const dateStr = new Date()
    .toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })
    .replace(/\//g, "-");
  a.download = `google-click-fraud-report-${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function SuspiciousIpsPanel({
  groups,
  lookbackHours,
}: {
  groups: SuspiciousIpGroup[];
  lookbackHours: number;
}) {
  const allClicks = groups.flatMap((g) => g.gclid_rows);

  return (
    <div className="bg-red-50 border-2 border-red-300 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-red-200 flex flex-wrap items-center justify-between gap-3 bg-red-100/60">
        <div>
          <h2 className="text-lg font-bold text-red-900">
            🚨 Suspicious IPs (Click Fraud Detection)
          </h2>
          <p className="text-xs text-red-700 mt-0.5">
            IPs עם יותר מקליק ממומן אחד (GCLID) ב-{lookbackHours} השעות האחרונות
            — מועמדים לדיווח לגוגל אדס
          </p>
        </div>
        {allClicks.length > 0 && (
          <button
            type="button"
            onClick={() => exportGoogleFraudCsv(allClicks)}
            className="text-sm bg-white border border-red-300 hover:bg-red-50 text-red-800 font-medium px-4 py-2 rounded-lg shadow-sm transition whitespace-nowrap"
          >
            📥 Export Google Fraud Report (CSV)
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <p className="px-5 py-8 text-center text-red-600/70 text-sm">
          אין IPs חשודים כרגע — לא זוהו מספר קליקים ממומנים מאותו IP בחלון הזמן.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-red-100/40 text-red-800 text-xs uppercase tracking-wide border-b border-red-200">
                <th className="px-4 py-3 text-right font-medium">IP</th>
                <th className="px-4 py-3 text-center font-medium">קליקים GCLID</th>
                <th className="px-4 py-3 text-right font-medium">GCLID אחרון</th>
                <th className="px-4 py-3 text-right font-medium">זמן אחרון</th>
                <th className="px-4 py-3 text-right font-medium">User-Agent</th>
                <th className="px-4 py-3 text-center font-medium">פעולה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {groups.map((g) => (
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
                    className="px-4 py-3 text-red-900/80 text-xs max-w-[200px] truncate"
                    title={g.latest_user_agent ?? undefined}
                  >
                    {g.latest_user_agent ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CopyIpButton ip={g.ip_address} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
