import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl, buildOpenGraph } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "water-heater-not-heating";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "דוד חשמל לא מחמם: מה לבדוק לבד ומתי צריך חשמלאי",
  description:
    "אין מים חמים? בדיקות פשוטות ובטוחות שאפשר לעשות לבד, התקלות הנפוצות בדוד חשמלי (גוף חימום, תרמוסטט, פחת שקופץ), חשמלאי או טכנאי דודים, וכמה עולה התיקון.",
  keywords: [
    "דוד חשמל לא מחמם",
    "דוד לא מחמם",
    "גוף חימום לדוד",
    "החלפת גוף חימום",
    "תרמוסטט לדוד",
    "דוד מקפיץ פחת",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: buildOpenGraph({
    title: "דוד חשמל לא מחמם: מה לבדוק לבד, מה התקלות הנפוצות ומתי צריך חשמלאי",
    description:
      "מדריך לתקלות בדוד חשמלי: בדיקות עצמיות בטוחות, תקלות נפוצות, חשמלאי או טכנאי דודים, וכמה עולה התיקון.",
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
    question: "כמה זמן לוקח לדוד להתחמם?",
    answer:
      "זה תלוי בגודל הדוד ובטמפרטורת המים הנכנסים. בדוד ביתי רגיל, חימום מלא לוקח בדרך כלל כמה שעות, ובחורף יותר. אם אחרי זמן ארוך מהרגיל המים עדיין קרים, כנראה שיש תקלה.",
  },
  {
    question: "ממסר הפחת קופץ כשאני מדליק את הדוד. מה לעשות?",
    answer:
      "להשאיר את הדוד כבוי ולא להרים את הפחת שוב ושוב. בדרך כלל זה סימן לזליגה בגוף החימום. חשמלאי יכול למדוד ולאשר את זה, ובדרך כלל מספיק להחליף את גוף החימום.",
  },
  {
    question: "האם אפשר להחליף גוף חימום בלי להחליף את כל הדוד?",
    answer:
      "כן, ברוב המקרים. גוף חימום ותרמוסטט הם חלקים להחלפה. מחליפים את הדוד כולו רק כשהמיכל עצמו דולף או חלוד.",
  },
  {
    question: "האם מסוכן להשאיר את הדוד דלוק כל היום?",
    answer:
      "דוד תקין עם תרמוסטט תקין מפסיק לחמם כשהמים מגיעים לטמפרטורה. זה לא מסוכן, אבל זה בזבוז חשמל. טיימר או שעון שבת חוסכים כסף. אם התרמוסטט לא מנתק והמים רותחים, זו תקלה שצריך לבדוק מיד.",
  },
  {
    question: "הנורית במפסק הדוד דולקת, אבל אין מים חמים. מה זה אומר?",
    answer:
      "זה אומר שהחשמל מגיע עד המפסק. התקלה כנראה בדוד עצמו: גוף חימום שרוף, תרמוסטט תקול, או מנתק תרמי שקפץ. את כל אלה צריך לבדוק חשמלאי.",
  },
];

const SECTIONS = [
  { id: "self-check", label: "מה לבדוק לבד לפני שמזמינים מישהו" },
  { id: "faults", label: "התקלות הנפוצות" },
  { id: "who", label: "חשמלאי או טכנאי דודים?" },
  { id: "cost", label: "כמה עולה תיקון דוד חשמל" },
  { id: "replace", label: "מתי כבר שווה להחליף את הדוד כולו" },
  { id: "saving", label: "איך לחסוך בחשמל עם הדוד" },
  { id: "scenario", label: "תרחיש נפוץ" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const FAULTS = [
  {
    fault: "גוף חימום שרוף",
    signs: "המפסק דלוק, הנורית דולקת, אבל המים לא מתחממים בכלל",
    action: "חשמלאי מודד את גוף החימום ומחליף אותו",
  },
  {
    fault: "גוף חימום \"דולף\"",
    signs: "ממסר הפחת קופץ בכל פעם שמדליקים את הדוד",
    action: "חשמלאי מאתר את הזליגה. בדרך כלל מחליפים את גוף החימום",
  },
  {
    fault: "תרמוסטט תקול",
    signs: "מים פושרים בלבד, או חם מדי ופתאום קר",
    action: "בדיקה והחלפת תרמוסטט, ולעיתים איפוס של המנתק התרמי",
  },
  {
    fault: "מפסק או חיבור שרוף",
    signs: "נורית המפסק לא נדלקת, או סימני השחרה וריח שרוף ליד המפסק או בלוח",
    action: "חשמלאי מחליף מפסק או חיבור. לא להשתמש בדוד עד התיקון",
  },
  {
    fault: "אבנית",
    signs: "המים מתחממים, אבל לאט ופחות מבעבר",
    action: "ניקוי הדוד והחלפת אנודה, בדרך כלל על ידי טכנאי דודים",
  },
  {
    fault: "בעיה בדוד השמש",
    signs: "בחורף, כשיש פחות שמש, המים לא מספיק חמים גם כשהגיבוי החשמלי דלוק",
    action: "בדיקה של החלק החשמלי, ואם הוא תקין, של הקולטים והצנרת",
  },
] as const;

const PRICES = [
  { service: "החלפת מפסק דוד", price: "החל מ-350 ₪" },
  { service: "החלפת תרמוסטט", price: "400 ₪" },
  { service: "החלפת גוף חימום", price: "450 ₪" },
  { service: "החלפת פלאנץ (מערכת גוף החימום והתרמוסטט)", price: "החל מ-720 ₪" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function WaterHeaterNotHeatingArticle() {
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
              דוד חשמל לא מחמם
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
            דוד חשמל לא מחמם: מה לבדוק לבד, מה התקלות הנפוצות ומתי צריך חשמלאי
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
            ברוב המקרים, דוד שלא מחמם נובע מאחת מארבע סיבות: המפסק או הטיימר
            כבויים, ממסר הפחת קופץ כשהדוד נדלק, התרמוסטט תקול, או גוף החימום
            שרוף.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            את שתי הראשונות אפשר לבדוק לבד בדקה, בלי לפתוח כלום. את השתיים
            האחרות צריך לבדוק חשמלאי, כי מדובר בפתיחת מכסה הדוד, שם יש מתח מלא
            ליד מים.
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
          <section aria-labelledby="self-check">
            <h2 id="self-check" className={H2}>
              מה לבדוק לבד לפני שמזמינים מישהו
            </h2>
            <p>
              שלוש בדיקות פשוטות, בלי כלים ובלי לפתוח שום מכסה, פותרות חלק גדול
              מהמקרים:
            </p>
            <ol>
              <li>
                <strong>מפסק הדוד על הקיר.</strong> ברוב הבתים יש מפסק נפרד לדוד,
                לרוב עם נורית. תוודאו שהוא דלוק. אם הנורית לא נדלקת כשמדליקים, זה
                כבר מידע חשוב לחשמלאי.
              </li>
              <li>
                <strong>שעון השבת או הטיימר.</strong> טיימר שזז, הופעל בטעות או
                שהשעון שלו לא מכוון אחרי הפסקת חשמל, יכול להשאיר את הדוד כבוי
                בדיוק בשעות שבהן אתם צריכים מים חמים.
              </li>
              <li>
                <strong>המפסק בלוח החשמל.</strong> תבדקו אם המפסק של הדוד ירד, או
                אם ממסר הפחת קפץ. אם הוא קופץ שוב{" "}
                <strong>בדיוק כשמדליקים את הדוד</strong>, אל תנסו להרים אותו שוב
                ושוב. זה סימן לתקלה בדוד עצמו.
              </li>
            </ol>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-red-900">אזהרת בטיחות</h3>
              <p className="m-0 leading-relaxed text-red-900">
                אל תפתחו את המכסה של הדוד ואל תגעו בחיבורים שלו. מאחורי המכסה יש
                מתח מלא, ליד מים ומתכת. התרמוסטט נמצא שם, וגם הוא עבודה לחשמלאי.
              </p>
            </div>
          </section>

          <section aria-labelledby="faults">
            <h2 id="faults" className={H2}>
              התקלות הנפוצות
            </h2>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="התקלות הנפוצות בדוד חשמל, הסימנים שלהן ומה עושים"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  התקלות הנפוצות בדוד חשמלי ביתי, איך מזהים כל אחת, ומה הטיפול.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      תקלה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      איך היא נראית
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מה עושים
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FAULTS.map(({ fault, signs, action }, index) => (
                    <tr key={fault} className={index % 2 === 1 ? "bg-slate-50" : undefined}>
                      <th
                        scope="row"
                        className="border border-slate-200 p-3 text-start font-bold"
                      >
                        {fault}
                      </th>
                      <td className="border border-slate-200 p-3">{signs}</td>
                      <td className="border border-slate-200 p-3">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              הסבר מפורט על ממסר פחת שקופץ, כולל איך מאתרים איזה מכשיר גורם לזה,
              נמצא במדריך{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                למה ממסר הפחת קופץ
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              חשמלאי או טכנאי דודים?
            </h2>
            <p>זו אחת השאלות הנפוצות, והתשובה תלויה בסוג התקלה:</p>
            <ul>
              <li>
                <strong>חשמלאי:</strong> כשהבעיה בחשמל. המפסק לא נדלק, הפחת קופץ,
                גוף החימום או התרמוסטט לא עובדים, או יש ריח שרוף ליד המפסק או
                הלוח.
              </li>
              <li>
                <strong>טכנאי דודים או אינסטלטור:</strong> כשהבעיה במים. נזילה
                מהדוד, לחץ מים חלש, אבנית, או בעיה בקולטים של דוד השמש.
              </li>
            </ul>
            <p>
              אם אתם לא בטוחים, התחילו מחשמלאי. רוב התקלות שבהן &quot;פשוט אין
              מים חמים&quot; הן חשמליות, וחשמלאי יכול גם להגיד לכם אם הבעיה בכלל
              לא אצלו.
            </p>
          </section>

          <section aria-labelledby="cost">
            <h2 id="cost" className={H2}>
              כמה עולה תיקון דוד חשמל
            </h2>
            <p>
              ביקור חשמלאי עולה <strong>350–400 ₪</strong>, והמחיר מתקזז אם
              מתבצעת עבודה במקום. המחירים המלאים מופיעים{" "}
              <Link href="/pricing" className={LINK}>
                במחירון
              </Link>
              .
            </p>
            <ul>
              {PRICES.map(({ service, price }) => (
                <li key={service}>
                  <strong>{service}:</strong> {price}
                </li>
              ))}
            </ul>
            <p>
              המחירים אינם כוללים מע&quot;מ. המחיר הסופי תלוי בסוג הדוד ובנגישות
              אליו. דוד על הגג או בבוידעם צפוף לוקח יותר זמן מדוד באמבטיה.
            </p>
          </section>

          <section aria-labelledby="replace">
            <h2 id="replace" className={H2}>
              מתי כבר שווה להחליף את הדוד כולו
            </h2>
            <p>
              ברוב התקלות החשמליות לא צריך להחליף דוד. גוף חימום, תרמוסטט ומפסק
              הם חלקים שמחליפים, והדוד ממשיך לעבוד. יש מצבים שבהם התיקון כבר לא
              משתלם:
            </p>
            <ul>
              <li>
                <strong>המיכל עצמו דולף.</strong> נזילה מגוף הדוד, ולא מהצנרת או
                מהחיבורים, היא בדרך כלל סוף הדרך של המיכל.
              </li>
              <li>
                <strong>חלודה בולטת על המיכל או מים חומים.</strong> סימן שהמיכל
                נאכל מבפנים.
              </li>
              <li>
                <strong>תקלות שחוזרות שוב ושוב.</strong> אם החלפתם גוף חימום כמה
                פעמים בזמן קצר, כדאי לבדוק למה, ולפעמים להחליף דוד.
              </li>
              <li>
                <strong>דוד ותיק מאוד שעולה הרבה לתקן.</strong> כשמחיר התיקון
                מתקרב למחיר של דוד חדש, עדיף לחשוב על החלפה.
              </li>
            </ul>
            <p>
              החלפת דוד כוללת גם עבודת אינסטלציה, ולכן היא נעשית בדרך כלל בשיתוף
              טכנאי דודים. החלק החשמלי, כלומר המפסק, החיבור וההגנה בלוח, צריך
              להיבדק על ידי חשמלאי, במיוחד אם הדוד החדש בהספק אחר מהישן.
            </p>
          </section>

          <section aria-labelledby="saving">
            <h2 id="saving" className={H2}>
              איך לחסוך בחשמל עם הדוד
            </h2>
            <p>
              הדוד הוא אחד הצרכנים הגדולים של חשמל בבית. כמה הרגלים פשוטים
              מורידים את החשבון בלי לוותר על מים חמים:
            </p>
            <ul>
              <li>
                <strong>טיימר או שעון שבת.</strong> לחמם רק לפני השעות שבהן
                מתקלחים, ולא להשאיר את הדוד דלוק כל היום. אם אין טיימר,{" "}
                <Link href="/pricing" className={LINK}>
                  התקנת שעון שבת ללוח
                </Link>{" "}
                היא עבודה קצרה.
              </li>
              <li>
                <strong>לנצל את דוד השמש.</strong> בימים שמשיים, גם בחורף, לבדוק
                קודם אם המים כבר חמים לפני שמדליקים את הגיבוי החשמלי.
              </li>
              <li>
                <strong>לטפל באבנית.</strong> שכבת אבנית על גוף החימום מאריכה את
                זמן החימום ומגדילה את הצריכה.
              </li>
              <li>
                <strong>לא להתעלם מפחת שקופץ.</strong> גוף חימום שדולף לא רק
                מסוכן, הוא גם עובד פחות טוב.
              </li>
            </ul>
            <p>
              רוצים לדעת כמה הדוד באמת עולה לכם בחודש? אפשר לחשב את זה ב
              <Link href="/device-calculator" className={LINK}>
                מחשבון צריכת המכשירים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="scenario">
            <h2 id="scenario" className={H2}>
              תרחיש נפוץ
            </h2>
            <p>
              זה תרחיש שחוזר אצלנו שוב ושוב, בעיקר בתחילת החורף: לקוח מתקשר
              ומספר שהדוד &quot;מקפיץ את החשמל&quot;. בכל פעם שהוא מדליק את הדוד,
              ממסר הפחת קופץ והבית כולו נכבה. הוא בטוח שהבעיה בלוח, או שצריך
              להחליף את הדוד כולו.
            </p>
            <p>
              בבדיקה מתברר בדרך כלל שגוף החימום התחיל לדלוף: הבידוד שלו נסדק,
              וזרם קטן בורח למים ולגוף הדוד. ממסר הפחת עושה בדיוק את מה שהוא אמור
              לעשות, ומנתק. החלפת גוף החימום פותרת את הבעיה, והדוד עצמו ממשיך
              לעבוד עוד שנים.
            </p>
            <p>
              הלקח: ממסר פחת שקופץ הוא לא התקלה, אלא הסימן לתקלה. אל תנתקו אותו
              ואל תעקפו אותו.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              אפשר לשלוח הודעת וואטסאפ בכל שפה, עם תמונה של מפסק הדוד ולוח החשמל,
              ולקבל הערכה ראשונית עוד לפני הביקור. השירות וההסבר ניתנים בעברית,
              ברוסית ובאנגלית.
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
          heading="הדוד לא מחמם או מקפיץ את החשמל?"
          description="בדיקה ותיקון של דוד חשמל: גוף חימום, תרמוסטט, מפסק וזליגה לפחת. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה, עם תמונה של מפסק הדוד והלוח."
          callPurpose="לתיקון דוד חשמל שלא מחמם"
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
