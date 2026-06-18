/** שעות שירות SOS לילה — 19:00–06:00, שעון ישראל */
export function isNightServiceHours(date = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jerusalem",
      hour: "numeric",
      hour12: false,
    }).format(date),
  );
  return hour >= 19 || hour < 6;
}
