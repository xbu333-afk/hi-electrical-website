import { formatPageLabel } from "./page-labels";

export type PushoverPriority = -2 | -1 | 0 | 1 | 2;

interface PushoverParams {
  title: string;
  message: string;
  priority?: PushoverPriority;
  sound?: string;
}

export async function sendPushover(params: PushoverParams): Promise<void> {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER_KEY;

  if (!token || !user) {
    console.warn("[pushover] tokens missing — skipping");
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

  // Emergency priority requires retry + expire
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
    if (!res.ok) console.error("[pushover] API error:", await res.text());
  } catch (err) {
    console.error("[pushover] fetch failed:", err);
  }
}

// ── Notification builders ────────────────────────────────────────────────────

function lines(...parts: (string | null | undefined)[]): string {
  return parts.filter(Boolean).join("\n") as string;
}

/** Sent immediately when a visitor clicks tel: or WhatsApp. */
export function buildClickNotification(opts: {
  pagePath: string;
  ip: string;
  source: "mumooman" | "organic";
}) {
  return {
    title: "📞 הלקוח יצר קשר!",
    message: lines(
      `עמוד: ${formatPageLabel(opts.pagePath)}`,
      `מקור: ${opts.source === "mumooman" ? "ממומן (גוגל אדס)" : "אורגני"}`,
      `IP: ${opts.ip}`
    ),
    priority: 1 as PushoverPriority,
    sound: "incoming",
  };
}

/** Sent on page enter. */
export function buildVisitorNotification(opts: {
  source: "mumooman" | "organic";
  pagePath: string;
  ip: string;
  todayCount: number;
  isEmergencyPage: boolean;
}) {
  const { source, pagePath, ip, todayCount, isEmergencyPage } = opts;
  const isPaid = source === "mumooman";
  const isSuspect = todayCount > 2;
  const pageLabel = formatPageLabel(pagePath);
  const sourceLabel = isPaid ? "ממומן (גוגל אדס)" : "אורגני";
  const countLine = todayCount > 1 ? `כניסות היום מאותו IP: ${todayCount}` : null;

  if (isEmergencyPage) {
    return {
      title: "🚨 דחוף — עמוד חירום!",
      message: lines(
        `עמוד: ${pageLabel}`,
        `מקור: ${sourceLabel}`,
        `IP: ${ip}`,
        "⚠️ דורש תשומת לב מיידית",
        countLine
      ),
      priority: 1 as PushoverPriority,
      sound: "siren",
    };
  }

  if (isSuspect) {
    return {
      title: "🛡️ חשוד — יותר מ-2 כניסות היום",
      message: lines(
        `עמוד: ${pageLabel}`,
        `מקור: ${sourceLabel}`,
        `IP: ${ip}`,
        `🕵️ אותו IP כנס ${todayCount} פעמים היום`,
      ),
      priority: 1 as PushoverPriority,
      sound: "alien",
    };
  }

  if (isPaid) {
    return {
      title: "🔴 קליק ממומן חדש!",
      message: lines(
        `עמוד: ${pageLabel}`,
        `מקור: ${sourceLabel}`,
        `IP: ${ip}`,
        countLine
      ),
      priority: 0 as PushoverPriority,
      sound: "cashregister",
    };
  }

  return {
    title: "🟢 כניסה אורגנית",
    message: lines(
      `עמוד: ${pageLabel}`,
      `מקור: ${sourceLabel}`,
      `IP: ${ip}`,
      countLine
    ),
    priority: -1 as PushoverPriority,
    sound: "none",
  };
}
