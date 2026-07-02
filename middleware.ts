import { type NextRequest, NextResponse } from "next/server";
import {
  getAdminSessionFromRequest,
  isAuthenticatedAdmin,
} from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const session = await getAdminSessionFromRequest(request);

  if (isLoginPage) {
    if (isAuthenticatedAdmin(session)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticatedAdmin(session)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
