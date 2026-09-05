import {
  getCityLocalData,
  getCityCoverageText,
  hasCityAreasCoverage,
} from "@/lib/city-local-data";

export type CityContent = {
  name: string;
  neighborhoods: string;
  intro: string[];
  about: string[];
  highlightAreas: string;
  areas?: readonly string[];
};

/**
 * שכונות ייחודיות — נשמר זמנית עד שלב ניקוי נפרד.
 * התצוגה בעמודי ערים עוברת דרך city-local-data בלבד.
 */
const NEIGHBORHOODS: Record<string, string> = {
  "petah-tikva":
    "תושבי שכונות אם המושבות, כפר גנים, קריית מטלון, הדר גנים, נווה גן, רמת ורבר, שיפר, נווה עוז, שעריה ועוד",
  raanana:
    "תושבי נווה זמר, הרצל, שיכון, אחוזה, לב הפארק, נאות שוויצריה, אלון יבנה, מרכז העיר ועוד",
  givatayim:
    "תושבי שיכון ותיק, שיכון בורוכוב, גבעת הרמות, רמת יצחק, גן וורת, ארלוזורוב, מרכז העיר ועוד",
  shoham:
    "תושבי שכונות חדשות, שכונת הגבורה, לוטם, מרכז שוהם, הרים ועוד",
};

function neighborhoodsFor(slug: string, name: string): string {
  return NEIGHBORHOODS[slug] ?? `תושבי ${name} והסביבה`;
}

/** שמירת ה-API הישן זמנית — לא בשימוש בתצוגה. */
export const LEGACY_CITY_NEIGHBORHOOD_STRINGS = NEIGHBORHOODS;
export const legacyNeighborhoodsFor = neighborhoodsFor;

export function getCityContent(slug: string, name: string): CityContent {
  const coverageText = getCityCoverageText(slug, name);
  const useAreas = hasCityAreasCoverage(slug);
  const areas = getCityLocalData(slug).areas;

  // שדה neighborhoods נגזר מהמקור החדש בלבד (לא מ-NEIGHBORHOODS הישן).
  const neighborhoods = useAreas
    ? `תושבי ${coverageText}`
    : coverageText;

  return {
    name,
    neighborhoods,
    areas: useAreas ? areas : undefined,
    intro: [
      `ברוכים הבאים לח.י שירותי חשמל – חשמלאי מוסמך ב${name} עם ניסיון של למעלה מעשור. אנו נותנים מענה מקצועי, מהיר ואמין. שירות בכל ${name} והסביבה.`,
      `השירותים שלנו כוללים: מענה בשעות חירום לפי היכולת והזמינות (לא כולל שבתות וחגים), תיקון קצרים, התקנת גופי תאורה, לוחות חשמל, בית חכם ועוד – עם ביצוע מקצועי ובמחירים הוגנים.`,
    ],
    about: [
      `ח.י שירותי חשמל הוא עסק מוביל המתמחה במתן פתרונות חשמל מקצועיים, אמינים ובטיחותיים לתושבים ולבעלי עסקים ב${name} והאזור. עבודות החשמל מבוצעות על ידי יהודה חכמוב, הנדסאי חשמל ובעל רישיון חשמלאי ראשי.`,
      `אנו גאים להיות חלק מהתוכנית "יצאת צדיק" עם חיים אתגר – בזכות השירות האיכותי שלנו, המחירים ההוגנים והאמינות המקצועית שלנו.`,
      `אנחנו זמינים ללקוחותינו גם בשעות חירום (למעט שבתות וחגים), ומספקים שירות אמין, מהיר ומקצועי, על ידי חשמלאים מוסמכים בלבד.`,
    ],
    highlightAreas: `שירות מקצועי ב${name} | חשמלאי מוסמך | מומלץ ביצאת צדיק | מענה בחירום לפי זמינות | שקיפות מלאה | אחריות על העבודה`,
  };
}
