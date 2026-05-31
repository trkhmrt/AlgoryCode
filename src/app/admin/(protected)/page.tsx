import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin — AlgoryCode",
  description: "AlgoryCode yönetim paneli",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading text-3xl font-semibold">Hoş geldiniz</h1>
        <p className="mt-2 text-[#888]">
          Yönetim paneline başarıyla giriş yaptınız.
        </p>
      </div>

      <Card className="p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
              E-posta
            </dt>
            <dd className="mt-1 text-sm">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-[13px] uppercase tracking-[0.12em] text-[#888]">
              Rol
            </dt>
            <dd className="mt-1 text-sm">Admin</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
