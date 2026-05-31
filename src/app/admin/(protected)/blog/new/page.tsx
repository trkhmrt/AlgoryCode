import type { Metadata } from "next";
import { BlogForm } from "../BlogForm";

export const metadata: Metadata = {
  title: "Yeni Blog Yazısı — Admin",
  description: "Yeni blog yazısı oluştur",
};

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Yeni Blog Yazısı</h1>
        <p className="mt-2 text-[#888]">
          Yazı bilgilerini doldurun ve yayın durumunu seçin.
        </p>
      </div>
      <BlogForm />
    </div>
  );
}
