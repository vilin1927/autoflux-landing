"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Play } from "lucide-react";

export default function NovixProposalPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-indigo-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-2">
            NOVIX IVS
          </h1>
          <p className="text-slate-500 text-sm mb-4">
            Custom Web Calendar Generator
          </p>

          {/* Description */}
          <p className="text-slate-400 mb-6">
            Interactive proposal with live calendar demo, architecture overview, and detailed answers to your technical questions.
          </p>

          {/* Contact */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
            <p className="text-slate-300 text-sm">
              Prepared for Henrik Andersen
            </p>
          </div>

          {/* Demo Button */}
          <Link
            href="/proposals/novix/demo"
            className="inline-flex items-center gap-3 bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full justify-center"
          >
            <Play className="w-5 h-5" />
            View Proposal & Demo
          </Link>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-slate-500 text-sm hover:text-white transition-colors"
          >
            &larr; Back to AutoFlux
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
