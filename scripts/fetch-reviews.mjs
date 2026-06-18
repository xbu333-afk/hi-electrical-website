import { writeFileSync } from "fs";

const urls = [
  "https://share.google/SCsjkD0dck2Y4OtFk",
  "https://www.google.com/maps/search/?api=1&query=0585555161",
  "https://www.google.com/maps/search/?api=1&query=ח.י+שירותי+חשמל+יהודה+חכמוב",
];

for (const url of urls) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept-Language": "he-IL,he;q=0.9,en;q=0.8",
      },
    });
    const html = await res.url + "\n" + (await res.text());
    writeFileSync(`.tmp-${urls.indexOf(url)}.html`, html.slice(0, 500000));
    console.log(url, "->", res.url, "bytes", html.length);

    const reviewSnippets = [...html.matchAll(/"([^"]{20,400})"/g)]
      .map((m) => m[1])
      .filter(
        (s) =>
          /[\u0590-\u05FF]/.test(s) &&
          !s.includes("http") &&
          !s.includes("\\u") &&
          s.split(" ").length > 4
      );
    console.log("hebrew snippets:", reviewSnippets.slice(0, 15));
  } catch (e) {
    console.error(url, e.message);
  }
}
