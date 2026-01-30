"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MotionCarousel } from "@/components/animated/motion-carousel";
import { cn } from "@/lib/utils";
import { useTrackSection } from "@/hooks/use-track-section";
import { analytics } from "@/providers/posthog-provider";

const steps = [
  {
    number: 1,
    title: "Free Automation Blueprint",
    description:
      "We audit your current workflow, identify high-ROI automations, and outline 1-3 concrete systems that would save time or unlock revenue.",
  },
  {
    number: 2,
    title: "Spec & Architecture",
    description:
      "We map integrations, data flows, and edge cases—then deliver a clear technical spec with diagrams, milestones, and a fixed timeline.",
  },
  {
    number: 3,
    title: "Build & Weekly Demos",
    description:
      "Our engineers build in n8n, Make, GHL, Apify, and custom APIs. You see progress weekly with live demos and can request tweaks before launch.",
  },
  {
    number: 4,
    title: "Launch & Iteration",
    description:
      "We deploy to production, train your team, hand over clean docs and error logs, and stay available for optimizations as you scale.",
  },
];

export function HowItWorks() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useTrackSection("how-it-works");

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    analytics.processStepClick(steps[index].number, steps[index].title);
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="how-it-works"
      className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-6 md:p-10 mb-8"
    >
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <span className="eyebrow mb-4 inline-block">Our Process</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)] mb-3 leading-tight">
          Fast, spec-driven automation builds—not fragile hacks.
        </h2>
        <p className="text-[var(--text-muted)] text-lg">
          We don&apos;t sell templates or &quot;quick zaps.&quot; Every AutoFlux
          system is custom-built, documented, and designed to scale with your
          business.
        </p>
      </div>

      {/* Content: Mobile Carousel vs Desktop Tabs */}
      {isMobile ? (
        <MotionCarousel
          items={steps}
          renderItem={(step) => <ProcessCard step={step} />}
          className="pb-4"
        />
      ) : (
        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          {/* Tab List */}
          <div className="flex flex-col gap-2">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => handleStepClick(index)}
                className={cn(
                  "relative pl-14 pr-4 py-4 text-left rounded-[var(--radius-lg)]",
                  "border transition-all duration-300",
                  index === activeStep
                    ? "bg-[var(--accent-soft)] border-[var(--accent)]"
                    : "bg-transparent border-transparent hover:bg-[var(--bg-light)]"
                )}
              >
                <span
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2",
                    "w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center",
                    "font-bold text-sm transition-colors duration-300",
                    index === activeStep
                      ? "bg-[var(--accent)] text-[var(--primary)]"
                      : "bg-[var(--bg-light)] text-[var(--text-muted)]"
                  )}
                >
                  {step.number}
                </span>
                <span
                  className={cn(
                    "font-medium transition-colors duration-300",
                    index === activeStep
                      ? "text-[var(--text-dark)]"
                      : "text-[var(--text-muted)]"
                  )}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-12 bg-[var(--accent)] text-[var(--primary)] rounded-[var(--radius-md)] flex items-center justify-center font-bold text-lg">
                    {steps[activeStep].number}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-dark)]">
                    {steps[activeStep].title}
                  </h3>
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
}

function ProcessCard({ step }: { step: (typeof steps)[0] }) {
  return (
    <motion.div
      className="glow-card bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6 h-full"
      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
      transition={{ duration: 0.2 }}
    >
      <span className="inline-flex items-center justify-center w-9 h-9 bg-[var(--accent)] text-[var(--primary)] rounded-[var(--radius-sm)] font-bold mb-4">
        {step.number}
      </span>
      <h3 className="text-lg font-bold text-[var(--text-dark)] mb-2">
        {step.title}
      </h3>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}
