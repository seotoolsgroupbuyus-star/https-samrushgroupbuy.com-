import type { MetadataRoute } from 'next';
import { resolveRequestOrigin } from '@/lib/seo';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = (await resolveRequestOrigin()).replace(/\/$/, '');
  const host = base.replace(/^https?:\/\//, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
