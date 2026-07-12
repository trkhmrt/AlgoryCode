"use client";

import { useActionState, useEffect } from "react";
import {
  submitEducationApplication,
  type EducationApplicationFormState,
} from "@/app/education/[slug]/application/actions";
import { Card } from "@/components/ui/Card";
import { KvkkConsent } from "@/components/legal/KvkkConsent";
import { useToast } from "@/components/ui/ToastProvider";

type EducationApplicationCardProps = {
  educationId: string;
  educationTitle: string;
};

const initialState: EducationApplicationFormState = {};

const fieldClassName =
  "h-11 w-full rounded-lg border border-[#d9d2c8] bg-white px-3.5 text-sm text-[#121212] outline-none transition-colors placeholder:text-[#aaa] focus:border-[#2a2622]";

export function EducationApplicationCard({
  educationId,
  educationTitle,
}: EducationApplicationCardProps) {
  const { success, error } = useToast();
  const action = submitEducationApplication.bind(null, educationId);
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      success(state.success);
    } else if (state.error) {
      error(state.error);
    }
  }, [state.success, state.error, success, error]);

  return (
    <Card className="h-fit bg-white/80 p-6">
      <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
        Eğitime Başvur
      </p>
      <h2 className="heading mt-2 text-xl font-semibold">{educationTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#888]">
        Bilgilerinizi bırakın, ekibimiz en kısa sürede sizinle iletişime geçsin.
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
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
          <span className="text-[13px] font-medium text-[#2a2622]">E-posta</span>
          <input
            name="email"
            type="email"
            className={fieldClassName}
            placeholder="ornek@mail.com"
            required
            autoComplete="email"
          />
          {state.fieldErrors?.email ? (
            <span className="block text-xs text-red-600">
              {state.fieldErrors.email}
            </span>
          ) : null}
        </label>

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

        <KvkkConsent error={state.fieldErrors?.kvkkAccepted} />

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full items-center justify-center rounded-full border-0 bg-[#121212] text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a] disabled:opacity-60"
        >
          {pending ? "Gönderiliyor..." : "Başvur"}
        </button>
      </form>
    </Card>
  );
}
