"use client";

import dynamic from "next/dynamic";

const CredentialsSection = dynamic(
  () => import("@/app/components/CredentialsSection"),
  {
    loading: () => (
      <div
        className="bg-slate-50 border-y border-gray-100 py-10 md:py-14"
        aria-hidden="true"
      >
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const YatzaTzadikVideo = dynamic(
  () => import("@/app/components/LazyYatzaTzadikVideo"),
  {
    ssr: false,
    loading: () => (
      <div
        className="mt-10 aspect-video rounded-2xl bg-slate-100 border border-gray-100"
        aria-hidden="true"
      />
    ),
  }
);

const ReviewsSection = dynamic(() => import("@/app/components/ReviewsSection"), {
  loading: () => (
    <div className="bg-slate-50 py-16 md:py-24 border-t border-gray-100" aria-hidden="true">
      <div className="max-w-5xl mx-auto px-6 h-48 rounded-2xl bg-slate-100 animate-pulse" />
    </div>
  ),
});

const TrustStatement = dynamic(() => import("@/app/components/TrustStatement"));

const PressSection = dynamic(() => import("@/app/components/PressSection"), {
  loading: () => (
    <div className="bg-slate-50 py-16 md:py-24 border-t border-gray-100" aria-hidden="true">
      <div className="max-w-5xl mx-auto px-6 h-64 rounded-2xl bg-slate-100 animate-pulse" />
    </div>
  ),
});

const ContactSection = dynamic(() => import("@/app/components/ContactSection"));

export function LazyCredentialsSection() {
  return <CredentialsSection />;
}

export function LazyYatzaTzadikBlock() {
  return (
    <div className="bg-slate-50 border-b border-gray-100 pb-10 md:pb-14">
      <div className="max-w-4xl mx-auto px-6">
        <YatzaTzadikVideo />
      </div>
    </div>
  );
}

export function LazyReviewsSection() {
  return <ReviewsSection />;
}

export function LazyTrustStatement() {
  return <TrustStatement />;
}

export function LazyPressSection() {
  return <PressSection />;
}

export function LazyContactSection() {
  return <ContactSection />;
}
