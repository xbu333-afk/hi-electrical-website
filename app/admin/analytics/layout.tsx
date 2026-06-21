import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL ?? "xbu333@gmail.com";

/**
 * Protects the /admin/analytics route.
 * - Not logged in  → redirect to /admin/login
 * - Wrong email    → redirect to /admin/unauthorized
 */
export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.email !== ALLOWED_EMAIL) {
    redirect("/admin/unauthorized");
  }

  return <>{children}</>;
}
