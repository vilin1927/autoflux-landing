"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Home,
  AlertTriangle,
  TrendingUp,
  Filter,
  X,
  ChevronRight,
  Activity,
  Eye,
  DollarSign,
  Calendar,
  Building2,
  Scan,
  ArrowLeft,
  Monitor,
  Zap,
  Target,
  Layers,
  Radio,
} from "lucide-react";
import { demoProperties, demoStats } from "@/data/proposals/alamance-property";

type Property = (typeof demoProperties)[0];

export default function DemoPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filterScore, setFilterScore] = useState<[number, number]>([0, 10]);
  const [filterType, setFilterType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scanningEffect, setScanningEffect] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setScanningEffect(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = demoProperties.filter((p) => {
    const scoreMatch = p.distressScore >= filterScore[0] && p.distressScore <= filterScore[1];
    const typeMatch = filterType === "all" || p.propertyType.toLowerCase().includes(filterType);
    return scoreMatch && typeMatch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 7) return { bg: "bg-red-500", text: "text-red-400", glow: "shadow-red-500/50" };
    if (score >= 4) return { bg: "bg-amber-500", text: "text-amber-400", glow: "shadow-amber-500/50" };
    return { bg: "bg-emerald-500", text: "text-emerald-400", glow: "shadow-emerald-500/50" };
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 rounded-2xl p-8 max-w-sm text-center border border-slate-800">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">
            Command Center View
          </h1>
          <p className="text-slate-400 mb-6">
            This intelligence dashboard requires a larger display. Please access on desktop for the full experience.
          </p>
          <Link
            href="/proposals/alamance-property"
            className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Scanning overlay effect */}
      <AnimatePresence>
        {scanningEffect && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full mx-auto mb-6"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-cyan-400 font-mono text-sm tracking-wider"
              >
                INITIALIZING PROPERTY SCANNER...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid background */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white tracking-tight">ALAMANCE RECON</h1>
                <p className="text-[10px] text-cyan-400/70 font-mono tracking-widest">DISTRESSED PROPERTY INTEL</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">LIVE SCANNING</span>
            </div>
            <Link
              href="/proposals/alamance-property"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Proposal
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Stats */}
        <aside className="w-72 border-r border-slate-800/50 bg-slate-900/50 backdrop-blur p-4 flex flex-col gap-4">
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-slate-500 tracking-widest">SCAN METRICS</h2>

            <StatCard
              icon={Layers}
              label="Total Parcels"
              value={demoStats.totalParcels.toLocaleString()}
              color="cyan"
            />
            <StatCard
              icon={Scan}
              label="Scanned Today"
              value={demoStats.scannedToday.toLocaleString()}
              color="blue"
            />
            <StatCard
              icon={AlertTriangle}
              label="High Distress"
              value={demoStats.highDistress.toString()}
              color="red"
              highlight
            />
            <StatCard
              icon={Activity}
              label="Avg Score"
              value={demoStats.avgScore.toFixed(1)}
              color="amber"
            />
          </div>

          <div className="border-t border-slate-800/50 pt-4 mt-2">
            <h2 className="text-xs font-mono text-slate-500 tracking-widest mb-3">DISTRESS BREAKDOWN</h2>
            <div className="space-y-2">
              <DistressBar label="Critical (7-10)" count={demoStats.highDistress} total={filteredProperties.length + 500} color="red" />
              <DistressBar label="Moderate (4-7)" count={demoStats.mediumDistress} total={filteredProperties.length + 500} color="amber" />
              <DistressBar label="Low (0-4)" count={demoStats.lowDistress} total={filteredProperties.length + 500} color="emerald" />
            </div>
          </div>

          <div className="mt-auto border-t border-slate-800/50 pt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-colors"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <Filter className="w-4 h-4 text-cyan-400" />
                Filters
              </span>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500 mb-2 block">DISTRESS SCORE</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.5"
                          value={filterScore[0]}
                          onChange={(e) => setFilterScore([parseFloat(e.target.value), filterScore[1]])}
                          className="flex-1 accent-cyan-500"
                        />
                        <span className="text-xs font-mono text-cyan-400 w-8">{filterScore[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.5"
                          value={filterScore[1]}
                          onChange={(e) => setFilterScore([filterScore[0], parseFloat(e.target.value)])}
                          className="flex-1 accent-cyan-500"
                        />
                        <span className="text-xs font-mono text-cyan-400 w-8">{filterScore[1]}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-500 mb-2 block">PROPERTY TYPE</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="all">All Types</option>
                        <option value="single">Single Family</option>
                        <option value="multi">Multi-Family</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Main Content - Map & List */}
        <main className="flex-1 flex flex-col">
          {/* Map Area */}
          <div className="h-1/2 relative bg-slate-900/30 border-b border-slate-800/50">
            {/* Simulated map with property pins */}
            <div className="absolute inset-0 overflow-hidden">
              {/* County outline simulation */}
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-20">
                <path
                  d="M100,50 L700,80 L750,350 L50,300 Z"
                  fill="none"
                  stroke="rgb(6, 182, 212)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                {/* Grid lines */}
                {[...Array(10)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 40}
                    x2="800"
                    y2={i * 40}
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                ))}
                {[...Array(20)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 40}
                    y1="0"
                    x2={i * 40}
                    y2="400"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                ))}
              </svg>

              {/* Property markers */}
              {filteredProperties.map((property, index) => {
                const colors = getScoreColor(property.distressScore);
                const x = 15 + (index % 4) * 20 + Math.random() * 10;
                const y = 20 + Math.floor(index / 4) * 25 + Math.random() * 10;

                return (
                  <motion.button
                    key={property.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                    onClick={() => setSelectedProperty(property)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group`}
                  >
                    <div className={`relative`}>
                      <div className={`w-4 h-4 ${colors.bg} rounded-full shadow-lg ${colors.glow} group-hover:scale-150 transition-transform`} />
                      <div className={`absolute inset-0 ${colors.bg} rounded-full animate-ping opacity-50`} />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-mono border border-slate-700">
                      {property.address}
                      <div className={`text-[10px] ${colors.text}`}>Score: {property.distressScore}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Map overlay info */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-xs font-mono text-slate-400">ALAMANCE COUNTY, NC</p>
              <p className="text-lg font-bold text-white">{filteredProperties.length} Properties Detected</p>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-3">
              {[
                { color: "bg-red-500", label: "High (7-10)" },
                { color: "bg-amber-500", label: "Med (4-7)" },
                { color: "bg-emerald-500", label: "Low (0-4)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
                  <div className={`w-3 h-3 ${item.color} rounded-full`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Property List */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                  onClick={() => setSelectedProperty(property)}
                  getScoreColor={getScoreColor}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            getScoreColor={getScoreColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  highlight?: boolean;
}) {
  const colorClasses: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    red: "text-red-400 bg-red-500/10 border-red-500/30",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  };

  return (
    <div className={`p-3 rounded-lg border ${highlight ? 'bg-red-500/5 border-red-500/30' : 'bg-slate-800/30 border-slate-700/50'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[color]} border`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className={`text-lg font-bold font-mono ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function DistressBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = (count / total) * 100;
  const colorClasses: Record<string, string> = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono text-white">{count}</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full ${colorClasses[color]} rounded-full`}
        />
      </div>
    </div>
  );
}

function PropertyCard({
  property,
  index,
  onClick,
  getScoreColor,
}: {
  property: Property;
  index: number;
  onClick: () => void;
  getScoreColor: (score: number) => { bg: string; text: string; glow: string };
}) {
  const colors = getScoreColor(property.distressScore);
  const activeIndicators = Object.entries(property.indicators).filter(([_, v]) => v);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.3 }}
      onClick={onClick}
      className="text-left bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all group"
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-slate-800 rounded-lg mb-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Home className="w-8 h-8 text-slate-600" />
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-md ${colors.bg} text-white text-xs font-bold font-mono`}>
          {property.distressScore.toFixed(1)}
        </div>
        <div className="absolute bottom-2 left-2 flex gap-1">
          {activeIndicators.slice(0, 3).map(([key]) => (
            <div key={key} className="w-2 h-2 bg-red-500 rounded-full" />
          ))}
          {activeIndicators.length > 3 && (
            <span className="text-[10px] text-slate-400 ml-1">+{activeIndicators.length - 3}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
              {property.address}
            </p>
            <p className="text-xs text-slate-500">{property.city}, NC {property.zip}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {property.propertyType}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            ${(property.estimatedValue / 1000).toFixed(0)}K
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {activeIndicators.slice(0, 2).map(([key]) => (
            <span
              key={key}
              className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-[10px] text-red-400 font-mono"
            >
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function PropertyModal({
  property,
  onClose,
  getScoreColor,
}: {
  property: Property;
  onClose: () => void;
  getScoreColor: (score: number) => { bg: string; text: string; glow: string };
}) {
  const colors = getScoreColor(property.distressScore);
  const activeIndicators = Object.entries(property.indicators).filter(([_, v]) => v);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="w-16 h-16 text-slate-700" />
          </div>
          <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg ${colors.bg} text-white font-bold font-mono text-2xl shadow-lg ${colors.glow}`}>
            {property.distressScore.toFixed(1)}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur rounded-full text-xs font-mono text-slate-300 border border-slate-700">
              {property.id}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Address & Basic Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{property.address}</h2>
            <p className="text-slate-400">{property.city}, NC {property.zip}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">Type</p>
              <p className="font-semibold text-white text-sm">{property.propertyType}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">Year Built</p>
              <p className="font-semibold text-white text-sm">{property.yearBuilt}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">Sq Ft</p>
              <p className="font-semibold text-white text-sm">{property.sqft.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">Tax Status</p>
              <p className={`font-semibold text-sm ${property.taxStatus === 'Delinquent' ? 'text-red-400' : 'text-emerald-400'}`}>
                {property.taxStatus}
              </p>
            </div>
          </div>

          {/* Indicators */}
          <div className="mb-6">
            <h3 className="text-xs font-mono text-slate-500 tracking-widest mb-3">DISTRESS INDICATORS</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(property.indicators).map(([key, value]) => (
                <span
                  key={key}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    value
                      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                      : 'bg-slate-800/50 border border-slate-700/50 text-slate-500'
                  }`}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                  {value && <span className="ml-1">✓</span>}
                </span>
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-cyan-400">AI ANALYSIS</h3>
              <span className="ml-auto text-xs font-mono text-slate-400">
                {(property.aiAnalysis.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <ul className="space-y-2 mb-4">
              {property.aiAnalysis.detectedIssues.map((issue, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  {issue}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyan-500/20">
              <div>
                <p className="text-xs text-slate-500 mb-1">Investment Potential</p>
                <p className="font-bold text-white">{property.aiAnalysis.investmentPotential}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Est. Repair Cost</p>
                <p className="font-bold text-amber-400">{property.aiAnalysis.estimatedRepairCost}</p>
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-800/30 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Last Sale</p>
              <p className="font-bold text-white">${property.lastSalePrice.toLocaleString()}</p>
              <p className="text-xs text-slate-500">{property.lastSaleDate}</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Est. Value</p>
              <p className="font-bold text-emerald-400">${property.estimatedValue.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Owner Type</p>
              <p className="font-bold text-white">{property.ownerType}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
