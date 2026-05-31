/**
 * iyzico sandbox test kartları
 * @see https://docs.iyzico.com/ek-bilgiler/test-kartlari
 */

export type IyzicoTestCardCategory = "success" | "foreign" | "error";

export type IyzicoTestCard = {
  cardNumber: string;
  category: IyzicoTestCardCategory;
  bank?: string;
  cardAssociation?: string;
  cardType?: string;
  country?: string;
  description?: string;
};

export const IYZICO_TEST_CARD_CATEGORY_LABELS: Record<IyzicoTestCardCategory, string> =
  {
    success: "Başarılı Yanıt Veren Kartlar",
    foreign: "Yabancı Kartlar",
    error: "Hata Üreten Kartlar",
  };

export const IYZICO_TEST_CARDS: IyzicoTestCard[] = [
  {
    cardNumber: "5890040000000016",
    category: "success",
    bank: "Akbank",
    cardAssociation: "Master Card",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "5526080000000006",
    category: "success",
    bank: "Akbank",
    cardAssociation: "Master Card",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "9792072000017956",
    category: "success",
    bank: "Akbank",
    cardAssociation: "Troy",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "4766620000000001",
    category: "success",
    bank: "Denizbank",
    cardAssociation: "Visa",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "4603450000000000",
    category: "success",
    bank: "Denizbank",
    cardAssociation: "Visa",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "9792023757123604",
    category: "success",
    bank: "QNB",
    cardAssociation: "Troy",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "4987490000000002",
    category: "success",
    bank: "QNB",
    cardAssociation: "Visa",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "5311570000000005",
    category: "success",
    bank: "QNB",
    cardAssociation: "Master Card",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "9792020000000001",
    category: "success",
    bank: "QNB",
    cardAssociation: "Troy",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "9792030000000000",
    category: "success",
    bank: "QNB",
    cardAssociation: "Troy",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "5170410000000004",
    category: "success",
    bank: "Garanti Bankası",
    cardAssociation: "Master Card",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "5400360000000003",
    category: "success",
    bank: "Garanti Bankası",
    cardAssociation: "Master Card",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "374427000000003",
    category: "success",
    bank: "Garanti Bankası",
    cardAssociation: "American Express",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "4475050000000003",
    category: "success",
    bank: "Halkbank",
    cardAssociation: "Visa",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "5528790000000008",
    category: "success",
    bank: "Halkbank",
    cardAssociation: "Master Card",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "4059030000000009",
    category: "success",
    bank: "HSBC Bank",
    cardAssociation: "Visa",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "5504720000000003",
    category: "success",
    bank: "HSBC Bank",
    cardAssociation: "Master Card",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "5892830000000000",
    category: "success",
    bank: "Türkiye İş Bankası",
    cardAssociation: "Master Card",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "4543590000000006",
    category: "success",
    bank: "Türkiye İş Bankası",
    cardAssociation: "Visa",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "4910050000000006",
    category: "success",
    bank: "Vakıfbank",
    cardAssociation: "Visa",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "4157920000000002",
    category: "success",
    bank: "Vakıfbank",
    cardAssociation: "Visa",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "6500528865390837",
    category: "success",
    bank: "Vakıfbank",
    cardAssociation: "Troy",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "6501700194147183",
    category: "success",
    bank: "Vakıfbank",
    cardAssociation: "Troy",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "5168880000000002",
    category: "success",
    bank: "Yapı ve Kredi Bankası",
    cardAssociation: "Master Card",
    cardType: "Banka Kartı (Debit)",
  },
  {
    cardNumber: "5451030000000000",
    category: "success",
    bank: "Yapı ve Kredi Bankası",
    cardAssociation: "Master Card",
    cardType: "Kredi Kartı (Credit)",
  },
  {
    cardNumber: "5400010000000004",
    category: "foreign",
    country: "Non-Turkish",
    cardType: "Credit",
  },
  {
    cardNumber: "4054180000000007",
    category: "foreign",
    country: "Non-Turkish",
    cardType: "Debit",
  },
  {
    cardNumber: "5406670000000009",
    category: "error",
    description: "Success but cannot be cancelled, refund or post auth",
  },
  {
    cardNumber: "4111111111111129",
    category: "error",
    description: "Not sufficient funds",
  },
  {
    cardNumber: "4129111111111111",
    category: "error",
    description: "Do not honour",
  },
  {
    cardNumber: "4128111111111112",
    category: "error",
    description: "Invalid transaction",
  },
  {
    cardNumber: "4127111111111113",
    category: "error",
    description: "Lost card",
  },
  {
    cardNumber: "4126111111111114",
    category: "error",
    description: "Stolen card",
  },
  {
    cardNumber: "4125111111111115",
    category: "error",
    description: "Expired card",
  },
  {
    cardNumber: "4124111111111116",
    category: "error",
    description: "Invalid cvc2",
  },
  {
    cardNumber: "4123111111111117",
    category: "error",
    description: "Not permitted to card holder",
  },
  {
    cardNumber: "4122111111111118",
    category: "error",
    description: "Not permitted to terminal",
  },
  {
    cardNumber: "4121111111111119",
    category: "error",
    description: "Fraud suspect",
  },
  {
    cardNumber: "4120111111111110",
    category: "error",
    description: "Pickup card",
  },
  {
    cardNumber: "4130111111111118",
    category: "error",
    description: "General error",
  },
  {
    cardNumber: "4131111111111117",
    category: "error",
    description: "Success but mdStatus is 0",
  },
  {
    cardNumber: "4141111111111115",
    category: "error",
    description: "Success but mdStatus is 4",
  },
  {
    cardNumber: "4151111111111112",
    category: "error",
    description: "3dsecure initialize failed",
  },
];

export const DEFAULT_IYZICO_TEST_CARD =
  IYZICO_TEST_CARDS.find((card) => card.cardNumber === "5526080000000006") ??
  IYZICO_TEST_CARDS[0];

export function formatIyzicoTestCardLabel(card: IyzicoTestCard): string {
  const parts = [card.cardNumber];

  if (card.bank) {
    parts.push(card.bank);
  }

  if (card.country) {
    parts.push(card.country);
  }

  if (card.cardAssociation) {
    parts.push(card.cardAssociation);
  }

  if (card.cardType) {
    parts.push(card.cardType);
  }

  if (card.description) {
    parts.push(card.description);
  }

  return parts.join(" · ");
}

export function getIyzicoTestCardsByCategory(category: IyzicoTestCardCategory) {
  return IYZICO_TEST_CARDS.filter((card) => card.category === category);
}
