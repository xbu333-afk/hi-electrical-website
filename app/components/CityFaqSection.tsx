import ArticleFaqList from "@/app/components/ArticleFaqList";
import type { ArticleFaq } from "@/lib/articles";
import { businessRef, jsonLdScriptProps, websiteRef } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

type CityFaqSectionProps = {
  cityName: string;
  citySlug: string;
  /** שכונות מאומתות בלבד (city-local-data). כשאין — לא מציגים רשימה. */
  areas?: readonly string[];
};

const HOME_BASE_SLUG = "petah-tikva";

function buildCityFaq(
  cityName: string,
  citySlug: string,
  areas?: readonly string[]
): ArticleFaq[] {
  const areasText = areas?.length ? `, כולל ${areas.join(", ")}` : "";
  const serviceAnswer =
    citySlug === HOME_BASE_SLUG
      ? `כן. פתח תקווה היא בסיס הפעילות שלנו, ואנחנו עובדים בכל העיר${areasText}. השירות ניתן לדירות, לבתים פרטיים ולעסקים.`
      : `כן. ח.י שירותי חשמל עובדת ב${cityName} ובסביבה${areasText}, מבסיס הפעילות בפתח תקווה. השירות ניתן לדירות, לבתים פרטיים ולעסקים.`;

  return [
    {
      question: `אתם נותנים שירות ב${cityName}?`,
      answer: serviceAnswer,
    },
    {
      question: `תוך כמה זמן אפשר לקבל חשמלאי ב${cityName}?`,
      answer:
        "זמן ההגעה תלוי בעומס העבודה באותו יום. קריאות דחופות מקבלות עדיפות, לפי זמינות. הדרך המהירה ביותר היא לשלוח תמונה של התקלה או של לוח החשמל בוואטסאפ, ולקבל הערכה ראשונית עוד לפני הביקור.",
    },
    {
      question: `אילו עבודות חשמל אתם מבצעים ב${cityName}?`,
      answer: `איתור ותיקון תקלות וקצרים, החלפה ושדרוג של לוחות חשמל, בדיקות הארקה ובדיקות חשמל לפני קניית דירה, התקנת גופי תאורה ומערכות בית חכם, ותיקון דודי חשמל. דוגמאות לתקלות ולבדיקות ב${cityName} מופיעות בעמוד הזה.`,
    },
    {
      question: `כמה עולה חשמלאי ב${cityName}?`,
      answer: `ביקור חשמלאי עולה 350–400 ₪, והמחיר מתקזז אם מתבצעת עבודה במקום. המחירים במחירון מתייחסים לשירות באזור המרכז, כולל ${cityName}, ואינם כוללים מע"מ. לפני כל עבודה מקבלים הצעת מחיר סופית לאישור.`,
    },
  ];
}

/**
 * שאלות ותשובות מקומיות בעמוד עיר — מוצגות וגם נשלחות ל-FAQPage.
 * בכוונה ללא זמני הגעה מספריים, כדי לא ליצור התחייבות לזמינות.
 */
export default function CityFaqSection({
  cityName,
  citySlug,
  areas,
}: CityFaqSectionProps) {
  const faq = buildCityFaq(cityName, citySlug, areas);
  const url = `${SITE_URL}/cities/${citySlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    name: `שאלות נפוצות — חשמלאי ב${cityName}`,
    inLanguage: "he-IL",
    isPartOf: websiteRef,
    about: businessRef,
    publisher: businessRef,
    mainEntity: faq.map((item, index) => ({
      "@type": "Question",
      "@id": `${url}#faq-${index + 1}`,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      aria-labelledby="city-faq-heading"
      className="bg-slate-50 py-16 md:py-20 border-t border-gray-100"
    >
      <script {...jsonLdScriptProps(jsonLd)} />
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id="city-faq-heading"
          className="text-2xl sm:text-3xl font-black text-slate-900"
        >
          שאלות נפוצות על חשמלאי ב{cityName}
        </h2>
        <ArticleFaqList items={faq} />
      </div>
    </section>
  );
}
