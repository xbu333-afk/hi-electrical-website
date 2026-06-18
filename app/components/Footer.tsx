import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_BRAND_TEXT,
  FOOTER_NAV_LINKS,
  LEGAL_LINKS,
  USEFUL_INFO_LINKS,
} from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/images/yatza-tzadik-logo.avif"
                alt=""
                width={48}
                height={48}
                className="object-contain shrink-0"
                aria-hidden="true"
              />
              <div className="text-slate-900 font-extrabold text-sm tracking-tight leading-tight">
                ח.י שירותי חשמל
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {FOOTER_BRAND_TEXT}
            </p>
            <p className="text-slate-500 text-xs leading-relaxed mt-3">
              אין התחייבות לזמינות מלאה 24 שעות, אך נעשים מירב המאמצים לתת
              מענה במקרים דחופים בהתאם ליכולת.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed mt-2">
              שירות הלילה ניתן במקרים דחופים בלבד, וייתכן שינוי בימים ובשעות.
              ניתן לנסות לחייג, ובמידה ואין מענה — שירות הלילה לא יהיה זמין
              באותו לילה.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="ניווט משני">
            <h2 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4">ניווט</h2>
            <ul className="space-y-2 text-sm list-none" role="list">
              {FOOTER_NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-500 hover:text-emerald-700 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Useful Info */}
          <nav aria-label="מידע שימושי">
            <h2 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4">
              מידע שימושי
            </h2>
            <ul className="space-y-2 text-sm list-none" role="list">
              {USEFUL_INFO_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-500 hover:text-emerald-700 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ru" className="text-slate-500 hover:text-emerald-400 transition-colors">
                  Услуги на русском
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="מדיניות ונגישות">
            <ul className="space-y-2 text-sm list-none" role="list">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-500 hover:text-emerald-700 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500 leading-relaxed">
              האתר עומד בתקן נגישות{" "}
              <abbr title="תקן ישראלי 5568">ת&quot;י 5568</abbr> ברמה{" "}
              <abbr title="Level AA">AA</abbr>.
            </p>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100 text-xs text-slate-400 text-center">
          &copy; {year} ח.י שירותי חשמל — יהודה חכמוב. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
