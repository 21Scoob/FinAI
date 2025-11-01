import { PrismaClient } from "@prisma/client";

// DEBUG — vezi de unde se importă efectiv @prisma/client
console.log(
  "[Prisma DEBUG] resolve(@prisma/client)=",
  require.resolve("@prisma/client")
);
console.log("[Prisma DEBUG] cwd=", process.cwd());

const globalForPrisma = globalThis;
const prisma = globalForPrisma.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}

export default prisma;
