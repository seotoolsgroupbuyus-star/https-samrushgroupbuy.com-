import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const faqs = [
  {
    question: "Is this the real Semrush data?",
    answer:
      "Yes, 100%. You are accessing real Semrush accounts through our secure dashboard. The data, metrics, and features match what you get on an official subscription for the included modules.",
  },
  {
    question: "How do I use the Semrush Toolkit?",
    answer:
      "Subscribe to a plan that includes the toolkit, install the browser extension from our guide, log in, and you’ll see metrics on Google SERPs and pages you visit.",
  },
  {
    question: "Can I use it on multiple devices?",
    answer:
      "Plans are built for fair single-session use. You can switch devices, but simultaneous sessions can trigger limits. Use one primary work machine when possible.",
  },
  {
    question: "What happens if a tool goes down?",
    answer:
      "We monitor 24/7. If an account hits limits or is paused, our system rotates to a healthy seat so downtime is rare and usually brief.",
  },
  {
    question: "Is my search history private?",
    answer:
      "Yes. Isolation keeps your projects and searches separate from other members in the pool.",
  },
  {
    question: "What are the daily limits?",
    answer:
      "Limits depend on plan tier. Standard-style access often includes on the order of 30 credits per day for heavy reports. They reset every 24 hours.",
  },
  {
    question: "Do you offer a refund if I'm not happy?",
    answer:
      "Yes. If something doesn’t work as described early on, contact support. We offer a clear refund window (see checkout terms).",
  },
  {
    question: "How do I pay?",
    answer: "Cards, PayPal, and other methods shown at checkout, all through encrypted providers.",
  },
  {
    question: "Is there any software to download?",
    answer:
      "Core access is browser-based. Only the optional Semrush Toolkit uses a lightweight extension.",
  },
  {
    question: "How fast is activation?",
    answer: "Most members receive credentials within minutes after payment confirmation.",
  },
];

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
            Billing, limits, toolkit install, and data: everything you need in one place.
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
