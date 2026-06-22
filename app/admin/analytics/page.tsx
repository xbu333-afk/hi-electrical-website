import { getSupabaseAdmin } from "@/lib/supabase";
import { formatPageLabel } from "@/lib/page-labels";

interface VisitorRow {
  id: number;
  ip_address: string;
  page_path: string;
  pages_visited: string[] | null;
  source: string;
  device: string | null;
  city: string | null;
  duration: number | null;
  clicked_action: boolean;
  created_at: string;
}

async function getLogs(): Promise<VisitorRow[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("visitor_logs")
      .select("id, ip_address, page_path, pages_visited, source, device, city, duration, clicked_action, created_at")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw error;
    return (data as VisitorRow[]) ?? [];
  } catch (e) {
    console.error("[analytics]", e);
    return [];
  }
}

function startOfDay() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isToday(iso: string) {
  return new Date(iso) >= startOfDay();
}

function getSuspiciousIps(logs: VisitorRow[]): Set<string> {
  const counts = new Map<string, number>();
  logs.filter((r) => isToday(r.created_at)).forEach((r) => {
    counts.set(r.ip_address, (counts.get(r.ip_address) ?? 0) + 1);
  });
  const s = new Set<string>();
  counts.forEach((v, k) => { if (v > 2) s.add(k); });
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

export default async function AnalyticsDashboard() {
  const logs = await getLogs();
  const suspIps = getSuspiciousIps(logs);

  const todayLogs = logs.filter((r) => isToday(r.created_at));
  const totalToday = todayLogs.length;
  const paidToday = todayLogs.filter((r) => r.source === "mumooman").length;
  const clickedToday = todayLogs.filter((r) => r.clicked_action).length;

  return (
    <div dir="rtl" className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">📊 דשבורד ניטור</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              ח.י שירותי חשמל —{" "}
              {new Date().toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })}
            </p>
          </div>
          <a
            href="/admin/auth/signout"
            className="text-sm bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition"
          >
            התנתק
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="כניסות היום" value={totalToday} color="blue" />
          <StatCard label="ממומן היום" value={paidToday} color="yellow" />
          <StatCard label="יצרו קשר" value={clickedToday} color="green" />
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
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center text-slate-400">
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

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-white border-blue-100 text-blue-700",
    yellow: "bg-white border-amber-100 text-amber-700",
    green: "bg-white border-emerald-100 text-emerald-700",
    red: "bg-white border-red-100 text-red-700",
  };
  const labelColors: Record<string, string> = {
    blue: "text-blue-500",
    yellow: "text-amber-500",
    green: "text-emerald-500",
    red: "text-red-500",
  };
  return (
    <div className={`rounded-xl border shadow-sm p-5 flex flex-col gap-1 ${colors[color]}`}>
      <span className="text-3xl font-bold">{value}</span>
      <span className={`text-xs font-medium ${labelColors[color]}`}>{label}</span>
    </div>
  );
}
