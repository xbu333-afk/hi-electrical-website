import type { Metadata } from "next";
import Link from "next/link";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "panel-upgrade";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "החלפה ושדרוג לוח חשמל — המדריך ההנדסי המלא",
  description: article.excerpt,
  keywords: [
    "החלפת לוח חשמל",
    "שדרוג לוח חשמל",
    "לוח חשמל ישן מעץ",
    "מחיר החלפת לוח חשמל",
    "לוח חשמל תלת פאזי",
    "בדיקת לוח חשמל",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "החלפה ושדרוג לוח חשמל: מה באמת קורה מאחורי דלת הארון",
    description:
      "מתי החלפת לוח היא חובה, מה חייב להיכלל בלוח חדש לפי התקן, אילו בדיקות מסירה מבוצעות ואילו מסמכים אתם חייבים לקבל — מאת הנדסאי חשמל בעל רישיון ראשי.",
    type: "article",
  },
};

/**
 * מקור אמת יחיד לשאלות ולתשובות: אותו מערך מזין את התצוגה בעמוד
 * ואת ה-FAQPage ב-JSON-LD, כדי שהסכימה לא תסתור את מה שהמשתמש רואה.
 */
const FAQ: readonly ArticleFaq[] = [
  {
    question: "כמה זמן נמשכת החלפת לוח חשמל?",
    answer:
      "החלפת לוח דירתי סטנדרטי נמשכת בדרך כלל יום עבודה אחד, שבמהלכו החשמל מנותק למספר שעות. לוח גדול יותר, לוח תלת-פאזי או לוח שדורש גם החלפת מוליכי הזנה עשוי להימשך יומיים. מה שמאריך את העבודה הוא לרוב לא הלוח עצמו אלא זיהוי וסימון מחדש של מעגלים ישנים שלא תועדו מעולם.",
  },
  {
    question: "האם אפשר להוסיף ממסר פחת ללוח הישן במקום להחליף אותו?",
    answer:
      "לפעמים כן, אך זו לא תמיד התשובה הנכונה. ממסר פחת שמותקן בלוח שבו מוליך האפס ומוליך ההארקה מעורבבים יקפוץ שוב ושוב, וממסר שמותקן בלוח עץ אינו פותר את סכנת הדליקה. ההחלטה בין תוספת רכיב לבין החלפה מלאה מתקבלת אחרי בדיקה של מצב המוליכים, ההארקה והתשתית בפועל.",
  },
  {
    question: "אילו מסמכים אני אמור לקבל בסיום העבודה?",
    answer:
      "אתם אמורים לקבל תעודת בדיקה חתומה בידי בעל הרישיון, תרשים או רשימת מעגלים מעודכנת, ותוצאות מדידה של התנגדות ההארקה, של עכבת לולאת התקלה ושל זמן ניתוק ממסרי הפחת. המסמכים האלה נדרשים מול חברת הביטוח, בעת מכירת הנכס ובכל בדיקה עתידית. עבודה ללא תיעוד היא עבודה שאי אפשר להוכיח שבוצעה כראוי.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, וגם הסבר תוכנית הלוח ותעודת הבדיקה ניתן בשפה שנוחה לכם. אפשר לשלוח הודעת וואטסאפ בכל שפה ולצרף תמונה של הלוח הקיים, וכך לקבל הערכה ראשונית עוד לפני הביקור.",
  },
];

