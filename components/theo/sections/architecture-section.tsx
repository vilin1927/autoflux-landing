"use client";

import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  Globe,
  Key,
  Cpu,
  Shield,
  LayoutDashboard,
  Database,
  FileText,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const inputItems = [
  { icon: FileSpreadsheet, label: "Excel Keywords" },
  { icon: Globe, label: "Domain Config" },
  { icon: Key, label: "API Keys" },
];

const processingItems = [
  { icon: Cpu, label: "Gemini AI" },
  { icon: FileText, label: "Article/FAQ Gen" },
  { icon: Shield, label: "Rate Limiter" },
];

const outputItems = [
  { icon: LayoutDashboard, label: "Review Queue" },
  { icon: Globe, label: "WordPress Sites" },
];

const databaseItems = [
  { icon: FileText, label: "Templates" },
  { icon: Key, label: "Key Status" },
  { icon: Database, label: "Job Queue" },
];

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 mb-4">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            How It All Connects
          </h2>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          {/* Main flow - horizontal on desktop, vertical on mobile */}
          <div className="flex flex-col lg:flex-row items-stretch gap-6 mb-8">
            {/* INPUT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
                Input
              </div>
              <div className="space-y-3">
                {inputItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a]/50"
                  >
                    <item.icon className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="flex items-center justify-center lg:flex-col">
              <ArrowRight className="w-6 h-6 text-gray-500 hidden lg:block" />
              <ArrowDown className="w-6 h-6 text-gray-500 lg:hidden" />
            </div>

            {/* PROCESSING */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-[2] p-5 rounded-xl bg-amber-500/10 border border-amber-500/20"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
                Processing
              </div>
              <div className="grid grid-cols-3 gap-3">
                {processingItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#0a0a0a]/50"
                  >
                    <item.icon className="w-6 h-6 text-amber-400" />
                    <span className="text-xs text-white text-center">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="flex items-center justify-center lg:flex-col">
              <ArrowRight className="w-6 h-6 text-gray-500 hidden lg:block" />
              <ArrowDown className="w-6 h-6 text-gray-500 lg:hidden" />
            </div>

            {/* OUTPUT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 p-5 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-4">
                Output
              </div>
              <div className="space-y-3">
                {outputItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a]/50"
                  >
                    <item.icon className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* DATABASE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Storage
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {databaseItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a]/50"
                >
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-400">Input</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-gray-400">AI Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400">Output</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-gray-400">Storage</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
