"use client";

import { useEffect, useState } from "react";
import { isNightServiceHours } from "@/lib/night-service";
import { PHONE } from "@/lib/site";
import { getUiLabels, type UiLocale } from "@/lib/ui-labels";

export default function HeroNightSosLink({ locale = "he" }: { locale?: UiLocale }) {
  const labels = getUiLabels(locale);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const update = () => setIsNight(isNightServiceHours());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!isNight) return null;

  return (
    <a
      href={`tel:${PHONE}`}
      data-analytics-location="hero-night-sos"
      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 rounded-xl transition-colors"
      aria-label={labels.nightSosAria}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
      {labels.nightSos}
    </a>
  );
}
