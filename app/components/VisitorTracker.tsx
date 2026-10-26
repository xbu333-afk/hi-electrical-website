"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { extractValueTrackParams } from "@/lib/valuetrack";
import { generateDeviceFingerprint } from "@/app/components/device-fingerprint";

const VISITOR_ID_KEY = "hi_elec_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds
const HEARTBEAT_MS = 15_000;
const HEARTBEAT_MAX_MS = 10 * 60_000; // stop pinging after 10 minutes

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
  // Iron rule: only a real GCLID in the URL counts as paid. UTM alone is organic.
  return searchParams.get("gclid")?.trim() ? "mumooman" : "organic";
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const logIdRef = useRef<number | null>(null);
  const sessionStartRef = useRef<number>(Date.now());
  const clickedRef = useRef<boolean>(false);
  const sessionInitRef = useRef<boolean>(false);
  const prevPathRef = useRef<string | null>(null);
  // Engagement signals (anti-fraud evidence)
  const touchCountRef = useRef<number>(0);
  const maxScrollPctRef = useRef<number>(0);
  const firstInteractionRef = useRef<number | null>(null);

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

  // ── Engagement tracking (attached once) ───────────────────────────────────
  useEffect(() => {
    function markInteraction() {
      if (firstInteractionRef.current === null) {
        firstInteractionRef.current = Date.now() - sessionStartRef.current;
      }
    }
    function onPointerDown() {
      touchCountRef.current = Math.min(touchCountRef.current + 1, 999);
      markInteraction();
    }
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct =
        scrollable > 0
          ? Math.round((window.scrollY / scrollable) * 100)
          : 100;
      if (pct > maxScrollPctRef.current) {
        maxScrollPctRef.current = Math.min(pct, 100);
      }
      if (window.scrollY > 0) markInteraction();
    }

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", markInteraction, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", markInteraction);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Duration + engagement reporting (attached once) ───────────────────────
  // Mobile browsers (especially iOS Safari) rarely fire beforeunload, so we
  // also report when the tab is hidden (switching to the dialer / WhatsApp,
  // locking the screen) and send a periodic heartbeat while it's visible.
  useEffect(() => {
    function report(event: "exit" | "ping") {
      if (!logIdRef.current) return;
      const payload = JSON.stringify({
        event,
        log_id: logIdRef.current,
        duration: Math.round((Date.now() - sessionStartRef.current) / 1000),
        clicked_action: clickedRef.current,
        touch_count: touchCountRef.current,
        scroll_pct: maxScrollPctRef.current,
        first_interaction_ms: firstInteractionRef.current,
      });
      try {
        if (
          navigator.sendBeacon &&
          navigator.sendBeacon(
            "/api/notify",
            new Blob([payload], { type: "application/json" })
          )
        ) {
          return;
        }
      } catch {
        /* fall through to fetch */
      }
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }

    const sendExit = () => report("exit");
    const onVisibility = () => {
      if (document.visibilityState === "hidden") report("exit");
    };
    const heartbeat = window.setInterval(() => {
      if (Date.now() - sessionStartRef.current > HEARTBEAT_MAX_MS) {
        window.clearInterval(heartbeat);
        return;
      }
      if (document.visibilityState === "visible") report("ping");
    }, HEARTBEAT_MS);

    window.addEventListener("beforeunload", sendExit);
    window.addEventListener("pagehide", sendExit);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("beforeunload", sendExit);
      window.removeEventListener("pagehide", sendExit);
      document.removeEventListener("visibilitychange", onVisibility);
    };
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

      // שימור GCLID לסשן הדפדפן — כדי ש-/get-quote יקבל ייחוס גם בלי ?gclid= בכתובת
      if (gclid && !gclid.startsWith("gtm_")) {
        try {
          sessionStorage.setItem("hi_elec_gclid", gclid);
          sessionStorage.setItem("hi_elec_vt", JSON.stringify(valueTrack));
        } catch {
          /* private mode / blocked storage */
        }
      }

      generateDeviceFingerprint()
        .then((deviceFingerprint) =>
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
              device_fingerprint: deviceFingerprint,
              automation:
                typeof navigator !== "undefined" &&
                (navigator as Navigator & { webdriver?: boolean }).webdriver === true,
              ...valueTrack,
            }),
          })
        )
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
