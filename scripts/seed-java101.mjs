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

const SLUG = "java-101";

/** @type {Array<{ title: string, totalDuration: string, lessons: Array<{ title: string, duration: string }> }>} */
const courseData = [
  {
    title: "1. Gün — Java'ya Giriş ve Temel Sözdizimi",
    totalDuration: "3 saat",
    lessons: [
      { title: "Java nedir, JVM / JDK / JRE kavramları", duration: "—" },
      { title: "Geliştirme ortamı kurulumu (JDK + IntelliJ IDEA)", duration: "—" },
      { title: "İlk Java programı: main metodu ve derleme/çalıştırma süreci", duration: "—" },
      { title: "Değişkenler ve primitive veri tipleri (int, double, boolean, char vb.)", duration: "—" },
    ],
  },
  {
    title: "2. Gün — Operatörler, Casting ve String",
    totalDuration: "3 saat",
    lessons: [
      { title: "Operatörler (aritmetik, karşılaştırma, mantıksal)", duration: "—" },
      { title: "Tip dönüşümleri (casting)", duration: "—" },
      { title: "Scanner sınıfı ile kullanıcıdan girdi alma", duration: "—" },
      { title: "String sınıfı ve temel string işlemleri", duration: "—" },
    ],
  },
  {
    title: "3. Gün — Koşullu İfadeler",
    totalDuration: "3 saat",
    lessons: [
      { title: "Koşullu ifadeler: if / else if / else", duration: "—" },
      { title: "switch-case yapısı", duration: "—" },
      { title: "Mantıksal operatörlerle karmaşık koşullar kurma", duration: "—" },
    ],
  },
  {
    title: "4. Gün — Döngüler",
    totalDuration: "3 saat",
    lessons: [
      { title: "for, while, do-while döngüleri", duration: "—" },
      { title: "break ve continue kullanımı", duration: "—" },
      { title: "İç içe döngüler ve örüntü (pattern) alıştırmaları", duration: "—" },
    ],
  },
  {
    title: "5. Gün — Diziler",
    totalDuration: "3 saat",
    lessons: [
      { title: "Tek boyutlu diziler (arrays): tanımlama, erişim, döngüyle gezme", duration: "—" },
      { title: "Çok boyutlu diziler", duration: "—" },
      { title: "Dizi ile ilgili yaygın algoritmalar (arama, sıralama mantığı)", duration: "—" },
    ],
  },
  {
    title: "6. Gün — Metotlar",
    totalDuration: "3 saat",
    lessons: [
      { title: "Metot (method) tanımlama, parametre ve dönüş değeri", duration: "—" },
      { title: "Metot aşırı yükleme (overloading)", duration: "—" },
      { title: "Değişken kapsamı (scope) ve yaşam süresi", duration: "—" },
    ],
  },
  {
    title: "7. Gün — OOP Temel: Sınıf, Nesne ve Constructor",
    totalDuration: "3 saat",
    lessons: [
      { title: "Sınıf (class) ve nesne (object) kavramı", duration: "—" },
      { title: "Constructor (yapıcı metot) ve this anahtar kelimesi", duration: "—" },
      { title: "Nesne oluşturma ve özniteliklere erişim", duration: "—" },
    ],
  },
  {
    title: "8. Gün — Encapsulation ve static",
    totalDuration: "3 saat",
    lessons: [
      { title: "Encapsulation (kapsülleme): private/public erişim belirleyiciler", duration: "—" },
      { title: "Getter/setter metotları", duration: "—" },
      { title: "static anahtar kelimesi: sınıf değişkenleri ve metotları", duration: "—" },
    ],
  },
  {
    title: "9. Gün — Kalıtım ve Method Overriding",
    totalDuration: "3 saat",
    lessons: [
      { title: "Kalıtım (inheritance) ve extends anahtar kelimesi", duration: "—" },
      { title: "super anahtar kelimesi ile üst sınıfa erişim", duration: "—" },
      { title: "Method overriding (metot ezme)", duration: "—" },
    ],
  },
  {
    title: "10. Gün — Polymorphism, Abstract Class ve Interface",
    totalDuration: "3 saat",
    lessons: [
      { title: "Polymorphism (çok biçimlilik) kavramı ve pratik örnekler", duration: "—" },
      { title: "Soyut sınıflar (abstract class)", duration: "—" },
      { title: "Arayüzler (interface) — temel kullanım", duration: "—" },
    ],
  },
  {
    title: "11. Gün — Interface İleri Konular",
    totalDuration: "3 saat",
    lessons: [
      { title: "Çoklu interface implementasyonu", duration: "—" },
      { title: "Interface'lerde default ve static metotlar", duration: "—" },
      { title: "Interface vs abstract class: ne zaman hangisi kullanılır", duration: "—" },
    ],
  },
  {
    title: "12. Gün — Enum, İç Sınıflar ve Paketler",
    totalDuration: "3 saat",
    lessons: [
      { title: "enum türü ile sabit kümeleri yönetme", duration: "—" },
      { title: "İç içe sınıflar (nested/inner class)", duration: "—" },
      { title: "Paketler (packages) ile kod organizasyonu", duration: "—" },
    ],
  },
  {
    title: "13. Gün — Hata Yönetimi",
    totalDuration: "3 saat",
    lessons: [
      { title: "Exception hiyerarşisi: checked vs unchecked", duration: "—" },
      { title: "try / catch / finally yapısı", duration: "—" },
      { title: "Kendi özel (custom) exception sınıflarını oluşturma", duration: "—" },
    ],
  },
  {
    title: "14. Gün — Collections Framework'e Giriş",
    totalDuration: "3 saat",
    lessons: [
      { title: "Collections Framework'e giriş: neden diziler yetmez", duration: "—" },
      { title: "List arayüzü: ArrayList ve LinkedList", duration: "—" },
      { title: "Koleksiyonlarda temel işlemler (ekleme, silme, arama, gezinme)", duration: "—" },
    ],
  },
  {
    title: "15. Gün — Set, Map ve Iterator",
    totalDuration: "3 saat",
    lessons: [
      { title: "Set arayüzü: HashSet, TreeSet", duration: "—" },
      { title: "Map arayüzü: HashMap, TreeMap, anahtar-değer mantığı", duration: "—" },
      { title: "Iterator ile koleksiyonlarda güvenli gezinme", duration: "—" },
    ],
  },
  {
    title: "16. Gün — Generics ve Sıralama",
    totalDuration: "3 saat",
    lessons: [
      { title: "Comparable ve Comparator ile sıralama", duration: "—" },
      { title: "Generics (jenerik tipler) kavramı ve type safety", duration: "—" },
      { title: "Koleksiyonları gerçek senaryolarda kullanma alıştırmaları", duration: "—" },
    ],
  },
  {
    title: "17. Gün — Dosya İşlemleri",
    totalDuration: "3 saat",
    lessons: [
      { title: "Dosya okuma/yazma: FileReader, FileWriter, BufferedReader", duration: "—" },
      { title: "try-with-resources ile kaynak yönetimi", duration: "—" },
      { title: "Metin dosyalarıyla pratik alıştırmalar", duration: "—" },
    ],
  },
  {
    title: "18. Gün — Modern Java (8+): Lambda, Stream, Optional",
    totalDuration: "3 saat",
    lessons: [
      { title: "Lambda expression'lar ve functional interface kavramı", duration: "—" },
      { title: "Stream API ile koleksiyonları işleme (filter, map, collect)", duration: "—" },
      { title: "Optional sınıfı ile null yönetimi", duration: "—" },
    ],
  },
  {
    title: "19. Gün — Çoklu İş Parçacığı",
    totalDuration: "3 saat",
    lessons: [
      { title: "Thread kavramı ve Runnable arayüzü", duration: "—" },
      { title: "Thread yaşam döngüsü", duration: "—" },
      { title: "Senkronizasyon temelleri ve race condition kavramı", duration: "—" },
    ],
  },
  {
    title: "20. Gün — JDBC ile Veritabanı Erişimi",
    totalDuration: "3 saat",
    lessons: [
      { title: "JDBC ile veritabanı bağlantısı kurma", duration: "—" },
      { title: "SQL sorgularını Java'dan çalıştırma (SELECT, INSERT, UPDATE, DELETE)", duration: "—" },
      { title: "PreparedStatement ile güvenli sorgular", duration: "—" },
    ],
  },
  {
    title: "21. Gün — JUnit, Debugging ve Clean Code",
    totalDuration: "3 saat",
    lessons: [
      { title: "JUnit ile birim testi (unit test) yazma", duration: "—" },
      { title: "Debugging teknikleri ve IDE'de hata ayıklama", duration: "—" },
      { title: "Kod kalitesi ve iyi pratikler (clean code temelleri)", duration: "—" },
    ],
  },
  {
    title: "22. Gün — Maven/Gradle ve Git",
    totalDuration: "3 saat",
    lessons: [
      { title: "Maven / Gradle ile proje ve bağımlılık yönetimi", duration: "—" },
      { title: "Git & GitHub ile versiyon kontrolü: commit, branch, push/pull", duration: "—" },
      { title: "Takım çalışmasında versiyon kontrolü pratikleri", duration: "—" },
    ],
  },
  {
    title: "23. Gün — Final Proje: Tasarım ve Kurulum",
    totalDuration: "3 saat",
    lessons: [
      { title: "Final proje fikrinin belirlenmesi ve OOP tabanlı mimari tasarımı", duration: "—" },
      { title: "Sınıf diyagramı / proje planı oluşturma", duration: "—" },
      { title: "Projenin temel yapısının kurulması", duration: "—" },
    ],
  },
  {
    title: "24. Gün — Final Proje: Geliştirme ve Sunum",
    totalDuration: "3 saat",
    lessons: [
      {
        title:
          "Final proje: koleksiyonlar, dosya/veritabanı erişimi ve hata yönetimi içeren uçtan uca bir konsol uygulaması geliştirme",
        duration: "—",
      },
      { title: "Kodun gözden geçirilmesi ve iyileştirilmesi", duration: "—" },
      { title: "Projenin sunumu ve kapanış / sonraki adımlar", duration: "—" },
    ],
  },
];

