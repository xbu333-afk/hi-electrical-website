import { initDataLayer, requestGtmLoad } from "@/lib/gtm-loader";

function ensureDataLayer(): unknown[] | null {
  if (typeof window === "undefined") return null;
  initDataLayer();
  return (window as Window & { dataLayer: unknown[] }).dataLayer;
}

export const sendGTMEvent = (
  eventName: string,
  eventData: Record<string, unknown> = {}
) => {
  const dataLayer = ensureDataLayer();
  if (!dataLayer) return;

  dataLayer.push({
    event: eventName,
    ...eventData,
  });
};

export const trackPhoneClick = (location: string, href?: string) => {
  requestGtmLoad();

  sendGTMEvent("phone_call_click", {
    conversion_type: "phone",
    click_location: location,
    link_url: href,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
};

export const trackWhatsAppClick = (location: string, href?: string) => {
  requestGtmLoad();

  sendGTMEvent("whatsapp_click", {
    conversion_type: "whatsapp",
    click_location: location,
    link_url: href,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
};
