"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_ARIA_LABEL,
  HERO_VIDEO_POSTER,
  HERO_VIDEO_POSTER_HEIGHT,
  HERO_VIDEO_POSTER_WIDTH,
  HERO_VIDEO_SRC,
} from "@/lib/hero-video";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        },
        { rootMargin: "120px" }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    setShouldLoadVideo(true);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const markPlaying = () => setPlaying(true);
    const markPaused = () => setPlaying(false);

    video.addEventListener("playing", markPlaying);
    video.addEventListener("ended", markPlaying);
    video.addEventListener("error", markPaused);

    const tryPlay = () => {
      video.play().catch(markPaused);
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
    }

    const timeout = window.setTimeout(() => {
      if (video.paused) markPaused();
    }, 2500);

    return () => {
      video.removeEventListener("playing", markPlaying);
      video.removeEventListener("ended", markPlaying);
      video.removeEventListener("error", markPaused);
      window.clearTimeout(timeout);
    };
  }, [shouldLoadVideo]);

  return (
    <div ref={containerRef} className="relative w-full bg-slate-100">
      <Image
        src={HERO_VIDEO_POSTER}
        alt={HERO_VIDEO_ARIA_LABEL}
        width={HERO_VIDEO_POSTER_WIDTH}
        height={HERO_VIDEO_POSTER_HEIGHT}
        priority
        sizes="100vw"
        quality={80}
        className={`block w-full h-auto transition-opacity duration-300 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={HERO_VIDEO_ARIA_LABEL}
          className={`absolute inset-0 block w-full h-auto transition-opacity duration-300 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
