import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdmin(user)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-[#ededed]">
      <header className="border-b border-[#1a1a1a]">
        <div className="container-x flex h-16 items-center justify-between">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">
              AlgoryCode
            </p>
            <p className="text-sm font-medium">Admin Paneli</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#888] sm:inline">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-[#888] transition-colors hover:text-[#ededed]"
              >
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-x py-10">{children}</main>
    </div>
  );
}
