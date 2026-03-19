"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Search, Camera, ShoppingBag, DollarSign, TrendingUp,
  ChevronRight, ArrowUp, ArrowDown, MapPin, Truck, Eye, Heart,
  Upload, Sparkles, Clock, Filter, Star, BarChart3, Users,
  Zap, Target, Shield, CheckCircle2, AlertCircle, MessageSquare,
  ArrowLeft, Package, Flame, Tag
} from "lucide-react";
import {
  deals, scanResults, listings, dashboardKPIs, profitPool,
  revenueBreakdown, categories,
  type Deal, type ScanResult
} from "@/data/proposals/smartflip";

// ============================================================
// Types
// ============================================================
type View = "dashboard" | "deals" | "scan" | "marketplace" | "questions";

const navItems = [
  { key: "dashboard" as View, label: "Dashboard", icon: LayoutGrid },
  { key: "deals" as View, label: "Deal Finder", icon: Search },
  { key: "scan" as View, label: "Smart Scan", icon: Camera },
  { key: "marketplace" as View, label: "Marketplace", icon: ShoppingBag },
  { key: "questions" as View, label: "Questions", icon: MessageSquare },
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

// ============================================================
// Dashboard View
// ============================================================
function DashboardView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const k = dashboardKPIs;
  const topDeals = deals.filter(d => d.trending).slice(0, 4);
  const rev = revenueBreakdown;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">SmartFlip Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Your AI-powered flipping command center</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        <KPICard label="Active Deals" value={k.activeDeals} color="text-emerald-400" icon={Zap} sub="Found today" />
        <KPICard label="Avg Margin" value={k.avgProfitMargin} suffix="%" color="text-cyan-400" icon={TrendingUp} sub="+5% vs last week" />
        <KPICard label="Items Listed" value={k.itemsListed} color="text-white" icon={Package} sub="3 selling fast" />
        <KPICard label="Monthly Earnings" value={`$${k.monthlyEarnings.toLocaleString()}`} color="text-emerald-400" icon={DollarSign} sub="Active + passive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Trending Deals */}
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-semibold text-white">Trending Deals</h2>
            </div>
            <button onClick={() => onNavigate("deals")} className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {topDeals.map(d => (
              <div key={d.id} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-white/[0.02] transition">
                <span className="text-2xl">{d.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{d.title}</span>
                    <ConfidenceBadge score={d.confidence} />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{d.source} · {d.location} · {d.timeFound}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-emerald-400">+${d.profit}</p>
                  <p className="text-[10px] text-slate-500">${d.buyPrice} → ${d.sellPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Profit Pool */}
        <GlassCard className="overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Profit Pool</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">${profitPool.totalPool.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500 mt-1">Total pool this month</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Base Pool (50%)</span>
                <span className="text-xs font-medium text-white">${profitPool.basePool.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: "50%" }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Growth Pool (50%)</span>
                <span className="text-xs font-medium text-white">${profitPool.growthPool.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: "50%" }} />
              </div>
            </div>
            <div className="border-t border-white/[0.04] pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Your base share</span>
                <span className="text-xs font-medium text-emerald-400">${profitPool.yourBaseShare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Your growth share</span>
                <span className="text-xs font-medium text-cyan-400">${profitPool.yourGrowthShare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Members after you</span>
                <span className="text-xs font-medium text-white">{profitPool.membersAfterYou}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Revenue Breakdown */}
      <GlassCard className="mt-5 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.04]">
          <h2 className="text-sm font-semibold text-white">Revenue Distribution</h2>
        </div>
        <div className="p-5">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-medium text-white">Subscriptions</span>
              </div>
              <p className="text-lg font-bold text-white">${rev.subscriptions.total.toLocaleString()}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Profit Pool (40%)</span>
                  <span className="text-emerald-400">${rev.subscriptions.profitPool.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Company (40%)</span>
                  <span className="text-slate-300">${rev.subscriptions.company.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Affiliates (20%)</span>
                  <span className="text-cyan-400">${rev.subscriptions.affiliates.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-white">Affiliate Links</span>
              </div>
              <p className="text-lg font-bold text-white">${rev.affiliates.total.toLocaleString()}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Profit Pool (40%)</span>
                  <span className="text-emerald-400">${rev.affiliates.profitPool.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Company (40%)</span>
                  <span className="text-slate-300">${rev.affiliates.company.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Reserve (20%)</span>
                  <span className="text-amber-400">${rev.affiliates.reserve.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-medium text-white">Marketplace Fees</span>
              </div>
              <p className="text-lg font-bold text-white">${rev.marketplace.total.toLocaleString()}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Profit Pool (5%)</span>
                  <span className="text-emerald-400">${rev.marketplace.profitPool.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Company (5%)</span>
                  <span className="text-slate-300">${rev.marketplace.company.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Deal Finder View
// ============================================================
function DealFinderView() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"profit" | "confidence" | "margin">("profit");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const filtered = deals
    .filter(d => selectedCategory === "All" || d.category === selectedCategory)
    .sort((a, b) => sortBy === "profit" ? b.profit - a.profit : sortBy === "confidence" ? b.confidence - a.confidence : b.margin - a.margin);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Deal Finder</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time profitable opportunities across marketplaces</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-1 bg-[#0f172a]/60 border border-white/[0.06] rounded-xl px-1 py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedCategory === cat ? "bg-emerald-500/20 text-emerald-400" : "text-slate-400 hover:text-white"}`}
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
                  <span className="text-2xl shrink-0">{d.image}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{d.title}</span>
                      {d.trending && <Flame className="w-3.5 h-3.5 text-orange-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{d.source} · {d.location} · {d.timeFound}</p>
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
                  <div className="text-center">
                    <span className="text-5xl">{selectedDeal.image}</span>
                    <h3 className="text-lg font-bold text-white mt-3">{selectedDeal.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{selectedDeal.category} · {selectedDeal.source}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-rose-500/10 border border-rose-500/10">
                      <p className="text-[10px] text-slate-500 uppercase">Buy</p>
                      <p className="text-lg font-bold text-rose-400">${selectedDeal.buyPrice}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                      <p className="text-[10px] text-slate-500 uppercase">Sell</p>
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
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                        style={{ width: `${selectedDeal.confidence}%` }}
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

                  <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition">
                    View on {selectedDeal.source} →
                  </button>
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
// Smart Scan View
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
    }, 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Smart Scan</h1>
        <p className="text-slate-400 text-sm mt-1">Upload a photo — AI identifies the product and estimates its value</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Upload / Scanner */}
        <div className="space-y-5">
          <GlassCard className="p-8">
            {!scanning && !scanned && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Camera className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Upload or take a photo</p>
                  <p className="text-[11px] text-slate-500 mt-1">Supports JPG, PNG, HEIC</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button onClick={handleScan} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Image
                  </button>
                  <button onClick={handleScan} className="px-5 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm font-medium hover:bg-white/[0.1] transition flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Take Photo
                  </button>
                </div>
              </div>
            )}

            {scanning && (
              <div className="text-center space-y-5 py-4">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto relative">
                  <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50 animate-ping" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Analyzing product...</p>
                  <p className="text-[11px] text-slate-500 mt-1">Identifying brand, model, condition & market data</p>
                </div>
                <div className="w-48 h-1.5 rounded-full bg-slate-800 overflow-hidden mx-auto">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            )}

            {scanned && (
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-emerald-400">Product identified!</p>
                <p className="text-[11px] text-slate-500">Select an example below or scan another item</p>
                <button
                  onClick={() => { setScanned(false); setScanning(false); }}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] text-white text-xs font-medium hover:bg-white/[0.1] transition"
                >
                  Scan Another
                </button>
              </div>
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
                  <span className="text-2xl">{sr.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{sr.title}</p>
                    <p className="text-[11px] text-slate-500">{sr.condition} · {sr.category}</p>
                  </div>
                  <DemandBadge level={sr.demandLevel} />
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div>
          <GlassCard className="p-5 space-y-5">
            <div className="text-center pb-4 border-b border-white/[0.04]">
              <span className="text-5xl">{selectedResult.image}</span>
              <h3 className="text-lg font-bold text-white mt-3">{selectedResult.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedResult.condition} · {selectedResult.category}</p>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/10">
                <p className="text-[10px] text-slate-500 uppercase">Market Value</p>
                <p className="text-xl font-bold text-cyan-400">${selectedResult.marketValue}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/10">
                <p className="text-[10px] text-slate-500 uppercase">Quick Flip</p>
                <p className="text-xl font-bold text-amber-400">${selectedResult.quickFlipPrice}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                <p className="text-[10px] text-slate-500 uppercase">Max Value</p>
                <p className="text-xl font-bold text-emerald-400">${selectedResult.maxValuePrice}</p>
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
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-emerald-600/60 to-emerald-400/80"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] text-slate-600">{ph.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition">
              List This Item →
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Marketplace View
// ============================================================
function MarketplaceView() {
  const [filter, setFilter] = useState<"all" | "shipping" | "local">("all");

  const filtered = listings.filter(l => {
    if (filter === "shipping") return l.shippingAvailable;
    if (filter === "local") return !l.shippingAvailable;
    return true;
  });

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <p className="text-slate-400 text-sm mt-1">Buy & sell with AI-powered pricing</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition flex items-center gap-2">
          <Tag className="w-4 h-4" /> List Item
        </button>
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
        {filtered.map(l => (
          <GlassCard key={l.id} className="overflow-hidden hover:border-white/[0.12] transition-all cursor-pointer group">
            <div className="h-36 bg-gradient-to-br from-[#0c1222] to-[#1a2744] flex items-center justify-center">
              <span className="text-5xl group-hover:scale-110 transition-transform">{l.image}</span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition">{l.title}</h3>
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
                  {l.price < l.aiSuggestedPrice && (
                    <p className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                      <Sparkles className="w-3 h-3" /> AI suggests ${l.aiSuggestedPrice}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {l.views}</span>
                  <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {l.saves}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/[0.04]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {l.location}</span>
                <span>{l.daysListed}d ago</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Questions View
// ============================================================
function QuestionsView() {
  const questions = [
    {
      question: "Is this what you're looking for?",
      answer: "This demo is a hardcoded, pre-built template using my React/Next.js stack — it shows the UX and flow, not live backend logic. For the real MVP, each feature needs its own backend layer:",
      details: [
        { label: "Deal Finder", desc: "Python scraper + eBay API integration + ML confidence scoring model + PostgreSQL storage + cron jobs for real-time scanning" },
        { label: "Smart Scan", desc: "Google Vision / OpenAI Vision API for image recognition + product matching algorithm against eBay sold data + pricing model" },
        { label: "Marketplace", desc: "Full CRUD with Supabase + image uploads to S3 + Stripe payment processing + escrow logic for buyer protection" },
        { label: "Profit Pool", desc: "Revenue tracking system + monthly distribution engine + user tier calculations + Stripe subscription webhooks + earning cap enforcement" },
        { label: "Affiliate Links", desc: "URL redirect system with tracking + eBay/Amazon affiliate API integration + click attribution + revenue reporting" },
      ],
    },
    {
      question: "Which marketplaces should the deal finder scan first? eBay only or multiple?",
      answer: "This matters for MVP scope. eBay has the best API for sold listings (actual market prices), so I'd start there. Adding Facebook Marketplace, OfferUp, and Craigslist requires web scraping which is more complex and fragile. Recommendation: eBay API for V1, then add scrapers for others in V2.",
    },
    {
      question: "For the profit pool distribution — is the logic fixed or does it need admin controls?",
      answer: "The 50/50 base/growth split, the 40/40/20 revenue split, and $10K monthly cap — are these hardcoded business rules or do you want an admin panel to adjust percentages? Fixed is faster to build, but admin controls give you flexibility to experiment with the model.",
    },
    {
      question: "Do you have the marketplace fee/payment flow mapped out?",
      answer: "The 10% marketplace fee needs Stripe Connect for split payments (5% to you, 5% to pool). Do buyers pay through SmartFlip (escrow model) or does the platform just connect buyer/seller and take a listing fee? Escrow = more trust but more complex (disputes, refunds). Connect-only = simpler MVP.",
    },
    {
      question: "Image recognition accuracy — how precise does it need to be?",
      answer: "Google Vision can identify broad categories (sneakers, electronics) but exact model/SKU matching (e.g., 'Air Jordan 4 Retro Military Black Size 10') requires a trained model or a product database lookup. For MVP, I'd do Vision API → broad match → manual confirmation by user. Full auto-identification is a V2 feature.",
    },
    {
      question: "User onboarding — how does the $49/month subscription start?",
      answer: "Free trial? Freemium with limited scans? Or straight to paid? This affects the growth pool math significantly — if users join free, when do they start counting for the growth pool distribution?",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Questions & Clarifications</h1>
        <p className="text-slate-400 text-sm mt-1">Things I need answered before starting the MVP build</p>
      </div>

      {/* MVP clarification banner */}
      <GlassCard className="p-5 mb-6 border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-400">About this demo</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              What you&apos;re seeing is a <span className="text-white font-medium">pre-built UI template</span> using my React/Next.js stack with hardcoded data.
              It demonstrates the user experience and layout — not the actual backend logic.
              The real MVP requires API integrations, scraping infrastructure, payment processing, and a distribution engine.
              Each screen here represents weeks of backend work to make functional.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <GlassCard key={i} className="overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-500/20 text-cyan-400"}`}>
                {i === 0 ? "!" : `Q${i}`}
              </div>
              <h3 className="text-sm font-medium text-white">{q.question}</h3>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-slate-300 leading-relaxed">{q.answer}</p>
              {q.details && (
                <div className="mt-4 space-y-2.5">
                  {q.details.map((d, j) => (
                    <div key={j} className="flex items-start gap-2.5 pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <div>
                        <span className="text-xs font-medium text-white">{d.label}:</span>
                        <span className="text-xs text-slate-400 ml-1">{d.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Main Demo Page
// ============================================================
export default function SmartFlipDemo() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6">
        <GlassCard className="p-8 text-center max-w-sm">
          <div className="text-4xl mb-4">💰</div>
          <h2 className="text-lg font-bold text-white mb-2">SmartFlip Demo</h2>
          <p className="text-sm text-slate-400 mb-4">
            This interactive demo is optimized for desktop viewing.
            Please open on a laptop or desktop for the full experience.
          </p>
          <a
            href="/proposals/smartflip"
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to proposal
          </a>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Top bar */}
      <div className="h-14 border-b border-white/[0.06] bg-[#0a0f1e]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl">💰</span>
          <span className="text-sm font-bold tracking-tight">SmartFlip</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">MVP Demo</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500">Built by AutoFlux</span>
          <a
            href="/proposals/smartflip"
            className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </a>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
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
                  {item.key === "questions" && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center">6</span>
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

        {/* Main content */}
        <main className="flex-1 p-8 max-w-6xl">
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
              {currentView === "questions" && <QuestionsView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
