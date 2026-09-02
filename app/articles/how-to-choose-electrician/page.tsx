import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "how-to-choose-electrician";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "איך לבחור חשמלאי מוסמך ומומלץ? (המדריך המלא)",
  description:
    "מחפשים חשמלאי? כך תדעו לסנן חאפרים. מה ההבדל בין חשמלאי רגיל למוסמך, למה חשוב לבדוק תעודות, ואיך מוצאים חשמלאי יצאת צדיק שזמין 24 שעות.",
  keywords: [
    "איך לבחור חשמלאי",
    "חשמלאי מוסמך",
    "חשמלאי מומלץ",
    "בדיקת רישיון חשמלאי",
    "חשמלאי 24 שעות",
    "הצעת מחיר חשמלאי",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "איך לבחור חשמלאי מוסמך ומומלץ?",
    description:
      "מדריך מלא: רישיון, יצאת צדיק, מידרג, חירום 24 שעות וחשמלאי דודים.",
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
    question: "איזו דרגת רישיון צריך חשמלאי שבא לדירה שלי?",
    answer:
      "לרוב הדירות בישראל, שבהן החיבור חד-פאזי או תלת-פאזי עד 3×80 אמפר, רישיון חשמלאי מוסמך מספיק לכל העבודות כולל החלפת לוח. כשהחיבור גדול מזה, למשל בבניין משותף או בעסק, נדרש חשמלאי ראשי. הכלל הוא שהדרגה נקבעת לפי גודל החיבור בפועל ולא לפי סוג הנכס.",
  },
  {
    question: "מה מותר לבקש מחשמלאי לפני שהוא מגיע?",
    answer:
      "מותר ואף כדאי לבקש שלושה דברים בטלפון או בוואטסאפ: צילום של רישיון החשמל בתוקף, מחיר ביקור או אבחון מוגדר מראש, ואישור שתתקבל חשבונית מס בסיום. בעל מקצוע שעובד בשקיפות שולח את שלושתם בלי היסוס, ולכן ההיסוס עצמו הוא המידע החשוב ביותר שתקבלו.",
  },
  {
    question: "האם מחיר נמוך בטלפון הוא סימן טוב?",
    answer:
      "לא בהכרח, ולעיתים ההפך. מחיר ביקור נמוך במיוחד משמש לעיתים כפיתיון שנועד רק לפתיחת הדלת, ואחריו מתגלה תקלה חמורה שדורשת אלפי שקלים באישור מיידי. הצעה אמינה מפרידה בין מחיר האבחון לבין מחיר התיקון, ונמסרת בכתב לפני תחילת העבודה.",
  },
  {
    question: "באילו שפות ובאילו שעות אפשר לקבל שירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, ואפשר לשלוח הודעת וואטסאפ בכל שפה ולצרף תמונה של הלוח או של התקלה. יש זמינות למקרי חירום סביב השעון למעט שבתות וחגים, וגם בשעת חירום נמסר מחיר לפני תחילת העבודה.",
  },
];

