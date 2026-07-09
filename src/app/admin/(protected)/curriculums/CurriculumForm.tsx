"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";
import {
  normalizeCurriculumLessons,
  type CurriculumWithDetails,
} from "@/lib/curriculum";
import {
  createCurriculum,
  type CurriculumFormState,
  updateCurriculum,
} from "./actions";
import { CurriculumDetailsEditor } from "./CurriculumDetailsEditor";

const initialState: CurriculumFormState = {};

type CurriculumFormProps = {
  curriculum?: CurriculumWithDetails;
};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-[13px] font-medium text-[#ededed]">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

const textareaClassName =
  "min-h-[100px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

export function CurriculumForm({ curriculum }: CurriculumFormProps) {
  const action = curriculum
    ? updateCurriculum.bind(null, curriculum.id)
    : createCurriculum;
  const [state, formAction, pending] = useActionState(action, initialState);
  const { success, error } = useToast();
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
      return;
    }

    if (!wasPending.current) {
      return;
    }

    wasPending.current = false;

    if (state.success) {
      success(state.success);
      return;
    }

    if (state.error) {
      error(state.error);
      return;
    }

    if (state.fieldErrors && Object.keys(state.fieldErrors).length > 0) {
      error("Lütfen formdaki hatalı alanları düzeltin.");
    }
  }, [pending, state, success, error]);

  return (
    <form action={formAction} className="space-y-8">
      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Müfredat Bilgileri</h2>
          <p className="mt-1 text-sm text-[#888]">
            Eğitimlere atanabilecek hazır müfredat şablonunu tanımlayın.
          </p>
        </div>

        <Field label="Başlık" name="title" error={state.fieldErrors?.title}>
          <input
            id="title"
            name="title"
            required
            defaultValue={curriculum?.title ?? ""}
            className={inputClassName}
            placeholder="Full Stack Web Geliştirme"
          />
        </Field>

        <Field label="Açıklama" name="description">
          <textarea
            id="description"
            name="description"
            defaultValue={curriculum?.description ?? ""}
            className={textareaClassName}
            placeholder="Bu müfredatın kısa açıklaması"
          />
        </Field>
      </Card>

      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Konu Başlıkları</h2>
          <p className="mt-1 text-sm text-[#888]">
            Müfredat detayları eğitim sayfasındaki İçerik sekmesinde listelenir.
          </p>
        </div>

        <CurriculumDetailsEditor
          initialDetails={
            curriculum?.details.map((detail) => ({
              title: detail.title,
              totalDuration: detail.totalDuration,
              lessons: normalizeCurriculumLessons(detail.lessons),
            })) ?? []
          }
        />
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Kaydediliyor..."
            : curriculum
              ? "Değişiklikleri Kaydet"
              : "Müfredatı Oluştur"}
        </Button>
      </div>
    </form>
  );
}
