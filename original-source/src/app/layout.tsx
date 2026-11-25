import type { Metadata, Viewport } from 'next';
import { Layout } from '@/components/Layout';
import { SITE_CONFIG, absoluteUrl, contentAuthors } from '@/config/site';
import {
  OG_IMAGE_PATH,
  SITE_KEYWORDS,
  metadataBaseUrl,
  resolveSiteUrl,
} from '@/lib/seo';
import './globals.css';

const siteUrl = resolveSiteUrl();

export const metadataBase = metadataBaseUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111820',
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_CONFIG.name,
  verification: {
    google: '4BHqjUJ5n_6F9Pmrf_aAPVwy6TmwgPh5vgir-yAnQDg',
  },
  authors: contentAuthors.map((a) => ({
    name: a.name,
    url: absoluteUrl(siteUrl, a.url),
  })),
  creator: SITE_CONFIG.name,
  publisher: 'Semrush Group Buy',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — shared Semrush access`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [OG_IMAGE_PATH],
  },
  icons: {
    icon: [{ url: OG_IMAGE_PATH, type: 'image/svg+xml' }],
    apple: [{ url: OG_IMAGE_PATH, type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
