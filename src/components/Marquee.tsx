"use client";

const reviews = [
  {
    text: "Web sitemiz tamamen yenilendi ve dönüşüm oranlarımız %60 arttı. Tasarım kalitesi ve iletişim mükemmeldi.",
    name: "Ayşe Kara",
    role: "E-Ticaret Girişimcisi",
    stars: 5,
    initials: "AK",
    variant: "reviews-card-v1",
  },
  {
    text: "Mobil uygulamamızı hayata geçirdi. Hem iOS hem Android'de sorunsuz çalışıyor. Kesinlikle tavsiye ederim.",
    name: "Mehmet Yılmaz",
    role: "Startup Kurucusu",
    stars: 5,
    initials: "MY",
    variant: "reviews-card-v2",
  },
  {
    text: "Logo ve marka kimliğimiz için çalıştık. Beklentilerimin çok ötesinde bir sonuç çıktı. Harika bir deneyim!",
    name: "Zeynep Aksoy",
    role: "Kozmetik Markası Sahibi",
    stars: 5,
    initials: "ZA",
    variant: "reviews-card-v3",
  },
  {
    text: "SEO çalışmaları sayesinde Google'da ilk sayfaya çıktık. Organik trafiğimiz 3 ayda 4 katına çıktı.",
    name: "Burak Şahin",
    role: "Dijital Pazarlama Müdürü",
    stars: 5,
    initials: "BŞ",
    variant: "reviews-card-v1",
  },
  {
    text: "E-ticaret sitemizin tasarımı ve altyapısını kurdu. Çok hızlı teslim etti, her detayı düşünmüş.",
    name: "Selin Demir",
    role: "Moda Butik Sahibi",
    stars: 5,
    initials: "SD",
    variant: "reviews-card-v2",
  },
  {
    text: "Kurumsal web sitemizi yeniledi. Hem estetik hem de hızlı. Ekibimiz ve müşterilerimiz çok beğendi.",
    name: "Can Öztürk",
    role: "Mimarlık Firması CEO'su",
    stars: 5,
    initials: "CÖ",
    variant: "reviews-card-v3",
  },
  {
    text: "İlk toplantıdan teslimata kadar çok profesyoneldi. Fikirlerimizi mükemmel şekilde tasarıma dönüştürdü.",
    name: "Elif Kaya",
    role: "Fotoğrafçı & İçerik Üreticisi",
    stars: 5,
    initials: "EK",
    variant: "reviews-card-v1",
  },
  {
    text: "Google Ads kampanyalarımızı yönetti. Reklam maliyetlerimiz düşerken satışlarımız arttı. Teşekkürler!",
    name: "Tarık Arslan",
    role: "Online Kurs Girişimcisi",
    stars: 5,
    initials: "TA",
    variant: "reviews-card-v2",
  },
];

function ReviewCard({
  text,
  name,
  role,
  stars,
  initials,
  variant,
}: {
  text: string;
  name: string;
  role: string;
  stars: number;
  initials: string;
  variant: string;
}) {
  return (
    <div className={`reviews-card ${variant}`}>
      <div className="reviews-quote-icon">"</div>
      <div className="reviews-card-stars">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} className="reviews-card-star">★</span>
        ))}
      </div>
      <p className="reviews-card-text">{text}</p>
      <div className="reviews-card-footer">
        <div className="reviews-avatar">{initials}</div>
        <div>
          <div className="reviews-reviewer-name">{name}</div>
          <div className="reviews-reviewer-role">{role}</div>
        </div>
        <div className="reviews-verified-badge">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle cx="6" cy="6" r="6" fill="currentColor" />
            <path
              d="M3.5 6L5.2 7.7L8.5 4.5"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Doğrulandı
        </div>
      </div>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, half);
  const row2 = reviews.slice(half);

  return (
    <section className="reviews-marquee-section">
      <div className="reviews-marquee-blob reviews-marquee-blob-1" aria-hidden />
      <div className="reviews-marquee-blob reviews-marquee-blob-2" aria-hidden />

      <header className="reviews-header">
        <div className="reviews-eyebrow">
          <span className="reviews-eyebrow-dot" />
          Müşteri Yorumları
        </div>
        <h2 className="reviews-title">
          Müşterilerim Ne <span className="reviews-title-accent">Diyor?</span>
        </h2>
        <p className="reviews-sub">Birlikte çalıştığım kişilerin gerçek deneyimleri.</p>
        <div className="reviews-stars-summary">
          <div className="reviews-stars-row">
            <span className="reviews-star">★</span>
            <span className="reviews-star">★</span>
            <span className="reviews-star">★</span>
            <span className="reviews-star">★</span>
            <span className="reviews-star">★</span>
          </div>
          <span className="reviews-stars-text">5.0</span>
          <span className="reviews-stars-sub">· 48+ mutlu müşteri</span>
        </div>
      </header>

      <div className="reviews-marquee-wrapper">
        <div className="reviews-marquee-row reviews-marquee-row-1">
          {[...row1, ...row1].map((r, i) => (
            <ReviewCard key={`r1-${i}-${r.name}`} {...r} />
          ))}
        </div>
        <div className="reviews-marquee-row reviews-marquee-row-2">
          {[...row2, ...row2].map((r, i) => (
            <ReviewCard key={`r2-${i}-${r.name}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
