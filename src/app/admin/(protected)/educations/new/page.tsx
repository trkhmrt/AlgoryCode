import type { Metadata } from "next";
import { EducationForm } from "../EducationForm";

export const metadata: Metadata = {
  title: "Yeni Eğitim — Admin",
  description: "Yeni eğitim oluştur",
};

export default function NewEducationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Yeni Eğitim</h1>
        <p className="mt-2 text-[#888]">
          Eğitim bilgilerini doldurun ve yayın durumunu seçin.
        </p>
      </div>
      <EducationForm />
    </div>
  );
}
