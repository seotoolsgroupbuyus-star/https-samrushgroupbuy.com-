import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-white/5 py-8 sm:py-10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 min-w-0">
            <Logo />
            <p className="text-muted text-sm leading-snug max-w-md">
              Reliable shared access for SEO teams and freelancers.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl border-emerald-500/20">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Operational</span>
              </div>
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">SSL</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
            <Link
              href="/privacy"
              className="text-[11px] font-bold uppercase tracking-wider text-muted hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <p className="text-[11px] font-medium text-white/25">
              © 2026 SemrushGroupBuy
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="glass w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all group"
              aria-label="Back to top"
            >
              <ArrowUpRight className="w-4 h-4 -rotate-45 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
