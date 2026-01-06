import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";
import { sessionCookieName } from "@/lib/cookies";
import { cookies } from "next/headers";

async function getUser(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  if (!token) return null;
  const payload = await verifyJwt(token);
  return payload ? payload.sub : null;
}

export async function GET(req) {
  const userId = await getUser(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const userId = await getUser(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { amount, description, type, category, date } = body;

    if (!amount || !description || !type) {
      return NextResponse.json(
        { error: "Amount, description, and type are required" },
        { status: 400 }
      );
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        description,
        type, // "INCOME" or "EXPENSE"
        category,
        date: date ? new Date(date) : new Date(),
        userId,
      },
    });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating transaction" },
      { status: 500 }
    );
  }
}
