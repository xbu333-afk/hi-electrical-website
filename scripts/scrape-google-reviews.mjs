import { writeFileSync } from "fs";
import { chromium } from "playwright";

const MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJXx8qJ9OzAhURqJqJqJqJqJq";

const SEARCH_URL =
  "https://www.google.com/search?kgmid=/g/11f4tz7vdd&hl=iw-IL&q=חשמלאי+יצאת+צדיק+יהודה+חכמוב+חשמלאי+לבית";

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-amber-600",
  "bg-indigo-500",
];

function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
  return name.slice(0, 2);
}

function escapeTs(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

async function scrapeReviews() {
  const browser = await chromium.launch({
    headless: false,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    locale: "he-IL",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    viewport: { width: 1400, height: 900 },
  });
  const page = await context.newPage();

  await page.goto("https://share.google/SCsjkD0dck2Y4OtFk", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.waitForTimeout(8000);

  console.log("Landed on:", page.url());

  // Click reviews if visible
  for (const label of ["ביקורות", "Reviews", "232"]) {
    const btn = page.getByRole("button", { name: new RegExp(label) }).first();
    if (await btn.count()) {
      await btn.click({ timeout: 4000 }).catch(() => undefined);
      await page.waitForTimeout(2000);
    }
  }

  const sortBtn = page.locator('button[aria-label*="ביקורות"], button[data-value="Reviews"]').first();
  if (await sortBtn.count()) {
    await sortBtn.click({ timeout: 3000 }).catch(() => undefined);
  }

  const scrollable = page.locator('.m6QErb.DxyBCb.kA9KIf.dS8AEf, [role="main"]').first();
  for (let i = 0; i < 60; i++) {
    await scrollable.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    }).catch(() => page.mouse.wheel(0, 2000));
    await page.waitForTimeout(500);
  }

  const raw = await page.evaluate(() => {
    const results = [];
    const seen = new Set();
    document.querySelectorAll(".jftiEf, .gws-localreviews__google-review").forEach((card) => {
      const text = card.querySelector(".wiI7pd, .MyEned")?.textContent?.trim() ?? "";
      if (text.length < 10) return;
      const name = card.querySelector(".d4r55, .TSUbDb")?.textContent?.trim() ?? "לקוח";
      const date = card.querySelector(".rsqaWe, .bp9Aid")?.textContent?.trim() ?? "";
      const key = name + text.slice(0, 40);
      if (seen.has(key)) return;
      seen.add(key);
      results.push({ name, date, text, stars: 5 });
    });
    return results;
  });

  console.log("Reviews found:", raw.length);
  raw.slice(0, 10).forEach((r, i) => console.log(`${i + 1}. ${r.name}: ${r.text.slice(0, 100)}`));

  writeFileSync("scripts/scraped-reviews.json", JSON.stringify(raw, null, 2));
  await browser.close();

  if (raw.length === 0) process.exit(1);

  const items = raw.map((r, i) => ({
    ...r,
    initials: initials(r.name),
    color: AVATAR_COLORS[i % AVATAR_COLORS.length],
    date: r.date || "Google",
  }));

  const file = `export type GoogleReview = {
  name: string;
  initials: string;
  color: string;
  date: string;
  text: string;
  stars: number;
};

export const GOOGLE_REVIEWS_URL = "https://share.google/SCsjkD0dck2Y4OtFk";

export const GOOGLE_REVIEW_COUNT = ${items.length};

export const GOOGLE_REVIEWS: GoogleReview[] = [
${items
  .map(
    (r) => `  {
    name: "${escapeTs(r.name)}",
    initials: "${escapeTs(r.initials)}",
    color: "${r.color}",
    date: "${escapeTs(r.date)}",
    text: "${escapeTs(r.text)}",
    stars: ${r.stars},
  }`
  )
  .join(",\n")}
];
`;
  writeFileSync("lib/google-reviews.ts", file, "utf8");
}

scrapeReviews().catch((e) => {
  console.error(e);
  process.exit(1);
});