async function main() {
  const existingEducation = await prisma.education.findUnique({
    where: { slug: SLUG },
    select: { id: true, curriculumId: true },
  });

  if (existingEducation) {
    console.log(`"${SLUG}" eğitimi zaten var, seed atlandı.`);
    return;
  }

  const existingCurriculum = await prisma.curriculum.findFirst({
    where: { title: "Java 101" },
    select: { id: true },
  });

  let curriculumId = existingCurriculum?.id;

  if (!curriculumId) {
    const curriculum = await prisma.curriculum.create({
      data: {
        title: "Java 101",
        description:
          "Sıfırdan ileri seviyeye Java ve nesne yönelimli programlama. OOP, koleksiyonlar, hata yönetimi, dosya/veritabanı erişimi ve modern Java (8+) özellikleri. Toplam 72 saat (12 hafta × 2 gün × 3 saat, 24 oturum).",
      },
    });
    curriculumId = curriculum.id;

    await prisma.curriculumDetail.createMany({
      data: courseData.map((module, index) => ({
        curriculumId,
        title: module.title,
        sortOrder: index,
        totalDuration: module.totalDuration,
        lessons: module.lessons,
      })),
    });

    console.log(`Müfredat oluşturuldu: Java 101 (${curriculumId})`);
    console.log(`${courseData.length} oturum eklendi.`);
  } else {
    console.log(`Mevcut müfredat kullanılacak: ${curriculumId}`);
  }

  const education = await prisma.education.create({
    data: {
      slug: SLUG,
      title: "Java 101",
      shortDescription:
        "72 saatlik canlı online program: sıfırdan Java, OOP, koleksiyonlar, JDBC ve modern Java özellikleri ile uçtan uca konsol uygulaması.",
      fullDescription: `Bu eğitim, hiç programlama bilmeyen katılımcıları Java'nın temel sözdiziminden başlatıp adım adım nesne yönelimli programlamaya (OOP), koleksiyonlara, hata yönetimine, dosya/veritabanı erişimine ve modern Java (8+) özelliklerine kadar taşır. Program, Java'nın güçlü OOP altyapısını derinlemesine kavratmayı hedefler ve katılımcıların uçtan uca bir konsol uygulaması geliştirmesiyle sona erer.

Eğitim Bilgileri
• Toplam Süre: 72 saat (12 hafta boyunca)
• Program: Haftada 2 gün, günde 3 saat (toplam 24 oturum)
• Format: Canlı, online (Zoom)
• Seviye: Sıfırdan başlayanlar için — hiç programlama bilgisi gerekmez
• Odak: Genel amaçlı Java, OOP (Nesne Yönelimli Programlama) ağırlıklı
• Çıktı: Koleksiyonlar, dosya/veritabanı erişimi içeren uçtan uca bir Java uygulaması

Kimler Katılmalı?
• Programlamaya sıfırdan başlamak isteyen herkes
• Nesne yönelimli programlama mantığını sağlam temellerle öğrenmek isteyenler
• Kurumsal yazılım dünyasında en çok tercih edilen dillerden birine adım atmak isteyenler
• İleride Spring Boot, Android geliştirme gibi alanlara geçmeden önce sağlam bir Java temeli oluşturmak isteyenler`,
      instructorName: "Tarık Hamarat",
      instructorTitle: "AI Developer",
      startDate: new Date("2026-08-04T17:00:00.000Z"),
      endDate: new Date("2026-10-25T20:00:00.000Z"),
      durationWeeks: 12,
      durationHours: 72,
      schedule: "Haftada 2 gün, günde 3 saat · Canlı online (Zoom)",
      level: "BEGINNER",
      format: "LIVE",
      language: "tr",
      track: "BACKEND",
      techLanguage: "Java",
      prerequisites:
        "Kişisel bilgisayar (Windows / macOS / Linux)\nJDK (Java Development Kit) ve bir IDE (IntelliJ IDEA önerilir)\nStabil internet bağlantısı ve Zoom erişimi\nÖn koşul: Herhangi bir kodlama deneyimi gerekmez",
      learningOutcomes: [
        "Java'nın temel ve ileri seviye söz dizimini eksiksiz kullanabileceksiniz",
        "Nesne yönelimli programlamanın dört temel ilkesini (encapsulation, inheritance, polymorphism, abstraction) uygulayabileceksiniz",
        "Collections Framework ile veri yapılarını etkin biçimde kullanabileceksiniz",
        "Hataları try/catch ile yönetebilecek ve kendi exception sınıflarınızı yazabileceksiniz",
        "Dosya işlemleri ve JDBC ile temel veritabanı işlemleri gerçekleştirebileceksiniz",
        "Lambda expression ve Stream API gibi modern Java özelliklerini kullanabileceksiniz",
        "JUnit ile test yazabilecek, Maven/Gradle ve Git ile proje yönetebileceksiniz",
        "Uçtan uca bir Java uygulaması geliştirip sunabileceksiniz",
      ],
      contentSections: [],
      status: "PUBLISHED",
      publishedAt: new Date(),
      curriculumId,
    },
  });

  console.log(`Eğitim oluşturuldu: ${education.title} (/education/${education.slug})`);
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
