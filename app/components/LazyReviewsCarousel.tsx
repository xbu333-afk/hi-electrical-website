"use client";

import dynamic from "next/dynamic";
import type { GoogleReview } from "@/lib/google-reviews";

const ReviewsCarousel = dynamic(() => import("@/app/components/ReviewsCarousel"), {
  ssr: false,
  loading: () => (
    <div className="h-48 rounded-2xl bg-slate-100 animate-pulse" aria-hidden="true" />
  ),
});

type LazyReviewsCarouselProps = {
  reviews: GoogleReview[];
};

export default function LazyReviewsCarousel({ reviews }: LazyReviewsCarouselProps) {
  return <ReviewsCarousel reviews={reviews} />;
}
