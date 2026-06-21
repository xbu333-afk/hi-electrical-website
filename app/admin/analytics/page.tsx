import { getSupabaseAdmin } from "@/lib/supabase";

interface VisitorRow {
  id: number;
  visitor_id: string;
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
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw error;
    return (data as VisitorRow[]) ?? [];
  } catch (e) {
    console.error("[analytics] fetch error:", e);
    return [];
  }
}

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isToday(iso: string) {
  return new Date(iso) >= today();
}

function suspicious(logs: VisitorRow[]): Set<string> {
  const counts = new Map<string, number>();
  for (const r of logs) {
    if (isToday(r.created_at))
      counts.set(r.ip_address, (counts.get(r.ip_address) ?? 0) + 1);
  }
  const s = new Set<string>();
  counts.forEach((v, k) => { if (v > 2) s.add(k); });
  return s;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit", month: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function AnalyticsDashboard() {
  const logs = await getLogs();
  const suspIps = suspicious(logs);

  const todayLogs = logs.filter(r => isToday(r.created_at));
  const totalToday = todayLogs.length;
  const paidToday = todayLogs.filter(r => r.source === "mumooman").length;
  const clickedToday = todayLogs.filter(r => r.clicked_action).length;
  const suspCount = suspIps.size;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">📊 דשבורד ניטור — ח.י חשמל</h1>
            <p className="text-slate-400 text-sm mt-1">300 הביקורים האחרונים</p>
          </div>
          <a
            href="/api/admin/logout"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg transition"
          >
            התנתק
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="כניסות היום" value={totalToday} color="blue" />
          <Card label="ממומן היום" value={paidToday} color="yellow" />
          <Card label="לחצו טלפון/WA" value={clickedToday} color="green" />
          <Card label="🛡️ חשודים" value={suspCount} color="red" />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-400 text-xs uppercase">
                  <th className="px-3 py-3 text-right">זמן</th>
                  <th className="px-3 py-3 text-right">IP</th>
                  <th className="px-3 py-3 text-right">עמוד</th>
                  <th className="px-3 py-3 text-right">מקור</th>
                  <th className="px-3 py-3 text-center">לחץ?</th>
                  <th className="px-3 py-3 text-right">שהייה</th>
                  <th className="px-3 py-3 text-center">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((row) => {
                  const isSusp = suspIps.has(row.ip_address);
                  return (
                    <tr key={row.id} className={`hover:bg-slate-800/50 transition ${isSusp ? "bg-red-950/20" : ""}`}>
                      <td className="px-3 py-2 text-slate-400 whitespace-nowrap text-xs">{fmt(row.created_at)}</td>
                      <td className="px-3 py-2 font-mono text-slate-300 text-xs whitespace-nowrap">{row.ip_address}</td>
                      <td className="px-3 py-2 text-slate-200 max-w-[140px] truncate text-xs">{row.page_path}</td>
                      <td className="px-3 py-2">
                        {row.source === "mumooman"
                          ? <span className="bg-yellow-900/50 text-yellow-300 text-xs px-2 py-0.5 rounded-full">📢 ממומן</span>
                          : <span className="bg-emerald-900/50 text-emerald-300 text-xs px-2 py-0.5 rounded-full">🌱 אורגני</span>
                        }
                      </td>
                      <td className="px-3 py-2 text-center">
                        {row.clicked_action
                          ? <span className="text-green-400 font-bold">✓</span>
                          : <span className="text-slate-600">—</span>
                        }
                      </td>
                      <td className="px-3 py-2 text-slate-400 text-xs whitespace-nowrap">
                        {row.duration != null ? `${row.duration}ש` : "—"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {isSusp && (
                          <span className="bg-red-900/60 text-red-300 text-xs px-2 py-0.5 rounded-full">🕵️ חשוד</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-500">אין נתונים עדיין</td>
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

function Card({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-900/40 border-blue-700/50 text-blue-300",
    yellow: "bg-yellow-900/40 border-yellow-700/50 text-yellow-300",
    green: "bg-green-900/40 border-green-700/50 text-green-300",
    red: "bg-red-900/40 border-red-700/50 text-red-300",
  };
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-1 ${colors[color]}`}>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  );
}
