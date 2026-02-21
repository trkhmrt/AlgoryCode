import Link from "next/link";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section
      id="hizmetler"
      className="services-section-salas relative py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-[#0f0f0f] sm:text-4xl">
          Ürünler
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-neutral-600">
          AI agent ve e-ticaret alanında sunduğumuz çözümler
        </p>

        <div className="services-products-grid">
          <div className="services-products-row services-products-row-first">
            {services.slice(0, 2).map((item) => (
              <Link
                key={item.slug}
                href={`/hizmetler/${item.slug}`}
                className="circuit-card circuit-card-tall block"
              >
                <div
                  className={`circuit-card-icon ${
                    item.color === "red-blue" ? "circuit-card-icon-red-blue" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[#0f0f0f]">
                  {item.title}
                  <span className="text-[13px] text-neutral-400 transition-colors hover:text-neutral-600">
                    ↗
                  </span>
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[#777]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="services-products-row services-products-row-second">
            {services.slice(2, 5).map((item) => (
              <Link
                key={item.slug}
                href={`/hizmetler/${item.slug}`}
                className="circuit-card circuit-card-short block"
              >
                <div
                  className={`circuit-card-icon ${
                    item.color === "red-blue" ? "circuit-card-icon-red-blue" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[#0f0f0f]">
                  {item.title}
                  <span className="text-[13px] text-neutral-400 transition-colors hover:text-neutral-600">
                    ↗
                  </span>
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[#777]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
