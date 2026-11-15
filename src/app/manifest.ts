import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shubham Sale, Full Stack Developer",
    short_name: "Shubham Sale",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1c",
    theme_color: "#0a0f1c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
