import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "handyman-vs-electrician";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: "הנדימן הוא לא חשמלאי! מתי אסור להתפשר על איש מקצוע?",
  description:
    "תיקונים קטנים בבית זה נחמד, אבל כשזה מגיע לחשמל - הנדימן ללא רישיון הוא סכנת חיים. קראו למה החוק אוסר זאת ואיך שומרים על בטיחות הבית.",
  keywords: [
    "הנדימן חשמל",
    "הנדימן מול חשמלאי",
    "עבודת חשמל ללא רישיון",
    "חוק החשמל",
    "ביטוח דירה נזק חשמל",
    "חשמלאי מוסמך",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: "הנדימן הוא לא חשמלאי: למה אלתורים עולים ביוקר?",
    description: "חוק החשמל, סכנת ביטוח ורישיון מוסמך — מדריך בטיחות מלא.",
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
    question: "האם הנדימן רשאי להחליף שקע או גוף תאורה?",
    answer:
      "לא. החלפת שקע, מפסק או גוף תאורה היא עבודת חשמל לכל דבר, גם אם היא נמשכת עשר דקות. חוק החשמל מתיר ביצוע עבודת חשמל רק לבעל רישיון תקף ומתאים לסוג העבודה, ואינו מבחין בין עבודה קטנה לגדולה. הנדימן רשאי לתלות, להרכיב ולתקן — אך לא לחבר או לנתק מוליכים במתקן החשמל.",
  },
  {
    question: "מה קורה עם ביטוח הדירה אם עבודת החשמל בוצעה ללא רישיון?",
    answer:
      "חברת הביטוח בודקת מי ביצע את העבודה ובאיזה רישיון. כשמתברר שהעבודה נעשתה בידי מי שאינו בעל רישיון מתאים, הכיסוי עלול להידחות בטענה שהנזק נגרם מעבודה שבוצעה שלא כדין. הבעיה מחריפה בנזק לצד שלישי, למשל שריפה שמתפשטת לדירת השכנים, שם החשיפה הכספית אינה מוגבלת לשווי הרכוש שלכם.",
  },
  {
    question: "איך אני מוודא שלאיש המקצוע שמגיע אליי באמת יש רישיון?",
    answer:
      "בקשו לראות את כרטיס הרישיון מטעם רשות החשמל במשרד הכלכלה, ובדקו שלוש נקודות: השם והתעודה הזהות תואמים לאדם שעומד מולכם, תוקף הרישיון לא פג, וסוג הרישיון מתאים לגודל העבודה. בעל מקצוע אמיתי שולח צילום רישיון בוואטסאפ עוד לפני הביקור ולא מתחמק מהשאלה.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ושירות?",
    answer:
      "השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, כולל הסבר על היקף העבודה, על הרישיון הנדרש ועל תעודת הבדיקה. אפשר לשלוח הודעת וואטסאפ בכל שפה ולצרף תמונה של הנקודה הבעייתית או של הלוח, ולקבל חוות דעת ראשונית לפני שמזמינים ביקור.",
  },
];

