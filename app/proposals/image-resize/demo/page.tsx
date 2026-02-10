"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Download,
  RotateCcw,
  ArrowLeft,
  Monitor,
  ChevronRight,
  Check,
  Loader2,
  GripVertical,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";

// ── Preset Formats ──────────────────────────────────────────────
const presets = [
  { id: "ig-post", label: "Instagram Post", w: 1080, h: 1080, icon: "IG" },
  { id: "ig-story", label: "Instagram Story", w: 1080, h: 1920, icon: "IG" },
  { id: "fb-cover", label: "Facebook Cover", w: 820, h: 312, icon: "FB" },
  { id: "li-banner", label: "LinkedIn Banner", w: 1584, h: 396, icon: "LI" },
  { id: "tw-header", label: "X / Twitter Header", w: 1500, h: 500, icon: "X" },
  { id: "yt-thumb", label: "YouTube Thumbnail", w: 1280, h: 720, icon: "YT" },
  { id: "web-hero", label: "Web Hero Banner", w: 1920, h: 600, icon: "WB" },
  { id: "og-image", label: "OG Image", w: 1200, h: 630, icon: "OG" },
] as const;

type PresetId = (typeof presets)[number]["id"];

// ── Mock generated "outpainted" colors for edge fill ────────────
const gradientFills: Record<string, string> = {
  "ig-post": "from-indigo-900/60 via-purple-800/40 to-indigo-900/60",
  "ig-story": "from-violet-900/60 via-fuchsia-800/40 to-violet-900/60",
  "fb-cover": "from-blue-900/60 via-sky-800/40 to-blue-900/60",
  "li-banner": "from-blue-950/60 via-blue-800/40 to-blue-950/60",
  "tw-header": "from-slate-900/60 via-gray-800/40 to-slate-900/60",
  "yt-thumb": "from-red-900/60 via-rose-800/40 to-red-900/60",
  "web-hero": "from-emerald-900/60 via-teal-800/40 to-emerald-900/60",
  "og-image": "from-amber-900/60 via-orange-800/40 to-amber-900/60",
};

type Screen = "upload" | "editor" | "processing" | "result";

