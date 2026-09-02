import { type NextRequest } from "next/server";
import { extractClientIp } from "@/lib/client-ip";
import {
  countRecentLeadsByIp,
  findRecentVisitorLogId,
  insertLead,
} from "@/lib/leads";
import { normalizeIsraeliPhone } from "@/lib/phone";
import { buildLeadNotification, sendPushover } from "@/lib/pushover";
import { buildWhatsAppUrl, WHATSAPP_HREF } from "@/lib/site";
import { isGoogleSystemBot } from "@/lib/user-agent";
import {
  normalizeValueTrackPayload,
  type ValueTrackParams,
} from "@/lib/valuetrack";
import type { VisitorDevice } from "@/lib/visitor-logs";

/** Keep the handler alive until Supabase and Pushover finish (Vercel serverless). */
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/** Above these lengths the input is junk, not a customer — reject rather than truncate. */
const MAX_LENGTH = { name: 60, phone: 30, city: 60, issue: 1000 } as const;

/**
 * Nobody reads a landing page and fills four fields in under two seconds.
 * Even with browser autofill the free-text issue field has to be typed.
 */
const MIN_FILL_MS = 2_000;

const RATE_LIMIT = { windowMs: 10 * 60_000, max: 4 };

const MOBILE_UA =
  /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i;

type LeadPayload = {
  name?: string;
  phone?: string;
  city?: string;
  issue?: string;
  /** Honeypot — invisible to humans, irresistible to form-filling bots. */
  company?: string;
  /** Milliseconds between form mount and submit. */
  elapsed_ms?: number;
  visitor_id?: string | null;
  gclid?: string | null;
  page_path?: string;
} & Partial<ValueTrackParams>;

/**
 * Answer a trapped submission with a normal-looking success.
 *
 * Returning 400 teaches a bot to retry with different input; returning 200 with
 * the generic WhatsApp link makes it record a win and move on. No DB row and no
 * Pushover alert are produced.
 */
function decoyResponse() {
  return Response.json({ ok: true, whatsapp_url: WHATSAPP_HREF });
}

function invalid(field: string) {
  return Response.json({ ok: false, error: field }, { status: 400 });
}

/** The message the customer will see pre-filled in WhatsApp. */
function buildLeadMessage(opts: {
  name: string;
  phone: string;
  city: string;
  issue: string;
}): string {
  return [
    "שלום יהודה, מילאתי טופס הצעת מחיר באתר:",
    `שם: ${opts.name}`,
    `טלפון: ${opts.phone}`,
    opts.city ? `עיר: ${opts.city}` : null,
    opts.issue ? `התקלה: ${opts.issue}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();
    const ip = extractClientIp(req.headers);
    const userAgent = req.headers.get("user-agent") ?? null;

    // ── TRAP: hidden field that only an automated filler would touch ─────────
    if (body.company?.trim()) return decoyResponse();

    // ── TRAP: submitted faster than a person can type ───────────────────────
    if (typeof body.elapsed_ms === "number" && body.elapsed_ms < MIN_FILL_MS) {
      return decoyResponse();
    }

    // ── TRAP: declared crawlers have no business submitting a form ──────────
    if (isGoogleSystemBot(userAgent)) return decoyResponse();

    // ── Validation ──────────────────────────────────────────────────────────
    // Only name and phone are enforced: they are all that is needed to call the
    // customer back. City and issue are collected and required by the form, but
    // an edge case in the payload must never cost a real lead.
    const name = (body.name ?? "").trim();
    if (name.length < 2 || name.length > MAX_LENGTH.name) return invalid("name");

    const phoneRaw = (body.phone ?? "").trim();
    if (phoneRaw.length > MAX_LENGTH.phone) return invalid("phone");
    const phone = normalizeIsraeliPhone(phoneRaw);
    if (!phone) return invalid("phone");

    const city = (body.city ?? "").trim().slice(0, MAX_LENGTH.city);
    const issue = (body.issue ?? "").trim().slice(0, MAX_LENGTH.issue);

    // ── Rate limit — fails open, an outage must not block a real customer ───
    const recent = await countRecentLeadsByIp(ip, RATE_LIMIT.windowMs);
    if (recent >= RATE_LIMIT.max) {
      return Response.json({ ok: false, error: "rate" }, { status: 429 });
    }

    // ── Attribution ─────────────────────────────────────────────────────────
    const device: VisitorDevice = MOBILE_UA.test(userAgent ?? "")
      ? "mobile"
      : "desktop";
    const rawGeoCity = req.headers.get("x-vercel-ip-city")?.trim() ?? null;
    let geoCity = rawGeoCity;
    if (rawGeoCity) {
      try {
        geoCity = decodeURIComponent(rawGeoCity);
      } catch {
        geoCity = rawGeoCity;
      }
    }
    const country =
      req.headers.get("x-vercel-ip-country")?.toUpperCase().trim() ?? null;
    const referrer =
      req.headers.get("referer") ?? req.headers.get("referrer") ?? null;

    const rawGclid = body.gclid?.trim() || null;
    // Same iron rule as /api/notify: paid status requires a real GCLID, and
    // Tag Manager's synthetic gtm_ ids are not real clicks.
    const gclid = rawGclid?.startsWith("gtm_") ? null : rawGclid;
    const source: "mumooman" | "organic" = gclid ? "mumooman" : "organic";
    const valueTrack = normalizeValueTrackPayload(body);
    const visitorId = body.visitor_id?.trim() || null;
    const pagePath = body.page_path?.trim() || "/get-quote";

    const visitorLogId = visitorId
      ? await findRecentVisitorLogId(visitorId)
      : null;

    const whatsappMessage = buildLeadMessage({
      name,
      phone: phoneRaw,
      city,
      issue,
    });

    // ── 1) Register the lead. A failure must not swallow the lead. ───────────
    let saved = false;
    try {
      await insertLead({
        name,
        phone,
        phone_raw: phoneRaw,
        city: city || null,
        issue: issue || null,
        visitor_id: visitorId,
        visitor_log_id: visitorLogId,
        gclid,
        source,
        page_path: pagePath,
        ip_address: ip,
        user_agent: userAgent,
        referrer,
        device,
        geo_city: geoCity,
        country,
        ...valueTrack,
        whatsapp_message: whatsappMessage,
      });
      saved = true;
    } catch (e) {
      console.error("[lead] insert failed:", {
        message: e instanceof Error ? e.message : String(e),
        code:
          e && typeof e === "object" && "code" in e
            ? (e as { code?: string }).code
            : undefined,
        name,
        phone,
        ip,
      });
    }

    // ── 2) Alert the phone — always, and awaited before we answer. ───────────
    try {
      await sendPushover(
        buildLeadNotification({
          name,
          phone,
          phoneRaw,
          city,
          issue,
          source,
          pagePath,
          ip,
          device,
          gclid,
          geoCity,
          keyword: valueTrack.keyword,
          network: valueTrack.network,
          match_type: valueTrack.match_type,
          unsaved: !saved,
        })
      );
    } catch (e) {
      console.error("[lead] pushover failed:", e);
    }

    // ── 3) Only now hand the visitor the WhatsApp link. ──────────────────────
    return Response.json({ ok: true, whatsapp_url: buildWhatsAppUrl(whatsappMessage), saved });
  } catch (err) {
    console.error("[lead] unhandled error:", err);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
}
