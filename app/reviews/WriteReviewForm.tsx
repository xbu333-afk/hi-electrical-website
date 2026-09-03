"use client";

import { useEffect, useRef, useState } from "react";
import { isValidIsraeliPhone } from "@/lib/phone";

type Mode = "idle" | "rating" | "public" | "private" | "sending" | "done" | "error";

const INPUT_CLASS =
  "w-full min-h-[52px] rounded-xl border border-slate-300 bg-white px-4 py-3 " +
  "text-base text-slate-900 placeholder:text-slate-500 transition-colors " +
  "focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30 " +
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500/25";

function StarButton({
  value,
  filled,
  onSelect,
}: {
  value: number;
  filled: boolean;
  onSelect: (n: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-label={`${value} כוכבים`}
      aria-pressed={filled}
      className="rounded-lg p-1.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
    >
      <svg
        className={`h-9 w-9 sm:h-10 sm:w-10 ${filled ? "text-amber-400" : "text-slate-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
}

export default function WriteReviewForm() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    text?: string;
    phone?: string;
  }>({});
  const [serverError, setServerError] = useState<"rate" | "generic" | null>(
    null
  );

  const mountedAtRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) mountedAtRef.current = Date.now();
  }, [open]);

  function selectRating(n: number) {
    setRating(n);
    setErrors({});
    setServerError(null);
    setMode(n >= 4 ? "public" : "private");
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "נא להזין שם";
    if (text.trim().length < 10) next.text = "נא לכתוב לפחות משפט קצר";
    if (mode === "private" && !isValidIsraeliPhone(phone)) {
      next.phone = "נא להזין מספר טלפון לחזרה אליכם";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "sending" || rating < 1) return;
    if (!validate()) return;

    setMode("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name: name.trim(),
          text: text.trim(),
          phone: phone.trim() || undefined,
          company: honeypotRef.current?.value ?? "",
          elapsed_ms: Date.now() - mountedAtRef.current,
        }),
      });
      const data: { ok?: boolean; error?: string; mode?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.ok) {
        setServerError(data.error === "rate" ? "rate" : "generic");
        setMode(rating >= 4 ? "public" : "private");
        return;
      }

      setMode("done");
    } catch {
      setServerError("generic");
      setMode(rating >= 4 ? "public" : "private");
    }
  }

  function startOver() {
    setOpen(true);
    setMode("rating");
    setRating(0);
    setName("");
    setText("");
    setPhone("");
    setErrors({});
    setServerError(null);
    mountedAtRef.current = Date.now();
  }

  if (!open) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
          חוויתם שירות אצלנו?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          ההמלצות שלכם עוזרות לאחרים לבחור בביטחון — וגם לנו להשתפר.
        </p>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setMode("rating");
          }}
          className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-emerald-700 px-7 text-base font-black text-white shadow-lg transition-colors hover:bg-emerald-800"
        >
          כתוב המלצה
        </button>
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8"
      >
        <p className="text-lg font-extrabold text-emerald-950">
          {rating >= 4 ? "תודה רבה!" : "תודה שפניתם אלינו"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">
          {rating >= 4
            ? "ההמלצה שלך נשלחה והתקבלה בהצלחה במערכת. (עקב רענון שרתים אוטומטי, ייתכן שייקח לה מספר דקות להופיע באתר המעודכן)."
            : "קיבלנו את הפרטים ונחזור אליכם בהקדם לטיפול אישי."}
        </p>
        <button
          type="button"
          onClick={startOver}
          className="mt-5 text-sm font-bold text-emerald-800 underline underline-offset-2"
        >
          כתיבת המלצה נוספת
        </button>
      </div>
    );
  }

  const isPrivate = mode === "private" || (mode === "sending" && rating <= 3);
  const busy = mode === "sending";

  return (
    <div
      ref={panelRef}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
          כתוב המלצה
        </h2>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setMode("idle");
            setRating(0);
          }}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          סגור
        </button>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-slate-800">
          איך הייתה החוויה? בחרו דירוג
        </legend>
        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="דירוג כוכבים">
          {[1, 2, 3, 4, 5].map((n) => (
            <StarButton
              key={n}
              value={n}
              filled={n <= rating}
              onSelect={selectRating}
            />
          ))}
        </div>
      </fieldset>

      {(mode === "public" || mode === "private" || mode === "sending") && (
        <form className="relative mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="review-company">אין למלא</label>
            <input
              id="review-company"
              ref={honeypotRef}
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {isPrivate ? (
            <div
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
            >
              <p className="font-bold">חשוב לנו שתצאו מרוצים.</p>
              <p className="mt-1">
                ספרו לנו מה קרה ונחזור אליכם לטיפול אישי. המשוב הזה לא יפורסם
                באתר.
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-600">
              תודה! כתבו בקצרה מה עבד טוב — ההמלצה תופיע בעמוד ההמלצות באתר.
            </p>
          )}

          <div>
            <label htmlFor="review-name" className="mb-2 block text-sm font-bold text-slate-800">
              שם <span aria-hidden="true">*</span>
            </label>
            <input
              id="review-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={INPUT_CLASS}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              disabled={busy}
            />
            {errors.name && (
              <p role="alert" className="mt-2 text-sm font-semibold text-red-700">
                {errors.name}
              </p>
            )}
          </div>

          {isPrivate && (
            <div>
              <label htmlFor="review-phone" className="mb-2 block text-sm font-bold text-slate-800">
                טלפון לחזרה <span aria-hidden="true">*</span>
              </label>
              <input
                id="review-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                required
                placeholder="050-1234567"
                className={`${INPUT_CLASS} text-right`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={errors.phone ? true : undefined}
                disabled={busy}
              />
              {errors.phone && (
                <p role="alert" className="mt-2 text-sm font-semibold text-red-700">
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="review-text" className="mb-2 block text-sm font-bold text-slate-800">
              {isPrivate ? "מה קרה?" : "ההמלצה שלכם"}{" "}
              <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="review-text"
              name="text"
              rows={4}
              maxLength={2000}
              required
              className={`${INPUT_CLASS} resize-y leading-relaxed`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-invalid={errors.text ? true : undefined}
              disabled={busy}
              placeholder={
                isPrivate
                  ? "ספרו בקצרה מה לא הסתדר — נטפל בזה אישית"
                  : "לדוגמה: הגיע מהר, תיקן את לוח החשמל והסביר בסבלנות"
              }
            />
            {errors.text && (
              <p role="alert" className="mt-2 text-sm font-semibold text-red-700">
                {errors.text}
              </p>
            )}
          </div>

          {serverError && (
            <p role="alert" className="text-sm font-semibold text-red-700">
              {serverError === "rate"
                ? "נשלחו כמה פניות מהמכשיר הזה. נסו שוב בעוד כמה דקות."
                : "השליחה נכשלה. נסו שוב בעוד רגע."}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-emerald-700 px-6 text-base font-black text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-500 sm:w-auto"
          >
            {busy ? "שולחים…" : isPrivate ? "שלחו לטיפול אישי" : "שלחו המלצה"}
          </button>
        </form>
      )}
    </div>
  );
}
