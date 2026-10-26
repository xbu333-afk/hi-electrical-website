import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות הפרטיות של ח.י שירותי חשמל — אילו נתונים נאספים, שימוש בעוגיות, כלי צד שלישי וזכויות המשתמש.",
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
          <section aria-labelledby="who">
            <h2 id="who" className={H2}>
              מי אנחנו
            </h2>
            <p className={P}>
              אתר זה מופעל על ידי{" "}
              <strong className="text-slate-900">ח.י שירותי חשמל</strong>,
              בבעלות <strong className="text-slate-900">יהודה חכמוב</strong>.
              מדיניות זו מסבירה אילו נתונים עשויים להיאסף בעת השימוש באתר, למטרות
              מה הם משמשים, וכיצד ניתן לפנות אלינו בנושא פרטיות.
            </p>
          </section>

          <section aria-labelledby="info">
            <h2 id="info" className={H2}>
              איזה מידע נאסף
            </h2>
            <p className={P}>
              <strong className="text-slate-900">מידע שמסרתם ביוזמתכם</strong>
              <br />
              כאשר אתם ממלאים טופס באתר (למשל הצעת מחיר או משוב), אנו עשויים
              לאסוף פרטים כגון: שם, מספר טלפון, עיר, תיאור הפנייה, דירוג ומשוב.
            </p>
            <p className={P}>
              <strong className="text-slate-900">מידע טכני ונתוני שימוש</strong>
              <br />
              בעת השימוש באתר עשויים להיאסף באופן אוטומטי נתונים טכניים ונתונים
              הנוגעים לאופן השימוש באתר, כגון כתובת IP, סוג דפדפן, עמודים שנצפו
              ומקור ההגעה לאתר.
            </p>
            <p className={P}>
              מידע זה משמש לתפעול האתר, אבטחתו, שיפור השירות, ניתוח פעילות,
              מדידת ביצועים ומניעת שימוש בלתי מורשה או בלתי תקין.
            </p>
          </section>

          <section aria-labelledby="fraud-prevention">
            <h2 id="fraud-prevention" className={H2}>
              מניעת הונאות קליקים בפרסום
            </h2>
            <p className={P}>
              כדי לזהות קליקים לא אמיתיים על המודעות שלנו (למשל לחיצות חוזרות
              ללא כוונת פנייה או תעבורה אוטומטית), האתר אוסף לגבי כל ביקור נתונים
              טכניים כגון: מזהה הקליק של Google (GCLID), מילת החיפוש והקמפיין,
              כתובת IP ומיקום משוער, סוג המכשיר והדפדפן, מזהי מבקר שנשמרים בעוגיות,
              וטביעה טכנית של המכשיר (מאפייני מסך, תצוגה גרפית, עיבוד שמע וגופנים
              מותקנים). מזהה המבקר נשמר בעוגיות ובאחסון המקומי של הדפדפן, וכן נתוני שימוש
              כלליים: משך השהייה, מספר הנגיעות במסך, עומק הגלילה והאם בוצעה לחיצה
              לחיוג או לוואטסאפ.
            </p>
            <p className={P}>
              לגבי קליקים על מודעות, כתובת ה-IP נבדקת מול שירות חיצוני לזיהוי
              סוג החיבור (למשל ספק האינטרנט, או האם מדובר ב-VPN או בשרת).
            </p>
            <p className={P}>
              איננו מקליטים הקלדות, תוכן שהוזן בשדות או את מסלול תנועת היד על
              המסך. הנתונים משמשים לזיהוי שימוש לרעה בפרסום, לסינון מבקרים
              מהמודעות שלנו ולהגשת דיווח ל-Google על קליקים לא תקינים. הם אינם
              נמכרים ואינם משמשים לפרסום מותאם אישית.
            </p>
          </section>

          <section aria-labelledby="purposes">
            <h2 id="purposes" className={H2}>
              למה המידע משמש
            </h2>
            <ul className={UL}>
              <li>טיפול בפניות ומתן שירותי חשמל</li>
              <li>יצירת קשר חוזר עמכם</li>
              <li>תפעול האתר ושיפורו</li>
              <li>אבטחה, מניעת שימוש לרעה והגנה על האתר</li>
              <li>מדידה, ניתוח ושיפור פעילות פרסום</li>
            </ul>
          </section>

          <section aria-labelledby="contact-flow">
            <h2 id="contact-flow" className={H2}>
              יצירת קשר והמשך שיחה
            </h2>
            <p className={P}>
              פנייה דרך טופס באתר נועדה לאפשר לנו לחזור אליכם במהירות ולספק מענה
              מקצועי.
            </p>
            <p className={P}>
              מסירת הפרטים בטופס אינה חובה חוקית והיא תלויה ברצונכם. עם זאת, ללא
              מסירת הפרטים הנדרשים ייתכן שלא נוכל לטפל בפנייה או לחזור אליכם.
            </p>
            <p className={P}>
              ייתכן שתועברו להמשך שיחה באמצעות WhatsApp או ליצירת קשר טלפוני.
              השימוש בשירותים אלה כפוף גם למדיניות הפרטיות של הספקים
              הרלוונטיים.
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className={H2}>
              Cookies וטכנולוגיות דומות
            </h2>
            <p className={P}>
              האתר עשוי להשתמש בקובצי Cookies ובטכנולוגיות דומות לצורכי תפעול,
              אבטחה, התאמת חוויית השימוש, מדידה, ניתוח ושיפור פעילות האתר
              והפרסום.
            </p>
            <p className={P}>
              חלק מהטכנולוגיות עשויות לפעול באמצעות ספקי שירות חיצוניים, והשימוש
              בהן כפוף גם להגדרות הדפדפן ולמדיניות הספקים הרלוונטיים.
            </p>
          </section>

          <section aria-labelledby="measurement">
            <h2 id="measurement" className={H2}>
              שירותי מדידה, ניתוח ופרסום
            </h2>
            <p className={P}>
              האתר עשוי להשתמש בשירותי מדידה, ניתוח ופרסום של צדדים שלישיים,
              לרבות שירותים של Google, לצורך הבנת השימוש באתר ושיפור פעילות
              השיווק. שירותים אלה עשויים לאסוף מידע טכני ודפוסי שימוש בהתאם
              למדיניות הפרטיות שלהם.
            </p>
          </section>

          <section aria-labelledby="external-content">
            <h2 id="external-content" className={H2}>
              תוכן חיצוני באתר
            </h2>
            <p className={P}>
              באתר עשוי להיות מוטמע תוכן מצדדים שלישיים, כגון סרטון YouTube. בעת
              טעינה או צפייה בתוכן כזה, הספק החיצוני עשוי לאסוף מידע לפי מדיניות
              הפרטיות שלו.
            </p>
          </section>

          <section aria-labelledby="providers">
            <h2 id="providers" className={H2}>
              מסירת מידע לספקים
            </h2>
            <p className={P}>
              איננו מוכרים מאגרי פרטים לצדדים שלישיים.
            </p>
            <p className={P}>
              עם זאת, מידע עשוי להיות מועבר או נגיש לספקי שירות טכנולוגיים —
              כגון ספקי אחסון ותשתית, ספקי תקשורת והתראות, ושירותי מדידה, ניתוח
              ופרסום — רק ככל שהדבר נדרש לצורך פעילותם במסגרת מתן השירות והפעלת
              האתר.
            </p>
          </section>

          <section aria-labelledby="abroad">
            <h2 id="abroad" className={H2}>
              עיבוד מידע מחוץ לישראל
            </h2>
            <p className={P}>
              חלק מספקי השירות הם ספקים בינלאומיים. לפיכך מידע עשוי להישמר או
              להיות מעובד גם מחוץ לישראל, בכפוף למדיניות הספקים ולדין החל.
            </p>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention" className={H2}>
              תקופת שמירת מידע
            </h2>
            <p className={P}>
              אנו שומרים מידע למשך הזמן הנדרש למטרות העסקיות, התפעוליות,
              המשפטיות והאבטחתיות המתוארות במדיניות זו, או למשך הזמן הנדרש או
              המותר לפי דין. לאחר מכן המידע יימחק או יושבת ככל שהדבר סביר
              ומעשי.
            </p>
          </section>

          <section aria-labelledby="security">
            <h2 id="security" className={H2}>
              אבטחת מידע
            </h2>
            <p className={P}>
              אנו נוקטים אמצעים סבירים להגנה על המידע מפני גישה, שימוש או חשיפה
              שאינם מורשים. עם זאת, אין באפשרותנו להבטיח אבטחה מוחלטת מפני כל
              סיכון טכנולוגי.
            </p>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className={H2}>
              הזכויות שלכם
            </h2>
            <p className={P}>
              בכפוף לחוק הגנת הפרטיות ולדין החל, תוכלו לפנות אלינו כדי:
            </p>
            <ul className={UL}>
              <li>לבקש לעיין במידע אישי שנשמר אודותיכם</li>
              <li>לבקש תיקון מידע שאינו מדויק</li>
              <li>
                לבקש מחיקת מידע — בכפוף לחובות שמירה, לצרכים לגיטימיים ולזכויות
                אחרות לפי דין
              </li>
            </ul>
          </section>

          <section aria-labelledby="external-links">
            <h2 id="external-links" className={H2}>
              קישורים לאתרים ושירותים אחרים
            </h2>
            <p className={P}>
              האתר עשוי לכלול קישורים לשירותים חיצוניים. מדיניות זו חלה על אתר
              ח.י שירותי חשמל בלבד, ויש לעיין במדיניות הפרטיות של כל ספק חיצוני
              בנפרד.
            </p>
          </section>

          <section aria-labelledby="updates">
            <h2 id="updates" className={H2}>
              עדכון המדיניות
            </h2>
            <p className={P}>
              נוכל לעדכן מדיניות זו מעת לעת. תאריך העדכון יופיע בראש העמוד.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className={H2}>
              יצירת קשר
            </h2>
            <p className={P}>
              לשאלות בנושא פרטיות:
            </p>
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
