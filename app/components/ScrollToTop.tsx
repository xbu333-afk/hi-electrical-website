"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function scrollToTopInstant() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

function ScrollToTopInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPopNavigationRef = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isPopNavigationRef.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Scroll only after the route has changed — never on click of the old page
  // (that caused a visible jump-to-top before navigation finished).
  useLayoutEffect(() => {
    if (isPopNavigationRef.current) return;

    scrollToTopInstant();

    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash));
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isPopNavigationRef.current) {
      isPopNavigationRef.current = false;
      return;
    }

    scrollToTopInstant();

    const hash = window.location.hash;
    if (!hash) return;

    const frame = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams]);

  return null;
}

export default function ScrollToTop() {
  return (
    <Suspense fallback={null}>
      <ScrollToTopInner />
    </Suspense>
  );
}
