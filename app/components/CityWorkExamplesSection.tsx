import Link from "next/link";
import type { CityWorkExamples } from "@/lib/city-work-examples";

type CityWorkExamplesSectionProps = {
  cityName: string;
  examples: CityWorkExamples;
};

/**
 * דוגמאות לסוגי תקלות ובדיקות לפי יישוב — מתחת להמלצות בעמודי הערים.
 * התוכן שונה בין היישובים, ומוצג במפורש כדוגמאות לסוגי עבודות
 * ולא כתיאור של עבודות ספציפיות.
 */
export default function CityWorkExamplesSection({
  cityName,
  examples,
}: CityWorkExamplesSectionProps) {
  return (
    <section
      aria-labelledby="city-work-examples-heading"
      className="bg-white py-16 md:py-20 border-t border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id="city-work-examples-heading"
          className="text-2xl sm:text-3xl font-black text-slate-900 mb-3"
        >
          תקלות ובדיקות שאנחנו מבצעים ב{cityName}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          דוגמאות לסוגי התקלות והבדיקות שאנחנו מטפלים בהם ב{cityName} ובסביבה.
          כל מקרה נבדק בשטח במכשור מדידה, והטיפול נקבע לפי מה שנמצא בפועל.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              דוגמאות לתקלות
            </h3>
            <ul role="list" className="space-y-3 list-none p-0 m-0">
              {examples.faults.map((fault) => (
                <li
                  key={fault}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 leading-relaxed"
                >
                  {fault}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              דוגמאות לבדיקות
            </h3>
            <ul role="list" className="space-y-3 list-none p-0 m-0">
              {examples.checks.map((check) => (
                <li
                  key={check}
                  className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-slate-700 leading-relaxed"
                >
                  {check}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600 leading-relaxed">
              קונים דירה? כדאי לקרוא את המדריך{" "}
              <Link
                href="/articles/electrical-inspection-before-buying"
                className="font-bold text-emerald-700 hover:underline"
              >
                בדיקת חשמל לפני קניית דירה
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
