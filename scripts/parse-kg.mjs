import { readFileSync, writeFileSync } from "fs";

const kgmid = "/g/11f4tz7vdd";
const url = `https://www.google.com/search?kgmid=${encodeURIComponent(kgmid)}&hl=iw-IL&q=${encodeURIComponent("חשמלאי יצאת צדיק יהודה חכמוב")}`;

const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept-Language": "he-IL,he;q=0.9",
  },
});
const html = await res.text();
writeFileSync(".tmp-kg.html", html);

// Try to find review-like JSON arrays
const patterns = [
  /\[\[\["([^\]]{10,500})"/g,
  /"review_text":"([^"]+)"/g,
  /"snippet":"([^"]{20,500})"/g,
];

for (const p of patterns) {
  const matches = [...html.matchAll(p)].map((m) => m[1]);
  if (matches.length) console.log(p.toString(), matches.slice(0, 5));
}

// Extract rating count
const ratingMatch = html.match(/(\d+)\s*ביקורות/);
console.log("rating count", ratingMatch?.[0]);

// Look for Hebrew review paragraphs in raw html
const hebrewBlocks = [...html.matchAll(/>([^<]{30,300}[\u0590-\u05FF][^<]{0,300})</g)]
  .map((m) => m[1].trim())
  .filter((s) => !s.includes("Google") && !s.includes("cookie"));
console.log("blocks", hebrewBlocks.slice(0, 20));
