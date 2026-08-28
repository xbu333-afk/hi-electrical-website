import type { Metadata } from "next";
import Link from "next/link";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "three-phase-upgrade";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "הגדלת חיבור לתלת-פאזי — מתי זה הכרחי ואיך עושים את זה נכון",
  description: article.excerpt,
  keywords: [
    "הגדלת חיבור לתלת פאזי",
    "מעבר לתלת פאזי",
    "חיבור תלת פאזי בבית",
    "שדרוג לוח חשמל תלת פאזי",
    "הגדלת חיבור חברת חשמל",
    "כמה עולה מעבר לתלת פאזי",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "הגדלת חיבור לתלת-פאזי: מתי זה הכרחי ואיך עושים את זה נכון?",
    description:
      "סימני האזהרה שהחיבור שלכם קטן מדי, התהליך המלא מול חברת החשמל, ומי מורשה לחתום על העבודה — מדריך מאת הנדסאי חשמל בעל רישיון ראשי.",
    type: "article",
  },
};

/**
 * מקור אמת יחיד לשאלות ולתשובות: אותו מערך מזין את התצוגה בעמוד
 * ואת ה-FAQPage ב-JSON-LD, כדי שהסכימה לא תסתור את מה שהמשתמש רואה.
 */
const FAQ: readonly ArticleFaq[] = [
  {
    question: "כמה זמן לוקח לעבור מחד-פאזי לתלת-פאזי?",
    answer:
      "העבודה בנכס עצמו — החלפת לוח החשמל, חיווט מחדש וחלוקת המעגלים בין הפאזות — נמשכת בדרך כלל יום עד יומיים. מה שקובע את משך התהליך הכולל הוא אישור הבקשה להגדלת החיבור מול חברת החשמל, שיכול לקחת מספר שבועות. מומלץ להגיש את הבקשה מוקדם ככל האפשר ולא להמתין לרגע שבו החשמל כבר קופץ.",
  },
  {
    question: "האם חייבים להחליף את כל לוח החשמל?",
    answer:
      "כמעט תמיד כן. לוח חד-פאזי אינו בנוי לקלוט מאמ״ת ראשי תלת-פאזי ואת מספר המעגלים הנדרש, ולכן המעבר לתלת-פאזי כרוך בהחלפת הלוח. זו גם ההזדמנות הנכונה להוסיף ממסרי פחת מעודכנים ולוודא שההארקה עומדת בתקן.",
  },
  {
    question: "האם חיבור תלת-פאזי מייקר את חשבון החשמל?",
    answer:
      "המעבר לתלת-פאזי אינו מייקר את צריכת החשמל עצמה. החיוב על הצריכה נעשה לפי קילוואט-שעה שנצרכו בפועל, בדיוק כמו בחיבור חד-פאזי. מה שכן משתנה הוא אגרת החיבור החד-פעמית לחברת החשמל, ולעיתים גם רכיב התשלום הקבוע שנגזר מגודל החיבור.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית. אפשר גם לשלוח הודעת וואטסאפ בכל שפה ולקבל מענה — כך שגם דוברי שפות נוספות יכולים לתאר את התקלה בנוחות ולקבל הסבר מקצועי ברור.",
  },
];

