import { getUiLabels, type UiLocale } from "@/lib/ui-labels";

function FaultIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-full h-full" aria-hidden="true">
      <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="0.75" className="text-slate-200" />
      <path
        d="M10 28 C16 18, 20 32, 26 22 S34 14, 36 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-emerald-600 hero-svc-draw"
      />
      <circle cx="36" cy="18" r="1.75" fill="currentColor" className="text-emerald-500 hero-svc-glow" />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="13" y="9" width="18" height="26" rx="2" stroke="currentColor" strokeWidth="1.2" className="text-slate-300" />
      <line x1="17" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
      <line x1="17" y1="22" x2="27" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-emerald-600 hero-svc-slide" />
      <line x1="17" y1="28" x2="27" y2="28" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
      <circle cx="27" cy="22" r="1.25" fill="currentColor" className="text-emerald-500 hero-svc-glow" />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-full h-full" aria-hidden="true">
      <line x1="22" y1="8" x2="22" y2="13" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
      <ellipse cx="22" cy="19" rx="9" ry="3.5" stroke="currentColor" strokeWidth="0.75" className="text-emerald-400/50 hero-svc-halo" />
      <path
        d="M14 30 h16 l-1.5-9 a7 7 0 0 0-13 0 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        className="text-slate-400 hero-svc-draw-slow"
      />
      <line x1="18" y1="30" x2="26" y2="30" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
      <line x1="19" y1="33" x2="25" y2="33" stroke="currentColor" strokeWidth="0.75" className="text-slate-200" />
    </svg>
  );
}

function SmartIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M14 32 L22 20 L30 32" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="text-slate-300" />
      <rect x="16" y="32" width="12" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2" className="text-slate-300" />
      <path
        d="M22 26 V18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 3"
        className="text-emerald-500 hero-svc-dash"
      />
      <circle cx="22" cy="16" r="2" fill="currentColor" className="text-emerald-500 hero-svc-glow" />
      <circle cx="22" cy="16" r="5" stroke="currentColor" strokeWidth="0.75" className="text-emerald-400/40 hero-svc-ring" />
    </svg>
  );
}

function PlanningIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="12" y="10" width="20" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.2" className="text-slate-300" />
      <line x1="16" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
      <line x1="16" y1="21" x2="24" y2="21" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
      <path
        d="M16 28 L22 24 L28 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-600 hero-svc-draw"
      />
      <circle cx="22" cy="24" r="1.25" fill="currentColor" className="text-emerald-500 hero-svc-glow" />
    </svg>
  );
}

const SERVICE_ICONS = {
  faults: FaultIcon,
  panels: PanelIcon,
  lighting: LightIcon,
  smart: SmartIcon,
  planning: PlanningIcon,
} as const;

function ServiceLabel({ label }: { label: string }) {
  const words = label.split(" ");
  const lastWord = words.pop() ?? label;
  const prefix = words.join(" ");

  return (
    <>
      {prefix ? `${prefix} ` : null}
      <span className="text-emerald-600">{lastWord}</span>
    </>
  );
}

export default function HeroServices({
  cityName,
  locale = "he",
}: {
  cityName?: string;
  locale?: UiLocale;
}) {
  const labels = getUiLabels(locale);
  const heading = cityName
    ? labels.ourServicesInCity(cityName)
    : labels.ourServices;

  return (
    <div
      id="services"
      dir={locale === "ru" ? "ltr" : undefined}
      className="mt-8 w-full max-w-md mx-auto animate-fade-up [animation-delay:300ms] scroll-mt-20"
      aria-labelledby="hero-services-heading"
    >
      <h2
        id="hero-services-heading"
        className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight mb-4 text-center"
      >
        {heading}
      </h2>

      <ul className="space-y-0 list-none divide-y divide-slate-100" role="list">
        {labels.services.map(({ id, label }, i) => {
          const Icon = SERVICE_ICONS[id as keyof typeof SERVICE_ICONS];
          return (
          <li
            key={id}
            className="group flex items-center gap-3 py-3 animate-fade-up"
            style={{ animationDelay: `${450 + i * 100}ms` }}
          >
            <span
              className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center p-2"
              aria-hidden="true"
            >
              <span className="absolute inset-0 rounded-full border border-slate-200/70 transition-colors duration-700 group-hover:border-emerald-300/60" />
              <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-slate-50 to-white" />
              <span className="relative z-10 w-6 h-6">
                <Icon />
              </span>
            </span>

            <p className={`flex-1 min-w-0 text-base sm:text-lg font-semibold text-slate-600 leading-snug tracking-tight ${locale === "he" ? "text-right" : "text-left"}`}>
              <ServiceLabel label={label} />
            </p>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
