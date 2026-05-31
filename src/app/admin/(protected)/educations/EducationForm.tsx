"use client";

import { useActionState, useEffect, useRef } from "react";
import type { Education } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";
import {
  EDUCATION_FORMAT_LABELS,
  EDUCATION_LEVEL_LABELS,
  EDUCATION_STATUS_LABELS,
  formatDateTimeLocal,
} from "@/lib/education";
import {
  createEducation,
  type EducationFormState,
  updateEducation,
} from "./actions";

const initialState: EducationFormState = {};

type EducationFormProps = {
  education?: Education;
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
  "min-h-[120px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

export function EducationForm({ education }: EducationFormProps) {
  const action = education
    ? updateEducation.bind(null, education.id)
    : createEducation;
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
          <h2 className="text-lg font-semibold">Genel Bilgiler</h2>
          <p className="mt-1 text-sm text-[#888]">
            Eğitimin başlığı, açıklaması ve yayın durumu.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Başlık" name="title" error={state.fieldErrors?.title}>
            <input
              id="title"
              name="title"
              required
              defaultValue={education?.title}
              className={inputClassName}
              placeholder="React ile Modern Web Geliştirme"
            />
          </Field>

          <Field label="Durum" name="status">
            <select
              id="status"
              name="status"
              defaultValue={education?.status ?? "DRAFT"}
              className={inputClassName}
            >
              {Object.entries(EDUCATION_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Kısa Açıklama"
          name="shortDescription"
          error={state.fieldErrors?.shortDescription}
        >
          <textarea
            id="shortDescription"
            name="shortDescription"
            required
            defaultValue={education?.shortDescription}
            className={textareaClassName}
            placeholder="Liste ve kartlarda görünen kısa özet."
          />
        </Field>

        <Field
          label="Detaylı Açıklama"
          name="fullDescription"
          error={state.fieldErrors?.fullDescription}
        >
          <textarea
            id="fullDescription"
            name="fullDescription"
            required
            defaultValue={education?.fullDescription}
            className={`${textareaClassName} min-h-[180px]`}
            placeholder="Eğitim detay sayfasında görünen tam açıklama."
          />
        </Field>

        <Field label="Kapak Görseli URL" name="coverImageUrl">
          <input
            id="coverImageUrl"
            name="coverImageUrl"
            type="url"
            defaultValue={education?.coverImageUrl ?? ""}
            className={inputClassName}
            placeholder="https://..."
          />
        </Field>
      </Card>

      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Eğitmen</h2>
          <p className="mt-1 text-sm text-[#888]">
            Eğitimi veren hoca bilgileri.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Eğitmen Adı"
            name="instructorName"
            error={state.fieldErrors?.instructorName}
          >
            <input
              id="instructorName"
              name="instructorName"
              required
              defaultValue={education?.instructorName}
              className={inputClassName}
            />
          </Field>

          <Field label="Eğitmen Ünvanı" name="instructorTitle">
            <input
              id="instructorTitle"
              name="instructorTitle"
              defaultValue={education?.instructorTitle ?? ""}
              className={inputClassName}
              placeholder="Senior Full Stack Developer"
            />
          </Field>
        </div>

        <Field label="Eğitmen Biyografisi" name="instructorBio">
          <textarea
            id="instructorBio"
            name="instructorBio"
            defaultValue={education?.instructorBio ?? ""}
            className={textareaClassName}
          />
        </Field>

        <Field label="Eğitmen Avatar URL" name="instructorAvatarUrl">
          <input
            id="instructorAvatarUrl"
            name="instructorAvatarUrl"
            type="url"
            defaultValue={education?.instructorAvatarUrl ?? ""}
            className={inputClassName}
            placeholder="https://..."
          />
        </Field>
      </Card>

      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Program ve Takvim</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Başlangıç Tarihi"
            name="startDate"
            error={state.fieldErrors?.startDate}
          >
            <input
              id="startDate"
              name="startDate"
              type="datetime-local"
              required
              defaultValue={
                education ? formatDateTimeLocal(new Date(education.startDate)) : ""
              }
              className={inputClassName}
            />
          </Field>

          <Field label="Bitiş Tarihi" name="endDate" error={state.fieldErrors?.endDate}>
            <input
              id="endDate"
              name="endDate"
              type="datetime-local"
              defaultValue={
                education?.endDate
                  ? formatDateTimeLocal(new Date(education.endDate))
                  : ""
              }
              className={inputClassName}
            />
          </Field>

          <Field label="Süre (Hafta)" name="durationWeeks">
            <input
              id="durationWeeks"
              name="durationWeeks"
              type="number"
              min={1}
              defaultValue={education?.durationWeeks ?? ""}
              className={inputClassName}
            />
          </Field>

          <Field label="Süre (Saat)" name="durationHours">
            <input
              id="durationHours"
              name="durationHours"
              type="number"
              min={1}
              defaultValue={education?.durationHours ?? ""}
              className={inputClassName}
            />
          </Field>

          <Field label="Program / Ders Saatleri" name="schedule">
            <input
              id="schedule"
              name="schedule"
              defaultValue={education?.schedule ?? ""}
              className={inputClassName}
              placeholder="Salı & Perşembe 19:00 - 21:00"
            />
          </Field>

          <Field label="Konum" name="location">
            <input
              id="location"
              name="location"
              defaultValue={education?.location ?? ""}
              className={inputClassName}
              placeholder="Online veya İstanbul / Maslak"
            />
          </Field>
        </div>
      </Card>

      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Format ve Fiyat</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Seviye" name="level">
            <select
              id="level"
              name="level"
              defaultValue={education?.level ?? "ALL_LEVELS"}
              className={inputClassName}
            >
              {Object.entries(EDUCATION_LEVEL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Format" name="format">
            <select
              id="format"
              name="format"
              defaultValue={education?.format ?? "ONLINE"}
              className={inputClassName}
            >
              {Object.entries(EDUCATION_FORMAT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Dil" name="language">
            <input
              id="language"
              name="language"
              defaultValue={education?.language ?? "tr"}
              className={inputClassName}
            />
          </Field>

          <Field label="Kontenjan" name="maxStudents">
            <input
              id="maxStudents"
              name="maxStudents"
              type="number"
              min={1}
              defaultValue={education?.maxStudents ?? ""}
              className={inputClassName}
            />
          </Field>

          <Field label="Para Birimi" name="currency">
            <input
              id="currency"
              name="currency"
              defaultValue={education?.currency ?? "TRY"}
              className={inputClassName}
            />
          </Field>

          <Field label="Fiyat" name="price" error={state.fieldErrors?.price}>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step="0.01"
              defaultValue={education?.price?.toString() ?? ""}
              className={inputClassName}
            />
          </Field>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#ededed]">
          <input
            type="checkbox"
            name="isFree"
            defaultChecked={education?.isFree ?? false}
            className="h-4 w-4 rounded border-[#333] bg-black"
          />
          Ücretsiz eğitim
        </label>
      </Card>

      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">İçerik Detayları</h2>
        </div>

        <Field label="Ön Koşullar" name="prerequisites">
          <textarea
            id="prerequisites"
            name="prerequisites"
            defaultValue={education?.prerequisites ?? ""}
            className={textareaClassName}
          />
        </Field>

        <Field label="Kazanımlar (her satıra bir madde)" name="learningOutcomes">
          <textarea
            id="learningOutcomes"
            name="learningOutcomes"
            defaultValue={education?.learningOutcomes.join("\n") ?? ""}
            className={textareaClassName}
          />
        </Field>

        <Field label="Müfredat" name="syllabus">
          <textarea
            id="syllabus"
            name="syllabus"
            defaultValue={education?.syllabus ?? ""}
            className={`${textareaClassName} min-h-[180px]`}
          />
        </Field>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Kaydediliyor..."
            : education
              ? "Değişiklikleri Kaydet"
              : "Eğitimi Oluştur"}
        </Button>
      </div>
    </form>
  );
}
