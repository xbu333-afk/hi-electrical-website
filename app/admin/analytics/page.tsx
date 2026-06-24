import { getSupabaseAdmin } from "@/lib/supabase";
import { DashboardClient, type VisitorRow } from "@/app/components/DashboardClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Columns present after all migrations 001–007
const EXTENDED_COLS =
  "id, visitor_id, ip_address, page_path, pages_visited, source, device, city, gclid, user_agent, referrer, keyword, campaign_id, adgroup_id, creative, vt_device, loc_physical_ms, network, match_type, browser_language, duration, clicked_action, created_at";

// Columns guaranteed after migration 001 only
const BASE_COLS =
  "id, visitor_id, ip_address, page_path, source, duration, clicked_action, created_at";

const SIXTY_DAYS_ISO = () =>
  new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

async function getLogs(): Promise<{ rows: VisitorRow[]; warning: string | null }> {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from("visitor_logs")
    .select(EXTENDED_COLS)
    .gte("created_at", SIXTY_DAYS_ISO())
    .order("created_at", { ascending: false })
    .limit(5000);

  if (!error) {
    return { rows: (data as VisitorRow[]) ?? [], warning: null };
  }

  const msg = (error as { message?: string }).message ?? "";
  const isColMissing =
    (error as { code?: string }).code === "PGRST204" ||
    /column.*does not exist/i.test(msg) ||
    /Could not find the .* column/i.test(msg);

  if (isColMissing) {
    const { data: baseData, error: baseError } = await admin
      .from("visitor_logs")
      .select(BASE_COLS)
      .gte("created_at", SIXTY_DAYS_ISO())
      .order("created_at", { ascending: false })
      .limit(5000);

    if (baseError) {
      throw new Error(
        `Supabase base query failed: ${(baseError as { message?: string }).message ?? JSON.stringify(baseError)}`
      );
    }

    const rows = ((baseData as Partial<VisitorRow>[]) ?? []).map(
      (r): VisitorRow => ({
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
        referrer: null,
        keyword: null,
        campaign_id: null,
        adgroup_id: null,
        creative: null,
        vt_device: null,
        loc_physical_ms: null,
        network: null,
        match_type: null,
        browser_language: null,
        duration: r.duration ?? null,
        clicked_action: r.clicked_action ?? false,
        created_at: r.created_at ?? "",
      })
    );

    return {
      rows,
      warning: `חלק מהעמודות החדשות חסרות בטבלה. הרץ את migrations 002–007 ב-Supabase. שגיאת Supabase: ${msg}`,
    };
  }

  throw new Error(`Supabase query failed: ${msg || JSON.stringify(error)}`);
}

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
    const result = await getLogs();
    logs = result.rows;
    warning = result.warning;
  } catch (e) {
    console.error("[analytics] fatal:", e);
    fatalError = e;
  }

  if (fatalError) return <ErrorScreen error={fatalError} />;

  return <DashboardClient allRows={logs} warning={warning} />;
}
