import HeroVideo from "@/app/components/HeroVideo";
import { PHONE, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/site";

type ArticleVideoCtaProps = {
  /** כותרת ההמרה — ספציפית לנושא המאמר */
  heading: string;
  /** משפט הקשר קצר מעל הכפתורים */
  description: string;
  /** תיאור הפעולה עבור קוראי מסך, למשל "לייעוץ על הגדלת חיבור" */
  callPurpose: string;
};

/**
 * בלוק ההמרה שבתחתית כל מאמר: סרטון "יצאת צדיק" השקט מדף הבית
 * לצד כפתור חיוג בולט.
 *
 * נגישות (ת"י 5568 / WCAG 2.1 AA):
 * - הסרטון ללא קול ובלולאה, ועטוף ב-<figure> עם <figcaption> המהווה
 *   חלופה טקסטואלית לתוכן הוויזואלי (WCAG 1.2.1).
 * - רק ההילה שמאחורי הכפתור פועמת, והיא aria-hidden ואינה לוכדת מצביע;
 *   הטקסט עצמו יציב וקריא (WCAG 2.2.2).
 * - שני הכפתורים הם קישורים אמיתיים, נגישים במקלדת, בגובה מעל 44px,
 *   ועם aria-label הכולל את מספר הטלפון המלא.
 *
 * מיועד לשימוש יחיד בעמוד — מזהה הכותרת קבוע.
 */
export default function ArticleVideoCta({
  heading,
  description,
  callPurpose,
}: ArticleVideoCtaProps) {
  return (
    <section
      aria-labelledby="article-cta-heading"
      className="mt-16 overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl"
    >
      <figure className="m-0">
        <HeroVideo priority={false} sizes="(min-width: 896px) 896px, 100vw" />
        <figcaption className="px-6 py-4 text-center text-sm leading-relaxed text-slate-300 md:px-10">
          יהודה חכמוב בטקס &rdquo;יצאת צדיק&ldquo; עם חיים אתגר בערוץ 12 — העסק
          נבדק בשטח ונמצא צדיק. הסרטון מוצג ללא קול ובלולאה.
        </figcaption>
      </figure>

      <div className="border-t border-white/10 px-6 py-10 text-center md:px-10 md:py-12">
        <h2
          id="article-cta-heading"
          className="mb-4 text-2xl font-black leading-tight text-emerald-300 md:text-3xl"
        >
          {heading}
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="relative inline-flex max-w-full">
            <span
              aria-hidden="true"
              className="cta-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-emerald-400/60"
            />
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו עכשיו וקבלו יעוץ מחשמלאי מומחה — יהודה חכמוב, ${callPurpose}, ${PHONE_DISPLAY}`}
              className="relative inline-flex min-h-[3.5rem] items-center justify-center rounded-full bg-white px-8 py-4 text-center text-lg font-black leading-snug text-emerald-800 shadow-lg transition-colors hover:bg-emerald-50"
            >
              חייגו עכשיו וקבלו יעוץ מחשמלאי מומחה
            </a>
          </span>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שליחת הודעת וואטסאפ — אפשר בכל שפה (נפתח בחלון חדש)"
            className="inline-flex min-h-[3.5rem] items-center justify-center rounded-full border border-white/40 bg-white/10 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-white/20"
          >
            וואטסאפ — בכל שפה
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-300">
          <span aria-hidden="true">☎ </span>
          {PHONE_DISPLAY} · שירות וייעוץ בעברית, ברוסית ובאנגלית
        </p>
      </div>
    </section>
  );
}