export default function DemoPage() {
  const [screen, setScreen] = useState<Screen>("upload");
  const [selectedPreset, setSelectedPreset] = useState<PresetId>("ig-post");
  const [isDragging, setIsDragging] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [splitPos, setSplitPos] = useState(50);
  const [zoom, setZoom] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Processing animation
  useEffect(() => {
    if (screen !== "processing") return;
    let step = 0;
    const steps = 4;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= steps) {
        clearInterval(interval);
        setTimeout(() => setScreen("result"), 600);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [screen]);

  // Split view drag handler
  const handleSplitDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggingRef.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPos(Math.max(5, Math.min(95, pct)));
  }, []);

  useEffect(() => {
    const stop = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", handleSplitDrag);
    window.addEventListener("touchmove", handleSplitDrag);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", handleSplitDrag);
      window.removeEventListener("touchmove", handleSplitDrag);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [handleSplitDrag]);

  const handleUpload = () => {
    setHasImage(true);
    setScreen("editor");
  };

  const handleResize = () => {
    setProcessingStep(0);
    setScreen("processing");
  };

  const handleReset = () => {
    setHasImage(false);
    setScreen("upload");
    setSplitPos(50);
    setZoom(100);
    setSelectedPreset("ig-post");
  };

  const preset = presets.find((p) => p.id === selectedPreset)!;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0c0a1a] flex items-center justify-center p-6">
        <div className="bg-[#161228] rounded-2xl p-8 max-w-sm text-center border border-violet-900/30">
          <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">
            Best Viewed on Desktop
          </h1>
          <p className="text-slate-400 mb-6">
            This demo showcases a full image editing experience. Please view on
            a larger screen.
          </p>
          <Link
            href="/proposals/image-resize"
            className="inline-flex items-center gap-2 text-violet-400 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0a1a] flex flex-col">
      {/* ── Top Bar ───────────────────────────────────────────── */}
      <header className="h-14 bg-[#161228] border-b border-violet-900/30 flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/proposals/image-resize"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Proposal
          </Link>
          <div className="w-px h-5 bg-violet-900/40" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Maximize2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">ResizeAI</span>
          </div>
        </div>

        <span className="text-xs font-medium uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
          Interactive Demo
        </span>
      </header>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === "upload" && (
            <UploadScreen
              key="upload"
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              onUpload={handleUpload}
            />
          )}
          {screen === "editor" && (
            <EditorScreen
              key="editor"
              presets={presets}
              selectedPreset={selectedPreset}
              setSelectedPreset={setSelectedPreset}
              preset={preset}
              onResize={handleResize}
              onReset={handleReset}
            />
          )}
          {screen === "processing" && (
            <ProcessingScreen key="processing" step={processingStep} preset={preset} />
          )}
          {screen === "result" && (
            <ResultScreen
              key="result"
              preset={preset}
              splitPos={splitPos}
              splitRef={splitRef}
              draggingRef={draggingRef}
              zoom={zoom}
              setZoom={setZoom}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Upload Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function UploadScreen({
  isDragging,
  setIsDragging,
  onUpload,
}: {
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  onUpload: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex items-center justify-center p-8"
    >
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            AI-Powered Image Resizing
          </h1>
          <p className="text-slate-400">
            Upload an image and let AI intelligently extend it to any format
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            onUpload();
          }}
          onClick={onUpload}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-violet-400 bg-violet-500/10 scale-[1.02]"
              : "border-violet-800/50 bg-[#161228]/50 hover:border-violet-600/60 hover:bg-violet-500/5"
          }`}
        >
          <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Upload
              className={`w-8 h-8 transition-colors ${
                isDragging ? "text-violet-300" : "text-violet-400"
              }`}
            />
          </div>
          <p className="text-white font-semibold text-lg mb-1">
            {isDragging ? "Drop your image here" : "Drag & drop your image"}
          </p>
          <p className="text-slate-500 text-sm mb-4">
            or click to browse
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
            <span>JPG, PNG</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Max 10 MB</span>
          </div>
        </div>

        {/* Sample Images */}
        <div className="mt-6">
          <p className="text-slate-500 text-xs text-center mb-3">
            Or try with a sample image
          </p>
          <div className="flex gap-3 justify-center">
            {["Landscape", "Portrait", "Product"].map((label) => (
              <button
                key={label}
                onClick={onUpload}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-violet-500/50 transition-colors">
                  <div
                    className={`w-full h-full ${
                      label === "Landscape"
                        ? "bg-gradient-to-br from-sky-600 to-emerald-500"
                        : label === "Portrait"
                        ? "bg-gradient-to-br from-rose-600 to-orange-500"
                        : "bg-gradient-to-br from-violet-600 to-fuchsia-500"
                    }`}
                  />
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Editor Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function EditorScreen({
  presets: presetList,
  selectedPreset,
  setSelectedPreset,
  preset,
  onResize,
  onReset,
}: {
  presets: typeof presets;
  selectedPreset: PresetId;
  setSelectedPreset: (id: PresetId) => void;
  preset: (typeof presets)[number];
  onResize: () => void;
  onReset: () => void;
}) {
  const aspectRatio = preset.w / preset.h;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex"
    >
      {/* Left Sidebar - Presets */}
      <aside className="w-72 bg-[#161228] border-r border-violet-900/30 flex flex-col shrink-0">
        <div className="p-5 border-b border-violet-900/20">
          <h2 className="text-sm font-bold text-white mb-1">Target Format</h2>
          <p className="text-xs text-slate-500">Select output dimensions</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {presetList.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all ${
                selectedPreset === p.id
                  ? "bg-violet-500/20 border border-violet-500/40 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                  selectedPreset === p.id
                    ? "bg-violet-500 text-white"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {p.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{p.label}</p>
                <p className="text-xs text-slate-500">
                  {p.w} &times; {p.h}
                </p>
              </div>
              {selectedPreset === p.id && (
                <Check className="w-4 h-4 text-violet-400 ml-auto shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Resize Mode */}
        <div className="p-4 border-t border-violet-900/20">
          <p className="text-xs text-slate-500 mb-2 font-medium">Resize Mode</p>
          <div className="bg-violet-500/15 border border-violet-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">AI Extend</p>
              <p className="text-xs text-slate-400">Outpainting via Stable Diffusion</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Center - Preview */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-[#1a1530] border-b border-violet-900/20 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Image
            </button>
          </div>
          <div className="text-xs text-slate-500">
            Original: 1200 &times; 800 &rarr; Target: {preset.w} &times;{" "}
            {preset.h}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 bg-[#0e0c1d]">
          <div className="relative">
            {/* Target format frame */}
            <div
              className="relative border-2 border-dashed border-violet-500/30 rounded-lg overflow-hidden"
              style={{
                width: aspectRatio >= 1 ? "480px" : `${480 * aspectRatio}px`,
                height: aspectRatio >= 1 ? `${480 / aspectRatio}px` : "480px",
              }}
            >
              {/* AI fill area (outer) */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-purple-800/20 to-fuchsia-900/30">
                {/* Grid pattern to suggest AI generation */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
              </div>

              {/* Original image centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative"
                  style={{
                    width: "60%",
                    height: "70%",
                  }}
                >
                  <PlaceholderImage className="w-full h-full rounded-md" />
                  <div className="absolute inset-0 ring-2 ring-violet-400/60 ring-offset-2 ring-offset-[#0e0c1d] rounded-md pointer-events-none" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-violet-300 bg-violet-900/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Original
                  </span>
                </div>
              </div>

              {/* Corner labels for AI area */}
              <span className="absolute top-2 left-2 text-[10px] text-violet-400/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Extend
              </span>
            </div>

            {/* Dimension labels */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">
              {preset.w}px
            </div>
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 text-xs text-slate-500 -rotate-90">
              {preset.h}px
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="h-16 bg-[#1a1530] border-t border-violet-900/20 flex items-center justify-center px-5">
          <button
            onClick={onResize}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/25"
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Resize
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Processing Screen
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProcessingScreen({
  step,
  preset,
}: {
  step: number;
  preset: (typeof presets)[number];
}) {
  const steps = [
    "Analyzing image content & edges...",
    "Generating outpainting mask...",
    "Running Stable Diffusion XL...",
    "Compositing final image...",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex-1 flex items-center justify-center"
    >
      <div className="max-w-md w-full text-center px-6">
        {/* Animated ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
          <div className="absolute inset-3 rounded-full bg-violet-500/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-violet-400" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">
          AI Resizing to {preset.label}
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          {preset.w} &times; {preset.h} &middot; Outpainting in progress
        </p>

        <div className="space-y-2.5 text-left">
          {steps.map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: step >= i ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm ${
                step > i
                  ? "bg-emerald-500/10 text-emerald-300"
                  : step === i
                  ? "bg-violet-500/10 text-violet-300"
                  : "bg-white/[0.03] text-slate-600"
              }`}
            >
              {step > i ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : step === i ? (
                <Loader2 className="w-4 h-4 text-violet-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
              )}
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Result Screen (Before / After Split View)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ResultScreen({
  preset,
  splitPos,
  splitRef,
  draggingRef,
  zoom,
  setZoom,
  onReset,
}: {
  preset: (typeof presets)[number];
  splitPos: number;
  splitRef: React.RefObject<HTMLDivElement | null>;
  draggingRef: React.MutableRefObject<boolean>;
  zoom: number;
  setZoom: (z: number) => void;
  onReset: () => void;
}) {
  const aspectRatio = preset.w / preset.h;
  const handleDownload = () => {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-6 right-6 bg-white text-gray-900 px-5 py-3 rounded-xl shadow-2xl z-50 text-sm font-medium";
    toast.textContent = "Download ready in the full version!";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Toolbar */}
      <div className="h-12 bg-[#1a1530] border-b border-violet-900/20 flex items-center justify-between px-5">
        <div className="flex items-center gap-4">
          <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
            <Check className="w-3 h-3" /> Complete
          </span>
          <span className="text-xs text-slate-500">
            {preset.label} &middot; {preset.w} &times; {preset.h}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom */}
          <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-slate-300 w-10 text-center font-mono">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Image
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs px-4 py-1.5 rounded-lg font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0e0c1d]">
        <div
          ref={splitRef}
          className="relative rounded-xl overflow-hidden cursor-col-resize select-none"
          style={{
            width:
              aspectRatio >= 1
                ? `${480 * (zoom / 100)}px`
                : `${480 * aspectRatio * (zoom / 100)}px`,
            height:
              aspectRatio >= 1
                ? `${(480 / aspectRatio) * (zoom / 100)}px`
                : `${480 * (zoom / 100)}px`,
          }}
          onMouseDown={() => {
            draggingRef.current = true;
          }}
          onTouchStart={() => {
            draggingRef.current = true;
          }}
        >
          {/* "After" layer (full AI-resized) */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-800/30 to-fuchsia-900/40">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>
            {/* Original centered inside */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlaceholderImage
                className="rounded"
                style={{
                  width: "55%",
                  height: "65%",
                }}
              />
            </div>
          </div>

          {/* "Before" layer (original only) - clipped by split position */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${splitPos}%` }}
          >
            <div
              className="bg-[#1a1530] flex items-center justify-center"
              style={{
                width:
                  aspectRatio >= 1
                    ? `${480 * (zoom / 100)}px`
                    : `${480 * aspectRatio * (zoom / 100)}px`,
                height:
                  aspectRatio >= 1
                    ? `${(480 / aspectRatio) * (zoom / 100)}px`
                    : `${480 * (zoom / 100)}px`,
              }}
            >
              <PlaceholderImage
                className="rounded"
                style={{
                  width: "55%",
                  height: "65%",
                }}
              />
            </div>
          </div>

          {/* Split handle */}
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{ left: `${splitPos}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-0.5 h-full bg-white/80" />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
              <GripVertical className="w-4 h-4 text-slate-700" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-3 left-3 z-20">
            <span className="text-xs bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">
              Before
            </span>
          </div>
          <div className="absolute top-3 right-3 z-20">
            <span className="text-xs bg-violet-600/80 text-white px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> After
            </span>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="h-10 bg-[#1a1530] border-t border-violet-900/20 flex items-center justify-center gap-6 text-xs text-slate-500">
        <span>Mode: AI Extend (Outpainting)</span>
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <span>Engine: Stable Diffusion XL</span>
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <span>Drag the handle to compare</span>
      </div>
    </motion.div>
  );
}

// ── Styled PlaceholderImage (accepts style) ─────────────────────
function PlaceholderImage({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 ${className}`}
      style={style}
    >
      <svg viewBox="0 0 400 300" className="w-full h-full opacity-60">
        <circle cx="120" cy="100" r="50" fill="rgba(255,255,255,0.15)" />
        <rect
          x="200"
          y="60"
          width="140"
          height="100"
          rx="12"
          fill="rgba(255,255,255,0.1)"
        />
        <polygon
          points="50,280 180,160 310,280"
          fill="rgba(255,255,255,0.12)"
        />
        <polygon
          points="200,280 290,190 380,280"
          fill="rgba(255,255,255,0.08)"
        />
      </svg>
    </div>
  );
}
