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
  Repeat2,
  MessageCircle,
  BarChart3,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { demoData } from "@/data/proposals/checkpoint";

type Screen = "dashboard" | "generate" | "preview" | "queue" | "history";
type GenerateStep = "platform" | "topic" | "processing" | "result";
type Platform = "x" | "threads" | "both";

export default function CheckpointDemoPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [generateStep, setGenerateStep] = useState<GenerateStep>("platform");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("x");
  const [topic, setTopic] = useState("");
  const [processingStep, setProcessingStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Processing animation
  useEffect(() => {
    if (generateStep === "processing") {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setProcessingStep(step);
        if (step >= demoData.generationSteps.length) {
          clearInterval(interval);
          const content =
            selectedPlatform === "threads"
              ? demoData.sampleGeneratedPosts.threads.single
              : demoData.sampleGeneratedPosts.x.single;
          setGeneratedContent(content);
          setTypingIndex(0);
          setTimeout(() => setGenerateStep("result"), 400);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [generateStep, selectedPlatform]);

  // Typing animation for result
  useEffect(() => {
    if (generateStep === "result" && typingIndex < generatedContent.length) {
      const speed = Math.random() * 15 + 8;
      const timeout = setTimeout(() => {
        setTypingIndex((prev) => Math.min(prev + 2, generatedContent.length));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [generateStep, typingIndex, generatedContent]);

  const handleGenerate = () => {
    setGenerateStep("platform");
    setProcessingStep(0);
    setTypingIndex(0);
    setGeneratedContent("");
    setCurrentScreen("generate");
  };

  const handleStartGeneration = () => {
    setProcessingStep(0);
    setGenerateStep("processing");
  };

  const handleApprovePost = () => {
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
              <Sparkles className="w-5 h-5 text-white" />
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
              icon={PenTool}
              label="Generate Content"
              active={currentScreen === "generate"}
              onClick={handleGenerate}
            />
            <SidebarItem
              icon={Calendar}
              label="Post Queue"
              active={currentScreen === "queue"}
              onClick={() => setCurrentScreen("queue")}
              badge={demoData.scheduledPosts.filter((p) => p.status === "approved").length}
            />
            <SidebarItem
              icon={History}
              label="Post History"
              active={currentScreen === "history"}
              onClick={() => setCurrentScreen("history")}
            />
            <SidebarItem icon={Settings} label="Brand Voice" disabled />
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
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                topic={topic}
                setTopic={setTopic}
                processingStep={processingStep}
                generatedContent={generatedContent}
                typingIndex={typingIndex}
                onSelectPlatform={(p: Platform) => {
                  setSelectedPlatform(p);
                  setGenerateStep("topic");
                }}
                onStartGeneration={handleStartGeneration}
                onApprove={handleApprovePost}
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
      <p className="text-gray-500 mb-6">Here&apos;s your content overview</p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard value={String(demoData.stats.postsScheduled)} label="Posts Scheduled" color="sky" />
        <StatCard value={String(demoData.stats.postsPublished)} label="Posts Published" color="green" />
        <StatCard value={demoData.stats.avgEngagement} label="Avg Engagement" color="purple" />
        <StatCard value={String(demoData.stats.contentGenerated)} label="Content Generated" color="amber" />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Generate New Content</h3>
              <p className="text-sm text-white/60">Claude AI will create on-brand posts</p>
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
              <h3 className="font-bold text-gray-900">Upcoming Posts</h3>
              <p className="text-sm text-gray-500">{demoData.scheduledPosts.filter((p) => p.status === "approved").length} posts ready to go</p>
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

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Next Up</h3>
        <div className="space-y-3">
          {demoData.scheduledPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <PlatformIcon platform={post.platform} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 line-clamp-2">{post.content.slice(0, 100)}...</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.scheduledFor}
                  </span>
                  <StatusBadge status={post.status} />
                </div>
              </div>
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
  selectedPlatform,
  topic,
  setTopic,
  processingStep,
  generatedContent,
  typingIndex,
  onSelectPlatform,
  onStartGeneration,
  onApprove,
  onRegenerate,
}: {
  step: GenerateStep;
  selectedPlatform: Platform;
  setSelectedPlatform: (p: Platform) => void;
  topic: string;
  setTopic: (t: string) => void;
  processingStep: number;
  generatedContent: string;
  typingIndex: number;
  onSelectPlatform: (p: Platform) => void;
  onStartGeneration: () => void;
  onApprove: () => void;
  onRegenerate: () => void;
}) {
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Content</h2>
        <p className="text-gray-500 mb-8">Claude AI is crafting your post...</p>
        <div className="space-y-3 text-left">
          {demoData.generationSteps.map((s, i) => (
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

  if (step === "result") {
    const displayContent = generatedContent.slice(0, typingIndex);
    const isTyping = typingIndex < generatedContent.length;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">Generated Content</h2>
        <p className="text-gray-500 mb-6">
          Review the AI-generated post for{" "}
          {selectedPlatform === "x" ? "X (Twitter)" : selectedPlatform === "threads" ? "Threads" : "X & Threads"}
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Post Preview */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Post Preview
            </h3>
            <MockPostCard
              platform={selectedPlatform === "both" ? "x" : selectedPlatform}
              content={displayContent}
              isTyping={isTyping}
            />
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Actions
            </h3>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-800">AI Confidence</span>
                </div>
                <div className="w-full bg-sky-200 rounded-full h-2 mb-2">
                  <div className="bg-sky-600 h-2 rounded-full" style={{ width: "92%" }} />
                </div>
                <p className="text-xs text-sky-700">
                  92% brand voice match &middot; Passes content safety filters
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Platform</p>
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={selectedPlatform === "both" ? "x" : selectedPlatform} />
                  <span className="text-sm text-gray-600">
                    {selectedPlatform === "x"
                      ? "X (Twitter)"
                      : selectedPlatform === "threads"
                      ? "Threads"
                      : "X + Threads"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Character Count</p>
                <p className="text-sm text-gray-600">
                  {generatedContent.length} / {selectedPlatform === "x" ? "280" : "500"} characters
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button
                  onClick={onApprove}
                  disabled={isTyping}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${
                    isTyping
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  <Check className="w-5 h-5" />
                  Approve & Schedule
                </button>
                <button
                  onClick={onRegenerate}
                  disabled={isTyping}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Step {step === "platform" ? "1" : "2"} of 2
          </span>
          <span className="text-sm text-gray-500">
            {step === "platform" ? "Select Platform" : "Content Direction"}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: step === "platform" ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <AnimatePresence mode="wait">
          {step === "platform" && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Select Platform</h2>
                  <p className="text-sm text-gray-500">Where should we post?</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {(["x", "threads", "both"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => onSelectPlatform(p)}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all text-center group"
                  >
                    <div className="flex justify-center mb-3">
                      {p === "x" && (
                        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-gray-800 group-hover:fill-sky-600 transition-colors">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {p === "threads" && (
                        <svg viewBox="0 0 192 192" className="w-8 h-8 fill-gray-800 group-hover:fill-sky-600 transition-colors">
                          <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.142 34.573.504 9.789 5.271 18.234 13.415 23.773 6.876 4.672 15.727 7.007 24.907 6.583 12.108-.559 21.592-5.26 28.163-13.96 4.967-6.571 8.083-14.985 9.375-25.318 5.597 3.384 9.763 7.884 12.21 13.349 4.159 9.29 4.405 24.547-8.483 37.416-11.363 11.343-25.028 16.24-45.724 16.393-22.926-.17-40.266-7.528-51.47-21.872C31.395 140.343 25.333 120.078 25.15 96c.183-24.078 6.245-44.343 18.018-60.268 11.204-14.344 28.544-21.702 51.47-21.872 23.12.175 40.708 7.594 52.261 22.042 5.694 7.12 9.975 15.763 12.785 25.702l14.89-3.998C170.216 42.2 164.9 31.186 157.725 22.516 143.917 5.31 123.576-2.67 97.022-2.862h-.386C69.981-2.671 49.801 5.377 36.212 22.818 21.04 42.238 13.17 68.553 12.942 96.002c.228 27.449 8.098 53.764 23.27 73.184 13.589 17.441 33.769 25.489 60.424 25.68h.386c24.49-.183 41.735-6.67 56.03-21.069 18.322-18.433 17.592-40.858 11.58-54.253-4.31-9.617-12.463-17.488-23.095-22.556zM98.424 129.399c-10.153.473-20.72-3.994-21.291-15.073-.418-8.13 5.878-17.18 25.512-18.31 2.222-.128 4.39-.188 6.508-.188 6.273 0 12.13.611 17.421 1.773-1.98 27.232-17.192 31.322-28.15 31.798z" />
                        </svg>
                      )}
                      {p === "both" && (
                        <div className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gray-800 group-hover:fill-sky-600 transition-colors">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="text-gray-400">+</span>
                          <svg viewBox="0 0 192 192" className="w-6 h-6 fill-gray-800 group-hover:fill-sky-600 transition-colors">
                            <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.142 34.573.504 9.789 5.271 18.234 13.415 23.773 6.876 4.672 15.727 7.007 24.907 6.583 12.108-.559 21.592-5.26 28.163-13.96 4.967-6.571 8.083-14.985 9.375-25.318 5.597 3.384 9.763 7.884 12.21 13.349 4.159 9.29 4.405 24.547-8.483 37.416-11.363 11.343-25.028 16.24-45.724 16.393-22.926-.17-40.266-7.528-51.47-21.872C31.395 140.343 25.333 120.078 25.15 96c.183-24.078 6.245-44.343 18.018-60.268 11.204-14.344 28.544-21.702 51.47-21.872 23.12.175 40.708 7.594 52.261 22.042 5.694 7.12 9.975 15.763 12.785 25.702l14.89-3.998C170.216 42.2 164.9 31.186 157.725 22.516 143.917 5.31 123.576-2.67 97.022-2.862h-.386C69.981-2.671 49.801 5.377 36.212 22.818 21.04 42.238 13.17 68.553 12.942 96.002c.228 27.449 8.098 53.764 23.27 73.184 13.589 17.441 33.769 25.489 60.424 25.68h.386c24.49-.183 41.735-6.67 56.03-21.069 18.322-18.433 17.592-40.858 11.58-54.253-4.31-9.617-12.463-17.488-23.095-22.556zM98.424 129.399c-10.153.473-20.72-3.994-21.291-15.073-.418-8.13 5.878-17.18 25.512-18.31 2.222-.128 4.39-.188 6.508-.188 6.273 0 12.13.611 17.421 1.773-1.98 27.232-17.192 31.322-28.15 31.798z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
                      {p === "x" ? "X (Twitter)" : p === "threads" ? "Threads" : "Both Platforms"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {p === "x" ? "280 char limit" : p === "threads" ? "500 char limit" : "Adapted for each"}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "topic" && (
            <motion.div
              key="topic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Content Direction</h2>
                  <p className="text-sm text-gray-500">Optional: guide the AI or let it decide</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic or Direction (optional)
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                    placeholder="e.g., Write about how AI is changing marketing in 2026..."
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Or pick a content pillar:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {demoData.brandVoice.contentPillars.map((pillar) => (
                      <button
                        key={pillar}
                        onClick={() => setTopic(pillar)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          topic === pillar
                            ? "bg-sky-100 text-sky-700 border-2 border-sky-300"
                            : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
                        }`}
                      >
                        {pillar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => {}}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={onStartGeneration}
                  className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate with Claude AI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Mock Post Card (X/Threads style)
function MockPostCard({
  platform,
  content,
  isTyping,
}: {
  platform: "x" | "threads";
  content: string;
  isTyping: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Post header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-white">CG</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm">CheckPoint Group</span>
            {platform === "x" && (
              <svg viewBox="0 0 22 22" className="w-4 h-4 fill-sky-500">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.853-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {platform === "x" ? "@checkpointgroup" : "checkpointgroup"}
          </span>
        </div>
        <PlatformIcon platform={platform} />
      </div>

      {/* Post content */}
      <div className="px-4 pb-4">
        <p className="text-gray-900 text-sm whitespace-pre-line leading-relaxed">
          {content}
          {isTyping && (
            <span className="inline-block w-0.5 h-4 bg-sky-500 ml-0.5 animate-pulse" />
          )}
        </p>
      </div>

      {/* Post footer / engagement */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-sky-500 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-green-500 transition-colors">
            <Repeat2 className="w-4 h-4" />
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-sky-500 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">0</span>
          </button>
        </div>
        <span className="text-xs text-gray-400">Just now</span>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Post Queue</h1>
          <p className="text-gray-500">
            {demoData.scheduledPosts.length} posts scheduled
          </p>
        </div>
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-sky-600 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate New
        </button>
      </div>

      <div className="space-y-3">
        {demoData.scheduledPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <PlatformIcon platform={post.platform} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 whitespace-pre-line line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.scheduledFor}
                  </span>
                  <StatusBadge status={post.status} />
                  <span className="text-xs text-gray-400 capitalize">{post.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <PenTool className="w-4 h-4 text-gray-400" />
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
      <p className="text-gray-500 mb-6">Track performance of published posts</p>

      <div className="space-y-3">
        {demoData.postHistory.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-start gap-4">
              <PlatformIcon platform={post.platform} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400">{post.postedAt}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Repeat2 className="w-3 h-3 text-green-400" />
                      {post.reposts.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-sky-400" />
                      {post.replies.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <BarChart3 className="w-3 h-3 text-gray-400" />
                      {post.views.toLocaleString()} views
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

// Shared Components
function PlatformIcon({ platform }: { platform: "x" | "threads" }) {
  if (platform === "x") {
    return (
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 192 192" className="w-4 h-4 fill-white">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.142 34.573.504 9.789 5.271 18.234 13.415 23.773 6.876 4.672 15.727 7.007 24.907 6.583 12.108-.559 21.592-5.26 28.163-13.96 4.967-6.571 8.083-14.985 9.375-25.318 5.597 3.384 9.763 7.884 12.21 13.349 4.159 9.29 4.405 24.547-8.483 37.416-11.363 11.343-25.028 16.24-45.724 16.393-22.926-.17-40.266-7.528-51.47-21.872C31.395 140.343 25.333 120.078 25.15 96c.183-24.078 6.245-44.343 18.018-60.268 11.204-14.344 28.544-21.702 51.47-21.872 23.12.175 40.708 7.594 52.261 22.042 5.694 7.12 9.975 15.763 12.785 25.702l14.89-3.998C170.216 42.2 164.9 31.186 157.725 22.516 143.917 5.31 123.576-2.67 97.022-2.862h-.386C69.981-2.671 49.801 5.377 36.212 22.818 21.04 42.238 13.17 68.553 12.942 96.002c.228 27.449 8.098 53.764 23.27 73.184 13.589 17.441 33.769 25.489 60.424 25.68h.386c24.49-.183 41.735-6.67 56.03-21.069 18.322-18.433 17.592-40.858 11.58-54.253-4.31-9.617-12.463-17.488-23.095-22.556zM98.424 129.399c-10.153.473-20.72-3.994-21.291-15.073-.418-8.13 5.878-17.18 25.512-18.31 2.222-.128 4.39-.188 6.508-.188 6.273 0 12.13.611 17.421 1.773-1.98 27.232-17.192 31.322-28.15 31.798z" />
      </svg>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: "bg-green-100 text-green-700 border-green-200",
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
