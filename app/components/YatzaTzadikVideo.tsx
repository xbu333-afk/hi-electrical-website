"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "Ty-v9miiC7U";
const VIDEO_START = 2;
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?start=${VIDEO_START}&rel=0`;

export default function YatzaTzadikVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEmbedSrc(EMBED_SRC);
            observer.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    setEmbedSrc(EMBED_SRC);
  }, []);

  return (
    <div className="mt-10 animate-fade-up [animation-delay:500ms]">
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-slate-100"
      >
        {embedSrc ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedSrc}
            title="יהודה חכמוב — יצאת צדיק עם חיים אתגר"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            aria-label="סרטון: יצאת צדיק עם חיים אתגר — ערוץ 12"
          />
        ) : null}
      </div>
    </div>
  );
}
