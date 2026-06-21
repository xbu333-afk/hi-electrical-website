import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL("/admin/login", "https://www.hiservice.org")
  );
  response.cookies.set("admin-auth", "", { maxAge: 0, path: "/" });
  return response;
}
