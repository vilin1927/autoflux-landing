"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  ClipboardList,
  Brain,
  Database,
  Sparkles,
  LayoutDashboard,
  Globe,
  ArrowRight,
  Check,
  ExternalLink,
  User,
  FileText,
  Search,
  Cpu,
  ChevronRight,
  ShieldAlert,
  Mail,
  Building,
  Lightbulb,
  ChevronDown,
  Info,
} from "lucide-react";
import { proposalData, proposalDataV1, proposalDataV2 } from "@/data/proposals/orgonic-art-raphael";

const iconMap: Record<string, React.ElementType> = {
  "clipboard-list": ClipboardList,
  brain: Brain,
  database: Database,
  sparkles: Sparkles,
  "layout-dashboard": LayoutDashboard,
  globe: Globe,
  "shield-alert": ShieldAlert,
  mail: Mail,
  building: Building,
  lightbulb: Lightbulb,
};

const sectionsV1 = [
  { id: "hero", label: "Overview" },
  { id: "approach", label: "Approach" },
  { id: "how-it-works", label: "How It Works" },
  { id: "timeline", label: "Timeline" },
  { id: "demo", label: "Demo" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "investment", label: "Investment" },
];

const sectionsV2 = [
  { id: "hero", label: "Overview" },
  { id: "approach", label: "Approach" },
  { id: "how-it-works", label: "How It Works" },
  { id: "new-features", label: "V2 Features" },
  { id: "timeline", label: "Timeline" },
  { id: "api-costs", label: "API Costs" },
  { id: "demo", label: "Demo" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "investment", label: "Investment" },
];