const SECTIONS = [
  { id: "role", label: "מה לוח החשמל עושה בפועל" },
  { id: "when", label: "מתי החלפה היא חובה ולא שיפור" },
  { id: "inside", label: "מה חייב להיכלל בלוח חדש" },
  { id: "process", label: "תהליך ההחלפה שלב אחר שלב" },
  { id: "tests", label: "בדיקות המסירה — הרגע שקובע" },
  { id: "who", label: "מי מורשה לבצע ולחתום" },
  { id: "mistakes", label: "כשלים נפוצים בלוחות שהוחלפו" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function PanelUpgradeArticle() {
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
              החלפה ושדרוג לוח חשמל
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
            החלפה ושדרוג לוח חשמל: מה באמת קורה מאחורי דלת הארון
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
            החלפת לוח חשמל נדרשת כשהלוח הקיים אינו מספק עוד את רמת ההגנה שהתקן
            דורש — לוח עץ, היעדר ממסר פחת, מבנה שאינו מאפשר תוספת מעגלים או
            מוליכים שהתחממו. זו אינה החלפת מפסקים אלא בנייה מחדש של מערך ההגנה
            של המתקן.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            עבודה תקינה כוללת מיפוי המעגלים הקיימים, בחירת רכיבי הגנה לפי חישוב,
            חלוקה מאוזנת בין הפאזות, ובעיקר בדיקות מסירה מדודות בסיום. בלי
            תעודת בדיקה ותוצאות מדידה, אין דרך לדעת שהלוח החדש באמת מגן.
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
          <section aria-labelledby="role">
            <h2 id="role" className={H2}>
              מה לוח החשמל עושה בפועל
            </h2>
            <p>
              לוח החשמל אינו נקודת חלוקה בלבד. הוא המקום היחיד במתקן שבו מותקנים
              אמצעי ההגנה שאמורים לנתק את הזרם לפני שנגרם נזק לאדם או לרכוש.
            </p>
            <p>
              בלוח פועלים שלושה מנגנוני הגנה נפרדים, וכל אחד מהם מטפל בסכנה
              אחרת. עומס יתר וקצר מטופלים על ידי המפסקים האוטומטיים, זליגת זרם
              מטופלת על ידי{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                ממסר הפחת
              </Link>
              , והולכת זרם תקלה אל האדמה מטופלת על ידי מערכת ההארקה.
            </p>
            <p>
              המשמעות המעשית חשובה: לוח שנראה חדש ומסודר אינו בהכרח לוח שמגן.
              מה שקובע הוא האם הרכיבים נבחרו לפי חישוב, חוברו נכון, ונבדקו
              במדידה.
            </p>
            <p>
              להסבר בסיסי יותר על תפקיד הלוח ועל סימני עומס ראשוניים, ראו את
              המדריך{" "}
              <Link href="/articles/ma-ze-luch-hashmal" className={LINK}>
                מה זה לוח חשמל ומתי צריך לשדרג אותו
              </Link>
              . המאמר הנוכחי מתמקד בצד ההנדסי של ההחלפה עצמה.
            </p>
          </section>

          <section aria-labelledby="when">
            <h2 id="when" className={H2}>
              מתי החלפה היא חובה ולא שיפור
            </h2>
            <p>
              יש מצבים שבהם החלפת הלוח היא שאלה של נוחות, ויש מצבים שבהם היא
              שאלה של בטיחות. ההבחנה ביניהם פשוטה יחסית.
            </p>

            <h3 className={H3}>לוח עשוי עץ</h3>
            <p>
              לוח עץ אינו חסין אש. ניצוץ בחיבור רופף בתוך ארון עץ מוצא חומר בעירה
              מיידי, ולכן זהו המקרה הברור ביותר שבו ההחלפה אינה ניתנת לדחייה.
            </p>

            <h3 className={H3}>אין ממסר פחת, או שיש אחד בלבד לכל הבית</h3>
            <p>
              ממסר פחת הוא אמצעי ההגנה היחיד שמגן על אדם מפני התחשמלות במגע
              ישיר. לוח ללא ממסר פחת אינו עומד בדרישות, וממסר בודד לכל הדירה
              משמעו שכל תקלה נקודתית מחשיכה את הבית כולו.
            </p>

            <h3 className={H3}>סימני חום, השחרה או ריח</h3>
            <p>
              השחרה סביב בורג, פלסטיק מעוות או ריח חרוך מעידים על חיבור רופף
              שמייצר חום. תופעה כזו מחמירה עם הזמן ואינה נעלמת מעצמה.
            </p>
            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h4 className="mb-2 text-lg font-bold text-red-900">אזהרת בטיחות</h4>
              <p className="m-0 leading-relaxed text-red-900">
                אם הלוח חם למגע, מדיף ריח חרוך או משמיע זמזום — נתקו את המעגלים
                העמוסים ופנו מיד לחשמלאי מוסמך. אין לפתוח את הלוח, אין להדק
                ברגים ואין להמתין ל&quot;אולי זה יעבור&quot;.
              </p>
            </div>

            <h3 className={H3}>אין מקום פיזי לתוספת מעגלים</h3>
            <p>
              לוח מלא מוביל כמעט תמיד לאלתורים: שני מוליכים תחת בורג אחד, מעגלים
              שמחוברים לאותו מפסק, או מפסק שהוחלף בגדול יותר במקום להוסיף מעגל.
              כל אלה מבטלים את ההגנה שהמפסק אמור לספק.
            </p>

            <h3 className={H3}>הגדלת חיבור או שינוי מהותי בעומס</h3>
            <p>
              מעבר לחיבור גדול יותר מחייב לוח מתאים. פירוט מלא של התהליך מופיע
              במדריך{" "}
              <Link href="/articles/three-phase-upgrade" className={LINK}>
                הגדלת חיבור לתלת-פאזי
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="inside">
            <h2 id="inside" className={H2}>
              מה חייב להיכלל בלוח חדש
            </h2>
            <p>
              לוח חדש אינו רשימת קניות אחידה. הרכיבים נבחרים לפי חישוב עומסים,
              לפי סוג המעגלים ולפי מבנה המתקן — אך יש מרכיבים שחוזרים כמעט תמיד.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="רכיבי הגנה מרכזיים בלוח חשמל ותפקידם"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  רכיבי ההגנה המרכזיים בלוח חשמל ביתי והסכנה שכל אחד מהם מטפל
                  בה. הבחירה המדויקת נעשית לפי חישוב ולפי מצב המתקן.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      רכיב
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מפני מה הוא מגן
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      הערה מקצועית
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      מאמ״ת ראשי
                    </th>
                    <td className="border border-slate-200 p-3">
                      עומס יתר על החיבור כולו
                    </td>
                    <td className="border border-slate-200 p-3">
                      גודלו נגזר מגודל החיבור שאושר בחברת החשמל
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      ממסר פחת (מפסק מגן)
                    </th>
                    <td className="border border-slate-200 p-3">
                      התחשמלות עקב זליגת זרם
                    </td>
                    <td className="border border-slate-200 p-3">
                      רצוי לפצל לכמה ממסרים כדי שתקלה לא תחשיך את כל הבית
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      מאמ״תים למעגלים
                    </th>
                    <td className="border border-slate-200 p-3">
                      קצר ועומס יתר במעגל בודד
                    </td>
                    <td className="border border-slate-200 p-3">
                      הגודל חייב להתאים לחתך המוליך, לא לתיאבון הצרכן
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      פס הארקה ופס אפס נפרדים
                    </th>
                    <td className="border border-slate-200 p-3">
                      זרמי תקלה אל האדמה
                    </td>
                    <td className="border border-slate-200 p-3">
                      ערבוב בין השניים גורם לקפיצות פחת בלתי מוסברות
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      סימון וטבלת מעגלים
                    </th>
                    <td className="border border-slate-200 p-3">
                      טעויות בזמן טיפול או חירום
                    </td>
                    <td className="border border-slate-200 p-3">
                      דרישה תקנית, ולא קישוט — היא מקצרת כל תקלה עתידית
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="process">
            <h2 id="process" className={H2}>
              תהליך ההחלפה שלב אחר שלב
            </h2>
            <p>
              החלפת לוח מבוצעת בסדר קבוע. דילוג על שלב מוקדם מתגלה כמעט תמיד
              בשלב מאוחר, וכבר אחרי שהלוח סגור.
            </p>
            <ol>
              <li>
                <strong>מיפוי המצב הקיים.</strong> מזוהים המעגלים, נבדק חתך
                המוליכים ונבחן מצב ההארקה. בבתים ישנים זהו השלב הארוך ביותר,
                משום שהתיעוד המקורי לרוב אינו קיים.
              </li>
              <li>
                <strong>חישוב עומסים ותכנון הלוח.</strong> נקבעים מספר המעגלים,
                גודלי ההגנות וחלוקת הפאזות. התכנון נעשה לפני הרכישה, לא במהלך
                ההתקנה.
              </li>
              <li>
                <strong>ניתוק והתקנת הלוח.</strong> ההזנה מנותקת, הלוח הישן
                מפורק, והלוח החדש מותקן ומחווט לפי התכנון.
              </li>
              <li>
                <strong>הפרדת אפס והארקה.</strong> מוליכי האפס ומוליכי ההגנה
                מופרדים לפסים ייעודיים — שלב שמונע חלק ניכר מהתקלות העתידיות.
              </li>
              <li>
                <strong>חלוקת המעגלים בין הפאזות.</strong> העומסים מפוזרים כך
                שהפאזות יישאו עומס דומה, כמפורט במדריך{" "}
                <Link href="/articles/load-balancing" className={LINK}>
                  איזון עומסים וחלוקת פאזות
                </Link>
                .
              </li>
              <li>
                <strong>סימון, בדיקות מסירה ותיעוד.</strong> כל מעגל מסומן,
                מבוצעות המדידות, והתוצאות נרשמות בתעודת בדיקה חתומה.
              </li>
            </ol>
          </section>

          <section aria-labelledby="tests">
            <h2 id="tests" className={H2}>
              בדיקות המסירה — הרגע שקובע
            </h2>
            <p>
              זהו ההבדל המהותי בין עבודה הנדסית לבין החלפת רכיבים. לוח שלא נבדק
              במדידה הוא הנחה, לא עובדה.
            </p>
            <p>
              נמדדת התנגדות הבידוד של המעגלים, נמדדת רציפות מוליכי ההגנה, ונבדק
              זמן הניתוק בפועל של כל ממסר פחת. במקביל נמדדת עכבת לולאת התקלה,
              שקובעת אם המפסק ינתק מספיק מהר בעת קצר.
            </p>
            <p>
              הרחבה מלאה על משמעות המספרים האלה מופיעה במדריך{" "}
              <Link href="/articles/fault-loop-impedance" className={LINK}>
                בדיקת הארקה ולולאת תקלה
              </Link>
              . זהו המסמך שממנו לומדים אם המיגון יפעל בזמן אמת.
            </p>
            <p>
              בקשו לראות את התוצאות. מספרים מדודים על גבי תעודה חתומה הם ההוכחה
              היחידה שהעבודה הושלמה כראוי.
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי מורשה לבצע ולחתום
            </h2>
            <p>
              עבודה בלוח חשמל שמורה לבעל רישיון חשמלאי בדרגה המתאימה לגודל
              המתקן. חשמלאי מוסמך רשאי לעבוד עד 3×80 אמפר, וחשמלאי ראשי עד
              3×250 אמפר.
            </p>
            <p>
              המשמעות פשוטה: מי שרישיונו אינו מכסה את גודל החיבור אינו רשאי
              לבצע את העבודה או לחתום עליה. הרחבה על דרגות הרישיון מופיעה ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
            <p>
              אני עצמי הנדסאי חשמל והנדסאי מכונות, בעל רישיון חשמלאי מוסמך
              וראשי בתוקף. במקביל לעבודה בשטח אני מרצה ומכשיר הנדסאי חשמל, ומלמד
              בדיוק את חישובי ההגנות ותיאום המיגון שעליהם נשען תכנון לוח.
            </p>
            <p>
              אני גם נותן חוות דעת מומחה לבתי משפט, וכסטודנט למשפטים בשנתי
              האחרונה אני נתקל שוב ושוב באותה תמונה: לוח שהוחלף בלי בדיקות ובלי
              תיעוד. כשמתרחש נזק, היעדר התעודה הוא שהופך את התיק לבעייתי מול
              חברת הביטוח.
            </p>
          </section>

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className={H2}>
              כשלים נפוצים בלוחות שהוחלפו
            </h2>

            <h3 className={H3}>הגדלת המאמ״ת במקום פתרון הבעיה</h3>
            <p>
              כשמפסק קופץ, החלפתו במפסק גדול יותר אינה פתרון אלא ביטול ההגנה.
              המוליך בקיר נשאר באותו חתך, וכעת הוא עלול להתחמם בלי שדבר ינתק.
            </p>

            <h3 className={H3}>ערבוב אפס והארקה</h3>
            <p>
              חיבור מוליך אפס לפס ההארקה גורם לממסר הפחת לזהות חוסר איזון ולנתק.
              זו אחת הסיבות השכיחות לקפיצות שנראות אקראיות לחלוטין.
            </p>

            <h3 className={H3}>לוח יפה בלי מדידות</h3>
            <p>
              סידור מוליכים מרשים אינו מעיד על תקינות חשמלית. בלי מדידת בידוד,
              רציפות ולולאת תקלה, אין שום ראיה שהמערכת מוגנת.
            </p>

            <h3 className={H3}>העדר סימון מעגלים</h3>
            <p>
              לוח לא מסומן הופך כל תקלה עתידית לחיפוש ממושך, ובמצב חירום הוא
              מסוכן ממש. הסימון הוא חלק מהעבודה, לא תוספת.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              החלפת לוח כוללת מונחים טכניים ומסמכים שחשוב להבין, ולכן ההסבר
              ניתן בשפה שנוחה לכם. השירות והייעוץ ניתנים בעברית, ברוסית
              ובאנגלית.
            </p>
            <p>
              אפשר גם לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של הלוח הקיים
              ולקבל הערכה ראשונית. גם לקוחות שאינם דוברי עברית מקבלים הסבר מלא
              על היקף העבודה ועל תוצאות הבדיקות.
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
          heading="הלוח שלכם ישן, מלא או מדאיג אתכם?"
          description="בדיקת הלוח הקיים, תכנון לוח חדש לפי חישוב עומסים ובדיקות מסירה מלאות עם תעודה חתומה — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לייעוץ על החלפה ושדרוג לוח חשמל"
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
