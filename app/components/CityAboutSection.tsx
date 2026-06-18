import type { CityContent } from "@/lib/city-content";

type CityAboutSectionProps = {
  content: CityContent;
};

export default function CityAboutSection({ content }: CityAboutSectionProps) {
  const { name, intro, about, highlightAreas } = content;

  return (
    <section
      id="about"
      aria-labelledby="city-about-heading"
      className="bg-white py-16 md:py-24 border-t border-gray-100"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-4 text-slate-600 text-base leading-[1.9] mb-10">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
          מי אנחנו
        </p>
        <h2
          id="city-about-heading"
          className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-6"
        >
          ח.י שירותי חשמל{" "}
          <span className="text-emerald-600">ב{name}</span>
        </h2>

        <div className="space-y-4 text-slate-600 text-base leading-[1.9]">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div
          className="bg-slate-100 border-r-4 border-emerald-500 rounded-xl p-5 mt-8"
          role="note"
          aria-label="אזכור תוכנית יצאת צדיק"
        >
          <p className="text-slate-800 text-sm font-semibold leading-relaxed">
            אנחנו גאים להיות חלק מהתוכנית &quot;יצאת צדיק&quot; עם חיים אתגר
            בערוץ 12 – בזכות שירות אמין, מקצועי והוגן. כשאתם בוחרים בנו –
            אתם בוחרים שקט נפשי ושירות ברמה הגבוהה ביותר.
          </p>
        </div>

        <div
          className="bg-slate-100 border-r-4 border-slate-400 rounded-xl p-5 mt-8"
          role="note"
        >
          <p className="text-slate-700 text-sm font-medium leading-relaxed">
            {highlightAreas}
          </p>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed mt-6 pt-6 border-t border-gray-200 text-center">
          כל השירותים מבוצעים על ידי חשמלאי מוסמך בלבד, תוך עמידה בתקנים
          ישראליים מחמירים והתאמה אישית לצרכי הלקוח.
        </p>
      </div>
    </section>
  );
}
