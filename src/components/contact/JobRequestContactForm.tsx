"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  submitJobRequestContact,
  type ContactFormState,
} from "@/app/contact/actions";

const DOMAINS = ["E-Ticaret", "Mobil App", "AI", "Web App", "Eğitim"];

const initialState: ContactFormState = {};

const inputClassName =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-[#121212] focus:outline-none";

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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="py-12 text-center"
        >
          <CheckCircle2 size={36} className="mx-auto text-[#121212]" />
          <p className="mt-5 text-[18px] font-semibold tracking-tight text-foreground">
            Talebiniz alındı.
          </p>
          <p className="mt-2 text-[14px] text-muted-foreground">
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
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
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
              <span className="mt-1 block text-xs text-red-600">
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
              <span className="mt-1 block text-xs text-red-600">
                {state.fieldErrors.lastName}
              </span>
            ) : null}
          </Field>
          <Field label="Telefon">
            <input
              name="phone"
              type="tel"
              className={inputClassName}
              placeholder="05xx xxx xx xx"
              required
            />
            {state.fieldErrors?.phone ? (
              <span className="mt-1 block text-xs text-red-600">
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
              <span className="mt-1 block text-xs text-red-600">
                {state.fieldErrors.company}
              </span>
            ) : null}
          </Field>
          <Field label="E-posta" full>
            <input
              name="email"
              type="email"
              className={inputClassName}
              placeholder="mail@şirket.com"
              required
            />
            {state.fieldErrors?.email ? (
              <span className="mt-1 block text-xs text-red-600">
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
              <span className="mt-1 block text-xs text-red-600">
                {state.fieldErrors.domain}
              </span>
            ) : null}
          </Field>
          <Field label="Proje detayı" full>
            <textarea
              name="message"
              className={`${inputClassName} min-h-[96px] resize-y`}
              placeholder="Projenizi kısaca anlatın"
              required
            />
            {state.fieldErrors?.message ? (
              <span className="mt-1 block text-xs text-red-600">
                {state.fieldErrors.message}
              </span>
            ) : null}
          </Field>
          {state.error ? (
            <p className="text-sm text-red-600 sm:col-span-2">{state.error}</p>
          ) : null}
          <div className="mt-1 sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-full border-0 bg-[#121212] text-[13px] font-bold uppercase text-white transition-colors hover:bg-[#2a2a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212] disabled:pointer-events-none disabled:opacity-40"
            >
              {pending ? "Gönderiliyor..." : "Demo Talep Et →"}
            </button>
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
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-[#888]">
        {label}
      </span>
      {children}
    </label>
  );
}
