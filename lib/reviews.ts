import {
  GOOGLE_AVERAGE_RATING,
  GOOGLE_REVIEW_TOTAL,
} from "@/lib/google-reviews";
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

export function buildReviewsJsonLd(reviews: readonly SiteReview[]) {
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
        about: { "@id": `${SITE_URL}/#localbusiness` },
        mainEntity: { "@id": `${SITE_URL}/#localbusiness` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "ח.י שירותי חשמל",
        url: SITE_URL,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: GOOGLE_AVERAGE_RATING,
          reviewCount: GOOGLE_REVIEW_TOTAL,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews.map((review) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: review.name,
          },
          reviewBody: review.text,
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
        })),
      },
    ],
  };
}
