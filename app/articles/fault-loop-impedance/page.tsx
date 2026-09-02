import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "fault-loop-impedance";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "בדיקת הארקה ולולאת תקלה — המספרים שקובעים אם המיגון יפעל",
  description: article.excerpt,
  keywords: [
    "בדיקת הארקה",
    "לולאת תקלה",
    "עכבת לולאת תקלה",
    "התנגדות הארקה",
    "בדיקת תקינות חשמל",
    "רציפות מוליך הגנה",
    "אישור בדיקת חשמל",
    "חשמלאי בודק",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "בדיקת הארקה ולולאת תקלה: המספרים שקובעים אם המיגון יפעל",
    description:
      "רציפות, התנגדות הארקה ועכבת לולאת תקלה — שלוש המדידות שקובעות אם המפסק ינתק בזמן, והחישוב שמאחוריהן.",
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
    question: "יש לי הארקה בבית — למה בכל זאת צריך בדיקה?",
    answer:
      "מפני שקיום ההארקה ואיכותה הם שני דברים שונים. מוליך הארקה יכול להיות מחובר ונראה תקין, ובכל זאת להציג עכבה גבוהה מדי בגלל בורג רפוי, חיבור מחומצן או חתך מוליך קטן מדי. במצב כזה זרם התקלה יהיה נמוך מכדי להפעיל את המפסק במהירות הנדרשת, והמיגון פשוט לא יעבוד כשיהיה צריך אותו.",
  },
  {
    question: "מה זו עכבת לולאת תקלה ולמה היא המספר הכי חשוב?",
    answer:
      "עכבת לולאת תקלה היא ההתנגדות הכוללת של המסלול שהזרם עובר בו בזמן תקלה: מהפאזה, דרך נקודת התקלה, חזרה במוליך ההגנה ואל השנאי. ככל שהעכבה נמוכה יותר, זרם התקלה גבוה יותר והמפסק מנתק מהר יותר. זהו הנתון שקובע בפועל אם ההגנה תפעל בזמן, ולכן הוא המדד המרכזי בבדיקת תקינות.",
  },
  {
    question: "כמה זמן לוקחת בדיקת הארקה ומה מקבלים בסופה?",
    answer:
      "בדירה רגילה הבדיקה נמשכת כשעה עד שעתיים, בהתאם למספר המעגלים בלוח. בסיומה מתקבל דוח עם הערכים שנמדדו בפועל לכל מעגל — רציפות, התנגדות ועכבת לולאה — ולא רק אישור כללי. הדוח הזה הוא המסמך שמוכיח את מצב המתקן במועד הבדיקה, והוא נדרש מול חברת החשמל, מול הביטוח ובמכירת נכס.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, וגם דוח הבדיקה מוסבר בשפה שנוחה לכם. אפשר לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של לוח החשמל או של דוח בדיקה קיים ולקבל הסבר מה המספרים אומרים.",
  },
];

