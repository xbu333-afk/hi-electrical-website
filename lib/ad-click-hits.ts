import type { NextRequest } from "next/server";
import { getSupabaseAdmin } from "./supabase";
import { extractClientIp } from "./client-ip";
import { isGoogleSystemBot } from "./user-agent";

/**
 * Server-side record of every landing request that carries a GCLID.
 *
 * Written by proxy.ts *before* any JavaScript runs in the visitor's browser.
 * If a GCLID appears here but never in visitor_logs (which is written by the
 * page's JavaScript), the "visitor" never executed the page — typical of bots
 * and scripted clicks. That is strong evidence for Google's invalid-click team.
 */
/**
 * Link-preview fetchers (someone pasted the link into WhatsApp/Facebook/…)
 * and known crawlers. They request the page but never run it — recording them
 * would create false "browser never ran" evidence, and because GCLIDs are
 * unique they would also hide the real visitor's server hit.
 */
export const PREVIEW_OR_CRAWLER_UA =
  /^WhatsApp\/|facebookexternalhit|Facebot|TelegramBot|Slackbot|Twitterbot|LinkedInBot|Discordbot|SkypeUriPreview|Pinterestbot|redditbot|Applebot|bingbot|YandexBot|Baiduspider|DuckDuckBot|Embedly|Iframely|vkShare|bot\/|crawler|spider|preview/i;
// Note: in-app browsers of real people (Viber, Snapchat, Pinterest app…) are
// deliberately NOT listed — only fetchers that never render the page.

export async function recordAdClickHit(request: NextRequest): Promise<void> {
  try {
    const gclid = request.nextUrl.searchParams.get("gclid")?.trim();
    if (!gclid || gclid.startsWith("gtm_") || gclid.length > 300) return;

    const userAgent = request.headers.get("user-agent") ?? null;
    if (isGoogleSystemBot(userAgent)) return;
    if (userAgent && PREVIEW_OR_CRAWLER_UA.test(userAgent)) return;

    // Skip Next.js prefetch / RSC requests — only real page loads count.
    if (
      request.headers.get("next-router-prefetch") ||
      request.headers.get("rsc") ||
      request.headers.get("purpose") === "prefetch" ||
      request.headers.get("sec-purpose")?.includes("prefetch")
    ) {
      return;
    }

    const city = request.headers.get("x-vercel-ip-city");
    let decodedCity: string | null = null;
    try {
      decodedCity = city ? decodeURIComponent(city) : null;
    } catch {
      decodedCity = city;
    }

    const { error } = await getSupabaseAdmin()
      .from("ad_click_hits")
      .upsert(
        {
          gclid,
          ip_address: extractClientIp(request.headers),
          user_agent: userAgent,
          path: request.nextUrl.pathname,
          country: request.headers.get("x-vercel-ip-country"),
          city: decodedCity,
          accept_language: request.headers.get("accept-language"),
          keyword: request.nextUrl.searchParams.get("keyword"),
        },
        { onConflict: "gclid", ignoreDuplicates: true }
      );
    if (error) console.error("[ad_click_hits] insert error:", error.message);
  } catch (e) {
    console.error("[ad_click_hits] failed:", e);
  }
}
