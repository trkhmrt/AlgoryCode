import { NextResponse } from "next/server";
import { queryInstallmentOptions } from "@/lib/iyzico/installments";
import { getEducationCheckoutPrice } from "@/lib/iyzico/checkout";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      slug?: string;
      binNumber?: string;
    };

    const slug = body.slug?.trim();
    const binNumber = body.binNumber?.trim();

    if (!slug || !binNumber) {
      return NextResponse.json(
        { error: "Eğitim ve kart bilgisi gerekli." },
        { status: 400 },
      );
    }

    const education = await prisma.education.findFirst({
      where: { slug, status: "PUBLISHED", isFree: false },
    });

    if (!education) {
      return NextResponse.json({ error: "Eğitim bulunamadı." }, { status: 404 });
    }

    const price = getEducationCheckoutPrice(education);

    if (price <= 0) {
      return NextResponse.json({ error: "Geçersiz fiyat." }, { status: 400 });
    }

    const installmentData = await queryInstallmentOptions(binNumber, price);

    return NextResponse.json(installmentData);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Taksit bilgisi alınamadı.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
