export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir="rtl">
      <div className="bg-white border border-red-200 shadow-sm rounded-2xl p-10 w-full max-w-sm text-center space-y-4">
        <div className="text-5xl">🚫</div>
        <h1 className="text-xl font-bold text-slate-900">אין הרשאה</h1>
        <p className="text-slate-500 text-sm">
          חשבון הגוגל שלך אינו מורשה לגשת לדשבורד זה.
        </p>
        <a
          href="/admin/login"
          className="inline-block mt-2 text-sm bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition"
        >
          חזור לדף הכניסה
        </a>
      </div>
    </div>
  );
}
