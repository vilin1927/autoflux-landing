"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  caseStudyScreens,
  type AppScreen,
  type CaseStudyScreenSet,
} from "@/data/case-study-screens";

/* ------------------------------------------------------------------ */
/*  Helper: derive contextual labels from screen title                 */
/* ------------------------------------------------------------------ */
function deriveLabels(title: string): { kpis: { label: string; value: string }[]; rows: string[][]; headers: string[] } {
  const t = title.toLowerCase();
  if (t.includes("call")) {
    return {
      kpis: [
        { label: "Calls Analyzed", value: "1,293" },
        { label: "Avg Score", value: "78%" },
        { label: "Avg Duration", value: "2m 14s" },
        { label: "Escalated", value: "42" },
      ],
      headers: ["Time", "Caller", "Intent", "Duration", "Score"],
      rows: [
        ["9:14 AM", "Sarah K.", "Booking", "1:42", "92"],
        ["9:31 AM", "Tom B.", "Billing", "3:05", "67"],
        ["10:02 AM", "Amy L.", "Hours", "0:48", "88"],
        ["10:15 AM", "Dan K.", "Support", "2:20", "75"],
        ["10:44 AM", "Mia R.", "Cancel", "1:55", "61"],
      ],
    };
  }
  if (t.includes("order") || t.includes("ship") || t.includes("fulfil")) {
    return {
      kpis: [
        { label: "Orders Today", value: "184" },
        { label: "Shipped", value: "142" },
        { label: "Pending", value: "29" },
        { label: "Returns", value: "13" },
      ],
      headers: ["Order #", "Customer", "Status", "Items", "Total"],
      rows: [
        ["#4821", "Jane S.", "Shipped", "3", "$89.99"],
        ["#4820", "Tom B.", "Processing", "1", "$24.50"],
        ["#4819", "Amy L.", "Delivered", "2", "$156.00"],
        ["#4818", "Dan K.", "Shipped", "5", "$210.75"],
        ["#4817", "Mia R.", "Pending", "1", "$34.99"],
      ],
    };
  }
  if (t.includes("lead") || t.includes("pipeline") || t.includes("enrich")) {
    return {
      kpis: [
        { label: "Leads Scraped", value: "1,842" },
        { label: "Enriched", value: "1,206" },
        { label: "Qualified", value: "487" },
        { label: "Sent to CRM", value: "312" },
      ],
      headers: ["Company", "Contact", "Email", "ICP", "Status"],
      rows: [
        ["Acme Corp", "Jane S.", "jane@acme.co", "92", "Qualified"],
        ["Nova Ltd", "Tom B.", "tom@nova.io", "87", "Enriched"],
        ["Peak Inc", "Amy L.", "amy@peak.com", "78", "Sent"],
        ["Bolt Co", "Dan K.", "dan@bolt.co", "65", "Scraped"],
        ["Zeta LLC", "Mia R.", "mia@zeta.biz", "91", "Qualified"],
      ],
    };
  }
  if (t.includes("property") || t.includes("real estate") || t.includes("deadline")) {
    return {
      kpis: [
        { label: "Active Properties", value: "24" },
        { label: "Pending Documents", value: "7" },
        { label: "Upcoming Deadlines", value: "12" },
        { label: "Client Messages", value: "3" },
      ],
      headers: ["Address", "Status", "Client", "Updated", "Action"],
      rows: [
        ["14 Oak Lane", "Active", "John D.", "2h ago", "View"],
        ["88 Elm Street", "Pending", "Sarah M.", "1d ago", "View"],
        ["221 Pine Ave", "Closing", "Alex R.", "3h ago", "View"],
        ["7 Maple Ct", "Active", "Lisa T.", "5h ago", "View"],
        ["55 Cedar Blvd", "Sold", "Mike P.", "2d ago", "View"],
      ],
    };
  }
  if (t.includes("campaign") || t.includes("content") || t.includes("viral")) {
    return {
      kpis: [
        { label: "Campaigns", value: "18" },
        { label: "Videos Created", value: "342" },
        { label: "Avg Views", value: "12.4K" },
        { label: "Engagement", value: "4.7%" },
      ],
      headers: ["Title", "Status", "Views", "Likes", "Date"],
      rows: [
        ["Summer Drop", "Published", "24.1K", "1.2K", "Mar 19"],
        ["Product Reveal", "Draft", "--", "--", "Mar 20"],
        ["Tutorial #12", "Scheduled", "--", "--", "Mar 21"],
        ["Behind Scenes", "Published", "18.7K", "890", "Mar 17"],
        ["Promo Clip", "Published", "31.2K", "2.1K", "Mar 15"],
      ],
    };
  }
  if (t.includes("booking") || t.includes("calendar") || t.includes("appointment")) {
    return {
      kpis: [
        { label: "Bookings Today", value: "14" },
        { label: "Confirmed", value: "11" },
        { label: "No-shows", value: "1" },
        { label: "Revenue", value: "$2,340" },
      ],
      headers: ["Time", "Client", "Service", "Status", "Amount"],
      rows: [
        ["9:00 AM", "Sarah K.", "Consultation", "Confirmed", "$120"],
        ["10:30 AM", "Tom B.", "Follow-up", "Confirmed", "$80"],
        ["1:00 PM", "Amy L.", "Initial Visit", "Pending", "$150"],
        ["2:30 PM", "Dan K.", "Check-up", "Confirmed", "$95"],
        ["4:00 PM", "Mia R.", "Consultation", "Confirmed", "$120"],
      ],
    };
  }
  if (t.includes("dm") || t.includes("conversation") || t.includes("instagram") || t.includes("message")) {
    return {
      kpis: [
        { label: "DMs Received", value: "847" },
        { label: "Qualified", value: "234" },
        { label: "Booked", value: "67" },
        { label: "Response Rate", value: "94%" },
      ],
      headers: ["User", "Message", "Intent", "Score", "Status"],
      rows: [
        ["@sarah_k", "Hi, pricing?", "Purchase", "92", "Qualified"],
        ["@tombiz", "Partnership", "Collab", "78", "Reviewing"],
        ["@amyfit", "Availability?", "Booking", "85", "Booked"],
        ["@danstyle", "Discount?", "Purchase", "71", "Pending"],
        ["@mia.co", "Bulk order", "Purchase", "95", "Qualified"],
      ],
    };
  }
  if (t.includes("onboard") || t.includes("progress") || t.includes("user")) {
    return {
      kpis: [
        { label: "Active Users", value: "1,247" },
        { label: "Completion Rate", value: "73%" },
        { label: "Avg Time", value: "4.2 min" },
        { label: "Drop-offs", value: "18%" },
      ],
      headers: ["User", "Step", "Progress", "Time", "Status"],
      rows: [
        ["Sarah K.", "Step 3/5", "60%", "2m", "Active"],
        ["Tom B.", "Step 5/5", "100%", "5m", "Complete"],
        ["Amy L.", "Step 1/5", "20%", "1m", "Active"],
        ["Dan K.", "Step 4/5", "80%", "3m", "Active"],
        ["Mia R.", "Step 2/5", "40%", "2m", "Paused"],
      ],
    };
  }
  if (t.includes("competitor") || t.includes("review") || t.includes("compare")) {
    return {
      kpis: [
        { label: "Competitors", value: "24" },
        { label: "Avg Rating", value: "4.2" },
        { label: "Your Rank", value: "#3" },
        { label: "New Reviews", value: "47" },
      ],
      headers: ["Clinic", "Rating", "Reviews", "Distance", "Status"],
      rows: [
        ["PetCare Plus", "4.8", "342", "0.5 mi", "Active"],
        ["VetFirst", "4.5", "287", "1.2 mi", "Active"],
        ["Animal Health", "4.3", "198", "2.1 mi", "Active"],
        ["City Vet", "4.1", "156", "3.0 mi", "Active"],
        ["Pet Wellness", "3.9", "112", "4.5 mi", "Closed"],
      ],
    };
  }
  if (t.includes("report") || t.includes("delivery")) {
    return {
      kpis: [
        { label: "Reports Sent", value: "156" },
        { label: "Open Rate", value: "89%" },
        { label: "Scheduled", value: "12" },
        { label: "Failed", value: "2" },
      ],
      headers: ["Report", "Recipient", "Status", "Sent", "Opens"],
      rows: [
        ["Weekly KPIs", "Team Lead", "Delivered", "Mar 19", "4"],
        ["Monthly Rev", "CEO", "Delivered", "Mar 18", "7"],
        ["Pipeline", "Sales Mgr", "Scheduled", "Mar 22", "--"],
        ["Churn Risk", "CS Lead", "Delivered", "Mar 17", "3"],
        ["Ad Spend", "Marketing", "Failed", "Mar 16", "0"],
      ],
    };
  }
  if (t.includes("team") || t.includes("leaderboard")) {
    return {
      kpis: [
        { label: "Team Size", value: "12" },
        { label: "Active", value: "10" },
        { label: "Avg Score", value: "84%" },
        { label: "Top Rep", value: "Sarah K." },
      ],
      headers: ["Name", "Role", "Score", "Deals", "Status"],
      rows: [
        ["Sarah K.", "Senior Rep", "95", "24", "Active"],
        ["Tom B.", "Rep", "88", "18", "Active"],
        ["Amy L.", "Lead", "92", "31", "Active"],
        ["Dan K.", "Rep", "76", "12", "Away"],
        ["Mia R.", "Junior", "71", "8", "Active"],
      ],
    };
  }
  if (t.includes("landing") || t.includes("project")) {
    return {
      kpis: [
        { label: "Projects", value: "8" },
        { label: "In Progress", value: "3" },
        { label: "Deployed", value: "5" },
        { label: "Uptime", value: "99.9%" },
      ],
      headers: ["Project", "Stack", "Status", "Deploy", "Users"],
      rows: [
        ["SaaS MVP", "Next.js", "Live", "Mar 19", "1.2K"],
        ["Mobile App", "React Native", "Beta", "Mar 20", "340"],
        ["API Gateway", "FastAPI", "Live", "Mar 15", "5.1K"],
        ["Dashboard", "Next.js", "Dev", "--", "--"],
        ["Landing", "Next.js", "Live", "Mar 12", "8.4K"],
      ],
    };
  }
  // Default fallback
  return {
    kpis: [
      { label: "Total Items", value: "1,247" },
      { label: "Active", value: "892" },
      { label: "Pending", value: "214" },
      { label: "Completed", value: "141" },
    ],
    headers: ["Name", "Type", "Status", "Updated", "Action"],
    rows: [
      ["Item Alpha", "Type A", "Active", "2h ago", "View"],
      ["Item Beta", "Type B", "Pending", "1d ago", "View"],
      ["Item Gamma", "Type A", "Complete", "3h ago", "View"],
      ["Item Delta", "Type C", "Active", "5h ago", "View"],
      ["Item Epsilon", "Type B", "Active", "2d ago", "View"],
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Desktop browser frame — NO URL bar                                 */
/* ------------------------------------------------------------------ */
function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ aspectRatio: "16/10" }}>
      <div className="flex h-full flex-col overflow-hidden rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 border-b border-gray-200">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile phone frame — same 16/10 outer container                    */
/* ------------------------------------------------------------------ */
function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full flex items-center justify-center"
      style={{ aspectRatio: "16/10" }}
    >
      <div
        className="w-[220px] md:w-[260px]"
        style={{ aspectRatio: "9/19" }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[32px] shadow-xl border-[3px] border-gray-800 bg-black">
          <div className="flex items-center justify-between bg-black px-5 pt-2 pb-1">
            <span className="text-[9px] font-medium text-white">9:41</span>
            <div className="h-[14px] w-[72px] rounded-full bg-black border border-gray-700" />
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-white">5G</span>
              <span className="text-[9px] text-white">&#9632;</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden bg-white">{children}</div>
          <div className="flex justify-center bg-white pb-1.5 pt-1">
            <div className="h-[4px] w-[100px] rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout systems                                                     */
/* ------------------------------------------------------------------ */

function SidebarLeftLayout({
  screenSet,
  screen,
  children,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
}) {
  const navItems = ["Dashboard", "Records", "Documents", "Analytics", "Settings"];
  return (
    <div className="flex h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div
        className="flex flex-col w-[110px] min-w-[110px] py-3 px-2 gap-1"
        style={{ background: screenSet.colorTheme.sidebar }}
      >
        <div
          className="text-[11px] font-bold text-white mb-3 px-1 truncate"
          style={screen.blurName ? { filter: "blur(4px)" } : undefined}
        >
          {screenSet.logoText}
        </div>
        {navItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[9px]"
            style={{
              background:
                item === screen.title || screen.title.toLowerCase().includes(item.toLowerCase().slice(0, 4))
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span
              className="h-2 w-2 rounded-sm flex-shrink-0"
              style={{
                background:
                  item === screen.title
                    ? screenSet.colorTheme.accent
                    : "rgba(255,255,255,0.3)",
              }}
            />
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
          <span className="text-[10px] font-semibold text-gray-800">{screen.title}</span>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <span className="text-[8px] text-gray-500">Admin</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function SidebarDarkLayout({
  screenSet,
  screen,
  children,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
}) {
  const icons = ["▦", "◈", "◉", "△", "⚙"];
  const labels = ["Home", "Data", "Items", "Graph", "Config"];
  return (
    <div className="flex h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div className="flex flex-col w-[52px] min-w-[52px] py-3 items-center gap-2 bg-gray-900">
        <div
          className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white mb-2"
          style={{ background: screenSet.colorTheme.primary, filter: screen.blurName ? "blur(4px)" : undefined }}
        >
          {screenSet.logoText.charAt(0)}
        </div>
        {icons.map((icon, i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-lg flex items-center justify-center text-[11px] cursor-pointer"
            style={{
              background: i === 0 ? "rgba(255,255,255,0.1)" : "transparent",
              color: i === 0 ? screenSet.colorTheme.primary : "rgba(255,255,255,0.4)",
            }}
            title={labels[i]}
          >
            {icon}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5">
          <span className="text-[10px] font-semibold text-gray-800">{screen.title}</span>
          <div className="flex items-center gap-1.5">
            <div className="rounded bg-gray-100 px-2 py-0.5 text-[7px] text-gray-400">Search</div>
            <div className="h-4 w-4 rounded-full bg-gray-200" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function TopnavLayout({
  screenSet,
  screen,
  children,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
}) {
  const navLinks = ["Overview", "Data", "Reports", "Settings"];
  return (
    <div className="flex flex-col h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold"
            style={{ color: screenSet.colorTheme.primary, filter: screen.blurName ? "blur(4px)" : undefined }}
          >
            {screenSet.logoText}
          </span>
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <span
                key={link}
                className="text-[8px] font-medium"
                style={{
                  color: link === "Overview" ? screenSet.colorTheme.primary : "#9ca3af",
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="px-3 py-1 bg-white border-b border-gray-100">
        <span className="text-[10px] font-semibold text-gray-800">{screen.title}</span>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

function TopnavTabsLayout({
  screenSet,
  screen,
  children,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
}) {
  const tabs = ["All", "Active", "Archived", "Drafts"];
  return (
    <div className="flex flex-col h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-gray-200">
        <span
          className="text-[10px] font-bold"
          style={{ color: screenSet.colorTheme.primary, filter: screen.blurName ? "blur(4px)" : undefined }}
        >
          {screenSet.logoText}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="rounded bg-gray-100 px-2 py-0.5 text-[7px] text-gray-400">Search...</div>
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="flex items-center gap-0 px-3 bg-white border-b border-gray-200">
        {tabs.map((tab, i) => (
          <div
            key={tab}
            className="px-2 py-1.5 text-[8px] font-medium"
            style={{
              color: i === 0 ? screenSet.colorTheme.primary : "#9ca3af",
              borderBottom: i === 0 ? `2px solid ${screenSet.colorTheme.primary}` : "2px solid transparent",
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="px-3 py-1 bg-white/50">
        <span className="text-[10px] font-semibold text-gray-800">{screen.title}</span>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

function MinimalLayout({
  screenSet,
  screen,
  children,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div className="flex items-center justify-between px-3 py-1 bg-white/80 border-b border-gray-100">
        <div className="flex items-center gap-1 text-[8px] text-gray-400">
          <span
            className="font-medium"
            style={{ color: screenSet.colorTheme.primary, filter: screen.blurName ? "blur(4px)" : undefined }}
          >
            {screenSet.logoText}
          </span>
          <span>/</span>
          <span className="text-gray-600">{screen.title}</span>
        </div>
        <div className="h-3.5 w-3.5 rounded-full bg-gray-200" />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

function SplitLayout({
  screenSet,
  screen,
  children,
  listContent,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
  listContent?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-gray-200">
        <span
          className="text-[10px] font-bold"
          style={{ color: screenSet.colorTheme.primary, filter: screen.blurName ? "blur(4px)" : undefined }}
        >
          {screenSet.logoText}
        </span>
        <span className="text-[9px] font-medium text-gray-700">{screen.title}</span>
        <div className="h-4 w-4 rounded-full bg-gray-200" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[130px] min-w-[130px] border-r border-gray-200 bg-white overflow-y-auto">
          {listContent || <SplitListDefault primary={screenSet.colorTheme.primary} />}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function SplitListDefault({ primary }: { primary: string }) {
  const items = ["Inbox", "Starred", "Sent", "Drafts", "Archive"];
  return (
    <div className="py-1">
      {items.map((item, i) => (
        <div
          key={item}
          className="px-2 py-1.5 text-[8px] flex items-center gap-1.5"
          style={{
            background: i === 0 ? `${primary}11` : "transparent",
            color: i === 0 ? primary : "#6b7280",
            borderLeft: i === 0 ? `2px solid ${primary}` : "2px solid transparent",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? primary : "#d1d5db" }} />
          {item}
        </div>
      ))}
    </div>
  );
}

function FullwidthLayout({
  screenSet,
  screen,
  children,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full" style={{ background: screenSet.colorTheme.bg }}>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile header bar                                                  */
/* ------------------------------------------------------------------ */
function MobileHeader({
  screenSet,
  screen,
}: {
  screenSet: CaseStudyScreenSet;
  screen: AppScreen;
}) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2"
      style={{ background: screenSet.colorTheme.primary }}
    >
      <span className="text-[9px] text-white/70">&#9664;</span>
      <span
        className="text-[10px] font-semibold text-white"
        style={screen.blurName ? { filter: "blur(4px)" } : undefined}
      >
        {screen.appName}
      </span>
      <span className="text-[10px] text-white/70">&#8943;</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny reusable UI pieces                                            */
/* ------------------------------------------------------------------ */
function Badge({ text, bg, fg }: { text: string; bg: string; fg: string }) {
  return (
    <span
      className="inline-block rounded-full px-1.5 py-[1px] text-[7px] font-medium"
      style={{ background: bg, color: fg }}
    >
      {text}
    </span>
  );
}

function Toggle({ on, color }: { on: boolean; color: string }) {
  return (
    <div
      className="h-3 w-6 rounded-full flex items-center px-[2px]"
      style={{ background: on ? color : "#d1d5db" }}
    >
      <div
        className="h-2 w-2 rounded-full bg-white transition-transform"
        style={{ transform: on ? "translateX(10px)" : "translateX(0)" }}
      />
    </div>
  );
}

const statusColors: Record<string, { bg: string; fg: string }> = {
  Active: { bg: "#dcfce7", fg: "#166534" },
  Pending: { bg: "#fef9c3", fg: "#854d0e" },
  Closing: { bg: "#dbeafe", fg: "#1e40af" },
  Sold: { bg: "#f3e8ff", fg: "#6b21a8" },
  Qualified: { bg: "#dcfce7", fg: "#166534" },
  Enriched: { bg: "#dbeafe", fg: "#1e40af" },
  Sent: { bg: "#f3e8ff", fg: "#6b21a8" },
  Scraped: { bg: "#fef9c3", fg: "#854d0e" },
  Resolved: { bg: "#dcfce7", fg: "#166534" },
  Escalated: { bg: "#fee2e2", fg: "#991b1b" },
  Shipped: { bg: "#dbeafe", fg: "#1e40af" },
  Processing: { bg: "#fef9c3", fg: "#854d0e" },
  Delivered: { bg: "#dcfce7", fg: "#166534" },
  Published: { bg: "#dcfce7", fg: "#166534" },
  Draft: { bg: "#f3f4f6", fg: "#6b7280" },
  Scheduled: { bg: "#dbeafe", fg: "#1e40af" },
  Confirmed: { bg: "#dcfce7", fg: "#166534" },
  Complete: { bg: "#dcfce7", fg: "#166534" },
  Paused: { bg: "#fef9c3", fg: "#854d0e" },
  Away: { bg: "#fef9c3", fg: "#854d0e" },
  Reviewing: { bg: "#fef9c3", fg: "#854d0e" },
  Booked: { bg: "#dcfce7", fg: "#166534" },
  Live: { bg: "#dcfce7", fg: "#166534" },
  Beta: { bg: "#dbeafe", fg: "#1e40af" },
  Dev: { bg: "#f3f4f6", fg: "#6b7280" },
  Failed: { bg: "#fee2e2", fg: "#991b1b" },
  Closed: { bg: "#f3f4f6", fg: "#6b7280" },
};

/* ------------------------------------------------------------------ */
/*  DASHBOARD renderers (3 variants)                                   */
/* ------------------------------------------------------------------ */
function DashboardContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary, primaryLight, accent } = screenSet.colorTheme;
  const v = screen.variant || 1;
  const { kpis } = deriveLabels(screen.title);

  if (v === 1) {
    // 4 KPI cards in a row + horizontal bar chart below
    return (
      <div className="p-3 h-full flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-lg bg-white p-2 shadow-sm border border-gray-100">
              <div className="text-[13px] font-bold" style={{ color: primary }}>{k.value}</div>
              <div className="text-[8px] text-gray-500 mt-0.5 leading-tight">{k.label}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-lg border border-gray-100 bg-white p-2 min-h-[60px] flex flex-col gap-1.5 justify-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => {
            const widths = [75, 45, 88, 60, 92];
            return (
              <div key={day} className="flex items-center gap-1.5">
                <span className="text-[7px] text-gray-400 w-[22px]">{day}</span>
                <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${widths[i]}%`, background: i % 2 === 0 ? primary : primaryLight }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (v === 2) {
    // 2 large metric cards on left + small stats list on right
    return (
      <div className="p-3 h-full flex gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <div className="rounded-xl p-3 flex-1 flex flex-col justify-center" style={{ background: primary }}>
            <div className="text-[18px] font-bold text-white">{kpis[0]?.value}</div>
            <div className="text-[9px] text-white/70 mt-1">{kpis[0]?.label}</div>
          </div>
          <div className="rounded-xl p-3 flex-1 flex flex-col justify-center" style={{ background: accent }}>
            <div className="text-[18px] font-bold text-white">{kpis[1]?.value}</div>
            <div className="text-[9px] text-white/70 mt-1">{kpis[1]?.label}</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-[120px]">
          {kpis.slice(2).map((k) => (
            <div key={k.label} className="rounded-lg bg-white p-2 border border-gray-100">
              <div className="text-[11px] font-bold text-gray-800">{k.value}</div>
              <div className="text-[7px] text-gray-400">{k.label}</div>
            </div>
          ))}
          <div className="flex-1 rounded-lg bg-white border border-gray-100 p-2">
            <div className="text-[7px] text-gray-400 mb-1">Trend</div>
            <div className="flex items-end gap-[3px] h-[30px]">
              {[30, 50, 40, 70, 55, 80, 65].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: primaryLight, opacity: 0.7 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // v === 3: Single big number top + 3 small cards below + gradient area
  return (
    <div className="p-3 h-full flex flex-col gap-2">
      <div className="rounded-xl p-3 text-center" style={{ background: `${primary}0d` }}>
        <div className="text-[24px] font-bold" style={{ color: primary }}>{kpis[0]?.value}</div>
        <div className="text-[9px] text-gray-500">{kpis[0]?.label}</div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {kpis.slice(1).map((k) => (
          <div key={k.label} className="rounded-md bg-white p-1.5 text-center border border-gray-100">
            <div className="text-[10px] font-bold text-gray-800">{k.value}</div>
            <div className="text-[6px] text-gray-400">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg bg-white border border-gray-100 p-2 min-h-[40px] flex items-end overflow-hidden relative">
        <div className="absolute inset-0 flex items-end">
          <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${screen.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={primary} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d="M0,50 Q25,20 50,35 T100,15 T150,30 T200,10 L200,60 L0,60 Z" fill={`url(#grad-${screen.id})`} />
            <path d="M0,50 Q25,20 50,35 T100,15 T150,30 T200,10" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TABLE renderers (3 variants)                                       */
/* ------------------------------------------------------------------ */
function TableContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary } = screenSet.colorTheme;
  const v = screen.variant || 1;
  const { headers, rows } = deriveLabels(screen.title);

  if (v === 1) {
    // Classic rows with alternating backgrounds, status pills
    return (
      <div className="p-2 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-gray-500">{rows.length} records</span>
          <div className="flex gap-1">
            <div className="rounded bg-gray-100 px-2 py-0.5 text-[8px] text-gray-400">Search...</div>
            <div className="rounded px-2 py-0.5 text-[8px] text-white" style={{ background: primary }}>+ Add</div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-[8px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {headers.map((h) => (
                  <th key={h} className="px-2 py-1.5 text-left font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100" style={{ background: ri % 2 === 0 ? "white" : "#fafafa" }}>
                  {row.map((cell, ci) => {
                    const sc = statusColors[cell];
                    return (
                      <td key={ci} className="px-2 py-1.5 text-gray-700">
                        {sc ? <Badge text={cell} bg={sc.bg} fg={sc.fg} /> : cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (v === 2) {
    // Card-list style: each row is a mini card
    return (
      <div className="p-2 h-full flex flex-col gap-1.5 overflow-y-auto">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-gray-500 font-medium">{rows.length} items</span>
          <div className="rounded px-2 py-0.5 text-[8px] text-white" style={{ background: primary }}>+ New</div>
        </div>
        {rows.map((row, ri) => (
          <div key={ri} className="rounded-xl bg-white border border-gray-100 p-2 shadow-sm flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg flex items-center justify-center text-[8px] font-bold text-white" style={{ background: primary }}>
              {row[0]?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-semibold text-gray-800 truncate">{row[0]}</div>
              <div className="text-[7px] text-gray-400">{row[1]} {row[2] ? `· ${row[2]}` : ""}</div>
            </div>
            {statusColors[row[3]] ? (
              <Badge text={row[3]} bg={statusColors[row[3]].bg} fg={statusColors[row[3]].fg} />
            ) : statusColors[row[4]] ? (
              <Badge text={row[4]} bg={statusColors[row[4]].bg} fg={statusColors[row[4]].fg} />
            ) : (
              <span className="text-[7px] text-gray-400">{row[4] || row[3]}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // v === 3: Compact dense table with colored left border per row
  return (
    <div className="p-2 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-gray-500 font-medium">{rows.length} records</span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col gap-[2px]">
        {rows.map((row, ri) => {
          const colors = [primary, screenSet.colorTheme.accent, screenSet.colorTheme.primaryLight, "#6b7280", primary];
          return (
            <div key={ri} className="flex items-center bg-white rounded-sm overflow-hidden text-[8px]" style={{ borderLeft: `3px solid ${colors[ri % colors.length]}` }}>
              {row.map((cell, ci) => {
                const sc = statusColors[cell];
                return (
                  <div key={ci} className="flex-1 px-1.5 py-1 text-gray-700 truncate">
                    {sc ? <Badge text={cell} bg={sc.bg} fg={sc.fg} /> : cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CHAT renderers (3 variants)                                        */
/* ------------------------------------------------------------------ */
function ChatContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary } = screenSet.colorTheme;
  const v = screen.variant || 1;

  if (v === 1) {
    // Standard chat bubbles (rounded, colored)
    const messages = [
      { from: "ai", text: "Thank you for reaching out. How can I help you today?" },
      { from: "user", text: "I'd like to book an appointment for Friday." },
      { from: "ai", text: "I have openings at 10 AM and 2 PM on Friday. Which works for you?" },
      { from: "user", text: "2 PM please." },
      { from: "ai", text: "You're booked for Friday at 2 PM. Confirmation sent!" },
    ];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[80%] rounded-xl px-2.5 py-1.5 text-[9px] leading-snug"
                style={{
                  background: m.from === "user" ? primary : "#f3f4f6",
                  color: m.from === "user" ? "white" : "#374151",
                  borderBottomRightRadius: m.from === "user" ? 4 : 12,
                  borderBottomLeftRadius: m.from === "ai" ? 4 : 12,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 border-t border-gray-200 px-2 py-1.5">
          <div className="flex-1 rounded-full bg-gray-100 px-3 py-1 text-[8px] text-gray-400">Type a message...</div>
          <div className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] text-white" style={{ background: primary }}>&#8593;</div>
        </div>
      </div>
    );
  }

  if (v === 2) {
    // Flat chat messages (no bubbles, names and text, like Slack)
    const messages = [
      { name: "AI Assistant", time: "9:14 AM", text: "Call transcript processed. Key insights extracted." },
      { name: "You", time: "9:16 AM", text: "What was the main objection?" },
      { name: "AI Assistant", time: "9:16 AM", text: "Pricing concern at 4:32 — customer asked for a discount twice." },
      { name: "You", time: "9:18 AM", text: "Suggested follow-up?" },
      { name: "AI Assistant", time: "9:18 AM", text: "Send case study + ROI calculator. Schedule follow-up in 3 days." },
    ];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className="flex gap-1.5">
              <div className="h-4 w-4 rounded flex-shrink-0 flex items-center justify-center text-[7px] font-bold text-white mt-0.5" style={{ background: m.name === "You" ? "#6b7280" : primary }}>
                {m.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[8px] font-bold text-gray-800">{m.name}</span>
                  <span className="text-[6px] text-gray-400">{m.time}</span>
                </div>
                <div className="text-[8px] text-gray-600 leading-snug">{m.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 border-t border-gray-200 px-2 py-1.5">
          <div className="flex-1 rounded-md bg-gray-50 border border-gray-200 px-2 py-1 text-[8px] text-gray-400">Reply...</div>
        </div>
      </div>
    );
  }

  // v === 3: WhatsApp-style with green/white bubbles and timestamps
  const messages = [
    { from: "them", text: "Hi! I saw your ad. Do you have availability this week?", time: "10:02 AM" },
    { from: "me", text: "Yes! We have slots on Wednesday and Friday. Which day works?", time: "10:03 AM" },
    { from: "them", text: "Friday afternoon please", time: "10:05 AM" },
    { from: "me", text: "Booked! Friday 2:00 PM. You'll get a reminder 24h before.", time: "10:05 AM" },
    { from: "them", text: "Perfect, thank you! 🙏", time: "10:06 AM" },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: "#e5ddd5" }}>
      <div className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[80%] rounded-lg px-2 py-1 text-[8px] leading-snug relative"
              style={{
                background: m.from === "me" ? "#dcf8c6" : "white",
                color: "#303030",
              }}
            >
              {m.text}
              <span className="text-[6px] text-gray-400 ml-2">{m.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 bg-white px-2 py-1.5">
        <div className="flex-1 rounded-full bg-gray-50 border border-gray-200 px-3 py-1 text-[8px] text-gray-400">Message</div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] text-white bg-[#25d366]">&#8593;</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FORM renderers (3 variants)                                        */
/* ------------------------------------------------------------------ */
function FormContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary } = screenSet.colorTheme;
  const v = screen.variant || 1;

  if (v === 1) {
    // Single column form with card sections
    const fields = [
      { label: "Full Name", placeholder: "John Doe" },
      { label: "Email", placeholder: "john@email.com" },
      { label: "Phone", placeholder: "+1 (555) 012-3456" },
      { label: "Notes", placeholder: "Additional details...", textarea: true },
    ];
    return (
      <div className="p-3 flex flex-col gap-2 h-full">
        <div className="rounded-xl bg-white border border-gray-100 p-2.5 shadow-sm flex flex-col gap-2">
          {fields.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <span className="text-[8px] font-medium text-gray-600">{f.label}</span>
              <div className={`rounded-lg border border-gray-200 bg-gray-50 px-2 text-[8px] text-gray-400 ${f.textarea ? "py-1.5 min-h-[28px]" : "py-1"}`}>
                {f.placeholder}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 rounded-lg border border-gray-200 py-1 text-center text-[8px] text-gray-500">Cancel</div>
          <div className="flex-1 rounded-lg py-1 text-center text-[8px] text-white font-medium" style={{ background: primary }}>Save</div>
        </div>
      </div>
    );
  }

  if (v === 2) {
    // Two-column form with grouped fields
    return (
      <div className="p-3 flex flex-col gap-2 h-full">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "First Name", val: "John" },
            { label: "Last Name", val: "Doe" },
            { label: "Email", val: "john@email.com" },
            { label: "Phone", val: "+1 555-0123" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <span className="text-[7px] font-medium text-gray-500">{f.label}</span>
              <div className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[8px] text-gray-600">{f.val}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[7px] font-medium text-gray-500">Description</span>
          <div className="rounded-md border border-gray-200 bg-white px-2 py-1.5 text-[8px] text-gray-400 min-h-[32px]">Enter details...</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[7px] font-medium text-gray-500">Category</span>
          <div className="flex gap-1.5">
            {["General", "Priority", "Urgent"].map((cat, i) => (
              <div key={cat} className="rounded-md px-2 py-1 text-[7px] font-medium" style={{ background: i === 0 ? primary : "#f3f4f6", color: i === 0 ? "white" : "#6b7280" }}>
                {cat}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto rounded-lg py-1.5 text-center text-[8px] text-white font-medium" style={{ background: primary }}>Submit</div>
      </div>
    );
  }

  // v === 3: Settings-style with label-value pairs and edit buttons
  const items = [
    { label: "Report Name", value: "Weekly KPI Summary" },
    { label: "Recipients", value: "team@company.com" },
    { label: "Schedule", value: "Every Monday, 9 AM" },
    { label: "Format", value: "PDF + Email" },
    { label: "Data Source", value: "HubSpot CRM" },
  ];
  return (
    <div className="p-3 flex flex-col gap-1.5 h-full">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-2.5 py-1.5">
          <div>
            <div className="text-[7px] text-gray-400">{item.label}</div>
            <div className="text-[9px] font-medium text-gray-800">{item.value}</div>
          </div>
          <span className="text-[7px] font-medium" style={{ color: primary }}>Edit</span>
        </div>
      ))}
      <div className="mt-auto rounded-lg py-1.5 text-center text-[8px] text-white font-medium" style={{ background: primary }}>Save Config</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANALYTICS renderers (3 variants)                                   */
/* ------------------------------------------------------------------ */
function AnalyticsContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary, primaryLight, accent } = screenSet.colorTheme;
  const v = screen.variant || 1;
  const { kpis } = deriveLabels(screen.title);

  if (v === 1) {
    // Vertical bar chart + 2 KPIs
    return (
      <div className="p-3 h-full flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white p-2 shadow-sm border border-gray-100">
            <div className="text-[13px] font-bold" style={{ color: primary }}>{kpis[0]?.value}</div>
            <div className="text-[8px] text-gray-500 mt-0.5">{kpis[0]?.label}</div>
          </div>
          <div className="rounded-lg bg-white p-2 shadow-sm border border-gray-100">
            <div className="text-[13px] font-bold" style={{ color: accent }}>{kpis[1]?.value}</div>
            <div className="text-[8px] text-gray-500 mt-0.5">{kpis[1]?.label}</div>
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-white border border-gray-100 p-2 flex flex-col">
          <div className="text-[8px] text-gray-500 mb-2 font-medium">Weekly Performance</div>
          <div className="flex-1 flex items-end gap-[6px]">
            {[45, 72, 58, 85, 63, 91].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full rounded-t" style={{ height: `${h}%`, background: i % 2 === 0 ? primary : accent, opacity: 0.8 }} />
                <span className="text-[6px] text-gray-400">{["M", "T", "W", "T", "F", "S"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (v === 2) {
    // Horizontal progress bars + funnel numbers
    return (
      <div className="p-3 h-full flex flex-col gap-2">
        <div className="rounded-lg bg-white border border-gray-100 p-2">
          <div className="text-[8px] text-gray-500 mb-1.5 font-medium">Funnel Breakdown</div>
          <div className="space-y-1.5">
            {[
              { label: "Impressions", value: "12.4K", pct: 100 },
              { label: "Clicks", value: "3.1K", pct: 25 },
              { label: "Leads", value: "847", pct: 7 },
              { label: "Converted", value: "234", pct: 2 },
            ].map((step) => (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[7px] text-gray-600">{step.label}</span>
                  <span className="text-[7px] font-bold" style={{ color: primary }}>{step.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${step.pct}%`, background: primary }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white p-2 border border-gray-100 text-center">
            <div className="text-[14px] font-bold" style={{ color: primary }}>26.4%</div>
            <div className="text-[7px] text-gray-400">Conv. Rate</div>
          </div>
          <div className="rounded-lg bg-white p-2 border border-gray-100 text-center">
            <div className="text-[14px] font-bold" style={{ color: accent }}>$4.20</div>
            <div className="text-[7px] text-gray-400">Cost / Lead</div>
          </div>
        </div>
      </div>
    );
  }

  // v === 3: Grid of metric cards with sparkline-like shapes
  return (
    <div className="p-3 h-full flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Sessions", value: "4,210", trend: "up" },
          { label: "Bounce Rate", value: "34%", trend: "down" },
          { label: "Avg Duration", value: "2m 48s", trend: "up" },
          { label: "Pages/Session", value: "3.7", trend: "up" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-white p-2 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold text-gray-800">{m.value}</div>
              <span className="text-[8px]" style={{ color: m.trend === "up" ? "#22c55e" : "#ef4444" }}>
                {m.trend === "up" ? "&#9650;" : "&#9660;"}
              </span>
            </div>
            <div className="text-[7px] text-gray-400 mt-0.5">{m.label}</div>
            <div className="flex items-end gap-[2px] h-[12px] mt-1">
              {[3, 5, 4, 7, 6, 8, 5].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h * 12}%`, background: primaryLight, opacity: 0.6 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg bg-white border border-gray-100 p-2 flex items-end overflow-hidden relative min-h-[40px]">
        <div className="absolute inset-x-0 bottom-0 h-full flex items-end">
          <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`agrad-${screen.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
                <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d="M0,40 Q30,10 60,25 T120,15 T180,20 L200,30 L200,50 L0,50 Z" fill={`url(#agrad-${screen.id})`} />
            <path d="M0,40 Q30,10 60,25 T120,15 T180,20 L200,30" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PIPELINE renderers (3 variants)                                    */
/* ------------------------------------------------------------------ */
function PipelineContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary, primaryLight, accent } = screenSet.colorTheme;
  const v = screen.variant || 1;

  if (v === 1) {
    // Horizontal stages with arrows
    const stages = [
      { label: "New", count: 84, color: primaryLight },
      { label: "In Progress", count: 42, color: primary },
      { label: "Review", count: 18, color: accent },
      { label: "Done", count: 156, color: "#22c55e" },
    ];
    return (
      <div className="p-3 h-full flex flex-col gap-3">
        <div className="text-[8px] text-gray-500 font-medium">Pipeline Progress</div>
        <div className="flex items-center gap-1 flex-1">
          {stages.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 gap-1">
              <div className="flex-1 rounded-lg bg-white border border-gray-100 p-2 text-center shadow-sm">
                <div className="text-[12px] font-bold" style={{ color: s.color }}>{s.count}</div>
                <div className="text-[7px] text-gray-500 mt-0.5">{s.label}</div>
              </div>
              {i < stages.length - 1 && <span className="text-[10px] text-gray-300">&#8594;</span>}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="text-[7px] text-gray-400">Conversion</div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden flex">
            {stages.map((s, i) => (
              <div key={i} className="h-full" style={{ width: `${(s.count / 300) * 100}%`, background: s.color, opacity: 0.8 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (v === 2) {
    // Vertical kanban columns with cards
    const columns = [
      { title: "To Do", items: ["Research phase", "Data prep"], color: "#e5e7eb" },
      { title: "In Progress", items: ["Build MVP", "API setup"], color: primary },
      { title: "Done", items: ["Planning"], color: "#22c55e" },
    ];
    return (
      <div className="p-2 h-full flex gap-1.5 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.title} className="flex-1 min-w-[80px] flex flex-col">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.color }} />
              <span className="text-[8px] font-semibold text-gray-600">{col.title}</span>
              <span className="text-[7px] text-gray-400">{col.items.length}</span>
            </div>
            <div className="flex flex-col gap-1">
              {col.items.map((item) => (
                <div key={item} className="rounded-md bg-white border border-gray-100 p-1.5 shadow-sm">
                  <div className="text-[8px] text-gray-700">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // v === 3: Stepper/timeline with connected dots
  const steps = [
    { label: "Submitted", desc: "Request received", done: true },
    { label: "Processing", desc: "AI analyzing data", done: true },
    { label: "Review", desc: "Pending approval", done: false },
    { label: "Delivered", desc: "Sent to client", done: false },
  ];
  return (
    <div className="p-3 h-full flex flex-col gap-1">
      <div className="text-[8px] text-gray-500 font-medium mb-1">Progress Timeline</div>
      {steps.map((step, i) => (
        <div key={step.label} className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full border-2 flex-shrink-0" style={{ borderColor: step.done ? primary : "#d1d5db", background: step.done ? primary : "white" }} />
            {i < steps.length - 1 && <div className="w-[2px] flex-1 min-h-[16px]" style={{ background: step.done ? primary : "#e5e7eb" }} />}
          </div>
          <div className="pb-2">
            <div className="text-[9px] font-semibold" style={{ color: step.done ? "#374151" : "#9ca3af" }}>{step.label}</div>
            <div className="text-[7px] text-gray-400">{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARDS renderers (3 variants)                                       */
/* ------------------------------------------------------------------ */
function CardsContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary, primaryLight } = screenSet.colorTheme;
  const v = screen.variant || 1;

  if (v === 1) {
    // 2x2 grid of cards with icons
    const cards = [
      { icon: "&#9632;", title: "Active Tasks", value: "24" },
      { icon: "&#9650;", title: "Completed", value: "156" },
      { icon: "&#9679;", title: "In Queue", value: "12" },
      { icon: "&#9733;", title: "Starred", value: "8" },
    ];
    return (
      <div className="p-3 h-full grid grid-cols-2 gap-2">
        {cards.map((c) => (
          <div key={c.title} className="rounded-xl bg-white border border-gray-100 p-2.5 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="h-6 w-6 rounded-lg flex items-center justify-center text-[12px] mb-1" style={{ background: `${primary}15`, color: primary }} dangerouslySetInnerHTML={{ __html: c.icon }} />
            <div className="text-[12px] font-bold text-gray-800">{c.value}</div>
            <div className="text-[7px] text-gray-400">{c.title}</div>
          </div>
        ))}
      </div>
    );
  }

  if (v === 2) {
    // Horizontal scroll row of tall cards
    const items = [
      { title: "Contracts", desc: "3 files", color: primary },
      { title: "Inspections", desc: "5 files", color: screenSet.colorTheme.accent },
      { title: "Insurance", desc: "2 files", color: primaryLight },
    ];
    return (
      <div className="p-3 h-full flex flex-col">
        <div className="text-[8px] text-gray-500 font-medium mb-2">Categories</div>
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {items.map((item) => (
            <div key={item.title} className="min-w-[80px] flex-1 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col overflow-hidden">
              <div className="h-[40%] min-h-[30px]" style={{ background: item.color, opacity: 0.15 }} />
              <div className="p-2 flex-1 flex flex-col justify-end">
                <div className="text-[9px] font-semibold text-gray-800">{item.title}</div>
                <div className="text-[7px] text-gray-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // v === 3: Stacked list cards with thumbnails
  const items = [
    { title: "HubSpot Sync", desc: "Last sync: 5 min ago", metric: "312 records" },
    { title: "Records Pushed", desc: "Today: 48 leads", metric: "98% success" },
    { title: "Failed Syncs", desc: "2 records need review", metric: "Action needed" },
  ];
  return (
    <div className="p-3 h-full flex flex-col gap-2">
      {items.map((c) => (
        <div key={c.title} className="flex items-center gap-2 rounded-lg bg-white border border-gray-100 p-2 shadow-sm">
          <div className="h-8 w-8 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white" style={{ background: primary }}>
            {c.title.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-semibold text-gray-800 truncate">{c.title}</div>
            <div className="text-[7px] text-gray-500">{c.desc}</div>
          </div>
          <Badge text={c.metric} bg={`${primaryLight}33`} fg={primary} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SETTINGS renderers (3 variants)                                    */
/* ------------------------------------------------------------------ */
function SettingsContent({ screen, screenSet }: { screen: AppScreen; screenSet: CaseStudyScreenSet }) {
  const { primary } = screenSet.colorTheme;
  const v = screen.variant || 1;

  if (v === 1) {
    // Toggle switches list
    const sections = [
      {
        header: "General",
        items: [
          { label: "Email Notifications", sub: "Receive alerts", on: true },
          { label: "Auto-sync", sub: "Every 15 minutes", on: true },
          { label: "Dark Mode", sub: "Interface theme", on: false },
          { label: "Two-factor Auth", sub: "Enhanced security", on: true },
        ],
      },
      {
        header: "Integrations",
        items: [
          { label: "CRM Connection", sub: "HubSpot linked", on: true },
          { label: "Slack Alerts", sub: "Channel: #updates", on: false },
        ],
      },
    ];
    return (
      <div className="p-3 h-full flex flex-col gap-2 overflow-y-auto">
        {sections.map((sec) => (
          <div key={sec.header}>
            <div className="text-[8px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{sec.header}</div>
            <div className="rounded-lg bg-white border border-gray-100 overflow-hidden">
              {sec.items.map((item, i) => (
                <div key={item.label} className="flex items-center justify-between px-2 py-1.5" style={{ borderTop: i > 0 ? "1px solid #f3f4f6" : undefined }}>
                  <div>
                    <div className="text-[9px] font-medium text-gray-800">{item.label}</div>
                    <div className="text-[7px] text-gray-400">{item.sub}</div>
                  </div>
                  <Toggle on={item.on} color={primary} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (v === 2) {
    // Tab sections with form fields
    const tabs = ["Profile", "Billing", "API"];
    return (
      <div className="p-3 h-full flex flex-col gap-2">
        <div className="flex gap-1">
          {tabs.map((tab, i) => (
            <div key={tab} className="rounded-md px-2 py-0.5 text-[8px] font-medium" style={{ background: i === 0 ? primary : "#f3f4f6", color: i === 0 ? "white" : "#6b7280" }}>
              {tab}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 rounded-lg bg-white border border-gray-100 p-2.5">
          {[
            { label: "Display Name", val: "Admin User" },
            { label: "Email", val: "admin@company.com" },
            { label: "Timezone", val: "UTC-5 (Eastern)" },
            { label: "Language", val: "English (US)" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between">
              <span className="text-[8px] text-gray-500">{f.label}</span>
              <span className="text-[8px] font-medium text-gray-700">{f.val}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg py-1 text-center text-[8px] text-white font-medium" style={{ background: primary }}>Update Profile</div>
      </div>
    );
  }

  // v === 3: Accordion-style expandable sections
  const sections = [
    { title: "Data Sources", count: 4, expanded: true, items: ["Google Maps", "Instagram", "LinkedIn", "Yelp"] },
    { title: "Enrichment Rules", count: 3, expanded: false, items: [] },
    { title: "Export Settings", count: 2, expanded: false, items: [] },
  ];
  return (
    <div className="p-3 h-full flex flex-col gap-1.5">
      {sections.map((sec) => (
        <div key={sec.title} className="rounded-lg bg-white border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-2.5 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px]" style={{ color: primary }}>{sec.expanded ? "&#9660;" : "&#9654;"}</span>
              <span className="text-[9px] font-semibold text-gray-800">{sec.title}</span>
            </div>
            <span className="text-[7px] text-gray-400">{sec.count} items</span>
          </div>
          {sec.expanded && sec.items.map((item, i) => (
            <div key={item} className="flex items-center justify-between px-2.5 py-1 border-t border-gray-50">
              <span className="text-[8px] text-gray-600">{item}</span>
              <Toggle on={i < 3} color={primary} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen content router                                              */
/* ------------------------------------------------------------------ */
function renderScreenContent(screen: AppScreen, screenSet: CaseStudyScreenSet) {
  switch (screen.type) {
    case "dashboard":
      return <DashboardContent screen={screen} screenSet={screenSet} />;
    case "table":
      return <TableContent screen={screen} screenSet={screenSet} />;
    case "chat":
      return <ChatContent screen={screen} screenSet={screenSet} />;
    case "form":
      return <FormContent screen={screen} screenSet={screenSet} />;
    case "pipeline":
      return <PipelineContent screen={screen} screenSet={screenSet} />;
    case "cards":
      return <CardsContent screen={screen} screenSet={screenSet} />;
    case "analytics":
      return <AnalyticsContent screen={screen} screenSet={screenSet} />;
    case "settings":
      return <SettingsContent screen={screen} screenSet={screenSet} />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Layout router — wraps content in the right layout shell            */
/* ------------------------------------------------------------------ */
function LayoutWrapper({
  screen,
  screenSet,
  children,
}: {
  screen: AppScreen;
  screenSet: CaseStudyScreenSet;
  children: React.ReactNode;
}) {
  switch (screen.layout) {
    case "sidebar-left":
      return <SidebarLeftLayout screen={screen} screenSet={screenSet}>{children}</SidebarLeftLayout>;
    case "sidebar-dark":
      return <SidebarDarkLayout screen={screen} screenSet={screenSet}>{children}</SidebarDarkLayout>;
    case "topnav":
      return <TopnavLayout screen={screen} screenSet={screenSet}>{children}</TopnavLayout>;
    case "topnav-tabs":
      return <TopnavTabsLayout screen={screen} screenSet={screenSet}>{children}</TopnavTabsLayout>;
    case "minimal":
      return <MinimalLayout screen={screen} screenSet={screenSet}>{children}</MinimalLayout>;
    case "split":
      return <SplitLayout screen={screen} screenSet={screenSet}>{children}</SplitLayout>;
    case "fullwidth":
      return <FullwidthLayout screen={screen} screenSet={screenSet}>{children}</FullwidthLayout>;
    default:
      return <SidebarLeftLayout screen={screen} screenSet={screenSet}>{children}</SidebarLeftLayout>;
  }
}

/* ------------------------------------------------------------------ */
/*  Rendered screen — assembles frame + layout + content               */
/* ------------------------------------------------------------------ */
function RenderedScreen({
  screen,
  screenSet,
}: {
  screen: AppScreen;
  screenSet: CaseStudyScreenSet;
}) {
  const content = renderScreenContent(screen, screenSet);

  if (screen.frame === "desktop") {
    return (
      <DesktopFrame>
        <LayoutWrapper screen={screen} screenSet={screenSet}>
          {content}
        </LayoutWrapper>
      </DesktopFrame>
    );
  }

  // Mobile frame
  return (
    <MobileFrame>
      <div className="flex flex-col h-full" style={{ background: screenSet.colorTheme.bg }}>
        <MobileHeader screenSet={screenSet} screen={screen} />
        <div className="px-1 py-1 text-[10px] font-semibold text-gray-800 border-b border-gray-100 bg-white">
          <span className="px-2">{screen.title}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {content}
        </div>
      </div>
    </MobileFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Main carousel component                                            */
/* ------------------------------------------------------------------ */
export function AppScreensCarousel({ slug }: { slug: string }) {
  const screenSet = caseStudyScreens.find((s) => s.slug === slug);
  if (!screenSet) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const screens = screenSet.screens;
  const total = screens.length;

  const goTo = useCallback(
    (index: number) => setCurrentIndex(index),
    []
  );

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const currentScreen = screens[currentIndex];

  return (
    <section id="app-screens" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-3"
            style={{
              background: screenSet.colorTheme.primaryLight + "33",
              color: screenSet.colorTheme.primary,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            See It In Action
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Built &amp; Shipped
          </h2>
        </div>

        {/* Carousel */}
        <div className="flex justify-center">
          <div className="w-full max-w-[640px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <RenderedScreen screen={currentScreen} screenSet={screenSet} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Screen title */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">{currentScreen.title}</span>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {screens.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to screen: ${s.title}`}
              className="h-2.5 w-2.5 rounded-full transition-all duration-200"
              style={{
                background: i === currentIndex ? screenSet.colorTheme.primary : "#d1d5db",
                transform: i === currentIndex ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
