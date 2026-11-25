import { SITE_CONFIG, absoluteUrl, getAuthorForSlug, PAGES, type PageData } from '@/config/site';
import { headers } from 'next/headers';

export const OG_IMAGE_PATH = '/og.svg';

/** ISO timestamps for article OG / schema (adjust when you ship real content updates). */
export const ARTICLE_PUBLISHED_ISO = '2026-01-15T08:00:00.000Z';
export const ARTICLE_MODIFIED_ISO = '2026-04-08T08:00:00.000Z';

/** Site-wide keywords (layout + article pages). */
export const SITE_KEYWORDS: string[] = [
  'Semrush group buy',
  'Semrush shared access',
  'Semrush SEO tools',
  'keyword research',
  'site audit',
  'SEO group buy',
  'affordable Semrush',
  'Semrush Pro',
  'Semrush Guru',
  'SEO toolkit',
  'digital marketing tools',
];

export const PRIVACY_EXTRA_KEYWORDS: string[] = [
  'privacy policy',
  'data protection',
  'cookies',
  'GDPR',
  'personal information',
  'how we use data',
];

/**
 * Fallback origin when there is **no HTTP request** (e.g. `next build`, or code
 * that cannot call `headers()`). Order: `NEXT_PUBLIC_SITE_URL` → production /
 * preview env → `SITE_CONFIG.url`.
 *
 * For **live** sitemap, robots, and per-page canonicals, prefer
 * {@link resolveRequestOrigin} so URLs match whichever domain the site is
 * actually served on.
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  // IMPORTANT:
  // - In production we prefer the real site domain (SITE_CONFIG.url) to avoid canonicals
  //   pointing at *.vercel.app when a custom domain is attached.
  // - In preview/development, falling back to the current deployment host is useful.
  const isProd =
    process.env.VERCEL_ENV === 'production' ||
    process.env.NODE_ENV === 'production';

  if (isProd) {
    return SITE_CONFIG.url.replace(/\/$/, '');
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `https://${host}`;
  }

  return SITE_CONFIG.url.replace(/\/$/, '');
}

export function metadataBaseUrl(): URL {
  return new URL(`${resolveSiteUrl()}/`);
}

/**
 * Live request origin: **`Host` / `X-Forwarded-Host`** + protocol from the
 * current request, so the same deployment works on any domain you attach
 * (custom, preview, local) without hardcoding URLs in sitemap or metadata.
 *
 * If headers are missing, falls back to {@link resolveSiteUrl}.
 */
export async function resolveRequestOrigin(): Promise<string> {
  try {
    const h = await headers();
    const proto = (h.get('x-forwarded-proto') ?? 'https').split(',')[0].trim();
    const host = (h.get('x-forwarded-host') ?? h.get('host') ?? '').split(',')[0].trim();
    if (host) return `${proto}://${host}`;
  } catch {
    // headers() not available (e.g. some build contexts)
  }
  return resolveSiteUrl();
}

export function absoluteOgImage(): string {
  return absoluteUrl(resolveSiteUrl(), OG_IMAGE_PATH);
}

const ORG_ID_SUFFIX = '#organization';
const WEBSITE_ID_SUFFIX = '#website';

export function organizationJsonLd(base: string) {
  const origin = base.replace(/\/$/, '');
  return {
    '@type': 'Organization',
    '@id': `${origin}/${ORG_ID_SUFFIX}`,
    name: 'Semrush Group Buy',
    alternateName: SITE_CONFIG.name,
    url: origin,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(origin, OG_IMAGE_PATH),
    },
  };
}

export function websiteJsonLd(base: string) {
  const origin = base.replace(/\/$/, '');
  return {
    '@type': 'WebSite',
    '@id': `${origin}/${WEBSITE_ID_SUFFIX}`,
    url: origin,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    inLanguage: 'en',
    publisher: { '@id': `${origin}/${ORG_ID_SUFFIX}` },
  };
}

export function homeJsonLdGraph(base: string) {
  const org = organizationJsonLd(base);
  const site = websiteJsonLd(base);
  return {
    '@context': 'https://schema.org',
    '@graph': [org, site],
  };
}

export function slugPageJsonLdGraph(
  base: string,
  page: PageData,
  metaDesc: string,
  pageCanonicalUrl: string,
  authorProfileUrl: string
) {
  const origin = base.replace(/\/$/, '');
  const org = organizationJsonLd(base);
  const site = websiteJsonLd(base);
  const webPageId = `${pageCanonicalUrl}#webpage`;
  const breadcrumbId = `${pageCanonicalUrl}#breadcrumb`;
  const articleId = `${pageCanonicalUrl}#article`;

  const author = getAuthorForSlug(page.slug);

  const breadcrumbItems: { '@type': string; position: number; name: string; item: string }[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
  ];
  if (page.parentSlug && PAGES[page.parentSlug]) {
    const parent = PAGES[page.parentSlug];
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: parent.title,
      item: `${origin}/${parent.slug}`,
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: page.title,
      item: pageCanonicalUrl,
    });
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: page.title,
      item: pageCanonicalUrl,
    });
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': webPageId,
    url: pageCanonicalUrl,
    name: page.title,
    description: metaDesc,
    isPartOf: { '@id': `${origin}/${WEBSITE_ID_SUFFIX}` },
    breadcrumb: { '@id': breadcrumbId },
    inLanguage: 'en-US',
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: breadcrumbItems,
  };

  const article = {
    '@type': 'Article',
    '@id': articleId,
    mainEntityOfPage: { '@id': webPageId },
    headline: page.title,
    description: metaDesc,
    url: pageCanonicalUrl,
    datePublished: ARTICLE_PUBLISHED_ISO,
    dateModified: ARTICLE_MODIFIED_ISO,
    articleSection: page.cluster,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      url: authorProfileUrl,
      ...(author.imageUrl ? { image: author.imageUrl } : {}),
      ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
      worksFor: { '@id': `${origin}/${ORG_ID_SUFFIX}` },
    },
    publisher: { '@id': `${origin}/${ORG_ID_SUFFIX}` },
    image: absoluteUrl(origin, OG_IMAGE_PATH),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [org, site, webPage, breadcrumb, article],
  };
}

export function articleKeywordsForPage(page: PageData): string[] {
  return [...SITE_KEYWORDS, page.cluster, page.title, page.slug.replace(/-/g, ' ')];
}
