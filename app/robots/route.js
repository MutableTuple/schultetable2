export async function GET() {
  const content = `User-agent: *
  Allow: /
  Disallow: /profile
  Disallow: /account
  Disallow: /login
  Disallow: /register
  Sitemap: https://schultetable.com/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
