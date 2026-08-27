import type { Metadata } from "next";
import Link from "next/link";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "load-balancing";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "איזון עומסים וחלוקת פאזות — למה תלת-פאזי לבדו לא מספיק",
  description: article.excerpt,
  keywords: [
    "איזון עומסים",
    "חלוקת פאזות בלוח חשמל",
    "פאזה עמוסה",
    "עומס יתר בחשמל",
    "החשמל קופץ למרות תלת פאזי",
    "מדידת עומסים בלוח",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "איזון עומסים וחלוקת פאזות: למה תלת-פאזי לבדו לא מפסיק את הקפיצות",
    description:
      "איך מזהים פאזה עמוסה, מה מודדים בלוח ואיך מחלקים מעגלים נכון בין שלוש הפאזות — מדריך מאת הנדסאי חשמל בעל רישיון ראשי.",
    type: "article",
  },
};

/**
 * מקור אמת יחיד לשאלות ולתשובות: אותו מערך מזין את התצוגה בעמוד
 * ואת ה-FAQPage ב-JSON-LD, כדי שהסכימה לא תסתור את מה שהמשתמש רואה.
 */
const FAQ: readonly ArticleFaq[] = [
  {
    question: "יש לי תלת-פאזי, אז למה החשמל עדיין קופץ?",
    answer:
      "חיבור תלת-פאזי מספק הספק גדול יותר, אבל רק אם העומס מחולק בין שלוש הפאזות. כאשר רוב המעגלים הכבדים יושבים על אותה פאזה, אותה פאזה מגיעה לגבול שלה ומנתקת בזמן שהשתיים האחרות כמעט פנויות. הפתרון במקרים אלה אינו הגדלת החיבור אלא חלוקה מחדש של המעגלים בלוח.",
  },
  {
    question: "איך יודעים אם הפאזות אצלי מאוזנות?",
    answer:
      "בודקים במדידה ולא בהערכה. החשמלאי מודד את הזרם בכל אחת משלוש הפאזות בזמן עומס אמיתי, כלומר כשהמזגנים, הדוד והמכשירים הכבדים פועלים. אם קיים פער ניכר בין הפאזות, או אם אחת מהן מתקרבת לגודל המאמ״ת שלה בזמן שהאחרות רחוקות ממנו, המערכת אינה מאוזנת.",
  },
  {
    question: "האם איזון פאזות מוזיל את חשבון החשמל?",
    answer:
      "החיוב על צריכה ביתית נעשה לפי קילוואט-שעה שנצרכו בפועל, ולכן איזון עומסים אינו מוריד את החשבון באופן ישיר. מה שהוא כן עושה הוא למנוע ניתוקים, לצמצם נפילות מתח ולהפחית התחממות של מוליכים ורכיבים בלוח. במתקנים עסקיים ההשפעה יכולה להיות גדולה יותר, בשל אופן החיוב על שיא הביקוש.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, וגם תוצאות מדידת העומסים מוסברות בשפה שנוחה לכם. אפשר לשלוח הודעת וואטסאפ בכל שפה, לתאר מתי החשמל קופץ ולצרף תמונה של הלוח, וכך לקבל הערכה ראשונית עוד לפני הביקור.",
  },
];

