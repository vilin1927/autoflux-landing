import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Smartphone, Network } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Convento Arcádia — Demo",
  description:
    "Interactive demo of the Deli ↔ Cloudbeds integration for Convento Arcádia.",
  robots: { index: false, follow: false },
};

export default function ConventoDemoLanding() {
  return (
    <main
      className={`${playfair.variable} min-h-screen bg-[#FAF7F1] text-[#1A1A1A]`}
    >
      {/* Hero image */}
      <section className="relative h-[56vh] min-h-[440px] overflow-hidden">
        <Image
          src="/proposals/convento-arcadia/hero-dining.jpg"
          alt="Convento Arcádia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 via-60% to-[#FAF7F1]" />

        <div className="absolute inset-0 flex flex-col">
          <header className="max-w-6xl w-full mx-auto flex items-center justify-between px-6 py-5">
            <Image
              src="/proposals/convento-arcadia/logo.webp"
              alt="Convento Arcádia"
              width={180}
              height={52}
              priority
              className="h-10 w-auto brightness-0 invert"
            />
            <Link
              href="/proposals/convento-arcadia"
              className="text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
            >
              proposal
            </Link>
          </header>

          <div className="flex-1 flex items-end pb-24">
            <div className="max-w-6xl w-full mx-auto px-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4E157] text-[#1A1A1A] text-[11px] font-semibold uppercase tracking-[0.15em] mb-5">
                Interactive demo
              </div>
              <h1
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white mb-4 max-w-4xl"
              >
                Room-charge integration
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Two CTA cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-20 relative z-10 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Integration card — primary */}
          <Link
            href="/proposals/convento-arcadia/demo/integration"
            className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-black/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#D4E157] blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4">
                01 · architecture
              </div>

              <Network className="w-8 h-8 mb-5 text-[#1A1A1A]" />

              <h2
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-8"
              >
                Integration architecture
              </h2>

              <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:text-[#E8553A] transition-colors">
                Open integration page
              </div>
            </div>
          </Link>

          {/* Guest flow card — optional */}
          <Link
            href="/proposals/convento-arcadia/demo/guest"
            className="group relative bg-[#1A1A1A] rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#E8553A] blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4 text-white">
                02 · guest flow
              </div>

              <Smartphone className="w-8 h-8 mb-5 text-[#D4E157]" />

              <h2
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-8 text-white"
              >
                Guest flow walkthrough
              </h2>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#D4E157] transition-colors">
                Open guest flow
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-[#1A1A1A]/50 mt-10 max-w-2xl mx-auto">
          Mock data. Names and documents fictitious.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[#A8D5DB]">
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
