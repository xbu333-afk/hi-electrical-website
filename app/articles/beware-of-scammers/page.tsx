import type { Metadata } from "next";
import Link from "next/link";
import ArticleDateline from "@/app/components/ArticleDateline";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import { buildArticleJsonLd, getArticle, type ArticleFaq } from "@/lib/articles";
import { articleOgImageUrl } from "@/lib/og";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const SLUG = "beware-of-scammers";
const article = getArticle(SLUG);

export const metadata: Metadata = {
  title: 'זהירות מנוכלים: איך תזהו חשמלאים מתחזים והונאות "יצאת צדיק"? | ח.י שירותי חשמל',
  description:
    "השוק פרוץ ונוכלים מזייפים תעודות ואפילו תמונות עם חיים אתגר בעזרת AI. כך תזהו חאפרים, תבדקו רישיון חשמלאי ותשמרו על החיים שלכם.",
  keywords: [
    "חשמלאי מתחזה",
    "הונאות חשמלאים",
    "בדיקת רישיון חשמלאי",
    "פנקס החשמלאים",
    "יצאת צדיק זיוף",
    "חאפר חשמל",
  ],
  alternates: {
    canonical: `${SITE_URL}/articles/${SLUG}`,
  },
  openGraph: {
    title: 'זהירות מנוכלים: חשמלאים מתחזים והונאות "יצאת צדיק"',
    description:
      "איך לזהות נוכלים, לבדוק רישיון ולא להיפול על זיופי AI — מדריך צרכנות ובטיחות.",
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
    question: "איך אני בודק אם לחשמלאי יש רישיון בתוקף?",
    answer:
      "בקשו צילום של הרישיון עוד בשלב הטלפון או הוואטסאפ, וודאו שמופיעים בו שם מלא, מספר זהות, סוג הרישיון ותאריך תוקף. לאחר מכן הצליבו את הפרטים בפנקס החשמלאים של משרד העבודה, שהוא המאגר הרשמי היחיד. מי שאינו מופיע במאגר אינו חשמלאי, גם אם בידו תעודה מרשימה.",
  },
  {
    question: 'איך אפשר לדעת שתמונה של "יצאת צדיק" אינה מזויפת בבינה מלאכותית?',
    answer:
      "תמונה בודדת אינה ראיה עוד, מפני שאפשר לייצר אותה בדקות ספורות. מי שבאמת השתתף בתוכנית יכול להציג קטע וידאו מהפרק עצמו וקישור לשידור המקורי, ולא רק תמונת סטילס. הבדיקה המכריעה נשארת מספר רישיון שאפשר לאמת במאגר הרשמי וחשבונית מס על שם העסק.",
  },
  {
    question: "מה עושים אם כבר שילמתי לחשמלאי שהתברר כמתחזה?",
    answer:
      "תעדו הכול — התכתבות, קבלות ותמונות של העבודה — ואז הזמינו בעל רישיון לבדיקת בטיחות של מה שנעשה, מפני שלפני הכול חשוב לדעת אם המתקן מסוכן. במקביל אפשר להגיש תלונה למשרד העבודה ולרשות להגנת הצרכן, ולתבוע החזר בבית משפט לתביעות קטנות.",
  },
  {
    question: "באילו שפות אפשר לקבל ייעוץ ובדיקה שנייה של הצעת מחיר?",
    answer:
      "הייעוץ והשירות ניתנים בעברית, ברוסית ובאנגלית, כולל הסבר על הצעת מחיר שקיבלתם מגורם אחר. אפשר לשלוח הודעת וואטסאפ בכל שפה, לצרף את ההצעה ותמונה של הלוח, ולקבל חוות דעת ראשונית לפני שמתחייבים.",
  },
];

const SECTIONS = [
  { id: "shuk", label: "למה דווקא שוק החשמל פרוץ" },
  { id: "rishayon", label: "איפה רישיון החשמל?" },
  { id: "yatza-tzadik", label: 'עוקץ מדליית "יצאת צדיק"' },
  { id: "ai", label: "זיופים בעידן ה-AI" },
  { id: "mechir", label: "מלכודת הפיתיון והצעות מופרכות" },
  { id: "okatzim", label: "עוקצים נוספים שחוזרים על עצמם" },
  { id: "mismachim", label: "מה שנוכל לעולם לא ייתן לכם" },
  { id: "mishpat", label: "מה נראה בתיקים שמגיעים לבית משפט" },
  { id: "maase", label: "נפלתם בפח? מה עושים עכשיו" },
  { id: "languages", label: "ייעוץ בעברית, ברוסית ובאנגלית" },
  { id: "faq", label: "שאלות נפוצות" },
] as const;

