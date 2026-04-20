"use client";

import { useEffect, useRef } from "react";

const reviews = [
  {
    text: "Web sitemiz tamamen yenilendi ve dönüşüm oranlarımız %60 arttı. Tasarım kalitesi ve iletişim mükemmeldi.",
    name: "Ayşe Kara",
    role: "E-Ticaret Girişimcisi",
    stars: 5,
    initials: "AK",
  },
  {
    text: "Mobil uygulamamızı hayata geçirdi. Hem iOS hem Android'de sorunsuz çalışıyor. Kesinlikle tavsiye ederim.",
    name: "Mehmet Yılmaz",
    role: "Startup Kurucusu",
    stars: 5,
    initials: "MY",
  },
  {
    text: "Logo ve marka kimliğimiz için çalıştık. Beklentilerimin çok ötesinde bir sonuç çıktı. Harika bir deneyim!",
    name: "Zeynep Aksoy",
    role: "Kozmetik Markası Sahibi",
    stars: 5,
    initials: "ZA",
  },
  {
    text: "SEO çalışmaları sayesinde Google'da ilk sayfaya çıktık. Organik trafiğimiz 3 ayda 4 katına çıktı.",
    name: "Burak Şahin",
    role: "Dijital Pazarlama Müdürü",
    stars: 5,
    initials: "BŞ",
  },
  {
    text: "E-ticaret sitemizin tasarımı ve altyapısını kurdu. Çok hızlı teslim etti, her detayı düşünmüş.",
    name: "Selin Demir",
    role: "Moda Butik Sahibi",
    stars: 5,
    initials: "SD",
  },
  {
    text: "Kurumsal web sitemizi yeniledi. Hem estetik hem de hızlı. Ekibimiz ve müşterilerimiz çok beğendi.",
    name: "Can Öztürk",
    role: "Mimarlık Firması CEO'su",
    stars: 5,
    initials: "CÖ",
  },
  {
    text: "İlk toplantıdan teslimata kadar çok profesyoneldi. Fikirlerimizi mükemmel şekilde tasarıma dönüştürdü.",
    name: "Elif Kaya",
    role: "Fotoğrafçı & İçerik Üreticisi",
    stars: 5,
    initials: "EK",
  },
  {
    text: "Google Ads kampanyalarımızı yönetti. Reklam maliyetlerimiz düşerken satışlarımız arttı. Teşekkürler!",
    name: "Tarık Arslan",
    role: "Online Kurs Girişimcisi",
    stars: 5,
    initials: "TA",
  },
];

function ReviewCard({
  text,
  name,
  role,
  stars,
  initials,
}: {
  text: string;
  name: string;
  role: string;
  stars: number;
  initials: string;
}) {
  return (
    <article className="site-review-card">
      <div className="site-review-stars" aria-hidden>
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="site-review-text">{text}</p>
      <div className="site-review-foot">
        <div className="site-review-av" aria-hidden>
          {initials}
        </div>
        <div>
          <div className="site-review-name">{name}</div>
          <div className="site-review-role">{role}</div>
        </div>
      </div>
    </article>
  );
}

const REVIEWS_SCROLL_BOOST_DECAY = 0.965;
const REVIEWS_SCROLL_INST_SCALE = 0.00115;
const REVIEWS_PLAYBACK_MIN = 0.48;
const REVIEWS_PLAYBACK_MAX = 2.35;

function applyReviewsMarqueePlaybackRate(track: HTMLDivElement | null, rate: number) {
  if (!track) return;
  for (const anim of track.getAnimations()) {
    if (anim instanceof CSSAnimation) {
      anim.playbackRate = rate;
    }
  }
}

export default function Marquee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef(false);
  const boostRef = useRef(0);
  const lastScrollRef = useRef({ y: 0, t: 0 });
  const rafRef = useRef(0);

  const loopItems = [...reviews, ...reviews];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lastScrollRef.current = { y: window.scrollY, t: performance.now() };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        inViewRef.current = Boolean(e?.isIntersecting);
      },
      { root: null, threshold: 0.08 },
    );
    io.observe(section);

    const onScroll = () => {
      if (!inViewRef.current) return;
      const y = window.scrollY;
      const t = performance.now();
      const prev = lastScrollRef.current;
      const dt = Math.max(1, t - prev.t);
      const dy = Math.abs(y - prev.y);
      const inst = dy / dt;
      lastScrollRef.current = { y, t };
      if (inst > 0) {
        boostRef.current = Math.min(1, boostRef.current + inst * REVIEWS_SCROLL_INST_SCALE);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      boostRef.current *= REVIEWS_SCROLL_BOOST_DECAY;
      if (boostRef.current < 0.002) boostRef.current = 0;

      const rate = inViewRef.current
        ? REVIEWS_PLAYBACK_MIN + boostRef.current * (REVIEWS_PLAYBACK_MAX - REVIEWS_PLAYBACK_MIN)
        : REVIEWS_PLAYBACK_MIN;

      applyReviewsMarqueePlaybackRate(trackRef.current, rate);
    };
    rafRef.current = requestAnimationFrame(tick);

    const syncSoon = () => {
      requestAnimationFrame(() => {
        applyReviewsMarqueePlaybackRate(trackRef.current, REVIEWS_PLAYBACK_MIN);
      });
    };
    syncSoon();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="musteri-yorumlari"
      className="site-reviews site-reviews--scroll-velocity"
      aria-labelledby="site-reviews-title"
    >
      <div className="site-reviews-rays" aria-hidden />
      <header className="site-reviews-head">
        <p className="site-reviews-kicker">Referans</p>
        <h2 id="site-reviews-title" className="site-reviews-title">
          Müşteriler ne diyor?
        </h2>
        <p className="site-reviews-sub">Birlikte çalıştığımız ekiplerin gerçek geri bildirimleri.</p>
      </header>

      <div className="site-reviews-wrap">
        <div ref={trackRef} className="site-reviews-track">
          {loopItems.map((r, i) => (
            <ReviewCard key={`m-${i}-${r.name}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
