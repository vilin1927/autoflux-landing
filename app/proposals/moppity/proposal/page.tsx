"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Database,
  FolderOpen,
  Calculator,
  AlertTriangle,
  Coins,
  Gauge,
  CheckCircle,
  Sparkles,
  Wine,
  Receipt,
  Table,
  Clock,
  MessageSquare,
  FileText,
  Headphones,
  ExternalLink,
  ChevronRight,
  ArrowDown,
  Zap,
  Shield,
  Eye,
  BarChart3,
  TrendingUp,
  Package,
  DollarSign,
} from "lucide-react";
import { proposalData } from "@/data/proposals/moppity-proposal";

const sections = [
  { id: "hero", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "solution", label: "The Solution" },
  { id: "data-flow", label: "Data Flow" },
  { id: "milestone-1", label: "Milestone 1" },
  { id: "milestone-2", label: "Milestone 2" },
  { id: "milestone-3", label: "Milestone 3" },
  { id: "pricing", label: "Pricing" },
  { id: "timeline", label: "Timeline" },
  { id: "next-steps", label: "Next Steps" },
];

const iconMap: Record<string, React.ElementType> = {
  "folder-open": FolderOpen,
  calculator: Calculator,
  "alert-triangle": AlertTriangle,
  coins: Coins,
  database: Database,
  gauge: Gauge,
  "check-circle": CheckCircle,
  sparkles: Sparkles,
  wine: Wine,
  receipt: Receipt,
  table: Table,
};

