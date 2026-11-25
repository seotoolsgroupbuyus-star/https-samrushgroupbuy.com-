import ui from '../../../content/ui.json';
import {site} from '../config/site';
import { useState, useEffect } from "react";
import Link from "../shims/link";
import { usePathname } from "../shims/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "../lib/utils";
import { Logo } from "./Logo";

const HOME_SECTIONS: {label:string;href:string}[] = ui.navigation.sections;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4",
        "bg-[var(--color-brand-navy-deep)] border-b border-black/25 shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest py-2 transition-colors",
                  pathname === "/"
                    ? "text-primary"
                    : "text-slate-300 hover:text-primary"
                )}
            >
              {ui.navigation.home}
            </Link>
            {HOME_SECTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-widest py-2 text-slate-300 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link href={site.paymentBaseUrl} className="text-[11px] font-bold uppercase tracking-widest text-white hover:text-primary transition-colors px-4">
                {ui.navigation.login}
              </Link>
              <Link
                href={ui.navigation.getAccessUrl}
                className="bg-primary text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,115,72,0.28)] flex items-center gap-2"
              >
                <Zap className="w-3 h-3 fill-current" />
                {ui.navigation.getAccess}
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden w-10 h-10 flex items-center justify-center text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-[73px] z-50 bg-[var(--color-brand-navy-deep)] border-t border-black/20 lg:hidden"
          >
            <div className="p-6 flex flex-col h-full space-y-8 overflow-y-auto no-scrollbar">
              <Link
                href="/"
                className={cn(
                  "text-xl font-bold",
                  pathname === "/" ? "text-primary" : "text-white"
                )}
              >
                {ui.navigation.home}
              </Link>
              <div className="space-y-2">
                {HOME_SECTIONS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm font-medium text-slate-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                <Link href={site.paymentBaseUrl} style={{display:"block",textAlign:"center"}} className="w-full py-4 text-sm font-bold uppercase tracking-widest text-white border border-white/10 rounded-xl">
                  {ui.navigation.login}
                </Link>
                <Link
                  href={ui.navigation.mobileAccessUrl}
                  className="block w-full bg-primary text-center text-white py-4 text-sm font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,115,72,0.28)]"
                >
                  {ui.navigation.mobileAccess}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
