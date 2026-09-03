import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl, buildOpenGraph } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "grounding";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "הארקה - בטיחות בחשמל",
  description:
    "מהי הארקה? למה היא כל כך חשובה? כל מה שצריך לדעת על הארקה, סכנות, בדיקות תקינות ושירותי בדיקה מקצועיים של חשמלאי מוסמך. זמינות 24/7.",
  keywords: [
    "הארקה",
    "בדיקת הארקה",
    "הארקת יסוד",
    "התנגדות הארקה",
    "השוואת פוטנציאלים",
    "שיטת האיפוס",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: buildOpenGraph({
    title: "הארקה – מהי, למה היא חשובה ואיך מוודאים שהיא תקינה?",
    description:
      "מדריך מלא על הארקה ביתית — סכנות, בדיקות תקינות ושירות מקצועי של חשמלאי מוסמך.",
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
    question: "איך אפשר לדעת אם יש הארקה בשקע בלי לפתוח אותו?",
    answer:
      "אי אפשר לדעת זאת במבט. שקע בעל שלושה מגעים מעיד רק על כך שהותקן שקע מודרני, ולא על כך שמוליך ההגנה באמת מחובר ורציף עד לוח החשמל. הדרך היחידה לקבוע זאת היא מדידה של רציפות מוליך ההגנה ושל עכבת לולאת התקלה בעזרת מכשיר בדיקה מכויל.",
  },
  {
    question: "האם ממסר פחת מייתר את הצורך בהארקה?",
    answer:
      "לא. ממסר הפחת וההארקה הם שני אמצעי הגנה משלימים ולא חלופיים. ממסר הפחת מזהה זליגת זרם ומנתק, אך בלי מוליך הגנה תקין זרם התקלה עלול לזרום דרך גופו של אדם לפני שהמנגנון מופעל. במתקן שבו אין הארקה כלל, ממסר פחת הוא שיפור חלקי בלבד ולא פתרון מלא.",
  },
  {
    question: "מה עושים בדירה ישנה שאין בה הארקה במעגלים?",
    answer:
      "הפתרון תלוי במצב התשתית ונקבע רק אחרי בדיקה. לעיתים ניתן להעביר מוליך הגנה בצנרת קיימת ולחבר את המעגלים לפס הארקה בלוח, ולעיתים נדרשת החלפת הלוח והוספת אלקטרודת הארקה או חיבור להארקת היסוד של הבניין. בשלב הביניים מקובל להתקין ממסר פחת ולתעדף את המעגלים המסוכנים ביותר, כמו חדרי רחצה והמטבח.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ובדיקת הארקה?",
    answer:
      "הבדיקה, ההסבר על התוצאות ותעודת הבדיקה ניתנים בעברית, ברוסית ובאנגלית, לפי מה שנוח לכם. אפשר לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של לוח החשמל או של השקע הבעייתי, ולקבל הערכה ראשונית עוד לפני הביקור.",
  },
];

const SECTIONS = [
  { id: "what", label: "מהי הארקה ומה בדיוק היא מונעת" },
  { id: "how", label: "איך מערכת ההארקה עובדת" },
  { id: "methods", label: "שיטות ההארקה הנפוצות בישראל" },
  { id: "risks", label: "מה קורה כשאין הארקה תקינה" },
  { id: "tests", label: "איך בודקים הארקה במדידה" },
  { id: "when", label: "מתי צריך לתקן או לשדרג" },
  { id: "mistakes", label: "כשלים נפוצים שאנחנו פוגשים בשטח" },
  { id: "who", label: "מי מורשה לבדוק ולחתום" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function GroundingArticle() {
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
              הארקה
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
            הארקה – מהי, למה היא חשובה ואיך מוודאים שהיא תקינה?
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
            הארקה היא נתיב מוליך מתוכנן שמוביל זרם תקלה אל האדמה, במקום שיזרום
            דרך גופו של מי שנוגע במכשיר. היא אינה רכיב בודד אלא מערכת: מוליך
            הגנה בכל מעגל, פס הארקה בלוח, אלקטרודה או הארקת יסוד, והשוואת
            פוטנציאלים בחדרים הרטובים.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            הארקה שקיימת אינה בהכרח הארקה תקינה. רק מדידה — רציפות מוליך ההגנה,
            התנגדות ההארקה, עכבת לולאת התקלה וזמן ניתוק ממסר הפחת — קובעת אם
            המערכת באמת תגן ברגע האמת.
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
            <h2 id="what" className={H2}>
              מהי הארקה ומה בדיוק היא מונעת
            </h2>
            <p>
              במתקן תקין הזרם זורם במסלול סגור: מוליך הפאזה מביא אותו אל המכשיר,
              ומוליך האפס מחזיר אותו חזרה. שום זרם אינו אמור לצאת מהמסלול הזה.
            </p>
            <p>
              תקלה משנה את התמונה. בידוד שנשחק, לחות בגוף חימום או בורג שנגע
              במוליך גורמים למתח להופיע על מעטפת המתכת של המכשיר, והמקרר או הדוד
              הופכים לחלק חי מהמעגל.
            </p>
            <p>
              ההארקה נותנת לזרם הזה נתיב חלופי בעל התנגדות נמוכה מאוד. הזרם בוחר
              את הדרך הקלה, זורם במוליך ההגנה במקום בגוף האדם, וגודלו הגבוה גורם
              למפסק או לממסר הפחת לנתק את המעגל תוך שברירי שנייה.
            </p>
            <p>
              כאן נמצאת הנקודה שרוב האנשים מפספסים: תפקיד ההארקה אינו רק להוליך
              את הזרם אלא לגרום לניתוק מהיר. הארקה שמוליכה חלש לא תייצר זרם תקלה
              גדול, וההגנה לא תרגיש שקרה דבר.
            </p>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className={H2}>
              איך מערכת ההארקה עובדת
            </h2>
            <p>
              מערכת ההארקה מורכבת מארבעה חלקים שפועלים יחד. כשל באחד מהם מבטל
              במידה רבה את התועלת של השאר.
            </p>

            <h3 className={H3}>מוליך ההגנה (הצהוב-ירוק)</h3>
            <p>
              זהו המוליך שמלווה כל מעגל מהלוח ועד השקע או נקודת המאור, ומתחבר
              למעטפת המתכתית של המכשיר. חתכו נגזר מחתך מוליך הפאזה, ואסור שיהיה
              דק ממנו מעבר למותר בתקנות.
            </p>

            <h3 className={H3}>פס ההארקה בלוח</h3>
            <p>
              כל מוליכי ההגנה של הבית מתאספים לפס אחד, נפרד לחלוטין מפס האפס.
              ערבוב בין השניים הוא אחת הסיבות השכיחות ביותר לקפיצות פחת שנראות
              אקראיות, כמתואר במדריך{" "}
              <Link href="/articles/mimsar-pahat" className={LINK}>
                למה ממסר הפחת קופץ
              </Link>
              .
            </p>

            <h3 className={H3}>אלקטרודת הארקה או הארקת יסוד</h3>
            <p>
              זהו החיבור הפיזי לאדמה. במבנים חדשים הוא נעשה באמצעות הארקת יסוד —
              רשת מוליכה שיצוקה בתוך יסודות הבניין — ובמבנים ותיקים לעיתים
              באמצעות אלקטרודה נפרדת שנטמנת בקרקע.
            </p>

            <h3 className={H3}>השוואת פוטנציאלים</h3>
            <p>
              בחדרי רחצה מחברים את חלקי המתכת הזרים — צנרת, ניקוז, מסגרות — לפס
              השוואת פוטנציאלים. המטרה אינה להוליך זרם אלא למנוע הפרש מתח בין
              שני משטחים שאדם רטוב עלול לגעת בהם בו זמנית.
            </p>
          </section>

          <section aria-labelledby="methods">
            <h2 id="methods" className={H2}>
              שיטות ההארקה הנפוצות בישראל
            </h2>
            <p>
              לא כל המתקנים בישראל מוגנים באותה שיטה, וזה משנה את אופן הבדיקה.
              השיטה נקבעת לפי גיל המבנה וסוג החיבור.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="שיטות ההארקה הנפוצות בישראל ואופן ההגנה שלהן"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  שיטות ההגנה בפני חשמול הנפוצות במתקנים ביתיים בישראל. הזיהוי
                  נעשה בשטח על ידי בעל רישיון, ולא לפי גיל הבניין בלבד.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      שיטה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      איך היא מגנה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      הערה מקצועית
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      הארקת יסוד
                    </th>
                    <td className="border border-slate-200 p-3">
                      רשת מוליכה ביסודות הבניין מנקזת את זרם התקלה לאדמה
                    </td>
                    <td className="border border-slate-200 p-3">
                      השיטה המקובלת בבנייה חדשה; מלווה תמיד בממסר פחת
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      שיטת האיפוס
                    </th>
                    <td className="border border-slate-200 p-3">
                      מוליך ההגנה מחובר לאפס הרשת ויוצר זרם קצר שמפיל את המפסק
                    </td>
                    <td className="border border-slate-200 p-3">
                      נפוצה בבניינים ותיקים; רגישה מאוד לניתוק מוליך האפס
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      אלקטרודת הארקה מקומית
                    </th>
                    <td className="border border-slate-200 p-3">
                      מוט או פס שנטמן בקרקע ומחובר לפס ההארקה בלוח
                    </td>
                    <td className="border border-slate-200 p-3">
                      ההתנגדות מושפעת מלחות הקרקע ולכן נמדדת מחדש מדי תקופה
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      השוואת פוטנציאלים
                    </th>
                    <td className="border border-slate-200 p-3">
                      מבטלת הפרשי מתח בין חלקי מתכת בחדרים רטובים
                    </td>
                    <td className="border border-slate-200 p-3">
                      משלימה כל שיטה אחרת ואינה מחליפה אותה
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="risks">
            <h2 id="risks" className={H2}>
              מה קורה כשאין הארקה תקינה
            </h2>
            <p>
              היעדר הארקה אינו מורגש ביום-יום. המתקן עובד, האור נדלק והמכשירים
              פועלים — עד לרגע הראשון שבו מתרחשת תקלה.
            </p>
            <p>
              <strong>סכנת התחשמלות.</strong> בלי נתיב חלופי, זרם התקלה מחפש
              דרך לאדמה דרך גופו של מי שנוגע במכשיר. במטבח או בחדר רחצה, שבהם
              העור לח והרצפה מוליכה, זרם קטן מאוד כבר מסוכן.
            </p>
            <p>
              <strong>סכנת שריפה.</strong> זרם דליפה מתמשך דרך בידוד פגום מייצר
              חום מקומי. אם ההגנה אינה מנתקת, החום מצטבר בנקודה אחת בקיר או
              בארון עד להצתה.
            </p>
            <p>
              <strong>נזק לציוד ולתקשורת.</strong> מערכות עם רכיבי אלקטרוניקה,
              כמו מיזוג מיני-מרכזי, כיריים אינדוקציה או בקרי{" "}
              <Link href="/articles/bayit-chacham" className={LINK}>
                בית חכם
              </Link>
              , רגישות במיוחד למתח שמופיע על גוף המכשיר.
            </p>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-red-900">אזהרת בטיחות</h3>
              <p className="m-0 leading-relaxed text-red-900">
                אם אתם חשים עקצוץ קל במגע בברז, במקרר או בגוף מכונת הכביסה — אל
                תמתינו ואל תנסו לאתר את המקור בעצמכם. נתקו את המכשיר מהשקע ופנו
                מיד לחשמלאי מוסמך. עקצוץ הוא זרם שכבר עובר דרככם.
              </p>
            </div>
          </section>

          <section aria-labelledby="tests">
            <h2 id="tests" className={H2}>
              איך בודקים הארקה במדידה
            </h2>
            <p>
              בדיקת הארקה אינה התבוננות בלוח, אלא סדרת מדידות במכשיר מכויל
              שתוצאותיהן מושוות לערכים המרביים המותרים.
            </p>

            <h3 className={H3}>רציפות מוליך ההגנה</h3>
            <p>
              נבדק שקע אחר שקע, כדי לוודא שמוליך ההגנה שלם מהלוח ועד המגע. זו
              הבדיקה שחושפת שקעים שנראים מוארקים אך בפועל אינם מחוברים כלל.
            </p>

            <h3 className={H3}>התנגדות ההארקה</h3>
            <p>
              נמדדת ההתנגדות בין מערכת ההארקה לבין האדמה. ערך גבוה מדי משמעו
              שזרם התקלה יהיה קטן, וההגנה עלולה שלא לנתק בזמן.
            </p>

            <h3 className={H3}>עכבת לולאת התקלה</h3>
            <p>
              זו המדידה שקובעת אם המפסק ינתק מהר מספיק בעת קצר לאדמה. הסבר מלא
              על אופן החישוב וקריאת התוצאה מופיע במדריך{" "}
              <Link href="/articles/fault-loop-impedance" className={LINK}>
                בדיקת הארקה ולולאת תקלה
              </Link>
              .
            </p>

            <h3 className={H3}>פעולת ממסר הפחת</h3>
            <p>
              נמדדים זרם ההפעלה בפועל וזמן הניתוק. ממסר שמנתק באיחור או בזרם
              גבוה מהמותר אינו ממלא את תפקידו, גם אם לחצן הבדיקה שלו נראה תקין.
            </p>
            <p>
              בסיום אתם אמורים לקבל תעודה חתומה ובה המספרים שנמדדו. מסמך שכתוב
              בו &quot;תקין&quot; בלי ערכים מדודים אינו מוכיח דבר.
            </p>
          </section>

          <section aria-labelledby="when">
            <h2 id="when" className={H2}>
              מתי צריך לתקן או לשדרג
            </h2>
            <p>
              יש מצבים שבהם בדיקת הארקה היא שגרה מומלצת, ויש מצבים שבהם היא
              דחופה.
            </p>
            <ul>
              <li>
                <strong>מבנים שנבנו לפני שנות התשעים</strong> — לעיתים קרובות אין
                בהם מוליך הגנה במעגלים כלל, גם אם הותקנו בהם שקעים חדשים.
              </li>
              <li>
                <strong>אחרי שיפוץ או החלפת צנרת</strong> — החלפת צנרת מתכת בצנרת
                פלסטיק מנתקת הארקות שנשענו עליה מבלי שאיש שם לב.
              </li>
              <li>
                <strong>לפני הוספת עומס כבד</strong> — משאבת חום, דוד חשמלי,
                כיריים אינדוקציה או תנור בילט-אין מחייבים מעגל ייעודי עם מוליך
                הגנה תקין.
              </li>
              <li>
                <strong>קפיצות חוזרות של ממסר הפחת</strong> — לרוב סימן לזליגה
                אמיתית, ולא לתקלה בממסר עצמו.
              </li>
              <li>
                <strong>סימני חום, השחרה או ריח בלוח</strong> — מצב שמחייב טיפול
                מיידי, ולעיתים{" "}
                <Link href="/articles/panel-upgrade" className={LINK}>
                  החלפת לוח החשמל
                </Link>{" "}
                כולו.
              </li>
            </ul>
          </section>

          <section aria-labelledby="mistakes">
            <h2 id="mistakes" className={H2}>
              כשלים נפוצים שאנחנו פוגשים בשטח
            </h2>

            <h3 className={H3}>הארקה מדומה בשקע</h3>
            <p>
              גשר בין מגע האפס למגע ההארקה בתוך השקע יוצר מראה של שקע מוארק, אך
              מחבר את מעטפת המכשיר לאפס הרשת. אם מוליך האפס מתנתק, כל המכשירים
              הופכים למסוכנים.
            </p>

            <h3 className={H3}>הארקה לצנרת מים</h3>
            <p>
              בעבר נהגו לחבר הארקה לצנרת מים מתכתית. מאז הוחלפה רוב הצנרת
              בפלסטיק, וההארקה הזו כבר אינה מוליכה לשום מקום — בלי שדבר בבית
              מסמן זאת.
            </p>

            <h3 className={H3}>מוליך הגנה שנקטע בקופסת הסתעפות</h3>
            <p>
              במעגלים שהורחבו בשלבים נפוץ למצוא מוליך הגנה שחובר בנקודה אחת
              ונשכח בנקודה הבאה. חצי מהשקעים במעגל מוארקים והחצי השני לא.
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי מורשה לבדוק ולחתום
            </h2>
            <p>
              בדיקת הארקה ותיקונה הם עבודת חשמל לכל דבר, ושמורים לבעל רישיון
              בדרגה המתאימה לגודל המתקן. הרחבה על ההבדל בין הדרגות מופיעה ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
            <p>
              אני עצמי הנדסאי חשמל והנדסאי מכונות מוסמך, בעל רישיון חשמלאי ראשי
              בתוקף. במקביל לעבודה בשטח אני מרצה ומכשיר הנדסאי חשמל במכללת אורט
              תעשייה אוירית, ומלמד בדיוק את חישובי ההארקה ותיאום המיגון שעליהם
              נשענת הבדיקה הזו.
            </p>
            <p>
              אני גם נותן חוות דעת מומחה לבתי משפט, וכסטודנט למשפטים אני רואה מה
              קורה כשאין תיעוד. בתביעות נזק ומול חברות ביטוח, תעודה עם ערכים
              מדודים היא ההבדל בין תיק מוכח לטענה בעל פה.
            </p>
            <p>
              היקף הבדיקות שאנחנו מבצעים מפורט בעמוד{" "}
              <Link href="/services" className={LINK}>
                שירותי החשמל
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              דוח בדיקת הארקה מלא במונחים ובמספרים, ולכן ההסבר ניתן בשפה שנוחה
              לכם. השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית.
            </p>
            <p>
              אפשר גם לשלוח הודעת וואטסאפ בכל שפה, לצרף תמונה של הלוח ולקבל
              הערכה ראשונית. אנחנו עובדים בפתח תקווה ובכל אזור המרכז — ראו{" "}
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
          heading="לא בטוחים שההארקה בבית שלכם תקינה?"
          description="בדיקת הארקה מלאה במכשור מכויל — רציפות מוליכי הגנה, התנגדות הארקה, עכבת לולאת תקלה ובדיקת ממסרי פחת, עם תעודה חתומה וערכים מדודים. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לבדיקת הארקה ותקינות מערכת ההגנה"
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
