"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, LayoutGrid, Database } from "lucide-react";
import { useTrackSection } from "@/hooks/use-track-section";

const capabilities = [
  {
    icon: Users,
    title: "Lead Gen & Sales Teams",
    items: [
      "Automated scraping, enrichment, and CRM sync",
      "Instant lead routing and qualification pipelines",
      "Call analysis, scorecards, and rep coaching",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growth & Marketing Ops",
    items: [
      "Multi-source data pipelines (Maps, Instagram, ads)",
      "Automated creative production (TikTok, ad variants)",
      "Competitor intelligence dashboards",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Service & Agency Operations",
    items: [
      "Automated reporting (daily/weekly/monthly)",
      "Client deliverable pipelines",
      "Unified dashboards from fragmented tools",
    ],
  },
  {
    icon: Database,
    title: "Any Team With Fragmented Data",
    items: [
      "Cross-platform integrations (GHL, HubSpot, BigQuery)",
      "LLM-powered insights from raw transcripts",
      "Custom AI copilots tailored to your logic",
    ],
  },
];

export function WhoWeServe() {
  const sectionRef = useTrackSection("who-we-serve");

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="who-we-serve"
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-[var(--text-light)] rounded-[var(--radius-xl)] p-6 md:p-10 mb-8"
    >
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <span className="inline-block text-[0.85rem] font-bold uppercase tracking-widest text-[var(--accent)] bg-[var(--primary)] border-2 border-[var(--accent)] px-4 py-2 rounded-full mb-4">
          Who We Serve
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          Built for teams drowning in manual work and messy data
        </h2>
        <p className="text-white/90 text-lg">
          Whether you&apos;re a growth team, agency, or ops leader, if your
          processes are spreadsheet-driven and you&apos;re losing deals to slow
          follow-up—we can help.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {capabilities.map((cap, index) => (
          <motion.article
            key={cap.title}
            className="glow-card bg-white/[0.08] border border-white/10 rounded-[var(--radius-lg)] p-6 transition-all duration-300 hover:bg-white/[0.12] hover:border-[var(--accent)]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-[var(--accent)] rounded-[var(--radius-md)] flex items-center justify-center mb-5">
              <cap.icon className="w-6 h-6 text-[var(--primary)]" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>

            {/* List */}
            <ul className="space-y-2">
              {cap.items.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-white/85 pl-5 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--accent)] before:font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
