export interface PageData {
  slug: string;
  title: string;
  description: string;
  content: string;
  cluster: string;
  isPillar: boolean;
  parentSlug?: string;
  /** SERP title (optional); defaults to `${title} | site` in layout */
  metaTitle?: string;
  /** SERP / og description override */
  metaDescription?: string;
  /** Sidebar “On this page” for long guides */
  toc?: { id: string; label: string }[];
  /** Hero H1 uses sentence case instead of uppercase */
  heroSentenceCase?: boolean;
}

/** Site content writers — assignment per page via slug hash % length */
export interface ContentAuthor {
  name: string;
  jobTitle: string;
  bio: string;
  /** Profile or site link (path like "/" or full URL) */
  url: string;
  /** Optional headshot */
  imageUrl?: string;
  /** schema.org sameAs (e.g. LinkedIn, X) */
  sameAs?: string[];
}

export const contentAuthors: ContentAuthor[] = [
  {
    name: "Bilal Fridi",
    jobTitle: "SEO Editor",
    bio: "Covers Semrush Group Buy plans, toolkit setup, and how to get reliable data without overpaying for retail seats.",
    url: "/",
    sameAs: [],
  },
  {
    name: "Abdul Waheed",
    jobTitle: "Technical SEO Writer",
    bio: "Focuses on audits, limits, fair use, and staying stable on shared access — written for freelancers and small agencies.",
    url: "/",
    sameAs: [],
  },
  {
    name: "Saeed Fadi",
    jobTitle: "Content Strategist",
    bio: "Writes comparison and trust guides: providers, pricing angles, and what to expect from group buy Semrush access.",
    url: "/",
    sameAs: [],
  },
];

/** Deterministic author per slug: same URL → same writer on every visit */
export function authorIndexForSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % contentAuthors.length;
}

export function getAuthorForSlug(slug: string): ContentAuthor {
  return contentAuthors[authorIndexForSlug(slug)];
}

export function authorInitialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function absoluteUrl(siteBase: string, pathOrUrl: string): string {
  const base = siteBase.replace(/\/$/, "");
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export const SITE_CONFIG = {
  name: "SemrushGroupBuy",
  url: "https://samrushgroupbuy.com",
  description: "Premium Semrush Group Buy Access for SEO Professionals.",
  clusters: [
    {
      name: "Main",
      pillar: "semrush-group-buy-guide",
      supporting: [
        "what-is-semrush-group-buy",
        "is-semrush-group-buy-worth-it",
        "semrush-group-buy-review",
        "pros-and-cons-of-semrush-group-buy",
        "semrush-group-buy-for-beginners",
        "why-search-for-semrush-group-buy"
      ]
    },
    {
      name: "Trust",
      pillar: "best-semrush-group-buy-provider",
      supporting: [
        "trusted-semrush-group-buy-sites",
        "provider-review-guide",
        "semrush-group-buy-scam-or-legit",
        "how-to-choose-semrush-provider",
        "uptime-guarantee-comparison",
        "semrush-group-buy-reddit-reviews"
      ]
    },
    {
      name: "Pricing",
      pillar: "semrush-group-buy-pricing",
      supporting: [
        "cheap-semrush-group-buy-price",
        "cheap-semrush-access-guide",
        "semrush-cost-comparison",
        "low-cost-seo-tools",
        "semrush-monthly-price-breakdown",
        "best-cheap-semrush-options"
      ]
    },
    {
      name: "Risks",
      pillar: "semrush-group-buy-risks",
      supporting: [
        "semrush-group-buy-limitations",
        "daily-report-limits",
        "no-projects-limitation",
        "account-bans-prevention",
        "is-semrush-group-buy-safe",
        "common-group-buy-problems"
      ]
    },
    {
      name: "Alternatives",
      pillar: "best-plan-instead-of-semrush-group-buy",
      supporting: [
        "semrush-alternative-list",
        "best-seo-tool-alternatives",
        "group-buy-vs-official-semrush",
        "group-buy-vs-semrush-starter",
        "is-semrush-starter-better",
        "best-option-for-seo-tools"
      ]
    }
  ]
};

export const PAGES: Record<string, PageData> = {};

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function stripDashes(text: string): string {
  return text.replace(/[-–—]+/g, " ").replace(/\s+/g, " ").trim();
}

function fitTitle(text: string): string {
  // Requirement: 40–60 characters, no dashes.
  let t = stripDashes(text);
  if (t.length < 40) t = `${t} 2026 Guide`;
  if (t.length < 40) t = `${t} and Checklist`;
  if (t.length > 60) t = t.slice(0, 60).replace(/\s+\S*$/, "").trim();
  if (t.length < 40) t = `${t} 2026`.trim();
  return t;
}

function fitDescription(text: string): string {
  // Requirement: 130–160 characters, no dashes.
  let d = stripDashes(text);
  if (d.length < 130) {
    d = `${d} Compare tiers, understand limits, and choose a stable option without paying full retail pricing.`;
    d = stripDashes(d);
  }
  if (d.length > 160) d = d.slice(0, 160).replace(/\s+\S*$/, "").trim();
  return d;
}

function metaTitleForPage(slug: string, isPillar: boolean): string {
  const base = titleFromSlug(slug);
  return isPillar
    ? fitTitle(`${base} 2026 Complete Guide for Buyers`)
    : fitTitle(`${base} 2026 What to Expect and Limits`);
}

function metaDescriptionForPage(slug: string, cluster: string, isPillar: boolean): string {
  const topic = titleFromSlug(slug);
  const intro = isPillar
    ? `${topic} in 2026 for ${cluster.toLowerCase()} research.`
    : `${topic} in 2026 with practical notes for ${cluster.toLowerCase()}.`;
  const body =
    "Learn what is included, what is limited, and how to pick the right plan for your workflow with clear tips for freelancers and teams.";
  return fitDescription(`${intro} ${body}`);
}

SITE_CONFIG.clusters.forEach(cluster => {
  // Add Pillar
  PAGES[cluster.pillar] = {
    slug: cluster.pillar,
    title: titleFromSlug(cluster.pillar),
    description: `Comprehensive guide about ${cluster.pillar.replace(/-/g, " ")}.`,
    cluster: cluster.name,
    isPillar: true,
    metaTitle: metaTitleForPage(cluster.pillar, true),
    metaDescription: metaDescriptionForPage(cluster.pillar, cluster.name, true),
    content: `This is the pillar content for ${cluster.pillar}. It covers all aspects of the topic in detail.`
  };

  // Add Supporting
  cluster.supporting.forEach(slug => {
    PAGES[slug] = {
      slug: slug,
      title: titleFromSlug(slug),
      description: `In-depth look at ${slug.replace(/-/g, " ")}.`,
      cluster: cluster.name,
      isPillar: false,
      parentSlug: cluster.pillar,
      metaTitle: metaTitleForPage(slug, false),
      metaDescription: metaDescriptionForPage(slug, cluster.name, false),
      content: `Detailed information about ${slug}. This supporting page provides specific insights related to the parent pillar.`
    };
  });
});
