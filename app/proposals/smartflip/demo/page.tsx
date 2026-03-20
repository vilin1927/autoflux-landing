"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Search, Camera, ShoppingBag, DollarSign, TrendingUp,
  ChevronRight, ArrowUp, MapPin, Truck, Eye, Heart,
  Upload, Sparkles, Clock, Star, BarChart3, Users,
  Zap, Target, Shield, CheckCircle2, ArrowUpRight,
  ArrowLeft, Package, Flame, Tag, PiggyBank, Percent,
  ExternalLink, Info, Flag, ChevronDown,
} from "lucide-react";
import {
  deals, scanResults, listings, dashboardKPIs, profitPool, userEarnings, categories,
  type Deal, type ScanResult, type EarningsData, type ProfitPoolData,
} from "@/data/proposals/smartflip";

// ============================================================
// Types
// ============================================================
type View = "dashboard" | "deals" | "scan" | "marketplace" | "earnings";

const navItems = [
  { key: "dashboard" as View, label: "Dashboard", icon: LayoutGrid },
  { key: "deals" as View, label: "Deal Finder", icon: Search },
  { key: "scan" as View, label: "Smart Scan", icon: Camera },
  { key: "marketplace" as View, label: "Marketplace", icon: ShoppingBag },
  { key: "earnings" as View, label: "Earnings", icon: DollarSign },
];

// ============================================================
// Shared Components
// ============================================================
function GlassCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] backdrop-blur-xl rounded-2xl ${onClick ? "cursor-pointer hover:border-white/[0.12] transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function KPICard({ label, value, suffix, color, sub, icon: Icon }: {
  label: string; value: string | number; suffix?: string; color: string; sub?: string; icon?: React.ElementType;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{label}</p>
        {Icon && <Icon className={`w-4 h-4 ${color}`} />}
      </div>
      <div className="flex items-end gap-1.5">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        {suffix && <span className="text-sm text-slate-500 mb-0.5">{suffix}</span>}
      </div>
      {sub && <p className="text-[11px] text-slate-500 mt-1.5">{sub}</p>}
    </GlassCard>
  );
}

function ConfidenceBadge({ score }: { score: number }) {
  const color = score >= 90 ? "bg-emerald-500/15 text-emerald-400" :
    score >= 80 ? "bg-cyan-500/15 text-cyan-400" :
    score >= 70 ? "bg-amber-500/15 text-amber-400" :
    "bg-rose-500/15 text-rose-400";
  return <span className={`${color} px-2 py-0.5 rounded-full text-[11px] font-medium`}>{score}%</span>;
}

function DemandBadge({ level }: { level: string }) {
  const color = level === "High" ? "bg-emerald-500/15 text-emerald-400" :
    level === "Medium" ? "bg-amber-500/15 text-amber-400" :
    "bg-slate-500/15 text-slate-400";
  return <span className={`${color} px-2 py-0.5 rounded-full text-[11px] font-medium`}>{level}</span>;
}

function SourceBadge({ source }: { source: string }) {
  const color = source === "eBay" ? "bg-blue-500/15 text-blue-400" : "bg-orange-500/15 text-orange-400";
  return <span className={`${color} px-2 py-0.5 rounded-full text-[10px] font-medium`}>{source}</span>;
}

function ProductEmoji({ emoji }: { emoji: string }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xl shrink-0 shadow-lg shadow-black/20">
      {emoji}
    </div>
  );
}

function ProductEmojiLarge({ emoji, showDemoWatermark = false }: { emoji: string; showDemoWatermark?: boolean }) {
  return (
    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg shadow-black/30">
      <span className="text-4xl">{emoji}</span>
      {showDemoWatermark && (
        <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white/20 uppercase tracking-wider">DEMO</span>
      )}
    </div>
  );
}

