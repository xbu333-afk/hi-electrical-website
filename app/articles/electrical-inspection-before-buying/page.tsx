import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl, buildOpenGraph } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "electrical-inspection-before-buying";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "בדיקת חשמל לפני קניית דירה: מה בודקים וכמה זה עולה",
  description:
    "קונים דירה יד שנייה? מה כוללת בדיקת חשמל לפני קנייה, אילו סימני אזהרה לחפש בביקור, מה לשאול את המוכר, מה עושים עם הממצאים וכמה זה עולה. מדריך של הנדסאי חשמל בעל רישיון ראשי.",
  keywords: [
    "בדיקת חשמל לפני קניית דירה",
    "בדיקת חשמל דירה יד שנייה",
    "בדיקת מערכת חשמל",
    "בדק בית חשמל",
    "בדיקת לוח חשמל",
    "בדיקת הארקה בדירה",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: buildOpenGraph({
    title: "בדיקת חשמל לפני קניית דירה: מה בודקים, כמה זה עולה ולמה זה חוסך כסף",
    description:
      "מדריך לקונים: מה כוללת בדיקת חשמל לפני קנייה, סימני אזהרה, שאלות למוכר ומה עושים עם הממצאים.",
    url: `${SITE_URL}/articles/${SLUG}`,
    type: "article",
    images: [
      {
        url: articleOgImageUrl(SLUG),
        width: 1200,
        height: 630,
        alt: article.title,
      },
    ],
  }),
};

/**
 * מקור אמת יחיד לשאלות ולתשובות: אותו מערך מזין את התצוגה בעמוד
 * ואת ה-FAQPage ב-JSON-LD, כדי שהסכימה לא תסתור את מה שהמשתמש רואה.
 */
const FAQ: readonly ArticleFaq[] = [
  {
    question: "האם חובה לבדוק חשמל לפני קניית דירה?",
    answer:
      "לא, זו לא חובה בחוק. זו בדיקה שהקונה מזמין כדי לדעת מה מצב המערכת לפני שהוא מתחייב. בדירות יד שנייה, ובמיוחד בבניינים ותיקים, היא מומלצת מאוד.",
  },
  {
    question: "כמה זמן לוקחת הבדיקה?",
    answer:
      "בדירה רגילה, בדרך כלל שעה עד שעתיים. הדוח הכתוב נשלח בדרך כלל עד יום-יומיים אחרי הבדיקה.",
  },
  {
    question: "האם צריך שהמוכר יהיה נוכח?",
    answer:
      "לא חובה, אבל צריך גישה לדירה וללוח החשמל, ושהחשמל יהיה מחובר. אם המוכר נוכח, אפשר לשאול אותו במקום על עבודות שנעשו.",
  },
  {
    question: "האם הבדיקה מתאימה גם לדירה חדשה מקבלן?",
    answer:
      "כן. גם בדירה חדשה מוצאים לפעמים ליקויים: מפסקים לא מתאימים, הארקה חסרה במעגל, או חיבורים רופפים בלוח שעלולים לגרום לשריפה. עדיף לגלות אותם לפני מסירת הדירה, כשהקבלן עדיין אחראי לתקן.",
  },
  {
    question: "מה ההבדל בין הבדיקה הזו לבדיקה של בודק חשמל?",
    answer:
      "בדיקה לפני קנייה נותנת תמונת מצב והמלצות לפני החלטה. בודק חשמל בעל רישיון בודק נותן תעודת בדיקה רשמית למתקן, למשל לצורך חיבור או הגדלת חיבור מול חברת החשמל. אלה שני שירותים שונים למטרות שונות.",
  },
];

