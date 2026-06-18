import { isNightServiceHours } from "@/lib/night-service";

type Listener = () => void;
const listeners = new Set<Listener>();
let currentValue = false;
let intervalId: ReturnType<typeof setInterval> | null = null;

export function getSnapshot(): boolean {
  return currentValue;
}

export function getServerSnapshot(): boolean {
  return false;
}

export function subscribe(listener: Listener): () => void {
  if (listeners.size === 0) {
    currentValue = isNightServiceHours();
    intervalId = setInterval(() => {
      const next = isNightServiceHours();
      if (next !== currentValue) {
        currentValue = next;
        listeners.forEach((l) => l());
      }
    }, 60_000);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}
