import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/education",
        destination: "/",
        permanent: false,
      },
      {
        source: "/education/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
