/**
 * בדיקת רגרסיה למאמרים מול שרת פיתוח מקומי.
 *
 * שימוש:  npm run dev  ואז  node scripts/check-articles.mjs [slug ...]
 * ללא ארגומנטים נבדקים כל המאמרים שרשומים ב-lib/articles.ts.
 *
 * מאמת לכל מאמר: עומק תוכן, h1 יחיד, היעדר דילוג בין רמות כותרת,
 * תמונת ImageObject ייעודית, ושהשאלות הגלויות זהות לאלה שנשלחות
 * ל-FAQPage — הפער הזה הוא בדיוק מה שמנועי תשובות מענישים עליו.
 */
import { readFile } from "node:fs/promises";

const BASE = "http://localhost:3000";
const MIN_WORDS = 1000;
const MIN_FAQ = 3;

const source = await readFile(new URL("../lib/articles.ts", import.meta.url), "utf8");
const allSlugs = [...source.matchAll(/^    slug: "([^"]+)",$/gm)].map((m) => m[1]);
const slugs = process.argv.length > 2 ? process.argv.slice(2) : allSlugs;

const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

let failed = 0;

for (const slug of slugs) {
  const problems = [];
  let summary = "";

  try {
    const res = await fetch(`${BASE}/articles/${slug}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const articleHtml = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? "";
    const words = stripTags(articleHtml.replace(/<script[\s\S]*?<\/script>/gi, " "))
      .split(" ")
      .filter(Boolean).length;
    if (words < MIN_WORDS) problems.push(`רק ${words} מילים`);

    const graph = [
      ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ]
      .map((m) => JSON.parse(m[1].replace(/\\u003c/g, "<")))
      .flatMap((b) => b["@graph"] ?? [b]);

    const faqNode = graph.find((n) => n["@type"] === "FAQPage");
    const articleNode = graph.find((n) => n["@type"] === "Article");
    const image = graph.find((n) => n["@id"]?.endsWith("#primaryimage"));

    if (!image) problems.push("אין ImageObject ייעודי");
    if (!articleNode?.dateModified) problems.push("אין dateModified");

    const schemaQuestions = faqNode?.mainEntity ?? [];
    if (schemaQuestions.length < MIN_FAQ)
      problems.push(`רק ${schemaQuestions.length} שאלות בסכימה`);

    // כל שאלה חייבת להופיע כ-h3 בתוך summary, באותו נוסח כמו בסכימה
    const summaries = [...articleHtml.matchAll(/<summary[\s\S]*?<\/summary>/g)].map(
      (m) => m[0]
    );
    const withoutH3 = summaries.filter((s) => !/<h3/.test(s)).length;
    if (withoutH3) problems.push(`${withoutH3} שאלות ללא h3`);

    const visible = summaries.map(stripTags);
    const unmatched = schemaQuestions.filter(
      (q) => !visible.some((v) => v.includes(q.name.trim()))
    );
    if (unmatched.length)
      problems.push(`${unmatched.length} שאלות בסכימה ללא טקסט גלוי תואם`);

    const headings = [...articleHtml.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
    const h1Count = headings.filter((h) => h === 1).length;
    if (h1Count !== 1) problems.push(`${h1Count} כותרות h1`);
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] - headings[i - 1] > 1) {
        problems.push(`דילוג h${headings[i - 1]}→h${headings[i]}`);
        break;
      }
    }

    summary = `${String(words).padStart(5)}w  faq=${schemaQuestions.length}  mod=${
      articleNode?.dateModified ?? "-"
    }`;
  } catch (err) {
    problems.push(err.message);
  }

  if (problems.length) failed++;
  console.log(
    `${problems.length ? "FAIL" : "ok  "} ${slug.padEnd(26)} ${summary}${
      problems.length ? `  << ${problems.join("; ")}` : ""
    }`
  );
}

console.log(`\n${slugs.length - failed}/${slugs.length} מאמרים תקינים`);
process.exit(failed ? 1 : 0);
