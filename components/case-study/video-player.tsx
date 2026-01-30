"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Maximize2, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { analytics } from "@/providers/posthog-provider";
// Dynamic import to avoid SSR issues with react-player
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3";
  autoPlay?: boolean;
  className?: string;
  caseStudySlug?: string;
}

export function VideoPlayer({
  url,
  thumbnail,
  title,
  duration,
  aspectRatio = "16/9",
  autoPlay = false,
  className,
  caseStudySlug,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const playerRef = useRef<any>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
    if (caseStudySlug) {
      analytics.trackEvent("case_study_video_play", {
        slug: caseStudySlug,
        title,
      });
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setIsPlaying(true);
    setIsMuted(false);
    if (caseStudySlug) {
      analytics.trackEvent("case_study_video_fullscreen", {
        slug: caseStudySlug,
        title,
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPlaying(false);
  };

  const aspectRatioClass = {
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
    "4/3": "aspect-[4/3]",
  }[aspectRatio];

  return (
    <>
      {/* Inline Player */}
      <div className={cn("relative group", className)}>
        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-lg)] bg-black",
            aspectRatioClass
          )}
        >
          {/* Custom thumbnail overlay */}
          {!hasStarted && thumbnail && (
            <div className="absolute inset-0 z-10">
              <img
                src={thumbnail}
                alt={title || "Video thumbnail"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          )}

          {/* Video Player - only render when started to avoid loading issues */}
          {hasStarted && (
            <ReactPlayer
              ref={playerRef}
              url={url}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onReady={() => console.log("Video player ready")}
              onError={(e: unknown) => console.error("Video player error:", e)}
              config={{
                youtube: {
                  rel: 0,
                },
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}

          {/* Play Button Overlay */}
          {!hasStarted && (
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-2xl transition-transform">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-[var(--primary)] ml-1" />
              </div>
            </motion.button>
          )}


          {/* Duration badge */}
          {duration && !hasStarted && (
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-sm font-medium rounded-[var(--radius-sm)]">
              {duration}
            </div>
          )}

          {/* Title overlay */}
          {title && !hasStarted && (
            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-white font-semibold text-lg drop-shadow-lg">
                {title}
              </p>
            </div>
          )}

          {/* Controls overlay when playing */}
          {hasStarted && (
            <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleOpenModal}
                className="p-2 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={handleCloseModal}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal video */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-[90vw] max-w-6xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                playing={true}
                muted={false}
                controls
                config={{
                  youtube: {
                    rel: 0,
                  },
                }}
              />
            </motion.div>

            {/* Title in modal */}
            {title && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xl font-semibold">
                {title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Placeholder component when no video is available
export function VideoPlaceholder({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-video rounded-[var(--radius-lg)] overflow-hidden",
        className
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#2D2A5B] to-[#1E1B4B]">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CFFF4D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-full text-[var(--accent)] text-sm font-semibold">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            Coming Soon
          </span>
        </motion.div>

        {/* Play button icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-[var(--accent)] ml-1" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl font-bold text-white mb-3"
        >
          {title}
        </motion.h4>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/70 max-w-md mb-6"
        >
          {description}
        </motion.p>

        {/* Team info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
        >
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#9EE82D] border-2 border-[#1E1B4B] flex items-center justify-center text-[10px] font-bold text-[#1E1B4B]">V</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3DD6D0] to-[#2BB8B2] border-2 border-[#1E1B4B] flex items-center justify-center text-[10px] font-bold text-[#1E1B4B]">A</div>
          </div>
          <span className="text-sm text-white/80">
            Our team is preparing detailed case studies
          </span>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--accent)]/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--accent)]/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--accent)]/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--accent)]/30 rounded-br-lg" />
    </div>
  );
}
