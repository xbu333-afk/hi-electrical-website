import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesRoot = path.join(root, "public/images");

/** תמונות שמופיעות בקוד — ממירים ומעדכנים נתיבים */
const USED_IMAGES = [
  { input: "yatza-tzadik-hero-poster.jpg", maxWidth: 1072 },
  { input: "logo-hero-display@2x.png", maxWidth: 260 },
  { input: "logo-hero-display.png", maxWidth: 130 },
  { input: "yatza-tzadik-logo.avif", maxWidth: 96 },
  { input: "yehuda-haim-etgar.png", maxWidth: 560 },
  { input: "press/magazine-yatza-tzadik.png", maxWidth: 768 },
  { input: "press/rcd-guide.png", maxWidth: 768 },
  { input: "press/weekly-column.png", maxWidth: 768 },
  { input: "press/social-media.png", maxWidth: 768 },
];

async function convertOne(relativeInput, maxWidth) {
  const inputPath = path.join(imagesRoot, relativeInput);
  if (!fs.existsSync(inputPath)) {
    console.warn(`skip (missing): ${relativeInput}`);
    return null;
  }

  const parsed = path.parse(relativeInput);
  const outputRelative = path.join(parsed.dir, `${parsed.name}.webp`).replace(/\\/g, "/");
  const outputPath = path.join(imagesRoot, outputRelative);

  const image = sharp(inputPath);
  const meta = await image.metadata();

  const pipeline =
    meta.width && meta.width > maxWidth
      ? image.resize({ width: maxWidth, withoutEnlargement: true })
      : image;

  await pipeline
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  const outMeta = await sharp(outputPath).metadata();
  const inKb = Math.round(fs.statSync(inputPath).size / 1024);
  const outKb = Math.round(fs.statSync(outputPath).size / 1024);

  console.log(
    `${relativeInput} → ${outputRelative} | ${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height} | ${inKb}KB → ${outKb}KB`
  );

  return {
    input: relativeInput.replace(/\\/g, "/"),
    output: outputRelative,
    width: outMeta.width ?? maxWidth,
    height: outMeta.height ?? maxWidth,
  };
}

for (const item of USED_IMAGES) {
  await convertOne(item.input, item.maxWidth);
}

console.log(`\nConverted ${USED_IMAGES.length} images to WebP.`);
