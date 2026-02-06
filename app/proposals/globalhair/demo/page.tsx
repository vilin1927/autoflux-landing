"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  Send,
  Loader2,
  Bot,
  User,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  ArrowLeft,
  Sparkles,
  Monitor,
  RotateCcw,
  Bell,
  Zap,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import {
  demoData,
  sampleConversations,
  proposalData,
} from "@/data/proposals/globalhair";

type Screen = "dashboard" | "chat";
type MessageRole = "user" | "assistant" | "thinking";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  data?: {
    type: string;
    [key: string]: unknown;
  };
  followUp?: string;
}

// GlobalHair color palette
const colors = {
  navy: "#0a1628",
  navyLight: "#0d1a2d",
  gold: "#c9a962",
  goldLight: "#d4b978",
  white: "#ffffff",
  gray: "#8892a0",
};

export default function DemoPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentScreen === "chat" && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: demoData.assistant.greeting,
        },
      ]);
    }
  }, [currentScreen, messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    await simulateResponse(text);
  };

  const simulateResponse = async (query: string) => {
    const lowerQuery = query.toLowerCase();

    const thinkingId = `thinking-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "thinking", content: "Processing..." },
    ]);

    let conversation: (typeof sampleConversations)[keyof typeof sampleConversations] | undefined;
    let thinkingSteps: string[] = [];

    if (lowerQuery.includes("roi") || lowerQuery.includes("platform") || lowerQuery.includes("best")) {
      conversation = sampleConversations.performance;
      thinkingSteps = conversation.thinking;
    } else if (lowerQuery.includes("ad copy") || lowerQuery.includes("generate") || lowerQuery.includes("copy")) {
      conversation = sampleConversations.adCopy;
      thinkingSteps = conversation.thinking;
    } else if (lowerQuery.includes("consultation") || lowerQuery.includes("booked") || lowerQuery.includes("today")) {
      conversation = sampleConversations.consultations;
      thinkingSteps = conversation.thinking;
    } else {
      await animateThinking(thinkingId, ["Analyzing your question...", "Searching data..."]);
      setMessages((prev) =>
        prev.filter((m) => m.id !== thinkingId).concat({
          id: Date.now().toString(),
          role: "assistant",
          content: "I can help you with campaign performance, lead analytics, and AI-powered ad copy generation. Try asking:\n\n- \"Which platform has the best ROI?\"\n- \"Generate ad copy for a new campaign\"\n- \"How many consultations were booked today?\"",
        })
      );
      setIsTyping(false);
      return;
    }

    await animateThinking(thinkingId, thinkingSteps);

    setMessages((prev) =>
      prev.filter((m) => m.id !== thinkingId).concat({
        id: Date.now().toString(),
        role: "assistant",
        content: conversation.response.text,
        data: conversation.response.data,
        followUp: conversation.response.followUp,
      })
    );
    setIsTyping(false);
  };

  const animateThinking = async (thinkingId: string, steps: string[]) => {
    for (const step of steps) {
      setMessages((prev) =>
        prev.map((m) => (m.id === thinkingId ? { ...m, content: step } : m))
      );
      await new Promise((r) => setTimeout(r, 600));
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentScreen("dashboard");
  };

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: colors.navy }}>
        <div className="rounded-2xl p-8 max-w-sm text-center" style={{ background: colors.navyLight, border: `1px solid ${colors.gold}30` }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${colors.gold}20` }}>
            <Monitor className="w-8 h-8" style={{ color: colors.gold }} />
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: colors.white }}>
            Best Viewed on Desktop
          </h1>
          <p className="mb-6" style={{ color: colors.gray }}>
            This demo showcases a full dashboard experience. Please view on a larger screen.
          </p>
          <Link
            href="/proposals/globalhair"
            className="inline-flex items-center gap-2 font-medium hover:underline"
            style={{ color: colors.gold }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: colors.navy }}>
      {/* Author Badge - Top Banner */}
      <div
        className="w-full py-2 px-4 text-center text-sm"
        style={{
          background: `linear-gradient(90deg, ${colors.gold}20 0%, ${colors.gold}40 50%, ${colors.gold}20 100%)`,
          borderBottom: `1px solid ${colors.gold}50`
        }}
      >
        <span style={{ color: colors.gold }}>
          Demo prepared by <strong>Vladimir Ilin</strong> for <strong>Peter De Harder</strong> | GlobalHair Institute | February 2026
        </span>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col" style={{ background: colors.navyLight, borderRight: `1px solid ${colors.gold}20` }}>
          {/* Logo */}
          <div className="p-6" style={{ borderBottom: `1px solid ${colors.gold}20` }}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                style={{ background: colors.gold, color: colors.navy }}
              >
                GHI
              </div>
              <div>
                <h1 className="font-bold" style={{ color: colors.white }}>GlobalHair</h1>
                <p className="text-xs" style={{ color: colors.gray }}>Marketing Hub</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                active={currentScreen === "dashboard"}
                onClick={() => setCurrentScreen("dashboard")}
              />
              <NavItem
                icon={MessageSquare}
                label="Ask Luna"
                active={currentScreen === "chat"}
                onClick={() => setCurrentScreen("chat")}
                badge={<Sparkles className="w-3 h-3" style={{ color: colors.gold }} />}
              />
              <NavItem icon={BarChart3} label="Campaigns" disabled />
              <NavItem icon={Users} label="Leads" disabled />
              <NavItem icon={Bell} label="Alerts" disabled />
              <NavItem icon={Settings} label="Settings" disabled />
            </ul>
          </nav>

          {/* AI Assistant Promo */}
          <div className="p-4">
            <div className="rounded-xl p-4" style={{ background: `${colors.gold}10`, border: `1px solid ${colors.gold}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5" style={{ color: colors.gold }} />
                <span className="font-medium text-sm" style={{ color: colors.white }}>Meet Luna</span>
              </div>
              <p className="text-xs mb-3" style={{ color: colors.gray }}>
                Your AI marketing assistant
              </p>
              <button
                onClick={() => setCurrentScreen("chat")}
                className="w-full text-sm font-semibold py-2 rounded-lg transition-colors hover:opacity-90"
                style={{ background: colors.gold, color: colors.navy }}
              >
                Start Chatting
              </button>
            </div>
          </div>

          {/* User */}
          <div className="p-4" style={{ borderTop: `1px solid ${colors.gold}20` }}>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: `${colors.gold}10` }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${colors.gold}30` }}
              >
                <span className="text-sm font-medium" style={{ color: colors.gold }}>PD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: colors.white }}>
                  Peter De Harder
                </p>
                <p className="text-xs" style={{ color: colors.gray }}>CMO</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header
            className="h-16 flex items-center justify-between px-6"
            style={{ background: colors.navyLight, borderBottom: `1px solid ${colors.gold}20` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded"
                style={{ background: `${colors.gold}20`, color: colors.gold }}
              >
                Interactive Demo
              </span>
            </div>
            <Link
              href="https://autoflux.digital"
              target="_blank"
              className="text-sm flex items-center gap-1 hover:underline"
              style={{ color: colors.gray }}
            >
              Built by AutoFlux
              <ExternalLink className="w-3 h-3" />
            </Link>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {currentScreen === "dashboard" && (
                <DashboardScreen
                  key="dashboard"
                  onOpenChat={() => setCurrentScreen("chat")}
                />
              )}
              {currentScreen === "chat" && (
                <ChatScreen
                  key="chat"
                  messages={messages}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  onSendMessage={handleSendMessage}
                  onSuggestedQuestion={handleSuggestedQuestion}
                  onReset={handleReset}
                  isTyping={isTyping}
                  messagesEndRef={messagesEndRef}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Author Badge - Bottom Right */}
      <div
        className="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-xs"
        style={{
          background: colors.navyLight,
          border: `1px solid ${colors.gold}50`,
          color: colors.gold
        }}
      >
        Developed by <strong>Vladimir Ilin</strong> | <a href="https://autoflux.digital" target="_blank" className="underline">autoflux.digital</a>
      </div>
    </div>
  );
}

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
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        style={{
          background: active ? `${colors.gold}20` : "transparent",
          color: active ? colors.gold : disabled ? `${colors.gray}50` : colors.gray,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <Icon className="w-5 h-5" />
        <span className="flex-1 text-left">{label}</span>
        {badge}
      </button>
    </li>
  );
}

function DashboardScreen({ onOpenChat }: { onOpenChat: () => void }) {
  const { overview, platforms, topCampaigns, recentLeads, chatbotStats } = demoData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-auto p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.white }}>Marketing Dashboard</h1>
            <p className="text-sm" style={{ color: colors.gray }}>
              Welcome back, Peter. Here&apos;s your marketing overview.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              style={{ background: `${colors.gold}20`, color: colors.gold, border: `1px solid ${colors.gold}30` }}
            >
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <KPICard
            icon={DollarSign}
            label="Total Ad Spend"
            value={`€${overview.totalSpend.toLocaleString()}`}
            change={12.5}
          />
          <KPICard
            icon={Users}
            label="Total Leads"
            value={overview.totalLeads.toString()}
            change={8.3}
          />
          <KPICard
            icon={Target}
            label="Cost per Lead"
            value={`€${overview.costPerLead}`}
            change={-5.2}
            inverse
          />
          <KPICard
            icon={Calendar}
            label="Consultations"
            value={overview.consultationsBooked.toString()}
            change={15.7}
          />
          <KPICard
            icon={Zap}
            label="Conversion Rate"
            value={`${overview.conversionRate}%`}
            change={3.1}
          />
        </div>

        {/* AI Assistant Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 mb-6"
          style={{
            background: `linear-gradient(135deg, ${colors.navyLight} 0%, ${colors.navy} 100%)`,
            border: `1px solid ${colors.gold}30`
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: colors.gold }}
            >
              <Bot className="w-6 h-6" style={{ color: colors.navy }} />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg mb-1" style={{ color: colors.white }}>Ask Luna Anything</h2>
              <p className="text-sm mb-4" style={{ color: colors.gray }}>
                Get instant insights about your campaigns, generate ad copy, and optimize your marketing.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Which platform has the best ROI?", "Generate ad copy", "Show today's leads"].map((q, i) => (
                  <button
                    key={i}
                    onClick={onOpenChat}
                    className="px-3 py-1.5 rounded-full text-sm transition-colors"
                    style={{ background: `${colors.gold}20`, color: colors.gold }}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-colors hover:opacity-90"
                style={{ background: colors.gold, color: colors.navy }}
              >
                <MessageSquare className="w-4 h-4" />
                Open Chat
              </button>
            </div>
          </div>
        </motion.div>

        {/* Platform Performance + Top Campaigns */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Platform Cards */}
          {Object.values(platforms).map((platform, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: colors.navyLight, border: `1px solid ${colors.gold}20` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: colors.white }}>{platform.name}</h3>
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: `${colors.gold}20`, color: colors.gold }}
                >
                  {platform.roas}x ROAS
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: colors.gray }}>Spend</span>
                  <span className="font-medium" style={{ color: colors.white }}>€{platform.spend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.gray }}>Leads</span>
                  <span className="font-medium" style={{ color: colors.white }}>{platform.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.gray }}>CPL</span>
                  <span className="font-medium" style={{ color: colors.gold }}>€{platform.cpl}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Top Campaigns */}
          <div
            className="col-span-2 rounded-xl p-5"
            style={{ background: colors.navyLight, border: `1px solid ${colors.gold}20` }}
          >
            <h3 className="font-bold mb-4" style={{ color: colors.white }}>Top Campaigns</h3>
            <div className="overflow-hidden rounded-lg" style={{ border: `1px solid ${colors.gold}20` }}>
              <table className="w-full text-sm">
                <thead style={{ background: `${colors.gold}10` }}>
                  <tr>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray }}>Campaign</th>
                    <th className="px-4 py-3 text-left font-medium" style={{ color: colors.gray }}>Platform</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray }}>Spend</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray }}>Leads</th>
                    <th className="px-4 py-3 text-right font-medium" style={{ color: colors.gray }}>CPL</th>
                  </tr>
                </thead>
                <tbody>
                  {topCampaigns.map((campaign, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${colors.gold}10` }}>
                      <td className="px-4 py-3 font-medium" style={{ color: colors.white }}>{campaign.name}</td>
                      <td className="px-4 py-3" style={{ color: colors.gray }}>{campaign.platform}</td>
                      <td className="px-4 py-3 text-right" style={{ color: colors.white }}>€{campaign.spend.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right" style={{ color: colors.white }}>{campaign.leads}</td>
                      <td className="px-4 py-3 text-right font-medium" style={{ color: colors.gold }}>€{campaign.cpl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Leads */}
          <div
            className="rounded-xl p-5"
            style={{ background: colors.navyLight, border: `1px solid ${colors.gold}20` }}
          >
            <h3 className="font-bold mb-4" style={{ color: colors.white }}>Recent Leads</h3>
            <div className="space-y-3">
              {recentLeads.map((lead, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg"
                  style={{ background: `${colors.gold}05`, border: `1px solid ${colors.gold}10` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium" style={{ color: colors.white }}>{lead.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: lead.quality === "High" ? `${colors.gold}20` : `${colors.gray}20`,
                        color: lead.quality === "High" ? colors.gold : colors.gray
                      }}
                    >
                      {lead.quality}
                    </span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: colors.gray }}>{lead.source}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: colors.gray }}>{lead.time}</span>
                    <span
                      className="text-xs"
                      style={{ color: lead.status === "Consultation Booked" ? colors.gold : colors.gray }}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function KPICard({
  icon: Icon,
  label,
  value,
  change,
  inverse = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: number;
  inverse?: boolean;
}) {
  const isPositive = inverse ? change < 0 : change > 0;

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: colors.navyLight, border: `1px solid ${colors.gold}20` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${colors.gold}20` }}
        >
          <Icon className="w-4 h-4" style={{ color: colors.gold }} />
        </div>
      </div>
      <p className="text-2xl font-bold mb-1" style={{ color: colors.white }}>{value}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: colors.gray }}>{label}</span>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-400" />
          )}
          <span className={`text-xs ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  onSuggestedQuestion,
  onReset,
  isTyping,
  messagesEndRef,
}: {
  messages: Message[];
  inputValue: string;
  setInputValue: (v: string) => void;
  onSendMessage: (text: string) => void;
  onSuggestedQuestion: (q: string) => void;
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
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: colors.navyLight, borderBottom: `1px solid ${colors.gold}20` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: colors.gold }}
            >
              <Bot className="w-5 h-5" style={{ color: colors.navy }} />
            </div>
            <div>
              <h2 className="font-bold" style={{ color: colors.white }}>{demoData.assistant.name}</h2>
              <p className="text-xs" style={{ color: colors.gray }}>Your AI Marketing Assistant</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors"
            style={{ color: colors.gray }}
          >
            <RotateCcw className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          className="px-6 py-4"
          style={{ background: colors.navyLight, borderTop: `1px solid ${colors.gold}20` }}
        >
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSendMessage(inputValue);
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your marketing..."
                className="flex-1 px-4 py-3 rounded-xl outline-none"
                style={{
                  background: colors.navy,
                  border: `1px solid ${colors.gold}30`,
                  color: colors.white
                }}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-5 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: colors.gold, color: colors.navy }}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Suggestions Sidebar */}
      <div
        className="w-72 p-4 overflow-auto"
        style={{ background: colors.navyLight, borderLeft: `1px solid ${colors.gold}20` }}
      >
        <h3 className="font-bold mb-4" style={{ color: colors.white }}>Suggested Questions</h3>
        {demoData.suggestedQuestions.map((category, i) => (
          <div key={i} className="mb-4">
            <h4
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: colors.gray }}
            >
              {category.category}
            </h4>
            <div className="space-y-1">
              {category.questions.map((q, j) => (
                <button
                  key={j}
                  onClick={() => onSuggestedQuestion(q)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors"
                  style={{ color: colors.gray }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${colors.gold}10`;
                    e.currentTarget.style.color = colors.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = colors.gray;
                  }}
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

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "thinking") {
    return (
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: colors.gold }}
        >
          <Bot className="w-4 h-4" style={{ color: colors.navy }} />
        </div>
        <div
          className="flex-1 rounded-2xl rounded-tl-none px-4 py-3"
          style={{ background: colors.navyLight, border: `1px solid ${colors.gold}20` }}
        >
          <div className="flex items-center gap-2" style={{ color: colors.gray }}>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">{message.content}</span>
          </div>
        </div>
      </div>
    );
  }

  if (message.role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div
          className="rounded-2xl rounded-tr-none px-4 py-3 max-w-lg"
          style={{ background: colors.gold, color: colors.navy }}
        >
          <p>{message.content}</p>
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${colors.gold}30` }}
        >
          <User className="w-4 h-4" style={{ color: colors.gold }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: colors.gold }}
      >
        <Bot className="w-4 h-4" style={{ color: colors.navy }} />
      </div>
      <div className="flex-1 max-w-2xl">
        <div
          className="rounded-2xl rounded-tl-none px-4 py-3"
          style={{ background: colors.navyLight, border: `1px solid ${colors.gold}20` }}
        >
          <p className="whitespace-pre-wrap" style={{ color: colors.white }}>
            {message.content.split(/\*\*(.*?)\*\*/g).map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold" style={{ color: colors.gold }}>
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>

          {message.data && <DataVisualization data={message.data} />}

          {message.followUp && (
            <p className="mt-3 text-sm italic" style={{ color: colors.gray }}>{message.followUp}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DataVisualization({ data }: { data: { type: string; [key: string]: unknown } }) {
  if (data.type === "platform_comparison") {
    const platforms = data.platforms as Array<{ name: string; roas: number; cpl: number; leads: number }>;
    return (
      <div className="mt-4 space-y-3">
        {platforms.map((platform, i) => (
          <div
            key={i}
            className="p-3 rounded-lg flex items-center justify-between"
            style={{ background: `${colors.gold}10`, border: `1px solid ${colors.gold}20` }}
          >
            <div>
              <p className="font-medium" style={{ color: colors.white }}>{platform.name}</p>
              <p className="text-xs" style={{ color: colors.gray }}>{platform.leads} leads</p>
            </div>
            <div className="text-right">
              <p className="font-bold" style={{ color: colors.gold }}>{platform.roas}x ROAS</p>
              <p className="text-xs" style={{ color: colors.gray }}>€{platform.cpl} CPL</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.type === "ad_copy") {
    const variations = data.variations as Array<{ hook: string; body: string; cta: string }>;
    return (
      <div className="mt-4 space-y-3">
        {variations.map((v, i) => (
          <div
            key={i}
            className="p-4 rounded-lg"
            style={{ background: `${colors.gold}10`, border: `1px solid ${colors.gold}20` }}
          >
            <p className="font-bold mb-2" style={{ color: colors.gold }}>"{v.hook}"</p>
            <p className="text-sm mb-2" style={{ color: colors.white }}>{v.body}</p>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: colors.gold, color: colors.navy }}
            >
              {v.cta}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (data.type === "consultations") {
    const bySource = data.bySource as Array<{ source: string; count: number }>;
    return (
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="p-3 rounded-lg text-center" style={{ background: `${colors.gold}20` }}>
            <p className="text-2xl font-bold" style={{ color: colors.gold }}>{data.today as number}</p>
            <p className="text-xs" style={{ color: colors.gray }}>Today</p>
          </div>
          <div className="p-3 rounded-lg text-center" style={{ background: `${colors.gold}10` }}>
            <p className="text-2xl font-bold" style={{ color: colors.white }}>{data.thisWeek as number}</p>
            <p className="text-xs" style={{ color: colors.gray }}>This Week</p>
          </div>
          <div className="p-3 rounded-lg text-center" style={{ background: `${colors.gold}10` }}>
            <p className="text-sm font-bold" style={{ color: "#4ade80" }}>{data.trend as string}</p>
            <p className="text-xs" style={{ color: colors.gray }}>Trend</p>
          </div>
        </div>
        <div className="space-y-2">
          {bySource.map((s, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span style={{ color: colors.gray }}>{s.source}</span>
              <span className="font-medium" style={{ color: colors.white }}>{s.count} booked</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
