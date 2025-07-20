import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: 'standalone',
  env: {
    BASE_URL: process.env.BASE_URL
  }
}

export default nextConfig
