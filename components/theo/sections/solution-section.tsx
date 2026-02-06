"use client";

import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  Cpu,
  FileText,
  Globe,
  ArrowRight,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";

const workflowSteps = [
  { icon: FileSpreadsheet, label: "Excel Keywords", color: "bg-emerald-500" },
  { icon: Cpu, label: "Gemini AI", color: "bg-emerald-500" },
  { icon: FileText, label: "Article/FAQ", color: "bg-cyan-500" },
  { icon: Globe, label: "WordPress", color: "bg-green-500" },
];

const benefits = [
  {
    icon: Rocket,
    title: "Multi-Site at Scale",
    description: "Manage unlimited WordPress sites from one plugin dashboard",
  },
  {
    icon: Shield,
    title: "Bulletproof Reliability",
    description: "Rate limiting, circuit breakers, retry logic — posts never get lost",
  },
  {
    icon: Zap,
    title: "Zero Manual Work",
    description: "Upload Excel, click generate, posts publish automatically",
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function SolutionSection() {
  return (
    <section
      id="solution"
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
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            AutoBlog WordPress Plugin
          </h2>
        </motion.div>

        {/* Workflow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-x-auto">
            <div className="flex items-center justify-start md:justify-center gap-2 md:gap-4 min-w-max">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-4">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 font-medium text-center whitespace-nowrap">
                      {step.label}
                    </span>
                  </motion.div>
                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 * index }}
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefit cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
            >
              {/* Gradient accent */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
