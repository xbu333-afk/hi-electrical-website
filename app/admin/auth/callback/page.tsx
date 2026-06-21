"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ALLOWED_EMAIL = "xbu333@gmail.com";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("🔄 מאמת...");

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { flowType: "pkce", autoRefreshToken: true, persistSession: true } }
    );

    async function handleCallback() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const errorDesc = url.searchParams.get("error_description");

      if (errorDesc) {
        setStatus("❌ " + decodeURIComponent(errorDesc.replace(/\+/g, " ")));
        setTimeout(() => router.push("/admin/login"), 3000);
        return;
      }

      if (!code) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user.email === ALLOWED_EMAIL) {
          router.replace("/admin/analytics");
        } else {
          router.push("/admin/login");
        }
        return;
      }

      setStatus("🔑 מחליף קוד...");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data.session) {
        setStatus("❌ " + (error?.message ?? "שגיאה לא ידועה"));
        setTimeout(() => router.push("/admin/login"), 3000);
        return;
      }

      if (data.session.user.email !== ALLOWED_EMAIL) {
        await supabase.auth.signOut();
        router.replace("/admin/unauthorized");
        return;
      }

      setStatus("✅ מתחבר...");
      router.replace("/admin/analytics");
    }

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl" dir="rtl">
      {status}
    </div>
  );
}
