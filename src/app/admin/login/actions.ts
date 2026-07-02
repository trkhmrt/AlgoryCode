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

  if (!process.env.DATABASE_URL) {
    return { error: "Veritabanı yapılandırması eksik (DATABASE_URL)." };
  }

  if (!process.env.ADMIN_SESSION_SECRET) {
    return { error: "Oturum yapılandırması eksik (ADMIN_SESSION_SECRET)." };
  }

  let session;
  try {
    session = await authenticateAdmin(email, password);
  } catch (error) {
    console.error("Admin login database error:", error);
    return {
      error: "Veritabanına bağlanılamadı. Lütfen daha sonra tekrar deneyin.",
    };
  }

  if (!session) {
    return { error: "E-posta veya şifre hatalı." };
  }

  try {
    await createAdminSessionCookie(session);
  } catch (error) {
    console.error("Admin session cookie error:", error);
    return { error: "Oturum oluşturulamadı. Sunucu yapılandırmasını kontrol edin." };
  }

  redirect("/admin");
}

export async function logout() {
  await deleteAdminSessionCookie();
  redirect("/admin/login");
}
