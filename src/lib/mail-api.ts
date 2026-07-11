import "server-only";

const SERVICE_NAME = "algorycode-web-site";

export type MailMessageType =
  | "PASSWORD_RESET"
  | "NEW_REGISTRATION"
  | "PAYMENT_CONFIRMATION"
  | "REQUEST_FORM"
  | "GENERIC";

export type EnqueueMailPayload = {
  serviceName: string;
  messageType: MailMessageType;
  to: string;
  cc?: string[];
  bcc?: string[];
  subject?: string;
  body?: string;
  html?: boolean;
  templateData?: Record<string, unknown>;
};

type EnqueueMailResponse = {
  queued: boolean;
  messageId: string;
  recipient: string;
  queuedAt: string;
};

function getMailApiBaseUrl(): string {
  return (
    process.env.MAIL_API_BASE_URL ?? "https://prod.mail.api.algorycode.com"
  ).replace(/\/$/, "");
}

export async function enqueueMail(
  payload: EnqueueMailPayload,
): Promise<EnqueueMailResponse> {
  const baseUrl = getMailApiBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/mails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `mail-api responded with ${response.status}: ${errorBody || response.statusText}`,
    );
  }

  return (await response.json()) as EnqueueMailResponse;
}

export async function sendMailSafely(
  payload: EnqueueMailPayload,
  context: string,
): Promise<void> {
  try {
    await enqueueMail(payload);
  } catch (error) {
    console.error(`[mail-api] Failed to send ${context}`, error);
  }
}

function getNotifyEmail(): string {
  return process.env.MAIL_NOTIFY_TO ?? "info@algorycode.com";
}

export async function notifyAdminAboutContactForm(input: {
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  email?: string | null;
  company?: string | null;
  domain?: string | null;
  source?: string | null;
}): Promise<void> {
  await sendMailSafely(
    {
      serviceName: SERVICE_NAME,
      messageType: "REQUEST_FORM",
      to: getNotifyEmail(),
      templateData: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        message: input.message,
        email: input.email ?? undefined,
        company: input.company ?? undefined,
        domain: input.domain ?? undefined,
        source: input.source ?? undefined,
      },
    },
    "admin contact notification",
  );
}

export async function sendContactConfirmationToUser(input: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<void> {
  await sendMailSafely(
    {
      serviceName: SERVICE_NAME,
      messageType: "GENERIC",
      to: input.email,
      subject: "Talebiniz Alındı - AlgoryCode",
      body: [
        `Merhaba ${input.firstName} ${input.lastName},`,
        "",
        "Formunuz başarıyla tarafımıza ulaştı.",
        "En kısa sürede sizinle iletişime geçeceğiz.",
        "",
        "AlgoryCode",
      ].join("\n"),
      html: false,
    },
    "contact confirmation",
  );
}

export async function sendEducationRegistrationEmail(input: {
  email: string;
  userName: string;
  educationTitle: string;
}): Promise<void> {
  await sendMailSafely(
    {
      serviceName: SERVICE_NAME,
      messageType: "NEW_REGISTRATION",
      to: input.email,
      templateData: {
        userName: input.userName,
        educationTitle: input.educationTitle,
      },
    },
    "education registration",
  );
}

export async function sendEducationPaymentConfirmationEmail(input: {
  email: string;
  customerName: string;
  conversationId: string;
  paymentId: string;
  basketId: string;
  currency: string;
  price: string;
  paidPrice: string;
  productName: string;
  productPrice: string;
}): Promise<void> {
  await sendMailSafely(
    {
      serviceName: SERVICE_NAME,
      messageType: "PAYMENT_CONFIRMATION",
      to: input.email,
      templateData: {
        customerName: input.customerName,
        conversationId: input.conversationId,
        paymentId: input.paymentId,
        basketId: input.basketId,
        currency: input.currency,
        price: input.price,
        paidPrice: input.paidPrice,
        products: [
          {
            name: input.productName,
            price: input.productPrice,
          },
        ],
      },
    },
    "education payment confirmation",
  );
}

export async function sendEducationEnrollmentEmails(input: {
  buyerEmail: string;
  buyerName: string;
  buyerSurname: string;
  educationId: string;
  educationTitle: string;
  currency: string;
  price: number;
  paidPrice: number;
  conversationId: string;
  paymentId: string;
  isFree: boolean;
}): Promise<void> {
  const customerName = `${input.buyerName} ${input.buyerSurname}`.trim();
  const price = input.price.toFixed(2);
  const paidPrice = input.paidPrice.toFixed(2);

  if (input.isFree) {
    await sendEducationRegistrationEmail({
      email: input.buyerEmail,
      userName: customerName,
      educationTitle: input.educationTitle,
    });
    return;
  }

  await sendEducationPaymentConfirmationEmail({
    email: input.buyerEmail,
    customerName,
    conversationId: input.conversationId,
    paymentId: input.paymentId,
    basketId: input.educationId,
    currency: input.currency,
    price,
    paidPrice,
    productName: input.educationTitle,
    productPrice: paidPrice,
  });
}
