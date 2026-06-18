export type CityServiceItem = {
  title: string;
  description: string;
};

export type CityContent = {
  name: string;
  neighborhoods: string;
  intro: string[];
  about: string[];
  services: CityServiceItem[];
  highlightAreas: string;
};

const DEFAULT_SERVICES: CityServiceItem[] = [
  {
    title: "תיקון קצר בדוד",
    description: "תיקון מהיר, אמין ובטיחותי לקצרים בדוד חשמל – שירות עם אחריות מלאה.",
  },
  {
    title: "התקנת מערכות בית חכם",
    description: "התקנה של מערכות חשמל חכם לבית ולעסק – כולל שליטה חכמה ונוחות מרבית.",
  },
  {
    title: "שדרוג לוחות חשמל",
    description: "התקנת לוחות חדישים עם מערכות הגנה מתקדמות בהתאם לתקני הבטיחות.",
  },
  {
    title: "התקנת גופי תאורה",
    description: "התקנת תאורה לבית, למשרד או לעסק – גופי תאורה לד, ספוטים, נברשות ועוד.",
  },
  {
    title: "איתור ותיקון קצרים",
    description: "זיהוי תקלות מקצועי עם ציוד מתקדם, ללא הרס מיותר.",
  },
];

/** שכונות ייחודיות — ניתן להרחיב לכל עיר */
const NEIGHBORHOODS: Record<string, string> = {
  "petah-tikva":
    "תושבי שכונות אם המושבות, כפר גנים, קריית מטלון, הדר גנים, נווה גן, רמת ורבר, שיפר, נווה עוז, שעריה ועוד",
  raanana:
    "תושבי נווה זמר, הרצל, שיכון, אחוזה, לב הפארק, נאות שוויצריה, אלון יבנה, מרכז העיר ועוד",
};

function neighborhoodsFor(slug: string, name: string): string {
  return NEIGHBORHOODS[slug] ?? `תושבי ${name} והסביבה`;
}

export function getCityContent(slug: string, name: string): CityContent {
  const neighborhoods = neighborhoodsFor(slug, name);

  return {
    name,
    neighborhoods,
    intro: [
      `ברוכים הבאים לח.י שירותי חשמל – חשמלאי מוסמך ב${name} עם ניסיון של למעלה מעשור. אנו נותנים מענה מקצועי, מהיר ואמין ל${neighborhoods}.`,
      `השירותים שלנו כוללים: מענה בשעות חירום לפי היכולת והזמינות (לא כולל שבתות וחגים), תיקון קצרים, התקנת גופי תאורה, לוחות חשמל, בית חכם ועוד – עם אחריות מלאה ובמחירים הוגנים.`,
    ],
    about: [
      `ח.י שירותי חשמל הוא עסק מוביל המתמחה במתן פתרונות חשמל מקצועיים, אמינים ובטיחותיים לתושבים ולבעלי עסקים ב${name} והאזור.`,
      `אנו גאים להיות חלק מהתוכנית "יצאת צדיק" עם חיים אתגר – בזכות השירות האיכותי שלנו, המחירים ההוגנים והאמינות המקצועית שלנו.`,
      `אנחנו זמינים ללקוחותינו גם בשעות חירום (למעט שבתות וחגים), ומספקים שירות אמין, מהיר ומקצועי, על ידי חשמלאים מוסמכים בלבד.`,
    ],
    services: DEFAULT_SERVICES,
    highlightAreas: `שירות מקצועי ב${name} – ${neighborhoods} | חשמלאי מוסמך | מומלץ ביצאת צדיק | מענה בחירום לפי זמינות | שקיפות מלאה | אחריות על העבודה`,
  };
}
