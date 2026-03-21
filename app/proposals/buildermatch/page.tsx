"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Target,
  BarChart3,
  CreditCard,
  Star,
  UserPlus,
  Bell,
  Unlock,
  LayoutDashboard,
  Send,
  MessageCircle,
  Shield,
  Smartphone,
  CheckCircle2,
  Globe,
  Server,
  Database,
  Brain,
  Lock,
  CalendarDays,
  Zap,
  Info,
  Clock,
} from "lucide-react";
import { proposalData } from "@/data/proposals/buildermatch";

// ─── Animation helpers ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Icon map ──────────────────────────────────────────────────────
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Target,
  BarChart3,
  CreditCard,
  Star,
  UserPlus,
  Bell,
  Unlock,
  LayoutDashboard,
  Send,
  MessageCircle,
  Shield,
  Smartphone,
  Globe,
  Server,
  Database,
  Brain,
  Lock,
};

// ─── Core Loop Steps ───────────────────────────────────────────────
const coreLoopSteps = [
  { num: 1, label: "Customer describes job" },
  { num: 2, label: "AI creates listing" },
  { num: 3, label: "Tradespeople get notified" },
  { num: 4, label: "Quotes submitted" },
  { num: 5, label: "Customer picks & books" },
  { num: 6, label: "Job done, review left" },
];

