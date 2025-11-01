// src/app/api/auth/me/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";
import { sessionCookieName } from "@/lib/cookies";

export async function GET(req) {
  try {
    const cookie = req.cookies.get(sessionCookieName)?.value;
    if (!cookie) return NextResponse.json({ user: null }, { status: 200 });

    const payload = await verifyJwt(cookie);
    if (!payload) return NextResponse.json({ user: null }, { status: 200 });

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, createdAt: true },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
