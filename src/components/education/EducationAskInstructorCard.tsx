"use client";

import { MessageCircleQuestion } from "lucide-react";
import { useActionState, useEffect } from "react";
import {
  submitEducationContact,
  type ContactFormState,
} from "@/app/contact/actions";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";

type EducationAskInstructorCardProps = {
  educationId: string;
  educationSlug: string;
};

const initialState: ContactFormState = {};

const inputClassName =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-[#121212] focus:outline-none";

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
    <Card className="bg-white/80 p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <MessageCircleQuestion
            size={22}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-foreground"
            aria-hidden
          />
          <div className="space-y-1">
            <h3 className="heading text-lg font-semibold tracking-tight">
              Aklınıza takılanı sorun
            </h3>
            <p className="text-xs text-[#888]">
              Eğitmenimize doğrudan soru gönderin.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#888]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Yanıt süresi: 2-4 saat</span>
            </div>
          </div>
        </div>

        <form action={formAction} className="space-y-3">
          <input type="hidden" name="source" value={`/education/${educationSlug}`} />

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="space-y-1.5">
              <span className="text-xs text-[#888]">Ad</span>
              <input
                name="firstName"
                className={inputClassName}
                placeholder="Adınız"
                required
              />
              {state.fieldErrors?.firstName ? (
                <span className="text-xs text-red-600">
                  {state.fieldErrors.firstName}
                </span>
              ) : null}
            </label>

            <label className="space-y-1.5">
              <span className="text-xs text-[#888]">Soyad</span>
              <input
                name="lastName"
                className={inputClassName}
                placeholder="Soyadınız"
                required
              />
              {state.fieldErrors?.lastName ? (
                <span className="text-xs text-red-600">
                  {state.fieldErrors.lastName}
                </span>
              ) : null}
            </label>

            <label className="space-y-1.5">
              <span className="text-xs text-[#888]">Telefon</span>
              <input
                name="phone"
                type="tel"
                className={inputClassName}
                placeholder="05xx xxx xx xx"
                required
              />
              {state.fieldErrors?.phone ? (
                <span className="text-xs text-red-600">
                  {state.fieldErrors.phone}
                </span>
              ) : null}
            </label>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
            <label className="min-w-0 flex-1 space-y-1.5">
              <span className="text-xs text-[#888]">Sorunuz</span>
              <textarea
                name="message"
                rows={2}
                placeholder="Sorunuzu detaylıca buraya yazın..."
                className={`${inputClassName} min-h-[52px] resize-none py-2.5 leading-relaxed`}
                required
              />
              {state.fieldErrors?.message ? (
                <span className="text-xs text-red-600">
                  {state.fieldErrors.message}
                </span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={pending}
              className="shrink-0 self-end rounded-full border-0 bg-[#121212] px-8 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#2a2a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212] disabled:opacity-60 lg:self-stretch lg:px-6"
            >
              {pending ? "Gönderiliyor..." : "Gönder"}
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
