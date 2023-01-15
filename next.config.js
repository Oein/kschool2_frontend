/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://port-0-kschool2-backend-4i0mp24lct3difg.jocoding.cloud/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
