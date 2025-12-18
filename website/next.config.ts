import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
  images: {
    qualities: [100, 75],
  },
};

export default nextConfig;
