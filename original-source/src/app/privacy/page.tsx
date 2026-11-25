import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { ShieldCheck } from 'lucide-react';
import { OG_IMAGE_PATH, PRIVACY_EXTRA_KEYWORDS, SITE_KEYWORDS, resolveRequestOrigin } from '@/lib/seo';

const privacyTitle = 'Privacy Policy';
const privacyDescription = `How ${SITE_CONFIG.name} handles information when you use this site.`;

export async function generateMetadata(): Promise<Metadata> {
  const origin = await resolveRequestOrigin();
  const canonical = `${origin}/privacy`;
  const fullTitle = `${privacyTitle} | ${SITE_CONFIG.name}`;
  return {
    title: privacyTitle,
    description: privacyDescription,
    keywords: [...SITE_KEYWORDS, ...PRIVACY_EXTRA_KEYWORDS],
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: fullTitle,
      description: privacyDescription,
      siteName: SITE_CONFIG.name,
      locale: 'en_US',
      images: [
        {
          url: `${origin}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — Privacy`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: privacyDescription,
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

export default function PrivacyPage() {
  return (
    <div className="bg-background text-text min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Legal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">Privacy Policy</h1>
        <p className="text-muted text-sm mb-10">Last updated: April 2026</p>
        <div className="space-y-8 text-sm md:text-base text-muted leading-relaxed font-medium">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Overview</h2>
            <p>
              This policy describes how we collect, use, and protect information when you visit or use {SITE_CONFIG.name}. We
              aim to be transparent and keep this page in plain language.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Information we collect</h2>
            <p>
              We may collect information you provide directly (for example, email or account details when you sign up or
              contact support), and technical data such as IP address, browser type, and pages viewed, to run and secure the
              service.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Cookies &amp; similar tech</h2>
            <p>
              We may use cookies or local storage for essential site functionality, preferences, and analytics. You can control
              cookies through your browser settings where supported.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">How we use data</h2>
            <p>
              We use collected information to operate the site, process requests, improve performance, prevent abuse, and
              comply with legal obligations. We do not sell your personal information.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">Contact</h2>
            <p>
              For privacy-related questions, contact us through the support channels listed on this site. We may update this
              policy from time to time; the &quot;Last updated&quot; date above will change when we do.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
