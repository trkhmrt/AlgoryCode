"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/ToastProvider";

type BlogQueryToastsProps = {
  created?: boolean;
};

export function BlogQueryToasts({ created }: BlogQueryToastsProps) {
  const { success } = useToast();
  const shown = useRef(false);

  useEffect(() => {
    if (!created || shown.current) {
      return;
    }

    shown.current = true;
    success("Blog yazısı oluşturuldu. Yayınlamak için durumu “Yayında” yapın.");
  }, [created, success]);

  return null;
}
