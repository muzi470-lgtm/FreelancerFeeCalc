// src/app/sitemap.js
// ✅ Delete /public/sitemap.xml after adding this file
// Next.js will automatically serve this at /sitemap.xml

import { platforms } from '@/data/platforms';
import { countries as taxRules } from '@/data/taxRules';  // <-- Fixed: import 'countries' as 'taxRules'

const BASE_URL = 'https://www.freelancefeecalc.site';

export default function sitemap() {
  const countries = Object.keys(taxRules);

  // Get all platform slugs — adjust this based on your platforms.js structure
  // If platforms is an array of objects with a .slug or .id field, update accordingly
  const platformSlugs = platforms.map((p) => p.slug ?? p.id ?? p.name?.toLowerCase().replace(/\s+/g, '-'));

  // Static routes
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  // Dynamic country/platform routes
  const dynamicRoutes = [];
  for (const country of countries) {
    for (const platform of platformSlugs) {
      dynamicRoutes.push({
        url: `${BASE_URL}/${country}/${platform}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}