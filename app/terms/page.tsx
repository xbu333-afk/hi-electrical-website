import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "תקנון ותנאי שימוש",
  description:
    "תקנון ותנאי השימוש באתר ח.י שירותי חשמל — מידע מקצועי כללי, אזהרת בטיחות, הפרדה בין האתר לשירותים בפועל, וזכויות יוצרים.",
  robots: { index: true, follow: true },
};

const H2 =
  "text-xl sm:text-2xl font-extrabold text-slate-900 mt-12 mb-4 leading-snug scroll-mt-24";
const P = "text-slate-600 text-base leading-[1.9] mb-4";

export default function TermsPage() {
  return (
    <>
      <header
        className="border-b border-gray-100 bg-white py-12 md:py-16"
        aria-labelledby="terms-title"
      >
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="נתיב דפים" className="mb-6">
            <ol
              className="flex list-none flex-wrap items-center gap-2 text-xs text-slate-400"
              role="list"
            >
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-emerald-700"
                >
                  דף הבית
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ›
              </li>
              <li className="font-medium text-slate-600" aria-current="page">
                תקנון ותנאי שימוש
              </li>
            </ol>
          </nav>

          <h1
            id="terms-title"
            className="mb-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl md:text-4xl"
          >
            תקנון ותנאי שימוש
          </h1>
          <p className="text-sm font-semibold text-slate-500">
            עודכן לאחרונה: ספטמבר 2026
          </p>
        </div>
      </header>

      <div className="bg-slate-50 py-10 md:py-14">
        <article className="mx-auto max-w-3xl px-6">
          <section aria-labelledby="intro">
            <h2 id="intro" className="sr-only">
              מבוא
            </h2>
            <p className={`${P} mt-0`}>
              תנאי שימוש אלה נועדו להסדיר את הגלישה והשימוש באתר ח.י שירותי
              חשמל.
            </p>
          </section>

          <section aria-labelledby="general-info">
            <h2 id="general-info" className={H2}>
              מידע מקצועי כללי
            </h2>
            <p className={P}>
              המידע באתר נועד לצורכי מידע, העשרה והבנה כללית. התכנים עשויים
              להתעדכן מעת לעת בהתאם לשינויים בדין, בתקנים, בהנחיות מקצועיות
              ובידע המקצועי. אין להסתמך על מידע המופיע באתר לצורך קבלת החלטה
              מעשית ביחס למתקן חשמל מסוים, ללא בדיקה מקצועית מתאימה בשטח על ידי
              בעל מקצוע.
            </p>
          </section>

          <section aria-labelledby="safety">
            <h2 id="safety" className={H2}>
              עבודות חשמל ואזהרת בטיחות
            </h2>
            <p className={P}>
              ביצוע עבודות חשמל ללא רישיון מתאים אסור על פי דין ומסכן חיים. כל
              עבודת חשמל חייבת להתבצע בהתאם למסגרת החוק והרישוי בישראל.
            </p>
          </section>

          <section aria-labelledby="separation">
            <h2 id="separation" className={H2}>
              הפרדה בין השימוש באתר למתן שירותים
            </h2>
            <p className={P}>
              תנאי שימוש אלה מתייחסים לשימוש באתר ולתכנים המפורסמים בו בלבד. הם
              אינם גורעים מהוראות כל דין ואינם מהווים הסכם לביצוע עבודות חשמל.
              תנאי ההתקשרות והאחריות ביחס לשירותים שיינתנו בפועל, ייקבעו באופן
              פרטני בהתאם להצעת המחיר, להזמנת העבודה ולמסמכים הרלוונטיים שיימסרו
              ללקוח.
            </p>
          </section>

          <section aria-labelledby="copyright">
            <h2 id="copyright" className={H2}>
              זכויות יוצרים
            </h2>
            <p className={P}>
              כל הזכויות שמורות ל־ח.י שירותי חשמל. אין להעתיק, לשכפל, להפיץ או
              לעשות שימוש מסחרי בתכנים, מאמרים, ותמונות באתר ללא אישור מראש
              ובכתב.
            </p>
          </section>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              ← חזרה לדף הבית
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
