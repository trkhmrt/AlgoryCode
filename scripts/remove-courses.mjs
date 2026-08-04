import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

config({ path: ".env.local" });

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL veya DIRECT_URL tanımlı olmalı.");
}

/** @type {string[]} */
const SLUGS_TO_REMOVE = ["deneme", "node-js-ile-backend-gelistirme"];

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

try {
  const targets = await prisma.education.findMany({
    where: { slug: { in: SLUGS_TO_REMOVE } },
    select: {
      id: true,
      slug: true,
      title: true,
      curriculumId: true,
      _count: { select: { payments: true, contactSubmissions: true } },
    },
  });

  if (targets.length === 0) {
    console.log("Silinecek eğitim bulunamadı.");
    process.exit(0);
  }

  console.log("Silinecek eğitimler:");
  for (const course of targets) {
    console.log(
      `  - ${course.title} (${course.slug}) | ödemeler: ${course._count.payments}, başvurular: ${course._count.contactSubmissions}`,
    );
  }

  const curriculumIds = [
    ...new Set(targets.map((c) => c.curriculumId).filter(Boolean)),
  ];

  for (const course of targets) {
    await prisma.education.delete({ where: { id: course.id } });
    console.log(`Silindi: ${course.title} (${course.slug})`);
  }

  for (const curriculumId of curriculumIds) {
    const remaining = await prisma.education.count({ where: { curriculumId } });
    if (remaining === 0) {
      await prisma.curriculum.delete({ where: { id: curriculumId } });
      console.log(`Yetim müfredat silindi: ${curriculumId}`);
    }
  }

  const remaining = await prisma.education.findMany({
    select: { slug: true, title: true },
    orderBy: { title: "asc" },
  });

  console.log("\nKalan eğitimler:");
  for (const course of remaining) {
    console.log(`  - ${course.title} (${course.slug})`);
  }
} catch (error) {
  console.error(error.message ?? error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
