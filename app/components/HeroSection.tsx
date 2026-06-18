import Image from "next/image";
import HeroNightSosLink from "@/app/components/HeroNightSosLink";
import HeroServices from "@/app/components/HeroServices";
import HeroVideo from "@/app/components/HeroVideo";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import { PHONE, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/site";
import { getUiLabels, type UiLocale } from "@/lib/ui-labels";

type HeroSectionProps = {
  cityName?: string;
  whatsappHref?: string;
  locale?: UiLocale;
};

export default function HeroSection({
  cityName,
  whatsappHref = WHATSAPP_HREF,
  locale = "he",
}: HeroSectionProps) {
  const labels = getUiLabels(locale);

  return (
    <section
      aria-labelledby={cityName ? "city-tagline" : "hero-brand"}
      className="relative bg-white overflow-hidden"
    >
      <div
        className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-emerald-50 rounded-full opacity-60 pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-lg mx-auto px-6 pt-12 md:pt-20 pb-5 text-center">
        <div className="animate-fade-up flex flex-col items-center">
          {cityName && (
            <p
              id="city-tagline"
              className="relative z-10 text-base sm:text-lg font-bold text-slate-600 mb-4 leading-snug"
            >
              {labels.cityTaglinePrefix}{" "}
              <span className="text-emerald-600">
                {locale === "he" ? `ב${cityName}` : cityName}
              </span>{" "}
              {labels.cityTaglineSuffix}
            </p>
          )}

          <div className="relative w-full flex flex-col items-center">
            <h1
              id="hero-brand"
              className="relative z-10 flex items-center justify-center gap-2 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none text-center"
            >
              <span>
                <span className="text-emerald-600">{labels.heroBrandPrimary}</span>{" "}
                <span className="font-extrabold">{labels.heroBrandSecondary}</span>
              </span>
              <Image
                src="/images/logo-hero-display@2x.png"
                alt=""
                width={260}
                height={256}
                quality={85}
                className="h-[1em] w-auto object-contain pointer-events-none shrink-0"
                aria-hidden="true"
              />
            </h1>

            <div className="hero-hanging-sign mt-2 relative z-10" aria-label={labels.heroHangingSignAria}>
              <svg
                className="hero-hanging-wires"
                viewBox="0 0 120 22"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M60 0 L18 20"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M60 0 L102 20"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hero-sticker">{labels.heroHangingSign}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <HeroVideo />
      </div>

      <div className="relative max-w-lg mx-auto px-6 pb-12 md:pb-20 pt-7 text-center">
        <div className="space-y-2.5 animate-fade-up [animation-delay:200ms]">
          <div className="flex gap-2.5">
            <a
              href={`tel:${PHONE}`}
              data-analytics-location="hero-call"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all"
              aria-label={labels.callAria(PHONE_DISPLAY)}
            >
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span className="text-shine text-shine--fast font-bold">{labels.call}</span>
            </a>
            <a
              href={whatsappHref}
              data-analytics-location="hero-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all"
              aria-label={labels.whatsappAria}
            >
              <WhatsAppIcon className="w-5 h-5 text-emerald-600 shrink-0" />
              WhatsApp
            </a>
          </div>
          <HeroNightSosLink locale={locale} />
        </div>

        <HeroServices cityName={cityName} locale={locale} />
      </div>
    </section>
  );
}
