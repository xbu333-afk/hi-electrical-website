import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "electrical-licenses-guide";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title:
    "מדריך רישיונות חשמל: מה ההבדל בין עוזר, מוסמך, הנדסאי ובודק? | ח.י שירותי חשמל",
  description:
    "לא כל חשמלאי מורשה לבצע כל עבודה. מדריך מקיף לסוגי הרישיונות בישראל: מי רשאי לחתום על לוח תלת-פאזי, איפה זה מופיע ברישיון, וממה כדאי להיזהר.",
  keywords: [
    "רישיון חשמלאי",
    "חשמלאי מוסמך",
    "חשמלאי ראשי",
    "הנדסאי חשמל",
    "בודק חשמל",
    "דרגות רישיון חשמל",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "מדריך רישיונות חשמל בישראל",
    description:
      "עוזר, מעשי, מוסמך, ראשי, הנדסאי ובודק — מה מותר למי ואיך בודקים.",
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
    question: "איזו דרגת רישיון מספיקה לדירה רגילה?",
    answer:
      "לרוב הדירות בישראל, שבהן החיבור הוא חד-פאזי או תלת-פאזי עד 3×80 אמפר, רישיון חשמלאי מוסמך מספיק לכל העבודות — כולל החלפת לוח, הוספת מעגלים ובדיקות. כשהחיבור גדול יותר, למשל בבית פרטי עם עומסים כבדים או בבניין משותף, נדרש חשמלאי ראשי. הכלל הוא שהדרגה נקבעת לפי גודל החיבור בפועל ולא לפי סוג הנכס.",
  },
  {
    question: "מה ההבדל בין חשמלאי ראשי לבין הנדסאי חשמל?",
    answer:
      "חשמלאי ראשי הוא דרגת רישיון ביצוע שמאפשרת לעבוד ולחתום על מתקנים עד 3×250 אמפר. הנדסאי חשמל הוא תואר לימודי שמקנה, בצירוף רישיון מתאים, סמכות רחבה יותר בתכנון ובביצוע מתקנים גדולים. בפועל אדם אחד יכול להחזיק בשניהם, וזה מה שמאפשר לו גם לתכנן את המתקן וגם לבצע אותו.",
  },
  {
    question: "מתי חייבים בודק חשמל ולא מספיק החשמלאי המבצע?",
    answer:
      "בודק חשמל נדרש כאשר גורם חיצוני צריך לאשר את המתקן — למשל חיבור ראשוני או הגדלת חיבור מול חברת החשמל, קבלת טופס 4, דרישה של רשות כבאות והצלה, או בדיקה תקופתית שמבקשת חברת ביטוח. הבודק אינו מבצע את העבודה אלא בוחן אותה באופן בלתי תלוי ומפיק דוח. בעבודות ביתיות רגילות תעודת בדיקה של החשמלאי המבצע מספיקה.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ובדיקת רישיון?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, כולל הסבר מה כתוב ברישיון ואיזו דרגה נדרשת לעבודה שלכם. אפשר לשלוח הודעת וואטסאפ בכל שפה, לצרף צילום של הרישיון שקיבלתם מבעל מקצוע אחר ולקבל חוות דעת אם הוא מתאים לעבודה.",
  },
];

