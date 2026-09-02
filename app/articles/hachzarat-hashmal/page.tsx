import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "hachzarat-hashmal";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "החזרת חשמל אחרי ניתוק חברת חשמל | חשמלאי ראשי",
  description:
    "נותקתם מהחשמל? מדריך מלא להחזרת חשמל אחרי ניתוק חברת חשמל — שלבים, חשמלאי ראשי ואישור תקינות לחיבור מחדש.",
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "נותקתם מהחשמל? מדריך להחזרת החיבור מול חברת החשמל",
    description:
      "למה מנתקים, איך מחזירים חשמל בבטחה, ומתי חובה חשמלאי ראשי ואישור תקינות.",
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
    question: "כמה זמן לוקח להחזיר חשמל אחרי ניתוק בטיחותי?",
    answer:
      "תיקון הליקויים עצמם נמשך בדרך כלל בין יום עבודה אחד לשלושה ימים, תלוי אם נדרשת החלפת לוח או תיקון מערכת הארקה. את משך התהליך הכולל קובע הצד המנהלי: הגשת אישור התקינות והמתנה לביקורת של בודק מטעם חברת החשמל, שעשויה להימשך מכמה ימים עד שבועות.",
  },
  {
    question: "האם מותר לחבר את החשמל בעצמי אחרי שנותקתי?",
    answer:
      "לא. חיבור עצמי לרשת אחרי ניתוק יזום הוא עבירה על חוק החשמל, והוא מסוכן משום שהניתוק בוצע בדיוק בגלל ליקוי שטרם תוקן. חיבור עצמי גם מבטל את כיסוי הביטוח לכל נזק שייגרם ומקשה מאוד על השבת החיבור באופן מסודר. הדרך היחידה היא תיקון הליקוי, אישור תקינות וחיבור דרך חברת החשמל.",
  },
  {
    question: "מי חייב לשלם על התיקון — השוכר או בעל הדירה?",
    answer:
      "ככלל, ליקוי בתשתית הקבועה של הנכס — לוח חשמל, מוליכי הזנה ומערכת הארקה — הוא באחריות בעל הנכס, ואילו נזק שנגרם מהתנהלות השוכר או ממכשירים שלו הוא באחריותו. בפועל ההכרעה נגזרת מחוזה השכירות ומדוח הליקויים, ולכן חשוב לקבל את הדוח בכתב ולתעד את מצב המתקן.",
  },
  {
    question: "באילו שפות אפשר לקבל ליווי בתהליך מול חברת החשמל?",
    answer:
      "הליווי, ההסבר על דוח הליקויים והמסמכים ניתנים בעברית, ברוסית ובאנגלית. אפשר לשלוח הודעת וואטסאפ בכל שפה עם צילום של המסמך שהשאירה חברת החשמל ותמונה של הלוח, ולקבל הערכה ראשונית של היקף הטיפול.",
  },
];

