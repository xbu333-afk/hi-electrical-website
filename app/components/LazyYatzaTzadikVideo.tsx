"use client";

import dynamic from "next/dynamic";

const YatzaTzadikVideo = dynamic(() => import("@/app/components/YatzaTzadikVideo"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-10 aspect-video rounded-2xl bg-slate-100 border border-gray-100"
      aria-hidden="true"
    />
  ),
});

export default YatzaTzadikVideo;
