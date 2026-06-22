/** Translates URL paths to readable Hebrew labels. */

import { serviceAreas } from "./cities";

const STATIC_LABELS: Record<string, string> = {
  "/": "דף הבית",
  "/emergency": "חשמלאי חירום",
  "/fast-service": "שירות מהיר",
  "/welcome": "ברוכים הבאים",
  "/promo": "מבצע",
  "/special-offer": "מבצע מיוחד",
  "/services": "שירותים",
  "/pricing": "מחירון",
  "/get-quote": "הצעת מחיר",
  "/business": "לעסקים ומוסדות",
  "/faq": "שאלות ותשובות",
  "/calculator": "מחשבון חשמל",
  "/device-calculator": "מחשבון צריכת מכשירים",
  "/articles": "מאמרים",
  "/cities": "אזורי שירות",
  "/privacy": "מדיניות פרטיות",
  "/accessibility": "הצהרת נגישות",
  "/ru": "דף רוסי",
};

export function formatPageLabel(rawPath: string): string {
  const path = (rawPath.split("?")[0].replace(/\/$/, "") || "/");

  if (STATIC_LABELS[path]) return STATIC_LABELS[path];

  // /cities/<slug>
  const cityMatch = path.match(/^\/cities\/([^/]+)/);
  if (cityMatch) {
    const slug = cityMatch[1];
    const area = serviceAreas.find((a) => a.slug === slug);
    return area ? `חשמלאי ב${area.name}` : `עיר (${slug})`;
  }

  // /articles/<slug>
  if (path.startsWith("/articles/")) {
    const slug = path.replace("/articles/", "").replace(/-/g, " ");
    return `מאמר: ${slug}`;
  }

  return path;
}
