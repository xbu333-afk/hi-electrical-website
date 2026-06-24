"use client";

import { useEffect } from "react";

/** Registers the admin service worker — required for PWA installability on Android. */
export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/admin-sw.js", { scope: "/admin/" })
        .catch(() => {
          // SW registration failure is non-fatal — page works normally
        });
    }
  }, []);
  return null;
}
