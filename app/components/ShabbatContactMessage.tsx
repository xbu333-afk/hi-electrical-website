import { PHONE_DISPLAY } from "@/lib/site";

type ShabbatContactMessageProps = {
  /** Visual context for contrast against surrounding UI */
  variant?: "default" | "onEmerald" | "navbar" | "floating";
  className?: string;
};

function CandlesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 14v5a1 1 0 001 1h6a1 1 0 001-1v-5" />
      <path d="M7 14h10" />
      <path d="M9 14V9" />
      <path d="M15 14V9" />
      <path d="M9 7c0-1 .5-2 1.2-2.5" />
      <path d="M15 7c0-1-.5-2-1.2-2.5" />
      <path d="M12 20v1" />
    </svg>
  );
}

const VARIANT_STYLES = {
  default:
    "border-amber-200/80 bg-amber-50 text-slate-800 shadow-sm",
  onEmerald:
    "border-white/30 bg-white/15 text-white backdrop-blur-sm",
  navbar:
    "border-amber-200/80 bg-amber-50 text-slate-800 max-w-[16rem]",
  floating:
    "border-amber-200 bg-white text-slate-800 shadow-xl",
} as const;

/**
 * Accessible, non-interactive Shabbat notice.
 * Phone is plain text only (no tel:/wa links) per Shabbat Mode.
 */
export default function ShabbatContactMessage({
  variant = "default",
  className = "",
}: ShabbatContactMessageProps) {
  const phoneClass =
    variant === "onEmerald"
      ? "text-emerald-50 text-base font-semibold tracking-wide"
      : "text-slate-700 text-base font-semibold tracking-wide";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`rounded-2xl border px-4 py-3 text-right ${VARIANT_STYLES[variant]} ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 shrink-0 ${
            variant === "onEmerald" ? "text-amber-100" : "text-amber-600"
          }`}
          aria-hidden="true"
        >
          <CandlesIcon />
        </span>
        <div className="min-w-0 space-y-1.5">
          <p className="text-base leading-relaxed font-medium m-0">
            שבת שלום! אנו שומרים שבת ונשוב לפעילות מיד עם צאת השבת.
          </p>
          <p className={`m-0 leading-relaxed ${phoneClass}`}>
            <span className="sr-only">מספר טלפון לעיון בלבד, לא ללחיצה: </span>
            {PHONE_DISPLAY}
          </p>
        </div>
      </div>
    </div>
  );
}
