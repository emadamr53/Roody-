import { NextResponse } from "next/server";
import { checkDashboardPassword } from "@/lib/dashboard-auth";
import { getReplies } from "@/lib/reply-store";

export async function GET(request: Request) {
  if (!checkDashboardPassword(request)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const replies = await getReplies();
  return NextResponse.json(replies);
}
