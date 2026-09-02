/**
 * אימות מספרי טלפון ישראליים.
 *
 * מודול נפרד ונטול תלויות בכוונה: גם הטופס בצד הלקוח וגם ה-API בצד השרת
 * חייבים לאמת באותם כללים, ואסור שהטופס יגרור איתו את לקוח Supabase לבנדל.
 */

/**
 * מנרמל מספר ישראלי ל-E.164 (‎+9725...‎), או null אם המספר אינו תקין.
 *
 * מקבל את כל הצורות שאנשים באמת מקלידים: 050-123-4567, ‎+972 50 1234567,
 * 00972501234567, וגם קווי נייח ו-VoIP (077).
 */
export function normalizeIsraeliPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;

  // כל הצורות מצטמצמות לחלק המקומי ללא אפס מוביל וללא קידומת מדינה
  let local = digits;
  if (local.startsWith("00972")) local = local.slice(5);
  else if (local.startsWith("972")) local = local.slice(3);
  else if (local.startsWith("0")) local = local.slice(1);

  // נייד 5X + 7 ספרות | נייח 2/3/4/8/9 + 7 ספרות | VoIP 7X + 7 ספרות
  if (!/^(5\d{8}|[23489]\d{7}|7[2-9]\d{7})$/.test(local)) return null;

  return `+972${local}`;
}

/** true אם המספר ניתן לחיוג — עטיפה קריאה לשימוש בוולידציה של הטופס. */
export function isValidIsraeliPhone(raw: string): boolean {
  return normalizeIsraeliPhone(raw) !== null;
}
