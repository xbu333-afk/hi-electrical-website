"use client";

import dynamic from "next/dynamic";

const HeroVideoPlayer = dynamic(() => import("@/app/components/HeroVideoPlayer"), {
  ssr: false,
});

export default HeroVideoPlayer;
