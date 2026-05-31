"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/ToastProvider";
import {
  BLOG_STATUS_LABELS,
  type BlogPostFormValues,
  formatBlogTags,
} from "@/lib/blog";
import {
  createBlogPost,
  type BlogFormState,
  updateBlogPost,
} from "./actions";

const initialState: BlogFormState = {};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-[13px] font-medium text-[#ededed]">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

const textareaClassName =
  "min-h-[120px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

type BlogFormProps = {
  post?: BlogPostFormValues;
};

export function BlogForm({ post }: BlogFormProps) {
  const action = post ? updateBlogPost.bind(null, post.id) : createBlogPost;
  const [state, formAction, pending] = useActionState(action, initialState);
  const { success, error } = useToast();
  const wasPending = useRef(false);

  useEffect(() => {
    if (pending) {
      wasPending.current = true;
      return;
    }

    if (!wasPending.current) {
      return;
    }

    wasPending.current = false;

    if (state.success) {
      success(state.success);
      return;
    }

    if (state.error) {
      error(state.error);
      return;
    }

    if (state.fieldErrors && Object.keys(state.fieldErrors).length > 0) {
      error("Lütfen formdaki hatalı alanları düzeltin.");
    }
  }, [pending, state, success, error]);

  return (
    <form action={formAction} className="space-y-8">
      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Yazı Bilgileri</h2>
          <p className="mt-1 text-sm text-[#888]">
            Başlık, özet, içerik ve yayın durumu.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Başlık" name="title" error={state.fieldErrors?.title}>
            <input
              id="title"
              name="title"
              required
              defaultValue={post?.title}
              className={inputClassName}
              placeholder="Next.js 16 ile Daha Hızlı Ship Etmek"
            />
          </Field>

          <Field label="Durum" name="status">
            <select
              id="status"
              name="status"
              defaultValue={post?.status ?? "DRAFT"}
              className={inputClassName}
            >
              {Object.entries(BLOG_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Özet" name="excerpt" error={state.fieldErrors?.excerpt}>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            defaultValue={post?.excerpt}
            className={textareaClassName}
            placeholder="Yazının kısa özeti, liste ve detay sayfasında görünür."
          />
        </Field>

        <Field label="İçerik" name="content" error={state.fieldErrors?.content}>
          <textarea
            id="content"
            name="content"
            required
            defaultValue={post?.content}
            className={`${textareaClassName} min-h-[280px]`}
            placeholder="Paragrafları boş satırla ayırın."
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Etiketler"
            name="tags"
            error={state.fieldErrors?.tags}
          >
            <input
              id="tags"
              name="tags"
              defaultValue={post ? formatBlogTags(post.tags) : ""}
              className={inputClassName}
              placeholder="Next.js, Web, Performans"
            />
          </Field>

          <Field
            label="Okuma Süresi (dk)"
            name="readingMinutes"
            error={state.fieldErrors?.readingMinutes}
          >
            <input
              id="readingMinutes"
              name="readingMinutes"
              type="number"
              min={1}
              defaultValue={post?.readingMinutes ?? 5}
              className={inputClassName}
            />
          </Field>
        </div>
      </Card>

      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Yazar</h2>
          <p className="mt-1 text-sm text-[#888]">
            Yazının altında görünecek yazar bilgileri.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Yazar Adı"
            name="authorName"
            error={state.fieldErrors?.authorName}
          >
            <input
              id="authorName"
              name="authorName"
              required
              defaultValue={post?.authorName}
              className={inputClassName}
              placeholder="Tarik Hamarat"
            />
          </Field>

          <Field label="Yazar Ünvanı" name="authorTitle">
            <input
              id="authorTitle"
              name="authorTitle"
              defaultValue={post?.authorTitle ?? ""}
              className={inputClassName}
              placeholder="Kurucu, AlgoryCode"
            />
          </Field>

          <Field label="Yazar Avatar URL" name="authorAvatarUrl">
            <input
              id="authorAvatarUrl"
              name="authorAvatarUrl"
              defaultValue={post?.authorAvatarUrl ?? ""}
              className={inputClassName}
              placeholder="https://..."
            />
          </Field>

          <Field label="Kapak Görseli URL" name="coverImageUrl">
            <input
              id="coverImageUrl"
              name="coverImageUrl"
              defaultValue={post?.coverImageUrl ?? ""}
              className={inputClassName}
              placeholder="https://..."
            />
          </Field>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor..." : post ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  );
}
