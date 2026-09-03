import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { serviceAreas } from "@/lib/cities";
import { CITY_NEIGHBORHOODS } from "@/lib/local-seo-data";
import { ARTICLES } from "@/lib/articles";

/**
 * City route slugs for /cities/[city].
 * Primary source = serviceAreas (same as generateStaticParams).
 * Also include every key from CITY_NEIGHBORHOODS so local-SEO cities stay discoverable.
 */
function citySitemapSlugs(): string[] {
  return Array.from(
    new Set([
      ...serviceAreas.map(({ slug }) => slug),
      ...Object.keys(CITY_NEIGHBORHOODS),
    ])
  ).sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // --- Tier 1: Homepage ---
  const homepage: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // --- Tier 2: Core service pages + עמוד הסמכות (E-E-A-T) ---
  const corePages: MetadataRoute.Sitemap = [
    "/about",
    "/services",
    "/business",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // --- Tier 3: Cities index + all individual city pages ---
  const citiesIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/cities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = citySitemapSlugs().map((slug) => ({
    url: `${SITE_URL}/cities/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // --- Tier 4: Articles ---
  const articlesIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/articles`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map(
    ({ slug, datePublished, dateModified }) => ({
      url: `${SITE_URL}/articles/${slug}`,
      lastModified: new Date(dateModified ?? datePublished),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // --- Tier 5: Tools & utility pages (incl. /reviews) ---
  const toolPages: MetadataRoute.Sitemap = [
    "/pricing",
    "/faq",
    "/calculator",
    "/device-calculator",
    "/reviews",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // --- Tier 6: Russian homepage ---
  const ruPage: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/ru`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // --- Tier 7: Legal pages (incl. /terms) ---
  const legalPages: MetadataRoute.Sitemap = [
    "/privacy",
    "/terms",
    "/accessibility",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    ...homepage,
    ...corePages,
    ...citiesIndex,
    ...cityPages,
    ...articlesIndex,
    ...articlePages,
    ...toolPages,
    ...ruPage,
    ...legalPages,
  ];
}
