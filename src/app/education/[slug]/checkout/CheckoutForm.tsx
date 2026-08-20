"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { KvkkConsent } from "@/components/legal/KvkkConsent";
import { PaymentMethodLogos } from "@/components/legal/PaymentMethodLogos";
import { formatPrice } from "@/lib/education";
import {
  CHECKOUT_MOCK_DATA,
  USE_CHECKOUT_MOCK_DATA,
} from "@/lib/checkout-mock-data";
import {
  formatIyzicoTestCardLabel,
  getIyzicoTestCardsByCategory,
  IYZICO_TEST_CARD_CATEGORY_LABELS,
  type IyzicoTestCardCategory,
} from "@/constants/iyzico/test-cards";
import type { InstallmentOption } from "@/lib/iyzico/installments";
import { submitCheckout, type CheckoutState } from "./actions";

const mock = USE_CHECKOUT_MOCK_DATA ? CHECKOUT_MOCK_DATA : null;

const TEST_CARD_CATEGORIES: IyzicoTestCardCategory[] = [
  "success",
  "foreign",
  "error",
];

const initialState: CheckoutState = {};

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

type CheckoutFormProps = {
  slug: string;
  title: string;
  price: number;
  currency: string;
  isFree: boolean;
};

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-[13px] font-medium text-[#ededed]">
        {label}
      </label>
      {children}
    </div>
  );
}

