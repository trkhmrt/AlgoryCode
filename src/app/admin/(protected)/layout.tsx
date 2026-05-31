import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";
import { AdminSidebar } from "./AdminSidebar";

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
            <Link
              href="/education"
              className="hidden text-sm text-[#888] transition-colors hover:text-[#ededed] sm:inline"
            >
              Siteyi Gör
            </Link>
            <span className="hidden text-sm text-[#888] md:inline">
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

      <div className="container-x flex flex-col lg:flex-row">
        <AdminSidebar />
        <main className="min-w-0 flex-1 py-8 lg:py-10 lg:pl-10">
          {children}
        </main>
      </div>
    </div>
  );
}
