"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search, Camera, ShoppingBag, DollarSign, TrendingUp,
  ArrowRight, Sparkles, Clock, AlertTriangle, Eye,
  BarChart3, Globe, CheckCircle2, Zap, Shield,
  Smartphone, Monitor, Database, CreditCard, Code2,
  Package, Users, PiggyBank, ArrowUpRight, ChevronRight,
  CalendarDays, MessageSquare, Milestone, Star, Tag,
  CircleDollarSign, Receipt, Percent, Target, Layers,
} from "lucide-react";

// ─── Animation helpers ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Data ───────────────────────────────────────────────────────────

const problems = [
  {
    icon: Clock,
    title: "Hours of manual searching",
    desc: "You spend 3+ hours browsing eBay, Amazon, and Facebook just to find one good deal. By the time you find it, someone else already bought it.",
  },
  {
    icon: AlertTriangle,
    title: "No way to price on the spot",
    desc: "You're at a yard sale holding a vintage mixer. Is it worth $20 or $200? You Google it, check eBay sold listings, compare prices, all while the seller waits. You either overpay or walk away from profit.",
  },
  {
    icon: PiggyBank,
    title: "Flipping is a solo game",
    desc: "Every flipper works alone. There's no shared upside, no community earnings, no passive income from the ecosystem you help build.",
  },
];

const solutions = [
  {
    icon: Search,
    title: "AI Deal Finder",
    desc: "Scans eBay and Amazon in real-time, surfaces profitable opportunities with confidence scores. Deals come to you, not the other way around.",
    solves: "Hours of manual searching",
  },
  {
    icon: Camera,
    title: "Smart Scan",
    desc: "Point your phone at any item. AI identifies the exact product, model, SKU and returns market value, quick-flip price, and demand level in seconds. Built for thrift stores and yard sales.",
    solves: "No way to price on the spot",
  },
  {
    icon: DollarSign,
    title: "Profit Pool + Marketplace",
    desc: "Built-in marketplace to sell your finds. Every affiliate click and marketplace sale feeds the Profit Pool. Real money distributed monthly to active members.",
    solves: "Flipping is a solo game",
  },
];

const steps = [
  { num: "01", label: "Scan", desc: "Snap a photo of any item, get instant pricing and profit potential", icon: Camera },
  { num: "02", label: "Find", desc: "Browse AI-curated deals from eBay and Amazon with real profit margins", icon: Search },
  { num: "03", label: "Sell & Earn", desc: "List items, earn from affiliate links, and collect your Profit Pool share", icon: TrendingUp },
];

const techStack = [
  { name: "Next.js", role: "Frontend & App Shell", icon: Monitor },
  { name: "FastAPI (Python)", role: "Backend & AI Logic", icon: Code2 },
  { name: "PostgreSQL", role: "Database", icon: Database },
  { name: "Stripe", role: "$1 Trial, then $49/mo", icon: CreditCard },
  { name: "Claude Vision AI", role: "Smart Scan (Product ID)", icon: Eye },
  { name: "eBay Browse API", role: "Deals + Prices + Affiliates", icon: Globe },
  { name: "Amazon Creators API", role: "Added when Associates qualifies", icon: Package },
  { name: "eBay Partner Network", role: "Affiliate Revenue", icon: CircleDollarSign },
];

const v1Features = [
  "Smart Scan: photo to exact product, model, SKU, prices on eBay (Amazon added when Associates account qualifies)",
  "AI Deal Finder: live deals from eBay with profit margins + confidence scores (Amazon added alongside)",
  "Built-in Marketplace: list items, AI-suggested pricing, 5% transaction fee",
  "Affiliate links: every 'Buy' link earns revenue (eBay Partner Network)",
  "Profit Pool: funded from affiliates + marketplace fees, distributed monthly",
  "$1 trial for 7 days, then $49/mo auto-renew (Stripe) with clear disclosures and one-click cancel",
  "User accounts, profiles, scan history",
  "Revenue dashboard: your Profit Pool + affiliate earnings (no company numbers)",
  "Admin panel: user management, revenue tracking, pool controls",
  "Location-based deal filtering",
  "Deployed and live, ready for real users",
];