// ============================================================
// Dashboard View
// ============================================================
function DashboardView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const k = dashboardKPIs;
  const topDeals = deals.filter(d => d.trending).slice(0, 4);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">SmartFlip Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Your AI-powered flipping command center</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KPICard label="Active Deals" value={k.activeDeals} color="text-emerald-400" icon={Zap} sub="Found today" />
        <KPICard label="Avg Margin" value={k.avgProfitMargin} suffix="%" color="text-cyan-400" icon={TrendingUp} sub="+5% vs last week" />
        <KPICard label="Your Earnings" value={`$${k.monthlyEarnings}`} color="text-emerald-400" icon={DollarSign} sub="Pool + referrals" />
        <KPICard label="Items Listed" value={k.itemsListed} color="text-white" icon={Package} sub="3 selling fast" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Trending Deals */}
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-semibold text-white">Trending Deals</h2>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 ml-6">High demand + selling fast + strong margin</p>
            </div>
            <button onClick={() => onNavigate("deals")} className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {topDeals.map(d => (
              <button
                key={d.id}
                onClick={() => onNavigate("deals")}
                className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-white/[0.02] transition w-full text-left cursor-pointer"
              >
                <ProductEmoji emoji={d.image} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{d.title}</span>
                    <ConfidenceBadge score={d.confidence} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <SourceBadge source={d.source} />
                    <span className="text-[10px] text-slate-500">Buy ${d.buyPrice}</span>
                    <span className="text-[10px] text-emerald-400/60">Sell on {d.sellPlatform} ${d.sellPrice}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-emerald-400">+${d.profit}</p>
                  <p className="text-[9px] text-slate-500">{d.recentlySoldSource}</p>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Earnings Summary */}
        <div className="space-y-5">
          <GlassCard className="overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">Your Earnings</h2>
              </div>
              <button onClick={() => onNavigate("earnings")} className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1">Details <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">${userEarnings.earnedThisMonth}</p>
                <p className="text-[11px] text-slate-500 mt-1">This month</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <PiggyBank className="w-3 h-3" /> Base Pool
                  </span>
                  <span className="text-xs font-medium text-emerald-400">${userEarnings.basePoolShare}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Target className="w-3 h-3" /> Growth Pool
                  </span>
                  <span className="text-xs font-medium text-cyan-400">${userEarnings.growthPoolShare}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[11px] text-slate-500">All time</span>
                <span className="text-xs font-medium text-emerald-400">${userEarnings.totalEarnedAllTime}</span>
              </div>
            </div>
          </GlassCard>

          {/* Membership */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-white">Membership</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Plan</span>
                <span className="text-white font-medium">SmartFlip Pro</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Price</span>
                <span className="text-white font-medium">$49/mo</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Trial</span>
                <span className="text-slate-500">$1 for 7 days, then $49/mo</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Deal Finder View
// ============================================================
function DealFinderView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"profit" | "confidence" | "margin">("profit");
  const [conditionFilter, setConditionFilter] = useState<"all" | "Used" | "New">("all");
  const [budgetMax, setBudgetMax] = useState<number>(0);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const filtered = deals
    .filter(d => searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(d => selectedCategory === "All" || d.category === selectedCategory)
    .filter(d => conditionFilter === "all" || d.condition === conditionFilter || (conditionFilter === "Used" && (d.condition === "Used" || d.condition === "Like New" || d.condition === "Refurbished")))
    .filter(d => budgetMax === 0 || d.buyPrice <= budgetMax)
    .sort((a, b) => sortBy === "profit" ? b.profit - a.profit : sortBy === "confidence" ? b.confidence - a.confidence : b.margin - a.margin);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Deal Finder</h1>
        <p className="text-slate-400 text-sm mt-1">Real arbitrage across eBay, Amazon, and Facebook. Buy here, sell there.</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for specific items..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f172a]/60 border border-white/[0.06] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/30 transition"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-1 bg-[#0f172a]/60 border border-white/[0.06] rounded-xl px-1 py-1 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${selectedCategory === cat ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-[#0f172a]/60 border border-white/[0.06] rounded-xl px-1 py-1 ml-auto">
          {(["profit", "confidence", "margin"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize ${sortBy === s ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Location indicator */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[11px] text-slate-400">
          Showing deals near: <span className="text-white font-medium">Los Angeles, CA</span>{" "}
          <span className="text-emerald-400 hover:underline cursor-pointer transition">(change)</span>
        </span>
      </div>

      {/* Condition + Budget filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-1 bg-[#0f172a]/60 border border-white/[0.06] rounded-xl px-1 py-1">
          {(["all", "Used", "New"] as const).map(c => (
            <button
              key={c}
              onClick={() => setConditionFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${conditionFilter === c ? "bg-amber-500/20 text-amber-400" : "text-slate-400 hover:text-white"}`}
            >
              {c === "all" ? "All Conditions" : c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-[#0f172a]/60 border border-white/[0.06] rounded-xl px-2 py-1">
          <span className="text-[11px] text-slate-500 font-medium">Budget:</span>
          {[0, 50, 100, 200, 500].map(b => (
            <button
              key={b}
              onClick={() => setBudgetMax(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${budgetMax === b ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white"}`}
            >
              {b === 0 ? "Any" : `<$${b}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Deals list */}
        <div className="lg:col-span-2">
          <GlassCard className="overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{filtered.length} deals found</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400">Live scanning</span>
              </div>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {filtered.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDeal(d)}
                  className={`flex items-center gap-3.5 px-5 py-4 hover:bg-white/[0.02] transition w-full text-left ${selectedDeal?.id === d.id ? "bg-white/[0.03]" : ""}`}
                >
                  <ProductEmoji emoji={d.image} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{d.title}</span>
                      {d.trending && <Flame className="w-3.5 h-3.5 text-orange-400" />}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <SourceBadge source={d.source} />
                      <span className="text-[10px] text-slate-500">${d.buyPrice}</span>
                      <span className="text-[10px] text-slate-600">sell on {d.sellPlatform}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{d.condition}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5 inline-flex items-center gap-1 hover:text-emerald-400 hover:underline transition cursor-pointer">
                      {d.recentlySoldSource} <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <p className="text-sm font-bold text-emerald-400">+${d.profit}</p>
                    <ConfidenceBadge score={d.confidence} />
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Deal detail */}
        <div>
          <AnimatePresence mode="wait">
            {selectedDeal ? (
              <motion.div
                key={selectedDeal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <GlassCard className="p-5 space-y-5">
                  <div className="text-center flex flex-col items-center">
                    <ProductEmojiLarge emoji={selectedDeal.image} />
                    <h3 className="text-lg font-bold text-white mt-3">{selectedDeal.title}</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <SourceBadge source={selectedDeal.source} />
                      <span className="text-xs text-slate-400">{selectedDeal.category}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{selectedDeal.condition}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1.5 inline-flex items-center gap-1 hover:text-emerald-400 hover:underline transition cursor-pointer">
                      {selectedDeal.recentlySoldSource} <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-rose-500/10 border border-rose-500/10">
                      <p className="text-[10px] text-slate-500 uppercase">Buy on {selectedDeal.source}</p>
                      <p className="text-lg font-bold text-rose-400">${selectedDeal.buyPrice}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                      <p className="text-[10px] text-slate-500 uppercase">Sell on {selectedDeal.sellPlatform}</p>
                      <p className="text-lg font-bold text-emerald-400">${selectedDeal.sellPrice}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/10">
                      <p className="text-[10px] text-slate-500 uppercase">Profit</p>
                      <p className="text-lg font-bold text-cyan-400">${selectedDeal.profit}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Confidence</span>
                      <ConfidenceBadge score={selectedDeal.confidence} />
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedDeal.confidence}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Margin</span>
                      <span className="text-xs font-medium text-emerald-400">{selectedDeal.margin}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</span>
                      <span className="text-xs font-medium text-white">{selectedDeal.location}</span>
                    </div>
                  </div>

                  {/* Affiliate buy button */}
                  <button className="w-full py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition flex items-center justify-center gap-2">
                    Buy on {selectedDeal.source} <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 hover:underline transition cursor-pointer">
                    <ExternalLink className="w-3 h-3" /> View source listing
                  </span>
                  <p className="text-[10px] text-center text-slate-500">Affiliate link, earns revenue for the Profit Pool</p>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassCard className="p-8 text-center">
                  <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Select a deal to see details</p>
                  <p className="text-[11px] text-slate-600 mt-1">Click any deal on the left</p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Smart Scan View — with SKU + dual pricing
// ============================================================
function SmartScanView() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [selectedResult, setSelectedResult] = useState<ScanResult>(scanResults[0]);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2200);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Smart Scan</h1>
        <p className="text-slate-400 text-sm mt-1">Snap a photo at a thrift store or yard sale. AI identifies the product, model, and SKU instantly</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Upload / Scanner */}
        <div className="space-y-5">
          <GlassCard className="p-8">
            {!scanning && !scanned && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Camera className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Upload or take a photo</p>
                  <p className="text-[11px] text-slate-500 mt-1">AI identifies exact model, SKU, and market prices</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button onClick={handleScan} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Image
                  </button>
                  <button onClick={handleScan} className="px-5 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm font-medium hover:bg-white/[0.1] transition flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Take Photo
                  </button>
                </div>
              </motion.div>
            )}

            {scanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-5 py-4"
              >
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto relative">
                  <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50 animate-ping" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Identifying product...</p>
                  <p className="text-[11px] text-slate-500 mt-1">Matching brand, model, SKU across eBay + Amazon</p>
                </div>
                <div className="space-y-2 max-w-xs mx-auto">
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Analyzing image...
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Matching prices...
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}

            {scanned && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-emerald-400">Product identified!</p>
                <p className="text-[11px] text-slate-500">Select an example below to see different scan results</p>
                <button
                  onClick={() => { setScanned(false); setScanning(false); }}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] text-white text-xs font-medium hover:bg-white/[0.1] transition"
                >
                  Scan Another
                </button>
              </motion.div>
            )}
          </GlassCard>

          {/* Example items */}
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-3">Example scans</p>
            <div className="space-y-2">
              {scanResults.map(sr => (
                <GlassCard
                  key={sr.id}
                  onClick={() => { setSelectedResult(sr); setScanned(true); setScanning(false); }}
                  className={`p-4 flex items-center gap-3 ${selectedResult.id === sr.id ? "border-emerald-500/30" : ""}`}
                >
                  <ProductEmoji emoji={sr.image} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{sr.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500">{sr.condition}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${sr.matchType === "exact" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                        {sr.matchType === "exact" ? "EXACT MATCH" : "CLOSEST MATCH"}
                      </span>
                    </div>
                  </div>
                  <DemandBadge level={sr.demandLevel} />
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedResult.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <GlassCard className="p-5 space-y-5">
                <div className="text-center pb-4 border-b border-white/[0.04] flex flex-col items-center">
                  <ProductEmojiLarge emoji={selectedResult.image} />
                  <h3 className="text-lg font-bold text-white mt-3">{selectedResult.title}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                      SKU: {selectedResult.sku}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${selectedResult.matchType === "exact" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                      {selectedResult.matchType === "exact" ? "EXACT MATCH" : "CLOSEST MATCH"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">{selectedResult.condition} · {selectedResult.category}</p>
                </div>

                {/* Dual platform pricing */}
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Market Value</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/10">
                      <p className="text-[10px] text-blue-400/70">eBay</p>
                      <p className="text-xl font-bold text-blue-400">${selectedResult.ebayPrice}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-orange-500/10 border border-orange-500/10">
                      <p className="text-[10px] text-orange-400/70">Amazon</p>
                      <p className="text-xl font-bold text-orange-400">
                        {selectedResult.amazonPrice > 0 ? `$${selectedResult.amazonPrice}` : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flip pricing */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/10">
                    <p className="text-[10px] text-slate-500 uppercase">Quick Flip</p>
                    <p className="text-xl font-bold text-amber-400">${selectedResult.quickFlipPrice}</p>
                    <p className="text-[9px] text-slate-500">Sell fast, lower price</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                    <p className="text-[10px] text-slate-500 uppercase">Max Hold</p>
                    <p className="text-xl font-bold text-emerald-400">${selectedResult.maxValuePrice}</p>
                    <p className="text-[9px] text-slate-500">Wait for best price</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Demand Level</span>
                    <DemandBadge level={selectedResult.demandLevel} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Avg Days to Sell</span>
                    <span className="text-xs font-medium text-white">{selectedResult.avgDaysToSell} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Similar Listings</span>
                    <span className="text-xs font-medium text-white">{selectedResult.similarListings}</span>
                  </div>
                </div>

                {/* Mini price chart */}
                <div>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-3">6-Month Price Trend</p>
                  <div className="flex items-end gap-1.5 h-20">
                    {selectedResult.priceHistory.map((ph, i) => {
                      const max = Math.max(...selectedResult.priceHistory.map(p => p.price));
                      const min = Math.min(...selectedResult.priceHistory.map(p => p.price));
                      const range = max - min || 1;
                      const height = ((ph.price - min) / range) * 60 + 20;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[9px] text-slate-500">${ph.price}</span>
                          <motion.div
                            className="w-full rounded-t bg-gradient-to-t from-emerald-600/60 to-emerald-400/80"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                          />
                          <span className="text-[9px] text-slate-600">{ph.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition">
                  List This Item on Marketplace
                </button>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Marketplace View — with 5% fee badge
// ============================================================
function MarketplaceView() {
  const [filter, setFilter] = useState<"all" | "shipping" | "local">("all");
  const [showListToast, setShowListToast] = useState(false);

  const handleListItem = useCallback(() => {
    setShowListToast(true);
    setTimeout(() => setShowListToast(false), 2000);
  }, []);

  const filtered = listings.filter(l => {
    if (filter === "shipping") return l.shippingAvailable;
    if (filter === "local") return !l.shippingAvailable;
    return true;
  });

  return (
    <div>
      {/* Demo toast notification */}
      <AnimatePresence>
        {showListToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-emerald-400">Demo mode - listing flow available in the real app</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <p className="text-slate-400 text-sm mt-1">Find flipping deals from people selling for quick cash. Free to list, no membership needed.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            5% fee on sales
          </span>
          <button
            onClick={handleListItem}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition flex items-center gap-2"
          >
            <Tag className="w-4 h-4" /> List Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {(["all", "shipping", "local"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition capitalize ${filter === f ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white bg-white/[0.03]"}`}
          >
            {f === "all" ? "All Listings" : f === "shipping" ? "Shipping Available" : "Local Only"}
          </button>
        ))}
        <span className="text-[11px] text-slate-500 ml-auto">{filtered.length} listings</span>
      </div>

      {/* Listings grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="overflow-hidden hover:border-white/[0.12] transition-all cursor-pointer group">
              <div className="h-36 bg-gradient-to-br from-[#0c1222] to-[#1a2744] flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg shadow-black/30 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">{l.image}</span>
                </div>
                <span className="absolute top-2 right-2 text-[9px] font-bold text-white/15 uppercase tracking-widest">DEMO</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition">{l.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      {l.seller} <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> <span className="text-amber-400 font-medium">{(4.5 + (l.id.charCodeAt(l.id.length - 1) % 5) * 0.1).toFixed(1)}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${l.condition === "New" ? "bg-emerald-500/15 text-emerald-400" : l.condition === "Like New" ? "bg-cyan-500/15 text-cyan-400" : "bg-slate-500/15 text-slate-400"}`}>
                      {l.condition}
                    </span>
                    {l.shippingAvailable && (
                      <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                        <Truck className="w-3 h-3" /> Ships
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xl font-bold text-white">${l.price}</p>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                      <Sparkles className="w-3 h-3" /> Resale value: ${l.resaleValue}
                    </p>
                    <p className="text-[9px] text-slate-500">{l.resaleSource}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">+{l.profitMargin}%</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {l.views}</span>
                      <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {l.saves}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/[0.04]">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {l.location}</span>
                  <div className="flex items-center gap-3">
                    <span>{l.daysListed}d ago</span>
                    <span className="flex items-center gap-0.5 text-slate-600 hover:text-rose-400 cursor-pointer transition">
                      <Flag className="w-2.5 h-2.5" /> Report
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Earnings View — Rebuilt to match Justin's layout
// ============================================================
function EarningsView() {
  const e = userEarnings;
  const p = profitPool;
  const maxRevenueSource = Math.max(...e.revenueSources.map(s => s.amount));
  const capPercent = (e.earnedThisMonth / e.monthlyCap) * 100;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Your Earnings</h1>
        <p className="text-slate-400 text-sm mt-1">Profit Pool share + referral revenue. What you actually earn</p>
      </div>

      {/* Section 1: Top row - 3 cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-5 text-center">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-emerald-400">${e.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Base Pool</p>
          <p className="text-3xl font-bold text-cyan-400">${p.basePool.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="text-[11px] text-slate-500 mt-1.5">Split equally among subscribers</p>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Growth Pool</p>
          <p className="text-3xl font-bold text-amber-400">${p.growthPool.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="text-[11px] text-slate-500 mt-1.5">Weighted by seniority</p>
        </GlassCard>
      </div>

      {/* Section 2: Your Payout + Cap Progress */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <GlassCard className="overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Your Estimated Monthly Payout</h2>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Base Pool Share</span>
              <span className="text-sm font-medium text-emerald-400">${e.basePoolShare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Growth Pool Share</span>
              <span className="text-sm font-medium text-cyan-400">${e.growthPoolShare.toFixed(2)}</span>
            </div>
            <div className="border-t border-white/[0.04] pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">Est. Next Payout</span>
              <span className="text-sm font-bold text-emerald-400">${e.estNextPayout.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Total Earned All Time</span>
              <span className="text-sm font-medium text-white">${e.totalEarnedAllTime.toFixed(2)}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Monthly Cap Progress</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">${e.earnedThisMonth.toFixed(2)}</p>
              <p className="text-[11px] text-slate-500 mt-1">earned of ${(e.monthlyCap).toLocaleString()} cap</p>
            </div>
            <div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(capPercent, 100)}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 text-center">{capPercent.toFixed(0)}% of cap</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Section 3: Platform Revenue Sources */}
      <GlassCard className="overflow-hidden mb-6">
        <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">Platform Revenue Sources</h2>
        </div>
        <div className="p-5 space-y-4">
          {e.revenueSources.map((src, i) => {
            const barWidth = (src.amount / maxRevenueSource) * 100;
            const colors = ["from-emerald-600 to-emerald-400", "from-cyan-600 to-cyan-400", "from-amber-600 to-amber-400"];
            const textColors = ["text-emerald-400", "text-cyan-400", "text-amber-400"];
            return (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">{src.label}</span>
                  <span className={`text-xs font-medium ${textColors[i]}`}>${src.amount.toFixed(2)}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${colors[i]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Section 4: How the Profit Pool Works */}
      <GlassCard className="overflow-hidden mb-6">
        <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">How the Profit Pool Works</h2>
        </div>
        <div className="p-5">
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-400">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Revenue is collected</p>
                <p className="text-[11px] text-slate-400 mt-1">From subscriptions (40%), marketplace fees (10%), and affiliate commissions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-400">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">40% goes to the Profit Pool</p>
                <p className="text-[11px] text-slate-400 mt-1">Split into Base Pool (equal share) and Growth Pool (seniority-weighted)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-400">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Monthly payouts up to $10,000/mo</p>
                <p className="text-[11px] text-slate-400 mt-1">Earlier members earn more from Growth Pool. Excess is redistributed.</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Section 5: Referral Program */}
      <GlassCard className="overflow-hidden mb-6">
        <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">Referral Program</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/10 text-center flex-1">
              <p className="text-2xl font-bold text-cyan-400">{e.referralCommissionRate}%</p>
              <p className="text-[11px] text-slate-500 mt-1">Commission on direct referrals</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10 text-center flex-1">
              <p className="text-2xl font-bold text-emerald-400">{e.totalReferrals}</p>
              <p className="text-[11px] text-slate-500 mt-1">Total referrals</p>
            </div>
          </div>
          {e.referrals.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Your Referrals</p>
              {e.referrals.map((ref, i) => (
                <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/[0.02]">
                  <span className="text-xs text-white">{ref.name}</span>
                  <span className="text-xs font-medium text-emerald-400">${ref.earned.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Section 6: Earnings History */}
      <GlassCard className="overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-white">Earnings History</h2>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {/* Header row */}
          <div className="flex items-center px-5 py-2.5 text-[10px] text-slate-500 uppercase tracking-wider">
            <span className="flex-1">Date</span>
            <span className="flex-1">Type</span>
            <span className="flex-1 text-right">Amount</span>
            <span className="w-20 text-right">Status</span>
          </div>
          {e.history.map((row, i) => (
            <div key={i} className="flex items-center px-5 py-3.5 hover:bg-white/[0.02] transition">
              <span className="flex-1 text-xs text-white font-mono">{row.month}</span>
              <span className="flex-1 text-xs text-slate-400">{row.type}</span>
              <span className="flex-1 text-xs font-medium text-emerald-400 text-right">${row.amount.toFixed(2)}</span>
              <span className="w-20 text-right">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${row.status === "paid" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                  {row.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Main Demo Page
// ============================================================
export default function SmartFlipDemo() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Top bar */}
      <div className="h-14 border-b border-white/[0.06] bg-[#0a0f1e]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center"
            >
              <LayoutGrid className="w-4 h-4 text-slate-400" />
            </button>
          )}
          <span className="text-xl">💰</span>
          <span className="text-sm font-bold tracking-tight">SmartFlip</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium hidden sm:inline">MVP Demo</span>
          <span className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:border-white/[0.12] transition">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>Los Angeles, CA</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 hidden sm:inline">$1 trial, then $49/mo</span>
          <a
            href="/proposals/smartflip"
            className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Proposal
          </a>
        </div>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {isMobile && mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-60 h-full bg-[#0a0f1e] border-r border-white/[0.06] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentView === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleNavigation(item.key)}
                      className={`w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-56 border-r border-white/[0.06] bg-[#0a0f1e]/40 min-h-[calc(100vh-56px)] sticky top-14 self-start">
            <nav className="p-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setCurrentView(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {item.key === "earnings" && (
                      <span className="ml-auto text-[10px] font-medium text-emerald-400">${userEarnings.earnedThisMonth}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar stats */}
            <div className="px-3 mt-6 space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Today&apos;s Scans</p>
                <p className="text-lg font-bold text-white">{dashboardKPIs.scansToday}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Deals Flipped</p>
                <p className="text-lg font-bold text-emerald-400">{dashboardKPIs.dealsFlipped}</p>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile bottom nav */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f1e]/95 backdrop-blur-xl border-t border-white/[0.06] flex items-center justify-around py-2 px-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition ${
                    isActive ? "text-emerald-400" : "text-slate-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main content */}
        <main className={`flex-1 p-4 md:p-8 max-w-6xl ${isMobile ? "pb-20" : ""}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === "dashboard" && <DashboardView onNavigate={setCurrentView} />}
              {currentView === "deals" && <DealFinderView />}
              {currentView === "scan" && <SmartScanView />}
              {currentView === "marketplace" && <MarketplaceView />}
              {currentView === "earnings" && <EarningsView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
