"use client";

export interface CsvRowData {
  created_at: string;
  ip_address: string;
  gclid: string | null;
  page_path: string;
  device: string | null;
  city: string | null;
  duration: number | null;
  user_agent: string | null;
  visitor_id: string;
}

function csvCell(val: string | null | undefined): string {
  const s = val ?? "";
  // Always wrap in quotes and escape inner quotes — safest for Excel + Google Sheets
  return `"${s.replace(/"/g, '""')}"`;
}

function fmtIsraelTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function ExportCsvButton({
  rows,
  totalCounts,
}: {
  rows: CsvRowData[];
  totalCounts: Record<string, number>;
}) {
  function handleExport() {
    const HEADERS = [
      "Click Timestamp (Israel Time)",
      "IP Address",
      "Google Click ID (GCLID)",
      "Target Page",
      "Device",
      "Estimated City",
      "Duration (Seconds)",
      "User Agent",
      "Total Lifetime Visits",
    ]
      .map(csvCell)
      .join(",");

    const csvRows = rows.map((r) =>
      [
        csvCell(fmtIsraelTimestamp(r.created_at)),
        csvCell(r.ip_address),
        csvCell(r.gclid),
        csvCell(r.page_path),
        csvCell(r.device),
        csvCell(r.city),
        csvCell(r.duration != null ? String(r.duration) : ""),
        csvCell(r.user_agent),
        csvCell(String(totalCounts[r.visitor_id] ?? 1)),
      ].join(",")
    );

    // BOM (\uFEFF) so Excel and Google Sheets open Hebrew text correctly
    const csv = "\uFEFF" + [HEADERS, ...csvRows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const dateStr = new Date()
      .toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })
      .replace(/\//g, "-");
    a.download = `google-ads-fraud-report-${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition whitespace-nowrap"
      title={`ייצוא ${rows.length} שורות לקובץ CSV`}
    >
      📥 ייצוא דוח הונאות (CSV)
    </button>
  );
}
