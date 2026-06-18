import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "שאלות ותשובות – כל מה שרציתם לדעת על תקלות חשמל | ח.י שירותי חשמל",
  description:
    "מתי להזמין חשמלאי? מה לעשות כשהפחת קופץ? הנדסאי חשמל וחשמלאי מוסמך עונה על השאלות הנפוצות. זמינות 24/7 (למעט שבתות).",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "שאלות ותשובות בחשמל – ח.י שירותי חשמל",
    description:
      "תשובות מקצועיות לכל שאלה: קצרים, לוחות חשמל, הארקה, בטיחות ועוד.",
  },
};

const FAQ_ITEMS = [
  {
    question: "איך אני יודע אם יש קצר חשמלי בבית שלי?",
    answer: (
      <>
        אם הפחת בלוח החשמל קופץ לעיתים קרובות, אם יש ריח שרוף משקע או מתג,
        או אם מכשירים מפסיקים לעבוד בפתאומיות – סביר להניח שיש קצר חשמלי.
        מומלץ לא לנסות לתקן לבד בשום אופן ולפנות ל
        <Link href="/" className="text-emerald-600 hover:underline font-bold">
          חשמלאי מוסמך
        </Link>{" "}
        לאיתור בטוח.
      </>
    ),
    schemaText:
      "אם הפחת בלוח החשמל קופץ לעיתים קרובות, אם יש ריח שרוף משקע או מתג, או אם מכשירים מפסיקים לעבוד בפתאומיות – סביר להניח שיש קצר חשמלי. מומלץ לא לנסות לתקן לבד בשום אופן ולפנות לחשמלאי מוסמך לאיתור בטוח.",
  },
  {
    question: "כל כמה זמן כדאי לבצע בדיקה למערכת החשמל?",
    answer: (
      <>
        מומלץ לבצע בדיקה תקופתית מקיפה (כולל{" "}
        <Link
          href="/articles/grounding"
          className="text-emerald-600 hover:underline font-bold"
        >
          בדיקת הארקה
        </Link>{" "}
        ולוח החשמל) אחת ל-5 שנים, ובמיוחד אם יש קצרים חוזרים, אם הוספתם
        מכשירים כבדים היוצרים עומס יתר, או לאחר שיפוצים בבית.
      </>
    ),
    schemaText:
      "מומלץ לבצע בדיקה תקופתית מקיפה (כולל בדיקת הארקה ולוח החשמל) אחת ל-5 שנים, ובמיוחד אם יש קצרים חוזרים, אם הוספתם מכשירים כבדים, או לאחר שיפוצים בבית.",
  },
  {
    question: "האם אפשר להחליף שקע חשמל לבד?",
    answer: (
      <>
        <strong>מבחינה חוקית ומעשית – לא!</strong> בישראל, רק חשמלאי מוסמך
        בעל רישיון בתוקף רשאי לבצע עבודות חשמל, גם אם הן נראות פשוטות כמו
        החלפת שקע או מפסק. מדובר בבטיחות הישירה שלך ושל המשפחה שלך, ויש
        להקפיד על כך.
      </>
    ),
    schemaText:
      "מבחינה חוקית ומעשית – לא. בישראל, רק חשמלאי מוסמך בעל רישיון בתוקף רשאי לבצע עבודות חשמל, גם אם הן נראות פשוטות כמו החלפת שקע או מפסק.",
  },
  {
    question: "כמה זמן לוקחת הגעה לטיפול בתקלה?",
    answer: (
      <>
        זמני ההגעה משתנים בהתאם ל
        <Link href="/cities" className="text-emerald-600 hover:underline">
          אזור השירות
        </Link>{" "}
        ועומס הקריאות. עם זאת, כאנשי מקצוע הדוגלים בסטנדרט של &apos;יצאת
        צדיק&apos;, במקרי חירום (קצר כללי, סכנת התחשמלות) אנו פועלים כ
        <strong>חשמלאי 24/7</strong> (למעט שבתות וחגים) ועושים מאמץ עליון
        להגיע בהקדם האפשרי.
      </>
    ),
    schemaText:
      "זמני ההגעה משתנים בהתאם לאזור השירות ועומס הקריאות. במקרי חירום אנו פועלים כחשמלאי 24/7 (למעט שבתות וחגים) ועושים מאמץ עליון להגיע בהקדם האפשרי.",
  },
  {
    question: "אילו סוגי עבודות חשמל אתם מבצעים?",
    answer: (
      <>
        <Link
          href="/services"
          className="text-emerald-600 hover:underline font-bold"
        >
          סל השירותים שלנו
        </Link>{" "}
        כולל את כל עבודות החשמל מ-א&apos; ועד ת&apos;: החל מתיקון תקלות
        וקצרים, בדיקות תקינות, התקנת{" "}
        <Link href="/services" className="text-emerald-600 hover:underline">
          גופי תאורה
        </Link>{" "}
        וספוטים, דרך החלפה והגדלת לוחות חשמל תלת-פאזיים, ועד לתכנון והקמת
        מערכות בית חכם מתקדמות. אנו נותנים מענה מקצועי גם לבתים פרטיים וגם
        לעסקים ומוסדות.
      </>
    ),
    schemaText:
      "סל השירותים שלנו כולל את כל עבודות החשמל: תיקון תקלות וקצרים, בדיקות תקינות, התקנת גופי תאורה, החלפת לוחות חשמל, ותכנון מערכות בית חכם לבתים ועסקים.",
  },
  {
    question: 'מה ההבדל בין "סתם" חשמלאי ל"חשמלאי מוסמך"?',
    answer: (
      <>
        ההבדל הוא קריטי. רק{" "}
        <Link href="/" className="text-emerald-600 hover:underline font-bold">
          חשמלאי מוסמך
        </Link>{" "}
        (וקל וחומר הנדסאי חשמל בעל רישיון ראשי כמו בח.י שירותי חשמל) מחזיק
        בהכשרה המקצועית הנדרשת על פי חוק, בתעודה מוכרת של משרד הכלכלה, ובביטוח
        מקיף לכל עבודה. בחירה בחשמלאי לא מוסמך עלולה להסתיים בפסילת ביטוח
        במקרה של שריפה או חלילה באסון.
      </>
    ),
    schemaText:
      "רק חשמלאי מוסמך מחזיק בהכשרה המקצועית הנדרשת על פי חוק, בתעודה מוכרת של משרד הכלכלה, ובביטוח מקיף. בחירה בחשמלאי לא מוסמך עלולה להסתיים בפסילת ביטוח במקרה של שריפה.",
  },
] as const;

