"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Clock,
  Bell,
  Settings,
  Search,
  Download,
  ChevronRight,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Upload,
  Eye,
  Filter,
  Home,
  User,
  LogOut,
  Plus,
  MoreVertical,
  Mail,
  MessageSquare,
  TrendingUp,
  Shield,
} from "lucide-react";

type Screen =
  | "dashboard"
  | "properties"
  | "documents"
  | "deadlines"
  | "notifications";

type PropertyStatus = "active" | "renewal-soon" | "payment-pending" | "expired";
type DeadlineUrgency = "critical" | "warning" | "normal";
type DocumentCategory = "contract" | "invoice" | "receipt" | "id" | "addendum";

interface Property {
  id: string;
  name: string;
  address: string;
  tenant: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: string;
  status: PropertyStatus;
  nextDeadline: string;
  nextDeadlineDate: string;
  image: string;
}

interface Deadline {
  id: string;
  property: string;
  type: string;
  date: string;
  daysUntil: number;
  urgency: DeadlineUrgency;
  notificationSent: boolean;
  description: string;
}

interface Document {
  id: string;
  name: string;
  property: string;
  category: DocumentCategory;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  channel: string;
  status: "sent" | "scheduled" | "pending";
  date: string;
  property: string;
}

// ── Mock Data ─────────────────────────────────────────────

const properties: Property[] = [
  {
    id: "1",
    name: "Marina Bay Apartments",
    address: "42 Marina Blvd, Unit 15B, Sydney NSW 2000",
    tenant: "James & Sarah Mitchell",
    leaseStart: "2025-03-01",
    leaseEnd: "2026-02-28",
    monthlyRent: "$3,200",
    status: "active",
    nextDeadline: "Rent Due",
    nextDeadlineDate: "Mar 15, 2026",
    image: "🏢",
  },
  {
    id: "2",
    name: "Harbour View Office",
    address: "88 Darling Dr, Level 4, Sydney NSW 2000",
    tenant: "Coastal Designs Pty Ltd",
    leaseStart: "2024-06-01",
    leaseEnd: "2026-05-31",
    monthlyRent: "$5,800",
    status: "renewal-soon",
    nextDeadline: "Renewal Notice Due",
    nextDeadlineDate: "Mar 31, 2026",
    image: "🏬",
  },
  {
    id: "3",
    name: "Greenfield Terrace",
    address: "7 Park Ave, Bondi Beach NSW 2026",
    tenant: "Michael Torres",
    leaseStart: "2025-01-15",
    leaseEnd: "2026-01-14",
    monthlyRent: "$2,450",
    status: "payment-pending",
    nextDeadline: "Overdue Payment",
    nextDeadlineDate: "Mar 5, 2026",
    image: "🏠",
  },
  {
    id: "4",
    name: "CBD Commercial Suite",
    address: "120 Pitt St, Suite 8A, Sydney NSW 2000",
    tenant: "TechStart Innovations",
    leaseStart: "2025-07-01",
    leaseEnd: "2027-06-30",
    monthlyRent: "$7,500",
    status: "active",
    nextDeadline: "Quarterly Inspection",
    nextDeadlineDate: "Apr 1, 2026",
    image: "🏗️",
  },
  {
    id: "5",
    name: "Riverside Cottage",
    address: "3 River Rd, Parramatta NSW 2150",
    tenant: "Emily & David Chen",
    leaseStart: "2024-09-01",
    leaseEnd: "2025-08-31",
    monthlyRent: "$1,900",
    status: "expired",
    nextDeadline: "Lease Expired",
    nextDeadlineDate: "Expired",
    image: "🏡",
  },
];

