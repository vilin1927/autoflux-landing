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
        "bg-gradient-to-br from-[var(--bg-light)] to-[var(--border-light)]",
        "border-2 border-dashed border-[var(--border-light)]",
        "flex flex-col items-center justify-center text-center p-8",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-4">
        <Play className="w-8 h-8 text-[var(--accent)]" />
      </div>
      <h4 className="text-lg font-bold text-[var(--text-dark)] mb-2">{title}</h4>
      <p className="text-sm text-[var(--text-muted)] max-w-sm">{description}</p>
    </div>
  );
}
