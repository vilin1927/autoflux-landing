"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Ship, DollarSign, BarChart3, Bell, Mail, Users, TrendingUp,
  Search, ChevronRight, CheckCircle2, Clock, AlertTriangle, AlertCircle,
  Star, ArrowUp, ArrowDown, Minus, Paperclip, Truck, FileText, Package, Factory,
  Layers
} from "lucide-react";
import {
  shipments, alerts, carrierScores, vendorUpdates, emailIngestions,
  ddExposureData, dashboardKPIs,
  type Shipment
} from "@/data/proposals/lyncpath";

// ============================================================
// Types
// ============================================================
type View = "overview" | "shipments" | "shipment-detail" | "dd-exposure" | "carrier-scorecard" | "alerts" | "email-ingestion" | "vendor-portal" | "analytics";

const navItems = [
  { key: "overview" as View, label: "Overview", icon: LayoutGrid },
  { key: "shipments" as View, label: "Shipments", icon: Ship },
  { key: "dd-exposure" as View, label: "D&D Exposure", icon: DollarSign },
  { key: "carrier-scorecard" as View, label: "Carrier Scorecard", icon: BarChart3 },
  { key: "alerts" as View, label: "Alerts", icon: Bell },
  { key: "email-ingestion" as View, label: "Email & OCR", icon: Mail },
  { key: "vendor-portal" as View, label: "Vendor Portal", icon: Users },
  { key: "analytics" as View, label: "Analytics", icon: TrendingUp },
];

// ============================================================
// Shared Components
// ============================================================
function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "In Transit" ? "bg-emerald-500/15 text-emerald-400" :
    status === "Delayed" ? "bg-rose-500/15 text-rose-400" :
    status === "Customs Hold" ? "bg-amber-500/15 text-amber-400" :
    status === "Delivered" ? "bg-indigo-500/15 text-indigo-400" :
    status === "At Origin" ? "bg-cyan-500/15 text-cyan-400" :
    "bg-slate-500/15 text-slate-400";
  return <span className={`${cls} px-2 py-0.5 rounded-full text-[11px] font-medium`}>{status}</span>;
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] backdrop-blur-xl rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

function KPICard({ label, value, suffix, color, sub }: { label: string; value: string | number; suffix?: string; color: string; sub?: string }) {
  return (
    <GlassCard className="p-5">
      <p className="text-[11px] text-slate-500 font-medium mb-2.5 uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-1.5">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        {suffix && <span className="text-sm text-slate-500 mb-0.5">{suffix}</span>}
      </div>
      {sub && <p className="text-[11px] text-slate-500 mt-1.5">{sub}</p>}
    </GlassCard>
  );
}

