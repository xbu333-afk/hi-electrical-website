import type { Metadata } from "next";
import Link from "next/link";
import ReviewsBrowser from "./ReviewsBrowser";
import WriteReviewForm from "./WriteReviewForm";
import {
  GOOGLE_AVERAGE_RATING,
  GOOGLE_REVIEW_TOTAL,
} from "@/lib/google-reviews";
import {
  buildReviewsJsonLd,
  getReviewServiceOptions,
} from "@/lib/reviews";
import { getPublishedReviews } from "@/lib/reviews-db";
import { jsonLdScriptProps } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "המלצות מהרשת",
  description:
    "המלצות של לקוחות על שירותי חשמל של יהודה חכמוב — ח.י שירותי חשמל. סננו לפי סוג שירות וכתבו המלצה משלכם.",
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
  openGraph: {
    title: "המלצות מהרשת | ח.י שירותי חשמל",
    description:
      "המלצות לקוחות על חשמלאי מוסמך במרכז ובשרון — סנן לפי סוג שירות.",
    url: `${SITE_URL}/reviews`,
  },
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();
  const services = getReviewServiceOptions(reviews);
  const jsonLd = buildReviewsJsonLd(reviews);

  return (
    <>
      <script {...jsonLdScriptProps(jsonLd)} />

      <div className="bg-slate-50">
        <header className="border-b border-gray-100 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <nav aria-label="נתיב דפים" className="mb-6">
              <ol
                className="flex list-none flex-wrap items-center gap-2 text-xs text-slate-400"
                role="list"
              >
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-emerald-700"
                  >
                    דף הבית
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">
                  ›
                </li>
                <li className="font-medium text-slate-600" aria-current="page">
                  המלצות
                </li>
              </ol>
            </nav>

            <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              המלצות מהרשת
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              חוויות אמיתיות של לקוחות שקיבלו שירות חשמל. אפשר לסנן לפי סוג
              השירות, או לכתוב המלצה משלכם.
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-950">
              <span aria-hidden="true">★</span>
              <span>
                {GOOGLE_AVERAGE_RATING.toFixed(1)} מתוך 5 · {GOOGLE_REVIEW_TOTAL}{" "}
                המלצות ברשת
              </span>
              <span className="font-medium text-amber-800/80">
                · {reviews.length} מוצגות כאן
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12">
          <section aria-labelledby="write-review-heading" className="mb-12">
            <h2 id="write-review-heading" className="sr-only">
              כתיבת המלצה
            </h2>
            <WriteReviewForm />
          </section>

          <ReviewsBrowser reviews={reviews} services={services} />

          <section
            aria-labelledby="reviews-cta-heading"
            className="mt-14 rounded-2xl bg-emerald-700 px-6 py-10 text-center"
          >
            <h2
              id="reviews-cta-heading"
              className="text-xl font-extrabold text-white sm:text-2xl"
            >
              צריכים חשמלאי מוסמך גם אתם?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-emerald-100">
              השאירו פרטים קצרים — ותועברו לוואטסאפ עם ההודעה מוכנה.
            </p>
            <Link
              href="/get-quote"
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-7 text-base font-black text-emerald-800 shadow-lg transition-colors hover:bg-slate-100"
            >
              לקבלת הצעת מחיר
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
