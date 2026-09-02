import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "ma-ze-luch-hashmal";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "מה זה לוח חשמל ומתי צריך לשדרג אותו? | ח.י שירותי חשמל",
  description:
    "המדריך המלא של הנדסאי חשמל: מה תפקידו של לוח החשמל בבית, אילו סימנים מראים שהלוח סובל מעומס יתר, ומתי חובה לבצע שדרוג ללוח תלת-פאזי.",
  keywords: [
    "מה זה לוח חשמל",
    "שדרוג לוח חשמל",
    "לוח חשמל ישן",
    "עומס יתר בלוח",
    "לוח חשמל תלת פאזי",
    "ממסר פחת",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "מה זה לוח חשמל ומתי צריך לשדרג אותו?",
    description:
      "סימני אזהרה, שדרוג לתלת-פאזי ומתי חובה לפנות לחשמלאי מוסמך — מדריך מקצועי.",
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
    question: "איך אני יודע אם לוח החשמל שלי עמוס מדי?",
    answer:
      "הסימן המובהק הוא קפיצה חוזרת של אותו מפסק כשמפעילים שני צרכנים כבדים יחד, למשל מזגן ודוד. סימנים נוספים הם לוח חם למגע, זמזום, השחרה סביב בורג או ריח של פלסטיק חרוך. עומס אמיתי נקבע במדידת זרם בפועל על כל פאזה ולא בהתרשמות, ולכן זהו השלב שבו כדאי להזמין בדיקה.",
  },
  {
    question: "האם חייבים להחליף לוח עשוי עץ גם אם הוא עובד?",
    answer:
      "כן. לוח עץ אינו חסין אש, וניצוץ בחיבור רופף בתוך ארון עץ מוצא חומר בעירה מיידי. העובדה שהלוח פועל אינה מעידה על בטיחות, מפני שהכשל מתפתח בהדרגה בתוך הארון ואינו נראה מבחוץ. זהו המקרה הברור ביותר שבו החלפה אינה ניתנת לדחייה.",
  },
  {
    question: "המעבר לתלת-פאזי יפתור את כל הקפיצות?",
    answer:
      "לא בהכרח. חיבור תלת-פאזי מגדיל את ההספק הזמין, אבל אם המעגלים אינם מחולקים נכון בין שלוש הפאזות, פאזה אחת תישאר עמוסה ותמשיך לקפוץ. חלוקה מאוזנת נקבעת לפי מדידת זרמים בפועל, והיא חלק בלתי נפרד מהשדרוג ולא תוספת אופציונלית.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ על שדרוג הלוח?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, כולל הסבר על תוכנית הלוח ועל תעודת הבדיקה בשפה שנוחה לכם. אפשר לשלוח הודעת וואטסאפ בכל שפה ולצרף תמונה של הלוח הקיים, וכך לקבל הערכה ראשונית עוד לפני הביקור.",
  },
];

