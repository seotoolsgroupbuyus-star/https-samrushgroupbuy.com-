import ui from '../../../content/ui.json';
import {site} from "../config/site";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

// Only publish customer testimonials explicitly confirmed as genuine; keep sample data in CMS but hidden.
const reviews = site.reviews.filter((review) => 'verified' in review && review.verified === true);

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
              {ui.reviews.heading}
            </h2>
            <p className="text-sm font-medium text-muted">
              {ui.reviews.intro}
            </p>
          </motion.div>
          <motion.a
            href={`https://wa.me/${site.supportWhatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/10"
          >
            {ui.reviews.button}
          </motion.a>
        </div>

        {reviews.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
