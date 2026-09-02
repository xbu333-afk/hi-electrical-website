import { getArticle, hebrewMonthYear } from "@/lib/articles";

type ArticleDatelineProps = {
  slug: string;
  className?: string;
};

/**
 * שורת תאריך ומשך קריאה של מאמר.
 *
 * מוזנת מאותו מקור אמת שמזין את ה-JSON-LD, כדי שהתאריך הגלוי לקורא
 * והתאריך שמוצהר לגוגל לא יוכלו להיפרד זה מזה.
 */
export default function ArticleDateline({
  slug,
  className = "mt-2 text-sm text-slate-600",
}: ArticleDatelineProps) {
  const { date, datePublished, dateModified, readTime } = getArticle(slug);
  const wasUpdated = Boolean(dateModified && dateModified !== datePublished);

  return (
    <p className={className}>
      <span>
        פורסם: <time dateTime={datePublished}>{date}</time>
      </span>
      {wasUpdated && (
        <>
          <span aria-hidden="true"> · </span>
          <span>
            עודכן:{" "}
            <time dateTime={dateModified}>{hebrewMonthYear(dateModified!)}</time>
          </span>
        </>
      )}
      <span aria-hidden="true"> · </span>
      <span>זמן קריאה: {readTime}</span>
    </p>
  );
}
