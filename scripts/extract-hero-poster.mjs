import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");
const sharp = require("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const input = path.join(root, "public/videos/yatza-tzadik-hero.mp4");
const tempJpg = path.join(root, "public/images/yatza-tzadik-hero-poster.jpg");
const output = path.join(root, "public/images/yatza-tzadik-hero-poster.webp");
const seconds = Number(process.argv[2] ?? 2);

if (!ffmpegPath) {
  console.error("ffmpeg-static not found");
  process.exit(1);
}

const result = spawnSync(
  ffmpegPath,
  [
    "-ss",
    String(seconds),
    "-i",
    input,
    "-frames:v",
    "1",
    "-q:v",
    "2",
    "-update",
    "1",
    "-y",
    tempJpg,
  ],
  { stdio: "inherit" },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await sharp(tempJpg)
  .webp({ quality: 82, effort: 4 })
  .toFile(output);

console.log(`Poster saved: public/images/yatza-tzadik-hero-poster.webp @ ${seconds}s`);
