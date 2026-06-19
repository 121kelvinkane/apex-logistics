import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from attempting to bundle Prisma into chunks
  serverExternalPackages: ["@prisma/client"], 
  
  // Explicitly map the path for the Turbopack engine
  turbopack: {
    resolveAlias: {
      "@prisma/client": "./node_modules/@prisma/client/default.js",
    },
  },
};

export default nextConfig;
