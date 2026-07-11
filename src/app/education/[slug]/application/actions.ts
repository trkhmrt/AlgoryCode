"use server";

import { revalidatePath } from "next/cache";
import {
  isValidPhone,
  normalizePhone,
} from "@/lib/contact";
import { sendEducationApplicationNotifications } from "@/lib/push-notification-service";
import { prisma } from "@/lib/prisma";

export type EducationApplicationFormState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

function parseApplicationFields(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));

  const fieldErrors: Record<string, string> = {};

  if (!firstName) {
    fieldErrors.firstName = "Ad zorunludur.";
  }

  if (!lastName) {
    fieldErrors.lastName = "Soyad zorunludur.";
  }

  if (!email) {
    fieldErrors.email = "E-posta zorunludur.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    fieldErrors.email = "Geçerli bir e-posta girin.";
  }

  if (!phone) {
    fieldErrors.phone = "Telefon zorunludur.";
  } else if (!isValidPhone(phone)) {
    fieldErrors.phone = "Geçerli bir telefon numarası girin.";
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      phone,
    },
    fieldErrors,
  };
}

export async function submitEducationApplication(
  educationId: string,
  _prevState: EducationApplicationFormState,
  formData: FormData,
): Promise<EducationApplicationFormState> {
  const { data, fieldErrors } = parseApplicationFields(formData);

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const education = await prisma.education.findFirst({
    where: { id: educationId, status: "PUBLISHED" },
    select: { id: true, slug: true, title: true },
  });

  if (!education) {
    return { error: "Eğitim bulunamadı." };
  }

  await prisma.contactSubmission.create({
    data: {
      type: "EDUCATION",
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      message: `Eğitim başvurusu: ${education.title}`,
      educationId: education.id,
      source: `/education/${education.slug}`,
    },
  });

  await sendEducationApplicationNotifications({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    educationTitle: education.title,
    educationSlug: education.slug,
  });

  revalidatePath("/admin/contacts");

  return {
    success:
      "Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
  };
}
