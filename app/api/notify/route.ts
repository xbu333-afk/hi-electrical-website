import { type NextRequest } from "next/server";
import {
  insertVisitorLog,
  updateVisitorLog,
  countTodayVisitsByIp,
} from "@/lib/visitor-logs";
import {
  sendPushover,
  buildVisitorNotification,
  buildClickNotification,
} from "@/lib/pushover";

const EMERGENCY_PATHS = ["/emergency", "/fast-service", "/welcome"];

type NotifyPayload =
  | { event: "enter"; visitor_id: string; page_path: string; source: "mumooman" | "organic"; send_pushover?: boolean }
  | { event: "exit"; log_id?: number; duration?: number; clicked_action?: boolean }
  | { event: "click"; visitor_id: string; page_path: string; source: "mumooman" | "organic"; log_id?: number };

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
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

    // ── CLICK — immediate "יצר קשר" notification ────────────────────────────
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

    // ── ENTER ────────────────────────────────────────────────────────────────
    let log_id: number | undefined;
    try {
      log_id = await insertVisitorLog({
        visitor_id: body.visitor_id,
        ip_address: ip,
        page_path: body.page_path,
        source: body.source,
        clicked_action: false,
      });
    } catch (e) {
      console.error("[notify:enter DB]", e);
    }

    let todayCount = 1;
    try {
      todayCount = await countTodayVisitsByIp(ip);
    } catch {
      // non-fatal
    }

    if (body.send_pushover !== false) {
      const isEmergencyPage = EMERGENCY_PATHS.some((p) =>
        body.page_path.startsWith(p)
      );
      sendPushover(
        buildVisitorNotification({
          source: body.source,
          pagePath: body.page_path,
          ip,
          todayCount,
          isEmergencyPage,
        })
      ).catch((e) => console.error("[notify:enter pushover]", e));
    }

    return Response.json({ ok: true, log_id });
  } catch (err) {
    console.error("[notify] unhandled error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
