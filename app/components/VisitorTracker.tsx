"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_ID_KEY = "hi_elec_vid";
const SESSION_NOTIFIED_KEY = "hi_elec_notified";

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

function isFirstVisitThisSession(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_NOTIFIED_KEY)) return false;
    sessionStorage.setItem(SESSION_NOTIFIED_KEY, "1");
    return true;
  } catch {
    return true;
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
  const enterTimeRef = useRef<number>(Date.now());
  const clickedRef = useRef<boolean>(false);

  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    const source = detectSource(searchParams);
    enterTimeRef.current = Date.now();
    clickedRef.current = false;

    // Track phone / WhatsApp link clicks
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      if (href.startsWith("tel:") || href.startsWith("https://wa.me")) {
        clickedRef.current = true;
      }
    }
    document.addEventListener("click", handleClick);

    // Only send Pushover on the FIRST page of each session
    const sendPushover = isFirstVisitThisSession();

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "enter",
        visitor_id: visitorId,
        page_path: pathname,
        source,
        send_pushover: sendPushover,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        logIdRef.current = data.log_id ?? null;
      })
      .catch(() => {});

    function sendExit() {
      const duration = Math.round((Date.now() - enterTimeRef.current) / 1000);
      const payload = JSON.stringify({
        event: "exit",
        visitor_id: visitorId,
        page_path: pathname,
        source,
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

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", sendExit);
    };
  }, [pathname, searchParams]);

  return null;
}
