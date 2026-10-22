import type { Metadata } from "next";
import Link from "next/link";
import ArticleFaqList from "@/app/components/ArticleFaqList";
import PricingTable from "@/app/components/PricingTable";
import type { ArticleFaq } from "@/lib/articles";
import { businessRef, jsonLdScriptProps, websiteRef } from "@/lib/schema";
import { buildOpenGraph } from "@/lib/og";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "מחירון עבודות חשמל 2026 | כמה עולה חשמלאי מוסמך?",
  description:
    "מחירון שקוף והוגן לעבודות חשמל. כמה עולה ביקור חשמלאי, החלפת שקע, התקנת גוף תאורה ושדרוג לוח. שקיפות מלאה ללא הפתעות.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: buildOpenGraph({
    title: "מחירון עבודות חשמל 2026 | ח.י שירותי חשמל יצאת צדיק",
    description:
      "מחירון שקוף לעבודות חשמל נפוצות — ביקור, תיקון קצר, שקעים, לוחות ועוד.",
    url: `${SITE_URL}/pricing`,
  }),
};

/**
 * מקור אמת יחיד לשאלות ולתשובות: אותו מערך מזין את התצוגה בעמוד
 * ואת ה-FAQPage ב-JSON-LD, כדי שהסכימה לא תסתור את מה שהמשתמש רואה.
 */
const PRICING_FAQ: readonly ArticleFaq[] = [
  {
    question: "כמה עולה ביקור חשמלאי?",
    answer:
      "ביקור חשמלאי עולה אצלנו 350–400 ₪. אם מתבצעת עבודה במקום, מחיר הביקור מתקזז ממחיר העבודה.",
  },
  {
    question: "למה יש הבדלים גדולים במחיר בין חשמלאים?",
    answer:
      "ההבדל נובע בדרך כלל מארבעה דברים: דרגת הרישיון של החשמלאי, איכות הרכיבים שהוא מתקין, האם הוא מבצע בדיקות במכשור מכויל בסוף העבודה, והאם הוא נותן תיעוד ואחריות. מחיר נמוך מאוד חוסך בדרך כלל באחד מהם.",
  },
  {
    question: "למה המחיר כתוב \"החל מ\" ולא מחיר קבוע?",
    answer:
      "כי אותה עבודה יכולה להיות פשוטה או מורכבת, לפי מה שמוצאים בשטח. החלפת שקע במקום נגיש שונה מהחלפת שקע שהחיווט שלו שרוף בתוך הקיר. לפני כל עבודה מקבלים הצעת מחיר סופית לאישור.",
  },
  {
    question: "האם המחיר כולל חלקים?",
    answer:
      "בחלק מהעבודות כן, וזה מצוין ליד כל שורה במחירון. למשל, בהחלפת שקע או מפסק המחיר כולל שקע או מפסק סטנדרטי. רכיבים מיוחדים, כמו טיימר חכם או מותג מסוים, מתומחרים בנפרד ובאישורכם.",
  },
  {
    question: "איך יודעים שהמחיר הוגן?",
    answer:
      "מחיר הוגן הוא מחיר שמפורט מראש, כולל מה בדיוק יבוצע, ולא \"משתנה\" באמצע העבודה. כדאי לבקש הצעה בכתב, לשאול אילו בדיקות יבוצעו בסוף, ולבדוק את רישיון החשמלאי במאגר של משרד העבודה. הסבר מלא נמצא במדריך איך לבחור חשמלאי.",
  },
];

const PRICING_URL = `${SITE_URL}/pricing`;

