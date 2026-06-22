import { getSupabaseAdmin } from "@/lib/supabase";
import { formatPageLabel } from "@/lib/page-labels";

interface VisitorRow {
  id: number;
  ip_address: string;
  page_path: string;
  source: string;
  duration: number | null;
  clicked_action: boolean;
  created_at: string;
}

async function getLogs(): Promise<VisitorRow[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("visitor_logs")
      .select("id, ip_address, page_path, source, duration, clicked_action, created_at")
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

function fmtDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds}ש`;
  return `${Math.floor(seconds / 60)}ד ${seconds % 60}ש`;
}

export default async function AnalyticsDashboard() {
  const logs = await getLogs();
  const suspIps = getSuspiciousIps(logs);

  const todayLogs = logs.filter((r) => isToday(r.created_at));
  const totalToday = todayLogs.length;
  const paidToday = todayLogs.filter((r) => r.source === "mumooman").length;
  const clickedToday = todayLogs.filter((r) => r.clicked_action).length;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">📊 דשבורד ניטור</h1>
            <p className="text-slate-400 text-sm mt-0.5">ח.י שירותי חשמל — {new Date().toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })}</p>
          </div>
          <a
            href="/admin/auth/signout"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition"
          >
            התנתק
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="כניסות היום" value={totalToday} color="blue" />
          <StatCard label="ממומן היום" value={paidToday} color="yellow" />
          <StatCard label="יצרו קשר" value={clickedToday} color="green" />
          <StatCard label="חשודים" value={suspIps.size} color="red" />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  <th className="px-3 py-3 text-right font-medium">שעה</th>
                  <th className="px-3 py-3 text-right font-medium">IP</th>
                  <th className="px-3 py-3 text-right font-medium">עמוד</th>
                  <th className="px-3 py-3 text-right font-medium">מקור</th>
                  <th className="px-3 py-3 text-center font-medium">שהייה</th>
                  <th className="px-3 py-3 text-center font-medium">יצר קשר</th>
                  <th className="px-3 py-3 text-center font-medium">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((row) => {
                  const susp = suspIps.has(row.ip_address);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-800/40 transition-colors ${susp ? "bg-red-950/20" : ""}`}
                    >
                      <td className="px-3 py-2 text-slate-400 text-xs whitespace-nowrap">
                        {fmt(row.created_at)}
                      </td>
                      <td className="px-3 py-2 font-mono text-slate-300 text-xs whitespace-nowrap">
                        {row.ip_address}
                      </td>
                      <td className="px-3 py-2 text-slate-200 text-xs max-w-[160px] truncate" title={row.page_path}>
                        {formatPageLabel(row.page_path)}
                      </td>
                      <td className="px-3 py-2">
                        {row.source === "mumooman" ? (
                          <span className="inline-flex items-center gap-1 bg-yellow-900/50 text-yellow-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🔴 ממומן
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-900/50 text-emerald-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🟢 אורגני
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-400 text-xs text-center whitespace-nowrap">
                        {fmtDuration(row.duration)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {row.clicked_action ? (
                          <span className="text-green-400 font-bold text-sm">📞</span>
                        ) : (
                          <span className="text-slate-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {susp && (
                          <span className="inline-flex items-center gap-1 bg-red-900/60 text-red-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            🕵️ חשוד
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
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
    blue: "bg-blue-900/30 border-blue-700/40 text-blue-300",
    yellow: "bg-yellow-900/30 border-yellow-700/40 text-yellow-300",
    green: "bg-green-900/30 border-green-700/40 text-green-300",
    red: "bg-red-900/30 border-red-700/40 text-red-300",
  };
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-1 ${colors[color]}`}>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs opacity-75">{label}</span>
    </div>
  );
}
