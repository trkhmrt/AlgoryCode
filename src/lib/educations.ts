export type EducationContentSection = {
  title: string;
  body: string;
};

export const educations = [
  {
    slug: "backend-java",
    title: "Backend Eğitimi (Java)",
    description:
      "Java ile kurumsal backend geliştirme: Spring Boot, REST API, veritabanı entegrasyonu ve güvenlik. Proje tabanlı, uygulamalı eğitim.",
    icon: "☕",
    duration: "5 gün",
    level: "Orta",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "Java dilinin modern özellikleri (Java 17+) ile başlıyoruz: record’lar, pattern matching, sealed class’lar ve modül sistemi. Nesne yönelimli tasarım ilkeleri (SOLID), interface ve abstract sınıf kullanımı, dependency injection kavramı detaylı işlenir. Spring Boot ile hızlı uygulama iskeleti oluşturma, otomatik konfigürasyon ve starter bağımlılıkları. RESTful API tasarımı: HTTP metodları, durum kodları, kaynak isimlendirme; OpenAPI/Swagger ile dokümantasyon ve API sözleşmeleri. Veritabanı katmanında JPA ve Hibernate: entity tasarımı, ilişkiler (OneToMany, ManyToOne vb.), lazy/eager yükleme, repository pattern ve Spring Data JPA. İş mantığı katmanı (service), exception handling, global hata yönetimi ve yapılandırılmış loglama (SLF4J, Logback). Spring Security ile kimlik doğrulama (JWT veya session tabanlı), yetkilendirme (role-based), CORS ve güvenlik başlıkları. Unit test (JUnit 5, Mockito) ve entegrasyon testleri (TestContainers veya H2). Eğitim boyunca gerçek senaryoya uygun, katmanlı bir backend uygulaması adım adım geliştirilir ve deploy edilebilir hale getirilir.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Temel programlama bilgisi olan yazılımcılar, backend veya full-stack geliştirici olmak isteyenler, farklı bir dil veya framework’ten Java ekosistemine geçiş yapan ekipler bu eğitime katılabilir. Orta seviye için tasarlanmıştır; değişken, döngü, fonksiyon ve temel veri yapıları bilgisi yeterlidir. Nesne yönelimli programlama (sınıf, kalıtım, polimorfizm) kavramlarına aşina olanlar eğitimden daha hızlı verim alır. Kurumsal projelerde backend geliştirme yapmak veya teknik mülakatlara hazırlanmak isteyenler için de uygundur.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: Java 17+ özellikleri, OOP tekrarı, Maven/Gradle ve proje yapısı. Gün 2: Spring Boot giriş, REST API ve controller katmanı, DTO ve validation, OpenAPI dokümantasyonu. Gün 3: JPA/Hibernate, entity ve ilişkiler, repository ve servis katmanları, transaction yönetimi. Gün 4: Spring Security (authentication, authorization), exception handling, loglama, unit ve entegrasyon testleri. Gün 5: Proje atölyesi, kod kalitesi ve best practices, paketleme ve deployment (JAR/Docker) ile eğitim tamamlanır.",
      },
    ] as EducationContentSection[],
  },
  {
    slug: "sql-mysql",
    title: "SQL (MySQL)",
    description:
      "MySQL ile ilişkisel veritabanı tasarımı, sorgulama ve optimizasyon. Normalizasyon, indeksler, transaction ve güvenli veri yönetimi.",
    icon: "🗄️",
    duration: "3 gün",
    level: "Başlangıç / Orta",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "İlişkisel veritabanı kavramları: tablolar, anahtarlar (primary, foreign), bütünlük kuralları ve normalizasyon (1NF, 2NF, 3NF) detaylı anlatılır. MySQL kurulumu (yerel veya Docker), veritabanı ve kullanıcı oluşturma, temel yönetim komutları. Veri sorgulama: SELECT, WHERE, ORDER BY, LIMIT; LIKE ve regex; tarih/saat fonksiyonları. JOIN türleri (INNER, LEFT, RIGHT, CROSS) ve gerçek senaryolarda kullanım. Alt sorgular (subquery), EXISTS, IN ve correlated subquery. Aggregate fonksiyonlar (COUNT, SUM, AVG, MIN, MAX), GROUP BY, HAVING ve gruplama mantığı. Veri değiştirme: INSERT, UPDATE, DELETE; transaction kavramı, ACID özellikleri, COMMIT ve ROLLBACK. İndeks türleri (B-Tree, UNIQUE, FULLTEXT), indeks tasarımı, EXPLAIN ile sorgu analizi ve performans iyileştirme. Stored procedure yazımı, parametreler ve döngüler; trigger kullanımı; view’lar ve materialized view kavramı. Güvenlik: kullanıcı ve rol yönetimi, GRANT/REVOKE; SQL injection’dan korunma, parametreli sorgular. Eğitim boyunca gerçek veri setleri ve senaryo tabanlı alıştırmalarla pratik yapılır.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Veritabanı ile yeni tanışan geliştiriciler, backend veya veri ekipleri, raporlama ve analiz yapan roller, veri odaklı uygulama geliştiren herkes bu eğitime katılabilir. Başlangıç ve orta seviye için uygundur; önceden basit SELECT veya Excel ile veri filtreleme deneyimi olması artıdır ancak zorunlu değildir. Yazılım dilinden bağımsız olarak SQL öğrenmek isteyenler (Java, Python, Node.js vb.) için uygundur.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: İlişkisel model ve normalizasyon, MySQL kurulumu, DDL (CREATE, ALTER) ve DML temelleri, SELECT, WHERE, ORDER BY, temel fonksiyonlar. Gün 2: JOIN’ler, alt sorgular, aggregate ve GROUP BY, INSERT/UPDATE/DELETE, transaction ve ACID, indeks türleri ve EXPLAIN. Gün 3: Stored procedure, trigger, view, kullanıcı yetkileri ve güvenlik, SQL injection önlemleri, performans optimizasyonu ve uygulamalı atölye ile program sonlanır.",
      },
    ] as EducationContentSection[],
  },
  {
    slug: "nosql-mongodb",
    title: "NoSQL (MongoDB)",
    description:
      "MongoDB ile doküman tabanlı veri modelleme, sorgulama ve ölçeklenebilir uygulama geliştirme. Aggregation pipeline ve gerçek proje senaryoları.",
    icon: "🍃",
    duration: "3 gün",
    level: "Orta",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "NoSQL ve doküman tabanlı veritabanı kavramları: ilişkisel modelden farkları, CAP teoremi, eventual consistency ve ne zaman MongoDB’nin tercih edileceği (şema esnekliği, yatay ölçekleme, hızlı prototipleme) anlatılır. MongoDB kurulumu (yerel veya Atlas), mongosh ile bağlantı, veritabanı ve koleksiyon yapısı. BSON formatı, şema tasarımı (gömülü doküman vs referans), diziler ve nested object’ler. CRUD işlemleri: insertOne/insertMany, find (filtre, projeksiyon, sıralama), update (operatörler: $set, $inc, $push vb.), delete. Sorgulama operatörleri: $eq, $in, $gte, $lte, $regex, $exists, $elemMatch; gömülü doküman ve dizi sorgulama. Aggregation pipeline detaylı işlenir: $match, $group, $lookup (join benzeri), $project, $sort, $unwind, $facet; gerçek raporlama senaryoları. İndeks türleri: tek alan, bileşik, metin, TTL, wildcard; indeks stratejisi ve performans. Replica set (yüksek erişilebilirlik) ve sharding (yatay ölçekleme) kavramsal olarak anlatılır. Uygulama tarafında driver kullanımı (Java/Spring Data MongoDB veya Node.js) ile CRUD ve aggregation örnekleri; gerçek veri senaryoları ile atölye yapılır.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Backend veya full-stack geliştiriciler, veri mühendisleri, hızlı gelişen veya yarı yapılandırılmış veri (log, event, katalog) kullanan proje ekipleri bu eğitime katılabilir. Temel veritabanı (tablo, sorgu) ve programlama bilgisi olanlar için orta seviye uygundur. İlişkisel veritabanı (SQL) deneyimi olanlar farkları daha hızlı kavrar; deneyim zorunlu değildir.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: NoSQL ve MongoDB giriş, kurulum, doküman modeli ve şema tasarımı, CRUD ve temel sorgular, operatörler ve gömülü veri. Gün 2: İleri sorgulama, aggregation pipeline (match, group, lookup, project), indeks türleri ve performans. Gün 3: Uygulama entegrasyonu (driver/ORM), replica set ve sharding özeti, atölye ve best practices ile eğitim tamamlanır.",
      },
    ] as EducationContentSection[],
  },
  {
    slug: "microservices",
    title: "Microservices",
    description:
      "Feign, RabbitMQ, Kafka, Docker ve ilgili araçlarla mikroservis mimarisi: servisler arası iletişim, mesaj kuyrukları ve konteynerleştirme.",
    icon: "🔀",
    duration: "5 gün",
    level: "İleri",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "Monolitik mimariden mikroservis mimarisine geçiş: avantajlar, trade-off’lar ve sınırların belirlenmesi; domain-driven design (DDD) temelleri, bounded context ve aggregate. Servisler arası senkron iletişim: REST client (OpenFeign), API sözleşmeleri (contract-first), timeout ve retry, circuit breaker ve hata yönetimi; örnek senaryolarla uygulama. Mesaj tabanlı iletişim: RabbitMQ kurulumu, queue, exchange türleri (direct, topic, fanout), binding ve routing; mesaj yaşam döngüsü, dead letter queue ve retry stratejileri; event tabanlı örnek akışlar. Apache Kafka ile event-driven mimari: topic, partition, offset, producer ve consumer; consumer group ve ölçekleme; exactly-once semantik ve transaction; Kafka Streams’e kısa giriş. Docker ile konteynerleştirme: Dockerfile yazımı, image build, container çalıştırma; docker-compose ile çoklu servis ortamı, ağ ve volume; pratikte tüm mikroservisleri konteyner içinde ayağa kaldırma. Orkestrasyon: Kubernetes’e kavramsal giriş (pod, deployment, service). Observability: yapılandırılmış loglama, merkezi log toplama; metrik (Prometheus/Grafana benzeri) ve dağıtık izleme (tracing) kavramları. Eğitim boyunca birden fazla mikroservisin birlikte çalıştığı uygulamalı bir proje geliştirilir.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Backend veya sistem mimarları, kıdemli yazılımcılar, mikroservis veya dağıtık sistem projelerinde rol alacak ekipler bu eğitime katılmalıdır. İleri seviye için uygundur; REST API, veritabanı, temel Linux ve komut satırı bilgisi beklenir. Birden fazla servisi birlikte tasarlama veya mevcut monoliti parçalama hedefi olanlar için özellikle faydalıdır.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: Mikroservis mimarisi, DDD ve sınırlar, OpenFeign ile servisler arası REST çağrıları, hata ve retry stratejileri. Gün 2: RabbitMQ, exchange ve kuyruk yapılandırması, mesaj tabanlı iletişim ve event tabanlı senaryolar. Gün 3: Apache Kafka, topic/partition, producer-consumer, consumer group, event streaming uygulaması. Gün 4: Docker ve Dockerfile, docker-compose ile çoklu servis ortamı, ağ ve volume. Gün 5: Observability (log, metrik), güvenlik özeti, proje atölyesi ve deployment ile program sonlanır.",
      },
    ] as EducationContentSection[],
  },
  {
    slug: "openai-agents",
    title: "OpenAI Agents",
    description:
      "OpenAI API’leri ile agent geliştirme: modeller, araç kullanımı (tools), RAG ve otomatik akış tasarımı. Uygulamalı proje ile bitirme.",
    icon: "🤖",
    duration: "3 gün",
    level: "Orta",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "OpenAI API’ye giriş: hesap ve API key oluşturma, authentication, model seçimi (GPT-4, GPT-3.5-turbo vb.) ve fiyatlandırma. Chat Completions API ile mesaj tabanlı kullanım: sistem, kullanıcı ve asistan mesajları; sıcaklık (temperature) ve token limitleri. Prompt mühendisliği: net talimatlar, rol tanımları, few-shot örnekler, çıktı formatı (JSON, liste vb.) ve hata azaltma. Function calling (tools): modelin harici araçları çağırması; tool tanımları (JSON schema), yanıt parsing ve uygulama tarafında fonksiyon çalıştırma; örnekler: API çağrısı, veritabanı sorgusu, hesaplama. RAG (Retrieval Augmented Generation): metin parçalama, embedding API ile vektörleştirme, vektör veritabanı (basit veya Pinecone/Weaviate benzeri) ile özel bilgi kaynağı kullanımı; sorgu sırasında ilgili dokümanları context’e ekleme. Agent akışları: çok adımlı karar verme, tool çağrıları döngüsü, maksimum adım ve zaman aşımı, hata ve retry yönetimi. Güvenlik ve maliyet: rate limit, token kullanımı takibi, hassas veri göndermeme ve veri işleme politikaları. Uygulamalı proje: belirli bir görevi yerine getiren (örn. destek botu, veri analizi asistanı, doküman özetleyici) bir agent geliştirilir ve canlı demo yapılır.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Yazılım geliştiriciler, ürün yöneticileri, AI/ML ekipleri, OpenAI veya benzeri API’lerle ürün geliştirmek isteyen herkes katılabilir. API kullanımı ve temel programlama bilgisi olanlar için orta seviye uygundur; Python veya Node.js ile HTTP isteği atma ve JSON işleme deneyimi faydalıdır. LLM’leri uygulama içinde kullanmak veya agent/asaristan ürünü tasarlamak isteyenler için doğrudan uygulanabilir içerik sunulur.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: OpenAI API ve hesap yapılandırması, modeller, Chat Completions kullanımı, prompt mühendisliği ve çıktı formatlama. Gün 2: Function calling (tools) tanımı ve kullanımı, RAG: embedding ve vektör veritabanı, context zenginleştirme. Gün 3: Agent akışı tasarımı (döngü, hata yönetimi), güvenlik ve maliyet, proje atölyesi ve canlı demo ile eğitim tamamlanır.",
      },
    ] as EducationContentSection[],
  },
  {
    slug: "makine-ogrenmesi",
    title: "Makine Öğrenmesi (ML)",
    description:
      "Makine öğrenmesi temelleri: denetimli/denetimsiz öğrenme, model eğitimi, değerlendirme ve production’a taşıma. Uygulamalı örneklerle.",
    icon: "📈",
    duration: "4 gün",
    level: "Orta",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "Makine öğrenmesi kavramları: eğitim, doğrulama ve test verisi ayrımı, bias-variance trade-off, aşırı öğrenme (overfitting) ve düzenleme (regularization). Denetimli öğrenme: regresyon (linear, polynomial), sınıflandırma (logistic regression, karar ağaçları, random forest, gradient boosting’e kısa giriş); algoritma seçimi ve hiperparametre. Metrikler: regresyon için MSE, MAE, R²; sınıflandırma için accuracy, precision, recall, F1, ROC-AUC ve confusion matrix; sınıf dengesizliği durumunda metrik seçimi. Cross-validation ve model karşılaştırma. Denetimsiz öğrenme: kümeleme (K-means, hiyerarşik), boyut indirgeme (PCA) ve görselleştirme. Özellik mühendisliği: eksik veri, kategorik kodlama, ölçekleme (normalization, standardization); feature selection kavramı. Popüler kütüphaneler (NumPy, Pandas, scikit-learn) ile veri yükleme, pipeline oluşturma, model eğitimi ve değerlendirme. Model kaydetme (serialization), basit bir API ile servis etme ve production ortamına taşıma (CI/CD, model versiyonlama) özeti. Eğitim boyunca gerçek veri setleri üzerinde uygulamalı projeler yapılır.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Veri veya yazılım ekipleri, ML projelerine girmek isteyen geliştiriciler, ürün veya analitik roller, veri odaklı karar süreçlerinde çalışanlar bu eğitime katılabilir. Orta seviye için uygundur; temel istatistik (ortalama, dağılım, korelasyon) ve programlama (tercihen Python) bilgisi faydalıdır. Matematiksel arka plan zorunlu değildir; sezgisel anlatım ve uygulama ağırlıklıdır.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: ML kavramları, veri bölümleme, regresyon ve sınıflandırma temelleri, scikit-learn ile ilk modeller. Gün 2: İleri sınıflandırma (tree, forest), metrikler ve confusion matrix, cross-validation. Gün 3: Denetimsiz öğrenme (K-means, PCA), özellik mühendisliği ve veri ön işleme, pipeline. Gün 4: Model kaydetme ve servis etme, production özeti, atölye ve proje sunumu ile program tamamlanır.",
      },
    ] as EducationContentSection[],
  },
  {
    slug: "frontend-nextjs",
    title: "FrontEnd (React & Next.js)",
    description:
      "React tabanlı modern frontend: bileşenler, state, Next.js ile SSR/SSG ve API routes. TypeScript ve güncel tooling ile production-ready uygulama.",
    icon: "⚛️",
    duration: "4 gün",
    level: "Orta",
    image: null as string | null,
    content: [
      {
        title: "Bu eğitimde neler var?",
        body: "React temelleri: bileşenler (function component), JSX sözdizimi, props ve state kavramı; tek yönlü veri akışı ve bileşen kompozisyonu. Hooks: useState (durum yönetimi), useEffect (yan etkiler, abonelik), useContext (global durum); useRef, useMemo, useCallback; custom hook yazımı. Liste render (key kullanımı), form yönetimi (controlled component), koşullu render ve fragment. Client-side routing kavramı ve ihtiyaç. Next.js’e geçiş: proje yapısı, App Router, sayfa ve layout dosyaları, dosya tabanlı routing ve dinamik segmentler. Server Components ve Client Components ayrımı, 'use client' kullanımı; veri çekme (fetch, cache seçenekleri) ve sunucu tarafında render. SSR (Server-Side Rendering), SSG (Static Site Generation) ve ISR (Incremental Static Regeneration) kavramları ve ne zaman kullanılacağı. API Routes (Route Handlers) ile basit backend endpoint’leri ve form gönderimi. Styling: CSS Modules, Tailwind CSS veya benzeri yaklaşımlar; responsive tasarım özeti. TypeScript ile tip güvenliği: interface, type, generic bileşenler. Build, lint ve test özeti; deployment (Vercel, Docker vb.). Eğitim boyunca gerçek bir web uygulaması (örn. dashboard, liste-detay sayfaları, form akışı) geliştirilir.",
      },
      {
        title: "Kimler katılmalı?",
        body: "Frontend geliştiriciler, full-stack’e geçen backend’ciler, UI/UX ile kod arayüzünde çalışanlar, React veya Next.js ile ürün geliştirmek isteyen herkes katılabilir. Orta seviye için uygundur; HTML, CSS ve temel JavaScript (değişken, fonksiyon, dizi, obje) bilgisi beklenir. Önceden herhangi bir framework deneyimi olması artıdır ancak zorunlu değildir.",
      },
      {
        title: "Program özeti",
        body: "Gün 1: React temelleri, bileşenler, props, state ve hooks (useState, useEffect), liste ve form. Gün 2: Next.js kurulumu, App Router, sayfalar ve layout, dosya yapısı ve routing. Gün 3: Veri çekme, Server ve Client Components, cache, API Routes. Gün 4: Styling (Tailwind/CSS Modules), TypeScript, build ve deployment, proje atölyesi ile eğitim sonlanır.",
      },
    ] as EducationContentSection[],
  },
] as const;

export type EducationSlug = (typeof educations)[number]["slug"];

export function getEducationBySlug(slug: string) {
  return educations.find((e) => e.slug === slug) ?? null;
}
