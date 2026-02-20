"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  PenTool,
  Calendar,
  History,
  Settings,
  Sparkles,
  Check,
  Loader2,
  ArrowLeft,
  Monitor,
  Send,
  Clock,
  Eye,
  RefreshCw,
  Heart,
  MessageCircle,
  BarChart3,
  ChevronRight,
  Video,
  Play,
  Share2,
} from "lucide-react";
import { demoData } from "@/data/proposals/checkpoint";

type Screen = "dashboard" | "generate" | "queue" | "history";
type GenerateStep = "topic" | "processing" | "script-result" | "rendering" | "video-result";

export default function CheckpointDemoPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [generateStep, setGenerateStep] = useState<GenerateStep>("topic");
  const [topic, setTopic] = useState("");
  const [processingStep, setProcessingStep] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "tiktok", "x"]);
  const [scheduleTime, setScheduleTime] = useState("Today, 2:00 PM EST");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Script generation processing (steps 0–1)
  useEffect(() => {
    if (generateStep === "processing") {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setProcessingStep(step);
        if (step >= 2) {
          clearInterval(interval);
          setTypingIndex(0);
          setTimeout(() => setGenerateStep("script-result"), 400);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [generateStep]);

  // Typing animation for script result
  useEffect(() => {
    if (generateStep === "script-result" && typingIndex < demoData.sampleScript.text.length) {
      const speed = Math.random() * 10 + 5;
      const timeout = setTimeout(() => {
        setTypingIndex((prev) => Math.min(prev + 3, demoData.sampleScript.text.length));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [generateStep, typingIndex]);

  // Video rendering processing (steps 2–5)
  useEffect(() => {
    if (generateStep === "rendering") {
      let step = 2;
      setProcessingStep(2);
      const interval = setInterval(() => {
        step++;
        setProcessingStep(step);
        if (step >= 6) {
          clearInterval(interval);
          setTimeout(() => setGenerateStep("video-result"), 400);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [generateStep]);

  const handleGenerate = () => {
    setGenerateStep("topic");
    setProcessingStep(0);
    setTypingIndex(0);
    setTopic("");
    setCurrentScreen("generate");
  };

  const handleStartGeneration = () => {
    setProcessingStep(0);
    setGenerateStep("processing");
  };

  const handleRenderVideo = () => {
    setGenerateStep("rendering");
  };

  const handleApproveVideo = () => {
    setCurrentScreen("queue");
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-sky-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Best Viewed on Desktop</h1>
          <p className="text-gray-600 mb-6">
            This demo showcases a full dashboard experience. Please view on a larger screen.
          </p>
          <Link
            href="/proposals/checkpoint"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">{demoData.appName}</h1>
              <p className="text-xs text-white/50">{demoData.tagline}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={currentScreen === "dashboard"}
              onClick={() => setCurrentScreen("dashboard")}
            />
            <SidebarItem
              icon={Video}
              label="Generate Video"
              active={currentScreen === "generate"}
              onClick={handleGenerate}
            />
            <SidebarItem
              icon={Calendar}
              label="Video Queue"
              active={currentScreen === "queue"}
              onClick={() => setCurrentScreen("queue")}
              badge={demoData.scheduledVideos.filter((v) => v.status === "approved").length}
            />
            <SidebarItem
              icon={History}
              label="Post History"
              active={currentScreen === "history"}
              onClick={() => setCurrentScreen("history")}
            />
            <SidebarItem icon={Settings} label="Brand Settings" disabled />
            <SidebarItem icon={BarChart3} label="Analytics" disabled />
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">{demoData.user.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{demoData.user.name}</p>
              <p className="text-xs text-white/50">{demoData.user.company}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Interactive Demo
            </span>
            <span className="text-xs text-gray-400">
              This is a mockup preview of the final product
            </span>
          </div>
          <Link
            href="/proposals/checkpoint"
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {currentScreen === "dashboard" && (
              <DashboardScreen key="dashboard" onGenerate={handleGenerate} onViewQueue={() => setCurrentScreen("queue")} />
            )}
            {currentScreen === "generate" && (
              <GenerateScreen
                key="generate"
                step={generateStep}
                topic={topic}
                setTopic={setTopic}
                processingStep={processingStep}
                typingIndex={typingIndex}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
                scheduleTime={scheduleTime}
                setScheduleTime={setScheduleTime}
                onStartGeneration={handleStartGeneration}
                onRenderVideo={handleRenderVideo}
                onApprove={handleApproveVideo}
                onRegenerate={() => {
                  setProcessingStep(0);
                  setTypingIndex(0);
                  setGenerateStep("processing");
                }}
              />
            )}
            {currentScreen === "queue" && (
              <QueueScreen key="queue" onGenerate={handleGenerate} />
            )}
            {currentScreen === "history" && (
              <HistoryScreen key="history" />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Sidebar Item
function SidebarItem({
  icon: Icon,
  label,
  active,
  disabled,
  badge,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  disabled?: boolean;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          active
            ? "bg-sky-500/20 text-sky-400"
            : disabled
            ? "text-white/25 cursor-not-allowed"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="flex-1 text-left">{label}</span>
        {badge !== undefined && badge > 0 && (
          <span className="px-2 py-0.5 text-xs font-bold bg-sky-500 text-white rounded-full">
            {badge}
          </span>
        )}
        {disabled && (
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-white/10 text-white/40 rounded">
            Soon
          </span>
        )}
      </button>
    </li>
  );
}

// Dashboard Screen
function DashboardScreen({ onGenerate, onViewQueue }: { onGenerate: () => void; onViewQueue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {demoData.user.name}</h1>
      <p className="text-gray-500 mb-6">Here&apos;s your video content overview</p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard value={String(demoData.stats.videosGenerated)} label="Videos Generated" color="sky" />
        <StatCard value={String(demoData.stats.videosPosted)} label="Videos Posted" color="green" />
        <StatCard value={String(demoData.stats.platformsActive)} label="Platforms Active" color="purple" />
        <StatCard value={demoData.stats.avgRenderTime} label="Avg Render Time" color="amber" />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Generate New Video</h3>
              <p className="text-sm text-white/60">Claude AI + HeyGen avatar pipeline</p>
            </div>
          </div>
          <button
            onClick={onGenerate}
            className="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-400 transition-colors mt-2"
          >
            Start Generating
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Video Queue</h3>
              <p className="text-sm text-gray-500">{demoData.scheduledVideos.filter((v) => v.status === "approved").length} videos ready to post</p>
            </div>
          </div>
          <button
            onClick={onViewQueue}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors mt-2"
          >
            View Queue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Recent Videos</h3>
        <div className="space-y-3">
          {demoData.scheduledVideos.slice(0, 3).map((video) => (
            <div key={video.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-14 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium truncate">{video.topic}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.scheduledFor}
                  </span>
                  <div className="flex items-center gap-1">
                    {video.platforms.map((p) => (
                      <SmallPlatformIcon key={p} platform={p} />
                    ))}
                  </div>
                  <StatusBadge status={video.status} />
                </div>
              </div>
              <span className="text-xs text-gray-400 font-mono">{video.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  const colorStyles: Record<string, string> = {
    sky: "bg-sky-50 border-sky-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
    amber: "bg-amber-50 border-amber-100",
  };
  const textStyles: Record<string, string> = {
    sky: "text-sky-700",
    green: "text-green-700",
    purple: "text-purple-700",
    amber: "text-amber-700",
  };

  return (
    <div className={`rounded-xl border p-5 ${colorStyles[color]}`}>
      <p className={`text-3xl font-bold ${textStyles[color]}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

// Generate Screen
function GenerateScreen({
  step,
  topic,
  setTopic,
  processingStep,
  typingIndex,
  selectedPlatforms,
  setSelectedPlatforms,
  scheduleTime,
  setScheduleTime,
  onStartGeneration,
  onRenderVideo,
  onApprove,
  onRegenerate,
}: {
  step: GenerateStep;
  topic: string;
  setTopic: (t: string) => void;
  processingStep: number;
  typingIndex: number;
  selectedPlatforms: string[];
  setSelectedPlatforms: (p: string[]) => void;
  scheduleTime: string;
  setScheduleTime: (t: string) => void;
  onStartGeneration: () => void;
  onRenderVideo: () => void;
  onApprove: () => void;
  onRegenerate: () => void;
}) {
  // Processing steps (first 2: script generation)
  if (step === "processing") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-md mx-auto text-center py-12"
      >
        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Writing Script</h2>
        <p className="text-gray-500 mb-8">Claude AI is crafting your video script...</p>
        <div className="space-y-3 text-left">
          {demoData.generationSteps.slice(0, 2).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: processingStep >= i ? 1 : 0.4, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                processingStep > i
                  ? "bg-green-50"
                  : processingStep === i
                  ? "bg-sky-50"
                  : "bg-gray-50"
              }`}
            >
              {processingStep > i ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : processingStep === i ? (
                <Loader2 className="w-5 h-5 text-sky-600 animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <span className={`text-sm ${processingStep >= i ? "text-gray-900" : "text-gray-400"}`}>
                {s}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Script result
  if (step === "script-result") {
    const displayText = demoData.sampleScript.text.slice(0, typingIndex);
    const isTyping = typingIndex < demoData.sampleScript.text.length;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">Script Generated</h2>
        <p className="text-gray-500 mb-6">Review the AI-written script before rendering</p>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Script Preview (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Script Preview
            </h3>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">{demoData.sampleScript.topic}</p>
                  <p className="text-xs text-gray-400">Duration: ~{demoData.sampleScript.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-medium text-sky-600">Claude Haiku 4.5</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 min-h-[200px]">
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed font-mono">
                  {displayText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-sky-500 ml-0.5 animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Actions (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Actions
            </h3>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-800">Script Quality</span>
                </div>
                <div className="w-full bg-sky-200 rounded-full h-2 mb-2">
                  <div className="bg-sky-600 h-2 rounded-full" style={{ width: "94%" }} />
                </div>
                <p className="text-xs text-sky-700">
                  94% brand voice match &middot; 45s estimated duration
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button
                  onClick={onRenderVideo}
                  disabled={isTyping}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${
                    isTyping
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  <Video className="w-5 h-5" />
                  Render Video
                </button>
                <button
                  onClick={onRegenerate}
                  disabled={isTyping}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Script
                </button>
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  <PenTool className="w-4 h-4" />
                  Edit Script
                  <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-200 text-gray-500 rounded ml-1">Soon</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Rendering animation (steps 2–5)
  if (step === "rendering") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-md mx-auto text-center py-12"
      >
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Rendering Video</h2>
        <p className="text-gray-500 mb-8">HeyGen is creating your avatar video...</p>
        <div className="space-y-3 text-left">
          {demoData.generationSteps.slice(2).map((s, i) => {
            const globalIdx = i + 2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: processingStep >= globalIdx ? 1 : 0.4, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  processingStep > globalIdx
                    ? "bg-green-50"
                    : processingStep === globalIdx
                    ? "bg-purple-50"
                    : "bg-gray-50"
                }`}
              >
                {processingStep > globalIdx ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : processingStep === globalIdx ? (
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <span className={`text-sm ${processingStep >= globalIdx ? "text-gray-900" : "text-gray-400"}`}>
                  {s}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Video result
  if (step === "video-result") {
    const togglePlatform = (p: string) => {
      setSelectedPlatforms(
        selectedPlatforms.includes(p)
          ? selectedPlatforms.filter((x) => x !== p)
          : [...selectedPlatforms, p]
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">Video Ready</h2>
        <p className="text-gray-500 mb-6">Preview and approve before posting</p>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Video Preview (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Video Preview
            </h3>
            <VideoPreviewMock topic={demoData.sampleScript.topic} />
          </div>

          {/* Actions (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Publish Settings
            </h3>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              {/* Platform selection */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Platforms</p>
                <div className="space-y-2">
                  {(["instagram", "tiktok", "x"] as const).map((p) => (
                    <label key={p} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(p)}
                        onChange={() => togglePlatform(p)}
                        className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                      />
                      <SmallPlatformIcon platform={p} />
                      <span className="text-sm text-gray-700">
                        {p === "instagram" ? "Instagram Reels" : p === "tiktok" ? "TikTok" : "X (Twitter)"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Schedule</p>
                <select
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                >
                  <option>Today, 2:00 PM EST</option>
                  <option>Today, 5:00 PM EST</option>
                  <option>Tomorrow, 10:00 AM EST</option>
                  <option>Tomorrow, 3:00 PM EST</option>
                </select>
              </div>

              {/* Video info */}
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Resolution</span>
                  <span className="font-mono">{demoData.videoPreview.resolution}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Format</span>
                  <span className="font-mono">{demoData.videoPreview.format}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Duration</span>
                  <span className="font-mono">~{demoData.sampleScript.duration}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-3">
                <button
                  onClick={onApprove}
                  disabled={selectedPlatforms.length === 0}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${
                    selectedPlatforms.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  <Check className="w-5 h-5" />
                  Approve & Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Topic input (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Generate New Video</h2>
            <p className="text-sm text-gray-500">Pick a topic or let Claude suggest one</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Topic
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
              placeholder="e.g., Rolex Submariner 124060 — still worth it in 2026?"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Quick-select topics:
            </p>
            <div className="flex flex-wrap gap-2">
              {demoData.sampleTopics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    topic === t
                      ? "bg-sky-100 text-sky-700 border-2 border-sky-300"
                      : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end pt-6 border-t border-gray-200">
          <button
            onClick={onStartGeneration}
            disabled={!topic.trim()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
              topic.trim()
                ? "bg-sky-500 text-white hover:bg-sky-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Generate Script
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Mock 9:16 Video Preview
function VideoPreviewMock({ topic }: { topic: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="relative mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" style={{ aspectRatio: "9/16", maxWidth: "280px" }}>
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/30 to-purple-900/30" />

        {/* TWX Logo - top left */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <span className="text-white font-extrabold text-xs tracking-wider">TWX</span>
          </div>
        </div>

        {/* Duration badge - top right */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-white text-xs font-mono">0:45</span>
          </div>
        </div>

        {/* Avatar silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400/30 to-blue-600/30 flex items-center justify-center">
              <span className="text-white/60 text-3xl font-bold">DG</span>
            </div>
          </div>
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>

        {/* Topic caption - bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
          <p className="text-white text-sm font-bold leading-tight mb-2">{topic}</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">DG</span>
            </div>
            <span className="text-white/80 text-xs font-medium">@torontowatchexchange</span>
          </div>
          {/* Follow CTA */}
          <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
            <span className="text-white text-xs font-semibold">Follow for more watch takes</span>
          </div>
        </div>

        {/* Side interaction icons (TikTok-style) */}
        <div className="absolute right-3 bottom-36 flex flex-col items-center gap-4 z-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/60 text-[10px] mt-1">1.2K</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/60 text-[10px] mt-1">48</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/60 text-[10px] mt-1">23</span>
          </div>
        </div>
      </div>

      {/* Overlay metadata */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-medium text-gray-700">Overlays:</span>
          {demoData.videoPreview.overlays.map((o, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{o}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Queue Screen
function QueueScreen({ onGenerate }: { onGenerate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Video Queue</h1>
          <p className="text-gray-500">
            {demoData.scheduledVideos.length} videos scheduled
          </p>
        </div>
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-sky-600 transition-colors"
        >
          <Video className="w-4 h-4" />
          Generate New
        </button>
      </div>

      <div className="space-y-3">
        {demoData.scheduledVideos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-14 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">{video.topic}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.scheduledFor}
                  </span>
                  <div className="flex items-center gap-1">
                    {video.platforms.map((p) => (
                      <SmallPlatformIcon key={p} platform={p} />
                    ))}
                  </div>
                  <StatusBadge status={video.status} />
                  <span className="text-xs text-gray-400 font-mono">{video.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Send className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// History Screen
function HistoryScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Post History</h1>
      <p className="text-gray-500 mb-6">Track performance of published videos</p>

      <div className="space-y-3">
        {demoData.postHistory.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-14 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-4 h-4 text-white" />
              </div>
              <SmallPlatformIcon platform={post.platform} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">{post.topic}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-400">{post.postedAt}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-sky-400" />
                      {post.comments.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-green-400" />
                      {post.shares.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Platform Icons
function SmallPlatformIcon({ platform }: { platform: string }) {
  if (platform === "instagram") {
    return (
      <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </div>
    );
  }
  if (platform === "tiktok") {
    return (
      <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
        </svg>
      </div>
    );
  }
  // X
  return (
    <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: "bg-green-100 text-green-700 border-green-200",
    rendering: "bg-purple-100 text-purple-700 border-purple-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
    published: "bg-sky-100 text-sky-700 border-sky-200",
  };

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status] || styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
