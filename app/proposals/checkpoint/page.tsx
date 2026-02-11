"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Code,
  Cpu,
  Zap,
  LayoutDashboard,
  Mic,
  Server,
  Settings,
  Sparkles,
  Eye,
  Send,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Pencil,
  Save,
} from "lucide-react";
import { proposalData } from "@/data/proposals/checkpoint";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  cpu: Cpu,
  zap: Zap,
  "layout-dashboard": LayoutDashboard,
  mic: Mic,
  server: Server,
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
  { id: "features", label: "Features" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "questions", label: "Discussion" },
  { id: "demo", label: "Demo" },
];

const STORAGE_KEY = "checkpoint-call-notes";

function loadNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveNotes(notes: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function CheckpointProposalPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [callMode, setCallMode] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const updateNote = (key: string, value: string) => {
    const updated = { ...notes, [key]: value };
    setNotes(updated);
    saveNotes(updated);
    setSaved(false);
  };

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
            for {proposalData.client.contact} from {proposalData.client.name}
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

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full">
              for {proposalData.client.contact} &middot; {proposalData.client.name}
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#38BDF8] text-[#0F172A] px-4 py-2 rounded-full">
              Discovery Proposal
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
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">X (Twitter)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <svg viewBox="0 0 192 192" className="w-4 h-4 fill-white">
                <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.142 34.573.504 9.789 5.271 18.234 13.415 23.773 6.876 4.672 15.727 7.007 24.907 6.583 12.108-.559 21.592-5.26 28.163-13.96 4.967-6.571 8.083-14.985 9.375-25.318 5.597 3.384 9.763 7.884 12.21 13.349 4.159 9.29 4.405 24.547-8.483 37.416-11.363 11.343-25.028 16.24-45.724 16.393-22.926-.17-40.266-7.528-51.47-21.872C31.395 140.343 25.333 120.078 25.15 96c.183-24.078 6.245-44.343 18.018-60.268 11.204-14.344 28.544-21.702 51.47-21.872 23.12.175 40.708 7.594 52.261 22.042 5.694 7.12 9.975 15.763 12.785 25.702l14.89-3.998C170.216 42.2 164.9 31.186 157.725 22.516 143.917 5.31 123.576-2.67 97.022-2.862h-.386C69.981-2.671 49.801 5.377 36.212 22.818 21.04 42.238 13.17 68.553 12.942 96.002c.228 27.449 8.098 53.764 23.27 73.184 13.589 17.441 33.769 25.489 60.424 25.68h.386c24.49-.183 41.735-6.67 56.03-21.069 18.322-18.433 17.592-40.858 11.58-54.253-4.31-9.617-12.463-17.488-23.095-22.556zM98.424 129.399c-10.153.473-20.72-3.994-21.291-15.073-.418-8.13 5.878-17.18 25.512-18.31 2.222-.128 4.39-.188 6.508-.188 6.273 0 12.13.611 17.421 1.773-1.98 27.232-17.192 31.322-28.15 31.798z" />
              </svg>
              <span className="text-sm font-medium">Threads</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#38BDF8]/20 rounded-full">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-sm font-medium text-[#38BDF8]">Powered by Claude AI</span>
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
            Our recommended architecture — built for reliability, not complexity
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
            End-to-end flow from brand setup to published posts
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
            What the system will do for you
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
            Modern, battle-tested technologies
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
          className={`rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8 transition-all duration-300 ${
            callMode
              ? "bg-gradient-to-br from-[#0F172A] to-[#1E293B] border-2 border-sky-500/40"
              : "bg-gradient-to-br from-[#38BDF8]/5 to-[#818CF8]/5 border-2 border-[#38BDF8]/20"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <HelpCircle className={`w-6 h-6 ${callMode ? "text-sky-400" : "text-[#38BDF8]"}`} />
              <h2 className={`text-2xl font-bold ${callMode ? "text-white" : "text-[var(--text-dark)]"}`}>
                {callMode ? "Call Notes" : "Let\u0027s Discuss"}
              </h2>
            </div>
            <button
              onClick={() => setCallMode(!callMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                callMode
                  ? "bg-sky-500 text-white hover:bg-sky-400"
                  : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
              }`}
            >
              <Pencil className="w-4 h-4" />
              {callMode ? "Call Mode ON" : "Enable Call Mode"}
            </button>
          </div>
          <p className={`mb-8 ${callMode ? "text-white/60" : "text-[var(--text-muted)]"}`}>
            {callMode
              ? "Type answers as you discuss. Notes auto-save to your browser."
              : "To scope the project accurately, we\u0027d love to understand your needs better. Here are the key questions:"}
          </p>

          <div className={callMode ? "space-y-6" : "grid md:grid-cols-2 gap-6"}>
            {proposalData.discoveryQuestions.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[var(--radius-lg)] p-6 ${
                  callMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-white border border-[var(--border-light)]"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className={`w-4 h-4 ${callMode ? "text-sky-400" : "text-[#38BDF8]"}`} />
                  <h3 className={`font-bold ${callMode ? "text-white" : "text-[var(--text-dark)]"}`}>
                    {group.category}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {group.questions.map((q, j) => {
                    const noteKey = `${i}-${j}`;
                    return (
                      <li key={j}>
                        <div className="flex items-start gap-3">
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-0.5 ${callMode ? "text-sky-400" : "text-[#38BDF8]"}`} />
                          <span className={`text-sm ${callMode ? "text-white/80" : "text-[var(--text-muted)]"}`}>{q}</span>
                        </div>
                        {callMode && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-2 ml-7"
                          >
                            <textarea
                              value={notes[noteKey] || ""}
                              onChange={(e) => updateNote(noteKey, e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                              placeholder="Type answer..."
                            />
                          </motion.div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

          {callMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex items-center justify-between"
            >
              <p className="text-xs text-white/40">
                Notes saved to browser localStorage &middot; {Object.values(notes).filter(Boolean).length} answers recorded
              </p>
              <button
                onClick={() => {
                  saveNotes(notes);
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? "Saved!" : "Save Notes"}
              </button>
            </motion.div>
          )}
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
            Explore the interactive demo — see how content generation, approval, and posting works
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
