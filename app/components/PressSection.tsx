import LazyPressCarousel from "@/app/components/LazyPressCarousel";

export default function PressSection() {
  return (
    <section
      id="press"
      aria-label="בכותרות ובתקשורת"
      className="bg-slate-50 py-16 md:py-24 border-t border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-6">
        <LazyPressCarousel />
      </div>
    </section>
  );
}
