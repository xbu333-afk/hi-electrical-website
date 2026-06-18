import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description:
    "הצהרת הנגישות של ח.י שירותי חשמל — התאמות שבוצעו באתר, תמיכה בקוראי מסך, ניווט מקלדת ודרכי פנייה.",
  robots: { index: true, follow: true },
};

const H2 = "text-xl sm:text-2xl font-extrabold text-slate-900 mt-12 mb-4 leading-snug scroll-mt-24";
const H3 = "text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3 leading-snug scroll-mt-24";
const P = "text-slate-600 text-base leading-[1.9] mb-4";
const UL = "text-slate-600 text-base leading-[1.9] mb-4 list-none space-y-2";

export default function AccessibilityPage() {
  return (
    <>
      <header
        className="bg-white border-b border-gray-100 py-12 md:py-16"
        aria-labelledby="accessibility-title"
      >
        <div className="max-w-3xl mx-auto px-6">
          <nav aria-label="נתיב דפים" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap" role="list">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors">
                  דף הבית
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ›
              </li>
              <li className="text-slate-600 font-medium" aria-current="page">
                הצהרת נגישות
              </li>
            </ol>
          </nav>

          <h1
            id="accessibility-title"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3"
          >
            נגישות באתר
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            עודכן לאחרונה: יוני 2025
          </p>
        </div>
      </header>

      <div className="bg-slate-50 py-10 md:py-14">
        <article className="max-w-3xl mx-auto px-6">
          <section aria-labelledby="accessibility-intro">
            <h2 id="accessibility-intro" className="sr-only">
              רקע והתחייבות לנגישות
            </h2>
            <p className={P}>
              באתר <strong className="text-slate-900">ח.י שירותי חשמל</strong> אנו רואים חשיבות
              עליונה בהנגשת התכנים והשירותים הדיגיטליים לכלל הגולשים, כולל אנשים עם מוגבלויות.
              האתר תוכנן ונבנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות),
              תקן ישראלי <abbr title="תקן ישראלי 5568">ת&quot;י 5568</abbr> ברמת{" "}
              <abbr title="Level AA">AA</abbr>, ובהתאם להנחיות{" "}
              <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 רמה AA.
            </p>
          </section>

          <section aria-labelledby="accessibility-done">
            <h2 id="accessibility-done" className={H2}>
              התאמות נגישות שבוצעו באתר
            </h2>
            <ul className={UL} role="list">
              <li>✔ מבנה סמנטי ברור — כותרות, אזורים וניווט מסודרים</li>
              <li>✔ קישור &quot;דלג לתוכן הראשי&quot; בתחילת כל דף</li>
              <li>✔ תמיכה בניווט באמצעות מקלדת בלבד, כולל מצב מיקוד (<span lang="en">focus</span>) נראה לעין</li>
              <li>✔ תמיכה בקוראי מסך — תוויות <span lang="en">ARIA</span>, שמות נגישים לכפתורים וקישורים</li>
              <li>✔ טקסט חלופי לתמונות משמעותיות; תמונות דקораטיביות מסומנות כך שלא יפריעו לקורא מסך</li>
              <li>✔ האתר תומך בהגדלת תצוגה עד 200% באמצעות זום הדפדפן, ללא אובדן תוכן או פונקציונליות</li>
              <li>✔ ניגודיות צבעים מותאמת לקריאה נוחה על רקע בהיר</li>
              <li>✔ כיבוי אנימציות עבור משתמשים שהגדירו &quot;הפחתת תנועה&quot; במערכת ההפעלה</li>
              <li>✔ כיוון כתיבה מימין לשמאל (<span lang="en">RTL</span>) ושפת האתר מוגדרת כעברית</li>
            </ul>
          </section>

          <section aria-labelledby="accessibility-limits">
            <h2 id="accessibility-limits" className={H2}>
              מגבלות ידועות
            </h2>
            <p className={P}>
              סרטון YouTube המוטמע באתר מסופק על ידי Google. נגישותו כפופה למדיניות
              ולכלים של YouTube, וייתכנו חלקים שאינם נגישים במלואם.
            </p>
            <p className={P}>
              האתר אינו כולל ווידג&apos;ט נגישות חיצוני. ההתאמות מובנות בעיצוב ובקוד האתר,
              ובנוסף ניתן להשתמש בהגדרות הנגישות של הדפדפן ושל מערכת ההפעלה (הגדלת טקסט,
              ניגודיות, הקראה ועוד).
            </p>
          </section>

          <section aria-labelledby="accessibility-contact">
            <h2 id="accessibility-contact" className={H2}>
              מה עושים אם נתקלתם בקושי?
            </h2>
            <p className={P}>
              אם נתקלתם בבעיה כלשהי בגישה לאתר או בתוכנו — נשמח לשמוע מכם ולסייע:
            </p>
            <ul className={UL} role="list">
              <li>
                📞 טלפון:{" "}
                <a
                  href={`tel:${PHONE}`}
                  className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800 transition-colors"
                  aria-label={`התקשר ל-${PHONE_DISPLAY}`}
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                📧 דוא&quot;ל:{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800 transition-colors"
                  aria-label={`שלח דוא״ל לכתובת ${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
            <p className={P}>
              האתר ממשיך להתעדכן בהתאם לצורכי הנגישות. אנו נעשה את מירב המאמצים לטפל
              בכל פנייה בדחיפות ולשפר את חוויית הגלישה.
            </p>
          </section>

          <section aria-labelledby="accessibility-coordinator">
            <h2 id="accessibility-coordinator" className={H3}>
              רכז נגישות
            </h2>
            <p className={P}>
              יהודה חכמוב — בעל האתר ומפעיל השירות.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              ← חזרה לדף הבית
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
