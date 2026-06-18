"use client";

import { useEffect } from "react";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

function getClickLocation(anchor: HTMLAnchorElement): string {
  return (
    anchor.getAttribute("data-analytics-location") ??
    anchor.getAttribute("aria-label") ??
    anchor.textContent?.trim() ??
    "unknown"
  );
}

function isWhatsAppHref(href: string): boolean {
  return href.includes("wa.me") || href.includes("whatsapp.com");
}

export default function AnalyticsClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const location = getClickLocation(anchor);

      if (href.startsWith("tel:")) {
        trackPhoneClick(location, href);
        return;
      }

      if (isWhatsAppHref(href)) {
        trackWhatsAppClick(location, href);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
