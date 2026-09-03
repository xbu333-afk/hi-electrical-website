import { BUSINESS_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { allTestimonials } from "@/lib/testimonials-data";

export type ReviewServiceId =
  | "emergency"
  | "panel"
  | "boiler"
  | "lighting"
  | "induction"
  | "diagnosis"
  | "phone-help"
  | "general";

export type ReviewService = {
  id: ReviewServiceId;
  label: string;
};

export type ReviewStatus = "published" | "hidden";

/** סוגי שירות לסינון — נגזרים מתוכן ההמלצות. */
export const REVIEW_SERVICES: readonly ReviewService[] = [
  { id: "emergency", label: "קריאת חירום / לילה" },
  { id: "panel", label: "לוח חשמל ותקלות" },
  { id: "boiler", label: "דוד חשמל" },
  { id: "lighting", label: "תאורה" },
  { id: "induction", label: "כיריים / אינדוקציה" },
  { id: "diagnosis", label: "איתור תקלות מורכבות" },
  { id: "phone-help", label: "ייעוץ טלפוני" },
  { id: "general", label: "שירות כללי" },
] as const;

const SERVICE_PATTERNS: { id: ReviewServiceId; pattern: RegExp }[] = [
  {
    id: "emergency",
    pattern:
      /לילה|חירום|sos|\b00[:.]|לפנות בוקר|צאת השבת|שבת בערב|שישי בצהרים|בשעה 00/i,
  },
  {
    id: "panel",
    pattern: /לוח חשמל|ארון חשמל|מפסק|פחת|קצר|מאמ[תץ]/i,
  },
  {
    id: "boiler",
    pattern: /דוד|פלאנג|טיימר/i,
  },
  {
    id: "lighting",
    pattern: /תאורה|גוף תאורה|להאיר/i,
  },
  {
    id: "induction",
    pattern: /כיריים|אינדוקציה/i,
  },
  {
    id: "diagnosis",
    pattern: /איתר|אבחנ|לא איתרו|מהנדס חשמל לא|טכנאים קודמים/i,
  },
  {
    id: "phone-help",
    pattern: /טלפונית|דרך הטלפון|בטלפון מרחוק|עזר לי טלפונית/i,
  },
];

export type SiteReview = {
  id: string;
  name: string;
  text: string;
  rating: number;
  services: ReviewServiceId[];
  initials: string;
  color: string;
  createdAt?: string;
};

const AVATAR_COLORS = [
  "bg-blue-700",
  "bg-purple-700",
  "bg-orange-700",
  "bg-emerald-700",
  "bg-rose-700",
  "bg-cyan-700",
  "bg-amber-700",
  "bg-indigo-700",
] as const;

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  return name.slice(0, 2);
}

