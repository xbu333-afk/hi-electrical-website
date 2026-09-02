import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "bayit-chacham";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "בית חכם: מה צריך לדעת לפני שמתחילים?",
  description:
    "מדריך מעשי ופשוט מאת הנדסאי חשמל: איך מתכננים מערכת בית חכם, מה ההבדל בין מערכת קווית לאלחוטית, ואיך מונעים תקלות יקרות בתשתית.",
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "בית חכם: מה צריך לדעת לפני שמתחילים?",
    description:
      "תכנון בית חכם, אלחוטי מול קווי, ומתי חובה חשמלאי מוסמך — מדריך מקצועי.",
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
    question: "האם אפשר להתקין בית חכם בדירה קיימת בלי שיפוץ?",
    answer:
      "כן, וברוב הדירות זו הבחירה הנכונה. מערכת אלחוטית מתבססת על החלפת המפסקים הקיימים במודולים חכמים ועל תוספת מודולים בלוח החשמל, בלי לפתוח קירות. המחסום המעשי הוא בדרך כלל היעדר מוליך אפס בקופסת המפסק ונפח קופסה קטן מדי, ולכן בודקים זאת לפני שקונים רכיבים.",
  },
  {
    question: "מה קורה למערכת כשהאינטרנט או הבקר המרכזי נופלים?",
    answer:
      "מערכת שתוכננה נכון ממשיכה לעבוד ידנית: המפסק בקיר מדליק ומכבה את האור גם בלי רשת, ורק השליטה מרחוק נעלמת. מערכת שתוכננה לא נכון משאירה חדר שלם בלי אפשרות הפעלה. לכן דורשים מראש שכל מעגל יישאר בעל שליטה מקומית, ושתרחישים ולוחות זמנים ירוצו על בקר בבית ולא רק בשרת של היצרן.",
  },
  {
    question: "האם מערכת בית חכם מחייבת שדרוג של לוח החשמל?",
    answer:
      "לא תמיד, אבל זו הבדיקה הראשונה. מודולים חכמים תופסים מקום פיזי על מסילת הלוח, ולוח מלא או לוח ישן בלי ממסר פחת אינו יכול לקלוט אותם. לעיתים גם מתגלה שדוד חשמלי או מערכת מיזוג מיני-מרכזי מוזנים ממעגל משותף, ואז נדרשת הפרדה למעגלים ייעודיים לפני שמוסיפים בקרה.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ותכנון של מערכת בית חכם?",
    answer:
      "הייעוץ, התכנון וההדרכה על השימוש במערכת ניתנים בעברית, ברוסית ובאנגלית. אפשר לשלוח הודעת וואטסאפ בכל שפה עם תמונה של לוח החשמל ושל קופסת המפסקים, ולקבל חוות דעת ראשונית על מה שהתשתית הקיימת מאפשרת.",
  },
];

