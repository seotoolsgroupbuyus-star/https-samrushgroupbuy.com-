"use client";

import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { SharedAccess } from "@/components/SharedAccess";
import { ComparisonVisual } from "@/components/ComparisonVisual";
import { PremiumTools } from "@/components/PremiumTools";
import { ToolbarSection } from "@/components/ToolbarSection";
import { TransparencySection } from "@/components/TransparencySection";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";

export function Home() {
  return (
    <div className="bg-background text-text selection:bg-primary/30 selection:text-white">
      <Hero />

      <Pricing />

      <SharedAccess />

      <ComparisonVisual />

      <PremiumTools />

      <ToolbarSection />

      <TransparencySection />

      <Reviews />

      <FAQ />
    </div>
  );
}
