import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  faqAnswerText,
  type FaqSegment,
} from "@/lib/faq";
import {
  buildBreadcrumbList,
  businessRef,
  jsonLdScriptProps,
  personRef,
  websiteRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "שאלות ותשובות – כל מה שרציתם לדעת על תקלות חשמל | ח.י שירותי חשמל",
  description:
    "למה הפחת קופץ בלילה? מתי צריך תלת-פאזי? מה ההבדל בין חשמלאי מוסמך להנדסאי חשמל? תשובות מקצועיות מאת הנדסאי חשמל בעל רישיון ראשי ועד מומחה לבתי משפט.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "שאלות ותשובות בחשמל – ח.י שירותי חשמל",
    description:
      "תשובות מקצועיות לקצרים סמויים, זליגות זרם, תלת-פאזי, איזון עומסים, רישוי וחוות דעת מומחה.",
  },
};

const FAQ_URL = `${SITE_URL}/faq`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${FAQ_URL}#webpage`,
      url: FAQ_URL,
      name: "שאלות ותשובות בחשמל",
      description:
        "תשובות מקצועיות לשאלות נפוצות בחשמל: קצרים סמויים, זליגות זרם, תלת-פאזי, איזון עומסים, רישוי וחוות דעת מומחה.",
      inLanguage: "he-IL",
      isPartOf: websiteRef,
      about: businessRef,
      author: personRef,
      publisher: businessRef,
      breadcrumb: { "@id": `${FAQ_URL}#breadcrumb` },
      // הטקסט נגזר מאותו מקור שמרנדר את העמוד, ולכן הסכימה תואמת ל-DOM במדויק
      mainEntity: FAQ_ITEMS.map(({ id, question, answer }) => ({
        "@type": "Question",
        "@id": `${FAQ_URL}#${id}`,
        url: `${FAQ_URL}#${id}`,
        name: question,
        inLanguage: "he-IL",
        answerCount: 1,
        acceptedAnswer: {
          "@type": "Answer",
          text: faqAnswerText(answer),
          inLanguage: "he-IL",
          url: `${FAQ_URL}#${id}`,
          author: personRef,
        },
      })),
    },
    buildBreadcrumbList(`${FAQ_URL}#breadcrumb`, [
      { name: "שאלות ותשובות", path: "/faq" },
    ]),
  ],
};

const ANSWER_LINK =
  "font-bold text-emerald-700 underline underline-offset-2 hover:text-emerald-800";

/**
 * מרנדר את מקטעי התשובה. הטקסט הנראה זהה למחרוזת שנשלחת ל-JSON-LD,
 * משום ששניהם נגזרים מאותו מערך מקטעים.
 */
function AnswerText({ answer }: { answer: readonly FaqSegment[] }) {
  return (
    <>
      {answer.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>;
        }

        if (part.external) {
          return (
            <a
              key={index}
              href={part.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${part.text} (נפתח בחלון חדש)`}
              className={`${ANSWER_LINK} break-all`}
            >
              {part.text}
            </a>
          );
        }

        return (
          <Link key={index} href={part.href} className={ANSWER_LINK}>
            {part.text}
          </Link>
        );
      })}
    </>
  );
}

export default function FAQPage() {
  return (
    <>
      <script {...jsonLdScriptProps(jsonLd)} />

      <div className="bg-slate-50 px-6 py-12 text-slate-900 md:py-20">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="מסלול ניווט" className="mb-10 text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-emerald-700 hover:underline">
                  דף הבית
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span aria-current="page" className="font-medium text-slate-700">
                  שאלות ותשובות
                </span>
              </li>
            </ol>
          </nav>

          <header className="mb-14 text-center">
            <p className="mb-4">
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-800">
                מידע מקצועי ושקוף
              </span>
            </p>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              שאלות ותשובות בחשמל
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600">
              תשובות ישירות לשאלות שחוזרות אצלי בשטח שוב ושוב — מאת יהודה חכמוב,
              הנדסאי חשמל והנדסאי מכונות בעל רישיון חשמלאי ראשי, מרצה ומכשיר
              הנדסאי חשמל ונותן חוות דעת מומחה לבתי משפט.
            </p>
          </header>

          <nav
            aria-label="נושאי השאלות"
            className="mb-12 rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              הנושאים בעמוד
            </h2>
            <ol className="list-decimal space-y-2 pe-5 text-slate-700 marker:font-bold marker:text-emerald-700">
              {FAQ_CATEGORIES.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-emerald-700 hover:underline">
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {FAQ_CATEGORIES.map(({ id, title, items }) => (
            <section key={id} aria-labelledby={id} className="mb-12">
              <h2
                id={id}
                className="mb-5 scroll-mt-24 text-2xl font-bold text-slate-900 md:text-3xl"
              >
                {title}
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <details
                    key={item.id}
                    id={item.id}
                    className="group scroll-mt-24 rounded-2xl border border-gray-100 bg-white shadow-sm transition-colors hover:border-emerald-200 open:border-emerald-200"
                  >
                    {/* summary מכיל אך ורק כותרת אחת — מבנה תקני שמקשר
                        באופן חד-משמעי בין השאלה לתשובה שמתחתיה */}
                    <summary className="cursor-pointer list-none rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 [&::-webkit-details-marker]:hidden">
                      <h3 className="flex items-center justify-between gap-4 p-6 text-lg font-bold text-slate-800 group-open:text-emerald-800">
                        <span>{item.question}</span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-emerald-700 transition-transform duration-300 group-open:rotate-180"
                        >
                          <svg
                            fill="none"
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </h3>
                    </summary>

                    <p className="border-t border-gray-100 px-6 pb-6 pt-4 leading-relaxed text-slate-700">
                      <AnswerText answer={item.answer} />
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section
            aria-labelledby="faq-cta"
            className="mt-14 rounded-3xl bg-slate-900 p-10 text-center text-white shadow-xl md:p-12"
          >
            <h2 id="faq-cta" className="mb-3 text-2xl font-black md:text-3xl">
              לא מצאתם את התשובה שחיפשתם?
            </h2>
            <p className="mb-8 text-lg text-slate-200">
              נשמח לענות על כל שאלה ולתת ייעוץ ראשוני. השירות והייעוץ ניתנים
              בעברית, ברוסית ובאנגלית, וניתן לפנות בוואטסאפ בכל שפה.
            </p>
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו עכשיו וקבלו יעוץ מחשמלאי מומחה — יהודה חכמוב, ${PHONE_DISPLAY}`}
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-full bg-emerald-700 px-10 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-emerald-800"
            >
              חייגו עכשיו וקבלו יעוץ מחשמלאי מומחה
            </a>
            <p className="mt-6 text-sm text-slate-300">
              <span aria-hidden="true">☎ </span>
              {PHONE_DISPLAY}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
