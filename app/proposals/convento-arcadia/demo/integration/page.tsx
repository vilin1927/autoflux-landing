"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Search,
  Shield,
  AlertCircle,
  Database,
  Cable,
  Server,
  Webhook,
  Lock,
  Info,
  ExternalLink,
} from "lucide-react";
import {
  userStories,
  seededCharges,
  guests,
  reservations,
  guestById,
  formatBRL,
  formatDate,
  type UserStory,
  type Charge,
} from "@/data/proposals/convento-arcadia";

// ──────────────────────────────────────────────────────────────
// Brand
// ──────────────────────────────────────────────────────────────
const LIME = "#D4E157";
const CORAL = "#E8553A";
const TEAL = "#A8D5DB";
const CREAM = "#FAF7F1";
const INK = "#1A1A1A";

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────

export default function IntegrationDemoPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: CREAM, color: INK, fontFamily: "var(--font-inter)" }}
    >
      <Header />
      <Hero />
      <PipelineSection />
      <UserStoriesSection />
      <CloudbedsRealityCard />
      <N8nBoundarySection />
      <AuditSection />
      <ScopeCard />
      <Footer />
    </main>
  );
}

// ──────────────────────────────────────────────────────────────
// Header
// ──────────────────────────────────────────────────────────────

function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: `${CREAM}cc`,
        borderColor: "rgba(0,0,0,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          <Link href="/proposals/convento-arcadia/demo" className="text-[11px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
            demo
          </Link>
          <div className="h-4 w-px bg-black/10" />
          <Image
            src="/proposals/convento-arcadia/logo.webp"
            alt="Convento Arcádia"
            width={180}
            height={52}
            className="h-8 w-auto"
          />
        </div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ backgroundColor: INK, color: LIME }}
          >
            ⭐ integration
          </span>
          <Link
            href="/proposals/convento-arcadia/demo/guest"
            className="text-[11px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity hidden sm:inline"
          >
            guest flow
          </Link>
        </div>
      </div>
    </header>
  );
}

// ──────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
      <div className="max-w-4xl">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] mb-8"
          style={{ backgroundColor: LIME, color: INK }}
        >
          <Cable className="w-3.5 h-3.5" />
          Cloudbeds · n8n · Fudo (Deli)
        </div>
        <h1
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-8"
        >
          How it fits together
        </h1>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-full border border-black/10 bg-white">n8n</span>
          <span className="px-3 py-1.5 rounded-full border border-black/10 bg-white">Cloudbeds PMS API</span>
          <span className="px-3 py-1.5 rounded-full border border-black/10 bg-white">Fudo (Deli) API</span>
          <span className="px-3 py-1.5 rounded-full border border-black/10 bg-white">PostgreSQL audit</span>
          <span className="px-3 py-1.5 rounded-full border border-black/10 bg-white">LGPD storage</span>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Pipeline diagram
// ──────────────────────────────────────────────────────────────

function PipelineSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader
        eyebrow="01 · architecture"
        title="The pipeline"
      />

      <div className="mt-10 bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
          <PipelineNode
            index={1}
            icon={Database}
            title="Cloudbeds PMS"
            subtitle="Reservations, guests, folio"
            bullets={[
              "getReservations",
              "getGuests",
              "postCharge",
            ]}
            color={TEAL}
            textColor={INK}
          />
          <PipelineNode
            index={2}
            icon={Server}
            title="n8n Middleware"
            subtitle="Auth, audit, retry"
            bullets={[
              "Guest sync",
              "CPF / passport validation",
              "Guardian routing",
              "Audit write (Postgres)",
            ]}
            color={LIME}
            textColor={INK}
            highlight
          />
          <PipelineNode
            index={3}
            icon={Webhook}
            title="Fudo (Deli)"
            subtitle="POS, QR order"
            bullets={[
              "Customer list",
              "Order webhook",
              "Order detail retrieval",
            ]}
            color={CORAL}
            textColor="#fff"
          />
        </div>
      </div>
    </section>
  );
}

