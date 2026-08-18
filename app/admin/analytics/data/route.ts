import { NextResponse, type NextRequest } from "next/server";
import { getVisitorLogsForRange } from "@/lib/analytics-logs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const startParam = request.nextUrl.searchParams.get("start");
  const endParam = request.nextUrl.searchParams.get("end");
  const rangeStart = startParam ? new Date(startParam) : null;
  const rangeEnd = endParam ? new Date(endParam) : null;

  if (
    !rangeStart ||
    !rangeEnd ||
    Number.isNaN(rangeStart.getTime()) ||
    Number.isNaN(rangeEnd.getTime())
  ) {
    return NextResponse.json({ error: "invalid date range" }, { status: 400 });
  }

  if (rangeStart.getTime() > rangeEnd.getTime()) {
    return NextResponse.json({ error: "start after end" }, { status: 400 });
  }

  try {
    const result = await getVisitorLogsForRange(rangeStart, rangeEnd);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
