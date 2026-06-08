// src/app/sitemap.js
// ✅ Delete /public/sitemap.xml after adding this file
// Next.js will automatically serve this at /sitemap.xml

import { platforms, getAllPlatformSlugs } from '@/data/platforms';
import { countries as taxRules } from '@/data/taxRules';

const BASE_URL = 'https://www.freelancefeecalc.site';

export default function sitemap() {
  const countries = Object.keys(taxRules);

  // platforms is an object keyed by slug, so use Object.keys or getAllPlatformSlugs()
  const platformSlugs = getAllPlatformSlugs();

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