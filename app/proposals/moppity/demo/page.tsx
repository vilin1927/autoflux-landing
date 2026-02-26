"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  GitBranch,
  Settings,
  Sparkles,
  Send,
  Loader2,
  Bot,
  User,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Monitor,
  ArrowLeft,
  RotateCcw,
  DollarSign,
  Wine,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Info,
  ArrowRight,
} from "lucide-react";
import {
  demoData,
  kpis,
  skus,
  alerts,
  channelMix,
  velocityTrend,
  traceabilityData,
  sampleConversations,
} from "@/data/proposals/moppity";

type Screen = "dashboard" | "inventory" | "traceability" | "chat";
type CostBasis = "accounting" | "economic";
type MessageRole = "user" | "assistant" | "thinking";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { type: string; [key: string]: any };
  followUp?: string;
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function MoppityDemoPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [isMobile, setIsMobile] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentScreen === "chat" && messages.length === 0) {
      setMessages([
        { id: "greeting", role: "assistant", content: demoData.assistant.greeting },
      ]);
    }
  }, [currentScreen, messages.length]);

  /* ── Chat logic ── */
  const animateThinking = async (thinkingId: string, steps: string[]) => {
    for (const step of steps) {
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, content: step } : m))
      );
      await new Promise((r) => setTimeout(r, 700));
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: text },
    ]);
    setInputValue("");
    setIsTyping(true);

    const lower = text.toLowerCase();
    const thinkingId = `t-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "thinking", content: "Processing..." },
    ]);

    let conv: (typeof sampleConversations)[keyof typeof sampleConversations] | undefined;

    if (lower.includes("margin") || lower.includes("highest") || lower.includes("profitable")) {
      conv = sampleConversations.margins;
    } else if (lower.includes("stockout") || lower.includes("risk") || lower.includes("cover") || lower.includes("low")) {
      conv = sampleConversations.stockout;
    } else if (lower.includes("what if") || lower.includes("scenario") || lower.includes("grape price") || lower.includes("hilltops")) {
      conv = sampleConversations.scenario;
    } else if (lower.includes("velocity") || lower.includes("trend") || lower.includes("sales") || lower.includes("quarter")) {
      conv = sampleConversations.velocity;
    }

    if (!conv) {
      await animateThinking(thinkingId, [
        "Analyzing your question...",
        "Searching computed views...",
      ]);
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== thinkingId)
          .concat({
            id: Date.now().toString(),
            role: "assistant",
            content:
              "I can answer questions about your sales, margins, inventory, and run scenarios. Try:\n\n• \"What are my highest margin wines?\"\n• \"Which wines are at stockout risk?\"\n• \"What if Hilltops grape price goes up 15%?\"\n• \"Show me sales velocity this quarter\"",
          })
      );
      setIsTyping(false);
      return;
    }

    await animateThinking(thinkingId, conv.thinking);
    setMessages((prev) =>
      prev
        .filter((m) => m.id !== thinkingId)
        .concat({
          id: Date.now().toString(),
          role: "assistant",
          content: conv!.response.text,
          data: conv!.response.data,
          followUp: conv!.response.followUp,
        })
    );
    setIsTyping(false);
  };

  /* ── Mobile guard ── */
  if (isMobile) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-lg border border-stone-200">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-amber-700" />
          </div>
          <h1 className="text-xl font-bold text-stone-900 mb-2">
            Best Viewed on Desktop
          </h1>
          <p className="text-stone-600 mb-6">
            This demo showcases a full dashboard experience. Please view on a
            larger screen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* ─── Sidebar ─── */}
      <aside className="w-64 bg-[#1C1917] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
              <Wine className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Moppity Intelligence</h1>
              <p className="text-[11px] text-white/50">Data Reporting System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <NavItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={currentScreen === "dashboard"}
              onClick={() => setCurrentScreen("dashboard")}
            />
            <NavItem
              icon={Package}
              label="Inventory Cover"
              active={currentScreen === "inventory"}
              onClick={() => setCurrentScreen("inventory")}
            />
            <NavItem
              icon={GitBranch}
              label="COGS Traceability"
              active={currentScreen === "traceability"}
              onClick={() => setCurrentScreen("traceability")}
            />
            <NavItem
              icon={MessageSquare}
              label="Ask AI"
              active={currentScreen === "chat"}
              onClick={() => setCurrentScreen("chat")}
              badge={<Sparkles className="w-3 h-3 text-amber-400" />}
            />
            <NavItem icon={BarChart3} label="Board Pack" disabled />
            <NavItem icon={Settings} label="Settings" disabled />
          </ul>
        </nav>

        <div className="p-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
              Data Sources
            </p>
            {["Vinsight", "Xero", "Access DB", "Sheets"].map((src) => (
              <div key={src} className="flex items-center gap-2 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-white/70">{src}</span>
              </div>
            ))}
            <p className="text-[10px] text-white/30 mt-2">Last sync: 2h ago</p>
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 bg-amber-600/30 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-amber-400">JB</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Jason Brown</p>
              <p className="text-[11px] text-white/40">Demo Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-white border-b border-stone-200 flex items-center justify-between px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
            Interactive Demo
          </span>
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            autoflux.digital
          </Link>
        </header>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === "dashboard" && (
              <DashboardScreen
                key="dashboard"
                onOpenChat={() => setCurrentScreen("chat")}
                onOpenInventory={() => setCurrentScreen("inventory")}
              />
            )}
            {currentScreen === "inventory" && (
              <InventoryScreen key="inventory" />
            )}
            {currentScreen === "traceability" && (
              <TraceabilityScreen key="traceability" />
            )}
            {currentScreen === "chat" && (
              <ChatScreen
                key="chat"
                messages={messages}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSend={handleSendMessage}
                onSuggested={handleSendMessage}
                onReset={() => {
                  setMessages([]);
                  setCurrentScreen("dashboard");
                }}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────── NAV ITEM ─────────────────────── */

function NavItem({
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  badge?: React.ReactNode;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          active
            ? "bg-white/10 text-white"
            : disabled
            ? "text-white/25 cursor-not-allowed"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="flex-1 text-left">{label}</span>
        {badge}
      </button>
    </li>
  );
}

/* ─────────────────────── KPI CARD ─────────────────────── */

function KPICard({
  icon: Icon,
  label,
  value,
  change,
  iconColor,
  iconBg,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: number;
  iconColor: string;
  iconBg: string;
}) {
  const neg = change < 0;
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <span className="text-sm text-stone-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-stone-900 mb-1">{value}</p>
      <div className="flex items-center gap-1">
        {neg ? (
          <TrendingDown className="w-3 h-3 text-red-500" />
        ) : (
          <TrendingUp className="w-3 h-3 text-emerald-500" />
        )}
        <span
          className={`text-xs font-medium ${
            neg ? "text-red-500" : "text-emerald-500"
          }`}
        >
          {neg ? "" : "+"}
          {change.toFixed(1)}%
        </span>
        <span className="text-xs text-stone-400">vs last month</span>
      </div>
    </div>
  );
}

/* ─────────────────────── DASHBOARD ─────────────────────── */

function DashboardScreen({
  onOpenChat,
  onOpenInventory,
}: {
  onOpenChat: () => void;
  onOpenInventory: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-auto p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900">
            Executive Overview
          </h1>
          <p className="text-stone-500 text-sm">
            February 2026 &middot; All channels &middot; Moppity Vineyards
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <KPICard
            icon={DollarSign}
            label="Revenue MTD"
            value={`$${kpis.mtdRevenue.toLocaleString()}`}
            change={kpis.changes.revenue}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-100"
          />
          <KPICard
            icon={Wine}
            label="Cases Sold MTD"
            value={kpis.mtdCasesSold.toLocaleString()}
            change={kpis.changes.cases}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />
          <KPICard
            icon={BarChart3}
            label="Avg GP Margin"
            value={`${kpis.avgGPMargin}%`}
            change={kpis.changes.margin}
            iconColor="text-amber-600"
            iconBg="bg-amber-100"
          />
          <KPICard
            icon={Package}
            label="Inventory Value"
            value={`$${(kpis.inventoryValue / 1000000).toFixed(1)}M`}
            change={kpis.changes.inventory}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
        </div>

        {/* Alerts */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Exceptions & Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl border p-4 ${
                  a.severity === "critical"
                    ? "bg-red-50 border-red-200"
                    : a.severity === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      a.severity === "critical"
                        ? "bg-red-100"
                        : a.severity === "warning"
                        ? "bg-amber-100"
                        : "bg-emerald-100"
                    }`}
                  >
                    {a.severity === "info" ? (
                      <ShieldCheck
                        className="w-4 h-4 text-emerald-600"
                      />
                    ) : (
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          a.severity === "critical"
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        a.severity === "critical"
                          ? "text-red-900"
                          : a.severity === "warning"
                          ? "text-amber-900"
                          : "text-emerald-900"
                      }`}
                    >
                      {a.title}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        a.severity === "critical"
                          ? "text-red-700"
                          : a.severity === "warning"
                          ? "text-amber-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {a.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Sales Velocity (mini bar chart) */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="font-bold text-stone-900 mb-1 text-sm">
              Sales Velocity — Top SKUs
            </h3>
            <p className="text-xs text-stone-400 mb-4">Cases/month</p>
            <div className="space-y-2.5">
              {skus
                .sort((a, b) => b.monthlySalesVelocity - a.monthlySalesVelocity)
                .slice(0, 6)
                .map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500 w-20 truncate">
                      {s.name.replace(/ \d{4}$/, "")}
                    </span>
                    <div className="flex-1 h-5 bg-stone-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded"
                        style={{
                          width: `${(s.monthlySalesVelocity / 400) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-stone-700 w-8 text-right">
                      {s.monthlySalesVelocity}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Channel Mix */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="font-bold text-stone-900 mb-1 text-sm">
              Channel Revenue — MTD
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              ${kpis.mtdRevenue.toLocaleString()} total
            </p>
            <div className="space-y-3">
              {channelMix.map((ch) => (
                <div key={ch.channel}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-stone-600">{ch.channel}</span>
                    <span className="text-xs font-medium text-stone-900">
                      ${ch.revenue.toLocaleString()} ({ch.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${ch.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onOpenInventory}
              className="mt-4 w-full text-xs text-amber-700 font-medium hover:underline flex items-center justify-center gap-1"
            >
              View Inventory Cover <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="font-bold text-stone-900 mb-1 text-sm">
              Cases Sold — 6 Month Trend
            </h3>
            <p className="text-xs text-stone-400 mb-4">All channels</p>
            <div className="flex items-end gap-2 h-32">
              {velocityTrend.map((m) => {
                const maxCases = Math.max(...velocityTrend.map((v) => v.cases));
                const pct = (m.cases / maxCases) * 100;
                return (
                  <div
                    key={m.month}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-[10px] font-medium text-stone-700">
                      {m.cases}
                    </span>
                    <div className="w-full bg-stone-100 rounded-t overflow-hidden flex-1 flex items-end">
                      <div
                        className="w-full bg-amber-500 rounded-t transition-all"
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-stone-400">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-gradient-to-br from-[#1C1917] to-[#292524] rounded-2xl p-6 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg mb-1">
                Ask Moppity Intelligence
              </h2>
              <p className="text-white/60 text-sm mb-4">
                Query your data in plain English. Every answer references the
                underlying view — no hallucinated numbers.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "What are my highest margin wines?",
                  "Which wines are at stockout risk?",
                  "What if Hilltops grape price goes up 15%?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={onOpenChat}
                    className="px-3 py-1.5 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Open AI Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── INVENTORY HEATMAP ─────────────────────── */

const channels = ["cellarDoor", "wholesale", "export", "online"] as const;
const channelLabels: Record<string, string> = {
  cellarDoor: "Cellar Door",
  wholesale: "Wholesale",
  export: "Export",
  online: "Online DTC",
};

function coverColor(months: number) {
  if (months < 3)
    return "bg-red-100 text-red-800 border-red-200";
  if (months < 6)
    return "bg-amber-100 text-amber-800 border-amber-200";
  if (months <= 9)
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  return "bg-blue-100 text-blue-800 border-blue-200";
}

function InventoryScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-auto p-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900">Inventory Cover</h1>
          <p className="text-stone-500 text-sm">
            Months of stock by SKU and channel &middot; Target: 3–9 months
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs text-stone-500">Cover (months):</span>
          {[
            { label: "< 3 Critical", cls: "bg-red-100 text-red-700" },
            { label: "3–6 Low", cls: "bg-amber-100 text-amber-700" },
            { label: "6–9 Healthy", cls: "bg-emerald-100 text-emerald-700" },
            { label: "> 9 Overstocked", cls: "bg-blue-100 text-blue-700" },
          ].map((l) => (
            <span
              key={l.label}
              className={`text-[11px] font-medium px-2 py-0.5 rounded ${l.cls}`}
            >
              {l.label}
            </span>
          ))}
        </div>

        {/* Heatmap */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 w-56">
                  SKU
                </th>
                {channels.map((ch) => (
                  <th
                    key={ch}
                    className="px-4 py-3 text-xs font-semibold text-stone-500 text-center"
                  >
                    {channelLabels[ch]}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold text-stone-500 text-center">
                  Total
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-stone-500 text-right">
                  Velocity
                </th>
              </tr>
            </thead>
            <tbody>
              {skus.map((s, i) => (
                <tr
                  key={s.id}
                  className={i % 2 === 0 ? "bg-stone-50/50" : ""}
                >
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-stone-900">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-stone-400">{s.range}</p>
                  </td>
                  {channels.map((ch) => {
                    const cover = s.channels[ch].cover;
                    return (
                      <td key={ch} className="px-4 py-3 text-center">
                        <span
                          className={`inline-block min-w-[3.5rem] text-xs font-semibold px-2 py-1 rounded border ${coverColor(
                            cover
                          )}`}
                        >
                          {cover.toFixed(1)}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block min-w-[3.5rem] text-xs font-bold px-2 py-1 rounded border ${coverColor(
                        s.coverMonths
                      )}`}
                    >
                      {s.coverMonths.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-stone-700">
                    {s.monthlySalesVelocity}{" "}
                    <span className="text-stone-400">c/mo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottling Recommendations */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Bottling Recommendations
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-amber-200 p-4">
              <p className="text-sm font-semibold text-stone-900">
                Tumbarumba Pinot Noir
              </p>
              <p className="text-xs text-red-600 font-medium mt-1">
                URGENT — 2.2 months cover
              </p>
              <p className="text-xs text-stone-600 mt-2">
                No bulk available. Next vintage May 2026. Consider allocating
                remaining stock to highest-margin channel (Cellar Door).
              </p>
            </div>
            <div className="bg-white rounded-lg border border-amber-200 p-4">
              <p className="text-sm font-semibold text-stone-900">
                Estate Cabernet Sauvignon
              </p>
              <p className="text-xs text-amber-600 font-medium mt-1">
                Bottle 600 cases by mid-March
              </p>
              <p className="text-xs text-stone-600 mt-2">
                2,400L bulk remaining. At 110 cases/mo velocity, current stock
                covers 4.7 months. Bottling extends to 10+ months.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-amber-200 p-4">
              <p className="text-sm font-semibold text-stone-900">
                Estate Chardonnay
              </p>
              <p className="text-xs text-amber-600 font-medium mt-1">
                Bottle 400 cases by end of March
              </p>
              <p className="text-xs text-stone-600 mt-2">
                1,600L bulk remaining. Velocity trending up (+19% QoQ). Cellar
                Door channel at 4.5 months needs priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── COGS TRACEABILITY ─────────────────────── */

function TraceabilityScreen() {
  const traceableSkus = Object.keys(traceabilityData);
  const [selectedSku, setSelectedSku] = useState(traceableSkus[0]);
  const [basis, setBasis] = useState<CostBasis>("accounting");
  const [showScenario, setShowScenario] = useState(false);
  const [scenarioPct, setScenarioPct] = useState(15);

  const data = traceabilityData[selectedSku];
  const isEconomic = basis === "economic";

  const grapeTotal = data.components.reduce(
    (sum, c) => sum + (isEconomic ? c.economicCost : c.accountingCost),
    0
  );
  const grapePerCase = grapeTotal / data.casesProduced;
  const totalCOGS = grapePerCase + data.processingPerCase + data.packagingPerCase;
  const gp = data.pricePerCase - totalCOGS;
  const gpPct = (gp / data.pricePerCase) * 100;

  // Scenario calc (Hilltops +X%)
  const scenarioGrapeTotal = data.components.reduce((sum, c) => {
    const base = isEconomic ? c.economicCost : c.accountingCost;
    return sum + (c.region === "Hilltops" ? base * (1 + scenarioPct / 100) : base);
  }, 0);
  const scenarioGrapePerCase = scenarioGrapeTotal / data.casesProduced;
  const scenarioCOGS =
    scenarioGrapePerCase + data.processingPerCase + data.packagingPerCase;
  const scenarioGP = data.pricePerCase - scenarioCOGS;
  const scenarioGPPct = (scenarioGP / data.pricePerCase) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-auto p-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">
              COGS Traceability
            </h1>
            <p className="text-stone-500 text-sm">
              SKU &rarr; Blend &rarr; Batch &rarr; Grape Inputs
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* SKU selector */}
            <div className="relative">
              <select
                value={selectedSku}
                onChange={(e) => setSelectedSku(e.target.value)}
                className="appearance-none bg-white border border-stone-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-stone-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              >
                {traceableSkus.map((id) => (
                  <option key={id} value={id}>
                    {traceabilityData[id].skuName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {/* Basis toggle */}
            <div className="flex bg-stone-100 rounded-lg p-0.5">
              <button
                onClick={() => setBasis("accounting")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  basis === "accounting"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500"
                }`}
              >
                Accounting
              </button>
              <button
                onClick={() => setBasis("economic")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  basis === "economic"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500"
                }`}
              >
                Economic
              </button>
            </div>
          </div>
        </div>

        {/* Traceability tree */}
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          {/* SKU header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Wine className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-stone-900">{data.skuName}</h2>
              <p className="text-xs text-stone-500">
                {data.blendName} &middot; {data.casesProduced} cases produced
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-stone-900">
                ${data.pricePerCase}
                <span className="text-sm font-normal text-stone-400">
                  /case
                </span>
              </p>
            </div>
          </div>

          {/* Grape components */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Grape Inputs
            </h3>
            <div className="space-y-2">
              {data.components.map((c) => {
                const cost = isEconomic ? c.economicCost : c.accountingCost;
                const price = isEconomic
                  ? c.economicPricePerTonne
                  : c.accountingPricePerTonne;
                return (
                  <div
                    key={c.batchId}
                    className="flex items-center gap-4 bg-stone-50 rounded-lg p-3"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <GitBranch className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900">
                        {c.grape} — {c.region}{" "}
                        <span className="text-stone-400">({c.percentage}%)</span>
                      </p>
                      <p className="text-xs text-stone-500">
                        Batch {c.batchId} &middot; {c.tonnes}t &times; $
                        {price.toLocaleString()}/t
                      </p>
                    </div>
                    <p className="text-sm font-bold text-stone-900">
                      ${cost.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cost waterfall */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            <CostBlock
              label="Grape Cost"
              value={grapePerCase}
              total={data.pricePerCase}
              color="bg-purple-500"
            />
            <CostBlock
              label="Processing"
              value={data.processingPerCase}
              total={data.pricePerCase}
              color="bg-amber-500"
            />
            <CostBlock
              label="Packaging"
              value={data.packagingPerCase}
              total={data.pricePerCase}
              color="bg-stone-400"
            />
            <CostBlock
              label="Total COGS"
              value={totalCOGS}
              total={data.pricePerCase}
              color="bg-red-500"
              bold
            />
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <p className="text-xs text-emerald-600 mb-1">Gross Profit</p>
              <p className="text-xl font-bold text-emerald-700">
                ${gp.toFixed(0)}
              </p>
              <p className="text-xs font-semibold text-emerald-600">
                {gpPct.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Scenario toggle */}
          <div className="border-t border-stone-100 pt-4">
            <button
              onClick={() => setShowScenario(!showScenario)}
              className="flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              <Sparkles className="w-4 h-4" />
              {showScenario ? "Hide" : "Run"} Scenario: Hilltops Grape Price
              Change
            </button>

            {showScenario && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <label className="text-sm text-stone-600">
                    Hilltops grape price change:
                  </label>
                  <div className="flex items-center gap-2">
                    {[5, 10, 15, 20, 25].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setScenarioPct(pct)}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                          scenarioPct === pct
                            ? "bg-amber-500 text-white"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        +{pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-stone-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-stone-500 mb-1">Current COGS</p>
                    <p className="text-xl font-bold text-stone-900">
                      ${totalCOGS.toFixed(0)}
                    </p>
                    <p className="text-xs text-stone-500">
                      GP: {gpPct.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-red-600 mb-1">
                      Scenario COGS (+{scenarioPct}%)
                    </p>
                    <p className="text-xl font-bold text-red-700">
                      ${scenarioCOGS.toFixed(0)}
                    </p>
                    <p className="text-xs text-red-600">
                      GP: {scenarioGPPct.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-amber-600 mb-1">Margin Impact</p>
                    <p className="text-xl font-bold text-amber-700">
                      {(scenarioGPPct - gpPct).toFixed(1)}pp
                    </p>
                    <p className="text-xs text-amber-600">
                      ${(scenarioGP - gp).toFixed(0)}/case
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CostBlock({
  label,
  value,
  total,
  color,
  bold,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  bold?: boolean;
}) {
  return (
    <div className="bg-stone-50 rounded-lg p-3 text-center">
      <p className="text-xs text-stone-500 mb-1">{label}</p>
      <p
        className={`text-xl ${
          bold ? "font-bold" : "font-semibold"
        } text-stone-900`}
      >
        ${value.toFixed(0)}
      </p>
      <div className="mt-2 h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${(value / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────── AI CHAT ─────────────────────── */

function ChatScreen({
  messages,
  inputValue,
  setInputValue,
  onSend,
  onSuggested,
  onReset,
  isTyping,
  messagesEndRef,
}: {
  messages: Message[];
  inputValue: string;
  setInputValue: (v: string) => void;
  onSend: (text: string) => void;
  onSuggested: (q: string) => void;
  onReset: () => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex"
    >
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-3 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-sm">
                {demoData.assistant.name}
              </h2>
              <p className="text-[11px] text-stone-400">
                Grounded in Postgres computed views — no hallucinated figures
              </p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-stone-200 bg-white">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSend(inputValue);
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about margins, inventory, scenarios..."
                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-5 py-3 bg-[#1C1917] text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-72 border-l border-stone-200 bg-white p-4 overflow-auto">
        <h3 className="font-bold text-stone-900 mb-4 text-sm">
          Suggested Questions
        </h3>
        {demoData.suggestedQuestions.map((cat, i) => (
          <div key={i} className="mb-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
              {cat.category}
            </h4>
            <div className="space-y-1">
              {cat.questions.map((q, j) => (
                <button
                  key={j}
                  onClick={() => onSuggested(q)}
                  className="w-full text-left px-3 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── MESSAGE BUBBLE ─────────────────────── */

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "thinking") {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="bg-stone-100 rounded-2xl rounded-tl-none px-4 py-3">
          <div className="flex items-center gap-2 text-stone-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-mono">{message.content}</span>
          </div>
        </div>
      </div>
    );
  }

  if (message.role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-[#1C1917] text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-lg">
          <p className="text-sm">{message.content}</p>
        </div>
        <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-stone-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 max-w-2xl">
        <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
          <p className="text-sm text-stone-800 whitespace-pre-wrap">
            {message.content.split(/\*\*(.*?)\*\*/g).map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
          {message.data && <DataVisualization data={message.data} />}
          {message.followUp && (
            <p className="mt-3 text-xs text-stone-400 italic">
              {message.followUp}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── DATA VISUALIZATIONS ─────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataVisualization({ data }: { data: any }) {
  if (data.type === "margin_table") {
    return (
      <div className="mt-4 overflow-hidden rounded-lg border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-3 py-2 text-left text-stone-600 text-xs">SKU</th>
              <th className="px-3 py-2 text-right text-stone-600 text-xs">Price</th>
              <th className="px-3 py-2 text-right text-stone-600 text-xs">COGS</th>
              <th className="px-3 py-2 text-right text-stone-600 text-xs">GP</th>
              <th className="px-3 py-2 text-right text-stone-600 text-xs">GP%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {data.rows.map(
              (
                r: {
                  sku: string;
                  price: number;
                  cogs: number;
                  gp: number;
                  gpPct: number;
                },
                i: number
              ) => (
                <tr key={i} className={i < 2 ? "bg-emerald-50/50" : ""}>
                  <td className="px-3 py-2 font-medium text-stone-900">
                    {r.sku}
                  </td>
                  <td className="px-3 py-2 text-right">${r.price}</td>
                  <td className="px-3 py-2 text-right">${r.cogs}</td>
                  <td className="px-3 py-2 text-right font-medium">${r.gp}</td>
                  <td className="px-3 py-2 text-right">
                    <span
                      className={`font-semibold ${
                        r.gpPct >= 55
                          ? "text-emerald-600"
                          : r.gpPct >= 48
                          ? "text-amber-600"
                          : "text-stone-600"
                      }`}
                    >
                      {r.gpPct.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.type === "stockout_alerts") {
    return (
      <div className="mt-4 space-y-3">
        {data.items.map(
          (
            item: {
              sku: string;
              cover: number;
              velocity: number;
              stock: number;
              estStockout: string;
              worstChannel: string;
            },
            i: number
          ) => (
            <div
              key={i}
              className={`rounded-lg p-3 border ${
                item.cover < 3
                  ? "bg-red-50 border-red-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    item.cover < 3 ? "text-red-500" : "text-amber-500"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-semibold text-sm ${
                        item.cover < 3 ? "text-red-900" : "text-amber-900"
                      }`}
                    >
                      {item.sku}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.cover < 3
                          ? "bg-red-200 text-red-800"
                          : "bg-amber-200 text-amber-800"
                      }`}
                    >
                      {item.cover} months
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      item.cover < 3 ? "text-red-700" : "text-amber-700"
                    }`}
                  >
                    {item.stock} cases &middot; {item.velocity} cases/mo
                    &middot; Stockout: {item.estStockout}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      item.cover < 3 ? "text-red-600" : "text-amber-600"
                    }`}
                  >
                    Worst channel: {item.worstChannel}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  if (data.type === "scenario_comparison") {
    return (
      <div className="mt-4">
        <div className="overflow-hidden rounded-lg border border-stone-200">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-3 py-2 text-left text-stone-600 text-xs">SKU</th>
                <th className="px-3 py-2 text-right text-stone-600 text-xs">
                  Current GP%
                </th>
                <th className="px-3 py-2 text-right text-stone-600 text-xs">
                  New GP%
                </th>
                <th className="px-3 py-2 text-right text-stone-600 text-xs">
                  Delta
                </th>
                <th className="px-3 py-2 text-right text-stone-600 text-xs">
                  Annual Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.rows.map(
                (
                  r: {
                    sku: string;
                    currentGP: number;
                    newGP: number;
                    delta: number;
                    annualImpact: number;
                  },
                  i: number
                ) => (
                  <tr key={i}>
                    <td className="px-3 py-2 font-medium text-stone-900">
                      {r.sku}
                    </td>
                    <td className="px-3 py-2 text-right">{r.currentGP.toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right text-red-600">
                      {r.newGP.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2 text-right text-red-600 font-medium">
                      {r.delta.toFixed(1)}pp
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-red-600">
                      -${Math.abs(r.annualImpact).toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot className="bg-red-50">
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-2 text-right font-bold text-red-800"
                >
                  Total Annual GP Impact
                </td>
                <td className="px-3 py-2 text-right font-bold text-red-800">
                  -${Math.abs(data.totalAnnualImpact).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  if (data.type === "velocity_chart") {
    const maxVel = Math.max(
      ...data.rows.map((r: { velocity: number }) => r.velocity)
    );
    return (
      <div className="mt-4 space-y-2">
        {data.rows.map(
          (
            r: {
              sku: string;
              velocity: number;
              prevVelocity: number;
              change: number;
            },
            i: number
          ) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-stone-500 w-20 truncate">
                {r.sku}
              </span>
              <div className="flex-1 h-5 bg-stone-100 rounded overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded"
                  style={{ width: `${(r.velocity / maxVel) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-stone-700 w-8 text-right">
                {r.velocity}
              </span>
              <span
                className={`text-xs font-semibold w-14 text-right ${
                  r.change >= 0 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {r.change >= 0 ? "+" : ""}
                {r.change.toFixed(1)}%
              </span>
            </div>
          )
        )}
      </div>
    );
  }

  return null;
}