const H2 = "mt-12 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl";
const H3 = "mt-8 text-xl font-bold text-slate-800";
const LINK = "font-bold text-emerald-700 no-underline hover:underline";

export default function BewareOfScammersArticle() {
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
              זהירות מנוכלים
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
            זהירות מנוכלים: איך תזהו מתחזים לחשמלאים והונאות &quot;יצאת
            צדיק&quot;?
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
            מתחזה בתחום החשמל אינו מזוהה לפי מראה חיצוני, רכב ממותג או אתר
            מרשים. הוא מזוהה לפי שלושה דברים שאין ביכולתו לספק: מספר רישיון
            שאפשר לאמת במאגר הרשמי, חשבונית מס על שם העסק, ותעודת בדיקה עם
            מספרים מדודים בסיום.
          </p>
          <p className="mt-3 leading-relaxed text-slate-800">
            בשנתיים האחרונות נוספה שכבה חדשה: תעודות ותמונות שנוצרו בבינה
            מלאכותית, ובהן תמונות מזויפות לצד חיים אתגר ומדליית &quot;יצאת
            צדיק&quot;. תמונה כבר אינה ראיה — רק אימות במאגר רשמי ומסמך חתום הם
            ראיה.
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
          <section aria-labelledby="shuk">
            <h2 id="shuk" className={H2}>
              למה דווקא שוק החשמל פרוץ כל כך
            </h2>
            <p>
              בתחומים אחרים הלקוח מעריך את התוצר בעצמו: צבע שנמרח רע נראה בעין.
              בחשמל זה בלתי אפשרי — אחרי שהמתקין יוצא, אין דרך לראות אם ההארקה
              רציפה או אם ממסר הפחת ינתק בזמן.
            </p>
            <p>
              לזה מתווסף גורם הזמן. תקלת חשמל היא מצב דחוק, ולקוח לחוץ מוכן לשלם
              כמעט כל סכום למי שיענה מהר. לכן ההגנה האמיתית קורית לפני שפותחים
              את הדלת.
            </p>
          </section>

          <section aria-labelledby="rishayon">
            <h2 id="rishayon" className={H2}>
              נורת אזהרה ראשונה: איפה רישיון החשמל?
            </h2>
            <p>
              כל מי שמבצע עבודת חשמל בישראל מחויב להחזיק רישיון בתוקף — גם
              להחלפת שקע, וקל וחומר לעבודה בלוח. הרישיון אינו תעודת סיום קורס
              ואינו תעודת הוקרה: הוא מסמך של משרד העבודה, ומופיעים בו שם מלא,
              מספר זהות, סוג הרישיון ותאריך תוקף.
            </p>

            <h3 className={H3}>איך מאמתים את הרישיון בפועל</h3>
            <p>
              משרד העבודה מנהל מאגר ציבורי שנקרא פנקס החשמלאים, ובו אפשר לחפש
              לפי שם או לפי מספר רישיון. זו הבדיקה היחידה שנחשבת, והיא לוקחת
              פחות מדקה.
            </p>
            <p>
              הצליבו גם את שם המשפחה ומספר הזהות. שיטה נפוצה היא להציג רישיון
              אמיתי של אדם אחר — קרוב משפחה או מעסיק לשעבר — ולעבוד תחתיו.
            </p>

            <h3 className={H3}>התאמת דרגת הרישיון לעבודה</h3>
            <p>
              רישיון בתוקף אינו מספיק בפני עצמו; הדרגה חייבת לכסות את גודל
              המתקן. חשמלאי מוסמך רשאי לעבוד עד 3×80 אמפר וחשמלאי ראשי עד 3×250
              אמפר, ופירוט מלא מופיע ב
              <Link href="/articles/electrical-licenses-guide" className={LINK}>
                מדריך רישיונות החשמל
              </Link>
              .
            </p>

            <div className="not-prose my-6 rounded-l-xl border-r-4 border-red-600 bg-red-50 p-6">
              <h4 className="mb-2 text-lg font-bold text-red-900">
                לא כל רישיון מתיר עבודה עצמאית
              </h4>
              <p className="m-0 leading-relaxed text-red-900">
                רישיון חשמלאי עוזר ורישיון חשמלאי מעשי אינם מתירים לעבוד עצמאית
                ולחתום על עבודה, אלא רק תחת פיקוח. מי שמציג רישיון כזה כאישור
                לעבודה עצמאית מציג מסמך אמיתי בהקשר לא נכון.
              </p>
            </div>
          </section>

          <section aria-labelledby="yatza-tzadik">
            <h2 id="yatza-tzadik" className={H2}>
              עוקץ מדליית &quot;יצאת צדיק&quot;
            </h2>
            <p>
              התוכנית של חיים אתגר בערוץ 12 הפכה לאחת מחותמות האמינות החזקות
              בישראל, מפני שהיא בודקת בעלי מקצוע בשטח ובמצלמה נסתרת. נוכלים
              הבינו את עוצמת החותמת והתחילו לשאול אותה בלי לעבור אותה.
            </p>

            <h3 className={H3}>אין וידאו — אין אמונה</h3>
            <p>
              הלוגו של התוכנית הוא קובץ תמונה שאפשר להדביק על כל אתר. מי שבאמת
              נבדק ויצא צדיק יכול להציג קטע מהפרק עצמו — קול, תנועה ורצף שקשה
              מאין כמותו לזייף.
            </p>

            <h3 className={H3}>הצליבו מול מקור חיצוני</h3>
            <p>
              אימות שנמצא כולו באתר של הנבדק אינו אימות. בעמוד{" "}
              <Link href="/about" className={LINK}>
                אודות יהודה חכמוב
              </Link>{" "}
              מרוכזים קישורים לשידור ולסיקור המקורי, ומי שהדביק לוגו החודש לא
              ישאיר עקבות משנים קודמות.
            </p>
          </section>

          <section aria-labelledby="ai">
            <h2 id="ai" className={H2}>
              הסכנה החדשה: זיופים בעידן הבינה המלאכותית
            </h2>
            <p>
              עד לא מכבר זיוף תעודה דרש מיומנות גרפית וזמן. היום הוא דורש משפט
              אחד בתוכנת בינה מלאכותית חינמית ושלוש דקות.
            </p>
            <p>
              אפשר לייצר תעודת חשמלאי שנראית אותנטית, לשלב פנים אמיתיות בתמונה
              שלא צולמה מעולם, ולהעמיד אדם ליד דמות מוכרת מהטלוויזיה. המסקנה
              אינה לחשוד בכל אחד, אלא לשנות את סדר הבדיקה: קודם אימות במאגר
              רשמי, ורק אחר כך התרשמות.
            </p>

            {/* tabIndex מאפשר גלילה אופקית במקלדת כשהטבלה רחבה מהמסך */}
            <div
              role="region"
              aria-label="דרכי אימות מול זיופים שנוצרו בבינה מלאכותית"
              tabIndex={0}
              className="not-prose my-8 overflow-x-auto"
            >
              <table className="w-full min-w-[34rem] border-collapse text-right text-sm md:text-base">
                <caption className="mb-3 text-start text-sm text-slate-600">
                  מה שקל לזייף, לעומת הבדיקה שאי אפשר לעקוף.
                </caption>
                <thead>
                  <tr className="bg-slate-100">
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      מה שמוצג לכם
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      קלות הזיוף
                    </th>
                    <th scope="col" className="border border-slate-200 p-3 font-bold">
                      הבדיקה שמפריכה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תעודה או רישיון כתמונה
                    </th>
                    <td className="border border-slate-200 p-3">קל מאוד</td>
                    <td className="border border-slate-200 p-3">
                      חיפוש השם ומספר הרישיון בפנקס החשמלאים
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תמונה עם דמות מהטלוויזיה
                    </th>
                    <td className="border border-slate-200 p-3">קל מאוד</td>
                    <td className="border border-slate-200 p-3">
                      בקשת קטע וידאו וקישור למקור החיצוני
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      חשבונית מס על שם העסק
                    </th>
                    <td className="border border-slate-200 p-3">
                      קשה — מחייב עוסק מדווח
                    </td>
                    <td className="border border-slate-200 p-3">
                      התאמה בין שם העסק ושם בעל הרישיון
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <th
                      scope="row"
                      className="border border-slate-200 p-3 text-start font-bold"
                    >
                      תעודת בדיקה עם מדידות
                    </th>
                    <td className="border border-slate-200 p-3">
                      קשה מאוד — דורש מכשור
                    </td>
                    <td className="border border-slate-200 p-3">
                      דרישה לראות ערכי מדידה, לא סימון &quot;תקין&quot;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              שימו לב לכיוון: כל מה שנועד לשכנע קל לזייף, וכל מה שמחייב אדם
              אמיתי במערכת אמיתית — קשה.
            </p>
          </section>

          <section aria-labelledby="mechir">
            <h2 id="mechir" className={H2}>
              מלכודת הפיתיון: מחיר ביקור שמתנפח לאלפי שקלים
            </h2>
            <p>
              בטלפון מוצע מחיר ביקור נמוך במיוחד, והמטרה היחידה שלו היא שתיפתח
              הדלת. ברגע שהמתקין בפנים מתגלה פתאום &quot;סכנת שריפה
              מיידית&quot;, ותיקון קצר הופך להצעה של אלפי שקלים שצריך לאשר על
              המקום.
            </p>

            <h3 className={H3}>איך נראית הצעת מחיר תקינה</h3>
            <p>
              הצעה תקינה מפרידה בין מחיר האבחון לבין מחיר התיקון, ומפרטת את היקף
              העבודה ואת האחריות — בכתב, לפני תחילת העבודה. טווחי מחיר מקובלים
              מפורטים ב
              <Link href="/pricing" className={LINK}>
                מחירון השירותים
              </Link>
              , וכך אפשר להבין אם הסכום סביר או רחוק ממנו בסדר גודל.
            </p>

            <h3 className={H3}>משפטים שמדליקים נורה אדומה</h3>
            <ul>
              <li>
                <strong>&quot;אם לא נטפל עכשיו זה יישרף הלילה&quot;.</strong>{" "}
                סכנה אמיתית מטופלת בניתוק המעגל, לא בעסקה מיידית.
              </li>
              <li>
                <strong>&quot;בלי חשבונית יוצא זול יותר&quot;.</strong> בלי
                חשבונית אין אחריות ואין כיסוי ביטוחי.
              </li>
              <li>
                <strong>&quot;הפחת מקולקל, נוריד אותו בינתיים&quot;.</strong>{" "}
                זו הסרת ההגנה היחידה מפני התחשמלות.
              </li>
            </ul>
          </section>

          <section aria-labelledby="okatzim">
            <h2 id="okatzim" className={H2}>
              עוקצים נוספים שחוזרים על עצמם
            </h2>

            <h3 className={H3}>&quot;חברת החשמל שלחה אותי&quot;</h3>
            <p>
              עובדי חברת החשמל אינם מציעים עבודות פרטיות בבית ואינם גובים תשלום
              במקום. מי שממשיך משם להצעת מחיר פרטית אינו מטעמה.
            </p>

            <h3 className={H3}>&quot;אני הנדימן, אני עושה גם חשמל&quot;</h3>
            <p>
              עבודות חשמל אינן חלק מסל השירותים של הנדימן, גם אם הוא ישר לחלוטין
              בכל תחום אחר. הרחבה על הגבול ועל מה שקורה כשהוא נחצה מופיעה במאמר{" "}
              <Link href="/articles/handyman-vs-electrician" className={LINK}>
                הנדימן הוא לא חשמלאי
              </Link>
              .
            </p>

            <h3 className={H3}>החלפת רכיבים במקום איתור התקלה</h3>
            <p>
              נוכל מחליף רכיב אחרי רכיב עד שמשהו נראה עובד, ומחייב על כל אחד
              מהם. איתור תקלה מקצועי מתחיל במדידה, ולכן הוא גם זול יותר בסוף.
            </p>
          </section>

          <section aria-labelledby="mismachim">
            <h2 id="mismachim" className={H2}>
              מה שנוכל לעולם לא ייתן לכם
            </h2>
            <p>
              הדרך הפשוטה להבחין בין בעל מקצוע לבין מתחזה אינה לשאול שאלות
              מקצועיות, אלא לבקש מסמכים. מתחזה נעלם בדיוק בנקודה הזאת.
            </p>
            <p>
              בסיום עבודה במתקן אתם אמורים לקבל תעודת בדיקה חתומה, ובה ערכי
              מדידה בפועל: התנגדות הארקה, עכבת לולאת תקלה וזמן ניתוק של ממסרי
              הפחת. המספרים האלה הם ההוכחה היחידה שהמיגון יפעל בזמן אמת.
            </p>
          </section>

          <section aria-labelledby="mishpat">
            <h2 id="mishpat" className={H2}>
              מה נראה בתיקים שמגיעים לבית משפט
            </h2>
            <p>
              אני נותן חוות דעת מומחה לבתי משפט בתיקי חשמל, ובמקביל אני סטודנט
              למשפטים. השילוב מאפשר לראות את שני הצדדים של אותו סיפור: הכשל
              ההנדסי, ומה שקורה איתו בהמשך ההליך.
            </p>
            <p>
              התמונה חוזרת על עצמה. הנזק נגרם בדרך כלל מכשל פשוט וידוע, אבל מה
              שהופך את התיק לבעייתי הוא היעדר תיעוד. הלקוח נדרש להוכיח שהעבודה
              בוצעה בידי בעל רישיון מתאים — ומגלה שאין לו במה.
            </p>
            <p>
              במקביל לעבודה בשטח אני מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה
              אווירית, ומלמד את הפרקים שנוכלים מדלגים עליהם. לכן ההמלצה שלי
              מעשית: שמרו את צילום הרישיון, את ההתכתבות, את החשבונית ואת תעודת
              הבדיקה בתיקייה אחת.
            </p>
          </section>

          <section aria-labelledby="maase">
            <h2 id="maase" className={H2}>
              נפלתם בפח? מה עושים עכשיו
            </h2>
            <p>סדר הפעולות חשוב, ובטיחות קודמת לכסף.</p>
            <ol>
              <li>
                <strong>בדקו אם המתקן מסוכן.</strong> ריח חרוך, לוח חם למגע או
                קפיצות חוזרות מחייבים ניתוק המעגל ופנייה מיידית לבעל רישיון.
              </li>
              <li>
                <strong>תעדו הכול.</strong> התכתבות, מספר הטלפון שממנו נוצר
                הקשר, אישור תשלום ותמונות של העבודה.
              </li>
              <li>
                <strong>הזמינו בדיקה חוזרת.</strong> בעל רישיון יבדוק במדידה מה
                בוצע ויוציא תעודה — וזה גם המסמך שישמש אתכם בהמשך.
              </li>
              <li>
                <strong>הגישו תלונה ושקלו תביעה.</strong> עבודה ללא רישיון
                מדווחת למשרד העבודה, הטעיה צרכנית לרשות להגנת הצרכן, והחזר כספים
                נתבע בבית משפט לתביעות קטנות.
              </li>
            </ol>
            <p>
              ולפעם הבאה — כדאי לקרוא את המדריך{" "}
              <Link href="/articles/how-to-choose-electrician" className={LINK}>
                איך לבחור חשמלאי מוסמך
              </Link>{" "}
              עוד לפני שמתחילים לחפש.
            </p>
          </section>

          <section aria-labelledby="languages">
            <h2 id="languages" className={H2}>
              ייעוץ בעברית, ברוסית ובאנגלית
            </h2>
            <p>
              לקוחות שאינם דוברי עברית שוטפת חשופים יותר להטעיה, פשוט מפני שקשה
              יותר לקרוא מסמך ולשאול שאלות מדויקות. לכן הייעוץ ניתן בעברית,
              ברוסית ובאנגלית, ואפשר לשלוח הודעת וואטסאפ בכל שפה, לצרף הצעת מחיר
              שקיבלתם ולקבל חוות דעת ראשונית.
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
          heading="רוצים לדעת אם ההצעה שקיבלתם הגיונית?"
          description="רישיון החשמל, התעודות וההוקרה מ״יצאת צדיק״ מוצגים כאן בגלוי, ואשלח אותם עוד לפני ההגעה. אפשר להתקשר או לשלוח הודעת וואטסאפ בכל שפה ולקבל חוות דעת שנייה על הצעת מחיר."
          callPurpose="לבדיקת אמינות של הצעת מחיר ולתיאום ביקור בטוח"
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
