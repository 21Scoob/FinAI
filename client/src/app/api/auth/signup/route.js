// src/app/api/auth/signup/route.js
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signJwt } from "@/lib/jwt";
import { sessionCookieName, cookieOptions } from "@/lib/cookies";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // ... (validări rămase la fel) ...
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Email-ul și parola sunt obligatorii" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un cont cu acest email există deja." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // --- LOGICĂ NOUĂ DE AUTOLOGIN ---
    const token = await signJwt({ sub: newUser.id, email: newUser.email });

    const res = NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      { status: 201 },
    );

    // Setăm cookie-ul de sesiune
    res.cookies.set(sessionCookieName, token, cookieOptions);

    return res;
  } catch (error) {
    // Am scos eroarea P2002 pentru că am verificat manual mai sus
    console.error(error);
    return NextResponse.json(
      { error: "Eroare internă de server" },
      { status: 500 },
    );
  }
}
