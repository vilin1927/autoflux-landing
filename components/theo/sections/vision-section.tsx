"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, FileSpreadsheet, Cpu, Eye, Globe } from "lucide-react";

const visionItems = [
  "Upload keywords via Excel with categories",
  "AI generates Article or FAQ posts automatically",
  "Mermaid flowcharts in Article posts",
  "HTML templates for consistent formatting",
  "Internal category links auto-inserted",
  "Publish to multiple WordPress sites",
  "Track API key health in real-time",
];

const flowSteps = [
  { icon: FileSpreadsheet, label: "Excel" },
  { icon: Cpu, label: "Gemini AI" },
  { icon: Eye, label: "Review" },
  { icon: Globe, label: "WordPress" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export function VisionSection() {
  return (
    <section
      id="vision"
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
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-green-500/10 text-green-400 mb-4">
            Your Goals
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            What You Want to Achieve
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Checklist */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {visionItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-8 text-center">
                Your Content Journey
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {flowSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        {step.label}
                      </span>
                    </motion.div>
                    {index < flowSteps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-500 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
