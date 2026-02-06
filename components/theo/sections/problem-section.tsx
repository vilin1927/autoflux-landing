"use client";

import { motion } from "framer-motion";
import { Clock, Key, Globe, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Manual Content is Slow",
    description:
      "Writing SEO articles manually takes hours per piece. Hard to scale beyond a few posts per week without a dedicated team.",
  },
  {
    icon: Key,
    title: "API Rate Limits Kill Progress",
    description:
      "Gemini keys get blocked constantly. No coordination between keys means wasted time and failed generations.",
  },
  {
    icon: Globe,
    title: "Multi-Site Publishing Nightmare",
    description:
      "Managing content across multiple WordPress sites means repetitive copy-paste work and inconsistent templates.",
  },
  {
    icon: AlertTriangle,
    title: "No Reliability Guarantees",
    description:
      "When AI fails, posts are lost. No retry logic, no queue management, no way to recover from errors.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ProblemSection() {
  return (
    <section
      id="problem"
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
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-400 mb-4">
            The Challenge
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            The Content Scaling Problem
          </h2>
        </motion.div>

        {/* Problem cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Problem accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
