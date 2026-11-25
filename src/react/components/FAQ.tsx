import {site} from "../config/site";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = site.faq;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background flex items-center py-24 md:py-28 border-t border-white/5" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 tracking-tight leading-snug max-w-md mx-auto">
            FAQ
          </h2>
          <p className="text-muted font-medium max-w-xl mx-auto leading-relaxed">
            {site.faqIntro}
          </p>
        </motion.div>

        <div className="grid gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-3xl border border-white/10 overflow-hidden hover:border-white/15 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left group gap-4"
              >
                <span className="font-bold text-base md:text-lg text-white group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                    openIndex === i ? "bg-primary text-white rotate-180" : "bg-white/5 text-muted"
                  )}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-muted leading-relaxed font-medium text-sm md:text-base border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
