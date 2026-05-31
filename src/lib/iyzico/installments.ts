import "server-only";

import {
  createConversationId,
  formatIyzicoPrice,
  getIyzicoClient,
} from "@/lib/iyzico/client";

export type InstallmentOption = {
  installmentNumber: number;
  installmentPrice: number;
  totalPrice: number;
  label: string;
};

export type InstallmentQueryResult = {
  binNumber: string;
  cardAssociation?: string;
  cardFamily?: string;
  cardBankName?: string;
  cardType?: string;
  options: InstallmentOption[];
};

function formatOptionLabel(option: {
  installmentNumber: number;
  installmentPrice: number;
  totalPrice: number;
}): string {
  if (option.installmentNumber === 1) {
    return `Tek Çekim — ${option.totalPrice.toFixed(2)} TRY`;
  }

  return `${option.installmentNumber} Taksit — ${option.installmentPrice.toFixed(2)} TRY x ${option.installmentNumber} (Toplam ${option.totalPrice.toFixed(2)} TRY)`;
}

export async function queryInstallmentOptions(
  binNumber: string,
  price: number,
): Promise<InstallmentQueryResult> {
  const client = getIyzicoClient();
  const normalizedBin = binNumber.replace(/\D/g, "").slice(0, 6);

  if (normalizedBin.length < 6) {
    throw new Error("Taksit sorgusu için kart numarasının ilk 6 hanesi gerekli.");
  }

  const result = await client.installment.query({
    locale: "tr",
    conversationId: createConversationId(),
    binNumber: normalizedBin,
    price: formatIyzicoPrice(price),
  });

  if (result.status !== "success" || !result.installmentDetails?.length) {
    const message =
      result.status === "failure"
        ? result.errorMessage
        : "Taksit seçenekleri alınamadı.";
    throw new Error(message);
  }

  const detail = result.installmentDetails[0];
  const options = (detail.installmentPrices ?? [])
    .slice()
    .sort((a, b) => a.installmentNumber - b.installmentNumber)
    .map((option) => ({
      installmentNumber: option.installmentNumber,
      installmentPrice: option.installmentPrice,
      totalPrice: option.totalPrice,
      label: formatOptionLabel(option),
    }));

  return {
    binNumber: normalizedBin,
    cardAssociation: detail.cardAssociation,
    cardFamily: detail.cardFamilyName,
    cardBankName: detail.bankName,
    cardType: detail.cardType,
    options,
  };
}

export function findInstallmentOption(
  options: InstallmentOption[],
  installmentNumber: number,
): InstallmentOption | undefined {
  return options.find((option) => option.installmentNumber === installmentNumber);
}
