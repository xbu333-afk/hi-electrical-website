import LazyReviewsCarousel from "@/app/components/LazyReviewsCarousel";
import {
  GOOGLE_AVERAGE_RATING,
  GOOGLE_REVIEWS,
  GOOGLE_REVIEW_TOTAL,
} from "@/lib/google-reviews";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`דירוג: ${count} כוכבים`}>
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

export default function ReviewsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="reviews-heading"
      className="bg-slate-50 py-16 md:py-24 border-t border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            המלצות
          </p>
          <h2
            id="reviews-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2"
          >
            לקוחות ממליצים
          </h2>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-2">
            <Stars count={GOOGLE_AVERAGE_RATING} />
            <span className="text-slate-600 text-sm font-medium">
              {GOOGLE_AVERAGE_RATING.toFixed(1)} ·
            </span>
            <span className="text-slate-400 text-sm">
              {GOOGLE_REVIEW_TOTAL} המלצות
            </span>
          </div>
        </div>

        <LazyReviewsCarousel reviews={GOOGLE_REVIEWS} />
      </div>
    </section>
  );
}
