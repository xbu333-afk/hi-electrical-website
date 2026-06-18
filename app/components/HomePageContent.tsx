import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroServices from "@/app/components/HeroServices";
import { PHONE, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "יהודה חכמוב | הנדסאי חשמל מוסמך — חשמלאי יצאת צדיק",
  description:
    "יהודה חכמוב — הנדסאי חשמל, בעל רישיון ראשי. חשמלאי מוסמך ומומלץ, נבדק ונמצא צדיק בתוכנית יצאת צדיק עם חיים אתגר. חשמלאי 24 שעות לחירום.",
};

/* ─── Credential cards ──────────────────────────────────────── */
const CREDENTIALS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "רישיון ראשי ומוסמך",
    sub: "רישיון חשמלאי ראשי",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "הנדסאי חשמל",
    sub: "הכשרה הנדסאית מלאה",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "זמינות 24/7 למקרי חירום",
    sub: "חשמלאי 24 שעות",
  },
];

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

/* ─── Reviews ───────────────────────────────────────────────── */
const REVIEWS = [
  {
    name: "ישראל כהן",
    initials: "יכ",
    color: "bg-blue-500",
    date: "לפני שבועיים",
    text: "יהודה הגיע תוך שעה לקריאת חירום. תיקן קצר בלוח החשמל בצורה מדויקת ומקצועית. מחיר הוגן, עבודה לפי תקן. חשמלאי מוסמך ואמין שממליץ עליו לכולם!",
    stars: 5,
  },
  {
    name: "רחל לוי",
    initials: "רל",
    color: "bg-purple-500",
    date: "לפני חודש",
    text: "הנדסאי חשמל שמסביר כל צעד ופועל בשקיפות מלאה. שדרג את ארון החשמל שלנו ביום אחד. מרגישים בטוחים הרבה יותר בבית. ממליצה בחום!",
    stars: 5,
  },
  {
    name: "דוד מזרחי",
    initials: "דמ",
    color: "bg-orange-500",
    date: "לפני 3 חודשים",
    text: "ראיתי את יהודה בתוכנית יצאת צדיק עם חיים אתגר ופניתי אליו. מקצוען אמיתי — עובד נקי, מסודר, ומחיר הוגן לחלוטין.",
    stars: 5,
  },
];

/* ─── WhatsApp icon ─────────────────────────────────────────── */
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Gold stars ─────────────────────────────────────────────── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`דירוג: ${count} כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hero-brand"
        className="relative bg-white overflow-hidden"
      >
        <div
          className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-emerald-50 rounded-full opacity-60 pointer-events-none blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-lg mx-auto px-6 py-12 md:py-20 text-center">

          {/* 1. שם העסק + שלט תלוי */}
          <div className="mb-5 animate-fade-up flex flex-col items-center">
            <h1
              id="hero-brand"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none text-center"
            >
              <span className="text-emerald-600">ח.י</span>{" "}
              <span className="font-extrabold">שרותי חשמל</span>
            </h1>
            <div className="hero-hanging-sign mt-2" aria-label="יצאת צדיק">
              <svg
                className="hero-hanging-wires"
                viewBox="0 0 120 22"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M60 0 L18 20"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
                <path
                  d="M60 0 L102 20"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hero-sticker">יצאת צדיק</span>
            </div>
          </div>

          {/* 2. תמונה — יהודה חכמוב + חיים אתגר */}
          <div className="relative mx-auto w-full max-w-[280px] animate-fade-in [animation-delay:100ms]">
            <div
              className="absolute inset-4 bg-emerald-100/60 blur-2xl rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src="/images/yehuda-haim-etgar.webp"
                alt="יהודה חכמוב וחיים אתגר — יצאת צדיק"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </div>

          {/* 3. כפתורי יצירת קשר — מתחת לתמונה */}
          <div className="mt-7 space-y-2.5 animate-fade-up [animation-delay:200ms]">
            {/* שורה ראשית: שיחה + WhatsApp — מסגרת זהה */}
            <div className="flex gap-2.5">
              <a
                href={`tel:${PHONE}`}
                className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all"
                aria-label={`התקשר ליצירת קשר: ${PHONE_DISPLAY}`}
              >
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                שיחה
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 min-h-[52px] bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all"
                aria-label="שלח הודעת WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                WhatsApp
              </a>
            </div>

            {/* SOS לילה — קטן ועדין */}
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 rounded-xl transition-colors"
              aria-label="שירות SOS לילה — חיוג חירום"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
              שירות SOS לילה
            </a>
          </div>

          <HeroServices />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. CREDENTIAL CARDS
      ══════════════════════════════════════════════════════ */}
      <section
        aria-label="אישורים ותעודות"
        className="bg-slate-50 border-y border-gray-100 py-10 md:py-14"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            role="list"
            aria-label="כישורים ואישורים מקצועיים"
          >
            {CREDENTIALS.map(({ icon, label, sub }) => (
              <div
                key={label}
                role="listitem"
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 lift"
              >
                <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  {icon}
                </span>
                <div>
                  <div className="text-slate-900 font-bold text-sm">{label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. ABOUT — מי אנחנו (תוכן עשיר מהאתר המקורי)
      ══════════════════════════════════════════════════════ */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-white py-16 md:py-24"
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
                  "מרצה במכללת אורט",
                  "חוות דעת לבתי משפט",
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

      {/* ══════════════════════════════════════════════════════
          5. REVIEWS — לקוחות ממליצים (Google Reviews style)
      ══════════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        aria-labelledby="reviews-heading"
        className="bg-slate-50 py-16 md:py-24 border-t border-gray-100"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
              המלצות
            </p>
            <h2
              id="reviews-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2"
            >
              לקוחות ממליצים
            </h2>
            {/* Aggregate */}
            <div className="inline-flex items-center gap-2 mt-2">
              <Stars count={5} />
              <span className="text-slate-600 text-sm font-medium">5.0 ·</span>
              <span className="text-slate-400 text-sm">589 המלצות</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="המלצות לקוחות">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                role="listitem"
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-sm lift flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`${r.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      aria-hidden="true"
                    >
                      {r.initials}
                    </span>
                    <figcaption>
                      <div className="text-slate-900 font-bold text-sm">{r.name}</div>
                      <div className="text-slate-400 text-xs">{r.date}</div>
                    </figcaption>
                  </div>
                  {/* Google G */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-label="Google" role="img">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <Stars count={r.stars} />
                <blockquote className="flex-1">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. CONTACT CTA
      ══════════════════════════════════════════════════════ */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-emerald-600 py-16 md:py-24"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
          >
            צריכים חשמלאי מוסמך עכשיו?
          </h2>
          <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            יהודה זמין 24 שעות לכל קריאת חירום. חשמלאי מוסמך ומומלץ,
            עם רישיון ראשי ואישור יצאת צדיק.
          </p>
          <div className="hidden md:flex gap-4 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-white text-red-600 font-extrabold text-sm px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              aria-label="חיוג מהיר לחשמלאי — SOS"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              חיוג מהיר SOS
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg"
              aria-label="שלח הודעת WhatsApp"
            >
              WhatsApp
            </a>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="md:hidden inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-extrabold text-base px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg mx-auto"
            aria-label={`התקשר: ${PHONE_DISPLAY}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {PHONE_DISPLAY}
          </a>

          <div className="mt-10 pt-8 border-t border-emerald-500 flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/cities" className="text-emerald-100 hover:text-white transition-colors underline underline-offset-2">
              אזורי שירות ←
            </Link>
            <Link href="/articles" className="text-emerald-100 hover:text-white transition-colors underline underline-offset-2">
              מאמרים ←
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
