import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

config({ path: ".env.local" });

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL veya DIRECT_URL tanımlı olmalı.");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const courseData = [
  {
    title: "Giriş",
    totalDuration: "2 dak",
    lessons: [{ title: "Tanıtım", duration: "1:33", previewUrl: "#" }],
  },
  {
    title: "HTML Dersleri",
    totalDuration: "3 sa",
    lessons: [
      { title: "HTML Nedir?", duration: "8:12", previewUrl: "#" },
      { title: "Temel Etiketler", duration: "14:05", previewUrl: "#" },
      { title: "Form Elemanları", duration: "11:40" },
    ],
  },
  {
    title: "CSS",
    totalDuration: "1 sa 37 dak",
    lessons: [
      { title: "CSS Seçiciler", duration: "9:18", previewUrl: "#" },
      { title: "Flexbox", duration: "16:22" },
    ],
  },
  {
    title: "HTML-CSS Uygulamaları",
    totalDuration: "18 dak",
    lessons: [{ title: "Landing Page Projesi", duration: "18:00", previewUrl: "#" }],
  },
  {
    title: "Javascript Temel Bilgileri",
    totalDuration: "1 sa 46 dak",
    lessons: [
      { title: "Değişkenler ve Tipler", duration: "12:30" },
      { title: "Fonksiyonlar", duration: "15:44", previewUrl: "#" },
    ],
  },
  {
    title: "Sqlite Veri Tabanı İşlemleri",
    totalDuration: "56 dak",
    lessons: [
      { title: "Veritabanı Kurulumu", duration: "7:15" },
      { title: "CRUD İşlemleri", duration: "10:08" },
    ],
  },
  {
    title: "Python Programlama",
    totalDuration: "3 sa 32 dak",
    lessons: [
      { title: "Python Kurulumu", duration: "6:20", previewUrl: "#" },
      { title: "Veri Yapıları", duration: "18:55" },
    ],
  },
  {
    title: "Python ile Veri Tabanı İşlemleri",
    totalDuration: "35 dak",
    lessons: [
      { title: "SQLite Bağlantısı", duration: "9:12" },
      { title: "ORM Temelleri", duration: "12:40", previewUrl: "#" },
    ],
  },
];

async function main() {
  const existingCount = await prisma.curriculum.count();
  if (existingCount > 0) {
    console.log(`Zaten ${existingCount} müfredat var, seed atlandı.`);
    return;
  }

  const curriculum = await prisma.curriculum.create({
    data: {
      title: "Standart Web Geliştirme Müfredatı",
      description:
        "HTML, CSS, JavaScript ve Python temellerini kapsayan hazır müfredat şablonu.",
    },
  });

  await prisma.curriculumDetail.createMany({
    data: courseData.map((module, index) => ({
      curriculumId: curriculum.id,
      title: module.title,
      sortOrder: index,
      totalDuration: module.totalDuration,
      lessons: module.lessons,
    })),
  });

  console.log(`Müfredat oluşturuldu: ${curriculum.title} (${curriculum.id})`);
  console.log(`${courseData.length} konu başlığı eklendi.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
