import { writeFileSync } from "fs";
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ locale: "he-IL" });
await page.goto("https://share.google/SCsjkD0dck2Y4OtFk", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(6000);

writeFileSync("scripts/debug-page.html", await page.content());
await page.screenshot({ path: "scripts/debug-page.png", fullPage: true });

const texts = await page.evaluate(() =>
  [...document.querySelectorAll("*")]
    .map((el) => el.textContent?.trim())
    .filter((t) => t && t.length > 20 && t.length < 300 && /[\u0590-\u05FF]/.test(t))
    .slice(0, 80)
);
console.log(texts.join("\n---\n"));
await browser.close();
