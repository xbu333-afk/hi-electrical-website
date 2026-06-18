import { readFileSync } from "fs";

const files = [".tmp-0.html", ".tmp-1.html", ".tmp-2.html", ".tmp-kg.html"];
for (const file of files) {
  try {
    const h = readFileSync(file, "utf8");
    const out = [];
    for (const m of h.matchAll(/[\u0590-\u05FF][\u0590-\u05FF\s,.!?״""''\-–—]{20,350}/g)) {
      const t = m[0].trim();
      if (
        t.length > 25 &&
        !out.includes(t) &&
        !/Google|מפות|דפדפן|עוגיות|Chrome|Firefox|Safari|Android|Windows|Mac/i.test(t)
      ) {
        out.push(t);
      }
    }
    console.log("\n===", file, "len", h.length, "snippets", out.length);
    out.slice(0, 25).forEach((t, i) => console.log(`${i + 1}. ${t}`));
  } catch {
    console.log("missing", file);
  }
}