const SECTIONS = [
  { id: "line", label: "איפה עובר הגבול בין הנדימן לחשמלאי" },
  { id: "hok", label: "מה אומר החוק בישראל" },
  { id: "simple", label: 'למה "עבודה קטנה" היא לא באמת קטנה' },
  { id: "bituach", label: "סכנת הביטוח והאחריות המשפטית" },
  { id: "failures", label: "האלתורים שאנחנו מתקנים בפועל" },
  { id: "cost", label: "למה הזול יוצא יקר" },
  { id: "rishayon", label: "איך מוודאים רישיון בשלוש דקות" },
  { id: "who", label: "מי חותם על העבודה אצלנו" },
  { id: "languages", label: "שירות בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function HandymanArticle() {
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
              הנדימן מול חשמלאי
            </span>
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-12">
        <header className="mb-8 border-b border-gray-100 pb-8">
          <p className="mb-4">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-bold text-red-800">
              {article.category}
            </span>
          </p>

          <h1 className="mb-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
            הנדימן הוא לא חשמלאי: למה אלתורים עולים ביוקר?
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
            הנדימן הוא פתרון מצוין לעבודות תחזוקה כלליות, אבל כל פעולה שכוללת
            חיבור או ניתוק של מוליכים במתקן החשמל היא עבודת חשמל, ושמורה בחוק
            לבעל רישיון בלבד. הגודל של העבודה אינו משנה — גם החלפת שקע נכללת.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            המחיר של אלתור אינו נגמר בתקלה. הוא מתגלגל להיעדר כיסוי ביטוחי,
            לאחריות אישית בנזיקין, ולעיתים קרובות לעבודת תיקון יקרה יותר מזו
            שנחסכה מלכתחילה.
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
          <section aria-labelledby="line">
            <h2 id="line" className={H2}>
              איפה עובר הגבול בין הנדימן לחשמלאי
            </h2>
            <p>
              הנדימן טוב שווה זהב. תליית טלוויזיה, הרכבת ארון, החלפת ידית או
              איטום חלון הן עבודות שאין שום סיבה להזמין עבורן בעל מקצוע יקר
              יותר.
            </p>
            <p>
              הבעיה מתחילה בהצעה שנשמעת נדיבה: &quot;אם כבר אני כאן, אני גם
              אחליף לך את השקע הזה&quot;. ברגע הזה העבודה חצתה גבול חוקי, ולא
              רק גבול מקצועי.
            </p>
            <p>
              המבחן פשוט: אם הפעולה מחייבת פתיחת מעגל, חיבור מוליך או שינוי
              בלוח — היא עבודת חשמל. אם היא נעשית כולה מחוץ למתקן החשמל, היא
              עבודת תחזוקה.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="חלוקת משימות נפוצות בין הנדימן לבין חשמלאי בעל רישיון"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[36rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  משימות נפוצות בבית והשאלה אם הן נחשבות עבודת חשמל. הטבלה
                  מדגימה את העיקרון ואינה מחליפה בדיקה של המקרה הספציפי.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      המשימה
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      עבודת חשמל?
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מי רשאי לבצע
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      החלפת נורה בגוף תאורה קיים
                    </th>
                    <td className="border border-slate-200 p-3">לא</td>
                    <td className="border border-slate-200 p-3">
                      כל אדם, לאחר ניתוק המפסק
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תליית מדף או טלוויזיה על הקיר
                    </th>
                    <td className="border border-slate-200 p-3">לא</td>
                    <td className="border border-slate-200 p-3">
                      הנדימן — בתנאי שנבדק שאין צנרת או כבל בקיר
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      החלפת שקע, מפסק או גוף תאורה
                    </th>
                    <td className="border border-slate-200 p-3">כן</td>
                    <td className="border border-slate-200 p-3">
                      חשמלאי בעל רישיון בלבד
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      הוספת נקודה או מעגל חדש
                    </th>
                    <td className="border border-slate-200 p-3">כן</td>
                    <td className="border border-slate-200 p-3">
                      חשמלאי בעל רישיון, אחרי בדיקת עומס
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      טיפול בלוח החשמל או בממסר פחת
                    </th>
                    <td className="border border-slate-200 p-3">כן</td>
                    <td className="border border-slate-200 p-3">
                      חשמלאי בדרגה המתאימה לגודל החיבור
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="hok">
            <h2 id="hok" className={H2}>
              מה אומר החוק בישראל
            </h2>
            <p>
              חוק החשמל, התשי&quot;ד-1954, קובע שאין לעסוק בביצוע עבודת חשמל
              אלא אם כן בידי המבצע רישיון תקף המתאים לסוג העבודה ולגודל המתקן.
              ההגדרה של עבודת חשמל רחבה: התקנה, שינוי, תיקון, בדיקה או פירוק של
              מתקן חשמלי.
            </p>
            <p>
              החוק אינו מכיר בקטגוריה של &quot;עבודה קטנה&quot;. אין סף אמפר,
              אין פטור לעבודה של רבע שעה, ואין הקלה לבעל מקצוע מתחום אחר שיודע
              לאחוז במברג.
            </p>
            <p>
              ביצוע עבודת חשמל ללא רישיון הוא עבירה פלילית. בפועל, כמעט אף אחד
              לא נתפס בשלב הביצוע — הנושא צף אחרי שקורה נזק, וכאן מתחיל החלק
              היקר באמת.
            </p>
            <p>
              על מדרג הרישיונות עצמו, ומי רשאי לחתום על איזה מתקן, כתבתי בהרחבה
              ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="simple">
            <h2 id="simple" className={H2}>
              למה &quot;עבודה קטנה&quot; היא לא באמת קטנה
            </h2>
            <p>
              החלפת שקע נראית כמו החלפת רכיב. בפועל היא דורשת שורה של החלטות
              שדורשות ידע, וכל אחת מהן משפיעה על הבטיחות.
            </p>
            <p>
              צריך לזהות איזה מוליך הוא פאזה, איזה אפס ואיזה מוליך הגנה — ובבתים
              ותיקים הצבעים לא תמיד תואמים את המקובל היום. צריך לוודא שמוליך
              ההגנה באמת מחובר, ולא רק שקיים חוט בצבע המתאים.
            </p>
            <p>
              צריך להתאים את חתך המוליך ואת הגנת המעגל לעומס המתוכנן, במיוחד
              כשמדובר בכיריים אינדוקציה, בתנור בילט-אין, בדוד חשמלי או במיזוג
              מיני-מרכזי. וצריך להדק במומנט הנכון — הידוק חלש מייצר חום, הידוק
              חזק מדי שובר את המוליך.
            </p>
            <p>
              כל אלה אינם ידע כללי. זה בדיוק החומר שלומדים לקראת רישיון, וזה
              ההבדל בין חיבור שמחזיק עשרים שנה לבין חיבור שמתחמם בשקט מאחורי
              הקיר.
            </p>
          </section>

          <section aria-labelledby="bituach">
            <h2 id="bituach" className={H2}>
              סכנת הביטוח והאחריות המשפטית
            </h2>
            <p>
              נניח שגוף תאורה הותקן בזול, חיבור אחד נשאר רופף, והחום שנוצר בו
              הצית את התקרה. אתם פונים לחברת הביטוח, והיא שואלת שאלה אחת: מי
              ביצע את העבודה.
            </p>
            <p>
              כשמתברר שהמבצע לא היה בעל רישיון, הדיון עובר מיד לשאלת הכיסוי.
              פוליסות רבות מתנות כיסוי בכך שהעבודה בוצעה כדין, וחשבונית של מי
              שאינו מורשה היא בדיוק הראיה שמאפשרת לדחות את התביעה.
            </p>
            <p>
              יש גם רובד שני, שפחות מדברים עליו. עבודה בניגוד לחוק החשמל עשויה
              להקים עילה של הפרת חובה חקוקה, ולחשוף גם את מזמין העבודה לטענות —
              במיוחד כשהנזק חורג מגבולות הדירה ומגיע לשכנים.
            </p>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-red-900">
                שימו לב לפני שמזמינים
              </h3>
              <p className="m-0 leading-relaxed text-red-900">
                חשבונית עם שם עסק אינה ראיה לרישיון. שמרו את מספר הרישיון של
                המבצע לצד החשבונית ואת תעודת הבדיקה אם ניתנה. בלי המסמכים האלה,
                אין לכם מה להראות לחברת הביטוח ביום שבו תזדקקו לה.
              </p>
            </div>
          </section>

          <section aria-labelledby="failures">
            <h2 id="failures" className={H2}>
              האלתורים שאנחנו מתקנים בפועל
            </h2>
            <p>
              אלה אינם מקרי קיצון נדירים. אלה הממצאים החוזרים ביותר בקריאות
              שמגיעות אחרי עבודה של מי שאינו בעל רישיון.
            </p>

            <h3 className={H3}>מוליך הגנה שלא חובר</h3>
            <p>
              השקע החדש הותקן, אך המוליך הצהוב-ירוק נדחף לאחור בלי חיבור. הכל
              עובד, ואיש אינו יודע שאין הארקה — עד לתקלה הראשונה. הסבר מלא על
              המשמעות מופיע במדריך{" "}
              <Link href="/articles/grounding" className={LINK}>
                הארקה — מהי ולמה היא חשובה
              </Link>
              .
            </p>

            <h3 className={H3}>ערבוב בין אפס להארקה</h3>
            <p>
              חיבור מוליך האפס לפס ההארקה או גישור בין השניים בתוך השקע גורם
              לממסר הפחת לקפוץ שוב ושוב בלי סיבה נראית לעין, ומבטל את ההגנה.
            </p>

            <h3 className={H3}>הגדלת מפסק במקום פתרון הבעיה</h3>
            <p>
              כשמפסק קופץ, החלפתו בגדול יותר משתיקה את התסמין ומשאירה מוליך דק
              מדי ללא הגנה. זה אחד הכשלים המסוכנים ביותר, ולעיתים הוא מתגלה רק
              בעת{" "}
              <Link href="/articles/panel-upgrade" className={LINK}>
                החלפת לוח החשמל
              </Link>
              .
            </p>

            <h3 className={H3}>חיבורים בתוך הקיר בלי קופסה</h3>
            <p>
              חיבור מוליכים שנעטף בסרט בידוד ונטמן בטיח אינו נגיש לבדיקה, אינו
              מוגן מפני לחות, ואי אפשר לאתר אותו כשהוא מתחיל להתחמם.
            </p>
          </section>

          <section aria-labelledby="cost">
            <h2 id="cost" className={H2}>
              למה הזול יוצא יקר
            </h2>
            <p>
              הפער בין הצעת מחיר של הנדימן לבין הצעה של חשמלאי בעל רישיון נראה
              משמעותי ברגע ההזמנה, אבל הוא נמדד מול העבודה בלבד — לא מול מה
              שקורה אחריה.
            </p>
            <p>
              תיקון של אלתור כמעט תמיד יקר מהעבודה המקורית, כי הוא כולל גם
              איתור, גם פירוק וגם ביצוע מחדש. כשהאלתור טמון מאחורי טיח או בתוך
              לוח שאינו מסומן, האיתור לבדו יכול לקחת שעות.
            </p>
            <p>
              טווחי מחירים מעודכנים לעבודות הנפוצות מופיעים בעמוד{" "}
              <Link href="/pricing" className={LINK}>
                המחירון
              </Link>
              , כדי שתוכלו להשוות הצעות על בסיס אמיתי ולא רק לפי המספר הנמוך
              ביותר.
            </p>
          </section>

          <section aria-labelledby="rishayon">
            <h2 id="rishayon" className={H2}>
              איך מוודאים רישיון בשלוש דקות
            </h2>
            <p>
              אל תסתפקו בהבטחה בטלפון. בקשו לראות את כרטיס הרישיון מטעם רשות
              החשמל במשרד הכלכלה, ועברו על שלוש נקודות.
            </p>
            <ol>
              <li>
                <strong>התאמה אישית.</strong> השם ומספר תעודת הזהות שברישיון
                צריכים להיות של האדם שעומד מולכם, ולא של קרוב משפחה או מעסיק.
              </li>
              <li>
                <strong>תוקף.</strong> לרישיון יש תאריך תפוגה. רישיון שפג אינו
                מקנה הרשאה לבצע עבודה.
              </li>
              <li>
                <strong>סוג הרישיון.</strong> ודאו שהדרגה מתאימה לעבודה — טיפול
                בלוח תלת-פאזי אינו זהה להחלפת שקע.
              </li>
            </ol>
            <p>
              רשימת בדיקה מלאה, כולל דגלים אדומים בשיחת הטלפון הראשונה, מופיעה
              במדריך{" "}
              <Link href="/articles/how-to-choose-electrician" className={LINK}>
                איך לבחור חשמלאי מוסמך
              </Link>
              . מי שמבקש לזהות מתחזים ותעודות מזויפות ימצא הרחבה ב
              <Link href="/articles/beware-of-scammers" className={LINK}>
                תחקיר הנוכלים
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי חותם על העבודה אצלנו
            </h2>
            <p>
              אני הנדסאי חשמל והנדסאי מכונות מוסמך, בעל רישיון חשמלאי ראשי
              בתוקף, וכל עבודה שיוצאת מהעסק נחתמת על ידי בעל רישיון בדרגה
              המתאימה לגודל המתקן.
            </p>
            <p>
              לצד העבודה בשטח אני מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה
              אוירית. את החומר שאני מלמד — חישובי הגנות, תיאום מיגון ובדיקות
              מסירה — אני מיישם באותם בתים שבהם מתקנים אלתורים.
            </p>
            <p>
              אני גם נותן חוות דעת מומחה לבתי משפט, וכסטודנט למשפטים אני נתקל
              שוב ושוב באותה תמונה: נזק אמיתי, ראיות חלשות, ואיש מקצוע שכבר לא
              עונה לטלפון. תיעוד ורישיון הם מה שמונע את המצב הזה מראש.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              שירות בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              השירות והייעוץ ניתנים בעברית, ברוסית ובאנגלית, כולל הסבר ברור מה
              נדרש בחוק ומה נכלל בעבודה. אפשר לשלוח הודעת וואטסאפ בכל שפה ולקבל
              מענה.
            </p>
            <p>
              בעלי עסקים שמנהלים מתקן משותף או שוכרים נכס ימצאו מידע ייעודי
              בעמוד{" "}
              <Link href="/business" className={LINK}>
                שירות לעסקים
              </Link>
              , שם הדרישה לרישיון ולתיעוד מחמירה עוד יותר.
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
          heading="יש לכם עבודת חשמל בבית או בעסק?"
          description="עבודה תקנית בידי הנדסאי חשמל בעל רישיון ראשי, כולל בדיקות מסירה, תיעוד וחשבונית עם פרטי רישיון — בדיוק מה שחברת הביטוח תבקש לראות. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה."
          callPurpose="לתיאום עבודת חשמל בידי בעל רישיון"
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
