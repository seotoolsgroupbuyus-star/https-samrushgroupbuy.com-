import ui from '../../../content/ui.json';
import {site} from "../config/site";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, Search } from "lucide-react";

function ToolLogo({ name }: { name: string }) {
  const common = "w-12 h-12 md:w-14 md:h-14";
  const imgCommon = `${common} object-contain`;

  const imgSrc =
    name === "Semrush"
      ? "/logos/semrush.svg"
      : name === "Ahrefs"
        ? "/logos/ahrefs.png"
        : name === "Canva Pro"
          ? "/logos/canva.svg"
          : name === "Grammarly"
            ? "/logos/grammarly.svg"
            : name === "Moz Pro"
              ? "/logos/moz.svg"
              : name === "Envato"
                ? "/logos/envato.svg"
                : null;

  if (imgSrc) {
    return <img src={imgSrc} alt={`${name} logo`} className={imgCommon} loading="lazy" decoding="async" />;
  }

  switch (name) {
    case "SpyFu":
      return (
        <svg viewBox="0 0 64 64" className={common} role="img" aria-label="SpyFu logo">
          <circle cx="32" cy="32" r="22" fill="#FF8A00" />
          <path
            d="M22 40V24h8.5c4.5 0 7.5 2.6 7.5 6.6 0 4.1-3 6.7-7.5 6.7H26V40h-4Zm8.2-6c2.2 0 3.6-1.3 3.6-3.4 0-2-1.4-3.3-3.6-3.3H26v6.7h4.2Z"
            fill="#1B1F2A"
            opacity="0.92"
          />
          <circle cx="44.5" cy="24.5" r="3.2" fill="#1B1F2A" opacity="0.9" />
        </svg>
      );
    case "Ubersuggest":
      return (
        <svg viewBox="0 0 64 64" className={common} role="img" aria-label="Ubersuggest logo">
          <rect x="12" y="14" width="40" height="36" rx="12" fill="#111827" />
          <path
            d="M24 26v10.2c0 3 2.2 5.2 8 5.2s8-2.2 8-5.2V26h-4v10c0 1.4-1.1 2.4-4 2.4s-4-1-4-2.4V26h-4Z"
            fill="#fff"
            opacity="0.96"
          />
        </svg>
      );
    default:
      return (
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 border border-white/10"
          aria-hidden
        />
      );
  }
}

const HIGHLIGHT_TOOLS = site.featuredTools;

/** Full bundle list (25+), same family as Power plan + common group-buy extras */
const ALL_TOOLS = site.allTools;

export function PremiumTools() {
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = ALL_TOOLS.filter((t) => t.toLowerCase().includes(query.toLowerCase().trim()));

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden relative border-y border-white/5" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 md:mb-5 tracking-tight leading-snug max-w-xl mx-auto">
            25+ tools · <span className="text-primary">{ui.premiumTools.eyebrow}</span>
          </h2>
          <p className="text-muted font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            One membership: pro-grade SEO access plus the extra SaaS stack power users expect.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {HIGHLIGHT_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              whileHover={{ scale: 1.05 }}
              className={`p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center border transition-shadow hover:shadow-[0_0_40px_-12px_rgba(255,115,72,0.2)] ${tool.color}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/[0.06] rounded-3xl flex items-center justify-center mb-5 md:mb-6 border border-white/10">
                <ToolLogo name={tool.name} />
              </div>
              <h4 className="text-lg md:text-2xl font-black text-white mb-1">{tool.name}</h4>
              <p className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">{ui.premiumTools.title}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setQuery("");
              setModalOpen(true);
            }}
            className="text-primary font-black text-base md:text-xl inline-flex items-center gap-2 mx-auto group hover:gap-3 transition-all"
          >
            View all 25+ tools <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/85 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="relative w-full max-w-lg md:max-w-2xl bg-surface border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              role="dialog"
              aria-labelledby="tools-modal-title"
            >
              <div className="p-5 md:p-6 border-b border-white/10 flex items-start justify-between gap-4 shrink-0">
                <div>
                  <h3 id="tools-modal-title" className="text-lg md:text-xl font-black text-white leading-tight">
                    All tools ({ALL_TOOLS.length})
                  </h3>
                  <p className="text-sm text-muted font-medium mt-1">{ui.premiumTools.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-muted" />
                </button>
              </div>
              <div className="p-4 md:p-5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                  <Search className="w-4 h-4 text-muted shrink-0" />
                  <input
                    type="search"
                    placeholder="Search tools…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-white outline-none w-full placeholder:text-muted"
                  />
                </div>
              </div>
              <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                <div className="flex flex-wrap gap-2">
                  {filtered.map((name) => (
                    <span
                      key={name}
                      className="text-xs font-bold px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-muted"
                    >
                      {name}
                    </span>
                  ))}
                </div>
                {filtered.length === 0 && (
                  <p className="text-sm text-muted text-center py-8">{ui.premiumTools.emptyMessage}</p>
                )}
              </div>
              <div className="p-4 bg-background/80 border-t border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-widest hover:opacity-95 transition-opacity shadow-[0_0_24px_rgba(255,115,72,0.25)]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
