import { getAllCountrySlugs } from '@/data/taxRules';
import { getAllPlatformSlugs } from '@/data/platforms';

const BASE_URL = 'https://freelancefeecalc.site';

export async function GET() {
  const countrySlugs = getAllCountrySlugs();
  const platformSlugs = getAllPlatformSlugs();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  for (const country of countrySlugs) {
    for (const platform of platformSlugs) {
      xml += `
  <url>
    <loc>${BASE_URL}/${country}/${platform}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}