const v2Roadmap = [
  {
    feature: "Amazon Integration",
    note: "Amazon's old product API shuts down April 30, 2026. The replacement (Creators API) requires an active Amazon Associates account with 10+ qualifying sales. Once your account qualifies, I add Amazon pricing and deals alongside eBay. Included in the original price, no extra charge.",
    est: "Included",
  },
  {
    feature: "Facebook Marketplace",
    note: "Facebook has no official API. Scraping breaks their Terms of Service and accounts get banned. I'll add this in v2 when there's a reliable, sustainable approach, likely through a third-party data provider.",
    est: "$500–800",
  },
  {
    feature: "Direct In-App Purchasing",
    note: "Buy items directly within SmartFlip instead of redirecting to eBay/Amazon. Requires payment escrow and buyer protection system.",
    est: "$500–800",
  },
  {
    feature: "Native-Like Mobile App (PWA)",
    note: "V1 already works fully in your phone's browser with responsive design and all features accessible. This upgrade adds: install to home screen with a real app icon, push notifications for new deals (\"Sony XM4 for $89 just posted\"), offline access, and background syncing so deals load instantly when you open the app.",
    est: "$650",
  },
  {
    feature: "Walmart + Target + More",
    note: "Additional marketplace integrations. Each marketplace adds a new deal source and affiliate revenue stream.",
    est: "$400–600 each",
  },
];

// ─── Embedded App Previews ──────────────────────────────────────────

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 340 }}>
      <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full" />
      <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0f1a] overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2">
          <span className="text-[10px] text-slate-500">9:41</span>
          <span className="text-[10px] text-slate-500 font-medium">{label}</span>
          <div className="flex gap-1">
            <div className="w-3.5 h-2 rounded-sm bg-slate-600" />
          </div>
        </div>
        <div className="px-4 pb-5">{children}</div>
      </div>
    </div>
  );
}

