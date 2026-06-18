export type PressSlide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  href?: string;
};

export const PRESS_SLIDES: readonly PressSlide[] = [
  {
    id: "magazine-yatza-tzadik",
    src: "/images/press/magazine-yatza-tzadik.png",
    alt: 'כתבה במגזין על ח.י שירותי חשמל ויהודה חכמוב, הנדסאי חשמל וחשמלאי יצאת צדיק — מקצועיות, אמינות ושירות אישי',
    caption: "כתבה במגזין: הכירו את ח.י שירותי חשמל",
  },
  {
    id: "rcd-guide",
    src: "/images/press/rcd-guide.png",
    alt: "מדריך ממסר הפחת מאת יהודה חכמוב הנדסאי חשמל — כפתור קטן שמציל חיים, בדיקה חודשית וחשמלאי מוסמך",
    caption: "מדריך ממסר הפחת: בטיחות בלוח החשמל",
    href: "/articles/mimsar-pahat",
  },
  {
    id: "weekly-column",
    src: "/images/press/weekly-column.png",
    alt: "הטור השבועי של יהודה חכמוב — חשמל לא משחק ילדים, טיפים לשימוש נכון במפצלים וזוללי חשמל",
    caption: "הטור השבועי: טעויות נפוצות בבית",
  },
  {
    id: "social-media",
    src: "/images/press/social-media.png",
    alt: "מה ברשת: יהודה חכמוב מח.י שירותי חשמל בטיקטוק ובתוכנית יצאת צדיק — חשמלאי מומלץ ושקוף",
    caption: "מה ברשת: יצאת צדיק וטיקטוק",
  },
];
