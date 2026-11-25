import ui from '../../../content/ui.json';
import { motion } from "motion/react";
import { X, Check, Zap } from "lucide-react";

export function SharedAccess() {
  const problems = ui.sharedAccess.problems;

  const solutions = ui.sharedAccess.solutions;

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-snug max-w-2xl mx-auto">
              {ui.sharedAccess.titlePrefix} <span className="text-primary">{ui.sharedAccess.titleBrand}</span>{ui.sharedAccess.headingSuffix}
            </h2>
            <p className="text-muted font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {ui.sharedAccess.intro}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="p-10 md:p-12 rounded-[3rem] glass border border-white/10 shadow-xl relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/15 flex items-center justify-center text-red-400 mb-10 border border-red-500/25">
              <X className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-tight">
              {ui.sharedAccess.withoutPrefix} <span className="text-primary">{ui.sharedAccess.accessLabel}</span>
            </h3>
            <ul className="space-y-6">
              {problems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 text-muted font-bold text-base md:text-xl"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="p-10 md:p-12 rounded-[3rem] bg-surface border border-primary/30 text-white shadow-[0_0_60px_-12px_rgba(255,115,72,0.25)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,115,72,0.12),transparent_55%)] pointer-events-none" />
            <div className="absolute top-10 right-10 opacity-[0.08] group-hover:scale-110 transition-transform duration-700 text-primary">
              <Zap className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-10 border border-primary/30">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-6 leading-tight">
                {ui.sharedAccess.withPrefix} <span className="text-primary">{ui.sharedAccess.accessLabel}</span>
              </h3>
              <ul className="space-y-6">
                {solutions.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 font-bold text-base md:text-xl"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white shrink-0 shadow-sm" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
