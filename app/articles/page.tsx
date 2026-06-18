import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מאמרים ומדריכים | חשמל וחשמלאות",
  description:
    "מדריכים, טיפים ומאמרים מקצועיים בנושאי חשמל — מאת יהודה חכמוב, הנדסאי חשמל מוסמך.",
};

const ARTICLES = [
  {
    slug: "beware-of-scammers",
    title: 'זהירות מנוכלים: איך תזהו מתחזים והונאות "יצאת צדיק"?',
    excerpt:
      "נוכלים מזייפים תעודות ותמונות עם חיים אתגר בעזרת AI. איך לבדוק רישיון, לזהות חאפרים ולשמור על הבית שלכם.",
    category: "תחקיר צרכנות",
    readTime: "7 דק׳",
    date: "יוני 2026",
  },
  {
    slug: "how-to-choose-electrician",
    title: "איך לבחור חשמלאי מוסמך (וממה כדאי להיזהר)?",
    excerpt:
      "מדריך מלא: רישיון, יצאת צדיק, מידרג, חירום 24 שעות וחשמלאי דודים — איך לסנן חאפרים ולבחור נכון.",
    category: "צרכנות נבונה",
    readTime: "6 דק׳",
    date: "יוני 2026",
  },
  {
    slug: "electrical-licenses-guide",
    title: "עוזר, מוסמך או הנדסאי? כל מה שצריך לדעת על רישיונות חשמל",
    excerpt:
      "לא כל חשמלאי מורשה לבצע כל עבודה. מדריך מקיף לסוגי הרישיונות בישראל: מי רשאי לחתום על לוח תלת-פאזי, איפה זה מופיע ברישיון, וממה כדאי להיזהר.",
    category: "מדריך צרכנות חכמה",
    readTime: "6 דק׳",
    date: "יוני 2026",
  },
  {
    slug: "handyman-vs-electrician",
    title: "הנדימן הוא לא חשמלאי: למה אלתורים עולים ביוקר?",
    excerpt:
      "הנדימן ללא רישיון הוא סכנת חיים. מה אומר החוק, מתי הביטוח לא יכסה — ואיך לוודא חשמלאי מוסמך.",
    category: "אזהרת בטיחות",
    readTime: "5 דק׳",
    date: "יוני 2026",
  },
  {
    slug: "grounding",
    title: "הארקה – מהי, למה היא חשובה ואיך מוודאים שהיא תקינה?",
    excerpt:
      "מהי הארקה? למה היא כל כך חשובה? סכנות, בדיקות תקינות ושירותי בדיקה מקצועיים של חשמלאי מוסמך.",
    category: "בטיחות בחשמל",
    readTime: "6 דק׳",
    date: "יוני 2026",
  },
  {
    slug: "mimsar-pahat",
    title: "למה ממסר הפחת קופץ (ומה עושים עכשיו)?",
    excerpt:
      "החשמל קפץ ואי אפשר להרים את המתג? מדריך חירום פשוט — מה לעשות לבד, איך לאתר את התקלה, ומתי חייבים לקרוא לחשמלאי מוסמך.",
    category: "מדריך חירום",
    readTime: "4 דק׳",
    date: "יוני 2026",
  },
  {
    slug: "ma-ze-luch-hashmal",
    title: "מה זה לוח חשמל ומתי צריך לשדרג אותו?",
    excerpt:
      "המדריך המלא: מה תפקידו של לוח החשמל, סימני עומס יתר, מתי חובה לשדרג לתלת-פאזי — ומתי לפנות לחשמלאי מוסמך.",
    category: "לוחות חשמל",
    readTime: "6 דק׳",
    date: "מאי 2026",
  },
  {
    slug: "bayit-chacham",
    title: "בית חכם: מה צריך לדעת לפני שמתחילים?",
    excerpt:
      "מדריך מעשי: אלחוטי מול קווי, מאיפה להתחיל, ולמה חובה חשמלאי מוסמך — לפני שקונים רכיבים לבית חכם.",
    category: "בתים חכמים",
    readTime: "7 דק׳",
    date: "אפריל 2026",
  },
];

export default function ArticlesPage() {
  return (
    <>
      {/* ── Header ── */}
      <section
        aria-labelledby="articles-heading"
        className="bg-white border-b border-gray-100 py-14 md:py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            מאמרים ומדריכים
          </p>
          <h1
            id="articles-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4"
          >
            ידע מקצועי.
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
            מאת יהודה חכמוב — הנדסאי חשמל מוסמך. מדריכים בשפה פשוטה
            שיעזרו לכם להבין את הבית שלכם.
          </p>
        </div>
      </section>

      {/* ── Articles list ── */}
      <section aria-label="רשימת מאמרים" className="bg-slate-50 py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ul className="divide-y divide-gray-100 list-none" role="list">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 py-7 hover:bg-white/80 transition-colors px-4 -mx-4 rounded-2xl"
                  aria-label={`קרא: ${a.title}`}
                >
                  {/* Category */}
                  <span className="inline-flex self-start shrink-0 bg-white border border-gray-200 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-lg sm:mt-1 sm:w-28 sm:text-center">
                    {a.category}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-slate-900 font-bold text-lg mb-1.5 leading-snug group-hover:text-emerald-700 transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {a.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{a.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{a.readTime} קריאה</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 self-center rotate-180 hidden sm:block"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-labelledby="articles-cta-heading"
        className="bg-white border-t border-gray-100 py-14"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            id="articles-cta-heading"
            className="text-lg font-bold text-slate-900 mb-2"
          >
            שאלה שלא מצאתם כאן?
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            פנו ישירות ליהודה — חשמלאי שאוהב להסביר.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            צרו קשר
          </Link>
        </div>
      </section>
    </>
  );
}
