"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { serviceAreas } from "@/lib/cities";
import { isValidIsraeliPhone } from "@/lib/phone";
import { PHONE, PHONE_DISPLAY, WHATSAPP_HREF } from "@/lib/site";
import { extractValueTrackParams } from "@/lib/valuetrack";
import { trackWhatsAppClick } from "@/lib/analytics";

/** אותו מפתח שבו VisitorTracker שומר את מזהה המבקר. */
const VISITOR_ID_KEY = "hi_elec_vid";
const SESSION_GCLID_KEY = "hi_elec_gclid";
const SESSION_VT_KEY = "hi_elec_vt";

type Field = "name" | "phone" | "city" | "issue";

const FIELD_ORDER: readonly Field[] = ["name", "phone", "city", "issue"];

const EMPTY_VALUES: Record<Field, string> = {
  name: "",
  phone: "",
  city: "",
  issue: "",
};

const INPUT_CLASS =
  "w-full min-h-[52px] rounded-xl border border-slate-300 bg-white px-4 py-3 " +
  // text-base = 16px, מונע זום אוטומטי של ספארי בנייד בעת מיקוד בשדה
  // slate-500 ולא slate-400: הדוגמאות ב-placeholder חייבות 4.5:1 מול לבן
  "text-base text-slate-900 placeholder:text-slate-500 transition-colors " +
  "focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30 " +
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500/25";

const LABEL_CLASS = "block text-sm font-bold text-slate-800 mb-2";

/** קורא את מזהה המבקר שכבר קיים — לא מייצר חדש, כדי לא להתנגש במעקב. */
function readVisitorId(): string | null {
  const prefix = `${VISITOR_ID_KEY}=`;
  const fromCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);

  if (fromCookie) {
    try {
      return decodeURIComponent(fromCookie);
    } catch {
      return fromCookie;
    }
  }

  try {
    return localStorage.getItem(VISITOR_ID_KEY);
  } catch {
    return null;
  }
}

/** GCLID שנשמר בכניסת הסשן (VisitorTracker) — גיבוי כש־URL כבר בלי הפרמטר. */
function readSessionGclid(): string | null {
  try {
    const value = sessionStorage.getItem(SESSION_GCLID_KEY)?.trim();
    if (!value || value.startsWith("gtm_")) return null;
    return value;
  } catch {
    return null;
  }
}

function readSessionValueTrack(): ReturnType<typeof extractValueTrackParams> {
  try {
    const raw = sessionStorage.getItem(SESSION_VT_KEY);
    if (!raw) return extractValueTrackParams(new URLSearchParams());
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      keyword: typeof parsed.keyword === "string" ? parsed.keyword : null,
      campaign_id:
        typeof parsed.campaign_id === "string" ? parsed.campaign_id : null,
      adgroup_id:
        typeof parsed.adgroup_id === "string" ? parsed.adgroup_id : null,
      creative: typeof parsed.creative === "string" ? parsed.creative : null,
      vt_device: typeof parsed.vt_device === "string" ? parsed.vt_device : null,
      loc_physical_ms:
        typeof parsed.loc_physical_ms === "string"
          ? parsed.loc_physical_ms
          : null,
      network: typeof parsed.network === "string" ? parsed.network : null,
      match_type:
        typeof parsed.match_type === "string" ? parsed.match_type : null,
    };
  } catch {
    return extractValueTrackParams(new URLSearchParams());
  }
}

