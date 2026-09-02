import { SITE_URL } from "@/lib/site";
import { OG_IMAGE_SIZE, articleOgImageUrl } from "@/lib/og";
import {
  buildBreadcrumbList,
  businessRef,
  personRef,
  websiteRef,
} from "@/lib/schema";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** תווית תצוגה, למשל "7 דק׳" */
  readTime: string;
  /** תווית תצוגה בעברית, למשל "יוני 2026" */
  date: string;
  /**
   * תאריך פרסום ISO-8601 עבור JSON-LD.
   * ידוע רק חודש ושנה, ולכן נבחר ה-1 בחודש כערך יציב.
   */
  datePublished: string;
  /** מוגדר רק כשהמאמר עודכן מהותית אחרי הפרסום */
  dateModified?: string;
};

/**
 * שאלה ותשובה שמוצגת בגוף המאמר וגם נשלחת ל-FAQPage.
 * `answer` חייב להיות טקסט נקי ללא JSX — schema.org לא מקבל תגיות.
 */
export type ArticleFaq = {
  question: string;
  answer: string;
};

/**
 * מקור האמת היחיד למאמרים.
 * נצרך על ידי עמוד רשימת המאמרים, מפת האתר, וה-JSON-LD של כל מאמר —
 * כדי שרשימה אחת לא תתפצל משלוש רשימות שמתפזרות עם הזמן.
 */
