import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Нативный better-sqlite3 не должен попадать в webpack-бандл Server Components */
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
  ],
  /** SQLite-файл создаётся на шаге build (db push + seed); без этого файл может не попасть в serverless-функцию */
  outputFileTracingIncludes: {
    "/*": ["./prisma/dev.db"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
