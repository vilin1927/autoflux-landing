import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Clock } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Convento Arcádia × Porto Oriente — Proposal",
  description: "Deli ↔ Cloudbeds integration — proposal in preparation.",
  robots: { index: false, follow: false },
};

export default function ConventoArcadiaProposalPage() {
  return (
    <main
      className={`${playfair.variable} min-h-screen bg-[#FAF7F1] text-[#1A1A1A]`}
    >
      {/* Header */}
      <header className="border-b border-black/5 bg-[#FAF7F1]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/proposals/convento-arcadia/logo.webp"
              alt="Convento Arcádia"
              width={180}
              height={52}
              priority
              className="h-10 w-auto"
            />
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
            autoflux · proposal
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4E157] text-[#1A1A1A] text-[11px] font-semibold uppercase tracking-[0.15em] mb-8">
              <Clock className="w-3.5 h-3.5" />
              Proposal in preparation
            </div>

            <h1
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-8"
            >
              Deli Cloudbeds
              <br />
              room-charge integration
            </h1>

            <p className="text-base text-[#1A1A1A]/70 max-w-xl leading-relaxed mb-10">
              Sven Olaf Lorz · Convento Arcádia &amp; Porto Oriente.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/proposals/convento-arcadia/demo"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A1A] text-[#FAF7F1] text-sm font-semibold tracking-wide hover:bg-[#E8553A] transition-colors"
              >
                Open interactive demo
              </Link>
              <a
                href="mailto:vilin.1927@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#1A1A1A]/15 text-sm font-semibold tracking-wide hover:bg-white transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-black/5">
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-2">
                    Scope
                  </div>
                  <div className="font-semibold">10 user stories</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-2">
                    Stack
                  </div>
                  <div className="font-semibold">n8n middleware</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-2">
                    Compliance
                  </div>
                  <div className="font-semibold">LGPD-ready</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/proposals/convento-arcadia/hero-restaurant.jpg"
                alt="Porto Oriente restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-80 mb-1">
                  Porto Oriente
                </div>
                <div
                  style={{ fontFamily: "var(--font-playfair)" }}
                  className="text-2xl font-black"
                >
                  Culinária Ancestral
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#A8D5DB] text-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-6 text-sm">
          <div>
            <div
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-base font-black tracking-wide"
            >
              CONVENTO ARCÁDIA · PORTO ORIENTE
            </div>
            <div className="text-xs opacity-70 mt-1">
              Atins · Barreirinhas · Maranhão · Brazil
            </div>
          </div>
          <div className="text-xs opacity-70">
            Prepared by AutoFlux · autoflux.digital
          </div>
        </div>
      </footer>
    </main>
  );
}
