// src/app/api/auth/logout/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/cookies";

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  // șterge cookie-ul
  res.cookies.set(sessionCookieName, "", { path: "/", maxAge: 0 });
  return res;
}
