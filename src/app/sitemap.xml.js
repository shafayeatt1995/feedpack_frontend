import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://feedpack.xyz/";

  const staticRoutes = ["/", "/login", "/privacy-policy", "/terms"];

  // Dynamic routes (Fetch from your API or database)
  //   const dynamicRoutes = await fetch(`${baseUrl}/api/posts`)
  //     .then((res) => res.json())
  //     .then((posts) => posts.map((post: { id: string }) => `/post/${post.id}`));

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(
        (route) => `
    <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <priority>1.0</priority>
    </url>`
      )
      .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
