"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace("/admin/analytics");
    } else {
      setError("סיסמה שגויה");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <div className="text-4xl">🔒</div>
          <h1 className="text-xl font-bold text-white">כניסה לדשבורד</h1>
          <p className="text-slate-400 text-sm">ח.י שירותי חשמל — פאנל ניהול פרטי</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הזן סיסמה"
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-right placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            autoFocus
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? "מתחבר..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}
