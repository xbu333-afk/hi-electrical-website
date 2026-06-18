"use client";

import { useEffect, useState } from "react";
import type { GoogleReview } from "@/lib/google-reviews";

const INTERVAL_MS = 5500;

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`דירוג: ${count} כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type ReviewsCarouselProps = {
  reviews: GoogleReview[];
};

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reviews.length <= 1) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, reviews.length]);

  if (reviews.length === 0) return null;

  const review = reviews[index];

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl" aria-live="polite" aria-atomic="true">
        <figure
          key={`${review.name}-${index}`}
          className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4 animate-fade-in min-h-[220px] select-none touch-pan-y"
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          onPointerCancel={() => setPaused(false)}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`${review.color} w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}
              aria-hidden="true"
            >
              {review.initials}
            </span>
            <figcaption className="min-w-0 text-start">
              <div className="text-slate-900 font-bold text-sm truncate">{review.name}</div>
            </figcaption>
          </div>

          <Stars count={review.stars} />

          <blockquote>
            <p className="text-slate-600 text-base leading-relaxed">
              {review.text}
            </p>
          </blockquote>
        </figure>
      </div>
    </div>
  );
}
