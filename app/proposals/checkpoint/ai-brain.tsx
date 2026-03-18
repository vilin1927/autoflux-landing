"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ChevronRight,
  MessageSquare,
  TrendingUp,
  User,
  DollarSign,
  Clock,
  Lock,
  SearchX,
  UserX,
  BotOff,
  Headphones,
  FileText,
  Upload,
  Users,
  Quote,
  Database,
  Mic,
  GitBranch,
  Rocket,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  Smartphone,
  Settings,
  BarChart3,
  Trash2,
} from "lucide-react";
import {
  aiBrainProposalData,
  aiBrainDemoData,
} from "@/data/proposals/checkpoint-ai-brain";

const iconMap: Record<string, React.ElementType> = {
  lock: Lock,
  "search-x": SearchX,
  "user-x": UserX,
  "bot-off": BotOff,
  headphones: Headphones,
  "file-text": FileText,
  "message-square": MessageSquare,
  upload: Upload,
  users: Users,
  quote: Quote,
  database: Database,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  mic: Mic,
  "git-branch": GitBranch,
  clock: Clock,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
};

const sections = [
  { id: "brain-hero", label: "Overview" },
  { id: "the-problem", label: "The Problem" },
  { id: "what-you-get", label: "What You Get" },
  { id: "how-it-works-brain", label: "How It Works" },
  { id: "live-preview", label: "Live Preview" },
  { id: "what-i-need", label: "What I Need" },
  { id: "pricing-brain", label: "Pricing" },
  { id: "timeline", label: "Timeline" },
  { id: "tech-stack-brain", label: "Tech Stack" },
  { id: "phase2-brain", label: "Phase 2" },
];

function LivePreviewSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = ["chat", "admin"] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <motion.section
      id="live-preview"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
    >
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-2xl font-bold text-[var(--text-dark)]">
          What It Looks Like
        </h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">
            Mobile-friendly
          </span>
        </div>
      </div>
      <p className="text-[var(--text-muted)] mb-6">
        Your team uses it from any device — desktop, tablet, or phone
      </p>

      {/* Slide indicators */}
      <div className="flex items-center gap-3 mb-6">
        {[
          { key: "chat", label: "Chat Interface", icon: MessageSquare },
          { key: "admin", label: "Admin Panel", icon: Settings },
        ].map((slide, i) => {
          const Icon = slide.icon;
          return (
            <button
              key={slide.key}
              onClick={() => setActiveSlide(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSlide === i
                  ? "bg-[#0F172A] text-white"
                  : "bg-[var(--bg-light)] text-[var(--text-muted)] hover:bg-[var(--border-light)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {slide.label}
            </button>
          );
        })}
        {/* Auto-slide progress */}
        <div className="ml-auto hidden sm:flex items-center gap-1.5">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === i
                  ? "w-6 bg-emerald-500"
                  : "w-1.5 bg-[var(--border-light)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slider content */}
      <AnimatePresence mode="wait">
        {activeSlide === 0 && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Preview */}
            <div className="bg-[#0F172A] rounded-[var(--radius-lg)] overflow-hidden border border-[#1E293B]">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-[#334155]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-slate-400 font-mono">
                    brain.watchcash.com
                  </span>
                </div>
              </div>

              <div className="flex min-h-[420px]">
                {/* Sidebar */}
                <div className="hidden md:flex w-60 flex-col bg-[#1E293B] border-r border-[#334155] p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">WatchCash Brain</p>
                      <p className="text-xs text-slate-400">AI Knowledge Base</p>
                    </div>
                  </div>

                  <button className="w-full flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-medium mb-4">
                    <MessageSquare className="w-4 h-4" />
                    New Chat
                  </button>

                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-1">
                    Recent
                  </p>
                  {aiBrainDemoData.recentQuestions.slice(0, 4).map((q, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-lg text-xs text-slate-400 mb-1 truncate ${
                        i === 0 ? "bg-white/5" : ""
                      }`}
                    >
                      {q}
                    </div>
                  ))}

                  <div className="mt-auto pt-4 border-t border-[#334155]">
                    <div className="flex items-center gap-2 px-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-emerald-400">
                          {aiBrainDemoData.user.initials}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">
                          {aiBrainDemoData.user.name}
                        </p>
                        <p className="text-[10px] text-slate-500">Admin</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-6 px-6 py-3 border-b border-[#334155]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs text-slate-400">
                        <span className="text-white font-bold">
                          {aiBrainDemoData.stats.documentsIndexed}
                        </span>{" "}
                        docs indexed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs text-slate-400">
                        <span className="text-white font-bold">
                          {aiBrainDemoData.stats.hoursTranscribed}
                        </span>{" "}
                        hrs transcribed
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {aiBrainDemoData.sampleConversation.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 ${
                          msg.role === "user" ? "justify-end" : ""
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-lg rounded-xl px-4 py-3 ${
                            msg.role === "user"
                              ? "bg-emerald-500 text-white"
                              : "bg-[#1E293B] text-slate-200"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line leading-relaxed">
                            {msg.message}
                          </p>
                          {"sources" in msg && msg.sources && (
                            <div className="mt-3 pt-3 border-t border-slate-600/50">
                              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
                                Sources
                              </p>
                              {msg.sources.map((s: string, j: number) => (
                                <p
                                  key={j}
                                  className="text-xs text-emerald-400/80 flex items-center gap-1.5 mb-1"
                                >
                                  <FileText className="w-3 h-3" />
                                  {s}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">DG</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-[#334155]">
                    <div className="flex items-center gap-3 bg-[#1E293B] rounded-xl px-4 py-3">
                      <input
                        type="text"
                        placeholder="Ask anything about your business..."
                        className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none"
                        disabled
                      />
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSlide === 1 && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Admin Panel Preview */}
            <div className="bg-[#0F172A] rounded-[var(--radius-lg)] overflow-hidden border border-[#1E293B]">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-[#334155]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-slate-400 font-mono">
                    brain.watchcash.com/admin
                  </span>
                </div>
              </div>

              <div className="flex min-h-[420px]">
                {/* Admin Sidebar */}
                <div className="hidden md:flex w-56 flex-col bg-[#1E293B] border-r border-[#334155] p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Admin Panel</p>
                      <p className="text-xs text-slate-400">Manage your Brain</p>
                    </div>
                  </div>

                  {[
                    { icon: BarChart3, label: "Overview", active: true },
                    { icon: FileText, label: "Documents", active: false },
                    { icon: Headphones, label: "Calls", active: false },
                    { icon: Upload, label: "Upload", active: false },
                    { icon: Users, label: "Team", active: false },
                    { icon: Settings, label: "Settings", active: false },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 ${
                          item.active
                            ? "bg-emerald-500/10 text-emerald-400 font-medium"
                            : "text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>

                {/* Admin content */}
                <div className="flex-1 p-6">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Knowledge Base Overview
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Manage documents, calls, and team access
                  </p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Documents", value: "156", color: "text-blue-400" },
                      { label: "Hours Transcribed", value: "47h", color: "text-emerald-400" },
                      { label: "Questions Asked", value: "892", color: "text-purple-400" },
                      { label: "Team Members", value: "4", color: "text-amber-400" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[#1E293B] rounded-lg p-3"
                      >
                        <p className={`text-xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                        <p className="text-[11px] text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent documents table */}
                  <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#334155]">
                      <p className="text-sm font-medium text-white">
                        Recent Documents
                      </p>
                      <button className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                        <Upload className="w-3 h-3" />
                        Upload New
                      </button>
                    </div>
                    {[
                      { name: "Watch Authentication SOP v3.pdf", type: "SOP", date: "Mar 15", size: "2.4 MB" },
                      { name: "Team Training — Feb 12 Call.mp3", type: "Call", date: "Feb 12", size: "48 MB" },
                      { name: "Consignment Process Flowchart.pdf", type: "Guide", date: "Feb 8", size: "1.1 MB" },
                      { name: "Sales Script — AP Royal Oak.docx", type: "Script", date: "Jan 28", size: "340 KB" },
                    ].map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-2.5 border-b border-[#334155]/50 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="text-xs text-slate-300">{doc.name}</p>
                            <p className="text-[10px] text-slate-500">
                              {doc.type} &middot; {doc.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-500">
                            {doc.date}
                          </span>
                          <Trash2 className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example questions */}
      <div className="mt-6">
        <p className="text-sm font-bold text-[var(--text-dark)] mb-3">
          Example questions your team can ask:
        </p>
        <div className="flex flex-wrap gap-2">
          {aiBrainProposalData.exampleQuestions.map((q, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full"
            >
              &ldquo;{q}&rdquo;
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function AIBrainProposal() {
  const [activeSection, setActiveSection] = useState("brain-hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative">
      {/* Navigation Sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-4"
      >
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => handleNavigate(section.id)}
            className="group relative flex items-center gap-3"
          >
            <span
              className={`text-xs font-medium transition-all ${
                activeSection === section.id
                  ? "text-[#13112F] opacity-100"
                  : "text-[var(--text-muted)] opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-emerald-500 scale-125 ring-2 ring-emerald-500/30 ring-offset-2"
                  : "bg-[#13112F]/20 hover:bg-[#13112F]/40"
              }`}
            />
          </button>
        ))}
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="brain-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#064E3B] to-[#065F46] rounded-[var(--radius-xl)] p-8 md:p-12 mb-8 text-white relative overflow-hidden scroll-mt-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-teal-400 opacity-10 rounded-full blur-3xl translate-y-1/2" />

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full">
            {aiBrainProposalData.client.contact} &middot;{" "}
            {aiBrainProposalData.client.name}
          </span>
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-emerald-400 text-[#064E3B] px-4 py-2 rounded-full">
            New Project Proposal
          </span>
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full">
            <DollarSign className="w-3 h-3 inline -mt-0.5 mr-1" />
            $1,200
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
          {aiBrainProposalData.project.title}
        </h1>

        <p className="text-lg text-white/80 max-w-xl mb-8">
          {aiBrainProposalData.project.description}
        </p>

        {/* Key badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">AI Knowledge Base</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Multi-User</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Private & Secure</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-400/20 rounded-full">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              ~$5-10/mo running cost
            </span>
          </div>
        </div>

        <button
          onClick={() => handleNavigate("pricing-brain")}
          className="inline-flex items-center gap-2 bg-emerald-400 text-[#064E3B] px-6 py-3 rounded-[var(--radius-md)] font-bold hover:bg-emerald-300 transition-colors"
        >
          See Pricing & Timeline
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.section>

      {/* The Problem Section */}
      <motion.section
        id="the-problem"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
          The Problem
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          Your business knowledge is scattered and inaccessible
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {aiBrainProposalData.theProblem.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-red-50/50 border border-red-100 rounded-[var(--radius-lg)] p-5"
              >
                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-red-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold text-[var(--text-dark)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* What You Get Section */}
      <motion.section
        id="what-you-get"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
          What You Get
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          A complete AI-powered knowledge system for your business
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiBrainProposalData.whatYouGet.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[var(--radius-lg)] p-5 transition-colors ${
                  item.highlight
                    ? "bg-[#064E3B] text-white border border-[#065F46]"
                    : "bg-[var(--bg-light)] border border-[var(--border-light)] hover:border-emerald-500/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center mb-4 ${
                    item.highlight ? "bg-emerald-400" : "bg-emerald-500/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      item.highlight ? "text-[#064E3B]" : "text-emerald-600"
                    }`}
                  />
                </div>
                <h3
                  className={`font-bold mb-2 ${
                    item.highlight ? "text-white" : "text-[var(--text-dark)]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm ${
                    item.highlight ? "text-white/70" : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works-brain"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
          How It Works
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          Your knowledge in &rarr; instant answers out
        </p>

        {/* Desktop Flow */}
        <div className="hidden md:flex items-center justify-between gap-2">
          {aiBrainProposalData.howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon] || Sparkles;
            const colors = colorMap[step.color] || colorMap.blue;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mb-3 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-3`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <p className="font-bold text-sm text-[var(--text-dark)]">
                    {step.title}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[180px]">
                    {step.description}
                  </p>
                </div>
                {i < aiBrainProposalData.howItWorks.length - 1 && (
                  <div className="flex items-center justify-center w-8 -mt-6">
                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Flow */}
        <div className="md:hidden space-y-4">
          {aiBrainProposalData.howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon] || Sparkles;
            const colors = colorMap[step.color] || colorMap.blue;
            return (
              <div key={i} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1 pb-4 border-b border-[var(--border-light)] last:border-0">
                  <p className="text-xs font-bold text-emerald-600 uppercase mb-1">
                    Step {i + 1}: {step.step}
                  </p>
                  <p className="font-bold text-sm text-[var(--text-dark)]">
                    {step.title}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Live Preview Section — Auto-Sliding Chat + Admin */}
      <LivePreviewSection />

      {/* What I Need From You Section */}
      <motion.section
        id="what-i-need"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-2 border-emerald-500/20 rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Upload className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">
            What I Need From You
          </h2>
        </div>
        <p className="text-[var(--text-muted)] mb-8">
          Send me these files and I handle everything else — transcription,
          indexing, setup, deployment
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {aiBrainProposalData.whatINeedFromYou.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-emerald-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-[var(--text-dark)]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-md w-fit">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">
                    {item.format}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing-brain"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
          Pricing
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          One-time build + near-zero monthly running costs
        </p>

        {/* Main price card */}
        <div className="bg-gradient-to-br from-[#064E3B] to-[#065F46] rounded-[var(--radius-lg)] p-8 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 opacity-10 rounded-full blur-2xl" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-emerald-300 font-bold uppercase tracking-wider mb-2">
                Complete AI Brain System
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-emerald-400">
                ${aiBrainProposalData.pricing.total.toLocaleString()}
              </p>
              <p className="text-sm text-white/60 mt-1">
                One-time development fee
              </p>
            </div>
            <div className="space-y-3">
              {aiBrainProposalData.pricing.payment.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i === 0 ? "bg-emerald-400" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        i === 0 ? "text-[#064E3B]" : "text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{p.name}</p>
                    <p className="text-xs text-white/60">{p.note}</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-400 ml-auto">
                    ${p.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Costs */}
        <div className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-[var(--radius-sm)] flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-dark)]">
                Your Monthly Running Costs
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                API costs — you pay directly, no markup
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {aiBrainProposalData.pricing.monthly.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-dark)]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{item.note}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    item.cost === "$0" || item.cost === "<$1"
                      ? "text-emerald-600"
                      : "text-[var(--text-dark)]"
                  }`}
                >
                  {item.cost}/mo
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-light)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--text-dark)]">
                Total Monthly
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {aiBrainProposalData.pricing.totalMonthly}
              </span>
            </div>
          </div>
        </div>

        {/* Comparison callout */}
        <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-[var(--radius-lg)] p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-dark)] mb-1">
                10x Cheaper Than ChatGPT Teams
              </h4>
              <p className="text-sm text-[var(--text-muted)]">
                {aiBrainProposalData.pricing.comparisonNote}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        id="timeline"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
          Timeline
        </h2>
        <p className="text-[var(--text-muted)] mb-8">
          From start to live system in ~2 weeks
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {aiBrainProposalData.timeline.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-[var(--radius-lg)] p-6 ${
                i === 1
                  ? "bg-[#064E3B] text-white border border-[#065F46]"
                  : "bg-[var(--bg-light)] border border-[var(--border-light)]"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i === 1 ? "bg-emerald-400" : "bg-emerald-500/10"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      i === 1 ? "text-[#064E3B]" : "text-emerald-600"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                      i === 1 ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    {phase.week}
                  </p>
                </div>
              </div>
              <h3
                className={`font-bold mb-3 ${
                  i === 1 ? "text-white" : "text-[var(--text-dark)]"
                }`}
              >
                {phase.title}
              </h3>
              <ul className="space-y-2">
                {phase.tasks.map((task, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        i === 1 ? "text-emerald-400" : "text-emerald-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        i === 1 ? "text-white/80" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack-brain"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
          Tech Stack
        </h2>
        <p className="text-[var(--text-muted)] mb-6">
          Enterprise-grade AI stack at a fraction of the cost
        </p>

        <div className="flex flex-wrap gap-3">
          {aiBrainProposalData.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 text-sm font-medium bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-md)] text-[var(--text-body)]"
            >
              {tech.name}
              <span className="text-[var(--text-muted)] ml-1">
                ({tech.category})
              </span>
            </span>
          ))}
        </div>
      </motion.section>

      {/* Phase 2 Section */}
      <motion.section
        id="phase2-brain"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">
            Phase 2 Expansion
          </h2>
        </div>
        <p className="text-[var(--text-muted)] mb-8">
          Where I can take this once V1 is running
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {aiBrainProposalData.phase2.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-5 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-600">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-[var(--text-dark)]">{item.title}</h3>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to Build Your AI Brain?
        </h2>
        <p className="text-white/80 mb-2 max-w-md mx-auto">
          $600 to start &middot; 2 weeks to delivery &middot; $5-10/mo to run
        </p>
        <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
          Your business knowledge — searchable, instant, always available
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleNavigate("what-i-need")}
            className="inline-flex items-center gap-2 bg-white text-[#064E3B] px-8 py-4 rounded-[var(--radius-md)] font-bold hover:bg-white/90 transition-colors text-lg"
          >
            Let&apos;s Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
