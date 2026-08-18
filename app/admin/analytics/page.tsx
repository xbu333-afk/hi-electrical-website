import { getVisitorLogsForRange } from "@/lib/analytics-logs";
import type { VisitorRow } from "@/lib/visitor-row";
import { DashboardClient } from "@/app/components/DashboardClient";
import { getGoogleAdsReportMeta } from "@/lib/google-ads-report-meta";
import { getIsraelStartOfDay } from "@/lib/visitor-logs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
          <p className="text-sm font-semibold text-red-700 mb-2">
            פרטי השגיאה (לצורך דיבוג):
          </p>
          <pre className="text-xs text-red-800 whitespace-pre-wrap break-all font-mono leading-relaxed">
            {msg}
          </pre>
        </div>
        <p className="text-sm text-slate-500">
          בדוק שכל משתני הסביבה מוגדרים ב-Vercel ושהרצת את כל המיגרציות
          ב-Supabase (001–007).
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

export default async function AnalyticsDashboard() {
  let logs: VisitorRow[] = [];
  let warning: string | null = null;
  let fatalError: unknown = null;

  try {
    const result = await getVisitorLogsForRange(getIsraelStartOfDay(), new Date());
    logs = result.rows;
    warning = result.warning;
  } catch (e) {
    console.error("[analytics] fatal:", e);
    fatalError = e;
  }

  if (fatalError) return <ErrorScreen error={fatalError} />;

  return <DashboardClient allRows={logs} warning={warning} reportMeta={getGoogleAdsReportMeta()} />;
}
