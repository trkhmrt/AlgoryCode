"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";
import {
  importEducationsFromJson,
  type ImportEducationsJsonState,
} from "./actions";

const initialState: ImportEducationsJsonState = {};

const EXAMPLE_JSON = `{
  "title": "React ile Modern Frontend",
  "shortDescription": "Liste kartında görünen kısa özet.",
  "fullDescription": "Detay sayfasındaki açıklama metni.",
  "instructorName": "Tarık Hamarat",
  "startDate": "2026-11-01",
  "level": "BEGINNER",
  "format": "ONLINE",
  "status": "DRAFT",
  "isFree": true,
  "track": "FRONTEND",
  "techLanguage": "React",
  "learningOutcomes": [
    "React temelleri",
    "Component yapısı"
  ],
  "prerequisites": "Temel HTML ve CSS bilgisi"
}`;

export function ImportEducationsJsonCard() {
  const [state, formAction, pending] = useActionState(
    importEducationsFromJson,
    initialState,
  );
  const { success, error } = useToast();
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
      return;
    }
    if (!wasPending.current) return;
    wasPending.current = false;

    if (state.success) success(state.success);
    if (state.error) error(state.error);
  }, [pending, state, success, error]);

  return (
    <Card className="space-y-4 p-6">
      <div>
        <h2 className="text-lg font-semibold text-[#ededed]">JSON Import</h2>
        <p className="mt-1 text-sm text-[#888]">
          Tek bir eğitim nesnesi veya eğitim dizisi yapıştırın. Kayıtlar
          veritabanına yazılır.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <textarea
          name="json"
          required
          spellCheck={false}
          defaultValue=""
          placeholder={EXAMPLE_JSON}
          className="min-h-[220px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 font-mono text-[12px] leading-relaxed text-[#ededed] outline-none placeholder:text-[#444] focus:border-[#333]"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "İçe aktarılıyor..." : "JSON'u İçe Aktar"}
          </Button>
          <p className="text-xs text-[#666]">
            Zorunlu: title, shortDescription, fullDescription, instructorName,
            startDate
          </p>
        </div>
      </form>
    </Card>
  );
}
