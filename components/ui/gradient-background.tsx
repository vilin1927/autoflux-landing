"use client";

import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function GradientBackground({
  className,
  children,
}: GradientBackgroundProps) {
  return (
    <div
      className={cn(
        "size-full bg-gradient-to-br from-[#CFFF4D] via-[#3DD6D0] to-[#B8E635] bg-[length:300%_300%] animate-gradient-flow",
        className
      )}
    >
      {children}
    </div>
  );
}
