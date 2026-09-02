import { SITE_URL } from "@/lib/site";

/** מידות תקן לתמונת שיתוף (Open Graph / Article.image) */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** כתובת תמונת השיתוף של מאמר — נגזרת מה-slug ולכן יציבה וידועה מראש */
export function articleOgImageUrl(slug: string): string {
  return `${SITE_URL}/og/articles/${slug}`;
}
