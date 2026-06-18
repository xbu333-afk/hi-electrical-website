export type UiLocale = "he" | "ru";

type ServiceItem = { id: string; label: string };

type UiLabels = {
  call: string;
  callAria: (phone: string) => string;
  whatsappAria: string;
  ourServices: string;
  ourServicesInCity: (city: string) => string;
  services: ServiceItem[];
  nightSos: string;
  nightSosAria: string;
  floatingCallAria: string;
  floatingNightRegion: string;
  contactSos: string;
  contactWhatsapp: string;
  contactServiceAreas: string;
  contactArticles: string;
  heroBrandPrimary: string;
  heroBrandSecondary: string;
  heroHangingSign: string;
  heroHangingSignAria: string;
  cityTaglinePrefix: string;
  cityTaglineSuffix: string;
};

export const UI_LABELS: Record<UiLocale, UiLabels> = {
  he: {
    call: "שיחה",
    callAria: (phone) => `התקשר ליצירת קשר: ${phone}`,
    whatsappAria: "שלח הודעת WhatsApp",
    ourServices: "השירותים שלנו:",
    ourServicesInCity: (city) => `השירותים שלנו ב${city}:`,
    services: [
      { id: "faults", label: "איתור ותיקון קצרים" },
      { id: "panels", label: "החלפת לוחות חשמל" },
      { id: "lighting", label: "התקנת גופי תאורה" },
      { id: "smart", label: "בתים חכמים" },
      { id: "planning", label: "תכנון פרויקטים" },
    ],
    nightSos: "שירות SOS לילה",
    nightSosAria: "שירות SOS לילה — חיוג חירום",
    floatingCallAria: "חיוג מהיר לחשמלאי",
    floatingNightRegion: "שירות SOS לילה",
    contactSos: "חיוג מהיר SOS",
    contactWhatsapp: "WhatsApp",
    contactServiceAreas: "אזורי שירות ←",
    contactArticles: "מאמרים ←",
    heroBrandPrimary: "ח.י",
    heroBrandSecondary: "שרותי חשמל",
    heroHangingSign: "יצאת צדיק",
    heroHangingSignAria: "יצאת צדיק",
    cityTaglinePrefix: "חשמלאי מוסמך",
    cityTaglineSuffix: "— זמין 24 שעות",
  },
  ru: {
    call: "Звонок",
    callAria: (phone) => `Позвонить: ${phone}`,
    whatsappAria: "Написать в WhatsApp",
    ourServices: "Наши услуги:",
    ourServicesInCity: (city) => `Наши услуги в ${city}:`,
    services: [
      { id: "faults", label: "Поиск и устранение коротких замыканий" },
      { id: "panels", label: "Замена электрощитов" },
      { id: "lighting", label: "Установка светильников" },
      { id: "smart", label: "Умный дом" },
      { id: "planning", label: "Проектирование электросистем" },
    ],
    nightSos: "Ночной SOS-сервис",
    nightSosAria: "Ночной SOS-сервис — экстренный вызов",
    floatingCallAria: "Быстрый звонок электрику",
    floatingNightRegion: "Ночной SOS-сервис",
    contactSos: "Экстренный звонок SOS",
    contactWhatsapp: "WhatsApp",
    contactServiceAreas: "Районы обслуживания ←",
    contactArticles: "Статьи ←",
    heroBrandPrimary: "Х.И.",
    heroBrandSecondary: "Электросервис",
    heroHangingSign: "Ицат Цадик",
    heroHangingSignAria: "Ицат Цадик",
    cityTaglinePrefix: "Сертифицированный электрик",
    cityTaglineSuffix: "— доступен 24 часа",
  },
};

export function getUiLabels(locale: UiLocale = "he"): UiLabels {
  return UI_LABELS[locale];
}
