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

const MOBILE_UA =
  /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i;

/** Icon + label for dashboard device column (uses stored device or infers from UA). */
export function getDeviceIcon(
  device: string | null | undefined,
  userAgent?: string | null
): { icon: string; label: string } {
  if (device === "mobile") return { icon: "📱", label: "נייד" };
  if (device === "desktop") return { icon: "💻", label: "מחשב" };
  if (userAgent) {
    return MOBILE_UA.test(userAgent)
      ? { icon: "📱", label: "נייד" }
      : { icon: "💻", label: "מחשב" };
  }
  return { icon: "—", label: "" };
}

/**
 * Human-readable device display for the dashboard table.
 * Returns icon + readable text like "📱 iPhone · Safari" or "💻 Windows · Chrome".
 * The full raw user_agent string should still be shown as a tooltip (title attr).
 */
export function getDeviceDisplay(
  device: string | null | undefined,
  userAgent: string | null | undefined
): { icon: string; text: string } {
  const { icon } = getDeviceIcon(device, userAgent);
  if (!userAgent) {
    if (device === "mobile") return { icon: "📱", text: "נייד" };
    if (device === "desktop") return { icon: "💻", text: "מחשב" };
    return { icon: "—", text: "" };
  }
  // summarizeUserAgent returns "נייד · iPhone · Safari" — drop the first Hebrew form word
  // since the icon already conveys mobile vs desktop.
  const full = summarizeUserAgent(userAgent);
  const parts = full.split(" · ");
  const detail = parts.length > 1 ? parts.slice(1).join(" · ") : full;
  return { icon, text: detail };
}
