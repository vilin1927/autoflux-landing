"use client";

import { motion } from "framer-motion";
import { FileText, MessageCircle, Rocket, ArrowRight, Mail, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Review this proposal",
    description: "Check the Full Scope table to verify everything you need is included",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Ask any questions via Upwork",
    description: "I'm happy to clarify anything before we start",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Approve & I begin immediately",
    description: "Milestone 1 starts as soon as you give the green light",
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

export function NextStepsSection() {
  return (
    <section
      id="next-steps"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 mb-4">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Ready to Start?
          </h2>
        </motion.div>

        {/* Step cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-bold text-white">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-4 mt-2 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7 text-emerald-400" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          {/* CTA Button */}
          <button
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-emerald-500/25 group inline-flex items-center"
          >
            <span>Let&apos;s Build This Together</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Animated sparkle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block ml-4"
          >
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </motion.div>

          {/* Contact info */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Vladimir | Upwork</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-500" />
            <span className="text-green-400">Ready to start this week</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
