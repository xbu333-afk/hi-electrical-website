import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות הפרטיות של ח.י שירותי חשמל בשפה פשוטה — איזה מידע נאסף, למה, עם מי הוא משותף ומה הזכויות שלכם.",
  robots: { index: true, follow: true },
};

const H2 =
  "text-xl sm:text-2xl font-extrabold text-slate-900 mt-12 mb-4 leading-snug scroll-mt-24";
const P = "text-slate-600 text-base leading-[1.9] mb-4";
const UL =
  "text-slate-600 text-base leading-[1.9] mb-4 list-disc list-outside me-5 space-y-2";

export default function PrivacyPage() {
  return (
    <>
      <header
        className="bg-white border-b border-gray-100 py-12 md:py-16"
        aria-labelledby="privacy-title"
      >
        <div className="max-w-3xl mx-auto px-6">
          <nav aria-label="נתיב דפים" className="mb-6">
            <ol
              className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap"
              role="list"
            >
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-700 transition-colors"
                >
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
            עודכן לאחרונה: אוקטובר 2026
          </p>
        </div>
      </header>

      <div className="bg-slate-50 py-10 md:py-14">
        <article className="max-w-3xl mx-auto px-6">
          <section
            aria-labelledby="short"
            className="rounded-2xl border border-emerald-100 bg-white p-6"
          >
            <h2 id="short" className="text-xl font-extrabold text-slate-900 mb-3">
              בקצרה
            </h2>
            <ul className={UL}>
              <li>
                השארתם פרטים? נשתמש בהם כדי לחזור אליכם ולתת לכם שירות.
              </li>
              <li>
                כמו ברוב האתרים, נאסף גם מידע בסיסי על הגלישה, כדי שהאתר יעבוד
                טוב, יהיה מאובטח, ונוכל לדעת אם הפרסום שלנו עובד.
              </li>
              <li>איננו מוכרים את המידע שלכם לאף אחד.</li>
              <li>
                אפשר לפנות אלינו בכל שאלה, ולבקש לראות, לתקן או למחוק את הפרטים
                שלכם.
              </li>
            </ul>
          </section>

          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי אנחנו
            </h2>
            <p className={P}>
              האתר מופעל על ידי{" "}
              <strong className="text-slate-900">ח.י שירותי חשמל</strong>{" "}
              (בבעלות <strong className="text-slate-900">יהודה חכמוב</strong>),
              שהיא גם האחראית על המידע שנאסף באתר. פרטי הקשר מופיעים בסוף העמוד.
            </p>
          </section>

          <section aria-labelledby="info">
            <h2 id="info" className={H2}>
              איזה מידע נאסף
            </h2>
            <p className={P}>
              <strong className="text-slate-900">פרטים שאתם משאירים.</strong>{" "}
              כשאתם ממלאים טופס באתר, למשל בקשה להצעת מחיר או משוב: שם, טלפון,
              עיר, תיאור הפנייה, ובמשוב גם דירוג ותגובה. מסירת הפרטים היא
              לבחירתכם, אבל בלי פרטי קשר לא נוכל לחזור אליכם.
            </p>
            <p className={P}>
              <strong className="text-slate-900">מידע בסיסי על הגלישה.</strong>{" "}
              כתובת IP ומיקום משוער, סוג המכשיר והדפדפן, מזהים טכניים כמו עוגיות,
              העמודים שנצפו, משך הביקור והפעולות בעמוד (למשל לחיצה על כפתור
              התקשרות), ומאיפה הגעתם לאתר, כולל מודעה או חיפוש שהובילו אליו.
            </p>
          </section>

          <section aria-labelledby="purposes">
            <h2 id="purposes" className={H2}>
              למה אנחנו משתמשים במידע
            </h2>
            <ul className={UL}>
              <li>כדי לחזור אליכם, לתאם עבודה ולתת שירות.</li>
              <li>כדי להפעיל את האתר, לשמור על האבטחה שלו ולמנוע שימוש לרעה.</li>
              <li>כדי להבין איך משתמשים באתר ולשפר אותו.</li>
              <li>
                כדי למדוד ולנהל את הפרסום שלנו, למשל לדעת מאיזו מודעה הגעתם או
                להחליט למי להציג מודעות.
              </li>
            </ul>
          </section>

          <section aria-labelledby="sharing">
            <h2 id="sharing" className={H2}>
              עם מי המידע משותף
            </h2>
            <p className={P}>
              איננו מוכרים את המידע. הוא נמסר רק לספקים שעוזרים לנו להפעיל את
              האתר ואת העסק, ורק במידה הנדרשת: אחסון ותשתית, שליחת הודעות
              והתראות, שירותי אבטחה, ושירותי Google (כמו Google Analytics, Google
              Ads ו-YouTube). חלק מהספקים פועלים מחוץ לישראל, ולכן המידע עשוי
              להישמר גם שם. מידע עשוי להימסר גם אם הדבר נדרש לפי דין.
            </p>
            <p className={P}>
              אם תבחרו להמשיך בשיחה ב-WhatsApp או בטלפון, השימוש בשירותים אלה
              כפוף גם לתנאים שלהם.
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className={H2}>
              עוגיות (Cookies)
            </h2>
            <p className={P}>
              עוגיות הן קבצים קטנים שהדפדפן שומר. אנחנו ושירותי Google משתמשים
              בהן כדי שהאתר יעבוד, לאבטחה, למדידה ולפרסום. אפשר למחוק או לחסום
              עוגיות בהגדרות הדפדפן, אבל חלק מהאתר עלול לעבוד פחות טוב. אפשר גם
              לנהל את הגדרות הפרסום שלכם בחשבון Google.
            </p>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention" className={H2}>
              כמה זמן נשמר המידע ואיך הוא מוגן
            </h2>
            <p className={P}>
              אנחנו שומרים את המידע כל עוד הוא נחוץ למטרות שתוארו כאן, או כפי
              שהחוק מחייב, ואחר כך מוחקים אותו. אנחנו נוקטים אמצעים סבירים להגנה
              על המידע, אבל אף מערכת אינה חסינה לחלוטין.
            </p>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className={H2}>
              הזכויות שלכם
            </h2>
            <p className={P}>
              לפי חוק הגנת הפרטיות, תוכלו לבקש לעיין במידע שנשמר עליכם, לתקן מידע
              שגוי או לבקש למחוק אותו (בכפוף לחובות שמירה לפי דין). כתבו לנו
              בפרטים שלמטה, ונטפל בבקשה.
            </p>
          </section>

          <section aria-labelledby="updates">
            <h2 id="updates" className={H2}>
              עדכונים
            </h2>
            <p className={P}>
              ייתכן שנעדכן את המדיניות מעת לעת. תאריך העדכון האחרון מופיע בראש
              העמוד.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className={H2}>
              יצירת קשר
            </h2>
            <p className={P}>לכל שאלה או בקשה בנושא פרטיות:</p>
            <ul className={UL}>
              <li>
                דוא&quot;ל:{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800 transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                טלפון:{" "}
                <a
                  href={`tel:${PHONE}`}
                  className="text-emerald-700 font-semibold underline underline-offset-2 hover:text-emerald-800 transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
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
