import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Girişi — AlgoryCode",
  description: "AlgoryCode yönetim paneli girişi",
};

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.18]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]"
        aria-hidden
      />
      <div className="relative w-full max-w-md space-y-4">
        <LoginForm />
      </div>
    </main>
  );
}
