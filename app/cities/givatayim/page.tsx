import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import CredentialsSection from "@/app/components/CredentialsSection";
import YatzaTzadikVideo from "@/app/components/LazyYatzaTzadikVideo";
import CityAboutSection from "@/app/components/CityAboutSection";
import ReviewsSection from "@/app/components/ReviewsSection";
import ContactSection from "@/app/components/ContactSection";
import TrustStatement from "@/app/components/TrustStatement";
import { getCityContent } from "@/lib/city-content";
import { WHATSAPP_BASE } from "@/lib/site";

const CITY_SLUG = "givatayim";
const CITY_NAME = "גבעתיים";

export const metadata: Metadata = {
  title: `חשמלאי ב${CITY_NAME} - ח.י שירותי חשמל`,
  description: `חשמלאי מוסמך ב${CITY_NAME} עם ניסיון של מעל עשור. שירות מקצועי, תיקון קצרים, התקנת תאורה, לוחות חשמל, בית חכם ואחריות מלאה. יצאת צדיק.`,
  keywords: [
    `חשמלאי ב${CITY_NAME}`,
    "חשמלאי מוסמך",
    "תיקון קצרים",
    "התקנת תאורה",
    "יצאת צדיק",
    "חשמלאי מומלץ",
    "לוחות חשמל",
    "בית חכם",
  ],
  alternates: { canonical: `/cities/${CITY_SLUG}` },
  openGraph: {
    title: `חשמלאי ב${CITY_NAME} - ח.י שירותי חשמל`,
    description: `שירותי חשמל מקצועיים ב${CITY_NAME}: תיקון קצרים, לוחות חשמל, תאורה ועוד. מומלץ ב'יצאת צדיק'.`,
  },
};

export default function GivatayimCityPage() {
  const content = getCityContent(CITY_SLUG, CITY_NAME);

  const waHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `שלום יהודה, אני צריך חשמלאי ב${CITY_NAME}. אשמח לקבל פרטים.`
  )}`;

  return (
    <>
      <HeroSection
        cityName={CITY_NAME}
        whatsappHref={waHref}
      />

      <CredentialsSection />

      <div className="bg-slate-50 border-b border-gray-100 pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto px-6">
          <YatzaTzadikVideo />
        </div>
      </div>

      <CityAboutSection content={content} />

      <ReviewsSection />

      <TrustStatement />

      <ContactSection
        cityName={CITY_NAME}
        subtext={`יהודה חכמוב — חשמלאי מוסמך ב${CITY_NAME} והסביבה. הנדסאי חשמל, בעל רישיון ראשי וחשמלאי יצאת צדיק. מענה בחירום לפי היכולת והזמינות.`}
        whatsappHref={waHref}
      />

      <div className="bg-white border-t border-gray-100 py-6 text-center">
        <Link
          href="/cities"
          className="text-slate-500 hover:text-emerald-700 text-sm transition-colors"
        >
          ← כל אזורי השירות
        </Link>
      </div>
    </>
  );
}