const SECTIONS = [
  { id: "exists-vs-works", label: "״יש הארקה״ זה לא ״ההארקה תקינה״" },
  { id: "fault-loop", label: "מה זו לולאת תקלה?" },
  { id: "measurements", label: "שלוש המדידות שמרכיבות בדיקה מלאה" },
  { id: "reading-results", label: "איך קוראים את התוצאות" },
  { id: "when-required", label: "מתי חובה לבצע בדיקה" },
  { id: "expertise", label: "למה דוח עם מספרים שווה יותר מאישור כללי" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function FaultLoopImpedanceArticle() {
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
              בדיקת הארקה ולולאת תקלה
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
            בדיקת הארקה ולולאת תקלה: המספרים שקובעים אם המיגון יפעל
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
            בדיקת הארקה אינה בודקת אם יש חוט הארקה, אלא אם המיגון יצליח לנתק את
            המתח מספיק מהר בזמן תקלה. הנתון שקובע זאת הוא עכבת לולאת התקלה —
            ההתנגדות הכוללת של המסלול שהזרם עובר בו ברגע התקלה.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            ככל שהעכבה נמוכה יותר, זרם התקלה גבוה יותר והמפסק מנתק מהר יותר.
            בדיקה מלאה כוללת שלוש מדידות: רציפות מוליך ההגנה, התנגדות אלקטרודת
            ההארקה, ועכבת לולאת התקלה — ובסופה מתקבל דוח עם ערכים מספריים.
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
          <section aria-labelledby="exists-vs-works">
            <h2 id="exists-vs-works" className={H2}>
              ״יש הארקה״ זה לא ״ההארקה תקינה״
            </h2>
            <p>
              זו נקודת הפתיחה של כל בדיקה. מוליך הארקה יכול להיות מחובר, נראה
              תקין לחלוטין, ועדיין לא לתפקד כשיידרש.
            </p>
            <p>
              הסיבה היא שההגנה אינה תלויה בקיום החיבור אלא באיכותו החשמלית. בורג
              שהתרופף, מהדק שהתחמצן או מוליך בחתך קטן מדי מעלים את ההתנגדות
              במסלול.
            </p>
            <p>
              התוצאה מסוכנת דווקא משום שהיא בלתי נראית: המתקן עובד רגיל, אך בזמן
              תקלה זרם התקלה יהיה נמוך מכדי להפעיל את המפסק מהר מספיק. אם אתם
              רוצים קודם להבין מהי הארקה ואיך היא עובדת, יש{" "}
              <Link href="/articles/grounding" className={LINK}>
                מדריך יסוד נפרד
              </Link>{" "}
              — המאמר הזה עוסק במדידות עצמן.
            </p>
          </section>

          <section aria-labelledby="fault-loop">
            <h2 id="fault-loop" className={H2}>
              מה זו לולאת תקלה?
            </h2>
            <p>
              כשמתרחשת תקלה בין פאזה לגוף מתכתי מוארק, הזרם אינו נעלם — הוא זורם
              במעגל סגור. המעגל הזה נקרא לולאת תקלה.
            </p>
            <p>
              המסלול מתחיל בפאזה, עובר דרך נקודת התקלה, חוזר במוליך ההגנה, ומשם
              דרך מערכת ההארקה בחזרה אל השנאי. סכום ההתנגדויות לאורך כל המסלול
              הזה הוא עכבת לולאת התקלה.
            </p>
            <p>
              מכאן נובע הכול. לפי חוק אוהם, זרם התקלה שווה למתח חלקי העכבה — ולכן
              עכבה נמוכה יוצרת זרם גבוה, וזרם גבוה הוא מה שגורם למפסק לנתק מיידית.
            </p>

            <h3 className={H3}>החישוב בפועל</h3>
            <p>
              ניקח מא״ז מסוג C בגודל 16 אמפר. מפסק כזה מנתק מיידית בזרם של פי
              עשרה מערכו הנקוב, כלומר 160 אמפר.
            </p>
            <p>
              כדי שזרם כזה יזרום במתח של 230 וולט, העכבה המרבית היא 230 חלקי 160
              — כ-1.44 אוהם. אם המדידה בשטח מראה ערך גבוה יותר, המפסק לא ינתק
              במהירות הנדרשת.
            </p>
            <p>
              זו הסיבה שהמדידה אינה עניין של ״עובר או לא עובר״ באופן שרירותי.
              הערך הנמדד מושווה לערך שמחושב לפי סוג וגודל המפסק שמגן על אותו
              מעגל.
            </p>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-emerald-600 bg-emerald-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-emerald-900">
                זמני הניתוק הנדרשים
              </h3>
              <p className="m-0 leading-relaxed text-slate-800">
                במעגלים סופיים במתח 230 וולט נדרש ניתוק בתוך 0.4 שניות. במעגלי
                הזנה ראשיים מותר זמן ארוך יותר, עד 5 שניות. עכבת הלולאה היא
                שקובעת אם הזמנים האלה יתקיימו בפועל.
              </p>
            </div>
          </section>

          <section aria-labelledby="measurements">
            <h2 id="measurements" className={H2}>
              שלוש המדידות שמרכיבות בדיקה מלאה
            </h2>
            <p>
              בדיקת הארקה ראויה לשמה אינה מדידה אחת אלא סדרה. כל מדידה עונה על
              שאלה אחרת, ורק יחד הן נותנות תמונה מלאה.
            </p>

            <h3 className={H3}>1. רציפות מוליך ההגנה</h3>
            <p>
              המדידה הבסיסית ביותר: האם מוליך ההארקה אכן מחובר לאורך כל הדרך, מנקודת
              הקצה ועד ללוח. נמדדת התנגדות נמוכה מאוד בעזרת מכשיר ייעודי.
            </p>
            <p>
              הבדיקה הזו חושפת שקעים שבהם חוט ההארקה כלל אינו מחובר — תופעה נפוצה
              הרבה יותר ממה שנהוג לחשוב, במיוחד בעבודות שבוצעו ללא רישיון.
            </p>

            <h3 className={H3}>2. התנגדות אלקטרודת ההארקה</h3>
            <p>
              כאן נמדד עד כמה מערכת ההארקה מחוברת היטב לאדמה. המדידה מתבצעת מול
              האלקטרודה או הארקת היסוד של המבנה.
            </p>
            <p>
              הערך מושפע מסוג הקרקע, מרמת הלחות וממצב האלקטרודה. קרקע יבשה
              וסלעית נותנת התנגדות גבוהה יותר, ולכן מדידה בקיץ ובחורף יכולה
              להניב תוצאות שונות.
            </p>

            <h3 className={H3}>3. עכבת לולאת התקלה</h3>
            <p>
              זו המדידה המסכמת, ולכן החשובה מכולן. המכשיר יוצר תקלה מבוקרת לרגע
              קצר ומודד את העכבה בפועל.
            </p>
            <p>
              אני מבצע את המדידות האלה עם{" "}
              <Link href="/articles/ghost-tripping" className={LINK}>
                Sonel MPI 520
              </Link>
              , שמודד גם את זמן וזרם הניתוק של ממסר הפחת באותו ביקור. ממסר פחת
              תקין במתקן עם עכבת לולאה גבוהה עדיין אינו מספק הגנה מלאה.
            </p>
          </section>

          <section aria-labelledby="reading-results">
            <h2 id="reading-results" className={H2}>
              איך קוראים את התוצאות
            </h2>
            <p>
              דוח בדיקה טוב מציג מספרים, לא רק סימני וי. כך נראית המשמעות של כל
              מדידה:
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="משמעות תוצאות המדידה בבדיקת הארקה"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[38rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  שלוש המדידות המרכזיות ומה משמעות תוצאה חריגה בכל אחת מהן.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      המדידה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מה נבדק
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      משמעות ערך חריג
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      רציפות
                    </th>
                    <td className="border border-slate-200 p-3">
                      חיבור מוליך ההגנה לאורך המעגל
                    </td>
                    <td className="border border-slate-200 p-3">
                      ההארקה מנותקת בנקודה כלשהי — אין הגנה כלל
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      התנגדות הארקה
                    </th>
                    <td className="border border-slate-200 p-3">
                      איכות החיבור לאדמה
                    </td>
                    <td className="border border-slate-200 p-3">
                      אלקטרודה מקולקלת או קרקע בעייתית
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      עכבת לולאת תקלה
                    </th>
                    <td className="border border-slate-200 p-3">
                      זרם התקלה שייווצר בפועל
                    </td>
                    <td className="border border-slate-200 p-3">
                      המפסק לא ינתק בזמן הנדרש
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th scope="row" className="border border-slate-200 p-3 text-start font-bold">
                      ממסר פחת
                    </th>
                    <td className="border border-slate-200 p-3">
                      זרם וזמן הניתוק בפועל
                    </td>
                    <td className="border border-slate-200 p-3">
                      הפחת איטי מדי או אינו מנתק כלל
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              שימו לב לנקודה מטרידה: מתקן יכול לעבור את בדיקת הרציפות ולהיכשל
              בעכבת הלולאה. החיבור קיים — אך הוא גרוע מכדי להפעיל את ההגנה.
            </p>
          </section>

          <section aria-labelledby="when-required">
            <h2 id="when-required" className={H2}>
              מתי חובה לבצע בדיקה
            </h2>
            <p>
              יש מצבים שבהם בדיקה אינה המלצה אלא תנאי מקדים. אלה המקרים הנפוצים:
            </p>
            <ul>
              <li>
                <strong>לפני חיבור מתקן חדש</strong> לרשת חברת החשמל.
              </li>
              <li>
                <strong>אחרי{" "}
                <Link href="/articles/hachzarat-hashmal" className={LINK}>
                  ניתוק מטעמי בטיחות
                </Link></strong>{" "}
                — החזרת החיבור מותנית באישור תקינות.
              </li>
              <li>
                <strong>לאחר שיפוץ או שינוי בתשתית</strong>, כולל{" "}
                <Link href="/articles/three-phase-upgrade" className={LINK}>
                  הגדלת חיבור לתלת-פאזי
                </Link>{" "}
                והחלפת לוח.
              </li>
              <li>
                <strong>בעסקים ובמוסדות</strong>, שבהם נדרשת בדיקה תקופתית
                ותיעוד שוטף.
              </li>
              <li>
                <strong>במכירת נכס או השכרתו</strong>, כאסמכתא למצב המתקן.
              </li>
              <li>
                <strong>אחרי אירוע חריג</strong> — התחשמלות, ברק, שריפה או מכשירים
                שנשרפו יחד.
              </li>
            </ul>
            <p>
              בבתים ותיקים שלא נבדקו מעולם, בדיקה יזומה היא ההשקעה הזולה ביותר
              בבטיחות. היא חושפת ליקויים לפני שהם הופכים לאירוע.
            </p>
          </section>

          <section aria-labelledby="expertise">
            <h2 id="expertise" className={H2}>
              למה דוח עם מספרים שווה יותר מאישור כללי
            </h2>
            <p>
              כהנדסאי חשמל והנדסאי מכונות בעל רישיון חשמלאי ראשי, אני מוסר בסיום
              כל בדיקה את הערכים שנמדדו בפועל לכל מעגל — ולא אישור כללי שכתוב בו
              ״נמצא תקין״.
            </p>
            <p>
              ההבדל אינו פורמלי. ערכים מספריים מאפשרים להשוות מדידה לאורך זמן
              ולזהות הידרדרות הרבה לפני שהיא הופכת לתקלה.
            </p>
            <p>
              במקביל אני מרצה ומכשיר הנדסאי חשמל, ומלמד את חישובי לולאת התקלה
              וזמני הניתוק שעליהם נשענת הבדיקה הזו.
            </p>
            <p>
              כנותן חוות דעת מומחה לבתי משפט בתחום החשמל, אני רואה מה קורה כשאין
              תיעוד. אחרי אירוע התחשמלות או שריפה, דוח עם ערכים מדודים הוא לעיתים
              קרובות הראיה היחידה למצב המתקן לפני האירוע.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              דוח בדיקה מלא במונחים טכניים ובמספרים, ולכן חשוב שההסבר יהיה ברור.
              הבדיקה והפירוש שלה ניתנים בעברית, ברוסית ובאנגלית.
            </p>
            <p>
              אפשר גם לשלוח בוואטסאפ, בכל שפה, דוח בדיקה קיים או תמונה של לוח
              החשמל — ולקבל הסבר מה המספרים אומרים לפני שמחליטים על המשך טיפול.
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
          heading="רוצים לדעת אם ההארקה שלכם באמת מגנה?"
          description="בדיקת תקינות מלאה עם מדידת רציפות, התנגדות הארקה ועכבת לולאת תקלה — ודוח מפורט עם הערכים שנמדדו בכל מעגל. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לבדיקת הארקה ולולאת תקלה"
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
