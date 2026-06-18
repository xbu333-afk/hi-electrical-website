import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "למה ממסר הפחת קופץ ואיך מסדרים את זה? | ח.י שירותי חשמל",
  description:
    "החשמל קפץ ואי אפשר להרים את המתג? מדריך מעשי ופשוט לאיתור התקלה. מה מותר לעשות לבד ומתי חייבים לקרוא לחשמלאי מוסמך.",
  alternates: {
    canonical: `${SITE_URL}/articles/mimsar-pahat`,
  },
  openGraph: {
    title: "למה ממסר הפחת קופץ (ומה עושים עכשיו)?",
    description:
      "מדריך חירום פשוט — מה לעשות כשהפחת קופץ ומתי חייבים לקרוא לחשמלאי מוסמך.",
  },
};

const TOC = [
  { id: "mah-ze", label: "מה זה בכלל ממסר פחת?" },
  { id: "lama-kopetz", label: "למה הוא קופץ?" },
  { id: "mah-laasot", label: "המדריך המעשי — מה לעשות?" },
  { id: "matai", label: "מתי אסור לשחק וחייבים חשמלאי?" },
] as const;

export default function MimsarPahatArticle() {
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
              ממסר פחת
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span>מדריך חירום</span>
            <span aria-hidden="true">•</span>
            <span>קריאה קצרה</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            למה ממסר הפחת קופץ (ומה עושים עכשיו)?
          </h1>
          <p className="text-xl text-slate-600 font-medium text-center md:text-right">
            מאת:{" "}
            <Link href="/" className="text-emerald-600 hover:underline">
              יהודה חכמוב, הנדסאי חשמל וחשמלאי מוסמך
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

        <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none">
          <p className="text-xl leading-relaxed mb-10 text-slate-700 font-medium">
            החשמל קופץ באמצע הלילה או באמצע המקלחת? זה מתסכל, אבל לפני שאתם
            מתעצבנים – דעו שממסר הפחת פשוט עושה את העבודה שלו: הוא מציל לכם את
            החיים. בואו נבין בשפה פשוטה מה קרה ואיך פותרים את זה.
          </p>

          <div
            id="mah-ze"
            className="bg-emerald-50 rounded-2xl p-8 mb-12 border border-emerald-100 scroll-mt-24 not-prose"
          >
            <h2 className="text-2xl font-bold text-emerald-900 mt-0 mb-4">
              מה זה בכלל ממסר פחת?
            </h2>
            <p className="text-emerald-800 m-0 leading-relaxed">
              זהו הכפתור הראשי בלוח החשמל שלכם (לרוב מסומן ב-T או TEST). התפקיד
              שלו הוא לזהות אם חשמל &quot;בורח&quot; מהחוטים (למשל, למים שעל
              הרצפה או חלילה לאדם שנוגע במכשיר). אם הוא מזהה דליפה קטנה ביותר,
              הוא מנתק את כל החשמל בבית בתוך שבריר שנייה.
            </p>
          </div>

          <h2
            id="lama-kopetz"
            className="text-3xl font-black text-slate-900 mb-6 scroll-mt-24"
          >
            למה הוא קופץ? (החשודים המיידיים)
          </h2>
          <ul className="space-y-4 mb-10 text-slate-700 marker:text-emerald-500">
            <li>
              <strong>מכשיר חשמלי תקול:</strong> מקרר ישן, קומקום, או לרוב – גוף
              החימום של דוד השמש. ברגע שהבידוד שלהם נהרס, החשמל זולג, והפחת קופץ.
            </li>
            <li>
              <strong>לחות או מים:</strong> שקע במרפסת שנרטב מהגשם או אדים חמים
              במקלחת שנכנסו למנורה. מים וחשמל לא חברים.
            </li>
            <li>
              <strong>חוטים ישנים בבית:</strong> בבתים ישנים, החוטים שבתוך
              הקירות מתבלים.
            </li>
            <li>
              <strong>הפחת עצמו התעייף:</strong> כמו כל מכשיר, גם לפחת יש תוחלת
              חיים. אחרי 10-15 שנים הוא עשוי להתעייף ולקפוץ מכל שטות.
            </li>
          </ul>

          <h2
            id="mah-laasot"
            className="text-3xl font-black text-slate-900 mt-12 mb-8 scroll-mt-24"
          >
            המדריך המעשי: מה לעשות כשהפחת קופץ?
          </h2>

          <div className="space-y-6 mb-12 not-prose">
            <div className="flex gap-4">
              <div
                className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl"
                aria-hidden="true"
              >
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mt-0 mb-2 text-slate-900">
                  נתקו את הכל
                </h3>
                <p className="m-0 text-slate-600 leading-relaxed">
                  גשו ללוח החשמל והורידו את כל הפקקים הקטנים למטה. השאירו רק את
                  מפסק הפחת ואת הראשי.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl"
                aria-hidden="true"
              >
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mt-0 mb-2 text-slate-900">
                  הרימו את הפחת
                </h3>
                <p className="m-0 text-slate-600 leading-relaxed">
                  נסו להרים את הפחת למעלה. אם הוא קופץ חזרה למטה מיד כשהכל מנותק
                  – אל תגעו בכלום. יש בעיה בלוח או בפחת עצמו. קראו מיד ל
                  <Link href="/" className="text-emerald-600 font-bold hover:underline">
                    חשמלאי מוסמך
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl"
                aria-hidden="true"
              >
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mt-0 mb-2 text-slate-900">
                  משחק הבלש
                </h3>
                <p className="m-0 text-slate-600 leading-relaxed">
                  אם הפחת נשאר למעלה, התחילו להרים את הפקקים הקטנים אחד אחד,
                  לאט. ברגע שתרמו פקק מסוים והפחת יקפוץ – בינגו! מצאתם את האזור
                  הבעייתי. נתקו את המכשירים מאותו אזור (למשל המטבח) ונסו שוב.
                </p>
              </div>
            </div>
          </div>

          <div
            id="matai"
            className="bg-red-50 border-r-4 border-red-500 p-6 rounded-l-xl my-10 scroll-mt-24 not-prose"
            role="alert"
          >
            <h3 className="text-xl font-bold text-red-900 mt-0 mb-2">
              מתי אסור לשחק וחייבים להזמין חשמלאי?
            </h3>
            <ul className="text-red-800 m-0 space-y-2 list-disc list-outside me-5">
              <li>הפחת קופץ ואי אפשר להרים אותו בכלל.</li>
              <li>יש ריח של פלסטיק שרוף באזור לוח החשמל.</li>
              <li>אתם לא מצליחים לאתר את המכשיר הבעייתי והבית חשוך.</li>
              <li>המכשיר הבעייתי הוא הדוד או המזגן (מצריך טכנאי או חשמלאי).</li>
            </ul>
            <p className="text-red-800 mt-4 mb-0 leading-relaxed">
              במקרים כאלה מומלץ{" "}
              <Link href="/services" className="font-bold text-red-900 hover:underline">
                לבדוק את לוח החשמל
              </Link>{" "}
              או{" "}
              <Link href="/services" className="font-bold text-red-900 hover:underline">
                להזמין בדיקה
              </Link>{" "}
              מקצועית — אל תנסו לתקן לבד.
            </p>
          </div>

          <p className="text-slate-600">
            הערה: צריכת חשמל חריגה ומכשירים מקצרים משפיעים ישירות על החשבון
            שלכם. תוכלו להיעזר ב
            <Link href="/calculator" className="text-emerald-600 hover:underline">
              מחשבון עלויות החשמל שלנו
            </Link>{" "}
            כדי לבדוק אם יש לכם צריכה מוגזמת.
          </p>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4">עדיין בחושך? אנחנו כאן!</h2>
          <p className="text-slate-300 mb-8 text-lg leading-relaxed">
            אל תיקחו סיכונים מיותרים עם החשמל בבית.{" "}
            <Link
              href="/services"
              className="text-emerald-400 hover:underline font-bold"
            >
              צוות ח.י שירותי חשמל
            </Link>{" "}
            זמין 24/7 לטיפול בקצרים והחלפת מפסקי פחת (למעט שבתות וחגים).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`לחיוג חירום: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg"
            >
              לחיוג חירום: {PHONE_DISPLAY}
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
