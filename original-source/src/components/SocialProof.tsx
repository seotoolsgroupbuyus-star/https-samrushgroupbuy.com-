import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

const notifications = [
  { name: "Alex from London", action: "purchased Standard Plan", time: "2 mins ago" },
  { name: "Sarah from New York", action: "upgraded to Advanced Plan", time: "5 mins ago" },
  { name: "Chen from Singapore", action: "purchased Lite Plan", time: "12 mins ago" },
  { name: "Marco from Milan", action: "renewed VIP Access", time: "15 mins ago" },
  { name: "Elena from Madrid", action: "purchased Standard Plan", time: "22 mins ago" },
];

export function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      setCurrent((prev) => (prev + 1) % notifications.length);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-8 left-8 z-[100] glass border border-white/10 p-4 rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-4 max-w-xs"
        >
          <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center shrink-0 border border-primary/25">
            <ShoppingCart className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-sm font-bold text-white truncate">
                {notifications[current].name}
              </p>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            </div>
            <p className="text-xs text-muted truncate mb-1.5">
              {notifications[current].action}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Verified</span>
              <span className="text-[10px] text-white/35">• {notifications[current].time}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
