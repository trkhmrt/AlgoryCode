const services = [
  {
    title: "Commerce",
    description:
      "E-ticaret altyapısı, ödeme entegrasyonları ve envanter yönetimi ile satış süreçlerinizi büyütün.",
    icon: "🛒",
    color: "purple",
  },
  {
    title: "Mobil App",
    description:
      "iOS ve Android için native ve cross-platform mobil uygulamalar; hızlı, güvenilir ve kullanıcı odaklı.",
    icon: "📱",
    color: "teal",
  },
  {
    title: "ChatBot",
    description:
      "Yapay zeka destekli sohbet botları ile müşteri hizmetleri ve satış süreçlerinizi otomatikleştirin.",
    icon: "💬",
    color: "pink",
  },
  {
    title: "Voice Assistant",
    description:
      "Sesli asistan çözümleri ile kullanıcılarınız doğal dil komutlarıyla işlem yapabilsin.",
    icon: "🎙️",
    color: "orange",
  },
];

export default function Services() {
  return (
    <section
      id="hizmetler"
      className="services-section-salas relative py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-[#0f0f0f] sm:text-4xl">
          Hizmetler
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-neutral-600">
          AI agent ve e-ticaret alanında sunduğumuz çözümler
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <article key={item.title} className="circuit-card">
              <div className="circuit-card-icon">{item.icon}</div>
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[#0f0f0f]">
                {item.title}
                <span className="text-[13px] text-neutral-400 transition-colors hover:text-neutral-600">
                  ↗
                </span>
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#777]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
