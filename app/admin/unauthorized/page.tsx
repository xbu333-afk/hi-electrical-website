export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6" dir="rtl">
      <div className="bg-slate-900 border border-red-900/50 rounded-2xl p-10 w-full max-w-sm text-center space-y-4">
        <div className="text-5xl">🚫</div>
        <h1 className="text-xl font-bold text-white">אין הרשאה</h1>
        <p className="text-slate-400 text-sm">
          חשבון הגוגל שלך אינו מורשה לגשת לדשבורד זה.
        </p>
        <a
          href="/admin/login"
          className="inline-block mt-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition"
        >
          חזור לדף הכניסה
        </a>
      </div>
    </div>
  );
}
