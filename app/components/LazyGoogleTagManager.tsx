"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import AnalyticsClickTracker from "@/app/components/AnalyticsClickTracker";
import {
  GTM_AUTO_LOAD_MS,
  initDataLayer,
  onGtmLoadRequested,
  requestGtmLoad,
} from "@/lib/gtm-loader";

const GTM_ID = "GTM-NCBBQJT";

export default function LazyGoogleTagManager() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    initDataLayer();

    const mountGtm = () => setShouldLoad(true);
    const unsubscribe = onGtmLoadRequested(mountGtm);

    const onInteraction = () => requestGtmLoad();

    const autoLoadId = window.setTimeout(() => requestGtmLoad(), GTM_AUTO_LOAD_MS);

    window.addEventListener("scroll", onInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", onInteraction, { passive: true, once: true });
    window.addEventListener("click", onInteraction, { capture: true, once: true });

    return () => {
      unsubscribe();
      window.clearTimeout(autoLoadId);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("click", onInteraction, true);
    };
  }, []);

  return (
    <>
      <AnalyticsClickTracker />
      {shouldLoad ? <GoogleTagManager gtmId={GTM_ID} /> : null}
    </>
  );
}
