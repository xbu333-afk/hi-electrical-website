import { type NextRequest } from "next/server";
import { extractClientIp } from "@/lib/client-ip";
import { isValidIsraeliPhone } from "@/lib/phone";
import {
  buildNegativeFeedbackNotification,
  buildPositiveReviewNotification,
  sendPushover,
} from "@/lib/pushover";
import { isGoogleSystemBot } from "@/lib/user-agent";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_LENGTH = { name: 60, text: 2000, phone: 30 } as const;
const MIN_FILL_MS = 2_000;

type ReviewPayload = {
  rating?: number;
  name?: string;
  text?: string;
  phone?: string;
  company?: string;
  elapsed_ms?: number;
};

/**
 * Form submissions are feedback-only — never written to the public reviews table.
 * Both paths return a normal-looking success so bots cannot probe the branch.
 */
function decoy() {
  return Response.json({ ok: true, mode: "public" as const });
}

function invalid(field: string) {
  return Response.json({ ok: false, error: field }, { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const body: ReviewPayload = await req.json();
    const ip = extractClientIp(req.headers);
    const userAgent = req.headers.get("user-agent") ?? null;

    if (body.company?.trim()) return decoy();
    if (typeof body.elapsed_ms === "number" && body.elapsed_ms < MIN_FILL_MS) {
      return decoy();
    }
    if (isGoogleSystemBot(userAgent)) return decoy();

    const rating = Number(body.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return invalid("rating");
    }

    const name = (body.name ?? "").trim();
    if (name.length < 2 || name.length > MAX_LENGTH.name) return invalid("name");

    const text = (body.text ?? "").trim();
    if (text.length < 10 || text.length > MAX_LENGTH.text) return invalid("text");

    const phoneRaw = (body.phone ?? "").trim();
    if (phoneRaw) {
      if (phoneRaw.length > MAX_LENGTH.phone) return invalid("phone");
      if (!isValidIsraeliPhone(phoneRaw)) return invalid("phone");
    }

    // ── 1–3 stars: urgent CS alert — never touch the reviews table ──────────
    if (rating <= 3) {
      try {
        await sendPushover(
          buildNegativeFeedbackNotification({
            name,
            rating,
            text,
            phone: phoneRaw || "לא נמסר",
            ip,
          })
        );
      } catch (e) {
        console.error("[review] negative pushover failed:", e);
      }
      // Same success shape as 4–5 so clients cannot probe the branch
      return Response.json({ ok: true, mode: "public" as const });
    }

    // ── 4–5 stars: internal alert only — moderated before any site publish ──
    try {
      await sendPushover(
        buildPositiveReviewNotification({
          name,
          rating,
          text,
          ip,
        })
      );
    } catch (e) {
      console.error("[review] positive pushover failed:", e);
    }

    return Response.json({ ok: true, mode: "public" as const });
  } catch (err) {
    console.error("[review] unhandled error:", err);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
}