const SECTIONS = [
  { id: "mah-ze", label: "מה זה לוח חשמל ומה תפקידו?" },
  { id: "rechivim", label: "מה יש בתוך הלוח" },
  { id: "simanim", label: "הסימנים: מתי חובה לשדרג?" },
  { id: "omasim", label: "העומסים שהבית הישן לא תוכנן להם" },
  { id: "tlat-fazi", label: "המעבר מחד-פאזי לתלת-פאזי" },
  { id: "taut", label: "שלוש טעויות שמחמירות את המצב" },
  { id: "mi-morshe", label: "מי מורשה לגעת בלוח" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function LuahHashmalArticle() {
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
              לוח חשמל
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
            מה זה לוח חשמל ומתי צריך לשדרג אותו?
          </h1>

          <p className="text-base leading-relaxed text-slate-600">
            מאת{" "}
            <Link href="/about" className={LINK}>
              יהודה חכמוב
            </Link>{" "}
            — הנדסאי חשמל ומכונות מוסמך, בעל רישיון חשמלאי ראשי, מרצה ומכשיר
            הנדסאי חשמל במכללת אורט תעשייה אווירית.
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
            לוח החשמל אינו רק נקודת חלוקה. הוא המקום היחיד בבית שבו מותקנים
            אמצעי ההגנה שאמורים לנתק את הזרם לפני שנגרם נזק לאדם או לרכוש —
            הגנה מפני עומס וקצר, הגנה מפני התחשמלות, וקישור למערכת ההארקה.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            שדרוג נדרש כשהלוח אינו מספק עוד את רמת ההגנה הזאת: לוח עץ, היעדר
            ממסר פחת, אין מקום לתוספת מעגלים, סימני חום, או עומס שגדל מעל מה
            שהחיבור תוכנן לו. בכל אחד מהמקרים האלה לא מדובר בשיפור נוחות אלא
            בבטיחות.
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
          <section aria-labelledby="mah-ze">
            <h2 id="mah-ze" className={H2}>
              מה זה בכלל לוח חשמל ומה תפקידו?
            </h2>
            <p>
              הלוח מקבל את ההזנה הראשית מחברת החשמל ומחלק אותה למעגלים נפרדים:
              תאורה, שקעים במטבח, מזגנים, דוד. החלוקה הזאת אינה לנוחות בלבד —
              היא מה שמאפשר להגן על כל מעגל בנפרד ולפי חתך המוליך שהותקן בו.
            </p>
            <p>
              התפקיד השני, והחשוב יותר, הוא ניתוק בזמן. כשמתפתח קצר, עומס יתר או
              זליגת זרם, אמצעי ההגנה בלוח אמורים לנתק תוך שברירי שנייה — לפני
              שהמוליך בקיר מתחמם ולפני שאדם נפגע.
            </p>
            <p>
              מכאן נובעת נקודה שלקוחות מתקשים לקבל: לוח שנראה חדש ומסודר אינו
              בהכרח לוח שמגן. מה שקובע הוא האם הרכיבים נבחרו לפי חישוב, חוברו
              נכון, ונבדקו במדידה.
            </p>
          </section>

          <section aria-labelledby="rechivim">
            <h2 id="rechivim" className={H2}>
              מה יש בתוך הלוח
            </h2>
            <p>
              בלוח ביתי תקין פועלים כמה רכיבים, וכל אחד מהם מטפל בסכנה אחרת. הם
              אינם מחליפים זה את זה.
            </p>

            <h3 className={H3}>המפסק הראשי (מאמ״ת ראשי)</h3>
            <p>
              מגן על החיבור כולו מפני עומס יתר. גודלו נגזר מגודל החיבור שאושר
              בחברת החשמל, ולכן אין להגדיל אותו כדי &quot;לפתור&quot; קפיצות.
            </p>

            <h3 className={H3}>ממסר הפחת (מפסק מגן)</h3>
            <p>
              זהו אמצעי ההגנה היחיד שמגן על אדם מפני התחשמלות במגע ישיר. לוח
              ללא ממסר פחת אינו עומד בדרישות, וממסר בודד לכל הדירה משמעו שכל
              תקלה נקודתית מחשיכה את הבית כולו. הסבר מלא על סיבות הקפיצה מופיע
              במדריך{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                למה ממסר הפחת קופץ
              </Link>
              .
            </p>

            <h3 className={H3}>מפסקי המעגלים ופסי האפס וההארקה</h3>
            <p>
              כל מעגל מוגן במפסק שגודלו חייב להתאים לחתך המוליך, ולא לתיאבון
              הצרכן. מוליכי האפס ומוליכי ההגנה מחוברים לפסים נפרדים — ערבוב
              ביניהם הוא אחת הסיבות השכיחות לקפיצות פחת שנראות אקראיות.
            </p>

            <h3 className={H3}>סימון וטבלת מעגלים</h3>
            <p>
              סימון אינו קישוט אלא דרישה תקנית. לוח שאינו מסומן הופך כל תקלה
              עתידית לחיפוש ממושך, ובמצב חירום הוא מסוכן ממש.
            </p>
          </section>

          <section aria-labelledby="simanim">
            <h2 id="simanim" className={H2}>
              הסימנים המרכזיים: מתי חובה לשדרג?
            </h2>
            <p>
              לוח לא מחליפים סתם. אלה המקרים שבהם ההחלפה היא חובה ולא שאלה של
              נוחות.
            </p>

            <h3 className={H3}>לוח עשוי עץ</h3>
            <p>
              לוח עץ אינו חסין אש. חיבור רופף בתוך ארון עץ מייצר ניצוץ שמוצא
              חומר בעירה מיידי, ולכן זהו המקרה הברור ביותר להחלפה מיידית.
            </p>

            <h3 className={H3}>אין ממסר פחת, או שיש אחד בלבד</h3>
            <p>
              בבתים שנבנו לפני שנות התשעים נפוץ למצוא לוח בלי ממסר פחת כלל. גם
              ממסר אחד לכל הדירה הוא מצב בעייתי, מפני שתקלה במכשיר אחד מנתקת גם
              את המקרר וגם את התאורה.
            </p>

            <h3 className={H3}>סימני חום, השחרה או ריח</h3>
            <p>
              השחרה סביב בורג, פלסטיק מעוות או ריח חרוך מעידים על חיבור רופף
              שמייצר חום. התופעה מחמירה עם הזמן ואינה נעלמת מעצמה.
            </p>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h4 className="mb-2 text-lg font-bold text-red-900">אזהרת בטיחות</h4>
              <p className="m-0 leading-relaxed text-red-900">
                אם הלוח חם למגע, מדיף ריח חרוך או משמיע זמזום — נתקו את המעגלים
                העמוסים ופנו מיד לחשמלאי מוסמך. אין לפתוח את הלוח ואין להדק
                ברגים בעצמכם.
              </p>
            </div>

            <h3 className={H3}>אין מקום פיזי לתוספת מעגלים</h3>
            <p>
              לוח מלא מוביל כמעט תמיד לאלתורים: שני מוליכים תחת בורג אחד, או
              מפסק שהוחלף בגדול יותר במקום להוסיף מעגל. כל אלה מבטלים את ההגנה
              שהמפסק אמור לספק.
            </p>
          </section>

          <section aria-labelledby="omasim">
            <h2 id="omasim" className={H2}>
              העומסים שהבית הישן לא תוכנן להם
            </h2>
            <p>
              דירה שנבנתה בשנות השבעים תוכננה לתאורה, מקרר, טלוויזיה ודוד. הצרכן
              הכבד הבודד היה הדוד. היום מטבח אחד יכול לצרוך יותר מכל הדירה
              ההיסטורית הזאת.
            </p>
            <p>
              הטבלה הבאה מציגה זרמים אופייניים במתח 230 וולט. היא מיועדת להמחשה
              בלבד — הערכים המדויקים נקבעים לפי הנתונים על גב המכשיר ולפי אורך
              המוליך.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="זרם אופייני של צרכנים כבדים בבית והצורך במעגל נפרד"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[34rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  צרכנים כבדים נפוצים, הזרם האופייני שלהם והצורך במעגל ייעודי.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      צרכן
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      הספק אופייני
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      זרם מקורב
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מעגל נפרד?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      כיריים אינדוקציה
                    </th>
                    <td className="border border-slate-200 p-3">7.4 ק״ו</td>
                    <td className="border border-slate-200 p-3">כ-32 אמפר</td>
                    <td className="border border-slate-200 p-3">חובה</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      מערכת מיזוג מיני-מרכזי
                    </th>
                    <td className="border border-slate-200 p-3">5 ק״ו</td>
                    <td className="border border-slate-200 p-3">כ-22 אמפר</td>
                    <td className="border border-slate-200 p-3">חובה</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      דוד חשמלי
                    </th>
                    <td className="border border-slate-200 p-3">3 ק״ו</td>
                    <td className="border border-slate-200 p-3">כ-13 אמפר</td>
                    <td className="border border-slate-200 p-3">חובה</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תנור בילט-אין
                    </th>
                    <td className="border border-slate-200 p-3">3 ק״ו</td>
                    <td className="border border-slate-200 p-3">כ-13 אמפר</td>
                    <td className="border border-slate-200 p-3">מומלץ מאוד</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      משאבת חום
                    </th>
                    <td className="border border-slate-200 p-3">2.5 ק״ו</td>
                    <td className="border border-slate-200 p-3">כ-11 אמפר</td>
                    <td className="border border-slate-200 p-3">מומלץ מאוד</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              חיבור חד-פאזי של 40 אמפר נגמר מהר כשמצרפים שניים או שלושה מהצרכנים
              האלה יחד. זה הרגע שבו הלוח מפסיק להיות צר מדי מבחינת מקום, ומתחיל
              להיות צר מדי מבחינת הספק.
            </p>
          </section>

          <section aria-labelledby="tlat-fazi">
            <h2 id="tlat-fazi" className={H2}>
              המעבר מחד-פאזי לתלת-פאזי
            </h2>
            <p>
              רוב הבתים הישנים בישראל בנויים על תשתית חד-פאזית של 25 או 40 אמפר.
              מעבר לתלת-פאזי מחלק את העומס לשלושה ערוצים נפרדים, ולכן מאפשר
              להפעיל צרכנים כבדים במקביל בלי להפיל את המפסק הראשי.
            </p>
            <p>
              חשוב להדגיש נקודה שנופלת בין הכיסאות: תלת-פאזי לבדו אינו מבטיח
              שקט. אם המעגלים אינם מחולקים נכון בין הפאזות, פאזה אחת תישאר עמוסה
              ותמשיך לקפוץ בעוד שתיים אחרות פנויות.
            </p>
            <p>
              יש גם מצבים שבהם הגדלת החיבור אינה הפתרון הנכון. אם הקפיצות
              נובעות מזליגה בבידוד, מחיבור רופף או מחלוקה שגויה בין הפאזות,
              חיבור גדול יותר לא ישנה דבר — הוא רק יעלה כסף ויאריך את התהליך מול
              חברת החשמל. לכן ההחלטה מתקבלת אחרי מדידה, לא לפניה.
            </p>
            <p>
              את התהליך המלא מול חברת החשמל מפרט המדריך{" "}
              <Link href="/articles/three-phase-upgrade" className={LINK}>
                הגדלת חיבור לתלת-פאזי
              </Link>
              , ואת החלוקה עצמה — כולל מדידת זרמים על כל פאזה — מפרט המדריך{" "}
              <Link href="/articles/load-balancing" className={LINK}>
                איזון עומסים וחלוקת פאזות
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="taut">
            <h2 id="taut" className={H2}>
              שלוש טעויות שמחמירות את המצב
            </h2>

            <h3 className={H3}>הגדלת המפסק במקום פתרון הבעיה</h3>
            <p>
              כשמפסק קופץ, החלפתו בגדול יותר אינה פתרון אלא ביטול ההגנה. המוליך
              בקיר נשאר באותו חתך, וכעת הוא עלול להתחמם בלי שדבר ינתק אותו.
            </p>

            <h3 className={H3}>הוספת רכיבים ללוח שאינו מתאים</h3>
            <p>
              ממסר פחת שמותקן בלוח שבו האפס וההארקה מעורבבים יקפוץ שוב ושוב,
              וממסר שמותקן בלוח עץ אינו פותר את סכנת הדליקה. תוספת רכיב אינה
              תחליף לבדיקת התשתית.
            </p>

            <h3 className={H3}>החלפת לוח בלי בדיקות מסירה</h3>
            <p>
              לוח חדש ומסודר שלא נמדד הוא הנחה, לא עובדה. מה בדיוק נמדד בסיום
              ואילו מסמכים אתם אמורים לקבל מפורט במדריך{" "}
              <Link href="/articles/panel-upgrade" className={LINK}>
                החלפה ושדרוג לוח חשמל
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="mi-morshe">
            <h2 id="mi-morshe" className={H2}>
              מי מורשה לגעת בלוח
            </h2>
            <p>
              עבודה בלוח שמורה לבעל רישיון חשמלאי בדרגה המתאימה לגודל המתקן.
              חשמלאי מוסמך רשאי לעבוד עד 3×80 אמפר, וחשמלאי ראשי עד 3×250 אמפר —
              ומי שרישיונו אינו מכסה את גודל החיבור אינו רשאי לחתום על העבודה.
            </p>
            <p>
              אני עצמי הנדסאי חשמל ומכונות מוסמך, בעל רישיון חשמלאי ראשי בתוקף.
              במקביל לעבודה בשטח אני מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה
              אווירית, ומלמד בדיוק את חישובי ההגנות ותיאום המיגון שעליהם נשען
              תכנון לוח.
            </p>
            <p>
              אני גם נותן חוות דעת מומחה לבתי משפט, ושם רואים את הצד השני של
              הסיפור: כמעט תמיד הכשל היה ידוע ופשוט, ומה שהפך אותו לתיק היה
              היעדר תיעוד. פירוט השירותים והבדיקות מופיע בעמוד{" "}
              <Link href="/services" className={LINK}>
                השירותים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              שדרוג לוח כולל מונחים טכניים ומסמכים שחשוב להבין, ולכן ההסבר ניתן
              בשפה שנוחה לכם — בעברית, ברוסית ובאנגלית. אפשר גם לשלוח הודעת
              וואטסאפ בכל שפה, לצרף תמונה של הלוח הקיים ולקבל הערכה ראשונית לפני
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
          heading="הלוח שלכם קופץ, מלא או ישן מדי?"
          description="בדיקת הלוח הקיים, מדידת עומסים על כל פאזה ותכנון שדרוג לפי חישוב — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה עם תמונה של הלוח."
          callPurpose="לייעוץ על שדרוג לוח חשמל"
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
