"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteEducation } from "./actions";

export function DeleteEducationButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      aria-label={pending ? "Siliniyor" : "Sil"}
      title={pending ? "Siliniyor..." : "Sil"}
      onClick={() => {
        if (
          !window.confirm(`"${title}" eğitimini silmek istediğinize emin misiniz?`)
        ) {
          return;
        }

        startTransition(async () => {
          await deleteEducation(id);
        });
      }}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-300 transition-colors hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-200 disabled:opacity-50"
    >
      <Trash2 size={15} />
    </button>
  );
}
