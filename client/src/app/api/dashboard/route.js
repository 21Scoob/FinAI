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

    // 4. Portfolio with calculated values
    const investments = await prisma.investment.findMany({
      where: { userId },
    });

    // Calculate total portfolio value and performance
    let totalInvested = 0;
    let totalCurrentValue = 0;

    const investmentsWithValue = investments.map((inv) => {
      const monthsElapsed =
        (new Date() - new Date(inv.createdAt)) / (1000 * 60 * 60 * 24 * 30);
      // Randament simplu: valoare = sumă × (1 + randament% × luni/12)
      const currentValue =
        inv.amount * (1 + (inv.yieldRate / 100) * (monthsElapsed / 12));

      totalInvested += inv.amount;
      totalCurrentValue += currentValue;

      return {
        ...inv,
        currentValue: Math.round(currentValue * 100) / 100,
      };
    });

    const totalProfit = totalCurrentValue - totalInvested;
    const portfolioYield =
      totalInvested > 0
        ? Math.round((totalProfit / totalInvested) * 10000) / 100
        : 0;

    return NextResponse.json({
      balance: totalBalance,
      recentTransactions,
      goals,
      investments: investmentsWithValue,
      portfolioStats: {
        totalInvested: Math.round(totalInvested * 100) / 100,
        totalCurrentValue: Math.round(totalCurrentValue * 100) / 100,
        totalProfit: Math.round(totalProfit * 100) / 100,
        portfolioYield,
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
