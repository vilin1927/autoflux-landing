"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/providers/posthog-provider";

/**
 * Hook to track when a section comes into view
 * Only fires once per session to avoid duplicate events
 */
export function useTrackSection(sectionId: string) {
  const hasTracked = useRef(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            analytics.sectionView(sectionId);
          }
        });
      },
      {
        threshold: 0.3, // 30% of section must be visible
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId]);

  return ref;
}