const SECTIONS = [
  { id: "what-is", label: "מה זה איזון עומסים" },
  { id: "symptoms", label: "הסימנים לפאזה עמוסה" },
  { id: "why", label: "למה חוסר איזון מזיק" },
  { id: "measure", label: "איך מודדים בפועל" },
  { id: "how", label: "איך מחלקים מעגלים נכון" },
  { id: "mistakes", label: "טעויות נפוצות בחלוקת פאזות" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function LoadBalancingArticle() {
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
              איזון עומסים וחלוקת פאזות
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
            איזון עומסים וחלוקת פאזות: למה תלת-פאזי לבדו לא מפסיק את הקפיצות
          </h1>

          <p className="text-base leading-relaxed text-slate-600">
            מאת{" "}
            <Link href="/about" className={LINK}>
              יהודה חכמוב
            </Link>{" "}
            — הנדסאי חשמל והנדסאי מכונות, בעל רישיון חשמלאי ראשי, מרצה ומכשיר
            הנדסאי חשמל ונותן חוות דעת מומחה לבתי משפט.
          </p>

          <p className="mt-2 text-sm text-slate-600">
            <time dateTime={article.datePublished}>{article.date}</time>
            <span aria-hidden="true"> · </span>
            <span>זמן קריאה: {article.readTime}</span>
          </p>
        </header>

        <section
          aria-labelledby="short-answer"
          className="mb-10 rounded-2xl border-r-4 border-emerald-600 bg-emerald-50 p-6"
        >
          <h2 id="short-answer" className="mb-3 text-xl font-bold text-emerald-900">
            התשובה הקצרה
          </h2>
          <p className="leading-relaxed text-slate-800">
            איזון עומסים הוא חלוקת המעגלים בלוח בין שלוש הפאזות כך שכל אחת תישא
            עומס דומה. בחיבור תלת-פאזי ההספק הכולל מתחלק לשלושה ערוצים נפרדים,
            ולכן פאזה עמוסה מדי תנתק גם כשההספק הכולל רחוק מהגבול.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            הבדיקה נעשית במדידת זרם בכל פאזה בזמן עומס אמיתי, לא בהערכה לפי
            רשימת מכשירים. כאשר מתגלה פער משמעותי, המעגלים הכבדים מועברים בלוח
            כך שהעומס יתפזר בין הפאזות.
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
              מה זה איזון עומסים
            </h2>
            <p>
              בחיבור תלת-פאזי מגיעות אל הלוח שלוש פאזות נפרדות. כל מעגל ביתי
              מחובר לפאזה אחת בלבד, ולכן חלוקת המעגלים היא שקובעת כמה עומס תישא
              כל פאזה.
            </p>
            <p>
              המאמ״ת הראשי מגן על כל פאזה בנפרד. אם פאזה אחת מגיעה לגבול שלה,
              היא תנתק — גם אם שתי הפאזות האחרות כמעט ריקות.
            </p>
            <p>
              זו הסיבה שבית עם חיבור 3×25 אמפר אינו בית עם 75 אמפר זמינים
              באופן חופשי. הוא בית עם שלוש יחידות של 25 אמפר, שרק חלוקה נכונה
              מאפשרת לנצל אותן במלואן.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="דוגמה להשוואה בין חלוקת פאזות לא מאוזנת למאוזנת"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[34rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  דוגמה להמחשה בלבד: אותו עומס כולל בבית עם חיבור 3×25 אמפר,
                  פעם בחלוקה לא מאוזנת ופעם בחלוקה מאוזנת. הערכים מייצגים זרם
                  באמפר.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      פאזה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      לפני איזון
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      אחרי איזון
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      L1
                    </th>
                    <td className="border border-slate-200 p-3">24 אמפר (על הגבול)</td>
                    <td className="border border-slate-200 p-3">13 אמפר</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      L2
                    </th>
                    <td className="border border-slate-200 p-3">9 אמפר</td>
                    <td className="border border-slate-200 p-3">12 אמפר</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      L3
                    </th>
                    <td className="border border-slate-200 p-3">4 אמפר</td>
                    <td className="border border-slate-200 p-3">12 אמפר</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      סך הכול
                    </th>
                    <td className="border border-slate-200 p-3">37 אמפר</td>
                    <td className="border border-slate-200 p-3">37 אמפר</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              שימו לב לשורה האחרונה: העומס הכולל זהה בשני המצבים. ההבדל היחיד
              הוא החלוקה — ובמצב הראשון הבית יקפוץ, ובשני לא.
            </p>
          </section>

          <section aria-labelledby="symptoms">
            <h2 id="symptoms" className={H2}>
              הסימנים לפאזה עמוסה
            </h2>

            <h3 className={H3}>החשמל קופץ למרות שיש תלת-פאזי</h3>
            <p>
              זהו הסימן המובהק ביותר. כשהחיבור גדול אך המפסק ממשיך לנתק, הבעיה
              היא כמעט תמיד חלוקה ולא גודל.
            </p>

            <h3 className={H3}>רק חלק מהבית נכבה</h3>
            <p>
              אם בכל פעם נכבה אותו אזור בדיוק — למשל המטבח והסלון יחד — סביר
              שכל אותם מעגלים יושבים על פאזה אחת עמוסה.
            </p>

            <h3 className={H3}>עמעום אורות בהתנעת מכשיר כבד</h3>
            <p>
              נפילת מתח רגעית בעת הפעלת מזגן או משאבה מעידה על פאזה שמתקשה
              לספק את זרם ההתנעה. התופעה מתרכזת לרוב באזורים שמוזנים מאותה פאזה.
            </p>

            <h3 className={H3}>חום מקומי בלוח</h3>
            <p>
              כאשר פאזה אחת עובדת קרוב לגבול לאורך זמן, המפסקים והחיבורים שלה
              מתחממים יותר מהשאר. חום כרוני מזרז בלאי ומגדיל את סיכון הדליקה.
            </p>
            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h4 className="mb-2 text-lg font-bold text-red-900">אזהרת בטיחות</h4>
              <p className="m-0 leading-relaxed text-red-900">
                מדידת זרמים בלוח פתוח מבוצעת על מתקן חי, ולכן היא שמורה לבעל
                רישיון בלבד. אין לפתוח את מכסה הלוח ואין להעביר מעגלים בין
                פאזות באופן עצמאי — גם לא &quot;רק כדי לבדוק&quot;.
              </p>
            </div>
          </section>

          <section aria-labelledby="why">
            <h2 id="why" className={H2}>
              למה חוסר איזון מזיק
            </h2>
            <p>
              הנזק הראשון גלוי: ניתוקים חוזרים ואי-ניצול של החיבור ששילמתם
              עליו. אך ההשפעה נמשכת גם מעבר לכך.
            </p>
            <p>
              חוסר איזון מגדיל את הזרם במוליך האפס. במערכת מאוזנת הזרמים
              מתקזזים ברובם, ובמערכת לא מאוזנת מוליך האפס נושא את ההפרש
              ומתחמם.
            </p>
            <p>
              בנוסף, פאזה עמוסה סובלת מנפילות מתח גדולות יותר. מתח נמוך מקצר
              את חיי המנועים והמדחסים ופוגע ביציבות של ציוד רגיש.
            </p>
            <p>
              חשוב להבחין: קפיצה של המאמ״ת מעידה על עומס, ואילו קפיצה של{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                ממסר הפחת
              </Link>{" "}
              מעידה על זליגת זרם. אם הקפיצות מתרחשות בלי קשר לעומס, ראו את
              המדריך על{" "}
              <Link href="/articles/ghost-tripping" className={LINK}>
                קפיצות פחת וקצרים סמויים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="measure">
            <h2 id="measure" className={H2}>
              איך מודדים בפועל
            </h2>
            <p>
              איזון עומסים אינו נקבע לפי רשימת מכשירים על הנייר. הוא נקבע לפי
              זרם שנמדד בלוח בזמן שהבית עובד באמת.
            </p>
            <p>
              המדידה מבוצעת במלקחיים על כל אחת משלוש הפאזות, כשהעומסים הכבדים
              פועלים במקביל. במקרים גבוליים מבוצעת רישום לאורך זמן, כדי לתפוס
              את שעות השיא ולא רגע אקראי.
            </p>
            <p>
              במקביל נבדק גם מה קורה בצד ההגנה. מדידות ההארקה ולולאת התקלה,
              המפורטות במדריך{" "}
              <Link href="/articles/fault-loop-impedance" className={LINK}>
                בדיקת הארקה ולולאת תקלה
              </Link>
              , מוודאות שהמיגון עצמו תקין ולא רק שהעומס מחולק.
            </p>
            <p>
              לאומדן ראשוני של הצריכה הביתית אפשר להיעזר ב
              <Link href="/device-calculator" className={LINK}>
                מחשבון צריכת המכשירים
              </Link>
              . הוא נותן תמונה כללית, אך אינו מחליף מדידה בלוח.
            </p>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className={H2}>
              איך מחלקים מעגלים נכון
            </h2>
            <p>
              החלוקה נעשית לפי עומס בפועל ולפי דפוס השימוש, לא לפי סדר המעגלים
              בלוח. העיקרון הוא לפזר את הצרכנים הכבדים ואת אלה שפועלים באותן
              שעות.
            </p>
            <ol>
              <li>
                <strong>מיפוי הצרכנים הכבדים.</strong> מזגנים, דוד, תנור,
                כיריים, מייבש ועמדת טעינה לרכב מזוהים תחילה, משום שהם קובעים
                את התמונה.
              </li>
              <li>
                <strong>פיזור צרכנים בו-זמניים.</strong> מכשירים שנוטים לפעול
                יחד מפוזרים בין פאזות שונות, כדי שלא יצטברו על אותו ערוץ.
              </li>
              <li>
                <strong>שיוך מחדש בלוח.</strong> המעגלים מועברים פיזית בין
                הפאזות בהתאם לתכנון, תוך שמירה על סימון מעודכן.
              </li>
              <li>
                <strong>מדידה חוזרת תחת עומס.</strong> הזרמים נמדדים שוב אחרי
                השינוי, כדי לאמת שהחלוקה אכן השיגה את המטרה.
              </li>
              <li>
                <strong>תיעוד.</strong> טבלת המעגלים המעודכנת נשארת בלוח,
                ותוצאות המדידה נרשמות. בלי זה, החלוקה תתפרק בעדכון הבא.
              </li>
            </ol>
            <p>
              כאשר האיזון מתבצע במסגרת{" "}
              <Link href="/articles/panel-upgrade" className={LINK}>
                החלפת לוח חשמל
              </Link>
              , החלוקה מתוכננת מראש. בלוח קיים מדובר בעבודה נפרדת וקצרה יותר.
            </p>
          </section>

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className={H2}>
              טעויות נפוצות בחלוקת פאזות
            </h2>

            <h3 className={H3}>חלוקה לפי מספר מעגלים במקום לפי עומס</h3>
            <p>
              שמונה מעגלי תאורה אינם שקולים לשני מעגלי מזגן. חלוקה שמסתכלת על
              כמות ולא על הספק יוצרת חוסר איזון חדש.
            </p>

            <h3 className={H3}>הגדלת החיבור במקום חלוקה מחדש</h3>
            <p>
              כשהבעיה היא פאזה עמוסה, הגדלת חיבור עולה כסף ואינה פותרת. כדאי
              למדוד לפני שמגישים בקשה לחברת החשמל.
            </p>

            <h3 className={H3}>איזון חד-פעמי שלא מתוחזק</h3>
            <p>
              כל תוספת של צרכן כבד משנה את התמונה. אחרי התקנת עמדת טעינה או
              מזגן נוסף כדאי למדוד שוב.
            </p>

            <h3 className={H3}>העברת מעגלים בלי לעדכן את הסימון</h3>
            <p>
              לוח שסימונו אינו תואם למציאות מטעה כל חשמלאי שיגיע אחריו. תיעוד
              שגוי גרוע לעיתים מהיעדר תיעוד.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              תוצאות מדידת עומסים הן מספרים שצריך להבין, ולכן ההסבר ניתן בשפה
              שנוחה לכם. הייעוץ והשירות ניתנים בעברית, ברוסית ובאנגלית.
            </p>
            <p>
              אפשר גם לשלוח הודעת וואטסאפ בכל שפה, לתאר מתי בדיוק החשמל קופץ
              ולצרף תמונה של הלוח. תיאור מדויק של מועדי הקפיצה חוסך זמן איתור
              רב בשטח.
            </p>
          </section>
        </div>

        <section aria-labelledby="faq" className="mt-14 border-t border-gray-100 pt-10">
          <h2 id="faq" className={`${H2} mt-0`}>
            שאלות נפוצות
          </h2>

          <div className="mt-6 space-y-4">
            {FAQ.map(({ question, answer }, index) => (
              <details
                key={question}
                open={index === 0}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white"
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-slate-900 marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    <span>{question}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-emerald-700 transition-transform group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-700">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <ArticleVideoCta
          heading="החשמל קופץ למרות שיש לכם תלת-פאזי?"
          description="מדידת עומסים בכל פאזה, איתור הפאזה העמוסה וחלוקה מחדש של המעגלים בלוח — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לבדיקת איזון עומסים וחלוקת פאזות"
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
