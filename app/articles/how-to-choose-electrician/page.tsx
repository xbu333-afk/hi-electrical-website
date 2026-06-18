import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "איך לבחור חשמלאי מוסמך ומומלץ? (המדריך המלא) | ח.י שירותי חשמל",
  description:
    "מחפשים חשמלאי? כך תדעו לסנן חאפרים. מה ההבדל בין חשמלאי רגיל למוסמך, למה חשוב לבדוק תעודות, ואיך מוצאים חשמלאי יצאת צדיק שזמין 24 שעות.",
  alternates: {
    canonical: `${SITE_URL}/articles/how-to-choose-electrician`,
  },
  openGraph: {
    title: "איך לבחור חשמלאי מוסמך ומומלץ?",
    description:
      "מדריך מלא: רישיון, יצאת צדיק, מידרג, חירום 24 שעות וחשמלאי דודים.",
  },
};

const TOC = [
  { id: "musamach", label: "חשמלאי מוסמך מול חאפרים" },
  { id: "hamlatsot", label: "המלצות ותו איכות" },
  { id: "hirum", label: "מקרי חירום 24 שעות" },
  { id: "momchiyut", label: "דודים ובית חכם" },
  { id: "sikum", label: "סיכום" },
] as const;

export default function HowToChooseElectricianArticle() {
  return (
    <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <nav aria-label="נתיב דפים" className="mb-8">
          <ol
            className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap"
            role="list"
          >
            <li>
              <Link href="/" className="hover:text-emerald-700 transition-colors">
                דף הבית
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li>
              <Link href="/articles" className="hover:text-emerald-700 transition-colors">
                כלים ומדריכים
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li className="text-slate-600 font-medium" aria-current="page">
              איך לבחור חשמלאי
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span>צרכנות נבונה</span>
            <span aria-hidden="true">•</span>
            <span>בטיחות בחשמל</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            איך לבחור חשמלאי מוסמך (וממה כדאי להיזהר)?
          </h1>
          <p className="text-xl text-slate-600 font-medium text-center md:text-right">
            נכתב ע&quot;י:{" "}
            <Link href="/" className="text-emerald-600 hover:underline font-bold">
              יהודה חכמוב — הנדסאי חשמל וחשמלאי מוסמך
            </Link>
          </p>
        </header>

        <nav
          aria-label="תוכן עניינים"
          className="bg-slate-50 border border-gray-200 rounded-2xl p-6 mb-12 not-prose"
        >
          <h2 className="text-slate-900 text-sm font-bold uppercase tracking-wider mb-4">
            תוכן עניינים
          </h2>
          <ol className="space-y-2 text-sm list-decimal list-inside text-slate-600">
            {TOC.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-emerald-700 transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none marker:text-emerald-500">
          <p className="text-xl leading-relaxed mb-10 text-slate-700 font-medium">
            הזמנת בעל מקצוע הביתה תמיד מלווה בחשש מסוים, אבל כשמדובר בחשמל –
            משחק עם חאפרים יכול לעלות ביוקר, ואפילו להסתיים באסון. רשת האינטרנט
            מוצפת באנשים המציגים את עצמם כמומחים, אז איך יודעים במי לבחור?
            ריכזנו עבורכם את כל מה שצריך לדעת לפני שמזמינים איש מקצוע לבית.
          </p>

          <h2
            id="musamach"
            className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
          >
            1. תעודת זהות: חשמלאי מוסמך מול &quot;כלבויניק&quot;
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            חוק החשמל בישראל קובע חד משמעית: כל עבודת חשמל – אפילו החלפה של שקע
            פשוט – חייבת להתבצע על ידי{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי מוסמך
            </Link>{" "}
            בעל רישיון בתוקף מטעם משרד העבודה. שיפוצניק או חבר שיודע
            &quot;להתעסק עם חוטים&quot; מסכן אתכם. עבודה לא תקנית עלולה לגרום
            לשריפה, ובמקרה כזה – חברות הביטוח פשוט יתנערו מאחריות. אל תתביישו –
            בקשו לראות תעודה מזהה ורישיון בתוקף עם הגעת החשמלאי אליכם.
          </p>

          <h2
            id="hamlatsot"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            2. חפשו את ההמלצות ואת תו האיכות
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            בעידן של היום, קל מאוד לבדוק היסטוריה של בעל מקצוע. לקוחות חכמים
            בודקים דירוגים באתרים אובייקטיביים. אם חיפשתם למשל{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              מידרג חשמלאי
            </Link>{" "}
            או המלצות באתר המקצוענים, כנראה שאתם מחפשים שקט נפשי.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            החותמת האולטימטיבית לאמינות היא תוכנית הטלוויזיה של חיים אתגר. הזמנה
            של{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי יצאת צדיק
            </Link>{" "}
            מעניקה לכם ודאות שמדובר באיש מקצוע שנבדק על ידי מצלמות נסתרות, איתר
            את התקלה במדויק וגבה מחיר הוגן מבלי &quot;לנפח&quot; את החשבון.
          </p>

          <div
            id="hirum"
            className="bg-emerald-50 border-r-4 border-emerald-500 p-6 rounded-l-xl my-8 scroll-mt-24 not-prose"
          >
            <h3 className="text-lg font-bold text-emerald-900 mt-0 mb-2">
              מקרי חירום באמצע הלילה
            </h3>
            <p className="text-emerald-800 m-0 leading-relaxed">
              קצר בלוח החשמל או פחת שקופץ ולא חוזר לא תמיד קורים בשעות העבודה
              הרגילות. במקרים כאלו, אתם צריכים{" "}
              <Link href="/" className="font-bold text-emerald-900 underline">
                חשמלאי 24 שעות
              </Link>{" "}
              שיוכל לתת מענה מהיר. שימו לב: גם בשעת חירום, אל תתפשרו על אמינות
              ומקצועיות!
            </p>
          </div>

          <h2
            id="momchiyut"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            3. מומחיות ספציפית: תקלות דוד וחשמל חכם
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            לא כל חשמלאי מתמחה בכל סוגי העבודות. למשל, בחורף, אחת התקלות הנפוצות
            ביותר היא בדוד השמש. דוד שמקצר דורש התערבות של{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי דודים
            </Link>{" "}
            שיודע להפריד בין תקלות גוף חימום (פלאנג&apos;) לתקלות בחיווט של הלוח,
            ללא הוצאות מיותרות. כמו כן, פרויקטים מתקדמים כמו בית חכם או התקנת
            עמדות טעינה לרכב מחייבים ידע הנדסי מתקדם.
          </p>

          <h2
            id="sikum"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            סיכום: איך להבטיח עבודה איכותית?
          </h2>
          <ul className="space-y-3 text-slate-700">
            <li>
              ✔ ודאו שמדובר ב<strong>הנדסאי חשמל וחשמלאי מוסמך</strong> עם רישיון.
            </li>
            <li>✔ בדקו ביקורות אותנטיות בגוגל ונוכחות בתוכניות אמינות (יצאת צדיק).</li>
            <li>✔ דרשו הצעת מחיר שקופה ככל הניתן לפני תחילת העבודה.</li>
            <li>✔ ודאו קבלת חשבונית מס מסודרת שהיא גם האחריות שלכם לתיקון.</li>
          </ul>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            מחפשים שירות חשמל שאפשר לסמוך עליו?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            אצלנו ב
            <Link href="/" className="text-emerald-400 hover:underline font-bold">
              ח.י שירותי חשמל
            </Link>{" "}
            בניהולו של יהודה חכמוב, האמינות היא מעל הכל. אנו גאים לשאת את תו
            האיכות של &quot;יצאת צדיק&quot; ומספקים שירות אמין, מהיר ובטיחותי לכל
            בעיה.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו לתיאום ביקור: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30"
            >
              חייגו לתיאום ביקור
            </a>
            <Link
              href="/services"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all text-lg text-center"
            >
              צפו בשירותים שלנו
            </Link>
          </div>
        </div>
      </article>

      <nav
        aria-label="ניווט מאמרים"
        className="max-w-4xl mx-auto mt-8 flex items-center justify-between text-sm"
      >
        <Link
          href="/articles"
          className="text-slate-500 hover:text-emerald-700 font-medium transition-colors"
        >
          ← כל המאמרים
        </Link>
        <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
          דף הבית
        </Link>
      </nav>
    </div>
  );
}
