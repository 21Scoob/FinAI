// src/app/api/auth/login/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { sessionCookieName, cookieOptions } from "@/lib/cookies";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email și parolă necesare" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Credentiale invalide" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Credentiale invalide" },
        { status: 401 }
      );
    }

    // NU pune parola în payload
    const token = await signJwt({ sub: user.id, email: user.email });

    const res = NextResponse.json(
      { id: user.id, email: user.email },
      { status: 200 }
    );
    res.cookies.set(sessionCookieName, token, cookieOptions);
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 });
  }
}
