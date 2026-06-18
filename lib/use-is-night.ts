"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
} from "@/lib/night-service-store";

export function useIsNight(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
