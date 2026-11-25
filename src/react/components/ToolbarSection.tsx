import ui from '../../../content/ui.json';
import {site} from '../config/site';
import { motion } from "motion/react";
import { Chrome, Layout, Zap, Globe, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

const toolbarIcons={Zap,Globe,Layout,Shield};
export function ToolbarSection() {
  return (
    <section id="toolbar" className="relative py-24 md:py-32 bg-background text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#ff734812,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-[min(800px,100vw)] h-[min(800px,100vw)] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -ml-32 -mb-32" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
                <Chrome className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                  {ui.toolbar.badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-snug tracking-tight">
                <span className="text-primary">{ui.toolbar.headingAccent}</span>{" "}
                <span className="text-white">{ui.toolbar.headingRest}</span>
              </h2>

              <p className="text-muted text-base md:text-lg font-medium leading-relaxed max-w-xl">
                {ui.toolbar.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {ui.toolbar.features.map(entry=>({...entry,icon: toolbarIcons[entry.icon as keyof typeof toolbarIcons]||Zap})).map((item, i) => (
                <div key={i} className="space-y-3 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors border border-white/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold">{item.title}</div>
                    <div className="text-sm text-muted leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => window.location.assign(site.paymentBaseUrl)}
              className="bg-primary text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_28px_rgba(255,115,72,0.32)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
            >
              {ui.toolbar.button} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative z-10 glass rounded-[2.5rem] p-4 border border-white/[0.06] shadow-2xl">
              <div className="bg-background rounded-[2rem] overflow-hidden border border-white/10">
                <div className="bg-surface border-b border-white/10 px-5 py-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/90" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/90" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/90" />
                  </div>
                  <div title="demo url" className="flex-1 bg-white/5 h-8 rounded-xl px-4 flex items-center text-[10px] text-muted font-medium truncate border border-white/5">
                    {ui.toolbar.demoUrl}
                  </div>
                </div>
                <div className="p-6 min-h-[280px] relative bg-gradient-to-b from-background to-surface">
                  <div className="space-y-8 opacity-30">
                    <div className="h-5 bg-primary/20 w-2/3 rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-3 bg-white/10 w-full rounded-md" />
                      <div className="h-3 bg-white/10 w-4/5 rounded-md" />
                    </div>
                  </div>
                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="absolute left-4 right-4 top-1/2 -translate-y-1/2 glass rounded-2xl border border-white/[0.06] p-6 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-xs font-black text-white shadow-md">S</div>
                        <span className="text-sm font-bold text-white">{ui.toolbar.demoTitle}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {ui.toolbar.demoStats.map((stat, i) => (
                        <div key={i} className="bg-white/[0.04] p-3 rounded-xl border border-white/[0.06]">
                          <div className="text-[9px] text-muted uppercase font-black tracking-wider mb-1">{stat.label}</div>
                          <div className={cn("text-xl font-black tracking-tighter", i === 0 ? "text-primary" : "text-white")}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-primary">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {ui.toolbar.demoStatus}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
