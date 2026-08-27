import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";
import { buildArticleJsonLd } from "@/lib/articles";
import { jsonLdScriptProps } from "@/lib/schema";

const LINK_FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2";

export const metadata: Metadata = {
  title: "החזרת חשמל אחרי ניתוק חברת חשמל | חשמלאי ראשי",
  description:
    "נותקתם מהחשמל? מדריך מלא להחזרת חשמל אחרי ניתוק חברת חשמל — שלבים, חשמלאי ראשי ואישור תקינות לחיבור מחדש.",
  alternates: {
    canonical: `${SITE_URL}/articles/hachzarat-hashmal`,
  },
  openGraph: {
    title: "נותקתם מהחשמל? מדריך להחזרת החיבור מול חברת החשמל",
    description:
      "למה מנתקים, איך מחזירים חשמל בבטחה, ומתי חובה חשמלאי ראשי ואישור תקינות.",
  },
};

const TOC = [
  { id: "lama-menatkot", label: "למה חברת החשמל מנתקת בתים?" },
  { id: "tahalich", label: "התהליך להחזרת החשמל – שלב אחר שלב" },
  { id: "lama-anachnu", label: 'למה לבחור ב"ח.י שירותי חשמל"?' },
] as const;

export default function HachzaratHashmalArticle() {
  return (
    <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <script {...jsonLdScriptProps(buildArticleJsonLd("hachzarat-hashmal"))} />

      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <nav aria-label="נתיב דפים" className="mb-8">
          <ol
            className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap"
            role="list"
          >
            <li>
              <Link
                href="/"
                className={`hover:text-emerald-700 transition-colors ${LINK_FOCUS}`}
              >
                דף הבית
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li>
              <Link
                href="/articles"
                className={`hover:text-emerald-700 transition-colors ${LINK_FOCUS}`}
              >
                כלים ומדריכים
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li className="text-slate-600 font-medium" aria-current="page">
              החזרת חשמל
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4 text-sm justify-center md:justify-start">
            <span>מדריך חירום</span>
            <span aria-hidden="true">•</span>
            <span>חברת החשמל</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            נותקתם מהחשמל? המדריך המלא להחזרת החיבור מול חברת החשמל
          </h1>
          <p className="text-xl text-slate-600 font-medium text-center md:text-right">
            מאת: יהודה חכמוב — הנדסאי חשמל וחשמלאי מוסמך
          </p>
        </header>

        <nav
          aria-label="תוכן עניינים"
          className="bg-slate-50 border border-gray-200 rounded-2xl p-6 mb-12 not-prose"
        >
          <h2 className="text-slate-900 text-sm font-bold uppercase tracking-wider mb-4">
            תוכן עניינים
          </h2>
          <ol className="space-y-2 text-sm list-decimal list-inside text-slate-600">
            {TOC.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`hover:text-emerald-700 transition-colors ${LINK_FOCUS}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none marker:text-emerald-500 text-base leading-relaxed">
          <p className="text-xl leading-relaxed mb-6 text-slate-700 font-medium">
            לקום בבוקר (או לחזור מהעבודה) ולגלות שחברת החשמל ניתקה אתכם מהרשת, זה
            אחד המצבים המלחיצים ביותר שיש. מעבר לפגיעה המיידית בשגרת החיים –
            המקרר מפשיר, אין מים חמים, והבית בעלטה – מתלווה לזה בדרך כלל גם תחושת
            חוסר אונים מול הבירוקרטיה של חברת החשמל.
          </p>
          <p className="text-slate-600 leading-relaxed mb-10">
            <strong>
              חשוב לדעת: ניתוק יזום על ידי חברת החשמל, בייחוד מסיבות בטיחותיות,
              דורש התערבות מקצועית של חשמלאי.
            </strong>{" "}
            אי אפשר פשוט &quot;להרים את הפקק&quot;. במאמר זה נסביר מדוע זה קורה,
            ומהם השלבים המדויקים להחזרת החשמל לביתכם במהירות ובבטחה.
          </p>

          <section aria-labelledby="lama-menatkot" className="mb-10">
            <h2
              id="lama-menatkot"
              className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
            >
              למה חברת החשמל מנתקת בתים מרשת החשמל?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              מעבר לניתוק בגין חובות כספיים (שנפתר לרוב מול מוקד שירות הלקוחות),
              הניתוקים המורכבים יותר נובעים מסיבות טכניות ובטיחותיות. חברת החשמל
              מחויבת לחוק החשמל, ואם קיים חשש לחיי אדם או לרכוש, היא תנתק את
              הזרם באופן מיידי. אלו הסיבות הנפוצות:
            </p>
            <ul className="space-y-3 text-slate-700 mb-6">
              <li>
                <strong>סכנה בטיחותית חמורה:</strong> שריפה שפרצה בארון החשמל,
                חדירת מים מסיבית ללוח, או קצר משמעותי שמעמיד את הבניין בסכנה.
              </li>
              <li>
                <strong>חיבורים פיראטיים או גניבת חשמל:</strong> ביצוע שינויים
                פיראטיים במונה או בקווי ההזנה הראשיים.
              </li>
              <li>
                <strong>פיצול דירות לא חוקי:</strong> עומס יתר על תשתית שלא נועדה
                לכך בעקבות פיצול דירה ללא אישורים מתאימים.
              </li>
              <li>
                <strong>צו רשות מוסמכת:</strong> דרישה של משטרת ישראל, כיבוי אש
                או הרשות המקומית לנתק את המבנה מסיבות בטיחות או עבירות בנייה.
              </li>
              <li>
                <strong>ליקויים שנמצאו בביקורת:</strong> אם בודק של חברת החשמל
                גילה ליקויים מהותיים בתשתית (כמו חוסר בהארקה תקינה) ונתן שהות
                לתיקון שלא בוצע.
              </li>
            </ul>
          </section>

          <section aria-labelledby="tahalich" className="mb-10">
            <h2
              id="tahalich"
              className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
            >
              התהליך להחזרת החשמל – שלב אחר שלב
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              כאשר הניתוק נובע מסיבה בטיחותית או טכנית,{" "}
              <strong>
                חברת החשמל תסרב לחבר אתכם חזרה עד שאיש מקצוע מוסמך ייקח אחריות על
                התשתית שלכם ויוכיח שהיא תקינה.
              </strong>
            </p>

            <h3
              id="shlav-1"
              className="text-xl font-bold text-slate-800 mb-3 scroll-mt-24"
            >
              שלב 1: הבנת הדרישה (קבלת דו&quot;ח ליקויים)
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              חברת החשמל לרוב משאירה מסמך או מעדכנת במוקד מהי סיבת הניתוק המדויקת
              ומהן הדרישות לחיבור מחדש.
            </p>

            <h3
              id="shlav-2"
              className="text-xl font-bold text-slate-800 mb-3 scroll-mt-24"
            >
              שלב 2: הזמנת חשמלאי מוסמך/ראשי
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              זהו השלב הקריטי ביותר. עליכם להזמין{" "}
              <Link
                href="/"
                className={`text-emerald-700 font-bold hover:underline ${LINK_FOCUS}`}
              >
                חשמלאי מוסמך/ראשי
              </Link>{" "}
              בעל רישיון מתאים (בהתאם לגודל החיבור בנכס) שיבצע בדיקה מקיפה של
              התשתית.
            </p>

            <h3
              id="shlav-3"
              className="text-xl font-bold text-slate-800 mb-3 scroll-mt-24"
            >
              שלב 3: תיקון הליקויים בשטח
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              החשמלאי יבצע{" "}
              <Link
                href="/"
                className={`text-emerald-700 font-bold hover:underline ${LINK_FOCUS}`}
              >
                תיקון הליקויים
              </Link>{" "}
              שהובילו לניתוק, כגון החלפת לוח, תיקון מערכת הארקה, או בידוד קווים.
            </p>

            <h3
              id="shlav-4"
              className="text-xl font-bold text-slate-800 mb-3 scroll-mt-24"
            >
              שלב 4: הפקת אישור תקינות (טופס חשמלאי)
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              לאחר סיום העבודה, החשמלאי מפיק{" "}
              <strong>אישור תקינות מתקן חשמלי</strong> – תעודת הביטוח שלכם מול
              חברת החשמל.
            </p>

            <h3
              id="shlav-5"
              className="text-xl font-bold text-slate-800 mb-3 scroll-mt-24"
            >
              שלב 5: ניהול הבקשה והזמנת ביקורת חברת החשמל
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              את האישור מגישים למחלקת הרשת. במקרים רבים נדרשת ביקורת בשטח של בודק
              מטעם חברת החשמל.
            </p>
          </section>

          <section aria-labelledby="lama-anachnu" className="mb-6">
            <h2
              id="lama-anachnu"
              className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
            >
              למה לבחור ב&quot;ח.י שירותי חשמל&quot; לניהול התהליך?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              החזרת חשמל לדירה מנותקת דורשת מיומנות והיכרות מעמיקה עם נהלי העבודה
              של חברת החשמל. אצלנו ב
              <Link
                href="/"
                className={`text-emerald-700 font-bold hover:underline ${LINK_FOCUS}`}
              >
                ח.י שירותי חשמל
              </Link>
              , אנו מתמחים בטיפול במקרי חירום והחזרת חיבורים מנותקים:
            </p>
            <ul className="space-y-3 text-slate-700 mb-8">
              <li>
                <strong>רישוי בכיר:</strong> אנו פועלים תחת רישיון הנדסאי חשמל
                וחשמלאי ראשי, מה שמאפשר לנו לאשר ולטפל במתקנים מורכבים וגדולים.
              </li>
              <li>
                <strong>ניהול התיק מא&apos; ועד ת&apos;:</strong> מכינים את
                הניירת, מפיקים אישורים, ומנהלים את השיח הבירוקרטי והטכני מול
                פקידי ובודקי חברת החשמל.
              </li>
              <li>
                <strong>זמינות ומקצועיות:</strong> פועלים ביעילות המרבית כדי
                לקצר את זמני ההמתנה ולהחזיר אתכם לשגרה מהר ככל האפשר, תוך עמידה
                בתקני הבטיחות המחמירים ביותר.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-6 text-lg">
              <strong>
                נותקתם מהחשמל? אל תבזבזו זמן יקר על ניסיונות מול הבירוקרטיה. צרו
                איתנו קשר עכשיו, ואנחנו נדאג להחזיר לכם את האור הביתה בדרך
                המקצועית, הבטוחה והמהירה ביותר.
              </strong>
            </p>
          </section>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            צריכים החזרת חשמל עכשיו?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            נטפל בליקויים, נפיק אישור תקינות ונדאג לניהול מול חברת החשמל — עד
            שהאור חוזר הביתה.
          </p>
          <a
            href={`tel:${PHONE}`}
            aria-label={`חייגו להחזרת חשמל: ${PHONE_DISPLAY}`}
            className={`inline-flex bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30 ${LINK_FOCUS} focus-visible:ring-offset-slate-900`}
          >
            חייגו עכשיו: {PHONE_DISPLAY}
          </a>
        </div>
      </article>

      <nav
        aria-label="ניווט מאמרים"
        className="max-w-4xl mx-auto mt-8 flex items-center justify-between text-sm"
      >
        <Link
          href="/articles"
          className={`text-slate-500 hover:text-emerald-700 font-medium transition-colors ${LINK_FOCUS}`}
        >
          ← כל המאמרים
        </Link>
        <Link
          href="/"
          className={`text-slate-400 hover:text-slate-700 transition-colors ${LINK_FOCUS}`}
        >
          דף הבית
        </Link>
      </nav>
    </div>
  );
}
