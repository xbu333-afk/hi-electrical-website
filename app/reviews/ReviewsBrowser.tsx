"use client";

import { useEffect, useMemo, useState } from "react";
import {
  interleaveReviewsByLength,
  type ReviewServiceId,
  type SiteReview,
} from "@/lib/reviews";

type ReviewsBrowserProps = {
  reviews: readonly SiteReview[];
  services: readonly { id: ReviewServiceId; label: string }[];
};

const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 10;

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`דירוג: ${count} כוכבים`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
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

const SELECT_CLASS =
  "w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30";

export default function ReviewsBrowser({
  reviews,
  services,
}: ReviewsBrowserProps) {
  const [service, setService] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const ordered = useMemo(() => {
    const filtered = service
      ? reviews.filter((review) =>
          review.services.includes(service as ReviewServiceId)
        )
      : reviews;
    return interleaveReviewsByLength(filtered);
  }, [reviews, service]);

  // איפוס העמוד הראשון בכל שינוי סינון
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [service]);

  const visible = ordered.slice(0, visibleCount);
  const hasMore = visibleCount < ordered.length;

  return (
    <div>
      <form
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        aria-label="סינון המלצות"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="review-service"
          className="mb-2 block text-sm font-bold text-slate-800"
        >
          סינון לפי סוג שירות
        </label>
        <select
          id="review-service"
          className={SELECT_CLASS}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">כל סוגי השירות</option>
          {services.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>

        {service && (
          <button
            type="button"
            onClick={() => setService("")}
            className="mt-4 text-sm font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
          >
            נקו סינון
          </button>
        )}
      </form>

      {ordered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          לא נמצאו המלצות להתאמה הזו. נסו לבחור סינון רחב יותר.
        </p>
      ) : (
        <>
          <ul
            className="mt-6 grid list-none grid-cols-1 gap-4 md:grid-cols-2"
            role="list"
          >
            {visible.map((review) => (
              <li
                key={review.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${review.color}`}
                  >
                    {review.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-base font-bold text-slate-900">
                        {review.name}
                      </p>
                      <Stars count={review.rating} />
                    </div>
                    {review.services.some((id) => id !== "general") && (
                      <ul
                        className="mt-2 flex list-none flex-wrap gap-1.5"
                        aria-label="תגיות שירות"
                      >
                        {review.services
                          .filter((id) => id !== "general")
                          .map((id) => (
                            <li
                              key={id}
                              className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-900"
                            >
                              {services.find((s) => s.id === id)?.label ?? id}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  {review.text}
                </p>
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((n) =>
                    Math.min(n + LOAD_MORE_COUNT, ordered.length)
                  )
                }
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border-2 border-emerald-700 bg-white px-8 text-base font-bold text-emerald-800 transition-colors hover:bg-emerald-50"
              >
                הצג עוד
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
