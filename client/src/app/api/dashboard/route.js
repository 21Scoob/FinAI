import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";
import { sessionCookieName } from "@/lib/cookies";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(sessionCookieName)?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = payload.sub;

    // 1. Calculate Total Balance
    // We sum all INCOME and subtract all EXPENSE transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId },
    });

    let totalBalance = 0;
    transactions.forEach((t) => {
      if (t.type === "INCOME") totalBalance += t.amount;
      else totalBalance -= t.amount; 
    });

    // 2. Recent Transactions (Last 5)
    const recentTransactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 5,
    });

    // 3. Goals
    const goals = await prisma.goal.findMany({
      where: { userId },
    });

    // 4. Portfolio Allocation (Mocked for now as we don't have real-time prices)
    // We can fetch investments and just show them
    const investments = await prisma.investment.findMany({
      where: { userId },
    });

    return NextResponse.json({
      balance: totalBalance,
      recentTransactions,
      goals,
      investments,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
