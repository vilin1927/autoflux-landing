"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { analytics } from "@/providers/posthog-provider";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  type?: "screenshot" | "diagram" | "before-after" | "result";
}

interface ImageGalleryProps {
  images: GalleryImage[];
  layout?: "grid" | "masonry" | "carousel";
  columns?: 2 | 3 | 4;
  className?: string;
  caseStudySlug?: string;
}

export function ImageGallery({
  images,
  layout = "grid",
  columns = 3,
  className,
  caseStudySlug,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    if (caseStudySlug) {
      analytics.trackEvent("case_study_image_view", {
        slug: caseStudySlug,
        image: images[index].alt,
        index,
      });
    }
  };

  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const typeStyles = {
    screenshot:
      "ring-2 ring-[var(--border-light)] shadow-[var(--shadow-lg)]",
    diagram: "bg-white p-4",
    "before-after": "ring-2 ring-[var(--accent)]/30",
    result: "ring-2 ring-[var(--primary)]/20",
  };

  return (
    <>
      {/* Grid Layout */}
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          columnClasses,
          className
        )}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openLightbox(index)}
          >
            <div
              className={cn(
                "relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden",
                "transition-all duration-300",
                "hover:shadow-[var(--shadow-xl)]",
                image.type && typeStyles[image.type]
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4"
              >
                <div className="flex items-center justify-between w-full">
                  {image.caption && (
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {image.caption}
                    </p>
                  )}
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full ml-2 flex-shrink-0">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Type badge */}
              {image.type && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-[var(--radius-sm)] text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  {image.type.replace("-", " ")}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={1200}
                height={800}
                className="rounded-lg object-contain max-h-[80vh] w-auto"
              />
            </motion.div>

            {/* Caption and counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              {images[selectedIndex].caption && (
                <p className="text-white text-lg mb-2">
                  {images[selectedIndex].caption}
                </p>
              )}
              <p className="text-white/60 text-sm">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Before/After comparison slider
interface BeforeAfterProps {
  before: { src: string; label: string };
  after: { src: string; label: string };
  className?: string;
}

export function BeforeAfterSlider({
  before,
  after,
  className,
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(
      e.touches[0].clientX,
      e.currentTarget.getBoundingClientRect()
    );
  };

  return (
    <div
      className={cn(
        "relative aspect-video rounded-[var(--radius-lg)] overflow-hidden cursor-ew-resize select-none",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After image (full width, bottom layer) */}
      <Image
        src={after.src}
        alt={after.label}
        fill
        className="object-cover"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={before.src}
          alt={before.label}
          fill
          className="object-cover"
          style={{ maxWidth: "none", width: "100vw" }}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex gap-0.5">
            <ChevronLeft className="w-4 h-4 text-[var(--primary)]" />
            <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-[var(--radius-sm)] text-white text-sm font-medium">
        {before.label}
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-[var(--radius-sm)] text-white text-sm font-medium">
        {after.label}
      </div>
    </div>
  );
}
