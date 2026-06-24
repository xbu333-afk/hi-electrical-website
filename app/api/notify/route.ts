import { type NextRequest } from "next/server";
import { extractClientIp } from "@/lib/client-ip";
import {
  insertVisitorLog,
  updateVisitorLog,
  appendPageToLog,
  getVisitorHistoryByIp,
  type VisitorDevice,
  type VisitorHistory,
} from "@/lib/visitor-logs";
import {
  sendPushover,
  buildVisitorNotification,
  buildClickNotification,
} from "@/lib/pushover";
import {
  normalizeValueTrackPayload,
  type ValueTrackParams,
} from "@/lib/valuetrack";

/** Keep the handler alive until Pushover/Supabase finish (Vercel serverless). */
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMERGENCY_PATHS = ["/emergency", "/fast-service", "/welcome"];

type EnterPayload = {
  event: "enter";
  visitor_id: string;
  page_path: string;
  source: "mumooman" | "organic";
  gclid?: string | null;
  browser_language?: string | null;
} & Partial<ValueTrackParams>;

type NotifyPayload =
  | EnterPayload
  | { event: "navigate"; log_id: number; page_path: string }
  | {
      event: "exit";
      log_id?: number;
      duration?: number;
      clicked_action?: boolean;
    }
  | {
      event: "click";
      page_path: string;
      source: "mumooman" | "organic";
      log_id?: number;
      gclid?: string | null;
    };

function getIp(req: NextRequest): string {
  return extractClientIp(req.headers);
}

/** If DB insert failed, the count queries won't include this visit — add 1. */
function withCurrentVisit(
  history: VisitorHistory,
  insertSucceeded: boolean
): VisitorHistory {
  if (insertSucceeded) return history;
  return {
    today_count: history.today_count + 1,
    week_count: history.week_count + 1,
    total_count: history.total_count + 1,
  };
}

function getDevice(req: NextRequest): VisitorDevice {
  const ua = req.headers.get("user-agent") ?? "";
  return /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
  )
    ? "mobile"
    : "desktop";
}

function getCity(req: NextRequest): string | null {
  const raw = req.headers.get("x-vercel-ip-city")?.trim();
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}


export async function POST(req: NextRequest) {
  try {
    const body: NotifyPayload = await req.json();
    const ip = getIp(req);

    // ── EXIT ────────────────────────────────────────────────────────────────
    if (body.event === "exit") {
      if (body.log_id) {
        try {
          await updateVisitorLog(body.log_id, {
            duration: body.duration,
            clicked_action: body.clicked_action,
          });
        } catch (e) {
          console.error("[notify:exit]", e);
        }
      }
      return Response.json({ ok: true });
    }

    // ── NAVIGATE — DB only, no Pushover ─────────────────────────────────────
    if (body.event === "navigate") {
      if (body.log_id) {
        try {
          await appendPageToLog(body.log_id, body.page_path);
        } catch (e) {
          console.error("[notify:navigate]", e);
        }
      }
      return Response.json({ ok: true });
    }

    // ── CLICK — DB update + Pushover (always awaited) ───────────────────────
    if (body.event === "click") {
      if (body.log_id) {
        try {
          await updateVisitorLog(body.log_id, { clicked_action: true });
        } catch (e) {
          console.error("[notify:click DB]", e);
        }
      }

      try {
        await sendPushover(
          buildClickNotification({
            pagePath: body.page_path,
            ip,
            source: body.source,
          })
        );
      } catch (e) {
        console.error("[notify:click pushover]", e);
      }

      return Response.json({ ok: true });
    }

    // ── ENTER — DB insert + single Pushover ─────────────────────────────────
    const device = getDevice(req);
    const city = getCity(req);
    const userAgent = req.headers.get("user-agent") ?? null;
    const referrer =
      req.headers.get("referer") ?? req.headers.get("referrer") ?? null;
    const gclid = body.gclid ?? null;
    const browserLanguage = body.browser_language?.trim() || null;
    const valueTrack = normalizeValueTrackPayload(body);

    // 1) Supabase insert — failures must not block Pushover
    let log_id: number | undefined;
    try {
      log_id = await insertVisitorLog({
        visitor_id: body.visitor_id,
        ip_address: ip,
        page_path: body.page_path,
        source: body.source,
        device,
        city,
        gclid,
        user_agent: userAgent,
        referrer,
        browser_language: browserLanguage,
        ...valueTrack,
        clicked_action: false,
      });
    } catch (e) {
      console.error("[notify:enter DB] insert failed:", {
        message: e instanceof Error ? e.message : String(e),
        code:
          e && typeof e === "object" && "code" in e
            ? (e as { code?: string }).code
            : undefined,
        details:
          e && typeof e === "object" && "details" in e
            ? (e as { details?: string }).details
            : undefined,
        hint:
          e && typeof e === "object" && "hint" in e
            ? (e as { hint?: string }).hint
            : undefined,
        payload: {
          visitor_id: body.visitor_id,
          page_path: body.page_path,
          source: body.source,
          ip,
          device,
          city,
          gclid,
        },
      });
    }

    // 2) Visitor history by IP — failures must not block Pushover
    let history: VisitorHistory = { today_count: 1, week_count: 1, total_count: 1 };
    try {
      const counts = await getVisitorHistoryByIp(ip);
      history = withCurrentVisit(counts, log_id != null);
      if (history.today_count < 1) {
        history = { today_count: 1, week_count: 1, total_count: 1 };
      }
    } catch (e) {
      console.error("[notify:enter] getVisitorHistoryByIp failed:", {
        message: e instanceof Error ? e.message : String(e),
        ip,
      });
    }

    const isEmergencyPage = EMERGENCY_PATHS.some((p) =>
      body.page_path.startsWith(p)
    );

    // 3) Send Pushover for every enter event
    try {
      await sendPushover(
        buildVisitorNotification({
          source: body.source,
          pagePath: body.page_path,
          ip,
          history,
          device,
          city,
          gclid,
          userAgent,
          referrer,
          isEmergencyPage,
          keyword: valueTrack.keyword,
          network: valueTrack.network,
          match_type: valueTrack.match_type,
        })
      );
    } catch (e) {
      console.error("[notify:enter pushover]", e);
    }

    return Response.json({ ok: true, log_id });
  } catch (err) {
    console.error("[notify] unhandled error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