const SECTIONS = [
  { id: "what", label: "מה זה בית חכם, בשפה פשוטה" },
  { id: "infrastructure", label: "אלחוטי מול קווי" },
  { id: "compare", label: "השוואה בין שתי הגישות" },
  { id: "electrical", label: "מה המערכת דורשת מהתשתית" },
  { id: "start", label: "מאיפה כדאי להתחיל" },
  { id: "resilience", label: "מה קורה כשהרשת נופלת" },
  { id: "mistakes", label: "טעויות שעולות ביוקר" },
  { id: "who", label: "מי מורשה לתכנן ולהתקין" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK =
  "font-bold text-emerald-700 no-underline hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

export default function SmartHomeArticle() {
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
              בית חכם
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
            בית חכם: מה צריך לדעת לפני שמתחילים?
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
            בית חכם אינו אוסף גאדג׳טים אלא שכבת בקרה שמונחת על התשתית החשמלית
            הקיימת. לכן ההחלטה הראשונה אינה איזה מוצר לקנות, אלא מה התשתית שלכם
            מאפשרת — נוכחות מוליך אפס בקופסת המפסק, נפח הקופסה ומקום פנוי בלוח.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            בדירה קיימת מערכת אלחוטית תהיה כמעט תמיד הבחירה הנכונה, ובבנייה או
            שיפוץ יסודי כדאי לשקול קווית. בשני המקרים הכלל זהה: מתכננים לפני
            שקונים, ומוודאים שכל מעגל נשאר ניתן להפעלה ידנית גם כשהרשת נופלת.
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
          <section aria-labelledby="what">
            <h2 id="what" className={`${H2} mt-0`}>
              מה זה בית חכם, בשפה פשוטה
            </h2>
            <p>
              בית חכם הוא רשת של צרכנים — תאורה, תריסים, מיזוג, דוד ושקעים —
              שמחוברים לשכבת בקרה אחת שיודעת להפעיל אותם לפי פקודה, לפי שעה או
              לפי תנאי.
            </p>
            <p>
              היכולת מתחלקת לשלוש: שליטה מרחוק מהטלפון, לוחות זמנים קבועים כמו
              שעון שבת מתקדם או חימום דוד לפני המקלחת, ותרחישים בפקודה אחת.
            </p>
            <p>
              החוכמה נמצאת בשכבת הבקרה, אבל החשמל נשאר אותו חשמל. מודול חכם עדיין
              מנתק ומחבר 230 וולט, ולכן הוא חייב הגנה תקנית וחיבור נכון.
            </p>
          </section>

          <section aria-labelledby="infrastructure">
            <h2 id="infrastructure" className={H2}>
              אלחוטי מול קווי
            </h2>
            <p>
              זו ההחלטה היחידה שקשה לשנות בהמשך, ולכן היא הראשונה. השאלה אינה
              איזו מערכת טובה יותר אלא איזו מתאימה למצב הנכס.
            </p>

            <h3 className={H3}>מערכת אלחוטית</h3>
            <p>
              המפסקים והשקעים הקיימים מוחלפים במודולים חכמים, ולעיתים מתווספים
              מודולים בלוח. התקשורת עוברת באוויר ואין צורך בשבירת קירות, ולכן זו
              הבחירה הטבעית לדירה מאוכלסת.
            </p>
            <p>
              הפרוטוקולים הנפוצים הם Wi-Fi, Zigbee ו-Z-Wave, ולאחרונה גם תקן
              Matter שמאפשר לרכיבים מיצרנים שונים לעבוד יחד. Wi-Fi עמוס בבניינים
              צפופים, ואילו Zigbee ו-Z-Wave בונים רשת שבה כל רכיב מעביר תקשורת
              לשכנו — ולכן הכיסוי יציב יותר.
            </p>

            <h3 className={H3}>מערכת קווית</h3>
            <p>
              במערכת קווית, כמו תקן KNX, כל נקודה מחווטת אל ארון החשמל ושם יושבים
              המפעילים. המפסק בקיר אינו מנתק חשמל אלא שולח פקודה על כבל תקשורת
              נפרד.
            </p>
            <p>
              היתרון הוא אמינות שאינה תלויה בקליטה ואורך חיים של עשרות שנים.
              המחיר הוא תכנון מלא לפני היציקה וארון חשמל גדול משמעותית.
            </p>

            <h3 className={H3}>טיפ שכדאי לבצע בכל מקרה</h3>
            <p>
              גם אם בוחרים אלחוטי, שווה להשחיל חוט משיכה בצינורות בזמן עבודות.
              הוא זול, והוא מה שיאפשר לעבור לתשתית קווית בעתיד בלי לפתוח קירות.
            </p>
          </section>

          <section aria-labelledby="compare">
            <h2 id="compare" className={H2}>
              השוואה בין שתי הגישות
            </h2>
            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="השוואה בין מערכת בית חכם אלחוטית לקווית"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  ההבדלים המעשיים בין מערכת אלחוטית לקווית. הבחירה נגזרת ממצב
                  הנכס ולא ממפרט טכני מרשים.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      היבט
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      אלחוטית
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      קווית
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      מתאימה ל
                    </th>
                    <td className="border border-slate-200 p-3">
                      דירה קיימת ומאוכלסת
                    </td>
                    <td className="border border-slate-200 p-3">
                      בנייה חדשה או שיפוץ יסודי
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      עבודות בנייה
                    </th>
                    <td className="border border-slate-200 p-3">
                      אין; החלפת מפסקים ותוספת בלוח
                    </td>
                    <td className="border border-slate-200 p-3">
                      חיווט תקשורת לכל נקודה
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תלות בקליטה
                    </th>
                    <td className="border border-slate-200 p-3">
                      קיימת; נפתרת ברשת מחוזקת
                    </td>
                    <td className="border border-slate-200 p-3">
                      אין; התקשורת בכבל
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      גודל הלוח הנדרש
                    </th>
                    <td className="border border-slate-200 p-3">
                      תוספת מודולים בודדים
                    </td>
                    <td className="border border-slate-200 p-3">
                      ארון גדול לכל המפעילים
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      הרחבה עתידית
                    </th>
                    <td className="border border-slate-200 p-3">
                      פשוטה; מוסיפים רכיב ומשייכים
                    </td>
                    <td className="border border-slate-200 p-3">
                      מוגבלת למה שחווט מראש
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="electrical">
            <h2 id="electrical" className={H2}>
              מה המערכת דורשת מהתשתית
            </h2>
            <p>
              כאן נמצא הפער בין הפרסומת למציאות. רוב הכשלים בהתקנות בית חכם אינם
              כשלי תוכנה אלא כשלי תשתית, וכולם ניתנים לזיהוי מראש.
            </p>

            <h3 className={H3}>מוליך אפס בקופסת המפסק</h3>
            <p>
              מפסק חכם צריך הזנה קבועה כדי לפעול, כלומר גם פאזה וגם אפס. בחלק
              ניכר מהדירות בישראל הגיעה לקופסה רק הפאזה, כי כך חווטה התאורה
              בעבר.
            </p>
            <p>
              הפתרונות הם השחלת אפס מנקודת התאורה, מודול שמותקן בתקרה, או מודול
              שאינו דורש אפס. הבדיקה נעשית לפני הרכישה.
            </p>

            <h3 className={H3}>נפח הקופסה</h3>
            <p>
              מודול חכם גדול פיזית ממפסק רגיל. קופסה שטוחה או גדושה במוליכים
              אינה מאפשרת התקנה בטוחה, ודחיסה בכוח פוגעת בבידוד ומייצרת חום.
            </p>

            <h3 className={H3}>סוג העומס וגודלו</h3>
            <p>
              לכל מודול יש זרם מותר, ולמנועי תריסים יש זרם התנעה גבוה מהזרם
              הרציף. מודול תאורה שהותקן על מנוע תריס יישרף.
            </p>
            <p>
              צרכנים כבדים — דוד חשמלי, מערכת מיזוג מיני-מרכזי, כיריים
              אינדוקציה, תנור בילט-אין או משאבת חום — אינם מנוהלים במודול קיר
              אלא במגען ובבקרה בלוח, עם מעגל והגנה ייעודיים.
            </p>

            <h3 className={H3}>מקום בלוח והגנה תקנית</h3>
            <p>
              כל מודול בלוח תופס מקום על המסילה, וכל מעגל חדש דורש מאמ״ת בגודל
              שמתאים לחתך המוליך והגנת ממסר פחת. לוח מלא, לוח עץ או לוח ללא ממסר
              פחת אינו יכול לקלוט מערכת בקרה.
            </p>
            <p>
              אם זה מצב הלוח שלכם, הצעד הראשון אינו קניית רכיבים אלא{" "}
              <Link href="/articles/panel-upgrade" className={LINK}>
                החלפה ושדרוג לוח החשמל
              </Link>
              . להסבר בסיסי על תפקיד הלוח ראו{" "}
              <Link href="/articles/ma-ze-luch-hashmal" className={LINK}>
                מה זה לוח חשמל ומתי צריך לשדרג אותו
              </Link>
              .
            </p>

            <h3 className={H3}>עמעום תאורה וחלוקת פאזות</h3>
            <p>
              עמעום נוריות LED אינו מובן מאליו: גוף שאינו מיועד לעמעום יהבהב או
              יזמזם, ומעמעמים רבים דורשים עומס מינימלי שגוף חסכוני במיוחד לא
              מספק. ההתאמה נבדקת מראש.
            </p>
            <p>
              ובבית תלת-פאזי חשוב שהתוספת לא תיפול כולה על פאזה אחת. זו סיבה
              שכיחה להפלות חשמל שנראות בלתי מוסברות, כמוסבר במדריך{" "}
              <Link href="/articles/load-balancing" className={LINK}>
                איזון עומסים וחלוקת פאזות
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="start">
            <h2 id="start" className={H2}>
              מאיפה כדאי להתחיל
            </h2>
            <p>
              אין צורך להפוך את כל הבית לחכם ביום אחד. התקדמות בשלבים זולה יותר,
              וגם מלמדת מה אתם באמת מפעילים.
            </p>
            <ol>
              <li>
                <strong>בדיקת תשתית לפני רכישה.</strong> מצב הלוח, נוכחות אפס
                בקופסאות, נפח הקופסאות והפרדת המעגלים של הצרכנים הכבדים. השלב
                שחוסך את רוב ההפתעות.
              </li>
              <li>
                <strong>דוד ומיזוג.</strong> הצרכנים הכבדים, ולכן השליטה בהם
                מחזירה את ההשקעה הכי מהר.
              </li>
              <li>
                <strong>תאורה.</strong> כיבוי מרכזי ביציאה מהבית, תרחישי אווירה
                ותאורת מסדרון עם חיישן נוכחות.
              </li>
              <li>
                <strong>תריסים וסוככים.</strong> סגירה אוטומטית בשעות החום
                ופתיחה בבוקר, עם מודול שמתאים למנוע.
              </li>
              <li>
                <strong>חיישני בטיחות.</strong> גלאי נזילה מתחת לכיור ולמכונת
                הכיבוס וגלאי עשן — הרכיבים הזולים ביותר, ובדרך כלל המשתלמים
                ביותר.
              </li>
            </ol>
            <p>
              היקף התכנון וההתקנה מפורט בעמוד{" "}
              <Link href="/services" className={LINK}>
                השירותים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="resilience">
            <h2 id="resilience" className={H2}>
              מה קורה כשהרשת נופלת
            </h2>
            <p>
              זו השאלה שהכי פחות נשאלת לפני התקנה. הכלל המנחה הוא שליטה מקומית
              תמיד: המפסק בקיר חייב להדליק ולכבות את האור גם בלי אינטרנט ובלי
              הבקר.
            </p>
            <p>
              לכן עדיף שלוחות הזמנים והתרחישים ירוצו על בקר מקומי ולא רק בשרת של
              היצרן. ענן שנסגר לא אמור להשאיר אותכם בלי דוד חם.
            </p>
            <p>
              שווה גם לשאול מה קורה אחרי הפסקת חשמל: מערכת שדורשת אתחול ידני בכל
              הפסקה הופכת במהירות למטרד.
            </p>
          </section>

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className={H2}>
              טעויות שעולות ביוקר
            </h2>

            <h3 className={H3}>לקנות רכיבים לפני שבודקים תשתית</h3>
            <p>
              הטעות הנפוצה ביותר. ארגז מפסקים חכמים שנקנה בלי לדעת שאין אפס
              בקופסאות נשאר ארגז שאי אפשר להחזיר.
            </p>

            <h3 className={H3}>לערבב יצרנים בלי תכנון</h3>
            <p>
              רכיבים משלוש מערכות שונות מייצרים שלוש אפליקציות שאינן מדברות
              ביניהן. תקן Matter משפר את המצב, אך התאימות נבדקת לפי דגם.
            </p>

            <h3 className={H3}>לנהל צרכן כבד במודול קיר</h3>
            <p>
              דוד חשמלי או יחידת מיזוג אינם עומס תאורה. מודול שאינו מדורג לזרם
              ולסוג העומס מתחמם, מתקלקל ובמקרים מסוימים גם מדליק את הקופסה.
            </p>

            <h3 className={H3}>לתת להתקנה להתבצע בלי רישיון</h3>
            <p>
              עבודה בקופסאות ובלוח היא עבודת חשמל לכל דבר, גם אם היא נראית כמו
              התקנת גאדג׳ט. ההשלכות מפורטות במדריך{" "}
              <Link href="/articles/handyman-vs-electrician" className={LINK}>
                הנדימן הוא לא חשמלאי
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי מורשה לתכנן ולהתקין
            </h2>
            <p>
              שיוך רכיב לאפליקציה אינו עבודת חשמל, אבל כל מה שקורה בתוך הקופסה
              ובלוח כן. חיבור מודולים, הוספת מעגלים והתאמת הגנות שמורים לבעל
              רישיון בדרגה המתאימה.
            </p>
            <p>
              אני עצמי הנדסאי חשמל ומכונות מוסמך ובעל רישיון חשמלאי ראשי, ומרצה
              ומכשיר הנדסאי חשמל במכללת אורט תעשייה אוירית. ההיכרות עם חישובי
              ההגנות היא בדיוק מה שמאפשר לקבוע אם הלוח הקיים יכול לקלוט מערכת
              בקרה.
            </p>
            <p>
              בחוות הדעת שאני נותן לבתי משפט אני נתקל בהתקנות חכמות ללא רישיון
              שהובילו לנזק שהביטוח סירב לכסות. תעודת בדיקה ותיעוד מעגלים מונעים
              את זה.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              תכנון בית חכם כולל מונחים טכניים והחלטות שכדאי להבין לעומק, ולכן
              ההסבר וההדרכה ניתנים בעברית, ברוסית ובאנגלית. אפשר גם לשלוח הודעת
              וואטסאפ בכל שפה עם תמונה של הלוח ושל קופסת המפסקים, ולקבל חוות דעת
              ראשונית על מה שהתשתית מאפשרת.
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
          heading="חולמים על בית חכם ובטוח?"
          description="בדיקת התשתית הקיימת, אפיון ותכנון מערכת בית חכם לפי מה שהלוח והקופסאות באמת מאפשרים, והתקנה עם תיעוד ותעודת בדיקה — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לייעוץ ותכנון מערכת בית חכם"
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
