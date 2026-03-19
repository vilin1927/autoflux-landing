"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search, Camera, ShoppingBag, DollarSign, TrendingUp,
  ArrowRight, Sparkles, Users, Shield, Zap, Target,
  BarChart3, Globe, CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI Deal Finder",
    desc: "Scans marketplaces in real-time to surface profitable buy-and-sell opportunities with confidence scores.",
  },
  {
    icon: Camera,
    title: "Smart Scan",
    desc: "Upload or photograph any item — AI identifies the product and returns market value, quick flip price, and max value.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Built-in buy & sell platform with AI-assisted pricing, condition tracking, and location-based filtering.",
  },
  {
    icon: DollarSign,
    title: "Profit Pool",
    desc: "Revenue-sharing system funded from subscriptions, affiliates, and marketplace fees — distributed monthly to all active users.",
  },
  {
    icon: Globe,
    title: "Location Filtering",
    desc: "Filter deals and listings by local radius, selected cities, or global shipping-enabled items.",
  },
  {
    icon: Target,
    title: "Affiliate Engine",
    desc: "All outbound purchase links generate affiliate revenue, 40% flows back to the profit pool.",
  },
];

const mvpScope = [
  "Deal finder with eBay API integration",
  "Smart scan (image upload + AI recognition)",
  "Basic marketplace with listings & search",
  "Stripe subscription system ($49/month)",
  "Location-based filtering",
  "Simplified profit pool logic",
  "User authentication & profiles",
  "Admin dashboard for revenue tracking",
];

const techStack = [
  { name: "Next.js", role: "Frontend" },
  { name: "FastAPI", role: "Backend" },
  { name: "PostgreSQL", role: "Database" },
  { name: "Stripe", role: "Payments" },
  { name: "Google Vision", role: "Image AI" },
  { name: "eBay API", role: "Deal Data" },
];

export default function SmartFlipProposal() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" /> MVP Proposal for Justin
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Smart<span className="text-emerald-400">Flip</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered platform that helps users find, price, and flip products for profit.
              Deal finder + marketplace + revenue sharing — all in one app.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/proposals/smartflip/demo"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition text-sm"
              >
                View Interactive Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MVP Scope */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">MVP Scope</h2>
            <div className="space-y-3">
              {mvpScope.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
            <div className="grid grid-cols-2 gap-3">
              {techStack.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/10">
          <h2 className="text-2xl font-bold mb-3">Ready to explore?</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
            Check out the interactive demo to see how the deal finder, smart scan, and marketplace would work in practice.
          </p>
          <Link
            href="/proposals/smartflip/demo"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition text-sm"
          >
            Launch Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-6 text-center">
        <p className="text-xs text-slate-500">AutoFlux · Built for Justin · March 2026</p>
      </footer>
    </div>
  );
}