export default function MoppityProposalPage() {
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
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative">
      {/* Navigation Sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
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
                  ? "text-[#1a1a1a] opacity-100"
                  : "text-gray-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-[#7C3AED] scale-125 ring-2 ring-[#7C3AED]/30 ring-offset-2"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </motion.nav>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/"
            className="text-xl font-bold text-[#1a1a1a] hover:text-[#7C3AED] transition-colors"
          >
            AutoFlux
          </Link>
          <span className="text-sm text-gray-500">
            for {proposalData.client.contact} &middot; {proposalData.client.name}
          </span>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden scroll-mt-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#10B981] opacity-15 rounded-full blur-3xl translate-y-1/2" />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 px-4 py-2 rounded-full">
              <Wine className="w-3.5 h-3.5" />
              {proposalData.client.name}
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#7C3AED] px-4 py-2 rounded-full">
              Fixed-Price Proposal
            </span>
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest bg-[#10B981] px-4 py-2 rounded-full">
              ${proposalData.pricing.total.toLocaleString()}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {proposalData.project.title}
          </h1>

          <p className="text-xl text-white/60 font-medium mb-2">
            {proposalData.project.subtitle}
          </p>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            {proposalData.project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleNavigate("pricing")}
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/proposals/moppity/demo"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              See Interactive Demo
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* The Problem Section */}
        <motion.section
          id="problem"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">The Problem Today</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {proposalData.painPoints.map((point, index) => {
                const Icon = iconMap[point.icon] || AlertTriangle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-red-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{point.title}</h3>
                        <p className="text-sm text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Arrow Down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* The Solution Section */}
        <motion.section
          id="solution"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-green-50 border border-green-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">What You Get</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {proposalData.solutions.map((solution, index) => {
                const Icon = iconMap[solution.icon] || CheckCircle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-green-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{solution.title}</h3>
                        <p className="text-sm text-gray-600">{solution.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Data Flow Section */}
        <motion.section
          id="data-flow"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">How It Works</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4">
              {/* Sources */}
              <div className="flex-1 w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 text-center lg:text-left">
                  Your Data Sources
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {proposalData.dataFlow.sources.map((source, index) => {
                    const Icon = iconMap[source.icon] || Database;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                      >
                        <Icon className="w-5 h-5 text-[#7C3AED] mb-2" />
                        <p className="font-semibold text-sm text-[#1a1a1a]">{source.name}</p>
                        <p className="text-xs text-gray-500">{source.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-[#7C3AED] rounded-2xl flex items-center justify-center rotate-90 lg:rotate-0"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Central DB */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-[#7C3AED]/20">
                  <Database className="w-8 h-8 mb-1" />
                  <p className="text-xs font-semibold">Central DB</p>
                  <p className="text-[10px] opacity-70">Postgres</p>
                </div>
              </motion.div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center rotate-90 lg:rotate-0"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Outputs */}
              <div className="flex-1 w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 text-center lg:text-right">
                  What You See
                </p>
                <div className="space-y-2">
                  {proposalData.dataFlow.outputs.map((output, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-green-50 rounded-xl px-4 py-2.5 border border-green-100 flex items-center gap-3"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-[#1a1a1a]">{output.name}</p>
                        <p className="text-xs text-gray-500">{output.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Milestones */}
        {proposalData.milestones.map((milestone, index) => (
          <motion.section
            key={milestone.number}
            id={`milestone-${milestone.number}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 scroll-mt-8"
          >
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
              {/* Milestone Header */}
              <div className="bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] p-6 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                      {milestone.number}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{milestone.title}</h2>
                      <p className="text-white/70 text-sm">{milestone.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">${milestone.price}</p>
                      <p className="text-white/70 text-sm">{milestone.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Pain Solved */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Pain solved:</span>
                    <span>{milestone.painSolved}</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Deliverables */}
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#7C3AED]" />
                      Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {milestone.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What You See */}
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#7C3AED]" />
                      What You'll See
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-semibold text-[#1a1a1a] mb-2">
                        {milestone.whatYouSee.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {milestone.whatYouSee.description}
                      </p>
                      <ul className="space-y-2">
                        {milestone.whatYouSee.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <ChevronRight className="w-3 h-3 text-[#7C3AED]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
                        Built with modern React/Next.js. Clean, fast, production-ready.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Definition of Done */}
                <div className="mt-6 bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a] mb-1">Definition of Done</h4>
                      <p className="text-sm text-gray-600">{milestone.definitionOfDone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Pricing Summary */}
        <motion.section
          id="pricing"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 md:p-10 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">Investment</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {proposalData.pricing.milestones.map((m) => (
                <div
                  key={m.number}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-sm font-bold">
                      {m.number}
                    </div>
                    <span className="font-semibold">{m.name}</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">${m.price}</p>
                  <p className="text-sm text-white/60">{m.duration}</p>
                  <p className="text-xs text-white/40 mt-2">{m.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#10B981] rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Total Fixed Price</p>
                <p className="text-4xl font-bold">${proposalData.pricing.total.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Includes 10 days support</p>
                <p className="text-sm text-white/80">Paid per milestone</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Monthly Costs */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Receipt className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Ongoing Costs (After Delivery)</h2>
                <p className="text-sm text-gray-600">You pay these directly to the providers</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {proposalData.monthlyCosts.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-amber-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                    {item.provider}
                  </p>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.name}</h3>
                  <p className="text-2xl font-bold text-[#1a1a1a] mb-2">{item.cost}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-100 flex items-center justify-between">
              <span className="font-medium text-gray-600">Estimated total ongoing</span>
              <span className="text-xl font-bold text-[#1a1a1a]">{proposalData.monthlyCosts.total}</span>
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          id="timeline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">Timeline: {proposalData.timeline.total}</h2>
                <p className="text-sm text-gray-500">Concrete deadlines, not vague estimates</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-3">
              {proposalData.timeline.breakdown.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`rounded-xl p-4 border h-full ${
                      phase.milestone === 1
                        ? "bg-blue-50 border-blue-100"
                        : phase.milestone === 2
                        ? "bg-purple-50 border-purple-100"
                        : "bg-green-50 border-green-100"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {phase.days}
                    </p>
                    <p className="font-semibold text-sm text-[#1a1a1a] mb-1">{phase.focus}</p>
                    <p className="text-xs text-gray-500">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support */}
            <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">
                    {proposalData.support.included}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Included
                      </p>
                      <ul className="space-y-1">
                        {proposalData.support.covers.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-3 h-3 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Not Included (scoped separately)
                      </p>
                      <ul className="space-y-1">
                        {proposalData.support.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-3 h-3 flex items-center justify-center">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Next Steps */}
        <motion.section
          id="next-steps"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 scroll-mt-8"
        >
          <div className="bg-[#7C3AED] rounded-3xl p-8 md:p-10 text-white">
            <h2 className="text-2xl font-bold mb-8">Next Steps</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {proposalData.nextSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white/10 border border-white/10 rounded-2xl p-5"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-white/70">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/proposals/moppity/demo"
                className="inline-flex items-center gap-2 bg-white text-[#7C3AED] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                See Interactive Demo
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-xs text-white/50">
              Demo uses sample data for illustration. Final product will be a modern React/Next.js dashboard connected to your real systems.
            </p>
          </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-gray-400">
          <p>
            Prepared by{" "}
            <Link href="/" className="text-[#7C3AED] hover:underline">
              AutoFlux
            </Link>{" "}
            for {proposalData.client.name}
          </p>
          <p className="mt-1">March 2026</p>
        </footer>
      </div>
    </div>
  );
}
