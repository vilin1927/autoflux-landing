"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  LayoutDashboard,
  BarChart3,
  Unlock,
  Shield,
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  Send,
  Briefcase,
  Eye,
  Users,
  TrendingUp,
  Zap,
  Award,
  AlertCircle,
} from "lucide-react";
import {
  tradespersonKPIs,
  matchedJobs,
  quotes,
  adminStats,
  adminActivity,
  jobWizardConversation,
  generatedJobSummary,
} from "@/data/proposals/buildermatch";

// ============================================================
// Types
// ============================================================
type View = "wizard" | "dashboard" | "quotes" | "unlock" | "admin";

const navItems = [
  { key: "wizard" as View, label: "AI Job Wizard", icon: MessageSquare },
  { key: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
  { key: "quotes" as View, label: "Quote Comparison", icon: BarChart3 },
  { key: "unlock" as View, label: "Lead Unlock", icon: Unlock },
  { key: "admin" as View, label: "Admin Panel", icon: Shield },
];

// ============================================================
// Shared Components
// ============================================================
function GlassCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/60 border border-white/[0.06] backdrop-blur-xl rounded-2xl ${onClick ? "cursor-pointer hover:border-white/[0.12] transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function KPICard({
  label,
  value,
  suffix,
  color,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  color: string;
  sub?: string;
  icon?: React.ElementType;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
          {label}
        </p>
        {Icon && <Icon className={`w-4 h-4 ${color}`} />}
      </div>
      <div className="flex items-end gap-1.5">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        {suffix && (
          <span className="text-sm text-slate-500 mb-0.5">{suffix}</span>
        )}
      </div>
      {sub && <p className="text-[11px] text-slate-500 mt-1.5">{sub}</p>}
    </GlassCard>
  );
}

function UrgencyBadge({ urgency }: { urgency: "low" | "medium" | "high" }) {
  const styles = {
    high: "bg-rose-500/15 text-rose-400",
    medium: "bg-amber-500/15 text-amber-400",
    low: "bg-emerald-500/15 text-emerald-400",
  };
  return (
    <span
      className={`${styles[urgency]} px-2 py-0.5 rounded-full text-[11px] font-medium capitalize`}
    >
      {urgency}
    </span>
  );
}

function MatchBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "bg-emerald-500/15 text-emerald-400"
      : score >= 80
        ? "bg-cyan-500/15 text-cyan-400"
        : score >= 70
          ? "bg-amber-500/15 text-amber-400"
          : "bg-rose-500/15 text-rose-400";
  return (
    <span
      className={`${color} px-2 py-0.5 rounded-full text-[11px] font-medium`}
    >
      {score}% match
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full text-[10px] font-medium">
      {category}
    </span>
  );
}

function AvatarCircle({
  initials,
  color = "from-cyan-500 to-blue-600",
}: {
  initials: string;
  color?: string;
}) {
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}

