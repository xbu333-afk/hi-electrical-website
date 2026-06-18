"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_ARIA_LABEL, HERO_VIDEO_SRC } from "@/lib/hero-video";

function deferUntilPageReady(onReady: () => void): () => void {
  let cancelled = false;

  const schedule = (): (() => void) => {
    const run = () => {
      if (!cancelled) onReady();
    };

    if (typeof requestIdleCallback !== "undefined") {
      const idleId = requestIdleCallback(run, { timeout: 3000 });
      return () => cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(run, 1);
    return () => clearTimeout(timeoutId);
  };

  let cancelSchedule: (() => void) | undefined;

  if (document.readyState === "complete") {
    cancelSchedule = schedule();
  } else {
    const onLoad = () => {
      cancelSchedule = schedule();
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      cancelSchedule?.();
    };
  }

  return () => {
    cancelled = true;
    cancelSchedule?.();
  };
}

export default function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => deferUntilPageReady(() => setShouldLoadVideo(true)), []);

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

  if (!shouldLoadVideo) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-label={HERO_VIDEO_ARIA_LABEL}
      className={`absolute inset-0 block w-full h-auto transition-opacity duration-300 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