// ─── Feature Card ──────────────────────────────────────────────────
function FeatureCard({
  feature,
  muted = false,
}: {
  feature: {
    name: string;
    icon?: string;
    plain: string;
    example?: string;
    note?: string;
  };
  muted?: boolean;
}) {
  const Icon = feature.icon ? iconMap[feature.icon] : null;
  return (
    <div
      className={`p-6 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border backdrop-blur-xl ${
        muted
          ? "border-white/[0.04] opacity-70"
          : "border-white/[0.06]"
      }`}
    >
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-white mb-2">{feature.name}</h4>
      <p className="text-xs text-slate-400 leading-relaxed mb-3">{feature.plain}</p>
      {feature.example && (
        <div className="rounded-xl bg-[#1e293b]/80 border border-cyan-500/10 p-3">
          <span className="text-[10px] font-medium text-cyan-400/70 uppercase tracking-wider">
            Example
          </span>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{feature.example}</p>
        </div>
      )}
      {feature.note && (
        <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-300/80 leading-relaxed">{feature.note}</p>
        </div>
      )}
      {muted && (
        <div className="mt-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-500">
            Phase 2
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main Proposal Page ─────────────────────────────────────────────

export default function BuilderMatchProposal() {
  const { client, project, features, milestones, pricing, stack, questions } = proposalData;

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" /> MVP Proposal
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Builder<span className="text-cyan-400">Match</span>
              <span className="text-cyan-400">.ai</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-2 leading-relaxed">
              {project.subtitle}
            </p>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              {project.tagline}
            </p>
            <p className="text-sm text-slate-500 mb-10">
              Prepared for {client.name} · Built by Vladimir Ilin · AutoFlux
            </p>
            <Link
              href="/proposals/buildermatch/demo"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition text-sm shadow-lg shadow-cyan-500/20"
            >
              View Interactive Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT IS BUILDERMATCH? ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              The concept
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">What is BuilderMatch?</h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] backdrop-blur-xl mb-14"
          >
            <p className="text-base text-slate-300 leading-relaxed">
              A platform where UK homeowners post a job describing what they need (like &quot;my boiler
              keeps cutting out&quot;), and verified tradespeople in their area get notified, send
              quotes, and get booked. AI makes the whole process fast and accurate — no forms, no
              searching, no guessing.
            </p>
          </motion.div>

          {/* Core Loop */}
          <motion.div variants={fadeUp}>
            <p className="text-center text-xs font-medium text-cyan-400 uppercase tracking-wider mb-8">
              The Core Loop
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {coreLoopSteps.map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-cyan-400">{step.num}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{step.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── EVERY FEATURE — PLAIN ENGLISH ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-6">
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              Full feature breakdown
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Everything BuilderMatch Does — In Plain English
            </h2>
            <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">
              No jargon. No assumptions. Here&apos;s exactly what you&apos;re getting.
            </p>
          </motion.div>

          {/* What Customers Can Do */}
          <motion.div variants={fadeUp} className="mt-14 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">C</span>
              </div>
              <h3 className="text-xl font-bold">What Customers Can Do</h3>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.forCustomers.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FeatureCard feature={f} />
              </motion.div>
            ))}
          </motion.div>

          {/* What Tradespeople Can Do */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">T</span>
              </div>
              <h3 className="text-xl font-bold">What Tradespeople Can Do</h3>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.forTradespeople.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FeatureCard feature={f} />
              </motion.div>
            ))}
          </motion.div>

          {/* Platform Features */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">P</span>
              </div>
              <h3 className="text-xl font-bold">Platform Features</h3>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {features.platform.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FeatureCard feature={f} />
              </motion.div>
            ))}
          </motion.div>

          {/* Phase 2 — After Launch */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                <Clock className="w-4 h-4 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold">Phase 2 — After Launch</h3>
              <span className="text-xs text-slate-500 ml-2">Coming later</span>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.phase2.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FeatureCard feature={f} muted />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── MILESTONES ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              The plan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              How I&apos;ll Build It — 3 Milestones
            </h2>
            <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto">
              Each milestone delivers a working product you can open, test, and use. Pay per
              milestone on delivery.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.number}
                variants={fadeUp}
                className={`p-8 rounded-2xl border border-white/[0.06] ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60"
                    : "bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/80"
                } backdrop-blur-xl`}
              >
                {/* Milestone header */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500 text-white text-sm font-bold">
                    {m.number}
                  </div>
                  <span className="text-xs font-medium text-cyan-400 tracking-wider uppercase">
                    {m.tag}
                  </span>
                  <div className="flex items-center gap-3 ml-auto">
                    <span className="text-xs text-slate-500">{m.days}</span>
                    <span className="text-sm font-semibold text-white">
                      ${m.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{m.title}</h3>

                {/* Scenario */}
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/10 p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-medium text-cyan-400">The Scenario</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">{m.scenario}</p>
                </div>

                {/* Deliverables */}
                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Deliverables
                  </p>
                  <div className="grid md:grid-cols-2 gap-2.5">
                    {m.deliverables.map((d, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Under the hood
            </span>
            <h2 className="text-3xl font-bold mt-3">Tech Stack</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stack.map((t, i) => {
              const Icon = iconMap[t.icon] || Globe;
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]"
                >
                  <Icon className="w-5 h-5 text-cyan-400 mb-3" />
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.description}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── INVESTMENT ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              Investment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              ${pricing.total.toLocaleString()} {pricing.currency}, everything included
            </h2>
            <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">
              {pricing.paymentStructure}. You see working software after each milestone. No hourly
              billing, no surprises.
            </p>
          </motion.div>

          {/* Milestone pricing cards */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4 mb-8">
            {milestones.map((m) => (
              <div
                key={m.number}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b]/60 border border-white/[0.06] text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-bold text-cyan-400">M{m.number}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{m.tag}</h4>
                <p className="text-[11px] text-slate-500 mb-3">{m.days}</p>
                <p className="text-2xl font-bold text-white">${m.price.toLocaleString()}</p>
              </div>
            ))}
          </motion.div>

          {/* Total */}
          <motion.div
            variants={fadeUp}
            className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border border-cyan-500/15 text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div>
                <p className="text-sm text-slate-400">Total Investment</p>
                <p className="text-4xl font-bold text-white">
                  ${pricing.total.toLocaleString()}
                </p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-sm text-slate-400">Timeline</p>
                <p className="text-4xl font-bold text-white">{pricing.timeline}</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-sm text-slate-400">Payment</p>
                <p className="text-4xl font-bold text-white">Milestone-based</p>
              </div>
            </div>
          </motion.div>

          {/* Comparison */}
          <motion.div
            variants={fadeUp}
            className="mt-6 p-5 rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/10"
          >
            <p className="text-sm text-slate-300 text-center leading-relaxed">
              Another developer quoted{" "}
              <span className="text-white font-semibold">$5,000 for 8-10 weeks</span>. I&apos;m
              delivering the same scope in{" "}
              <span className="text-cyan-400 font-semibold">4-5 weeks for $3,000</span> — because I
              ship faster.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── QUESTIONS FOR YOU ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Before we start
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              {questions.length} Questions Before We Start
            </h2>
          </motion.div>

          <div className="space-y-5">
            {questions.map((q) => (
              <motion.div
                key={q.number}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-cyan-400">{q.number}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">{q.question}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{q.context}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── NEXT STEPS ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
              Next steps
            </span>
            <h2 className="text-3xl font-bold mt-3">What happens next</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto space-y-6 mb-12">
            {[
              {
                num: 1,
                icon: MessageSquare,
                title: "Review this proposal + demo",
                desc: "Take your time. Open the interactive demo, explore every screen, and see exactly what BuilderMatch will look like.",
              },
              {
                num: 2,
                icon: Target,
                title: "Answer the 7 questions",
                desc: "Your answers help me scope the MVP precisely. No wrong answers — they just help me build the right thing first.",
              },
              {
                num: 3,
                icon: CalendarDays,
                title: "Quick call to align on scope",
                desc: "30-minute call to go through your answers, align on priorities, and confirm the timeline. Then I start building.",
              },
              {
                num: 4,
                icon: Zap,
                title: "I start building",
                desc: "Milestone 1 delivered in 10 days. You test it, give feedback, and I move to the next milestone. BuilderMatch is live in 30 days.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-cyan-400">{step.num}.</span>
                      <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center">
            <button
              data-cal-namespace="blueprint"
              data-cal-link="autoflux/blueprint"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition text-sm shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              Book a Call <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-500 mt-3">
              30-minute call to align on scope and start building
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-sm text-slate-400">
          Prepared by Vladimir Ilin —{" "}
          <a
            href="https://autoflux.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition"
          >
            AutoFlux
          </a>
        </p>
        <p className="text-xs text-slate-600 mt-1">
          Prepared for {client.name} · {client.company}
        </p>
      </footer>
    </div>
  );
}
