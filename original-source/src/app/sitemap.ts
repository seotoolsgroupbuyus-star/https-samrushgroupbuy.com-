import type { MetadataRoute } from 'next';
import { PAGES } from '@/config/site';
import { resolveSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl().replace(/\/$/, '');
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const slugRoutes: MetadataRoute.Sitemap = Object.keys(PAGES).map((slug) => ({
    url: `${base}/${slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: pagePriority(slug),
  }));

  return [...staticRoutes, ...slugRoutes];
}

function pagePriority(slug: string): number {
  const page = PAGES[slug];
  if (page?.isPillar) return 0.9;
  return 0.75;
}
