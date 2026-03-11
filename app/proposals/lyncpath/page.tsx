"use client";

import Link from "next/link";
import { Layers, Ship, Mail, Users, DollarSign, BarChart3, Bell, ArrowRight } from "lucide-react";

export default function LyncPathProposal() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">LyncPath</span>
        </div>
        <Link href="/proposals/lyncpath/demo" className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm font-medium transition">
          View Live Demo
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-medium">Real-time container visibility</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Every container.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">One view.</span>
            <br />Zero surprises.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
            LyncPath unifies carrier tracking, email ingestion, and vendor updates into a single operational
            dashboard. Stop chasing updates. Start making decisions.
          </p>
          <div className="flex gap-4">
            <Link href="/proposals/lyncpath/demo" className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-cyan-500/25 flex items-center gap-2">
              View Live Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-16 max-w-2xl">
          {[
            { value: "13", label: "Milestone Tracking" },
            { value: "97%", label: "OCR Accuracy" },
            { value: "<2s", label: "Update Latency" },
            { value: "6+", label: "Carrier APIs" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-white mb-4">Built for operations teams</h2>
        <p className="text-slate-400 mb-14 max-w-lg">Every feature solves a real problem that logistics professionals face daily.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: <Mail className="w-5 h-5" />, title: "Email Ingestion & OCR", desc: "Auto-detect CROs and booking confirmations. Extract fields with 95%+ accuracy. No manual data entry." },
            { icon: <Ship className="w-5 h-5" />, title: "Live Container Tracking", desc: "Real-time positions via Project44, Shipsgo, and carrier APIs. Normalized across all providers." },
            { icon: <Users className="w-5 h-5" />, title: "Vendor Portal", desc: "Structured milestone logging for truckers, customs brokers, and warehouses. No more WhatsApp." },
            { icon: <DollarSign className="w-5 h-5" />, title: "D&D Exposure Monitor", desc: "Countdown timers on free time. Escalating alerts at 48h, 24h, 12h. Projected cost calculator." },
            { icon: <BarChart3 className="w-5 h-5" />, title: "Carrier Scorecards", desc: "Schedule reliability, transit consistency, delay frequency. Data for carrier negotiations." },
            { icon: <Bell className="w-5 h-5" />, title: "Smart Alerts", desc: "Logic-driven escalation engine. Auto-draft carrier emails. Custom trigger rules." },
          ].map((f, i) => (
            <div key={i} className="bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] backdrop-blur-xl rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-white mb-14">How LyncPath works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Connect Email", desc: "OAuth integration with Gmail, Outlook, or IMAP. We monitor for carrier communications." },
            { step: "02", title: "Auto-Extract", desc: "OCR engine parses CRO PDFs. Booking, container, vessel, port pair — all mapped automatically." },
            { step: "03", title: "Track Live", desc: "Container positions update in real-time via aggregator APIs. 13 milestones tracked end-to-end." },
            { step: "04", title: "Act on Data", desc: "D&D alerts, carrier scorecards, and custom rules turn raw data into operational intelligence." },
          ].map(s => (
            <div key={s.step}>
              <div className="text-5xl font-extrabold text-slate-800/50 mb-4">{s.step}</div>
              <h3 className="text-white font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to see it in action?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Explore the live demo with real shipping data across 6 carriers and 5 trade lanes.</p>
          <Link href="/proposals/lyncpath/demo" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white rounded-xl font-semibold transition shadow-lg shadow-cyan-500/25">
            Launch Demo Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.04] py-8 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-slate-600 text-sm">© 2026 LyncPath. All rights reserved.</span>
          <span className="text-slate-600 text-xs">Prototype by Autoflux</span>
        </div>
      </footer>
    </div>
  );
}