const deadlines: Deadline[] = [
  {
    id: "1",
    property: "Greenfield Terrace",
    type: "Payment Overdue",
    date: "Mar 5, 2026",
    daysUntil: -4,
    urgency: "critical",
    notificationSent: true,
    description: "Monthly rent payment of $2,450 is overdue",
  },
  {
    id: "2",
    property: "Marina Bay Apartments",
    type: "Rent Due",
    date: "Mar 15, 2026",
    daysUntil: 6,
    urgency: "warning",
    notificationSent: true,
    description: "Monthly rent payment of $3,200 due",
  },
  {
    id: "3",
    property: "Harbour View Office",
    type: "Renewal Notice Required",
    date: "Mar 31, 2026",
    daysUntil: 22,
    urgency: "warning",
    notificationSent: false,
    description: "90-day renewal notice window closes — action required",
  },
  {
    id: "4",
    property: "CBD Commercial Suite",
    type: "Quarterly Inspection",
    date: "Apr 1, 2026",
    daysUntil: 23,
    urgency: "normal",
    notificationSent: false,
    description: "Scheduled property inspection for Q2",
  },
  {
    id: "5",
    property: "Marina Bay Apartments",
    type: "Insurance Renewal",
    date: "Apr 15, 2026",
    daysUntil: 37,
    urgency: "normal",
    notificationSent: false,
    description: "Landlord insurance policy renewal date",
  },
  {
    id: "6",
    property: "Riverside Cottage",
    type: "Lease Expired — Move-out Inspection",
    date: "Mar 14, 2026",
    daysUntil: 5,
    urgency: "critical",
    notificationSent: true,
    description: "Schedule move-out inspection before security deposit release",
  },
];

const documents: Document[] = [
  {
    id: "1",
    name: "Lease Agreement — Marina Bay Unit 15B.pdf",
    property: "Marina Bay Apartments",
    category: "contract",
    uploadedBy: "Admin",
    uploadedAt: "Feb 28, 2025",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Commercial Lease — Harbour View L4.pdf",
    property: "Harbour View Office",
    category: "contract",
    uploadedBy: "Admin",
    uploadedAt: "May 25, 2024",
    size: "3.1 MB",
  },
  {
    id: "3",
    name: "Invoice #1042 — March Rent.pdf",
    property: "Marina Bay Apartments",
    category: "invoice",
    uploadedBy: "System",
    uploadedAt: "Mar 1, 2026",
    size: "156 KB",
  },
  {
    id: "4",
    name: "Invoice #1038 — March Rent.pdf",
    property: "Greenfield Terrace",
    category: "invoice",
    uploadedBy: "System",
    uploadedAt: "Mar 1, 2026",
    size: "148 KB",
  },
  {
    id: "5",
    name: "Bond Receipt — Greenfield Terrace.pdf",
    property: "Greenfield Terrace",
    category: "receipt",
    uploadedBy: "Admin",
    uploadedAt: "Jan 10, 2025",
    size: "89 KB",
  },
  {
    id: "6",
    name: "Tenant ID — Torres, Michael.pdf",
    property: "Greenfield Terrace",
    category: "id",
    uploadedBy: "Admin",
    uploadedAt: "Jan 8, 2025",
    size: "1.2 MB",
  },
  {
    id: "7",
    name: "Addendum — Pet Policy Update.pdf",
    property: "Marina Bay Apartments",
    category: "addendum",
    uploadedBy: "Admin",
    uploadedAt: "Dec 15, 2025",
    size: "312 KB",
  },
  {
    id: "8",
    name: "Commercial Lease — CBD Suite 8A.pdf",
    property: "CBD Commercial Suite",
    category: "contract",
    uploadedBy: "Admin",
    uploadedAt: "Jun 28, 2025",
    size: "4.2 MB",
  },
  {
    id: "9",
    name: "Invoice #1045 — March Rent.pdf",
    property: "CBD Commercial Suite",
    category: "invoice",
    uploadedBy: "System",
    uploadedAt: "Mar 1, 2026",
    size: "162 KB",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    title: "Payment Overdue Alert",
    message: "Rent payment for Greenfield Terrace is 4 days overdue ($2,450)",
    channel: "Email + Webhook",
    status: "sent",
    date: "Mar 6, 2026",
    property: "Greenfield Terrace",
  },
  {
    id: "2",
    title: "7-Day Rent Reminder",
    message: "Rent payment of $3,200 due in 7 days for Marina Bay Apartments",
    channel: "Email",
    status: "sent",
    date: "Mar 8, 2026",
    property: "Marina Bay Apartments",
  },
  {
    id: "3",
    title: "Renewal Window Closing",
    message:
      "90-day renewal notice window for Harbour View Office closes Mar 31",
    channel: "Email + Webhook",
    status: "scheduled",
    date: "Mar 17, 2026",
    property: "Harbour View Office",
  },
  {
    id: "4",
    title: "Move-out Inspection Reminder",
    message: "Schedule move-out inspection for Riverside Cottage before Mar 14",
    channel: "Email",
    status: "sent",
    date: "Mar 7, 2026",
    property: "Riverside Cottage",
  },
  {
    id: "5",
    title: "14-Day Rent Reminder",
    message:
      "Rent payment of $3,200 due in 14 days for Marina Bay Apartments",
    channel: "Email",
    status: "sent",
    date: "Mar 1, 2026",
    property: "Marina Bay Apartments",
  },
  {
    id: "6",
    title: "Quarterly Inspection Notice",
    message: "Upcoming Q2 property inspection for CBD Commercial Suite on Apr 1",
    channel: "Email",
    status: "scheduled",
    date: "Mar 18, 2026",
    property: "CBD Commercial Suite",
  },
];

