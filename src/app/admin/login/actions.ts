"use server";

import { redirect } from "next/navigation";
import { authenticateAdmin } from "@/lib/auth/admin";
import {
  createAdminSessionCookie,
  deleteAdminSessionCookie,
} from "@/lib/auth/session";

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "E-posta ve şifre zorunludur." };
  }

  const session = await authenticateAdmin(email, password);
  if (!session) {
    return { error: "E-posta veya şifre hatalı." };
  }

  await createAdminSessionCookie(session);
  redirect("/admin");
}

export async function logout() {
  await deleteAdminSessionCookie();
  redirect("/admin/login");
}
