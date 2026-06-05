"use client";

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
        className="text-left text-sm text-[#888] transition-colors hover:text-[#ededed]"
      >
        Kopyala
      </button>
    </form>
  );
}
