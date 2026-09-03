/**
 * מקור נתונים יחיד לתצוגת אזורי שירות בעמודי ערים.
 * שלב 1: רק 3 ערים עם areas מאומתים; כל השאר — whole-city.
 * CITY_NEIGHBORHOODS / city-content NEIGHBORHOODS נשארים זמנית ולא נמחקים.
 */

import { serviceAreas } from "@/lib/cities";

export type CityCoverageMode = "areas" | "whole-city";

export type CityLocalData = {
  coverageMode: CityCoverageMode;
  areas?: readonly string[];
};

/** רק ערים עם רשימת אזורים מאומתת להצגה. */
const CITIES_WITH_AREAS: Readonly<Record<string, readonly string[]>> = {
  "petah-tikva": [
    "אם המושבות",
    "כפר גנים",
    "קריית מטלון",
    "הדר גנים",
    "נווה גן",
    "רמת ורבר",
    "שיפר",
    "נווה עוז",
    "שעריה",
  ],
  "ramat-gan": [
    "קריית בורוכוב",
    "יהלום",
    "קריית קריניצי",
    "תל בנימין",
  ],
  herzliya: [
    "הרצליה פיתוח",
    "נווה עמל",
    "יד התשעה",
    "גליל ים",
  ],
};

function buildCityLocalDataMap(): Readonly<Record<string, CityLocalData>> {
  const map: Record<string, CityLocalData> = {};

  for (const { slug } of serviceAreas) {
    const areas = CITIES_WITH_AREAS[slug];
    if (areas && areas.length > 0) {
      map[slug] = { coverageMode: "areas", areas };
    } else {
      map[slug] = { coverageMode: "whole-city" };
    }
  }

  return map;
}

export const CITY_LOCAL_DATA: Readonly<Record<string, CityLocalData>> =
  buildCityLocalDataMap();

const WHOLE_CITY_FALLBACK: CityLocalData = { coverageMode: "whole-city" };

/** מחזיר נתוני כיסוי מקומי לפי slug עיר. ברירת מחדל: whole-city. */
export function getCityLocalData(slug: string): CityLocalData {
  return CITY_LOCAL_DATA[slug] ?? WHOLE_CITY_FALLBACK;
}

/** רשימת אזורים בעברית טבעית: "א, ב וג". */
export function formatCityAreasPhrase(areas: readonly string[]): string {
  if (areas.length === 0) return "";
  if (areas.length === 1) return areas[0] ?? "";
  return areas.slice(0, -1).join(", ") + " ו" + areas[areas.length - 1];
}

/**
 * האם מותר להציג רשימת areas מאומתת לעיר זו.
 */
export function hasCityAreasCoverage(slug: string): boolean {
  const data = getCityLocalData(slug);
  return (
    data.coverageMode === "areas" &&
    Array.isArray(data.areas) &&
    data.areas.length > 0
  );
}

/**
 * טקסט כיסוי גאוגרפי להצגה:
 * - areas → רשימה מאומתת בלבד
 * - whole-city → "שירות בכל {שם} והסביבה"
 */
export function getCityCoverageText(slug: string, cityName: string): string {
  const data = getCityLocalData(slug);
  if (
    data.coverageMode === "areas" &&
    data.areas &&
    data.areas.length > 0
  ) {
    return formatCityAreasPhrase(data.areas);
  }
  return `שירות בכל ${cityName} והסביבה`;
}
