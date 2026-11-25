import ui from '../../../content/ui.json';
function SemrushMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Semrush-style ascending bars (wordmark-adjacent mark) */}
      <rect x="5" y="19" width="4.5" height="8" rx="1.2" fill="white" />
      <rect x="11.5" y="13" width="4.5" height="14" rx="1.2" fill="white" />
      <rect x="18" y="7" width="4.5" height="20" rx="1.2" fill="white" />
      <rect x="24.5" y="11" width="4.5" height="14" rx="1.2" fill="white" />
    </svg>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div
        className="w-10 h-10 rounded-[11px] bg-primary flex items-center justify-center shadow-[0_4px_14px_rgba(255,115,72,0.4)] border border-white/10 group-hover:shadow-[0_6px_22px_rgba(255,115,72,0.5)] transition-shadow duration-300"
        aria-hidden
      >
        <SemrushMark className="w-[22px] h-[22px]" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[17px] font-extrabold tracking-[-0.02em] leading-none text-white">
          <span className="lowercase">{ui.logo.primary}</span>{" "}
          <span className="text-primary font-black lowercase">{ui.logo.secondary}</span>
        </span>
        <span className="text-[8px] font-semibold tracking-[0.28em] text-muted uppercase">
          {ui.logo.tagline}
        </span>
      </div>
    </div>
  );
}
