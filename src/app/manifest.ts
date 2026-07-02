import type { MetadataRoute } from "next";
import { site } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: "SKS",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
