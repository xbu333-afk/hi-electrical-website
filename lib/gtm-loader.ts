type GtmLoadListener = () => void;

/** טעינה שקטה אחרי חלון בטוח ל-LCP (PageSpeed) */
export const GTM_AUTO_LOAD_MS = 2000;

let loadRequested = false;
const listeners = new Set<GtmLoadListener>();

export function initDataLayer(): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
}

export function isGtmLoadRequested(): boolean {
  return loadRequested;
}

/** מבקש טעינת GTM פעם אחת בלבד — אידמפוטנטי */
export function requestGtmLoad(): void {
  if (typeof window === "undefined") return;
  initDataLayer();
  if (loadRequested) return;
  loadRequested = true;
  listeners.forEach((listener) => listener());
}

export function onGtmLoadRequested(listener: GtmLoadListener): () => void {
  listeners.add(listener);
  if (loadRequested) listener();
  return () => listeners.delete(listener);
}
