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

const DEFAULT_SECTIONS = [
  {
    title: "Bu eğitimde neler var?",
    body: `OpenAI API'leri, Cursor editörü ve otonom AI agent mimarileri bu programın omurgasını oluşturur. Katılımcılar sadece prompt yazmayı değil; tool calling, RAG, çok adımlı agent akışları ve production'a taşıma süreçlerini uçtan uca öğrenir.

Eğitim boyunca gerçek bir codebase üzerinde çalışılır: analiz, refactor, test, deploy ve hata ayıklama adımları AI destekli iş akışlarıyla yürütülür.`,
  },
  {
    title: "Kimler katılmalı?",
    body: `Yazılım geliştirici, full-stack mühendis, teknik lider veya ürün ekibinde AI araçlarını üretim sürecine entegre etmek isteyen herkes katılabilir.

Temel programlama bilgisi ve modern web geliştirme deneyimi yeterlidir. Daha önce ChatGPT veya benzeri araçları kullanmış olmak artıdır; ancak agent tabanlı geliştirme deneyimi şart değildir.`,
  },
  {
    title: "Program özeti",
    body: `Hafta 1: Cursor ve AI destekli geliştirme ortamı, codebase analizi, hızlı prototipleme.
Hafta 2: OpenAI API, prompt mühendisliği, function calling ve tool orchestration.
Hafta 3: RAG, vektör veritabanı, bağlam yönetimi ve güvenli agent akışları.
Hafta 4: Production hazırlığı, test stratejileri, maliyet yönetimi ve final proje sunumu.`,
  },
];

function slugify(value) {
  const map = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    I: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };

  return (
    value
      .split("")
      .map((char) => map[char] ?? char)
      .join("")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "egitim"
  );
}

async function createUniqueSlug(title, excludeId) {
  const base = slugify(title);
  let slug = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.education.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    slug = `${base}-${counter}`;
    counter += 1;
  }
}

function normalizeContentSections(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const title = String(item.title ?? "").trim();
      const body = String(item.body ?? "").trim();

      if (!title || !body) {
        return null;
      }

      return { title, body };
    })
    .filter(Boolean);
}

try {
  const source = await prisma.education.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!source) {
    throw new Error("Kopyalanacak eğitim bulunamadı.");
  }

  const existingSections = normalizeContentSections(source.contentSections);
  const contentSections =
    existingSections.length > 0 ? existingSections : DEFAULT_SECTIONS;

  if (existingSections.length === 0) {
    await prisma.education.update({
      where: { id: source.id },
      data: { contentSections },
    });
    console.log(`Kaynak eğitime ${contentSections.length} açılır bölüm eklendi.`);
  }

  const existingCopy = await prisma.education.findFirst({
    where: {
      title: `${source.title} (Kopya)`,
    },
    select: { id: true, slug: true, title: true },
  });

  if (existingCopy) {
    console.log("Kopya eğitim zaten mevcut:", existingCopy);
    process.exit(0);
  }

  const copyTitle = `${source.title} (Kopya)`;
  const slug = await createUniqueSlug(copyTitle);

  const copy = await prisma.education.create({
    data: {
      slug,
      title: copyTitle,
      shortDescription: source.shortDescription,
      fullDescription: source.fullDescription,
      instructorName: source.instructorName,
      instructorTitle: source.instructorTitle,
      instructorBio: source.instructorBio,
      instructorAvatarUrl: source.instructorAvatarUrl,
      startDate: source.startDate,
      endDate: source.endDate,
      durationWeeks: source.durationWeeks,
      durationHours: source.durationHours,
      schedule: source.schedule,
      level: source.level,
      format: source.format,
      language: source.language,
      price: source.price,
      currency: source.currency,
      isFree: source.isFree,
      maxStudents: source.maxStudents,
      location: source.location,
      prerequisites: source.prerequisites,
      learningOutcomes: source.learningOutcomes,
      contentSections,
      syllabus: source.syllabus,
      coverImageUrl: source.coverImageUrl,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  console.log("Kopya eğitim oluşturuldu:", {
    id: copy.id,
    title: copy.title,
    slug: copy.slug,
    sections: contentSections.length,
  });
} catch (error) {
  console.error(error.message ?? error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
