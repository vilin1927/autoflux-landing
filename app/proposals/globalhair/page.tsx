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
  return (
    <>
      {/* Market Overview */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: colors.white }}
            >
              Hair Transplant Market — Where It Stands
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              The global market is growing fast, but competition is intensifying
              — especially from Turkey.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "$6.4B", label: "Global market (2025)" },
                { value: "$10.6B", label: "Projected by 2031" },
                { value: "8.78%", label: "Annual growth (CAGR)" },
                { value: "1M+", label: "Patients fly to Turkey/yr" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl text-center"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}15`,
                  }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: colors.gold }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.gray }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Key market facts */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: Users,
                  title: "Who&apos;s buying",
                  desc: "87.5% male, ages 30-39 largest segment. Growing trend: late 20s seeking preventive treatment. Women now 13-22% of patients.",
                },
                {
                  icon: Globe,
                  title: "Turkey dominance",
                  desc: "5,000+ clinics in Istanbul alone. $2B/year revenue. All-inclusive packages at 60-80% less than EU pricing. They respond to leads in minutes.",
                },
                {
                  icon: TrendingUp,
                  title: "What&apos;s changing",
                  desc: "Patients demand transparency on surgeon credentials and aftercare. Social media normalizing the procedure for younger demographics.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}15`,
                  }}
                >
                  <item.icon
                    className="w-5 h-5 mb-3"
                    style={{ color: colors.gold }}
                  />
                  <h3
                    className="font-bold mb-2 text-sm"
                    style={{ color: colors.white }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.gray }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitor Landscape */}
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
              Competitor Landscape — Netherlands
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              What other clinics in the Netherlands are doing — and where
              GlobalHair has an edge or a gap.
            </p>

            <div className="space-y-4">
              {[
                {
                  name: "Zantman Kliniek",
                  location: "Rotterdam — Since 1976",
                  strength: "Heritage & SEO",
                  detail:
                    "Ranks #1 for 'best hair transplant Netherlands'. Transparent pricing on website. Strong educational content strategy. Targets international patients from Belgium, Germany, UK.",
                  gap: "GlobalHair has stronger Instagram presence (233K vs negligible) and proprietary tech (OFT device, V6 Hairboost).",
                },
                {
                  name: "Hair Science Clinic (HASCI)",
                  location: "12 clinics globally — Amsterdam & Maastricht",
                  strength: "Scale & scientific credibility",
                  detail:
                    "Invented Hair Stem Cell Transplantation. Featured in Telegraph, Guardian, ELLE, Esquire. Premium brand, no pricing on website.",
                  gap: "GlobalHair has the dual NL/Turkey model capturing both segments. HASCI has mixed reviews online despite premium positioning.",
                },
                {
                  name: "Amsterdam Hair Institute",
                  location: "Amsterdam — subsidiary of Hairworld Istanbul",
                  strength: "Celebrity endorsements",
                  detail:
                    "'Most chosen clinic by celebrities'. Mobile-first website with strong SEO. FUE CT latest technique variant.",
                  gap: "GlobalHair has 10,000+ treatments track record and HairScan tool for lead generation.",
                },
                {
                  name: "Graft Point Nederland",
                  location: "Rotterdam",
                  strength: "Anti-Turkey positioning",
                  detail:
                    "Explicitly targets patients considering medical tourism with 'no need to go to Turkey' messaging. Competitive pricing, emphasizes Dutch medical standards.",
                  gap: "GlobalHair actually offers both options — NL quality + Turkey pricing. This is a unique advantage none of the competitors have.",
                },
              ].map((competitor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}15`,
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="font-bold text-lg"
                          style={{ color: colors.white }}
                        >
                          {competitor.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: `${colors.gold}15`,
                            color: colors.gold,
                          }}
                        >
                          {competitor.strength}
                        </span>
                      </div>
                      <p
                        className="text-xs mb-3"
                        style={{ color: colors.gray }}
                      >
                        {competitor.location}
                      </p>
                      <p
                        className="text-sm mb-3"
                        style={{ color: colors.gray }}
                      >
                        {competitor.detail}
                      </p>
                      <p className="text-sm" style={{ color: colors.green }}>
                        {competitor.gap}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Problems / Gaps */}
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
              Current Challenges
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              Based on market research and industry data — common problems
              clinics face today.
            </p>

            <motion.div
              className="grid md:grid-cols-2 gap-5"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Clock,
                  title: "Speed-to-Lead Gap",
                  severity: "Critical",
                  desc: "Healthcare average response time is 2 hours 5 minutes. Leads contacted within 5 minutes are 21x more likely to convert. 78% of patients go with the first clinic that responds.",
                  data: "Every 10-minute delay lowers conversion chances by 400%.",
                },
                {
                  icon: AlertTriangle,
                  title: "Platform Concentration Risk",
                  severity: "High",
                  desc: "Over-reliance on Instagram (233K followers vs 2K on Facebook). Industry report from Feb 2026: clinics experienced temporary ad bans. One algorithm change = lead flow stops overnight.",
                  data: "Instagram organic reach has declined significantly across the industry.",
                },
                {
                  icon: RefreshCw,
                  title: "No Lead Nurturing Pipeline",
                  severity: "High",
                  desc: "Hair transplant decisions take weeks to months. Without automated follow-up sequences, leads that don't book immediately are lost to competitors forever.",
                  data: "It takes an average of 7.2 touches to successfully convert a lead.",
                },
                {
                  icon: Search,
                  title: "SEO / Organic Gap",
                  severity: "Medium",
                  desc: "Competitors like Zantman rank above GlobalHair on Google search for key terms. Currently paying for every lead via ads — competitors get organic leads for free.",
                  data: "Educational content ('how many grafts do I need') captures patients in the research phase.",
                },
                {
                  icon: MessageSquare,
                  title: "No Automated Review Engine",
                  severity: "Medium",
                  desc: "No automated post-treatment review requests. 88% of patients trust online reviews as much as personal recommendations. 5-star businesses earn 39% more clicks.",
                  data: "Review generation is the cheapest form of lead acquisition for clinics.",
                },
                {
                  icon: Globe,
                  title: "Single-Language Targeting",
                  severity: "Opportunity",
                  desc: "Not targeting Belgian, German, or UK patients with localized content and ads. HASCI does this across 12 locations. Turkish clinics target every EU market individually.",
                  data: "Multi-language landing pages can unlock entirely new patient segments.",
                },
              ].map((problem, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="p-6 rounded-xl"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${
                      problem.severity === "Critical"
                        ? colors.red
                        : problem.severity === "High"
                        ? colors.gold
                        : colors.gold
                    }20`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <problem.icon
                      className="w-5 h-5"
                      style={{
                        color:
                          problem.severity === "Critical"
                            ? colors.red
                            : colors.gold,
                      }}
                    />
                    <h3
                      className="font-bold"
                      style={{ color: colors.white }}
                    >
                      {problem.title}
                    </h3>
                    <span
                      className="ml-auto px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background:
                          problem.severity === "Critical"
                            ? `${colors.red}20`
                            : problem.severity === "High"
                            ? `${colors.gold}20`
                            : `${colors.blue}20`,
                        color:
                          problem.severity === "Critical"
                            ? colors.red
                            : problem.severity === "High"
                            ? colors.gold
                            : colors.blue,
                      }}
                    >
                      {problem.severity}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-3"
                    style={{ color: colors.gray }}
                  >
                    {problem.desc}
                  </p>
                  <p
                    className="text-xs italic"
                    style={{ color: colors.gold }}
                  >
                    {problem.data}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Possible Solution: AI Ad Pipeline */}
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
              Possible Direction — AI Ad Operations Pipeline
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              A closed-loop system that watches trends, creates ads, tests
              them, and optimizes automatically.
            </p>

            {/* Pipeline visual */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
              {[
                {
                  icon: Eye,
                  step: "1",
                  title: "Trend Watch",
                  desc: "Monitor what's working now",
                },
                {
                  icon: Sparkles,
                  step: "2",
                  title: "Create",
                  desc: "AI generates ad creatives",
                },
                {
                  icon: Layers,
                  step: "3",
                  title: "Hook",
                  desc: "Multiple copy angles",
                },
                {
                  icon: PlayCircle,
                  step: "4",
                  title: "Test",
                  desc: "Deploy A/B variations",
                },
                {
                  icon: BarChart2,
                  step: "5",
                  title: "Analyze",
                  desc: "AI reads performance",
                },
                {
                  icon: Target,
                  step: "6",
                  title: "Optimize",
                  desc: "Scale winners, kill losers",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl text-center relative"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}25`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold"
                    style={{
                      background: `${colors.gold}20`,
                      color: colors.gold,
                    }}
                  >
                    {step.step}
                  </div>
                  <step.icon
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: colors.gold }}
                  />
                  <p
                    className="font-bold text-sm"
                    style={{ color: colors.white }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: colors.gray }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Detailed breakdown */}
            <div className="space-y-4">
              {[
                {
                  icon: Eye,
                  title: "Trend Watch",
                  detail:
                    "Monitor competitor ads via Meta Ad Library (it's public). Track what's going viral in hair transplant niche on TikTok and Instagram. Identify which formats get engagement — UGC vs. polished, before/after vs. testimonial, short-form vs. carousel. Hooks that worked 3 months ago may be dead today.",
                },
                {
                  icon: Sparkles,
                  title: "AI Creative Generation",
                  detail:
                    "Based on trending formats, AI generates ad creatives — video ads (short-form UGC, before/after reveals, testimonial clips) and image ads (product shots with overlay text, carousels). Multi-format output for Instagram Story, Feed, Reels, Facebook, Google Display — all aspect ratios handled.",
                },
                {
                  icon: Layers,
                  title: "Hook Variations",
                  detail:
                    "For each creative, generate 5-10 different hooks using strategic angles: Emotional ('Finally feel confident again'), Urgency ('Limited slots this month'), Social proof ('10,000+ happy patients'), Fear ('Every month you wait = more grafts needed'), Aspiration ('Imagine looking in the mirror and loving what you see').",
                },
                {
                  icon: PlayCircle,
                  title: "A/B Testing Deployment",
                  detail:
                    "Deploy multiple variations as A/B tests directly to Meta and Google via API with small initial budgets. The Meta Marketing API integration already exists from Phase 1. Let campaigns run 3-5 days to collect statistically meaningful data.",
                },
                {
                  icon: BarChart2,
                  title: "Performance Analysis",
                  detail:
                    "AI reads the performance data in real-time — CTR, CPL, ROAS per variation. Surfaces the winners automatically: 'Campaign A: 4.2 ROAS — recommend scaling. Campaign B: 1.8 ROAS — recommend pausing.' All visible in the existing dashboard.",
                },
                {
                  icon: Target,
                  title: "Optimization Loop",
                  detail:
                    "Shift budget to winners, kill underperformers. AI generates new variations based on patterns found in the top performers — what hook angle worked, what visual format converted, what CTA drove action. The loop repeats continuously.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl flex gap-4"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}10`,
                  }}
                >
                  <item.icon
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: colors.gold }}
                  />
                  <div>
                    <h3
                      className="font-bold mb-2"
                      style={{ color: colors.white }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.gray }}>
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Benchmarks */}
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
              Industry Benchmarks
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              Key performance metrics from the hair transplant and aesthetics
              industry.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ad Performance */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: colors.navyLight,
                  border: `1px solid ${colors.gold}15`,
                }}
              >
                <h3
                  className="font-bold mb-4 flex items-center gap-2"
                  style={{ color: colors.white }}
                >
                  <BarChart3
                    className="w-4 h-4"
                    style={{ color: colors.gold }}
                  />
                  Ad Performance
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      metric: "Google Ads CPL",
                      value: "€62 — €108",
                      note: "Top quartile vs laggards",
                    },
                    {
                      metric: "Meta Ads CPL",
                      value: "€15 — €50",
                      note: "In-platform lead forms",
                    },
                    {
                      metric: "Target ROAS",
                      value: "3x — 4.1x",
                      note: "Optimized campaigns",
                    },
                    {
                      metric: "Conversion rate",
                      value: "2-3% avg, 5.6% optimized",
                      note: "Click to lead",
                    },
                    {
                      metric: "Monthly ad budget (top clinics)",
                      value: "€4,000 — €20,000",
                      note: "7-12% of revenue",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2"
                      style={{
                        borderBottom:
                          i < 4
                            ? `1px solid ${colors.gold}10`
                            : "none",
                      }}
                    >
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: colors.gray }}
                        >
                          {item.metric}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: `${colors.gray}80` }}
                        >
                          {item.note}
                        </p>
                      </div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: colors.gold }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Conversion */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: colors.navyLight,
                  border: `1px solid ${colors.gold}15`,
                }}
              >
                <h3
                  className="font-bold mb-4 flex items-center gap-2"
                  style={{ color: colors.white }}
                >
                  <TrendingUp
                    className="w-4 h-4"
                    style={{ color: colors.gold }}
                  />
                  Lead Conversion
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      metric: "Response within 5 min",
                      value: "21x more likely",
                      note: "To qualify the lead",
                    },
                    {
                      metric: "First responder wins",
                      value: "78%",
                      note: "Of patients go with first clinic to reply",
                    },
                    {
                      metric: "Consultation to procedure",
                      value: "55% — 75%",
                      note: "Top-performing clinics",
                    },
                    {
                      metric: "Avg touches to convert",
                      value: "7.2",
                      note: "Across all channels",
                    },
                    {
                      metric: "No-show reduction (automation)",
                      value: "Up to 40%",
                      note: "SMS/WhatsApp reminders",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2"
                      style={{
                        borderBottom:
                          i < 4
                            ? `1px solid ${colors.gold}10`
                            : "none",
                      }}
                    >
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: colors.gray }}
                        >
                          {item.metric}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: `${colors.gray}80` }}
                        >
                          {item.note}
                        </p>
                      </div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: colors.gold }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Top Clinics Use */}
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
              What Top Clinics Are Using
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ color: colors.gray }}
            >
              The tech stack powering the highest-growth hair transplant and
              aesthetics clinics.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  category: "Patient CRM",
                  tools: [
                    "Pabau — FUE/FUT tracking, graft distribution, automated pre/post care",
                    "LeadSquared — Lead scoring, multi-channel follow-up",
                    "Zenoti — AI charting, unlimited HIPAA photo storage",
                  ],
                },
                {
                  category: "Marketing Automation",
                  tools: [
                    "GoHighLevel — CRM + email + SMS + funnels (5-10x ROI in 90 days)",
                    "ManyChat — Instagram DM auto-responses, lead capture",
                    "Brevo — SMS + email + WhatsApp from one place",
                  ],
                },
                {
                  category: "AI & Chat",
                  tools: [
                    "Clinic Convert — 24/7 AI lead qualification + booking",
                    "Chattrix AI — Adds 5-10 extra surgeries per month",
                    "WhatsApp Business API — Reduces no-shows by up to 40%",
                  ],
                },
              ].map((group, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl"
                  style={{
                    background: colors.navyLight,
                    border: `1px solid ${colors.gold}15`,
                  }}
                >
                  <h3
                    className="font-bold mb-4 text-sm"
                    style={{ color: colors.gold }}
                  >
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.tools.map((tool, j) => (
                      <li
                        key={j}
                        className="text-sm flex gap-2"
                        style={{ color: colors.gray }}
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: `${colors.gold}60` }}
                        />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discussion Points */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div
              className="p-8 rounded-2xl text-center"
              style={{
                background: colors.navyLight,
                border: `1px solid ${colors.gold}30`,
              }}
            >
              <Lightbulb
                className="w-8 h-8 mx-auto mb-4"
                style={{ color: colors.gold }}
              />
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: colors.white }}
              >
                Let&apos;s Discuss
              </h2>
              <p className="text-sm mb-6" style={{ color: colors.gray }}>
                This research is a starting point. The right next step depends
                on your priorities and what&apos;s most impactful for
                GlobalHair right now.
              </p>
              <div className="space-y-3 text-left max-w-md mx-auto">
                {[
                  "Which of these challenges is the most painful today?",
                  "What does your current lead response process look like?",
                  "Where do you see the biggest drop-off in your funnel?",
                  "What would you want the dashboard to do next?",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: colors.gray }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{
                        background: `${colors.gold}15`,
                        color: colors.gold,
                      }}
                    >
                      {i + 1}
                    </div>
                    {q}
                  </div>
                ))}
              </div>
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
            { key: "phase2" as const, label: "Phase 2 — Market Research" },
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
