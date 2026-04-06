"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Database,
  Layout,
  FileText,
  Settings,
  Layers,
  Shield,
  Globe,
  Calendar,
  Palette,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// ─── Data Flow Diagram ───────────────────────────────────────
function DataFlowDiagram() {
  const nodes = [
    {
      icon: Settings,
      label: "Configuration",
      desc: "Year, layout, paper, colors, events",
      color: "from-indigo-500 to-indigo-600",
      glow: "indigo",
    },
    {
      icon: Layers,
      label: "Rendering Engine",
      desc: "Single source of truth",
      color: "from-violet-500 to-purple-600",
      glow: "violet",
      highlight: true,
    },
    {
      icon: Layout,
      label: "Live Preview",
      desc: "Instant visual feedback",
      color: "from-cyan-500 to-blue-600",
      glow: "cyan",
    },
    {
      icon: FileText,
      label: "PDF Output",
      desc: "300 DPI, print-ready",
      color: "from-emerald-500 to-teal-600",
      glow: "emerald",
    },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-1">
        How Data Flows
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        One config drives both preview and PDF. Change a setting, both update. No mismatch possible.
      </p>

      {/* Flow */}
      <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex-1 bg-slate-800/60 rounded-xl border ${
                node.highlight
                  ? "border-violet-500/40 ring-1 ring-violet-500/20"
                  : "border-slate-700/50"
              } p-4 relative`}
            >
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center mb-2`}
              >
                <node.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <p className="text-xs font-bold text-white">{node.label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{node.desc}</p>
              {node.highlight && (
                <div className="absolute -top-2 right-3 text-[9px] font-bold bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                  Core
                </div>
              )}
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="hidden md:flex items-center px-1 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Branch note */}
      <div className="mt-3 flex items-start gap-2 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
        <Shield className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-400">
          The rendering engine sits in the middle. Both preview and PDF read from the same config. You change a setting, both outputs update. This means what you see on screen is what you get in the PDF.
        </p>
      </div>

      {/* Add-in reuse note */}
      <div className="mt-2 flex items-start gap-2 bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10">
        <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-400">
          <span className="text-emerald-400 font-medium">Outlook Add-in ready:</span> pdf-lib runs client-side, so the same rendering engine we build now can be reused directly in the future Office Add-in project without rewriting the PDF pipeline.
        </p>
      </div>
    </div>
  );
}

