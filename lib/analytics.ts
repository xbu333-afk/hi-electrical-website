export const sendGTMEvent = (
  eventName: string,
  eventData: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && (window as Window & { dataLayer?: unknown[] }).dataLayer) {
    (window as Window & { dataLayer: unknown[] }).dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

export const trackPhoneClick = (location: string, href?: string) => {
  sendGTMEvent("phone_call_click", {
    conversion_type: "phone",
    click_location: location,
    link_url: href,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
};

export const trackWhatsAppClick = (location: string, href?: string) => {
  sendGTMEvent("whatsapp_click", {
    conversion_type: "whatsapp",
    click_location: location,
    link_url: href,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
};
