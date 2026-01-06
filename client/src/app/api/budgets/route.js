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
    const budgets = await prisma.budget.findMany({
      where: { userId },
    });
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching budgets" },
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
    const { name, allocated, icon } = body;

    if (!name || !allocated) {
      return NextResponse.json(
        { error: "Name and allocated amount are required" },
        { status: 400 }
      );
    }

    const newBudget = await prisma.budget.create({
      data: {
        name,
        allocated: parseFloat(allocated),
        icon: icon || "💰",
        userId,
      },
    });

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating budget" },
      { status: 500 }
    );
  }
}
