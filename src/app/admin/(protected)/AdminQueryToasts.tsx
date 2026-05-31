"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/ToastProvider";

type AdminQueryToastsProps = {
  created?: boolean;
};

export function AdminQueryToasts({ created }: AdminQueryToastsProps) {
  const { success } = useToast();
  const shown = useRef(false);

  useEffect(() => {
    if (!created || shown.current) {
      return;
    }

    shown.current = true;
    success("Eğitim oluşturuldu. Yayınlamak için durumu “Yayında” yapın.");
  }, [created, success]);

  return null;
}
