import { NextResponse, type NextRequest } from "next/server";
import { extractClientIp } from "@/lib/client-ip";
import {
  insertVisitorLog,
  updateVisitorLog,
  appendPageToLog,
  getVisitorHistoryByIp,
  isGclidAlreadyLogged,
  type VisitorDevice,
  type VisitorHistory,
} from "@/lib/visitor-logs";
import {
  sendPushover,
  buildVisitorNotification,
  buildClickNotification,
  buildGeoFraudNotification,
  buildDesktopFraudNotification,
} from "@/lib/pushover";
import { isDesktopPaidClick, isPaidAdClick } from "@/lib/fraud-detection";
import {
  computeEntryRisk,
  saveFraudScore,
  type DeviceRisk,
} from "@/lib/fraud-score";
import { isGoogleSystemBot } from "@/lib/user-agent";
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
  device_fingerprint?: string | null;
  /** navigator.webdriver === true */
  automation?: boolean;
} & Partial<ValueTrackParams>;

type ExitFields = {
  log_id?: number;
  duration?: number;
  clicked_action?: boolean;
  touch_count?: number;
  scroll_pct?: number;
  first_interaction_ms?: number | null;
};
/** "exit" = tab hidden / page closed; "ping" = periodic heartbeat. Same handling. */
type ExitPayload = { event: "exit" } & ExitFields;
type PingPayload = { event: "ping" } & ExitFields;

type NotifyPayload =
  | EnterPayload
  | { event: "navigate"; log_id: number; page_path: string }
  | ExitPayload
  | PingPayload
  | {
      event: "click";
      page_path: string;
      source: "mumooman" | "organic";
      log_id?: number;
      gclid?: string | null;
    };

/** Second device identifier: server-set HttpOnly first-party cookie. */
const DEVICE_COOKIE = "hi_dev";
const DEVICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // ~13 months (browser max)
const DEVICE_COOKIE_RE = /^[A-Za-z0-9-]{8,80}$/;

function readDeviceCookie(req: NextRequest): {
  value: string;
  existed: boolean;
} {
  const raw = req.cookies.get(DEVICE_COOKIE)?.value?.trim();
  if (raw && DEVICE_COOKIE_RE.test(raw)) return { value: raw, existed: true };
  return { value: crypto.randomUUID(), existed: false };
}

function clampInt(v: unknown, min: number, max: number): number | undefined {
  if (typeof v !== "number" || !Number.isFinite(v)) return undefined;
  return Math.min(max, Math.max(min, Math.round(v)));
}

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

function getCountry(req: NextRequest): string | null {
  return req.headers.get("x-vercel-ip-country")?.toUpperCase().trim() ?? null;
}


