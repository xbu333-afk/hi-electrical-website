import Image from "next/image";
import LazyHeroVideoPlayer from "@/app/components/LazyHeroVideoPlayer";
import {
  HERO_VIDEO_ARIA_LABEL,
  HERO_VIDEO_POSTER,
  HERO_VIDEO_POSTER_HEIGHT,
  HERO_VIDEO_POSTER_WIDTH,
} from "@/lib/hero-video";

export default function HeroVideo() {
  return (
    <div className="relative w-full bg-slate-100">
      <Image
        src={HERO_VIDEO_POSTER}
        alt={HERO_VIDEO_ARIA_LABEL}
        width={HERO_VIDEO_POSTER_WIDTH}
        height={HERO_VIDEO_POSTER_HEIGHT}
        priority={true}
        sizes="100vw"
        quality={85}
        className="block w-full h-auto"
      />
      <LazyHeroVideoPlayer />
    </div>
  );
}
