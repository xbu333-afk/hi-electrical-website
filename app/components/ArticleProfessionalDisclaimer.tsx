/**
 * הבהרה מקצועית בתחתית מאמרים — לפני בלוק ההמרה.
 * טקסט משפטי אחיד; עיצוב עדין שלא שובר את זרימת הקריאה.
 */
export default function ArticleProfessionalDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="הבהרה מקצועית"
      className="mb-10 rounded-md border-s-4 border-slate-300 bg-slate-50 p-4"
    >
      <p className="text-sm italic leading-relaxed text-slate-500">
        הבהרה מקצועית: המידע במאמר זה נועד להעשרה ולמידע כללי בלבד ואינו מהווה
        תחליף לבדיקה ואבחון מקצועיים של מתקן חשמל בשטח. עבודות חשמל יש לבצע
        בהתאם להוראות הדין ועל ידי חשמלאי בעל רישיון מתאים.
      </p>
    </aside>
  );
}
