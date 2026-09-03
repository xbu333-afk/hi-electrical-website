import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import {
  LazyFloatingContactBar,
  LazyFooter,
} from "@/app/components/LazyLayoutChrome";
import LazyScrollToTop from "@/app/components/LazyScrollToTop";
import DeferredGoogleTagManager from "@/app/components/DeferredGoogleTagManager";
import VisitorTracker from "@/app/components/VisitorTracker";
import {
  EMAIL,
  PHONE,
  PRESS_VALIDATION_URLS,
  PROFILE_VALIDATION_URLS,
  SITE_URL,
  YOUTUBE_FEATURE_URL,
} from "@/lib/site";
import {
  BUSINESS_ID,
  LOGO_ID,
  PERSON_ID,
  WEBSITE_ID,
  jsonLdScriptProps,
} from "@/lib/schema";
import { serviceAreas } from "@/lib/cities";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["400", "500", "700"],
});

const gveretLevin = localFont({
  src: "./fonts/GveretLevin-Regular.ttf",
  variable: "--font-gveret-levin",
  display: "swap",
  weight: "400",
  preload: false, // decorative tagline font — not needed for FCP
});

export const metadata: Metadata = {
  title: {
    default: "יהודה חכמוב | הנדסאי חשמל מוסמך - חשמלאי יצאת צדיק",
    template: "%s | ח.י שירותי חשמל",
  },
  description:
    "יהודה חכמוב — הנדסאי חשמל, בעל רישיון ראשי וחשמלאי מוסמך. חשמלאי יצאת צדיק עם חיים אתגר. זמין 24 שעות לחירום. חשמלאי מומלץ ומדורג.",
  keywords: [
    "חשמלאי מוסמך",
    "חשמלאי מומלץ מידרג",
    "חשמלאי יצאת צדיק",
    "חשמלאי 24 שעות",
    "הנדסאי חשמל",
    "יהודה חכמוב",
    "רישיון ראשי",
  ],
  metadataBase: new URL("https://www.hiservice.org"),
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "ח.י שירותי חשמל",
    images: [
      {
        url: "/og/site-og.png",
        width: 1200,
        height: 630,
        alt: "ח.י שירותי חשמל — יהודה חכמוב",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ═══════════════════════════════════════════════════════════════
   JSON-LD — גרף ישויות מקושר: העסק ← יהודה חכמוב ← האתר
   זו ההגדרה המלאה והיחידה של הישויות. עמודים פנימיים מפנים אליהן
   ב-@id בלבד (ראו lib/schema.ts) ואינם מגדירים אותן מחדש.
═══════════════════════════════════════════════════════════════ */

/** בסיס הפעילות — פתח תקווה, בליבת מחוז המרכז */
const HOME_BASE = {
  locality: "פתח תקווה",
  region: "מחוז המרכז",
  latitude: 32.084,
  longitude: 34.8878,
  /** רדיוס שירות מעשי סביב הבסיס, במטרים */
  serviceRadius: 30000,
};

const ORT_COLLEGE = {
  "@type": "CollegeOrUniversity",
  name: "מכללת אורט תעשייה אווירית",
  alternateName: "ORT Israel Aerospace Industries College",
} as const;

const ONO_COLLEGE = {
  "@type": "CollegeOrUniversity",
  name: "המכללה האקדמית אונו",
  alternateName: "Ono Academic College",
  url: "https://www.ono.ac.il",
} as const;

const PRESS_SAME_AS = Object.values(PRESS_VALIDATION_URLS);

/**
 * פרופילים רשמיים של העסק. Google Maps הוא האות החזק ביותר כאן,
 * משום שהוא מקשר את הישות שבאתר לפרופיל העסק בגוגל.
 */
const BUSINESS_SAME_AS = [
  PROFILE_VALIDATION_URLS.googleMaps,
  PROFILE_VALIDATION_URLS.easy,
  PROFILE_VALIDATION_URLS.tco,
  PROFILE_VALIDATION_URLS.tiktok,
];

const PRESS_SUBJECT_OF = [
  {
    "@type": "VideoObject",
    name: "ח.י שירותי חשמל בתוכנית \"יצאת צדיק\" עם חיים אתגר",
    description:
      "יהודה חכמוב ו-ח.י שירותי חשמל נבדקו ונמצאו צדיקים בתוכנית \"יצאת צדיק\" עם חיים אתגר בערוץ 12.",
    url: PRESS_VALIDATION_URLS.keshet12,
    publisher: { "@type": "Organization", name: "קשת 12" },
  },
  {
    "@type": "NewsArticle",
    name: "סיקור עיתונאי על יהודה חכמוב ו-ח.י שירותי חשמל",
    url: PRESS_VALIDATION_URLS.haaretz,
    datePublished: "2020-10-06",
    publisher: { "@type": "NewsMediaOrganization", name: "הארץ" },
  },
  {
    "@type": "NewsArticle",
    name: "סיקור עיתונאי על יהודה חכמוב ו-ח.י שירותי חשמל",
    url: PRESS_VALIDATION_URLS.arutz7,
    publisher: { "@type": "NewsMediaOrganization", name: "ערוץ 7" },
  },
  {
    "@type": "Article",
    name: "כתבה על יהודה חכמוב במגזין \"זמן חדש\"",
    url: PRESS_VALIDATION_URLS.zmanHadash,
    publisher: { "@type": "Organization", name: "מגזין זמן חדש" },
  },
  {
    "@type": "Article",
    name: "כתבה על יהודה חכמוב בעיתון \"מנורה\"",
    url: PRESS_VALIDATION_URLS.menora,
    publisher: { "@type": "Organization", name: "עיתון מנורה" },
    inLanguage: "he-IL",
  },
  {
    "@type": "SocialMediaPosting",
    name: "המלצות קהילתיות על ח.י שירותי חשמל",
    url: PRESS_VALIDATION_URLS.kiryat4,
  },
  {
    "@type": "VideoObject",
    name: "יהודה חכמוב — ח.י שירותי חשמל ביוטיוב",
    description:
      "סרטון נוסף המתעד את פעילותו המקצועית של יהודה חכמוב, הנדסאי חשמל בעל רישיון חשמלאי ראשי.",
    url: YOUTUBE_FEATURE_URL,
    publisher: { "@type": "Organization", name: "YouTube" },
  },
] as const;

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ── 1. העסק — LocalBusiness / ProfessionalService ──────── */
    {
      "@type": ["Electrician", "ProfessionalService"],
      "@id": BUSINESS_ID,
      name: "ח.י שירותי חשמל",
      alternateName: "H.I Electrical Services",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      description:
        "ח.י שירותי חשמל — שירותי חשמל מקצועיים לבית, לעסק ולמגזר המוסדי, בניהולו של יהודה חכמוב, הנדסאי חשמל ומכונות בעל רישיון חשמלאי ראשי. איתור ותיקון תקלות, שדרוג לוחות חשמל תלת-פאזיים, בדיקות הארקה ובטיחות, גופי תאורה ומערכות בית חכם. השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, וניתן לפנות בוואטסאפ בכל שפה. מענה לקריאות חירום בכל שעות היממה, למעט שבתות וחגים. נבדק ונמצא צדיק בתוכנית \"יצאת צדיק\" עם חיים אתגר בערוץ 12.",
      slogan: "חשמלאי יצאת צדיק — מקצועיות, אמינות ומחיר הוגן",
      logo: {
        "@type": "ImageObject",
        "@id": LOGO_ID,
        url: `${SITE_URL}/images/yatza-tzadik-logo.webp`,
        caption: "ח.י שירותי חשמל — יהודה חכמוב",
      },
      image: { "@id": LOGO_ID },
      priceRange: "₪₪",
      currenciesAccepted: "ILS",
      knowsLanguage: ["he-IL", "ru-RU", "en"],
      availableLanguage: ["Hebrew", "Russian", "English"],
      sameAs: BUSINESS_SAME_AS,
      hasMap: PROFILE_VALIDATION_URLS.googleMaps,
      founder: { "@id": PERSON_ID },
      employee: { "@id": PERSON_ID },
      address: {
        "@type": "PostalAddress",
        addressLocality: HOME_BASE.locality,
        addressRegion: HOME_BASE.region,
        addressCountry: "IL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: HOME_BASE.latitude,
        longitude: HOME_BASE.longitude,
      },
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: HOME_BASE.latitude,
          longitude: HOME_BASE.longitude,
        },
        geoRadius: HOME_BASE.serviceRadius,
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "מחוז המרכז",
          alternateName: "Central District, Israel",
        },
        ...serviceAreas.map(({ name, slug }) => ({
          "@type": "City",
          name,
          url: `${SITE_URL}/cities/${slug}`,
        })),
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        email: EMAIL,
        contactType: "customer service",
        areaServed: "IL",
        availableLanguage: ["Hebrew", "Russian", "English"],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Friday",
          opens: "00:00",
          closes: "14:00",
        },
        // בפועל השירות נפתח 30 דקות אחרי צאת השבת — שעה שמשתנה שבועית.
        // סכמה תומכת רק בשעה קבועה, ולכן נבחר 21:00 כחלון שמרני שנכון
        // בכל עונות השנה ולעולם אינו מצהיר על זמינות בזמן שבת.
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "21:00",
          closes: "23:59",
        },
      ],
    },

    /* ── 2. יהודה חכמוב — Person + אותות E-E-A-T ─────────────── */
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "יהודה חכמוב",
      alternateName: "Yehuda Hahamov",
      url: `${SITE_URL}/about`,
      mainEntityOfPage: `${SITE_URL}/about`,
      telephone: PHONE,
      email: EMAIL,
      nationality: { "@type": "Country", name: "Israel" },
      sameAs: [...PRESS_SAME_AS, PROFILE_VALIDATION_URLS.tiktok],
      subjectOf: PRESS_SUBJECT_OF,
      knowsLanguage: ["he-IL", "ru-RU", "en"],
      jobTitle: [
        "הנדסאי חשמל מוסמך בעל רישיון חשמלאי ראשי",
        "הנדסאי מכונות",
        "מרצה ומכשיר הנדסאי חשמל",
        "עד מומחה ונותן חוות דעת לבתי משפט בתחום החשמל",
      ],
      description:
        "יהודה חכמוב הוא הנדסאי חשמל והנדסאי מכונות מוסמך, בעל רישיון חשמלאי מוסמך וראשי בתוקף, ומייסד ובעלים של ח.י שירותי חשמל. הוא מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אווירית, ובכך מכשיר את הדור הבא של אנשי החשמל בישראל. במקביל הוא משמש עד מומחה ונותן חוות דעת מקצועיות לבתי משפט בתחום החשמל, וכן סטודנט למשפטים בשנתו האחרונה במכללה האקדמית אונו — שילוב המקנה לו הבנה נדירה של הצד ההנדסי, הבטיחותי והרגולטורי-משפטי של עבודות חשמל. הוא מעניק שירות וייעוץ מקצועי בעברית, ברוסית ובאנגלית, ומקבל פניות בוואטסאפ בכל שפה. עסקו נבדק ונמצא צדיק בתוכנית \"יצאת צדיק\" עם חיים אתגר בערוץ 12.",
      knowsAbout: [
        "הנדסת חשמל",
        "הנדסת מכונות",
        "חשמלאות מוסמכת ורישוי חשמלאים בישראל",
        "חוק החשמל ותקנות הבטיחות",
        "איתור ותיקון תקלות וקצרים חשמליים",
        "לוחות חשמל תלת-פאזיים ושדרוגם",
        "ממסר פחת ומפסקי מגן",
        "מערכות הארקה ובדיקות בטיחות",
        "בדיקות תקינות ואישורי חשמל מול חברת החשמל",
        "תאורה, גופי תאורה ותאורת LED",
        "מערכות בית חכם ואוטומציה לבית",
        "חשמל תעשייתי, מוניציפלי ותחזוקת מבנים",
        "חוות דעת מומחה לבתי משפט בתחום החשמל",
        "משפטים ורגולציה בתחום החשמל והבטיחות",
      ],
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "הנדסאי חשמל וחשמלאי ראשי",
          occupationalCategory: "Electrician / Practical Electrical Engineer",
        },
        {
          "@type": "Occupation",
          name: "מרצה ומכשיר הנדסאי חשמל",
          occupationalCategory: "Academic Lecturer",
        },
        {
          "@type": "Occupation",
          name: "עד מומחה ונותן חוות דעת לבתי משפט בתחום החשמל",
          occupationalCategory: "Expert Witness",
        },
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "הנדסאי חשמל",
          alternateName: "Certified Practical Electrical Engineer",
          credentialCategory: "Practical Engineer Diploma",
          educationalLevel: "הנדסאי",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "הנדסאי מכונות",
          alternateName: "Certified Practical Mechanical Engineer",
          credentialCategory: "Practical Engineer Diploma",
          educationalLevel: "הנדסאי",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "רישיון חשמלאי מוסמך וראשי",
          alternateName: "Licensed Chief Electrician (Israel)",
          credentialCategory: "Professional License",
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "משרד העבודה",
          },
        },
      ],
      // אונו נרשמת כ-affiliation ולא כ-alumniOf — לימודי המשפטים עדיין בעיצומם
      affiliation: [ORT_COLLEGE, ONO_COLLEGE],
      worksFor: [{ "@id": BUSINESS_ID }, ORT_COLLEGE],
      owns: { "@id": BUSINESS_ID },
    },

    /* ── 3. האתר — מקשר בין שתי הישויות ─────────────────────── */
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "ח.י שירותי חשמל",
      alternateName: "יהודה חכמוב — הנדסאי חשמל",
      inLanguage: "he-IL",
      publisher: { "@id": BUSINESS_ID },
      about: { "@id": PERSON_ID },
      copyrightHolder: { "@id": BUSINESS_ID },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const isAdmin = h.get("x-is-admin") === "1";

  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${gveretLevin.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});
`,
          }}
        />
      </head>
      {isAdmin ? (
        // Admin pages — bare body, no site chrome
        <body className="h-full bg-gray-50 text-slate-900 antialiased">{children}</body>
      ) : (
        // Public site — full layout with navbar/footer
        <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
          {/* JSON-LD — עמודים ציבוריים בלבד (לא באזור הניהול) */}
          <script {...jsonLdScriptProps(siteJsonLd)} />

          <DeferredGoogleTagManager />
          <Suspense fallback={null}>
            <VisitorTracker />
          </Suspense>

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[200] focus:bg-emerald-700 focus:text-white focus:font-bold focus:px-5 focus:py-3 focus:rounded-xl focus:shadow-lg"
          >
            דלג לתוכן הראשי
          </a>

          <Navbar />
          <LazyScrollToTop />

          <main id="main-content" className="flex-1 pb-24 md:pb-0" tabIndex={-1}>
            {children}
          </main>

          <LazyFooter />
          <LazyFloatingContactBar />
        </body>
      )}
    </html>
  );
}
