import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import DeviceCalculator from "./DeviceCalculator";

export const metadata: Metadata = {
  title:
    "מחשבון צריכת חשמל לפי מכשיר 2026 | כמה עולה להפעיל מזגן? | ח.י שירותי חשמל",
  description:
    "המחשבון המדויק שיגלה לכם כמה עולה להפעיל דוד, מכונת כביסה, תנור או מזגן. בדקו את צריכת החשמל הביתית שלכם וחסכו מאות שקלים בחודש.",
  alternates: {
    canonical: `${SITE_URL}/device-calculator`,
  },
  openGraph: {
    title: "מחשבון צריכת חשמל לפי מכשיר | ח.י שירותי חשמל",
    description:
      "בחרו מכשיר, הזינו זמן שימוש וגלו כמה עולה דוד, מזגן, תנור ועוד.",
  },
};

export default function DeviceCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bold mb-6 text-sm">
            <span>כלי חינמי לחיסכון בחשבון החשמל</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
            מחשבון צריכת חשמל לפי מכשיר 💡
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            רוצים לדעת כמה באמת עולה המקלחת החמה שלכם או שעת עבודה של המזגן?
            בחרו מכשיר, הזינו את זמן השימוש, וגלו בדיוק על מה אתם משלמים.
          </p>
        </header>

        <DeviceCalculator />
      </div>
    </div>
  );
}
