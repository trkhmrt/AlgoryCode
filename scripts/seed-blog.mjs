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

const posts = [
  {
    slug: "nextjs-16-ile-daha-hizli-ship-etmek",
    title: "Next.js 16 ile Daha Hızlı Ship Etmek",
    excerpt:
      "App Router, server actions ve edge dağıtımını bir araya getirerek üretim hızını nasıl artırabileceğinizi anlatıyoruz.",
    content: `Modern web uygulamalarında en büyük maliyet, ekip içi koordinasyon ve dağıtım sürtünmesidir. Next.js 16 ile birlikte server component'ler varsayılan hale geldiğinde, ekipler UI ve veri katmanını aynı repo içinde daha net ayırabiliyor.

Server Actions sayesinde form akışları API route yazmadan tamamlanabiliyor. Bu, özellikle checkout, lead form ve admin panel gibi CRUD ağırlıklı projelerde ciddi hız kazandırır.

Dağıtım tarafında preview ortamları ve incremental build'ler sayesinde her PR gerçek bir URL'de test edilebilir. Sonuç: daha az sürpriz, daha hızlı release.`,
    authorName: "Tarik Hamarat",
    authorTitle: "Kurucu, AlgoryCode",
    tags: ["Next.js", "Web", "Performans"],
    readingMinutes: 6,
    publishedAt: new Date("2026-05-20T10:00:00.000Z"),
  },
  {
    slug: "odeme-entegrasyonunda-3ds-ve-guven",
    title: "Ödeme Entegrasyonunda 3DS ve Güven",
    excerpt:
      "iyzico ile Non-3DS ve 3D Secure akışlarını doğru kurgularken dikkat edilmesi gereken noktalar.",
    content: `E-ticaret ve eğitim satış platformlarında ödeme deneyimi, dönüşüm oranını doğrudan etkiler. Non-3DS akış hızlıdır; ancak risk yönetimi ve chargeback oranları açısından 3D Secure birçok senaryoda tercih edilir.

Doğru entegrasyon modeli kullanıcıya seçim sunar: hızlı ödeme veya ek doğrulamalı güvenli ödeme. Her iki akışta da hata mesajlarının anlaşılır olması kritik.

Sandbox ortamında test kartları ile taksit, limit hatası ve 3DS callback senaryolarını ayrı ayrı doğrulamak, canlıya çıkmadan önce en değerli adımdır.`,
    authorName: "Buse Yılmaz",
    authorTitle: "Product Lead, AlgoryCode",
    tags: ["Ödeme", "iyzico", "Güvenlik"],
    readingMinutes: 5,
    publishedAt: new Date("2026-05-12T09:30:00.000Z"),
  },
  {
    slug: "urun-analytics-ile-dogru-karar-vermek",
    title: "Ürün Analytics ile Doğru Karar Vermek",
    excerpt:
      "URL bazlı trafik, dönüşüm hunisi ve gelir raporlarını birlikte okuyarak büyümeyi nasıl yönlendirirsiniz?",
    content: `Analytics sadece sayfa görüntülenmesi saymak değildir. Hangi URL'nin trafik aldığını, hangi kaynaktan geldiğini ve hangi sayfanın gelir ürettiğini birlikte görmek gerekir.

Basit bir page view modeli bile ekiplere hızlı içgörü sağlar: en çok ziyaret edilen sayfalar, cihaz dağılımı, coğrafi dağılım ve tekrar eden IP davranışları.

Bu verileri eğitim satış raporlarıyla birleştirdiğinizde hangi içeriğin gerçekten işe yaradığını net biçimde görürsünüz.`,
    authorName: "AlgoryCode Team",
    authorTitle: "Platform Ekibi",
    tags: ["Analytics", "Growth", "Product"],
    readingMinutes: 4,
    publishedAt: new Date("2026-05-05T14:00:00.000Z"),
  },
];

async function main() {
  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        status: "PUBLISHED",
      },
      create: {
        ...post,
        status: "PUBLISHED",
      },
    });
  }

  console.log(`Seeded ${posts.length} blog posts.`);
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
