import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
  images: {
    qualities: [100, 75],
  },
};

export default nextConfig;