const SECTIONS = [
  { id: "first", label: "מה לעשות בשעות הראשונות" },
  { id: "why", label: "למה חברת החשמל מנתקת" },
  { id: "process", label: "התהליך שלב אחר שלב" },
  { id: "docs", label: "המסמכים והמדידות שנדרשים" },
  { id: "time", label: "כמה זמן זה לוקח ומה מעכב" },
  { id: "who", label: "מי מורשה לבדוק ולחתום" },
  { id: "cases", label: "שכירות, בניין משותף ונכס עסקי" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK =
  "font-bold text-emerald-700 no-underline hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

export default function HachzaratHashmalArticle() {
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
              החזרת חשמל
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
            נותקתם מהחשמל? המדריך המלא להחזרת החיבור מול חברת החשמל
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
            ניתוק בגלל חוב כספי נפתר מול מוקד שירות הלקוחות ואינו דורש חשמלאי.
            ניתוק מסיבה בטיחותית או טכנית הוא סיפור אחר: חברת החשמל לא תחבר את
            הנכס מחדש עד שבעל רישיון מתאים יתקן את הליקוי ויחתום על אישור
            תקינות.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            הצעד הראשון הוא להשיג בכתב את סיבת הניתוק ואת דרישות החיבור מחדש.
            משם התהליך קבוע: בדיקה ומדידות, תיקון הליקויים, תעודת בדיקה חתומה,
            הגשה לחברת החשמל וביקורת של בודק מטעמה.
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
          <section aria-labelledby="first">
            <h2 id="first" className={`${H2} mt-0`}>
              מה לעשות בשעות הראשונות
            </h2>
            <p>
              השעות הראשונות הן אלה שקובעות את מהירות הפתרון, וארבע הפעולות
              הבאות שוות יותר מכל ניסיון טכני.
            </p>
            <ol>
              <li>
                <strong>ודאו שזה ניתוק ולא תקלה.</strong> ניתוק יזום מתבצע בדרך
                כלל לפני המונה, לעיתים בליווי סימון או אטם, ולכן החשמל אינו חוזר
                גם כשמרימים מפסקים.
              </li>
              <li>
                <strong>השיגו את סיבת הניתוק בכתב.</strong> בקשו במוקד את הסיבה
                המדויקת ואת דרישות החיבור מחדש. לעיתים נשאר מסמך במקום; אם לא,
                בקשו שיישלח אליכם.
              </li>
              <li>
                <strong>הבחינו בין חוב לבין בטיחות.</strong> ההבחנה הזאת קובעת
                את כל ההמשך — חוב נפתר בהסדר תשלום, ובטיחות דורשת חשמלאי, מדידות
                ואישור.
              </li>
              <li>
                <strong>אל תנסו לחבר בעצמכם.</strong> חיבור עצמי הוא עבירה על
                חוק החשמל, והוא מסוכן משום שהליקוי שגרם לניתוק עדיין קיים.
              </li>
            </ol>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 mt-0 text-lg font-bold text-red-900">
                אזהרת בטיחות
              </h3>
              <p className="m-0 leading-relaxed text-red-900">
                אם הניתוק בוצע בעקבות שריפה בארון החשמל, חדירת מים ללוח או קצר
                חמור — אין לפתוח את הלוח, אין להסיר סימון או אטם ואין להזמין
                &quot;מי שיחבר בינתיים&quot;. גם לוח מנותק עלול לכלול חלקים
                חיים, והנזק שנגרם בניסיון כזה מייקר את התיקון ומאריך את התהליך.
              </p>
            </div>
          </section>

          <section aria-labelledby="why">
            <h2 id="why" className={H2}>
              למה חברת החשמל מנתקת
            </h2>
            <p>
              מעבר לחובות כספיים, הניתוקים המורכבים נובעים מסיבות טכניות
              ובטיחותיות. חברת החשמל מחויבת לחוק החשמל, ואם קיים חשש לחיי אדם או
              לרכוש היא תנתק מיד.
            </p>
            <ul>
              <li>
                <strong>סכנה בטיחותית חמורה.</strong> שריפה בארון החשמל, חדירת
                מים מסיבית ללוח או קצר שמעמיד את הבניין בסכנה.
              </li>
              <li>
                <strong>ליקויים שנמצאו בביקורת.</strong> בודק שגילה ליקוי מהותי,
                למשל היעדר הארקה תקינה או מוליך הזנה שאינו מתאים לגודל החיבור,
                ונתן שהות לתיקון שלא נוצלה.
              </li>
              <li>
                <strong>חיבורים פיראטיים.</strong> שינוי במונה או בקווי ההזנה
                הראשיים, כולל עקיפת המונה.
              </li>
              <li>
                <strong>פיצול דירות ללא היתר.</strong> העמסת תשתית שלא תוכננה
                לכך, בדרך כלל אחרי פיצול יחידה למספר יחידות מושכרות.
              </li>
              <li>
                <strong>צו של רשות מוסמכת.</strong> דרישת משטרת ישראל, כיבוי אש
                או הרשות המקומית מטעמי בטיחות או עבירות בנייה.
              </li>
            </ul>
            <p>
              חלק מהליקויים אינם בדירה עצמה אלא בשטח המשותף — בלוח המדרגות או
              בארון ההזנה.
            </p>
          </section>

          <section aria-labelledby="process">
            <h2 id="process" className={H2}>
              התהליך שלב אחר שלב
            </h2>
            <p>
              כשהניתוק בטיחותי או טכני, חברת החשמל תסרב לחבר מחדש עד שאיש מקצוע
              מוסמך ייקח אחריות על התשתית ויוכיח שהיא תקינה. התהליך קבוע, וכל
              דילוג על שלב מוקדם מתגלה בשלב מאוחר ויקר יותר.
            </p>

            <h3 className={H3}>שלב 1: קבלת דוח הליקויים</h3>
            <p>
              חברת החשמל מציינת מהי סיבת הניתוק ומהן הדרישות לחיבור מחדש. את
              המסמך צריך לקבל בכתב, כי הוא מגדיר את היקף העבודה ומונע מחלוקת
              בהמשך.
            </p>

            <h3 className={H3}>שלב 2: הזמנת חשמלאי בעל רישיון מתאים</h3>
            <p>
              הרישיון חייב לכסות את גודל החיבור בנכס, אחרת החתימה לא תקובל.
              הבדיקה כאן אינה חזותית: נבדקים הלוח, מוליכי ההזנה, ההארקה וממסרי
              הפחת, ומתבצעות מדידות שמאשרות שהמיגון יפעל.
            </p>

            <h3 className={H3}>שלב 3: תיקון הליקויים בשטח</h3>
            <p>
              כאן מתקנים את מה שגרם לניתוק: תיקון או התקנה מחדש של מערכת הארקה,
              החלפת מוליכים שהתחממו או הפרדה נכונה בין אפס והארקה.
            </p>
            <p>
              בלוחות ותיקים, ובעיקר בלוחות עץ או בלוחות ללא ממסר פחת, התיקון
              הנכון הוא לרוב{" "}
              <Link href="/articles/panel-upgrade" className={LINK}>
                החלפה מלאה של לוח החשמל
              </Link>{" "}
              ולא תיקון נקודתי, שיוביל לכשל נוסף בביקורת.
            </p>

            <h3 className={H3}>שלב 4: הפקת אישור תקינות</h3>
            <p>
              בסיום העבודה מפיק בעל הרישיון תעודת בדיקה חתומה, שכוללת את תוצאות
              המדידות ואת הצהרתו שהמתקן תקין. זה המסמך שחברת החשמל מסתמכת עליו,
              והוא גם המסמך שתצטרכו מול חברת הביטוח.
            </p>

            <h3 className={H3}>שלב 5: הגשה וביקורת חברת החשמל</h3>
            <p>
              את האישור מגישים למחלקת הרשת יחד עם יתר המסמכים. במקרים רבים נקבעת
              ביקורת בשטח של בודק מטעם חברת החשמל, שמאמת שהליקויים שצוינו בדוח
              אכן תוקנו.
            </p>

            <h3 className={H3}>שלב 6: חיבור מחדש ותיעוד</h3>
            <p>
              אחרי אישור הבודק מבוצע החיבור בפועל. ודאו שקיבלתם את תעודת הבדיקה,
              את טבלת המעגלים המעודכנת ואת תוצאות המדידות — הם יידרשו בכל בדיקה
              עתידית ובעת מכירת הנכס.
            </p>
          </section>

          <section aria-labelledby="docs">
            <h2 id="docs" className={H2}>
              המסמכים והמדידות שנדרשים
            </h2>
            <p>
              רוב העיכובים נובעים ממסמך חסר ולא מתקלה חשמלית. הדרישה המדויקת
              נקבעת לפי סיבת הניתוק ולפי גודל החיבור.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="מסמכים ומדידות הנדרשים לחיבור מחדש מול חברת החשמל"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  המסמכים והמדידות השכיחים בתהליך חיבור מחדש, ומה כל אחד מהם
                  מוכיח.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מסמך או מדידה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מי מפיק
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      למה הוא נדרש
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      דוח סיבת הניתוק
                    </th>
                    <td className="border border-slate-200 p-3">חברת החשמל</td>
                    <td className="border border-slate-200 p-3">
                      מגדיר את היקף העבודה הנדרש
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תעודת בדיקה חתומה
                    </th>
                    <td className="border border-slate-200 p-3">
                      בעל רישיון בדרגה המתאימה
                    </td>
                    <td className="border border-slate-200 p-3">
                      הצהרה שהמתקן נבדק ונמצא תקין
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      התנגדות בידוד המעגלים
                    </th>
                    <td className="border border-slate-200 p-3">
                      נמדדת במכשיר מגר
                    </td>
                    <td className="border border-slate-200 p-3">
                      מוכיחה שאין זליגה שתגרום לתקלה חוזרת
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      התנגדות ורציפות הארקה
                    </th>
                    <td className="border border-slate-200 p-3">נמדדת בשטח</td>
                    <td className="border border-slate-200 p-3">
                      הליקוי השכיח ביותר בניתוק בטיחותי
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      עכבת לולאת תקלה
                    </th>
                    <td className="border border-slate-200 p-3">נמדדת בשטח</td>
                    <td className="border border-slate-200 p-3">
                      קובעת אם המפסק ינתק מהר די הצורך בקצר
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      זמן ניתוק ממסרי הפחת
                    </th>
                    <td className="border border-slate-200 p-3">נמדד בשטח</td>
                    <td className="border border-slate-200 p-3">
                      מאמת שההגנה מפני התחשמלות פועלת
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              הסבר על משמעות המספרים ועל קריאתם מופיע במדריך{" "}
              <Link href="/articles/fault-loop-impedance" className={LINK}>
                בדיקת הארקה ולולאת תקלה
              </Link>
              , ורקע על תפקיד ההארקה עצמה במדריך{" "}
              <Link href="/articles/grounding" className={LINK}>
                הארקה — מהי ואיך מוודאים שהיא תקינה
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="time">
            <h2 id="time" className={H2}>
              כמה זמן זה לוקח ומה מעכב
            </h2>
            <p>
              תיקון הליקויים נמשך בדרך כלל בין יום עבודה אחד לשלושה ימים, וההגשה
              והביקורת עשויות להימשך מכמה ימים עד שבועות.
            </p>
            <p>
              לכן המהלך הנכון הוא לסיים את כל הליקויים בסבב אחד ולהגיש תיק מלא,
              במקום להגיש חלקית ולהיכשל בביקורת. אלה הדברים שמאריכים את התהליך
              בפועל:
            </p>
            <ul>
              <li>תיקון חלקי שמשאיר ליקוי שצוין בדוח.</li>
              <li>חתימה של מי שרישיונו אינו מכסה את גודל החיבור.</li>
              <li>מסמכי בעלות או ייפוי כוח חסרים, במיוחד בנכס מושכר.</li>
              <li>ליקוי בשטח משותף שדורש החלטה של ועד הבית.</li>
              <li>היעדר תוצאות מדידה בתעודה, שמחייב חזרה לשטח.</li>
            </ul>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי מורשה לבדוק ולחתום
            </h2>
            <p>
              הסמכות לחתום נגזרת מגודל החיבור. חשמלאי מוסמך רשאי לטפל ולחתום עד
              3×80 אמפר, וחשמלאי ראשי עד 3×250 אמפר.
            </p>
            <p>
              המשמעות מעשית: אישור שנחתם בידי מי שרישיונו אינו מכסה את גודל
              החיבור לא יקובל, והתהליך יחזור להתחלה. הרחבה על דרגות הרישיון
              מופיעה ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
            <p>
              אני עצמי הנדסאי חשמל ומכונות מוסמך ובעל רישיון חשמלאי ראשי בתוקף,
              ולכן אני יכול לטפל גם במתקנים גדולים ובבנייני דירות ולחתום עליהם.
              במקביל אני מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אוירית,
              ומלמד את אותן מדידות שנדרשות כאן.
            </p>
            <p>
              כנותן חוות דעת מומחה לבתי משפט וכסטודנט למשפטים אני מכיר גם את הצד
              המשפטי: ניתוק בטיחותי מייצר שאלת אחריות בין דיירים, ועד בית וחברת
              ביטוח — ותעודת בדיקה מפורטת מכריעה אותה.
            </p>
          </section>

          <section aria-labelledby="cases">
            <h2 id="cases" className={H2}>
              שכירות, בניין משותף ונכס עסקי
            </h2>

            <h3 className={H3}>נכס מושכר</h3>
            <p>
              ליקוי בתשתית הקבועה הוא ככלל באחריות בעל הנכס, ונזק שנגרם מהתנהלות
              השוכר הוא באחריותו. ההכרעה נגזרת מחוזה השכירות ומדוח הליקויים, ולכן
              שני הצדדים מרוויחים מתיעוד מדויק.
            </p>

            <h3 className={H3}>בניין משותף</h3>
            <p>
              כשהליקוי בארון ההזנה או בלוח המדרגות, הטיפול באחריות ועד הבית גם אם
              רק דירה אחת נותקה. משתלם לקבל חוות דעת אחת שמפרטת את מקור הליקוי,
              כדי שההוצאה תתחלק נכון.
            </p>

            <h3 className={H3}>נכס עסקי</h3>
            <p>
              בעסק, ניתוק אינו אי-נוחות אלא הפסקת פעילות והפסד הכנסה. הטיפול
              במתקנים עסקיים, כולל בדיקות תקופתיות שמונעות את המצב מראש, מפורט
              בעמוד{" "}
              <Link href="/business" className={LINK}>
                שירותי חשמל לעסקים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              התהליך כולל מסמכים ומונחים שחשוב להבין במדויק, ולכן ההסבר והליווי
              ניתנים בעברית, ברוסית ובאנגלית. אפשר גם לשלוח הודעת וואטסאפ בכל
              שפה, לצרף צילום של המסמך שהשאירה חברת החשמל ותמונה של הלוח, ולקבל
              הערכה ראשונית עוד לפני הביקור.
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
          heading="צריכים החזרת חשמל עכשיו?"
          description="בדיקה ומדידות בשטח, תיקון הליקויים שגרמו לניתוק, הפקת תעודת בדיקה חתומה וליווי מלא מול חברת החשמל — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="להחזרת חשמל אחרי ניתוק חברת חשמל"
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
