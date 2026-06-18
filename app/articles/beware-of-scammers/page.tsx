import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: 'זהירות מנוכלים: איך תזהו חשמלאים מתחזים והונאות "יצאת צדיק"? | ח.י שירותי חשמל',
  description:
    "השוק פרוץ ונוכלים מזייפים תעודות ואפילו תמונות עם חיים אתגר בעזרת AI. כך תזהו חאפרים, תבדקו רישיון חשמלאי ותשמרו על החיים שלכם.",
  alternates: {
    canonical: `${SITE_URL}/articles/beware-of-scammers`,
  },
  openGraph: {
    title: 'זהירות מנוכלים: חשמלאים מתחזים והונאות "יצאת צדיק"',
    description:
      "איך לזהות נוכלים, לבדוק רישיון ולא להיפול על זיופי AI — מדריך צרכנות ובטיחות.",
  },
};

const TOC = [
  { id: "rishayon", label: "איפה רישיון החשמל?" },
  { id: "yatza-tzadik", label: 'עוקץ מדליית "יצאת צדיק"' },
  { id: "ai", label: "זיופים בעידן ה-AI" },
  { id: "mechir", label: "הצעות מחיר מופרכות" },
  { id: "sikum", label: "סיכום" },
] as const;

export default function BewareOfScammersArticle() {
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
              זהירות מנוכלים
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-red-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
              תחקיר צרכנות ובטיחות
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            זהירות מנוכלים: איך תזהו מתחזים לחשמלאים והונאות &quot;יצאת צדיק&quot;?
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
            הזמנתם חשמלאי הביתה? כדאי שתפתחו עיניים. לאחרונה אנו עדים לתופעה
            מדאיגה ומסוכנת של נוכלים המציגים את עצמם כאנשי מקצוע מורשים, גובים
            אלפי שקלים על תיקונים מיותרים, ובמקרה הרע – משאירים אחריהם סכנת
            חיים של ממש. והחלק המפחיד באמת? הם למדו להשתמש בטכנולוגיה כדי
            להיראות אמינים מתמיד.
          </p>

          <h2
            id="rishayon"
            className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
          >
            1. נורת אזהרה ראשונה: איפה רישיון החשמל?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            כל מי שמתעסק בחשמל בישראל מחויב לשאת רישיון בתוקף. נקודה.{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי מוסמך
            </Link>{" "}
            אמיתי גאה ברישיון שלו (ובמיוחד הנדסאי חשמל שעבד קשה שנים כדי להשיג
            אותו).
            <br />
            <br />
            <strong>איך תבדקו?</strong> אל תחכו שהוא יגיע אליכם הביתה. כבר
            בשיחת הטלפון או בוואטסאפ, בקשו שישלח לכם צילום של רישיון החשמלאי שלו.
            חשמלאי שמתחמק, אומר &quot;זה
            באוטו&quot; או &quot;אני אראה לך כשנגיע&quot; – זה סימן ענק לחשוד
            ולנתק את השיחה.
          </p>

          <h2
            id="yatza-tzadik"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            2. עוקץ מדליית &quot;יצאת צדיק&quot;
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            התוכנית של חיים אתגר הפכה לחותמת האמינות החזקה בישראל. אבל נוכלים
            הבינו את זה, והתחילו &quot;להדביק&quot; את הלוגו של התוכנית על
            האתרים ועל המודעות שלהם בגוגל.
          </p>
          <ul className="space-y-4 text-slate-700 mb-6">
            <li>
              <strong>אין סרטון? אין אמונה:</strong> מי שבאמת נבדק ויצא צדיק,
              יציג בגאווה סרטון מתוך התוכנית או לפחות תמונה ברורה ואותנטית עם
              חיים אתגר וצוות ההפקה המעניקים לו את המדליה (כמו שאנחנו ב
              <Link href="/" className="text-emerald-600 font-bold hover:underline">
                ח.י שירותי חשמל
              </Link>{" "}
              מציגים בשקיפות מלאה).
            </li>
            <li>
              <strong>בדקו ברשימות הרשמיות:</strong> אל תסמכו רק על הלוגו באתר.
              חפשו את שם העסק ברשימת הצדיקים הרשמית של ערוץ 12 או באתרי דירוג
              אמינים כמו{" "}
              <Link href="/" className="text-emerald-600 font-bold hover:underline">
                מידרג חשמלאים
              </Link>{" "}
              כדי להצליב מידע.
            </li>
          </ul>

          <div
            id="ai"
            className="bg-red-50 border-r-4 border-red-500 p-6 rounded-l-xl my-8 scroll-mt-24 not-prose"
          >
            <h3 className="text-lg font-bold text-red-900 mt-0 mb-2">
              3. סכנה חדשה: זיופים בעידן ה-AI (בינה מלאכותית)
            </h3>
            <p className="text-red-800 m-0 leading-relaxed">
              היום, בעזרת תוכנות בינה מלאכותית חינמיות, כל חאפר יכול בתוך 3
              דקות לזייף לעצמו תעודת חשמלאי מוסמך, או ל&quot;הדביק&quot; את
              הפנים שלו על תמונה מזויפת כשהוא עומד כביכול ליד חיים אתגר עם
              מדליה.
              <strong> הפתרון:</strong> אל תסתמכו רק על תמונות יפות. את רישיון
              החשמל ששלחו לכם אפשר וצריך לאמת תוך שניות בחיפוש פשוט במאגר
              &quot;פנקס החשמלאים&quot; של משרד הכלכלה. אם הוא לא מופיע שם – הוא
              לא חשמלאי!
            </p>
          </div>

          <h2
            id="mechir"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            4. מלכודת הפיתיון: מחיר ביקור שמתנפח לאלפי שקלים
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            אחת השיטות הנפוצות והמסוכנות ביותר של חאפרים היא שיטת הפיתיון. בשיחת
            הטלפון הם יציעו מחיר ביקור או הצעה שנשמעת לכם הוגנת ומשתלמת — רק כדי
            שתפתחו להם את הדלת. אבל ברגע שהם בפנים? פתאום הם יגלו &quot;סכנת
            שריפה מיידית במערכת&quot; או &quot;לוח חשמל שחייב החלפה הרגע&quot;.
            הם יפעילו עליכם לחץ פסיכולוגי, ותיקון קצר פשוט יהפוך להצעת מחיר
            מנופחת באלפי שקלים.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            בעל מקצוע אמין שעובד בשקיפות לא מפתה אתכם במחירים מטעים בטלפון כדי
            להיכנס לבית. הוא יגבה מחיר ביקור ריאלי ותקני, יסביר במדויק מה
            התקלה, ויתמחר אותה ביושר לפני שיחליף אפילו בורג אחד. אם אתם מחפשים
            שקט נפשי ובודקים דרך{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              מידרג חשמלאים
            </Link>{" "}
            או מזמינים{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי יצאת צדיק
            </Link>
            , תגלו שהמומחים האמיתיים תמיד יסבירו לכם במדויק מה התקלה, ויתמחרו
            אותה ביושר ובשקיפות לפני שיחליפו אפילו בורג אחד – בלי טריקים, ובלי
            הפתעות בחשבון הסופי.
          </p>

          <h2
            id="sikum"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            סיכום: בטיחות לפני הכל
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            הבית שלכם והמשפחה שלכם הם לא המקום לניסויים של חאפרים. בדיקה פשוטה
            של רישיון, חיפוש המלצות אמיתיות ווידוא מול פנקס החשמלאים – ייקחו
            לכם 5 דקות, אבל יחסכו לכם עוגמת נפש אדירה, סכנות התחשמלות ושריפה,
            וכמובן כסף רב.
          </p>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            מחפשים שקט נפשי ובטיחות מוחלטת?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            אני יהודה חכמוב,{" "}
            <Link href="/" className="text-emerald-400 hover:underline font-bold">
              הנדסאי חשמל וחשמלאי מוסמך
            </Link>
            . אצלי התעודות, רישיון החשמל, וההוקרה מ&quot;יצאת צדיק&quot; נמצאים
            גלויים לעיני כל, ואשלח לכם אותם בשמחה עוד לפני שאגיע. אמינות היא לא
            רק סיסמה – היא הדרך שבה אנחנו עובדים.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`חייגו לתיאום ביקור בטוח: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30"
            >
              חייגו לתיאום ביקור בטוח: {PHONE_DISPLAY}
            </a>
            <Link
              href="/faq"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all text-lg text-center"
            >
              שאלות ותשובות נפוצות
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
