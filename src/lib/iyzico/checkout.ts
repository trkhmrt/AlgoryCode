import "server-only";

import { headers } from "next/headers";
import type { EducationCheckoutRecord } from "@/lib/education";
import { getAppBaseUrl } from "@/lib/app-url";
import type { PaymentConversationRecord } from "@/lib/payments";
import {
  createConversationId,
  formatIyzicoPrice,
  getIyzicoClient,
} from "@/lib/iyzico/client";
import { findInstallmentOption, type InstallmentOption } from "@/lib/iyzico/installments";
import { getPublicPaymentErrorMessage, isLimitError } from "@/lib/iyzico/errors";
import { prisma } from "@/lib/prisma";
import { sendEducationEnrollmentEmails } from "@/lib/mail-api";

export type CheckoutBuyerInput = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  identityNumber: string;
};

export type CheckoutCardInput = {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
};

export type ProcessPaymentInput = {
  education: EducationCheckoutRecord;
  buyer: CheckoutBuyerInput;
  card: CheckoutCardInput;
  installmentNumber: number;
  installmentOptions: InstallmentOption[];
  use3ds?: boolean;
};

export type ProcessPaymentResult =
  | { success: true; paymentId: string; redirectUrl: string }
  | { success: true; paymentId: string; requires3ds: true; threeDSHtmlContent: string }
  | { success: false; message: string; isLimitError: boolean; paymentId?: string };

export type FreeEnrollmentResult =
  | { success: true; paymentId: string; redirectUrl: string }
  | { success: false; message: string };

async function getClientIp(): Promise<string> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "127.0.0.1";
}

function sanitizeCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\D/g, "");
}

function getEducationPrice(education: EducationCheckoutRecord): number {
  if (education.isFree || !education.price) {
    return 0;
  }

  return Number(education.price.toString());
}

function formatExpireYear(expireYear: string): string {
  return expireYear.length === 2 ? `20${expireYear}` : expireYear;
}

function buildIyzicoPaymentRequest(input: {
  education: EducationCheckoutRecord;
  buyer: CheckoutBuyerInput;
  card: CheckoutCardInput;
  paymentRecord: PaymentConversationRecord;
  selectedInstallment: InstallmentOption;
  priceString: string;
  paidPriceString: string;
  cardNumber: string;
  clientIp: string;
}) {
  return {
    locale: "tr" as const,
    conversationId: input.paymentRecord.conversationId,
    price: input.priceString,
    paidPrice: input.paidPriceString,
    currency: "TRY" as const,
    installment: input.selectedInstallment.installmentNumber as
      | 1
      | 2
      | 3
      | 4
      | 6
      | 9
      | 12,
    basketId: input.education.id,
    paymentChannel: "WEB" as const,
    paymentGroup: "PRODUCT" as const,
    paymentCard: {
      cardHolderName: input.card.cardHolderName,
      cardNumber: input.cardNumber,
      expireMonth: input.card.expireMonth.padStart(2, "0"),
      expireYear: formatExpireYear(input.card.expireYear),
      cvc: input.card.cvc,
      registerCard: 0 as const,
    },
    buyer: {
      id: input.paymentRecord.id,
      name: input.buyer.name,
      surname: input.buyer.surname,
      gsmNumber: input.buyer.phone,
      email: input.buyer.email,
      identityNumber: input.buyer.identityNumber,
      registrationAddress: "Türkiye",
      ip: input.clientIp,
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34000",
    },
    shippingAddress: {
      contactName: `${input.buyer.name} ${input.buyer.surname}`,
      city: "Istanbul",
      country: "Turkey",
      address: "Türkiye",
      zipCode: "34000",
    },
    billingAddress: {
      contactName: `${input.buyer.name} ${input.buyer.surname}`,
      city: "Istanbul",
      country: "Turkey",
      address: "Türkiye",
      zipCode: "34000",
    },
    basketItems: [
      {
        id: input.education.id,
        name: input.education.title.slice(0, 100),
        category1: "Eğitim",
        category2: "Online Eğitim",
        itemType: "VIRTUAL" as const,
        price: input.priceString,
      },
    ],
  };
}