function ScanPreview() {
  return (
    <PhoneFrame label="SmartFlip">
      {/* Scan result card */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Camera className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Scan Complete</span>
        </div>

        {/* Product image placeholder */}
        <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center border border-white/5">
          <span className="text-4xl">👟</span>
        </div>

        {/* Product info */}
        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold text-white">Air Jordan 4 Retro &apos;Military Black&apos;</h4>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">SKU: CT8527-100</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">HIGH DEMAND</span>
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-slate-800/80 p-2.5 border border-white/5">
            <p className="text-[9px] text-slate-500 mb-0.5">eBay Value</p>
            <p className="text-sm font-bold text-white">$190–220</p>
          </div>
          <div className="rounded-lg bg-slate-800/80 p-2.5 border border-white/5">
            <p className="text-[9px] text-slate-500 mb-0.5">Amazon Value</p>
            <p className="text-sm font-bold text-white">$210–240</p>
          </div>
          <div className="rounded-lg bg-emerald-500/10 p-2.5 border border-emerald-500/20">
            <p className="text-[9px] text-emerald-400/70 mb-0.5">Quick Flip</p>
            <p className="text-sm font-bold text-emerald-400">$170</p>
          </div>
          <div className="rounded-lg bg-slate-800/80 p-2.5 border border-white/5">
            <p className="text-[9px] text-slate-500 mb-0.5">Max Hold</p>
            <p className="text-sm font-bold text-white">$240</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex justify-between px-1">
          <div className="text-center">
            <p className="text-[10px] text-slate-500">Avg Sell Time</p>
            <p className="text-xs font-semibold text-white">3 days</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500">Similar Listings</p>
            <p className="text-xs font-semibold text-white">284</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500">Confidence</p>
            <p className="text-xs font-semibold text-emerald-400">94%</p>
          </div>
        </div>

        {/* Profit highlight */}
        <div className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 p-3 border border-emerald-500/20 text-center">
          <p className="text-[10px] text-emerald-400/80 mb-0.5">If you bought this for $40</p>
          <p className="text-lg font-bold text-emerald-400">+$130–200 profit</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function DealFinderPreview() {
  const deals = [
    { emoji: "🎧", name: "Sony WH-1000XM4", source: "eBay", buy: 89, sell: 179, margin: 50, confidence: 94, time: "2 min ago" },
    { emoji: "🎮", name: "Nintendo Switch OLED", source: "Amazon", buy: 195, sell: 310, margin: 37, confidence: 91, time: "5 min ago" },
    { emoji: "📷", name: "Canon EOS R6 Body", source: "eBay", buy: 850, sell: 1350, margin: 37, confidence: 85, time: "12 min ago" },
  ];

  return (
    <PhoneFrame label="Deal Finder">
      <div className="space-y-3">
        {/* Filter bar */}
        <div className="flex gap-1.5 overflow-hidden">
          {["All", "Electronics", "Sneakers", "Gaming"].map((cat, i) => (
            <span
              key={cat}
              className={`text-[9px] px-2.5 py-1 rounded-full whitespace-nowrap ${i === 0 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400">47 live deals</span>
          <span className="text-[10px] text-slate-600 ml-auto">{">"} 30% margin</span>
        </div>

        {/* Deal cards */}
        {deals.map((d, i) => (
          <div key={i} className="rounded-xl bg-slate-800/60 p-3 border border-white/5 space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="text-2xl">{d.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{d.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] text-slate-500">{d.source}</span>
                  <span className="text-[9px] text-slate-600">{d.time}</span>
                </div>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">{d.confidence}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-[8px] text-slate-500">BUY</p>
                  <p className="text-xs font-medium text-white">${d.buy}</p>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <div>
                  <p className="text-[8px] text-slate-500">SELL</p>
                  <p className="text-xs font-medium text-emerald-400">${d.sell}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-slate-500">PROFIT</p>
                <p className="text-xs font-bold text-emerald-400">+${d.sell - d.buy}</p>
              </div>
            </div>
            <button className="w-full text-[10px] py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20 flex items-center justify-center gap-1">
              Buy on {d.source} <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function MarketplacePreview() {
  return (
    <PhoneFrame label="Earnings">
      <div className="space-y-3">
        {/* Earnings header */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 p-4 border border-emerald-500/20">
          <p className="text-[10px] text-emerald-400/70 mb-1">Your Earnings This Month</p>
          <p className="text-2xl font-bold text-white">$47.80</p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-[9px] text-slate-400">Profit Pool</p>
              <p className="text-xs font-semibold text-emerald-400">$32.40</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400">Affiliate</p>
              <p className="text-xs font-semibold text-emerald-400">$15.40</p>
            </div>
          </div>
        </div>

        {/* Profit Pool breakdown */}
        <div className="rounded-xl bg-slate-800/60 p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium text-white">Profit Pool</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Total Pool</span>
              <span className="text-white font-medium">$18,750</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Active Members</span>
              <span className="text-white font-medium">1,284</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Your Share</span>
              <span className="text-emerald-400 font-medium">$32.40</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-1">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
            </div>
          </div>
        </div>

        {/* Recent marketplace listing */}
        <div className="rounded-xl bg-slate-800/60 p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium text-white">Your Listings</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 ml-auto">3 active</span>
          </div>
          <div className="space-y-2">
            {[
              { emoji: "👟", name: "Air Jordan 4 Military Black", price: 195, views: 48 },
              { emoji: "🎧", name: "Sony WH-1000XM4", price: 165, views: 23 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50">
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-white truncate">{item.name}</p>
                  <p className="text-[9px] text-slate-500">{item.views} views</p>
                </div>
                <p className="text-xs font-semibold text-emerald-400">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Milestone Section Component ────────────────────────────────────

interface MilestoneData {
  num: number;
  tag: string;
  title: string;
  price: string;
  days: string;
  scenario: string;
  deliverables: string[];
  preview: React.ReactNode;
}

function MilestoneSection({ data, reverse }: { data: MilestoneData; reverse?: boolean }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {/* Milestone header */}
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-white text-sm font-bold">
              {data.num}
            </div>
            <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">{data.tag}</span>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-slate-500">{data.days}</span>
              <span className="text-sm font-semibold text-white">{data.price}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{data.title}</h2>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-12 items-start ${reverse ? "lg:direction-rtl" : ""}`}>
          {/* Scenario + deliverables */}
          <motion.div variants={fadeUp} className={reverse ? "lg:order-2" : ""} style={{ direction: "ltr" }}>
            {/* Scenario - "what you do" */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">What you&apos;ll do, Justin</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{data.scenario}</p>
            </div>

            {/* Deliverables */}
            <div className="space-y-2.5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">What I deliver</p>
              {data.deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{d}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* App preview */}
          <motion.div variants={fadeUp} className={reverse ? "lg:order-1" : ""} style={{ direction: "ltr" }}>
            {data.preview}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Milestones Data ────────────────────────────────────────────────

const milestones: MilestoneData[] = [
  {
    num: 1,
    tag: "Scan & Price",
    title: "You snap a photo, AI tells you the profit",
    price: "$1,000",
    days: "Days 1-5",
    scenario:
      "You're at a yard sale. You spot a pair of Air Jordans on the shelf for $40. You pull out your phone, open SmartFlip, snap a photo. Seconds later, the app tells you: \"Air Jordan 4 Retro Military Black, SKU CT8527-100. eBay value: $190-220. Quick flip: $170. Demand: High. Sells in ~3 days.\" You buy them on the spot. That's $130-170 profit from one photo. You can do this with anything. Sneakers, electronics, vintage furniture, kitchen gear. Walk into any thrift store or yard sale with confidence.",
    deliverables: [
      "Working web app with user accounts and authentication",
      "Smart Scan: photo upload to Claude Vision AI identifies product, brand, model, SKU",
      "Cross-platform pricing: eBay Browse API for market value lookup (Amazon added when Associates account qualifies)",
      "Scan results: quick-flip price, max-hold price, demand level, avg days to sell, similar listings count",
      "Scan history: every item you've ever scanned, saved to your account",
      "Responsive UI: works on your phone's browser at a thrift store",
      "PostgreSQL database with user and scan data",
    ],
    preview: <ScanPreview />,
  },
  {
    num: 2,
    tag: "Find Deals",
    title: "Deals come to you, not the other way around",
    price: "$1,000",
    days: "Days 6-10",
    scenario:
      "You're on your couch on a Tuesday evening. You open SmartFlip and see 47 live deals the AI found while you were at work. You filter: Electronics, >30% margin, within 50 miles. There's a Sony WH-1000XM4 listed on eBay for $89, sells for $179, 50% margin, 94% confidence score. You tap \"Buy on eBay\" and the link takes you straight to the listing. You just found a $90 profit deal in moments. And that click? It was an affiliate link. It just earned revenue that flows into the Profit Pool. You're making money even when you're browsing.",
    deliverables: [
      "AI Deal Finder: scans eBay in real-time for underpriced items (Amazon added when Associates account qualifies)",
      "Deal scoring algorithm: profit margin, confidence score, demand level, time sensitivity",
      "Category and location filtering: find deals near you or nationwide",
      "Every \"Buy\" link is an affiliate link (eBay Partner Network), earns revenue automatically",
      "Amazon price comparison: added once your Amazon Associates account has 10+ qualifying sales",
      "Dashboard with deal stats: active deals, avg profit margin, total opportunities",
      "Auto-refresh: new deals appear throughout the day via background scanning",
    ],
    preview: <DealFinderPreview />,
  },
  {
    num: 3,
    tag: "Sell & Earn",
    title: "List, sell, and watch your earnings grow",
    price: "$800",
    days: "Days 11-15",
    scenario:
      "You flipped 5 items this week. Now you want to sell them. You open SmartFlip's marketplace, tap \"New Listing\" and the AI auto-fills the title, description, and suggested price based on your scan data. Your Air Jordans go live at $195. Other SmartFlip users see them. Meanwhile, you check your earnings tab: $32.40 from the Profit Pool, $15.40 from affiliate clicks. That's $47.80 in passive income this month, on top of your flip profits. Your friend signs up through your link, pays $1 for a trial, and auto-renews at $49/mo next week.",
    deliverables: [
      "Built-in marketplace: create listings with AI-suggested pricing from scan data",
      "5% transaction fee on completed sales (listing is free)",
      "Profit Pool system: funded from affiliate revenue + marketplace fees, never from subscriptions",
      "Revenue dashboard: shows your Profit Pool share + affiliate earnings only (no company numbers)",
      "Stripe billing: $1 trial for 7 days, auto-renews to $49/mo, cancel anytime",
      "Admin panel: user management, revenue tracking, Profit Pool controls, payout history",
      "Full deployment: live and ready for real users",
    ],
    preview: <MarketplacePreview />,
  },
];

// ─── Main Proposal Page ─────────────────────────────────────────────

export default function SmartFlipProposal() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" /> MVP Proposal · Justin Connell
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Smart<span className="text-emerald-400">Flip</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              Your AI-powered flipping assistant. Scan any item, find underpriced deals,
              sell on a built-in marketplace, and earn passive income through the Profit Pool.
            </p>
            <p className="text-sm text-slate-500 mb-10">
              Built by Vladimir Ilin · AutoFlux · March 2026
            </p>
            <Link
              href="/proposals/smartflip/demo"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition text-sm shadow-lg shadow-emerald-500/20"
            >
              Try the Interactive Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">The problem</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Flipping is profitable. The process isn&apos;t.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">The solution</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">SmartFlip solves all three</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-emerald-500/[0.08] relative"
                >
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400/60">
                      Solves: {s.solves}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Three steps. One app.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">{s.num}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">{s.label}</h3>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── MILESTONES HEADER ─── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-8 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">The plan</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">3 milestones. Each one you can touch.</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Every milestone delivers a working product you can open, test, and use.
            No black boxes. You see exactly what you&apos;re getting at each stage.
          </p>
        </motion.div>
      </section>

      {/* ─── MILESTONE 1, 2, 3 ─── */}
      {milestones.map((m, i) => (
        <MilestoneSection key={m.num} data={m} reverse={i % 2 === 1} />
      ))}

      {/* ─── DIVIDER ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ─── WHAT'S IN V1 / V2 ROADMAP ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* V1 */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold">What&apos;s in V1</h3>
                <span className="text-xs text-emerald-400 ml-2">Included in $3,500</span>
              </div>
              <div className="space-y-2.5">
                {v1Features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* V2 Roadmap */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold">V2 Roadmap</h3>
                <span className="text-xs text-slate-500 ml-2">Future add-ons</span>
              </div>
              <div className="space-y-4">
                {v2Roadmap.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-semibold text-white">{item.feature}</h4>
                      <span className="text-[10px] text-slate-500">{item.est}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Under the hood</span>
            <h2 className="text-3xl font-bold mt-3">Tech Stack & API Costs</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {techStack.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]">
                  <Icon className="w-5 h-5 text-emerald-400 mb-2" />
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.role}</p>
                </div>
              );
            })}
          </motion.div>
          <motion.div variants={fadeUp} className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center">
            <p className="text-sm text-slate-300">
              <span className="text-emerald-400 font-semibold">API costs at launch: ~$10–15/month.</span>{" "}
              eBay Browse API is free (5,000 calls/day). Claude Vision AI is ~$0.004 per scan.
              Stripe charges standard 2.9% + $0.30 per transaction. Everything else is included in hosting.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PROFIT POOL EXPLAINED ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">The Profit Pool</span>
            <h2 className="text-3xl font-bold mt-3">How it works and why it&apos;s sustainable</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]">
              <CircleDollarSign className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-semibold text-white mb-2">Where the money comes from</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The pool is funded from two sources only: affiliate commissions (every &quot;Buy on eBay&quot; click) and
                marketplace transaction fees (5% on completed sales). Subscription revenue ($49/mo) goes to operating
                costs, never into the pool.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]">
              <Percent className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-semibold text-white mb-2">How it&apos;s split</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                30% of affiliate revenue + 15% of marketplace fees flow into the pool each month.
                Distribution is proportional to your activity: items sold, deals bought, and marketplace
                engagement. More active = bigger share.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06]">
              <Shield className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="text-sm font-semibold text-white mb-2">Why it can&apos;t fail</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The pool is self-correcting: if affiliate revenue drops, payouts shrink proportionally.
                If it grows, payouts grow. There&apos;s no fixed promise, only a share of real revenue.
                I&apos;ll stress-test the formula before launch with simulated loads.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="p-5 rounded-2xl bg-slate-800/40 border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-3">Example at scale (1,000 subscribers)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-[10px] text-slate-500">Monthly Affiliate Revenue</p>
                <p className="text-lg font-bold text-white">$6,250</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Marketplace Fees</p>
                <p className="text-lg font-bold text-white">$5,000</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Monthly Pool</p>
                <p className="text-lg font-bold text-emerald-400">$2,625</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Avg User Payout</p>
                <p className="text-lg font-bold text-emerald-400">$6–15/mo</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Investment</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">$2,800 flat, everything included</h2>
            <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">
              Flat price with clear milestones. You see working software after each milestone.
              No hourly billing, no surprises, no scope creep.
            </p>
          </motion.div>

          {/* Milestone pricing cards */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4 mb-8">
            {milestones.map((m) => (
              <div key={m.num} className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b]/60 border border-white/[0.06] text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-bold text-emerald-400">M{m.num}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{m.tag}</h4>
                <p className="text-[11px] text-slate-500 mb-3">{m.days}</p>
                <p className="text-2xl font-bold text-white">{m.price}</p>
              </div>
            ))}
          </motion.div>

          {/* Total */}
          <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 border border-emerald-500/15 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div>
                <p className="text-sm text-slate-400">Total Investment</p>
                <p className="text-4xl font-bold text-white">$2,800</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-sm text-slate-400">Timeline</p>
                <p className="text-4xl font-bold text-white">15 days</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-sm text-slate-400">Milestones</p>
                <p className="text-4xl font-bold text-white">3</p>
              </div>
            </div>
          </motion.div>

          {/* Context */}
          <motion.div variants={fadeUp} className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-white/5">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              For context: Tactical Arbitrage charges $129/mo and only searches Amazon.
              Underpriced AI charges $49/mo for 300 scans. SmartFlip does more, across more platforms,
              and includes a marketplace + profit pool. You own 100% of the code.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── WHAT HAPPENS NEXT ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Next steps</span>
            <h2 className="text-3xl font-bold mt-3">What happens next</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto space-y-6">
            {[
              {
                icon: MessageSquare,
                title: "We align on scope",
                desc: "You review this proposal. If anything needs adjusting (features, pricing, timeline) I'll update it same day. Once we're aligned, I start immediately.",
              },
              {
                icon: Milestone,
                title: "I build, you test",
                desc: "After each milestone (every ~5 days), I send you a live link. You open it, test it, give feedback. I fix anything before moving to the next milestone.",
              },
              {
                icon: CalendarDays,
                title: "Launch in 3 weeks",
                desc: "After Milestone 3, SmartFlip is live. Real users can sign up, scan items, find deals, and earn from the Profit Pool. I handle deployment and make sure everything runs smooth.",
              },
              {
                icon: Zap,
                title: "Iterate fast",
                desc: "After launch, I'm available for V2 add-ons: Facebook Marketplace, mobile app, direct purchasing, additional marketplaces. We grow it based on what real users need.",
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-sm text-slate-500">Built for Justin Connell · March 2026</p>
        <p className="text-xs text-slate-600 mt-1">Vladimir Ilin · AutoFlux</p>
      </footer>
    </div>
  );
}
