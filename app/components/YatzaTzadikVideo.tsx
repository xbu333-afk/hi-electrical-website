const VIDEO_ID = "Ty-v9miiC7U";
const VIDEO_START = 2;

export default function YatzaTzadikVideo() {
  const embedSrc = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?start=${VIDEO_START}&rel=0`;

  return (
    <div className="mt-10 animate-fade-up [animation-delay:500ms]">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-slate-100">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedSrc}
          title="יהודה חכמוב — יצאת צדיק עם חיים אתגר"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          aria-label="סרטון: יצאת צדיק עם חיים אתגר — ערוץ 12"
        />
      </div>
    </div>
  );
}
