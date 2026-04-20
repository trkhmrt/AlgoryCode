import HomeScrollDrivenValues from "@/components/HomeScrollDrivenValues";

const benefits = [
  {
    title: "Öngörülebilir teslimat",
    text: "Net kapsam, görünür kilometre taşları ve erken risk uyarıları ile bütçenizi ve takviminizi koruyun.",
  },
  {
    title: "Üretime hazır mimari",
    text: "Ölçeklenebilir API ve veri katmanları, gözlemlenebilirlik ve güvenlik varsayılan olarak düşünülür.",
  },
  {
    title: "Sahada destek",
    text: "Canlıya çıktıktan sonra da yanınızdayız; iyileştirme, kapasite ve operasyonel netlik için düzenli ritim.",
  },
];

export default function HomeBenefitsStatsCta() {
  return (
    <>
      <section
        id="avantajlar"
        className="site-home-benefits"
        aria-labelledby="site-home-benefits-title"
      >
        <div className="site-home-benefits-inner">
          <header className="site-home-benefits-head">
            <p className="site-home-section-kicker">Avantajlar</p>
            <h2 id="site-home-benefits-title" className="site-home-section-title">
              Yazılımınızdan ne kazanırsınız?
            </h2>
            <p className="site-home-section-lead">
              Müşterilerimizin ürün ve operasyonlarında gördüğü somut kazanımların özeti.
            </p>
          </header>
          <ul className="site-home-benefits-grid">
            {benefits.map((b) => (
              <li key={b.title} className="site-home-benefit-card">
                <h3 className="site-home-benefit-title">{b.title}</h3>
                <p className="site-home-benefit-text">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeScrollDrivenValues />
    </>
  );
}
