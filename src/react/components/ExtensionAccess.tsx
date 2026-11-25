import { motion } from "motion/react";
import { Chrome, ShieldCheck, Zap, BarChart2, Search, ArrowRight, User } from "lucide-react";
import { cn } from "../lib/utils";

export function ExtensionAccess() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full"
              >
                <Chrome className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                  Exclusive Extension Access
                </span>
              </motion.div>
              
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase text-gradient">
                Semrush SEO <br />
                <span className="text-primary">Toolkit.</span>
              </h2>
              
              <p className="text-xl text-muted max-w-lg leading-relaxed font-medium">
                Stop switching tabs. Get critical SEO metrics like Authority Score, Backlinks, and Organic Traffic directly on Google SERPs and any website you visit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Search, title: "SERP Overview", desc: "Get AS, Backlinks, and Traffic directly on Google search results." },
                { icon: ShieldCheck, title: "Domain Metrics", desc: "Check any website's strength without leaving the page." },
                { icon: Zap, title: "Keyword Difficulty", desc: "Instantly see how hard it is to rank for any search term." },
                { icon: BarChart2, title: "Quick Analysis", desc: "One-click access to full Domain Overview reports." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3 group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <button className="bg-primary text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,115,72,0.28)] group">
              Start Using Semrush Toolkit 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Mockup of Google Search with Toolbar */}
            <div className="glass rounded-[40px] p-8 shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-white/10 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/user${i}/32/32`} 
                          alt="User" 
                          className="w-full h-full object-cover opacity-80"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Joined by 12,000+ SEOs</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary">google.com/search</div>
              </div>

              {[1, 2].map((i) => (
                <div key={i} className="space-y-4 relative">
                  <div className="space-y-3">
                    <div className="w-2/3 h-4 bg-white/10 rounded-full" />
                    <div className="w-full h-3 bg-white/5 rounded-full" />
                    <div className="w-5/6 h-3 bg-white/5 rounded-full" />
                  </div>
                  
                  {/* The Toolbar Overlay */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="glass bg-primary/5 border-primary/20 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xl"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">AS</div>
                        <div className="text-sm font-black text-primary">85</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Backlinks</div>
                        <div className="text-sm font-black text-white">1.5M</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Traffic</div>
                        <div className="text-sm font-black text-white">1.2M</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <BarChart2 className="w-4 h-4 text-primary" />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
