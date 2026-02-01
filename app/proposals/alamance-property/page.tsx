"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Satellite,
  Brain,
  Database,
  BarChart3,
  Zap,
  ArrowRight,
  Check,
  ExternalLink,
  Play,
  Bell,
} from "lucide-react";
import { proposalData } from "@/data/proposals/alamance-property";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Notification Banner */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
      >
        <Link
          href="/proposals/alamance-property/demo"
          className="flex items-center justify-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Bell className="w-4 h-4 animate-bounce" />
            <span className="font-medium">Live Demo Available!</span>
          </span>
          <span className="hidden sm:inline text-cyan-100">
            Experience the Property Detection Dashboard
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
          >
            AutoFlux
          </Link>
          <span className="text-sm text-slate-400">
            Proposal for Real Estate Intelligence
          </span>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 mb-8 text-white relative overflow-hidden border border-slate-700/50"
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />

          {/* Glowing orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-6 border border-cyan-500/30">
              <MapPin className="w-3 h-3" />
              Alamance County, NC
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
              {proposalData.project.title}
            </h1>

            <p className="text-lg text-slate-300 max-w-xl mb-8">
              {proposalData.project.description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mb-8">
              {proposalData.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/proposals/alamance-property/demo"
              className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-4 rounded-xl font-bold transition-colors group"
            >
              <Play className="w-5 h-5" />
              View Live Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            How It Works
          </h2>
          <p className="text-slate-400 mb-8">
            End-to-end pipeline from parcel data to actionable insights
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: MapPin, title: "Parcel Data", desc: "County GIS shapefile", color: "cyan" },
              { icon: Satellite, title: "Imagery", desc: "Google Maps API", color: "blue" },
              { icon: Database, title: "Storage", desc: "AWS S3 + DynamoDB", color: "purple" },
              { icon: Brain, title: "AI Analysis", desc: "Rekognition/YOLO", color: "pink" },
              { icon: Zap, title: "Scoring", desc: "Distress algorithm", color: "amber" },
              { icon: BarChart3, title: "Dashboard", desc: "QuickSight viz", color: "emerald" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center hover:border-cyan-500/50 transition-colors"
                >
                  <div className={`w-12 h-12 bg-${step.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 text-${step.color}-400`} />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            AI Classification Features
          </h2>
          <p className="text-slate-400 mb-8">
            Computer vision models detect multiple distress indicators
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Boarded Windows", desc: "Detect plywood/boards covering windows indicating vacancy", score: "+3" },
              { title: "Lawn Condition", desc: "Overgrown vegetation analysis via satellite imagery", score: "+2" },
              { title: "Roof Damage", desc: "Missing shingles, structural issues, tarps", score: "+2" },
              { title: "Property Vacancy", desc: "Multiple indicators suggesting no occupancy", score: "+2" },
              { title: "Structural Issues", desc: "Foundation cracks, leaning structures, damage", score: "+3" },
              { title: "Debris/Junk", desc: "Accumulated materials, abandoned vehicles", score: "+1" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <span className="text-xs font-mono text-red-400 bg-red-500/20 px-2 py-1 rounded">
                    {feature.score}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 md:p-10 mb-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              See the Intelligence Dashboard
            </h2>
            <p className="text-cyan-100 mb-6 max-w-md mx-auto">
              Interactive demo with sample Alamance County property data and AI analysis
            </p>
            <Link
              href="/proposals/alamance-property/demo"
              className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 transition-colors text-lg"
            >
              <Play className="w-5 h-5" />
              Launch Demo
            </Link>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Tech Stack
          </h2>
          <p className="text-slate-400 mb-6">
            AWS-native architecture for scalability and reliability
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { name: "AWS S3", cat: "Storage" },
              { name: "DynamoDB", cat: "Database" },
              { name: "Lambda", cat: "Compute" },
              { name: "Rekognition", cat: "AI" },
              { name: "SageMaker", cat: "ML" },
              { name: "Step Functions", cat: "Orchestration" },
              { name: "QuickSight", cat: "Visualization" },
              { name: "Google Maps API", cat: "Imagery" },
              { name: "GeoPandas", cat: "GIS" },
              { name: "YOLOv8", cat: "Detection" },
            ].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm font-medium bg-slate-800/50 border border-slate-700/50 rounded-lg text-white"
              >
                {tech.name}
                <span className="text-slate-500 ml-2">({tech.cat})</span>
              </span>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8 border-t border-slate-800"
        >
          <p className="text-slate-500 text-sm">
            Prepared by{" "}
            <Link href="/" className="text-white font-medium hover:text-cyan-400 transition-colors">
              AutoFlux
            </Link>{" "}
            &middot; AI Automation Agency
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
