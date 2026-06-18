const CREDENTIALS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "רישיון ראשי ומוסמך",
    sub: "רישיון חשמלאי ראשי",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "הנדסאי חשמל",
    sub: "הכשרה הנדסאית מלאה",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "זמינות 24/7 למקרי חירום",
    sub: "חשמלאי 24 שעות",
  },
];

export default function CredentialsSection() {
  return (
    <section
      aria-label="אישורים ותעודות"
      className="bg-slate-50 border-y border-gray-100 py-10 md:py-14"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          role="list"
          aria-label="כישורים ואישורים מקצועיים"
        >
          {CREDENTIALS.map(({ icon, label, sub }) => (
            <div
              key={label}
              role="listitem"
              className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 lift"
            >
              <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                {icon}
              </span>
              <div>
                <div className="text-slate-900 font-bold text-sm">{label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
