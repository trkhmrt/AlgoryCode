import "server-only";

const DEFAULT_BASE_URL = "http://localhost:8080";

export type NotificationChannel = "mail" | "telegram";

export type NotificationMessageType =
  | "PASSWORD_RESET"
  | "NEW_REGISTRATION"
  | "PAYMENT_CONFIRMATION"
  | "REQUEST_FORM"
  | "GENERIC";

type EnqueueNotificationPayload = {
  eventId?: string;
  channels: NotificationChannel[];
  serviceName: string;
  messageType: NotificationMessageType;
  recipients?: {
    email: string;
    cc?: string[];
    bcc?: string[];
  };
  subject?: string;
  templateData?: Record<string, unknown>;
};

type ChannelResult = {
  channel: NotificationChannel;
  routingKey: string;
  queue: string;
  status: string;
};

type EnqueueNotificationResponse = {
  eventId: string;
  results: ChannelResult[];
};

const MAIL_SERVICE_NAME = "algorycode-web-site";
const TELEGRAM_SERVICE_NAME = "algory-site";

function getPushNotificationServiceBaseUrl(): string {
  return (
    process.env.PUSH_NOTIFICATION_SERVICE_BASE_URL ?? DEFAULT_BASE_URL
  ).replace(/\/$/, "");
}

export async function enqueueNotification(
  payload: EnqueueNotificationPayload,
): Promise<EnqueueNotificationResponse> {
  const baseUrl = getPushNotificationServiceBaseUrl();

  const response = await fetch(`${baseUrl}/api/v1/notifications`, {
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
      `push-notification-service responded with ${response.status}: ${errorBody || response.statusText}`,
    );
  }

  return (await response.json()) as EnqueueNotificationResponse;
}

export async function sendNotificationSafely(
  payload: EnqueueNotificationPayload,
  context: string,
): Promise<void> {
  try {
    await enqueueNotification(payload);
  } catch (error) {
    console.error(`[push-notification-service] Failed to send ${context}`, error);
  }
}

export async function sendEducationApplicationNotifications(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationTitle: string;
  educationSlug: string;
}): Promise<void> {
  const userName = `${input.firstName} ${input.lastName}`.trim();

  await sendNotificationSafely(
    {
      channels: ["mail"],
      serviceName: MAIL_SERVICE_NAME,
      messageType: "NEW_REGISTRATION",
      recipients: {
        email: input.email,
      },
      templateData: {
        userName,
        educationTitle: input.educationTitle,
      },
    },
    "education application confirmation mail",
  );

  await sendNotificationSafely(
    {
      channels: ["telegram"],
      serviceName: TELEGRAM_SERVICE_NAME,
      messageType: "REQUEST_FORM",
      templateData: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        message: `Eğitim başvurusu: ${input.educationTitle}`,
        source: `/education/${input.educationSlug}`,
      },
    },
    "education application telegram notification",
  );
}
