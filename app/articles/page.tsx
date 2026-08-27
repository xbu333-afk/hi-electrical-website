import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import {
  buildBreadcrumbList,
  jsonLdScriptProps,
  personRef,
  websiteRef,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "מאמרים ומדריכים | חשמל וחשמלאות",
  description:
    "מדריכים, טיפים ומאמרים מקצועיים בנושאי חשמל — מאת יהודה חכמוב, הנדסאי חשמל מוסמך.",
  alternates: {
    canonical: `${SITE_URL}/articles`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/articles#webpage`,
      url: `${SITE_URL}/articles`,
      name: "מאמרים ומדריכים מקצועיים בנושאי חשמל",
      description:
        "מדריכים, טיפים ומאמרים מקצועיים בנושאי חשמל — מאת יהודה חכמוב, הנדסאי חשמל מוסמך.",
      inLanguage: "he-IL",
      isPartOf: websiteRef,
      author: personRef,
      breadcrumb: { "@id": `${SITE_URL}/articles#breadcrumb` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ARTICLES.map(({ slug, title }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: title,
          url: `${SITE_URL}/articles/${slug}`,
        })),
      },
    },
    buildBreadcrumbList(`${SITE_URL}/articles#breadcrumb`, [
      { name: "מאמרים ומדריכים", path: "/articles" },
    ]),
  ],
};

export default function ArticlesPage() {
  return (
    <>
      <script {...jsonLdScriptProps(jsonLd)} />

      {/* ── Header ── */}
      <section
        aria-labelledby="articles-heading"
        className="bg-white border-b border-gray-100 py-14 md:py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-2">
            מאמרים ומדריכים
          </p>
          <h1
            id="articles-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4"
          >
            ידע מקצועי.
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
            מאת יהודה חכמוב — הנדסאי חשמל מוסמך. מדריכים בשפה פשוטה
            שיעזרו לכם להבין את הבית שלכם.
          </p>
        </div>
      </section>

      {/* ── Articles list ── */}
      <section aria-label="רשימת מאמרים" className="bg-slate-50 py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ul className="divide-y divide-gray-100 list-none" role="list">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 py-7 hover:bg-white/80 transition-colors px-4 -mx-4 rounded-2xl"
                  aria-label={`קרא: ${a.title}`}
                >
                  {/* Category */}
                  <span className="inline-flex self-start shrink-0 bg-white border border-gray-200 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-lg sm:mt-1 sm:w-28 sm:text-center">
                    {a.category}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-slate-900 font-bold text-lg mb-1.5 leading-snug group-hover:text-emerald-700 transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {a.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{a.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{a.readTime} קריאה</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 self-center rotate-180 hidden sm:block"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-labelledby="articles-cta-heading"
        className="bg-white border-t border-gray-100 py-14"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            id="articles-cta-heading"
            className="text-lg font-bold text-slate-900 mb-2"
          >
            שאלה שלא מצאתם כאן?
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            פנו ישירות ליהודה — חשמלאי שאוהב להסביר.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            צרו קשר
          </Link>
        </div>
      </section>
    </>
  );
}
