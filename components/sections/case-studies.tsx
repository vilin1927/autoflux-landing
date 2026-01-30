"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Carousel3D } from "@/components/animated/carousel-3d";
import { cn } from "@/lib/utils";
import { GradientBackground } from "@/components/ui/gradient-background";
import { TrackedLink, TrackedCaseStudyLink } from "@/components/ui/tracked-link";
import { analytics } from "@/providers/posthog-provider";
import { useTrackSection } from "@/hooks/use-track-section";
import {
  Video,
  UserPlus,
  Phone,
  Search,
  Activity,
  FileText,
  Mic,
  ShoppingCart,
  MessageSquare,
  Instagram,
  Code,
} from "lucide-react";

// Case studies data
const caseStudies = [
  {
    slug: "tiktok-slideshow-automation",
    title: "TikTok Slideshow Automation Platform",
    description:
      "AI-powered creative production: scrapes viral TikTok slideshows, analyzes patterns with GPT, and generates multiple text/image variants.",
    category: "creative",
    tag: "Creative Automation",
    metric: { number: "60 → 15 min", label: "Per campaign creative time" },
    tools: ["n8n", "OpenAI GPT", "TikTok API"],
    icon: Video,
    gradient: "from-green-100 to-green-200",
  },
  {
    slug: "wellness-vet-lead-enrichment",
    title: "Multi-Source Lead Enrichment Pipeline",
    description:
      "Scrapes businesses from Google Maps + Yelp, normalizes data, enriches contacts with emails + firmographics, and outputs clean leads.",
    category: "lead-gen",
    tag: "Lead Gen",
    metric: { number: "3,000+", label: "Enriched, verified contacts delivered" },
    tools: ["Apify", "Google Maps", "Snov.io"],
    icon: UserPlus,
    gradient: "from-blue-100 to-blue-200",
  },
  {
    slug: "sales-call-analysis-automation",
    title: "AI-Powered Call Analysis & Coaching",
    description:
      "Watches Google Drive for call transcripts, generates LLM scorecards, writes to BigQuery, and syncs into GoHighLevel CRM.",
    category: "sales-ops",
    tag: "Sales Ops",
    metric: { number: "45 → 5 min", label: "Call review time per recording" },
    tools: ["OpenAI", "BigQuery", "GoHighLevel"],
    icon: Phone,
    gradient: "from-orange-100 to-orange-200",
  },
  {
    slug: "vet-clinic-competitor-intelligence",
    title: "Vet Clinic Competitor Intelligence Tool",
    description:
      "Input: clinic website. Output: interactive map + dashboard showing competitors in 20-mile radius, review analysis, and ad presence.",
    category: "intel",
    tag: "Competitive Intelligence",
    metric: { number: "1-click", label: "Competitive landscape in seconds" },
    tools: ["n8n", "Lovable", "Google Maps"],
    icon: Search,
    gradient: "from-purple-100 to-purple-200",
  },
  {
    slug: "lead-gen-automation-pipeline",
    title: "Spec-Driven Lead Gen Pipeline",
    description:
      "Scrapes sites & Instagram, applies hard ICP filters + tier logic, enriches via Snov/Dropcontact, and creates contacts in HubSpot.",
    category: "lead-gen",
    tag: "End-to-End Automation",
    metric: { number: "Zero guesswork", label: "Sheet → scrape → tier → CRM" },
    tools: ["Apify", "Snov.io", "HubSpot"],
    icon: Activity,
    gradient: "from-cyan-100 to-cyan-200",
  },
  {
    slug: "automated-reporting-masterleads",
    title: "Automated Reporting from MongoDB",
    description:
      "Pulls communication data from MongoDB, aggregates by owner/channel/status, and sends Excel/CSV reports daily, weekly, monthly.",
    category: "reporting",
    tag: "Reporting & Analytics",
    metric: { number: "100%", label: "Zero manual reporting work" },
    tools: ["MongoDB", "n8n", "Excel/CSV"],
    icon: FileText,
    gradient: "from-pink-100 to-pink-200",
  },
  {
    slug: "voice-ai-receptionist",
    title: "24/7 Voice AI Receptionist",
    description:
      "Answers calls 24/7, qualifies patients, books appointments directly into practice management software. Handles emergencies autonomously.",
    category: "cx",
    tag: "CX Automation",
    metric: { number: "40% → 3%", label: "Missed call rate reduction" },
    tools: ["Vapi", "Twilio", "GoHighLevel"],
    icon: Mic,
    gradient: "from-indigo-100 to-indigo-200",
  },
  {
    slug: "shopify-order-fulfillment",
    title: "Shopify Order-to-Fulfillment Automation",
    description:
      'Syncs Shopify orders with 3PL warehouse, auto-updates inventory levels, triggers restock alerts, and resolves 83% of "where\'s my order" tickets.',
    category: "ecommerce",
    tag: "E-commerce Ops",
    metric: { number: "500+", label: "Orders/day with zero manual touch" },
    tools: ["Shopify", "ShipBob", "Gorgias"],
    icon: ShoppingCart,
    gradient: "from-yellow-100 to-yellow-200",
  },
  {
    slug: "saas-onboarding-agent",
    title: "AI Onboarding Agent for B2B SaaS",
    description:
      "Guides new users through setup via in-app chat, answers product questions from docs, triggers intervention emails for at-risk accounts.",
    category: "saas",
    tag: "SaaS Growth",
    metric: { number: "40% → 68%", label: "Day-30 trial retention" },
    tools: ["Claude API", "Intercom", "Segment"],
    icon: MessageSquare,
    gradient: "from-sky-100 to-sky-200",
  },
  {
    slug: "instagram-dm-qualification",
    title: "Instagram DM Lead Qualification Bot",
    description:
      "Monitors DMs 24/7, qualifies leads with natural conversation, books calls directly into Calendly, syncs qualified prospects to GoHighLevel.",
    category: "lead-gen",
    tag: "Lead Gen",
    metric: { number: "3x", label: "Booked calls from same DM volume" },
    tools: ["Instagram API", "OpenAI GPT", "Calendly"],
    icon: Instagram,
    gradient: "from-lime-100 to-lime-200",
  },
  {
    slug: "vibe-coding-mvp",
    title: "2-Week MVP Development with Claude Code",
    description:
      "Rapidly prototyped and deployed a functional SaaS MVP—auth, dashboard, API integrations, billing—in 14 days using AI-assisted methodology.",
    category: "vibe-coding",
    tag: "Vibe Coding",
    metric: { number: "10 → 2 weeks", label: "MVP delivery time" },
    tools: ["Claude Code", "Cursor", "Supabase"],
    icon: Code,
    gradient: "from-gray-100 to-gray-200",
  },
];

