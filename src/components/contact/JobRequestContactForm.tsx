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
          <CheckCircle2 size={36} className="mx-auto text-[#00ff88]" />
          <p className="mt-5 text-[18px] font-semibold tracking-tight text-white">
            Talebiniz alındı.
          </p>
          <p className="mt-2 text-[14px] text-white/70">
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
              className="input-dark w-full"
              placeholder="Adınız"
              required
            />
            {state.fieldErrors?.firstName ? (
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.firstName}
              </span>
            ) : null}
          </Field>
          <Field label="Soyad">
            <input
              name="lastName"
              className="input-dark w-full"
              placeholder="Soyadınız"
              required
            />
            {state.fieldErrors?.lastName ? (
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.lastName}
              </span>
            ) : null}
          </Field>
          <Field label="Telefon">
            <input
              name="phone"
              type="tel"
              className="input-dark w-full"
              placeholder="05xx xxx xx xx"
              required
            />
            {state.fieldErrors?.phone ? (
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.phone}
              </span>
            ) : null}
          </Field>
          <Field label="Şirket">
            <input
              name="company"
              className="input-dark w-full"
              placeholder="Şirket adı"
              required
            />
            {state.fieldErrors?.company ? (
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.company}
              </span>
            ) : null}
          </Field>
          <Field label="E-posta" full>
            <input
              name="email"
              type="email"
              className="input-dark w-full"
              placeholder="mail@şirket.com"
              required
            />
            {state.fieldErrors?.email ? (
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.email}
              </span>
            ) : null}
          </Field>
          <Field label="Alan" full>
            <select
              name="domain"
              className="input-dark w-full appearance-none"
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
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.domain}
              </span>
            ) : null}
          </Field>
          <Field label="Proje detayı" full>
            <textarea
              name="message"
              className="input-dark min-h-[96px] w-full resize-y"
              placeholder="Projenizi kısaca anlatın"
              required
            />
            {state.fieldErrors?.message ? (
              <span className="mt-1 block text-xs text-red-300">
                {state.fieldErrors.message}
              </span>
            ) : null}
          </Field>
          {state.error ? (
            <p className="text-sm text-red-300 sm:col-span-2">{state.error}</p>
          ) : null}
          <div className="mt-1 sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-full bg-[#5ed29c] text-[13px] font-bold uppercase text-[#070b0a] transition-colors hover:bg-[#6ee0ac] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ed29c] disabled:pointer-events-none disabled:opacity-40"
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
      <span className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-white/65">
        {label}
      </span>
      {children}
    </label>
  );
}
