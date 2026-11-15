import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export (deployed as plain HTML/CSS/JS on AWS Amplify Hosting).
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
