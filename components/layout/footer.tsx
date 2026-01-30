"use client";

import Link from "next/link";
import { analytics } from "@/providers/posthog-provider";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleEmailClick = () => {
    analytics.footerClick("email");
    analytics.externalLinkClick("mailto:hello@autoflux.ai", "Email");
  };

  const handleNavClick = (item: string) => {
    analytics.footerClick(item);
  };

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-[var(--border-light)] mt-4 text-[var(--text-muted)] text-[0.9rem]">
      <p>&copy; {currentYear} AutoFlux. Built for profit-first automation.</p>
      <div className="flex gap-6">
        <a
          href="mailto:hello@autoflux.ai"
          onClick={handleEmailClick}
          className="hover:text-[var(--primary)] transition-colors"
        >
          Email
        </a>
        <Link
          href="#case-studies"
          onClick={() => handleNavClick("case-studies")}
          className="hover:text-[var(--primary)] transition-colors"
        >
          Case Studies
        </Link>
        <Link
          href="#how-it-works"
          onClick={() => handleNavClick("how-it-works")}
          className="hover:text-[var(--primary)] transition-colors"
        >
          How We Work
        </Link>
      </div>
    </footer>
  );
}