const SECTIONS = [
  { id: "musamach", label: "חשמלאי מוסמך מול חאפרים" },
  { id: "bedika", label: "הבדיקה שלוקחת שלוש דקות" },
  { id: "sheelot", label: "חמש שאלות לשאול בטלפון" },
  { id: "hamlatsot", label: "המלצות, תו איכות וזיופים" },
  { id: "mechir", label: "איך קוראים הצעת מחיר" },
  { id: "hirum", label: "מקרי חירום 24 שעות" },
  { id: "momchiyut", label: "מומחיות ספציפית: דודים ובית חכם" },
  { id: "mismachim", label: "מה אתם חייבים לקבל בסיום" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function HowToChooseElectricianArticle() {
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
              איך לבחור חשמלאי
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
            איך לבחור חשמלאי מוסמך (וממה כדאי להיזהר)?
          </h1>

          <p className="text-base leading-relaxed text-slate-600">
            מאת{" "}
            <Link href="/about" className={LINK}>
              יהודה חכמוב
            </Link>{" "}
            — הנדסאי חשמל ומכונות מוסמך, בעל רישיון חשמלאי ראשי, נותן חוות דעת
            מומחה לבתי משפט וסטודנט למשפטים.
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
            בחירת חשמלאי אינה עניין של תחושה אלא של שלוש בדיקות: רישיון בתוקף
            שאפשר לאמת בפנקס החשמלאים של משרד העבודה, דרגת רישיון שמתאימה לגודל
            החיבור בנכס, והתחייבות לחשבונית מס ולתעודת בדיקה בסיום.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            כל שלוש הבדיקות נעשות בטלפון או בוואטסאפ, לפני שמישהו נכנס הביתה,
            ולוקחות פחות מחמש דקות. מי שמתחמק מאחת מהן חסך לכם את שאר הבדיקה.
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
          <section aria-labelledby="musamach">
            <h2 id="musamach" className={H2}>
              תעודת זהות: חשמלאי מוסמך מול &quot;כלבויניק&quot;
            </h2>
            <p>
              חוק החשמל בישראל קובע שכל עבודת חשמל — גם החלפת שקע — חייבת להתבצע
              בידי בעל רישיון בתוקף מטעם משרד העבודה. אין בחוק פטור לעבודות
              קטנות.
            </p>
            <p>
              שיפוצניק או שכן שיודע &quot;להתעסק עם חוטים&quot; אינו תחליף. מעבר
              לסכנה עצמה, עבודה לא תקנית עלולה להשמיט את הכיסוי הביטוחי בדיוק
              ברגע שבו תזדקקו לו, כמפורט במאמר{" "}
              <Link href="/articles/handyman-vs-electrician" className={LINK}>
                הנדימן הוא לא חשמלאי
              </Link>
              .
            </p>
            <p>
              נקודה שרבים מפספסים: רישיון בתוקף אינו מספיק בפני עצמו, והדרגה
              חייבת לכסות את גודל החיבור. חשמלאי מוסמך רשאי לעבוד עד 3×80 אמפר
              וחשמלאי ראשי עד 3×250 אמפר, ופירוט הדרגות מופיע ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="bedika">
            <h2 id="bedika" className={H2}>
              הבדיקה שלוקחת שלוש דקות
            </h2>
            <p>
              אין צורך בידע מקצועי כדי לסנן. די בארבע נקודות, וכולן נבדקות לפני
              הביקור.
            </p>
            <p>
              כדי לבדוק את הנקודה השנייה בטבלה אתם צריכים לדעת מה גודל החיבור
              שלכם, וזה כתוב על המפסק הראשי בלוח — למשל 40 אמפר בחיבור חד-פאזי,
              או 3×40 אמפר בתלת-פאזי. די בצילום של הכיתוב הזה, ואין צורך לפתוח
              דבר.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="נקודות בדיקה לפני הזמנת חשמלאי והנורות האדומות שלהן"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[34rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  מה לבדוק לפני הזמנת חשמלאי, איך בודקים בפועל, ומה נחשב נורה
                  אדומה.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מה בודקים
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      איך בודקים
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      נורה אדומה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      רישיון בתוקף
                    </th>
                    <td className="border border-slate-200 p-3">
                      צילום הרישיון, ואז חיפוש בפנקס החשמלאים
                    </td>
                    <td className="border border-slate-200 p-3">
                      &quot;זה באוטו&quot;, או תעודה בלי מספר ותוקף
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      התאמת הדרגה
                    </th>
                    <td className="border border-slate-200 p-3">
                      השוואה בין דרגת הרישיון לגודל החיבור בנכס
                    </td>
                    <td className="border border-slate-200 p-3">
                      &quot;אין הבדל, זה אותו דבר&quot;
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      זהות ועסק
                    </th>
                    <td className="border border-slate-200 p-3">
                      התאמה בין שם בעל הרישיון לשם על החשבונית
                    </td>
                    <td className="border border-slate-200 p-3">
                      חשבונית על שם אחר, או סירוב להנפיק
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תיעוד בסיום
                    </th>
                    <td className="border border-slate-200 p-3">
                      התחייבות לתעודת בדיקה עם ערכי מדידה
                    </td>
                    <td className="border border-slate-200 p-3">
                      &quot;תקין&quot; בלי מספרים ובלי חתימה
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="sheelot">
            <h2 id="sheelot" className={H2}>
              חמש שאלות לשאול בטלפון
            </h2>
            <p>
              השאלות עצמן פשוטות. מה שמעניין הוא לא התשובה אלא הנוחות שבה היא
              נמסרת.
            </p>
            <ol>
              <li>
                <strong>אפשר לקבל צילום של הרישיון בוואטסאפ?</strong> תשובה
                חיובית ומיידית היא הסימן הטוב ביותר.
              </li>
              <li>
                <strong>מה מחיר הביקור או האבחון, ומה הוא כולל?</strong> הסכום
                צריך להיות מוגדר, ולא &quot;נראה כשנגיע&quot;.
              </li>
              <li>
                <strong>אם יידרש תיקון, אקבל מחיר לפני הביצוע?</strong> אישור
                בכתב לפני העבודה הוא הנוהג התקין.
              </li>
              <li>
                <strong>אקבל חשבונית מס ותעודת בדיקה?</strong> שני המסמכים הם גם
                האחריות שלכם.
              </li>
              <li>
                <strong>מה גודל החיבור שאתה מורשה לעבוד עליו?</strong> חשמלאי
                אמיתי עונה על זה במשפט אחד.
              </li>
            </ol>
          </section>

          <section aria-labelledby="hamlatsot">
            <h2 id="hamlatsot" className={H2}>
              המלצות, תו איכות — ולמה גם אותם צריך לאמת
            </h2>
            <p>
              דירוגים והמלצות הם נקודת פתיחה טובה. כדאי לבדוק ותק של הפרופיל,
              פיזור התאריכים והאם הביקורות מתארות עבודה ממשית ולא רק
              &quot;מקצועי ואדיב&quot;.
            </p>
            <p>
              החותמת החזקה בישראל היא התוכנית של חיים אתגר בערוץ 12, מפני שהיא
              בודקת בעלי מקצוע בשטח ובמצלמה נסתרת. אנחנו נבדקנו ויצאנו צדיק,
              והסרטון מהטקס מוצג בגלוי בתחתית העמוד.
            </p>
            <p>
              אבל דווקא כאן נדרשת זהירות: לוגו הוא קובץ תמונה, וכיום אפשר לייצר
              בבינה מלאכותית גם תעודות וגם תמונות מזויפות לצד דמויות מהטלוויזיה.
              איך מבדילים מפורט בתחקיר{" "}
              <Link href="/articles/beware-of-scammers" className={LINK}>
                זהירות מנוכלים והונאות &quot;יצאת צדיק&quot;
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="mechir">
            <h2 id="mechir" className={H2}>
              איך קוראים הצעת מחיר
            </h2>
            <p>
              הצעה תקינה מפרידה בין מחיר האבחון לבין מחיר התיקון. האבחון הוא
              עבודה בפני עצמה — מדידה ואיתור — ולכן הוא מתומחר בנפרד ולא נבלע
              בתוך סכום עמום.
            </p>
            <p>
              הצעה מפורטת מציינת שלושה דברים: מה נכלל בעבודה, אילו חומרים
              עיקריים מסופקים, ולאיזו תקופה ניתנת אחריות. שורה אחת בנוסח
              &quot;טיפול בלוח&quot; אינה הצעת מחיר אלא סכום.
            </p>
            <p>
              היזהרו משתי הקצוות. מחיר גבוה בלי פירוט אינו שקוף, ומחיר נמוך
              במיוחד שנמסר עוד לפני שאיש ראה את הלוח משמש לעיתים כפיתיון לפתיחת
              הדלת בלבד.
            </p>
            <p>
              טווחי מחיר מקובלים לעבודות נפוצות מרוכזים ב
              <Link href="/pricing" className={LINK}>
                מחירון השירותים
              </Link>
              , וכך אפשר לבדוק תוך רגע אם ההצעה שקיבלתם נמצאת באזור הסביר או
              רחוקה ממנו בסדר גודל.
            </p>
          </section>

          <section aria-labelledby="hirum">
            <h2 id="hirum" className={H2}>
              מקרי חירום 24 שעות
            </h2>
            <p>
              קצר בלוח או פחת שקופץ ולא חוזר אינם ממתינים לשעות העבודה. בשעת
              חירום השאלה הראשונה היא לא &quot;מי הזול ביותר&quot; אלא מי מגיע
              לאזור שלכם ובאיזה זמן.
            </p>
            <p>
              כדאי גם להבחין בין דחוף לבין דחוי. ריח חרוך, לוח חם, נפילת חשמל
              בכל הדירה או תחושת עקצוץ במגע בברז הם מצבי חירום אמיתיים. שקע בודד
              שאינו עובד או נורה שנשרפה יכולים להמתין לבוקר ולהיפתר בעלות נמוכה
              בהרבה.
            </p>
            <p>
              גם בלילה הכללים אינם משתנים: רישיון, מחיר מוגדר לפני העבודה,
              וחשבונית. רשימת אזורי השירות והזמינות בפועל מופיעה בעמוד{" "}
              <Link href="/cities" className={LINK}>
                אזורי שירות
              </Link>
              .
            </p>
            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-red-900">
                עד שהחשמלאי מגיע
              </h3>
              <p className="m-0 leading-relaxed text-red-900">
                אם יש ריח חרוך, לוח חם למגע או זמזום — נתקו את המעגלים העמוסים
                והמתינו. אין לפתוח את הלוח, אין להדק ברגים ואין לנסות להעלות שוב
                ושוב מפסק שקופץ.
              </p>
            </div>
          </section>

          <section aria-labelledby="momchiyut">
            <h2 id="momchiyut" className={H2}>
              מומחיות ספציפית: דודים, מיזוג ובית חכם
            </h2>
            <p>
              לא כל חשמלאי עוסק בכל סוגי העבודות, ולכן כדאי לשאול מראש. תקלת דוד
              היא דוגמה טובה: היא יכולה לנבוע מגוף החימום, מהתרמוסטט או מהחיווט
              בלוח, ומי שיודע להפריד ביניהם אינו מחליף רכיבים על עיוור.
            </p>
            <p>
              עבודות אחרות דורשות תכנון מוקדם ולא רק ביצוע. מעגל ייעודי לכיריים
              אינדוקציה, מערכת מיזוג מיני-מרכזי או תשתית לבית חכם מחייבים חישוב
              עומסים ובחירת הגנות עוד לפני שקונים רכיבים.
            </p>
            <p>
              בשאלות כאלה משתלם לבחור בעל מקצוע שגם מתכנן. אני הנדסאי חשמל
              ומכונות מוסמך בעל רישיון ראשי, ובמקביל לעבודה בשטח אני מרצה ומכשיר
              הנדסאי חשמל במכללת אורט תעשייה אווירית — כלומר מלמד את אותם חישובי
              הגנות שהעבודה נשענת עליהם.
            </p>
          </section>

          <section aria-labelledby="mismachim">
            <h2 id="mismachim" className={H2}>
              מה אתם חייבים לקבל בסיום
            </h2>
            <p>
              עבודה מסתיימת במסמכים, לא רק בכך שהאור נדלק. אתם אמורים לקבל
              חשבונית מס, ובעבודות במתקן גם תעודת בדיקה חתומה בידי בעל הרישיון
              עם ערכי מדידה בפועל.
            </p>
            <p>
              אני נותן חוות דעת מומחה לבתי משפט בתיקי חשמל, וכסטודנט למשפטים אני
              רואה את שני הצדדים. הכשל עצמו כמעט תמיד פשוט וידוע; מה שהופך אותו
              לתיק הוא היעדר תיעוד.
            </p>
            <p>
              כשמתרחש נזק, חברת הביטוח מבקשת הוכחה שהעבודה בוצעה בידי בעל רישיון
              מתאים. שמרו את צילום הרישיון, את ההתכתבות, את החשבונית ואת תעודת
              הבדיקה בתיקייה אחת — זה כל מה שנדרש.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              בחירה נכונה מחייבת להבין מה נאמר לכם, ולכן ההסבר ניתן בשפה שנוחה
              לכם — בעברית, ברוסית ובאנגלית. אפשר לשלוח הודעת וואטסאפ בכל שפה,
              לצרף תמונה של הלוח או של התקלה, ולקבל הערכה ראשונית עוד לפני
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
          heading="מחפשים חשמלאי שאפשר לבדוק לפני שהוא מגיע?"
          description="רישיון החשמל, התעודות וההוקרה מ״יצאת צדיק״ מוצגים כאן בגלוי, ואשלח אותם בשמחה מראש. מחיר ביקור מוגדר, מחיר תיקון לפני הביצוע, וחשבונית ותעודת בדיקה בסיום. אפשר להתקשר או לשלוח וואטסאפ בכל שפה."
          callPurpose="לתיאום ביקור ולקבלת הצעת מחיר שקופה"
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
