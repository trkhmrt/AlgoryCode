import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

config({ path: ".env.local" });

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL veya DIRECT_URL tanımlı olmalı.");
}

const SLUG = "python-ile-sifirdan-uzmanliga";
const COVER_IMAGE_URL = "/images/python-logo.png";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

try {
  const existing = await prisma.education.findUnique({
    where: { slug: SLUG },
    select: { id: true, title: true, coverImageUrl: true },
  });

  if (!existing) {
    throw new Error(`"${SLUG}" slug'lı eğitim bulunamadı.`);
  }

  if (existing.coverImageUrl === COVER_IMAGE_URL) {
    console.log(`Kapak görseli zaten güncel: ${existing.title}`);
    process.exit(0);
  }

  const updated = await prisma.education.update({
    where: { slug: SLUG },
    data: { coverImageUrl: COVER_IMAGE_URL },
    select: { title: true, slug: true, coverImageUrl: true },
  });

  console.log("Kapak görseli güncellendi:", updated);
} catch (error) {
  console.error(error.message ?? error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
