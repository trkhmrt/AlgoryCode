"use client";

import { useState } from "react";

const items = [
  {
    question: "Neden AI agent ve e-ticaret alanında uzmanlaştınız?",
    answer:
      "İş süreçlerinin otomasyonu ve dijital satış kanallarının gücü, bugünün rekabet ortamında fark yaratıyor. AI agent’lar ve sağlam e-ticaret altyapısı ile müşterilerimizin hem operasyonel maliyetlerini düşürüyor hem de büyümelerini hızlandırıyoruz.",
  },
  {
    question: "Diğer ajanslardan veya çözümlerden farkınız ne?",
    answer:
      "Teknolojinin yanı sıra süreç danışmanlığı ve eğitim sunuyoruz. Sadece yazılım teslim etmiyoruz; ekibinizin sistemi benimsemesini ve sürdürebilmesini sağlayacak eğitim ve dokümantasyonu da işin bir parçası olarak görüyoruz.",
  },
  {
    question: "Proje süreçleri nasıl işliyor?",
    answer:
      "İhtiyaç analizi ve kapsam netleştirmeyle başlıyoruz. Ardından iteratif geliştirme ile kısa döngülerde ilerliyoruz; böylece erken geri bildirim alıp yönü birlikte ayarlayabiliyoruz. Teslim sonrası destek ve bakım da hizmet kapsamımızda.",
  },
  {
    question: "Küçük işletmeler için uygun mu?",
    answer:
      "Evet. Ölçeklenebilir modüller ve ihtiyaca göre paketler sunuyoruz. Küçük bir e-ticaret sitesi veya tek bir AI asistanı ile başlayıp, büyüdükçe entegrasyonları ve özellikleri genişletebilirsiniz.",
  },
];

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="neden-biz"
      className="why-us-section relative py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="why-us-title mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Neden Biz?
        </h2>
        <p className="why-us-subtitle mx-auto mb-12 max-w-xl text-center text-[15px] leading-relaxed opacity-80">
          Merak ettiğiniz soruların cevapları
        </p>

        <div className="space-y-2">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="why-us-item overflow-hidden rounded-xl border transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-4 px-5 text-left transition-colors hover:opacity-90 sm:py-5 sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="why-us-question font-semibold leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`why-us-chevron flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div
                  className="why-us-answer-wrapper grid transition-[grid-template-rows] duration-200 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="why-us-answer border-t pb-4 pt-0 px-5 sm:pb-5 sm:px-6">
                      <p className="text-sm leading-relaxed opacity-90 sm:text-[15px]">
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
    </section>
  );
}
