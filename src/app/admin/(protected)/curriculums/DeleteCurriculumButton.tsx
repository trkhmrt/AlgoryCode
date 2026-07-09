"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { deleteCurriculum } from "./actions";

type DeleteCurriculumButtonProps = {
  id: string;
  title: string;
};

export function DeleteCurriculumButton({
  id,
  title,
}: DeleteCurriculumButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={pending}
      onClick={() => {
        if (
          !window.confirm(
            `"${title}" müfredatını silmek istediğinize emin misiniz? Atandığı eğitimlerden kaldırılır.`,
          )
        ) {
          return;
        }

        startTransition(async () => {
          await deleteCurriculum(id);
        });
      }}
    >
      {pending ? "Siliniyor..." : "Sil"}
    </Button>
  );
}
