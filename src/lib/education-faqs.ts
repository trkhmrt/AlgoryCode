export type EducationFaqItem = {
  question: string;
  answer: string;
};

export const EDUCATION_FAQS: EducationFaqItem[] = [
  {
    question: "Eğitimler canlı mı yoksa kayıtlı mı?",
    answer:
      "Format eğitime göre değişir. Her eğitimin detay sayfasında Canlı, Online veya Hibrit bilgisi yer alır. Kayıtlı içerikler varsa erişim süresi eğitim açıklamasında belirtilir.",
  },
  {
    question: "Kimler katılabilir?",
    answer:
      "Seviye bilgisi eğitim kartında ve detay sayfasında belirtilir. Gereksinimler sekmesinden ön koşulları inceleyebilirsiniz.",
  },
  {
    question: "Ödeme ve iade nasıl işliyor?",
    answer:
      "Ücretli eğitimlerde güvenli ödeme ile kayıt tamamlanır. İade koşulları satın alma sırasında ve eğitim koşullarında paylaşılır.",
  },
  {
    question: "Eğitmene soru sorabilir miyim?",
    answer:
      "Evet. Sayfanın altındaki form üzerinden eğitmene doğrudan soru gönderebilirsiniz. Ortalama yanıt süresi 2–4 saattir.",
  },
  {
    question: "Sertifika veriliyor mu?",
    answer:
      "Sertifika durumu eğitime göre değişir. Varsa detay sayfasında ve eğitim özetinde belirtilir.",
  },
];
