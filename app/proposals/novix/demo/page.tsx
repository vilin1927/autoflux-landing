"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Layers,
  FileText,
  Zap,
  CheckCircle2,
  Clock,
} from "lucide-react";
import CalendarDemo from "./calendar-demo";
import Architecture from "./architecture";
import Documentation from "./documentation";

type Tab = "demo" | "architecture" | "documentation";

const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "demo", label: "Calendar Preview", icon: Calendar, badge: "Live" },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "documentation", label: "Documentation", icon: FileText },
];

export default function NovixDemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("demo");

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Link
            href="/proposals/novix"
            className="text-lg font-bold text-white hover:text-indigo-400 transition-colors"
          >
            AutoFlux
          </Link>
          <span className="text-sm text-slate-500">
            for Henrik Andersen &middot; NOVIX IVS
          </span>
        </motion.header>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
            Custom Web Calendar Generator
          </h1>
          <p className="text-sm text-slate-500">
            Interactive proposal with live demo, architecture, and answers to your questions.
          </p>
        </motion.div>

        {/* MVP Scope Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-6 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-indigo-400" />
            <p className="text-sm font-bold text-white">
              This is a proof-of-concept showing the rendering approach
            </p>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            A quick mini-app so you can see how I think about the calendar engine and UI direction. The actual MVP will have proper design system, full architecture, and all the features below.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { label: "Calendar engine + config model", included: true },
              { label: "Notes & events (recurring, weekly)", included: true },
              { label: "Font & color customization", included: true },
              { label: "Live dynamic preview", included: true },
              { label: "PDF download (300 DPI, pdf-lib)", included: true },
              { label: "5 paper sizes + orientations", included: true },
              { label: "Modern UI (proper design system)", included: true },
              { label: "SEO-ready (Next.js SSR)", included: true },
              { label: "Azure DevOps (code + tracking)", included: true },
              { label: "Auth + user profiles", included: false },
              { label: "i18n / multilanguage", included: false },
              { label: "Extra templates (monthly, weekly)", included: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-[11px]"
              >
                {item.included ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
                <span
                  className={
                    item.included ? "text-slate-300" : "text-slate-600"
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-indigo-500/10">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Included in MVP
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-600" />
              Future phase
            </div>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1 mb-8 bg-slate-900 border border-slate-800 rounded-xl p-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-indigo-500/20 text-indigo-400"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "demo" && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarDemo />
            </motion.div>
          )}
          {activeTab === "architecture" && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Architecture />
            </motion.div>
          )}
          {activeTab === "documentation" && (
            <motion.div
              key="documentation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Documentation />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 mt-12 border-t border-slate-800/50"
        >
          <p className="text-slate-600 text-xs">
            Prepared by{" "}
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors"
            >
              AutoFlux
            </Link>{" "}
            &middot; April 2026
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
