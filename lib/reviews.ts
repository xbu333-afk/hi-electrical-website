import { serviceAreas } from "@/lib/cities";
import {
  GOOGLE_AVERAGE_RATING,
  GOOGLE_REVIEW_TOTAL,
} from "@/lib/google-reviews";
import { SITE_URL } from "@/lib/site";
import { allTestimonials, type Testimonial } from "@/lib/testimonials-data";

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

/** סוגי שירות לסינון — נגזרים מתוכן ההמלצות הקיימות. */
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

export type SiteReview = Testimonial & {
  id: string;
  cities: string[];
  services: ReviewServiceId[];
  initials: string;
  color: string;
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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  return name.slice(0, 2);
}

/** ערים ארוכות קודם — כדי שלא ייחתכו שמות חלקיים (למשל "רמת" מתוך "רמת גן"). */
const CITY_NAMES = [...serviceAreas.map((a) => a.name)].sort(
  (a, b) => b.length - a.length
);

function detectCities(text: string): string[] {
  const found: string[] = [];
  for (const city of CITY_NAMES) {
    if (text.includes(city) && !found.includes(city)) found.push(city);
  }
  // רחוב ברנדיס מופיע בהמלצה אחת — נמצא בפתח תקווה
  if (/ברנדיס/i.test(text) && !found.includes("פתח תקווה")) {
    found.push("פתח תקווה");
  }
  return found;
}

function detectServices(text: string): ReviewServiceId[] {
  const found: ReviewServiceId[] = [];
  for (const { id, pattern } of SERVICE_PATTERNS) {
    if (pattern.test(text) && !found.includes(id)) found.push(id);
  }
  if (found.length === 0) found.push("general");
  return found;
}

function slugifyReviewId(name: string, index: number): string {
  return `r-${index + 1}-${name
    .toLowerCase()
    .replace(/[^a-z0-9\u0590-\u05ff]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)}`;
}

export const SITE_REVIEWS: SiteReview[] = allTestimonials.map(
  (review, index) => ({
    ...review,
    id: slugifyReviewId(review.name, index),
    cities: detectCities(review.text),
    services: detectServices(review.text),
    initials: getInitials(review.name),
    color: AVATAR_COLORS[index % AVATAR_COLORS.length],
  })
);

/** ערים שיש להן לפחות המלצה אחת מתויגת — לרשימת הסינון. */
export function getReviewCityOptions(): string[] {
  const set = new Set<string>();
  for (const review of SITE_REVIEWS) {
    for (const city of review.cities) set.add(city);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "he"));
}

export function getReviewServiceOptions(): ReviewService[] {
  const used = new Set<ReviewServiceId>();
  for (const review of SITE_REVIEWS) {
    for (const id of review.services) used.add(id);
  }
  return REVIEW_SERVICES.filter((s) => used.has(s.id));
}

export function filterReviews(opts: {
  city: string | null;
  service: ReviewServiceId | null;
}): SiteReview[] {
  return SITE_REVIEWS.filter((review) => {
    if (opts.city && !review.cities.includes(opts.city)) return false;
    if (opts.service && !review.services.includes(opts.service)) return false;
    return true;
  });
}

/**
 * JSON-LD לעמוד ההמלצות.
 * AggregateRating משתמש במספר הכולל שכבר מוצג באתר; רשימת Review
 * מבוססת על ההמלצות שמוצגות בעמוד (מקור נתונים מקומי בלבד).
 */
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
        review: SITE_REVIEWS.map((review) => ({
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
