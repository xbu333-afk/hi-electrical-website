import type { Metadata } from "next";
import Link from "next/link";
import { buildOpenGraph } from "@/lib/og";
import {
  PHONE,
  PHONE_DISPLAY,
  PRESS_VALIDATION_URLS,
  SITE_URL,
  WHATSAPP_HREF,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "אודות יהודה חכמוב — הנדסאי חשמל ומכונות, מרצה ומומחה לבתי משפט",
  description:
    "יהודה חכמוב — הנדסאי חשמל ומכונות מוסמך בעל רישיון ראשי, מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אווירית, נותן חוות דעת מומחה לבתי משפט וסטודנט למשפטים במכללה האקדמית אונו. הסיפור המקצועי, ההסמכות והסיקור התקשורתי.",
  keywords: [
    "יהודה חכמוב",
    "הנדסאי חשמל",
    "הנדסאי מכונות",
    "מרצה הנדסאי חשמל",
    "מומחה חשמל לבתי משפט",
    "חוות דעת חשמל",
    "חשמלאי יצאת צדיק",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: buildOpenGraph({
    title: "אודות יהודה חכמוב — הנדסאי חשמל ומכונות, מרצה ומומחה לבתי משפט",
    description:
      "הסמכה כפולה בהנדסת חשמל ומכונות, הוראה אקדמית, חוות דעת מומחה לבתי משפט ולימודי משפטים — ההסמכות שמאחורי ח.י שירותי חשמל.",
    url: `${SITE_URL}/about`,
  }),
};

/* ─── ארבעת עמודי הסמכות (E-E-A-T) ─────────────────────────── */
const AUTHORITY_PILLARS = [
  {
    id: "engineer",
    badge: "הסמכה כפולה",
    title: "הנדסאי חשמל ומכונות מוסמך",
    lead: "רישיון חשמלאי מוסמך וראשי בתוקף, מטעם משרד העבודה.",
    body: "ההכשרה שלי אינה מסתכמת ברישיון חשמלאי. אני הנדסאי חשמל והנדסאי מכונות — שתי הסמכות הנדסיות מלאות שנלמדו לעומק לאורך שנים. השילוב הזה הוא מה שמאפשר לי לגשת ללוח חשמל תעשייתי, לקו ייצור או למערכת מורכבת בבית פרטי ולהבין לא רק את הזרם, אלא גם את המכניקה, העומסים והאינטגרציה בין המערכות. זו ההבחנה שבין מי שמחליף רכיב לבין מי שמבין למה הרכיב נשרף מלכתחילה.",
    points: [
      "רישיון חשמלאי מוסמך וראשי בתוקף",
      "תעודת הנדסאי חשמל",
      "תעודת הנדסאי מכונות",
      "הרשאה לחתום על לוחות תלת-פאזיים",
    ],
  },
  {
    id: "lecturer",
    badge: "הוראה אקדמית",
    title: "מרצה ומכשיר את הדור הבא של ההנדסאים",
    lead: "מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אווירית.",
    body: "אני עומד מול כיתות של הנדסאי חשמל לעתיד ומלמד אותם את המקצוע — מהתאוריה ועד לתקנות הבטיחות שמצילות חיים בשטח. הוראה מחייבת רמת דיוק אחרת לגמרי: אי אפשר ללמד תקן שלא הבנת עד הסוף, ואי אפשר לענות לסטודנט \"ככה עושים\" בלי לדעת להסביר למה. הידע שאני מביא לכל קריאת שירות הוא אותו ידע שאני נדרש להגן עליו מול כיתה.",
    points: [
      "מכללת אורט תעשייה אווירית",
      "הכשרת הנדסאי חשמל מוסמכים",
      "התמחות בתקינה ובבטיחות חשמל",
    ],
  },
  {
    id: "expert",
    badge: "מומחיות משפטית",
    title: "מומחה ונותן חוות דעת לבתי משפט",
    lead: "חוות דעת מקצועיות בתחום החשמל עבור ערכאות משפטיות.",
    body: "בתי משפט פונים אליי כדי לקבל חוות דעת מקצועית בסכסוכים, בתביעות ביטוח ובבירור אירועי נזק שמקורם בחשמל. עבודה מסוג זה מחייבת יכולת לתעד ממצא, לבסס אותו על תקן כתוב ולעמוד מאחוריו תחת חקירה נגדית. הסטנדרט התיעודי הזה מלווה אותי גם בעבודה השוטפת — כל אבחון מבוסס, מתועד וניתן להסבר.",
    points: [
      "חוות דעת מומחה בתחום החשמל",
      "בירור אירועי נזק ושריפות",
      "ליווי מקצועי בתביעות ביטוח",
    ],
  },
  {
    id: "law",
    badge: "לימודים מתקדמים",
    title: "סטודנט למשפטים — הצד הרגולטורי של החשמל",
    lead: "שנה אחרונה ללימודי משפטים במכללה האקדמית אונו.",
    body: "עבודות חשמל בישראל כפופות לחוק החשמל, לתקנות בטיחות ולתקינה מחייבת — ולכשל בהן יש השלכות משפטיות וביטוחיות ממשיות. לימודי המשפטים נועדו לחבר את השליטה הטכנית להבנה של המסגרת הרגולטורית שבתוכה היא פועלת. עבור הלקוח המשמעות פשוטה: עבודה שמבוצעת מתוך היכרות עם הדרישות שעל פיהן היא תיבחן בדיעבד, אם וכאשר תיבחן.",
    points: [
      "המכללה האקדמית אונו",
      "חוק החשמל ותקנות הבטיחות",
      "אחריות מקצועית וכיסוי ביטוחי",
    ],
  },
] as const;

/* ─── סיקור תקשורתי לאימות חיצוני ──────────────────────────── */
const MEDIA_ITEMS = [
  {
    outlet: "קשת 12",
    icon: "📺",
    title: "\u201eיצאת צדיק\u201d עם חיים אתגר",
    description:
      "ח.י שירותי חשמל נבדק בתוכנית התחקירים הצרכנית של ערוץ 12 — ונמצא צדיק.",
    href: PRESS_VALIDATION_URLS.keshet12,
    kind: "כתבת טלוויזיה",
  },
  {
    outlet: "הארץ",
    icon: "📰",
    title: "סיקור עיתונאי",
    description:
      "אזכור מקצועי של יהודה חכמוב ו-ח.י שירותי חשמל בעיתון הארץ.",
    href: PRESS_VALIDATION_URLS.haaretz,
    kind: "כתבה בעיתונות",
  },
  {
    outlet: "ערוץ 7",
    icon: "🗞️",
    title: "סיקור עיתונאי",
    description:
      "כתבה על השירות והסטנדרט המקצועי של ח.י שירותי חשמל.",
    href: PRESS_VALIDATION_URLS.arutz7,
    kind: "כתבה בעיתונות",
  },
  {
    outlet: "מגזין זמן חדש",
    icon: "📖",
    title: "כתבת מגזין",
    description:
      "כתבה על מקצועיות, אמינות ושירות אישי בח.י שירותי חשמל.",
    href: PRESS_VALIDATION_URLS.zmanHadash,
    kind: "כתבת מגזין",
  },
  {
    outlet: "עיתון מנורה",
    icon: "🕎",
    title: "סיקור בקהילה הבוכרית",
    description:
      "אזכור בעיתון \u201eמנורה\u201d — עיתון הקהילה הבוכרית בישראל.",
    href: PRESS_VALIDATION_URLS.menora,
    kind: "כתבה בעיתונות",
  },
] as const;

export default function AboutPage() {
  /**
   * הישות המלאה של יהודה חכמוב מוגדרת פעם אחת ב-app/layout.tsx ומוזרקת
   * גם לעמוד הזה. כאן אנו מקשרים אליה בלבד דרך אותו @id — ProfilePage
   * שמצביע עליה ב-mainEntity מסמן לגוגל ש\u201eזהו העמוד של הישות\u201d,
   * בלי ליצור הגדרה כפולה וסותרת של אותה ישות באותו עמוד.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "אודות יהודה חכמוב — הנדסאי חשמל ומכונות, מרצה ומומחה לבתי משפט",
        description:
          "הסמכות, ניסיון מקצועי, הוראה אקדמית, חוות דעת מומחה לבתי משפט וסיקור תקשורתי של יהודה חכמוב, מייסד ח.י שירותי חשמל.",
        inLanguage: "he-IL",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#yehuda-hahamov` },
        mainEntity: { "@id": `${SITE_URL}/#yehuda-hahamov` },
        breadcrumb: { "@id": `${SITE_URL}/about#breadcrumb` },
        significantLink: Object.values(PRESS_VALIDATION_URLS),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/about#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "דף הבית",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "אודות יהודה חכמוב",
            item: `${SITE_URL}/about`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
        <article className="max-w-4xl mx-auto">
          {/* ── Breadcrumb ── */}
          <nav aria-label="נתיב דפים" className="mb-8">
            <ol
              className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap"
              role="list"
            >
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-700 transition-colors"
                >
                  דף הבית
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ›
              </li>
              <li className="text-slate-600 font-medium" aria-current="page">
                אודות
              </li>
            </ol>
          </nav>

          {/* ── Header ── */}
          <header className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-10 text-center md:text-right">
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3">
              אודות
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-5">
              יהודה חכמוב
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-6">
              הנדסאי חשמל ומכונות מוסמך, בעל רישיון חשמלאי ראשי · מרצה ומכשיר
              הנדסאי חשמל · נותן חוות דעת מומחה לבתי משפט · סטודנט למשפטים
            </p>
            <p className="text-slate-600 leading-[1.9]">
              את{" "}
              <Link
                href="/"
                className="text-emerald-700 font-bold hover:underline"
              >
                ח.י שירותי חשמל
              </Link>{" "}
              הקמתי מתוך תפיסה אחת: עבודת חשמל היא עבודה הנדסית, לא עבודת
              תחזוקה. הרקע שאני מביא לשטח — הסמכה כפולה בהנדסת חשמל ומכונות,
              הוראה אקדמית, חוות דעת מומחה לבתי משפט ולימודי משפטים — הוא מה
              שמאפשר לי להתחייב לסטנדרט אחד: תקין, מתועד וניתן להסבר.
            </p>

            <div className="flex flex-wrap gap-2 mt-8 justify-center md:justify-start">
              {[
                "הנדסאי חשמל",
                "הנדסאי מכונות",
                "רישיון ראשי",
                "מרצה באורט",
                "מומחה לבתי משפט",
                "חשמלאי יצאת צדיק",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* ── ארבעת עמודי הסמכות ── */}
          <section
            aria-labelledby="pillars-heading"
            className="mb-10 scroll-mt-24"
          >
            <div className="mb-8 text-center md:text-right">
              <h2
                id="pillars-heading"
                className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3"
              >
                ארבעה עמודי מקצוע
              </h2>
              <p className="text-slate-600 leading-relaxed max-w-2xl md:mr-0 mx-auto">
                כל אחד מהם עומד בפני עצמו. יחד הם מסבירים למה עבודה שלי נראית
                אחרת.
              </p>
            </div>

            <div className="space-y-6">
              {AUTHORITY_PILLARS.map(
                ({ id, badge, title, lead, body, points }, index) => (
                  <section
                    key={id}
                    id={id}
                    aria-labelledby={`${id}-heading`}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 scroll-mt-24"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <span
                        className="shrink-0 w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-black"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-1.5">
                          {badge}
                        </p>
                        <h3
                          id={`${id}-heading`}
                          className="text-2xl font-black text-slate-900 leading-snug"
                        >
                          {title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-900 font-semibold leading-relaxed mb-4">
                      {lead}
                    </p>
                    <p className="text-slate-600 leading-[1.9] mb-6">{body}</p>

                    <ul
                      className="flex flex-wrap gap-2 list-none"
                      role="list"
                      aria-label={`פרטי ההסמכה: ${title}`}
                    >
                      {points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700"
                        >
                          <span
                            className="text-emerald-500 font-bold"
                            aria-hidden="true"
                          >
                            ✔
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </section>
                )
              )}
            </div>
          </section>

          {/* ── מופיע בתקשורת והוכחות בשטח ── */}
          <section
            id="media"
            aria-labelledby="media-heading"
            className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-10 scroll-mt-24"
          >
            <header className="mb-8 text-center md:text-right">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
                אימות חיצוני
              </p>
              <h2
                id="media-heading"
                className="text-3xl md:text-4xl font-black leading-tight mb-4"
              >
                מופיע בתקשורת והוכחות בשטח
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-2xl md:mr-0 mx-auto">
                אמינות מקצועית לא נמדדת במה שכתוב על העסק באתר שלו, אלא במה
                שגורמים חיצוניים בחרו לפרסם עליו. כל הקישורים כאן פתוחים
                לבדיקה.
              </p>
            </header>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none"
              role="list"
            >
              {MEDIA_ITEMS.map(
                ({ outlet, icon, title, description, href, kind }) => (
                  <li key={outlet}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group h-full flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 rounded-2xl p-6 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl" aria-hidden="true">
                          {icon}
                        </span>
                        <div>
                          <span className="block text-white font-bold text-base leading-tight group-hover:text-emerald-400 transition-colors">
                            {outlet}
                          </span>
                          {/* slate-300 ולא slate-400: הטוקן הגלובלי של
                              slate-400 הוכהה עבור רקעים בהירים, ולכן הוא
                              כהה מדי על הכרטיס הכהה הזה */}
                          <span className="block text-slate-300 text-xs mt-0.5">
                            {kind}
                          </span>
                        </div>
                      </div>
                      <p className="text-emerald-400 font-semibold text-sm mb-2">
                        {title}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed flex-1">
                        {description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-slate-300 group-hover:text-emerald-300 text-xs font-semibold mt-4 transition-colors">
                        צפייה במקור
                        <span aria-hidden="true">←</span>
                        <span className="sr-only">
                          (נפתח בחלון חדש)
                        </span>
                      </span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </section>

          {/* ── קישורים פנימיים רלוונטיים ── */}
          <section
            aria-labelledby="more-heading"
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 mb-10"
          >
            <h2
              id="more-heading"
              className="text-xl font-black text-slate-900 mb-5"
            >
              להמשך קריאה
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none" role="list">
              {[
                {
                  href: "/articles/electrical-licenses-guide",
                  label: "מדריך רישיונות חשמל — מי מורשה לעשות מה",
                },
                {
                  href: "/services",
                  label: "השירותים המקצועיים שאנחנו מספקים",
                },
                {
                  href: "/business",
                  label: "פתרונות לעסקים, מוסדות וקבלנים",
                },
                {
                  href: "/articles",
                  label: "מאמרים ומדריכים מקצועיים",
                },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between gap-3 bg-slate-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl px-5 py-4 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                  >
                    {label}
                    <span aria-hidden="true">←</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── CTA ── */}
          <section
            aria-labelledby="about-cta-heading"
            className="bg-emerald-700 text-white rounded-3xl p-10 md:p-12 text-center"
          >
            <h2
              id="about-cta-heading"
              className="text-2xl md:text-3xl font-black mb-3"
            >
              צריכים חוות דעת מקצועית?
            </h2>
            <p className="text-emerald-50 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              בין אם מדובר בתקלה בבית, בפרויקט לעסק או בחוות דעת לבית משפט —
              אשמח לשמוע ולתת מענה.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${PHONE}`}
                data-analytics-location="about-call"
                className="inline-flex items-center justify-center bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
                aria-label={`חייגו עכשיו: ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-location="about-whatsapp"
                className="inline-flex items-center justify-center border-2 border-white/70 hover:border-white text-white font-bold py-4 px-8 rounded-full transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
              >
                שליחת הודעה בוואטסאפ
              </a>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
