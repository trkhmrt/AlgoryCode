"use client";

import Link from "next/link";
import HeroOrbScene from "@/components/HeroOrbScene";
import FoundationCircuitWebGL from "@/components/FoundationCircuitWebGL";
import { services, type ServiceSlug } from "@/lib/services";

type BentoPreviewKind = "chat" | "chips" | "browser" | "shop" | "tenants" | "voice";

const bentoProductConfig: { slug: ServiceSlug; preview: BentoPreviewKind }[] = [
  { slug: "chatbot", preview: "chat" },
  { slug: "mobil-app", preview: "chips" },
  { slug: "web-app", preview: "browser" },
  { slug: "commerce", preview: "shop" },
  { slug: "voice-assistant", preview: "voice" },
  { slug: "egitim", preview: "tenants" },
];

function ProductBentoSection({
  id,
  leadTitleId,
  title,
  leadText,
  sectionClassName,
}: {
  id: string;
  leadTitleId: string;
  title: string;
  leadText: string;
  sectionClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={leadTitleId}
      className={["ac-bento-section", sectionClassName].filter(Boolean).join(" ")}
    >
      <div className="ac-bento-inner">
        <div className="ac-bento-grid">
          <div className="ac-bento-tile ac-bento-tile--lead">
            <h2 id={leadTitleId} className="ac-bento-lead-title">
              {title}
            </h2>
            <p className="ac-bento-lead-text">{leadText}</p>
          </div>
          {bentoProductConfig.map(({ slug, preview }) => {
            const item = services.find((s) => s.slug === slug);
            if (!item) return null;
            return (
              <Link
                key={`${id}-${slug}`}
                href={`/${slug}`}
                className="ac-bento-tile ac-bento-tile--product"
              >
                <div className="ac-bento-preview-wrap">
                  <BentoPreview kind={preview} icon={item.icon} title={item.title} />
                </div>
                <div className="ac-bento-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="ac-bento-cta">İncele</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoPreview({ kind, icon, title }: { kind: BentoPreviewKind; icon: string; title: string }) {
  if (kind === "chat") {
    return (
      <div className="ac-bento-preview ac-bento-preview--chat">
        <div className="ac-bento-media-head">
          <span>{icon}</span>
          <strong>{title}</strong>
        </div>
        <div className="ac-bento-chat-win">
          <div className="ac-bento-chat-head">
            <span />
            <span />
            <span />
          </div>
          <div className="ac-bento-chat-body">
            <div className="ac-bento-chat-bubble ac-bento-chat-bubble--ai">Düşünüyor…</div>
            <div className="ac-bento-chat-bubble ac-bento-chat-bubble--user" />
          </div>
          <div className="ac-bento-chat-foot">
            <span className="ac-bento-chat-input" />
            <span className="ac-bento-chat-send" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "chips") {
    return (
      <div className="ac-bento-preview ac-bento-preview--chips">
        <div className="ac-bento-media-head">
          <span>{icon}</span>
          <strong>{title}</strong>
        </div>
        {["React Native", "AI SDK", "API", "Push", "Analytics"].map((t) => (
          <span key={t} className="ac-bento-chip">
            {t}
          </span>
        ))}
      </div>
    );
  }
  if (kind === "browser") {
    return (
      <div className="ac-bento-preview ac-bento-preview--browser">
        <div className="ac-bento-media-head">
          <span>{icon}</span>
          <strong>{title}</strong>
        </div>
        <div className="ac-bento-browser">
          <div className="ac-bento-browser-bar">
            <span className="ac-bento-browser-dot" />
            <span className="ac-bento-browser-dot" />
            <span className="ac-bento-browser-dot" />
          </div>
          <div className="ac-bento-browser-url" />
          <div className="ac-bento-browser-prompt">Ne üreteceksiniz?</div>
        </div>
      </div>
    );
  }
  if (kind === "shop") {
    return (
      <div className="ac-bento-preview ac-bento-preview--shop">
        <div className="ac-bento-media-head">
          <span>{icon}</span>
          <strong>{title}</strong>
        </div>
        <div className="ac-bento-shop-row">
          <span className="ac-bento-shop-card" />
          <span className="ac-bento-shop-card" />
          <span className="ac-bento-shop-card" />
        </div>
        <div className="ac-bento-shop-row">
          <span className="ac-bento-shop-card" />
          <span className="ac-bento-shop-card" />
        </div>
      </div>
    );
  }
  if (kind === "voice") {
    return (
      <div className="ac-bento-preview ac-bento-preview--voice">
        <div className="ac-bento-media-head">
          <span>{icon}</span>
          <strong>{title}</strong>
        </div>
        <div className="ac-bento-voice-orb">
          <span className="ac-bento-voice-ring ac-bento-voice-ring--a" />
          <span className="ac-bento-voice-ring ac-bento-voice-ring--b" />
          <span className="ac-bento-voice-dot" />
        </div>
      </div>
    );
  }
  return (
    <div className="ac-bento-preview ac-bento-preview--tenants">
      <div className="ac-bento-media-head">
        <span>{icon}</span>
        <strong>{title}</strong>
      </div>
      <div className="ac-bento-stack">
        <div className="ac-bento-stack-card ac-bento-stack-card--back">portal.sirket.com</div>
        <div className="ac-bento-stack-card ac-bento-stack-card--mid">app.sirket.com</div>
        <div className="ac-bento-stack-card ac-bento-stack-card--front">egitim.sirket.com</div>
      </div>
    </div>
  );
}

export default function StartupShowcase() {
  const trustedLogos = [
    "OpenAI",
    "Retool",
    "Stripe",
    "Wise",
    "Loom",
    "Medium",
    "Cash App",
    "Linear",
  ];

  return (
    <div className="ac-shell">
      <section className="ac-hero" id="top">
        <HeroOrbScene />
        <div className="ac-hero-grid">
          <div className="ac-hero-copy">
            <p className="ac-kicker">Yapay zeka destekli mühendislik yaklaşımı</p>
            <h1>Tek akıllı çalışma alanında ürününüzü daha hızlı canlıya taşıyın</h1>
            <p>
              Geliştirme, inceleme, test ve yayın süreçlerini aynı komuta bağlayın. Bağlam, standartlar
              ve üretim görünürlüğü her adımda bir arada kalsın.
            </p>
            <div className="ac-hero-actions">
              <Link href="/iletisim" className="ac-btn ac-btn-primary">
                İletişime geç
              </Link>
              <Link href="#urunler" className="ac-btn ac-btn-ghost">
                Ürünleri incele
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ac-trusted-section" aria-label="Referans logolar">
        <div className="ac-trusted-inner">
          <div className="ac-trusted-lead">Trusted by fast-growing startups</div>
          <div className="ac-trusted-grid">
            {trustedLogos.map((logo) => (
              <div key={logo} className="ac-trusted-cell">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ac-foundation-webgl-section w-full bg-black" aria-label="Foundation tooling">
        <FoundationCircuitWebGL />
      </section>

      <ProductBentoSection
        id="urunler"
        leadTitleId="ac-bento-lead-title"
        title="Ürün ve hizmetleriniz, tek noktadan."
        leadText="Şirket çözümlerimizi inceleyin; her kutu ilgili ürün detay sayfasına gider."
      />

      <section className="ac-section pb-2" id="cta" aria-labelledby="home-cta-heading">
        <div className="ac-mouse-panel">
          <div className="ac-publish-stage">
            <div className="ac-publish-copy ac-publish-copy--wide">
              <h2 id="home-cta-heading">Bir sonraki adımı birlikte atalım</h2>
              <p>
                Demo talep edin veya doğrudan iletişime geçin; kısa sürede dönüş yapalım. İhtiyacınızı
                birkaç soruda netleştirip size uygun ürün ve yolu önerelim.
              </p>
              <Link href="/iletisim" className="ac-publish-learn-btn">
                İletişime geç
              </Link>
            </div>
            <div className="ac-publish-focus">
              <div className="ac-publish-glow" aria-hidden />
              <Link href="/iletisim" className="ac-publish-button ac-publish-button--link">
                Demo talep et
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
