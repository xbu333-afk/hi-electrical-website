import type { Metadata } from "next";
import Link from "next/link";
import PricingTable from "@/app/components/PricingTable";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "מחירון עבודות חשמל 2026 | כמה עולה חשמלאי מוסמך? | ח.י שירותי חשמל",
  description:
    "מחירון שקוף והוגן לעבודות חשמל. כמה עולה ביקור חשמלאי, החלפת שקע, התקנת גוף תאורה ושדרוג לוח. שקיפות מלאה ללא הפתעות.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "מחירון עבודות חשמל 2026 | ח.י שירותי חשמל",
    description:
      "מחירון שקוף לעבודות חשמל נפוצות — ביקור, תיקון קצר, שקעים, לוחות ועוד.",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
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
            <Link href="/" className="text-emerald-600 hover:underline font-bold">
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
              לקוחות יקרים, אנו מתגאים להיות בעלי תו האיכות{" "}
              <Link href="/" className="font-bold text-emerald-600 hover:underline">
                חשמלאי יצאת צדיק
              </Link>
              . המשמעות היא שאצלנו לא תמצאו &quot;מחירי פיתיון&quot; נמוכים
              שבשטח תופחים לאלפי שקלים. כל ביקור מלווה בשקיפות, הסבר בגובה
              העיניים, והצגת תעודות כנדרש. עבודות המצריכות חלקי חילוף או שינויי
              תשתית מהותיים יתומחרו בנפרד ולאחר הסכמתכם המלאה.
            </p>
          </div>
        </div>

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
