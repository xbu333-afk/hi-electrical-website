import Image from "next/image";
import LazyHeroVideoPlayer from "@/app/components/LazyHeroVideoPlayer";
import {
  HERO_VIDEO_ARIA_LABEL,
  HERO_VIDEO_POSTER,
  HERO_VIDEO_POSTER_HEIGHT,
  HERO_VIDEO_POSTER_WIDTH,
} from "@/lib/hero-video";

type HeroVideoProps = {
  /**
   * ברירת המחדל היא טעינה מוקדמת עבור ה-Hero שמעל הקיפול.
   * בשימושים בתחתית העמוד יש להעביר `false` כדי לא לפגוע ב-LCP.
   */
  priority?: boolean;
  sizes?: string;
};

export default function HeroVideo({
  priority = true,
  sizes = "100vw",
}: HeroVideoProps) {
  return (
    <div className="relative w-full bg-slate-100">
      <Image
        src={HERO_VIDEO_POSTER}
        alt={HERO_VIDEO_ARIA_LABEL}
        width={HERO_VIDEO_POSTER_WIDTH}
        height={HERO_VIDEO_POSTER_HEIGHT}
        priority={priority}
        sizes={sizes}
        quality={85}
        className="block w-full h-auto"
      />
      <LazyHeroVideoPlayer />
    </div>
  );
}
