"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Play, ArrowRight, Mail } from "lucide-react";

export default function ProposalPage() {
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
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Proposal In Progress
          </h1>

          {/* Description */}
          <p className="text-slate-400 mb-6">
            This proposal is currently being prepared. We're in the discovery phase, gathering requirements and finalizing the scope.
          </p>

          {/* Contact */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
            <p className="text-slate-300 text-sm">
              Questions? Reach out to discuss the project.
            </p>
            <a
              href="mailto:vladimir@autoflux.digital"
              className="inline-flex items-center gap-2 text-cyan-400 font-medium mt-2 hover:text-cyan-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              vladimir@autoflux.digital
            </a>
          </div>

          {/* Demo Button */}
          <Link
            href="/proposals/alamance-property/demo"
            className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors w-full justify-center"
          >
            <Play className="w-5 h-5" />
            View Live Demo
            <ArrowRight className="w-4 h-4" />
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
