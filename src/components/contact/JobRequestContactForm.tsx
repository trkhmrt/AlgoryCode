"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  submitJobRequestContact,
  type ContactFormState,
} from "@/app/contact/actions";
import { KvkkConsent } from "@/components/legal/KvkkConsent";
import { Button } from "@/components/ui/Button";

const DOMAINS = ["E-Ticaret", "Mobil App", "AI", "Web App", "Eğitim"];

const initialState: ContactFormState = {};

const inputClassName =
  "h-9 w-full rounded-md border border-border bg-white/70 px-2.5 text-[13px] text-foreground transition-colors placeholder:text-muted-foreground focus:border-[#121212] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]";

type JobRequestContactFormProps = {
  source?: string;
};

export function JobRequestContactForm({
  source = "/contact",
}: JobRequestContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitJobRequestContact,
    initialState,
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSubmitted(true);
    }
  }, [state.success]);

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="py-6 text-center"
        >
          <CheckCircle2 size={24} className="mx-auto text-[#121212]" />
          <p className="mt-2.5 text-[15px] font-semibold tracking-tight text-foreground">
            Talebiniz alındı.
          </p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            48 saat içinde sizinle iletişime geçeceğiz.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={formAction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-3 md:gap-y-2"
        >
          <input type="hidden" name="source" value={source} />

          <Field label="Ad">
            <input
              name="firstName"
              className={inputClassName}
              placeholder="Adınız"
              required
            />
            {state.fieldErrors?.firstName ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.firstName}
              </span>
            ) : null}
          </Field>
          <Field label="Soyad">
            <input
              name="lastName"
              className={inputClassName}
              placeholder="Soyadınız"
              required
            />
            {state.fieldErrors?.lastName ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.lastName}
              </span>
            ) : null}
          </Field>
          <Field label="Telefon" full>
            <input
              name="phone"
              type="tel"
              className={inputClassName}
              placeholder="05xx xxx xx xx"
              required
            />
            {state.fieldErrors?.phone ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.phone}
              </span>
            ) : null}
          </Field>
          <Field label="Şirket">
            <input
              name="company"
              className={inputClassName}
              placeholder="Şirket adı"
              required
            />
            {state.fieldErrors?.company ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.company}
              </span>
            ) : null}
          </Field>
          <Field label="E-posta">
            <input
              name="email"
              type="email"
              className={inputClassName}
              placeholder="mail@şirket.com"
              required
            />
            {state.fieldErrors?.email ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.email}
              </span>
            ) : null}
          </Field>
          <Field label="Alan" full>
            <select
              name="domain"
              className={`${inputClassName} appearance-none`}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seçiniz
              </option>
              {DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            {state.fieldErrors?.domain ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.domain}
              </span>
            ) : null}
          </Field>
          <Field label="Proje detayı" full>
            <textarea
              name="message"
              className={`${inputClassName} min-h-[60px] resize-y py-2`}
              placeholder="Kısaca anlatın"
              required
            />
            {state.fieldErrors?.message ? (
              <span className="mt-0.5 block text-[11px] text-red-600">
                {state.fieldErrors.message}
              </span>
            ) : null}
          </Field>
          {state.error ? (
            <p className="text-[12px] text-red-600 md:col-span-2">{state.error}</p>
          ) : null}
          <div className="md:col-span-2">
            <KvkkConsent
              error={state.fieldErrors?.kvkkAccepted}
              className="[&_p]:text-[12px] [&_p]:leading-snug"
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={pending}
              aria-busy={pending}
              size="sm"
              className="h-9 w-full"
            >
              {pending ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-0.5 block text-[12px] text-[#666]">{label}</span>
      {children}
    </label>
  );
}
