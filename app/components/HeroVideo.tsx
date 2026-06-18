"use client";

import { useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_ARIA_LABEL,
  HERO_VIDEO_POSTER,
  HERO_VIDEO_SRC,
} from "@/lib/hero-video";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={HERO_VIDEO_POSTER}
        aria-label={HERO_VIDEO_ARIA_LABEL}
        className="block w-full h-auto"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {!playing && (
        <img
          src={HERO_VIDEO_POSTER}
          alt={HERO_VIDEO_ARIA_LABEL}
          className="absolute inset-0 block w-full h-auto pointer-events-none"
          decoding="async"
          fetchPriority="high"
        />
      )}
    </div>
  );
}
