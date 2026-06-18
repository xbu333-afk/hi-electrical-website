import sharp from "sharp";
import path from "path";
import { renameSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2] ?? path.join(__dirname, "../public/images/logo-hero-source.png");
const outputPath = process.argv[3] ?? path.join(__dirname, "../public/images/logo-hero.png");
const tmpPath = `${outputPath}.processing.png`;

const WHITE_THRESHOLD = 238;
const FRINGE_THRESHOLD = 200;

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const isWhite =
    r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;
  const isNearWhiteFringe =
    r >= FRINGE_THRESHOLD && g >= FRINGE_THRESHOLD && b >= FRINGE_THRESHOLD;

  if (isWhite || isNearWhiteFringe) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
    continue;
  }

  if (data[i + 3] === 0) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toFile(tmpPath);

try {
  unlinkSync(outputPath);
} catch {
  // file may be locked by dev server
}

renameSync(tmpPath, outputPath);

const trimmed = await sharp(outputPath).metadata();
console.log(`Logo cleaned: ${outputPath} (${trimmed.width}x${trimmed.height})`);
