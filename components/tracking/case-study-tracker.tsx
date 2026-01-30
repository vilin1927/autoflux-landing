"use client";

import { useEffect } from "react";
import { analytics } from "@/providers/posthog-provider";

interface CaseStudyTrackerProps {
  slug: string;
  title: string;
}

/**
 * Client component to track case study page views
 * Add this to case study pages to track when users view them
 */
export function CaseStudyTracker({ slug, title }: CaseStudyTrackerProps) {
  useEffect(() => {
    analytics.caseStudyView(slug, title);
  }, [slug, title]);

  return null;
}