const SECTIONS = [
  { id: "why", label: "למה הדרגה משנה לכם" },
  { id: "madregot", label: "מדרג הרישיונות: מה מותר למי" },
  { id: "bodek", label: "בודק חשמל — מתי הוא חובה" },
  { id: "match", label: "איך מתאימים דרגה לעבודה שלכם" },
  { id: "eich-bodkim", label: "איפה זה מופיע ואיך בודקים" },
  { id: "redflags", label: "דגלים אדומים שכדאי להכיר" },
  { id: "who", label: "הרישיונות שאיתם אנחנו עובדים" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function ElectricalLicensesArticle() {
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
              מדריך רישיונות
            </span>
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-12">
        <header className="mb-8 border-b border-gray-100 pb-8">
          <p className="mb-4">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-800">
              {article.category}
            </span>
          </p>

          <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
            עוזר, מוסמך או הנדסאי? כל מה שצריך לדעת על רישיונות חשמל
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
            רישיון חשמלאי בישראל אינו אישור כללי לעבוד בחשמל. הוא מוגבל בגודל
            הזרם שמותר לטפל בו, והמדרג נע מחשמלאי עוזר שאינו רשאי לעבוד לבד, דרך
            מוסמך וראשי, ועד לדרגות ההנדסיות.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            השאלה הנכונה אינה &quot;יש לך רישיון?&quot; אלא &quot;איזה רישיון יש
            לך, והאם הוא מתאים לגודל החיבור שלי?&quot;. עבודה שנעשתה בדרגה שאינה
            מתאימה עלולה להיפסל, גם אם היא בוצעה היטב מבחינה טכנית.
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
          <section aria-labelledby="why">
            <h2 id="why" className={H2}>
              למה הדרגה משנה לכם
            </h2>
            <p>
              רוב הלקוחות שואלים אם לחשמלאי יש רישיון, ומסתפקים בתשובה חיובית.
              זו שאלה חשובה, אבל היא רק חצי מהעבודה.
            </p>
            <p>
              בישראל הרישיון מוגבל בגודל הזרם שבעליו רשאי לטפל בו, וגם בסוג
              הפעולות שהוא רשאי לבצע ולחתום עליהן. אותו אדם יכול להיות מורשה
              לחלוטין לעבוד בדירה שלכם, ולא מורשה כלל לגעת בלוח של הבניין.
            </p>
            <p>
              יש לכך שלוש השלכות מעשיות. חתימה של מי שאינו מוסמך אינה מתקבלת מול
              חברת החשמל והרשויות, חברת הביטוח בוחנת את הרישיון כשמתרחש נזק,
              והמתקן עצמו נבנה לפי רמת ידע שאינה תואמת את מורכבותו.
            </p>
            <p>
              המשמעות פשוטה: הרישיון אינו פורמליות. הוא ההתאמה בין גודל העבודה
              לבין ההכשרה של מי שמבצע אותה.
            </p>
          </section>

          <section aria-labelledby="madregot">
            <h2 id="madregot" className={H2}>
              מדרג הרישיונות: מה מותר למי
            </h2>
            <p>
              הרישיונות ניתנים על ידי רשות החשמל שבמשרד הכלכלה, והם אישיים —
              שייכים לאדם ולא לעסק. להלן הדרגות שתפגשו בפועל.
            </p>

            <h3 className={H3}>חשמלאי עוזר</h3>
            <p>
              הדרגה הבסיסית ביותר. חשמלאי עוזר אינו רשאי לעבוד לבד בשום פנים
              ואופן, ורשאי לבצע עבודות חשמל אך ורק תחת פיקוח והשגחה של חשמלאי
              בדרגה גבוהה יותר.
            </p>
            <p>
              אם הגיע אליכם אדם לבדו והציג רישיון עוזר, העבודה אינה חוקית — גם
              אם הוא מנוסה ומיומן.
            </p>

            <h3 className={H3}>חשמלאי מעשי</h3>
            <p>
              רשאי לבצע עבודות ולחתום על תוכניות במתקנים בעלי חיבור חד-פאזי
              בלבד, עד 1×40 אמפר. הוא אינו מורשה לטפל בלוחות תלת-פאזיים או
              במערכות הדורשות הספקים גבוהים.
            </p>

            <h3 className={H3}>חשמלאי מוסמך</h3>
            <p>
              זהו הסטנדרט המתאים לרוב הבתים בישראל. חשמלאי מוסמך רשאי לבצע
              עבודות במתקנים עד 3×80 אמפר, לרבות לוחות חשמל ביתיים, מערכות מיזוג
              מיני-מרכזי, מעגלים ייעודיים לכיריים אינדוקציה או לתנור בילט-אין,
              ושדרוגים מורכבים במגזר הפרטי והעסקי.
            </p>

            <h3 className={H3}>חשמלאי ראשי</h3>
            <p>
              רשאי לבצע ולתכנן עבודות במתקנים עד 3×250 אמפר. זו הדרגה הנדרשת
              לבנייני מגורים, למתקנים מסחריים בינוניים ולחלק ניכר מעבודות{" "}
              <Link href="/articles/three-phase-upgrade" className={LINK}>
                הגדלת חיבור לתלת-פאזי
              </Link>
              .
            </p>

            <h3 className={H3}>הנדסאי חשמל ומהנדס חשמל</h3>
            <p>
              אלה הדרגות ההנדסיות. הנדסאי חשמל רשאי לתכנן ולבצע עבודות בהספקים
              גדולים מאוד, לרוב עד 3×630 אמפר, ומהנדס חשמל מוסמך לעבודות ללא
              הגבלת זרם.
            </p>
            <p>
              חשוב להבין את ההבדל: &quot;הנדסאי&quot; הוא תואר לימודי שנרכש
              במסלול בן מספר שנים, ואילו &quot;מוסמך&quot; ו&quot;ראשי&quot; הן
              דרגות רישיון ביצוע. אדם אחד יכול להחזיק בשניהם, וזה השילוב שמאפשר
              גם תכנון וגם ביצוע.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="סיכום דרגות רישיון החשמל בישראל וגבולות הזרם שלהן"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  סיכום דרגות הרישיון וגבולות הזרם המקובלים. הגבול המדויק נקבע
                  בתקנות ומופיע על גבי הרישיון עצמו.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      דרגה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      גבול הזרם
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      טיפוסי עבור
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      חשמלאי עוזר
                    </th>
                    <td className="border border-slate-200 p-3">
                      אין — רק תחת פיקוח
                    </td>
                    <td className="border border-slate-200 p-3">
                      עבודת עזר בליווי בעל רישיון בכיר יותר
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      חשמלאי מעשי
                    </th>
                    <td className="border border-slate-200 p-3">עד 1×40 אמפר</td>
                    <td className="border border-slate-200 p-3">
                      דירות קטנות עם חיבור חד-פאזי
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      חשמלאי מוסמך
                    </th>
                    <td className="border border-slate-200 p-3">עד 3×80 אמפר</td>
                    <td className="border border-slate-200 p-3">
                      רוב הדירות והבתים הפרטיים
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      חשמלאי ראשי
                    </th>
                    <td className="border border-slate-200 p-3">עד 3×250 אמפר</td>
                    <td className="border border-slate-200 p-3">
                      בנייני מגורים ועסקים בינוניים
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      הנדסאי חשמל
                    </th>
                    <td className="border border-slate-200 p-3">לרוב עד 3×630 אמפר</td>
                    <td className="border border-slate-200 p-3">
                      תכנון וביצוע מתקנים גדולים
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      מהנדס חשמל
                    </th>
                    <td className="border border-slate-200 p-3">ללא הגבלת זרם</td>
                    <td className="border border-slate-200 p-3">
                      תעשייה ופרויקטים בהיקף גדול
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="bodek">
            <h2 id="bodek" className={H2}>
              בודק חשמל — מתי הוא חובה
            </h2>
            <p>
              בודק חשמל אינו דרגה נוספת בסולם הביצוע אלא תפקיד נפרד. הוא אינו
              מבצע את העבודה, אלא בוחן אותה באופן בלתי תלוי ומאשר אותה מול הגורם
              שדורש את האישור.
            </p>
            <p>
              ההסמכה מדורגת בשלושה סוגים לפי גודל המתקן שמותר לבדוק, כאשר הסוג
              הגבוה מקנה את ההיקף הרחב ביותר. הבודקים הם לרוב הנדסאים או מהנדסים
              שעברו הכשרה ייעודית נוספת.
            </p>
            <p>
              בודק נדרש בעיקר בחיבור ראשוני או בהגדלת חיבור מול חברת החשמל,
              בקבלת אישורים לנכס, בדרישות של כבאות והצלה, ובבדיקות תקופתיות
              שמבקשות חברות ביטוח מבעלי עסקים.
            </p>
            <p>
              בעבודה ביתית רגילה אין צורך בבודק. תעודת בדיקה חתומה של החשמלאי
              המבצע, הכוללת את הערכים שנמדדו בפועל, היא המסמך הנדרש.
            </p>
          </section>

          <section aria-labelledby="match">
            <h2 id="match" className={H2}>
              איך מתאימים דרגה לעבודה שלכם
            </h2>
            <p>
              הדרך המהירה לדעת איזו דרגה נדרשת היא להסתכל על גודל החיבור שרשום
              במונה או במאמ&quot;ת הראשי בלוח, ולא על סוג הנכס.
            </p>
            <ul>
              <li>
                <strong>דירה עם חיבור חד-פאזי או תלת-פאזי עד 3×80 אמפר</strong> —
                חשמלאי מוסמך מספיק לכל עבודה, כולל{" "}
                <Link href="/articles/panel-upgrade" className={LINK}>
                  החלפת לוח חשמל
                </Link>
                .
              </li>
              <li>
                <strong>בית פרטי גדול או חיבור מוגדל</strong> — כשגודל החיבור
                עולה על 3×80 אמפר נדרש חשמלאי ראשי.
              </li>
              <li>
                <strong>לוח בניין, מחסן משותף או חדר מכונות</strong> — כמעט תמיד
                דרגת ראשי ומעלה, גם כשהעבודה עצמה נראית קטנה.
              </li>
              <li>
                <strong>עסק, מרפאה או מטבח מסחרי</strong> — נדרשת גם דרגה מתאימה
                וגם היכרות עם דרישות הבדיקה התקופתית, כמפורט בעמוד{" "}
                <Link href="/business" className={LINK}>
                  שירות לעסקים
                </Link>
                .
              </li>
            </ul>
          </section>

          <section aria-labelledby="eich-bodkim">
            <h2 id="eich-bodkim" className={H2}>
              איפה זה מופיע ואיך בודקים
            </h2>
            <p>
              לכל חשמלאי מורשה יש כרטיס רישיון מטעם רשות החשמל במשרד הכלכלה.
              שלושה פרטים על הכרטיס מספרים לכם את כל מה שצריך.
            </p>
            <ol>
              <li>
                <strong>שם ומספר תעודת זהות</strong> — חייבים להתאים לאדם שעומד
                מולכם. רישיון של שותף או של מעסיק אינו מכשיר את העבודה.
              </li>
              <li>
                <strong>תוקף הרישיון</strong> — לרישיון יש תאריך תפוגה, והוא
                מחייב חידוש. רישיון שפג תוקפו דינו כמי שאין לו רישיון.
              </li>
              <li>
                <strong>סוג הרישיון</strong> — כאן מופיעה הדרגה: מעשי, מוסמך,
                ראשי וכן הלאה. זו השורה שקובעת אם העבודה שלכם בהיקף המותר.
              </li>
            </ol>
            <p>
              בקשו את הצילום מראש בוואטסאפ, לפני שקובעים ביקור. בעל מקצוע אמיתי
              שולח אותו בלי היסוס, ובעל מקצוע שמתחמק חוסך לכם את הביקור.
            </p>
          </section>

          <section aria-labelledby="redflags">
            <h2 id="redflags" className={H2}>
              דגלים אדומים שכדאי להכיר
            </h2>
            <p>
              רוב הבעיות מתגלות עוד בשיחת הטלפון הראשונה, אם יודעים למה להקשיב.
            </p>

            <h3 className={H3}>&quot;יש לי רישיון במשרד&quot;</h3>
            <p>
              רישיון הוא מסמך אישי שקל לצלם. מי שאינו שולח אותו כשמבקשים, לרוב
              אינו מחזיק ברישיון המתאים לעבודה.
            </p>

            <h3 className={H3}>תעודה שמוצגת במסך בלבד</h3>
            <p>
              תמונות תעודה נערכות בקלות, ובשנים האחרונות גם נוצרות באמצעים
              אוטומטיים. איך מזהים זיוף בפועל מוסבר ב
              <Link href="/articles/beware-of-scammers" className={LINK}>
                תחקיר הנוכלים
              </Link>
              .
            </p>

            <h3 className={H3}>&quot;על עבודה קטנה לא צריך רישיון&quot;</h3>
            <p>
              אמירה כזו מעידה שאתם מדברים עם מי שאינו בעל מקצוע מורשה. החוק אינו
              מבחין בין עבודה קטנה לגדולה, כפי שמוסבר במדריך{" "}
              <Link href="/articles/handyman-vs-electrician" className={LINK}>
                הנדימן הוא לא חשמלאי
              </Link>
              .
            </p>

            <h3 className={H3}>סירוב לתת תעודת בדיקה</h3>
            <p>
              בעל רישיון מתאים אינו נרתע מלחתום על העבודה שביצע. סירוב לתעד הוא
              לרוב סימן לכך שהדרגה אינה מספיקה, או שהבדיקות כלל לא בוצעו.
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              הרישיונות שאיתם אנחנו עובדים
            </h2>
            <p>
              אני הנדסאי חשמל והנדסאי מכונות מוסמך, ובעל רישיון חשמלאי מוסמך
              וראשי בתוקף. השילוב הזה מאפשר לתת מענה מלא — מתכנון המתקן ועד
              הביצוע והחתימה עליו.
            </p>
            <p>
              במקביל לעבודה בשטח אני מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה
              אוירית. אני מלמד את החומר שעליו נבחנים המועמדים לרישיון, ולכן
              המדרג הזה אינו תיאוריה עבורי אלא חלק מהעבודה היומיומית.
            </p>
            <p>
              אני גם נותן חוות דעת מומחה לבתי משפט, וכסטודנט למשפטים אני רואה מה
              קורה כשהדרגה לא התאימה לעבודה. במחלוקות ביטוח ובתביעות נזק, שאלת
              הרישיון היא לרוב השאלה הראשונה שנשאלת.
            </p>
            <p>
              שאלות נוספות על הזמנת עבודה, תיעוד ואחריות מרוכזות בעמוד{" "}
              <Link href="/faq" className={LINK}>
                השאלות הנפוצות
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              מונחי הרישוי אינם פשוטים גם לדוברי עברית, ולכן ההסבר ניתן בשפה
              שנוחה לכם. השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית.
            </p>
            <p>
              אפשר לשלוח הודעת וואטסאפ בכל שפה, לצרף צילום של רישיון שקיבלתם
              מבעל מקצוע אחר, ולקבל תשובה אם הוא מתאים לעבודה שאתם מתכננים.
              רשימת בדיקה רחבה יותר לבחירת בעל מקצוע מופיעה במדריך{" "}
              <Link href="/articles/how-to-choose-electrician" className={LINK}>
                איך לבחור חשמלאי מוסמך
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
          heading="לא בטוחים איזו דרגת רישיון העבודה שלכם דורשת?"
          description="ייעוץ, תכנון וביצוע בידי הנדסאי חשמל בעל רישיון מוסמך וראשי בתוקף, כולל תעודת בדיקה חתומה בסיום העבודה. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לבירור דרגת הרישיון הנדרשת לעבודה"
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
