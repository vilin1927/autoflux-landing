"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalButton } from "@/components/ui/cal-button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "default" | "case-study";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex items-center justify-between",
        "px-4 md:px-6 py-3 md:py-4",
        "bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-lg)]",
        "sticky top-4 z-50 mb-8",
        "transition-all duration-300",
        isScrolled
          ? "shadow-[var(--shadow-md)] bg-white/98"
          : "shadow-[var(--shadow-sm)]"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/autoflux-logo.png"
          alt="AutoFlux"
          width={120}
          height={32}
          className="max-h-8"
          priority
        />
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {variant === "case-study" ? (
          <>
            <TrackedLink
              href="/"
              trackingName="Back to Home"
              trackingLocation="header"
              className="text-[var(--text-body)] hover:text-[var(--primary)] transition-colors text-[0.95rem] font-medium"
            >
              ← Back to Home
            </TrackedLink>
            <TrackedLink
              href="/#case-studies"
              trackingName="All Case Studies"
              trackingLocation="header"
              className="text-[var(--text-body)] hover:text-[var(--primary)] transition-colors text-[0.95rem] font-medium"
            >
              All Case Studies
            </TrackedLink>
          </>
        ) : (
          <>
            <TrackedLink
              href="#how-it-works"
              trackingName="How It Works"
              trackingLocation="header"
              className="text-[var(--text-body)] hover:text-[var(--primary)] transition-colors text-[0.95rem] font-medium"
            >
              How It Works
            </TrackedLink>
            <TrackedLink
              href="#case-studies"
              trackingName="Case Studies"
              trackingLocation="header"
              className="text-[var(--text-body)] hover:text-[var(--primary)] transition-colors text-[0.95rem] font-medium"
            >
              Case Studies
            </TrackedLink>
            <TrackedLink
              href="#who-we-serve"
              trackingName="Who We Serve"
              trackingLocation="header"
              className="text-[var(--text-body)] hover:text-[var(--primary)] transition-colors text-[0.95rem] font-medium"
            >
              Who We Serve
            </TrackedLink>
            <TrackedLink
              href="#contact"
              trackingName="Contact"
              trackingLocation="header"
              className="text-[var(--text-body)] hover:text-[var(--primary)] transition-colors text-[0.95rem] font-medium"
            >
              Contact
            </TrackedLink>
          </>
        )}
      </nav>

      <MobileNav variant={variant} />

      <CalButton
        className="hidden md:inline-flex"
        trackingLocation="header"
      >
        Book a Call
      </CalButton>
    </header>
  );
}