const SECTIONS = [
  { id: "why", label: "למה לבדוק חשמל לפני שחותמים" },
  { id: "what", label: "מה בודקים בפועל" },
  { id: "warning-signs", label: "סימני אזהרה שאפשר לזהות כבר בביקור" },
  { id: "seller", label: "מה לשאול את המוכר" },
  { id: "findings", label: "מה עושים עם הממצאים" },
  { id: "cost", label: "כמה עולה בדיקת חשמל לפני קנייה" },
  { id: "who", label: "מי מורשה לבצע את הבדיקה" },
  { id: "case", label: "מקרה מהשטח" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const CHECKS = [
  {
    item: "לוח החשמל",
    how: "פתיחת הלוח, בדיקת מפסקים, חיבורים, סימני חום ושנת התקנה משוערת",
    why: "לוח ישן או עמוס הוא המקור הנפוץ לתקלות ולשריפות",
  },
  {
    item: "ממסר פחת",
    how: "בדיקה שקיים, ומדידת זרם וזמן הניתוק שלו",
    why: "זה הרכיב שמנתק את החשמל כשזרם עובר דרך אדם",
  },
  {
    item: "הארקה",
    how: "מדידת רציפות מוליך ההגנה בשקעים ומדידת עכבת לולאת תקלה",
    why: "שקע עם שלושה חורים לא אומר שיש הארקה",
  },
  {
    item: "גודל החיבור",
    how: "בדיקה אם החיבור חד-פאזי או תלת-פאזי, ובכמה אמפר",
    why: "קובע אם אפשר להוסיף מזגנים, אינדוקציה או משאבת חום בלי שהחשמל יקפוץ",
  },
  {
    item: "חיווט",
    how: "בדיקה מדגמית בשקעים ובקופסאות: סוג הבידוד, חתך החוטים, צבעים",
    why: "חיווט ישן או דק מדי מתחמם תחת עומס",
  },
  {
    item: "חדרים רטובים",
    how: "חימום בחדר הרחצה, השוואת פוטנציאלים ומרחקי שקעים ממים",
    why: "שם הסיכון להתחשמלות הכי גבוה",
  },
  {
    item: "תוספות ושיפוצים",
    how: "חיפוש חיבורים מאולתרים, הארכות קבועות, מעגלים שהוספו בלי תכנון",
    why: "שיפוץ לא מקצועי הוא מקור נפוץ לתקלות נסתרות",
  },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function ElectricalInspectionBeforeBuyingArticle() {
  return (
    <div className="bg-slate-50 px-6 py-12 text-slate-900 md:py-20">
      <script {...jsonLdScriptProps(buildArticleJsonLd(SLUG, FAQ))} />

      <nav
        aria-label="מסלול ניווט"
        className="mx-auto mb-6 max-w-4xl text-sm text-slate-600"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-emerald-700 hover:underline">
              דף הבית
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/articles" className="hover:text-emerald-700 hover:underline">
              מאמרים ומדריכים
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span aria-current="page" className="font-medium text-slate-700">
              בדיקת חשמל לפני קניית דירה
            </span>
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-12">
        <header className="mb-8 border-b border-gray-100 pb-8">
          <p className="mb-4">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-800">
              {article.category}
            </span>
          </p>

          <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
            בדיקת חשמל לפני קניית דירה: מה בודקים, כמה זה עולה ולמה זה חוסך כסף
          </h1>

          <p className="text-base leading-relaxed text-slate-600">
            מאת{" "}
            <Link href="/about" className={LINK}>
              יהודה חכמוב
            </Link>{" "}
            — הנדסאי חשמל והנדסאי מכונות, בעל רישיון חשמלאי ראשי, מרצה ומכשיר
            הנדסאי חשמל ונותן חוות דעת מומחה לבתי משפט.
          </p>

          <ArticleDateline slug={SLUG} />
        </header>

        <section
          aria-labelledby="short-answer"
          className="mb-10 rounded-2xl border-r-4 border-emerald-600 bg-emerald-50 p-6"
        >
          <h2 id="short-answer" className="mb-3 text-xl font-bold text-emerald-900">
            התשובה הקצרה
          </h2>
          <p className="leading-relaxed text-slate-800">
            בדיקת חשמל לפני קניית דירה בודקת את מה שלא רואים בביקור: מצב לוח
            החשמל, קיום ותקינות של הארקה וממסר פחת, גודל החיבור, ומצב החיווט
            בקירות. היא נמשכת בדרך כלל שעה עד שעתיים, ובסופה מקבלים דוח עם
            ממצאים ומדידות.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            הבדיקה עולה כמה מאות שקלים. תיקון של מערכת חשמל ישנה אחרי הקנייה
            יכול לעלות אלפים ועשרות אלפים. דוח מסודר מאפשר לדעת מראש על מה
            משלמים, ולעיתים גם לנהל משא ומתן על המחיר.
          </p>
        </section>

        <nav
          aria-label="תוכן העניינים"
          className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="mb-3 text-lg font-bold text-slate-900">תוכן העניינים</h2>
          <ol className="list-decimal space-y-2 pe-5 text-slate-700 marker:font-bold marker:text-emerald-700">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-emerald-700 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-emerald-700 prose-strong:text-slate-900 marker:text-emerald-700 rtl:prose-reverse">
          <section aria-labelledby="why">
            <h2 id="why" className={H2}>
              למה לבדוק חשמל לפני שחותמים
            </h2>
            <p>
              בביקור בדירה רואים קירות צבועים, שקעים חדשים ומטבח משופץ. לא רואים
              את מה שקורה מאחורי הטיח ובתוך הלוח. שקע חדש יכול להיות מחובר
              לחיווט בן 50 שנה, ולוח שנראה מסודר יכול להיות בלי ממסר פחת בכלל.
            </p>
            <p>
              מערכת חשמל היא גם אחד הדברים היקרים לתקן בדירה. החלפת חיווט מחייבת
              חציבה בקירות, צבע ולעיתים פירוק ארונות. אם מגלים את זה אחרי הקנייה,
              העלות כולה עליכם.
            </p>
            <p>
              יש גם עניין של בטיחות. דירה שתגורו בה עם ילדים, מזגנים, כיריים
              אינדוקציה ודוד חשמלי צריכה מערכת שתעמוד בעומס ותגן עליכם בעת תקלה.
            </p>
          </section>

          <section aria-labelledby="what">
            <h2 id="what" className={H2}>
              מה בודקים בפועל
            </h2>
            <p>
              בדיקה מקצועית היא לא &quot;הסתכלות&quot;. היא שילוב של בדיקה חזותית
              ומדידות במכשור מכויל.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="מה נבדק בבדיקת חשמל לפני קניית דירה"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  הרכיבים שנבדקים בבדיקת חשמל לפני קניית דירה, אופן הבדיקה
                  והחשיבות של כל אחד.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מה נבדק
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      איך
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      למה זה חשוב
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKS.map(({ item, how, why }, index) => (
                    <tr key={item} className={index % 2 === 1 ? "bg-slate-50" : undefined}>
                      <th
                        scope="row"
                        className="border border-slate-200 p-3 text-start font-bold"
                      >
                        {item}
                      </th>
                      <td className="border border-slate-200 p-3">{how}</td>
                      <td className="border border-slate-200 p-3">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              בסוף הבדיקה מקבלים דוח בכתב: מה נמצא תקין, מה דורש תיקון, ומה דחוף.
              דוח טוב כולל את הערכים שנמדדו, ולא רק &quot;תקין&quot; או &quot;לא
              תקין&quot;. הסבר מפורט על מדידות ההארקה נמצא במדריך{" "}
              <Link href="/articles/fault-loop-impedance" className={LINK}>
                בדיקת הארקה ולולאת תקלה
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="warning-signs">
            <h2 id="warning-signs" className={H2}>
              סימני אזהרה שאפשר לזהות כבר בביקור
            </h2>
            <p>
              את רוב הבעיות מגלים רק במדידה, אבל יש סימנים שכדאי לשים לב אליהם
              כבר בביקור הראשון. אם ראיתם אחד מהם, זו סיבה טובה להזמין בדיקה לפני
              שממשיכים:
            </p>
            <ul>
              <li>
                <strong>לוח עם נתיכים מתברגים (&quot;פקקים&quot;)</strong> במקום
                מפסקים אוטומטיים. סימן ללוח ישן מאוד.
              </li>
              <li>
                <strong>אין ממסר פחת בלוח,</strong> או שיש ממסר שלחצן הבדיקה שלו
                לא מפיל אותו.
              </li>
              <li>
                <strong>לוח חשמל מסורבל ולא מסודר,</strong> עם חוטים שיוצאים לכל
                כיוון ומפסקים בלי סימון.
              </li>
              <li>
                <strong>שקעים שרופים או שחורים, ריח שרוף או חום</strong> בלוח,
                בשקעים או במפסקים.
              </li>
              <li>
                <strong>שקעים עם שני חורים בלבד,</strong> או מפצלים ומאריכים
                שמחוברים באופן קבוע.
              </li>
              <li>
                <strong>מזגנים רבים בדירה עם חיבור חד-פאזי קטן.</strong> סימן
                שהמערכת עובדת קרוב לקצה.
              </li>
              <li>
                <strong>חוטים גלויים, קופסאות פתוחות או חיבורים מאולתרים,</strong>{" "}
                במיוחד במרפסות סגורות ובתוספות בנייה.
              </li>
            </ul>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-red-900">אזהרת בטיחות</h3>
              <p className="m-0 leading-relaxed text-red-900">
                בביקור בדירה אל תפתחו את לוח החשמל בעצמכם, ואל תגעו בחוטים
                גלויים או בשקעים שנראים שרופים. התבוננו, צלמו ושלחו לחשמלאי
                מוסמך.
              </p>
            </div>
          </section>

          <section aria-labelledby="seller">
            <h2 id="seller" className={H2}>
              מה לשאול את המוכר
            </h2>
            <p>כמה שאלות פשוטות חוסכות הרבה ניחושים:</p>
            <ol>
              <li>מתי הוחלף לוח החשמל, ומי החליף אותו? יש קבלה או תעודה?</li>
              <li>מה גודל החיבור? הנתון מופיע בחשבון של חברת החשמל.</li>
              <li>נעשו עבודות חשמל בשיפוץ? על ידי חשמלאי מוסמך?</li>
              <li>יש מעגלים שקופצים לעיתים קרובות? איזה?</li>
              <li>
                יש תוספות בנייה, כמו מרפסת שנסגרה או חדר שנוסף? איך חוברו לחשמל?
              </li>
            </ol>
            <p>
              תשובה מתחמקת לשאלות האלה היא לא בהכרח סימן רע, אבל זו סיבה לבדוק
              לעומק.
            </p>
          </section>

          <section aria-labelledby="findings">
            <h2 id="findings" className={H2}>
              מה עושים עם הממצאים
            </h2>
            <p>
              דוח בדיקה לא אמור להפחיד אתכם מהדירה. כמעט בכל דירה ישנה יש משהו
              לתקן. המטרה היא לדעת <strong>מה</strong> ו
              <strong>כמה זה יעלה</strong>, לפני שמתחייבים.
            </p>
            <ul>
              <li>
                <strong>ממצאים קלים,</strong> כמו שקע תקול או מפסק בודד: מתקנים
                אחרי הכניסה, בעלות נמוכה.
              </li>
              <li>
                <strong>ממצאים בינוניים,</strong> כמו לוח ללא ממסר פחת או הארקה
                חסרה במעגלים מסוימים: כדאי לקבל הצעת מחיר לתיקון ולהביא אותה
                לשיחה עם המוכר.
              </li>
              <li>
                <strong>ממצאים מהותיים,</strong> כמו חיווט ישן בכל הדירה או לוח
                שצריך להחליף: זה כבר שיקול במחיר הדירה. מידע על החלפת לוח נמצא
                במדריך{" "}
                <Link href="/articles/panel-upgrade" className={LINK}>
                  החלפה ושדרוג לוח חשמל
                </Link>
                , ועל הגדלת חיבור במדריך{" "}
                <Link href="/articles/three-phase-upgrade" className={LINK}>
                  שדרוג לתלת-פאזי
                </Link>
                .
              </li>
            </ul>
            <p>
              לשאלות משפטיות, כמו האם ואיך לכלול את הממצאים בחוזה, כדאי להתייעץ
              עם עורך הדין שמלווה את העסקה.
            </p>
          </section>

          <section aria-labelledby="cost">
            <h2 id="cost" className={H2}>
              כמה עולה בדיקת חשמל לפני קנייה
            </h2>
            <p>
              בדיקת מערכת חשמל מקיפה, כולל דוח מצב, עולה אצלנו{" "}
              <strong>החל מ-450 ₪</strong>. המחיר הסופי תלוי בגודל הדירה, בגודל
              הלוח ובמספר המעגלים. המחירים מופיעים{" "}
              <Link href="/pricing" className={LINK}>
                במחירון
              </Link>
              .
            </p>
            <p>
              כדאי להשוות את זה למה שהבדיקה יכולה לחשוף: החלפת לוח חשמל מתחילה
              בכ-1,500 ₪, והחלפת חיווט בדירה שלמה יכולה להגיע לעשרות אלפי שקלים.
              בדיקה של כמה מאות שקלים היא ביטוח זול מול הסכומים האלה.
            </p>
            <p>
              <strong>מתי להזמין:</strong> אחרי שהחלטתם שהדירה מעניינת אתכם,
              ולפני החתימה על החוזה. ככה יש לכם זמן לקבל הצעת מחיר לתיקונים,
              ולהביא אותה לשיחה עם המוכר.
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי מורשה לבצע את הבדיקה
            </h2>
            <p>
              בדיקה של מערכת חשמל צריכה להתבצע על ידי חשמלאי בעל רישיון בתוקף,
              בדרגה שמתאימה לגודל המתקן. כדאי לבקש את מספר הרישיון ולבדוק אותו
              במאגר החשמלאים של משרד העבודה. הסבר על דרגות הרישיון נמצא ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
            <p>
              בדיקה לפני קנייה נועדה לתת לכם תמונת מצב ומידע לקבלת החלטה, לפני
              שאתם מתחייבים.
            </p>
            <p>
              אני עצמי הנדסאי חשמל והנדסאי מכונות, בעל רישיון חשמלאי ראשי. אני
              מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אווירית, ונותן חוות דעת
              מומחה לבתי משפט בתחום החשמל. מכאן גם החשיבות שאני מייחס לדוח כתוב
              עם ערכים מדודים: במחלוקת, זה מה שמוכיח מה היה המצב ביום הבדיקה.
            </p>
          </section>

          <section aria-labelledby="case">
            <h2 id="case" className={H2}>
              מקרה מהשטח
            </h2>
            <p>
              בדירת 4 חדרים בבניין משנות ה-70 בהרצליה, הדירה נראתה משופצת: לוח
              חשמל שנראה חדש ושקעים חדשים בכל החדרים. בבדיקה התברר שאין הארקה
              במעגלים, וממסר הפחת לא ניתק כשבדקנו אותו.
            </p>
            <p>
              המוכר התחייב בחוזה למערכת חשמל תקינה, ולכן הקונה דרש ממנו לשאת בעלות
              התיקון. בלי הבדיקה, הוא היה מגלה את זה רק אחרי הכניסה, ומשלם בעצמו.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              הבדיקה, ההסבר והדוח ניתנים בעברית, ברוסית ובאנגלית, לפי מה שנוח
              לכם. אפשר לשלוח הודעת וואטסאפ בכל שפה, עם תמונה של לוח החשמל
              מהביקור, ולקבל הערכה ראשונית עוד לפני הבדיקה.
            </p>
            <p>
              אנחנו עובדים בפתח תקווה, בשרון ובכל אזור המרכז. ראו{" "}
              <Link href="/cities" className={LINK}>
                אזורי השירות
              </Link>
              .
            </p>
          </section>
        </div>

        <section aria-labelledby="faq" className="mt-14 border-t border-gray-100 pt-10">
          <h2 id="faq" className={`${H2} mt-0`}>
            שאלות נפוצות
          </h2>

          <ArticleFaqList items={FAQ} />
        </section>

        <ArticleVideoCta
          heading="קונים דירה? כדאי לבדוק את החשמל לפני שחותמים"
          description="בדיקת מערכת חשמל מקיפה לפני קנייה: לוח, הארקה, ממסר פחת, גודל חיבור וחיווט, עם דוח כתוב וערכים מדודים. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה, עם תמונה של הלוח מהביקור."
          callPurpose="לתיאום בדיקת חשמל לפני קניית דירה"
        />
      </article>

      <nav
        aria-label="ניווט מאמרים"
        className="mx-auto mt-8 flex max-w-4xl items-center justify-between text-sm"
      >
        <Link
          href="/articles"
          className="font-medium text-slate-600 transition-colors hover:text-emerald-700"
        >
          <span aria-hidden="true">← </span>כל המאמרים
        </Link>
        <Link
          href="/"
          className="font-medium text-slate-600 transition-colors hover:text-emerald-700"
        >
          דף הבית
        </Link>
      </nav>
    </div>
  );
}
