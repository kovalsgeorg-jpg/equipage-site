import type { NextConfig } from "next";

/** STATIC_EXPORT=1 собирает статическую копию (GitHub Pages):
 *  без API-роута, с basePath из PAGES_BASE и неоптимизированными картинками. */
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export" as const, basePath, assetPrefix: basePath } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isExport,
  },
};

export default nextConfig;
