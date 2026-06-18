"use client";

import dynamic from "next/dynamic";

// Defers GTM + AnalyticsClickTracker out of the initial JS bundle.
// ssr: false must live in a Client Component per Next.js rules.
const LazyGoogleTagManager = dynamic(
  () => import("@/app/components/LazyGoogleTagManager"),
  { ssr: false }
);

export default function DeferredGoogleTagManager() {
  return <LazyGoogleTagManager />;
}
