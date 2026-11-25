import ui from '../../../content/ui.json';
import { motion } from "motion/react";
import { Users, Activity, Lock, ShieldAlert } from "lucide-react";

const limitationIcons = {Users,Activity,Lock,ShieldAlert};
const limitations=ui.transparency.limitations.map(item=>({...item,icon:limitationIcons[item.icon as keyof typeof limitationIcons]||ShieldAlert}));

export function TransparencySection() {
  return (
    <section className="py-24 md:py-32 bg-background text-white overflow-hidden relative" id="limitations">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full border border-primary/25 mb-6">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{ui.transparency.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-5 tracking-tight leading-snug">
            <span className="text-primary">{ui.transparency.headingBrand}</span> {ui.transparency.headingRest}
          </h2>
          <p className="text-muted font-medium text-base md:text-lg leading-relaxed">
            {ui.transparency.intro}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {limitations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="p-8 md:p-10 bg-white/5 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform border border-primary/20">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg md:text-xl font-black mb-3 tracking-tight">{item.title}</h4>
              <p className="text-muted font-medium leading-relaxed text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 p-8 md:p-10 bg-surface border border-primary/20 rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_60px_-16px_rgba(255,115,72,0.2)]"
        >
          <div className="text-center md:text-left">
            <h4 className="text-lg md:text-xl font-black mb-2 leading-tight">
              {ui.transparency.ctaTitle}
            </h4>
            <p className="text-muted font-medium">
              {ui.transparency.ctaBody}
            </p>
          </div>
          <motion.a
            href="/#pricing"
            whileTap={{ scale: 0.97 }}
            className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm md:text-base shadow-[0_0_28px_rgba(255,115,72,0.35)] hover:scale-[1.02] transition-transform shrink-0 text-center"
          >
            {ui.transparency.ctaButton}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