export async function POST(req: NextRequest) {
  try {
    const body: NotifyPayload = await req.json();
    const ip = getIp(req);

    // ── EXIT / PING — duration + engagement ─────────────────────────────────
    if (body.event === "exit" || body.event === "ping") {
      if (body.log_id) {
        try {
          const duration = clampInt(body.duration, 0, 86_400);
          const touchCount = clampInt(body.touch_count, 0, 999);
          const scrollPct = clampInt(body.scroll_pct, 0, 100);
          const firstInteraction =
            body.first_interaction_ms === null
              ? null
              : clampInt(body.first_interaction_ms, 0, 86_400_000);
          const clicked = body.clicked_action === true;

          await updateVisitorLog(body.log_id, {
            duration,
            // Never downgrade a recorded contact back to false.
            ...(clicked ? { clicked_action: true } : {}),
            ...(touchCount !== undefined
              ? {
                  touch_count: touchCount,
                  scroll_pct: scrollPct ?? 0,
                  first_interaction_ms: firstInteraction ?? null,
                  low_engagement:
                    !clicked && (duration ?? 0) < 10 && touchCount === 0,
                }
              : {}),
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
    const country = getCountry(req);
    const userAgent = req.headers.get("user-agent") ?? null;
    const referrer =
      req.headers.get("referer") ?? req.headers.get("referrer") ?? null;
    let gclid = body.gclid?.trim() || null;
    // Iron rule: paid status requires a real GCLID — UTM-only links are organic.
    let source: "mumooman" | "organic" = gclid ? "mumooman" : "organic";
    const browserLanguage = body.browser_language?.trim() || null;
    const deviceFingerprint = body.device_fingerprint?.trim() || null;
    const isAutomation = body.automation === true;
    const deviceCookie = readDeviceCookie(req);
    const valueTrack = normalizeValueTrackPayload(body);

    // ── FILTER: Google system crawlers (AdsBot-Google / Googlebot only) ──────
    if (isGoogleSystemBot(userAgent)) {
      return Response.json({ ok: true, skipped: "google-bot" });
    }

    // ── FILTER: Tag Manager synthetic GCLIDs (gtm_ prefix) ───────────────────
    if (gclid?.startsWith("gtm_")) {
      return Response.json({ ok: true, skipped: "gtm-gclid" });
    }

    // ── DEDUP: GCLID already logged → treat as organic revisit ─────────────
    if (gclid) {
      try {
        if (await isGclidAlreadyLogged(gclid)) {
          source = "organic";
          gclid = null;
        }
      } catch (e) {
        console.error("[notify:enter] isGclidAlreadyLogged failed:", e);
      }
    }

    // 0) Device-based risk score (paid clicks only) — computed before insert so
    //    the history doesn't include this visit. Fail-open on errors.
    let risk: DeviceRisk | null = null;
    if (isPaidAdClick({ source, gclid })) {
      try {
        risk = await computeEntryRisk({
          visitorId: body.visitor_id ?? null,
          deviceCookie: deviceCookie.value,
          deviceCookieExisted: deviceCookie.existed,
          fingerprint: deviceFingerprint,
          userAgent,
          ip,
          country,
          isDesktopOnMobileCampaign: isDesktopPaidClick({
            vt_device: valueTrack.vt_device,
            device,
            user_agent: userAgent,
          }),
          isAutomation,
        });
      } catch (e) {
        console.error("[notify:enter] computeEntryRisk failed:", e);
      }
    }

    // 1) Supabase insert — failures must not block Pushover
    let log_id: number | undefined;
    try {
      const inserted = await insertVisitorLog({
        visitor_id: body.visitor_id,
        ip_address: ip,
        page_path: body.page_path,
        source,
        device,
        city,
        country,
        gclid,
        user_agent: userAgent,
        referrer,
        browser_language: browserLanguage,
        device_fingerprint: deviceFingerprint,
        ...valueTrack,
        clicked_action: false,
      });
      log_id = inserted.id;
      if (inserted.gclidDeduped) {
        source = "organic";
        gclid = null;
        risk = null;
      }
      if (risk) {
        await saveFraudScore(inserted.id, risk, isAutomation, deviceCookie.value);
      }
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
          source,
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
          source,
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
          risk,
        })
      );
    } catch (e) {
      console.error("[notify:enter pushover]", e);
    }

    // 4) Geo-fraud alert — paid click with GCLID from outside Israel (high priority)
    if (
      isPaidAdClick({ source, gclid }) &&
      country &&
      country !== "IL" &&
      gclid
    ) {
      try {
        await sendPushover(
          buildGeoFraudNotification({
            ip,
            gclid,
            country,
            city,
            keyword: valueTrack.keyword,
          })
        );
      } catch (e) {
        console.error("[notify:geo-fraud pushover]", e);
      }
    }

    // 5) Desktop-fraud alert — paid click on mobile-only campaign from desktop (high priority)
    if (
      isPaidAdClick({ source, gclid }) &&
      gclid &&
      isDesktopPaidClick({
        vt_device: valueTrack.vt_device,
        device,
        user_agent: userAgent,
      })
    ) {
      try {
        await sendPushover(
          buildDesktopFraudNotification({
            ip,
            gclid,
            userAgent,
            vtDevice: valueTrack.vt_device,
            keyword: valueTrack.keyword,
          })
        );
      } catch (e) {
        console.error("[notify:desktop-fraud pushover]", e);
      }
    }

    const res = NextResponse.json({ ok: true, log_id });
    // (Re)set the server cookie on every entry so it never expires for an
    // active visitor. HttpOnly + set by our own server → iOS Safari keeps it
    // for the full lifetime (JS-set cookies are capped at 7 days there).
    res.cookies.set(DEVICE_COOKIE, deviceCookie.value, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: DEVICE_COOKIE_MAX_AGE,
    });
    return res;
  } catch (err) {
    console.error("[notify] unhandled error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
