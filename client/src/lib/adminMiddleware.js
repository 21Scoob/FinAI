import { verifyJwt } from "./jwt";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { sessionCookieName } from "./cookies";

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) return false;

  try {
    const payload = await verifyJwt(token);
    if (!payload) return false;

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    return user?.role === "ADMIN";
  } catch (e) {
    return false;
  }
}
