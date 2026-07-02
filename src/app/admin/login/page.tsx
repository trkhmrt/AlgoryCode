import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Girişi — AlgoryCode",
  description: "AlgoryCode yönetim paneli girişi",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />
      </div>
    </main>
  );
}
