"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    q: "Proje süreci nasıl işliyor?",
    a: "Keşif görüşmesiyle başlıyoruz. İhtiyaçlarınızı anladıktan sonra yol haritası ve teklifimizi sunuyoruz. Onay sonrası tasarım, geliştirme ve test süreçleri şeffaf biçimde ilerliyor. Teslimata kadar her aşamada sizi bilgilendiriyorum.",
  },
  {
    q: "Bir proje ne kadar sürer?",
    a: "Proje kapsamına göre değişir. Temel bir kurumsal web sitesi genellikle 2–3 haftada teslim edilirken, e-ticaret veya özel uygulama projeleri 4–8 hafta sürebilir. Görüşmemizde size özel takvim paylaşıyorum.",
  },
  {
    q: "Lansman sonrası destek veriyor musunuz?",
    a: "Evet, projenin yayına alınmasıyla iş bitmez. Bakım, güncelleme, hız optimizasyonu ve yeni özellikler için aylık destek paketleri sunuyorum. Acil durumlarda WhatsApp üzerinden hızlıca ulaşabilirsiniz.",
  },
  {
    q: "Mevcut sitemin tasarımını yenileyebilir misiniz?",
    a: "Kesinlikle. Mevcut sitenizi analiz edip hem görsel hem teknik açıdan modernize ediyorum. İçeriğinizi ve SEO değerinizi koruyarak çok daha iyi bir deneyim sunmak mümkün.",
  },
  {
    q: "Fiyatlandırma nasıl yapılıyor?",
    a: "Her proje kendine özgü olduğu için sabit fiyat listesi yerine kapsama özel teklif hazırlıyorum. Keşif görüşmemizde ihtiyaçlarınızı dinleyip net bir rakam paylaşıyorum. Gizli maliyet yok.",
  },
  {
    q: "Tasarımı beğenmezsem ne olur?",
    a: "Tasarım sürecinde sizden düzenli geri bildirim alıyorum. İlk taslaktan itibaren revizyon hakkı dahil çalışıyoruz. Sonuçtan memnun olmanız en öncelikli hedefim.",
  },
];

export default function SikcaSorulanSorular() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      id="sikca-sorulan-sorular"
      className="sss-section pt-0 pb-16 sm:pb-20 md:pb-24"
    >
      <div className="sss-inner w-full">
        <div className="sss-wrapper">
          {/* FAQ row: sol başlık, sağ accordion */}
          <div className="sss-faq-row">
            <div className="sss-faq-left">
              <h2 className="sss-faq-title">Sıkça Sorulan Sorular</h2>
              <p className="sss-faq-sub">
                Aklınızdaki soruların cevapları burada. Başka bir sorunuz varsa
                benimle iletişime geçin.
              </p>
            </div>

            <div className="sss-faq-right">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`sss-faq-item ${isOpen ? "open" : ""}`}
                  >
                    <button
                      type="button"
                      className="sss-faq-btn"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className="sss-chevron" aria-hidden>
                        <svg viewBox="0 0 14 14" fill="none">
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
                    <div className="sss-faq-body">
                      <div className="sss-faq-body-inner">
                        <div className="sss-faq-answer">{faq.a}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA row */}
          <div className="sss-cta-row">
            <h2 className="sss-cta-title">
              Projenizi hayata geçirmeye hazır mısınız?
            </h2>
            <p className="sss-cta-sub">
              Fikrinizi dinlemekten mutluluk duyarım. Ücretsiz bir keşif
              görüşmesi için hemen ulaşın.
            </p>
            <Link href="/iletisim" className="sss-cta-btn">
              Ücretsiz Görüşme Ayarla
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