const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PRICING_URL}#faq`,
  url: PRICING_URL,
  name: "שאלות נפוצות על מחירי חשמלאים",
  inLanguage: "he-IL",
  isPartOf: websiteRef,
  about: businessRef,
  publisher: businessRef,
  mainEntity: PRICING_FAQ.map((item, index) => ({
    "@type": "Question",
    "@id": `${PRICING_URL}#faq-${index + 1}`,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <script {...jsonLdScriptProps(pricingFaqJsonLd)} />
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bold mb-6 text-sm">
            <span>מחירון מעודכן לשנת 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 mb-6">
            מחירון עבודות חשמל
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-3xl leading-relaxed md:mr-0 mx-auto">
            אנו מאמינים בשקיפות מלאה. לפניכם מחירון מומלץ לעבודות החשמל הנפוצות
            ביותר. המחירים הוגנים ותואמים לסטנדרט העבודה הגבוה של{" "}
            <Link href="/" className="text-emerald-700 hover:underline font-bold">
              הנדסאי חשמל וחשמלאי מוסמך
            </Link>
            . ללא אותיות קטנות וללא &quot;הפתעות&quot; בחשבון.
          </p>
        </header>

        <PricingTable />

        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              דגשים חשובים שכדאי לדעת:
            </h2>
            <ul className="space-y-3 text-amber-800 marker:text-amber-500 list-disc list-inside">
              <li>
                כל עבודה ועבודה מבוצעת אך ורק על ידי{" "}
                <Link href="/" className="font-bold text-emerald-700 hover:underline">
                  הנדסאי חשמל
                </Link>{" "}
                ו
                <Link href="/" className="font-bold text-emerald-700 hover:underline">
                  חשמלאי מוסמך
                </Link>
                , בעל רישיון ראשי בתוקף.
              </li>
              <li>
                המחירים המצוינים בטבלה מתייחסים לשירות באזור המרכז (פתח תקווה,
                רמת גן, בקעת אונו, הרצליה וכו&apos;). ללקוחות מרוחקים ייתכנו
                תוספות נסיעה.
              </li>
              <li>
                המחירים אינם כוללים מע&quot;מ כחוק. לפני תחילת כל עבודה תוגש
                הצעת מחיר סופית וברורה לאישורכם.
              </li>
            </ul>
          </div>
          <div className="flex-1 bg-white p-6 rounded-xl border border-amber-100/50 shadow-sm">
            <p className="text-slate-600 leading-relaxed m-0 text-sm">
              לקוחות יקרים, אנו גאים שנבדקנו ונמצאנו צדיקים בתוכנית{" "}
              <Link href="/" className="font-bold text-emerald-700 hover:underline">
                יצאת צדיק
              </Link>
              . המשמעות היא שאצלנו לא תמצאו &quot;מחירי פיתיון&quot; נמוכים
              שבשטח תופחים לאלפי שקלים. כל ביקור מלווה בשקיפות, הסבר בגובה
              העיניים, והצגת תעודות כנדרש. עבודות המצריכות חלקי חילוף או שינויי
              תשתית מהותיים יתומחרו בנפרד ולאחר הסכמתכם המלאה.
            </p>
          </div>
        </div>

        <section
          aria-labelledby="pricing-faq"
          className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
        >
          <h2 id="pricing-faq" className="text-2xl font-bold text-slate-900 md:text-3xl">
            שאלות נפוצות על מחירי חשמלאים
          </h2>
          <ArticleFaqList items={PRICING_FAQ} />
          <p className="mt-6 text-slate-600">
            עוד על בחירת חשמלאי ועל מה לבדוק לפני שמזמינים, במדריך{" "}
            <Link
              href="/articles/how-to-choose-electrician"
              className="font-bold text-emerald-700 hover:underline"
            >
              איך לבחור חשמלאי
            </Link>
            .
          </p>
        </section>

        <div className="mt-12 text-center">
          <a
            href={`tel:${PHONE}`}
            aria-label={`לחיוג מהיר וקבלת הצעת מחיר מדויקת: ${PHONE_DISPLAY}`}
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-full transition-all text-lg shadow-lg"
          >
            לחיוג מהיר וקבלת הצעת מחיר מדויקת
          </a>
        </div>
      </div>
    </div>
  );
}
