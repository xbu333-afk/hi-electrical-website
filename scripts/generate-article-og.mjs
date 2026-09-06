/**
 * Generates article Open Graph PNGs with real-browser RTL (Playwright).
 * Output: public/og/articles/{slug}.png
 *
 * Requires: npx playwright install chromium (dev machine only).
 * Not run automatically on Vercel — commit the PNGs after regenerating.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "og", "articles");
const heebo400 = pathToFileURL(path.join(root, "assets", "Heebo-400.ttf")).href;
const heebo700 = pathToFileURL(path.join(root, "assets", "Heebo-700.ttf")).href;

function loadArticles() {
  const src = fs.readFileSync(path.join(root, "lib", "articles.ts"), "utf8");
  const articles = [];
  const re =
    /slug:\s*"([^"]+)"\s*,\s*title:\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)')\s*,\s*excerpt:[\s\S]*?category:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    const title = (m[2] ?? m[3] ?? "").replace(/\\"/g, '"').replace(/\\'/g, "'");
    articles.push({ slug: m[1], title, category: m[4] });
  }
  if (articles.length === 0) {
    throw new Error("No articles parsed from lib/articles.ts");
  }
  return articles;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml({ title, category }) {
  return `<!DOCTYPE html>
<html lang="he">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: "Heebo";
        src: url("${heebo400}") format("truetype");
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: "Heebo";
        src: url("${heebo700}") format("truetype");
        font-weight: 700;
        font-style: normal;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body {
        width: 1200px;
        height: 630px;
        overflow: hidden;
        background: #0f172a;
      }
      .canvas {
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        direction: ltr;
        padding: 64px 72px;
        font-family: "Heebo", sans-serif;
        background-color: #064e3b;
        background-image: linear-gradient(135deg, #064e3b 0%, #065f46 55%, #0f172a 100%);
        color: #ffffff;
      }
      .top {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .badge {
        display: inline-flex;
        background: rgba(255, 255, 255, 0.14);
        color: #a7f3d0;
        font-size: 30px;
        font-weight: 400;
        padding: 10px 26px;
        border-radius: 999px;
        direction: rtl;
        unicode-bidi: isolate;
      }
      .title {
        width: 100%;
        margin-top: 40px;
        color: #ffffff;
        font-size: 62px;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: -0.02em;
        text-align: right;
        direction: rtl;
        unicode-bidi: isolate;
      }
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 2px solid rgba(255, 255, 255, 0.22);
        padding-top: 28px;
      }
      .domain {
        color: #a7f3d0;
        font-size: 26px;
        font-weight: 400;
        direction: ltr;
        unicode-bidi: isolate;
      }
      .brand {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        direction: rtl;
        unicode-bidi: isolate;
        text-align: right;
      }
      .brand-name {
        color: #ffffff;
        font-size: 34px;
        font-weight: 700;
      }
      .brand-tag {
        color: #6ee7b7;
        font-size: 26px;
        font-weight: 400;
        margin-top: 8px;
      }
    </style>
  </head>
  <body>
    <div class="canvas" id="og">
      <div class="top">
        <div class="badge">${escapeHtml(category)}</div>
        <div class="title">${escapeHtml(title)}</div>
      </div>
      <div class="footer">
        <div class="domain">hiservice.org</div>
        <div class="brand">
          <div class="brand-name">יהודה חכמוב — הנדסאי חשמל מוסמך</div>
          <div class="brand-tag">ח.י שירותי חשמל · חשמלאי יצאת צדיק</div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

const articles = loadArticles();
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

for (const article of articles) {
  const htmlPath = path.join(outDir, `${article.slug}.html`);
  const pngPath = path.join(outDir, `${article.slug}.png`);
  fs.writeFileSync(htmlPath, buildHtml(article), "utf8");
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#og").screenshot({ path: pngPath, type: "png" });
  fs.unlinkSync(htmlPath);
  console.log("wrote", path.relative(root, pngPath));
}

await browser.close();
console.log(`done: ${articles.length} article OG images`);