const categories = [
  { slug: "all", label: "All" },
  { slug: "lead-gen", label: "Lead Gen" },
  { slug: "sales-ops", label: "Sales Ops" },
  { slug: "creative", label: "Creative" },
  { slug: "cx", label: "CX Automation" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "saas", label: "SaaS Growth" },
  { slug: "intel", label: "Competitive Intel" },
  { slug: "reporting", label: "Reporting" },
  { slug: "vibe-coding", label: "Vibe Coding" },
];

export function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useTrackSection("case-studies");

  const filteredCases = useMemo(() => {
    if (activeCategory === "all") return caseStudies;
    return caseStudies.filter((cs) => cs.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="case-studies"
      className="gradient-bg bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-6 md:p-10 mb-8"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="eyebrow mb-4 inline-block">Case Studies</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)] mb-3 leading-tight">
          Real automations, real results—profit-first builds that pay for
          themselves
        </h2>
        <p className="text-[var(--text-muted)] text-lg">
          These aren&apos;t vanity metrics. Every system below saved measurable
          time, unlocked revenue, or cut costs within weeks of launch.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug);
              analytics.filterClick(cat.label);
            }}
            className={cn(
              "px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap",
              activeCategory === cat.slug
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-[var(--bg-light)] text-[var(--text-muted)] border-[var(--border-light)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3D Carousel */}
      <Carousel3D
        items={filteredCases}
        renderItem={(cs, index, isActive) => (
          <CaseStudyCard caseStudy={cs} isActive={isActive} />
        )}
        className="mb-8"
        trackingName="case-studies"
      />

      {/* CTA */}
      <div className="text-center mt-12">
        <Button asChild variant="lime" className="animate-pulse-glow">
          <TrackedLink
            href="#contact"
            trackingName="Get Your Free Automation Blueprint"
            trackingLocation="case-studies"
          >
            Get Your Free Automation Blueprint
          </TrackedLink>
        </Button>
        <p className="mt-4 text-[var(--text-muted)] text-sm">
          See exactly which automations would save you the most time and money.
        </p>
      </div>
    </section>
  );
}

// Card component for the carousel
function CaseStudyCard({
  caseStudy: cs,
  isActive,
}: {
  caseStudy: (typeof caseStudies)[0];
  isActive: boolean;
}) {
  return (
    <TrackedCaseStudyLink
      href={`/cases/${cs.slug}`}
      slug={cs.slug}
      title={cs.title}
      className={cn(
        "glow-card block h-full bg-white border rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300",
        isActive
          ? "border-[var(--accent)] shadow-[var(--shadow-xl)]"
          : "border-[var(--border-light)] shadow-[var(--shadow-md)]"
      )}
    >
      {/* Visual */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <GradientBackground className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] flex items-center justify-center">
            <cs.icon className="w-7 h-7 md:w-8 md:h-8 text-[var(--primary)]" />
          </div>
        </GradientBackground>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <span className="inline-block px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--primary)] bg-[rgba(30,27,75,0.08)] rounded-[var(--radius-sm)] mb-2">
          {cs.tag}
        </span>
        <h3 className="text-base md:text-lg font-bold text-[var(--text-dark)] mb-2 leading-tight line-clamp-2">
          {cs.title}
        </h3>
        <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">
          {cs.description}
        </p>

        {/* Metric */}
        <div className="pt-3 border-t border-[var(--border-light)]">
          <p className="text-xl md:text-2xl font-extrabold text-[var(--primary)]">
            {cs.metric.number}
          </p>
          <p className="text-[0.65rem] md:text-xs text-[var(--text-muted)]">
            {cs.metric.label}
          </p>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1 mt-3">
          {cs.tools.slice(0, 3).map((tool) => (
            <span
              key={tool}
              className="px-2 py-0.5 text-[0.6rem] md:text-[0.65rem] font-medium text-[var(--text-muted)] bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-sm)]"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Learn More */}
        <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-[var(--primary)] underline underline-offset-2 hover:text-[var(--accent)] transition-colors">
          Learn more
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </TrackedCaseStudyLink>
  );
}
