"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Initialize PostHog
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // We capture manually
    capture_pageleave: true,
  });
}

// Track pageviews
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + "?" + searchParams.toString();
      }
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PHProvider>
  );
}

// Helper function to track custom events
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  posthog.capture(eventName, properties);
}

// Pre-defined events for AutoFlux
export const analytics = {
  // Generic event tracking
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
    trackEvent(eventName, properties);
  },

  // CTA clicks
  ctaClick: (buttonName: string, location: string) => {
    trackEvent("cta_click", { button_name: buttonName, location });
  },

  // Navigation
  navClick: (item: string, location: string) => {
    trackEvent("nav_click", { item, location });
  },

  // Case study interactions
  caseStudyView: (slug: string, title: string) => {
    trackEvent("case_study_view", { slug, title });
  },

  caseStudyCardClick: (slug: string, title: string) => {
    trackEvent("case_study_card_click", { slug, title });
  },

  // Filter interactions
  filterClick: (category: string) => {
    trackEvent("filter_click", { category });
  },

  // Carousel interactions
  carouselNavigation: (
    carouselName: string,
    direction: "prev" | "next" | "dot",
    fromSlide: number,
    toSlide: number
  ) => {
    trackEvent("carousel_navigation", {
      carousel: carouselName,
      direction,
      from_slide: fromSlide,
      to_slide: toSlide,
    });
  },

  // Section visibility (for funnel tracking)
  sectionView: (sectionId: string) => {
    trackEvent("section_view", { section: sectionId });
  },

  // How It Works step interaction
  processStepClick: (stepNumber: number, stepTitle: string) => {
    trackEvent("process_step_click", { step_number: stepNumber, step_title: stepTitle });
  },

  // Cal.com booking events
  bookingCalendarView: () => {
    trackEvent("booking_calendar_view");
  },

  bookingDateSelected: (date: string) => {
    trackEvent("booking_date_selected", { date });
  },

  bookingTimeSelected: (time: string, date: string) => {
    trackEvent("booking_time_selected", { time, date });
  },

  bookingFormStarted: () => {
    trackEvent("booking_form_started");
  },

  bookingCompleted: () => {
    trackEvent("booking_completed");
  },

  // Mobile nav
  mobileNavToggle: (isOpen: boolean) => {
    trackEvent("mobile_nav_toggle", { action: isOpen ? "open" : "close" });
  },

  // Footer interactions
  footerClick: (item: string) => {
    trackEvent("footer_click", { item });
  },

  // External link clicks
  externalLinkClick: (url: string, label: string) => {
    trackEvent("external_link_click", { url, label });
  },

  // Scroll depth
  scrollDepth: (percentage: number, section: string) => {
    trackEvent("scroll_depth", { percentage, section });
  },

  // Video tracking
  caseStudyVideoPlay: (slug: string, title?: string) => {
    trackEvent("case_study_video_play", { slug, title });
  },

  caseStudyVideoFullscreen: (slug: string, title?: string) => {
    trackEvent("case_study_video_fullscreen", { slug, title });
  },
};
