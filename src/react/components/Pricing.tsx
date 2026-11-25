import ui from '../../../content/ui.json';
import {site} from "../config/site";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  Copy,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../lib/utils";

type Feature = { text: string; unique: boolean; tooltip: string };

type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  buyUrl: string;
  features: Feature[];
  tools?: string[];
};

const BUNDLE_TOOLS: string[] = site.bundleTools;

const PLANS: Plan[] = site.plans as Plan[];

function planFromProjects(p: number): string {
  if (p <= 2) return "semrush";
  if (p <= 10) return "semrush-ahrefs";
  return "bundle";
}

const MODAL_ROWS: {label:string;plans:string[]}[] = site.modalRows;

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD");
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const exchangeRate = site.exchangeRate;
  const recommendedId = ui.pricing.recommendedPlanId;

  const formatPlanPrice = (usd: number) => {
    const baseUsd =
      billingCycle === "yearly"
        ? Math.floor(usd * 12 * 0.8) // yearly total, then 20% off
        : usd;
    const suffix = billingCycle === "yearly" ? "/yr" : "/mo";
    if (currency === "PKR") return { sym: "Rs.", val: (baseUsd * exchangeRate).toLocaleString(), suffix };
    return { sym: "$", val: String(baseUsd), suffix };
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText(site.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalBundleTools = BUNDLE_TOOLS.length;

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-visible" id="pricing">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-snug max-w-2xl mx-auto">
            <span className="text-primary">{ui.pricing.brandHeading}</span>{" "}
            <span className="text-white/95">{ui.pricing.titleRest}</span>
          </h2>
          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {ui.pricing.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <div className="flex glass p-1 rounded-xl border border-white/10">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-bold transition-all",
                  billingCycle === "monthly" ? "bg-surface text-white border border-white/10" : "text-muted hover:text-white"
                )}
              >
                Monthly
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setBillingCycle("yearly")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                  billingCycle === "yearly" ? "bg-surface text-white border border-white/10" : "text-muted hover:text-white"
                )}
              >
                Yearly <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-md">-20%</span>
              </motion.button>
            </div>
            <div className="flex glass p-1 rounded-xl border border-white/10">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrency("USD")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  currency === "USD" ? "bg-primary text-white shadow-[0_0_16px_rgba(255,115,72,0.25)]" : "text-muted hover:text-primary"
                )}
              >
                USD
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrency("PKR")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  currency === "PKR" ? "bg-primary text-white shadow-[0_0_16px_rgba(255,115,72,0.25)]" : "text-muted hover:text-primary"
                )}
              >
                PKR
              </motion.button>
            </div>
          </div>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16 overflow-visible">
          {PLANS.map((plan, i) => {
            const price = formatPlanPrice(plan.monthlyPrice);
            const isRec = plan.id === recommendedId;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={cn(
                  "relative glass rounded-[2.5rem] p-8 flex flex-col border transition-all duration-500 overflow-visible",
                  isRec
                    ? "border-primary shadow-[0_32px_64px_-16px_rgba(255,115,72,0.22)] ring-1 ring-primary/25 z-10"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                {isRec && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/30 whitespace-nowrap">
                    Recommended for you
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-muted font-medium mb-6 leading-relaxed">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-muted">{price.sym}</span>
                    <span className="text-5xl font-black text-white tracking-tighter">{price.val}</span>
                    <span className="text-sm font-bold text-muted">{price.suffix}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, j) => {
                      const tipKey = `${plan.id}-${j}`;
                      const isBundleToolsFeature = plan.id === "bundle" && f.text.toLowerCase().includes("premium tools");
                      return (
                        <li
                          key={tipKey}
                          className="group relative flex items-start gap-2 text-sm font-bold text-muted"
                          onMouseEnter={() => setActiveTooltip(tipKey)}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <Check className={cn("w-4 h-4 shrink-0 mt-0.5", f.unique ? "text-primary" : "text-emerald-400")} />
                          <span className="flex-1 cursor-help border-b border-dotted border-white/20 hover:border-primary transition-colors leading-snug">
                            {f.text}
                          </span>
                          <Info className="w-3 h-3 text-white/25 group-hover:text-primary transition-colors shrink-0 mt-1" />
                          <AnimatePresence>
                            {activeTooltip === tipKey && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.92, x: 8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.92, x: 8 }}
                                className={cn(
                                  "hidden lg:block absolute top-full mt-2 left-0 w-[360px] p-4 bg-surface border border-white/10 text-white text-[11px] rounded-2xl shadow-2xl z-50 pointer-events-none",
                                  isBundleToolsFeature ? "leading-normal" : "leading-relaxed"
                                )}
                              >
                                {isBundleToolsFeature ? (
                                  <>
                                    <div className="font-black mb-2 text-primary uppercase tracking-widest text-[9px]">
                                      Total tools: {totalBundleTools}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                                      {(plan.tools ?? []).map((t) => (
                                        <span
                                          key={t}
                                          className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/80 font-bold"
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="font-black mb-1 text-primary uppercase tracking-widest text-[9px]">Feature</div>
                                    {f.tooltip}
                                  </>
                                )}
                                <div className="absolute -top-1.5 left-6 w-3 h-3 bg-surface border-l border-t border-white/10 rotate-45" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Tools/search box removed per request */}
                </div>

                <motion.a
                  href={plan.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-center block",
                    isRec
                      ? "bg-primary text-white shadow-[0_0_24px_rgba(255,115,72,0.3)] hover:opacity-95"
                      : "bg-white/10 text-white border border-white/10 hover:bg-white/15"
                  )}
                >
                  Buy Now
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 text-white font-black text-sm hover:text-primary transition-colors group"
          >
            Compare all features in detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="flex justify-center mb-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass p-2 rounded-3xl flex flex-col md:flex-row items-center gap-4 md:gap-6 pr-4 md:pr-8 shadow-2xl border border-white/10"
          >
            <div className="bg-primary px-8 py-4 rounded-2xl font-black text-white text-lg italic tracking-[0.15em] shadow-lg shadow-primary/30">
              SEMRUSH20
            </div>
            <div className="text-center md:text-left px-2">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-1">Limited time offer</p>
              <p className="text-sm font-black text-white">Get extra 20% off on your first month</p>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={copyCoupon}
              className={cn(
                "p-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs border",
                copied ? "bg-emerald-500/90 text-white border-emerald-400/50" : "bg-white/5 text-muted hover:bg-white/10 border-white/10"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy code
                </>
              )}
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
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                className="relative w-full max-w-4xl bg-surface border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center shrink-0">
                  <h3 className="text-lg md:text-xl font-black text-white">Compare plans</h3>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6 text-muted" />
                  </button>
                </div>
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="py-3 text-xs font-black text-muted uppercase tracking-widest">Feature</th>
                        {PLANS.map((p) => (
                          <th key={p.id} className="py-3 px-2 text-xs font-black text-primary uppercase tracking-widest text-center">
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {MODAL_ROWS.map((row) => (
                        <tr key={row.label} className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-3 font-bold text-muted">{row.label}</td>
                          {PLANS.map((p) => (
                            <td key={p.id} className="py-3 px-2 text-center">
                              {row.plans.includes(p.id) ? (
                                <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-white/15 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-background/80 border-t border-white/10 flex justify-end shrink-0">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest hover:opacity-95 transition-opacity shadow-[0_0_20px_rgba(255,115,72,0.25)]"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-surface border border-white/10 p-10 md:p-16 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,115,72,0.15),transparent)] pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full border border-primary/25 mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">100% risk-free guarantee</span>
              </div>
              <h3 className="text-xl md:text-3xl font-black mb-5 tracking-tight leading-tight">
                Clear pricing
              </h3>
              <p className="text-muted font-medium mb-8 text-base md:text-lg leading-relaxed">
                No surprise fees after checkout. Your plan is explained upfront, limits included.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["No setup fees", "No contracts", "Cancel anytime", "24/7 support"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm font-bold">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {t}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-muted">
                <span className="flex items-center gap-2 text-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL secure
                </span>
                <span className="flex items-center gap-2 text-muted">
                  <Zap className="w-4 h-4 text-primary" /> Instant setup
                </span>
              </div>
            </div>
            <div className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
              <h4 className="text-base md:text-lg font-black mb-3 leading-tight">
                Yearly billing?
              </h4>
              <p className="text-muted font-medium mb-6 text-sm leading-relaxed">
                Lock in your access for a full year and save 20% vs paying monthly.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="font-bold text-sm">Monthly billing</span>
                  <span className="font-black">from $5/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary rounded-2xl shadow-xl shadow-primary/25">
                  <span className="font-bold text-sm">Yearly billing</span>
                  <span className="font-black">pay yearly, save 20%</span>
                </div>
              </div>
              <a
                href="#limitations"
                className="w-full text-primary font-black text-sm hover:text-white flex items-center justify-center gap-2 group transition-all"
              >
                Read transparent limitations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
