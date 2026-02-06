"use client";

import { useEffect, useState, useCallback } from "react";
import { HeroSection } from "@/components/theo/sections/hero-section";
import { ScopeSection } from "@/components/theo/sections/scope-section";
import { ProblemSection } from "@/components/theo/sections/problem-section";
import { VisionSection } from "@/components/theo/sections/vision-section";
import { SolutionSection } from "@/components/theo/sections/solution-section";
import { HowItWorksSection } from "@/components/theo/sections/how-it-works-section";
import { ArchitectureSection } from "@/components/theo/sections/architecture-section";
import { TimelineSection } from "@/components/theo/sections/timeline-section";
import { WhatsIncludedSection } from "@/components/theo/sections/whats-included-section";
import { WhyMeSection } from "@/components/theo/sections/why-me-section";
import { NextStepsSection } from "@/components/theo/sections/next-steps-section";
import { NavigationDots } from "@/components/theo/navigation-dots";

const sections = [
  { id: "hero", label: "Introduction" },
  { id: "scope", label: "Full Scope" },
  { id: "problem", label: "The Problem" },
  { id: "vision", label: "Your Vision" },
  { id: "solution", label: "The Solution" },
  { id: "how-it-works", label: "How It Works" },
  { id: "architecture", label: "Architecture" },
  { id: "timeline", label: "Timeline" },
  { id: "whats-included", label: "What's Included" },
  { id: "why-me", label: "Why Me" },
  { id: "next-steps", label: "Next Steps" },
];

export default function TheoProposalPage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          {
            threshold: 0.5,
            rootMargin: "-10% 0px -10% 0px",
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="relative bg-[#0a0a0a] text-white">
      <NavigationDots
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <HeroSection />
      <ScopeSection />
      <ProblemSection />
      <VisionSection />
      <SolutionSection />
      <HowItWorksSection />
      <ArchitectureSection />
      <TimelineSection />
      <WhatsIncludedSection />
      <WhyMeSection />
      <NextStepsSection />
    </main>
  );
}
