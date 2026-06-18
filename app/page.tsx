import type { Metadata } from "next";
import HeroSection from "@/app/components/HeroSection";
import {
  LazyContactSection,
  LazyCredentialsSection,
  LazyPressSection,
  LazyReviewsSection,
  LazyTrustStatement,
  LazyYatzaTzadikBlock,
} from "@/app/components/LazyHomeSections";

export const metadata: Metadata = {
  title: "יהודה חכמוב | הנדסאי חשמל מוסמך — חשמלאי יצאת צדיק",
  description:
    "יהודה חכמוב — הנדסאי חשמל, בעל רישיון ראשי. חשמלאי מוסמך ומומלץ, נבדק ונמצא צדיק בתוכנית יצאת צדיק עם חיים אתגר. חשמלאי 24 שעות לחירום.",
};

/* ─── סמכויות מקצועיות מיוחדות ─────────────────────────────── */
const AUTHORITY_HIGHLIGHTS = [
  {
    icon: "🎓",
    title: "מרצה ומכשיר הנדסאי חשמל",
    body: "יהודה חכמוב מרצה ומכשיר הנדסאי חשמל במכללת אורט תעשייה אוירית — מעביר ידע מקצועי לדור הבא של אנשי החשמל בישראל.",
  },
  {
    icon: "⚖️",
    title: "חוות דעת לבתי משפט",
    body: "נותן חוות דעת מקצועיות לבתי משפט בתחום החשמל.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="below-fold">
        <LazyCredentialsSection />
      </div>

      <div className="below-fold">
        <LazyYatzaTzadikBlock />
      </div>

      {/* ══════════════════════════════════════════════════════
          3. ABOUT — מי אנחנו
      ══════════════════════════════════════════════════════ */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-white py-16 md:py-24 scroll-mt-20 below-fold"
      >
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
            מי אנחנו
          </p>
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6"
          >
            ח.י שירותי חשמל
          </h2>

          <div className="space-y-4 text-slate-600 text-base leading-[1.9]">
                <p>
                  <strong className="text-slate-900">ח.י שירותי חשמל</strong> הוא
                  עסק מוביל המתמחה במתן פתרונות חשמל מקצועיים, אמינים ובטיחותיים
                  למגוון לקוחות – פרטיים, עסקיים ומוסדיים.
                </p>
                <p>
                  אנו מציעים שירותים מגוונים – מתיקונים מהירים, התקנת גופי תאורה,
                  ועד לשדרוג לוחות חשמל – תוך הקפדה על הסטנדרטים הגבוהים ביותר של
                  בטיחות ואיכות. עבודות החשמל מבוצעות ע&quot;י{" "}
                  <strong className="text-slate-900">יהודה חכמוב</strong>,
                  הנדסאי חשמל מוסמך בעל רישיון ראשי, עם ניסיון רב.
                </p>
                <p>
                  אנו גאים על ההכרה שקיבלנו בתוכנית{" "}
                  <strong className="text-slate-900">
                    &quot;יצאת צדיק – עם חיים אתגר&quot;
                  </strong>{" "}
                  בערוץ 12, בזכות שילוב של מקצועיות, אמינות ומחירים הוגנים.
                </p>
                <p>
                  אצלנו, כל לקוח זוכה ליחס אישי, ייעוץ מקצועי, ולשירות גמיש – 6
                  ימים בשבוע, למעט שבתות וחגים. אנו משתדלים להעניק מענה גם בשעות
                  חירום – לפי היכולת והזמינות (24/7 למקרי חירום, למעט שבתות וחגים).
                </p>
                <p>
                  כל עבודות החשמל מבוצעות ע&quot;י חשמלאי מוסמך, עם ניסיון רב,
                  הקפדה על פרטים קטנים, שימוש בחומרים איכותיים – ותמיד מתוך מטרה
                  להעניק לכם שקט נפשי. מעבר לתיקון התקלה, אני מביא לשטח סטנדרט
                  מקצועי גבוה, יסודי ובטיחותי ללא פשרות.
                </p>
              </div>

              {/* סמכויות מיוחדות — אורט + בתי משפט */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                role="list"
                aria-label="סמכויות מקצועיות מיוחדות"
              >
                {AUTHORITY_HIGHLIGHTS.map(({ icon, title, body }) => (
                  <div
                    key={title}
                    role="listitem"
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-2xl" aria-hidden="true">{icon}</span>
                      <h3 className="text-slate-900 font-bold text-sm leading-snug">
                        {title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              {/* תיבת הדגשה — יצאת צדיק */}
              <div
                className="bg-slate-100 border-r-4 border-emerald-500 rounded-xl p-5 mt-6"
                role="note"
                aria-label="אזכור תוכנית יצאת צדיק"
              >
                <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                  אנחנו גאים להיות חלק מהתוכנית &quot;יצאת צדיק&quot; עם חיים אתגר
                  בערוץ 12 – בזכות שירות אמין, מקצועי והוגן. כשאתם בוחרים בנו –
                  אתם בוחרים שקט נפשי ושירות ברמה הגבוהה ביותר.
                </p>
              </div>

              {/* תגיות מקצועיות */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "הנדסאי חשמל",
                  "בעל רישיון ראשי",
                  "חשמלאי מוסמך",
                  "חשמלאי יצאת צדיק",
                  "חשמלאי מומלץ",
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

          {/* תיבת ערכים — מתחת לתוכן הראשי */}
          <div
            className="bg-slate-100 border-r-4 border-slate-400 rounded-xl p-5 mt-12"
            role="note"
            aria-label="ערכי השירות שלנו"
          >
            <p className="text-slate-700 text-sm font-medium leading-relaxed text-center">
              איתור תקלות מדויק בטכנולוגיה מתקדמת &nbsp;|&nbsp; שירות אישי ומותאם
              &nbsp;|&nbsp; עמידה בתקנים מחמירים &nbsp;|&nbsp; מקצועיות ללא פשרות
              &nbsp;|&nbsp; שקיפות ומחירים הוגנים
            </p>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed mt-6 pt-6 border-t border-gray-200 text-center">
            השירותים מבוצעים על ידי חשמלאי מוסמך בלבד. כל הפרויקטים מותאמים לצרכים
            הייחודיים של הלקוח ומבוצעים ברמה הגבוהה ביותר.
          </p>
        </div>
      </section>

      <div className="below-fold">
        <LazyReviewsSection />
      </div>

      <div className="below-fold">
        <LazyTrustStatement />
      </div>

      <div className="below-fold">
        <LazyPressSection />
      </div>

      <div className="below-fold">
        <LazyContactSection />
      </div>
    </>
  );
}
