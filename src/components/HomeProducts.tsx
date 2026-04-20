const products = [
  {
    slug: "qr",
    name: "AlgoryQR",
    summary:
      "QR oluşturma ve düzenleme, davetiye ve menü QR’ları; sürüm ve izlenebilirlik odaklı (VCS benzeri) akışlarla içeriklerinizi güvenle yönetin.",
  },
  {
    slug: "rent",
    name: "AlgoryRent",
    summary:
      "Araç kiralama CRM’i ile filonuzu ve sözleşmelerinizi merkezileştirin; kiralama adımlarını tek panelden takip edin, operasyonu sadeleştirin.",
  },
  {
    slug: "workspace",
    name: "AlgoryWorkspace",
    summary:
      "Proje yönetimi, iş takibi ve raporlama; detaylı analiz ve verimlilik ölçümleriyle ekiplerinizin ritmini ve çıktısını şeffaf biçimde yönetin.",
  },
  {
    slug: "pazar",
    name: "AlgoryGoPazaar",
    summary:
      "Bireysel kullanıcılar da kendi pazar yerini açar; hazır platform, düşük komisyon ve hızlı vitrinle ürünleri satışa sunmak çok daha kolaydır.",
  },
] as const;

type ProductSlug = (typeof products)[number]["slug"];

function ProductIcon({ slug }: { slug: ProductSlug }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (slug) {
    case "qr":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="2" height="2" rx="0.35" />
          <rect x="17" y="14" width="2" height="2" rx="0.35" />
          <rect x="14" y="17" width="2" height="2" rx="0.35" />
          <rect x="17" y="17" width="2" height="2" rx="0.35" />
          <rect x="14" y="20" width="5" height="2" rx="0.35" />
        </svg>
      );
    case "rent":
      return (
        <svg {...common}>
          <path d="M5 17h14v-5l-2-4H7l-2 4v5z" />
          <path d="M3 17h2" />
          <path d="M19 17h2" />
          <circle cx="7.5" cy="17" r="1.25" />
          <circle cx="16.5" cy="17" r="1.25" />
        </svg>
      );
    case "workspace":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 9h16" />
          <path d="M9 4v16" />
        </svg>
      );
    case "pazar":
      return (
        <svg {...common}>
          <path d="M4 7h2l1.5 12h11L20 7H6" />
          <path d="M9 7V5a3 3 0 016 0v2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomeProducts() {
  return (
    <section id="urunler" className="site-products" aria-labelledby="site-products-title">
      <div className="site-products-inner">
        <header className="site-products-head">
          <p className="site-home-section-kicker">Ürünler</p>
          <h2 id="site-products-title" className="site-home-section-title">
            Algory ürün ailesi
          </h2>
          <p className="site-home-section-lead">
            Hizmet geliştirmenin ötesinde, işinizi doğrudan taşıyan ürünlerimiz. Aşağıdaki çözümler aynı kalite ve güvenlik anlayışıyla sunulur.
          </p>
        </header>

        <ul className="site-products-grid">
          {products.map((p) => (
            <li key={p.slug} className={`site-product-card site-product-card--${p.slug}`}>
              <div className="site-product-card-rays" aria-hidden />
              <div className="site-product-card-header">
                <div className="site-product-card-icon">
                  <ProductIcon slug={p.slug} />
                </div>
                <h3 className="site-product-name">{p.name}</h3>
              </div>
              <div className="site-product-card-content">
                <p className="site-product-desc">{p.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
