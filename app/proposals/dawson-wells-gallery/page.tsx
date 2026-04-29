import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Clock, ArrowRight } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Dawson Wells Gallery — Proposal",
  description: "Design concept and CMS preview for Dawson Wells Gallery.",
  robots: { index: false, follow: false },
};

export default function DawsonWellsProposalPage() {
  return (
    <main
      className={`${playfair.variable} min-h-screen bg-white text-[#0A0A0A]`}
    >
      <header className="border-b border-black/5 bg-white/85 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-lg tracking-[0.05em] font-medium"
          >
            Dawson Wells Gallery
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-black/50">
            AutoFlux · proposal
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-medium uppercase tracking-[0.2em] mb-12">
          <Clock className="w-3 h-3" />
          Proposal in preparation
        </div>

        <h1
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.98] mb-10 max-w-3xl"
        >
          A website that holds the work properly.
        </h1>

        <p className="text-lg text-black/70 max-w-2xl leading-relaxed mb-3">
          The full commercial proposal is being written. While that lands, here is the design concept and a working preview of the content management system.
        </p>
        <p className="text-lg text-black/70 max-w-2xl leading-relaxed mb-14">
          Built around the brief and the reference site, with seventeen sample pieces across all five categories so the layout can be judged in context.
        </p>

        <Link
          href="/proposals/dawson-wells-gallery/demo"
          className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#0A0A0A] text-white text-sm tracking-wide hover:bg-[#1A1A1A] transition-colors"
        >
          Open the design concept
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div className="mt-24 pt-10 border-t border-black/10 grid sm:grid-cols-3 gap-10 max-w-3xl">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
              In the demo
            </div>
            <div className="text-sm leading-relaxed">
              Homepage, artworks grid with filters, single-piece page, news, contact.
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
              CMS preview
            </div>
            <div className="text-sm leading-relaxed">
              How an artwork is added, cropped, and published. Three clickable steps.
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
              Structure
            </div>
            <div className="text-sm leading-relaxed">
              Sitemap of every page in your brief and where it lives in the CMS.
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-6 text-xs text-black/50">
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-sm tracking-[0.05em] text-black/70"
          >
            Dawson Wells Gallery
          </div>
          <div>Prepared by AutoFlux · autoflux.digital</div>
        </div>
      </footer>
    </main>
  );
}
