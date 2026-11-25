import { Home } from '@/views/Home';
import { SITE_CONFIG } from '@/config/site';
import type { Metadata } from 'next';
import { homeJsonLdGraph, OG_IMAGE_PATH, SITE_KEYWORDS, resolveRequestOrigin } from '@/lib/seo';

const HOME_META_TITLE = 'Semrush Group Buy Premium SEO Access Low Cost';
const HOME_META_DESCRIPTION =
  'Affordable Semrush shared access for freelancers and teams. Compare tiers, understand limits, and get a stable SEO toolkit without retail cost.';

export async function generateMetadata(): Promise<Metadata> {
  const origin = await resolveRequestOrigin();
  return {
    title: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    alternates: {
      canonical: `${origin}/`,
    },
    openGraph: {
      type: 'website',
      url: `${origin}/`,
      title: HOME_META_TITLE,
      description: HOME_META_DESCRIPTION,
      siteName: SITE_CONFIG.name,
      locale: 'en_US',
      images: [
        {
          url: `${origin}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: HOME_META_TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: HOME_META_TITLE,
      description: HOME_META_DESCRIPTION,
      images: [`${origin}${OG_IMAGE_PATH}`],
    },
  };
}

export default async function Page() {
  const origin = await resolveRequestOrigin();
  const graph = homeJsonLdGraph(origin);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <Home />
    </>
  );
}
