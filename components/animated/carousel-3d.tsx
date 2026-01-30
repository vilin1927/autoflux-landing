"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { analytics } from "@/providers/posthog-provider";

interface Carousel3DProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  trackingName?: string;
}

export function Carousel3D<T>({
  items,
  renderItem,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  trackingName = "carousel",
}: Carousel3DProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = items.length;

  const goToNext = useCallback(() => {
    if (totalItems <= 1) return;
    const newIndex = (activeIndex + 1) % totalItems;
    analytics.carouselNavigation(trackingName, "next", activeIndex, newIndex);
    setActiveIndex(newIndex);
  }, [totalItems, activeIndex, trackingName]);

  const goToPrev = useCallback(() => {
    if (totalItems <= 1) return;
    const newIndex = (activeIndex - 1 + totalItems) % totalItems;
    analytics.carouselNavigation(trackingName, "prev", activeIndex, newIndex);
    setActiveIndex(newIndex);
  }, [totalItems, activeIndex, trackingName]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        analytics.carouselNavigation(trackingName, "dot", activeIndex, index);
        setActiveIndex(index);
      }
    },
    [activeIndex, trackingName]
  );

  // Reset index when items change or ensure it's valid
  useEffect(() => {
    if (activeIndex >= totalItems) {
      setActiveIndex(0);
    }
  }, [totalItems, activeIndex]);

  // Auto play
  useEffect(() => {
    if (!autoPlay || totalItems <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, totalItems]);

  // Handle empty state
  if (totalItems === 0) {
    return (
      <div className={cn("flex items-center justify-center py-12", className)}>
        <p className="text-[var(--text-muted)]">No items to display</p>
      </div>
    );
  }

  // Handle single item - center it
  if (totalItems === 1) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="w-full max-w-sm mx-auto">
          {renderItem(items[0], 0, true)}
        </div>
      </div>
    );
  }

  // Handle two items
  if (totalItems === 2) {
    return (
      <div className={cn("relative", className)}>
        <div
          className="relative h-[480px] md:h-[520px]"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-[280px] md:w-[360px] cursor-pointer",
                  index === activeIndex ? "z-10" : "z-0"
                )}
                animate={{
                  scale: index === activeIndex ? 1 : 0.85,
                  opacity: index === activeIndex ? 1 : 0.7,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setActiveIndex(index)}
              >
                {renderItem(item, index, index === activeIndex)}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "bg-[var(--accent)] w-8"
                  : "bg-[var(--border-light)] hover:bg-[var(--text-muted)]"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Ensure activeIndex is valid
  const safeIndex = Math.min(activeIndex, totalItems - 1);

  // Get visible items (prev, current, next)
  const prev = (safeIndex - 1 + totalItems) % totalItems;
  const current = safeIndex;
  const next = (safeIndex + 1) % totalItems;

  // Safety check
  if (!items[prev] || !items[current] || !items[next]) {
    return (
      <div className={cn("flex items-center justify-center py-12", className)}>
        <p className="text-[var(--text-muted)]">Loading...</p>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* 3D Container */}
      <div
        className="relative h-[480px] md:h-[520px]"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Previous Card */}
          <motion.div
            key={`prev-${prev}`}
            className="absolute w-[260px] md:w-[340px] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              x: "-55%",
              scale: 0.75,
              rotateY: 20,
              zIndex: 1,
              opacity: 0.5,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={goToPrev}
          >
            {renderItem(items[prev], prev, false)}
          </motion.div>

          {/* Current Card */}
          <motion.div
            key={`current-${current}`}
            className="absolute w-[300px] md:w-[400px]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              x: "0%",
              scale: 1,
              rotateY: 0,
              zIndex: 10,
              opacity: 1,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {renderItem(items[current], current, true)}
          </motion.div>

          {/* Next Card */}
          <motion.div
            key={`next-${next}`}
            className="absolute w-[260px] md:w-[340px] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              x: "55%",
              scale: 0.75,
              rotateY: -20,
              zIndex: 1,
              opacity: 0.5,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={goToNext}
          >
            {renderItem(items[next], next, false)}
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white border border-[var(--border-light)] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[var(--primary)]" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white border border-[var(--border-light)] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[var(--primary)]" />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === activeIndex
                ? "bg-[var(--accent)] w-8"
                : "bg-[var(--border-light)] hover:bg-[var(--text-muted)]"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
