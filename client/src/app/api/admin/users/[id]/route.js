export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/adminMiddleware";

export async function DELETE(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;

  try {
    // Ștergem tot ce ține de user înainte de a șterge userul
    await prisma.$transaction([
      prisma.transaction.deleteMany({ where: { userId: parseInt(id) } }),
      prisma.budget.deleteMany({ where: { userId: parseInt(id) } }),
      prisma.cheltuieli.deleteMany({ where: { userId: parseInt(id) } }),
      prisma.investment.deleteMany({ where: { userId: parseInt(id) } }),
      prisma.goal.deleteMany({ where: { userId: parseInt(id) } }),
      prisma.user.delete({ where: { id: parseInt(id) } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin Delete User Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const { role } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
    });

    return NextResponse.json({
      id: updatedUser.id,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error("Admin Update Role Error:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}
