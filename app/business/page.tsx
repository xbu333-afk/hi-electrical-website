import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "שירותי חשמל לעסקים, מוסדות וקבלנים | ח.י שירותי חשמל",
  description:
    "פתרונות חשמל מתקדמים למגזר העסקי והמוסדי. ביצוע פרויקטים מורכבים, תאורה מוניציפלית, תחזוקת שבר ומונעת למפעלים, והסכמי ריטיינר לוועדי בתים. ניהול הנדסי מלא.",
  alternates: {
    canonical: `${SITE_URL}/business`,
  },
  openGraph: {
    title: "שירותי חשמל לעסקים ומוסדות | ח.י שירותי חשמל",
    description:
      "פרויקטים מוניציפליים, לוחות תעשייתיים, ריטיינר ורישוי עסקים — הנדסאי חשמל ברישיון ראשי.",
  },
};

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full font-bold mb-6 text-sm shadow-md">
            <span>המגזר העסקי והמוסדי (B2B)</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 mb-6">
            שקט תעשייתי לעסק שלך.
            <br className="hidden md:block" /> פתרונות חשמל ברמת הנדסאי.
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-3xl leading-relaxed md:mr-0 mx-auto">
            בסביבה העסקית, כל דקת השבתה שווה כסף.{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              ח.י שירותי חשמל
            </Link>{" "}
            מספקת מעטפת הנדסית וטכנית מלאה למפעלים, מוסדות ציבור, רשויות
            מוניציפליות, קבלנים וועדי בתים. אנו מביאים לשטח סטנדרט ביצוע חסר
            פשרות, עמידה בתקני בטיחות מחמירים, ויכולת ניהול פרויקטים רחבי היקף.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <article className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div
              className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6"
              aria-hidden="true"
            >
              🏢
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              פרויקטים ומכרזים מוניציפליים
            </h2>
            <p className="text-slate-600 leading-relaxed">
              ניסיון מוכח בעבודה מול רשויות מקומיות. ניהול הפרויקט משלב
              תמחור המכרז ועד למסירת מתקן בטיחותי, מואר ותקני.
            </p>
          </article>

          <article className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div
              className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6"
              aria-hidden="true"
            >
              ⚡
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              לוחות חשמל תעשייתיים
            </h2>
            <p className="text-slate-600 leading-relaxed">
              תכנון, בנייה, ושדרוג של לוחות חשמל ראשיים ומשניים (תלת-פאזי,
              הספקים גבוהים). חלוקת עומסים חכמה, פתרון בעיות הרמוניה ברשת,
              והכנת תשתיות לקווי ייצור ומכונות תעשייתיות.
            </p>
          </article>

          <article className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div
              className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6"
              aria-hidden="true"
            >
              🤝
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              הסכמי שירות (ריטיינר) ותחזוקה
            </h2>
            <p className="text-slate-600 leading-relaxed">
              שירותי תחזוקת שבר ותחזוקה מונעת לחברות ניהול, מגדלי משרדים וועדי
              בתים. זמינות גבוהה לתקלות חירום, בדיקות תקופתיות של מערכות החשמל,
              מערכות גילוי אש ותאורת חירום.
            </p>
          </article>
        </div>

        <section
          aria-labelledby="business-why-heading"
          className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 mb-20 flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1">
            <h2
              id="business-why-heading"
              className="text-3xl md:text-4xl font-black mb-6 text-emerald-400"
            >
              למה לבחור בנו לפרויקט הבא שלכם?
            </h2>
            <ul className="space-y-4 text-lg text-slate-300 list-none">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1" aria-hidden="true">
                  ✔
                </span>
                <span>
                  <strong>השקפה רב-תחומית:</strong> הכשרה כפולה כ
                  <Link href="/" className="text-emerald-400 hover:underline">
                    הנדסאי חשמל
                  </Link>{" "}
                  וכהנדסאי מכונות מאפשרת לנו הבנה עמוקה של צרכי התעשייה ושילוב
                  מערכות מורכבות.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1" aria-hidden="true">
                  ✔
                </span>
                <span>
                  <strong>עמידה בלוחות זמנים (SLA):</strong> בעסקים זמן הוא כסף.
                  אנו מתחייבים לזמני תגובה מהירים ולעבודה יעילה שאינה עוצרת את
                  פעילות העסק.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1" aria-hidden="true">
                  ✔
                </span>
                <span>
                  <strong>בטיחות ורגולציה:</strong> עבודה קפדנית על פי חוק
                  החשמל, שימוש באביזרים בעלי תו תקן בלבד, ושקיפות מלאה מול מנהלי
                  הפרויקט.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1 text-center md:text-right bg-white/5 p-8 rounded-2xl border border-white/10 w-full">
            <h3 className="text-2xl font-bold mb-4">קבלנים או מנהלי רכש?</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              שלחו אלינו כתבי כמויות, מפרטים טכניים או תוכניות חשמל (גרמושקות)
              ונדאג להעביר אליכם הצעת מחיר מקצועית, תחרותית ומדויקת.
            </p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("פנייה B2B — מכרז / תמחור")}`}
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all text-lg text-center shadow-lg"
            >
              שליחת חומרים למכרז / תמחור
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
