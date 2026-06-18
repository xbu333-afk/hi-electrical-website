import Link from "next/link";
import { PHONE, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/site";
import { getUiLabels, type UiLocale } from "@/lib/ui-labels";

type ContactSectionProps = {
  heading?: string;
  cityName?: string;
  subtext?: string;
  whatsappHref?: string;
  locale?: UiLocale;
};

export default function ContactSection({
  heading = "צריכים חשמלאי מוסמך עכשיו?",
  cityName,
  subtext = "יהודה זמין לקריאות חירום לפי היכולת והזמינות. חשמלאי מוסמך ומומלץ, עם רישיון ראשי ואישור יצאת צדיק.",
  whatsappHref = WHATSAPP_HREF,
  locale = "he",
}: ContactSectionProps) {
  const labels = getUiLabels(locale);
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-emerald-600 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          id="contact-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
        >
          {cityName ? (
            <>
              צריכים חשמלאי{" "}
              <span className="text-emerald-200">ב{cityName}</span>
              {" "}עכשיו?
            </>
          ) : (
            heading
          )}
        </h2>
        <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          {subtext}
        </p>
        <div className="hidden md:flex gap-4 justify-center">
          <a
            href={`tel:${PHONE}`}
            data-analytics-location="contact-sos"
            className="inline-flex items-center gap-2 bg-white text-red-600 font-extrabold text-sm px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
            aria-label={labels.contactSos}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {labels.contactSos}
          </a>
          <a
            href={whatsappHref}
            data-analytics-location="contact-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-4 rounded-xl transition-colors shadow-lg"
            aria-label={labels.whatsappAria}
          >
            {labels.contactWhatsapp}
          </a>
        </div>
        <a
          href={`tel:${PHONE}`}
          data-analytics-location="contact-mobile-call"
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
            {labels.contactServiceAreas}
          </Link>
          <Link href="/articles" className="text-emerald-100 hover:text-white transition-colors underline underline-offset-2">
            {labels.contactArticles}
          </Link>
        </div>
      </div>
    </section>
  );
}
