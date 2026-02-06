"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Globe,
  FileSpreadsheet,
  FileCode,
  Key,
  Cpu,
  Shield,
  ChevronDown,
} from "lucide-react";

const techItems = [
  {
    icon: Globe,
    title: "Domain Manager",
    what: "Add, edit, delete WordPress sites with connection testing",
    why: "Manage multiple sites from one place. Never forget credentials.",
    tech: "WP REST API + Application Passwords",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel Import",
    what: "Upload .xlsx with keywords. Each row = post title, columns = categories",
    why: "Batch upload hundreds of keywords at once. No manual entry.",
    tech: "Article + FAQ post types. Gutenberg-compatible.",
  },
  {
    icon: FileCode,
    title: "Template Manager",
    what: "Create HTML templates per domain. Quick select when configuring.",
    why: "Consistent branding across all posts. Easy to update.",
    tech: "HTML code editor with saved versions",
  },
  {
    icon: Key,
    title: "API Key Manager",
    what: "Multiple Gemini keys. Bulk paste. Real-time health view.",
    why: "Never hit rate limits. Keys rotate automatically.",
    tech: "Per-key RPM tracking + auto re-enable after cooldown",
  },
  {
    icon: Cpu,
    title: "AI Generation",
    what: "Gemini primary + DeepSeek/Claude/Mistral alternatives",
    why: "Articles (~800 words) with Mermaid diagrams. FAQs with Gutenberg blocks.",
    tech: "Disclaimer, emoji titles, internal category links",
  },
  {
    icon: Shield,
    title: "Reliability & Security",
    what: "Server-side job queue, circuit breaker, exponential backoff",
    why: "Posts never get lost. Failed posts go to review queue.",
    tech: "Encrypted API keys, HTTPS, admin-only access",
  },
];

export function HowItWorksSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="how-it-works"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 mb-4">
            Technology
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Under The Hood
          </h2>
          <p className="text-lg text-gray-400">
            Every feature from the scope, explained
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {techItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
            >
              {/* Accordion header */}
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-white">
                    {item.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion content */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="grid gap-4 pl-14">
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                        What
                      </div>
                      <p className="text-white">{item.what}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1">
                        Why
                      </div>
                      <p className="text-white">{item.why}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                        Tech
                      </div>
                      <p className="text-gray-400">{item.tech}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