export default function ProposalPage() {
  const [version, setVersion] = useState<"v1" | "v2">("v2");
  const [activeSection, setActiveSection] = useState("hero");
  const currentData = version === "v1" ? proposalDataV1 : proposalDataV2;
  const sections = version === "v1" ? sectionsV1 : sectionsV2;

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
          {
            threshold: 0.3,
            rootMargin: "-10% 0px -10% 0px",
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Label */}
            <span
              className={`text-xs font-medium transition-all ${
                activeSection === section.id
                  ? "text-[#13112F] opacity-100"
                  : "text-[var(--text-muted)] opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>

            {/* Dot */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-[#CFFF4D] scale-125 ring-2 ring-[#CFFF4D]/30 ring-offset-2"
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
            className="text-xl font-bold text-[var(--text-dark)] hover:text-[var(--primary-light)] transition-colors"
          >
            AutoFlux
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/proposals/raphael.png"
              alt={proposalData.client.contact}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <span className="text-sm text-[var(--text-muted)]">
              for {proposalData.client.contact} from {proposalData.client.name}
            </span>
          </div>
        </motion.header>

        {/* Version Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex bg-[var(--bg-light)] border border-[var(--border-light)] rounded-full p-1">
            <button
              onClick={() => setVersion("v1")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                version === "v1"
                  ? "bg-[#13112F] text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-dark)]"
              }`}
            >
              Version 1 — Core MVP <span className="text-[#CFFF4D]">$540</span>
            </button>
            <button
              onClick={() => setVersion("v2")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                version === "v2"
                  ? "bg-[#13112F] text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-dark)]"
              }`}
            >
              Version 2 — Enhanced MVP <span className="text-[#CFFF4D]">$760</span>
              {version !== "v2" && (
                <span className="ml-2 px-2 py-0.5 bg-[#CFFF4D] text-[#13112F] text-xs rounded-full">
                  Recommended
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#13112F] to-[#2D2A5E] rounded-[var(--radius-xl)] p-8 md:p-12 mb-8 text-white relative overflow-hidden scroll-mt-8"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CFFF4D] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full">
              for {proposalData.client.contact} from {proposalData.client.name}
            </span>
            {version === "v2" && (
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#CFFF4D] text-[#13112F] px-4 py-2 rounded-full">
                Enhanced Version
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {proposalData.project.title}
          </h1>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            {proposalData.project.description}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {currentData.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#CFFF4D]">
                  {stat.value}
                </p>
                <p className="text-xs text-white/60 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/proposals/orgonic-art-raphael/demo"
            className="inline-flex items-center gap-2 bg-[#CFFF4D] text-[#13112F] px-6 py-3 rounded-[var(--radius-md)] font-bold hover:bg-[#B8E635] transition-colors"
          >
            View Live Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>

        {/* Approach Section */}
        <motion.section
          id="approach"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Our Approach
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            A structured methodology to deliver your MVP efficiently
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposalData.approach.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--primary-light)] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#CFFF4D] rounded-[var(--radius-sm)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#13112F]" />
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

        {/* Architecture Flow Section */}
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
            End-to-end data flow from user input to regulation results
          </p>

          {/* Flow Diagram */}
          <div className="relative">
            {/* Desktop Flow */}
            <div className="hidden md:flex items-center justify-between gap-2">
              <FlowStep
                icon={User}
                title="User Input"
                description="Questionnaire form"
                color="blue"
              />
              <FlowArrow />
              <FlowStep
                icon={Cpu}
                title="GPT-5.2"
                description="Business profiling"
                color="purple"
              />
              <FlowArrow />
              <FlowStep
                icon={Database}
                title="EUR-Lex API"
                description="SPARQL query"
                color="green"
              />
              <FlowArrow />
              <FlowStep
                icon={Sparkles}
                title="AI Matching"
                description="Relevance scoring"
                color="orange"
              />
              <FlowArrow />
              <FlowStep
                icon={FileText}
                title="Results"
                description="Dashboard display"
                color="navy"
              />
            </div>

            {/* Mobile Flow (Vertical) */}
            <div className="md:hidden space-y-4">
              <FlowStepMobile
                icon={User}
                title="User Input"
                description="Questionnaire captures company details, industry, operations"
                color="blue"
              />
              <FlowStepMobile
                icon={Cpu}
                title="GPT-5.2 Processing"
                description="AI creates structured business profile from answers"
                color="purple"
              />
              <FlowStepMobile
                icon={Database}
                title="EUR-Lex API"
                description="SPARQL endpoint returns matching regulations (free, no API key)"
                color="green"
              />
              <FlowStepMobile
                icon={Sparkles}
                title="AI Matching"
                description="GPT analyzes relevance, generates summaries"
                color="orange"
              />
              <FlowStepMobile
                icon={FileText}
                title="Results Dashboard"
                description="Clean display with regulation cards + EUR-Lex links"
                color="navy"
              />
            </div>
          </div>

          {/* Technical Note */}
          <div className="mt-8 p-4 bg-[var(--bg-light)] rounded-[var(--radius-md)] border border-[var(--border-light)]">
            <p className="text-sm text-[var(--text-muted)]">
              <strong className="text-[var(--text-dark)]">EUR-Lex Integration:</strong>{" "}
              Uses the official EU Publications Office SPARQL endpoint — free, public, no API key required.
              Returns CELEX numbers, titles, dates, and direct links to official documents.
            </p>
          </div>
        </motion.section>

        {/* V2 New Features Section */}
        {version === "v2" && (
          <motion.section
            id="new-features"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#CFFF4D]/10 to-[#B8E635]/5 border-2 border-[#CFFF4D]/30 rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-[#CFFF4D] text-[#13112F] text-xs font-bold rounded-full uppercase">
                New in V2
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              Enhanced Features
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              Four additional capabilities requested by Orgonic-Art
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {proposalDataV2.newFeatures.map((feature, i) => {
                const Icon = iconMap[feature.icon] || Sparkles;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-[var(--border-light)] rounded-[var(--radius-lg)] p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-[#13112F] rounded-[var(--radius-md)] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#CFFF4D]" />
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          feature.tagColor === "green"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-[var(--text-dark)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                      {feature.description}
                    </p>
                    <div className="p-4 bg-[var(--bg-light)] rounded-[var(--radius-md)] border border-[var(--border-light)]">
                      <p className="text-xs font-semibold text-[var(--text-dark)] mb-1 flex items-center gap-1">
                        <Info className="w-3 h-3" /> How it works:
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {feature.howItWorks}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Questionnaire Enhancement Note */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-[var(--border-light)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#13112F] rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-5 h-5 text-[#CFFF4D]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-dark)] mb-2">
                    Questionnaire Enhancement (V2)
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    The demo currently shows the basic questionnaire (V1). For V2, we&apos;ll extend it with additional fields to power the Company Analysis Fallback feature:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-[var(--bg-light)] rounded-lg">
                      <p className="text-xs font-semibold text-[var(--text-dark)] mb-2">New Fields:</p>
                      <ul className="text-xs text-[var(--text-muted)] space-y-1">
                        <li>• Company Size (1-10, 11-50, 51-200, 200+)</li>
                        <li>• Annual Revenue Range</li>
                        <li>• Years in Operation</li>
                        <li>• Target Market (B2B, B2C, B2G)</li>
                        <li>• Current Compliance Status</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[var(--bg-light)] rounded-lg">
                      <p className="text-xs font-semibold text-[var(--text-dark)] mb-2">Why This Helps:</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        When EUR-Lex returns few/no results, GPT-5.2 + Web Search can give smarter fallback recommendations like: <em>&quot;Companies your size in fintech typically need X, Y, Z...&quot;</em>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">
                      &quot;I don&apos;t have a company yet&quot; Flow
                    </p>
                    <p className="text-xs text-blue-700">
                      A checkbox allows users to indicate they&apos;re in planning stage. The questionnaire adapts to ask about planned industry, target countries, and expected business model — outputting a <strong>&quot;Pre-launch Compliance Checklist&quot;</strong> instead of current regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Timeline Section */}
        <motion.section
          id="timeline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Development Timeline
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            {version === "v1" ? "5-7 days" : "7 days target, +2 days buffer"} from kickoff to deployment
          </p>

          <div className={`grid gap-6 ${version === "v2" ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
            {currentData.timeline.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-[#13112F] text-white rounded-[var(--radius-lg)] p-5 h-full">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#CFFF4D] text-[#13112F] px-3 py-1 rounded-full mb-4">
                    {phase.phase}
                  </span>
                  <h3 className="font-bold text-lg mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, j) => (
                      <li
                        key={j}
                        className="text-sm text-white/70 flex items-start gap-2"
                      >
                        <Check className="w-4 h-4 text-[#CFFF4D] flex-shrink-0 mt-0.5" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Connector line */}
                {i < currentData.timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[var(--border-medium)]" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* API Running Costs Section (V2 only) */}
        {version === "v2" && (
          <motion.section
            id="api-costs"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
          >
            <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              Ongoing API Costs
            </h2>
            <p className="text-[var(--text-muted)] mb-6">
              Transparent per-analysis pricing — you only pay for what you use
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-light)]">
                    <th className="text-left py-3 px-4 font-semibold text-[var(--text-dark)]">
                      Component
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--text-dark)]">
                      Model
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-[var(--text-dark)]">
                      Cost per Analysis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proposalDataV2.apiCosts.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--border-light)] last:border-0"
                    >
                      <td className="py-3 px-4 text-[var(--text-body)]">
                        {row.component}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-[var(--bg-light)] rounded text-xs font-mono">
                          {row.model}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-[var(--text-dark)]">
                        {row.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-[var(--bg-light)] rounded-[var(--radius-md)] border border-[var(--border-light)]">
              <p className="text-sm text-[var(--text-muted)]">
                <strong className="text-[var(--text-dark)]">Estimated monthly cost for 100 analyses:</strong>{" "}
                ~$5-8/month. EUR-Lex and email are free — you only pay for AI usage.
              </p>
            </div>
          </motion.section>
        )}

        {/* Demo CTA Section */}
        <motion.section
          id="demo"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#CFFF4D] to-[#B8E635] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 text-center scroll-mt-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#13112F] mb-3">
            See It In Action
          </h2>
          <p className="text-[#13112F]/70 mb-6 max-w-md mx-auto">
            Experience a working prototype of RegScope - the EU Regulation Discovery Tool
          </p>
          <Link
            href="/proposals/orgonic-art-raphael/demo"
            className="inline-flex items-center gap-2 bg-[#13112F] text-white px-8 py-4 rounded-[var(--radius-md)] font-bold hover:bg-[#2D2A5E] transition-colors text-lg"
          >
            View Live Demo
            <ExternalLink className="w-5 h-5" />
          </Link>
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
            Modern, scalable technologies for rapid development
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

        {/* Pricing Section */}
        <motion.section
          id="investment"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 scroll-mt-8"
        >
          <div className="md:flex md:items-start md:justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
                Investment
              </h2>
              <p className="text-[var(--text-muted)]">
                Fixed price, no surprises
              </p>
              <div className="mt-4">
                <span className="text-5xl font-extrabold text-[#13112F]">
                  {currentData.pricing.amount}
                </span>
              </div>

              {/* Price Breakdown for V2 */}
              {version === "v2" && proposalDataV2.pricing.breakdown && (
                <div className="mt-6 p-4 bg-[var(--bg-light)] rounded-[var(--radius-md)] border border-[var(--border-light)]">
                  <p className="text-xs font-semibold text-[var(--text-dark)] mb-3 uppercase tracking-wider">
                    Price Breakdown
                  </p>
                  <div className="space-y-2">
                    {proposalDataV2.pricing.breakdown.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[var(--text-muted)]">{item.item}</span>
                        <span className="font-medium text-[var(--text-dark)]">{item.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-[var(--border-light)] pt-2 mt-2 flex justify-between text-sm font-bold">
                      <span className="text-[var(--text-dark)]">Total</span>
                      <span className="text-[#13112F]">$760</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Cherry Pick Options */}
              {version === "v2" && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-[var(--text-dark)] mb-2">
                    Want to cherry-pick?
                  </p>
                  <div className="space-y-1">
                    {proposalData.cherryPick.map((option, i) => (
                      <div key={i} className="flex justify-between text-xs text-[var(--text-muted)]">
                        <span>{option.scope}</span>
                        <span className="font-medium">{option.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 max-w-md">
              <h3 className="font-bold text-[var(--text-dark)] mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {currentData.pricing.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--text-muted)]"
                  >
                    <Check className="w-5 h-5 text-[#CFFF4D] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
            &middot; AI Automation Agency
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

// Flow Diagram Components
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  navy: { bg: "bg-[#13112F]", text: "text-white", border: "border-[#2D2A5E]" },
};

function FlowStep({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  const colors = colorMap[color] || colorMap.blue;
  return (
    <div className="flex flex-col items-center text-center flex-1">
      <div
        className={`w-14 h-14 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-2`}
      >
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <p className="font-bold text-sm text-[var(--text-dark)]">{title}</p>
      <p className="text-xs text-[var(--text-muted)]">{description}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center w-8">
      <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
    </div>
  );
}

function FlowStepMobile({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  const colors = colorMap[color] || colorMap.blue;
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      <div className="flex-1 pb-4 border-b border-[var(--border-light)] last:border-0">
        <p className="font-bold text-sm text-[var(--text-dark)]">{title}</p>
        <p className="text-sm text-[var(--text-muted)]">{description}</p>
      </div>
    </div>
  );
}
