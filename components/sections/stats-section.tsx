"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, TrendingUp, Clock } from "lucide-react";
import { CountingNumber } from "@/components/animated/counting-number";

const stats = [
  {
    icon: DollarSign,
    number: 320,
    suffix: "",
    prefix: "",
    label: "Hours saved monthly (avg)",
    isNumber: true,
  },
  {
    icon: TrendingUp,
    number: 95,
    suffix: "%",
    prefix: "",
    label: "Client satisfaction rate",
    isNumber: true,
  },
  {
    icon: Clock,
    number: 0,
    suffix: "",
    prefix: "",
    text: "Days",
    label: "From audit to live automation",
    isNumber: false,
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="grid md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.article
          key={stat.label}
          className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-lg)] p-8 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)]" />

          {/* Icon */}
          <div className="w-12 h-12 mx-auto mb-4 bg-[var(--accent-soft)] rounded-[var(--radius-md)] flex items-center justify-center">
            <stat.icon className="w-6 h-6 text-[var(--primary)]" />
          </div>

          {/* Number */}
          <p className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-2">
            {stat.isNumber ? (
              <CountingNumber
                value={stat.number}
                suffix={stat.suffix}
                prefix={stat.prefix}
                isInView={isInView}
              />
            ) : (
              stat.text
            )}
          </p>

          {/* Label */}
          <p className="text-[var(--text-muted)]">{stat.label}</p>
        </motion.article>
      ))}
    </section>
  );
}
