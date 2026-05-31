import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Girişi — AlgoryCode",
  description: "AlgoryCode yönetim paneli girişi",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const unauthorized = params.error === "unauthorized";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-4">
        {unauthorized ? (
          <p className="rounded-md border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Bu hesabın admin erişimi yok.
          </p>
        ) : null}
        <LoginForm />
      </div>
    </main>
  );
}
