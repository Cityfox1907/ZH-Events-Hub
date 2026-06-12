import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/tonight", destination: "/entdecken", permanent: false },
      { source: "/live", destination: "/entdecken", permanent: false },
      { source: "/experience", destination: "/entdecken", permanent: false },
      { source: "/dine", destination: "/entdecken", permanent: false },
      { source: "/orte", destination: "/entdecken", permanent: false },
      // Alte Entdecken-Unterseiten → neue Übersicht
      { source: "/entdecken/kalender", destination: "/entdecken", permanent: false },
      { source: "/entdecken/kalender/:path*", destination: "/entdecken", permanent: false },
      { source: "/entdecken/orte", destination: "/entdecken", permanent: false },
      { source: "/entdecken/event/:path*", destination: "/entdecken", permanent: false },
      // Puls wurde entfernt
      { source: "/puls", destination: "/", permanent: false },
      { source: "/puls/:path*", destination: "/", permanent: false },
      { source: "/pulse", destination: "/", permanent: false },
      { source: "/pulse/:path*", destination: "/", permanent: false },
      { source: "/stimmen", destination: "/stadt-dialog", permanent: false },
    ];
  },
};

export default nextConfig;
