export type ClientDeviceInfo = {
  userAgent: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
};

export type ClientGeoInfo = {
  country: string | null;
  city: string | null;
  region: string | null;
};

export type ClientRequestMeta = ClientDeviceInfo &
  ClientGeoInfo & {
    ipAddress: string | null;
  };

export function getClientIpFromRequest(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) {
      return ip.slice(0, 45);
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp.slice(0, 45);
  }

  return null;
}

function isPrivateIp(ip: string): boolean {
  if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("127.")) {
    return true;
  }

  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("169.254.")) {
    return true;
  }

  const parts = ip.split(".");
  if (parts.length === 4 && parts[0] === "172") {
    const second = Number(parts[1]);
    return second >= 16 && second <= 31;
  }

  return false;
}

export function parseUserAgent(userAgent: string | null): ClientDeviceInfo {
  if (!userAgent) {
    return {
      userAgent: null,
      deviceType: null,
      browser: null,
      os: null,
    };
  }

  let deviceType = "desktop";

  if (/bot|crawler|spider|slurp|facebookexternalhit|headless/i.test(userAgent)) {
    deviceType = "bot";
  } else if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(userAgent)) {
    deviceType = "tablet";
  } else if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(userAgent)) {
    deviceType = "mobile";
  }

  let browser: string | null = null;

  if (userAgent.includes("Edg/")) {
    browser = "Edge";
  } else if (userAgent.includes("OPR/") || userAgent.includes("Opera")) {
    browser = "Opera";
  } else if (userAgent.includes("Chrome/")) {
    browser = "Chrome";
  } else if (userAgent.includes("Firefox/")) {
    browser = "Firefox";
  } else if (userAgent.includes("Safari/")) {
    browser = "Safari";
  }

  const ua = userAgent.toLowerCase();
  let os: string | null = null;

  if (ua.includes("windows")) {
    os = "Windows";
  } else if (ua.includes("mac os") || ua.includes("macintosh")) {
    os = "macOS";
  } else if (ua.includes("android")) {
    os = "Android";
  } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) {
    os = "iOS";
  } else if (ua.includes("linux")) {
    os = "Linux";
  }

  return {
    userAgent: userAgent.slice(0, 500),
    deviceType,
    browser,
    os,
  };
}

function getGeoFromHeaders(request: Request): ClientGeoInfo {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");

  const city =
    request.headers.get("x-vercel-ip-city") ??
    request.headers.get("cf-ipcity");

  const region =
    request.headers.get("x-vercel-ip-country-region") ??
    request.headers.get("cf-region");

  return {
    country: country?.slice(0, 100) ?? null,
    city: city ? decodeURIComponent(city).slice(0, 100) : null,
    region: region?.slice(0, 100) ?? null,
  };
}

async function lookupGeoFromIp(ip: string): Promise<ClientGeoInfo | null> {
  if (isPrivateIp(ip)) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      error?: boolean;
      country_name?: string;
      country_code?: string;
      city?: string;
      region?: string;
    };

    if (data.error) {
      return null;
    }

    return {
      country: data.country_name ?? data.country_code ?? null,
      city: data.city ?? null,
      region: data.region ?? null,
    };
  } catch {
    return null;
  }
}

export async function getClientRequestMeta(
  request: Request,
): Promise<ClientRequestMeta> {
  const ipAddress = getClientIpFromRequest(request);
  const device = parseUserAgent(request.headers.get("user-agent"));
  const headerGeo = getGeoFromHeaders(request);

  const hasHeaderGeo = Boolean(headerGeo.country || headerGeo.city || headerGeo.region);

  if (hasHeaderGeo || !ipAddress) {
    return {
      ipAddress,
      ...device,
      ...headerGeo,
    };
  }

  const ipGeo = await lookupGeoFromIp(ipAddress);

  return {
    ipAddress,
    ...device,
    country: headerGeo.country ?? ipGeo?.country ?? null,
    city: headerGeo.city ?? ipGeo?.city ?? null,
    region: headerGeo.region ?? ipGeo?.region ?? null,
  };
}

export const DEVICE_TYPE_LABELS: Record<string, string> = {
  desktop: "Masaüstü",
  mobile: "Mobil",
  tablet: "Tablet",
  bot: "Bot",
};

export function formatVisitDevice(input: {
  browser?: string | null;
  os?: string | null;
  deviceType?: string | null;
}): string {
  const parts = [
    input.browser,
    input.os,
    input.deviceType ? DEVICE_TYPE_LABELS[input.deviceType] ?? input.deviceType : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : "—";
}

export function formatVisitLocation(input: {
  city?: string | null;
  region?: string | null;
  country?: string | null;
}): string {
  const parts = [input.city, input.region, input.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}