const ChevronIcon = () => (
  <svg
    fill="none"
    height="24"
    shapeRendering="geometricPrecision"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="24"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(({ question, schemaText }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: schemaText,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
        <section className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="נתיב דפים" className="mb-10">
            <ol
              className="flex items-center gap-2 text-xs text-slate-400 list-none flex-wrap"
              role="list"
            >
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-700 transition-colors"
                >
                  דף הבית
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                ›
              </li>
              <li
                className="text-slate-600 font-medium"
                aria-current="page"
              >
                שאלות ותשובות
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center mb-14">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1 rounded-full mb-4">
              מידע מקצועי ושקוף
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              שאלות ותשובות בחשמל
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              לא בטוחים אם צריך להזמין חשמלאי? מתלבטים מה לעשות כשהחשמל קופץ?
              הנה התשובות לכל השאלות ששואלים אותנו שוב ושוב ב
              <Link
                href="/"
                className="font-bold text-emerald-600 hover:underline"
              >
                ח.י שירותי חשמל
              </Link>
              .
            </p>
          </header>

          {/* Accordion */}
          <div className="space-y-4">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <details
                key={question}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-lg text-slate-800 hover:text-emerald-700 transition-colors list-none">
                  <span>{question}</span>
                  <span className="shrink-0 transition-transform duration-300 group-open:rotate-180 text-emerald-500">
                    <ChevronIcon />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-gray-100 pt-4">
                  {answer}
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 bg-slate-900 text-white p-10 md:p-12 rounded-3xl shadow-xl text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              לא מצאתם את התשובה שחיפשתם?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              נשמח לענות על כל שאלה ולתת ייעוץ ראשוני ללא עלות.
            </p>
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו לייעוץ: ${PHONE_DISPLAY}`}
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:scale-105 text-lg"
            >
              חייגו עכשיו לייעוץ: {PHONE_DISPLAY}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
