/**
 * נתוני SEO מקומיים לעמודי ערים — שכונות ותרחישי חשמל נפוצים.
 * משמש רק את LocalSeoContent בתחתית העמוד (append-only).
 */

export const ELECTRICAL_SCENARIOS = [
  "בדיקת ותיקון הארקה במבנים ישנים",
  "שדרוג ללוח תלת-פאזי",
  "איתור קצרים מורכבים",
  "החלפת לוח חשמל ותיקון מפסקים",
  "תיקון גופי תאורה והחלפת שקעים בבטיחות",
] as const;

export type ElectricalScenario = (typeof ELECTRICAL_SCENARIOS)[number];

/** 3–4 שכונות / אזורים מוכרים לכל יישוב בשירות. */
export const CITY_NEIGHBORHOODS: Readonly<Record<string, readonly string[]>> = {
  "petah-tikva": ["אם המושבות", "נווה עוז", "כפר גנים", "קריית מטלון"],
  "ramat-gan": ["בורוכוב", "יהלום", "קריית קריניצי", "תל בנימין"],
  givatayim: ["בורוכוב", "פועלי הרכבת", "גבעת רמב״ם", "שכונת הכורדנים"],
  shoham: ["שכונת הגבורה", "לוטם", "מרכז שוהם", "הרים"],
  herzliya: ["הרצליה פיתוח", "נווה עמל", "יד התשעה", "גליל ים"],
  "kfar-saba": ["אליעזר", "יוספטל", "קפלן", "עלייה"],
  raanana: ["לב הפארק", "נווה זמר", "רמז", "ויצמן"],
  "ramat-hasharon": ["נווה מגן", "מורשה", "קריית שאול", "אלון"],
  "hod-hasharon": ["מגדיאל", "רמתיים", "נווה נאמן", "הדר"],
  nahalim: ["מרכז המושב", "הרחבה", "אזור התעסוקה"],
  magshimim: ["מרכז המושב", "הרחבה צפונית", "שכונת הוותיקים"],
  "givat-hashlosha": ["מרכז הקיבוץ", "שכונת המשפחות", "אזור התעשייה"],
  "givat-shmuel": ["רמת אילן", "שכון ותיקים", "נווה סמדר", "גני הדר"],
  "kfar-sirkin": ["מרכז המושב", "הרחבה", "שכונת הצעירים"],
  mazor: ["מרכז המושב", "הרחבה מערבית", "שכונת הוותיקים"],
  rinatia: ["מרכז המושב", "הרחבה", "שכונת המשפחות"],
  "beerot-yitzhak": ["מרכז הקיבוץ", "שכונת המשפחות", "אזור החקלאות"],
  "ganei-tikva": ["גני הדר", "שכונת הגפן", "מרכז היישוב", "נווה גן"],
  savyon: ["מרכז סביון", "רמות סביון", "גני יהודה"],
  "neve-yamin": ["מרכז המושב", "הרחבה", "שכונת הוותיקים"],
  elishama: ["מרכז המושב", "הרחבה", "שכונת הצעירים"],
  "neve-yarak": ["מרכז המושב", "הרחבה", "שכונת המשפחות"],
  adanim: ["מרכז המושב", "הרחבה", "שכונת הוותיקים"],
  nirit: ["מרכז היישוב", "שכונת הגבעה", "הרחבה"],
  matan: ["מרכז היישוב", "שכונת הצפונית", "הרחבה"],
  hemed: ["מרכז המושב", "הרחבה", "שכונת המשפחות"],
  "rosh-haayin": ["פסגות אפק", "נווה אפק", "גבעת הסלע", "מגדל הצעירים"],
  elad: ["שכונה א׳", "שכונה ב׳", "שכונה ג׳", "מרכז העיר"],
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** שני תרחישים קבועים לעיר — אותו slug תמיד מחזיר אותה זוג. */
export function scenariosForCity(slug: string): [string, string] {
  const n = ELECTRICAL_SCENARIOS.length;
  const h = hashSlug(slug);
  const first = h % n;
  const second = (first + 1 + (h % (n - 1))) % n;
  return [ELECTRICAL_SCENARIOS[first], ELECTRICAL_SCENARIOS[second]];
}

export function neighborhoodsForCity(slug: string): readonly string[] {
  return CITY_NEIGHBORHOODS[slug] ?? [];
}
