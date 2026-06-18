import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדריך רישיונות חשמל: מה ההבדל בין עוזר, מוסמך, הנדסאי ובודק? | ח.י שירותי חשמל",
  description:
    "לא כל חשמלאי מורשה לבצע כל עבודה. מדריך מקיף לסוגי הרישיונות בישראל: מי רשאי לחתום על לוח תלת-פאזי, איפה זה מופיע ברישיון, וממה כדאי להיזהר.",
  alternates: {
    canonical: `${SITE_URL}/articles/electrical-licenses-guide`,
  },
  openGraph: {
    title: "מדריך רישיונות חשמל בישראל",
    description:
      "עוזר, מעשי, מוסמך, ראשי, הנדסאי ובודק — מה מותר למי ואיך בודקים.",
  },
};

const TOC = [
  { id: "madregot", label: "מדרג הרישיונות" },
  { id: "eich-bodkim", label: "איפה זה מופיע ואיך בודקים?" },
] as const;

export default function ElectricalLicensesArticle() {
  return (
    <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <nav aria-label="נתיב דפים" className="mb-8">
          <ol
            className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap"
            role="list"
          >
            <li>
              <Link href="/" className="hover:text-emerald-700 transition-colors">
                דף הבית
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li>
              <Link href="/articles" className="hover:text-emerald-700 transition-colors">
                כלים ומדריכים
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li className="text-slate-600 font-medium" aria-current="page">
              מדריך רישיונות
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              מדריך צרכנות חכמה
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            עוזר, מוסמך או הנדסאי? כל מה שצריך לדעת על רישיונות חשמל
          </h1>
          <p className="text-xl text-slate-600 font-medium text-center md:text-right">
            מאת:{" "}
            <Link href="/" className="text-emerald-600 hover:underline font-bold">
              יהודה חכמוב — הנדסאי חשמל
            </Link>
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
                <a href={`#${id}`} className="hover:text-emerald-700 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none marker:text-emerald-500">
          <p className="text-xl leading-relaxed mb-10 text-slate-700 font-medium">
            הזמנתם חשמלאי הביתה ושאלתם אם יש לו רישיון? מצוין. אבל האם ידעתם שלא כל
            רישיון מאפשר לאותו אדם לבצע כל עבודה? בישראל קיימת היררכיה ברורה של
            רישיונות חשמל, המוגדרת על פי גודל הזרם החשמלי (אמפר) שבו רשאי בעל
            המקצוע לטפל. בואו נעשה סדר כדי שתדעו את מי בדיוק אתם מכניסים הביתה.
          </p>

          <h2
            id="madregot"
            className="text-3xl font-black text-slate-900 mb-6 scroll-mt-24"
          >
            מדרג הרישיונות: מה מותר למי?
          </h2>

          <div className="space-y-6 mb-12 not-prose">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mt-0 mb-2">
                1. חשמלאי עוזר
              </h3>
              <p className="text-slate-600 m-0 leading-relaxed">
                הדרגה הבסיסית ביותר. חשמלאי עוזר{" "}
                <strong>אינו רשאי לעבוד לבד בשום פנים ואופן</strong>. הוא יכול
                לבצע עבודות חשמל רק תחת פיקוח צמוד והשגחה של חשמלאי בדרגה גבוהה
                יותר (מוסמך ומעלה).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mt-0 mb-2">
                2. חשמלאי מעשי
              </h3>
              <p className="text-slate-600 m-0 leading-relaxed">
                רשאי לבצע עבודות בסיסיות ולחתום על תוכניות במתקנים בעלי חיבור
                חד-פאזי בלבד (עד 1x40 אמפר). הוא <strong>אינו מורשה</strong> לגעת
                בלוחות תלת-פאזיים או במערכות מתקדמות הדורשות הספקים גבוהים.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900 mt-0 mb-2">
                3. חשמלאי מוסמך
              </h3>
              <p className="text-emerald-800 m-0 leading-relaxed">
                זהו הסטנדרט הזהב לרוב הבתים בישראל.{" "}
                <Link href="/" className="font-bold underline text-emerald-900">
                  חשמלאי מוסמך
                </Link>{" "}
                רשאי לבצע עבודות חשמל עד לגודל של תלת-פאזי 3x80 אמפר. הרישיון
                מאפשר לו לטפל בלוחות חשמל ביתיים, עמדות טעינה לרכב, תשתיות כבדות
                ושדרוגים מורכבים במגזר הפרטי והעסקי.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900 mt-0 mb-2">
                4. חשמלאי ראשי
              </h3>
              <p className="text-emerald-800 m-0 leading-relaxed">
                רשאי לבצע ולתכנן עבודות במתקנים בעלי זרם של עד 3x250 אמפר. מתאים
                לעבודות תעשייתיות, בנייני מגורים ופרויקטים מסחריים בינוניים.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900 mt-0 mb-2">
                5. הנדסאי חשמל ומהנדס חשמל
              </h3>
              <p className="text-emerald-800 m-0 leading-relaxed">
                הדרגות ההנדסיות.{" "}
                <Link href="/" className="font-bold underline text-emerald-900">
                  הנדסאי חשמל
                </Link>{" "}
                רשאי לתכנן ולבצע עבודות בהספקים עצומים (לרוב עד 3x630 אמפר). זוהי
                דרגת סמכות גבוהה המעידה על לימודי הנדסאים מעמיקים של מספר שנים,
                הבנה אקדמית של מערכות והיכרות מעמיקה עם תקנות הבטיחות המחמירות
                ביותר. (מהנדס חשמל מוסמך לעבודות ללא הגבלת זרם כלל).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-900 mt-0 mb-2">
                6. בודק חשמל (סוג 1, 2, 3)
              </h3>
              <p className="text-emerald-800 m-0 leading-relaxed">
                גורם מפקח (לרוב מהנדס או הנדסאי שעברו הכשרה נוספת). תפקידו אינו
                לבצע את העבודה אלא לאשר אותה חוקית אל מול חברת החשמל והרשויות,
                לבדוק את טיב ההארקה, ולהפיק דוחות בטיחות (לכיבוי אש או חברות
                ביטוח).
              </p>
            </div>
          </div>

          <h2
            id="eich-bodkim"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            איפה זה מופיע ואיך בודקים?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            לכל חשמלאי מורשה יש תעודת פלסטיק כחולה/ירוקה מטעם רשות החשמל במשרד
            הכלכלה. על התעודה מופיע בבירור:
            <br />
            1. שם בעל הרישיון ות.ז.
            <br />
            2. תוקף הרישיון.
            <br />
            3. <strong>סוג הרישיון</strong> (מעשי, מוסמך, ראשי וכו&apos;).
            <br />
            <br />
            אם אתם מחפשים אמינות מעל לכל ספק, ודאו שאתם מזמינים{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי מומלץ
            </Link>{" "}
            שלא מסתיר את הרישיון שלו, שולח לכם צילום שלו מראש, ואוחז בהסמכה
            הדרושה בדיוק לעבודה שלכם.
          </p>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            עבודות חשמל ברמת הנדסאי
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            אצלנו ב
            <Link href="/" className="text-emerald-400 hover:underline font-bold">
              ח.י שירותי חשמל
            </Link>{" "}
            העבודה מתבצעת תחת ידע ותעודת הנדסאי חשמל ורישיון מוסמך ראשי בתוקף,
            המאפשרים לנו לתת מענה מקצועי, בטוח ומקיף לכל תקלה או תכנון מערכת.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`צרו קשר לייעוץ וביקור: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg"
            >
              צרו קשר לייעוץ וביקור
            </a>
          </div>
        </div>
      </article>

      <nav
        aria-label="ניווט מאמרים"
        className="max-w-4xl mx-auto mt-8 flex items-center justify-between text-sm"
      >
        <Link
          href="/articles"
          className="text-slate-500 hover:text-emerald-700 font-medium transition-colors"
        >
          ← כל המאמרים
        </Link>
        <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
          דף הבית
        </Link>
      </nav>
    </div>
  );
}
