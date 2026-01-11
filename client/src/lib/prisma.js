import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Reuse existing client or create new one
// This prevents connection pool exhaustion during development with HMR
const prisma =
  globalForPrisma.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}

export default prisma;