function validate(values: Record<Field, string>): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};

  if (values.name.trim().length < 2) errors.name = "נא להזין שם מלא";
  if (!isValidIsraeliPhone(values.phone))
    errors.phone = "נא להזין מספר טלפון ישראלי תקין, למשל 050-1234567";
  if (values.city.trim().length < 2) errors.city = "נא להזין עיר או יישוב";
  if (values.issue.trim().length < 5)
    errors.issue = "נא לתאר את התקלה במשפט קצר";

  return errors;
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<Record<Field, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "redirecting" | "error"
  >("idle");
  const [serverError, setServerError] = useState<"rate" | "generic" | null>(null);

  const mountedAtRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const fieldRefs = useRef<
    Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>
  >({});

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // מנקים את השגיאה ברגע שהמשתמש מתקן, במקום להשאיר אזהרה אדומה תלויה
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "redirecting") return;

    setServerError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("sending");

    try {
      const params = new URLSearchParams(searchParams.toString());
      const urlTrack = extractValueTrackParams(params);
      const sessionTrack = readSessionValueTrack();
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          city: values.city.trim(),
          issue: values.issue.trim(),
          company: honeypotRef.current?.value ?? "",
          elapsed_ms: Date.now() - mountedAtRef.current,
          visitor_id: readVisitorId(),
          gclid: params.get("gclid") || readSessionGclid(),
          page_path: window.location.pathname,
          keyword: urlTrack.keyword || sessionTrack.keyword,
          campaign_id: urlTrack.campaign_id || sessionTrack.campaign_id,
          adgroup_id: urlTrack.adgroup_id || sessionTrack.adgroup_id,
          creative: urlTrack.creative || sessionTrack.creative,
          vt_device: urlTrack.vt_device || sessionTrack.vt_device,
          loc_physical_ms:
            urlTrack.loc_physical_ms || sessionTrack.loc_physical_ms,
          network: urlTrack.network || sessionTrack.network,
          match_type: urlTrack.match_type || sessionTrack.match_type,
        }),
      });

      const data: { ok?: boolean; whatsapp_url?: string; error?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok || !data.ok || !data.whatsapp_url) {
        setServerError(data.error === "rate" ? "rate" : "generic");
        setStatus("error");
        return;
      }

      trackWhatsAppClick("get-quote-form", data.whatsapp_url);

      setStatus("redirecting");
      // ניווט באותה לשונית: window.open אחרי await נחסם על ידי חוסמי חלונות בנייד
      window.location.href = data.whatsapp_url;
    } catch {
      setServerError("generic");
      setStatus("error");
    }
  }

  const busy = status === "sending" || status === "redirecting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={busy}
      aria-labelledby="quote-form-heading"
      className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <h2
        id="quote-form-heading"
        className="text-xl font-extrabold text-slate-900 sm:text-2xl"
      >
        השאירו פרטים ונחזור אליכם
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        ארבעה שדות קצרים, ואתם עוברים ישירות לוואטסאפ עם ההודעה מוכנה לשליחה.
      </p>

      {/*
        מלכודת בוטים: מוסתרת מחוץ למסך ולא באמצעות display:none, כדי שממלאי
        טפסים אוטומטיים ימשיכו לראות אותה. aria-hidden ו-tabIndex מוציאים אותה
        מקוראי מסך ומניווט מקלדת.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="quote-company">אין למלא שדה זה</label>
        <input
          id="quote-company"
          name="company"
          type="text"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="quote-name" className={LABEL_CLASS}>
            שם מלא <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
            enterKeyHint="next"
            placeholder="לדוגמה: ישראל ישראלי"
            className={INPUT_CLASS}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
          />
          {errors.name && (
            <p
              id="quote-name-error"
              role="alert"
              className="mt-2 text-sm font-semibold text-red-700"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className={LABEL_CLASS}>
            טלפון <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            required
            aria-required="true"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            dir="ltr"
            placeholder="050-1234567"
            className={`${INPUT_CLASS} text-right`}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={
              errors.phone ? "quote-phone-error" : "quote-phone-hint"
            }
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
          />
          {errors.phone ? (
            <p
              id="quote-phone-error"
              role="alert"
              className="mt-2 text-sm font-semibold text-red-700"
            >
              {errors.phone}
            </p>
          ) : (
            <p id="quote-phone-hint" className="mt-2 text-sm text-slate-500">
              למספר הזה נחזור אליכם, ואליו תישלח ההודעה בוואטסאפ.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-city" className={LABEL_CLASS}>
            עיר או יישוב <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-city"
            name="city"
            type="text"
            required
            aria-required="true"
            autoComplete="address-level2"
            enterKeyHint="next"
            list="quote-city-options"
            placeholder="לדוגמה: פתח תקווה"
            className={INPUT_CLASS}
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? "quote-city-error" : undefined}
            ref={(el) => {
              fieldRefs.current.city = el;
            }}
          />
          <datalist id="quote-city-options">
            {serviceAreas.map((area) => (
              <option key={area.slug} value={area.name} />
            ))}
          </datalist>
          {errors.city && (
            <p
              id="quote-city-error"
              role="alert"
              className="mt-2 text-sm font-semibold text-red-700"
            >
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-issue" className={LABEL_CLASS}>
            מה התקלה? <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="quote-issue"
            name="issue"
            required
            aria-required="true"
            rows={4}
            maxLength={1000}
            enterKeyHint="done"
            placeholder="לדוגמה: המפסק הראשי קופץ כל כמה שעות מאז אתמול"
            className={`${INPUT_CLASS} resize-y leading-relaxed`}
            value={values.issue}
            onChange={(e) => update("issue", e.target.value)}
            aria-invalid={errors.issue ? true : undefined}
            aria-describedby={
              errors.issue ? "quote-issue-error" : "quote-issue-hint"
            }
            ref={(el) => {
              fieldRefs.current.issue = el;
            }}
          />
          {errors.issue ? (
            <p
              id="quote-issue-error"
              role="alert"
              className="mt-2 text-sm font-semibold text-red-700"
            >
              {errors.issue}
            </p>
          ) : (
            <p id="quote-issue-hint" className="mt-2 text-sm text-slate-500">
              משפט אחד מספיק. ככל שתפרטו יותר, ההערכה תהיה מדויקת יותר.
            </p>
          )}
        </div>
      </div>

      {/* slate-500 במצב מושבת: הכפתור מציג סטטוס שליחה שחייב להישאר קריא */}
      <button
        type="submit"
        disabled={busy}
        className="mt-7 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-base font-black text-white shadow-lg transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {busy ? (
          status === "redirecting" ? (
            "מעבירים אתכם לוואטסאפ…"
          ) : (
            "שולחים את הפרטים…"
          )
        ) : (
          <>
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.13c-.25.69-1.42 1.3-1.98 1.35-.53.05-1.02.24-3.42-.72-2.88-1.16-4.72-4.09-4.86-4.28-.14-.19-1.16-1.55-1.16-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.25.6.83 2.06.9 2.21.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.17.29.74 1.22 1.59 1.98 1.09.98 2.01 1.28 2.29 1.42.29.14.45.12.62-.07.17-.19.71-.83.9-1.12.19-.29.38-.24.64-.14.26.09 1.65.78 1.94.92.29.14.48.21.55.33.07.12.07.69-.18 1.38z" />
            </svg>
            שלחו וקבלו הצעת מחיר בוואטסאפ
          </>
        )}
      </button>

      <p className="mt-3 text-center text-sm text-slate-500">
        לאחר השליחה תועברו לוואטסאפ עם ההודעה מוכנה — רק ללחוץ שליחה.
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-900"
        >
          {serverError === "rate" ? (
            <p className="font-bold">
              כבר נשלחו כמה פניות מהמכשיר הזה. נסו שוב בעוד כמה דקות, או פנו
              ישירות:
            </p>
          ) : (
            <p className="font-bold">
              השליחה נכשלה. אל תוותרו — אפשר לפנות ישירות:
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={`tel:${PHONE}`}
              data-analytics-location="get-quote-error-call"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-red-700 px-4 font-bold text-white hover:bg-red-800"
            >
              חייגו {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_HREF}
              data-analytics-location="get-quote-error-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-emerald-700 px-4 font-bold text-white hover:bg-emerald-800"
            >
              וואטסאפ
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
