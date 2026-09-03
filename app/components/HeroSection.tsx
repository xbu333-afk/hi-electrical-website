import Image from "next/image";
import HeroContactButtons from "@/app/components/HeroContactButtons";
import HeroServices from "@/app/components/HeroServices";
import HeroVideo from "@/app/components/HeroVideo";
import { WHATSAPP_HREF } from "@/lib/site";
import { getUiLabels, type UiLocale } from "@/lib/ui-labels";

type HeroSectionProps = {
  cityName?: string;
  whatsappHref?: string;
  locale?: UiLocale;
};

function BrandMark({
  primary,
  secondary,
  as,
  id,
}: {
  primary: string;
  secondary: string;
  as: "h1" | "p";
  id?: string;
}) {
  const className =
    "relative z-10 flex items-center justify-center gap-2 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none text-center";
  const inner = (
    <>
      <span>
        <span className="text-emerald-700">{primary}</span>{" "}
        <span className="font-extrabold">{secondary}</span>
      </span>
      <Image
        src="/images/logo-hero-display@2x.webp"
        alt=""
        width={260}
        height={256}
        priority={true}
        sizes="(max-width: 640px) 48px, 64px"
        quality={85}
        className="h-[1em] w-auto object-contain pointer-events-none shrink-0"
        aria-hidden="true"
      />
    </>
  );

  if (as === "h1") {
    return (
      <h1 id={id} className={className}>
        {inner}
      </h1>
    );
  }

  return (
    <p id={id} className={className}>
      {inner}
    </p>
  );
}

function YatzaHangingSign({
  label,
  ariaLabel,
}: {
  label: string;
  ariaLabel: string;
}) {
  return (
    <div
      className="hero-hanging-sign mt-2 relative z-10"
      role="img"
      aria-label={ariaLabel}
    >
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
      <span className="hero-sticker">{label}</span>
    </div>
  );
}

export default function HeroSection({
  cityName,
  whatsappHref = WHATSAPP_HREF,
  locale = "he",
}: HeroSectionProps) {
  const labels = getUiLabels(locale);
  const isCityPage = Boolean(cityName);

  return (
    <section
      aria-labelledby={isCityPage ? "city-heading" : "hero-brand"}
      className="relative bg-white overflow-hidden"
    >
      <div
        className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-emerald-50 rounded-full opacity-60 pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-lg mx-auto px-6 pt-12 md:pt-20 pb-5 text-center">
        <div className="animate-fade-up flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center">
            {/* דף הבית: המותג הוא H1. עמודי ערים: המותג גלוי (לא H1) + H1 עם שם העיר. */}
            <BrandMark
              primary={isCityPage ? "ח.י" : labels.heroBrandPrimary}
              secondary={isCityPage ? "שירותי חשמל" : labels.heroBrandSecondary}
              as={isCityPage ? "p" : "h1"}
              id={isCityPage ? "city-brand" : "hero-brand"}
            />

            {isCityPage ? (
              <h1
                id="city-heading"
                className="relative z-10 mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug text-center"
              >
                חשמלאי מוסמך ב{cityName}
              </h1>
            ) : null}

            <YatzaHangingSign
              label={labels.heroHangingSign}
              ariaLabel={labels.heroHangingSignAria}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <HeroVideo />
      </div>

      <div className="relative max-w-lg mx-auto px-6 pb-12 md:pb-20 pt-7 text-center">
        <div className="space-y-2.5 animate-fade-up [animation-delay:200ms]">
          <HeroContactButtons whatsappHref={whatsappHref} locale={locale} />
        </div>

        <HeroServices cityName={cityName} locale={locale} />
      </div>
    </section>
  );
}