export const ARTICLES: readonly Article[] = [
  {
    slug: "load-balancing",
    title: "איזון עומסים וחלוקת פאזות: למה תלת-פאזי לבדו לא מפסיק את הקפיצות",
    excerpt:
      "יש לכם תלת-פאזי והחשמל עדיין קופץ? ברוב המקרים הבעיה אינה גודל החיבור אלא חלוקה לא מאוזנת של המעגלים בין הפאזות. מדריך למדידת עומסים, לזיהוי פאזה עמוסה ולחלוקה נכונה בלוח.",
    category: "תשתיות חשמל",
    readTime: "9 דק׳",
    date: "אוגוסט 2026",
    datePublished: "2026-08-27",
  },
  {
    slug: "panel-upgrade",
    title: "החלפה ושדרוג לוח חשמל: מה באמת קורה מאחורי דלת הארון",
    excerpt:
      "מדריך הנדסי להחלפת לוח חשמל: מתי מדובר בחובה ולא בשיפור, מה חייב להיכלל בלוח חדש לפי התקן, אילו בדיקות מסירה מבוצעות בסיום — ואילו מסמכים אתם חייבים לקבל ביד.",
    category: "לוחות חשמל",
    readTime: "10 דק׳",
    date: "אוגוסט 2026",
    datePublished: "2026-08-27",
  },
  {
    slug: "fault-loop-impedance",
    title: "בדיקת הארקה ולולאת תקלה: המספרים שקובעים אם המיגון יפעל",
    excerpt:
      "הארקה שקיימת אינה בהכרח הארקה תקינה. מדריך למדידות שקובעות אם המיגון ינתק בזמן — רציפות מוליך ההגנה, התנגדות אלקטרודת ההארקה ועכבת לולאת התקלה, ואיך קוראים את התוצאות.",
    category: "בדיקות ותקינה",
    readTime: "10 דק׳",
    date: "אוגוסט 2026",
    datePublished: "2026-08-27",
  },
  {
    slug: "ghost-tripping",
    title: "קפיצות פחת וקצרים סמויים: איך מאתרים תקלה שנעלמת?",
    excerpt:
      "ממסר הפחת קופץ פעם בשבוע ואף אחד לא מוצא למה? מדריך לאיתור זליגות נסתרות בבידוד — למה שיטת הניתוק והניסוי נכשלת, ואיך מכשיר מגר (Megger) ו-Sonel MPI 520 חושפים את מקור התקלה במדידה.",
    category: "איתור תקלות",
    readTime: "9 דק׳",
    date: "אוגוסט 2026",
    datePublished: "2026-08-27",
  },
  {
    slug: "three-phase-upgrade",
    title: "הגדלת חיבור לתלת-פאזי: מתי זה הכרחי ואיך עושים את זה נכון?",
    excerpt:
      "המזגנים מפילים את החשמל והמאמ״ת הראשי קופץ? מדריך מלא להגדלת חיבור מחד-פאזי לתלת-פאזי — סימני האזהרה, התהליך מול חברת החשמל, מי מורשה לחתום על העבודה וכמה זמן זה לוקח.",
    category: "תשתיות חשמל",
    readTime: "9 דק׳",
    date: "אוגוסט 2026",
    datePublished: "2026-08-27",
  },
  {
    slug: "hachzarat-hashmal",
    title: "נותקתם מהחשמל? המדריך המלא להחזרת החיבור מול חברת החשמל",
    excerpt:
      "ניתוק חברת חשמל מסיבות בטיחות: למה זה קורה, איך מחזירים חשמל שלב-אחר-שלב, ומתי חובה חשמלאי ראשי ואישור תקינות.",
    category: "מדריך חירום",
    readTime: "10 דק׳",
    date: "אוגוסט 2026",
    datePublished: "2026-08-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "beware-of-scammers",
    title: 'זהירות מנוכלים: איך תזהו מתחזים והונאות "יצאת צדיק"?',
    excerpt:
      "נוכלים מזייפים תעודות ותמונות עם חיים אתגר בעזרת AI. איך לבדוק רישיון, לזהות חאפרים ולשמור על הבית שלכם.",
    category: "תחקיר צרכנות",
    readTime: "10 דק׳",
    date: "יוני 2026",
    datePublished: "2026-06-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "how-to-choose-electrician",
    title: "איך לבחור חשמלאי מוסמך (וממה כדאי להיזהר)?",
    excerpt:
      "מדריך מלא: רישיון, יצאת צדיק, מידרג, חירום 24 שעות וחשמלאי דודים — איך לסנן חאפרים ולבחור נכון.",
    category: "צרכנות נבונה",
    readTime: "9 דק׳",
    date: "יוני 2026",
    datePublished: "2026-06-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "electrical-licenses-guide",
    title: "עוזר, מוסמך או הנדסאי? כל מה שצריך לדעת על רישיונות חשמל",
    excerpt:
      "לא כל חשמלאי מורשה לבצע כל עבודה. מדריך מקיף לסוגי הרישיונות בישראל: מי רשאי לחתום על לוח תלת-פאזי, איפה זה מופיע ברישיון, וממה כדאי להיזהר.",
    category: "מדריך צרכנות חכמה",
    readTime: "10 דק׳",
    date: "יוני 2026",
    datePublished: "2026-06-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "handyman-vs-electrician",
    title: "הנדימן הוא לא חשמלאי: למה אלתורים עולים ביוקר?",
    excerpt:
      "הנדימן ללא רישיון הוא סכנת חיים. מה אומר החוק, מתי הביטוח לא יכסה — ואיך לוודא חשמלאי מוסמך.",
    category: "אזהרת בטיחות",
    readTime: "10 דק׳",
    date: "יוני 2026",
    datePublished: "2026-06-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "grounding",
    title: "הארקה – מהי, למה היא חשובה ואיך מוודאים שהיא תקינה?",
    excerpt:
      "מהי הארקה? למה היא כל כך חשובה? סכנות, בדיקות תקינות ושירותי בדיקה מקצועיים של חשמלאי מוסמך.",
    category: "בטיחות בחשמל",
    readTime: "10 דק׳",
    date: "יוני 2026",
    datePublished: "2026-06-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "mimsar-pahat",
    title: "למה ממסר הפחת קופץ (ומה עושים עכשיו)?",
    excerpt:
      "החשמל קפץ ואי אפשר להרים את המתג? מדריך חירום פשוט — מה לעשות לבד, איך לאתר את התקלה, ומתי חייבים לקרוא לחשמלאי מוסמך.",
    category: "מדריך חירום",
    readTime: "10 דק׳",
    date: "יוני 2026",
    datePublished: "2026-06-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "ma-ze-luch-hashmal",
    title: "מה זה לוח חשמל ומתי צריך לשדרג אותו?",
    excerpt:
      "המדריך המלא: מה תפקידו של לוח החשמל, סימני עומס יתר, מתי חובה לשדרג לתלת-פאזי — ומתי לפנות לחשמלאי מוסמך.",
    category: "לוחות חשמל",
    readTime: "9 דק׳",
    date: "מאי 2026",
    datePublished: "2026-05-01",
    dateModified: "2026-09-02",
  },
  {
    slug: "bayit-chacham",
    title: "בית חכם: מה צריך לדעת לפני שמתחילים?",
    excerpt:
      "מדריך מעשי: אלחוטי מול קווי, מאיפה להתחיל, ולמה חובה חשמלאי מוסמך — לפני שקונים רכיבים לבית חכם.",
    category: "בתים חכמים",
    readTime: "10 דק׳",
    date: "אפריל 2026",
    datePublished: "2026-04-01",
    dateModified: "2026-09-02",
  },
];

