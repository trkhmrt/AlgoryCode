const LIMIT_ERROR_CODES = new Set(["10051"]);
const LIMIT_ERROR_GROUPS = new Set(["NOT_SUFFICIENT_FUNDS"]);
const LIMIT_KEYWORDS = ["limit", "yetersiz", "insufficient", "not sufficient"];

export function isLimitError(
  errorCode?: string | null,
  errorMessage?: string | null,
  errorGroup?: string | null,
): boolean {
  if (errorCode && LIMIT_ERROR_CODES.has(errorCode)) {
    return true;
  }

  if (errorGroup && LIMIT_ERROR_GROUPS.has(errorGroup)) {
    return true;
  }

  const normalized = (errorMessage ?? "").toLowerCase();
  return LIMIT_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export function getPublicPaymentErrorMessage(isLimit: boolean): string {
  if (isLimit) {
    return "Kart limitiniz yetersiz. Lütfen farklı bir kart deneyin veya bankanızla iletişime geçin.";
  }

  return "Ödeme başarısız. Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.";
}

export const GENERIC_PAYMENT_FAILURE = getPublicPaymentErrorMessage(false);
