import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_DISPLAY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "הנדימן הוא לא חשמלאי! מתי אסור להתפשר על איש מקצוע? | ח.י שירותי חשמל",
  description:
    "תיקונים קטנים בבית זה נחמד, אבל כשזה מגיע לחשמל - הנדימן ללא רישיון הוא סכנת חיים. קראו למה החוק אוסר זאת ואיך שומרים על בטיחות הבית.",
  alternates: {
    canonical: `${SITE_URL}/articles/handyman-vs-electrician`,
  },
  openGraph: {
    title: "הנדימן הוא לא חשמלאי: למה אלתורים עולים ביוקר?",
    description:
      "חוק החשמל, סכנת ביטוח ורישיון מוסמך — מדריך בטיחות מלא.",
  },
};

const TOC = [
  { id: "hok", label: "מה אומר החוק בישראל?" },
  { id: "bituach", label: "סכנת הביטוח" },
  { id: "rishayon", label: "איך מוודאים רישיון?" },
] as const;

export default function HandymanArticle() {
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
              הנדימן מול חשמלאי
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 text-red-600 font-bold mb-4 text-sm justify-center md:justify-start">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
              אזהרת בטיחות
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6 text-center md:text-right">
            הנדימן הוא לא חשמלאי: למה אלתורים עולים ביוקר?
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
            הזמנתם &quot;הנדימן&quot; לתלות טלוויזיה או להרכיב ארון? מצוין!
            הנדימנים הם פתרון נהדר לעבודות כלליות בבית. אבל הבעיה מתחילה כשהם
            מציעים &quot;על הדרך&quot; גם להחליף שקע, להתקין גוף תאורה או לתקן
            את הדוד. חשוב להגיד את זה ברור: הנדימן הוא לא חשמלאי. התעסקות בחשמל
            ללא רישיון היא עבירה פלילית, וגרוע מכך – סכנת חיים ממשית.
          </p>

          <h2
            id="hok"
            className="text-2xl font-bold text-slate-800 mb-4 scroll-mt-24"
          >
            1. מה אומר החוק בישראל?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            חוק החשמל (תשי&quot;ד-1954) קובע במפורש: אסור לאף אדם לבצע עבודת חשמל
            – אפילו הקטנה ביותר – אלא אם כן יש בידיו רישיון חשמלאי תקף ומתאים
            לסוג העבודה. למה? כי בעוד שמדף עקום אפשר לתקן, חוט אפס שלא מחובר טוב
            יכול לגרום לשריפה או להתחשמלות של ילד שנוגע במקרר. רק{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              חשמלאי מוסמך
            </Link>{" "}
            מכיר את התקנים, יודע למדוד הארקה, ומבין את העומסים בלוח החשמל.
          </p>

          <h2
            id="bituach"
            className="text-2xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24"
          >
            2. סכנת הביטוח: כשהזול עולה ביוקר
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            נניח והנדימן התקין לכם גוף תאורה בזול, אך בגלל חיבור רופף (מגע רופף
            מייצר חום אדיר) פרצה שריפה. כשתפנו לחברת הביטוח להפעיל את הפוליסה,
            הדבר הראשון שהם יבקשו הוא חשבונית ופרטי רישיון מאיש המקצוע שביצע את
            העבודה. ברגע שיתברר שזה היה אדם ללא רישיון – חברת הביטוח פשוט תתנער
            מכל אחריות. אל תיקחו את הסיכון הזה. עבדו מול צוות{" "}
            <Link href="/" className="text-emerald-600 font-bold hover:underline">
              ח.י שירותי חשמל
            </Link>{" "}
            כדי להבטיח עבודה מגובה בביטוח.
          </p>

          <div
            id="rishayon"
            className="bg-amber-50 border-r-4 border-amber-500 p-6 rounded-l-xl my-8 scroll-mt-24 not-prose"
          >
            <h3 className="text-lg font-bold text-amber-900 mt-0 mb-2">
              איך מוודאים שלאיש המקצוע יש רישיון?
            </h3>
            <p className="text-amber-800 m-0 leading-relaxed">
              אל תסתפקו בהבטחות. בקשו לראות את כרטיס הרישיון הפלסטיק (כמו רישיון
              נהיגה) מטעם משרד הכלכלה ורשות החשמל, ובדקו שרשום עליו לפחות
              &quot;חשמלאי מוסמך&quot;. אם אתם מחפשים שקט נפשי, הזמינו{" "}
              <Link href="/" className="font-bold text-amber-900 underline">
                חשמלאי יצאת צדיק
              </Link>{" "}
              שכבר עבר את סינוני האמינות והבטיחות הקפדניים ביותר.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-slate-900 text-white p-8 md:p-10 rounded-2xl text-center shadow-xl not-prose">
          <h2 className="text-3xl font-black mb-4 text-emerald-400">
            יש לכם עבודת חשמל בבית?
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            אל תפקידו את בטיחות המשפחה שלכם בידיים חובבניות. אנו מתחייבים לעבודה
            תקנית, מקצועית וברמת הגימור הגבוהה ביותר, מגובה ברישיון ראשי של
            הנדסאי חשמל.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              aria-label={`לחיוג מהיר לתיאום ביקור: ${PHONE_DISPLAY}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg"
            >
              לחיוג מהיר לתיאום ביקור
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
