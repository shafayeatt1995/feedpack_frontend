const fs = require("fs");
const path = require("path");

const generateSitemap = async () => {
  const baseUrl = "https://feedpack.xyz";
  const staticRoutes = ["/", "/login", "/privacy-policy", "/terms"];

  const allRoutes = [...staticRoutes];

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

  const filePath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(filePath, sitemap, "utf-8");
  console.log("Sitemap generated at:", filePath);
};

generateSitemap().catch((error) => {
  console.error("Error generating sitemap:", error);
});
