"use client";

import { CheckCircle2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  submitJobRequestContact,
  type ContactFormState,
} from "@/app/contact/actions";
import { KvkkConsent } from "@/components/legal/KvkkConsent";

const TOPICS = [
  { value: "proje", label: "Yeni proje" },
  { value: "egitim", label: "Eğitim talebi" },
  { value: "bakim", label: "Bakım / devralma" },
  { value: "diger", label: "Diğer" },
];

const inputCls =
  "h-10 w-full rounded-2xl border border-border bg-background px-3.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none";

const initialState: ContactFormState = {};

type Props = { source?: string };

export function JobRequestContactForm({ source = "/contact" }: Props) {
  const [state, formAction, pending] = useActionState(
    submitJobRequestContact,
    initialState,
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state.success) setSubmitted(true);
  }, [state.success]);

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle2 size={36} style={{ color: "var(--accent)" }} />
        <p className="mt-4 text-lg font-bold">Talebiniz alındı.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          1 iş günü içinde sizinle iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad" error={state.fieldErrors?.firstName}>
          <input name="firstName" className={inputCls} placeholder="Adınız" required />
        </Field>
        <Field label="Soyad" error={state.fieldErrors?.lastName}>
          <input name="lastName" className={inputCls} placeholder="Soyadınız" required />
        </Field>
        <Field label="E-posta" error={state.fieldErrors?.email}>
          <input
            name="email"
            type="email"
            className={inputCls}
            placeholder="ornek@sirket.com"
            required
          />
        </Field>
        <Field label="Telefon" error={state.fieldErrors?.phone}>
          <input
            name="phone"
            type="tel"
            className={inputCls}
            placeholder="05xx xxx xx xx"
            required
          />
        </Field>
        <Field label="Şirket" error={state.fieldErrors?.company}>
          <input name="company" className={inputCls} placeholder="Şirket adı" required />
        </Field>
        <Field label="Konu" error={state.fieldErrors?.domain}>
          <select
            name="domain"
            className={`${inputCls} appearance-none`}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seçiniz
            </option>
            {TOPICS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Mesajınız" error={state.fieldErrors?.message} full>
          <textarea
            name="message"
            className={`${inputCls} h-auto min-h-[120px] resize-y py-2.5`}
            placeholder="Kısaca ihtiyacınızdan bahsedin..."
            required
          />
        </Field>
      </div>

      {state.error ? (
        <p className="mt-3 text-sm text-red-600">{state.error}</p>
      ) : null}

      <div className="mt-4">
        <KvkkConsent
          error={state.fieldErrors?.kvkkAccepted}
          className="[&_p]:text-[13px] [&_p]:leading-snug"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  full,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </div>
  );
}
