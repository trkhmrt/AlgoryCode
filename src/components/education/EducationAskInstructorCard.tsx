"use client";

import { useActionState, useEffect } from "react";
import {
  submitEducationContact,
  type ContactFormState,
} from "@/app/contact/actions";
import { Card } from "@/components/ui/Card";
import { KvkkConsent } from "@/components/legal/KvkkConsent";
import { useToast } from "@/components/ui/ToastProvider";

type EducationAskInstructorCardProps = {
  educationId: string;
  educationSlug: string;
};

const initialState: ContactFormState = {};

const fieldClassName =
  "h-11 w-full rounded-lg border border-[#d9d2c8] bg-white px-3.5 text-sm text-[#121212] outline-none transition-colors placeholder:text-[#aaa] focus:border-[#2a2622]";

const textareaClassName =
  "min-h-[120px] w-full resize-y rounded-lg border border-[#d9d2c8] bg-white px-3.5 py-3 text-sm leading-relaxed text-[#121212] outline-none transition-colors placeholder:text-[#aaa] focus:border-[#2a2622]";

export function EducationAskInstructorCard({
  educationId,
  educationSlug,
}: EducationAskInstructorCardProps) {
  const { success, error } = useToast();
  const action = submitEducationContact.bind(null, educationId);
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      success(state.success);
    } else if (state.error) {
      error(state.error);
    }
  }, [state.success, state.error, success, error]);

  return (
    <Card className="overflow-hidden border-[#d9d2c8] bg-[#faf8f5] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="border-b border-[#e5dfd6] px-6 py-5 md:px-8">
        <h3 className="heading text-lg font-semibold tracking-tight text-[#121212]">
          Eğitmene soru sor
        </h3>
        <p className="mt-1 text-sm text-[#888]">
          Formu doldurun, eğitmenimiz en kısa sürede dönüş yapsın.
        </p>
      </div>

      <form action={formAction} className="space-y-5 px-6 py-6 md:px-8 md:py-7">
        <input type="hidden" name="source" value={`/education/${educationSlug}`} />

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-[13px] font-medium text-[#2a2622]">Ad</span>
            <input
              name="firstName"
              className={fieldClassName}
              placeholder="Adınız"
              required
              autoComplete="given-name"
            />
            {state.fieldErrors?.firstName ? (
              <span className="block text-xs text-red-600">
                {state.fieldErrors.firstName}
              </span>
            ) : null}
          </label>

          <label className="block space-y-2">
            <span className="text-[13px] font-medium text-[#2a2622]">Soyad</span>
            <input
              name="lastName"
              className={fieldClassName}
              placeholder="Soyadınız"
              required
              autoComplete="family-name"
            />
            {state.fieldErrors?.lastName ? (
              <span className="block text-xs text-red-600">
                {state.fieldErrors.lastName}
              </span>
            ) : null}
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-[#2a2622]">Telefon</span>
          <input
            name="phone"
            type="tel"
            className={fieldClassName}
            placeholder="05xx xxx xx xx"
            required
            autoComplete="tel"
          />
          {state.fieldErrors?.phone ? (
            <span className="block text-xs text-red-600">
              {state.fieldErrors.phone}
            </span>
          ) : null}
        </label>

        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-[#2a2622]">
            Sorunuz
          </span>
          <textarea
            name="message"
            rows={5}
            placeholder="Sorunuzu detaylıca yazın..."
            className={textareaClassName}
            required
          />
          {state.fieldErrors?.message ? (
            <span className="block text-xs text-red-600">
              {state.fieldErrors.message}
            </span>
          ) : null}
        </label>

        <div className="space-y-4 border-t border-[#e5dfd6] pt-5">
          <KvkkConsent error={state.fieldErrors?.kvkkAccepted} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-[#8a847c]">
              Ortalama yanıt süresi: 2–4 saat
            </p>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#121212] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#2a2622] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212] disabled:opacity-60"
            >
              {pending ? "Gönderiliyor..." : "Soruyu Gönder"}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
