"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_ID_KEY = "hi_elec_vid";

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function detectSource(searchParams: URLSearchParams): "mumooman" | "organic" {
  const utm = searchParams.get("utm_medium") ?? "";
  const gclid = searchParams.get("gclid");
  if (
    gclid ||
    utm.toLowerCase().includes("cpc") ||
    utm.toLowerCase().includes("paid")
  ) {
    return "mumooman";
  }
  return "organic";
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const logIdRef = useRef<number | null>(null);
  const sessionStartRef = useRef<number>(Date.now());
  const clickedRef = useRef<boolean>(false);
  const sessionInitRef = useRef<boolean>(false);
  const prevPathRef = useRef<string | null>(null);

  const pathnameRef = useRef(pathname);
  const sourceRef = useRef<"mumooman" | "organic">("organic");
  pathnameRef.current = pathname;
  sourceRef.current = detectSource(searchParams);

  // ── Click handler (attached once) ─────────────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("tel:") && !href.startsWith("https://wa.me")) return;
      if (clickedRef.current) return;

      clickedRef.current = true;

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "click",
          page_path: pathnameRef.current,
          source: sourceRef.current,
          log_id: logIdRef.current,
        }),
        keepalive: true,
      }).catch(() => {});
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // ── Session exit (attached once) ──────────────────────────────────────────
  useEffect(() => {
    function sendExit() {
      const duration = Math.round(
        (Date.now() - sessionStartRef.current) / 1000
      );
      const payload = JSON.stringify({
        event: "exit",
        log_id: logIdRef.current,
        duration,
        clicked_action: clickedRef.current,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/notify",
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    }

    window.addEventListener("beforeunload", sendExit);
    return () => window.removeEventListener("beforeunload", sendExit);
  }, []);

  // ── Enter (once) + navigate (route changes) ───────────────────────────────
  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    const source = detectSource(searchParams);

    // First page of session → enter + Pushover
    if (!sessionInitRef.current) {
      sessionInitRef.current = true;
      sessionStartRef.current = Date.now();
      prevPathRef.current = pathname;

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "enter",
          visitor_id: visitorId,
          page_path: pathname,
          source,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          logIdRef.current = data.log_id ?? null;
        })
        .catch(() => {});

      return;
    }

    // Route change within same session → DB only, no Pushover
    if (prevPathRef.current !== pathname && logIdRef.current) {
      prevPathRef.current = pathname;

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "navigate",
          log_id: logIdRef.current,
          page_path: pathname,
        }),
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname, searchParams]);

  return null;
}
