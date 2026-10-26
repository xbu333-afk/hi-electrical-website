import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl, buildOpenGraph } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "megger-test";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "בדיקת מגר: מה זה, מתי צריך וכמה זה עולה",
  description:
    "בדיקת מגר (בדיקת בידוד) מאתרת זליגות וקצרים נסתרים בחיווט: מתי צריך אותה, איך היא מתבצעת, מה התוצאות אומרות, מה המגבלות שלה וכמה היא עולה.",
  keywords: [
    "בדיקת מגר",
    "מגר חשמל",
    "בדיקת בידוד חשמל",
    "מדידת התנגדות בידוד",
    "איתור זליגה בחשמל",
    "איתור קצר",
    "פחת קופץ",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: buildOpenGraph({
    title: "בדיקת מגר: מה זה, מתי צריך אותה וכמה היא עולה",
    description:
      "איך בדיקת מגר מאתרת זליגות וקצרים נסתרים בחיווט, מתי צריך אותה, מה המגבלות שלה וכמה היא עולה.",
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
    question: "כמה זמן לוקחת בדיקת מגר?",
    answer:
      "בדירה רגילה הבדיקה לוקחת בדרך כלל בין חצי שעה לשעה וחצי. הזמן תלוי במספר המעגלים בלוח, בנגישות ללוח ובכמות המכשירים שצריך לנתק לפני המדידה.",
  },
  {
    question: "האם צריך לנתק את החשמל בבית בזמן הבדיקה?",
    answer:
      "כן. הבדיקה מתבצעת כשהמעגלים מנותקים ממתח, ולכן יהיו הפסקות חשמל קצרות בזמן העבודה. כדאי להיערך מראש, למשל לשמור עבודה במחשב ולהודיע לבני הבית.",
  },
  {
    question: "האם הבדיקה יכולה להזיק למכשירים בבית?",
    answer:
      "המכשיר בודק במתח גבוה מהמתח הרגיל, ולכן לפני המדידה מנתקים מכשירים אלקטרוניים רגישים מהמעגל, כמו מחשבים, ספקי כוח ומכשירים חכמים. כשהבדיקה נעשית נכון, היא בטוחה למכשירים.",
  },
  {
    question: "מה קורה אם הבדיקה לא מצאה כלום אבל החשמל עדיין קופץ?",
    answer:
      "זה קורה לפעמים בתקלה שבאה והולכת, למשל זליגה שמופיעה רק כשיש לחות או רק כשמכשיר מסוים פועל. במקרה כזה כדאי לרשום מתי החשמל קופץ ומה פעל באותו רגע, וזה עוזר מאוד לאתר את התקלה בהמשך.",
  },
  {
    question: "מה ההבדל בין בדיקת מגר לבדיקת הארקה?",
    answer:
      "בדיקת מגר בודקת את הבידוד של החוטים, כלומר אם זרם בורח ממקום שהוא לא אמור לברוח ממנו. בדיקת הארקה בודקת שמוליך ההגנה מחובר כמו שצריך ושהמיגון ינתק בזמן אם תהיה תקלה. אלה שתי בדיקות שונות, ולעיתים קרובות עושים את שתיהן.",
  },
];

const SECTIONS = [
  { id: "what", label: "מה זה בדיקת מגר" },
  { id: "when", label: "מתי צריך בדיקת מגר" },
  { id: "how", label: "איך הבדיקה מתבצעת" },
  { id: "results", label: "מה התוצאות אומרות" },
  { id: "limits", label: "חשוב לדעת: תקלה שבאה והולכת" },
  { id: "vs-trial", label: "למה לא פשוט לנתק מפסקים אחד-אחד" },
  { id: "cost", label: "כמה עולה בדיקת מגר" },
  { id: "prepare", label: "איך להתכונן לבדיקה" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const WHEN = [
  {
    title: "ממסר הפחת קופץ",
    text: "במיוחד כשזה קורה בלי סיבה ברורה, פעם בכמה שעות או בכמה ימים. זו הסיבה הנפוצה ביותר לבדיקת מגר.",
  },
  {
    title: "אחרי רטיבות, הצפה או נזילה",
    text: "מים שחדרו לקיר, לקופסה או לתעלה פוגעים בבידוד, לפעמים רק אחרי כמה ימים.",
  },
  {
    title: "חיווט ישן",
    text: "בבניינים ותיקים הבידוד מתייבש ונסדק עם השנים, גם כשמבחוץ הכול נראה תקין.",
  },
  {
    title: "לפני קניית דירה או אחרי שיפוץ",
    text: "קידוח, חציבה או מסמר בקיר יכולים לפגוע בחוט בלי שאף אחד ישים לב.",
  },
  {
    title: "ריח שרוף או חימום בלתי מוסבר",
    text: "בשילוב עם בדיקה של הלוח והחיבורים, כדי לשלול בעיה בבידוד.",
  },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function MeggerTestArticle() {
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
              בדיקת מגר
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
            בדיקת מגר: מה זה, מתי צריך אותה וכמה היא עולה
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
            בדיקת מגר היא בדיקה מקיפה שבוחנת את רמת הבידוד של חוטי החשמל בבית.
            בעזרתה אפשר לאתר זליגות וקצרים נסתרים, כאלה שבודק מתח רגיל לא מגלה,
            ולמצוא באיזה מעגל נמצאת הבעיה.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            ברוב המקרים הבדיקה מאפשרת לשים את האצבע על התקלה בצורה מדויקת. עם
            זאת, תקלה שבאה והולכת לא תמיד פעילה ברגע הבדיקה, ואז ייתכן שלא נאתר
            אותה מיד. עלות הבדיקה היא 450 ₪ + מע&quot;מ.
          </p>
        </section>

        <figure className="mx-auto mb-10 max-w-xs md:max-w-sm">
          <Image
            src="/images/articles/megger-test.webp"
            alt="יהודה חכמוב מבצע בדיקת בידוד במכשיר מדידה המחובר ללוח חשמל ביתי פתוח"
            width={800}
            height={1443}
            sizes="(max-width: 768px) 320px, 384px"
            className="h-auto w-full rounded-2xl border border-slate-200 shadow-sm"
            priority
          />
          <figcaption className="mt-3 text-center text-sm text-slate-600">
            בדיקת בידוד בלוח חשמל ביתי: כל מעגל נבדק בנפרד, והתוצאה מוצגת על מסך
            המכשיר.
          </figcaption>
        </figure>

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
            <h2 id="what" className={H2}>
              מה זה בדיקת מגר
            </h2>
            <p>
              כל חוט חשמל בבית עטוף בשכבת בידוד. התפקיד שלה הוא לוודא שהזרם זורם
              רק בתוך החוט, ולא בורח לחוט אחר, לקיר, לצנרת או להארקה. כל עוד הבידוד
              שלם, הכול עובד כמו שצריך.
            </p>
            <p>
              עם השנים, או בגלל רטיבות, חום, מסמר שנתקע בקיר או מכרסם, הבידוד
              יכול להיסדק. אז מתחיל לברוח זרם קטן למקום שהוא לא אמור להגיע אליו.
              לזה קוראים <strong>זליגה</strong>. כשהבידוד נפגע לגמרי ושני מוליכים
              נוגעים זה בזה, זה כבר <strong>קצר</strong>.
            </p>
            <p>
              <strong>מגר</strong> הוא הכינוי המקובל למכשיר שמודד את התנגדות
              הבידוד. השם הגיע מחברה שייצרה את המכשירים הראשונים מהסוג הזה, והוא
              נשאר בשימוש גם למכשירים של יצרנים אחרים. המכשיר מפעיל על החוט מתח
              ישר גבוה מהמתח הרגיל בבית, ומודד כמה טוב הבידוד &quot;מחזיק&quot;
              אותו. בידוד סדוק או לח יכול להיראות תקין לגמרי במתח הרגיל, ולהיחשף
              רק תחת המאמץ הזה.
            </p>
            <p>
              זה ההבדל המרכזי בין בדיקת מגר לבין בודק מתח רגיל: בודק מתח אומר אם
              יש חשמל בנקודה מסוימת, ובדיקת מגר אומרת אם הבידוד במעגל שלם.
            </p>
          </section>

          <section aria-labelledby="when">
            <h2 id="when" className={H2}>
              מתי צריך בדיקת מגר
            </h2>
            <ul>
              {WHEN.map(({ title, text }) => (
                <li key={title}>
                  <strong>{title}.</strong> {text}
                </li>
              ))}
            </ul>
            <p>
              אם הבעיה שלכם היא פחת שקופץ, יש הסבר מפורט על הסיבות ועל דרך האיתור
              במדריך{" "}
              <Link href="/articles/ghost-tripping" className={LINK}>
                קפיצות פחת וקצרים סמויים
              </Link>
              . קונים דירה? כדאי לקרוא גם את המדריך{" "}
              <Link href="/articles/electrical-inspection-before-buying" className={LINK}>
                בדיקת חשמל לפני קניית דירה
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className={H2}>
              איך הבדיקה מתבצעת
            </h2>
            <ol>
              <li>
                <strong>שיחה קצרה.</strong> מתי החשמל קופץ, באיזו שעה, באיזה מזג
                אוויר ומה פעל באותו רגע. הפרטים האלה מכוונים את הבדיקה.
              </li>
              <li>
                <strong>ניתוק המתח והכנת המעגלים.</strong> המעגלים מנותקים ממתח,
                ומכשירים אלקטרוניים רגישים מנותקים מהשקעים כדי שלא יושפעו מהבדיקה.
              </li>
              <li>
                <strong>מדידה של כל מעגל בנפרד.</strong> המכשיר מחובר בלוח, וכל
                מעגל נבדק לחוד. לכל מעגל מתקבל ערך מספרי.
              </li>
              <li>
                <strong>השוואה ואיתור.</strong> מעגל עם ערך נמוך במיוחד, או שונה
                בבירור מהשאר, הוא החשוד העיקרי. משם ממשיכים לצמצם את החיפוש לאורך
                המעגל, עד הנקודה הבעייתית.
              </li>
              <li>
                <strong>תיקון או המלצה.</strong> אם התקלה פשוטה, מתקנים במקום. אם
                צריך להחליף חלקים או לבצע עבודה גדולה יותר, מקבלים הסבר והצעת מחיר
                לפני שמתחילים.
              </li>
            </ol>
          </section>

          <section aria-labelledby="results">
            <h2 id="results" className={H2}>
              מה התוצאות אומרות
            </h2>
            <p>
              התוצאה של בדיקת מגר היא מספר שמבטא את התנגדות הבידוד. ככל שהמספר
              גבוה יותר, הבידוד טוב יותר. בפועל, מה שחשוב הוא לא רק הערך עצמו,
              אלא גם ההשוואה בין המעגלים:
            </p>
            <ul>
              <li>
                <strong>ערכים גבוהים ודומים בכל המעגלים:</strong> הבידוד תקין.
                אם עדיין יש תקלה, היא כנראה במקום אחר, למשל במכשיר מסוים או בממסר
                הפחת עצמו.
              </li>
              <li>
                <strong>מעגל אחד עם ערך נמוך:</strong> כנראה יש בו זליגה. זה המקום
                להתמקד בו.
              </li>
              <li>
                <strong>ערך קרוב לאפס:</strong> פגיעה חמורה בבידוד או קצר. המעגל
                הזה צריך להישאר מנותק עד לתיקון.
              </li>
            </ul>
            <p>
              את פירוש התוצאות עושה החשמלאי, לפי סוג המעגל, אורך החיווט והתנאים
              בבית. אותו מספר יכול להיות תקין במעגל אחד ומחשיד במעגל אחר.
            </p>
          </section>

          <section aria-labelledby="limits">
            <h2 id="limits" className={H2}>
              חשוב לדעת: תקלה שבאה והולכת
            </h2>
            <p>
              לא כל תקלה פעילה כל הזמן. אם החשמל קופץ פעם בכמה שעות או רק בימים
              מסוימים, ייתכן שמדובר ב&quot;קצר שבא והולך&quot;: זליגה שמופיעה רק
              כשיש לחות, כשחוט מתחמם, או כשמכשיר מסוים פועל.
            </p>
            <p>
              אם התקלה לא פעילה בדיוק ברגע הבדיקה, יש סיכוי שלא נאתר אותה מיד. זו
              לא בעיה של הבדיקה, אלא של התקלה עצמה. ובכל זאת, גם במקרה כזה הבדיקה
              נותנת מידע חשוב: היא שוללת את רוב המעגלים, ומראה איפה הבידוד חלש
              יותר ושווה לעקוב אחריו.
            </p>
            <p>
              מה שהכי עוזר במקרה כזה הוא <strong>תיעוד</strong>: לרשום מתי החשמל
              קפץ, מה פעל באותו רגע, ואיך היה מזג האוויר. כמה רשומות כאלה מקצרות
              מאוד את הדרך לפתרון.
            </p>
          </section>

          <section aria-labelledby="vs-trial">
            <h2 id="vs-trial" className={H2}>
              למה לא פשוט לנתק מפסקים אחד-אחד
            </h2>
            <p>
              הדרך הנפוצה לחפש תקלה היא לכבות מפסק, לחכות ולראות אם החשמל עדיין
              קופץ. בתקלה קבועה זה לפעמים עובד. בתקלה שבאה והולכת זה כמעט תמיד
              נכשל: אפשר לחכות יום שלם בלי שהחשמל יקפוץ, ולהסיק בטעות שהמעגל
              תקין.
            </p>
            <p>
              בדיקת מגר לא תלויה בשאלה אם התקלה &quot;החליטה&quot; להופיע. היא
              מודדת את מצב הבידוד בכל מעגל ונותנת מספר שאפשר להשוות. כך חוסכים
              ניחושים, הפסקות חשמל ארוכות ופתיחת קירות מיותרת.
            </p>
          </section>

          <section aria-labelledby="cost">
            <h2 id="cost" className={H2}>
              כמה עולה בדיקת מגר
            </h2>
            <p>
              עלות בדיקת מגר היא <strong>450 ₪ + מע&quot;מ</strong>. המחיר כולל:
            </p>
            <ul>
              <li>בדיקה מקיפה של הלוח ושל כל המעגלים.</li>
              <li>
                תיקון קטן במקום, אם נמצאה תקלה שלא דורשת החלפת חלקים או עבודה
                מורכבת.
              </li>
            </ul>
            <p>
              התשלום הוא על זמן העבודה ועל ביצוע הבדיקה עצמה, ולכן הוא נגבה גם אם
              הכול נמצא תקין ולא אותר קצר באותו רגע. אם צריך להחליף חלקים או לבצע
              עבודה גדולה יותר, תקבלו הצעת מחיר לפני שמתחילים. שאר המחירים מופיעים{" "}
              <Link href="/pricing" className={LINK}>
                במחירון
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="prepare">
            <h2 id="prepare" className={H2}>
              איך להתכונן לבדיקה
            </h2>
            <ul>
              <li>
                <strong>גישה נוחה ללוח החשמל.</strong> לפנות את מה שחוסם אותו.
              </li>
              <li>
                <strong>לשמור עבודה במחשב.</strong> יהיו הפסקות חשמל קצרות.
              </li>
              <li>
                <strong>לרשום מתי החשמל קפץ.</strong> שעה, מזג אוויר ומה פעל
                באותו רגע.
              </li>
              <li>
                <strong>לספר על רטיבות או שיפוצים.</strong> נזילה, הצפה, קידוחים
                או עבודות שנעשו לאחרונה בבית.
              </li>
            </ul>
            <p>
              אפשר לשלוח מראש בוואטסאפ תמונה של לוח החשמל ותיאור קצר של התקלה,
              כדי לקבל הערכה ראשונית עוד לפני הביקור. אנחנו עובדים בפתח תקווה,
              בשרון ובכל אזור המרכז. ראו{" "}
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
          heading="החשמל קופץ ואף אחד לא מוצא למה?"
          description="בדיקת מגר מקיפה של הלוח ושל כל המעגלים, לאיתור זליגות וקצרים נסתרים. אפשר להתקשר או לשלוח הודעת וואטסאפ עם תמונה של הלוח."
          callPurpose="לבדיקת מגר ואיתור זליגה"
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