// ─── Module Architecture ─────────────────────────────────────
function ModuleArchitecture() {
  const modules = [
    {
      name: "Calendar Engine",
      icon: Calendar,
      items: [
        "Date calculation & grid logic",
        "Week numbering (ISO)",
        "Holiday & event integration",
      ],
      color: "indigo",
    },
    {
      name: "Layout System",
      icon: Layout,
      items: [
        "Paper size configs (A4/A3/Letter/Legal/Tabloid)",
        "Orientation handling",
        "Responsive grid (1-12 months/page)",
      ],
      color: "cyan",
    },
    {
      name: "Theme Engine",
      icon: Palette,
      items: [
        "Color scheme presets + custom",
        "Typography settings",
        "Font customization per event",
      ],
      color: "amber",
    },
    {
      name: "PDF Pipeline",
      icon: FileText,
      items: [
        "pdf-lib vector rendering",
        "300 DPI output",
        "Puppeteer fallback for complex layouts",
      ],
      color: "emerald",
    },
    {
      name: "i18n Module",
      icon: Globe,
      items: [
        "Month/day localization",
        "Browser language detection",
        "DB-driven translations",
      ],
      color: "violet",
      future: true,
    },
    {
      name: "Auth Module",
      icon: Shield,
      items: [
        "Supabase Auth (OAuth + magic link)",
        "User profile storage",
        "Row-level security",
      ],
      color: "rose",
      future: true,
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> =
    {
      indigo: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-400",
        border: "border-indigo-500/20",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        border: "border-cyan-500/20",
      },
      amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
      },
      violet: {
        bg: "bg-violet-500/10",
        text: "text-violet-400",
        border: "border-violet-500/20",
      },
      rose: {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
      },
    };

  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-1">
        How It&apos;s Organized
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Each piece is independent. Add a new feature without breaking something else.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {modules.map((mod, i) => {
          const c = colorMap[mod.color];
          return (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-slate-800/40 rounded-xl border ${c.border} p-3 relative`}
            >
              {mod.future && (
                <div className="absolute -top-2 right-2 text-[8px] font-bold bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Phase 2
                </div>
              )}
              <div
                className={`w-7 h-7 ${c.bg} rounded-lg flex items-center justify-center mb-2`}
              >
                <mod.icon className={`w-3.5 h-3.5 ${c.text}`} />
              </div>
              <p className="text-xs font-bold text-white mb-1.5">{mod.name}</p>
              <ul className="space-y-1">
                {mod.items.map((item) => (
                  <li
                    key={item}
                    className="text-[10px] text-slate-500 flex items-start gap-1"
                  >
                    <span className={`${c.text} mt-0.5`}>&#8226;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Milestone Timeline ──────────────────────────────────────
function MilestoneTimeline() {
  const milestones = [
    {
      id: "M1",
      name: "Calendar Engine + Live Preview",
      duration: "Week 1–2",
      price: "$500",
      items: [
        "Config model & date logic",
        "Yearly grid with all paper sizes",
        "Live preview with real-time updates",
        "Color scheme system",
      ],
      status: "first",
    },
    {
      id: "M2",
      name: "Notes, Events & Customization",
      duration: "Week 2–3",
      price: "$450",
      items: [
        "Add/edit events on dates",
        "Recurring & weekly events",
        "Font & color customization",
        "Week numbers & holidays",
      ],
      status: "upcoming",
    },
    {
      id: "M3",
      name: "PDF Generation",
      duration: "Week 3–4",
      price: "$500",
      items: [
        "pdf-lib vector rendering",
        "300 DPI print-ready output",
        "All paper sizes & orientations",
        "Visual consistency with preview",
      ],
      status: "upcoming",
    },
    {
      id: "M4",
      name: "Polish, SEO & Deploy",
      duration: "Week 4",
      price: "$350",
      items: [
        "Next.js SSR/SSG for SEO",
        "Responsive design (desktop + tablet)",
        "Performance optimization",
        "Production deployment",
      ],
      status: "upcoming",
    },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-1">Milestone Plan</h3>
      <p className="text-xs text-slate-500 mb-4">
        Each milestone is something you can see and test before we move on.
      </p>

      <div className="space-y-3">
        {milestones.map((ms, i) => (
          <motion.div
            key={ms.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3"
          >
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  ms.status === "first"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                {ms.id}
              </div>
              {i < milestones.length - 1 && (
                <div className="w-px flex-1 bg-slate-800 my-1" />
              )}
            </div>

            {/* Content */}
            <div
              className={`flex-1 bg-slate-800/40 rounded-xl border ${
                ms.status === "first"
                  ? "border-indigo-500/30"
                  : "border-slate-700/50"
              } p-3 mb-1`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-white">{ms.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-indigo-400">
                    {ms.price}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {ms.duration}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {ms.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-[10px] text-slate-400"
                  >
                    <CheckCircle2 className="w-3 h-3 text-slate-600 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/30">
        <p className="text-xs text-slate-400">
          MVP Total (4 milestones, ~4 weeks)
        </p>
        <p className="text-sm font-bold text-white">
          $1,800 <span className="text-[10px] font-normal text-slate-500">fixed</span>
        </p>
      </div>
    </div>
  );
}

// ─── Main Architecture Tab ───────────────────────────────────
export default function Architecture() {
  return (
    <motion.div {...fadeUp} className="space-y-8">
      <DataFlowDiagram />
      <ModuleArchitecture />
      <MilestoneTimeline />
    </motion.div>
  );
}
