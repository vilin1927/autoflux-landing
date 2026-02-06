"use client";

import { motion } from "framer-motion";

interface NavigationDotsProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function NavigationDots({
  sections,
  activeSection,
  onNavigate,
}: NavigationDotsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3"
    >
      {sections.map((section) => (
        <button
          type="button"
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className="group relative flex items-center"
          aria-label={`Navigate to ${section.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-8 px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {section.label}
          </span>

          {/* Dot */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-emerald-400 scale-125"
                : "bg-white/20 hover:bg-emerald-400/50"
            }`}
          />

          {/* Active indicator ring */}
          {activeSection === section.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute inset-0 w-3 h-3 rounded-full ring-2 ring-emerald-400/50 ring-offset-2 ring-offset-[#0a0a0a]"
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </motion.nav>
  );
}
