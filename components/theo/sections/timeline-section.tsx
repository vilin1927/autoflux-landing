"use client";

import { motion } from "framer-motion";
import { Calendar, DollarSign, Check, Code } from "lucide-react";

const milestones = [
  {
    title: "Core System Delivered",
    timeline: "Week 1",
    payment: "50% — $520",
    deliverables: [
      "Domain Manager with WP REST API integration",
      "Excel import for keywords & categories",
      "Template Manager with HTML editor",
      "API Key Manager with status dashboard",
      "AI content generation (Gemini + alternatives)",
      "Article & FAQ post types working",
      "Publish via WP REST API",
    ],
  },
  {
    title: "Polish & Reliability",
    timeline: "Week 2",
    payment: "50% — $520",
    deliverables: [
      "Rate limiting & request coordination",
      "Circuit breaker & retry logic",
      "Failed post review queue",
      "Security hardening (encrypted keys, HTTPS)",
      "Your feedback implemented",
      "Documentation & handoff",
    ],
  },
];

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 mb-4">
            Project Plan
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            2 Milestones, 2 Weeks
          </h2>
        </motion.div>

        {/* Milestone cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group hover:bg-white/10 transition-all duration-300"
            >
              {/* Milestone number */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                {index + 1}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4 mt-2">
                Milestone {index + 1}: {milestone.title}
              </h3>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {milestone.timeline}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm">
                  <DollarSign className="w-4 h-4" />
                  {milestone.payment}
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-3">
                {milestone.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total investment card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-emerald-500/30 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Total Investment
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  $1,040
                </div>
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div className="flex items-center gap-3 text-gray-400">
              <Code className="w-5 h-5 text-green-400" />
              <span>You own 100% of the source code</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
