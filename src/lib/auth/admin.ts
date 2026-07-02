import { verifyPassword } from "@/lib/auth/password";
import type { AdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<AdminSession | null> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  if (!admin) {
    return null;
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return null;
  }

  return {
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
  };
}

export { isAuthenticatedAdmin } from "@/lib/auth/session";
