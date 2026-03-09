"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Globe,
  Eye,
  Target,
  AlertTriangle,
  Search,
  RefreshCw,
  Layers,
  Monitor,
  Brain,
  PlayCircle,
  BarChart2,
  Lightbulb,
  Upload,
  FolderOpen,
  Image,
  Video,
  Send,
  Settings,
  Gauge,
  Bot,
} from "lucide-react";

const colors = {
  navy: "#0a1628",
  navyLight: "#0d1a2d",
  navyMid: "#111d32",
  gold: "#c9a962",
  goldLight: "#d4b978",
  white: "#ffffff",
  gray: "#8892a0",
  red: "#e74c3c",
  green: "#2ecc71",
  blue: "#3498db",
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

function Phase1Content() {
  return (
    <>
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
              We analyzed your current ad campaigns across Meta and Google to
              understand your marketing landscape.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${colors.gold}30` }}
              >
                <div
                  className="p-3"
                  style={{
                    background: colors.navyLight,
                    borderBottom: `1px solid ${colors.gold}20`,
                  }}
                >
                  <p
                    className="text-sm font-medium text-center"
                    style={{ color: colors.gold }}
                  >
                    Meta Ads — V6 Hairboost Campaign
                  </p>
                </div>
                <div
                  className="flex items-center justify-center p-6"
                  style={{
                    background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
                    minHeight: "320px",
                  }}
                >
                  <img
                    src="/proposals/globalhair/meta-ad.png"
                    alt="GlobalHair Meta Ad"
                    className="max-w-full max-h-[280px] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${colors.gold}30` }}
              >
                <div
                  className="p-3"
                  style={{
                    background: colors.navyLight,
                    borderBottom: `1px solid ${colors.gold}20`,
                  }}
                >
                  <p
                    className="text-sm font-medium text-center"
                    style={{ color: colors.gold }}
                  >
                    Google Ads — Search Campaign
                  </p>
                </div>
                <div
                  className="flex items-center justify-center p-6"
                  style={{
                    background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
                    minHeight: "320px",
                  }}
                >
                  <img
                    src="/proposals/globalhair/google-ad.png"
                    alt="GlobalHair Google Ad"
                    className="max-w-full max-h-[280px] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>

            <p
              className="text-center text-sm"
              style={{ color: colors.gray }}
            >
              Running campaigns across Meta & Google with V6 Hairboost, 98%
              success rate messaging, and consultation CTAs.
              <br />
              <span style={{ color: colors.gold }}>
                Now imagine seeing all this data — spend, leads, conversions —
                in one dashboard.
              </span>
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
                <div key={i} className="flex gap-6">
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
                  helps you capture{" "}
                  <strong>one additional consultation</strong> per month.
                </p>
              </div>

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
    </>
  );
}

