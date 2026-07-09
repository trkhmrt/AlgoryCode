"use client";

import { Copy } from "lucide-react";
import { duplicateEducation } from "./actions";

type DuplicateEducationButtonProps = {
  id: string;
  title: string;
};

export function DuplicateEducationButton({
  id,
  title,
}: DuplicateEducationButtonProps) {
  return (
    <form
      action={duplicateEducation.bind(null, id)}
      onSubmit={(event) => {
        if (
          !window.confirm(`"${title}" eğitimini kopyalamak istediğinize emin misiniz?`)
        ) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label="Kopyala"
        title="Kopyala"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10 text-amber-300 transition-colors hover:border-amber-500/40 hover:bg-amber-500/20 hover:text-amber-200"
      >
        <Copy size={15} />
      </button>
    </form>
  );
}
