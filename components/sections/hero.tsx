"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { FluxIllustration } from "@/components/animated/flux-illustration";

export function Hero() {
  return (
    <section className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center p-6 md:p-14 bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] relative overflow-hidden mb-8">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--accent)] rounded-full opacity-15 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[var(--accent)] rounded-full opacity-[0.08] pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 order-2 md:order-1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="eyebrow mb-5 inline-block">
          We Help Businesses Automate
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[var(--text-dark)] mb-5">
          We help remarkable companies{" "}
          <span className="text-[var(--primary)]">grow</span>
        </h1>

        <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-xl">
          We&apos;re not your typical automation agency. We&apos;ll put you in
          touch with a professional. Not an account manager.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button asChild variant="default" className="animate-pulse-glow">
            <TrackedLink
              href="#contact"
              trackingName="Contact Us"
              trackingLocation="hero"
            >
              Contact Us
            </TrackedLink>
          </Button>
          <Button asChild variant="ghost">
            <TrackedLink
              href="#how-it-works"
              trackingName="See how we work"
              trackingLocation="hero"
            >
              See how we work →
            </TrackedLink>
          </Button>
        </div>
      </motion.div>

      {/* Animated Flux Illustration */}
      <motion.div
        className="relative z-10 order-1 md:order-2 hidden sm:flex items-center justify-center"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <FluxIllustration className="w-full max-w-[420px]" />
      </motion.div>
    </section>
  );
}
