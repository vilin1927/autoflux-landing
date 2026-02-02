"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  ChevronRight,
  Send,
  Loader2,
  Bot,
  User,
  TrendingDown,
  TrendingUp,
  Truck,
  CreditCard,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  Monitor,
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  RefreshCw,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  demoData,
  sampleConversations,
  dashboardMetrics,
} from "@/data/proposals/etoll";

type Screen = "dashboard" | "chat";
type MessageRole = "user" | "assistant" | "thinking";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  data?: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  clarification?: {
    text: string;
    options: string[];
  };
  followUp?: string;
}

export default function DemoPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [awaitingClarification, setAwaitingClarification] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add greeting when chat opens
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

    // Simulate AI processing
    await simulateResponse(text);
  };

  const simulateResponse = async (query: string) => {
    const lowerQuery = query.toLowerCase();

    // Add thinking message
    const thinkingId = `thinking-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, role: "thinking", content: "Processing..." },
    ]);

    // Determine which response to show
    let conversation: (typeof sampleConversations)[keyof typeof sampleConversations] | undefined;
    let thinkingSteps: string[] = [];

    if (awaitingClarification && pendingQuery) {
      // Handle clarification response for trip planning
      conversation = sampleConversations.tripPlanning;
      thinkingSteps = conversation.thinking;
      setAwaitingClarification(false);
      setPendingQuery(null);
    } else if (lowerQuery.includes("spend") || lowerQuery.includes("expense") || lowerQuery.includes("total")) {
      conversation = sampleConversations.spending;
      thinkingSteps = conversation.thinking;
    } else if (lowerQuery.includes("vehicle") || lowerQuery.includes("top 5") || lowerQuery.includes("most toll")) {
      conversation = sampleConversations.topVehicles;
      thinkingSteps = conversation.thinking;
    } else if (lowerQuery.includes("travel") || lowerQuery.includes("trip") || lowerQuery.includes("cost") || lowerQuery.includes("lusaka") || lowerQuery.includes("chingola")) {
      const tripConversation = sampleConversations.tripPlanning;
      conversation = tripConversation;
      thinkingSteps = tripConversation.thinking;
      // Show clarification first
      if (!awaitingClarification) {
        await animateThinking(thinkingId, ["Identifying route toll plazas..."]);
        setMessages((prev) =>
          prev.filter((m) => m.id !== thinkingId).concat({
            id: Date.now().toString(),
            role: "assistant",
            content: tripConversation.clarification.text,
            clarification: tripConversation.clarification,
          })
        );
        setIsTyping(false);
        setAwaitingClarification(true);
        setPendingQuery(query);
        return;
      }
    } else if (lowerQuery.includes("suspicious") || lowerQuery.includes("anomal") || lowerQuery.includes("unusual") || lowerQuery.includes("flag")) {
      conversation = sampleConversations.anomalies;
      thinkingSteps = conversation.thinking;
    } else if (lowerQuery.includes("document") || lowerQuery.includes("cross-border") || lowerQuery.includes("zimbabwe")) {
      conversation = sampleConversations.escalation;
      thinkingSteps = conversation.thinking;
    } else {
      // Default response
      await animateThinking(thinkingId, ["Analyzing your question...", "Searching knowledge base..."]);
      setMessages((prev) =>
        prev.filter((m) => m.id !== thinkingId).concat({
          id: Date.now().toString(),
          role: "assistant",
          content: "I can help you with spending analysis, vehicle reports, trip planning, and anomaly detection. Try asking me something like:\n\n- \"What was my total spend this month?\"\n- \"Which vehicle uses the most tolls?\"\n- \"How much to travel from Lusaka to Chingola?\"\n- \"Show me suspicious transactions\"",
        })
      );
      setIsTyping(false);
      return;
    }

    // Animate thinking steps
    await animateThinking(thinkingId, thinkingSteps);

    // Show response
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

  const handleClarificationOption = (option: string) => {
    handleSendMessage(option);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleReset = () => {
    setMessages([]);
    setAwaitingClarification(false);
    setPendingQuery(null);
    setCurrentScreen("dashboard");
  };

  // Mobile warning
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Best Viewed on Desktop
          </h1>
          <p className="text-gray-600 mb-6">
            This demo showcases a full dashboard experience. Please view on a larger screen for the best experience.
          </p>
          <Link
            href="/proposals/etoll"
            className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a3a4a] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4ADE80] rounded-xl flex items-center justify-center">
              <span className="font-bold text-[#1a3a4a]">eT</span>
            </div>
            <div>
              <h1 className="font-bold">eToll</h1>
              <p className="text-xs text-white/60">Fleet Management</p>
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
              label="Ask Toli"
              active={currentScreen === "chat"}
              onClick={() => setCurrentScreen("chat")}
              badge={<Sparkles className="w-3 h-3 text-[#4ADE80]" />}
            />
            <NavItem icon={FileText} label="Reports" disabled />
            <NavItem icon={Settings} label="Settings" disabled />
          </ul>
        </nav>

        {/* AI Assistant Promo */}
        <div className="p-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-[#4ADE80]" />
              <span className="font-medium text-sm">Meet Toli</span>
            </div>
            <p className="text-xs text-white/60 mb-3">
              Your AI assistant for toll insights
            </p>
            <button
              onClick={() => setCurrentScreen("chat")}
              className="w-full bg-[#4ADE80] text-[#1a3a4a] text-sm font-semibold py-2 rounded-lg hover:bg-[#3BC96B] transition-colors"
            >
              Start Chatting
            </button>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
            <div className="w-8 h-8 bg-[#4ADE80]/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-[#4ADE80]">C</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {demoData.user.company}
              </p>
              <p className="text-xs text-white/50">Demo Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-1 rounded">
              Demo Preview
            </span>
          </div>
          <Link
            href="/proposals/etoll"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proposal
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
                onClarificationOption={handleClarificationOption}
                onReset={handleReset}
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

// Navigation Item
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
            ? "text-white/30 cursor-not-allowed"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="flex-1 text-left">{label}</span>
        {badge}
      </button>
    </li>
  );
}

// Dashboard Screen
function DashboardScreen({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-auto p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm">
              Welcome back, {demoData.user.company}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <KPICard
            icon={FileText}
            label="MTD: Transactions"
            value={dashboardMetrics.mtdTransactions.toString()}
            change={dashboardMetrics.changeFromLastMonth.transactions}
            changeLabel="From Last Month"
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />
          <KPICard
            icon={CreditCard}
            label="MTD: Expense (ZMW)"
            value={`K${dashboardMetrics.mtdExpense.toLocaleString()}.00`}
            change={dashboardMetrics.changeFromLastMonth.expense}
            changeLabel="From Last Month"
            iconColor="text-emerald-600"
            iconBg="bg-emerald-100"
          />
          <KPICard
            icon={FileText}
            label="Today's Transactions"
            value={dashboardMetrics.todayTransactions.toString()}
            change={dashboardMetrics.changeFromYesterday.transactions}
            changeLabel="From Yesterday"
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />
          <KPICard
            icon={CreditCard}
            label="Today's Expense (ZMW)"
            value={`K${dashboardMetrics.todayExpense.toLocaleString()}.00`}
            change={dashboardMetrics.changeFromYesterday.expense}
            changeLabel="From Yesterday"
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
          />
        </div>

        {/* AI Assistant Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1a3a4a] to-[#2D5A4A] rounded-2xl p-6 mb-6 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#4ADE80] rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-[#1a3a4a]" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg mb-1">Ask Toli Anything</h2>
              <p className="text-white/70 text-sm mb-4">
                Get instant insights about your fleet&apos;s toll expenses, trip planning, and more.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["What was my total spend this month?", "Which vehicle uses the most tolls?", "Show suspicious transactions"].map((q, i) => (
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
                className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#1a3a4a] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#3BC96B] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Open Chat
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Account Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Account summary</h3>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              K {dashboardMetrics.accountSummary.balance.toLocaleString()}.00
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardMetrics.accountSummary.clientAccounts}
                </p>
                <p className="text-xs text-gray-500">Client Account</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardMetrics.accountSummary.cardsIssued}
                </p>
                <p className="text-xs text-gray-500">Cards Issued</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                Refresh
              </button>
              <button className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                View Payments
              </button>
            </div>
          </div>

          {/* Vehicle Usage Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Reg Usage (MTD)</h3>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                  Today
                </button>
                <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded">
                  MTD
                </button>
                <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded">
                  YTD
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {dashboardMetrics.topVehicles.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-16 truncate">{v.registration}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded"
                      style={{ width: `${(v.usage / 2000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-12 text-right">
                    {v.usage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Usage Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Card Usage (MTD)</h3>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                  Today
                </button>
                <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded">
                  MTD
                </button>
                <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded">
                  YTD
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {dashboardMetrics.topCards.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20 truncate">
                    ...{c.cardNumber.slice(-4)}
                  </span>
                  <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded"
                      style={{ width: `${(c.usage / 2000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-12 text-right">
                    {c.usage}
                  </span>
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
  changeLabel,
  iconColor,
  iconBg,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  iconColor: string;
  iconBg: string;
}) {
  const isNegative = change < 0;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <div className="flex items-center gap-1">
        {isNegative ? (
          <TrendingDown className="w-3 h-3 text-red-500" />
        ) : (
          <TrendingUp className="w-3 h-3 text-emerald-500" />
        )}
        <span className={`text-xs ${isNegative ? "text-red-500" : "text-emerald-500"}`}>
          {change.toFixed(2)}%
        </span>
        <span className="text-xs text-gray-400">{changeLabel}</span>
      </div>
    </div>
  );
}

// Chat Screen
function ChatScreen({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  onSuggestedQuestion,
  onClarificationOption,
  onReset,
  isTyping,
  messagesEndRef,
}: {
  messages: Message[];
  inputValue: string;
  setInputValue: (v: string) => void;
  onSendMessage: (text: string) => void;
  onSuggestedQuestion: (q: string) => void;
  onClarificationOption: (option: string) => void;
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
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4ADE80] rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#1a3a4a]" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{demoData.assistant.name}</h2>
              <p className="text-xs text-gray-500">Your eToll AI Assistant</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onClarificationOption={onClarificationOption}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
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
                placeholder="Ask me anything about your toll account..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-5 py-3 bg-[#1a3a4a] text-white rounded-xl font-semibold hover:bg-[#2D5A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Suggestions Sidebar */}
      <div className="w-72 border-l border-gray-200 bg-white p-4 overflow-auto">
        <h3 className="font-bold text-gray-900 mb-4">Suggested Questions</h3>
        {demoData.suggestedQuestions.map((category, i) => (
          <div key={i} className="mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              {category.category}
            </h4>
            <div className="space-y-1">
              {category.questions.map((q, j) => (
                <button
                  key={j}
                  onClick={() => onSuggestedQuestion(q)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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

// Message Bubble Component
function MessageBubble({
  message,
  onClarificationOption,
}: {
  message: Message;
  onClarificationOption: (option: string) => void;
}) {
  if (message.role === "thinking") {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-[#4ADE80] rounded-lg flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-[#1a3a4a]" />
        </div>
        <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
          <div className="flex items-center gap-2 text-gray-500">
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
        <div className="bg-[#1a3a4a] text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-lg">
          <p>{message.content}</p>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-[#4ADE80] rounded-lg flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-[#1a3a4a]" />
      </div>
      <div className="flex-1 max-w-2xl">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
          {/* Main text with markdown-style bold */}
          <p className="text-gray-800 whitespace-pre-wrap">
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

          {/* Data visualization */}
          {message.data && <DataVisualization data={message.data} />}

          {/* Clarification options */}
          {message.clarification && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Select an option:</p>
              <div className="flex flex-wrap gap-2">
                {message.clarification.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => onClarificationOption(option)}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Follow-up prompt */}
          {message.followUp && (
            <p className="mt-3 text-sm text-gray-500 italic">{message.followUp}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Data Visualization Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataVisualization({ data }: { data: any }) {
  if (data.type === "spending_summary") {
    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-emerald-700">
              K{data.mtdSpend.toLocaleString()}
            </p>
            <p className="text-xs text-emerald-600">Total Expenses</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-700">{data.mtdTransactions}</p>
            <p className="text-xs text-blue-600">Transactions</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Top Plazas:</p>
          <div className="space-y-2">
            {data.topPlazas.map((plaza: { name: string; amount: number; transactions: number }, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{plaza.name}</span>
                <span className="font-medium text-gray-900">
                  K{plaza.amount.toLocaleString()} ({plaza.transactions} trips)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.type === "vehicle_ranking") {
    return (
      <div className="mt-4">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-gray-600">Vehicle</th>
                <th className="px-3 py-2 text-left text-gray-600">Class</th>
                <th className="px-3 py-2 text-right text-gray-600">Trips</th>
                <th className="px-3 py-2 text-right text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.vehicles.map((v: { registration: string; class: string; trips: number; amount: number }, i: number) => (
                <tr key={i} className={i === 0 ? "bg-emerald-50" : ""}>
                  <td className="px-3 py-2 font-medium">{v.registration}</td>
                  <td className="px-3 py-2 text-gray-600">{v.class}</td>
                  <td className="px-3 py-2 text-right">{v.trips}</td>
                  <td className="px-3 py-2 text-right font-medium">
                    K{v.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.type === "trip_estimate") {
    return (
      <div className="mt-4 space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Route: {data.plazaCount} toll plazas</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-700">
            {data.route.map((plaza: string, i: number) => (
              <span key={i} className="flex items-center gap-2">
                {plaza}
                {i < data.route.length - 1 && <ChevronRight className="w-3 h-3" />}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-gray-900">K{data.costPerVehicle}</p>
            <p className="text-xs text-gray-500">Per Vehicle</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-gray-900">{data.totalVehicles}</p>
            <p className="text-xs text-gray-500">Vehicles</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-emerald-700">K{data.totalCost}</p>
            <p className="text-xs text-emerald-600">Total Cost</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Breakdown:</p>
          <div className="space-y-1">
            {data.breakdown.map((item: { plaza: string; costPerVehicle: number }, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.plaza}</span>
                <span className="text-gray-900">K{item.costPerVehicle} x 3 = K{item.costPerVehicle * 3}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.type === "anomalies") {
    return (
      <div className="mt-4 space-y-3">
        {data.alerts.map((alert: { id: number; vehicle: string; plaza: string; time: string; date: string; reason: string; amount: number }) => (
          <div key={alert.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-red-900">{alert.vehicle}</span>
                  <span className="text-sm text-red-700">K{alert.amount}</span>
                </div>
                <p className="text-sm text-red-700 mb-1">{alert.reason}</p>
                <div className="flex items-center gap-3 text-xs text-red-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {alert.plaza}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}, {alert.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.type === "escalation") {
    return (
      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ExternalLink className="w-4 h-4 text-orange-600" />
          <span className="font-medium text-orange-900">Ticket Created</span>
        </div>
        <p className="text-sm text-orange-700">
          Reference: <span className="font-mono">{data.ticketId}</span>
        </p>
        <p className="text-sm text-orange-700">
          Expected response: {data.estimatedResponse}
        </p>
      </div>
    );
  }

  return null;
}
