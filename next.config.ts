import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js not to bundle Prisma, fixing the module error
  serverComponentsExternalPackages: ['@prisma/client'],
};

export default nextConfig;