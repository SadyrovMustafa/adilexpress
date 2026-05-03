import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** Стабильный корень для Turbopack (не подниматься к родительскому package-lock) */
  turbopack: {
    root: projectRoot,
  },
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
