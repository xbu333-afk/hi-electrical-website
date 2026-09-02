/**
 * One-shot seed: copies lib/testimonials-data.ts into Supabase `reviews`.
 * Safe to re-run — skips if the table already has rows.
 *
 * Usage: node --experimental-strip-types scripts/seed-reviews.mjs
 */
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { allTestimonials } from "../lib/testimonials-data.ts";

const env = Object.fromEntries(
  (await readFile(new URL("../.env.local", import.meta.url), "utf8"))
    .split(/\r?\n/)
    .filter((l) => l && !l.trimStart().startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [
        l.slice(0, i).trim(),
        l.slice(i + 1).trim().replace(/^["']|["']$/g, ""),
      ];
    })
);

const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { count, error: countErr } = await db
  .from("reviews")
  .select("id", { count: "exact", head: true });

if (countErr) {
  console.error("FAIL count:", countErr.message);
  process.exit(1);
}

if ((count ?? 0) > 0) {
  console.log(`skip — table already has ${count} rows`);
  process.exit(0);
}

const SERVICE_PATTERNS = [
  {
    id: "emergency",
    pattern:
      /לילה|חירום|sos|\b00[:.]|לפנות בוקר|צאת השבת|שבת בערב|שישי בצהרים|בשעה 00/i,
  },
  { id: "panel", pattern: /לוח חשמל|ארון חשמל|מפסק|פחת|קצר|מאמ[תץ]/i },
  { id: "boiler", pattern: /דוד|פלאנג|טיימר/i },
  { id: "lighting", pattern: /תאורה|גוף תאורה|להאיר/i },
  { id: "induction", pattern: /כיריים|אינדוקציה/i },
  {
    id: "diagnosis",
    pattern: /איתר|אבחנ|לא איתרו|מהנדס חשמל לא|טכנאים קודמים/i,
  },
  {
    id: "phone-help",
    pattern: /טלפונית|דרך הטלפון|בטלפון מרחוק|עזר לי טלפונית/i,
  },
];

function detectServices(text) {
  const found = [];
  for (const { id, pattern } of SERVICE_PATTERNS) {
    if (pattern.test(text) && !found.includes(id)) found.push(id);
  }
  return found.length ? found : ["general"];
}

const rows = allTestimonials.map((t) => ({
  name: t.name,
  text: t.text,
  rating: t.rating,
  service_tags: detectServices(t.text),
  status: "published",
}));

const { data, error } = await db.from("reviews").insert(rows).select("id");

if (error) {
  console.error("FAIL insert:", error.message, error.details);
  process.exit(1);
}

console.log(`ok — seeded ${data.length} reviews from testimonials-data`);
