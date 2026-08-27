"use client";

import HeroNightSosLink from "@/app/components/HeroNightSosLink";
import ShabbatContactMessage from "@/app/components/ShabbatContactMessage";
import WhatsAppIcon from "@/app/components/WhatsAppIcon";
import { useShabbatCheck } from "@/lib/use-shabbat-check";
import { PHONE, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/site";
import { getUiLabels, type UiLocale } from "@/lib/ui-labels";

type HeroContactButtonsProps = {
  whatsappHref?: string;
  locale?: UiLocale;
};

export default function HeroContactButtons({
  whatsappHref = WHATSAPP_HREF,
  locale = "he",
}: HeroContactButtonsProps) {
  const labels = getUiLabels(locale);
  const { isShabbat } = useShabbatCheck();

  if (isShabbat) {
    return <ShabbatContactMessage variant="default" className="w-full" />;
  }

  return (
    <>
      <div className="flex gap-2.5">
        <a
          href={`tel:${PHONE}`}
          data-analytics-location="hero-call"
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          aria-label={labels.callAria(PHONE_DISPLAY)}
        >
          <svg
            className="w-4 h-4 text-emerald-700 shrink-0"
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
          <span className="text-shine text-shine--fast font-bold">
            {labels.call}
          </span>
        </a>
        <a
          href={whatsappHref}
          data-analytics-location="hero-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          aria-label={labels.whatsappAria}
        >
          <WhatsAppIcon className="w-5 h-5 text-emerald-700 shrink-0" />
          WhatsApp
        </a>
      </div>
      <HeroNightSosLink locale={locale} />
    </>
  );
}
