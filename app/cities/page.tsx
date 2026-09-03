import type { Metadata } from "next";
import Link from "next/link";
import ArticleVideoCta from "@/app/components/ArticleVideoCta";
import NightOnlyText from "@/app/components/NightOnlyText";
import { serviceAreas } from "@/lib/cities";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "אזורי שירות | חשמלאי מוסמך יהודה חכמוב",
  description:
    "יהודה חכמוב — חשמלאי מוסמך ומומלץ. שירות חשמל מקצועי בפתח תקווה, כפר סבא, רעננה, רמת גן, הרצליה ועוד יישובים. חשמלאי 24 שעות לחירום.",
  keywords: ["חשמלאי מוסמך", "חשמלאי מומלץ", "חשמלאי יצאת צדיק", "חשמלאי 24 שעות"],
  alternates: { canonical: "/cities" },
};

export default function CitiesPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section
        aria-labelledby="cities-heading"
        className="bg-white border-b border-gray-100 py-14 md:py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-2">
                אזורי שירות
              </p>
              <h1
                id="cities-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight"
              >
                חשמלאי מוסמך
                <br />
                ב-{serviceAreas.length} ערים ויישובים
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-base max-w-xs leading-relaxed md:text-left">
              חשמלאי יצאת צדיק מוסמך, הנדסאי חשמל עם רישיון ראשי.
              <NightOnlyText> זמין 24 שעות לחירום.</NightOnlyText>
            </p>
          </div>
        </div>
      </section>

      {/* ── Cities grid ── */}
      <section
        aria-label="רשימת אזורי שירות"
        className="bg-slate-50 py-12 md:py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 list-none"
            role="list"
            aria-label="ערים שבהן ניתן שירות"
          >
            {serviceAreas.map(({ name, slug }) => (
              <li key={slug}>
                <Link
                  href={`/cities/${slug}`}
                  className="group flex flex-col items-center gap-2 bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-2xl p-4 text-center shadow-sm transition-all"
                  aria-label={`חשמלאי מוסמך ב${name} — זמין 24/7`}
                >
                  <span
                    className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-emerald-100 border border-gray-100 group-hover:border-emerald-200 flex items-center justify-center text-slate-500 group-hover:text-emerald-700 transition-colors"
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <span className="text-slate-800 group-hover:text-emerald-700 font-semibold text-sm leading-tight transition-colors">
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── GEO / SEO copy for AI + search ── */}
      <section
        aria-labelledby="cities-geo-heading"
        className="bg-white border-t border-gray-100 py-14 md:py-20"
      >
        <article className="mx-auto max-w-3xl px-6">
          <h2
            id="cities-geo-heading"
            className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl"
          >
            אזורי שירות של חשמלאי מוסמך במרכז
          </h2>
          <p className="mt-5 text-base leading-[1.9] text-slate-600">
            ח.י שירותי חשמל מספקת שירותי חשמל מקצועיים ברחבי גוש דן, השרון והמרכז
            — מפתח תקווה, רמת גן, גבעתיים ושוהם ועד כפר סבא, רעננה, הרצליה, ראש
            העין ויישובי הסביבה. בכל עמוד עיר תמצאו פירוט מקומי על סוגי העבודה
            שאנחנו מבצעים באזור, לצד קישורים למדריכים מקצועיים על לוחות חשמל,
            קצרים, הארקה ומחירון שקוף.
          </p>
          <h3 className="mt-10 text-xl font-extrabold text-slate-900">
            למה לבחור בנו
          </h3>
          <p className="mt-4 text-base leading-[1.9] text-slate-600">
            העבודה מבוצעת על ידי יהודה חכמוב — הנדסאי חשמל מוסמך בעל רישיון ראשי,
            שנבדק בשטח בתוכנית &quot;יצאת צדיק&quot; עם חיים אתגר בערוץ 12. מעבר
            לתיקון תקלות אנחנו מביאים סטנדרט הנדסי: אבחון מדויק, חומרים איכותיים,
            הסבר ברור ללקוח ומחיר הוגן בלי הפתעות.
          </p>
          <p className="mt-4 text-base leading-[1.9] text-slate-600">
            זמן התגובה חשוב במיוחד בקריאות חירום — קצרים, נפילות מתח, לוח שקפץ או
            תקלה באמצע הלילה. אנחנו משתדלים להגיע במהירות לפי זמינות, כולל מענה
            דחוף מחוץ לשעות העבודה הרגילות (למעט שבתות וחגים), וממשיכים ללוות
            גם מול חברת החשמל כשנדרש.
          </p>
          <p className="mt-4 text-base leading-[1.9] text-slate-600">
            מחפשים חשמלאי מוסמך קרוב אליכם? בחרו את היישוב ברשימה למעלה, או צרו
            קשר ישירות בטלפון{" "}
            <a
              href={`tel:${PHONE}`}
              className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
            >
              {PHONE_DISPLAY}
            </a>{" "}
            לקבלת הצעת מחיר וייעוץ מקצועי.
          </p>
        </article>
      </section>

      <div className="bg-slate-50 px-6 pb-14 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <ArticleVideoCta
            heading="צריכים חשמלאי מוסמך באזור שלכם?"
            description="מענה מהיר לקריאות חירום ותיקונים, בדיקות ותכנון — על ידי הנדסאי חשמל בעל רישיון ראשי. אפשר להתקשר או לשלוח וואטסאפ בכל שפה."
            callPurpose="לייעוץ ושירות חשמל באזורי המרכז והשרון"
            showDisclaimer={false}
          />
        </div>
      </div>

      {/* ── Trust strip ── */}
      <section
        aria-label="אמינות ואישורים"
        className="bg-white border-t border-b border-gray-100 py-8"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: "🏅", text: "חשמלאי יצאת צדיק" },
              { icon: "🎓", text: "הנדסאי חשמל מוסמך" },
              { icon: "📋", text: "בעל רישיון ראשי" },
              { icon: "🕐", text: "חשמלאי 24 שעות" },
              { icon: "💰", text: "מחיר הוגן ושקוף" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-slate-700"
              >
                <span aria-hidden="true">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not found CTA ── */}
      <section
        aria-labelledby="cities-cta-heading"
        className="bg-slate-50 py-14"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            id="cities-cta-heading"
            className="text-xl font-bold text-slate-900 mb-2"
          >
            לא מצאתם את היישוב שלכם?
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            ייתכן שנגיע גם אליכם — צרו קשר ונבדוק יחד.
          </p>
          <div className="hidden md:flex gap-3 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              חייגו עכשיו
            </a>
            <Link
              href="/"
              className="inline-flex items-center border border-gray-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              דף הבית
            </Link>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="md:hidden inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm mx-auto"
            aria-label={`התקשר: ${PHONE_DISPLAY}`}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  );
}
