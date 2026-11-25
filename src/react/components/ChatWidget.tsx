import ui from '../../../content/ui.json';
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare, X, Phone } from "lucide-react";
import { cn } from "../lib/utils";

type ChatWidgetProps = {
  whatsappPhoneE164?: string; // digits only, no +
};

function digitsOnly(input: string): string {
  return input.replace(/[^\d]/g, "");
}

export function ChatWidget({ whatsappPhoneE164 = "447845432224" }: ChatWidgetProps) {
  const phone = useMemo(() => digitsOnly(whatsappPhoneE164), [whatsappPhoneE164]);
  const waHref = `https://wa.me/${phone}`;

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onMouseDown = (e: MouseEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {open && (
        <div
          ref={panelRef}
          className="w-[320px] max-w-[calc(100vw-2.5rem)] glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden mb-3"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface/70">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white">{ui.chat.title}</p>
              <p className="text-[11px] font-bold text-muted">{ui.chat.responseHint}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-white/70 hover:text-white"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-background px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,115,72,0.25)]"
            >
              <Phone className="w-4 h-4" />
              {ui.chat.whatsappLabel}
            </a>

            <p className="text-[10px] text-white/35 font-bold uppercase tracking-wider text-center">
              {ui.chat.whatsappNumberDisplay}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl border transition-all",
          open
            ? "bg-surface border-white/15 text-white hover:border-primary/40"
            : "bg-primary border-primary/30 text-background hover:opacity-95"
        )}
        aria-label={open ? "Close chat options" : "Open chat options"}
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}

