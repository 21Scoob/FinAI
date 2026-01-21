const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function makeAdmin(email) {
  if (!email) {
    console.error("Please provide an email.");
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: { role: "ADMIN" },
    });
    console.log(`User ${user.email} is now an ADMIN.`);
  } catch (e) {
    console.error("Error updating user:", e);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
makeAdmin(email);
