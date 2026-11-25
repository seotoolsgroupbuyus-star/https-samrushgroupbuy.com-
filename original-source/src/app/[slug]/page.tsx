import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  PAGES,
  SITE_CONFIG,
  getAuthorForSlug,
  absoluteUrl,
} from '@/config/site';
import { DynamicPage } from '@/views/DynamicPage';
import {
  ARTICLE_MODIFIED_ISO,
  ARTICLE_PUBLISHED_ISO,
  OG_IMAGE_PATH,
  articleKeywordsForPage,
  resolveRequestOrigin,
  slugPageJsonLdGraph,
} from '@/lib/seo';

const SITE_NAME = 'Semrush Group Buy';

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) {
    return { title: SITE_NAME };
  }
  const metaTitle = page.metaTitle ?? `${page.title} | ${SITE_NAME}`;
  const metaDesc = page.metaDescription ?? page.description;
  const origin = await resolveRequestOrigin();
  const pageCanonicalUrl = `${origin}/${page.slug}`;
  const author = getAuthorForSlug(page.slug);
  const authorUrl = absoluteUrl(origin, author.url);

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: articleKeywordsForPage(page),
    authors: [{ name: author.name, url: authorUrl }],
    creator: author.name,
    publisher: SITE_NAME,
    alternates: {
      canonical: pageCanonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: pageCanonicalUrl,
      title: metaTitle,
      description: metaDesc,
      siteName: SITE_CONFIG.name,
      locale: 'en_US',
      publishedTime: ARTICLE_PUBLISHED_ISO,
      modifiedTime: ARTICLE_MODIFIED_ISO,
      authors: [authorUrl],
      section: page.cluster,
      images: [
        {
          url: `${origin}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [`${origin}${OG_IMAGE_PATH}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) redirect('/');

  const author = getAuthorForSlug(page.slug);
  const origin = await resolveRequestOrigin();
  const authorProfileUrl = absoluteUrl(origin, author.url);
  const pageCanonicalUrl = `${origin}/${page.slug}`;
  const metaDesc = page.metaDescription ?? page.description;

  const graph = slugPageJsonLdGraph(origin, page, metaDesc, pageCanonicalUrl, authorProfileUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <DynamicPage slug={slug} />
    </>
  );
}
