"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isNightServiceHours } from "@/lib/night-service";
import { PHONE } from "@/lib/site";
import { getUiLabels } from "@/lib/ui-labels";

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

export default function FloatingContactBar() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/ru") ? "ru" : "he";
  const labels = getUiLabels(locale);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const update = () => setIsNight(isNightServiceHours());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (isNight) {
    return (
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 md:hidden glass-light shadow-2xl rounded-full border border-gray-200 p-2"
        role="region"
        aria-label={labels.floatingNightRegion}
      >
        <a
          href={`tel:${PHONE}`}
          data-analytics-location="floating-night-sos"
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-sm px-5 py-3 rounded-full transition-colors shadow-sm w-full"
          aria-label={labels.nightSosAria}
        >
          <PhoneIcon className="w-4 h-4 shrink-0" />
          {labels.nightSos}
        </a>
      </div>
    );
  }

  return (
    <a
      href={`tel:${PHONE}`}
      data-analytics-location="floating-call"
      className="fixed bottom-6 left-4 z-50 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 border border-emerald-500/20 animate-fade-up"
      aria-label={labels.floatingCallAria}
    >
      <PhoneIcon className="w-6 h-6" />
    </a>
  );
}
