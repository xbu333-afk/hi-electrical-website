import Link from "next/link";
import LazyReviewsCarousel from "@/app/components/LazyReviewsCarousel";
import { GOOGLE_REVIEWS } from "@/lib/google-reviews";

export default function ReviewsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="reviews-heading"
      className="bg-slate-50 py-16 md:py-24 border-t border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-2">
            המלצות
          </p>
          <h2
            id="reviews-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2"
          >
            לקוחות ממליצים
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            מאות המלצות ומשובי לקוחות
          </p>
        </div>

        <LazyReviewsCarousel reviews={GOOGLE_REVIEWS} />

        <div className="mt-8 flex justify-center">
          <Link
            href="/reviews"
            className="text-sm font-medium text-emerald-700 underline-offset-4 transition-colors hover:text-emerald-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 rounded-sm"
          >
            לקריאת כל ההמלצות
          </Link>
        </div>
      </div>
    </section>
  );
}
