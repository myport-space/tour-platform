/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle Prisma client during build
      config.externals.push({
        "@prisma/client": "commonjs @prisma/client",
      })
    }

    // Ignore Prisma client generation errors during build
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Ignore missing Prisma client during build
    config.plugins.push(
      new config.webpack.IgnorePlugin({
        resourceRegExp: /^\.prisma\/client$/,
      }),
    )

    return config
  },
}

module.exports = nextConfig
