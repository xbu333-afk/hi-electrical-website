import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "בית חכם: מה צריך לדעת לפני שמתחילים? | ח.י שירותי חשמל",
  description:
    "מדריך מעשי ופשוט מאת הנדסאי חשמל: איך מתכננים מערכת בית חכם, מה ההבדל בין מערכת קווית לאלחוטית, ואיך מונעים תקלות יקרות בתשתית.",
  alternates: {
    canonical: `${SITE_URL}/articles/bayit-chacham`,
  },
  openGraph: {
    title: "בית חכם: מה צריך לדעת לפני שמתחילים?",
    description:
      "תכנון בית חכם, אלחוטי מול קווי, ומתי חובה חשמלאי מוסמך — מדריך מקצועי.",
  },
};

const TOC = [
  { id: "mah-ze", label: "מה זה בית חכם?" },
  { id: "alchuti-kviti", label: "אלחוטית או קווית?" },
  { id: "me-efo", label: "מאיפה כדאי להתחיל?" },
  { id: "sikum", label: "סיכום" },
] as const;

export default function SmartHomeArticle() {
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
              בית חכם
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span>מדריך מקצועי</span>
            <span aria-hidden="true">•</span>
            <span>חדשנות וטכנולוגיה</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            בית חכם: מה צריך לדעת לפני שמתחילים?
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
            החלום על בית שבו התריסים נסגרים מעצמם כשיש שמש חזקה, המזגן נדלק רגע
            לפני שאתם נכנסים בדלת, והדוד נכבה אוטומטית כשהמים חמים – כבר מזמן
            אינו נחלתם של עשירים בלבד. טכנולוגיית הבית החכם הפכה לנגישה, אבל
            כדי שהיא באמת תעבוד בשבילכם ולא תעשה לכם כאב ראש, יש כמה דברים
            קריטיים שחובה לדעת מראש.
          </p>

          <h2
            id="mah-ze"
            className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
          >
            1. מה זה בכלל בית חכם (בשפה פשוטה)?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            בית חכם הוא לא יותר מאשר רשת של מכשירים (תאורה, תריסים, מיזוג, דוד
            ושקעים) שמחוברים למערכת בקרה מרכזית אחת. החיבור הזה מאפשר לכם לשלוט
            על הכל מרחוק דרך הסמארטפון, לקבוע לוחות זמנים קבועים (למשל, שעון
            שבת מתקדם), וליצור &quot;תרחישים&quot; – כמו לחיצה על כפתור
            &quot;יציאה מהבית&quot; שמכבה את כל האורות, המזגנים והדוד בבת אחת.
            אם אתם רוצים לשלב מערכת כזו בצורה בטוחה, פנו אל{" "}
            <Link href="/" className="text-emerald-600 font-bold underline">
              ח.י שירותי חשמל
            </Link>{" "}
            לתכנון נכון מהרגע הראשון.
          </p>

          <h2
            id="alchuti-kviti"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            2. הדילמה הגדולה: מערכת אלחוטית או קווית?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            לפני שקונים רכיבים, חייבים להחליט על סוג התשתית המרכזית. ישנם שני
            סוגים עיקריים בשוק:
          </p>
          <ul className="space-y-4 text-slate-700">
            <li>
              <strong>מערכת אלחוטית (על בסיס Wi-Fi או Zigbee):</strong> מתאימה
              מאוד לבתים קיימים ללא צורך בשבירת קירות או שיפוץ. המפסקים הרגילים
              מוחלפים במפסקים חכמים שמתקשרים ביניהם באוויר. זו מערכת גמישה, זולה
              יחסית וקלה לעדכון.
            </li>
            <li>
              <strong>מערכת קווית (כמו תקן KNX):</strong> מערכת יציבה ואמינה
              ב-100% שבה כל החיווט עובר בתוך הקירות ישירות לארון החשמל. היא
              מתאימה רק לבתים בשלבי בנייה או שיפוץ יסודי, מכיוון שהיא דורשת
              תכנון מקצועי ומורכב בתוך{" "}
              <Link href="/" className="text-emerald-600 font-bold hover:underline">
                לוח החשמל הראשי
              </Link>{" "}
              של הבית.
            </li>
          </ul>

          <h2
            id="me-efo"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            3. מאיפה הכי כדאי להתחיל?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            אתם לא חייבים להפוך את כל הבית לחכם ביום אחד. הדרך החכמה והכלכלית
            ביותר היא להתקדם בשלבים, לפי סדרי העדיפויות הבאים:
          </p>
          <ol className="space-y-2 text-slate-600">
            <li>
              <strong>שליטה על הדוד והמיזוג:</strong> הצרכנים הגדולים של החשמל.
              שליטה בהם מונעת בזבוז כסף ומעניקה נוחות מקסימלית.
            </li>
            <li>
              <strong>תאורה חכמה:</strong> מאפשרת שליטה על אווירה, כיבוי מרכזי
              וחיסכון בחשמל.
            </li>
            <li>
              <strong>תריסים וסוככים:</strong> הגנה מפני השמש וסגירה אוטומטית
              בשעות החשיכה או בימי גשם.
            </li>
          </ol>
          <p className="text-slate-600 mt-4">
            טיפ של מקצוענים: שילוב של מערכות חכמות דורש תשתית יציבה ולעיתים
            הגדלת חיבור. מומלץ להתייעץ עם{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              הנדסאי חשמל מוסמך
            </Link>{" "}
            כדי לוודא שהלוח הקיים שלכם מסוגל לעמוד בעומס החדש.
          </p>

          <div className="bg-emerald-50 border-r-4 border-emerald-500 p-6 rounded-l-xl my-8 not-prose">
            <h3 className="text-lg font-bold text-emerald-900 mt-0 mb-2">
              למה חובה לבצע את ההתקנה רק עם חשמלאי מוסמך?
            </h3>
            <p className="text-emerald-800 m-0 leading-relaxed">
              מאחורי האפליקציה הנוצצת והכפתורים היפים מסתתר מתח חשמלי גבוה
              ומסוכן. התקנת בקרים ומפסקים חכמים בתוך הקופסאות שבקיר דורשת חיבורים
              מדויקים, הגנות נכונות ועבודה על פי חוק החשמל בישראל. פנייה אל{" "}
              <Link href="/" className="font-bold text-emerald-900 underline">
                חשמלאי יצאת צדיק
              </Link>{" "}
              מבטיחה לכם שהמערכת תותקן בצורה בטיחותית שתשמור על המכשירים היקרים
              שלכם ותעניק לכם שקט נפשי מלא.
            </p>
          </div>

          <h2
            id="sikum"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            4. סיכום: הצעד הראשון שלכם
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            בית חכם הוא השקעה משתלמת שמשדרגת את איכות החיים ומעלה את ערך הנכס
            שלכם. כדי להימנע מטעויות קריטיות ורכישת רכיבים שאינם מתאימים לרשת
            החשמל שלכם, תמיד כדאי לעשות תכנון מקדים עם איש מקצוע מנוסה.
          </p>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            חולמים על בית חכם ובטוח?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            נעים מאוד, אני יהודה חכמוב. אנו ב
            <Link href="/" className="text-emerald-400 hover:underline font-bold">
              ח.י שירותי חשמל
            </Link>{" "}
            מתמחים באפיון, תכנון והתקנת{" "}
            <Link href="/services" className="text-emerald-400 hover:underline font-bold">
              מערכות בית חכם
            </Link>{" "}
            מתקדמות בהתאמה אישית מלאה. העבודה מבוצעת תחת רישיון ראשי ובסטנדרט
            הגבוה ביותר בשוק.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו עכשיו לייעוץ ראשוני חינם: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30"
            >
              חייגו עכשיו לייעוץ ראשוני חינם
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
