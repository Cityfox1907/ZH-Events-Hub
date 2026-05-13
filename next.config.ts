import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/tonight", destination: "/entdecken/kalender", permanent: false },
      { source: "/live", destination: "/entdecken/kalender", permanent: false },
      { source: "/experience", destination: "/entdecken/kalender", permanent: false },
      {
        source: "/dine",
        destination: "/entdecken/orte?kategorie=food",
        permanent: false,
      },
      { source: "/orte", destination: "/entdecken/orte", permanent: false },
      { source: "/stimmen", destination: "/puls/stimmen", permanent: false },
      { source: "/pulse", destination: "/puls", permanent: false },
    ];
  },
};

export default nextConfig;
