/** Brief device/OS/browser label for Pushover fraud alerts. */
export function summarizeUserAgent(ua: string | null | undefined): string {
  if (!ua) return "לא ידוע";

  let browser = "דפדפן לא מזוהה";
  if (/Edg\/\d+/.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\/\d+/.test(ua)) browser = "Chrome";
  else if (/Firefox\/\d+/.test(ua)) browser = "Firefox";
  else if (/Safari\/\d+/.test(ua)) browser = "Safari";

  let os = "OS לא מזוהה";
  if (/Android/.test(ua)) os = "Android";
  else if (/iPhone/.test(ua)) os = "iPhone";
  else if (/iPad/.test(ua)) os = "iPad";
  else if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua)) os = "Linux";

  const form = /Mobile|Android|iPhone|iPod|IEMobile/i.test(ua)
    ? "נייד"
    : "מחשב";

  return `${form} · ${os} · ${browser}`;
}
