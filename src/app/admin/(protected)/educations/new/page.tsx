import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { EducationForm } from "../EducationForm";

export const metadata: Metadata = {
  title: "Yeni Eğitim — Admin",
  description: "Yeni eğitim oluştur",
};

export default async function NewEducationPage() {
  const curricula = await prisma.curriculum.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Yeni Eğitim</h1>
        <p className="mt-2 text-[#888]">
          Eğitim bilgilerini doldurun, hazır müfredatı atayın ve yayın durumunu seçin.
        </p>
      </div>
      <EducationForm curricula={curricula} />
    </div>
  );
}
