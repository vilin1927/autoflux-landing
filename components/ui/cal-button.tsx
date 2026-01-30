"use client";

import { Button } from "./button";
import { cn } from "@/lib/utils";
import { analytics } from "@/providers/posthog-provider";

interface CalButtonProps {
  children: React.ReactNode;
  variant?: "default" | "lime" | "outline" | "ghost";
  className?: string;
  trackingLocation?: string;
}

export function CalButton({
  children,
  variant = "default",
  className,
  trackingLocation = "unknown",
}: CalButtonProps) {
  const handleClick = () => {
    analytics.ctaClick("Book Blueprint Call", trackingLocation);
  };

  return (
    <Button
      variant={variant}
      className={cn(className)}
      onClick={handleClick}
      data-cal-namespace="blueprint"
      data-cal-link="vladimir-ilin-dq2q4k/blueprint"
      data-cal-config='{"layout":"month_view"}'
    >
      {children}
    </Button>
  );
}
