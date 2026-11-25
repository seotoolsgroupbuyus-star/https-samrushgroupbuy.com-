import ui from '../../../content/ui.json';
"use client";

import Link from "../shims/link";
import {
  PAGES,
  site,
  SITE_CONFIG,
  getAuthorForSlug,
  authorInitialsFromName,
  absoluteUrl,
} from "../config/site";
import { BookOpen, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

const SITE_NAME = ui.article.siteName;

const tocSections = ui.article.toc;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DynamicPage({ slug }: { slug: string }) {
  const page = PAGES[slug];
  if (!page) return null;

  const parent = page.parentSlug ? PAGES[page.parentSlug] : undefined;
  const siblingPages =
    parent
      ? Object.values(PAGES).filter((p) => p.parentSlug === parent.slug && p.slug !== page.slug)
      : [];

  const supportingPages = Object.values(PAGES).filter((p) => p.parentSlug === page.slug);

  const author = site.authorProfiles.find(profile=>profile.name===page.authorName) ?? getAuthorForSlug(page.slug);
  const authorProfileUrl = absoluteUrl(SITE_CONFIG.url, author.url);
  const authorInitials = authorInitialsFromName(author.name);

  const toc = page.toc ?? tocSections;

  return (
    <div className="min-h-screen bg-[#eef1f5] text-slate-700">
      {/* Space below fixed navbar */}
      <div className="pt-24 lg:pt-28" />

      {/* Hero: full-width navy strip + bottom border */}
      <header className="w-full bg-[var(--color-brand-navy-deep)] border-b border-black/20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-[var(--color-brand-orange-bright)] shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
              {page.cluster}
              {page.isPillar ? " · Guide" : " · Article"}
            </span>
          </div>
          {parent && (
            <div className="mb-3">
              <Link
                href={`/${parent.slug}`}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 hover:text-white transition-colors"
              >
                {ui.article.partOf} <span className="text-[var(--color-brand-orange-bright)]">{parent.title}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </Link>
            </div>
          )}
          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white mb-6",
              page.heroSentenceCase ? "normal-case" : "uppercase"
            )}
          >
            {page.title}
          </h1>
          <p className="text-base md:text-lg text-white/80 font-semibold leading-relaxed max-w-3xl border-l-[3px] border-[var(--color-primary)] pl-5 md:pl-6">
            {page.description}
          </p>
        </div>
      </header>

      {/* Main zone */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-stretch">
          {/* Main column */}
          <main className="order-1 w-full lg:flex-1 lg:min-w-0 space-y-8">
            {/* Blog-style article (single column, readable body) */}
            <article className="bg-white rounded-[1.75rem] border border-slate-200/90 shadow-sm p-6 md:p-8 lg:p-10 [&_h2]:scroll-mt-28">
              <div className="max-w-none text-slate-600 leading-relaxed font-semibold space-y-10 [&_strong]:font-bold">
                {page.customFullBody ? (
                  <div data-cms-article dangerouslySetInnerHTML={{ __html: page.customFullBody }} />
                ) : (
                  <>
                <section id="introduction" className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-primary)]">{ui.article.startHere}</p>
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--color-brand-navy)] tracking-tight">{ui.article.introduction}</h2>
                  <h3 className="text-base font-bold text-slate-800 pt-1">{ui.article.overview}</h3>
                  <p>{ui.article.overviewText}</p>
                </section>

                <section id="what-you-get" className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--color-brand-navy)] tracking-tight">{ui.article.whatYouGet}</h2>
                  <h3 className="text-base font-bold text-slate-800 pt-1">{ui.article.benefits}</h3>
                  <p>{ui.article.benefitsIntro}</p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[var(--color-primary)]">{ui.article.benefitsList.map((item,index)=><li key={index}>{item}</li>)}</ul>
                </section>

                <section id="main-points" className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--color-brand-navy)] tracking-tight">{ui.article.mainPoints}</h2>
                  {/<\/?[a-z][^>]*>/i.test(page.content) ? <div dangerouslySetInnerHTML={{__html:page.content}} /> : <p>{page.content}</p>}
                  <p>
                    {ui.article.preContentPrefix} <span className="text-slate-800 font-semibold">{page.title}</span>, the goal is
                    {ui.article.mainPointsSuffix}
                  </p>
                  <h3 className="text-base font-bold text-slate-800 pt-2">{ui.article.beforeSubscribe}</h3>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">{ui.article.checklistLabel}</h4>
                  <ol className="list-decimal pl-5 space-y-2 marker:text-[var(--color-brand-navy)] marker:font-bold">{ui.article.preSubscribeList.map((item,index)=><li key={index}>{item}</li>)}</ol>
                </section>

                <section id="takeaways" className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--color-brand-navy)] tracking-tight">{ui.article.takeaways}</h2>
                  <h3 className="text-base font-bold text-slate-800 pt-1">{ui.article.summary}</h3>
                  <p>{ui.article.summaryText}</p>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">{ui.article.quickChecklist}</h4>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[var(--color-primary)]">{ui.article.summaryList.map((item,index)=><li key={index}>{item}</li>)}</ul>
                </section>

                <section id="quick-reference" className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--color-brand-navy)] tracking-tight">{ui.article.quickReference}</h2>
                  <h3 className="text-base font-bold text-slate-800 pt-1">{ui.article.quickComparison}</h3>
                  <p className="text-sm">{ui.article.quickDescription}</p>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">{ui.article.comparisonTable}</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[280px] text-sm text-left">
                      <thead><tr className="bg-slate-50 border-b border-slate-200">{ui.article.comparisonColumns.map((heading,index)=><th key={index} className="px-4 py-3 font-bold text-[var(--color-brand-navy)]">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{ui.article.comparisonRows.map((row,index)=><tr key={index}><td className="px-4 py-3">{row.topic}</td><td className="px-4 py-3">{row.groupBuy}</td><td className="px-4 py-3">{row.retail}</td></tr>)}</tbody>
                    </table>
                  </div>
                </section>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-slate-600 text-sm">{ui.article.ctaQuestion}</p>
                  <Link
                    href={ui.article.ctaUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-white px-8 py-3.5 text-xs font-black uppercase tracking-widest shadow-md shadow-orange-200/60 hover:opacity-95 transition-opacity shrink-0"
                  >
                    {ui.article.ctaButton} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                  </>
                )}
              </div>
            </article>

            {/* Author — slug-hash assignment from contentAuthors */}
            <aside className="bg-white rounded-[1.75rem] border border-slate-200/90 shadow-sm p-6 md:p-8 border-l-[3px] border-l-[var(--color-primary)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 mb-4">{ui.article.writtenBy}</p>
              <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
                {author.imageUrl ? (
                  <img
                    src={author.imageUrl}
                    alt={author.name}
                    className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-white shadow-md bg-slate-100"
                    width={56}
                    height={56}
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full bg-[var(--color-brand-navy)] text-white flex items-center justify-center text-sm font-black shrink-0 border-2 border-white shadow-md"
                    aria-hidden
                  >
                    {authorInitials}
                  </div>
                )}
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-lg font-black text-[var(--color-brand-navy)]">{author.name}</p>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                    {author.jobTitle} @ {SITE_NAME}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{author.bio}</p>
                  <p className="text-xs text-slate-500 font-medium pt-1">
                    Updated for 2026 · Last reviewed{" "}
                    {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs font-bold uppercase tracking-wider">
                    <a
                      href={authorProfileUrl}
                      className="text-[var(--color-brand-navy)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {ui.article.authorProfile}
                    </a>
                    <Link href={ui.article.ctaUrl} className="text-[var(--color-brand-navy)] hover:text-[var(--color-primary)] transition-colors">
                      {ui.article.plansLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Supporting resources */}
            {supportingPages.length > 0 && (
              <section className="space-y-5">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--color-brand-navy)]">
                  {ui.article.resources}
                </h2>
                <h3 className="text-base font-bold text-slate-800 pt-1">{ui.article.relatedArticles}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {supportingPages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${p.slug}`}
                      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-base font-black uppercase tracking-tight text-[var(--color-brand-navy)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {p.title}
                        </p>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[var(--color-primary)] shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">{p.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Internal links for supporting pages: back to pillar + sibling pages */}
            {parent && (
              <section className="space-y-5">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--color-brand-navy)]">
                  {ui.article.exploreGuide}
                </h2>
                <h3 className="text-base font-bold text-slate-800 pt-1">{ui.article.moreFromGuide}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Link
                    href={`/${parent.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-base font-black uppercase tracking-tight text-[var(--color-brand-navy)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                        {parent.title}
                      </p>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[var(--color-primary)] shrink-0 mt-0.5" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">{parent.description}</p>
                  </Link>
                  {siblingPages.slice(0, 5).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${p.slug}`}
                      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-base font-black uppercase tracking-tight text-[var(--color-brand-navy)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {p.title}
                        </p>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[var(--color-primary)] shrink-0 mt-0.5" />
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">{p.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar: TOC + sticky CTA — column stretches with main so sticky works full scroll */}
          <div className="order-2 w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-8 lg:min-h-0">
            <nav
              className="bg-white rounded-[1.75rem] border border-slate-200/90 shadow-sm p-5 md:p-6 lg:shrink-0"
              aria-label={ui.article.sidebarTitle}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand-navy)] mb-4">{ui.article.sidebarTitle}</p>
              <ul className="space-y-1 max-h-[min(50vh,320px)] overflow-y-auto custom-scrollbar pr-1 -mr-1">
                {toc.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(s.id)}
                      className="w-full text-left text-xs font-bold text-slate-600 hover:text-[var(--color-primary)] py-2 px-2 rounded-lg hover:bg-slate-50 transition-colors border-l-2 border-transparent hover:border-[var(--color-primary)]"
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:sticky lg:top-28 lg:self-start w-full z-30">
              <div className="bg-white rounded-[1.75rem] border border-slate-200/90 shadow-lg p-6 md:p-7 ring-1 ring-slate-100">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] mb-2">{ui.article.sidebarEyebrow}</p>
                <p className="text-lg font-black uppercase tracking-tight text-[var(--color-brand-navy)] mb-3 leading-snug">
                  {ui.article.siteName}
                </p>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">{ui.article.sidebarDescription}</p>
                <Link
                  href={ui.article.sidebarUrl}
                  className="flex w-full items-center justify-center rounded-xl bg-[var(--color-primary)] text-white py-3.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-200/50 hover:opacity-95 transition-opacity mb-4"
                >{ui.article.sidebarButton}</Link>
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{ui.article.checkoutTrust}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
