import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/tonight", destination: "/entdecken", permanent: false },
      { source: "/live", destination: "/entdecken", permanent: false },
      { source: "/experience", destination: "/entdecken", permanent: false },
      {
        source: "/dine",
        destination: "/entdecken?kategorie=food",
        permanent: false,
      },
      { source: "/orte", destination: "/entdecken", permanent: false },
      { source: "/stimmen", destination: "/puls/stimmen", permanent: false },
      { source: "/pulse", destination: "/puls", permanent: false },
    ];
  },
};

export default nextConfig;
