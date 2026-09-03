/** פרטי קשר — מקור: קודים מהאתר שלי.txt */
export const PHONE = "+972585555161";
export const PHONE_DISPLAY = "058-5555161";
export const EMAIL = "XBU333@gmail.com";
export const SITE_URL = "https://www.hiservice.org";
export const WHATSAPP_BASE = "https://wa.me/972585555161";

export const WHATSAPP_HREF = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "שלום יהודה, אני צריך שירות חשמל. אשמח לקבל פרטים."
)}`;

/** קישור wa.me עם הודעה מוכנה מראש. */
export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export type SiteLink = { href: string; label: string };

export type NavLinkItem = { type: "link"; href: string; label: string };

export type NavGroupItem = {
  type: "group";
  label: string;
  children: readonly SiteLink[];
};

export type NavItem = NavLinkItem | NavGroupItem;

/** תפריט ראשי — Navbar (Desktop + Mobile) */
export const NAV_ITEMS: readonly NavItem[] = [
  { type: "link", href: "/", label: "ראשי" },
  { type: "link", href: "/services", label: "שירותים" },
  { type: "link", href: "/business", label: "לעסקים ומוסדות" },
  { type: "link", href: "/cities", label: "אזורי שירות" },
  { type: "link", href: "/reviews", label: "המלצות" },
  {
    type: "group",
    label: "כלים ומדריכים",
    children: [
      { href: "/pricing", label: "מחירון שירותים" },
      { href: "/device-calculator", label: "מחשבון צריכת מכשירים" },
      { href: "/faq", label: "שאלות ותשובות" },
      { href: "/calculator", label: "מחשבון חשמל" },
      { href: "/articles", label: "מאמרים ומדריכים" },
    ],
  },
  { type: "link", href: "/#contact", label: "צור קשר" },
];

/** ניווט משני — Footer */
export const FOOTER_NAV_LINKS: readonly SiteLink[] = [
  { href: "/", label: "ראשי" },
  { href: "/about", label: "אודות יהודה חכמוב" },
  { href: "/services", label: "שירותים" },
  { href: "/business", label: "לעסקים ומוסדות" },
  { href: "/cities", label: "אזורי שירות" },
  { href: "/reviews", label: "המלצות" },
  { href: "/#contact", label: "צור קשר" },
];

/** מידע שימושי — Footer */
export const USEFUL_INFO_LINKS: readonly SiteLink[] = [
  { href: "/pricing", label: "מחירון שירותים" },
  { href: "/device-calculator", label: "מחשבון צריכת מכשירים" },
  { href: "/calculator", label: "מחשבון עלות חשמל" },
  { href: "/faq", label: "שאלות ותשובות ונקיטת בטיחות" },
  { href: "/articles/grounding", label: "מדריך הארקה ובטיחות" },
];

export const LEGAL_LINKS: readonly SiteLink[] = [
  { href: "/get-quote", label: "לקבלת הצעת מחיר" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תקנון ותנאי שימוש" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

export const FOOTER_BRAND_TEXT =
  "ח.י שירותי חשמל — הנדסאי חשמל וחשמלאי מוסמך ברישיון ראשי. זמינות 24/7 למקרי חירום (למעט שבתות וחגים).";

/**
 * אימות ישות חיצוני — סיקור תקשורתי שניתן לאמת.
 * משמש גם ב-JSON-LD (sameAs / subjectOf) וגם בעמוד /about.
 */
export const PRESS_VALIDATION_URLS = {
  keshet12: "https://www.facebook.com/watch/?v=1236722343372893",
  haaretz:
    "https://www.haaretz.co.il/blogs/einatkedem/2020-10-06/ty-article/0000017f-f8fc-d2d5-a9ff-f8fcff3a0000",
  arutz7: "https://www.inn.co.il/news/450758",
  zmanHadash: "https://www.calameo.com/read/00614695998901922edac",
  kiryat4: "https://www.facebook.com/groups/KIRYAT4/posts/10158920560102021/",
  // Placeholder — להחליף בכתובת הכתבה הישירה כשתהיה זמינה
  menora: "https://menora-newspaper.org",
} as const;

/**
 * אימות ישות חיצוני — פרופילים רשמיים שמזהים את העסק או את יהודה באופן חד-משמעי.
 * להבדיל מ-PRESS_VALIDATION_URLS, שהוא סיקור *על* הישות,
 * אלה עמודים שהישות עצמה מחזיקה — ולכן הם המועמדים הנכונים ל-sameAs.
 */
export const PROFILE_VALIDATION_URLS = {
  easy: "https://easy.co.il/page/10009955",
  googleMaps: "https://www.google.com/maps?cid=17074424538102856210",
  tco: "https://www.t.co.il/Business/Card-781752.html",
  tiktok: "https://www.tiktok.com/@yehuda_hahamov",
} as const;

/** סרטון נוסף ביוטיוב — מדיה *על* הישות, ולכן משויך כ-VideoObject ולא כפרופיל */
export const YOUTUBE_FEATURE_URL =
  "https://www.youtube.com/watch?v=Ty-v9miiC7U";

/**
 * זוגות hreflang של דף הבית.
 *
 * hreflang חייב להיות הדדי וברמת העמוד: כל עמוד מצהיר על המקבילות *שלו* בלבד.
 * מכיוון שכיום רק דף הבית מתורגם (/ru), רשימה זו שייכת ל-/ ול-/ru בלבד —
 * הצהרה גורפת בכל האתר תטען שלכל עמוד יש גרסה רוסית, וגוגל מתעלם מכלל
 * האנוטציות כשהוא מגלה הצהרה שאינה הדדית.
 *
 * כשיתורגם עמוד נוסף יש להגדיר לו רשימה משלו ולא להרחיב את זו.
 */
export const HOME_LANGUAGE_ALTERNATES = {
  "he-IL": "/",
  "ru-RU": "/ru",
  "x-default": "/",
} as const;
