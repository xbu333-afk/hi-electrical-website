import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/** מידות תקן לתמונת שיתוף (Open Graph / Article.image) */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** כתובת תמונת השיתוף של מאמר — נגזרת מה-slug ולכן יציבה וידועה מראש */
export function articleOgImageUrl(slug: string): string {
  return `${SITE_URL}/og/articles/${slug}`;
}

const DEFAULT_OG = {
  type: "website",
  locale: "he_IL",
  siteName: "ח.י שירותי חשמל",
} as const;

/** תמונת שיתוף כללית לאתר — לא מחליפה תמונות ייעודיות של מאמרים */
export const SITE_OG_IMAGE = {
  url: "/og/site-og.png",
  width: OG_IMAGE_SIZE.width,
  height: OG_IMAGE_SIZE.height,
  alt: "ח.י שירותי חשמל — יהודה חכמוב",
} as const;

export type OpenGraphFields = NonNullable<Metadata["openGraph"]>;

export type OpenGraphInput = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  locale?: string;
  siteName?: string;
  images?: OpenGraphFields["images"];
};

/** ממיר path יחסי ל-URL מוחלט תחת SITE_URL. URL מוחלט נשאר כפי שהוא. */
export function absoluteOgUrl(url: string): string {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  }
  const path = url.startsWith("/") ? url : `/${url}`;
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function buildOpenGraph({
  title,
  description,
  url,
  type = DEFAULT_OG.type,
  locale = DEFAULT_OG.locale,
  siteName = DEFAULT_OG.siteName,
  images,
}: OpenGraphInput): OpenGraphFields {
  return {
    type,
    locale,
    siteName,
    title,
    description,
    url: absoluteOgUrl(url),
    images: images !== undefined ? images : [SITE_OG_IMAGE],
  };
}
