// src/app/api/auth/signup/route.js
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // 1. Importăm bcryptjs

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Email-ul și parola sunt obligatorii" },
        { status: 400 },
      );
    }

    // 2. Verificăm dacă user-ul deja există
    // (E mai curat să facem asta înainte de hashing)
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un cont cu acest email există deja." },
        { status: 409 }, // 409 = Conflict
      );
    }

    // 3. HASH-uim PAROLA
    // "salt" este un factor aleatoriu adăugat parolei înainte de hash
    // 10 este "costul" - cât de complex să fie. 10 e un standard bun.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Salvăm parola HASH-UITĂ în baza de date
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword, // 👈 Am schimbat 'password' cu 'hashedPassword'
      },
    });

    // 5. Trimitem răspunsul (FĂRĂ parolă)
    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      { status: 201 },
    );
  } catch (error) {
    // Am scos eroarea P2002 pentru că am verificat manual mai sus
    console.error(error);
    return NextResponse.json(
      { error: "Eroare internă de server" },
      { status: 500 },
    );
  }
}
