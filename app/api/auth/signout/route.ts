import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;
  return NextResponse.redirect(`${origin}/admin/login`, { status: 303 });
}
