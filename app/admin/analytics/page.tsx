import { getSupabaseAdmin } from "@/lib/supabase";
import { formatPageLabel } from "@/lib/page-labels";
import { getIsraelStartOfDay } from "@/lib/visitor-logs";
import { ExportCsvButton } from "@/app/components/ExportCsvButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface VisitorRow {
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
  duration: number | null;
  clicked_action: boolean;
  created_at: string;
}

// Columns that may not exist yet (migrations 003 / 004).
const EXTENDED_COLS =
  "id, visitor_id, ip_address, page_path, pages_visited, source, device, city, gclid, user_agent, duration, clicked_action, created_at";
const BASE_COLS =
  "id, visitor_id, ip_address, page_path, source, duration, clicked_action, created_at";

async function getLogs(): Promise<{ rows: VisitorRow[]; warning: string | null }> {
  const admin = getSupabaseAdmin();

  // Try full query first (all columns incl. gclid, user_agent, device, city, pages_visited)
  const { data, error } = await admin
    .from("visitor_logs")
    .select(EXTENDED_COLS)
    .order("created_at", { ascending: false })
    .limit(300);

  if (!error) {
    return { rows: (data as VisitorRow[]) ?? [], warning: null };
  }

  const msg = (error as { message?: string }).message ?? "";
  const isColMissing =
    (error as { code?: string }).code === "PGRST204" ||
    /column.*does not exist/i.test(msg) ||
    /Could not find the .* column/i.test(msg);

  if (isColMissing) {
    // Fallback: base columns only — some migrations haven't been run yet
    const { data: baseData, error: baseError } = await admin
      .from("visitor_logs")
      .select(BASE_COLS)
      .order("created_at", { ascending: false })
      .limit(300);

    if (baseError) {
      throw new Error(
        `Supabase base query failed: ${(baseError as { message?: string }).message ?? JSON.stringify(baseError)}`
      );
    }

    const rows = ((baseData as Partial<VisitorRow>[]) ?? []).map((r) => ({
      id: r.id ?? 0,
      visitor_id: r.visitor_id ?? "",
      ip_address: r.ip_address ?? "",
      page_path: r.page_path ?? "",
      pages_visited: null,
      source: r.source ?? "organic",
      device: null,
      city: null,
      gclid: null,
      user_agent: null,
      duration: r.duration ?? null,
      clicked_action: r.clicked_action ?? false,
      created_at: r.created_at ?? "",
    }));

    return {
      rows,
      warning: `חלק מהעמודות החדשות חסרות בטבלה. הרץ את migrations 002-004 ב-Supabase. שגיאת Supabase: ${msg}`,
    };
  }

  // Unknown error — surface it
  throw new Error(
    `Supabase query failed: ${msg || JSON.stringify(error)}`
  );
}

async function safeGetTotalCounts(): Promise<Record<string, number>> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("visitor_logs")
      .select("visitor_id");

    if (error) {
      console.error("[analytics] getVisitorTotalCounts error:", error);
      return {};
    }

    const counts: Record<string, number> = {};
    for (const row of data ?? []) {
      const vid = (row as { visitor_id?: string }).visitor_id;
      if (vid) counts[vid] = (counts[vid] ?? 0) + 1;
    }
    return counts;
  } catch (e) {
    console.error("[analytics] getVisitorTotalCounts threw:", e);
    return {};
  }
}

function startOfDay() {
  return getIsraelStartOfDay();
}

function isToday(iso: string) {
  return new Date(iso) >= startOfDay();
}

