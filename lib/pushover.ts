import { formatPageLabel } from "./page-labels";
import type { VisitorHistory } from "./visitor-logs";
import { summarizeUserAgent } from "./user-agent";
import {
  formatAdsNetwork,
  formatMatchType,
} from "./valuetrack";

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

export type VisitorDevice = "mobile" | "desktop";

function lines(...parts: (string | null | undefined)[]): string {
  return parts.filter(Boolean).join("\n") as string;
}

/** Shared body lines for enter notifications (paid, organic, emergency, suspicious). */
export function buildMessageLines(opts: {
  pagePath: string;
  source: "mumooman" | "organic";
  ip: string;
  history: VisitorHistory;
  device: VisitorDevice;
  city?: string | null;
  gclid?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
  keyword?: string | null;
  network?: string | null;
  match_type?: string | null;
  extraLines?: (string | null | undefined)[];
}): string {
  const pageLabel = formatPageLabel(opts.pagePath);
  const sourceLabel =
    opts.source === "mumooman" ? "ממומן (גוגל אדס)" : "אורגני";
  const deviceLine =
    opts.device === "mobile" ? "📱 מכשיר: נייד" : "💻 מכשיר: מחשב";
  const cityLine = opts.city ? `📍 עיר (משוערת): ${opts.city}` : null;
  const keywordLine = opts.keyword?.trim()
    ? `🎯 חיפש: ${opts.keyword} | רשת: ${formatAdsNetwork(opts.network ?? null)} | התאמה: ${formatMatchType(opts.match_type ?? null)}`
    : null;
  const historyLine =
    `📊 היסטוריית מבקר: היום: ${opts.history.today_count} | ` +
    `השבוע: ${opts.history.week_count} | ` +
    `סה"כ: ${opts.history.total_count}`;
  const gclidLine = opts.gclid ? `🎟️ מזהה גוגל (GCLID): ${opts.gclid}` : null;
  const uaLine = opts.gclid
    ? `🧭 מכשיר/דפדפן: ${summarizeUserAgent(opts.userAgent)}`
    : null;
  const referrerLine = opts.gclid
    ? `🔗 Referrer: ${opts.referrer?.trim() || "(ישיר / ללא referrer)"}`
    : null;

  return lines(
    `עמוד: ${pageLabel}`,
    `מקור: ${sourceLabel}`,
    keywordLine,
    `🌐 IP: ${opts.ip}`,
    deviceLine,
    cityLine,
    historyLine,
    gclidLine,
    uaLine,
    referrerLine,
    ...(opts.extraLines ?? [])
  );
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
  history: VisitorHistory;
  device: VisitorDevice;
  city?: string | null;
  gclid?: string | null;
  isEmergencyPage: boolean;
  userAgent?: string | null;
  referrer?: string | null;
  keyword?: string | null;
  network?: string | null;
  match_type?: string | null;
}) {
  const {
    source,
    pagePath,
    ip,
    history,
    device,
    city,
    gclid,
    isEmergencyPage,
    userAgent,
    referrer,
    keyword,
    network,
    match_type,
  } = opts;
  const isPaid = source === "mumooman";
  const isSuspect = history.today_count > 2;

  const base = {
    pagePath,
    source,
    ip,
    history,
    device,
    city,
    gclid,
    userAgent,
    referrer,
    keyword,
    network,
    match_type,
  };

  if (isEmergencyPage) {
    return {
      title: "🚨 דחוף — עמוד חירום!",
      message: buildMessageLines({
        ...base,
        extraLines: ["⚠️ דורש תשומת לב מיידית"],
      }),
      priority: 1 as PushoverPriority,
      sound: "siren",
    };
  }

  if (isSuspect) {
    return {
      title: "🛡️ חשוד — יותר מ-2 כניסות היום",
      message: buildMessageLines({
        ...base,
        extraLines: [
          `🕵️ אותו מבקר כנס ${history.today_count} פעמים היום`,
        ],
      }),
      priority: 1 as PushoverPriority,
      sound: "alien",
    };
  }

  if (isPaid) {
    return {
      title: "💰 קליק ממומן חדש!",
      message: buildMessageLines(base),
      priority: 0 as PushoverPriority,
      sound: "cashregister",
    };
  }

  return {
    title: "🟢 כניסה אורגנית",
    message: buildMessageLines(base),
    priority: 0 as PushoverPriority,
    sound: "bike",
  };
}
