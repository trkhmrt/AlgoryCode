"use client";

export default function BeamConvergence() {
  const principleCards = [
    {
      title: "Uçtan Uca Sorumluluk",
      text: "Keşiften canlıya kadar tek ekip olarak ilerleriz; teslim tarihi, kalite ve sürdürülebilirlik aynı anda korunur.",
      points: ["Net yol haritası", "Şeffaf haftalık rapor", "Öngörülebilir teslimat"],
    },
    {
      title: "Mühendislik Disiplini",
      text: "Kod standartları, test kültürü ve ölçülebilir kalite yaklaşımıyla ekiplerinize güven veren bir geliştirme ritmi kurarız.",
      points: ["Kod inceleme disiplini", "Test odaklı geliştirme", "Teknik borç kontrolü"],
    },
    {
      title: "İş Sonucu Odaklılık",
      text: "Sadece yazılım üretmeyiz; ürününüzün büyüme hedeflerine doğrudan katkı veren kararlar alırız.",
      points: ["KPI uyumlu geliştirme", "Gereksiz karmaşıklığı azaltma", "Hızlı geri bildirim döngüsü"],
    },
    {
      title: "Uzun Vadeli İş Ortaklığı",
      text: "Proje teslimiyle ilişkiyi bitirmeyiz; bakım, iyileştirme ve ölçekleme adımlarında aynı kalite çizgisini sürdürürüz.",
      points: ["Proaktif iyileştirme", "Sürdürülebilir mimari", "Güvenilir iletişim"],
    },
  ];

  return (
    <section className="ac-beam relative isolate overflow-hidden bg-[#05070f] py-12" aria-label="Neden AlgoryCode">
      <div className="mx-auto w-[min(1109px,92vw)]">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">Neden AlgoryCode?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
            Güvenilir teslimat, güçlü mühendislik prensipleri ve uzun vadeli iş ortaklığı yaklaşımıyla
            projelerinizi ölçeklenebilir biçimde büyütürüz.
          </p>
        </div>

        <div className="columns-1 gap-4 md:columns-2">
          {principleCards.map((card, index) => (
            <article
              key={card.title}
              className={[
                "mb-4 break-inside-avoid rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(3,7,18,0.88))] p-6 text-white shadow-[0_18px_50px_rgba(2,6,23,0.55)]",
                index % 2 === 0 ? "min-h-[250px]" : "min-h-[320px]",
              ].join(" ")}
            >
              <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.text}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-200">
                {card.points.map((point) => (
                  <li key={point}>✓ {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
