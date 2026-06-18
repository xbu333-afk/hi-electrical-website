import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות הפרטיות של ח.י שירותי חשמל — אילו נתונים נאספים, שימוש בעוגיות, כלי צד שלישי וזכויות המשתמש.",
  robots: { index: true, follow: true },
};

const H2 = "text-xl sm:text-2xl font-extrabold text-slate-900 mt-12 mb-4 leading-snug scroll-mt-24";
const P = "text-slate-600 text-base leading-[1.9] mb-4";
const UL = "text-slate-600 text-base leading-[1.9] mb-4 list-disc list-outside me-5 space-y-2";

export default function PrivacyPage() {
  return (
    <>
      <header
        className="bg-white border-b border-gray-100 py-12 md:py-16"
        aria-labelledby="privacy-title"
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
                מדיניות פרטיות
              </li>
            </ol>
          </nav>

          <h1
            id="privacy-title"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3"
          >
            מדיניות פרטיות
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            עודכן לאחרונה: אוגוסט 2025
          </p>
        </div>
      </header>

      <main className="bg-slate-50 py-10 md:py-14" role="main">
        <article className="max-w-3xl mx-auto px-6">
          <section aria-labelledby="intro">
            <h2 id="intro" className={H2}>
              מבוא
            </h2>
            <p className={P}>
              אתר זה מופעל על ידי <strong className="text-slate-900">ח.י שירותי חשמל</strong>.
              אנו מכבדים את פרטיות המשתמשים באתר. מדיניות זו מפרטת אילו נתונים נאספים,
              כיצד הם נשמרים, ומטרות השימוש בהם.
            </p>
          </section>

          <section aria-labelledby="info">
            <h2 id="info" className={H2}>
              איזה מידע נאסף?
            </h2>
            <ul className={UL}>
              <li>
                האתר אינו כולל טופסי הרשמה או צ&apos;אט מובנה. פנייה באמצעות WhatsApp
                או חיוג טלפוני מתבצעת מחוץ לאתר וכפופה למדיניות הפרטיות של אותם
                שירותים.
              </li>
              <li>
                האתר עושה שימוש בנתונים טכניים שנשלחים אוטומטית מהדפדפן, כגון: סוג
                דפדפן, מערכת הפעלה, כתובת IP (באופן אנונימי ככל האפשר), וזמני גישה.
                מידע זה משמש לצורכי אבטחה ותפעול בלבד.
              </li>
            </ul>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className={H2}>
              שימוש בעוגיות (Cookies)
            </h2>
            <p className={P}>
              אנו עושים שימוש <strong className="text-slate-900">אך ורק בעוגיות החיוניות לפעילות תקינה של האתר</strong>,
              ובעוגיות סטטיסטיות אנונימיות כאשר כלי ניתוח (כגון Google Analytics) מופעלים.
              אין שימוש בעוגיות למטרות פרסום ממוקד, שיווק, או איסוף פרטים אישיים מזהים.
              ניתן לחסום עוגיות דרך הגדרות הדפדפן שלך בכל עת.
            </p>
          </section>

          <section aria-labelledby="tools">
            <h2 id="tools" className={H2}>
              כלי צד שלישי
            </h2>
            <p className={P}>
              לצורכי אבטחה, סטטיסטיקות ושיפור הביצועים, האתר עשוי לעשות שימוש בכלים
              כגון Google Analytics, Google Tag Manager ו-Google Ads. כלים אלו מוגדרים
              לפעול ברמת אנונימיות ולא מאפשרים לנו לזהות משתמש באופן אישי.
            </p>
            <p className={P}>
              האתר מציג סרטון YouTube מוטמע (מצב פרטיות מוגבר). בעת צפייה בסרטון,
              YouTube עשוי לאסוף נתונים לפי מדיניות הפרטיות של Google.
            </p>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className={H2}>
              הזכויות שלך
            </h2>
            <p className={P}>
              בהתאם לחוק הגנת הפרטיות בישראל, עומדת לך הזכות:
            </p>
            <ul className={UL}>
              <li>לבקש לעיין במידע שנשמר אודותיך</li>
              <li>לבקש את תיקון המידע</li>
              <li>לבקש את מחיקת המידע</li>
            </ul>
            <p className={P}>
              ניתן לפנות בנושא זה בדוא&quot;ל:{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800 transition-colors"
              >
                {EMAIL}
              </a>
              {" "}או בטלפון:{" "}
              <a
                href={`tel:${PHONE}`}
                className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800 transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </section>

          <section aria-labelledby="storage">
            <h2 id="storage" className={H2}>
              אחסון מידע
            </h2>
            <p className={P}>
              האתר מאוחסן בשרת אחסון מאובטח. מידע שאינו אישי, כגון זמני גלישה
              וכתובות IP, נשמר על ידי ספק האחסון למטרות אבטחה ותפעול בלבד.
            </p>
          </section>

          <section aria-labelledby="consent">
            <h2 id="consent" className={H2}>
              אישור המשתמש
            </h2>
            <p className={P}>
              השימוש באתר מהווה אישור למדיניות פרטיות זו. תוכל בכל עת לשנות את
              הגדרות הדפדפן ולחסום עוגיות.
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
      </main>
    </>
  );
}
