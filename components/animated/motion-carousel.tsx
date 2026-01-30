"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function MotionCarousel<T>({
  items,
  renderItem,
  className,
}: MotionCarouselProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      {/* Swipe hint */}
      <p className="text-center text-[var(--text-muted)] text-sm mb-4 md:hidden">
        Swipe to explore →
      </p>

      {/* Carousel container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-y">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex-none w-[85%] min-w-0"
              animate={{
                scale: index === selectedIndex ? 1 : 0.95,
                opacity: index === selectedIndex ? 1 : 0.6,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <motion.button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors duration-300",
              index === selectedIndex
                ? "bg-[var(--accent)]"
                : "bg-[var(--border-medium)]"
            )}
            animate={{ scale: index === selectedIndex ? 1.3 : 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
