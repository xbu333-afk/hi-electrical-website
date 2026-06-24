"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { extractValueTrackParams } from "@/lib/valuetrack";

const VISITOR_ID_KEY = "hi_elec_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

function readCookie(name: string): string | null {
  try {
    const match = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(name + "="));
    return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
  } catch {
    return null;
  }
}

function writeCookie(name: string, value: string): void {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  } catch {
    // ignore — cookie write failed (e.g. iframe restrictions)
  }
}

function getOrCreateVisitorId(): string {
  // Cookie is the primary persistent store (survives mobile browser eviction of localStorage)
  const fromCookie = readCookie(VISITOR_ID_KEY);
  if (fromCookie) {
    // Refresh cookie TTL on every visit
    writeCookie(VISITOR_ID_KEY, fromCookie);
    try { localStorage.setItem(VISITOR_ID_KEY, fromCookie); } catch { /* ignore */ }
    return fromCookie;
  }
  // Fallback: localStorage (may have been set before cookie logic was added)
  try {
    const fromStorage = localStorage.getItem(VISITOR_ID_KEY);
    if (fromStorage) {
      writeCookie(VISITOR_ID_KEY, fromStorage);
      return fromStorage;
    }
  } catch { /* ignore */ }
  // Generate fresh ID
  const id = crypto.randomUUID();
  writeCookie(VISITOR_ID_KEY, id);
  try { localStorage.setItem(VISITOR_ID_KEY, id); } catch { /* ignore */ }
  return id;
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

      const gclid = searchParams.get("gclid") ?? null;
      const valueTrack = extractValueTrackParams(searchParams);
      const browserLanguage =
        typeof navigator !== "undefined" ? navigator.language : null;

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "enter",
          visitor_id: visitorId,
          page_path: pathname,
          source,
          gclid,
          browser_language: browserLanguage,
          ...valueTrack,
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
