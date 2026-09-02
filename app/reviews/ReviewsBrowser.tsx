"use client";

import { useMemo, useState } from "react";
import type { ReviewServiceId, SiteReview } from "@/lib/reviews";

type ReviewsBrowserProps = {
  reviews: readonly SiteReview[];
  cities: readonly string[];
  services: readonly { id: ReviewServiceId; label: string }[];
};

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
  cities,
  services,
}: ReviewsBrowserProps) {
  const [city, setCity] = useState("");
  const [service, setService] = useState("");

  const filtered = useMemo(() => {
    return reviews.filter((review) => {
      if (city && !review.cities.includes(city)) return false;
      if (service && !review.services.includes(service as ReviewServiceId)) {
        return false;
      }
      return true;
    });
  }, [reviews, city, service]);

  const hasActiveFilter = Boolean(city || service);

  return (
    <div>
      <form
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        aria-label="סינון המלצות"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="review-city" className="mb-2 block text-sm font-bold text-slate-800">
              סינון לפי עיר
            </label>
            <select
              id="review-city"
              className={SELECT_CLASS}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={cities.length === 0}
            >
              <option value="">כל הערים</option>
              {cities.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-slate-500">
              הסינון לפי עיר מציג רק המלצות שבהן צוינה עיר בטקסט עצמו.
            </p>
          </div>

          <div>
            <label htmlFor="review-service" className="mb-2 block text-sm font-bold text-slate-800">
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
          </div>
        </div>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={() => {
              setCity("");
              setService("");
            }}
            className="mt-4 text-sm font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
          >
            נקו סינון
          </button>
        )}
      </form>

      <p className="mt-5 text-sm text-slate-600" aria-live="polite">
        מציגים {filtered.length} מתוך {reviews.length} המלצות
        {city ? ` · ${city}` : ""}
        {service
          ? ` · ${services.find((s) => s.id === service)?.label ?? ""}`
          : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          לא נמצאו המלצות להתאמה הזו. נסו לבחור סינון רחב יותר.
        </p>
      ) : (
        <ul className="mt-6 grid list-none grid-cols-1 gap-4 md:grid-cols-2" role="list">
          {filtered.map((review) => (
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
                  {(review.cities.length > 0 ||
                    (review.services.length > 0 &&
                      !(
                        review.services.length === 1 &&
                        review.services[0] === "general"
                      ))) && (
                    <ul className="mt-2 flex list-none flex-wrap gap-1.5" aria-label="תגיות">
                      {review.cities.map((c) => (
                        <li
                          key={c}
                          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700"
                        >
                          {c}
                        </li>
                      ))}
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
      )}
    </div>
  );
}
