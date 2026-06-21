export type PushoverPriority = -2 | -1 | 0 | 1 | 2;

interface PushoverParams {
  title: string;
  message: string;
  priority?: PushoverPriority;
  sound?: string;
  url?: string;
  url_title?: string;
}

export async function sendPushover(params: PushoverParams): Promise<void> {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER_KEY;

  if (!token || !user) {
    console.warn("[pushover] tokens missing — skipping notification");
    return;
  }

  const body: Record<string, string | number> = {
    token,
    user,
    title: params.title,
    message: params.message,
    priority: params.priority ?? 0,
  };

  if (params.sound) body.sound = params.sound;
  if (params.url) body.url = params.url;
  if (params.url_title) body.url_title = params.url_title;

  // Emergency priority (2) requires retry + expire
  if (params.priority === 2) {
    body.retry = 30;
    body.expire = 300;
  }

  try {
    const res = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[pushover] API error:", text);
    }
  } catch (err) {
    console.error("[pushover] fetch failed:", err);
  }
}

/** Build a Pushover notification for a new visitor. */
export function buildVisitorNotification(opts: {
  source: "mumooman" | "organic";
  pagePath: string;
  ip: string;
  visitorId: string;
  todayCount: number;
  isEmergencyPage: boolean;
}) {
  const { source, pagePath, ip, todayCount, isEmergencyPage } = opts;

  const isPaid = source === "mumooman";
  const isSuspect = todayCount > 2;

  // ── Emergency page ────────────────────────────────────────────────────────
  if (isEmergencyPage) {
    return {
      title: "🚨 דחוף — מבקר בעמוד חירום!",
      message: `📍 עמוד: ${pagePath}\n🌐 IP: ${ip}\n📣 מקור: ${isPaid ? "ממומן 💰" : "אורגני 🌿"}\n📊 כניסות היום: ${todayCount}`,
      priority: 1 as PushoverPriority,
      sound: "siren",
    };
  }

  // ── Competitor protection ─────────────────────────────────────────────────
  if (isSuspect) {
    return {
      title: "🕵️ חשד — מתחרה אפשרי?",
      message: `⚠️ IP זה כנס ${todayCount} פעמים היום!\n📍 עמוד: ${pagePath}\n🌐 IP: ${ip}\n📣 מקור: ${isPaid ? "ממומן 💰" : "אורגני 🌿"}`,
      priority: 1 as PushoverPriority,
      sound: "alien",
    };
  }

  // ── Paid traffic ──────────────────────────────────────────────────────────
  if (isPaid) {
    return {
      title: "💰 מבקר ממומן נכנס",
      message: `📍 עמוד: ${pagePath}\n🌐 IP: ${ip}\n📊 כניסות היום: ${todayCount}`,
      priority: 0 as PushoverPriority,
      sound: "cashregister",
    };
  }

  // ── Organic traffic ───────────────────────────────────────────────────────
  return {
    title: "🌿 מבקר אורגני נכנס",
    message: `📍 עמוד: ${pagePath}\n🌐 IP: ${ip}\n📊 כניסות היום: ${todayCount}`,
    priority: -1 as PushoverPriority,
    sound: "none",
  };
}
