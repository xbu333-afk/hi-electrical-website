import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "מה זה לוח חשמל ומתי צריך לשדרג אותו? | ח.י שירותי חשמל",
  description:
    "המדריך המלא של הנדסאי חשמל: מה תפקידו של לוח החשמל בבית, אילו סימנים מראים שהלוח סובל מעומס יתר, ומתי חובה לבצע שדרוג ללוח תלת-פאזי.",
  alternates: {
    canonical: `${SITE_URL}/articles/ma-ze-luch-hashmal`,
  },
  openGraph: {
    title: "מה זה לוח חשמל ומתי צריך לשדרג אותו?",
    description:
      "סימני אזהרה, שדרוג לתלת-פאזי ומתי חובה לפנות לחשמלאי מוסמך — מדריך מקצועי.",
  },
};

const TOC = [
  { id: "mah-ze", label: "מה זה לוח חשמל ומה תפקידו?" },
  { id: "simanim", label: "הסימנים: מתי חובה לשדרג?" },
  { id: "tlat-fazi", label: "המעבר מחד-פאזי לתלת-פאזי" },
  { id: "sikum", label: "סיכום" },
] as const;

export default function LuahHashmalArticle() {
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
              לוח חשמל
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span>מדריך מקצועי</span>
            <span aria-hidden="true">•</span>
            <span>לוחות ומערכות</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            מה זה לוח חשמל ומתי צריך לשדרג אותו?
          </h1>
          <p className="text-xl text-slate-600 font-medium text-center md:text-right">
            מאת:{" "}
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
            לוח החשמל הוא הלב הפועם של הבית שלכם. הוא האחראי הבלעדי על הזרמת
            האנרגיה לכל המכשירים, ומעל הכל – הוא קו ההגנה הבטיחותי שמונע שריפות
            והתחשמלות. אבל עם השנים, ככל שאנחנו מכניסים הביתה יותר מכשירים
            חזקים, הלוח הישן מתחיל להתעייף ולסבול מעומס. מתי מדובר בסכנה ומתי
            הגיע הזמן לשדרג?
          </p>

          <h2
            id="mah-ze"
            className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
          >
            1. מה זה בכלל לוח חשמל ומה תפקידו?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            לוח החשמל מקבל את זרם החשמל הראשי מחברת החשמל ומחלק אותו בצורה
            מבוקרת ל&quot;מעגלים&quot; שונים ברחבי הבית (התאורה, השקעים במטבח,
            המזגן והדוד). בתוך הלוח יושבים מפסקים אוטומטיים (פקקים) שתפקידם
            לקפוץ ולנתק את הזרם במקרה של קצר או עומס יתר, כדי למנוע התחממות של
            החוטים בתוך הקירות. אם אתם חווים בעיות חוזרות ונשנות, מומלץ לפנות אל{" "}
            <Link href="/" className="text-emerald-600 font-bold underline">
              ח.י שירותי חשמל
            </Link>{" "}
            לאבחון מקצועי של הלוח שלכם.
          </p>

          <h2
            id="simanim"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            2. הסימנים המרכזיים: מתי חובה לשדרג את לוח החשמל?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            לוח חשמל לא מחליפים סתם כך, אלא כאשר המציאות הבטיחותית או
            הטכנולוגית דורשת זאת. הנה המקרים הנפוצים ביותר שבהם שדרוג הלוח הוא
            הכרחי:
          </p>
          <ul className="space-y-3 text-slate-700">
            <li>
              <strong>לוח חשמל ישן עשוי עץ:</strong> אם אתם גרים בדירה ישנה ולוח
              החשמל שלכם עדיין עשוי מעץ – מדובר בסכנת נפשות מוחשית. לוחות עץ
              אינם עמידים בפני אש ומהווים גורם סיכון ראשון לשריפות. חובה
              להחליפם מיד בלוח פלסטיק מודרני וחסין אש על ידי{" "}
              <Link href="/" className="text-emerald-600 font-bold hover:underline">
                חשמלאי מוסמך בעל רישיון
              </Link>
              .
            </li>
            <li>
              <strong>הפקקים קופצים בכל פעם שמדליקים מכשיר נוסף:</strong> מפעילים
              את המזגן והקומקום ביחד והכל נכבה? הלוח שלכם פשוט אותת לכם שהוא
              הגיע לקצה גבול היכולת שלו ומערכת החשמל נמצאת בעומס יתר קריטי.
            </li>
            <li>
              <strong>רכישת מכשירים צורכי אנרגיה כבדים:</strong> הוספתם לבית
              כיריים אינדוקציה, מזגנים חזקים, או עמדת טעינה לרכב חשמלי? מכשירים
              אלו דורשים תשתית חזקה ויציבה של{" "}
              <Link href="/" className="text-emerald-600 font-bold hover:underline">
                לוח חשמל תלת פאזי
              </Link>
              .
            </li>
            <li>
              <strong>רעשים משונים או ריח של פלסטיק שרוף:</strong> אם אתם שומעים
              זימזום או ריח מוזר מכיוון ארון החשמל, יש לנתק את המכשירים הכבדים
              וליצור קשר עם{" "}
              <Link href="/" className="text-emerald-600 font-bold underline">
                חשמלאי מומלץ וישר
              </Link>{" "}
              ללא דיחוי.
            </li>
          </ul>

          <h2
            id="tlat-fazi"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            3. המעבר המנצח: מחד-פאזי לתלת-פאזי
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            רוב הבתים הישנים בישראל בנויים על תשתית חד-פאזית בקיבולת של 25 או 40
            אמפר. בעידן המודרני, הקיבולת הזו פשוט לא מספיקה. שדרוג הלוח למערכת
            תלת-פאזית (3x25 או 3x40 אמפר) מחלק את עומס החשמל של הבית לשלושה
            ערוצים נפרדים, ומאפשר לכם להפעיל את כל מכשירי החשמל בבית במקביל,
            בראש שקט לחלוטין ומבלי שהחשמל יקפוץ לעולם.
          </p>

          <div className="bg-emerald-50 border-r-4 border-emerald-500 p-6 rounded-l-xl my-8 not-prose">
            <h3 className="text-lg font-bold text-emerald-900 mt-0 mb-2">
              חשוב לדעת לפני שמשדרגים:
            </h3>
            <p className="text-emerald-800 m-0 leading-relaxed">
              שדרוג והחלפת רכיבים בלוח החשמל אינם משחק ילדים. על פי החוק
              בישראל, רק בעל מקצוע שלמד והוסמך לכך רשאי לגעת בלוח. פנייה אל{" "}
              <Link href="/" className="font-bold text-emerald-900 underline">
                הנדסאי חשמל רשום בעל רישיון ראשי
              </Link>{" "}
              מבטיחה לכם שהעבודה תתבצע בסטנדרט הגבוה ביותר, תוך עמידה מלאה
              בביקורת המחמירה של חברת החשמל.
            </p>
          </div>

          <h2
            id="sikum"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            4. סיכום: אל תמתינו לחושך
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            שדרוג לוח החשמל הוא השקעה ישירה בשקט הנפשי, בנוחות ובעיקר בבטיחות
            של המשפחה שלכם. לוח תקין ומודרני ימנע נזקים למכשירים אלקטרוניים
            יקרים ויבטיח רשת חשמל יציבה לאורך שנים קדימה.
          </p>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            צריכים לשדרג את לוח החשמל?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            אל תתפשרו על פחות מהטוב ביותר.{" "}
            <Link href="/" className="text-emerald-400 hover:underline font-bold">
              ח.י שירותי חשמל
            </Link>
            , בניהולו של יהודה חכמוב – נבדק ונמצא צדיק בתוכנית &apos;יצאת
            צדיק&apos; בערוץ 12. אנו מספקים{" "}
            <Link href="/services" className="text-emerald-400 hover:underline font-bold">
              שירותי שדרוג והחלפת לוחות חשמל
            </Link>{" "}
            ברמת הנדסה ובאמינות מוחלטת.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו עכשיו לייעוץ והצעת מחיר: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30"
            >
              חייגו עכשיו לייעוץ והצעת מחיר
            </a>
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
