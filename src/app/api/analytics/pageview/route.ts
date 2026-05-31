import { NextResponse } from "next/server";
import { getClientRequestMeta } from "@/lib/client-request-meta";
import { normalizePagePath, recordPageView } from "@/lib/analytics";

export const dynamic = "force-dynamic";

type PageViewPayload = {
  path?: string;
  referrer?: string | null;
};

export async function POST(request: Request) {
  let body: PageViewPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const path = typeof body.path === "string" ? normalizePagePath(body.path) : null;

  if (!path) {
    return NextResponse.json({ error: "Geçersiz path." }, { status: 400 });
  }

  try {
    const meta = await getClientRequestMeta(request);

    await recordPageView({
      path,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      deviceType: meta.deviceType,
      browser: meta.browser,
      os: meta.os,
      country: meta.country,
      city: meta.city,
      region: meta.region,
      referrer: body.referrer,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kayıt oluşturulamadı." }, { status: 500 });
  }
}
