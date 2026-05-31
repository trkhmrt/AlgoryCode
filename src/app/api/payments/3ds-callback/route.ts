import { NextResponse } from "next/server";
import { verifyCallbackSignature } from "iyzico-js";
import {
  getIyzicoClient,
} from "@/lib/iyzico/client";
import { getPublicPaymentErrorMessage, isLimitError } from "@/lib/iyzico/errors";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CallbackFields = {
  conversationData: string;
  conversationId: string;
  mdStatus: string;
  paymentId: string;
  status: string;
  signature: string;
};

function parseCallbackFields(formData: FormData): CallbackFields {
  return {
    conversationData: String(formData.get("conversationData") ?? ""),
    conversationId: String(formData.get("conversationId") ?? ""),
    mdStatus: String(formData.get("mdStatus") ?? ""),
    paymentId: String(formData.get("paymentId") ?? ""),
    status: String(formData.get("status") ?? ""),
    signature: String(formData.get("signature") ?? ""),
  };
}

function redirectToFailed(
  origin: string,
  slug: string,
  paymentId: string,
  limit = false,
) {
  const limitParam = limit ? "&limit=1" : "";
  return NextResponse.redirect(
    new URL(
      `/education/${slug}/payment/failed?paymentId=${paymentId}${limitParam}`,
      origin,
    ),
    303,
  );
}

function redirectToSuccess(origin: string, slug: string, paymentId: string) {
  return NextResponse.redirect(
    new URL(
      `/education/${slug}/payment/success?paymentId=${paymentId}`,
      origin,
    ),
    303,
  );
}

async function markPaymentFailed(
  paymentId: string,
  data: {
    failureCode?: string | null;
    failureMessage?: string | null;
    isLimitError?: boolean;
    iyzicoRawResponse?: object;
  },
) {
  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: "FAILED",
      failureCode: data.failureCode ?? null,
      failureMessage: data.failureMessage ?? null,
      isLimitError: data.isLimitError ?? false,
      iyzicoRawResponse: data.iyzicoRawResponse,
    },
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const localPaymentId = url.searchParams.get("paymentId");

  if (!localPaymentId) {
    return NextResponse.json({ error: "Ödeme bulunamadı." }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({
    where: { id: localPaymentId },
    include: { education: true },
  });

  if (!payment || payment.status !== "PENDING") {
    return NextResponse.json({ error: "Geçersiz ödeme kaydı." }, { status: 400 });
  }

  const formData = await request.formData();
  const callback = parseCallbackFields(formData);
  const secretKey = process.env.IYZICO_SECRET_KEY;

  if (secretKey && callback.signature) {
    const valid = await verifyCallbackSignature(secretKey, callback);
    if (!valid) {
      await markPaymentFailed(localPaymentId, {
        failureMessage: "3DS doğrulama imzası geçersiz.",
      });
      return redirectToFailed(origin, payment.education.slug, localPaymentId);
    }
  }

  if (callback.mdStatus !== "1" || callback.status !== "success") {
    await markPaymentFailed(localPaymentId, {
      failureMessage: "3D Secure doğrulaması tamamlanamadı.",
      iyzicoRawResponse: callback as object,
    });
    return redirectToFailed(origin, payment.education.slug, localPaymentId);
  }

  const client = getIyzicoClient();

  try {
    const result = await client.payment.threeds.create({
      locale: "tr",
      conversationId: payment.conversationId,
      paymentId: callback.paymentId,
      conversationData: callback.conversationData || undefined,
    });

    if (result.status === "success") {
      await prisma.payment.update({
        where: { id: localPaymentId },
        data: {
          status: "SUCCESS",
          iyzicoPaymentId: result.paymentId ?? callback.paymentId,
          iyzicoPaymentTransactionId:
            result.itemTransactions?.[0]?.paymentTransactionId ?? null,
          cardFamily: result.cardFamily ?? undefined,
          cardAssociation: result.cardAssociation ?? undefined,
          cardType: result.cardType ?? undefined,
          binNumber: result.binNumber ?? payment.binNumber,
          lastFourDigits: result.lastFourDigits ?? payment.lastFourDigits,
          iyzicoRawResponse: result as object,
        },
      });

      return redirectToSuccess(origin, payment.education.slug, localPaymentId);
    }

    const limitError = isLimitError(
      result.errorCode,
      result.errorMessage,
      result.errorGroup,
    );

    await markPaymentFailed(localPaymentId, {
      failureCode: result.errorCode ?? null,
      failureMessage: result.errorMessage ?? null,
      isLimitError: limitError,
      iyzicoRawResponse: result as object,
    });

    return redirectToFailed(
      origin,
      payment.education.slug,
      localPaymentId,
      limitError,
    );
  } catch (error) {
    await markPaymentFailed(localPaymentId, {
      failureMessage: error instanceof Error ? error.message : "Bilinmeyen hata",
    });
    return redirectToFailed(origin, payment.education.slug, localPaymentId);
  }
}
