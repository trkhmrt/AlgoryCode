"use client";

import { useTransition } from "react";
import { deleteBlogPost } from "./actions";

export function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          !window.confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)
        ) {
          return;
        }

        startTransition(async () => {
          await deleteBlogPost(id);
        });
      }}
      className="text-sm text-red-300 transition-colors hover:text-red-200 disabled:opacity-50"
    >
      {pending ? "Siliniyor..." : "Sil"}
    </button>
  );
}
