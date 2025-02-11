export async function GET() {
  const baseUrl = "https://schultetable.com";

  // Public pages that should be indexed
  const pages = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/schulte-table-game",
    "/login",
    "/register",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
