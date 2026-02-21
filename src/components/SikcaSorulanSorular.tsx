"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  {
    question: "AlgroyCode nedir ve kimler için uygundur?",
    answer:
      "AlgroyCode, web sitesi, mobil uygulama ve sesli asistan geliştirme hizmetleri sunan bir yazılım ekibidir. Kurumsal firmalar, KOBİ'ler ve girişimciler projelerini hızlı ve ölçeklenebilir şekilde hayata geçirmek için bizi tercih edebilir.",
  },
  {
    question: "Teknik bilgim olmadan AlgroyCode ile çalışabilir miyim?",
    answer:
      "Evet. İhtiyaç analizinden teslimata kadar süreçte size rehberlik ediyoruz. Teknik detayları biz yönetiyoruz; siz sadece iş hedeflerinizi ve beklentilerinizi paylaşmanız yeterli.",
  },
  {
    question: "Slack, Figma gibi araçlarla entegrasyon yapılıyor mu?",
    answer:
      "Evet. ChatBot, sesli asistan ve mobil uygulama projelerinde Slack, e-posta, CRM ve tasarım araçlarıyla entegrasyon sunuyoruz. Mevcut iş akışlarınızı bozmadan yeni çözümleri devreye alabilirsiniz.",
  },
  {
    question: "AlgroyCode'da görev otomasyonu nasıl çalışır?",
    answer:
      "AI destekli asistanlar ve botlar ile tekrarlayan görevleri otomatikleştiriyoruz. Müşteri yanıtları, randevu yönetimi, raporlama ve bildirimler gibi süreçler tanımladığınız kurallara göre çalışır.",
  },
  {
    question: "Güvenlik ve uyumluluk nasıl sağlanıyor?",
    answer:
      "Güvenlik önceliğimizdir. AlgroyCode, uçtan uca şifreleme, KVKK uyumu ve düzenli güvenlik denetimleriyle kurumsal düzeyde güvenlik sunar. Verileriniz endüstri standardı güvenlik protokolleriyle korunur.",
  },
];

function SpeechBubbleIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="faq-contact-icon"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function SikcaSorulanSorular() {
  const [openIndex, setOpenIndex] = useState<number | null>(4);

  return (
    <section
      id="sikca-sorulan-sorular"
      className="faq-section relative py-16 sm:py-20 md:py-24"
    >
      <div className="faq-inner mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="faq-grid">
          {/* Sol: Sıkça sorulan sorular */}
          <div className="faq-left">
            <h2 className="faq-title mb-8 text-2xl font-bold tracking-tight text-[#0f0f0f] sm:text-3xl">
              Sıkça sorulan sorular:
            </h2>

            <div className="faq-list space-y-2">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`faq-item overflow-hidden rounded-lg border bg-white transition-shadow ${isOpen ? "faq-item-open" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="faq-question-btn flex w-full items-center justify-between gap-4 py-4 px-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question text-[15px] font-normal leading-snug text-[#1a1a1a] sm:text-base">
                        {item.question}
                      </span>
                      <span
                        className={`faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#1a1a1a] transition-transform duration-200 ${isOpen ? "faq-icon-open" : ""}`}
                        aria-hidden
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {isOpen ? (
                            <path d="M5 12h14" />
                          ) : (
                            <>
                              <path d="M12 5v14" />
                              <path d="M5 12h14" />
                            </>
                          )}
                        </svg>
                      </span>
                    </button>
                    <div
                      className="faq-answer-wrapper grid transition-[grid-template-rows] duration-200 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="faq-answer border-t border-[#e5e5e5] pb-4 pt-0 px-5 sm:pb-5 sm:px-6">
                          <p className="text-sm leading-relaxed text-[#525252] sm:text-[15px]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sağ: Hâlâ sorularınız mı var? */}
          <div className="faq-contact-card">
            <SpeechBubbleIcon />
            <h3 className="faq-contact-title">Hâlâ sorularınız mı var?</h3>
            <p className="faq-contact-desc">
              Konuşalım. Ekibimiz AlgroyCode ile en iyi sonucu almanız için
              burada. İster onboarding, entegrasyon ister destek olsun, size
              yardımcı olmaya hazırız.
            </p>
            <Link href="#iletisim" className="faq-contact-btn">
              Bize Ulaşın
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
