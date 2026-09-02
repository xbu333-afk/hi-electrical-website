import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "mimsar-pahat";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "למה ממסר הפחת קופץ ואיך מסדרים את זה? | ח.י שירותי חשמל",
  description:
    "החשמל קפץ ואי אפשר להרים את המתג? מדריך מעשי ופשוט לאיתור התקלה. מה מותר לעשות לבד ומתי חייבים לקרוא לחשמלאי מוסמך.",
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "למה ממסר הפחת קופץ (ומה עושים עכשיו)?",
    description:
      "מדריך חירום פשוט — מה לעשות כשהפחת קופץ ומתי חייבים לקרוא לחשמלאי מוסמך.",
    type: "article",
    images: [
      {
        url: articleOgImageUrl(SLUG),
        width: 1200,
        height: 630,
        alt: article.title,
      },
    ],
  },
};

/**
 * מקור אמת יחיד לשאלות ולתשובות: אותו מערך מזין את התצוגה בעמוד
 * ואת ה-FAQPage ב-JSON-LD, כדי שהסכימה לא תסתור את מה שהמשתמש רואה.
 */
const FAQ: readonly ArticleFaq[] = [
  {
    question: "ממסר הפחת קופץ ואי אפשר להרים אותו בכלל — מה זה אומר?",
    answer:
      "ממסר שאינו עולה גם כשכל המפסקים הקטנים מנותקים מעיד על תקלה בלוח עצמו, ולא במכשיר כלשהו בבית. הסיבות השכיחות הן מוליך אפס שחובר בטעות לפס ההארקה, זליגה במוליך הזנה או ממסר שנפגם. במצב הזה אין טעם להמשיך לנסות, וצריך חשמלאי בעל רישיון שיבדוק את הלוח במדידה.",
  },
  {
    question: "האם מותר לעקוף את ממסר הפחת עד שיגיע חשמלאי?",
    answer:
      "לא, בשום מצב. ממסר הפחת הוא אמצעי ההגנה היחיד מפני התחשמלות במגע ישיר, ועקיפה שלו משאירה את הבית בלי ההגנה הזאת בדיוק כשידוע שקיימת זליגה. עקיפה גם מבטלת את כיסוי הביטוח ומהווה עבירה על חוק החשמל. עדיף להשאיר מעגל אחד מנותק ולהמתין לבדיקה.",
  },
  {
    question: "הפחת קופץ רק פעם בשבוע — צריך לטפל בזה?",
    answer:
      "כן. קפיצה מקרית לכאורה היא כמעט תמיד זליגה קטנה שעולה מעל רגישות הממסר בתנאים מסוימים, למשל בלחות גבוהה או כשגוף חימום של דוד עובד. הזליגה אינה נעלמת מעצמה אלא מחמירה, עד שהיא הופכת לקפיצה יומיומית. איתור מדויק נעשה במדידת התנגדות בידוד לכל מעגל בנפרד.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות במקרה חירום?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, כולל הסבר טלפוני מה לנתק ובמה לא לגעת עד שמגיע חשמלאי. אפשר לשלוח הודעת וואטסאפ בכל שפה ולצרף תמונה של הלוח, וכך לקבל כיוון ראשוני עוד לפני הביקור.",
  },
];

