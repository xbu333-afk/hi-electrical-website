import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "ghost-tripping";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "קפיצות פחת וקצרים סמויים — איך מאתרים תקלה שנעלמת",
  description: article.excerpt,
  keywords: [
    "ממסר פחת קופץ",
    "קפיצות פחת ללא סיבה",
    "קצר סמוי בחשמל",
    "זליגת זרם",
    "בדיקת התנגדות בידוד",
    "מגר Megger",
    "Sonel MPI 520",
    "איתור תקלות חשמל",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "קפיצות פחת וקצרים סמויים: איך מאתרים תקלה שנעלמת?",
    description:
      "למה שיטת הניתוק והניסוי נכשלת, ואיך מדידת התנגדות בידוד במגר וב-Sonel MPI 520 חושפת את מקור הזליגה — מדריך מאת הנדסאי חשמל בעל רישיון ראשי.",
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
    question: "למה ממסר הפחת קופץ רק לפעמים ולא כל יום?",
    answer:
      "מפני שהזליגה תלויה בתנאים משתנים. בידוד שהתיישן או שספג רטיבות מזליג יותר כשהלחות עולה, כשהמוליך מתחמם או כשמכשיר מסוים דווקא פועל. כל עוד סכום הזליגות נמצא מתחת לסף של 30 מיליאמפר הפחת מחזיק, וברגע שהוא חוצה אותו — הוא מנתק. זו הסיבה שתקלה כזו נראית אקראית, ובפועל היא לגמרי מדידה.",
  },
  {
    question: "מה זה מגר (Megger) ולמה הוא מוצא מה שבודק מתח רגיל לא מוצא?",
    answer:
      "מגר הוא מכשיר למדידת התנגדות בידוד, שבודק את המעגל במתח גבוה מהמתח שבו הוא עובד — בדרך כלל 500 וולט במתח ישר. בודק מתח רגיל בודק אם יש מתח, אך אינו מפעיל מאמץ על הבידוד. בידוד סדוק או לח יכול להיראות תקין לחלוטין ב-230 וולט ולהתמוטט תחת מאמץ, ולכן רק מדידה במגר חושפת אותו לפני שהוא הופך לתקלה.",
  },
  {
    question: "כמה זמן לוקח לאתר קצר סמוי?",
    answer:
      "כשהאיתור נעשה במדידה ולא בניחוש, רוב התקלות מאותרות בביקור אחד של שעה עד שלוש שעות. משך הזמן תלוי במספר המעגלים בלוח ובנגישות של נקודות החיבור. תקלות שתלויות ברטיבות או בעונה עשויות לדרוש מדידה חוזרת, ובמקרים כאלה מתעדים את הערכים ומשווים אותם לאורך זמן.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית. אפשר גם לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של לוח החשמל ולתאר מתי הפחת קופץ — וכך לקבל הערכה ראשונית עוד לפני הביקור.",
  },
];

