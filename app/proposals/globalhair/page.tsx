"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  Users,
  MessageSquare,
  Sparkles,
  FileText,
  Bell,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Clock,
  DollarSign,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";

const colors = {
  navy: "#0a1628",
  navyLight: "#0d1a2d",
  gold: "#c9a962",
  goldLight: "#d4b978",
  white: "#ffffff",
  gray: "#8892a0",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ProposalPage() {
  return (
    <div className="min-h-screen" style={{ background: colors.navy }}>
      {/* Author Banner */}
      <div
        className="w-full py-2 px-4 text-center text-sm"
        style={{
          background: `linear-gradient(90deg, ${colors.gold}20 0%, ${colors.gold}40 50%, ${colors.gold}20 100%)`,
          borderBottom: `1px solid ${colors.gold}50`,
        }}
      >
        <span style={{ color: colors.gold }}>
          Proposal prepared by <strong>Vladimir Ilin</strong> for{" "}
          <strong>Peter De Harder</strong> | GlobalHair Institute | February 2026
        </span>
      </div>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/proposals/globalhair/logo.png"
                alt="GlobalHair Institute"
                className="h-16 object-contain"
              />
            </div>
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: `${colors.gold}20`, color: colors.gold }}
            >
              CMO Dashboard for GlobalHair Institute
            </div>
            <h1
              className="text-5xl font-bold mb-6"
              style={{ color: colors.white }}
            >
              Your Marketing
              <span style={{ color: colors.gold }}> Command Center</span>
            </h1>
            <p
              className="text-xl mb-10 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              One dashboard that pulls live data from Meta, TikTok, Google Ads &
              Stripe — so you stop tab-switching and start making decisions.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
              {[
                { value: "€4,950+", label: "Revenue per treatment" },
                { value: "5+", label: "Platforms you manage" },
                { value: "1", label: "Dashboard to rule them all" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}20`,
                  }}
                >
                  <p
                    className="text-3xl font-bold"
                    style={{ color: colors.gold }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm" style={{ color: colors.gray }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/proposals/globalhair/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ background: colors.gold, color: colors.navy }}
              >
                View Interactive Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* We Did Our Homework */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: colors.white }}
            >
              We Did Our Homework
            </h2>
            <p
              className="text-center mb-8 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              We analyzed your current ad campaigns across Meta and Google to understand your marketing landscape.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${colors.gold}30` }}
              >
                <div className="p-3" style={{ background: colors.navyLight }}>
                  <p className="text-sm font-medium" style={{ color: colors.gold }}>
                    Meta Ads — V6 Hairboost Campaign
                  </p>
                </div>
                <img
                  src="/proposals/globalhair/meta-ad.png"
                  alt="GlobalHair Meta Ad"
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${colors.gold}30` }}
              >
                <div className="p-3" style={{ background: colors.navyLight }}>
                  <p className="text-sm font-medium" style={{ color: colors.gold }}>
                    Google Ads — Search Campaign
                  </p>
                </div>
                <img
                  src="/proposals/globalhair/google-ad.png"
                  alt="GlobalHair Google Ad"
                  className="w-full"
                />
              </motion.div>
            </div>

            <p
              className="text-center text-sm"
              style={{ color: colors.gray }}
            >
              Running campaigns across Meta & Google with V6 Hairboost, 98% success rate messaging, and consultation CTAs.
              <br />
              <span style={{ color: colors.gold }}>Now imagine seeing all this data — spend, leads, conversions — in one dashboard.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: colors.white }}
            >
              The Problem
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              You&apos;re investing thousands monthly across platforms — but
              there&apos;s no single view showing what actually works.
            </p>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "6 Tabs, 6 Logins, Every Morning",
                  desc: "Meta Ads Manager. TikTok. Google Ads. Stripe. WhatsApp. Instagram. First hour of every day is data collection instead of strategy.",
                },
                {
                  title: "Leads Falling Through Cracks",
                  desc: "Inquiries come from 5+ channels. Without a unified pipeline, some go cold before anyone responds. At €4,950 per treatment, that's expensive.",
                },
                {
                  title: "Blind Spots in Ad Spend",
                  desc: "Which platform actually drives consultations? Not clicks — consultations. Without that data, you're guessing where to put budget.",
                },
                {
                  title: "No Real-Time Pulse",
                  desc: "Between NL and Turkey offices, you have zero visibility on the go. A lead comes in, budget runs out — you find out hours later.",
                },
              ].map((pain, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}20`,
                  }}
                  whileHover={{
                    borderColor: `${colors.gold}50`,
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.white }}
                  >
                    {pain.title}
                  </h3>
                  <p style={{ color: colors.gray }}>{pain.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Solution - Phase 1 */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: `${colors.gold}20`, color: colors.gold }}
            >
              Phase 1 — $2,500
            </div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.white }}
            >
              What You Get in 2-3 Weeks
            </h2>
            <p className="mb-12 max-w-2xl" style={{ color: colors.gray }}>
              A fully functional marketing command center with live data from
              Day 1.
            </p>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: BarChart3,
                  title: "Multi-Platform Analytics",
                  desc: "Meta, TikTok, Google Ads — spend, leads, CPL, ROAS in one view. Live data, not exports.",
                },
                {
                  icon: Users,
                  title: "CRM Pipeline",
                  desc: "Every lead from every channel tracked. Stages, notes, follow-up reminders. No one falls through.",
                },
                {
                  icon: DollarSign,
                  title: "Stripe Integration",
                  desc: "Revenue tracking, payment status, invoice PDF generation. See ROI alongside ad spend.",
                },
                {
                  icon: Sparkles,
                  title: "AI Ad Copy Generator",
                  desc: "Claude + OpenAI powered. Generate Meta and TikTok ad copy tailored to GlobalHair's voice.",
                },
                {
                  icon: Bell,
                  title: "Telegram Bot",
                  desc: "Daily morning stats. Instant new lead alerts. Budget warnings. Check stats from your phone.",
                },
                {
                  icon: Zap,
                  title: "API Parallel Execution",
                  desc: "TikTok & Google API applications submitted Day 1. Integrated the moment they approve.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}30`,
                  }}
                  whileHover={{
                    borderColor: colors.gold,
                    boxShadow: `0 0 20px ${colors.gold}20`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${colors.gold}20` }}
                  >
                    <feature.icon
                      className="w-5 h-5"
                      style={{ color: colors.gold }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.white }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.gray }}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: colors.white }}
            >
              Timeline
            </h2>
            <p
              className="text-center mb-12 max-w-xl mx-auto"
              style={{ color: colors.gray }}
            >
              Parallel execution — API approvals process while we build.
            </p>

            <div className="space-y-6">
              {[
                {
                  phase: "Day 1",
                  title: "Kickoff + API Applications",
                  items: [
                    "Submit TikTok Ads API application",
                    "Submit Google Ads developer token request",
                    "Set up Supabase backend + Meta API connection",
                    "Collect Stripe API keys",
                  ],
                },
                {
                  phase: "Week 1-2",
                  title: "Core Dashboard Live",
                  items: [
                    "Dashboard UI with GlobalHair branding",
                    "Meta Ads API integration (live data)",
                    "Stripe integration + invoice PDFs",
                    "CRM pipeline",
                    "AI ad copy generator",
                    "Telegram bot (stats, alerts)",
                  ],
                },
                {
                  phase: "Week 2-3",
                  title: "Full Platform Integration",
                  items: [
                    "TikTok Ads API (approved by now)",
                    "Google Ads API (approved by now)",
                    "Cross-platform analytics",
                    "Testing + refinements",
                  ],
                },
              ].map((phase, i) => (
                <div
                  key={i}
                  className="flex gap-6"
                >
                  <div
                    className="w-24 flex-shrink-0 text-right"
                    style={{ color: colors.gold }}
                  >
                    <p className="font-bold">{phase.phase}</p>
                  </div>
                  <div
                    className="flex-1 p-6 rounded-xl"
                    style={{
                      background: colors.navyLight,
                      border: `1px solid ${colors.gold}20`,
                    }}
                  >
                    <h3
                      className="font-bold mb-3"
                      style={{ color: colors.white }}
                    >
                      {phase.title}
                    </h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: colors.gray }}
                        >
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: colors.gold }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ color: colors.white }}
            >
              Investment
            </h2>

            <div
              className="p-8 rounded-2xl text-center"
              style={{
                background: colors.navyLight,
                border: `2px solid ${colors.gold}50`,
              }}
            >
              <p className="text-sm mb-2" style={{ color: colors.gray }}>
                Phase 1 — Full Marketing Dashboard
              </p>
              <p
                className="text-5xl font-bold mb-4"
                style={{ color: colors.gold }}
              >
                $2,500
              </p>
              <p className="text-sm mb-6" style={{ color: colors.gray }}>
                2-3 weeks delivery | 50% upfront, 50% on milestone
              </p>

              <div
                className="p-4 rounded-xl mb-6"
                style={{ background: `${colors.gold}10` }}
              >
                <p className="text-sm" style={{ color: colors.white }}>
                  <strong style={{ color: colors.gold }}>ROI math:</strong> At
                  €4,950 per treatment, this dashboard pays for itself when it
                  helps you capture <strong>one additional consultation</strong>{" "}
                  per month.
                </p>
              </div>

              {/* Urgency Offer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="p-4 rounded-xl mb-6 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.gold}30 0%, ${colors.gold}10 100%)`,
                  border: `1px solid ${colors.gold}`,
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-4 h-4" style={{ color: colors.gold }} />
                  <p className="text-sm font-bold" style={{ color: colors.gold }}>
                    Quick Start Bonus
                  </p>
                </div>
                <p className="text-sm" style={{ color: colors.white }}>
                  Start before <strong>February 7</strong> and I&apos;ll include{" "}
                  <strong style={{ color: colors.gold }}>Website Uptime Monitoring</strong>{" "}
                  for free — instant Telegram alerts if globalhair.institute goes down.
                </p>
              </motion.div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/proposals/globalhair/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                  style={{ background: colors.gold, color: colors.navy }}
                >
                  View Interactive Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase 2 Teaser */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl font-bold text-center mb-4"
              style={{ color: colors.white }}
            >
              Phase 2 — Future Expansion
            </h2>
            <p
              className="text-center mb-8 max-w-xl mx-auto"
              style={{ color: colors.gray }}
            >
              Once Phase 1 is running, we can scope additional features:
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Landing Page Builder",
                "Social Media Auto-Posting",
                "Chatbot Monitoring (WhatsApp, IG, FB)",
                "Static Ad Creation",
                "Video Ad Generation",
                "Website Uptime Monitoring",
              ].map((feature, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: `${colors.gold}10`,
                    color: colors.gray,
                    border: `1px solid ${colors.gold}20`,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: `1px solid ${colors.gold}20` }}
      >
        <p className="text-sm" style={{ color: colors.gray }}>
          Prepared by{" "}
          <strong style={{ color: colors.gold }}>Vladimir Ilin</strong> |{" "}
          <a
            href="https://autoflux.digital"
            target="_blank"
            className="underline"
            style={{ color: colors.gold }}
          >
            AutoFlux Digital
          </a>{" "}
          | February 2026
        </p>
      </footer>
    </div>
  );
}
