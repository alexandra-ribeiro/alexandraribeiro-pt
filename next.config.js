/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["v0.blob.com", "hebbkx1anhila5yf.public.blob.vercel-storage.com", "images.ctfassets.net"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v0.blob.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ]
  },
  async redirects() {
  return [
    {
      source: '/favicon.ico',
      destination: '/favicon.png',
      permanent: true,
    },
    {
        source: "/pt/blog/:slug*",
        destination: "https://pages.alexandraribeiro.pt/blog/:slug*",
        permanent: true, // 301
      },
  ]
}
}

module.exports = nextConfig