export function CheckoutForm({
  slug,
  title,
  price,
  currency,
  isFree,
}: CheckoutFormProps) {
  const boundAction = submitCheckout.bind(null, slug);
  const [state, formAction, pending] = useActionState(boundAction, initialState);
  const [cardNumber, setCardNumber] = useState(mock?.cardNumber ?? "");
  const [installmentOptions, setInstallmentOptions] = useState<InstallmentOption[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [installmentLoading, setInstallmentLoading] = useState(false);
  const [installmentError, setInstallmentError] = useState<string | null>(null);
  const [cardMeta, setCardMeta] = useState<{
    cardBankName?: string;
    cardFamily?: string;
    cardAssociation?: string;
  }>({});

  const sanitizedBin = useMemo(
    () => cardNumber.replace(/\D/g, "").slice(0, 6),
    [cardNumber],
  );

  useEffect(() => {
    if (isFree || sanitizedBin.length < 6) {
      setInstallmentOptions([]);
      setSelectedInstallment(1);
      setCardMeta({});
      setInstallmentError(null);
      return;
    }

    const controller = new AbortController();

    async function loadInstallments() {
      setInstallmentLoading(true);
      setInstallmentError(null);

      try {
        const response = await fetch("/api/payments/installments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, binNumber: sanitizedBin }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Taksit bilgisi alınamadı.");
        }

        setInstallmentOptions(data.options ?? []);
        setCardMeta({
          cardBankName: data.cardBankName,
          cardFamily: data.cardFamily,
          cardAssociation: data.cardAssociation,
        });
        setSelectedInstallment(data.options?.[0]?.installmentNumber ?? 1);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setInstallmentOptions([]);
        setInstallmentError(
          error instanceof Error ? error.message : "Taksit bilgisi alınamadı.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setInstallmentLoading(false);
        }
      }
    }

    const timeout = window.setTimeout(loadInstallments, 350);
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [isFree, sanitizedBin, slug]);

  const selectedOption = installmentOptions.find(
    (option) => option.installmentNumber === selectedInstallment,
  );

  useEffect(() => {
    if (!state.threeDSHtmlContent) {
      return;
    }

    const html = atob(state.threeDSHtmlContent);
    document.open();
    document.write(html);
    document.close();
  }, [state.threeDSHtmlContent]);

  return (
    <form action={formAction} className="space-y-8">
      <Card className="p-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
          Sipariş Özeti
        </p>
        <h2 className="mt-2 text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-[#888]">
          Tutar:{" "}
          {isFree
            ? "Ücretsiz"
            : formatPrice(false, price, currency)}
        </p>
        {!isFree && selectedOption ? (
          <p className="mt-2 text-sm text-[#ededed]">
            Ödenecek tutar: {selectedOption.totalPrice.toFixed(2)} {currency}
            {selectedOption.installmentNumber > 1
              ? ` · ${selectedOption.installmentNumber} taksit`
              : " · Tek çekim"}
          </p>
        ) : null}
      </Card>

      <Card className="space-y-5 p-6">
        <h3 className="text-lg font-semibold">Alıcı Bilgileri</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Ad" name="name">
            <input
              id="name"
              name="name"
              required
              defaultValue={mock?.name}
              className={inputClassName}
            />
          </Field>
          <Field label="Soyad" name="surname">
            <input
              id="surname"
              name="surname"
              required
              defaultValue={mock?.surname}
              className={inputClassName}
            />
          </Field>
          <Field label="E-posta" name="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={mock?.email}
              className={inputClassName}
            />
          </Field>
          <Field label="Telefon" name="phone">
            <input
              id="phone"
              name="phone"
              required
              placeholder="+905xxxxxxxxx"
              defaultValue={mock?.phone}
              className={inputClassName}
            />
          </Field>
          <Field label="T.C. Kimlik No" name="identityNumber">
            <input
              id="identityNumber"
              name="identityNumber"
              required
              maxLength={11}
              defaultValue={mock?.identityNumber}
              className={inputClassName}
            />
          </Field>
        </div>
      </Card>

      {!isFree ? (
        <>
          <Card className="space-y-5 p-6">
            <h3 className="text-lg font-semibold">Kart Bilgileri</h3>
            <Field label="Kart Üzerindeki İsim" name="cardHolderName">
              <input
                id="cardHolderName"
                name="cardHolderName"
                required
                autoComplete="cc-name"
                defaultValue={mock?.cardHolderName}
                className={inputClassName}
              />
            </Field>
            <Field label="Kart Numarası" name="cardNumber">
              {USE_CHECKOUT_MOCK_DATA ? (
                <>
                  <select
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    className={inputClassName}
                  >
                    {TEST_CARD_CATEGORIES.map((category) => (
                      <optgroup
                        key={category}
                        label={IYZICO_TEST_CARD_CATEGORY_LABELS[category]}
                      >
                        {getIyzicoTestCardsByCategory(category).map((card) => (
                          <option key={card.cardNumber} value={card.cardNumber}>
                            {formatIyzicoTestCardLabel(card)}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p className="text-xs text-[#666]">
                    Sandbox test kartı seçin. SKT ve CVV için geçerli formatta
                    rastgele değer kullanılabilir.
                  </p>
                </>
              ) : (
                <input
                  id="cardNumber"
                  name="cardNumber"
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  className={inputClassName}
                  placeholder="5528 7900 0000 0008"
                />
              )}
            </Field>
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Ay" name="expireMonth">
                <input
                  id="expireMonth"
                  name="expireMonth"
                  required
                  placeholder="12"
                  maxLength={2}
                  defaultValue={mock?.expireMonth}
                  className={inputClassName}
                />
              </Field>
              <Field label="Yıl" name="expireYear">
                <input
                  id="expireYear"
                  name="expireYear"
                  required
                  placeholder="2030"
                  maxLength={4}
                  defaultValue={mock?.expireYear}
                  className={inputClassName}
                />
              </Field>
              <Field label="CVV" name="cvc">
                <input
                  id="cvc"
                  name="cvc"
                  required
                  maxLength={4}
                  autoComplete="cc-csc"
                  defaultValue={mock?.cvc}
                  className={inputClassName}
                />
              </Field>
            </div>

            {cardMeta.cardBankName ? (
              <p className="text-sm text-[#888]">
                {cardMeta.cardBankName}
                {cardMeta.cardFamily ? ` · ${cardMeta.cardFamily}` : ""}
                {cardMeta.cardAssociation ? ` · ${cardMeta.cardAssociation}` : ""}
              </p>
            ) : null}

            <label className="flex cursor-pointer items-center gap-2 pt-1">
              <input
                type="checkbox"
                name="use3ds"
                className="h-4 w-4 rounded border-[#333] bg-black"
              />
              <span className="text-sm text-[#ededed]">
                3DS ile ödeme yapmak istiyorum
              </span>
              <InfoTooltip text="3D Secure, bankanızın SMS veya mobil uygulama ile gönderdiği ek doğrulama adımıdır." />
            </label>
          </Card>

          <Card className="space-y-5 p-6">
            <h3 className="text-lg font-semibold">Taksit Seçimi</h3>
            <p className="text-sm text-[#888]">
              Kart numaranızın ilk 6 hanesine göre tek çekim ve taksitli ödeme
              seçenekleri listelenir.
            </p>

            {installmentLoading ? (
              <p className="text-sm text-[#888]">Taksit seçenekleri yükleniyor...</p>
            ) : null}

            {installmentError ? (
              <p className="rounded-md border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                {installmentError}
              </p>
            ) : null}

            {!installmentLoading && installmentOptions.length > 0 ? (
              <div className="space-y-3">
                {installmentOptions.map((option) => (
                  <label
                    key={option.installmentNumber}
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${
                      selectedInstallment === option.installmentNumber
                        ? "border-[#333] bg-[#080808]"
                        : "border-[#1a1a1a] hover:border-[#333]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="installmentChoice"
                      checked={selectedInstallment === option.installmentNumber}
                      onChange={() => setSelectedInstallment(option.installmentNumber)}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      <span className="font-medium text-[#ededed]">
                        {option.installmentNumber === 1
                          ? "Tek Çekim (Nakit)"
                          : `${option.installmentNumber} Taksit`}
                      </span>
                      <span className="mt-1 block text-[#888]">{option.label}</span>
                    </span>
                  </label>
                ))}
              </div>
            ) : null}

            {!installmentLoading &&
            sanitizedBin.length >= 6 &&
            installmentOptions.length === 0 &&
            !installmentError ? (
              <p className="text-sm text-[#888]">
                Bu kart için taksit seçeneği bulunamadı.
              </p>
            ) : null}

            <input
              type="hidden"
              name="installmentNumber"
              value={selectedInstallment}
            />
          </Card>
        </>
      ) : null}

      {state.error ? (
        <p
          className={`rounded-md border px-4 py-3 text-sm ${
            state.isLimitError
              ? "border-amber-500/20 bg-amber-500/10 text-amber-200"
              : "border-red-500/20 bg-red-500/10 text-red-300"
          }`}
        >
          {state.error}
        </p>
      ) : null}

      <KvkkConsent tone="dark" />

      {!isFree ? (
        <PaymentMethodLogos className="pt-1" />
      ) : null}

      <Button type="submit" className="w-full" disabled={pending || !!state.threeDSHtmlContent}>
        {pending
          ? "İşleniyor..."
          : state.threeDSHtmlContent
            ? "Banka doğrulamasına yönlendiriliyor..."
          : isFree
            ? "Ücretsiz Kayıt Ol"
            : "Ödemeyi Tamamla"}
      </Button>
    </form>
  );
}