const SECTIONS = [
  { id: "what-is", label: "מה זו תקלה סמויה?" },
  { id: "causes", label: "שלוש הסיבות הנפוצות לזליגה נסתרת" },
  { id: "elimination", label: "למה שיטת ״נתק ותנסה״ נכשלת" },
  { id: "tools", label: "הכלים שחושפים את מה שהעין לא רואה" },
  { id: "process", label: "תהליך האבחון שלב אחר שלב" },
  { id: "urgent", label: "מתי זו כבר לא אי-נוחות אלא סכנה" },
  { id: "expertise", label: "למה זה דורש מדידה ולא ניסיון בלבד" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function GhostTrippingArticle() {
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
              קפיצות פחת וקצרים סמויים
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
            קפיצות פחת וקצרים סמויים: איך מאתרים תקלה שנעלמת?
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
            קפיצת פחת ״ללא סיבה״ כמעט תמיד נגרמת מזליגת זרם נסתרת בבידוד של אחד
            המעגלים. הזליגה קיימת כל הזמן, אך רק כשסכום הזליגות בלוח חוצה את סף
            הרגישות של ממסר הפחת — בדרך כלל 30 מיליאמפר — הוא מנתק.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            לכן אי אפשר לאתר תקלה כזו בניתוק וניסוי, אלא רק במדידה. מכשיר מגר
            (Megger) בודק את התנגדות הבידוד במתח 500 וולט וחושף בידוד פגום, ורב-
            מודד מתקנים כמו Sonel MPI 520 מודד במקביל את זמן הניתוק של הפחת, את
            עכבת לולאת התקלה ואת התנגדות ההארקה.
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
          <section aria-labelledby="what-is">
            <h2 id="what-is" className={H2}>
              מה זו תקלה סמויה?
            </h2>
            <p>
              תקלה סמויה היא תקלה שקיימת באופן קבוע במתקן, אך מתבטאת רק מדי פעם.
              המתקן נראה תקין, הכול עובד, ואז פעם בשבוע או פעם בחודש הפחת מנתק.
            </p>
            <p>
              המפתח להבנה הוא ש<strong>ממסר הפחת מודד סכום</strong>. הוא משווה
              בין הזרם שנכנס לזרם שיוצא, וכל הפרש ביניהם הוא זרם שזולג החוצה.
            </p>
            <p>
              במתקן ממוצע כמעט כל מעגל מזליג מעט. כשהזליגות מצטברות ומתקרבות לסף,
              די בגורם קטן — מזגן שנדלק, יום לח במיוחד — כדי לחצות אותו.
            </p>
            <p>
              זו בדיוק הסיבה שהתופעה נראית אקראית. היא אינה אקראית כלל, אלא
              מצטברת — ולכן היא ניתנת למדידה מדויקת. אם ממסר הפחת שלכם קופץ
              עכשיו ואתם צריכים פתרון מיידי, יש{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                מדריך חירום נפרד
              </Link>{" "}
              לצעדים הראשונים.
            </p>
          </section>

          <section aria-labelledby="causes">
            <h2 id="causes" className={H2}>
              שלוש הסיבות הנפוצות לזליגה נסתרת
            </h2>

            <h3 className={H3}>1. רטיבות שחדרה לתשתית</h3>
            <p>
              זו הסיבה הנפוצה ביותר. נזילה בצנרת, איטום לקוי במרפסת או קופסת
              הסתעפות בקיר חיצוני מכניסים לחות אל המוליכים.
            </p>
            <p>
              מים מוליכים זרם, ולכן הזליגה עולה ויורדת עם רמת הלחות. תקלה שקופצת
              בעיקר בחורף או אחרי מקלחת מצביעה כמעט תמיד לכיוון הזה.
            </p>

            <h3 className={H3}>2. בידוד שהתיישן או נפגע מכנית</h3>
            <p>
              בידוד PVC מתקשה ונסדק עם השנים, במיוחד במעגלים שנושאים עומס גבוה
              ומתחממים. מסמר שננעץ בקיר או מוליך שנמעך בזמן שיפוץ יוצרים נזק
              נקודתי שאי אפשר לראות.
            </p>

            <h3 className={H3}>3. מכשיר חשמלי עם תקלה פנימית</h3>
            <p>
              דוד מים עם גוף חימום מחורר, מכונת כביסה עם מנוע לח או מקרר ישן
              מזליגים דרך המכשיר עצמו. במקרה כזה התשתית תקינה לגמרי והבעיה ניידת.
            </p>
          </section>

          <section aria-labelledby="elimination">
            <h2 id="elimination" className={H2}>
              למה שיטת ״נתק ותנסה״ נכשלת
            </h2>
            <p>
              הגישה הרווחת היא לנתק מעגלים אחד אחרי השני ולחכות לראות אם הפחת
              קופץ שוב. הבעיה היא שזו אינה בדיקה אלא המתנה.
            </p>
            <p>
              אם התקלה מתרחשת פעם בשבוע, כל ניסיון דורש שבוע שלם כדי לשלול מעגל
              אחד. בלוח עם שנים-עשר מעגלים מדובר בחודשים.
            </p>
            <p>
              חמור מכך: כשהזליגה מצטברת ממספר מעגלים, ניתוק של מעגל אחד יוריד את
              הסכום מתחת לסף ויֵראה כאילו הבעיה נפתרה. המעגל שנותק ייחשב בטעות
              לאשם, והזליגה האמיתית תישאר במתקן.
            </p>
            <div className="not-prose my-6 rounded-l-xl border-r-4 border-amber-600 bg-amber-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-amber-900">
                למה זה חשוב
              </h3>
              <p className="m-0 leading-relaxed text-amber-900">
                תקלה שנסגרה בלי שנמדדה לא נפתרה — היא רק ירדה מתחת לסף. הזליגה
                ממשיכה להתקיים בקיר, וכל שינוי בעומס או בלחות יחזיר אותה.
              </p>
            </div>
          </section>

          <section aria-labelledby="tools">
            <h2 id="tools" className={H2}>
              הכלים שחושפים את מה שהעין לא רואה
            </h2>
            <p>
              ההבדל בין ניחוש לאבחון הוא מכשור. שני מכשירים עושים את עיקר העבודה
              באיתור תקלות סמויות, וכל אחד מהם עונה על שאלה אחרת.
            </p>

            <h3 className={H3}>מגר (Megger) — מדידת התנגדות בידוד</h3>
            <p>
              מגר הוא מכשיר שמודד את התנגדות הבידוד של המוליכים. במקום לבדוק את
              המעגל במתח העבודה שלו, הוא מזרים מתח בדיקה של 500 וולט במתח ישר.
            </p>
            <p>
              זהו העיקרון המרכזי: הבידוד נבדק תחת מאמץ. סדק שנראה תקין לחלוטין
              ב-230 וולט מתגלה מיד כשמפעילים עליו מתח גבוה יותר.
            </p>
            <p>
              לפי התקן, התנגדות בידוד תקינה במעגל 230 וולט היא לפחות מגה-אום אחד.
              ערך של מאות קילו-אום מעיד על בידוד שמאבד את תכונותיו — עוד לפני
              שהפחת התחיל לקפוץ.
            </p>

            <h3 className={H3}>Sonel MPI 520 — רב-מודד למתקני חשמל</h3>
            <p>
              ה-Sonel MPI 520 הוא מכשיר בדיקות מתקנים שמבצע את שאר המדידות
              במכשיר אחד. הוא בודק את ממסר הפחת עצמו, ולא רק את המעגלים שאחריו.
            </p>
            <p>
              המכשיר מודד את זרם הניתוק בפועל ואת זמן הניתוק במילישניות. ממסר פחת
              של 30 מיליאמפר אמור לנתק בתוך 300 מילישניות בזרם הנקוב שלו, ובתוך
              40 מילישניות בזרם גבוה פי חמישה.
            </p>
            <p>
              במקביל הוא מודד את עכבת{" "}
              <Link href="/articles/grounding" className={LINK}>
                לולאת התקלה וההארקה
              </Link>
              . זה קריטי, מפני שממסר פחת תקין במתקן עם הארקה לקויה עדיין אינו
              מגן כנדרש.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="השוואת מכשירי המדידה לאיתור תקלה סמויה"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[34rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  מה כל מכשיר עונה עליו בתהליך איתור תקלה סמויה.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      השאלה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      המכשיר
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מה נמדד
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      איזה מעגל מזליג?
                    </th>
                    <td className="border border-slate-200 p-3">מגר</td>
                    <td className="border border-slate-200 p-3">
                      התנגדות בידוד ב-500V DC
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      האם הפחת עצמו תקין?
                    </th>
                    <td className="border border-slate-200 p-3">Sonel MPI 520</td>
                    <td className="border border-slate-200 p-3">
                      זרם וזמן ניתוק במילישניות
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      האם המיגון יפעל בתקלה?
                    </th>
                    <td className="border border-slate-200 p-3">Sonel MPI 520</td>
                    <td className="border border-slate-200 p-3">
                      עכבת לולאת תקלה
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      האם ההארקה תקינה?
                    </th>
                    <td className="border border-slate-200 p-3">Sonel MPI 520</td>
                    <td className="border border-slate-200 p-3">
                      התנגדות הארקה
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="process">
            <h2 id="process" className={H2}>
              תהליך האבחון שלב אחר שלב
            </h2>
            <p>
              איתור מסודר מחליף חודשים של ניסוי וטעייה בביקור אחד ממוקד. כך זה
              נראה בפועל:
            </p>
            <ol>
              <li>
                <strong>תשאול ותיעוד.</strong> מתי הפחת קופץ, באיזו שעה, ובאיזה
                מזג אוויר. דפוס הזמנים הוא רמז אבחוני ממשי.
              </li>
              <li>
                <strong>בדיקת ממסר הפחת עצמו.</strong> לפני שמחפשים אשם במעגלים,
                מוודאים שהפחת מנתק בזרם ובזמן הנכונים ולא הפך רגיש מדי.
              </li>
              <li>
                <strong>הפרדת המעגלים ומדידת בידוד.</strong> כל מעגל מנותק ונמדד
                בנפרד במגר, ומתקבל ערך מספרי לכל אחד מהם.
              </li>
              <li>
                <strong>זיהוי המעגל החשוד.</strong> המעגל עם התנגדות הבידוד
                הנמוכה ביותר הוא המקור, גם אם עדיין לא חצה סף.
              </li>
              <li>
                <strong>מיקוד לאורך המעגל.</strong> המעגל מפוצל בנקודות הסתעפות
                כדי לצמצם את הקטע הפגום לאזור מוגדר.
              </li>
              <li>
                <strong>תיקון ומדידה חוזרת.</strong> אחרי התיקון מודדים שוב
                ומתעדים את הערכים, כדי להוכיח שהזליגה אכן נעלמה.
              </li>
            </ol>
            <p>
              השלב האחרון הוא זה שמבדיל בין תיקון לבין השערה. בלי מדידה חוזרת אין
              שום ראיה שהתקלה טופלה.
            </p>
          </section>

          <section aria-labelledby="urgent">
            <h2 id="urgent" className={H2}>
              מתי זו כבר לא אי-נוחות אלא סכנה
            </h2>
            <p>
              קפיצת פחת מטרידה, אך היא סימן שהמיגון עובד. המצבים המסוכנים הם
              דווקא ההפך — כשהמיגון אינו פועל.
            </p>
            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-red-900">
                פנו לחשמלאי מוסמך באופן מיידי אם:
              </h3>
              <ul className="m-0 me-5 list-outside list-disc space-y-2 leading-relaxed text-red-900">
                <li>אתם חשים עקצוץ במגע בברז, בכיור או במעטפת של מכשיר.</li>
                <li>יש ריח חרוך, השחרה או חום בלוח החשמל.</li>
                <li>הפחת אינו ניתן להרמה בחזרה כלל.</li>
                <li>
                  מישהו ניתק או גישר את ממסר הפחת כדי ״שיפסיק לקפוץ״ — זהו מצב
                  מסכן חיים.
                </li>
              </ul>
            </div>
            <p>
              עקצוץ במגע במתכת מעיד על מתח על גוף מוליך. זהו הסימן החמור ביותר
              ברשימה, ואין להמשיך להשתמש במעגל עד לבדיקה.
            </p>
          </section>

          <section aria-labelledby="expertise">
            <h2 id="expertise" className={H2}>
              למה זה דורש מדידה ולא ניסיון בלבד
            </h2>
            <p>
              כהנדסאי חשמל והנדסאי מכונות בעל רישיון חשמלאי ראשי, אני מגיע לאיתור
              תקלות עם מכשור מדידה ולא עם השערות. הערכים נרשמים, ולכן אפשר להשוות
              אותם לפני התיקון ואחריו.
            </p>
            <p>
              במקביל אני מרצה ומכשיר הנדסאי חשמל, ומלמד בדיוק את שיטות המדידה
              האלה — התנגדות בידוד, לולאת תקלה ובדיקת ממסרי פחת.
            </p>
            <p>
              כנותן חוות דעת מומחה לבתי משפט בתחום החשמל, אני נתקל שוב ושוב
              במקרים שבהם תקלה סמויה טופלה בלי מדידה ובלי תיעוד. כשמתרחש נזק, דוח
              בדיקה עם ערכים מספריים הוא ההבדל בין טענה מוכחת לבין מילה מול מילה.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              איתור תקלות מתחיל בתשאול, ולכן חשוב שתוכלו לתאר את הבעיה בשפה שנוח
              לכם בה. הייעוץ והשירות ניתנים בעברית, ברוסית ובאנגלית.
            </p>
            <p>
              אפשר גם לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של הלוח ולציין מתי
              הפחת קופץ. לרוב אפשר לתת כיוון ראשוני עוד לפני ההגעה.
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
          heading="הפחת קופץ ואף אחד לא מוצא למה?"
          description="איתור תקלות במדידה — מגר לבדיקת בידוד ו-Sonel MPI 520 לבדיקת ממסר הפחת, לולאת התקלה וההארקה. תיעוד מלא של הערכים לפני ואחרי התיקון."
          callPurpose="לאיתור תקלה סמויה וקפיצות פחת"
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
