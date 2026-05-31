import type { EducationStatus } from "@/lib/education";

export const PAYMENT_STATUS_LABELS = {
  PENDING: "Bekliyor",
  SUCCESS: "Başarılı",
  FAILED: "Başarısız",
} as const;

export type PaymentStatus = keyof typeof PAYMENT_STATUS_LABELS;

export type PaymentProvider = "IYZICO" | "FREE";

export type DecimalValue = { toString(): string };

export type PaymentInstallmentSummary = {
  installment: number;
  installmentAmount: DecimalValue | null;
  paidPrice: DecimalValue;
  currency: string;
};

export type PaymentWhereInput = {
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  educationId?: string;
  status?: PaymentStatus;
  provider?: PaymentProvider;
  installment?: {
    lte?: number;
    gt?: number;
  };
};

export type PaymentDashboardItem = PaymentInstallmentSummary & {
  id: string;
  buyerName: string;
  buyerSurname: string;
  status: PaymentStatus;
  createdAt: Date;
  education: { title: string };
};

export type PaymentListItem = PaymentInstallmentSummary & {
  id: string;
  buyerName: string;
  buyerSurname: string;
  buyerEmail: string;
  status: PaymentStatus;
  createdAt: Date;
  binNumber: string | null;
  lastFourDigits: string | null;
  education: { title: string; slug: string };
};

export type PaymentDetailRecord = PaymentInstallmentSummary & {
  id: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  createdAt: Date;
  price: DecimalValue;
  iyzicoPaymentId: string | null;
  conversationId: string;
  buyerName: string;
  buyerSurname: string;
  buyerEmail: string;
  buyerPhone: string | null;
  buyerIdentityNumber: string;
  binNumber: string | null;
  lastFourDigits: string | null;
  cardBankName: string | null;
  cardFamily: string | null;
  cardAssociation: string | null;
  isLimitError: boolean;
  failureCode: string | null;
  failureMessage: string | null;
  iyzicoRawResponse: unknown;
  education: { title: string; slug: string };
};

export type PaymentStatusGroupRow = {
  status: PaymentStatus;
  _count: { _all: number };
  _sum: { paidPrice: DecimalValue | null };
};

export type PaymentGroupByRow = {
  educationId: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  _count: { _all: number };
  _sum: { paidPrice: DecimalValue | null };
};

export type PaymentReportEducationRow = {
  id: string;
  title: string;
  slug: string;
  status: EducationStatus;
  isFree: boolean;
  price: DecimalValue | null;
  currency: string;
};

export type PaymentSuccessReportRow = {
  createdAt: Date;
  paidPrice: DecimalValue;
  currency: string;
  installment: number;
};

export type PaymentConversationRecord = {
  id: string;
  conversationId: string;
};

export type PaymentReceiptRecord = PaymentInstallmentSummary & {
  provider: PaymentProvider;
  status: PaymentStatus;
  buyerEmail: string;
  education: { title: string };
};

export type ReportEducationOption = {
  id: string;
  title: string;
};

export function formatPaymentAmount(
  amount: DecimalValue | number,
  currency = "TRY",
): string {
  const value = Number(amount.toString());

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatInstallmentSummary(
  payment: PaymentInstallmentSummary,
): string {
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
