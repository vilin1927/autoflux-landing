"use client";

import { motion } from "framer-motion";
import { Video, Images, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoPlayer, VideoPlaceholder } from "./video-player";
import { ImageGallery, BeforeAfterSlider } from "./image-gallery";
import type { CaseMedia } from "@/types/case-study";

interface MediaShowcaseProps {
  media?: CaseMedia;
  videoPlaceholder?: {
    title: string;
    description: string;
  };
  caseStudySlug: string;
  caseStudyTitle: string;
  className?: string;
}

export function MediaShowcase({
  media,
  videoPlaceholder,
  caseStudySlug,
  caseStudyTitle,
  className,
}: MediaShowcaseProps) {
  const hasVideo = media?.video?.url;
  const hasImages = media?.images && media.images.length > 0;
  const hasBeforeAfter = media?.beforeAfter;
  const hasAnyMedia = hasVideo || hasImages || hasBeforeAfter;

  // If no media at all, show placeholder or return null
  if (!hasAnyMedia && !videoPlaceholder) {
    return null;
  }

  return (
    <section
      className={cn(
        "bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 overflow-hidden",
        className
      )}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--accent)]/20 px-4 py-2 rounded-full mb-4">
            {hasVideo ? <Video className="w-4 h-4" /> : <Images className="w-4 h-4" />}
            See It In Action
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">
            {hasVideo ? "Watch How It Works" : "Visual Walkthrough"}
          </h2>
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="space-y-6">
        {/* Primary Video - Full Width Cinematic */}
        {hasVideo && media.video && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <VideoPlayer
              url={media.video.url}
              thumbnail={media.video.thumbnail}
              title={media.video.title || caseStudyTitle}
              duration={media.video.duration}
              aspectRatio="16/9"
              caseStudySlug={caseStudySlug}
            />
          </motion.div>
        )}

        {/* Video Placeholder when no video available */}
        {!hasVideo && videoPlaceholder && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <VideoPlaceholder
              title={videoPlaceholder.title}
              description={videoPlaceholder.description}
            />
          </motion.div>
        )}

        {/* Before/After Comparison */}
        {hasBeforeAfter && media.beforeAfter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[var(--text-dark)] mb-1">
                Before & After
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Drag the slider to compare the transformation
              </p>
            </div>
            <BeforeAfterSlider
              before={media.beforeAfter.before}
              after={media.beforeAfter.after}
            />
          </motion.div>
        )}

        {/* Image Gallery */}
        {hasImages && media.images && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {media.images.length > 1 && (
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[var(--text-dark)] mb-1">
                  Screenshots & Diagrams
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Click any image to view full size
                </p>
              </div>
            )}
            <ImageGallery
              images={media.images}
              columns={media.images.length === 1 ? 2 : media.images.length === 2 ? 2 : 3}
              caseStudySlug={caseStudySlug}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Compact inline video for embedding within other sections
export function InlineVideo({
  url,
  thumbnail,
  title,
  className,
}: {
  url: string;
  thumbnail?: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] overflow-hidden", className)}>
      <VideoPlayer
        url={url}
        thumbnail={thumbnail}
        title={title}
        aspectRatio="16/9"
      />
    </div>
  );
}

// Feature highlight with video
export function VideoFeature({
  title,
  description,
  videoUrl,
  thumbnail,
  reverse = false,
  className,
}: {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid md:grid-cols-2 gap-8 items-center",
        reverse && "md:[&>*:first-child]:order-2",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-[var(--text-dark)] mb-3">
          {title}
        </h3>
        <p className="text-[var(--text-muted)] leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-[var(--primary)] font-medium">
          Watch demo <ArrowRight className="w-4 h-4" />
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <VideoPlayer
          url={videoUrl}
          thumbnail={thumbnail}
          aspectRatio="16/9"
        />
      </motion.div>
    </div>
  );
}
