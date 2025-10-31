import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirect old trailing slash URLs to non-trailing slash
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '.*',
          },
        ],
      },
    ];
  },
}