import { getSupabaseAdmin } from "@/lib/supabase";
import { redirect } from "next/navigation";

interface VisitorRow {
  id: string;
  visitor_id: string;
  ip_address: string;
  page_path: string;
  source: string;
  duration: number | null;
  clicked_action: boolean;
  created_at: string;
}

async function getRecentLogs(): Promise<VisitorRow[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("[analytics] fetch error:", error.message);
    return [];
  }
  return (data as VisitorRow[]) ?? [];
}

async function getSuspiciousIps(): Promise<Set<string>> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { data, error } = await getSupabaseAdmin()
    .from("visitor_logs")
    .select("ip_address")
    .gte("created_at", startOfDay.toISOString());

  if (error || !data) return new Set();

  const counts = new Map<string, number>();
  for (const row of data) {
    counts.set(row.ip_address, (counts.get(row.ip_address) ?? 0) + 1);
  }

  const suspicious = new Set<string>();
  for (const [ip, count] of counts) {
    if (count > 2) suspicious.add(ip);
  }
  return suspicious;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AnalyticsDashboard() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) redirect("/admin/login");

  const [logs, suspiciousIps] = await Promise.all([
    getRecentLogs(),
    getSuspiciousIps(),
  ]);

  const totalToday = logs.filter((r) => {
    const d = new Date(r.created_at);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }).length;

  const paidToday = logs.filter((r) => {
    const d = new Date(r.created_at);
    const now = new Date();
    return (
      r.source === "mumooman" &&
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }).length;

  const clickedToday = logs.filter((r) => {
    const d = new Date(r.created_at);
    const now = new Date();
    return (
      r.clicked_action &&
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }).length;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[999] overflow-auto bg-slate-950 text-slate-100 p-6 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              📊 דשבורד ניטור — ח.י חשמל
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              200 הביקורים האחרונים | מתעדכן בכל רענון
            </p>
          </div>
          <form action="/admin/auth/signout" method="POST">
            <button
              type="submit"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg transition"
            >
              התנתק
            </button>
          </form>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="כניסות היום" value={totalToday} color="blue" />
          <StatCard label="ממומן היום" value={paidToday} color="yellow" />
          <StatCard label="לחצו טלפון" value={clickedToday} color="green" />
          <StatCard
            label="חשודים היום"
            value={suspiciousIps.size}
            color="red"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-right">זמן</th>
                  <th className="px-4 py-3 text-right">IP</th>
                  <th className="px-4 py-3 text-right">עמוד</th>
                  <th className="px-4 py-3 text-right">מקור</th>
                  <th className="px-4 py-3 text-center">לחץ?</th>
                  <th className="px-4 py-3 text-right">זמן באתר</th>
                  <th className="px-4 py-3 text-center">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((row) => {
                  const isSuspicious = suspiciousIps.has(row.ip_address);
                  return (
                    <tr
                      key={row.id}
                      className={`transition hover:bg-slate-800/50 ${
                        isSuspicious ? "bg-red-950/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {formatDate(row.created_at)}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">
                        {row.ip_address}
                      </td>
                      <td className="px-4 py-3 text-slate-200 max-w-[160px] truncate">
                        {row.page_path}
                      </td>
                      <td className="px-4 py-3">
                        <SourceBadge source={row.source} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.clicked_action ? (
                          <span className="text-green-400 font-bold">✓</span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {row.duration != null
                          ? `${Math.round(row.duration / 1000)}ש`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isSuspicious && (
                          <span className="inline-flex items-center gap-1 bg-red-900/60 text-red-300 text-xs px-2 py-0.5 rounded-full">
                            🛡️ חשוד
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {logs.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-slate-500"
                    >
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
  color: "blue" | "yellow" | "green" | "red";
}) {
  const colors = {
    blue: "bg-blue-900/40 border-blue-700/50 text-blue-300",
    yellow: "bg-yellow-900/40 border-yellow-700/50 text-yellow-300",
    green: "bg-green-900/40 border-green-700/50 text-green-300",
    red: "bg-red-900/40 border-red-700/50 text-red-300",
  };
  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-1 ${colors[color]}`}
    >
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  if (source === "mumooman") {
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-900/50 text-yellow-300 text-xs px-2 py-0.5 rounded-full">
        📢 ממומן
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-emerald-900/50 text-emerald-300 text-xs px-2 py-0.5 rounded-full">
      🌱 אורגני
    </span>
  );
}