export function avatarColorForIndex(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export function detectServices(text: string): ReviewServiceId[] {
  const found: ReviewServiceId[] = [];
  for (const { id, pattern } of SERVICE_PATTERNS) {
    if (pattern.test(text) && !found.includes(id)) found.push(id);
  }
  if (found.length === 0) found.push("general");
  return found;
}

function isServiceId(value: string): value is ReviewServiceId {
  return REVIEW_SERVICES.some((s) => s.id === value);
}

export function normalizeServiceTags(
  tags: string[] | null | undefined
): ReviewServiceId[] {
  if (!tags?.length) return ["general"];
  const out: ReviewServiceId[] = [];
  for (const tag of tags) {
    if (isServiceId(tag) && !out.includes(tag)) out.push(tag);
  }
  return out.length ? out : ["general"];
}

export function toSiteReview(
  row: {
    id: string;
    name: string;
    text: string;
    rating: number;
    service_tags?: string[] | null;
    created_at?: string | null;
  },
  index: number
): SiteReview {
  return {
    id: row.id,
    name: row.name,
    text: row.text,
    rating: row.rating,
    services: normalizeServiceTags(row.service_tags),
    initials: getInitials(row.name),
    color: avatarColorForIndex(index),
    createdAt: row.created_at ?? undefined,
  };
}

/**
 * Fallback מקומי — רק אם מסד הנתונים עדיין ריק (לפני הייבוא הראשוני).
 * הקרוסלה בדף הבית ממשיכה להשתמש ב-testimonials-data.ts בנפרד.
 */
export const FALLBACK_REVIEWS: SiteReview[] = allTestimonials.map(
  (review, index) => ({
    id: `fallback-${index + 1}`,
    name: review.name,
    text: review.text,
    rating: review.rating,
    services: detectServices(review.text),
    initials: getInitials(review.name),
    color: avatarColorForIndex(index),
  })
);

export function getReviewServiceOptions(
  reviews: readonly SiteReview[]
): ReviewService[] {
  const used = new Set<ReviewServiceId>();
  for (const review of reviews) {
    for (const id of review.services) used.add(id);
  }
  return REVIEW_SERVICES.filter((s) => used.has(s.id));
}

export type LaidOutReview = SiteReview;

/** איכות ≈ אורך מלל + דירוג (המלצות מפורטות עולות למעלה). */
function qualityScore(review: SiteReview): number {
  return review.text.length + review.rating * 35;
}

/** סיפור ניצולת השואה — תמיד בין 4 ההמלצות הראשונות. */
function isPinnedFeaturedReview(review: SiteReview): boolean {
  return /ניצולת שואה|ניצולי שואה/.test(review.text);
}

/**
 * סידור טבעי: ההמלצות האיכותיות בחלק העליון,
 * עם ערבוב קל כדי שלא ייראה כמו דפוס ארוך־קצר מכוון.
 * המלצה מודגשת (ניצולת שואה) מובטחת בתוך 4 הראשונות.
 */
export function interleaveReviewsByLength(
  reviews: readonly SiteReview[]
): LaidOutReview[] {
  if (reviews.length === 0) return [];

  const pinned = reviews.filter(isPinnedFeaturedReview);
  const unpinned = reviews.filter((r) => !isPinnedFeaturedReview(r));

  const ranked = [...unpinned].sort(
    (a, b) => qualityScore(b) - qualityScore(a)
  );

  const topN = Math.min(14, ranked.length);
  const midN = Math.min(28, Math.max(0, ranked.length - topN));
  const top = ranked.slice(0, topN);
  const mid = ranked.slice(topN, topN + midN);
  const rest = ranked.slice(topN + midN);

  const out: SiteReview[] = [];
  let ti = 0;
  let mi = 0;
  let ri = 0;
  let step = 0;

  while (ti < top.length || mi < mid.length || ri < rest.length) {
    const roll = step % 5;
    if (roll === 0 || roll === 2) {
      if (ti < top.length) out.push(top[ti++]);
      else if (mi < mid.length) out.push(mid[mi++]);
      else if (ri < rest.length) out.push(rest[ri++]);
    } else if (roll === 1 || roll === 4) {
      if (mi < mid.length) out.push(mid[mi++]);
      else if (ti < top.length) out.push(top[ti++]);
      else if (ri < rest.length) out.push(rest[ri++]);
    } else {
      if (ri < rest.length) out.push(rest[ri++]);
      else if (mi < mid.length) out.push(mid[mi++]);
      else if (ti < top.length) out.push(top[ti++]);
    }
    step += 1;
  }

  // מניעת צמד של שתי המלצות ארוכות מאוד ברצף
  for (let i = 0; i < out.length - 1; i++) {
    const a = out[i];
    const b = out[i + 1];
    if (a.text.length > 220 && b.text.length > 220) {
      const swapAt = out.findIndex(
        (r, j) => j > i + 1 && r.text.length < 160
      );
      if (swapAt !== -1) {
        const tmp = out[i + 1];
        out[i + 1] = out[swapAt];
        out[swapAt] = tmp;
      }
    }
  }

  // שיבוץ ההמלצה המודגשת במקום 2 (אינדקס 1) — בתוך ארבע הראשונות, בלי לדחוף הכול
  if (pinned.length === 0) return out;

  const featured = [...pinned].sort(
    (a, b) => qualityScore(b) - qualityScore(a)
  )[0];
  const othersPinned = pinned.filter((r) => r.id !== featured.id);
  const withoutFeatured = out.filter((r) => r.id !== featured.id);
  const insertAt = Math.min(1, withoutFeatured.length);
  withoutFeatured.splice(insertAt, 0, featured);
  // שאר pinned (אם יש) אחרי הרביעייה הראשונה כדי לא לדחוס את הראש
  return [...withoutFeatured.slice(0, 4), ...othersPinned, ...withoutFeatured.slice(4)];
}

export function buildReviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/reviews#webpage`,
        url: `${SITE_URL}/reviews`,
        name: "המלצות מהרשת",
        description:
          "המלצות של לקוחות על שירותי חשמל של יהודה חכמוב — ח.י שירותי חשמל.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": BUSINESS_ID },
        mainEntity: { "@id": BUSINESS_ID },
      },
    ],
  };
}
