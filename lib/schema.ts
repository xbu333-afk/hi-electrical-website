import { SITE_URL } from "@/lib/site";

/**
 * מזהי הישויות המרכזיות של האתר.
 * ההגדרה המלאה של כל ישות נמצאת ב-app/layout.tsx ומוזרקת בכל עמוד ציבורי;
 * עמודים פנימיים מפנים לכאן בלבד, כדי שלא תיווצר הגדרה כפולה וסותרת.
 */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#yehuda-hahamov`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

/** הפניות מוכנות לשימוש בתוך גרפים בעמודים פנימיים */
export const businessRef = { "@id": BUSINESS_ID } as const;
export const personRef = { "@id": PERSON_ID } as const;
export const websiteRef = { "@id": WEBSITE_ID } as const;
export const logoRef = { "@id": LOGO_ID } as const;

/**
 * מייצר את ה-props לתגית <script> של JSON-LD.
 * הימלוט של `<` הוא הכרחי: מחרוזת המכילה "</script>" בתוך הנתונים
 * תסגור את התגית מוקדם ותאפשר הזרקת קוד.
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  } as const;
}

type Crumb = { name: string; path: string };

/** בונה BreadcrumbList תקני מנתיב פשוט (דף הבית נוסף אוטומטית) */
export function buildBreadcrumbList(id: string, crumbs: readonly Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "דף הבית",
        item: SITE_URL,
      },
      ...crumbs.map(({ name, path }, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name,
        item: `${SITE_URL}${path}`,
      })),
    ],
  };
}
