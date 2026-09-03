import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "תקנון ותנאי שימוש",
  description:
    "תקנון ותנאי השימוש באתר ח.י שירותי חשמל — הגבלת אחריות, אזהרה חוקית לגבי עבודות חשמל, וזכויות יוצרים.",
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
            <h2 id="intro" className={H2}>
              מבוא
            </h2>
            <p className={P}>
              אתר זה מופעל על ידי{" "}
              <strong className="text-slate-900">ח.י שירותי חשמל</strong>{" "}
              (להלן: &quot;האתר&quot; או &quot;בעל האתר&quot;). הגלישה באתר,
              השימוש בתכניו — לרבות מאמרים, מדריכים, מחשבונים ומידע מקצועי —
              והפנייה דרכו מהווים הסכמה לתקנון ולתנאי שימוש אלה. אם אינך מסכים
              לתנאים אלה, הנך מתבקש להימנע משימוש באתר.
            </p>
          </section>

          <section aria-labelledby="disclaimer">
            <h2 id="disclaimer" className={H2}>
              הגבלת אחריות והעדר ייעוץ מקצועי
            </h2>
            <p className={P}>
              כל התכנים באתר, ובכלל זה מאמרים, מדריכים, הסברים טכניים, דוגמאות
              ותרחישים, מוצגים{" "}
              <strong className="text-slate-900">
                לצורכי לימוד, העשרה והבנה כללית בלבד
              </strong>
              . אין בהם משום ייעוץ מקצועי מחייב, חוות דעת מקצועית פרטנית, או
              המלצה לבצע פעולה כלשהי במתקן חשמל מסוים.
            </p>
            <p className={P}>
              כל מקרה בשטח דורש אבחון מקצועי בהתאם לנסיבות, לתקנים החלים ולמצב
              המתקן. אין להסתמך על תוכן האתר כתחליף לבדיקה, לאבחון או לביצוע
              עבודה על ידי חשמלאי מוסמך בעל רישיון תקף.
            </p>
          </section>

          <section aria-labelledby="legal-warning">
            <h2 id="legal-warning" className={H2}>
              סכנה ואזהרה חוקית
            </h2>
            <p className={P}>
              ביצוע עבודות חשמל ללא רישיון מתאים{" "}
              <strong className="text-slate-900">אסור על פי דין</strong> ומסכן
              חיים — לרבות סיכון להתחשמלות, שריפה ונזק לרכוש. אין לבצע כל
              התערבות במערכת חשמל אלא אם הנך בעל הכשרה ורישיון כנדרש בחוק.
            </p>
            <p className={P}>
              בעל האתר, מפעיליו ועובדיו{" "}
              <strong className="text-slate-900">
                אינם אחראים לכל נזק ישיר או עקיף
              </strong>
              , לרבות נזק גוף, רכוש, הפסד כספי או כל תוצאה אחרת, הנובעים
              מהסתמכות על תוכן האתר, מפירושו, מיישומו או מכל פעולה שבוצעה בעקבותיו
              — בין אם על ידי משתמש מורשה ובין אם לאו.
            </p>
          </section>

          <section aria-labelledby="errors">
            <h2 id="errors" className={H2}>
              ט.ל.ח ודיווח על טעויות
            </h2>
            <p className={P}>
              אנו משקיעים מאמץ לשמור על דיוק ועדכניות התכנים. עם זאת, ייתכנו
              שגיאות, אי־דיוקים או מידע שאינו מעודכן (ט.ל.ח — טעות לעולם חוזרת).
              אין לראות בפרסום באתר מצג מוחלט של שלמות או נכונות בכל עת.
            </p>
            <p className={P}>
              נתקלתם בטעות במאמר או במדריך? נשמח שתפנו אלינו — נבדוק ונתקן
              במהירות האפשרית. ניתן ליצור קשר בדוא&quot;ל:{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-800"
              >
                {EMAIL}
              </a>{" "}
              או בטלפון:{" "}
              <a
                href={`tel:${PHONE}`}
                className="font-semibold text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-800"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="copyright">
            <h2 id="copyright" className={H2}>
              זכויות יוצרים
            </h2>
            <p className={P}>
              כל הזכויות שמורות ל־ח.י שירותי חשמל וליהודה חכמוב. התכנים באתר —
              לרבות טקסטים, עיצוב, לוגו, תמונות וקוד — מוגנים בזכויות יוצרים.
              אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות שימוש מסחרי בתכנים אלה
              ללא אישור מראש ובכתב מבעל האתר, אלא אם הותר הדבר במפורש על פי דין.
            </p>
          </section>

          <section aria-labelledby="consent">
            <h2 id="consent" className={H2}>
              אישור המשתמש
            </h2>
            <p className={P}>
              השימוש באתר מהווה אישור לתקנון ולתנאי שימוש אלה. בעל האתר רשאי
              לעדכן תקנון זה מעת לעת; הגרסה המעודכנת תפורסם בעמוד זה עם ציון
              תאריך העדכון.
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
