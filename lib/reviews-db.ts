import { getSupabaseAdmin } from "./supabase";
import {
  detectServices,
  FALLBACK_REVIEWS,
  toSiteReview,
  type ReviewServiceId,
  type SiteReview,
} from "./reviews";

export type ReviewInsert = {
  name: string;
  text: string;
  rating: number;
  service_tags?: ReviewServiceId[];
  status?: "published" | "hidden";
  ip_address?: string | null;
};

function logReviewError(context: string, error: unknown): void {
  if (error && typeof error === "object" && "message" in error) {
    const e = error as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };
    console.error(`[reviews] ${context}:`, {
      message: e.message,
      code: e.code,
      details: e.details,
      hint: e.hint,
    });
    return;
  }
  console.error(`[reviews] ${context}:`, error);
}

/**
 * המלצות מפורסמות מהמסד, החדשות קודם.
 * אם הטבלה עדיין ריקה / לא קיימת — מחזיר את ה־fallback המקומי.
 */
export async function getPublishedReviews(): Promise<SiteReview[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("reviews")
      .select("id, name, text, rating, service_tags, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      logReviewError("getPublishedReviews", error);
      return FALLBACK_REVIEWS;
    }

    if (!data?.length) return FALLBACK_REVIEWS;

    return data.map((row, index) =>
      toSiteReview(
        {
          id: row.id as string,
          name: row.name as string,
          text: row.text as string,
          rating: Number(row.rating),
          service_tags: (row.service_tags as string[] | null) ?? null,
          created_at: (row.created_at as string | null) ?? null,
        },
        index
      )
    );
  } catch (e) {
    logReviewError("getPublishedReviews threw", e);
    return FALLBACK_REVIEWS;
  }
}

export async function countRecentReviewsByIp(
  ip: string,
  windowMs: number
): Promise<number> {
  if (!ip || ip === "unknown") return 0;

  const since = new Date(Date.now() - windowMs).toISOString();
  const { count, error } = await getSupabaseAdmin()
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);

  if (error) {
    logReviewError("countRecentReviewsByIp", error);
    return 0;
  }

  return count ?? 0;
}

/** מוסיף המלצה מאושרת ידנית / ייבוא אצווה — לא בשימוש בטופס הציבורי. */
export async function insertPublishedReview(
  entry: ReviewInsert
): Promise<string> {
  const tags = entry.service_tags ?? detectServices(entry.text);

  const { data, error } = await getSupabaseAdmin()
    .from("reviews")
    .insert({
      name: entry.name,
      text: entry.text,
      rating: entry.rating,
      service_tags: tags,
      status: entry.status ?? "published",
      ip_address: entry.ip_address ?? null,
    })
    .select("id")
    .single();

  if (error) {
    logReviewError("insertPublishedReview", error);
    throw error;
  }

  if (!data?.id) {
    const err = new Error("insert succeeded but no id returned");
    logReviewError("insertPublishedReview", err);
    throw err;
  }

  return data.id as string;
}