function PipelineNode({
  index,
  icon: Icon,
  title,
  subtitle,
  bullets,
  color,
  textColor,
  highlight,
}: {
  index: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  bullets: string[];
  color: string;
  textColor: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl p-6 flex flex-col"
      style={{
        backgroundColor: color,
        color: textColor,
        boxShadow: highlight
          ? "0 20px 40px -15px rgba(212,225,87,0.6)"
          : "0 10px 30px -15px rgba(0,0,0,0.15)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black"
          style={{
            backgroundColor: `${textColor === "#fff" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          {index}
        </div>
        <Icon className="w-5 h-5 opacity-80" />
      </div>
      <div
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-2xl font-black leading-tight mb-1"
      >
        {title}
      </div>
      <div className="text-xs opacity-75 mb-5">{subtitle}</div>
      <ul className="text-[13px] space-y-1.5 mt-auto">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="opacity-60 mt-0.5">›</span>
            <code
              className="font-mono text-[12px]"
              style={{ opacity: 0.85 }}
            >
              {b}
            </code>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// User stories — clickable grid
// ──────────────────────────────────────────────────────────────

function UserStoriesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo<UserStory | null>(
    () => userStories.find((s) => s.id === activeId) ?? null,
    [activeId],
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader
        eyebrow="02 · spec coverage"
        title="All 10 user stories"
      />

      <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
        {userStories.map((us) => (
          <button
            key={us.id}
            onClick={() => setActiveId(us.id === activeId ? null : us.id)}
            className="text-left bg-white rounded-2xl p-4 border transition-all hover:shadow-md hover:-translate-y-0.5 group"
            style={{
              borderColor:
                activeId === us.id ? CORAL : "rgba(0,0,0,0.07)",
              backgroundColor: activeId === us.id ? "#fff" : "#fff",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70"
              >
                {us.id}
              </span>
              {us.cloudbedsNote && (
                <Info className="w-3 h-3 opacity-40" />
              )}
            </div>
            <div className="text-[13px] font-semibold leading-tight mb-1">
              {us.title}
            </div>
            <div className="text-[11px] opacity-50">{us.persona}</div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 gap-4">
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
                  style={{ color: CORAL }}
                >
                  {active.id} · {active.persona}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-playfair)" }}
                  className="text-2xl md:text-3xl font-black tracking-tight leading-tight"
                >
                  {active.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveId(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm opacity-75 leading-relaxed mb-5 italic">
              &ldquo;{active.narrative}&rdquo;
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
                  From your spec
                </div>
                <ul className="space-y-2.5">
                  {active.acceptanceCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: CORAL }}
                      />
                      <span className="opacity-80">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {active.decisionsTaken && active.decisionsTaken.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
                    Design notes
                  </div>
                  <ul className="space-y-2.5">
                    {active.decisionsTaken.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span
                          className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full opacity-50"
                          style={{ backgroundColor: INK }}
                        />
                        <span className="opacity-80 leading-relaxed">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {active.openQuestions && active.openQuestions.length > 0 && (
              <div
                className="rounded-2xl p-5 mb-5 border"
                style={{
                  backgroundColor: "rgba(0,0,0,0.025)",
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60 mb-3">
                  Open questions
                </div>
                <ul className="space-y-2.5">
                  {active.openQuestions.map((q, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span
                        className="shrink-0 text-xs font-semibold mt-0.5 font-mono opacity-50"
                      >
                        {i + 1}.
                      </span>
                      <span className="opacity-80 leading-relaxed">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {active.cloudbedsNote && (
              <div
                className="mt-6 p-4 rounded-xl flex items-start gap-3 border"
                style={{
                  backgroundColor: `${CORAL}0a`,
                  borderColor: `${CORAL}33`,
                }}
              >
                <AlertCircle
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: CORAL }}
                />
                <div>
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1"
                    style={{ color: CORAL }}
                  >
                    Cloudbeds API note
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {active.cloudbedsNote}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Cloudbeds reality card — THE BITE
// ──────────────────────────────────────────────────────────────

function CloudbedsRealityCard() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden border border-black/10"
        style={{ backgroundColor: INK }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: CORAL }}
        />
        <div className="relative grid md:grid-cols-5 gap-8 p-8 md:p-12">
          <div className="md:col-span-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60 mb-4 text-white">
              03 · API note
            </div>
            <h2
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-6 text-white"
            >
              How Cloudbeds handles folios
            </h2>
            <a
              href="https://integrations.cloudbeds.com/hc/en-us/articles/360006426054-Point-of-sale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs opacity-60 hover:opacity-100 text-white transition-opacity"
            >
              Cloudbeds Integrations docs
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="md:col-span-3 space-y-4">
            <RealityQuote
              label="From Cloudbeds docs"
              quote="Multiple guests and even multiple rooms can be under 1 reservation number. This means that you will always post all transactions under the main guest name and the reservationID they have."
            />
            <RealityQuote
              label="Roadmap note"
              quote="Going forward, Cloudbeds will support multiple folios for group reservations via the API (meaning each guest will be able to have their own bill)."
            />

            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2 text-white">
                How I handle it
              </div>
              <p className="text-sm text-white/85 leading-relaxed">
                Charges post to the primary folio. I store{" "}
                <code className="font-mono text-[12px] opacity-80">ordered_by</code>{" "}
                and{" "}
                <code className="font-mono text-[12px] opacity-80">authorized_by</code>{" "}
                in my own DB so per-guest attribution is kept. When Cloudbeds ships multi-folio, a{" "}
                <code className="font-mono text-[12px] opacity-80">folio_id</code>{" "}
                column slots in. For multi-room bookings,{" "}
                <code className="font-mono text-[12px] opacity-80">subReservationID</code>{" "}
                targets a specific room.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function RealityQuote({
  label,
  quote,
}: {
  label: string;
  quote: string;
}) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 opacity-60 text-white">
        {label}
      </div>
      <p className="text-sm text-white/85 leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// n8n boundary — what pure n8n covers vs what needs real dev
// ──────────────────────────────────────────────────────────────

function N8nBoundarySection() {
  const pathACovered = ["US-01", "US-05", "US-07"];
  const pathANotCovered = [
    "US-03 rate-limited CPF gate (n8n can't persist state across restarts)",
    "US-04 authorisation screen (n8n has no UI)",
    "US-06 audit search (Postgres only, no dashboard)",
    "US-08 role-based access (single role)",
    "US-09 adult-not-owner auth (needs Fudo custom hooks)",
    "US-10 minor/guardian flow (Deli's QR can't branch)",
  ];
  const pathBCovered = [
    "All 10 user stories",
    "Rate limit in Postgres",
    "Guardian flow with approval UI",
    "Admin dashboard: search, retry queue",
    "Ready for Cloudbeds multi-folio when it ships",
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader
        eyebrow="04 · two approaches"
        title="Two ways to build it"
      />

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {/* Path A */}
        <div
          className="rounded-3xl p-6 md:p-8 border flex flex-col"
          style={{
            backgroundColor: `${LIME}1a`,
            borderColor: `${LIME}66`,
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: LIME, color: INK }}
            >
              <Cable className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                approach A
              </div>
              <div
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-2xl font-black leading-tight"
              >
                n8n-only
              </div>
            </div>
          </div>
          <div className="rounded-xl p-4 mb-4 mt-2 bg-white/70 border border-black/5">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-60 mb-2">
              What it covers
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {pathACovered.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{ backgroundColor: INK, color: LIME }}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white/40 border border-black/5">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-60 mb-2"
            >
              What it doesn&apos;t
            </div>
            <ul className="space-y-1.5">
              {pathANotCovered.map((c) => (
                <li key={c} className="flex items-start gap-2 text-xs">
                  <span
                    className="shrink-0 mt-1 w-1 h-1 rounded-full opacity-40"
                    style={{ backgroundColor: INK }}
                  />
                  <span className="opacity-75 leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Path B */}
        <div
          className="rounded-3xl p-6 md:p-8 text-white flex flex-col"
          style={{ backgroundColor: INK }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" }}
            >
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                approach B
              </div>
              <div
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-2xl font-black leading-tight"
              >
                Integrated build
              </div>
            </div>
          </div>
          <div className="rounded-xl p-4 mt-2 bg-white/[0.05] border border-white/10">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-60 mb-2"
            >
              What it covers
            </div>
            <ul className="space-y-1.5">
              {pathBCovered.map((c) => (
                <li key={c} className="flex items-start gap-2 text-xs">
                  <span
                    className="shrink-0 mt-1 w-1 h-1 rounded-full opacity-50"
                    style={{ backgroundColor: "#fff" }}
                  />
                  <span className="opacity-90 leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Audit log (US-06 + US-08)
// ──────────────────────────────────────────────────────────────

function AuditSection() {
  const [query, setQuery] = useState("");
  const [roomFilter, setRoomFilter] = useState("all");
  const [activeCharge, setActiveCharge] = useState<Charge | null>(null);

  const rooms = useMemo(
    () => Array.from(new Set(reservations.map((r) => r.roomNumber))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seededCharges
      .filter((c) => {
        if (roomFilter !== "all" && c.roomNumber !== roomFilter) return false;
        if (!q) return true;
        const orderedBy = guestById(c.orderedByGuestId)?.fullName ?? "";
        const auth = guestById(c.authorizedByGuestId)?.fullName ?? "";
        return [
          orderedBy,
          auth,
          c.roomNumber,
          c.deliOrderId,
          c.cloudbedsPostingId,
          c.orderSummary,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort(
        (a, b) =>
          new Date(b.authorizedAt).getTime() -
          new Date(a.authorizedAt).getTime(),
      );
  }, [query, roomFilter]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader
        eyebrow="05 · audit trail"
        title="Audit log"
      />

      <div className="mt-10 bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
        {/* Filters */}
        <div className="p-5 md:p-6 border-b border-black/5 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by guest, room, order ID..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-black/10 bg-[#FAF7F1] focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>

          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="px-3 py-2.5 text-sm rounded-xl border border-black/10 bg-[#FAF7F1] focus:outline-none focus:border-black/30 min-w-[140px]"
          >
            <option value="all">All rooms</option>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <div className="ml-auto flex items-center gap-2 text-xs opacity-60">
            <Lock className="w-3.5 h-3.5" />
            LGPD-masked · 24-month retention
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="text-[10px] uppercase tracking-[0.15em] opacity-60"
                style={{ backgroundColor: "#FAF7F1" }}
              >
                <th className="text-left px-5 py-3 font-semibold">Authorised</th>
                <th className="text-left px-5 py-3 font-semibold">Ordered by</th>
                <th className="text-left px-5 py-3 font-semibold">Authorised by</th>
                <th className="text-left px-5 py-3 font-semibold">Room</th>
                <th className="text-left px-5 py-3 font-semibold">Document</th>
                <th className="text-right px-5 py-3 font-semibold">Amount</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const orderedBy = guestById(c.orderedByGuestId);
                const authorisedBy = guestById(c.authorizedByGuestId);
                const minorFlag = orderedBy?.isMinor;
                return (
                  <tr
                    key={c.id}
                    className="border-t border-black/5 hover:bg-[#FAF7F1]/50 transition-colors cursor-pointer"
                    onClick={() => setActiveCharge(c)}
                  >
                    <td className="px-5 py-3 text-xs">
                      {formatDate(c.authorizedAt)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span>{orderedBy?.fullName ?? "—"}</span>
                        {minorFlag && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: CORAL, color: "#fff" }}
                          >
                            minor
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {authorisedBy?.fullName ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-xs opacity-80">
                      {c.roomNumber}
                    </td>
                    <td className="px-5 py-3 font-mono text-[11px] opacity-70">
                      {c.documentUsedMasked}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold">
                      {formatBRL(c.amountCents)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm opacity-50"
                  >
                    No charges match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-black/5 flex items-center justify-between text-xs opacity-60">
          <span>{filtered.length} of {seededCharges.length} charges</span>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeCharge && (
          <ChargeDetailModal
            charge={activeCharge}
            onClose={() => setActiveCharge(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function StatusBadge({ status }: { status: Charge["status"] }) {
  const styles: Record<Charge["status"], { bg: string; fg: string; label: string }> = {
    posted: { bg: "#D4E15733", fg: "#556B1E", label: "Posted" },
    failed: { bg: "#E8553A22", fg: "#8A2C18", label: "Failed · retry" },
    pending: { bg: "#A8D5DB55", fg: "#1A4E54", label: "Pending" },
  };
  const s = styles[status];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

function ChargeDetailModal({
  charge,
  onClose,
}: {
  charge: Charge;
  onClose: () => void;
}) {
  const orderedBy = guestById(charge.orderedByGuestId);
  const authorisedBy = guestById(charge.authorizedByGuestId);
  const reservation = reservations.find((r) => r.id === charge.reservationId);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: CORAL }}
              >
                Audit record
              </div>
              <h3
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-3xl font-black tracking-tight"
              >
                {formatBRL(charge.amountCents)}
              </h3>
              <div className="text-xs opacity-60 mt-1">
                {formatDate(charge.authorizedAt)} · {charge.roomNumber}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
            <DetailField label="Ordered by" value={orderedBy?.fullName ?? "—"} sub={orderedBy?.isMinor ? "Minor — guardian-authorised" : orderedBy?.role} />
            <DetailField label="Authorised by" value={authorisedBy?.fullName ?? "—"} sub={authorisedBy?.role} />
            <DetailField label="Reservation" value={reservation?.cloudbedsReservationId ?? "—"} sub={reservation?.partyLabel} />
            <DetailField label="Document used" value={charge.documentUsedMasked} sub="LGPD-masked" mono />
            <DetailField label="Deli order ID" value={charge.deliOrderId} mono />
            <DetailField label="Cloudbeds posting ID" value={charge.cloudbedsPostingId || "—"} mono sub={charge.status === "failed" ? "Posting failed — queued for retry" : undefined} />
          </div>

          <div className="rounded-xl p-4 border border-black/10 bg-[#FAF7F1] mb-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-60 mb-1.5">
              Order summary
            </div>
            <p className="text-sm">{charge.orderSummary}</p>
          </div>

          <div className="rounded-xl p-4 border border-black/10 bg-[#FAF7F1]">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-60 mb-1.5">
              Request metadata
            </div>
            <div className="text-xs font-mono opacity-70">
              IP {charge.ipAddress} · UA Mozilla/5.0 (iPhone; iOS 18.3) · src QR-T7
            </div>
          </div>

          {orderedBy?.isMinor && (
            <div
              className="mt-5 p-4 rounded-xl flex items-start gap-3 border"
              style={{
                backgroundColor: `${CORAL}10`,
                borderColor: `${CORAL}44`,
              }}
            >
              <Shield
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: CORAL }}
              />
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1"
                  style={{ color: CORAL }}
                >
                  US-10 · guardian flow
                </div>
                <p className="text-sm opacity-80 leading-relaxed">
                  Ordered by {orderedBy.fullName} ({orderedBy.ageYears}). Approved by {authorisedBy?.fullName}. Both names kept in the record.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailField({
  label,
  value,
  sub,
  mono,
}: {
  label: string;
  value: string;
  sub?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-1">
        {label}
      </div>
      <div className={`text-sm font-semibold ${mono ? "font-mono text-[13px]" : ""}`}>
        {value}
      </div>
      {sub && <div className="text-xs opacity-50 mt-0.5">{sub}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Scope card — price proxy
// ──────────────────────────────────────────────────────────────

function ScopeCard() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div
        className="rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10"
        style={{ backgroundColor: TEAL }}
      >
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60 mb-4">
            06 · demo scope
          </div>
          <h2
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] mb-5"
          >
            What&apos;s in
            <br />
            the demo
          </h2>
        </div>

        <div className="space-y-4">
          <ScopeList
            title="In the demo"
            tone="in"
            items={[
              "Auth logic (CPF/passport + rate limit)",
              "Guardian flow (US-10)",
              "Audit trail with dual-identity",
              "Cloudbeds folio handling",
              "LGPD-masked PII display",
              "All 10 user stories mapped",
            ]}
          />
          <ScopeList
            title="Not in the demo"
            tone="out"
            items={[
              "Live Cloudbeds and Fudo API wiring",
              "n8n workflows in production",
              "Front-desk retry dashboard",
              "Encrypted storage + key rotation",
              "Deployment, logging, observability",
              "Walk-in flow regression testing (US-07)",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ScopeList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "in" | "out";
  items: string[];
}) {
  const bg = tone === "in" ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.05)";
  const icon = tone === "in" ? Check : X;
  const Icon = icon;
  const iconColor = tone === "in" ? "#556B1E" : CORAL;
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: bg }}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-70 mb-3">
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Icon
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: iconColor }}
            />
            <span className="opacity-85">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Shared
// ──────────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
        {eyebrow}
      </div>
      <h2
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-3"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base opacity-70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12" style={{ backgroundColor: TEAL }}>
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-6 text-sm">
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
        <div className="flex items-center gap-5">
          <Link
            href="/proposals/convento-arcadia/demo/guest"
            className="text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
          >
            Guest flow
          </Link>
          <div className="text-xs opacity-70">
            Prepared by AutoFlux · autoflux.digital
          </div>
        </div>
      </div>
    </footer>
  );
}
