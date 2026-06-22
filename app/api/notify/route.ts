import { type NextRequest } from "next/server";
import {
  insertVisitorLog,
  updateVisitorLog,
  appendPageToLog,
  getVisitorHistory,
  type VisitorDevice,
} from "@/lib/visitor-logs";
import {
  sendPushover,
  buildVisitorNotification,
  buildClickNotification,
} from "@/lib/pushover";

const EMERGENCY_PATHS = ["/emergency", "/fast-service", "/welcome"];

type NotifyPayload =
  | {
      event: "enter";
      visitor_id: string;
      page_path: string;
      source: "mumooman" | "organic";
      gclid?: string | null;
    }
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
    };

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
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
        updateVisitorLog(body.log_id, {
          duration: body.duration,
          clicked_action: body.clicked_action,
        }).catch((e) => console.error("[notify:exit]", e));
      }
      return Response.json({ ok: true });
    }

    // ── NAVIGATE — DB only, no Pushover ─────────────────────────────────────
    if (body.event === "navigate") {
      if (body.log_id) {
        appendPageToLog(body.log_id, body.page_path).catch((e) =>
          console.error("[notify:navigate]", e)
        );
      }
      return Response.json({ ok: true });
    }

    // ── CLICK — DB update + Pushover ────────────────────────────────────────
    if (body.event === "click") {
      if (body.log_id) {
        updateVisitorLog(body.log_id, { clicked_action: true }).catch((e) =>
          console.error("[notify:click]", e)
        );
      }
      sendPushover(
        buildClickNotification({
          pagePath: body.page_path,
          ip,
          source: body.source,
        })
      ).catch((e) => console.error("[notify:click pushover]", e));
      return Response.json({ ok: true });
    }

    // ── ENTER — new row + single Pushover ───────────────────────────────────
    const device = getDevice(req);
    const city = getCity(req);
    const userAgent = req.headers.get("user-agent") ?? null;
    const gclid = body.gclid ?? null;

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
        },
      });
    }

    // Visitor history — based on visitor_id, includes the row just inserted
    let history = { today_count: 1, week_count: 1, total_count: 1 };
    try {
      history = await getVisitorHistory(body.visitor_id);
    } catch (e) {
      console.error("[notify:enter] getVisitorHistory failed:", {
        message: e instanceof Error ? e.message : String(e),
        visitor_id: body.visitor_id,
      });
    }

    const isEmergencyPage = EMERGENCY_PATHS.some((p) =>
      body.page_path.startsWith(p)
    );

    sendPushover(
      buildVisitorNotification({
        source: body.source,
        pagePath: body.page_path,
        ip,
        history,
        device,
        city,
        gclid,
        isEmergencyPage,
      })
    ).catch((e) => console.error("[notify:enter pushover]", e));

    return Response.json({ ok: true, log_id });
  } catch (err) {
    console.error("[notify] unhandled error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
