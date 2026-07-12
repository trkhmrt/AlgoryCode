"use server";

import { revalidatePath } from "next/cache";
import {
  isValidPhone,
  normalizePhone,
} from "@/lib/contact";
import { KVKK_CONSENT_ERROR } from "@/lib/kvkk";
import {
  notifyAdminAboutContactForm,
  sendContactConfirmationToUser,
} from "@/lib/mail-api";
import { prisma } from "@/lib/prisma";

export type ContactFormState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

const initialFieldErrors = (): Record<string, string> => ({});

function parseContactFields(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const message = String(formData.get("message") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const company = String(formData.get("company") ?? "").trim() || null;
  const domain = String(formData.get("domain") ?? "").trim() || null;
  const source = String(formData.get("source") ?? "").trim() || null;
  const kvkkAccepted = formData.get("kvkkAccepted") === "on";

  const fieldErrors = initialFieldErrors();

  if (!firstName) {
    fieldErrors.firstName = "Ad zorunludur.";
  }

  if (!lastName) {
    fieldErrors.lastName = "Soyad zorunludur.";
  }

  if (!phone) {
    fieldErrors.phone = "Telefon zorunludur.";
  } else if (!isValidPhone(phone)) {
    fieldErrors.phone = "Geçerli bir telefon numarası girin.";
  }

  if (!message) {
    fieldErrors.message = "Mesaj zorunludur.";
  }

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    fieldErrors.email = "Geçerli bir e-posta girin.";
  }

  if (!kvkkAccepted) {
    fieldErrors.kvkkAccepted = KVKK_CONSENT_ERROR;
  }

  return {
    data: {
      firstName,
      lastName,
      phone,
      message,
      email,
      company,
      domain,
      source,
      kvkkAccepted,
    },
    fieldErrors,
  };
}

export async function submitEducationContact(
  educationId: string,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const { data, fieldErrors } = parseContactFields(formData);

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const education = await prisma.education.findFirst({
    where: { id: educationId, status: "PUBLISHED" },
    select: { id: true, slug: true },
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
      message: data.message,
      email: data.email,
      educationId: education.id,
      source: data.source ?? `/education/${education.slug}`,
    },
  });

  await notifyAdminAboutContactForm({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    message: data.message,
    email: data.email,
    source: data.source ?? `/education/${education.slug}`,
  });

  if (data.email) {
    await sendContactConfirmationToUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  revalidatePath("/admin/contacts");

  return { success: "Sorunuz başarıyla gönderildi." };
}

export async function submitJobRequestContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const { data, fieldErrors } = parseContactFields(formData);

  if (!data.email) {
    fieldErrors.email = "E-posta zorunludur.";
  }

  if (!data.company) {
    fieldErrors.company = "Şirket zorunludur.";
  }

  if (!data.domain) {
    fieldErrors.domain = "Alan seçimi zorunludur.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  await prisma.contactSubmission.create({
    data: {
      type: "JOB_REQUEST",
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      message: data.message,
      company: data.company,
      domain: data.domain,
      source: data.source ?? "/contact",
    },
  });

  await notifyAdminAboutContactForm({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    message: data.message,
    email: data.email,
    company: data.company,
    domain: data.domain,
    source: data.source ?? "/contact",
  });

  if (data.email) {
    await sendContactConfirmationToUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  revalidatePath("/admin/contacts");

  return { success: "Talebiniz başarıyla alındı." };
}
