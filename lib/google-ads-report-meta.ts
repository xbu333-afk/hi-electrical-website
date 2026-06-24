/** Metadata prepended to Google Ads investigation CSV exports. */
export interface GoogleAdsReportMeta {
  customerId: string;
  campaignName: string;
  adGroupName: string;
  deviceTargeting: string;
  geoTargeting: string;
}

/** Read from Vercel env — set GOOGLE_ADS_CUSTOMER_ID and GOOGLE_ADS_CAMPAIGN_NAME in project settings. */
export function getGoogleAdsReportMeta(): GoogleAdsReportMeta {
  return {
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID?.trim() ?? "",
    campaignName: process.env.GOOGLE_ADS_CAMPAIGN_NAME?.trim() ?? "",
    adGroupName: process.env.GOOGLE_ADS_ADGROUP_NAME?.trim() ?? "",
    deviceTargeting: "Mobile devices only",
    geoTargeting: "Israel (IL) only",
  };
}

/** English country names for Google CSV (no Hebrew). */
export const COUNTRY_NAMES_EN: Record<string, string> = {
  RU: "Russia",
  TR: "Turkey",
  US: "United States",
  JO: "Jordan",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  CN: "China",
  UA: "Ukraine",
  PL: "Poland",
  IN: "India",
  BR: "Brazil",
  IR: "Iran",
  SA: "Saudi Arabia",
  EG: "Egypt",
  SY: "Syria",
  LB: "Lebanon",
  PS: "Palestinian Territories",
  AE: "United Arab Emirates",
  NL: "Netherlands",
  IL: "Israel",
};

function fmtIsraelDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { timeZone: "Asia/Jerusalem" });
}

/** Comment lines placed above CSV headers — paste into Click Quality Form. */
export function buildGoogleCsvCoverLines(
  meta: GoogleAdsReportMeta,
  dateRangeLabel: string,
  rangeStart: Date,
  rangeEnd: Date
): string[] {
  const generated = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const lines = [
    "# Google Ads Invalid Traffic Investigation — Web Server Logs",
    `# Generated: ${generated} (Israel Time)`,
    `# Reporting Period: ${dateRangeLabel} (${fmtIsraelDate(rangeStart)} — ${fmtIsraelDate(rangeEnd)})`,
  ];

  if (meta.customerId) {
    lines.push(`# Google Ads Customer ID: ${meta.customerId}`);
  } else {
    lines.push(
      "# Google Ads Customer ID: (set GOOGLE_ADS_CUSTOMER_ID in Vercel env)"
    );
  }

  if (meta.campaignName) {
    lines.push(`# Campaign Name: ${meta.campaignName}`);
  } else {
    lines.push(
      "# Campaign Name: (set GOOGLE_ADS_CAMPAIGN_NAME in Vercel env)"
    );
  }

  if (meta.adGroupName) {
    lines.push(`# Ad Group Name: ${meta.adGroupName}`);
  }

  lines.push(`# Device Targeting: ${meta.deviceTargeting}`);
  lines.push(`# Geographic Targeting: ${meta.geoTargeting}`);
  lines.push(
    "# Instructions: Copy Customer ID and Reporting Period into the Click Quality Form. Attach this file as web server logs."
  );
  lines.push("");

  return lines;
}
