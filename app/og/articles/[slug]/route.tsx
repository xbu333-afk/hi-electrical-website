import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ARTICLES, getArticle } from "@/lib/articles";

/**
 * תמונת שיתוף ייחודית לכל מאמר.
 *
 * ה-PNG נוצר מראש עם דפדפן אמיתי (scripts/generate-article-og.mjs)
 * כדי שעברית RTL תוצג נכון — Satori/ImageResponse מהפך עברית.
 *
 * הכתובת נגזרת מה-slug ולכן יציבה מראש ל-JSON-LD ול-openGraph.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  getArticle(slug);

  const file = await readFile(
    join(process.cwd(), "public", "og", "articles", `${slug}.png`)
  );

  return new Response(file, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
