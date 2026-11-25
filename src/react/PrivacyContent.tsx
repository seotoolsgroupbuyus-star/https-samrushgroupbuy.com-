import privacy from '../../content/privacy.json';
import { ShieldCheck } from 'lucide-react';

/**
 * Preserve the exact Next.js privacy-page layout and typography.
 * Copy remains editable through Pages CMS (content/privacy.json).
 */
export function PrivacyContent() {
  return (
    <div className="bg-background text-text min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
            Legal
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
          {privacy.title}
        </h1>
        <p className="text-muted text-sm mb-10">Last updated: {privacy.lastUpdated}</p>
        <div className="space-y-8 text-sm md:text-base text-muted leading-relaxed font-medium">
          {privacy.sections.map((section) => (
            <section className="space-y-3" key={section.title}>
              <h2 className="text-lg font-bold text-white">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
