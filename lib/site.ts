/** פרטי קשר — מקור: קודים מהאתר שלי.txt */
export const PHONE = "+972585555161";
export const PHONE_DISPLAY = "058-5555161";
export const EMAIL = "XBU333@gmail.com";
export const SITE_URL = "https://www.hiservice.org";
export const WHATSAPP_BASE = "https://wa.me/972585555161";

export const WHATSAPP_HREF = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "שלום יהודה, אני צריך שירות חשמל. אשמח לקבל פרטים."
)}`;

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
  { href: "/services", label: "שירותים" },
  { href: "/business", label: "לעסקים ומוסדות" },
  { href: "/cities", label: "אזורי שירות" },
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
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

export const FOOTER_BRAND_TEXT =
  "ח.י שירותי חשמל — הנדסאי חשמל וחשמלאי מוסמך ברישיון ראשי. זמינות 24/7 למקרי חירום (למעט שבתות וחגים).";
