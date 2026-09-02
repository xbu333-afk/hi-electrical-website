import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "./QuoteForm";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "קבלת הצעת מחיר מחשמלאי מוסמך",
  description:
    "השאירו שם, טלפון, עיר ותיאור קצר של התקלה — ותועברו לוואטסאפ עם ההודעה מוכנה. הנדסאי חשמל מוסמך בעל רישיון ראשי, שירות במרכז ובשרון.",
  alternates: {
    canonical: "https://www.hiservice.org",
  },
  /*
   * עמוד נחיתה לקמפיין בלבד. אין לו תוכן אורגני עצמאי, ואם ייכנס לאינדקס הוא
   * יתחרה בדף הבית על אותן שאילתות. follow נשאר פתוח כדי שהקישורים הפנימיים
   * שבו ימשיכו להעביר ערך.
   */
  robots: { index: false, follow: true },
};

const CREDENTIALS: readonly string[] = [
  "הנדסאי חשמל ומכונות מוסמך",
  "רישיון חשמלאי ראשי",
  "עד מומחה מטעם בתי המשפט",
  "מרצה בתחום החשמל",
];

const NEXT_STEPS: readonly { title: string; body: string }[] = [
  {
    title: "הפרטים מגיעים ישירות לנייד של יהודה",
    body: "אין מוקד ואין מענה אוטומטי. הפנייה נוחתת אצל בעל המקצוע עצמו ברגע השליחה.",
  },
  {
    title: "וואטסאפ נפתח עם ההודעה כתובה",
    body: "לא צריך להקליד שוב את הפרטים — רק ללחוץ שליחה, ואפשר להוסיף תמונה של הלוח או התקלה.",
  },
  {
    title: "מקבלים הערכה והמלצה על הצעד הבא",
    body: "לפי אופי התקלה תדעו אם מדובר בטיפול מהיר, בבדיקה בשטח או במקרה שמחייב טיפול דחוף.",
  },
];

function FormFallback() {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      aria-hidden="true"
    >
      <div className="h-7 w-64 max-w-full animate-pulse rounded bg-slate-200" />
      <div className="mt-6 space-y-5">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="mb-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-[52px] w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
        ))}
        <div>
          <div className="mb-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-28 w-full animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
      <div className="mt-7 h-[56px] w-full animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}

export default function GetQuotePage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        <header>
          <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            הצעת מחיר מחשמלאי מוסמך — בלי להמתין על הקו
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            ממלאים ארבעה שדות, והפנייה מגיעה ישירות לנייד של יהודה חכמוב. מיד
            אחר כך נפתח וואטסאפ עם ההודעה מוכנה, כך שלא תצטרכו להסביר את התקלה
            פעמיים.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {CREDENTIALS.map((credential) => (
              <li
                key={credential}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-900"
              >
                {credential}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-8">
          <Suspense fallback={<FormFallback />}>
            <QuoteForm />
          </Suspense>
        </div>

        <section aria-labelledby="next-steps-heading" className="mt-12">
          <h2
            id="next-steps-heading"
            className="text-xl font-extrabold text-slate-900 sm:text-2xl"
          >
            מה קורה אחרי שאתם שולחים
          </h2>
          <ol className="mt-5 space-y-5">
            {NEXT_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-base font-black text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="urgent-heading"
          className="mt-12 rounded-2xl bg-slate-900 p-6 text-center"
        >
          <h2 id="urgent-heading" className="text-lg font-extrabold text-white">
            התקלה דחופה ואי אפשר לחכות?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            ריח חריכה, ניצוצות מהלוח או הפסקת חשמל מוחלטת — אלה מקרים שמחייבים
            שיחה, לא טופס.
          </p>
          <a
            href={`tel:${PHONE}`}
            data-analytics-location="get-quote-urgent-call"
            className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-black text-red-700 shadow-lg transition-colors hover:bg-slate-100"
            aria-label={`חייגו עכשיו: ${PHONE_DISPLAY}`}
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            חייגו {PHONE_DISPLAY}
          </a>
        </section>
      </div>
    </div>
  );
}
