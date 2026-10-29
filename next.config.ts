import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kostenklar.de' }],
        destination: 'https://kostenklar.de/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
