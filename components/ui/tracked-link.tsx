"use client";

import Link from "next/link";
import { analytics } from "@/providers/posthog-provider";
import { cn } from "@/lib/utils";

interface TrackedLinkProps {
  href: string;
  trackingName: string;
  trackingLocation: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedLink({
  href,
  trackingName,
  trackingLocation,
  children,
  className,
}: TrackedLinkProps) {
  const handleClick = () => {
    analytics.ctaClick(trackingName, trackingLocation);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

// For case study cards
interface TrackedCaseStudyLinkProps {
  href: string;
  slug: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedCaseStudyLink({
  href,
  slug,
  title,
  children,
  className,
}: TrackedCaseStudyLinkProps) {
  const handleClick = () => {
    analytics.caseStudyCardClick(slug, title);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
