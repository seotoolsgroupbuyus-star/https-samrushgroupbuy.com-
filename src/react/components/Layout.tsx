"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

import { ChatWidget } from "./ChatWidget";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { usePathname } from "../shims/navigation";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-[#ff9830] origin-left z-[60] pointer-events-none shadow-md shadow-primary/25"
        style={{ scaleX }}
        aria-hidden
      />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      
      <ChatWidget whatsappPhoneE164="447845432224" />
    </div>
  );
}
