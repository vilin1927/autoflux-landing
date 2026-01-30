"use client";

import { useEffect, useRef } from "react";

const industries = [
  "SaaS & Tech",
  "Real Estate",
  "Wellness & Fitness",
  "E-Commerce",
  "Marketing Agencies",
  "Healthcare",
  "Financial Services",
  "Education",
];

export function TrustBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      scrollPos += speed;

      // Reset when we've scrolled half the content (seamless loop)
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Triple the items for smoother infinite loop
  const items = [...industries, ...industries, ...industries];

  return (
    <section className="py-6 bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] mb-8 overflow-hidden">
      <p className="text-sm text-[var(--text-muted)] uppercase tracking-widest font-medium mb-5 text-center">
        Trusted by top companies
      </p>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <div
          ref={scrollRef}
          className="flex will-change-transform"
        >
          {items.map((industry, index) => (
            <span
              key={`${industry}-${index}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 mx-2 bg-[var(--bg-light)] border border-[var(--border-light)] rounded-full text-[0.9rem] font-medium text-[var(--text-body)] whitespace-nowrap shrink-0"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
