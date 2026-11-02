import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.asaanlabs.tech/sitemap.xml",
    host: "https://www.asaanlabs.tech",
  };
}
