"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Proje süreci nasıl işliyor?",
    a: "Keşif görüşmesiyle başlıyoruz. İhtiyaçlarınızı anladıktan sonra yol haritası ve teklifimizi sunuyoruz. Onay sonrası tasarım, geliştirme ve test süreçleri şeffaf biçimde ilerliyor. Teslimata kadar her aşamada sizi bilgilendiriyoruz.",
  },
  {
    q: "Bir proje ne kadar sürer?",
    a: "Proje kapsamına göre değişir. Temel bir kurumsal web sitesi genellikle 2–3 haftada teslim edilirken, e-ticaret veya özel uygulama projeleri 4–8 hafta sürebilir. Görüşmemizde size özel takvim paylaşıyoruz.",
  },
  {
    q: "Lansman sonrası destek veriyor musunuz?",
    a: "Evet, projenin yayına alınmasıyla iş bitmez. Bakım, güncelleme, hız optimizasyonu ve yeni özellikler için aylık destek paketleri sunuyoruz. Acil durumlarda iletişim kanallarımız üzerinden hızlıca ulaşabilirsiniz.",
  },
  {
    q: "Mevcut sitemin tasarımını yenileyebilir misiniz?",
    a: "Evet. Mevcut sitenizi analiz edip hem görsel hem teknik açıdan modernize ediyoruz. İçeriğinizi ve SEO değerinizi koruyarak daha iyi bir deneyim sunmak mümkün.",
  },
  {
    q: "Fiyatlandırma nasıl yapılıyor?",
    a: "Her proje kendine özgü olduğu için sabit fiyat listesi yerine kapsama özel teklif hazırlıyoruz. Keşif görüşmesinde ihtiyaçlarınızı dinleyip net bir rakam paylaşıyoruz. Gizli maliyet yok.",
  },
  {
    q: "Tasarımı beğenmezsem ne olur?",
    a: "Tasarım sürecinde düzenli geri bildirim alıyoruz. İlk taslaktan itibaren revizyon hakkı dahil çalışıyoruz. Sonuçtan memnun olmanız önceliğimiz.",
  },
];

export default function SikcaSorulanSorular() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="sikca-sorulan-sorular" className="site-faq" aria-labelledby="site-faq-title">
      <div className="site-faq-inner">
        <div className="site-faq-side">
          <h2 id="site-faq-title">Sıkça sorulan sorular</h2>
          <p>
            Süreç, fiyat ve teslimat hakkında merak edilenler. Başka bir konuda
            sorunuz varsa iletişim sayfasından yazabilirsiniz.
          </p>
        </div>

        <div className="site-faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`site-faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="site-faq-q"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className="site-faq-chev" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 5L7 10L12 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div className="site-faq-a-outer">
                  <div className="site-faq-a-inner">
                    <div className="site-faq-a">{faq.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
