"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const projects = [
  {
    title: "TikTok Automation",
    stat: "1000+",
    statLabel: "posts processed daily",
    description: "AI integration + image processing + batch queuing",
    techBadges: ["Python", "AI APIs", "Celery"],
  },
  {
    title: "AutoBlog Systems",
    stat: "Multiple",
    statLabel: "WordPress sites managed",
    description: "AI content generation + multi-site publishing",
    techBadges: ["WordPress", "AI", "REST API"],
  },
  {
    title: "Rate Limit Systems",
    stat: "Bulletproof",
    statLabel: "reliability patterns",
    description: "Circuit breakers + retry logic + job queues",
    techBadges: ["Queue Systems", "APIs", "Monitoring"],
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

export function WhyMeSection() {
  return (
    <section
      id="why-me"
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
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 mb-4">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Why Work With Me
          </h2>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Stat */}
              <div className="mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {project.stat}
                </div>
                <div className="text-sm text-gray-400">
                  {project.statLabel}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-4">{project.description}</p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {project.techBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
        >
          <Quote className="w-10 h-10 text-emerald-500/30 mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl text-white mb-4 font-medium italic">
            &ldquo;Talented, responsive, hard working... always over
            delivers&rdquo;
          </blockquote>
          <div className="text-gray-400">— Upwork Client Review</div>
        </motion.div>
      </div>
    </section>
  );
}
