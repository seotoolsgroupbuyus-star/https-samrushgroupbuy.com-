import ui from '../../../content/ui.json';
import {site} from "../config/site";
import { motion } from "motion/react";
import { ArrowRight, Search, Link as LinkIcon, BarChart2, Activity, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "../shims/link";
import { cn } from "../lib/utils";

export function Hero() {
  const barHeights = [32, 48, 38, 62, 44, 72, 56, 68, 52, 76, 64, 80];

  return (
    <section className="relative pt-28 pb-14 md:pt-32 md:pb-16 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#ff734812,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
          <div className="flex-1 text-center lg:text-left max-w-xl lg:max-w-none mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/80">
                {site.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.15] mb-4 text-white text-left mx-auto lg:mx-0 max-w-md lg:max-w-lg"
            >
              <span className="text-primary">{site.hero.title}</span>
              <span className="block mt-1.5 text-white/95 text-lg sm:text-xl md:text-2xl font-bold">
                {site.hero.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="text-sm md:text-base text-muted max-w-md lg:max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium mb-6"
            >
              {site.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
            >
              <Link
                href={site.hero.primaryUrl}
                className="bg-primary text-white px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_28px_rgba(255,115,72,0.32)] flex items-center justify-center gap-2 group"
              >
                {site.hero.primaryButton} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href={site.hero.secondaryUrl}
                className="glass text-white px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center justify-center"
              >
                {site.hero.secondaryButton}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="flex-1 w-full max-w-md lg:max-w-[440px] mx-auto lg:mx-0 shrink-0"
          >
            <div className="glass rounded-2xl p-4 md:p-5 border border-white/[0.06]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shrink-0">
                    <BarChart2 className="w-[18px] h-[18px] text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{ui.hero.demoHeading}</div>
                    <div className="text-[9px] font-medium text-muted uppercase tracking-wider">{ui.hero.demoTag}</div>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-muted">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-muted">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Authority", value: "88", trend: "+2.4%", icon: ShieldCheck, color: "text-blue-400" },
                  { label: "Traffic", value: "2.4M", trend: "+12%", icon: TrendingUp, color: "text-primary" },
                  { label: "Backlinks", value: "15.2M", trend: "+5%", icon: LinkIcon, color: "text-accent" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] rounded-xl p-2.5 border border-white/[0.05]"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <stat.icon className={cn("w-3.5 h-3.5 shrink-0", stat.color)} />
                      <span className="text-[8px] font-bold text-green-400">{stat.trend}</span>
                    </div>
                    <div className="text-sm font-bold text-white leading-none mb-0.5">{stat.value}</div>
                    <div className="text-[8px] font-medium text-muted uppercase tracking-wide truncate">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="h-[72px] flex items-end gap-1 px-0.5">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-0 rounded-t-sm bg-gradient-to-t from-primary/25 to-primary/50 hover:from-primary/40 hover:to-primary/65 transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-14 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-center"
        >
          {site.hero.toolStrip.map((label) => (
            <span
              key={label}
              className="text-xs md:text-sm font-black tracking-tight text-white/50 uppercase hover:text-primary transition-colors"
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
