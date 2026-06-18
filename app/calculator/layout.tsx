import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "מחשבון חשמל – כמה באמת עולה לכם?",
  description:
    "מחשבון חשמל חינמי: הזינו קריאת מונה נוכחית וקודמת וחשבו את צריכת הקוט\"ש ועלות החשבון. כלי SEO ללקוחות ח.י שירותי חשמל.",
  alternates: {
    canonical: `${SITE_URL}/calculator`,
  },
  openGraph: {
    title: "מחשבון חשמל – ח.י שירותי חשמל",
    description:
      "חשבו כמה אתם אמורים לשלם לחברת החשמל לפי קריאת המונה.",
  },
};

export default function CalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
