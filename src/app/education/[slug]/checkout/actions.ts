"use server";

import { redirect } from "next/navigation";
import {
  processFreeEnrollment,
  processIyzicoPayment,
  getEducationCheckoutPrice,
  type CheckoutBuyerInput,
  type CheckoutCardInput,
} from "@/lib/iyzico/checkout";
import {
  findInstallmentOption,
  queryInstallmentOptions,
  type InstallmentOption,
} from "@/lib/iyzico/installments";
import { prisma } from "@/lib/prisma";

export type CheckoutState = {
  error?: string;
  isLimitError?: boolean;
  threeDSHtmlContent?: string;
};

function parseBuyer(formData: FormData): CheckoutBuyerInput | null {
  const name = String(formData.get("name") ?? "").trim();
  const surname = String(formData.get("surname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const identityNumber = String(formData.get("identityNumber") ?? "").trim();

  if (!name || !surname || !email || !phone || !identityNumber) {
    return null;
  }

  return { name, surname, email, phone, identityNumber };
}

function parseCard(formData: FormData): CheckoutCardInput | null {
  const cardHolderName = String(formData.get("cardHolderName") ?? "").trim();
  const cardNumber = String(formData.get("cardNumber") ?? "").trim();
  const expireMonth = String(formData.get("expireMonth") ?? "").trim();
  const expireYear = String(formData.get("expireYear") ?? "").trim();
  const cvc = String(formData.get("cvc") ?? "").trim();

  if (!cardHolderName || !cardNumber || !expireMonth || !expireYear || !cvc) {
    return null;
  }

  return { cardHolderName, cardNumber, expireMonth, expireYear, cvc };
}

export async function submitCheckout(
  slug: string,
  _prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const education = await prisma.education.findFirst({
    where: { slug, status: "PUBLISHED" },
  });

  if (!education) {
    return { error: "Eğitim bulunamadı." };
  }

  const buyer = parseBuyer(formData);

  if (!buyer) {
    return { error: "Lütfen tüm alıcı bilgilerini doldurun." };
  }

  if (formData.get("kvkkAccepted") !== "on") {
    return {
      error:
        "Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekir.",
    };
  }

  if (education.isFree) {
    const result = await processFreeEnrollment({ education, buyer });
    if (result.success) {
      redirect(result.redirectUrl);
    }
    return { error: result.message };
  }

  const card = parseCard(formData);

  if (!card) {
    return { error: "Lütfen kart bilgilerini eksiksiz girin." };
  }

  const installmentNumber = Number(formData.get("installmentNumber") ?? 1);
  const use3ds = formData.get("use3ds") === "on";

  if (!Number.isFinite(installmentNumber) || installmentNumber < 1) {
    return { error: "Geçerli bir taksit seçeneği seçin." };
  }

  const price = getEducationCheckoutPrice(education);
  let installmentOptions: InstallmentOption[];

  try {
    const installmentData = await queryInstallmentOptions(card.cardNumber, price);
    installmentOptions = installmentData.options;
  } catch {
    return { error: "Taksit seçenekleri doğrulanamadı. Kart numaranızı kontrol edin." };
  }

  if (!findInstallmentOption(installmentOptions, installmentNumber)) {
    return { error: "Seçilen taksit geçersiz." };
  }

  const result = await processIyzicoPayment({
    education,
    buyer,
    card,
    installmentNumber,
    installmentOptions,
    use3ds,
  });

  if (result.success) {
    if ("requires3ds" in result && result.requires3ds) {
      return { threeDSHtmlContent: result.threeDSHtmlContent };
    }

    if ("redirectUrl" in result) {
      redirect(result.redirectUrl);
    }
  }

  if (!result.success) {
    if (result.paymentId) {
      redirect(
        `/education/${slug}/payment/failed?paymentId=${result.paymentId}&limit=${result.isLimitError ? "1" : "0"}`,
      );
    }

    return {
      error: result.message,
      isLimitError: result.isLimitError,
    };
  }

  return { error: "Ödeme işlemi tamamlanamadı." };
}
