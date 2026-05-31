import type { Payment, PaymentStatus } from "@prisma/client";

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: "Bekliyor",
  SUCCESS: "Başarılı",
  FAILED: "Başarısız",
};

export function formatPaymentAmount(
  amount: { toString(): string },
  currency = "TRY",
): string {
  const value = Number(amount.toString());

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatInstallmentSummary(payment: Payment): string {
  if (payment.installment <= 1) {
    return "Tek çekim (nakit)";
  }

  const perInstallment = payment.installmentAmount
    ? formatPaymentAmount(payment.installmentAmount, payment.currency)
    : "-";

  return `${payment.installment} taksit · ${perInstallment}/ay · Toplam ${formatPaymentAmount(payment.paidPrice, payment.currency)}`;
}

export function maskCard(binNumber?: string | null, lastFour?: string | null): string {
  if (!lastFour) {
    return "—";
  }

  const prefix = binNumber ? `${binNumber.slice(0, 4)} **` : "****";
  return `${prefix} **** ${lastFour}`;
}

export function formatDateTimeTR(date: Date): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
