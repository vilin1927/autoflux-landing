"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Video, Brain } from "lucide-react";
import ReelPilotProposal from "./reelpilot";
import AIBrainProposal from "./ai-brain";

type Tab = "ai-brain" | "reelpilot";

export default function CheckpointProposalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("ai-brain");

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] relative">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Link
            href="/"
            className="text-xl font-bold text-[var(--text-dark)] hover:text-[#38BDF8] transition-colors"
          >
            AutoFlux
          </Link>
          <span className="text-sm text-[var(--text-muted)]">
            for Dan Gold &middot; Toronto Watch Exchange
          </span>
        </motion.header>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-1.5"
        >
          <button
            onClick={() => setActiveTab("ai-brain")}
            className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-[var(--radius-md)] text-sm font-bold transition-all ${
              activeTab === "ai-brain"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                : "text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[var(--bg-light)]"
            }`}
          >
            <Brain className="w-4.5 h-4.5" />
            <span>WatchCash AI Brain</span>
            {activeTab !== "ai-brain" && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {activeTab === "ai-brain" && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("reelpilot")}
            className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-[var(--radius-md)] text-sm font-bold transition-all ${
              activeTab === "reelpilot"
                ? "bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white shadow-md"
                : "text-[var(--text-muted)] hover:text-[var(--text-dark)] hover:bg-[var(--bg-light)]"
            }`}
          >
            <Video className="w-4.5 h-4.5" />
            <span>ReelPilot Video Engine</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              activeTab === "reelpilot"
                ? "bg-green-500/20 text-green-300"
                : "bg-green-100 text-green-700"
            }`}>
              Active
            </span>
          </button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "ai-brain" && (
            <motion.div
              key="ai-brain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AIBrainProposal />
            </motion.div>
          )}
          {activeTab === "reelpilot" && (
            <motion.div
              key="reelpilot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ReelPilotProposal />
            </motion.div>
          )}
        </AnimatePresence>

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
            &middot; AI Automation Agency &middot; March 2026
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
