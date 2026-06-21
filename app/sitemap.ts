import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { serviceAreas } from "@/lib/cities";

const ARTICLE_SLUGS = [
  "bayit-chacham",
  "beware-of-scammers",
  "electrical-licenses-guide",
  "grounding",
  "handyman-vs-electrician",
  "how-to-choose-electrician",
  "ma-ze-luch-hashmal",
  "mimsar-pahat",
  "shiryutei-hashmal",
] as const;

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

  // --- Tier 2: Core service pages ---
  const corePages: MetadataRoute.Sitemap = ["/services", "/business"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  // --- Tier 3: Cities index + all individual city pages ---
  const citiesIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/cities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = serviceAreas.map(({ slug }) => ({
    url: `${SITE_URL}/cities/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
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

  const articlePages: MetadataRoute.Sitemap = ARTICLE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // --- Tier 5: Tools & utility pages ---
  const toolPages: MetadataRoute.Sitemap = [
    "/pricing",
    "/faq",
    "/calculator",
    "/device-calculator",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // --- Tier 6: Russian landing page ---
  const ruPage: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/ru`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // --- Tier 7: Legal / low-value pages ---
  const legalPages: MetadataRoute.Sitemap = ["/privacy", "/accessibility"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })
  );

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
