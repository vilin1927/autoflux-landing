"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Database,
  Brain,
  BookOpen,
  BarChart3,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Check,
  ExternalLink,
  User,
  Cpu,
  FileText,
  ChevronRight,
  Bot,
  Shield,
  Search,
} from "lucide-react";
import { proposalData } from "@/data/proposals/etoll";

const iconMap: Record<string, React.ElementType> = {
  database: Database,
  brain: Brain,
  "book-open": BookOpen,
  "chart-bar": BarChart3,
  "message-circle": MessageCircle,
  sparkles: Sparkles,
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
            <div className="w-9 h-9 bg-[#2D5A4A] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">eT</span>
            </div>
            <span className="text-sm text-[var(--text-muted)]">
              for {proposalData.client.name}
            </span>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#1a3a4a] to-[#2D5A4A] rounded-[var(--radius-xl)] p-8 md:p-12 mb-8 text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4ADE80] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4ADE80] opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full mb-6">
            Proposal for {proposalData.client.name}
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
                <p className="text-2xl md:text-3xl font-bold text-[#4ADE80]">
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
            href="/proposals/etoll/demo"
            className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#1a3a4a] px-6 py-3 rounded-[var(--radius-md)] font-bold hover:bg-[#3BC96B] transition-colors"
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
            Technical Approach
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Built for your AWS environment with easy handover to your in-house team
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
                  className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-5 hover:border-[#2D5A4A] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#4ADE80] rounded-[var(--radius-sm)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#1a3a4a]" />
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
            Data Flow Architecture
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            How queries flow from user to response
          </p>

          {/* Desktop Flow */}
          <div className="hidden md:flex items-center justify-between gap-2">
            <FlowStep
              icon={User}
              title="User Query"
              description="Natural language"
              color="blue"
            />
            <FlowArrow />
            <FlowStep
              icon={Bot}
              title="AI Assistant"
              description="Claude on Bedrock"
              color="purple"
            />
            <FlowArrow />
            <FlowStep
              icon={Search}
              title="Data Sources"
              description="MySQL + Knowledge Base"
              color="green"
            />
            <FlowArrow />
            <FlowStep
              icon={Shield}
              title="Access Control"
              description="Account-scoped"
              color="orange"
            />
            <FlowArrow />
            <FlowStep
              icon={FileText}
              title="Response"
              description="Insights + actions"
              color="navy"
            />
          </div>

          {/* Mobile Flow */}
          <div className="md:hidden space-y-4">
            <FlowStepMobile
              icon={User}
              title="User Query"
              description="Fleet manager asks a question in natural language"
              color="blue"
            />
            <FlowStepMobile
              icon={Bot}
              title="AI Processing"
              description="Claude analyzes intent and determines data sources needed"
              color="purple"
            />
            <FlowStepMobile
              icon={Search}
              title="Data Retrieval"
              description="Queries MySQL for client data, knowledge base for reference"
              color="green"
            />
            <FlowStepMobile
              icon={Shield}
              title="Security Layer"
              description="All queries scoped to authenticated client account only"
              color="orange"
            />
            <FlowStepMobile
              icon={FileText}
              title="Response Generation"
              description="AI generates insights with actionable follow-ups"
              color="navy"
            />
          </div>

          {/* Data Sources Detail */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-[var(--radius-md)] border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1">Client Data</h4>
              <p className="text-sm text-blue-700">
                Transactions, vehicles, cards, spending history. Read-only, account-scoped.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-[var(--radius-md)] border border-green-100">
              <h4 className="font-bold text-green-900 mb-1">Knowledge Base</h4>
              <p className="text-sm text-green-700">
                Toll pricing, plaza locations, routes, vehicle classes. Shared across users.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-[var(--radius-md)] border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-1">Fallback + Escalation</h4>
              <p className="text-sm text-orange-700">
                Web search for external info. Graceful escalation when AI can&apos;t answer.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Sample Queries Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
            What Users Can Ask
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Natural language queries the AI assistant will handle
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <QueryCategory
              title="Spending & Transactions"
              color="blue"
              queries={[
                "What was my total spend this month?",
                "Compare spending to last month",
                "Show daily averages for the quarter",
              ]}
            />
            <QueryCategory
              title="Vehicle Analysis"
              color="green"
              queries={[
                "Which vehicle uses the most tolls?",
                "Top 5 highest spending vehicles",
                "Vehicles with no activity in 30 days",
              ]}
            />
            <QueryCategory
              title="Trip Planning"
              color="purple"
              queries={[
                "Cost from Lusaka to Chingola?",
                "Toll plazas between Ndola and Livingstone",
                "Calculate costs for 3 heavy trucks",
              ]}
            />
            <QueryCategory
              title="Anomaly Detection"
              color="orange"
              queries={[
                "Show suspicious transactions",
                "Any unusual spending patterns?",
                "Transactions outside operating hours",
              ]}
            />
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
            3-4 weeks from kickoff to production
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
                <div className="bg-[#1a3a4a] text-white rounded-[var(--radius-lg)] p-5">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#4ADE80] text-[#1a3a4a] px-3 py-1 rounded-full mb-4">
                    {phase.phase}
                  </span>
                  <h3 className="font-bold text-lg mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, j) => (
                      <li
                        key={j}
                        className="text-sm text-white/70 flex items-start gap-2"
                      >
                        <Check className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < proposalData.timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[var(--border-medium)]" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#4ADE80] to-[#3BC96B] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a3a4a] mb-3">
            See Toli In Action
          </h2>
          <p className="text-[#1a3a4a]/70 mb-6 max-w-md mx-auto">
            Experience a working prototype of the AI assistant interface for eToll
          </p>
          <Link
            href="/proposals/etoll/demo"
            className="inline-flex items-center gap-2 bg-[#1a3a4a] text-white px-8 py-4 rounded-[var(--radius-md)] font-bold hover:bg-[#2D5A4A] transition-colors text-lg"
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
            AWS-native solution for easy handover to your team
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
                <span className="text-5xl font-extrabold text-[#1a3a4a]">
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
                    <Check className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
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
  navy: { bg: "bg-[#1a3a4a]", text: "text-white", border: "border-[#2D5A4A]" },
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

function QueryCategory({
  title,
  color,
  queries,
}: {
  title: string;
  color: string;
  queries: string[];
}) {
  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
  };

  return (
    <div className={`p-5 rounded-[var(--radius-lg)] border ${colorStyles[color] || colorStyles.blue}`}>
      <h4 className="font-bold text-[var(--text-dark)] mb-3">{title}</h4>
      <ul className="space-y-2">
        {queries.map((query, i) => (
          <li key={i} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
            <span className="text-[#4ADE80]">&ldquo;</span>
            {query}
            <span className="text-[#4ADE80]">&rdquo;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
