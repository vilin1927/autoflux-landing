"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Palette,
} from "lucide-react";

// ─── Color Schemes ───────────────────────────────────────────
const colorSchemes = [
  {
    id: "indigo",
    name: "Indigo",
    primary: "#6366f1",
    header: "bg-indigo-500",
    headerText: "text-white",
    accent: "bg-indigo-500/10",
    accentText: "text-indigo-400",
    today: "bg-indigo-500",
    todayText: "text-white",
    weekNum: "text-indigo-400/60",
    dot: "bg-indigo-500",
    border: "border-indigo-500/20",
    ring: "ring-indigo-500/30",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "#10b981",
    header: "bg-emerald-500",
    headerText: "text-white",
    accent: "bg-emerald-500/10",
    accentText: "text-emerald-400",
    today: "bg-emerald-500",
    todayText: "text-white",
    weekNum: "text-emerald-400/60",
    dot: "bg-emerald-500",
    border: "border-emerald-500/20",
    ring: "ring-emerald-500/30",
  },
  {
    id: "rose",
    name: "Rose",
    primary: "#f43f5e",
    header: "bg-rose-500",
    headerText: "text-white",
    accent: "bg-rose-500/10",
    accentText: "text-rose-400",
    today: "bg-rose-500",
    todayText: "text-white",
    weekNum: "text-rose-400/60",
    dot: "bg-rose-500",
    border: "border-rose-500/20",
    ring: "ring-rose-500/30",
  },
  {
    id: "amber",
    name: "Amber",
    primary: "#f59e0b",
    header: "bg-amber-500",
    headerText: "text-white",
    accent: "bg-amber-500/10",
    accentText: "text-amber-400",
    today: "bg-amber-500",
    todayText: "text-white",
    weekNum: "text-amber-400/60",
    dot: "bg-amber-500",
    border: "border-amber-500/20",
    ring: "ring-amber-500/30",
  },
];

// ─── Date Helpers ────────────────────────────────────────────
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function getISOWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function isToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// ─── Mini Month Component ────────────────────────────────────
function MiniMonth({
  year,
  month,
  scheme,
  showWeekNumbers,
}: {
  year: number;
  month: number;
  scheme: (typeof colorSchemes)[0];
  showWeekNumbers: boolean;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Build weeks array
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // Fill leading empty cells
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing empty cells
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return (
    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Month Header */}
      <div className={`${scheme.header} px-3 py-2`}>
        <h3 className={`text-xs font-bold ${scheme.headerText} tracking-wide`}>
          {MONTH_NAMES[month]}
        </h3>
      </div>

      <div className="p-2">
        {/* Day headers */}
        <div
          className="grid gap-0 mb-1"
          style={{
            gridTemplateColumns: showWeekNumbers
              ? "20px repeat(7, 1fr)"
              : "repeat(7, 1fr)",
          }}
        >
          {showWeekNumbers && <div />}
          {DAY_HEADERS.map((d) => (
            <div
              key={d}
              className={`text-center text-[9px] font-medium ${
                d === "Sa" || d === "Su"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => {
          const firstDayOfWeek = week.find((d) => d !== null);
          const weekDate = firstDayOfWeek
            ? new Date(year, month, firstDayOfWeek)
            : null;
          const weekNum = weekDate ? getISOWeekNumber(weekDate) : null;

          return (
            <div
              key={wi}
              className="grid gap-0"
              style={{
                gridTemplateColumns: showWeekNumbers
                  ? "20px repeat(7, 1fr)"
                  : "repeat(7, 1fr)",
              }}
            >
              {showWeekNumbers && (
                <div
                  className={`text-[8px] ${scheme.weekNum} flex items-center justify-center font-mono`}
                >
                  {weekNum}
                </div>
              )}
              {week.map((day, di) => {
                const isTodayCell = day !== null && isToday(year, month, day);
                const isWeekend = di >= 5;

                return (
                  <div
                    key={di}
                    className={`text-center py-[2px] text-[10px] rounded-sm transition-colors ${
                      day === null
                        ? ""
                        : isTodayCell
                        ? `${scheme.today} ${scheme.todayText} font-bold`
                        : isWeekend
                        ? "text-slate-500"
                        : "text-slate-300"
                    }`}
                  >
                    {day}
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

// ─── Calendar Demo ───────────────────────────────────────────
export default function CalendarDemo() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [schemeIndex, setSchemeIndex] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [showWeekNumbers, setShowWeekNumbers] = useState(true);

  const scheme = colorSchemes[schemeIndex];

  return (
    <div>
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Year Selector */}
        <div className="flex items-center bg-slate-800/60 rounded-lg border border-slate-700/50 overflow-hidden">
          <button
            onClick={() => setYear((y) => y - 1)}
            className="p-2 hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <motion.span
            key={year}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 text-sm font-bold text-white tabular-nums"
          >
            {year}
          </motion.span>
          <button
            onClick={() => setYear((y) => y + 1)}
            className="p-2 hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Color Scheme */}
        <div className="flex items-center gap-1.5 bg-slate-800/60 rounded-lg border border-slate-700/50 px-2 py-1.5">
          <Palette className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {colorSchemes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSchemeIndex(i)}
              className={`w-5 h-5 rounded-full transition-all ${
                i === schemeIndex
                  ? "ring-2 ring-offset-1 ring-offset-slate-900 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{
                backgroundColor: s.primary,
                ...(i === schemeIndex
                  ? { boxShadow: `0 0 8px ${s.primary}40` }
                  : {}),
              }}
              title={s.name}
            />
          ))}
        </div>

        {/* Orientation */}
        <div className="flex items-center bg-slate-800/60 rounded-lg border border-slate-700/50 p-0.5">
          <button
            onClick={() => setOrientation("portrait")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              orientation === "portrait"
                ? `${scheme.accent} ${scheme.accentText}`
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Portrait
          </button>
          <button
            onClick={() => setOrientation("landscape")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              orientation === "landscape"
                ? `${scheme.accent} ${scheme.accentText}`
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Landscape
          </button>
        </div>

        {/* Week Numbers Toggle */}
        <button
          onClick={() => setShowWeekNumbers((v) => !v)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            showWeekNumbers
              ? `${scheme.accent} ${scheme.accentText} ${scheme.border}`
              : "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-white"
          }`}
        >
          Wk #
        </button>
      </div>

      {/* Calendar Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${scheme.id}-${orientation}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-4 md:p-6"
        >
          {/* Calendar Title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.h2
                key={year}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white"
              >
                {year}
              </motion.h2>
              <p className="text-xs text-slate-500">
                Yearly Calendar &middot;{" "}
                {orientation === "portrait" ? "3 x 4" : "4 x 3"} &middot; A4{" "}
                {orientation}
              </p>
            </div>
            <div
              className="text-[10px] font-medium px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${scheme.primary}15`,
                color: scheme.primary,
              }}
            >
              Live Preview
            </div>
          </div>

          {/* Month Grid */}
          <div
            className={`grid gap-3 ${
              orientation === "portrait"
                ? "grid-cols-3"
                : "grid-cols-4"
            }`}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MiniMonth
                key={i}
                year={year}
                month={i}
                scheme={scheme}
                showWeekNumbers={showWeekNumbers}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/50">
            <p className="text-[10px] text-slate-600">
              MVP includes PDF export (pdf-lib, 300 DPI print-ready)
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: scheme.primary }}
              />
              <p className="text-[10px] text-slate-500">
                Updates live as you change settings
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