// ============================================================
// Overview View
// ============================================================
function OverviewView({ onNavigate, onSelectShipment }: { onNavigate: (v: View) => void; onSelectShipment: (s: Shipment) => void }) {
  const k = dashboardKPIs;
  const unread = alerts.filter(a => !a.read).slice(0, 3);
  const active = shipments.filter(s => s.status !== "Delivered").slice(0, 4);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Operations Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time visibility across all active shipments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <KPICard label="Active" value={k.activeShipments} color="text-white" sub="6 containers" />
        <KPICard label="On-Time" value={k.onTimeRate} suffix="%" color="text-emerald-400" sub="+3% vs last month" />
        <KPICard label="Delayed" value={k.delayedShipments} color="text-rose-400" sub="2 flagged" />
        <KPICard label="Customs" value={k.customsHolds} color="text-amber-400" sub="Antwerp hold" />
        <KPICard label="D&D Risk" value={`€${k.totalDDExposure.toLocaleString()}`} color="text-rose-400" sub="1 at risk" />
        <KPICard label="Emails" value={k.emailsProcessedThisWeek} suffix="/wk" color="text-cyan-400" sub="97% accuracy" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Active Shipments</h2>
            <button onClick={() => onNavigate("shipments")} className="text-xs text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {active.map(s => (
              <button key={s.id} onClick={() => onSelectShipment(s)} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-white/[0.02] transition w-full text-left group">
                <span className="text-xl shrink-0">{s.carrierLogo}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition">{s.bookingNumber}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{s.origin.port} → {s.destination.port} · {s.carrier} · {s.vessel}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: `${s.progress}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{s.progress}% · ETA {s.eta}</p>
                </div>
                {s.alerts > 0 && <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">{s.alerts}</span>}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Unread Alerts</h2>
            <button onClick={() => onNavigate("alerts")} className="text-xs text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1">All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {unread.map(a => (
              <div key={a.id} className="px-5 py-3.5">
                <div className="flex items-start gap-2.5">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${a.severity === "critical" ? "bg-rose-500" : a.severity === "warning" ? "bg-amber-500" : "bg-cyan-500"}`} />
                  <div>
                    <p className="text-sm font-medium text-white">{a.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{a.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Map */}
      <GlassCard className="mt-5 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.04]">
          <h2 className="text-sm font-semibold text-white">Global Shipment Map</h2>
        </div>
        <div className="h-56 bg-gradient-to-br from-[#0c1222] via-[#1a2744] to-[#0f1b33] relative flex items-center justify-center">
          <svg viewBox="0 0 800 250" className="w-full h-full opacity-15 absolute inset-0">
            <path d="M100,130 Q200,70 350,100 Q450,120 550,80 Q650,50 750,110" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6,4" />
            <path d="M80,170 Q200,190 350,150 Q500,110 650,160" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
          {[
            { x: "12%", y: "38%", label: "Shanghai", c: "bg-cyan-400" },
            { x: "52%", y: "30%", label: "Rotterdam", c: "bg-cyan-400" },
            { x: "48%", y: "26%", label: "Hamburg", c: "bg-amber-400" },
            { x: "80%", y: "32%", label: "New York", c: "bg-amber-400" },
            { x: "15%", y: "52%", label: "Ningbo", c: "bg-emerald-400" },
            { x: "30%", y: "58%", label: "Singapore", c: "bg-emerald-400" },
            { x: "70%", y: "70%", label: "Santos", c: "bg-rose-400" },
            { x: "50%", y: "32%", label: "Antwerp", c: "bg-rose-400" },
          ].map((d, i) => (
            <div key={i} className="absolute group" style={{ left: d.x, top: d.y }}>
              <div className={`w-2.5 h-2.5 rounded-full ${d.c} animate-pulse shadow-lg`} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">{d.label}</span>
            </div>
          ))}
          <div className="absolute bottom-3 right-4 flex items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> In Transit</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Delayed</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Hold</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Shipments List View
// ============================================================
function ShipmentsView({ onSelectShipment }: { onSelectShipment: (s: Shipment) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = shipments.filter(s => {
    if (filter !== "all" && s.status.toLowerCase().replace(" ", "_") !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.bookingNumber.toLowerCase().includes(q) || s.carrier.toLowerCase().includes(q) || s.origin.port.toLowerCase().includes(q) || s.destination.port.toLowerCase().includes(q) || s.containerNumbers.some(c => c.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Shipments</h1>
        <p className="text-slate-400 text-sm mt-1">Track and manage all container shipments</p>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search booking, container, port..." className="w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm" />
        </div>
        <div className="flex gap-1.5">
          {[{ k: "all", l: "All" }, { k: "in_transit", l: "In Transit" }, { k: "delayed", l: "Delayed" }, { k: "customs_hold", l: "Customs" }, { k: "delivered", l: "Delivered" }].map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition ${filter === f.k ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:text-white border border-transparent"}`}>{f.l}</button>
          ))}
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Booking / Carrier", "Route", "Vessel", "Containers", "Status", "Progress", "ETA"].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-slate-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filtered.map(s => (
                <tr key={s.id} onClick={() => onSelectShipment(s)} className="hover:bg-white/[0.02] transition cursor-pointer group">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition">{s.bookingNumber}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5"><span>{s.carrierLogo}</span> {s.carrier}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-slate-300">{s.origin.code} → {s.destination.code}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.origin.port} → {s.destination.port}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-slate-300">{s.vessel}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.voyage}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-slate-300">{s.containerNumbers.length}x {s.containerType}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{s.containerNumbers[0]}</p>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: `${s.progress}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{s.progress}%</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-300">{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Shipment Detail View
// ============================================================
function ShipmentDetailView({ shipment, onBack }: { shipment: Shipment; onBack: () => void }) {
  const sAlerts = alerts.filter(a => a.shipmentId === shipment.id);
  const sVendors = vendorUpdates.filter(v => v.shipmentId === shipment.id);

  return (
    <div>
      <button onClick={onBack} className="text-slate-500 hover:text-white transition text-sm mb-5 flex items-center gap-1">← Back to shipments</button>

      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-3xl">{shipment.carrierLogo}</span>
            <h1 className="text-2xl font-bold text-white">{shipment.bookingNumber}</h1>
            <StatusBadge status={shipment.status} />
          </div>
          <p className="text-slate-400 text-sm">{shipment.carrier} · {shipment.vessel} ({shipment.voyage}) · {shipment.containerNumbers.length}x {shipment.containerType}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        {[
          { l: "Origin", v: shipment.origin.port, s: `${shipment.origin.country} (${shipment.origin.code})` },
          { l: "Destination", v: shipment.destination.port, s: `${shipment.destination.country} (${shipment.destination.code})` },
          { l: "ETD → ETA", v: `${shipment.etd} → ${shipment.eta}`, s: `${Math.round((new Date(shipment.eta).getTime() - new Date(shipment.etd).getTime()) / 86400000)} transit days` },
          { l: "D&D Free Time", v: `${shipment.freeTimeDays} days`, s: `${shipment.freeTimeUsed} used · ${shipment.freeTimeDays - shipment.freeTimeUsed} remaining` },
        ].map(c => (
          <GlassCard key={c.l} className="p-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{c.l}</p>
            <p className="text-sm font-medium text-white">{c.v}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{c.s}</p>
          </GlassCard>
        ))}
      </div>

      {/* Progress */}
      <GlassCard className="p-4 mb-7">
        <div className="flex items-center justify-between mb-2 text-[11px] text-slate-500">
          <span>{shipment.origin.code}</span>
          {shipment.transshipment && <span>{shipment.transshipment.code}</span>}
          <span>{shipment.destination.code}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400" style={{ width: `${shipment.progress}%` }} />
        </div>
        <p className="text-[11px] text-slate-500 text-center mt-1.5">{shipment.progress}% complete</p>
      </GlassCard>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Milestones */}
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04]">
            <h2 className="text-sm font-semibold text-white">Shipment Milestones</h2>
          </div>
          <div className="p-5 space-y-0">
            {shipment.milestones.filter(m => m.notes !== "Direct service").map((m, i, arr) => (
              <div key={m.id} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  {m.status === "completed" ? <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" /> :
                   m.status === "current" ? <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 animate-pulse ring-4 ring-cyan-500/20"><div className="w-2 h-2 rounded-full bg-white" /></div> :
                   m.status === "delayed" ? <Clock className="w-6 h-6 text-rose-500 shrink-0" /> :
                   m.status === "overdue" ? <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" /> :
                   <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-600 shrink-0" />}
                  {i < arr.length - 1 && (
                    <div className={`w-0.5 flex-1 my-1 min-h-[28px] ${m.status === "completed" ? "bg-emerald-500/30" : m.status === "current" ? "bg-cyan-500/30" : "bg-slate-700/50"}`} />
                  )}
                </div>
                <div className="pb-5">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${m.status === "completed" ? "text-slate-300" : m.status === "current" ? "text-cyan-400" : m.status === "delayed" || m.status === "overdue" ? "text-rose-400" : "text-slate-500"}`}>{m.name}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${m.stage === "Origin" ? "bg-indigo-500/15 text-indigo-300" : m.stage === "Transit" ? "bg-cyan-500/15 text-cyan-300" : "bg-emerald-500/15 text-emerald-300"}`}>{m.stage}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    {m.planned && <span className="text-[11px] text-slate-500">Plan: {m.planned}</span>}
                    {m.actual && <span className="text-[11px] text-emerald-400">Actual: {m.actual}</span>}
                  </div>
                  <p className="text-[11px] text-slate-500">{m.responsible}</p>
                  {m.notes && <p className="text-[11px] text-amber-400/80 mt-0.5">{m.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-white mb-3.5">Details</h3>
            <div className="space-y-2.5">
              {[
                { l: "B/L", v: shipment.blNumber },
                { l: "Shipper", v: shipment.shipper },
                { l: "Consignee", v: shipment.consignee },
                { l: "Commodity", v: shipment.commodity },
                { l: "Weight", v: shipment.weight },
              ].map(d => (
                <div key={d.l}>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{d.l}</p>
                  <p className="text-sm text-slate-300">{d.v}</p>
                </div>
              ))}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Containers</p>
                {shipment.containerNumbers.map(c => <p key={c} className="text-sm text-slate-300 font-mono">{c}</p>)}
              </div>
            </div>
          </GlassCard>

          {sAlerts.length > 0 && (
            <GlassCard className="overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.04]">
                <h3 className="text-sm font-semibold text-white">Alerts ({sAlerts.length})</h3>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {sAlerts.slice(0, 3).map(a => (
                  <div key={a.id} className="px-5 py-3">
                    <div className="flex items-start gap-2">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${a.severity === "critical" ? "bg-rose-500" : a.severity === "warning" ? "bg-amber-500" : "bg-cyan-500"}`} />
                      <div>
                        <p className="text-[11px] font-medium text-white">{a.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{new Date(a.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {sVendors.length > 0 && (
            <GlassCard className="overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.04]">
                <h3 className="text-sm font-semibold text-white">Vendor Updates</h3>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {sVendors.map(v => (
                  <div key={v.id} className="px-5 py-3">
                    <p className="text-[11px] font-medium text-white">{v.vendor}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{v.milestone} — {v.notes}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// D&D Exposure View
// ============================================================
function DDExposureView() {
  const total = ddExposureData.reduce((s, d) => s + d.projectedCost, 0);
  const atRisk = ddExposureData.filter(d => d.status === "at_risk").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Detention & Demurrage</h1>
        <p className="text-slate-400 text-sm mt-1">Monitor free time and projected D&D costs</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <KPICard label="Total Exposure" value={`€${total.toLocaleString()}`} color="text-rose-400" sub="Projected charges" />
        <KPICard label="At Risk" value={atRisk} color="text-rose-400" sub="Nearing free time limit" />
        <KPICard label="Watching" value={ddExposureData.filter(d => d.status === "watch").length} color="text-amber-400" sub="Upcoming arrivals" />
        <KPICard label="Avg Daily Rate" value="€237" color="text-white" sub="All ports" />
      </div>

      <GlassCard className="overflow-hidden mb-6">
        <div className="px-5 py-3.5 border-b border-white/[0.04]">
          <h2 className="text-sm font-semibold text-white">Container D&D Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Container", "Port", "Carrier", "Free Time", "Usage", "Daily Rate", "Projected Cost", "Status"].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-slate-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {ddExposureData.map(d => {
                const pct = (d.daysUsed / d.freeTimeDays) * 100;
                return (
                  <tr key={d.container} className="hover:bg-white/[0.02] transition">
                    <td className="px-5 py-3.5"><p className="text-sm font-mono text-white">{d.container}</p><p className="text-[10px] text-slate-500">{d.shipmentId}</p></td>
                    <td className="px-5 py-3.5 text-sm text-slate-300">{d.port}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-300">{d.carrier}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-300">{d.freeTimeDays}d</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className={`h-full rounded-full ${pct >= 80 ? "bg-rose-500" : pct >= 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="text-[11px] text-slate-400">{d.daysUsed}/{d.freeTimeDays}</span>
                      </div>
                      {d.daysRemaining <= 2 && d.daysRemaining > 0 && <p className="text-[10px] text-rose-400 mt-0.5">{d.daysRemaining}d left</p>}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-300">€{d.dailyRate}/d</td>
                    <td className="px-5 py-3.5"><span className={`text-sm font-semibold ${d.projectedCost > 0 ? "text-rose-400" : "text-emerald-400"}`}>{d.projectedCost > 0 ? `€${d.projectedCost.toLocaleString()}` : "€0"}</span></td>
                    <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${d.status === "at_risk" ? "bg-rose-500/15 text-rose-400" : d.status === "watch" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>{d.status === "at_risk" ? "At Risk" : d.status === "watch" ? "Watch" : "Safe"}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-4">D&D by Port (30 Days)</h3>
          {[{ p: "Antwerp", c: 1250, n: 1 }, { p: "Rotterdam", c: 0, n: 2 }, { p: "New York", c: 0, n: 1 }, { p: "Los Angeles", c: 0, n: 2 }].map(r => (
            <div key={r.p} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2"><span className="text-sm text-slate-300">{r.p}</span><span className="text-[10px] text-slate-500">{r.n} ctr</span></div>
              <span className={`text-sm font-medium ${r.c > 0 ? "text-rose-400" : "text-emerald-400"}`}>€{r.c.toLocaleString()}</span>
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-4">D&D by Carrier (90 Days)</h3>
          {[{ n: "MSC", l: "🟡", c: 3200 }, { n: "Hapag-Lloyd", l: "🟠", c: 1800 }, { n: "Maersk", l: "🔵", c: 450 }, { n: "CMA CGM", l: "🔴", c: 0 }, { n: "Evergreen", l: "🟢", c: 0 }].map(r => (
            <div key={r.n} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2"><span>{r.l}</span><span className="text-sm text-slate-300">{r.n}</span></div>
              <span className={`text-sm font-medium ${r.c > 0 ? "text-rose-400" : "text-emerald-400"}`}>€{r.c.toLocaleString()}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.04] flex justify-between">
            <span className="text-sm text-slate-400">Total (90d)</span>
            <span className="text-sm font-bold text-rose-400">€5,450</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ============================================================
// Carrier Scorecard View
// ============================================================
function CarrierScorecardView() {
  const sorted = [...carrierScores].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Carrier Scorecard</h1>
        <p className="text-slate-400 text-sm mt-1">Performance metrics across all tracked carriers</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {sorted.slice(0, 3).map((c, i) => (
          <GlassCard key={c.name} className={`p-5 ${i === 0 ? "ring-1 ring-amber-500/20" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{c.logo}</span>
                <div><p className="text-white font-semibold">{c.name}</p><p className="text-[10px] text-slate-500">{c.totalShipments} shipments</p></div>
              </div>
              {i === 0 && <span className="text-lg">🏆</span>}
            </div>
            <div className="flex items-center gap-0.5 mb-3">
              {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(c.rating) ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />)}
              <span className="text-[11px] text-slate-400 ml-1">{c.rating.toFixed(1)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div><p className="text-[10px] text-slate-500">Reliability</p><p className="text-lg font-bold text-white">{c.scheduleReliability}%</p></div>
              <div><p className="text-[10px] text-slate-500">On-Time</p><p className="text-lg font-bold text-white">{c.onTimePercentage}%</p></div>
              <div><p className="text-[10px] text-slate-500">Avg Transit</p><p className="text-sm text-slate-300">{c.avgTransitDays}d <span className="text-slate-500">(plan: {c.plannedTransitDays}d)</span></p></div>
              <div><p className="text-[10px] text-slate-500">Trend</p>
                <span className={`flex items-center gap-1 text-[11px] ${c.trend === "up" ? "text-emerald-400" : c.trend === "down" ? "text-rose-400" : "text-slate-400"}`}>
                  {c.trend === "up" ? <ArrowUp className="w-3 h-3" /> : c.trend === "down" ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {c.trend === "up" ? "Improving" : c.trend === "down" ? "Declining" : "Stable"}
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.04]">
          <h2 className="text-sm font-semibold text-white">All Carriers — Detailed</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Carrier", "Rating", "Reliability", "On-Time", "Transit", "Delays", "Dwell", "D&D", "Trend"].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-slate-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {sorted.map(c => (
                <tr key={c.name} className="hover:bg-white/[0.02] transition">
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><span>{c.logo}</span><span className="text-sm font-medium text-white">{c.name}</span></div></td>
                  <td className="px-5 py-3"><div className="flex items-center gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= Math.round(c.rating) ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />)}<span className="text-[10px] text-slate-400 ml-1">{c.rating.toFixed(1)}</span></div></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden"><div className={`h-full rounded-full ${c.scheduleReliability >= 80 ? "bg-emerald-500" : c.scheduleReliability >= 70 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${c.scheduleReliability}%` }} /></div>
                      <span className="text-sm text-slate-300">{c.scheduleReliability}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className={`text-sm font-medium ${c.onTimePercentage >= 80 ? "text-emerald-400" : c.onTimePercentage >= 70 ? "text-amber-400" : "text-rose-400"}`}>{c.onTimePercentage}%</span></td>
                  <td className="px-5 py-3"><span className="text-sm text-slate-300">{c.avgTransitDays}d</span><span className="text-[10px] text-slate-500 ml-1">/{c.plannedTransitDays}d</span></td>
                  <td className="px-5 py-3"><span className={`text-sm ${c.delayCount > 4 ? "text-rose-400" : "text-slate-300"}`}>{c.delayCount}</span><span className="text-[10px] text-slate-500">/{c.totalShipments}</span></td>
                  <td className="px-5 py-3 text-sm text-slate-300">{c.avgDwellTime}d</td>
                  <td className="px-5 py-3"><span className={`text-sm font-medium ${c.ddIncidents > 0 ? "text-rose-400" : "text-emerald-400"}`}>{c.ddIncidents}</span></td>
                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1 text-[11px] ${c.trend === "up" ? "text-emerald-400" : c.trend === "down" ? "text-rose-400" : "text-slate-400"}`}>
                      {c.trend === "up" ? <ArrowUp className="w-3 h-3" /> : c.trend === "down" ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                      {c.trend === "up" ? "Up" : c.trend === "down" ? "Down" : "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Alerts View
// ============================================================
function AlertsView() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? alerts : alerts.filter(a => a.type === filter);
  const unread = alerts.filter(a => !a.read).length;
  const critical = alerts.filter(a => a.severity === "critical").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Alerts & Notifications</h1>
        <p className="text-slate-400 text-sm mt-1">{unread} unread · {critical} critical</p>
      </div>

      <div className="flex gap-1.5 mb-5">
        {[{ k: "all", l: "All" }, { k: "dd_risk", l: "D&D Risk" }, { k: "delay", l: "Delays" }, { k: "customs", l: "Customs" }, { k: "milestone", l: "Milestones" }, { k: "carrier", l: "Carrier" }, { k: "system", l: "System" }].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition ${filter === f.k ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:text-white border border-transparent"}`}>{f.l}</button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map(a => (
          <GlassCard key={a.id} className={`p-5 ${!a.read ? "border-l-2 border-l-cyan-500" : ""}`}>
            <div className="flex items-start gap-3">
              <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${a.severity === "critical" ? "bg-rose-500 shadow-lg shadow-rose-500/30" : a.severity === "warning" ? "bg-amber-500" : "bg-cyan-500"}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-sm font-semibold ${!a.read ? "text-white" : "text-slate-300"}`}>{a.title}</h3>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${a.severity === "critical" ? "bg-rose-500/15 text-rose-400" : a.severity === "warning" ? "bg-amber-500/15 text-amber-400" : "bg-cyan-500/15 text-cyan-400"}`}>{a.severity}</span>
                  {a.actionRequired && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-medium">Action Required</span>}
                </div>
                <p className="text-[11px] text-slate-400 mb-1.5">{a.message}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-cyan-400">{a.bookingNumber}</span>
                  <span className="text-[10px] text-slate-600">{new Date(a.timestamp).toLocaleString()}</span>
                  {!a.read && <span className="text-[10px] text-cyan-400 font-medium">NEW</span>}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-8 p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Active Escalation Rules</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { n: "D&D Countdown", d: "Alert at 48h, 24h, 12h before free time expires", on: true },
            { n: "Vessel Delay Detection", d: "Alert when ETA changes by >12 hours", on: true },
            { n: "Customs Dwell Time", d: "Alert if customs clearance >48 hours", on: true },
            { n: "Carrier Auto-Escalation", d: "Draft escalation email when delay >72h", on: false },
          ].map(r => (
            <div key={r.n} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/30">
              <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${r.on ? "bg-emerald-400" : "bg-slate-600"}`} />
              <div><p className="text-sm font-medium text-white">{r.n}</p><p className="text-[11px] text-slate-400 mt-0.5">{r.d}</p></div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Email & OCR View
// ============================================================
function EmailIngestionView() {
  const processed = emailIngestions.filter(e => e.status === "Processed").length;
  const avg = Math.round(emailIngestions.filter(e => e.status === "Processed").reduce((s, e) => s + e.confidence, 0) / processed);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Email Ingestion & OCR</h1>
        <p className="text-slate-400 text-sm mt-1">Automated CRO processing and booking extraction</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <KPICard label="Processed" value={processed} color="text-white" sub="This week" />
        <KPICard label="Pending" value={emailIngestions.filter(e => e.status === "Pending Review").length} color="text-amber-400" sub="Low confidence" />
        <KPICard label="Avg Confidence" value={avg} suffix="%" color="text-emerald-400" sub="OCR accuracy" />
        <KPICard label="Auto-Create" value="86" suffix="%" color="text-cyan-400" sub="No manual input" />
      </div>

      <GlassCard className="overflow-hidden mb-8">
        <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Emails</h2>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Monitoring inbox</div>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {emailIngestions.map(e => (
            <div key={e.id} className="px-5 py-4 hover:bg-white/[0.02] transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-sm font-medium text-white">{e.subject}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${e.type === "CRO" ? "bg-cyan-500/15 text-cyan-400" : e.type === "D&D Invoice" ? "bg-rose-500/15 text-rose-400" : e.type === "Arrival Notice" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>{e.type}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${e.status === "Processed" ? "bg-emerald-500/15 text-emerald-400" : e.status === "Pending Review" ? "bg-amber-500/15 text-amber-400" : "bg-slate-800 text-slate-400"}`}>{e.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{e.sender} · {new Date(e.receivedAt).toLocaleString()}</p>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${e.confidence >= 90 ? "bg-emerald-500/15 text-emerald-400" : e.confidence >= 70 ? "bg-amber-500/15 text-amber-400" : "bg-rose-500/15 text-rose-400"}`}>{e.confidence}%</span>
              </div>
              {e.extractedFields && (
                <div className="mt-2 p-3 rounded-xl bg-slate-900/50 border border-white/[0.04]">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1.5">Extracted Fields</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                    {Object.entries(e.extractedFields).map(([k, v]) => (
                      <div key={k}><p className="text-[9px] text-slate-500">{k}</p><p className="text-[11px] text-slate-300 font-medium">{v}</p></div>
                    ))}
                  </div>
                  {e.shipmentId && <p className="text-[10px] text-cyan-400 mt-1.5">→ Linked to {e.shipmentId}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold text-white mb-4">OCR Processing Pipeline</h2>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { s: "1", t: "Email Detection", d: "OAuth-connected inbox monitors for carrier domains and shipping keywords", i: <Mail className="w-5 h-5" /> },
            { s: "2", t: "Classification", d: "ML model classifies: CRO, booking, arrival notice, invoice, or other", i: <Search className="w-5 h-5" /> },
            { s: "3", t: "OCR Extraction", d: "PDF attachments parsed via OCR. Fields mapped with confidence scores", i: <FileText className="w-5 h-5" /> },
            { s: "4", t: "Auto-Create", d: "High-confidence → auto-create shipment. Low → human review", i: <CheckCircle2 className="w-5 h-5" /> },
          ].map(step => (
            <div key={step.s} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-2.5 text-cyan-400">{step.i}</div>
              <p className="text-[10px] text-cyan-400 font-medium mb-0.5">Step {step.s}</p>
              <p className="text-sm font-medium text-white mb-0.5">{step.t}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Vendor Portal View
// ============================================================
function VendorPortalView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Vendor Portal</h1>
        <p className="text-slate-400 text-sm mt-1">Structured milestone logging from truckers, customs brokers, and warehouses</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <KPICard label="Active Vendors" value={8} color="text-white" sub="All shipments" />
        <KPICard label="Updates Today" value={4} color="text-cyan-400" sub="Milestones logged" />
        <KPICard label="Issues" value={1} color="text-rose-400" sub="Needs attention" />
        <KPICard label="Documents" value={5} color="text-emerald-400" sub="Uploaded this week" />
      </div>

      <GlassCard className="overflow-hidden mb-8">
        <div className="px-5 py-3.5 border-b border-white/[0.04]">
          <h2 className="text-sm font-semibold text-white">Recent Vendor Updates</h2>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {vendorUpdates.map(v => (
            <div key={v.id} className="px-5 py-4 hover:bg-white/[0.02] transition">
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${v.vendorType === "Trucker" ? "bg-indigo-500/15 text-indigo-400" : v.vendorType === "Customs Broker" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                  {v.vendorType === "Trucker" ? <Truck className="w-4 h-4" /> : v.vendorType === "Customs Broker" ? <FileText className="w-4 h-4" /> : <Factory className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white">{v.vendor}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{v.vendorType}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${v.status === "Completed" ? "bg-emerald-500/15 text-emerald-400" : v.status === "Issue" ? "bg-rose-500/15 text-rose-400" : "bg-cyan-500/15 text-cyan-400"}`}>{v.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-400"><span className="text-slate-300 font-medium">{v.milestone}</span> — {v.notes}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-cyan-400">{v.shipmentId}</span>
                    <span className="text-[10px] text-slate-600">{new Date(v.timestamp).toLocaleString()}</span>
                    {v.documents && <span className="text-[10px] text-slate-500 flex items-center gap-1"><Paperclip className="w-3 h-3" />{v.documents.length} file{v.documents.length > 1 ? "s" : ""}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-4 gap-3">
        {[
          { t: "Truckers", i: <Truck className="w-5 h-5" />, n: 3, d: "Pickup & delivery milestones" },
          { t: "Customs Brokers", i: <FileText className="w-5 h-5" />, n: 4, d: "Clearance & inspections" },
          { t: "CFS Operators", i: <Package className="w-5 h-5" />, n: 0, d: "Consolidation & stripping" },
          { t: "Warehouses", i: <Factory className="w-5 h-5" />, n: 1, d: "Final mile & POD" },
        ].map(t => (
          <GlassCard key={t.t} className="p-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3">{t.i}</div>
            <p className="text-sm font-medium text-white">{t.t}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.d}</p>
            <p className="text-[11px] text-slate-300 mt-2">{t.n} registered</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Analytics View
// ============================================================
function AnalyticsView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>
        <p className="text-slate-400 text-sm mt-1">Trade lane performance, cost analysis, and custom reports</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-5">Shipment Volume (6 Months)</h3>
          <div className="flex items-end gap-2.5 h-36">
            {[{ m: "Oct", v: 12 }, { m: "Nov", v: 18 }, { m: "Dec", v: 14 }, { m: "Jan", v: 22 }, { m: "Feb", v: 19 }, { m: "Mar", v: 8 }].map(d => (
              <div key={d.m} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-slate-400">{d.v}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 transition" style={{ height: `${(d.v / 25) * 110}px` }} />
                <span className="text-[10px] text-slate-500">{d.m}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-5">On-Time Trend</h3>
          <div className="flex items-end gap-2.5 h-36">
            {[{ m: "Oct", v: 72 }, { m: "Nov", v: 68 }, { m: "Dec", v: 75 }, { m: "Jan", v: 80 }, { m: "Feb", v: 78 }, { m: "Mar", v: 76 }].map(d => (
              <div key={d.m} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-slate-400">{d.v}%</span>
                <div className={`w-full rounded-t-lg transition ${d.v >= 80 ? "bg-gradient-to-t from-emerald-600 to-emerald-400" : d.v >= 70 ? "bg-gradient-to-t from-amber-600 to-amber-400" : "bg-gradient-to-t from-rose-600 to-rose-400"}`} style={{ height: `${((d.v - 60) / 40) * 110}px` }} />
                <span className="text-[10px] text-slate-500">{d.m}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="overflow-hidden mb-5">
        <div className="px-5 py-3.5 border-b border-white/[0.04]">
          <h2 className="text-sm font-semibold text-white">Trade Lane Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Trade Lane", "Shipments", "Avg Transit", "On-Time", "D&D Cost", "Top Carrier"].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium text-slate-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {[
                { l: "Asia → Europe", s: 30, t: 28, o: 81, d: 1700, c: "CMA CGM" },
                { l: "Asia → N. America", s: 18, t: 16, o: 82, d: 450, c: "Evergreen" },
                { l: "Europe → N. America", s: 14, t: 14, o: 71, d: 1800, c: "Hapag-Lloyd" },
                { l: "S. America → Europe", s: 22, t: 18, o: 65, d: 3200, c: "MSC" },
                { l: "Asia → Middle East", s: 10, t: 12, o: 88, d: 0, c: "ONE" },
              ].map(r => (
                <tr key={r.l} className="hover:bg-white/[0.02] transition">
                  <td className="px-5 py-3 text-sm font-medium text-white">{r.l}</td>
                  <td className="px-5 py-3 text-sm text-slate-300">{r.s}</td>
                  <td className="px-5 py-3 text-sm text-slate-300">{r.t}d</td>
                  <td className="px-5 py-3"><span className={`text-sm font-medium ${r.o >= 80 ? "text-emerald-400" : r.o >= 70 ? "text-amber-400" : "text-rose-400"}`}>{r.o}%</span></td>
                  <td className="px-5 py-3"><span className={`text-sm ${r.d > 0 ? "text-rose-400" : "text-emerald-400"}`}>€{r.d.toLocaleString()}</span></td>
                  <td className="px-5 py-3 text-sm text-slate-300">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Cost Breakdown (90d)</h3>
          {[{ l: "Ocean Freight", v: "€284k", p: 78 }, { l: "D&D Charges", v: "€5.5k", p: 2 }, { l: "Trucking", v: "€42k", p: 12 }, { l: "Customs", v: "€18.5k", p: 5 }].map(c => (
            <div key={c.l} className="mb-2.5">
              <div className="flex justify-between mb-0.5"><span className="text-[11px] text-slate-400">{c.l}</span><span className="text-[11px] text-slate-300">{c.v}</span></div>
              <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden"><div className="h-full rounded-full bg-cyan-500/60" style={{ width: `${c.p}%` }} /></div>
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Container Types</h3>
          {[{ t: "40' HC", n: 28 }, { t: "40' GP", n: 22 }, { t: "20' GP", n: 18 }, { t: "40' Reefer", n: 6 }].map(c => (
            <div key={c.t} className="flex items-center gap-2 mb-2.5">
              <span className="text-[11px] text-slate-300 w-16">{c.t}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${(c.n / 30) * 100}%` }} /></div>
              <span className="text-[10px] text-slate-400 w-6 text-right">{c.n}</span>
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Export Options</h3>
          {[{ l: "Shipment Report", f: "Excel" }, { l: "D&D Analysis", f: "Excel" }, { l: "Carrier Performance", f: "PDF" }, { l: "Custom Report", f: "Excel" }].map(r => (
            <button key={r.l} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/50 transition text-left mb-1.5 group">
              <span className="text-sm text-white group-hover:text-cyan-400 transition">{r.l}</span>
              <span className="text-[9px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">{r.f}</span>
            </button>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

// ============================================================
// Main Demo Page
// ============================================================
export default function LyncPathDemo() {
  const [view, setView] = useState<View>("overview");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const unreadAlerts = alerts.filter(a => !a.read).length;

  const handleSelectShipment = (s: Shipment) => {
    setSelectedShipment(s);
    setView("shipment-detail");
  };

  const handleNavigate = (v: View) => {
    setView(v);
    setSelectedShipment(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-white/[0.04] flex flex-col fixed h-screen bg-[#0a0f1e]/95 backdrop-blur-xl z-50">
        <div className="px-5 py-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">LyncPath</span>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = item.key === view || (item.key === "shipments" && view === "shipment-detail");
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/15" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon className="w-[16px] h-[16px]" />
                {item.label}
                {item.key === "alerts" && unreadAlerts > 0 && (
                  <span className="ml-auto bg-rose-500 text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[18px] px-1">{unreadAlerts}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">OP</div>
            <div><p className="text-xs font-medium text-white">Operations Team</p><p className="text-[10px] text-slate-500">Demo Account</p></div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-60">
        <header className="sticky top-0 z-40 border-b border-white/[0.04] bg-[#0a0f1e]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-7 py-3">
            <p className="text-[11px] text-slate-500">March 11, 2026 — Live Demo</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-medium">All systems online</span>
              </div>
              <div className="text-[10px] text-slate-500">6 carriers · 5 trade lanes</div>
            </div>
          </div>
        </header>

        <div className="p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={view + (selectedShipment?.id || "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {view === "overview" && <OverviewView onNavigate={handleNavigate} onSelectShipment={handleSelectShipment} />}
              {view === "shipments" && <ShipmentsView onSelectShipment={handleSelectShipment} />}
              {view === "shipment-detail" && selectedShipment && <ShipmentDetailView shipment={selectedShipment} onBack={() => handleNavigate("shipments")} />}
              {view === "dd-exposure" && <DDExposureView />}
              {view === "carrier-scorecard" && <CarrierScorecardView />}
              {view === "alerts" && <AlertsView />}
              {view === "email-ingestion" && <EmailIngestionView />}
              {view === "vendor-portal" && <VendorPortalView />}
              {view === "analytics" && <AnalyticsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