const SECTIONS = [
  { id: "now", label: "מה לעשות ברגע זה" },
  { id: "stop", label: "מתי לעצור ולהזמין חשמלאי" },
  { id: "what", label: "מה ממסר הפחת עושה בפועל" },
  { id: "why", label: "למה הוא קופץ" },
  { id: "pattern", label: "אופן הקפיצה ומה הוא מגלה" },
  { id: "measure", label: "מה חשמלאי מודד" },
  { id: "prevent", label: "מה מונע קפיצות בעתיד" },
  { id: "mistakes", label: "טעויות שמחמירות את התקלה" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK =
  "font-bold text-emerald-700 no-underline hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

const STEPS = [
  {
    title: "נתקו את כל המעגלים",
    body: "הורידו את כל המפסקים הקטנים (המאמ״תים) למטה, והשאירו מורמים רק את המפסק הראשי ואת ממסר הפחת. כך כל הצרכנים מנותקים בבת אחת.",
  },
  {
    title: "הרימו את ממסר הפחת",
    body: "אם הוא עולה ונשאר למעלה — הלוח תקין והזליגה באחד המעגלים. אם הוא קופץ מיד, הפסיקו כאן: התקלה בלוח, ואין ניסיון עצמי שיועיל.",
  },
  {
    title: "העלו מעגל אחד בכל פעם",
    body: "הרימו מפסק אחד, המתינו כמה שניות ועברו לבא בתור. המעגל שבזמן העלייה שלו הפחת קופץ הוא המעגל הבעייתי. ההמתנה חשובה, כי זליגה קטנה לוקחת רגע להצטבר.",
  },
  {
    title: "בודדו את המכשיר בתוך המעגל",
    body: "נתקו מהשקעים את כל המכשירים שמוזנים מהמעגל החשוד והעלו אותו שוב. אם הפחת מחזיק, חברו מכשיר אחד בכל פעם — זה שמפיל את הפחת הוא התקול.",
  },
  {
    title: "השאירו מנותק ותעדו",
    body: "רשמו מה בדיוק הפיל את הפחת ובאיזו שעה. התיעוד מקצר מאוד את הבדיקה המקצועית, במיוחד כשהקפיצה אינה חוזרת בזמן הביקור.",
  },
] as const;

export default function MimsarPahatArticle() {
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
              ממסר פחת
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
            למה ממסר הפחת קופץ (ומה עושים עכשיו)?
          </h1>

          <p className="text-base leading-relaxed text-slate-600">
            מאת{" "}
            <Link href="/about" className={LINK}>
              יהודה חכמוב
            </Link>{" "}
            — הנדסאי חשמל ומכונות מוסמך, בעל רישיון חשמלאי ראשי, מרצה ומכשיר
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
            ממסר פחת קופץ כמעט תמיד משום שזרם קטן זולג ממעגל חי אל האדמה — דרך
            בידוד שהתבלה, דרך לחות או דרך גוף חימום סדוק. הקפיצה עצמה אינה
            התקלה; היא הראיה שההגנה זיהתה סכנה ופעלה.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            הצעד הראשון הוא לנתק את כל המפסקים הקטנים, להרים את הפחת, ואז להעלות
            מעגל אחד בכל פעם עד שהקפיצה חוזרת. אם הפחת אינו עולה גם כשהכל מנותק
            — הבעיה בלוח עצמו, ואז צריך חשמלאי בעל רישיון.
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
          <section aria-labelledby="now">
            <h2 id="now" className={`${H2} mt-0`}>
              מה לעשות ברגע זה
            </h2>
            <p>
              השלבים הבאים בטוחים לביצוע עצמי, משום שכולם נעשים מחוץ ללוח החי —
              רק בהזזת מפסקים. אין לפתוח את מכסה הלוח, לפרק רכיבים או להדק
              ברגים. המטרה כאן אינה לתקן אלא לבודד.
            </p>

            <ol className="not-prose my-8 space-y-6">
              {STEPS.map(({ title, body }, index) => (
                <li key={title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="mb-2 mt-0 text-xl font-bold text-slate-900">
                      {title}
                    </h3>
                    <p className="m-0 leading-relaxed text-slate-700">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p>
              שימו לב: דוד חשמלי ומזגן אינם מנותקים בשקע אלא במפסק בלוח, ולכן
              הבידוד שלהם נעשה שם.
            </p>
          </section>

          <section aria-labelledby="stop">
            <h2 id="stop" className={H2}>
              מתי לעצור ולהזמין חשמלאי
            </h2>
            <p>
              במצבים הבאים המשך ניסיונות עצמיים אינו רק חסר תועלת אלא מסוכן.
            </p>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-3 mt-0 text-lg font-bold text-red-900">
                הפסיקו את הניסיונות אם מתקיים אחד מאלה
              </h3>
              <ul className="m-0 list-disc space-y-2 pe-5 text-red-900">
                <li>הפחת אינו עולה גם כשכל המפסקים הקטנים מנותקים.</li>
                <li>יש ריח של פלסטיק חרוך, השחרה או זמזום מאזור הלוח.</li>
                <li>הלוח או אחד המפסקים חמים למגע.</li>
                <li>מישהו חש דקירה חשמלית במגע בברז, בכיור או במכשיר.</li>
                <li>הפחת קופץ שוב גם אחרי שנותק המעגל החשוד.</li>
              </ul>
            </div>

            <p>
              במצבים האלה הבדיקה הנדרשת אינה חזותית אלא מדידה. אפשר לראות מה
              כולל ביקור{" "}
              <Link href="/services" className={LINK}>
                איתור תקלות ובדיקת לוח
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="what">
            <h2 id="what" className={H2}>
              מה ממסר הפחת עושה בפועל
            </h2>
            <p>
              ממסר פחת, שנקרא גם מפסק מגן, משווה כל הזמן בין הזרם שנכנס דרך
              מוליך הפאזה לבין הזרם שחוזר דרך מוליך האפס. במתקן תקין השניים
              זהים.
            </p>
            <p>
              כשזרם מוצא דרך אחרת לחזור — דרך גוף אדם, דרך מים או דרך מתכת
              מוארקת — נוצר הפרש, וברגע שההפרש חוצה את רגישות הממסר הוא מנתק.
            </p>

            <h3 className={H3}>למה דווקא 30 מיליאמפר</h3>
            <p>
              ממסר ביתי מכויל ל-30 מיליאמפר, כי מעל הערך הזה מתחיל סיכון לפרפור
              חדרי הלב. המשמעות: הממסר אינו מגן על המכשירים ולא על החוטים — הוא
              מגן על אדם.
            </p>

            <h3 className={H3}>ממסר פחת אינו תחליף להארקה</h3>
            <p>
              במתקן ללא הארקה תקינה זרם התקלה עלול לזרום דרך אדם לפני שהוא זורם
              לאדמה, והממסר יפעל רק אחרי שהמגע נוצר. שני האמצעים משלימים זה את
              זה, כמוסבר במדריך{" "}
              <Link href="/articles/grounding" className={LINK}>
                הארקה — מהי ואיך מוודאים שהיא תקינה
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="why">
            <h2 id="why" className={H2}>
              למה הוא קופץ
            </h2>
            <p>
              הסיבות מסודרות מהשכיחה לנדירה — זה גם הסדר שבו כדאי לבדוק.
            </p>

            <h3 className={H3}>גוף חימום של דוד חשמלי</h3>
            <p>
              החשוד המוביל. גוף החימום נמצא בתוך מים, הבידוד שלו נסדק עם השנים
              והזרם זולג לגוף הדוד המוארק. סימן מזהה: הקפיצה קורית רק כשהדוד
              עובד, והפתרון הוא החלפת גוף החימום ולא החלפת הפחת.
            </p>

            <h3 className={H3}>מכשיר שהבידוד שלו התבלה</h3>
            <p>
              מכונת כיבוס, מדיח, מקרר ותיק או תנור בילט-אין מייצרים חום ורעידות
              שמבלים את הבידוד הפנימי, והזליגה גדלה בהדרגה.
            </p>

            <h3 className={H3}>לחות ומים</h3>
            <p>
              שקע במרפסת שנרטב בגשם, גוף תאורה שספג אדים או נזילה סמויה בקיר
              יוצרים מסלול זליגה. קפיצות כאלה מופיעות ונעלמות לפי מזג האוויר,
              ולכן קשה לאתר אותן בניחוש.
            </p>

            <h3 className={H3}>מוליכים ותיקים בקירות</h3>
            <p>
              בבתים ותיקים הבידוד מתקשה ומתפורר, ואז המעגל זולג גם בלי שום מכשיר
              מחובר. כאן נדרשת מדידת בידוד ולעיתים החלפת חיווט.
            </p>

            <h3 className={H3}>זליגה מצטברת והתעייפות הממסר</h3>
            <p>
              כל מכשיר אלקטרוני מייצר זליגה זעירה ותקינה, וכשעשרות מכשירים
              מוזנים מאותו ממסר הסכום מתקרב לרגישות שלו. הפתרון הוא פיצול הבית
              לכמה ממסרים, כמפורט במדריך{" "}
              <Link href="/articles/panel-upgrade" className={LINK}>
                החלפה ושדרוג לוח חשמל
              </Link>
              . גם לממסר עצמו יש תוחלת חיים, ואחרי 10–15 שנה הוא עשוי לאבד דיוק.
            </p>
          </section>

          <section aria-labelledby="pattern">
            <h2 id="pattern" className={H2}>
              אופן הקפיצה ומה הוא מגלה
            </h2>
            <p>
              עוד לפני מדידה, התזמון של הקפיצה מצמצם מאוד את האפשרויות.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="תבניות קפיצה של ממסר פחת ומשמעותן"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  תבניות הקפיצה השכיחות והצעד הנכון לכל אחת. אישור סופי מתקבל
                  במדידה ולא בהשערה.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מתי הפחת קופץ
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      ההסבר הסביר
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      הצעד הנכון
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      מיד, גם כשהכל מנותק
                    </th>
                    <td className="border border-slate-200 p-3">
                      תקלה בלוח, לרוב ערבוב אפס והארקה
                    </td>
                    <td className="border border-slate-200 p-3">
                      להפסיק ולהזמין בדיקת לוח
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      רק כשהדוד דולק
                    </th>
                    <td className="border border-slate-200 p-3">
                      בידוד סדוק בגוף החימום
                    </td>
                    <td className="border border-slate-200 p-3">
                      לנתק את המעגל ולהחליף גוף חימום
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      בימי גשם או לחות
                    </th>
                    <td className="border border-slate-200 p-3">
                      חדירת מים לשקע חוץ או לגוף תאורה
                    </td>
                    <td className="border border-slate-200 p-3">
                      לאתר את נקודת החדירה ולאטום
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      בהדלקת מכשיר מסוים
                    </th>
                    <td className="border border-slate-200 p-3">
                      בידוד שהתבלה במכשיר עצמו
                    </td>
                    <td className="border border-slate-200 p-3">
                      להוציא אותו משימוש עד לתיקון
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      פעם בשבוע, בלי חוקיות
                    </th>
                    <td className="border border-slate-200 p-3">
                      זליגה מצטברת או תקלה סמויה בבידוד
                    </td>
                    <td className="border border-slate-200 p-3">
                      מדידת בידוד לכל מעגל בנפרד
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              המקרה האחרון הוא המתסכל ביותר, והוא כמעט לא נפתר בשיטת הניתוק
              והניסוי. הטיפול בו מפורט במדריך{" "}
              <Link href="/articles/ghost-tripping" className={LINK}>
                קפיצות פחת וקצרים סמויים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="measure">
            <h2 id="measure" className={H2}>
              מה חשמלאי מודד
            </h2>
            <p>
              ההבדל בין ניסיון עצמי לבדיקה מקצועית הוא מספרים. נמדדת התנגדות
              הבידוד של כל מעגל במכשיר מגר, נמדד זרם הזליגה בעומס אמיתי, ונבדקים
              זמן הניתוק וזרם ההפעלה של הממסר מול הערכים שהיצרן מצהיר עליהם.
            </p>
            <p>
              במקביל נמדדת רציפות מוליך ההגנה ועכבת לולאת התקלה, שקובעת אם המיגון
              ינתק מהר די הצורך בעת קצר. הסבר על קריאת המספרים מופיע במדריך{" "}
              <Link href="/articles/fault-loop-impedance" className={LINK}>
                בדיקת הארקה ולולאת תקלה
              </Link>
              .
            </p>
            <p>
              אני מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אוירית, ומלמד בדיוק
              את שיטות המדידה האלה. בחוות הדעת שאני נותן לבתי משפט אני רואה שוב
              ושוב פחת שקפץ חודשים, נעקף או הוחלף בלי בדיקה — ובסוף הפך לתביעה.
            </p>
          </section>

          <section aria-labelledby="prevent">
            <h2 id="prevent" className={H2}>
              מה מונע קפיצות בעתיד
            </h2>
            <ul>
              <li>
                <strong>בדיקה חודשית בכפתור ה-T.</strong> ממסר שאינו קופץ בלחיצה
                הוא ממסר שאינו מגן.
              </li>
              <li>
                <strong>פיצול לכמה ממסרי פחת.</strong> מונע מצב שבו תקלה נקודתית
                מחשיכה את כל הדירה, ומצמצם זליגה מצטברת.
              </li>
              <li>
                <strong>מעגל נפרד לצרכנים כבדים.</strong> דוד חשמלי, כיריים
                אינדוקציה, תנור בילט-אין, משאבת חום או מערכת מיזוג מיני-מרכזי
                צריכים מעגל והגנה משל עצמם.
              </li>
              <li>
                <strong>הפרדה מלאה בין אפס והארקה.</strong> זו הסיבה השכיחה
                לקפיצות שנראות אקראיות.
              </li>
            </ul>
            <p>
              צריכת חשמל חריגה ומכשירים שמקצרים משפיעים ישירות על החשבון שלכם.
              תוכלו להיעזר ב
              <Link href="/calculator" className={LINK}>
                מחשבון עלויות החשמל
              </Link>{" "}
              כדי לבדוק אם הצריכה שלכם חורגת מהצפוי.
            </p>
          </section>

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className={H2}>
              טעויות שמחמירות את התקלה
            </h2>

            <h3 className={H3}>לעקוף או לנטרל את הפחת</h3>
            <p>
              הטעות החמורה מכולן. עקיפה משאירה את הבית בלי ההגנה היחידה מפני
              התחשמלות, בדיוק כשידוע שקיימת זליגה, ומבטלת גם את כיסוי הביטוח.
            </p>

            <h3 className={H3}>להחליף את הפחת בלי לחפש את הסיבה</h3>
            <p>
              ממסר חדש על מעגל שזולג יקפוץ באותה תדירות בדיוק. החלפה מוצדקת רק
              אחרי שנמדד שהזליגה תקינה והבעיה במנגנון.
            </p>

            <h3 className={H3}>לפתוח את הלוח ולהדק ברגים</h3>
            <p>
              בלוח יש חלקים חיים גם כשהמפסק הראשי מונמך, ובכלל זה מוליכי ההזנה.
              עבודה בלוח שמורה בחוק לבעל רישיון בדרגה המתאימה.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              במצב חירום חשוב להבין מהר מה לנתק ובמה לא לגעת, ולכן ההסבר ניתן
              בשפה שנוחה לכם — עברית, רוסית או אנגלית. אפשר גם לשלוח הודעת
              וואטסאפ בכל שפה, לצרף תמונה של הלוח ולקבל כיוון ראשוני עוד לפני
              הביקור.
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
          heading="הפחת קופץ ואי אפשר להחזיר את החשמל?"
          description="איתור זליגה במדידה, בדיקת ממסרי הפחת וזמני הניתוק שלהם ותיקון הליקוי עם תעודת בדיקה חתומה — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לטיפול בקפיצות ממסר פחת"
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
