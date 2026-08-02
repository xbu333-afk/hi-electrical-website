"use client";

import { useEffect, useState } from "react";

const HEBCAL_URL =
  "https://www.hebcal.com/shabbat?cfg=json&geonameid=293397&m=50";
const ISRAEL_TZ = "Asia/Jerusalem";

type HebcalItem = {
  category?: string;
  date?: string;
};

type HebcalResponse = {
  items?: HebcalItem[];
};

export type ShabbatCheckResult = {
  isShabbat: boolean;
  isLoading: boolean;
};

let sharedResult: boolean | null = null;
let sharedPromise: Promise<boolean> | null = null;

function getIsraelWeekday(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: ISRAEL_TZ,
    weekday: "short",
  }).format(date);
}

function isFridayOrSaturdayIsrael(date: Date): boolean {
  const weekday = getIsraelWeekday(date);
  return weekday === "Fri" || weekday === "Sat";
}

function getIsraelDateParts(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ISRAEL_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "0";

  let hour = Number(get("hour"));
  if (hour === 24) hour = 0;

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour,
    minute: Number(get("minute")),
  };
}

/** Converts a civil clock time in Asia/Jerusalem to a Date (UTC instant). */
function israelLocalToDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  let utcMs = Date.UTC(year, month - 1, day, hour - 3, minute);

  for (let i = 0; i < 3; i++) {
    const shown = getIsraelDateParts(new Date(utcMs));
    const shownAsUtc = Date.UTC(
      shown.year,
      shown.month - 1,
      shown.day,
      shown.hour,
      shown.minute
    );
    const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute);
    utcMs += targetAsUtc - shownAsUtc;
  }

  return new Date(utcMs);
}

function addCalendarDays(
  year: number,
  month: number,
  day: number,
  delta: number
): { year: number; month: number; day: number } {
  const base = new Date(Date.UTC(year, month - 1, day + delta));
  return {
    year: base.getUTCFullYear(),
    month: base.getUTCMonth() + 1,
    day: base.getUTCDate(),
  };
}

/** Fallback: Friday 16:00 → Saturday 20:00 (Israel time). */
function isInFallbackShabbatWindow(now: Date): boolean {
  const parts = getIsraelDateParts(now);
  const weekday = getIsraelWeekday(now);

  let friday = { year: parts.year, month: parts.month, day: parts.day };
  if (weekday === "Sat") {
    friday = addCalendarDays(parts.year, parts.month, parts.day, -1);
  } else if (weekday !== "Fri") {
    return false;
  }

  const saturday = addCalendarDays(friday.year, friday.month, friday.day, 1);
  const start = israelLocalToDate(friday.year, friday.month, friday.day, 16, 0);
  const end = israelLocalToDate(
    saturday.year,
    saturday.month,
    saturday.day,
    20,
    0
  );

  return now >= start && now < end;
}

function isBetweenCandlesAndHavdalah(
  now: Date,
  items: HebcalItem[] | undefined
): boolean {
  const candles = items?.find((item) => item.category === "candles");
  const havdalah = items?.find((item) => item.category === "havdalah");
  if (!candles?.date || !havdalah?.date) {
    throw new Error("Missing candles/havdalah times");
  }

  const start = new Date(candles.date);
  const end = new Date(havdalah.date);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Invalid candles/havdalah dates");
  }

  return now >= start && now < end;
}

async function resolveIsShabbat(): Promise<boolean> {
  if (sharedResult !== null) return sharedResult;
  if (sharedPromise) return sharedPromise;

  sharedPromise = (async () => {
    const now = new Date();

    if (!isFridayOrSaturdayIsrael(now)) {
      sharedResult = false;
      return false;
    }

    try {
      const res = await fetch(HEBCAL_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Hebcal HTTP ${res.status}`);
      const data = (await res.json()) as HebcalResponse;
      sharedResult = isBetweenCandlesAndHavdalah(now, data.items);
      return sharedResult;
    } catch {
      sharedResult = isInFallbackShabbatWindow(now);
      return sharedResult;
    }
  })();

  try {
    return await sharedPromise;
  } finally {
    sharedPromise = null;
  }
}

/**
 * Client-only Shabbat window check (Petah Tikva / center via Hebcal).
 * Fetch runs in useEffect to avoid Vercel edge/page-cache staleness.
 */
export function useShabbatCheck(): ShabbatCheckResult {
  // TODO: DESIGN PREVIEW ONLY — remove this forced return and restore the real
  // Hebcal/fallback time logic below immediately after Shabbat UI design is approved.
  return { isShabbat: true, isLoading: false };

  const [isShabbat, setIsShabbat] = useState(false);
  const [isLoading, setIsLoading] = useState(() => sharedResult === null);

  useEffect(() => {
    let cancelled = false;

    if (sharedResult !== null) {
      setIsShabbat(sharedResult);
      setIsLoading(false);
      return;
    }

    void resolveIsShabbat().then((active) => {
      if (!cancelled) {
        setIsShabbat(active);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { isShabbat, isLoading };
}
