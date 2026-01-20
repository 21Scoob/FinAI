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
    const investments = await prisma.investment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Calculăm valoarea curentă pentru fiecare investiție
    const investmentsWithValue = investments.map((inv) => {
      const monthsElapsed =
        (new Date() - new Date(inv.createdAt)) / (1000 * 60 * 60 * 24 * 30);
      // Randament simplu: valoare = sumă × (1 + randament% × luni/12)
      const currentValue =
        inv.amount * (1 + (inv.yieldRate / 100) * (monthsElapsed / 12));
      const profit = currentValue - inv.amount;

      return {
        ...inv,
        currentValue: Math.round(currentValue * 100) / 100,
        profit: Math.round(profit * 100) / 100,
      };
    });

    return NextResponse.json(investmentsWithValue);
  } catch (error) {
    console.error("Error fetching investments:", error);
    return NextResponse.json(
      { error: "Error fetching investments" },
      { status: 500 },
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
    const { name, type, amount, yieldRate } = body;

    if (!name || !amount || yieldRate === undefined) {
      return NextResponse.json(
        { error: "Name, amount, and yieldRate are required" },
        { status: 400 },
      );
    }

    const newInvestment = await prisma.investment.create({
      data: {
        name,
        type: type || "Altele",
        amount: parseFloat(amount),
        yieldRate: parseFloat(yieldRate),
        userId,
      },
    });

    return NextResponse.json(newInvestment, { status: 201 });
  } catch (error) {
    console.error("Error creating investment:", error);
    return NextResponse.json(
      { error: "Error creating investment" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  const userId = await getUser(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Investment ID is required" },
        { status: 400 },
      );
    }

    // Verify the investment belongs to the user
    const investment = await prisma.investment.findFirst({
      where: { id: parseInt(id), userId },
    });

    if (!investment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 404 },
      );
    }

    await prisma.investment.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting investment:", error);
    return NextResponse.json(
      { error: "Error deleting investment" },
      { status: 500 },
    );
  }
}
