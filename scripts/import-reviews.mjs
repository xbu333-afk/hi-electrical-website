/**
 * Import reviews from a JSON array into Supabase `reviews`.
 *
 * Default: APPEND (never deletes existing rows). Skips exact name+text duplicates.
 * Replace mode (legacy): pass --replace to wipe then insert.
 *
 * Usage:
 *   node scripts/import-reviews.mjs <path-to.json>
 *   node scripts/import-reviews.mjs <path-to.json> --replace
 */
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const args = process.argv.slice(2).filter((a) => a !== "--");
const replace = args.includes("--replace");
const filePath = args.find((a) => !a.startsWith("--"));

if (!filePath) {
  console.error(
    "Usage: node scripts/import-reviews.mjs <file.json> [--replace]"
  );
  process.exit(1);
}

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

const raw = await readFile(filePath, "utf8");
let parsed;
try {
  parsed = JSON.parse(raw);
} catch (e) {
  console.error("FAIL JSON parse:", e.message);
  process.exit(1);
}

if (!Array.isArray(parsed) || parsed.length === 0) {
  console.error("FAIL: expected a non-empty JSON array");
  process.exit(1);
}

const SERVICE_PATTERNS = [
  {
    id: "emergency",
    pattern:
      /לילה|חירום|sos|\b00[:.]|לפנות בוקר|צאת השבת|שבת בערב|שישי בצהרים|בשעה 00|בבוקר בטלפון|מהרגע להרגע/i,
  },
  {
    id: "panel",
    pattern: /לוח חשמל|ארון חשמל|מפסק|פחת|קצר|מאמ[תץ]|שקע שנשרף|כבלים/i,
  },
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

function rowKey(name, text) {
  return `${name}\n${text}`;
}

const rows = [];
let skippedInvalid = 0;
for (const item of parsed) {
  const name = String(item?.name ?? "").trim();
  const text = String(item?.text ?? "").trim();
  const rating = Number(item?.rating);
  if (
    name.length < 1 ||
    text.length < 3 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    skippedInvalid++;
    continue;
  }
  rows.push({
    name,
    text,
    rating,
    service_tags: detectServices(text),
    status: "published",
  });
}

if (!rows.length) {
  console.error("FAIL: no valid rows");
  process.exit(1);
}

const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { count: before } = await db
  .from("reviews")
  .select("id", { count: "exact", head: true });

if (replace) {
  const { error: delErr } = await db
    .from("reviews")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) {
    console.error("FAIL delete:", delErr.message);
    process.exit(1);
  }
}

let toInsert = rows;
let skippedDupes = 0;

if (!replace) {
  // Load existing published texts to skip duplicates on re-run
  const { data: existing, error: exErr } = await db
    .from("reviews")
    .select("name, text");
  if (exErr) {
    console.error("FAIL fetch existing:", exErr.message);
    process.exit(1);
  }
  const existingKeys = new Set(
    (existing ?? []).map((r) => rowKey(String(r.name), String(r.text)))
  );
  toInsert = [];
  for (const r of rows) {
    if (existingKeys.has(rowKey(r.name, r.text))) {
      skippedDupes++;
    } else {
      toInsert.push(r);
    }
  }
}

if (!toInsert.length) {
  console.log(
    `ok  nothing to insert (before=${before ?? 0}, dupes=${skippedDupes}, invalid=${skippedInvalid})`
  );
  process.exit(0);
}

const CHUNK = 100;
let inserted = 0;
for (let i = 0; i < toInsert.length; i += CHUNK) {
  const chunk = toInsert.slice(i, i + CHUNK);
  const { data, error } = await db.from("reviews").insert(chunk).select("id");
  if (error) {
    console.error("FAIL insert chunk:", error.message, error.details);
    process.exit(1);
  }
  inserted += data.length;
}

const tagCounts = {};
for (const r of toInsert) {
  for (const t of r.service_tags) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
}

const { count: after } = await db
  .from("reviews")
  .select("id", { count: "exact", head: true })
  .eq("status", "published");

console.log(
  `ok  mode=${replace ? "replace" : "append"} ${before ?? 0} → ${after ?? "?"} published`
);
console.log(
  `ok  inserted ${inserted} (skipped invalid: ${skippedInvalid}, skipped dupes: ${skippedDupes})`
);
console.log("ok  service_tags (new batch):", JSON.stringify(tagCounts));
