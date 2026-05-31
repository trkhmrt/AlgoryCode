"use client";

import { useTransition } from "react";
import { deleteEducation } from "./actions";

export function DeleteEducationButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
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
      className="text-sm text-red-300 transition-colors hover:text-red-200 disabled:opacity-50"
    >
      {pending ? "Siliniyor..." : "Sil"}
    </button>
  );
}
