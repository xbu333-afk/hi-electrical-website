"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";

const TARIFF = 0.5425;

const DEFAULT_DEVICES = [
  { id: "washer", label: 'מכונת כביסה (1.5 קוט"ש)', value: "1.5" },
  { id: "fridge", label: "מקרר קטן (40W)", value: "0.04" },
  { id: "boiler", label: 'דוד חשמל (1.5 קוט"ש)', value: "1.5" },
  { id: "heater", label: "מפזר חום (2000W)", value: "2.0" },
  { id: "toaster", label: "טוסטר (800W)", value: "0.8" },
  { id: "oven", label: "תנור אפייה (2000W)", value: "2.0" },
  { id: "ac-1hp", label: 'מזגן 1 כוח סוס (0.75 קוט"ש)', value: "0.75" },
  { id: "ac-1_5hp", label: 'מזגן 1.5 כוח סוס (1.1 קוט"ש)', value: "1.1" },
  { id: "ac-3hp", label: 'מזגן 3 כוח סוס (2.25 קוט"ש)', value: "2.25" },
  { id: "custom", label: "אחר (הזנה ידנית)", value: "custom" },
] as const;

export default function DeviceCalculator() {
  const [device, setDevice] = useState("washer");
  const [unit, setUnit] = useState<"kw" | "w">("kw");
  const [consumption, setConsumption] = useState("1.5");
  const [hours, setHours] = useState("1");
  const [days, setDays] = useState("1");
  const [calcMode, setCalcMode] = useState<"hour" | "minute" | "month">("hour");
  const [result, setResult] = useState("");

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setDevice(id);
    const selected = DEFAULT_DEVICES.find((d) => d.id === id);
    if (selected && selected.id !== "custom") {
      setConsumption(selected.value);
      setUnit("kw");
    } else {
      setConsumption("");
    }
  };

  useEffect(() => {
    const consVal = parseFloat(consumption);
    const hrsVal = parseFloat(hours);
    const daysVal = parseFloat(days);

    if (isNaN(consVal) || consVal <= 0) {
      setResult("אנא הזינו את צריכת המכשיר כדי לראות את העלות.");
      return;
    }

    const consumptionKW = unit === "w" ? consVal / 1000 : consVal;
    let cost = 0;
    let message = "";

    if (calcMode === "hour") {
      cost = consumptionKW * TARIFF;
      message = `עלות משוערת לשעה: ₪${cost.toFixed(2)}`;
    } else if (calcMode === "minute") {
      cost = (consumptionKW * TARIFF) / 60;
      message = `עלות משוערת לדקה: ₪${cost.toFixed(3)}`;
    } else if (calcMode === "month") {
      if (isNaN(hrsVal) || isNaN(daysVal)) {
        setResult("אנא מלאו את שעות וימי השימוש לחישוב חודשי.");
        return;
      }
      const monthlyConsumption = consumptionKW * hrsVal * daysVal * 4;
      cost = monthlyConsumption * TARIFF;
      message = `צריכה חודשית: ${monthlyConsumption.toFixed(2)} קוט"ש | עלות: ₪${cost.toFixed(2)}`;
    }

    setResult(message);
  }, [consumption, unit, hours, days, calcMode]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 md:p-10 border-b border-gray-100">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          aria-label="טופס חישוב צריכת חשמל"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-emerald-100 pb-2 inline-block">
              פרטי המכשיר
            </h2>

            <div>
              <label htmlFor="deviceSelect" className="block text-sm font-bold text-slate-700 mb-2">
                בחרו מכשיר:
              </label>
              <select
                id="deviceSelect"
                value={device}
                onChange={handleDeviceChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors"
              >
                {DEFAULT_DEVICES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="consumptionInput"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  צריכה:
                </label>
                <input
                  type="number"
                  id="consumptionInput"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  disabled={device !== "custom"}
                  placeholder="למשל: 1.5"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors disabled:opacity-60"
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="unitSelect" className="block text-sm font-bold text-slate-700 mb-2">
                  יחידה:
                </label>
                <select
                  id="unitSelect"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as "kw" | "w")}
                  disabled={device !== "custom"}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors disabled:opacity-60"
                >
                  <option value="kw">קוט&quot;ש / kW</option>
                  <option value="w">וואט / W</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-emerald-100 pb-2 inline-block">
              נתוני שימוש ועלות
            </h2>

            <div>
              <label htmlFor="calcMode" className="block text-sm font-bold text-slate-700 mb-2">
                סוג חישוב:
              </label>
              <select
                id="calcMode"
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as "hour" | "minute" | "month")}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors"
              >
                <option value="hour">עלות לפי שעה</option>
                <option value="minute">עלות לפי דקה</option>
                <option value="month">חישוב חודשי</option>
              </select>
            </div>

            {calcMode === "month" && (
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="hoursInput" className="block text-sm font-bold text-slate-700 mb-2">
                    שעות ביום:
                  </label>
                  <input
                    type="number"
                    id="hoursInput"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="daysInput" className="block text-sm font-bold text-slate-700 mb-2">
                    ימים בשבוע:
                  </label>
                  <input
                    type="number"
                    id="daysInput"
                    min="0"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3.5 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        <div
          className="mt-10 bg-emerald-600 text-white rounded-2xl p-6 text-center shadow-lg shadow-emerald-600/20"
          aria-live="polite"
        >
          <p className="text-3xl font-black">{result || "—"}</p>
        </div>

        <p className="text-center text-slate-400 text-sm mt-4">
          * החישוב מבוסס על תעריף חברת החשמל הנוכחי (0.5425 ₪ לקוט&quot;ש) והינו בגדר
          הערכה בלבד.
        </p>
      </div>

      <div className="bg-slate-100 p-8 md:p-10 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          חשבון החשמל מזנק? יכול להיות שיש לכם תקלה
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          אם חישבתם את הצריכה שלכם והחשבון שמגיע מחברת החשמל עדיין גבוה משמעותית,
          ייתכן שיש לכם זליגת חשמל (קצר סמוי), הארקה פגומה, או מכשיר ישן שצורך
          אנרגיה חריגה. בדיקה מקצועית של{" "}
          <Link href="/" className="text-emerald-600 font-bold hover:underline">
            חשמלאי מוסמך
          </Link>{" "}
          יכולה לחשוף את מקור הבעיה לפני שהנזק מתגבר.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          מומלץ להזמין{" "}
          <Link href="/" className="text-emerald-600 font-bold hover:underline">
            חשמלאי מוסמך
          </Link>{" "}
          לבדיקה מקיפה של הלוח ושל הצרכנים הכבדים. אצלנו ב
          <Link href="/" className="text-emerald-600 font-bold hover:underline">
            ח.י שירותי חשמל
          </Link>{" "}
          תוכלו למצוא{" "}
          <Link href="/pricing" className="text-emerald-600 font-bold hover:underline">
            מחירון החשמל
          </Link>{" "}
          שקוף והוגן, ולהיות בטוחים שאתם מקבלים שירות ברמה של יצאת צדיק.
        </p>
        <a
          href={`tel:${PHONE}`}
          aria-label={`לייעוץ ובדיקת המערכת: ${PHONE_DISPLAY}`}
          className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md"
        >
          לייעוץ ובדיקת המערכת: {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
