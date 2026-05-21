export const dynamic = 'force-static';

import { getAllCountrySlugs } from '@/data/taxRules';
import { getAllPlatformSlugs } from '@/data/platforms';

const BASE_URL = 'https://freelancefeecalc.site';

export default async function sitemap() {
  const countrySlugs = getAllCountrySlugs();
  const platformSlugs = getAllPlatformSlugs();
  
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
  
  const dynamicPages = [];
  
  for (const country of countrySlugs) {
    for (const platform of platformSlugs) {
      dynamicPages.push({
        url: `${BASE_URL}/${country}/${platform}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }
  
  return [...staticPages, ...dynamicPages];
}