// ============================================================
// Tab 1: AI Job Wizard
// ============================================================
function WizardView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">AI Job Wizard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Describe your problem in plain English — AI creates a proper job
          listing
        </p>
      </div>

      <GlassCard className="p-6 max-w-2xl mx-auto">
        <div className="space-y-4 mb-6">
          {jobWizardConversation.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-cyan-600/30 text-white rounded-br-md"
                    : "bg-white/[0.06] text-slate-300 rounded-bl-md"
                }`}
              >
                {msg.role === "ai" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] font-medium text-cyan-400 uppercase tracking-wider">
                      BuilderMatch AI
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.text.replace(/\*\*(.*?)\*\*/g, "$1")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Generated Job Summary */}
        <div className="border-t border-white/[0.06] pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              Generated Job Summary
            </span>
          </div>
          <GlassCard className="p-5 border-cyan-500/20">
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                  Job Title
                </p>
                <p className="text-white font-medium">
                  {generatedJobSummary.title}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Category
                  </p>
                  <CategoryBadge category={generatedJobSummary.category} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Urgency
                  </p>
                  <span className="bg-rose-500/15 text-rose-400 px-2 py-0.5 rounded-full text-[11px] font-medium">
                    {generatedJobSummary.urgency}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                  Scope
                </p>
                <p className="text-sm text-slate-300">
                  {generatedJobSummary.scope}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Property Type
                  </p>
                  <p className="text-sm text-slate-300">
                    {generatedJobSummary.property}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Boiler
                  </p>
                  <p className="text-sm text-slate-300">
                    {generatedJobSummary.boiler}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Availability
                  </p>
                  <p className="text-sm text-slate-300">
                    {generatedJobSummary.availability}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    Estimated Budget
                  </p>
                  <p className="text-sm font-medium text-emerald-400">
                    {generatedJobSummary.estimatedBudget}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="flex gap-3 mt-5">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm py-3 rounded-xl transition-colors">
              Post Job
            </button>
            <button className="px-6 border border-white/[0.1] text-slate-300 hover:text-white hover:border-white/[0.2] text-sm py-3 rounded-xl transition-colors">
              Edit
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Tab 2: Tradesperson Dashboard
// ============================================================
function DashboardView() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Tradesperson Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Your business at a glance — jobs, earnings, and profile stats
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <KPICard
          label="Matched Jobs"
          value={tradespersonKPIs.matchedJobs}
          color="text-cyan-400"
          icon={Briefcase}
          sub="New this week"
        />
        <KPICard
          label="Unlocked Leads"
          value={tradespersonKPIs.unlockedLeads}
          color="text-emerald-400"
          icon={Unlock}
          sub="Contacted 5"
        />
        <KPICard
          label="Active Quotes"
          value={tradespersonKPIs.activeQuotes}
          color="text-amber-400"
          icon={Send}
          sub="2 awaiting response"
        />
        <KPICard
          label="Monthly Earnings"
          value={`£${tradespersonKPIs.monthlyEarnings.toLocaleString()}`}
          color="text-emerald-400"
          icon={TrendingUp}
          sub="+12% vs last month"
        />
        <KPICard
          label="Avg Rating"
          value={tradespersonKPIs.avgRating}
          suffix="★"
          color="text-amber-400"
          icon={Star}
          sub="47 reviews"
        />
        <KPICard
          label="Profile Views"
          value={tradespersonKPIs.profileViews}
          color="text-purple-400"
          icon={Eye}
          sub="Last 30 days"
        />
      </div>

      {/* Matched Jobs List */}
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-4 h-4 text-cyan-400" />
        <h2 className="text-sm font-semibold text-white">Matched Jobs</h2>
      </div>

      <div className="space-y-3">
        {matchedJobs.map((job) => (
          <GlassCard
            key={job.id}
            className={`p-4 transition-all ${selectedJob === job.id ? "border-cyan-500/30" : ""}`}
            onClick={() =>
              setSelectedJob(selectedJob === job.id ? null : job.id)
            }
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg shrink-0 shadow-lg shadow-black/20">
                {job.category === "Gas Engineer"
                  ? "🔥"
                  : job.category === "Plumber"
                    ? "🔧"
                    : job.category === "Electrician"
                      ? "⚡"
                      : "🎨"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-white">
                    {job.title}
                  </span>
                  <MatchBadge score={job.matchScore} />
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <CategoryBadge category={job.category} />
                  <UrgencyBadge urgency={job.urgency} />
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-emerald-400">
                    {job.budget}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {job.postedAgo}
                  </span>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {job.unlocked ? (
                  <span className="bg-emerald-500/15 text-emerald-400 px-3 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Unlocked
                  </span>
                ) : (
                  <button className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap">
                    Unlock — £7.50
                  </button>
                )}
              </div>
            </div>

            {/* Expanded details */}
            {selectedJob === job.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/[0.06]"
              >
                <p className="text-sm text-slate-400 leading-relaxed">
                  {job.description}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-slate-500">
                    Customer: {job.customerName}
                  </span>
                  <span className="text-[11px] text-amber-400 flex items-center gap-0.5">
                    <Star className="w-3 h-3" />
                    {job.customerRating}
                  </span>
                </div>
              </motion.div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Tab 3: Quote Comparison
// ============================================================
function QuotesView() {
  const avatarColors = [
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-amber-500 to-orange-600",
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Quote Comparison</h1>
        <p className="text-slate-400 text-sm mt-1">
          Compare quotes side by side with AI-powered analysis
        </p>
      </div>

      {/* Job Summary */}
      <GlassCard className="p-5 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg shrink-0">
            🔥
          </div>
          <div>
            <h2 className="text-white font-medium">
              Boiler Repair — Keeps Cutting Out
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <CategoryBadge category="Gas Engineer" />
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Coventry, CV1
              </span>
              <UrgencyBadge urgency="high" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quotes Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {quotes.map((q, i) => (
          <GlassCard
            key={q.id}
            className={`p-5 ${i === 0 ? "border-cyan-500/20 ring-1 ring-cyan-500/10" : ""}`}
          >
            {i === 0 && (
              <div className="flex items-center gap-1.5 mb-3">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-medium text-cyan-400 uppercase tracking-wider">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <AvatarCircle
                initials={q.avatar}
                color={avatarColors[i]}
              />
              <div>
                <p className="text-white font-medium text-sm">
                  {q.tradespersonName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-amber-400 text-xs flex items-center gap-0.5">
                    <Star className="w-3 h-3" />
                    {q.rating}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ({q.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Jobs Done
                </span>
                <span className="text-xs text-slate-300">
                  {q.completedJobs}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Quote
                </span>
                <span className="text-lg font-bold text-emerald-400">
                  £{q.amount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Type
                </span>
                <span className="text-xs text-slate-300 capitalize">
                  {q.type === "fixed" ? "Fixed Price" : "Day Rate"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Timeline
                </span>
                <span className="text-xs text-slate-300">
                  {q.estimatedDays} day{q.estimatedDays > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 mb-4">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                &ldquo;{q.message}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-slate-500">
                {q.responseTime}
              </span>
              {q.verified && (
                <span className="bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>

            <button
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                  : "border border-white/[0.1] text-slate-300 hover:text-white hover:border-white/[0.2]"
              }`}
            >
              Select Tradesperson
            </button>
          </GlassCard>
        ))}
      </div>

      {/* AI Summary */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-white">AI Summary</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          <span className="text-emerald-400 font-medium">Gary Wilson (£220)</span>{" "}
          is the highest rated and carries Worcester parts — best choice for
          same-day resolution.{" "}
          <span className="text-cyan-400 font-medium">Steve Barnes (£180)</span>{" "}
          offers good value with standard parts included.{" "}
          <span className="text-amber-400 font-medium">Paul Hughes (£150)</span>{" "}
          is cheapest but diagnosis-only pricing means final cost could be
          higher.
        </p>
      </GlassCard>
    </div>
  );
}