function Phase2Content() {
  const deliverables = [
    {
      icon: FolderOpen,
      title: "Brand Library",
      description:
        "Upload and organize your creatives — images and videos — in one place. Browse your assets, tag them, and pick exactly which ones go into your next campaign.",
    },
    {
      icon: Send,
      title: "Publish to Meta & Google",
      description:
        "Create campaigns on both Meta Ads and Google Ads directly from the dashboard. Set audience, budget, schedule, and creatives — no more switching between platforms.",
    },
    {
      icon: Settings,
      title: "Campaign Management",
      description:
        "Pause, enable, adjust budgets, swap URLs — all from one screen. Simple controls for both Meta and Google campaigns without the clutter of Business Manager.",
    },
    {
      icon: Brain,
      title: "AI Campaign Analysis",
      description:
        "Claude AI reads your campaign data and tells you what's winning, what's dying, and where to shift budget. Clear recommendations, not just numbers.",
    },
    {
      icon: Target,
      title: "Landing Page Tracking",
      description:
        "Connect your Lovable landing page and see the full funnel: Ad click → Page visit → Consultation booked. Know which ads actually drive real bookings.",
    },
    {
      icon: Bell,
      title: "Yesterday's Lead Summary",
      description:
        "Wake up to a daily snapshot: leads, spend, clicks, and conversions from the past 24 hours alongside the 30-day trend. Your morning briefing, done.",
    },
  ];

  const beforeItems = [
    "Log into Meta Business Manager to check Meta campaigns",
    "Log into Google Ads to check Google campaigns",
    "Open a spreadsheet to compare numbers side by side",
    "Manually figure out which campaigns are working",
    "Switch between 3 platforms just to pause one underperformer",
  ];

  const afterItems = [
    "Open your dashboard — everything is already there",
    "Meta + Google campaigns in one view with unified metrics",
    "AI tells you what's working and what to cut",
    "Pause, adjust, or launch campaigns in two clicks",
    "Morning summary delivered — know where you stand before coffee",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{
                background: `${colors.gold}15`,
                border: `1px solid ${colors.gold}30`,
                color: colors.gold,
              }}
            >
              <Gauge className="w-4 h-4" />
              Phase 2 — Ad Control Hub
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: colors.white }}
            >
              Take Full Control
              <br />
              <span style={{ color: colors.gold }}>of Your Ads</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-4"
              style={{ color: colors.gray }}
            >
              Manage Meta Ads and Google Ads from one dashboard.
              Upload creatives, launch campaigns, get AI recommendations
              — without ever opening Business Manager again.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Before vs After */}
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
              Your Workflow, <span style={{ color: colors.gold }}>Simplified</span>
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              Right now you&apos;re jumping between platforms. Phase 2 puts everything in one place.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-xl"
                style={{
                  background: colors.navyLight,
                  border: `1px solid ${colors.red}30`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${colors.red}20` }}
                  >
                    <AlertTriangle className="w-4 h-4" style={{ color: colors.red }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: colors.red }}>
                    Today — 5 Steps, 3 Platforms
                  </h3>
                </div>
                <div className="space-y-3">
                  {beforeItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: colors.gray }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: `${colors.red}15`, color: colors.red }}
                      >
                        {i + 1}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-5 pt-4 text-sm font-medium"
                  style={{ borderTop: `1px solid ${colors.red}15`, color: colors.red }}
                >
                  ~45 minutes every morning just to know where you stand
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-xl"
                style={{
                  background: colors.navyLight,
                  border: `1px solid ${colors.green}30`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${colors.green}20` }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: colors.green }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: colors.green }}>
                    Phase 2 — One Dashboard
                  </h3>
                </div>
                <div className="space-y-3">
                  {afterItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: colors.gray }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: colors.green }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-5 pt-4 text-sm font-medium"
                  style={{ borderTop: `1px solid ${colors.green}15`, color: colors.green }}
                >
                  Under 5 minutes — open, review, act
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included — 6 Cards */}
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
              What&apos;s Included
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              Six features that give you full control over your ad operations — all built into the dashboard you already use.
            </p>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="p-6 rounded-xl group"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}15`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${colors.gold}15` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: colors.gold }} />
                  </div>
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: colors.white }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.gray }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Analysis Preview */}
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
              AI That Tells You <span style={{ color: colors.gold }}>What to Do</span>
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              Not just numbers — actionable recommendations from Claude AI based on your live campaign data.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: colors.navyLight,
                border: `1px solid ${colors.gold}25`,
              }}
            >
              {/* Mock AI Analysis Header */}
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ borderBottom: `1px solid ${colors.gold}15` }}
              >
                <Bot className="w-5 h-5" style={{ color: colors.gold }} />
                <span className="font-bold text-sm" style={{ color: colors.white }}>
                  Campaign Analysis — March 9, 2026
                </span>
                <span
                  className="ml-auto px-2 py-1 rounded-full text-xs"
                  style={{ background: `${colors.green}20`, color: colors.green }}
                >
                  Live Data
                </span>
              </div>

              {/* Mock Analysis Content */}
              <div className="p-6 space-y-5">
                {[
                  {
                    campaign: "NL — Hair Transplant Confidence",
                    roas: "4.2x",
                    roasColor: colors.green,
                    status: "Scale",
                    statusColor: colors.green,
                    analysis:
                      "Hook 'Finally feel confident again' outperforms other variants by 3x. CPL at \u20AC18 — well below your \u20AC50 target. Strong with men 30-39 in Randstad area.",
                    recommendation: "Increase daily budget by 40%. Duplicate campaign targeting Belgium with Dutch copy.",
                  },
                  {
                    campaign: "NL — Free Consultation Generic",
                    roas: "1.8x",
                    roasColor: colors.red,
                    status: "Pause",
                    statusColor: colors.red,
                    analysis:
                      "Generic 'Free consultation' hook has high CPC (\u20AC4.20) and low conversion. Audience overlap with Campaign A is 62% — cannibalizing your winner.",
                    recommendation: "Pause this campaign. Redirect budget to Campaign A and the new Turkey pricing campaign.",
                  },
                  {
                    campaign: "Google — Hair Transplant Netherlands",
                    roas: "3.1x",
                    roasColor: colors.gold,
                    status: "Optimize",
                    statusColor: colors.gold,
                    analysis:
                      "Search campaign performing well on exact match keywords. Broad match is wasting 35% of budget on irrelevant queries like 'hair transplant training'.",
                    recommendation: "Add 12 negative keywords (list attached). Shift broad match budget to exact match. Expected CPL improvement: 20%.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg"
                    style={{
                      background: colors.navyMid,
                      border: `1px solid ${item.statusColor}20`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h4 className="font-bold text-sm" style={{ color: colors.white }}>
                        {item.campaign}
                      </h4>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: `${item.roasColor}20`, color: item.roasColor }}
                      >
                        {item.roas} ROAS
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold ml-auto"
                        style={{ background: `${item.statusColor}15`, color: item.statusColor }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: colors.gray }}>
                      {item.analysis}
                    </p>
                    <div className="flex items-start gap-2">
                      <ArrowRight
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: colors.gold }}
                      />
                      <p className="text-sm font-medium" style={{ color: colors.gold }}>
                        {item.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="px-6 py-3 text-center"
                style={{ borderTop: `1px solid ${colors.gold}10` }}
              >
                <p className="text-xs" style={{ color: colors.gray }}>
                  This is a preview of the AI analysis output. Your real data will populate automatically.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works — 3 Steps */}
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
              How It Works
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              Three steps. One dashboard. Full control.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  icon: Upload,
                  title: "Upload",
                  description:
                    "Drop your images and videos into the Brand Library. Organize by campaign, format, or theme. Your creative assets live in one place.",
                },
                {
                  step: "2",
                  icon: Send,
                  title: "Publish",
                  description:
                    "Select creatives, set your audience, budget, and schedule. Hit publish — your campaign goes live on Meta, Google, or both. No platform switching.",
                },
                {
                  step: "3",
                  icon: Brain,
                  title: "Analyze",
                  description:
                    "AI reads your campaign performance daily. You get clear recommendations: what to scale, what to pause, where to shift budget. Act in two clicks.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center p-6 rounded-xl relative"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}20`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                    style={{
                      background: `${colors.gold}15`,
                      color: colors.gold,
                      border: `2px solid ${colors.gold}40`,
                    }}
                  >
                    {item.step}
                  </div>
                  <item.icon
                    className="w-6 h-6 mx-auto mb-3"
                    style={{ color: colors.gold }}
                  />
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: colors.white }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.gray }}>
                    {item.description}
                  </p>
                  {i < 2 && (
                    <ArrowRight
                      className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                      style={{ color: `${colors.gold}40` }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="p-8 md:p-10 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${colors.navyLight} 0%, ${colors.navyMid} 100%)`,
                border: `1px solid ${colors.gold}30`,
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                style={{ background: `${colors.gold}15`, color: colors.gold }}
              >
                <Clock className="w-3.5 h-3.5" />
                7–10 day delivery
              </div>

              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: colors.white }}
              >
                Phase 2 — Ad Control Hub
              </h2>
              <p className="text-sm mb-6" style={{ color: colors.gray }}>
                Everything you need to manage your ads from one place.
              </p>

              <div className="mb-8">
                <span
                  className="text-5xl font-bold"
                  style={{ color: colors.gold }}
                >
                  $1,200
                </span>
                <span className="text-lg ml-2" style={{ color: colors.gray }}>
                  one-time
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto mb-8">
                {[
                  "Brand Library — upload & organize creatives",
                  "Publish campaigns to Meta & Google",
                  "Campaign management — pause, adjust, control",
                  "AI campaign analysis & recommendations",
                  "Landing page tracking — full funnel visibility",
                  "Yesterday's lead summary — daily snapshot",
                  "Built into your existing dashboard",
                  "7–10 days from start to live",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: colors.gray }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: colors.gold }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              <div
                className="pt-6"
                style={{ borderTop: `1px solid ${colors.gold}15` }}
              >
                <p className="text-xs" style={{ color: colors.gray }}>
                  Same stack as Phase 1 — builds directly on top of your existing dashboard. No new logins, no new platforms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Zap
              className="w-10 h-10 mx-auto mb-6"
              style={{ color: colors.gold }}
            />
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.white }}
            >
              Let&apos;s Build This
            </h2>
            <p
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: colors.gray }}
            >
              You already have the dashboard. Phase 2 turns it into a full ad operations hub. 7–10 days, and you&apos;ll never open Business Manager again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:vladimir@autoflux.digital?subject=Phase%202%20—%20Let's%20Go"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium text-base transition-all hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                  color: colors.navy,
                }}
              >
                Ready to Start
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/381601234567"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium text-base transition-all"
                style={{
                  background: `${colors.gold}10`,
                  color: colors.gold,
                  border: `1px solid ${colors.gold}30`,
                }}
              >
                <MessageSquare className="w-4 h-4" />
                Questions? Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function ProposalPage() {
  const [activeTab, setActiveTab] = useState<"phase1" | "phase2">("phase1");

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
          <strong>Peter De Harder</strong> | GlobalHair Institute | February
          2026
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
                className="h-14 object-contain"
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

      {/* Tab Navigation */}
      <div className="sticky top-0 z-50 px-6 py-3" style={{ background: colors.navy, borderBottom: `1px solid ${colors.gold}20` }}>
        <div className="max-w-5xl mx-auto flex gap-2 justify-center">
          {[
            { key: "phase1" as const, label: "Phase 1 — Dashboard" },
            { key: "phase2" as const, label: "Phase 2 — Ad Control Hub" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background:
                  activeTab === tab.key ? `${colors.gold}20` : "transparent",
                color:
                  activeTab === tab.key ? colors.gold : colors.gray,
                border: `1px solid ${
                  activeTab === tab.key ? colors.gold : "transparent"
                }40`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "phase1" ? (
          <motion.div
            key="phase1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Phase1Content />
          </motion.div>
        ) : (
          <motion.div
            key="phase2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Phase2Content />
          </motion.div>
        )}
      </AnimatePresence>

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
