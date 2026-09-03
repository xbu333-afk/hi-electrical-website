import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "תקנון ותנאי שימוש",
  description:
    "תנאי השימוש באתר ח.י שירותי חשמל — מידע מקצועי כללי, אזהרת בטיחות, הפרדה בין האתר לשירותים בפועל, וזכויות יוצרים.",
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
            תנאי שימוש
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
              תנאי שימוש אלה נועדו להסדיר את הגלישה והשימוש באתר{" "}
              <strong className="text-slate-900">ח.י שירותי חשמל</strong>{" "}
              (להלן: &quot;האתר&quot;). השימוש באתר ובתכנים המופיעים בו מהווה
              הסכמה לתנאים אלה.
            </p>
          </section>

          <section aria-labelledby="general-info">
            <h2 id="general-info" className={H2}>
              מידע מקצועי כללי
            </h2>
            <p className={P}>
              המידע המופיע באתר נועד לצורכי מידע, העשרה והבנה כללית, לרבות מידע
              מקצועי בתחום החשמל.
            </p>
            <p className={P}>
              התכנים באתר עשויים להתעדכן מעת לעת בהתאם לשינויים בדין, בתקנים,
              בהנחיות מקצועיות ובידע המקצועי.
            </p>
            <p className={P}>
              המידע באתר אינו מהווה תחליף לבדיקה מקצועית של מתקן חשמל מסוים. אין
              להסתמך על מידע המופיע באתר לצורך קבלת החלטה מעשית או ביצוע פעולה
              במתקן חשמל, ללא בדיקה מקצועית מתאימה בשטח על ידי חשמלאי בעל רישיון
              מתאים ובהתאם לנסיבות המקרה.
            </p>
          </section>

          <section aria-labelledby="safety">
            <h2 id="safety" className={H2}>
              עבודות חשמל ואזהרת בטיחות
            </h2>
            <p className={P}>
              ביצוע עבודות חשמל ללא רישיון מתאים אסור על פי דין ועלול לסכן חיים
              ורכוש.
            </p>
            <p className={P}>
              עבודות חשמל יש לבצע בהתאם להוראות הדין, לדרישות הרישוי החלות
              ולתקנים וההנחיות המקצועיים הרלוונטיים.
            </p>
            <p className={P}>
              אין לראות במידע המופיע באתר הנחיה לביצוע עבודת חשמל על ידי מי שאינו
              בעל ההכשרה והרישיון הנדרשים לכך.
            </p>
          </section>

          <section aria-labelledby="separation">
            <h2 id="separation" className={H2}>
              הפרדה בין השימוש באתר למתן שירותים
            </h2>
            <p className={P}>
              תנאי שימוש אלה מתייחסים לשימוש באתר ולתכנים המפורסמים בו בלבד.
            </p>
            <p className={P}>
              תנאים אלה אינם מהווים הסכם לביצוע עבודות חשמל ואינם גורעים מהוראות
              כל דין.
            </p>
            <p className={P}>
              תנאי ההתקשרות, היקף השירות, התמורה, האחריות וכל תנאי אחר הנוגע
              לשירות שיינתן בפועל ללקוח, ייקבעו בהתאם להצעת המחיר, להזמנת העבודה
              ולמסמכים הרלוונטיים שיימסרו או יאושרו במסגרת ההתקשרות עם הלקוח.
            </p>
          </section>

          <section aria-labelledby="copyright">
            <h2 id="copyright" className={H2}>
              זכויות יוצרים וקניין רוחני
            </h2>
            <p className={P}>
              כל הזכויות בתכנים המופיעים באתר, לרבות מאמרים, מדריכים, טקסטים,
              תמונות, גרפיקה, עיצוב, לוגו ותכנים מקוריים אחרים, שמורות ל־
              <strong className="text-slate-900">ח.י שירותי חשמל</strong>, אלא
              אם צוין אחרת.
            </p>
            <p className={P}>
              אין להעתיק, לשכפל, להפיץ, לפרסם, להציג, לעבד או לעשות שימוש מסחרי
              בתכנים המופיעים באתר, כולם או חלקם, ללא קבלת אישור מראש ובכתב מבעל
              הזכויות, למעט שימוש המותר במפורש על פי דין.
            </p>
          </section>

          <section aria-labelledby="updates">
            <h2 id="updates" className={H2}>
              עדכון תנאי השימוש
            </h2>
            <p className={P}>
              ח.י שירותי חשמל רשאית לעדכן את תנאי השימוש מעת לעת. הנוסח המעודכן
              של תנאי השימוש יפורסם באתר ויחול ממועד פרסומו, בכפוף להוראות כל
              דין.
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
