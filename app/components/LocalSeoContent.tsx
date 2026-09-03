import {
  neighborhoodsForCity,
  scenariosForCity,
} from "@/lib/local-seo-data";

type LocalSeoContentProps = {
  cityName: string;
  citySlug: string;
};

/**
 * בלוק SEO מקומי בתחתית עמוד עיר — append-only, בלי לגעת באלמנטי המרה.
 * Server Component בלבד (אין state/effect) → ללא סיכון hydration.
 *
 * נגישות: טקסט קריא (text-base), ניגודיות slate-700 על רקע בהיר (~4.5:1+),
 * ללא טקסט מוסתר / גופן זעיר (מניעת עונש hidden text).
 */
export default function LocalSeoContent({
  cityName,
  citySlug,
}: LocalSeoContentProps) {
  const neighborhoods = neighborhoodsForCity(citySlug);
  const [scenarioA, scenarioB] = scenariosForCity(citySlug);
  const titleId = `seo-title-${citySlug}`;

  const neighborhoodPhrase =
    neighborhoods.length >= 2
      ? neighborhoods.slice(0, -1).join(", ") +
        " ו" +
        neighborhoods[neighborhoods.length - 1]
      : neighborhoods[0] ?? null;

  return (
    <section
      aria-labelledby={titleId}
      className="border-t border-gray-200 bg-slate-50 py-12 md:py-16"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-white px-6 py-8 shadow-sm sm:px-8 md:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          מידע מקומי
        </p>
        <h2
          id={titleId}
          className="mt-2 text-xl font-extrabold leading-snug text-slate-900 sm:text-2xl"
        >
          שירותי חשמלאי ב{cityName}
        </h2>

        <div className="mt-5 space-y-4 text-base leading-[1.9] text-slate-700">
          <p>
            ח.י שירותי חשמל מספקת שירותי חשמל מוסמכים ב{cityName}
            {neighborhoodPhrase ? (
              <>
                {" "}
                ובשכונות ואזורים כמו{" "}
                <span className="font-semibold text-slate-800">
                  {neighborhoodPhrase}
                </span>
              </>
            ) : null}
            . העבודה מבוצעת על ידי הנדסאי חשמל מוסמך בעל רישיון ראשי — עם אבחון
            מדויק בשטח, התאמה לתקנים הישראליים, והסבר ברור ללקוח לפני ביצוע
            התיקון או השדרוג.
          </p>

          <p>
            ב{cityName} מתקבלות בקשות רבות ל
            <span className="font-semibold text-slate-800">{scenarioA}</span>{" "}
            ול
            <span className="font-semibold text-slate-800">{scenarioB}</span>.
            בשני המקרים נדרש איש מקצוע מוסמך: טעות באבחון או בחיווט עלולה לסכן
            חיים, לפגוע במכשירי הבית, או להשאיר את המיגון החשמלי לא אפקטיבי.
            הנדסאי חשמל בודק את שורש התקלה, בוחר פתרון בטיחותי ומבצע את העבודה
            לפי התקן — לא קיצורי דרך.
          </p>

          <p>
            זמן התגובה חשוב במיוחד בקריאות דחופות ב{cityName}: קצרים, נפילות
            מתח ולוח שקפץ דורשים מענה מהיר לפי זמינות. אנחנו פועלים לפי סטנדרט
            &quot;יצאת צדיק&quot; — אמינות, שקיפות ומחיר הוגן — וממשיכים ללוות
            גם אחרי התיקון, כדי שתדעו שיש על מי לסמוך גם בחירום (למעט שבתות
            וחגים).
          </p>
        </div>

        <h3 className="mt-8 text-base font-bold text-slate-900">
          בקשות נפוצות ב{cityName}
        </h3>
        <ul
          className="mt-3 list-disc space-y-2 pe-5 text-base leading-relaxed text-slate-700"
          role="list"
        >
          <li>{scenarioA}</li>
          <li>{scenarioB}</li>
          <li>תיקוני חירום, קצרים ונפילות מתח לפי זמינות</li>
        </ul>
      </div>
    </section>
  );
}
