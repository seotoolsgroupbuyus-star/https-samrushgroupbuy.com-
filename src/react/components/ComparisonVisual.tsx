import ui from '../../../content/ui.json';
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const comparisonData = ui.comparison.rows;

export function ComparisonVisual() {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug mb-3">
            <span className="text-primary">{ui.comparison.headingBrand}</span> {ui.comparison.headingSuffix}
          </h2>
          <p className="text-muted font-medium text-base md:text-lg leading-relaxed">
            {ui.comparison.intro}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 gap-10 text-center md:text-left">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-2">{ui.comparison.withoutLabel}</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight">
              {ui.comparison.officialTitle}
            </h3>
            <p className="text-muted font-medium max-w-md mx-auto md:mx-0 leading-relaxed">
              {ui.comparison.officialDescription}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white/15 select-none py-4 md:py-0"
          >
            VS
          </motion.div>
          <motion.div
            className="flex-1 text-center md:text-right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">{ui.comparison.withLabel}</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-primary mb-3 tracking-tight">
              Shared access
            </h3>
            <p className="text-muted font-medium max-w-md mx-auto md:ml-auto md:mr-0 leading-relaxed">
              {ui.comparison.groupDescription}
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto space-y-5 md:space-y-6">
          {comparisonData.map((item, i) => (
            <div key={item.label} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 md:gap-8">
              <div className="flex-1 w-full flex justify-end">
                <div className="w-full max-w-md h-10 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.official}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "h-full rounded-full flex items-center justify-end pr-4 text-white font-black text-xs md:text-sm",
                      item.official > 75
                        ? "bg-gradient-to-l from-emerald-400 to-emerald-500"
                        : item.official > 45
                          ? "bg-gradient-to-l from-amber-400 to-amber-500"
                          : "bg-gradient-to-l from-red-400 to-red-500"
                    )}
                  >
                    {item.officialLabel}
                  </motion.div>
                </div>
              </div>
              <div className="w-full sm:w-28 text-center font-black text-white/70 uppercase tracking-widest text-[10px] md:text-xs shrink-0 py-2 sm:py-0">
                {item.label}
              </div>
              <div className="flex-1 w-full">
                <div className="w-full max-w-md h-10 bg-white/10 rounded-full overflow-hidden mx-auto sm:mx-0 sm:mr-auto">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.group}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "h-full rounded-full flex items-center justify-start pl-4 text-white font-black text-xs md:text-sm",
                      item.group > 80
                        ? "bg-gradient-to-r from-primary to-[#ff9830]"
                        : item.group > 60
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : "bg-gradient-to-r from-amber-400 to-amber-500"
                    )}
                  >
                    {item.groupLabel}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