export async function processIyzicoPayment(
  input: ProcessPaymentInput,
): Promise<ProcessPaymentResult> {
  const price = getEducationPrice(input.education);

  if (price <= 0) {
    return { success: false, message: "Geçersiz eğitim fiyatı.", isLimitError: false };
  }

  const selectedInstallment = findInstallmentOption(
    input.installmentOptions,
    input.installmentNumber,
  );

  if (!selectedInstallment) {
    return {
      success: false,
      message: "Seçilen taksit geçersiz.",
      isLimitError: false,
    };
  }

  const conversationId = createConversationId();
  const priceString = formatIyzicoPrice(price);
  const paidPriceString = formatIyzicoPrice(selectedInstallment.totalPrice);
  const cardNumber = sanitizeCardNumber(input.card.cardNumber);
  const binNumber = cardNumber.slice(0, 6);
  const lastFourDigits = cardNumber.slice(-4);
  const clientIp = await getClientIp();
  const installmentRate =
    selectedInstallment.installmentNumber > 1
      ? Number(
          (
            ((selectedInstallment.totalPrice - price) / price) *
            100
          ).toFixed(2),
        )
      : null;

  const paymentRecord = await prisma.payment.create({
    data: {
      educationId: input.education.id,
      conversationId,
      provider: "IYZICO",
      status: "PENDING",
      buyerName: input.buyer.name,
      buyerSurname: input.buyer.surname,
      buyerEmail: input.buyer.email,
      buyerPhone: input.buyer.phone,
      buyerIdentityNumber: input.buyer.identityNumber,
      price,
      paidPrice: selectedInstallment.totalPrice,
      currency: input.education.currency,
      installment: selectedInstallment.installmentNumber,
      installmentRate,
      installmentAmount: selectedInstallment.installmentPrice,
      binNumber,
      lastFourDigits,
    },
  });

  const client = getIyzicoClient();
  const baseUrl = await getAppBaseUrl();
  const paymentRequestBase = {
    education: input.education,
    buyer: input.buyer,
    card: input.card,
    paymentRecord,
    selectedInstallment,
    priceString,
    paidPriceString,
    cardNumber,
    clientIp,
  };

  try {
    if (input.use3ds) {
      const initResult = await client.payment.threeds.initialize({
        ...buildIyzicoPaymentRequest(paymentRequestBase),
        callbackUrl: `${baseUrl}/api/payments/3ds-callback?paymentId=${paymentRecord.id}`,
      });

      if (
        initResult.status === "success" &&
        initResult.threeDSHtmlContent
      ) {
        await prisma.payment.update({
          where: { id: paymentRecord.id },
          data: {
            iyzicoPaymentId: initResult.paymentId ?? null,
            iyzicoRawResponse: initResult as object,
          },
        });

        return {
          success: true,
          paymentId: paymentRecord.id,
          requires3ds: true,
          threeDSHtmlContent: initResult.threeDSHtmlContent,
        };
      }

      const failureResult = initResult.status === "failure" ? initResult : null;
      const limitError = isLimitError(
        failureResult?.errorCode,
        failureResult?.errorMessage,
        failureResult?.errorGroup,
      );

      await prisma.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: "FAILED",
          failureCode: failureResult?.errorCode ?? null,
          failureMessage:
            failureResult?.errorMessage ??
            (initResult.status === "success"
              ? "3D Secure sayfası oluşturulamadı."
              : null),
          isLimitError: limitError,
          iyzicoRawResponse: initResult as object,
        },
      });

      return {
        success: false,
        message: getPublicPaymentErrorMessage(limitError),
        isLimitError: limitError,
        paymentId: paymentRecord.id,
      };
    }

    const result = await client.payment.create(
      buildIyzicoPaymentRequest(paymentRequestBase),
    );

    if (result.status === "success") {
      await prisma.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: "SUCCESS",
          iyzicoPaymentId: result.paymentId ?? null,
          iyzicoPaymentTransactionId:
            result.itemTransactions?.[0]?.paymentTransactionId ?? null,
          cardFamily: result.cardFamily ?? undefined,
          cardAssociation: result.cardAssociation ?? undefined,
          cardType: result.cardType ?? undefined,
          binNumber: result.binNumber ?? binNumber,
          lastFourDigits: result.lastFourDigits ?? lastFourDigits,
          iyzicoRawResponse: result as object,
        },
      });

      await sendEducationEnrollmentEmails({
        buyerEmail: input.buyer.email,
        buyerName: input.buyer.name,
        buyerSurname: input.buyer.surname,
        educationId: input.education.id,
        educationTitle: input.education.title,
        currency: input.education.currency,
        price,
        paidPrice: selectedInstallment.totalPrice,
        conversationId: paymentRecord.conversationId,
        paymentId: paymentRecord.id,
        isFree: false,
      });

      return {
        success: true,
        paymentId: paymentRecord.id,
        redirectUrl: `/education/${input.education.slug}/payment/success?paymentId=${paymentRecord.id}`,
      };
    }

    const limitError = isLimitError(
      result.errorCode,
      result.errorMessage,
      result.errorGroup,
    );

    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: "FAILED",
        failureCode: result.errorCode ?? null,
        failureMessage: result.errorMessage ?? null,
        isLimitError: limitError,
        iyzicoRawResponse: result as object,
      },
    });

    return {
      success: false,
      message: getPublicPaymentErrorMessage(limitError),
      isLimitError: limitError,
      paymentId: paymentRecord.id,
    };
  } catch (error) {
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: "FAILED",
        failureMessage: error instanceof Error ? error.message : "Bilinmeyen hata",
        isLimitError: false,
      },
    });

    return {
      success: false,
      message: getPublicPaymentErrorMessage(false),
      isLimitError: false,
      paymentId: paymentRecord.id,
    };
  }
}

export async function processFreeEnrollment(input: {
  education: EducationCheckoutRecord;
  buyer: CheckoutBuyerInput;
}): Promise<FreeEnrollmentResult> {
  const paymentRecord = await prisma.payment.create({
    data: {
      educationId: input.education.id,
      conversationId: createConversationId(),
      provider: "FREE",
      status: "SUCCESS",
      buyerName: input.buyer.name,
      buyerSurname: input.buyer.surname,
      buyerEmail: input.buyer.email,
      buyerPhone: input.buyer.phone,
      buyerIdentityNumber: input.buyer.identityNumber,
      price: 0,
      paidPrice: 0,
      currency: input.education.currency,
      installment: 1,
    },
  });

  await sendEducationEnrollmentEmails({
    buyerEmail: input.buyer.email,
    buyerName: input.buyer.name,
    buyerSurname: input.buyer.surname,
    educationId: input.education.id,
    educationTitle: input.education.title,
    currency: input.education.currency,
    price: 0,
    paidPrice: 0,
    conversationId: paymentRecord.conversationId,
    paymentId: paymentRecord.id,
    isFree: true,
  });

  return {
    success: true,
    paymentId: paymentRecord.id,
    redirectUrl: `/education/${input.education.slug}/payment/success?paymentId=${paymentRecord.id}`,
  };
}

export function getEducationCheckoutPrice(
  education: EducationCheckoutRecord,
): number {
  return getEducationPrice(education);
}
