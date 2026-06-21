"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ALLOWED_EMAIL = "xbu333@gmail.com";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("🔄 מאמת...");

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function handleCallback() {
      // Get the code from URL
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const errorDesc = url.searchParams.get("error_description");

      if (errorDesc) {
        setStatus("❌ " + decodeURIComponent(errorDesc));
        setTimeout(() => router.push("/admin/login"), 3000);
        return;
      }

      if (!code) {
        // Check if session already exists (e.g. implicit flow)
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user.email === ALLOWED_EMAIL) {
          router.replace("/admin/analytics");
        } else {
          router.push("/admin/login");
        }
        return;
      }

      // Exchange code for session — runs in browser so PKCE verifier is available
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data.session) {
        setStatus("❌ שגיאה: " + (error?.message ?? "לא התקבל session"));
        setTimeout(() => router.push("/admin/login"), 3000);
        return;
      }

      if (data.session.user.email !== ALLOWED_EMAIL) {
        await supabase.auth.signOut();
        router.replace("/admin/unauthorized");
        return;
      }

      router.replace("/admin/analytics");
    }

    handleCallback();
  }, [router]);

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950 flex items-center justify-center text-white text-xl">
      {status}
    </div>
  );
}
