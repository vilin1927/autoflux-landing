"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Sparkles,
  Send,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Video,
  Flame,
  TrendingUp,
  Layers,
  PenTool,
  User,
  DollarSign,
  Clock,
  Eye,
  LayoutDashboard,
  Server,
  Settings,
  Play,
  Rocket,
} from "lucide-react";
import { proposalData } from "@/data/proposals/checkpoint";

const iconMap: Record<string, React.ElementType> = {
  "pen-tool": PenTool,
  video: Video,
  layers: Layers,
  send: Send,
  "layout-dashboard": LayoutDashboard,
  server: Server,
  settings: Settings,
  sparkles: Sparkles,
  eye: Eye,
  flame: Flame,
  "trending-up": TrendingUp,
  user: User,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
};

const sections = [
  { id: "hero", label: "Overview" },
  { id: "your-content", label: "Your Content" },
  { id: "what-well-build", label: "What We Build" },
  { id: "how-it-works", label: "How It Works" },
  { id: "avatar", label: "Avatar" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "questions", label: "Discussion" },
  { id: "phase2", label: "Phase 2" },
  { id: "demo", label: "Demo" },
];

export default function CheckpointProposalPage() {
  const [activeSection, setActiveSection] = useState("hero");

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
      window.history.pushState(null, "", `#${sectionId}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] relative">
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
                  ? "bg-[#38BDF8] scale-125 ring-2 ring-[#38BDF8]/30 ring-offset-2"
                  : "bg-[#13112F]/20 hover:bg-[#13112F]/40"
              }`}
            />
          </button>
        ))}
      </motion.nav>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/"
            className="text-xl font-bold text-[var(--text-dark)] hover:text-[#38BDF8] transition-colors"
          >
            AutoFlux
          </Link>
          <span className="text-sm text-[var(--text-muted)]">
            for {proposalData.client.contact} &middot; {proposalData.client.name}
          </span>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[var(--radius-xl)] p-8 md:p-12 mb-8 text-white relative overflow-hidden scroll-mt-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#818CF8] opacity-10 rounded-full blur-3xl translate-y-1/2" />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full">
              {proposalData.client.contact} &middot; {proposalData.client.name}
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#38BDF8] text-[#0F172A] px-4 py-2 rounded-full">
              Discovery Proposal
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
              <DollarSign className="w-3 h-3 inline -mt-0.5 mr-1" />
              $1,200–1,500 dev
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {proposalData.project.title}
          </h1>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            {proposalData.project.description}
          </p>

          {/* Platform badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Instagram */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="text-sm font-medium">Instagram</span>
            </div>
            {/* TikTok */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
              </svg>
              <span className="text-sm font-medium">TikTok</span>
            </div>
            {/* X */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">X (Twitter)</span>
            </div>
            {/* HeyGen + Claude */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8]/20 rounded-full">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-sm font-medium text-[#38BDF8]">HeyGen + Claude AI</span>
            </div>
          </div>

          <Link
            href="/proposals/checkpoint/demo"
            className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F172A] px-6 py-3 rounded-[var(--radius-md)] font-bold hover:bg-[#7DD3FC] transition-colors"
          >
            View Interactive Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>

        {/* Your Content Section */}
        <motion.section
          id="your-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            We Know Your Content
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Here&apos;s what we see working on your channels right now
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {proposalData.currentContent.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-5 hover:border-[#38BDF8]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[#38BDF8]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <h3 className="font-bold text-[var(--text-dark)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Positioning callout */}
          <div className="bg-gradient-to-r from-[#38BDF8]/5 to-[#818CF8]/5 border border-[#38BDF8]/20 rounded-[var(--radius-lg)] p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#38BDF8]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--text-dark)] mb-1">AI as Content Machine, Not Replacement</h4>
                <p className="text-sm text-[var(--text-muted)]">{proposalData.positioningNote}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What We'll Build Section */}
        <motion.section
          id="what-well-build"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            What We&apos;ll Build
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            The full video pipeline — from topic to published Reel
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposalData.whatWellBuild.map((item, i) => {
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
                      ? "bg-[#0F172A] text-white border border-[#1E293B]"
                      : "bg-[var(--bg-light)] border border-[var(--border-light)] hover:border-[#38BDF8]/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center mb-4 ${
                      item.highlight ? "bg-[#38BDF8]" : "bg-[#38BDF8]/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        item.highlight ? "text-[#0F172A]" : "text-[#38BDF8]"
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
          id="how-it-works"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            How It Works
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Topic in → finished video out → posted everywhere
          </p>

          {/* Desktop Flow */}
          <div className="hidden md:flex items-center justify-between gap-2">
            {proposalData.howItWorks.map((step, i) => {
              const Icon = iconMap[step.icon] || Sparkles;
              const colors = colorMap[step.color] || colorMap.blue;
              return (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-4 h-4 rounded-full bg-[#38BDF8] mb-3 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#0F172A]">{i + 1}</span>
                    </div>
                    <div
                      className={`w-14 h-14 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-3`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <p className="font-bold text-sm text-[var(--text-dark)]">{step.title}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[160px]">
                      {step.description}
                    </p>
                  </div>
                  {i < proposalData.howItWorks.length - 1 && (
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
            {proposalData.howItWorks.map((step, i) => {
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
                    <p className="text-xs font-bold text-[#38BDF8] uppercase mb-1">
                      Step {i + 1}: {step.step}
                    </p>
                    <p className="font-bold text-sm text-[var(--text-dark)]">{step.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Avatar Technology Section */}
        <motion.section
          id="avatar"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Avatar Technology
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            HeyGen creates a talking avatar from photos — no filming required
          </p>

          {/* Recommended */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[var(--radius-lg)] p-6 mb-4 text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#38BDF8] rounded-[var(--radius-sm)] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#0F172A]" />
                </div>
                <div>
                  <h3 className="font-bold">{proposalData.avatarOptions.recommended.name}</h3>
                  <span className="text-xs text-[#38BDF8] font-bold uppercase tracking-wider">
                    {proposalData.avatarOptions.recommended.badge}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70">
              {proposalData.avatarOptions.recommended.description}
            </p>
          </div>

          {/* Alternatives */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {proposalData.avatarOptions.alternatives.map((alt, i) => (
              <div
                key={i}
                className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-5"
              >
                <h3 className="font-bold text-[var(--text-dark)] mb-2">{alt.name}</h3>
                <p className="text-sm text-[var(--text-muted)]">{alt.description}</p>
              </div>
            ))}
          </div>

          {/* YouTube reference */}
          <a
            href={proposalData.avatarOptions.youtubeReference}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-red-50 border border-red-100 rounded-[var(--radius-lg)] text-red-700 hover:bg-red-100 transition-colors group"
          >
            <Play className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-semibold text-sm">See HeyGen Photo Avatar in action</p>
              <p className="text-xs text-red-500">YouTube demo video</p>
            </div>
            <ExternalLink className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
          </a>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Key Features
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Everything the system does for you
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {proposalData.features.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6"
              >
                <h3 className="font-bold text-[var(--text-dark)] mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#38BDF8]/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-[#38BDF8]" />
                      </div>
                      <span className="text-sm text-[var(--text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          id="pricing"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Pricing
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            One-time build + low monthly running costs
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Development */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[var(--radius-lg)] p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#38BDF8] rounded-[var(--radius-sm)] flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#0F172A]" />
                </div>
                <div>
                  <h3 className="font-bold">{proposalData.pricing.development.label}</h3>
                  <p className="text-xs text-white/50">Build the full pipeline</p>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-[#38BDF8]">
                ${proposalData.pricing.development.min.toLocaleString()}–${proposalData.pricing.development.max.toLocaleString()}
              </p>
              <p className="text-sm text-white/60 mt-2">
                Includes script engine, HeyGen integration, FFmpeg overlays, dashboard, posting APIs, and deployment.
              </p>
            </div>

            {/* Monthly Costs */}
            <div className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-[var(--radius-sm)] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-dark)]">Monthly Running Costs</h3>
                  <p className="text-xs text-[var(--text-muted)]">Estimated for your usage</p>
                </div>
              </div>
              <div className="space-y-3">
                {proposalData.pricing.monthly.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-dark)]">{item.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{item.note}</p>
                    </div>
                    <span className="text-sm font-bold text-[var(--text-dark)]">
                      {typeof item.cost === "number" ? `$${item.cost}/mo` : `${item.cost}/mo`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-light)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--text-dark)]">Total Monthly</span>
                  <span className="text-sm font-bold text-[#38BDF8]">~$107–110/mo</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          id="tech-stack"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Tech Stack
          </h2>
          <p className="text-[var(--text-muted)] mb-6">
            Battle-tested technologies for video at scale
          </p>

          <div className="flex flex-wrap gap-3">
            {proposalData.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm font-medium bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-md)] text-[var(--text-body)]"
              >
                {tech.name}
                <span className="text-[var(--text-muted)] ml-1">({tech.category})</span>
              </span>
            ))}
          </div>
        </motion.section>

        {/* Discovery Questions Section */}
        <motion.section
          id="questions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#38BDF8]/5 to-[#818CF8]/5 border-2 border-[#38BDF8]/20 rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-6 h-6 text-[#38BDF8]" />
            <h2 className="text-2xl font-bold text-[var(--text-dark)]">
              Let&apos;s Discuss
            </h2>
          </div>
          <p className="text-[var(--text-muted)] mb-8">
            To scope the project accurately, we&apos;d love to understand your needs better
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {proposalData.discoveryQuestions.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                  <h3 className="font-bold text-[var(--text-dark)]">
                    {group.category}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {group.questions.map((q, j) => (
                    <li key={j}>
                      <div className="flex items-start gap-3">
                        <ChevronDown className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#38BDF8]" />
                        <span className="text-sm text-[var(--text-muted)]">{q}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Phase 2 Section */}
        <motion.section
          id="phase2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="w-6 h-6 text-[#818CF8]" />
            <h2 className="text-2xl font-bold text-[var(--text-dark)]">Phase 2 Expansion</h2>
          </div>
          <p className="text-[var(--text-muted)] mb-8">
            Where we can take this once V1 is running
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {proposalData.phase2.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-5 hover:border-[#818CF8]/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#818CF8]/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#818CF8]">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-[var(--text-dark)]">{item.title}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo CTA Section */}
        <motion.section
          id="demo"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#38BDF8] to-[#818CF8] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 text-center scroll-mt-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            See It In Action
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Explore the interactive demo — see how video generation, approval, and posting works
          </p>
          <Link
            href="/proposals/checkpoint/demo"
            className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-8 py-4 rounded-[var(--radius-md)] font-bold hover:bg-white/90 transition-colors text-lg"
          >
            View Live Demo
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8 border-t border-[var(--border-light)]"
        >
          <p className="text-[var(--text-muted)] text-sm">
            Prepared by{" "}
            <Link
              href="/"
              className="text-[var(--text-dark)] font-medium hover:underline"
            >
              AutoFlux
            </Link>{" "}
            &middot; AI Automation Agency &middot; February 2026
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
