"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/ToastProvider";

type AdminQueryToastsProps = {
  created?: boolean;
  entityLabel?: string;
};

export function AdminQueryToasts({
  created,
  entityLabel = "Eğitim",
}: AdminQueryToastsProps) {
  const { success } = useToast();
  const shown = useRef(false);

  useEffect(() => {
    if (!created || shown.current) {
      return;
    }

    shown.current = true;
    success(
      entityLabel === "Müfredat"
        ? "Müfredat oluşturuldu. Eğitimlere atayabilirsiniz."
        : "Eğitim oluşturuldu. Yayınlamak için durumu “Yayında” yapın.",
    );
  }, [created, entityLabel, success]);

  return null;
}
