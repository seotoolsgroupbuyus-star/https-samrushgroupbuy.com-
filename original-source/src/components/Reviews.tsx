import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "Hassan A.",
    location: "Pakistan",
    title: "Best group buy SEO tools service",
    text: "Best group buy SEO tools service I’ve tried. Ahrefs and SEMrush run smoothly. Access was instant and Telegram support is very helpful.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Adeel K.",
    location: "UAE",
    title: "Amazing value for 6 months",
    text: "Amazing service. I’ve been using SEMrush from here for 6 months. I saved a lot of money and still get premium features.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Bilal R.",
    location: "United Kingdom",
    title: "Great 24/7 assistance",
    text: "Great 24/7 assistance. They resolve issues quickly and properly.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Maria L.",
    location: "Spain",
    title: "One subscription, zero headaches",
    text: "If you are paying separately for multiple SEO tools then switch to this. One subscription makes everything easier. The support team replies very fast. Totally worth it.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Omar S.",
    location: "Saudi Arabia",
    title: "Easy to buy and use",
    text: "Easy to buy and easy to use. I purchased a few tools and everything worked as promised. I got access right away. I will use it again.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Aisha M.",
    location: "Canada",
    title: "Highly recommended platform",
    text: "I recommend this platform samrushgroupbuy.com. It gives the key tools in one place. It runs smoothly and helps with real results. I will keep using it for my work.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Usman T.",
    location: "India",
    title: "Everything worked immediately",
    text: "I bought multiple tools from here. The buying process was simple. Everything worked exactly as described. I could start using them immediately.",
    stars: 5,
    date: "Recently",
  },
  {
    name: "Alex P.",
    location: "United States",
    title: "Agency team use case",
    text: "We use a shared Semrush account for our team. Everyone can access full data. It helps us reduce costs and work faster.",
    stars: 5,
    date: "Recently",
  },
];

export function Reviews() {
  return (
    <section className="bg-background flex items-center py-24 md:py-28 border-t border-white/5" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 md:mb-16">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 tracking-tight leading-snug max-w-md md:max-w-lg">
              Member feedback
            </h2>
            <p className="text-sm font-medium text-muted">
              Samples shown below. Replace with your real customer reviews anytime.
            </p>
          </motion.div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/10"
          >
            Share feedback
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 border border-white/10 rounded-xl md:rounded-2xl hover:border-primary/25 transition-colors glass"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.stars)].map((_, j) => (
                  <div key={j} className="tp-star w-4 h-4" />
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-white">{r.name}</span>
                <CheckCircle2 className="w-3 h-3 text-muted" />
              </div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2">{r.location}</p>
              <h4 className="font-bold text-sm text-primary mb-2 line-clamp-2">{r.title}</h4>
              <p className="text-xs text-muted leading-relaxed line-clamp-4 mb-4">&ldquo;{r.text}&rdquo;</p>
              <p className="text-[10px] font-bold text-white/35 uppercase tracking-wider">{r.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
