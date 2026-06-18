"use client";

import Link from "next/link";
import { useState } from "react";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";

export default function ElectricityCalculator() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [consumption, setConsumption] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState("");

  const tariff = 0.6145;

  const calculateStyled = () => {
    setError("");
    const currVal = parseFloat(current);
    const prevVal = parseFloat(previous);

    if (isNaN(currVal) || isNaN(prevVal)) {
      setError("אנא הזן מספרים תקינים בשני השדות.");
      setConsumption("");
      setTotal("");
      return;
    }

    if (currVal < prevVal) {
      setError("שגיאה: הקריאה הנוכחית לא יכולה להיות קטנה מהקריאה הקודמת.");
      setConsumption("");
      setTotal("");
      return;
    }

    const calculatedConsumption = currVal - prevVal;
    const calculatedTotal = calculatedConsumption * tariff;

    setConsumption(calculatedConsumption.toFixed(2));
    setTotal(calculatedTotal.toFixed(2));
  };

  const clearStyled = () => {
    setCurrent("");
    setPrevious("");
    setConsumption("");
    setTotal("");
    setError("");
  };

  return (
    <div className="bg-slate-50 text-slate-900 py-12 md:py-20 px-6">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1 rounded-full mb-4">
          כלי חינמי ללקוחותינו
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
          מחשבון חשמל – כמה באמת עולה לכם?
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          הזינו את קריאת המונה ובדקו כמה אתם אמורים לשלם לחברת החשמל.
        </p>
      </header>

      <section
        aria-labelledby="calculator-heading"
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 mb-16"
      >
        <h2 id="calculator-heading" className="sr-only">
          טופס מחשבון חשמל
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="current" className="font-bold text-slate-700 mb-2">
              קריאת מונה נוכחית:
            </label>
            <input
              type="number"
              id="current"
              inputMode="decimal"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="לדוגמה: 45600"
              className="p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="previous" className="font-bold text-slate-700 mb-2">
              קריאת מונה קודמת (מהחשבונית שעברה):
            </label>
            <input
              type="number"
              id="previous"
              inputMode="decimal"
              value={previous}
              onChange={(e) => setPrevious(e.target.value)}
              placeholder="לדוגמה: 45200"
              className="p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all w-full"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-50 text-red-700 p-4 rounded-xl font-bold border border-red-200"
            >
              ⚠️ {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={calculateStyled}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-md hover:shadow-lg"
            >
              חשב עלות
            </button>
            <button
              type="button"
              onClick={clearStyled}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 rounded-xl text-lg transition-all"
            >
              נקה נתונים
            </button>
          </div>

          {(consumption || total) && (
            <div
              aria-live="polite"
              className="mt-8 bg-emerald-50 p-6 rounded-2xl border border-emerald-100"
            >
              <h3 className="text-xl font-black text-emerald-900 mb-4 text-center">
                תוצאות החישוב:
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-emerald-200 pb-2 gap-4">
                  <span className="font-bold text-emerald-800">צריכת קוט&quot;ש:</span>
                  <span className="text-xl font-black text-slate-900">{consumption}</span>
                </div>
                <div className="flex justify-between items-center pt-2 gap-4">
                  <span className="font-bold text-emerald-800">
                    סכום לתשלום (כולל מע&quot;מ):
                  </span>
                  <span className="text-3xl font-black text-emerald-700">₪ {total}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-8 pt-6 border-t border-gray-100 text-xs text-slate-400 leading-relaxed text-center">
          <strong className="text-slate-500 font-semibold">שימו לב:</strong> התוצאה
          היא אינדיקציה בלבד ועשויה שלא להיות מדויקת — החשבון האמיתי תלוי
          בתעריף, מדרגות צריכה ורכיבים נוספים בחשבונית. החישוב מבוסס על תעריף
          של <strong className="text-slate-500">₪{tariff.toFixed(4)} לקוט&quot;ש</strong>{" "}
          (כולל מע&quot;מ).
        </p>
      </section>

      <section className="max-w-3xl mx-auto bg-slate-900 text-white p-8 md:p-10 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-black mb-4 text-emerald-400">
          החשבון יצא גבוה מדי? אולי יש לכם זליגת חשמל!
        </h2>
        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
          צריכת חשמל חריגה יכולה להעיד על מכשיר תקול, זליגת זרם, או בעיה בלוח
          החשמל שלכם. אל תחכו שהחשבון הבא יקפוץ שוב. צוות{" "}
          <Link
            href="/"
            className="font-bold text-white hover:text-emerald-300 underline underline-offset-4"
          >
            ח.י שירותי חשמל
          </Link>{" "}
          – בניהולו של הנדסאי חשמל וחשמלאי מוסמך, זמין 24/7 לאיתור תקלות ו
          <Link
            href="/services"
            className="font-bold text-white hover:text-emerald-300 underline underline-offset-4"
          >
            בדיקות בטיחות מקיפות
          </Link>
          .
        </p>
        <a
          href={`tel:${PHONE}`}
          aria-label={`חייגו לייעוץ ללא התחייבות: ${PHONE_DISPLAY}`}
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full transition-all text-lg shadow-lg hover:shadow-emerald-500/30"
        >
          חייגו לייעוץ ללא התחייבות
        </a>
      </section>
    </div>
  );
}
