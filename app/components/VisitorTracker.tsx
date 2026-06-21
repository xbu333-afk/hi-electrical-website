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
  if (gclid || utm.toLowerCase().includes("cpc") || utm.toLowerCase().includes("paid")) {
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

    // Enter event
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

    // Exit event
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

      // Use sendBeacon for reliability on page unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/notify", new Blob([payload], { type: "application/json" }));
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
