import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/tonight", destination: "/entdecken", permanent: false },
      { source: "/live", destination: "/entdecken", permanent: false },
      { source: "/experience", destination: "/entdecken", permanent: false },
      { source: "/dine", destination: "/orte", permanent: false },
    ];
  },
};

export default nextConfig;
