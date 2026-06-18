import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import CredentialsSection from "@/app/components/CredentialsSection";
import YatzaTzadikVideo from "@/app/components/YatzaTzadikVideo";
import CityAboutSection from "@/app/components/CityAboutSection";
import ReviewsSection from "@/app/components/ReviewsSection";
import ContactSection from "@/app/components/ContactSection";
import TrustStatement from "@/app/components/TrustStatement";
import { serviceAreas } from "@/lib/cities";
import { getCityContent } from "@/lib/city-content";
import { WHATSAPP_BASE } from "@/lib/site";

function getCityName(slug: string): string {
  return (
    serviceAreas.find((c) => c.slug === slug)?.name ??
    decodeURIComponent(slug)
  );
}

export async function generateStaticParams() {
  return serviceAreas.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata(
  props: PageProps<"/cities/[city]">
): Promise<Metadata> {
  const { city } = await props.params;
  const name = getCityName(city);
  return {
    title: `חשמלאי ב${name} - ח.י שירותי חשמל`,
    description: `חשמלאי מוסמך ב${name} עם ניסיון של מעל עשור. שירות מקצועי, תיקון קצרים, התקנת תאורה, לוחות חשמל, בית חכם ואחריות מלאה. יצאת צדיק.`,
    keywords: [
      `חשמלאי ב${name}`,
      "חשמלאי מוסמך",
      "תיקון קצרים",
      "התקנת תאורה",
      "יצאת צדיק",
      "חשמלאי מומלץ",
      "לוחות חשמל",
      "בית חכם",
    ],
    alternates: { canonical: `/cities/${city}` },
    openGraph: {
      title: `חשמלאי ב${name} - ח.י שירותי חשמל`,
      description: `שירותי חשמל מקצועיים ב${name}: תיקון קצרים, לוחות חשמל, תאורה ועוד. מומלץ ב'יצאת צדיק'.`,
    },
  };
}

export default async function CityPage(props: PageProps<"/cities/[city]">) {
  const { city } = await props.params;
  const cityName = getCityName(city);
  const content = getCityContent(city, cityName);

  const waHref = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `שלום יהודה, אני צריך חשמלאי ב${cityName}. אשמח לקבל פרטים.`
  )}`;

  return (
    <>
      <HeroSection
        cityName={cityName}
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
        cityName={cityName}
        subtext={`יהודה חכמוב — חשמלאי מוסמך ב${cityName} והסביבה. הנדסאי חשמל, בעל רישיון ראשי וחשמלאי יצאת צדיק. מענה בחירום לפי היכולת והזמינות.`}
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
