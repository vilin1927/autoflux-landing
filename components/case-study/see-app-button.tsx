"use client";

import { motion } from "framer-motion";
import { Monitor, ChevronDown } from "lucide-react";

export function SeeAppButton() {
  const handleClick = () => {
    const el = document.getElementById("app-screens");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="mt-8 relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-gray-900 font-bold text-base cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-2xl"
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.3)",
          "0 0 0 12px rgba(255,255,255,0), 0 8px 32px rgba(0,0,0,0.3)",
          "0 0 0 0 rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.3)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow ring behind button */}
      <motion.span
        className="absolute inset-0 rounded-full bg-white/20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Monitor className="w-5 h-5 relative z-10" />
      <span className="relative z-10">See the App</span>
      <motion.span
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.span>
    </motion.button>
  );
}