export function getArticle(slug: string): Article {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    throw new Error(`Unknown article slug: ${slug}`);
  }
  return article;
}

const HEBREW_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

/** "2026-09-02" → "ספטמבר 2026" — תווית תצוגה לתאריך עדכון */
export function hebrewMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  return `${HEBREW_MONTHS[Number(month) - 1]} ${year}`;
}

/** "7 דק׳" → "PT7M" (ISO-8601 duration) */
function toIsoDuration(readTime: string): string | undefined {
  const minutes = readTime.match(/\d+/)?.[0];
  return minutes ? `PT${minutes}M` : undefined;
}

/**
 * גרף JSON-LD מלא למאמר בודד: Article + WebPage + BreadcrumbList,
 * ובנוסף FAQPage כאשר מועברות שאלות ותשובות.
 * המחבר והמפרסם מקושרים ב-@id לישויות שמוגדרות ב-layout,
 * כך שכל מאמר מזין את אותה ישות מחברת ולא יוצר ישות חדשה.
 */
export function buildArticleJsonLd(slug: string, faq?: readonly ArticleFaq[]) {
  const article = getArticle(slug);
  const url = `${SITE_URL}/articles/${slug}`;
  const hasFaq = Boolean(faq?.length);

  /**
   * תמונה ייחודית למאמר. בעבר כל המאמרים הצהירו על לוגו האתר,
   * מה שפוסל אותם לתוצאות עשירות — גוגל דורש תמונה שמייצגת את התוכן עצמו.
   */
  const imageRef = {
    "@type": "ImageObject",
    "@id": `${url}#primaryimage`,
    url: articleOgImageUrl(slug),
    contentUrl: articleOgImageUrl(slug),
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
    caption: article.title,
  };

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: article.title,
      name: article.title,
      description: article.excerpt,
      articleSection: article.category,
      datePublished: article.datePublished,
      dateModified: article.dateModified ?? article.datePublished,
      timeRequired: toIsoDuration(article.readTime),
      inLanguage: "he-IL",
      author: personRef,
      creator: personRef,
      publisher: businessRef,
      image: { "@id": `${url}#primaryimage` },
      isPartOf: websiteRef,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      about: businessRef,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: article.title,
      description: article.excerpt,
      inLanguage: "he-IL",
      isPartOf: websiteRef,
      primaryImageOfPage: { "@id": `${url}#primaryimage` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(hasFaq ? { hasPart: { "@id": `${url}#faq` } } : {}),
    },
    imageRef,
    buildBreadcrumbList(`${url}#breadcrumb`, [
      { name: "מאמרים ומדריכים", path: "/articles" },
      { name: article.title, path: `/articles/${slug}` },
    ]),
  ];

  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      name: `שאלות ותשובות — ${article.title}`,
      inLanguage: "he-IL",
      isPartOf: websiteRef,
      about: businessRef,
      author: personRef,
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
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
