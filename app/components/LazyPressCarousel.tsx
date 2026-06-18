"use client";

import dynamic from "next/dynamic";

const PressCarousel = dynamic(() => import("@/app/components/PressCarousel"), {
  ssr: false,
  loading: () => (
    <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" aria-hidden="true" />
  ),
});

export default function LazyPressCarousel() {
  return <PressCarousel />;
}
