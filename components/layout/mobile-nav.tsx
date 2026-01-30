"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CalButton } from "@/components/ui/cal-button";
import { cn } from "@/lib/utils";
import { analytics } from "@/providers/posthog-provider";

interface MobileNavProps {
  variant?: "default" | "case-study";
}

export function MobileNav({ variant = "default" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleNav = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    analytics.mobileNavToggle(newState);
  };

  const handleLinkClickTracked = (item: string) => {
    analytics.navClick(item, "mobile-nav");
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleNav}
        className={cn(
          "md:hidden flex flex-col gap-[5px]",
          "bg-transparent border border-[var(--border-light)] rounded-[var(--radius-sm)]",
          "p-2 px-2.5"
        )}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span
          className={cn(
            "block w-5 h-0.5 bg-[var(--text-dark)] rounded transition-all duration-300",
            isOpen && "rotate-45 translate-y-[7px]"
          )}
        />
        <span
          className={cn(
            "block w-5 h-0.5 bg-[var(--text-dark)] rounded transition-all duration-300",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "block w-5 h-0.5 bg-[var(--text-dark)] rounded transition-all duration-300",
            isOpen && "-rotate-45 -translate-y-[7px]"
          )}
        />
      </button>

      {/* Mobile Menu */}
      <nav
        ref={navRef}
        className={cn(
          "md:hidden absolute top-[calc(100%+8px)] left-0 right-0",
          "flex flex-col",
          "bg-[var(--bg-white)] p-4",
          "rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]",
          "border border-[var(--border-light)]",
          "z-50 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        {variant === "case-study" ? (
          <>
            <Link
              href="/"
              onClick={() => handleLinkClickTracked("Back to Home")}
              className="w-full py-3 border-b border-[var(--border-light)] text-[var(--text-body)] hover:text-[var(--primary)] transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/#case-studies"
              onClick={() => handleLinkClickTracked("All Case Studies")}
              className="w-full py-3 border-b border-[var(--border-light)] text-[var(--text-body)] hover:text-[var(--primary)] transition-colors"
            >
              All Case Studies
            </Link>
          </>
        ) : (
          <>
            <Link
              href="#how-it-works"
              onClick={() => handleLinkClickTracked("How It Works")}
              className="w-full py-3 border-b border-[var(--border-light)] text-[var(--text-body)] hover:text-[var(--primary)] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#case-studies"
              onClick={() => handleLinkClickTracked("Case Studies")}
              className="w-full py-3 border-b border-[var(--border-light)] text-[var(--text-body)] hover:text-[var(--primary)] transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="#who-we-serve"
              onClick={() => handleLinkClickTracked("Who We Serve")}
              className="w-full py-3 border-b border-[var(--border-light)] text-[var(--text-body)] hover:text-[var(--primary)] transition-colors"
            >
              Who We Serve
            </Link>
            <Link
              href="#contact"
              onClick={() => handleLinkClickTracked("Contact")}
              className="w-full py-3 border-b border-[var(--border-light)] text-[var(--text-body)] hover:text-[var(--primary)] transition-colors"
            >
              Contact
            </Link>
          </>
        )}

        <CalButton
          className="mt-3 w-full"
          trackingLocation="mobile-nav"
        >
          Book a Call
        </CalButton>
      </nav>
    </>
  );
}