function getSuspiciousIps(logs: VisitorRow[]): Set<string> {
  const counts = new Map<string, number>();
  logs
    .filter((r) => isToday(r.created_at))
    .forEach((r) => {
      counts.set(r.ip_address, (counts.get(r.ip_address) ?? 0) + 1);
    });
  const s = new Set<string>();
  counts.forEach((v, k) => {
    if (v > 2) s.add(k);
  });
  return s;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
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

function fmtDevice(device: string | null): { icon: string; label: string } {
  if (device === "mobile") return { icon: "📱", label: "נייד" };
  if (device === "desktop") return { icon: "💻", label: "מחשב" };
  return { icon: "—", label: "" };
}

// ── Error screen ─────────────────────────────────────────────────────────────

function ErrorScreen({ error }: { error: unknown }) {
  const msg =
    error instanceof Error
      ? error.message
      : typeof error === "object"
        ? JSON.stringify(error, null, 2)
        : String(error);

  return (
    <div dir="rtl" className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto mt-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚨</span>
          <h1 className="text-xl font-bold text-red-700">שגיאה בטעינת הדשבורד</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-red-700 mb-2">פרטי השגיאה (לצורך דיבוג):</p>
          <pre className="text-xs text-red-800 whitespace-pre-wrap break-all font-mono leading-relaxed">
            {msg}
          </pre>
        </div>
        <p className="text-sm text-slate-500">
          בדוק שכל משתני הסביבה מוגדרים ב-Vercel ושהרצת את כל המיגרציות ב-Supabase (001–004).
        </p>
        <a
          href="/admin/auth/signout"
          className="inline-block text-sm text-slate-600 underline"
        >
          התנתק
        </a>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default async function AnalyticsDashboard() {
  let logs: VisitorRow[] = [];
  let totalCounts: Record<string, number> = {};
  let warning: string | null = null;
  let fatalError: unknown = null;

  try {
    const [logsResult, counts] = await Promise.all([
      getLogs(),
      safeGetTotalCounts(),
    ]);
    logs = logsResult.rows;
    warning = logsResult.warning;
    totalCounts = counts;
  } catch (e) {
    console.error("[analytics] fatal:", e);
    fatalError = e;
  }

  if (fatalError) {
    return <ErrorScreen error={fatalError} />;
  }

  const suspIps = getSuspiciousIps(logs);
  const todayLogs = logs.filter((r) => isToday(r.created_at));
  const totalToday = todayLogs.length;
  const paidToday = todayLogs.filter((r) => r.source === "mumooman").length;
  const clickedToday = todayLogs.filter((r) => r.clicked_action).length;
  const gclidToday = todayLogs.filter((r) => r.gclid).length;

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
            <ExportCsvButton rows={logs} totalCounts={totalCounts} />
            <a
              href="/admin/auth/signout"
              className="text-sm bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition"
            >
              התנתק
            </a>
          </div>
        </div>

        {/* Migration warning banner */}
        {warning && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
            ⚠️ {warning}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label="כניסות היום" value={totalToday} color="blue" />
          <StatCard label="ממומן היום" value={paidToday} color="yellow" />
          <StatCard label="יצרו קשר" value={clickedToday} color="green" />
          <StatCard label="GCLIDs היום" value={gclidToday} color="purple" />
          <StatCard label="חשודים" value={suspIps.size} color="red" />
        </div>

        {/* Table */}
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
                  <th className="px-4 py-3 text-right font-medium">GCLID</th>
                  <th className="px-4 py-3 text-center font-medium">שהייה</th>
                  <th className="px-4 py-3 text-center font-medium">יצר קשר</th>
                  <th className="px-4 py-3 text-center font-medium">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((row) => {
                  const susp = suspIps.has(row.ip_address);
                  const pages = formatPages(row);
                  const dev = fmtDevice(row.device);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-50 transition-colors ${susp ? "bg-red-50" : ""}`}
                    >
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                        {fmt(row.created_at)}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700 text-xs whitespace-nowrap">
                        {row.ip_address}
                      </td>
                      <td
                        className="px-4 py-3 text-center text-xs whitespace-nowrap"
                        title={dev.label || undefined}
                      >
                        <span className="text-base leading-none">{dev.icon}</span>
                        {dev.label && (
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            {dev.label}
                          </span>
                        )}
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
                          <span className="text-emerald-600 font-bold text-sm">📞</span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {susp && (
                          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🕵️ חשוד
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {logs.length === 0 && !warning && (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center text-slate-400">
                      אין נתונים עדיין
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
