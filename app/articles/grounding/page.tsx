import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL, WHATSAPP_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "הארקה - בטיחות בחשמל",
  description:
    "מהי הארקה? למה היא כל כך חשובה? כל מה שצריך לדעת על הארקה, סכנות, בדיקות תקינות ושירותי בדיקה מקצועיים של חשמלאי מוסמך. זמינות 24/7.",
  alternates: {
    canonical: `${SITE_URL}/articles/grounding`,
  },
  openGraph: {
    title: "הארקה – מהי, למה היא חשובה ואיך מוודאים שהיא תקינה?",
    description:
      "מדריך מלא על הארקה ביתית — סכנות, בדיקות תקינות ושירות מקצועי של חשמלאי מוסמך.",
  },
};

export default function GroundingArticle() {
  return (
    <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <header className="mb-10 border-b border-gray-100 pb-8 text-center md:text-right">
          <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1 rounded-full mb-4">
            בטיחות בחשמל
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
            הארקה – מהי, למה היא חשובה ואיך מוודאים שהיא תקינה?
          </h1>
        </header>

        <div className="prose prose-lg prose-emerald rtl:prose-reverse max-w-none marker:text-emerald-500">
          <h2 className="text-2xl font-bold text-slate-800">הקדמה</h2>
          <p>
            מערכת החשמל בבית ובעסק שלנו פועלת באופן שמאפשר לנו להפעיל מכשירים חשמליים
            בבטיחות. אך מה קורה כאשר יש תקלה במכשיר, זליגת זרם חשמלי או מגע בין חוטים?
            כאן נכנסת לפעולה מערכת ההארקה, שמטרתה להגן עלינו מפני התחשמלות ונזקי חשמל
            מסוכנים.
          </p>
          <p>
            במאמר זה נסביר מהי הארקה, איך היא עובדת, מהן הסכנות בהיעדר הארקה תקינה
            וכיצד ניתן לבדוק ולתחזק את מערכת ההארקה בבית ובעסק.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-10">מהי הארקה?</h2>
          <p>
            הארקה היא מערכת חשמלית שמטרתה להעביר זרם חשמלי עודף או זליגות חשמל אל האדמה,
            ובכך למנוע סכנת התחשמלות, פגיעה בציוד חשמלי ונזק ללוח החשמל.
          </p>
          <p>במערכת החשמל זרם חשמלי נע בין שני חוטים עיקריים:</p>
          <ul>
            <li>
              <strong>פאזה</strong> – מעביר את הזרם מהממסר בלוח למכשירים בבית.
            </li>
            <li>
              <strong>אפס</strong> – מחזיר את הזרם חזרה למערכת.
            </li>
          </ul>
          <p>
            כאשר יש תקלה או חוט חשוף, הזרם עלול לעבור דרך גוף מתכתי – ואז אל גוף האדם.
            כאן נכנסת ההארקה שמספקת נתיב חלופי ובטוח – ישירות לאדמה.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-10">
            כיצד מערכת ההארקה פועלת?
          </h2>
          <p>
            מערכת ההארקה מורכבת ממוט מתכת התקוע באדמה ומחובר לכל רכיבי מערכת החשמל.
            במקרה של דליפה, הזרם מנותב אל האדמה. בנוסף, משולבת מערכת ההארקה עם ממסר
            פחת, שתפקידו לזהות זרם חריג ולנתק את המתח באופן מיידי.
          </p>

          <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded-l-xl my-8 not-prose">
            <h3 className="text-xl font-bold text-red-800 mt-0 mb-2">
              מה קורה כאשר אין הארקה תקינה?
            </h3>
            <ul className="text-red-900 m-0 space-y-2 list-disc list-outside me-5">
              <li>
                <strong>סכנת התחשמלות</strong> – הזרם עלול לעבור דרך האדם.
              </li>
              <li>
                <strong>סיכון לשריפה</strong> – התחממות חוטים עקב ניתוב שגוי.
              </li>
              <li>
                <strong>נזק למכשירים</strong> – קפיצות מתח גורמות לשריפה של ציוד יקר.
              </li>
              <li>
                <strong>הפעלת חשמל לא יציבה</strong> – תקלות, הפסקות וקפיצות בלוח.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-10">
            בדיקה מקצועית של חשמלאי מוסמך
          </h2>
          <p>
            כדי לוודא שהמערכת תקינה, נדרשת בדיקה של{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline no-underline">
              חשמלאי מוסמך
            </Link>{" "}
            הכוללת:
          </p>
          <ul>
            <li>מדידת התנגדות הארקה.</li>
            <li>בדיקת ממסר פחת בלוח החשמל.</li>
            <li>בדיקת חיבורי הארקה בלוח.</li>
            <li>בדיקת הארקת יסוד.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-10">
            מתי צריך לשדרג או לתקן מערכת הארקה?
          </h2>
          <ul>
            <li>במבנים ישנים שנבנו לפני שנות ה-90.</li>
            <li>לאחר שיפוץ או הוספת מכשירים כבדים לבית.</li>
            <li>במקרים של קפיצות חשמל תכופות.</li>
            <li>אם יש סימני שריפה או ריח מוזר בארון החשמל.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-10">
            כיצד לשמור על הארקה תקינה?
          </h2>
          <ul>
            <li>
              בדיקה תקופתית על ידי איש מקצוע. אם אתם זקוקים ל
              <Link
                href="/cities/petah-tikva"
                className="text-emerald-600 font-bold hover:underline no-underline"
              >
                חשמלאי בפתח תקווה
              </Link>{" "}
              והסביבה, אנחנו זמינים עבורכם.
            </li>
            <li>שימוש ברכיבים תקניים לפי התקן הישראלי.</li>
            <li>בדיקה לאחר כל שינוי בתשתית החשמל של הבית.</li>
            <li>הימנעות מהעמסת יתר על רשת החשמל.</li>
          </ul>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            אל תתפשרו על בטיחות החשמל שלכם!
          </h2>
          <p className="text-lg text-slate-300 mb-6 leading-relaxed">
            מערכת ההארקה היא קו ההגנה הראשון שלכם מפני התחשמלות ונזקי חשמל.{" "}
            <Link
              href="/"
              className="text-white hover:text-emerald-300 underline underline-offset-4"
            >
              ח.י שירותי חשמל
            </Link>{" "}
            מבצעים התקנת ובדיקת מערכות הארקה ברמה הגבוהה ביותר!
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                ✓
              </div>
              <span>חשמלאי מוסמך עם ניסיון מוכח</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                ✓
              </div>
              <span>מחירים הוגנים ושירות אמין – ללא הפתעות</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                ✓
              </div>
              <span>ציוד מתקדם לאיתור תקלות מדויק</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                ✓
              </div>
              <span>שירות מהיר וזמינות למקרי חירום (למעט שבתות וחגים)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold py-4 px-8 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30"
              aria-label={`חייגו עכשיו לבדיקת הארקה: ${PHONE_DISPLAY}`}
            >
              חייגו עכשיו לבדיקת הארקה
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white text-center font-bold py-4 px-8 rounded-full transition-all text-lg"
              aria-label="שליחת הודעת WhatsApp"
            >
              שליחת הודעת WhatsApp
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
