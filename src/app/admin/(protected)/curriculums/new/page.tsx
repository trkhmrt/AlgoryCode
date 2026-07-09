import type { Metadata } from "next";
import { CurriculumForm } from "../CurriculumForm";

export const metadata: Metadata = {
  title: "Yeni Müfredat — Admin",
  description: "Yeni müfredat oluştur",
};

export default function NewCurriculumPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Yeni Müfredat</h1>
        <p className="mt-2 text-[#888]">
          Konu başlıklarını ve dersleri tanımlayın, sonra eğitimlere atayın.
        </p>
      </div>
      <CurriculumForm />
    </div>
  );
}
