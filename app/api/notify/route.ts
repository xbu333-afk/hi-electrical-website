import { type NextRequest } from "next/server";
import {
  insertVisitorLog,
  updateVisitorLog,
  countTodayVisitsByIp,
} from "@/lib/visitor-logs";
import { sendPushover, buildVisitorNotification } from "@/lib/pushover";

const EMERGENCY_PATHS = ["/emergency", "/fast-service", "/welcome"];

type NotifyPayload = {
  event: "enter" | "exit";
  visitor_id: string;
  page_path: string;
  source: "mumooman" | "organic";
  log_id?: number;
  duration?: number;
  clicked_action?: boolean;
};

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body: NotifyPayload = await req.json();
    const ip = getClientIp(req);

    // ── EXIT event ───────────────────────────────────────────────────────────
    if (body.event === "exit") {
      if (body.log_id) {
        // Fire-and-forget — don't fail the response if DB is down
        updateVisitorLog(body.log_id, {
          duration: body.duration,
          clicked_action: body.clicked_action,
        }).catch((e) => console.error("[notify] exit update failed:", e));
      }
      return Response.json({ ok: true });
    }

    // ── ENTER event ──────────────────────────────────────────────────────────
    // DB logging — fire-and-forget so Pushover always sends even if DB fails
    let log_id: number | undefined;
    try {
      log_id = await insertVisitorLog({
        visitor_id: body.visitor_id,
        ip_address: ip,
        page_path: body.page_path,
        source: body.source,
        clicked_action: false,
      });
    } catch (dbErr) {
      console.error("[notify] DB insert failed (non-fatal):", dbErr);
    }

    // Count today visits for competitor detection (default 1 if DB fails)
    let todayCount = 1;
    try {
      todayCount = await countTodayVisitsByIp(ip);
    } catch {
      // ignore
    }

    const isEmergencyPage = EMERGENCY_PATHS.some((p) =>
      body.page_path.startsWith(p)
    );

    // Pushover — always send regardless of DB status
    const notification = buildVisitorNotification({
      source: body.source,
      pagePath: body.page_path,
      ip,
      visitorId: body.visitor_id,
      todayCount,
      isEmergencyPage,
    });
    sendPushover(notification).catch((e) =>
      console.error("[notify] pushover failed:", e)
    );

    return Response.json({ ok: true, log_id });
  } catch (err) {
    console.error("[notify] unhandled error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
