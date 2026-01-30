"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { analytics } from "@/providers/posthog-provider";
import { forwardRef } from "react";

interface TrackedButtonProps extends ButtonProps {
  trackingName: string;
  trackingLocation: string;
}

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ trackingName, trackingLocation, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      analytics.ctaClick(trackingName, trackingLocation);
      onClick?.(e);
    };

    return (
      <Button ref={ref} onClick={handleClick} {...props}>
        {children}
      </Button>
    );
  }
);

TrackedButton.displayName = "TrackedButton";
