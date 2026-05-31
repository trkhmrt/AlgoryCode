import "server-only";

import { Iyzipay } from "iyzico-js";

let client: Iyzipay | null = null;

export function getIyzicoClient(): Iyzipay {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL ?? "https://sandbox-api.iyzipay.com";

  if (!apiKey || !secretKey) {
    throw new Error("IYZICO_API_KEY ve IYZICO_SECRET_KEY tanımlı olmalı.");
  }

  if (!client) {
    client = new Iyzipay({ apiKey, secretKey, baseUrl });
  }

  return client;
}

export function createConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function formatIyzicoPrice(value: number | string): string {
  const amount = typeof value === "string" ? Number(value) : value;
  return amount.toFixed(2);
}
