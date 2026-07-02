import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import pg from "pg";

config({ path: ".env.local" });

const admins = [
  { email: "buse@algorycode.com", password: "buse123", name: "Buse" },
  { email: "tarik@algorycode.com", password: "tarik123", name: "Tarik" },
];

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL veya DIRECT_URL tanımlı olmalı.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedAdmins() {
  for (const admin of admins) {
    const email = admin.email.toLowerCase();
    const passwordHash = await bcrypt.hash(admin.password, 12);

    await prisma.adminUser.upsert({
      where: { email },
      update: {
        passwordHash,
        name: admin.name,
      },
      create: {
        email,
        passwordHash,
        name: admin.name,
      },
    });

    console.log(`Seeded admin: ${email}`);
  }
}

seedAdmins()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