const recentActivity = [
  {
    action: "Document uploaded",
    detail: "Invoice #1042 — March Rent",
    time: "2 hours ago",
  },
  {
    action: "Reminder sent",
    detail: "7-day rent reminder → Marina Bay",
    time: "5 hours ago",
  },
  {
    action: "Overdue alert",
    detail: "Payment overdue → Greenfield Terrace",
    time: "1 day ago",
  },
  {
    action: "Status changed",
    detail: "Riverside Cottage → Expired",
    time: "2 days ago",
  },
  {
    action: "Document uploaded",
    detail: "Invoice #1038 — March Rent",
    time: "8 days ago",
  },
];

// ── Helpers ─────────────────────────────────────────────

function statusBadge(status: PropertyStatus) {
  const map = {
    active: {
      label: "Active",
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    "renewal-soon": {
      label: "Renewal Soon",
      bg: "bg-amber-50 text-amber-700 border-amber-200",
    },
    "payment-pending": {
      label: "Payment Pending",
      bg: "bg-red-50 text-red-700 border-red-200",
    },
    expired: {
      label: "Expired",
      bg: "bg-gray-100 text-gray-500 border-gray-200",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${s.bg}`}
    >
      {s.label}
    </span>
  );
}

function urgencyColor(urgency: DeadlineUrgency) {
  return {
    critical: "border-l-red-500 bg-red-50/50",
    warning: "border-l-amber-400 bg-amber-50/30",
    normal: "border-l-emerald-400 bg-emerald-50/20",
  }[urgency];
}

function categoryIcon(category: DocumentCategory) {
  const icons = {
    contract: "📄",
    invoice: "🧾",
    receipt: "🧾",
    id: "🪪",
    addendum: "📎",
  };
  return icons[category];
}

function categoryLabel(category: DocumentCategory) {
  return {
    contract: "Contract",
    invoice: "Invoice",
    receipt: "Receipt",
    id: "ID Document",
    addendum: "Addendum",
  }[category];
}

function notificationStatusBadge(status: "sent" | "scheduled" | "pending") {
  const map = {
    sent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    pending: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${map[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ── Sidebar Item ─────────────────────────────────────────

function SidebarItem({
  icon: Icon,
  label,
  screen,
  current,
  onClick,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  screen: Screen;
  current: Screen;
  onClick: (s: Screen) => void;
  badge?: number;
}) {
  const active = screen === current;
  return (
    <button
      onClick={() => onClick(screen)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-white/10 text-white"
          : "text-white/60 hover:text-white/90 hover:bg-white/5"
      }`}
    >
      <Icon className="w-[18px] h-[18px] flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && badge > 0 && (
        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Main Component ───────────────────────────────────────

export default function RealEstatePortalDemo() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [docFilter, setDocFilter] = useState<DocumentCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 max-w-sm text-center"
        >
          <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            PropertyHub Portal Demo
          </h2>
          <p className="text-gray-500 text-sm">
            This interactive demo is best viewed on a desktop browser. The
            actual portal is fully mobile responsive.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* ── Sidebar ────────────────────────────────── */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-[#0F172A] text-white flex flex-col flex-shrink-0"
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">PropertyHub</h1>
              <p className="text-[11px] text-white/40">Client Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            screen="dashboard"
            current={currentScreen}
            onClick={setCurrentScreen}
          />
          <SidebarItem
            icon={Building2}
            label="Properties"
            screen="properties"
            current={currentScreen}
            onClick={setCurrentScreen}
          />
          <SidebarItem
            icon={FileText}
            label="Documents"
            screen="documents"
            current={currentScreen}
            onClick={setCurrentScreen}
            badge={9}
          />
          <SidebarItem
            icon={Clock}
            label="Deadlines"
            screen="deadlines"
            current={currentScreen}
            onClick={setCurrentScreen}
            badge={2}
          />
          <SidebarItem
            icon={Bell}
            label="Notifications"
            screen="notifications"
            current={currentScreen}
            onClick={setCurrentScreen}
            badge={3}
          />
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Global Bridge</p>
              <p className="text-[10px] text-white/40">Admin</p>
            </div>
            <LogOut className="w-4 h-4 text-white/30 hover:text-white/60 cursor-pointer" />
          </div>
        </div>

      </motion.aside>

      {/* ── Main Content ──────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentScreen === "dashboard" && (
            <DashboardScreen key="dashboard" onNavigate={setCurrentScreen} />
          )}
          {currentScreen === "properties" && (
            <PropertiesScreen key="properties" />
          )}
          {currentScreen === "documents" && (
            <DocumentsScreen
              key="documents"
              filter={docFilter}
              setFilter={setDocFilter}
              search={searchQuery}
              setSearch={setSearchQuery}
            />
          )}
          {currentScreen === "deadlines" && (
            <DeadlinesScreen key="deadlines" />
          )}
          {currentScreen === "notifications" && (
            <NotificationsScreen key="notifications" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ── Dashboard Screen ─────────────────────────────────────

function DashboardScreen({
  onNavigate,
}: {
  onNavigate: (s: Screen) => void;
}) {
  const kpis = [
    {
      label: "Total Properties",
      value: "5",
      icon: Building2,
      color: "text-teal-600 bg-teal-50",
    },
    {
      label: "Active Leases",
      value: "3",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Expiring Soon",
      value: "1",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Pending Payments",
      value: "1",
      icon: Timer,
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Global Bridge — here&apos;s your portfolio overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.color}`}
              >
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">
              Upcoming Deadlines
            </h2>
            <button
              onClick={() => onNavigate("deadlines")}
              className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {deadlines.slice(0, 4).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={`px-5 py-3.5 flex items-center gap-4 border-l-3 ${urgencyColor(d.urgency)}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {d.type}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {d.property}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-gray-700">{d.date}</p>
                  <p
                    className={`text-[11px] ${
                      d.daysUntil < 0
                        ? "text-red-600 font-semibold"
                        : d.daysUntil <= 7
                          ? "text-amber-600"
                          : "text-gray-400"
                    }`}
                  >
                    {d.daysUntil < 0
                      ? `${Math.abs(d.daysUntil)} days overdue`
                      : `${d.daysUntil} days`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="px-5 py-3"
              >
                <p className="text-xs font-medium text-gray-800">
                  {item.action}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {item.detail}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Quick View */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">
            Properties Overview
          </h2>
          <button
            onClick={() => onNavigate("properties")}
            className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
          >
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Deadline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {properties.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="hover:bg-gray-50/50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.image}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-xs">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[200px]">
                          {p.address}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-600">
                    {p.tenant}
                  </td>
                  <td className="px-5 py-3 text-xs font-medium text-gray-900">
                    {p.monthlyRent}
                  </td>
                  <td className="px-5 py-3">{statusBadge(p.status)}</td>
                  <td className="px-5 py-3">
                    <p className="text-xs text-gray-600">{p.nextDeadline}</p>
                    <p className="text-[11px] text-gray-400">
                      {p.nextDeadlineDate}
                    </p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ── Properties Screen ────────────────────────────────────

function PropertiesScreen() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your property portfolio
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-teal-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {properties.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelectedProperty(p)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all cursor-pointer"
          >
            {/* Property header */}
            <div className="p-5 border-b border-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.image}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {p.address}
                    </p>
                  </div>
                </div>
                {statusBadge(p.status)}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Tenant</span>
                <span className="text-xs font-medium text-gray-900">
                  {p.tenant}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Monthly Rent</span>
                <span className="text-xs font-medium text-gray-900">
                  {p.monthlyRent}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Lease Period</span>
                <span className="text-xs text-gray-700">
                  {p.leaseStart} → {p.leaseEnd}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[11px] text-gray-500">
                  {p.nextDeadline}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    p.status === "payment-pending" || p.status === "expired"
                      ? "text-red-600"
                      : p.status === "renewal-soon"
                        ? "text-amber-600"
                        : "text-gray-500"
                  }`}
                >
                  {p.nextDeadlineDate}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedProperty.image}</span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {selectedProperty.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedProperty.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      Tenant
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {selectedProperty.tenant}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      Monthly Rent
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {selectedProperty.monthlyRent}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      Lease Start
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {selectedProperty.leaseStart}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      Lease End
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {selectedProperty.leaseEnd}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Status</span>
                  {statusBadge(selectedProperty.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Deadline</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedProperty.nextDeadline} —{" "}
                    {selectedProperty.nextDeadlineDate}
                  </span>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Documents Screen ─────────────────────────────────────

function DocumentsScreen({
  filter,
  setFilter,
  search,
  setSearch,
}: {
  filter: DocumentCategory | "all";
  setFilter: (f: DocumentCategory | "all") => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  const categories: (DocumentCategory | "all")[] = [
    "all",
    "contract",
    "invoice",
    "receipt",
    "id",
    "addendum",
  ];

  const filtered = documents.filter((d) => {
    if (filter !== "all" && d.category !== filter) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure document vault — {documents.length} files
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-teal-700 transition-colors">
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          />
        </div>
        <div className="flex gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filter === cat
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "All" : categoryLabel(cat as DocumentCategory)}
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-lg">
                {categoryIcon(doc.category)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {doc.name}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {doc.property} · {doc.uploadedBy} · {doc.uploadedAt}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${
                  {
                    contract: "bg-blue-50 text-blue-600 border-blue-200",
                    invoice: "bg-amber-50 text-amber-600 border-amber-200",
                    receipt: "bg-green-50 text-green-600 border-green-200",
                    id: "bg-purple-50 text-purple-600 border-purple-200",
                    addendum: "bg-gray-50 text-gray-600 border-gray-200",
                  }[doc.category]
                }`}
              >
                {categoryLabel(doc.category)}
              </span>
              <span className="text-[11px] text-gray-400 w-16 text-right">
                {doc.size}
              </span>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            No documents match your filters
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ── Deadlines Screen ─────────────────────────────────────

function DeadlinesScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Deadlines</h1>
        <p className="text-sm text-gray-500 mt-1">
          Automated tracking with configurable reminder windows (30 / 14 / 7
          days)
        </p>
      </div>

      {/* Urgency Legend */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-gray-600">
            Critical (overdue or &lt;7 days)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-xs text-gray-600">Warning (7–30 days)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs text-gray-600">Normal (30+ days)</span>
        </div>
      </div>

      {/* Deadline Cards */}
      <div className="space-y-3">
        {deadlines.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 border-l-4 ${urgencyColor(d.urgency)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {d.type}
                  </h3>
                  {d.notificationSent && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-teal-50 text-teal-600 rounded-full border border-teal-200">
                      <Bell className="w-2.5 h-2.5" /> Notified
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{d.property}</p>
                <p className="text-xs text-gray-400 mt-1">{d.description}</p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-sm font-medium text-gray-800">{d.date}</p>
                <p
                  className={`text-xs mt-0.5 font-medium ${
                    d.daysUntil < 0
                      ? "text-red-600"
                      : d.daysUntil <= 7
                        ? "text-amber-600"
                        : "text-emerald-600"
                  }`}
                >
                  {d.daysUntil < 0
                    ? `${Math.abs(d.daysUntil)} days overdue`
                    : d.daysUntil === 0
                      ? "Today"
                      : `In ${d.daysUntil} days`}
                </p>
              </div>
            </div>

            {/* Notification timeline */}
            <div className="mt-4 pt-3 border-t border-gray-50">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                Reminder Schedule
              </p>
              <div className="flex items-center gap-2">
                {[30, 14, 7].map((days) => {
                  const sent = d.daysUntil < days;
                  return (
                    <div
                      key={days}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] ${
                        sent
                          ? "bg-teal-50 text-teal-600"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      {sent ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {days}-day
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Webhook Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Webhook-Driven Notifications
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Each deadline trigger fires a webhook that can connect to any
              notification channel — Email, WhatsApp Business API, SMS via
              Twilio, or Slack. Add new channels without changing the core
              deadline engine.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Notifications Screen ─────────────────────────────────

function NotificationsScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 lg:p-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Automated alerts triggered by the deadline engine
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {notifications.filter((n) => n.status === "sent").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Sent</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {notifications.filter((n) => n.status === "scheduled").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Scheduled</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-gray-400">
            {notifications.filter((n) => n.status === "pending").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Pending</p>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="px-5 py-4 flex items-start gap-4"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  n.status === "sent"
                    ? "bg-emerald-50"
                    : n.status === "scheduled"
                      ? "bg-blue-50"
                      : "bg-gray-50"
                }`}
              >
                {n.channel.includes("Webhook") ? (
                  <TrendingUp
                    className={`w-4 h-4 ${
                      n.status === "sent"
                        ? "text-emerald-500"
                        : n.status === "scheduled"
                          ? "text-blue-500"
                          : "text-gray-400"
                    }`}
                  />
                ) : (
                  <Mail
                    className={`w-4 h-4 ${
                      n.status === "sent"
                        ? "text-emerald-500"
                        : n.status === "scheduled"
                          ? "text-blue-500"
                          : "text-gray-400"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-medium text-gray-900">
                    {n.title}
                  </h3>
                  {notificationStatusBadge(n.status)}
                </div>
                <p className="text-xs text-gray-500">{n.message}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-gray-400">{n.date}</span>
                  <span className="text-[11px] text-gray-300">·</span>
                  <span className="text-[11px] text-gray-400">
                    {n.channel}
                  </span>
                  <span className="text-[11px] text-gray-300">·</span>
                  <span className="text-[11px] text-gray-400">
                    {n.property}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Channel Configuration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Notification Channels
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              name: "Email",
              icon: Mail,
              status: "Active",
              active: true,
            },
            {
              name: "Webhook",
              icon: TrendingUp,
              status: "Active",
              active: true,
            },
            {
              name: "WhatsApp",
              icon: MessageSquare,
              status: "Ready to connect",
              active: false,
            },
            {
              name: "SMS",
              icon: MessageSquare,
              status: "Ready to connect",
              active: false,
            },
          ].map((channel) => (
            <div
              key={channel.name}
              className={`rounded-lg border p-3 ${
                channel.active
                  ? "border-teal-200 bg-teal-50/50"
                  : "border-gray-100 bg-gray-50/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <channel.icon
                  className={`w-4 h-4 ${channel.active ? "text-teal-600" : "text-gray-400"}`}
                />
                <span className="text-xs font-medium text-gray-900">
                  {channel.name}
                </span>
              </div>
              <p
                className={`text-[11px] ${channel.active ? "text-teal-600" : "text-gray-400"}`}
              >
                {channel.status}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
