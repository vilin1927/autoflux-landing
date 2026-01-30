"use client";

import { CalButton } from "@/components/ui/cal-button";

interface CaseStudyCTAProps {
  eyebrow: string;
  headline: string;
  description: string;
  caseStudySlug: string;
}

export function CaseStudyCTA({
  eyebrow,
  headline,
  description,
  caseStudySlug,
}: CaseStudyCTAProps) {
  return (
    <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white rounded-[var(--radius-xl)] p-8 md:p-14 text-center mb-8">
      <span className="inline-block text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
        {eyebrow}
      </span>
      <h2 className="text-2xl md:text-4xl font-bold mb-4">{headline}</h2>
      <p className="text-white/80 mb-8 max-w-xl mx-auto">{description}</p>
      <CalButton
        variant="lime"
        className="animate-pulse-glow"
        trackingLocation={`case-study-cta-${caseStudySlug}`}
      >
        Get Your Free Blueprint
      </CalButton>
    </section>
  );
}