const SECTIONS = [
  { id: "what-is", label: "מה זה חיבור תלת-פאזי?" },
  { id: "signs", label: "חמישה סימנים שהחיבור שלכם קטן מדי" },
  { id: "process", label: "התהליך שלב אחר שלב" },
  { id: "who", label: "מי מורשה לבצע ולחתום על העבודה" },
  { id: "cost", label: "לוחות זמנים ומה משפיע על העלות" },
  { id: "mistakes", label: "טעויות נפוצות שעולות ביוקר" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function ThreePhaseUpgradeArticle() {
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
              הגדלת חיבור לתלת-פאזי
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
            הגדלת חיבור לתלת-פאזי: מתי זה הכרחי ואיך עושים את זה נכון?
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
            הגדלת חיבור לתלת-פאזי נדרשת כשההספק החד-פאזי הקיים כבר לא מספיק
            לעומסים בבית או בעסק. חיבור חד-פאזי סטנדרטי של 1×25 אמפר מעמיד
            לרשותכם כ-5.7 קילוואט בלבד, בעוד חיבור תלת-פאזי של 3×25 אמפר מספק
            כ-17 קילוואט — פי שלושה.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            התהליך כולל חישוב עומסים, בקשה להגדלת חיבור מול חברת החשמל, החלפת
            לוח החשמל ללוח תלת-פאזי, וחלוקה מאוזנת של המעגלים בין שלוש הפאזות.
            את העבודה חייב לבצע חשמלאי בעל רישיון בדרגה המתאימה לגודל החיבור.
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
              מה זה חיבור תלת-פאזי?
            </h2>
            <p>
              ברשת החשמל בישראל המתח בין פאזה לאפס הוא 230 וולט. בחיבור
              תלת-פאזי מגיעות אל הנכס שלוש פאזות במקום אחת, והמתח בין שתי פאזות
              הוא כ-400 וולט.
            </p>
            <p>
              היתרון המרכזי אינו המתח הגבוה אלא ההספק הזמין. שלוש פאזות מאפשרות
              לחלק את העומס לשלושה ערוצים נפרדים, ולכן אותו גודל מאמ״ת נושא פי
              שלושה הספק.
            </p>
            <p>
              יש גם שיקול שאין עליו ויכוח: מנועים חשמליים כבדים — מעליות,
              משאבות, מדחסים ומזגנים מיני-מרכזיים גדולים — מיוצרים לרוב לעבודה
              תלת-פאזית בלבד. בלי חיבור תלת-פאזי פשוט אי אפשר להפעיל אותם.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="השוואה בין חיבור חד-פאזי לתלת-פאזי"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[34rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  השוואה בין חיבור חד-פאזי לחיבור תלת-פאזי בגודל מאמ״ת זהה.
                  ערכי ההספק מעוגלים ומשמשים להמחשה בלבד.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מאפיין
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      חד-פאזי 1×25A
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      תלת-פאזי 3×25A
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      מתח
                    </th>
                    <td className="border border-slate-200 p-3">230 וולט</td>
                    <td className="border border-slate-200 p-3">230 / 400 וולט</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      הספק זמין (מקורב)
                    </th>
                    <td className="border border-slate-200 p-3">כ-5.7 קילוואט</td>
                    <td className="border border-slate-200 p-3">כ-17 קילוואט</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      מוליכי הזנה
                    </th>
                    <td className="border border-slate-200 p-3">פאזה + אפס</td>
                    <td className="border border-slate-200 p-3">3 פאזות + אפס</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      מתאים ל־
                    </th>
                    <td className="border border-slate-200 p-3">
                      דירה קטנה עם עומס בסיסי
                    </td>
                    <td className="border border-slate-200 p-3">
                      בית פרטי, ריבוי מזגנים, עסק
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="signs">
            <h2 id="signs" className={H2}>
              חמישה סימנים שהחיבור שלכם קטן מדי
            </h2>

            <h3 className={H3}>1. המאמ״ת הראשי קופץ כשמפעילים כמה מכשירים יחד</h3>
            <p>
              זהו הסימן הברור ביותר. כשהמזגן, הדוד והתנור פועלים במקביל והמפסק
              הראשי מנתק — החיבור הגיע לגבול היכולת שלו.
            </p>
            <p>
              חשוב להבחין בין קפיצה של המאמ״ת הראשי, שמעידה על עומס יתר, לבין
              קפיצה של{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                ממסר הפחת
              </Link>
              , שמעידה בדרך כלל על זליגת זרם. שתי התופעות נראות דומה בלוח, אך
              הטיפול בהן שונה לחלוטין.
            </p>

            <h3 className={H3}>2. האורות מתעמעמים כשמכשיר גדול נדלק</h3>
            <p>
              עמעום רגעי בכל פעם שהמזגן או המשאבה מתניעים מעיד על נפילת מתח.
              המשמעות היא שהמערכת מתקשה לספק את זרם ההתנעה הנדרש.
            </p>

            <h3 className={H3}>3. לוח החשמל מתחמם או מדיף ריח חרוך</h3>
            <p>
              מוליכים שמשחירים, ברגים שמשתחררים וחום מורגש בלוח הם סימני עומס
              כרוני. במצב כזה הסיכון אינו רק לתקלה אלא לשריפה.
            </p>
            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h4 className="mb-2 text-lg font-bold text-red-900">
                אזהרת בטיחות
              </h4>
              <p className="m-0 leading-relaxed text-red-900">
                אם עולה ריח חרוך מלוח החשמל או שהלוח חם למגע — הפסיקו להשתמש
                במעגלים העמוסים ופנו מיד לחשמלאי מוסמך. אין להמתין עם תופעה כזו
                ואין לנסות לטפל בה עצמאית.
              </p>
            </div>

            <h3 className={H3}>4. אתם מוסיפים עומס חדש ומשמעותי</h3>
            <p>
              מערכת מיזוג מיני-מרכזי, כיריים אינדוקציה, תנור בילט-אין, דוד חשמלי
              או מייבש כביסה מוסיפים כל אחד עומס ניכר. שילוב של שניים או שלושה
              מהם מוציא חיבור חד-פאזי ממרווח הביטחון שלו.
            </p>
            <p>
              אפשר לקבל אומדן ראשוני של הצריכה בעזרת{" "}
              <Link href="/device-calculator" className={LINK}>
                מחשבון צריכת המכשירים
              </Link>{" "}
              שבאתר, אך הוא אינו מחליף חישוב עומסים מקצועי.
            </p>

            <h3 className={H3}>5. הציוד שרכשתם דורש הזנה תלת-פאזית</h3>
            <p>
              מכונות בעסק, מעליות פרטיות, משאבות בריכה ומדחסים תעשייתיים דורשים
              לרוב הזנה תלת-פאזית מלאה. במקרה כזה השאלה אינה אם לשדרג אלא מתי.
            </p>
          </section>

          <section aria-labelledby="process">
            <h2 id="process" className={H2}>
              התהליך שלב אחר שלב
            </h2>
            <p>
              הגדלת חיבור אינה החלפת מפסק. זהו תהליך מוסדר שמשלב עבודה הנדסית
              בנכס ובקשה רשמית מול חברת החשמל.
            </p>
            <ol>
              <li>
                <strong>חישוב עומסים.</strong> החשמלאי מסכם את ההספקים הקיימים
                והמתוכננים ומחשב את גודל החיבור הנדרש, כולל מרווח לעתיד.
              </li>
              <li>
                <strong>בדיקת התשתית הקיימת.</strong> נבדקים חתך המוליכים מנקודת
                החיבור אל הלוח, מצב מערכת ההארקה ומקום פנוי בארון.
              </li>
              <li>
                <strong>הגשת בקשה לחברת החשמל.</strong> מוגשת בקשה להגדלת חיבור,
                ומשולמת אגרה שנקבעת לפי גודל החיבור המבוקש.
              </li>
              <li>
                <strong>שדרוג לוח החשמל.</strong> מותקן{" "}
                <Link href="/articles/ma-ze-luch-hashmal" className={LINK}>
                  לוח חשמל
                </Link>{" "}
                תלת-פאזי עם מאמ״ת ראשי מתאים, ממסרי פחת וסידור מעגלים מחדש.
              </li>
              <li>
                <strong>איזון הפאזות.</strong> המעגלים מחולקים בין שלוש הפאזות
                כך שהעומס יתפזר באופן שווה ככל האפשר.
              </li>
              <li>
                <strong>בדיקות מסירה ותיעוד.</strong> מבוצעות{" "}
                <Link href="/articles/grounding" className={LINK}>
                  בדיקת הארקה
                </Link>
                , מדידת התנגדות ובדיקת ממסרי הפחת, והעבודה מתועדת ונחתמת בידי
                בעל הרישיון.
              </li>
            </ol>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי מורשה לבצע ולחתום על העבודה
            </h2>
            <p>
              בישראל דרגת הרישיון של החשמלאי נגזרת מגודל הזרם במתקן. חשמלאי
              מוסמך רשאי לעבוד במתקנים עד 3×80 אמפר, וחשמלאי ראשי עד 3×250 אמפר.
            </p>
            <p>
              המשמעות המעשית פשוטה: חשמלאי שרישיונו אינו מכסה את גודל החיבור
              המבוקש אינו רשאי לבצע את העבודה או לחתום עליה. פירוט מלא של דרגות
              הרישיון מופיע ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
            <p>
              אני עצמי הנדסאי חשמל והנדסאי מכונות, בעל רישיון חשמלאי מוסמך וראשי
              בתוקף. במקביל לעבודה בשטח אני מרצה ומכשיר הנדסאי חשמל, ומלמד בדיוק
              את חישובי העומסים והתקנים שעליהם נשען תהליך כזה.
            </p>
            <p>
              אני גם נותן חוות דעת מומחה לבתי משפט בתחום החשמל, וכסטודנט למשפטים
              בשנתי האחרונה אני רואה את הצד השני של המשוואה. כשעבודה מבוצעת בלי
              רישיון מתאים ובלי תיעוד, הבעיה מתגלה בדרך כלל מאוחר מדי — מול חברת
              הביטוח או בבית המשפט.
            </p>
          </section>

          <section aria-labelledby="cost">
            <h2 id="cost" className={H2}>
              לוחות זמנים ומה משפיע על העלות
            </h2>
            <p>
              העבודה בנכס עצמה נמשכת בדרך כלל יום עד יומיים. משך התהליך הכולל
              נקבע ברובו על ידי זמן הטיפול בבקשה בחברת החשמל.
            </p>
            <p>
              העלות מורכבת משני רכיבים נפרדים: אגרת הגדלת החיבור שמשולמת לחברת
              החשמל, ועלות העבודה והחומרים בנכס. אין מחיר אחיד, והוא תלוי במרחק
              מנקודת החיבור, בחתך המוליכים הקיים, במצב ההארקה ובגודל הלוח הנדרש.
            </p>
            <p>
              טווחי מחירים לשירותים נפוצים מפורטים ב
              <Link href="/pricing" className={LINK}>
                מחירון השירותים
              </Link>
              . להגדלת חיבור נדרשת תמיד הערכה פרטנית לאחר בדיקה בשטח.
            </p>
          </section>

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className={H2}>
              טעויות נפוצות שעולות ביוקר
            </h2>

            <h3 className={H3}>שדרוג הלוח בלי לאזן את הפאזות</h3>
            <p>
              זו הטעות הנפוצה ביותר. אם רוב המעגלים הכבדים מחוברים לאותה פאזה,
              הבית יקבל חיבור תלת-פאזי אך ימשיך לסבול מקפיצות.
            </p>

            <h3 className={H3}>דילוג על בדיקות הארקה ולולאת תקלה</h3>
            <p>
              לוח חדש אינו מבטיח מערכת בטוחה. בלי מדידה של התנגדות ההארקה ושל
              עכבת לולאת התקלה אין דרך לדעת שאמצעי המיגון אכן יפעלו בזמן.
            </p>

            <h3 className={H3}>העסקת בעל רישיון שאינו מתאים לגודל החיבור</h3>
            <p>
              עבודה שבוצעה מחוץ לתחום הרישיון עלולה להיחשב כליקוי מהותי. במקרה
              של נזק, חברת הביטוח עשויה לטעון שהמתקן לא בוצע כדין.
            </p>

            <h3 className={H3}>אי-תיעוד העבודה</h3>
            <p>
              תיעוד ותעודת בדיקה הם ההוכחה היחידה שהעבודה בוצעה כראוי. שמרו
              אותם — הם נדרשים במכירת הנכס, מול הביטוח ובכל בדיקה עתידית.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              תהליך הגדלת חיבור כולל מונחים טכניים ומסמכים רשמיים, ולכן חשוב
              שההסבר יהיה ברור. הייעוץ והשירות ניתנים בעברית, ברוסית ובאנגלית.
            </p>
            <p>
              אפשר גם לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של לוח החשמל
              ולקבל מענה מקצועי. גם לקוחות שאינם דוברי עברית מקבלים הסבר מלא על
              היקף העבודה לפני שמתחילים.
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
          heading="צריכים חוות דעת על הגדלת החיבור שלכם?"
          description="בדיקת עומסים, המלצה על גודל החיבור הנכון וליווי מלא מול חברת החשמל — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לייעוץ על הגדלת חיבור לתלת-פאזי"
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
