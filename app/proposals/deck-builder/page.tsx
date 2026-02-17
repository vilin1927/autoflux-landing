"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Code,
  Zap,
  LayoutDashboard,
  Settings,
  Sparkles,
  Eye,
  Send,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  FileJson,
  DollarSign,
  Clock,
  Package,
  Lock,
} from "lucide-react";
import { proposalData } from "@/data/proposals/deck-builder";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  "file-json": FileJson,
  zap: Zap,
  "layout-dashboard": LayoutDashboard,
  settings: Settings,
  sparkles: Sparkles,
  eye: Eye,
  send: Send,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
};

const sections = [
  { id: "hero", label: "Overview" },
  { id: "suggest", label: "Our Approach" },
  { id: "how-it-works", label: "How It Works" },
  { id: "deliverables", label: "Deliverables" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "questions", label: "Discussion" },
  { id: "demo", label: "Demo" },
];

export default function DeckBuilderProposalPage() {
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
          <div className="flex items-center gap-3">
            <Image
              src="/proposals/aleksander.jpg"
              alt={proposalData.client.contact}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <span className="text-sm text-[var(--text-muted)]">
              for {proposalData.client.contact}
            </span>
          </div>
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

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full">
              for {proposalData.client.contact}
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#38BDF8] text-[#0F172A] px-4 py-2 rounded-full">
              Fixed Price Proposal
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {proposalData.project.title}
          </h1>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            {proposalData.project.description}
          </p>

          {/* Price + Timeline badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-300">
                {proposalData.fixedPrice.price} Fixed
              </span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full">
              <Clock className="w-4 h-4 text-white/70" />
              <span className="text-sm font-medium">
                {proposalData.fixedPrice.timeline} delivery
              </span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-[#38BDF8]/20 rounded-full">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-sm font-medium text-[#38BDF8]">
                Powered by Claude AI
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/proposals/deck-builder/demo"
              className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F172A] px-6 py-3 rounded-[var(--radius-md)] font-bold hover:bg-[#7DD3FC] transition-colors"
            >
              View Interactive Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleNavigate("deliverables")}
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-[var(--radius-md)] font-bold hover:bg-white/20 transition-colors"
            >
              See Deliverables
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </motion.section>

        {/* What We Suggest Section */}
        <motion.section
          id="suggest"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            What We Suggest
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Our approach — built for reliability, not complexity
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposalData.whatWeSuggest.map((item, i) => {
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

          {/* n8n note */}
          <div className="mt-6 p-5 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-[var(--radius-lg)] flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-base">💡</span>
            </div>
            <div>
              <p className="font-bold text-[var(--text-dark)] mb-1">
                A note on n8n
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                If you want to build this strictly with n8n, we can absolutely do that. However, I strongly recommend using Claude Code instead — I use it daily to generate production-grade Python backends and polished frontend apps. The result is a real codebase that&apos;s reliable, testable, and far easier to extend than visual flows.
              </p>
            </div>
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
            From template definition to generated deck in 4 steps
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
                      <span className="text-[10px] font-bold text-[#0F172A]">
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

        {/* Deliverables Section */}
        <motion.section
          id="deliverables"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-dark)]">
                Deliverables
              </h2>
              <p className="text-[var(--text-muted)]">
                Everything included in the {proposalData.fixedPrice.price} fixed-price scope
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-2xl font-extrabold text-emerald-600">
                  {proposalData.fixedPrice.price}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {proposalData.fixedPrice.timeline}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {proposalData.deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] hover:border-[#38BDF8]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--text-dark)]">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      Included
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price summary bar */}
          <div className="mt-8 p-5 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-[var(--radius-lg)] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-bold text-[var(--text-dark)]">
                  Complete package — {proposalData.fixedPrice.price} fixed price
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  Delivery in {proposalData.fixedPrice.timeline} · Source code included · Ready to extend
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-[var(--radius-md)] font-bold text-sm">
              <Lock className="w-4 h-4" />
              Price Locked
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
            Production-grade, no low-code dependencies
          </p>

          <div className="flex flex-wrap gap-3">
            {proposalData.techStack.map((tech, i) => (
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
            Quick questions to nail the scope
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {proposalData.discoveryQuestions.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[var(--radius-lg)] p-6 bg-white border border-[var(--border-light)]"
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
                        <span className="text-sm text-[var(--text-muted)]">
                          {q}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
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
            Explore the interactive demo — see wireframe storyboards, constraint
            enforcement, designed slides, and variant selection
          </p>
          <Link
            href="/proposals/deck-builder/demo"
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
