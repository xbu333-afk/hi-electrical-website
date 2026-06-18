"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PRESS_SLIDES } from "@/lib/press-slides";

const INTERVAL_MS = 6000;
const CAROUSEL_ID = "press-carousel";

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      {direction === "prev" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      )}
    </svg>
  );
}

export default function PressCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const regionRef = useRef<HTMLDivElement>(null);

  const total = PRESS_SLIDES.length;
  const slide = PRESS_SLIDES[index];

  const goTo = useCallback((next: number) => {
    setIndex(((next % total) + total) % total);
  }, [total]);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || total <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, reducedMotion, total]);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goNext();
          break;
        case "ArrowRight":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
        default:
          break;
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo, total]);

  const image = (
    <Image
      src={slide.src}
      alt={slide.alt}
      width={slide.width}
      height={slide.height}
      className="w-full h-auto object-contain max-h-[70vh] rounded-xl"
      sizes="(max-width: 768px) 100vw, 768px"
      priority={index === 0}
    />
  );

  return (
    <div
      ref={regionRef}
      id={CAROUSEL_ID}
      role="region"
      aria-roledescription="קרוסלה"
      aria-label="בכותרות ובתקשורת"
      tabIndex={0}
      className="relative mx-auto max-w-3xl rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        <figure key={slide.id} className="p-4 md:p-6">
          <div className="bg-slate-50 rounded-xl overflow-hidden border border-gray-100">
            {slide.href ? (
              <Link
                href={slide.href}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset"
                aria-label={`${slide.caption} — קרא את המאמר`}
              >
                {image}
              </Link>
            ) : (
              image
            )}
          </div>
          <figcaption className="mt-4 text-center text-sm font-semibold text-slate-700">
            {slide.href ? (
              <Link href={slide.href} className="text-emerald-700 hover:underline">
                {slide.caption}
              </Link>
            ) : (
              slide.caption
            )}
            <span className="block text-xs font-normal text-slate-400 mt-1">
              שקף {index + 1} מתוך {total}
            </span>
          </figcaption>
        </figure>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-slate-700 shadow-md hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
            aria-label="שקף קודם"
            aria-controls={CAROUSEL_ID}
          >
            <ChevronIcon direction="prev" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-slate-700 shadow-md hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
            aria-label="שקף הבא"
            aria-controls={CAROUSEL_ID}
          >
            <ChevronIcon direction="next" />
          </button>

          <div
            className="flex justify-center gap-2 mt-6"
            role="tablist"
            aria-label="בחירת שקף"
          >
            {PRESS_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`עבור לשקף ${i + 1}: ${s.caption}`}
                aria-controls={CAROUSEL_ID}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-emerald-600"
                    : "w-2.5 bg-slate-300 hover:bg-emerald-300"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <p className="sr-only">
        השתמשו בחצי המקלדת או בכפתורי הניווט כדי לעבור בין השקפים.
        {reducedMotion
          ? " הקרוסלה אינה מתחלפת אוטומטית בשל העדפת הפחתת תנועה."
          : " הקרוסלה מתחלפת אוטומטית כל כמה שניות."}
      </p>
    </div>
  );
}
