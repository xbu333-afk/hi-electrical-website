"use client";

import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/app/components/ScrollToTop"), {
  ssr: false,
});

export default ScrollToTop;
