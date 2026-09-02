import type { ArticleFaq } from "@/lib/articles";

type ArticleFaqListProps = {
  items: readonly ArticleFaq[];
};

/**
 * רשימת שאלות ותשובות בתחתית מאמר.
 *
 * השאלה מרונדרת כ-h3 בתוך ה-summary כדי שהקשר בין השאלה לתשובה יהיה
 * חד-משמעי לסורקים ולמנועי תשובות, ואותו טקסט בדיוק נשלח ל-FAQPage
 * ב-JSON-LD. הרכיב משותף לכל המאמרים כדי שהתבנית לא תיפרד לגרסאות.
 */
export default function ArticleFaqList({ items }: ArticleFaqListProps) {
  return (
    <div className="mt-6 space-y-4">
      {items.map(({ question, answer }, index) => (
        <details
          key={question}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white"
        >
          <summary className="cursor-pointer list-none marker:content-none">
            <h3 className="m-0 flex items-start justify-between gap-4 text-lg font-bold text-slate-900">
              <span>{question}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-emerald-700 transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </h3>
          </summary>
          <p className="mt-3 leading-relaxed text-slate-700">{answer}</p>
        </details>
      ))}
    </div>
  );
}
