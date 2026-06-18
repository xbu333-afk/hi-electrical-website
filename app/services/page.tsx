import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL, WHATSAPP_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "שירותי חשמל מקצועיים לבית ולעסק",
  description:
    "כל שירותי החשמל במקום אחד: איתור תקלות, לוחות חשמל, בית חכם והארקה – על ידי יהודה חכמוב, הנדסאי חשמל וחשמלאי מוסמך. זמינות 24/7 (למעט שבתות).",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "שירותי חשמל מקצועיים – ח.י שירותי חשמל",
    description:
      "איתור תקלות, לוחות חשמל, בית חכם, הארקה ועוד — שירות מקצועי לבית ולעסק.",
  },
};

const SERVICE_CARDS = [
  {
    icon: "🔍",
    title: "איתור ותיקון קצרים",
    description:
      "איתור תקלות מורכבות בלוחות חשמל, שקעים וגופי תאורה (כולל קצר בדוד) באמצעות ציוד טכנולוגי מתקדם, ללא פירוקים או הרס מיותר.",
    wide: false,
  },
  {
    icon: "⚡",
    title: "החלפת ושדרוג לוחות חשמל",
    description:
      "מעבר ללוח תלת-פאזי, התקנת לוחות חדשים, החלפת מפסקי מגן (ממסר פחת) והוספת הגנות עומס, הכל לפי דרישות התקן המחמירות.",
    wide: false,
  },
  {
    icon: "💡",
    title: "התקנת גופי תאורה ושקעים",
    description:
      "התקנה בטיחותית ומעוצבת של נברשות, תאורת LED, ספוטים, והוספת שקעי כוח ייעודיים למכשירים צורכי אנרגיה (אינדוקציה, מזגן).",
    wide: false,
  },
  {
    icon: "📱",
    title: "מערכות בית חכם (Smart Home)",
    description:
      "תכנון והתקנת בקרים חכמים לשליטה מרחוק על תאורה, תריסים, דוד ומיזוג אוויר, בגימור מושלם ואינטגרציה חלקה.",
    wide: false,
  },
  {
    icon: "🛡️",
    title: "בדיקות חשמל ועמידה בתקנים",
    description: (
      <>
        בדיקות בטיחות מקיפות, דוחות תקינות לכיבוי אש וביטוח, ו
        <Link href="/articles/grounding" className="text-emerald-600 font-bold hover:underline">
          בדיקת מערכת הארקה
        </Link>{" "}
        מקצועית לווידוא הגנה מוחלטת מהתחשמלות.
      </>
    ),
    wide: true,
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <section className="max-w-5xl mx-auto">
        <nav aria-label="נתיב דפים" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap" role="list">
            <li>
              <Link href="/" className="hover:text-emerald-700 transition-colors">
                דף הבית
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li className="text-slate-600 font-medium" aria-current="page">
              שירותים
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-10">
          <header className="mb-8 text-center md:text-right">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1 rounded-full mb-4">
              מעטפת שירותים מלאה
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
              שירותי חשמל מקצועיים – הסטנדרט של{" "}
              <Link href="/" className="text-emerald-600 hover:underline">
                ח.י שירותי חשמל
              </Link>
            </h1>
          </header>

          <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none">
            <p className="text-xl font-medium text-slate-700 leading-relaxed">
              ברוכים הבאים ל<strong>ח.י שרותי חשמל</strong> – הבית למומחיות, חדשנות
              ומצוינות בתחום החשמל. אנו פועלים מזה למעלה מעשור עם ניסיון מעמיק וידע
              טכני מתקדם, ומספקים פתרונות חשמל מקיפים לבית ולעסק, בניהולו של{" "}
              <Link href="/" className="font-bold text-emerald-700 hover:underline">
                יהודה חכמוב, הנדסאי חשמל וחשמלאי מוסמך
              </Link>
              .
            </p>
            <p>
              השירות שלנו כולל <strong>תכנון, התקנה, תחזוקה ותיקונים</strong>, ברמת
              מקצועיות הנדסית ובסטנדרטים הגבוהים ביותר של בטיחות ואמינות. אנו ערוכים
              לתת מענה גם בשעות חירום כ
              <Link href="/cities" className="text-emerald-600 hover:underline">
                חשמלאי 24/7
              </Link>{" "}
              (למעט שבתות וחגים).
            </p>

            <div className="bg-amber-50 border-r-4 border-amber-400 p-6 rounded-l-xl my-8 flex items-start gap-4 not-prose">
              <span className="text-2xl shrink-0" aria-hidden="true">
                🌟
              </span>
              <p className="m-0 font-bold text-amber-900 leading-relaxed">
                זכינו להוקרה בתוכנית <strong>&quot;יצאת צדיק – עם חיים אתגר&quot;</strong>{" "}
                בזכות אמינות, מקצועיות עליונה, שקיפות ומחירים הוגנים!
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/business"
          className="group block mb-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-3xl"
          aria-label="לעסקים ומוסדות — פתרונות חשמל B2B"
        >
          <article className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-2xl flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1 text-center md:text-right">
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-emerald-500/30">
                B2B · עסקים ומוסדות
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 text-white group-hover:text-emerald-50 transition-colors">
                לעסקים ומוסדות
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl md:mr-0 mx-auto">
                מפעלים, רשויות, קבלנים וועדי בתים — פרויקטים מוניציפליים, לוחות
                תעשייתיים, הסכמי ריטיינר ורישוי עסקים. ניהול הנדסי מלא ברמת{" "}
                <span className="text-emerald-400 font-semibold">הנדסאי חשמל</span>.
              </p>
            </div>
            <div className="shrink-0 flex justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 bg-emerald-500 group-hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-full transition-all text-base shadow-lg">
                לפרטים והצעת מחיר
                <svg
                  className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </article>
        </Link>

        <h2 className="text-3xl font-black text-slate-900 mb-8 px-2 text-center md:text-right">
          מהתקלה הכי קטנה ועד לפרויקט הכי גדול
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SERVICE_CARDS.map(({ icon, title, description, wide }) => (
            <div
              key={title}
              className={`bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-500 transition-all hover:shadow-md group ${
                wide ? "md:col-span-2" : ""
              }`}
            >
              <div
                className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
              <p className={`text-slate-600 leading-relaxed${wide ? " md:w-3/4" : ""}`}>
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white p-10 md:p-12 rounded-3xl shadow-xl text-center md:text-right flex flex-col md:flex-row items-center justify-between gap-8 not-prose">
          <div>
            <h2 className="text-3xl font-black mb-4">צריכים עזרה עם החשמל?</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              מחפשים{" "}
              <Link href="/" className="text-emerald-300 hover:text-white underline underline-offset-4">
                חשמלאי מוסמך
              </Link>{" "}
              להתקנת לוח, פתרון קצר או שדרוג תשתיות? אנחנו כאן בשבילכם עם ציוד מתקדם
              ושירות ללא פשרות.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`tel:${PHONE}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full transition-all text-lg shadow-lg text-center"
              aria-label={`חייגו לתיאום ביקור: ${PHONE_DISPLAY}`}
            >
              חייגו לתיאום ביקור
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all text-lg text-center"
              aria-label="שליחת הודעת WhatsApp"
            >
              וואטסאפ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