// ============================================================
// Tab 4: Lead Unlock
// ============================================================
function LeadUnlockView() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Lead Unlock</h1>
        <p className="text-slate-400 text-sm mt-1">
          See job summaries for free — pay to unlock full customer details
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <GlassCard className="p-6">
          {/* Job info — always visible */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg shrink-0">
              🔥
            </div>
            <div>
              <h2 className="text-white font-medium">
                Boiler Repair — Keeps Cutting Out
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <CategoryBadge category="Gas Engineer" />
                <UrgencyBadge urgency="high" />
              </div>
            </div>
            <div className="ml-auto">
              <MatchBadge score={96} />
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-300">Coventry, CV1</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                Description
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Boiler keeps cutting out and hot water is lukewarm. Worcester
                Bosch combi, about 8 years old. Semi-detached house.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Estimated Budget
              </span>
              <span className="text-sm font-medium text-emerald-400">
                £150–£350
              </span>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-5">
            <div className="flex items-center gap-2 mb-4">
              {unlocked ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">
                    Customer Details — Unlocked
                  </span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-semibold text-white">
                    Customer Details
                  </span>
                </>
              )}
            </div>

            <div className="space-y-3">
              {/* Customer Name */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Name
                </span>
                {unlocked ? (
                  <span className="text-sm text-white font-medium">
                    Sarah Mitchell
                  </span>
                ) : (
                  <span className="text-sm text-slate-600 font-mono select-none">
                    S████ M.
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Address
                </span>
                {unlocked ? (
                  <span className="text-sm text-white">
                    14 Oak Lane, Coventry, CV1 3PQ
                  </span>
                ) : (
                  <span className="text-sm text-slate-600 font-mono select-none">
                    ██ ████ ████, CV1 ███
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Phone
                </span>
                {unlocked ? (
                  <span className="text-sm text-white">07912 345 678</span>
                ) : (
                  <span className="text-sm text-slate-600 font-mono select-none">
                    07XXX XXX XXX
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Email
                </span>
                {unlocked ? (
                  <span className="text-sm text-white">
                    sarah.mitchell@email.co.uk
                  </span>
                ) : (
                  <span className="text-sm text-slate-600 font-mono select-none">
                    s████████@████.co.uk
                  </span>
                )}
              </div>
            </div>

            {/* Action area */}
            <div className="mt-6">
              {unlocked ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-medium">
                      Lead unlocked successfully
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Quote
                    </button>
                    <button className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-medium text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Customer
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setUnlocked(true)}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Unlock Full Details — £7.50
                </button>
              )}
            </div>

            {/* Fee breakdown */}
            <p className="text-[10px] text-slate-600 text-center mt-3">
              Lead fee: £7.50 &bull; Charged via Stripe &bull; Non-refundable
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ============================================================
// Tab 5: Admin Panel
// ============================================================
function AdminView() {
  const activityColors: Record<string, string> = {
    signup: "bg-emerald-400",
    job: "bg-blue-400",
    payment: "bg-amber-400",
    review: "bg-purple-400",
    dispute: "bg-rose-400",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-slate-400 text-sm mt-1">
          Platform overview — users, jobs, revenue, and activity
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KPICard
          label="Total Customers"
          value={adminStats.totalCustomers}
          color="text-cyan-400"
          icon={Users}
        />
        <KPICard
          label="Total Tradespeople"
          value={adminStats.totalTradespeople}
          color="text-emerald-400"
          icon={Briefcase}
        />
        <KPICard
          label="Active Jobs"
          value={adminStats.activeJobs}
          color="text-amber-400"
          icon={Zap}
        />
        <KPICard
          label="Revenue"
          value={`£${adminStats.totalRevenue.toLocaleString()}`}
          color="text-emerald-400"
          icon={TrendingUp}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">
                Recent Activity
              </h2>
            </div>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {adminActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-5 py-3.5"
              >
                <div className="mt-1.5 shrink-0">
                  <div
                    className={`w-2 h-2 rounded-full ${activityColors[activity.type] || "bg-slate-400"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{activity.text}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <div className="space-y-3">
          <GlassCard className="p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
              Quick Stats
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Unlock className="w-3 h-3" /> Leads Unlocked
                </span>
                <span className="text-sm font-medium text-cyan-400">
                  {adminStats.leadsUnlocked.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Star className="w-3 h-3" /> Avg Match Score
                </span>
                <span className="text-sm font-medium text-emerald-400">
                  {adminStats.avgMatchScore}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" /> Conversion Rate
                </span>
                <span className="text-sm font-medium text-amber-400">
                  {adminStats.conversionRate}%
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" /> Completed Jobs
                </span>
                <span className="text-sm font-medium text-white">
                  {adminStats.completedJobs.toLocaleString()}
                </span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">
              Revenue Breakdown
            </p>
            <div className="text-center mb-3">
              <p className="text-2xl font-bold text-emerald-400">
                £{adminStats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Total revenue</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Lead unlock fees
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  £{(adminStats.leadsUnlocked * 7.5).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <p className="text-[10px] text-slate-600">
                {adminStats.leadsUnlocked.toLocaleString()} leads x £7.50 avg
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function BuilderMatchDemoPage() {
  const [activeView, setActiveView] = useState<View>("wizard");

  const renderView = () => {
    switch (activeView) {
      case "wizard":
        return <WizardView />;
      case "dashboard":
        return <DashboardView />;
      case "quotes":
        return <QuotesView />;
      case "unlock":
        return <LeadUnlockView />;
      case "admin":
        return <AdminView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                BM
              </div>
              <span className="text-sm font-semibold text-white hidden sm:block">
                BuilderMatch.ai
              </span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide mx-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveView(item.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-cyan-600/20 text-cyan-400"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Back link */}
            <Link
              href="/proposals/buildermatch"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Proposal</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
