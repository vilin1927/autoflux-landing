"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ClipboardList,
  Brain,
  Database,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
  Check,
  ExternalLink,
  User,
  FileText,
  Search,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { proposalData } from "@/data/proposals/orgonic-art-raphael";

const iconMap: Record<string, React.ElementType> = {
  "clipboard-list": ClipboardList,
  brain: Brain,
  database: Database,
  sparkles: Sparkles,
  "layout-dashboard": LayoutDashboard,
  "shield-check": ShieldCheck,
};

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-cream)]">
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

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#13112F] to-[#2D2A5E] rounded-[var(--radius-xl)] p-8 md:p-12 mb-8 text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CFFF4D] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full mb-6">
            for {proposalData.client.contact} from {proposalData.client.name}
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            {proposalData.project.title}
          </h1>

          <p className="text-lg text-white/80 max-w-xl mb-8">
            {proposalData.project.description}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {proposalData.stats.map((stat, i) => (
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
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

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            Development Timeline
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            5-7 days from kickoff to deployment
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {proposalData.timeline.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-[#13112F] text-white rounded-[var(--radius-lg)] p-5">
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
                {i < proposalData.timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[var(--border-medium)]" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video Walkthrough Section (Loom) */}
        {proposalData.loomVideoId && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
          >
            <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              Video Walkthrough
            </h2>
            <p className="text-[var(--text-muted)] mb-6">
              Watch me explain the approach and demo the prototype
            </p>
            <div className="relative w-full aspect-video rounded-[var(--radius-lg)] overflow-hidden bg-gray-100">
              <iframe
                src={`https://www.loom.com/embed/${proposalData.loomVideoId}`}
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.section>
        )}

        {/* Demo CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#CFFF4D] to-[#B8E635] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 text-center"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
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
                  {proposalData.pricing.amount}
                </span>
                <span className="text-[var(--text-muted)] ml-2">
                  {proposalData.pricing.hours}
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <h3 className="font-bold text-[var(--text-dark)] mb-4">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {proposalData.pricing.deliverables.map((item, i) => (
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
