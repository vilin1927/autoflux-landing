"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  ChevronRight,
  CreditCard,
  Hotel,
  Search,
  Shield,
  CheckCircle2,
  Check,
  X,
  QrCode,
  Sparkles,
  RefreshCw,
  Info,
} from "lucide-react";
import {
  menuItems,
  guests,
  reservations,
  guestById,
  reservationByGuestId,
  formatBRL,
  type MenuItem,
  type Guest,
} from "@/data/proposals/convento-arcadia";

// ──────────────────────────────────────────────────────────────
// Brand
// ──────────────────────────────────────────────────────────────
const LIME = "#D4E157";
const CORAL = "#E8553A";
const TEAL = "#A8D5DB";
const CREAM = "#FAF7F1";
const INK = "#1A1A1A";

type Screen =
  | "arrival"
  | "menu"
  | "checkout"
  | "search"
  | "minor"
  | "cpf"
  | "split"
  | "success";

type CartItem = { id: string; quantity: number };

// ──────────────────────────────────────────────────────────────

export default function GuestFlowPage() {
  const [screen, setScreen] = useState<Screen>("arrival");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "m_chana", quantity: 1 },
    { id: "m_hibiscus", quantity: 1 },
  ]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [orderId] = useState(
    () => `DELI-${20500 + Math.floor(Math.random() * 99)}`,
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((c) => {
          const item = menuItems.find((m) => m.id === c.id);
          return item ? { ...item, quantity: c.quantity } : null;
        })
        .filter((x): x is MenuItem & { quantity: number } => x !== null),
    [cart],
  );

  const subtotalCents = cartItems.reduce(
    (s, i) => s + i.priceCents * i.quantity,
    0,
  );
  const serviceCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + serviceCents;

  function addToCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing)
        return prev.map((c) =>
          c.id === id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      return [...prev, { id, quantity: 1 }];
    });
  }
  function removeFromCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity - 1 } : c,
      );
    });
  }

  function resetDemo() {
    setScreen("arrival");
    setCart([
      { id: "m_chana", quantity: 1 },
      { id: "m_hibiscus", quantity: 1 },
    ]);
    setSelectedGuest(null);
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <TopBar screen={screen} onReset={resetDemo} />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        {/* Context banner explaining this is optional */}
        <ContextBanner />

        {/* Phone frame OR split-screen */}
        <div className="mt-8 flex justify-center">
          <AnimatePresence mode="wait">
            {screen === "split" ? (
              <SplitScreenGuardianMoment
                key="split"
                orderId={orderId}
                totalCents={totalCents}
                cartItems={cartItems}
                selectedGuest={selectedGuest}
                onApproved={() => setScreen("success")}
              />
            ) : (
              <motion.div
                key="phone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <PhoneFrame label="Guest · iPhone" accent={LIME}>
                  <AnimatePresence mode="wait">
                    {screen === "arrival" && (
                      <ArrivalScreen
                        key="arrival"
                        onEnter={() => setScreen("menu")}
                      />
                    )}
                    {screen === "menu" && (
                      <MenuScreen
                        key="menu"
                        cartItems={cartItems}
                        totalCents={subtotalCents}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        cart={cart}
                        onCheckout={() => setScreen("checkout")}
                      />
                    )}
                    {screen === "checkout" && (
                      <CheckoutScreen
                        key="checkout"
                        subtotalCents={subtotalCents}
                        serviceCents={serviceCents}
                        totalCents={totalCents}
                        onChargeRoom={() => setScreen("search")}
                        onPayNow={() => alert("Out of demo scope. This path uses Deli's existing card/Pix flow.")}
                      />
                    )}
                    {screen === "search" && (
                      <SearchScreen
                        key="search"
                        onSelect={(g) => {
                          setSelectedGuest(g);
                          if (g.isMinor) setScreen("minor");
                          else setScreen("cpf");
                        }}
                      />
                    )}
                    {screen === "minor" && selectedGuest && (
                      <MinorDetectedScreen
                        key="minor"
                        minor={selectedGuest}
                        onContinue={() => setScreen("cpf")}
                      />
                    )}
                    {screen === "cpf" && selectedGuest && (
                      <CPFEntryScreen
                        key="cpf"
                        orderedBy={selectedGuest}
                        onVerified={() => setScreen("split")}
                      />
                    )}
                    {screen === "success" && selectedGuest && (
                      <SuccessScreen
                        key="success"
                        orderId={orderId}
                        totalCents={totalCents}
                        orderedBy={selectedGuest}
                        onDone={resetDemo}
                      />
                    )}
                  </AnimatePresence>
                </PhoneFrame>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scene caption below phone */}
        <SceneCaption screen={screen} />
      </div>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────

function TopBar({
  screen,
  onReset,
}: {
  screen: Screen;
  onReset: () => void;
}) {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: `${CREAM}cc`,
        borderColor: "rgba(0,0,0,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/proposals/convento-arcadia/demo"
            className="text-[11px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
          >
            demo
          </Link>
          <div className="h-4 w-px bg-black/10 hidden sm:block" />
          <Image
            src="/proposals/convento-arcadia/logo.webp"
            alt="Convento Arcádia"
            width={180}
            height={52}
            className="h-8 w-auto hidden sm:block"
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          >
            <span>Scene {sceneIndex(screen)} / 7</span>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] opacity-60 hover:opacity-100 transition-opacity"
          >
            <RefreshCw className="w-3 h-3" />
            reset
          </button>
        </div>
      </div>
    </header>
  );
}

function sceneIndex(screen: Screen): number {
  const order: Screen[] = [
    "arrival",
    "menu",
    "checkout",
    "search",
    "minor",
    "cpf",
    "split",
    "success",
  ];
  const i = order.indexOf(screen);
  // Minor is optional detour
  if (screen === "minor") return 4;
  if (screen === "cpf") return 5;
  if (screen === "split") return 6;
  if (screen === "success") return 7;
  return i + 1;
}

function ContextBanner() {
  return (
    <div
      className="mt-8 rounded-2xl px-5 py-3 border flex items-center justify-between gap-4"
      style={{
        backgroundColor: "rgba(168,213,219,0.15)",
        borderColor: "rgba(168,213,219,0.5)",
      }}
    >
      <div
        className="text-[11px] font-bold uppercase tracking-[0.2em]"
        style={{ color: "#1A4E54" }}
      >
        Guest flow walkthrough
      </div>
      <Link
        href="/proposals/convento-arcadia/demo/integration"
        className="text-[11px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
      >
        architecture
      </Link>
    </div>
  );
}

function SceneCaption({ screen }: { screen: Screen }) {
  const captions: Record<Screen, { title: string; us: string }> = {
    arrival: { title: "Table 7 · Porto Oriente", us: "" },
    menu: { title: "Menu", us: "" },
    checkout: { title: "Checkout", us: "" },
    search: { title: "Who's ordering?", us: "US-02" },
    minor: { title: "Minor detected", us: "US-10" },
    cpf: { title: "Guardian CPF entry", us: "US-03 · US-10" },
    split: { title: "Split-screen guardian approval", us: "US-10" },
    success: { title: "Posted to Cloudbeds", us: "US-05 · US-06" },
  };
  const c = captions[screen];
  return (
    <div className="mt-8 max-w-md mx-auto text-center">
      {c.us && (
        <div
          className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
          style={{ color: CORAL }}
        >
          {c.us}
        </div>
      )}
      <div
        style={{ fontFamily: "var(--font-playfair)" }}
        className="text-xl md:text-2xl font-black tracking-tight"
      >
        {c.title}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Phone frame
// ──────────────────────────────────────────────────────────────

function PhoneFrame({
  children,
  label,
  accent = LIME,
  dim = false,
}: {
  children: React.ReactNode;
  label?: string;
  accent?: string;
  dim?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ backgroundColor: INK, color: accent }}
        >
          {label}
        </div>
      )}
      <div
        className="relative w-[380px] h-[760px] rounded-[48px] bg-[#0b0b0b] shadow-2xl overflow-hidden"
        style={{
          padding: "10px",
          boxShadow:
            "0 25px 60px -20px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.04)",
          opacity: dim ? 0.55 : 1,
          filter: dim ? "saturate(0.5)" : "none",
          transition: "opacity 0.4s, filter 0.4s",
        }}
      >
        <div
          className="w-full h-full rounded-[40px] overflow-hidden relative"
          style={{ backgroundColor: CREAM }}
        >
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-50" />
          {/* Time bar */}
          <div className="absolute top-3 left-5 text-[11px] font-semibold z-40 text-black">
            20:43
          </div>
          <div className="absolute top-3 right-5 text-[11px] font-semibold z-40 text-black flex items-center gap-1">
            <span>5G</span>
            <span>•••</span>
          </div>
          <div className="absolute inset-0 pt-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Screen 1 — Arrival
// ──────────────────────────────────────────────────────────────

function ArrivalScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full relative"
    >
      <div className="relative h-[60%]">
        <Image
          src="/proposals/convento-arcadia/hero-restaurant.jpg"
          alt="Porto Oriente"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#FAF7F1]" />
        <div className="absolute inset-x-0 top-8 flex flex-col items-center">
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-white text-3xl font-black tracking-tight"
          >
            Porto Oriente
          </div>
          <div className="text-white/80 text-[11px] uppercase tracking-[0.25em] mt-1">
            Culinária Ancestral
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative">
        <div
          className="rounded-2xl p-5 shadow-xl bg-white text-center"
          style={{ borderColor: "rgba(0,0,0,0.05)" }}
        >
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] mb-3"
            style={{ backgroundColor: LIME, color: INK }}
          >
            <QrCode className="w-3 h-3" /> scanned
          </div>
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-2xl font-black tracking-tight mb-1"
          >
            Table 7
          </div>
          <div className="text-xs opacity-60 mb-5">
            The tan will fade, but the memories will last forever.
          </div>

          <button
            onClick={onEnter}
            className="w-full rounded-full py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: LIME, color: INK }}
          >
            Open the menu
          </button>
        </div>

        <div className="text-center text-[10px] opacity-40 uppercase tracking-[0.2em] mt-5">
          Powered by Fudo · deli pdv
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Screen 2 — Menu
// ──────────────────────────────────────────────────────────────

function MenuScreen({
  cartItems,
  totalCents,
  cart,
  addToCart,
  removeFromCart,
  onCheckout,
}: {
  cartItems: (MenuItem & { quantity: number })[];
  totalCents: number;
  cart: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  onCheckout: () => void;
}) {
  const count = cart.reduce((s, c) => s + c.quantity, 0);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div>
          <div
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-xl font-black tracking-tight"
          >
            Menu
          </div>
          <div className="text-[11px] opacity-60">Table 7 · Porto Oriente</div>
        </div>
        <div
          className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${LIME}80`, color: INK }}
        >
          Signature
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32">
        <div className="space-y-2.5">
          {menuItems.map((item) => {
            const cartItem = cart.find((c) => c.id === item.id);
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
                  style={{
                    backgroundColor: item.signature
                      ? `${LIME}40`
                      : "rgba(0,0,0,0.04)",
                  }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="text-sm font-semibold truncate">
                      {item.nameBR}
                    </div>
                    {item.signature && (
                      <Sparkles className="w-3 h-3" style={{ color: CORAL }} />
                    )}
                  </div>
                  <div className="text-[11px] opacity-55 truncate">
                    {item.description}
                  </div>
                  <div className="text-xs font-semibold mt-0.5">
                    {formatBRL(item.priceCents)}
                  </div>
                </div>
                {cartItem ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: INK, color: LIME }}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: LIME, color: INK }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Pedro's açaí moment hint */}
          <div
            className="mt-4 rounded-xl p-3 text-[11px] flex items-start gap-2 border"
            style={{
              backgroundColor: `${CORAL}08`,
              borderColor: `${CORAL}33`,
              color: CORAL,
            }}
          >
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>
              <strong>Demo scene:</strong> Pedro (12) wants to add the 🍇 Açaí.
              Add it and see what happens at checkout.
            </span>
          </div>
        </div>
      </div>

      {/* Cart bar */}
      {count > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="absolute left-3 right-3 bottom-3"
        >
          <button
            onClick={onCheckout}
            className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between"
            style={{ backgroundColor: INK, color: "#fff" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: LIME, color: INK }}
              >
                {count}
              </span>
              <span className="text-sm font-semibold">View order</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {formatBRL(totalCents)}
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Screen 3 — Checkout method
// ──────────────────────────────────────────────────────────────

function CheckoutScreen({
  subtotalCents,
  serviceCents,
  totalCents,
  onChargeRoom,
  onPayNow,
}: {
  subtotalCents: number;
  serviceCents: number;
  totalCents: number;
  onChargeRoom: () => void;
  onPayNow: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col px-5"
    >
      <div className="pt-3 pb-2">
        <div
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-2xl font-black tracking-tight"
        >
          How to pay?
        </div>
      </div>

      {/* Summary strip */}
      <div
        className="rounded-xl p-3 mt-3 text-[11px] space-y-1"
        style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
      >
        <div className="flex justify-between">
          <span className="opacity-70">Subtotal</span>
          <span>{formatBRL(subtotalCents)}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Service (10%)</span>
          <span>{formatBRL(serviceCents)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold pt-1 border-t border-black/5">
          <span>Total</span>
          <span>{formatBRL(totalCents)}</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mt-6">
        <button
          onClick={onPayNow}
          className="w-full rounded-2xl p-5 text-left bg-white border border-black/10 hover:border-black/30 transition-all"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm mb-0.5">Pay now</div>
              <div className="text-[11px] opacity-60">
                Card, Pix, or cash at the table
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={onChargeRoom}
          className="w-full rounded-2xl p-5 text-left hover:-translate-y-0.5 transition-all"
          style={{
            backgroundColor: INK,
            color: "#fff",
            boxShadow: `0 12px 30px -12px ${LIME}cc`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: LIME, color: INK }}
            >
              <Hotel className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm mb-0.5">
                Charge to my room
              </div>
              <div className="text-[11px] opacity-70">
                Hotel guests only · settled at check-out
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </div>
        </button>
      </div>

    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Screen 4 — Guest search
// ──────────────────────────────────────────────────────────────

function SearchScreen({ onSelect }: { onSelect: (g: Guest) => void }) {
  const [query, setQuery] = useState("");
  const checkedInGuests = useMemo(() => {
    const ids = new Set<string>();
    reservations
      .filter((r) => r.status === "checked_in")
      .forEach((r) => r.guestIds.forEach((gid) => ids.add(gid)));
    return guests.filter((g) => ids.has(g.id));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return checkedInGuests;
    return checkedInGuests.filter((g) =>
      g.fullName.toLowerCase().includes(q),
    );
  }, [query, checkedInGuests]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col px-5"
    >
      <div className="pt-3 pb-1">
        <div
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-2xl font-black tracking-tight leading-tight"
        >
          Who&apos;s ordering?
        </div>
        <div className="text-[11px] opacity-60 mt-1">
          Currently checked-in guests
        </div>
      </div>

      <div className="relative mt-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your name..."
          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-black/10 bg-white focus:outline-none focus:border-black/30"
        />
      </div>

      <div className="flex-1 overflow-y-auto mt-4 -mx-2 px-2">
        <div className="space-y-1.5">
          {filtered.map((g) => {
            const reservation = reservationByGuestId(g.id);
            return (
              <button
                key={g.id}
                onClick={() => onSelect(g)}
                className="w-full rounded-xl p-3 flex items-center gap-3 hover:bg-white text-left transition-colors border border-transparent hover:border-black/10"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    backgroundColor: g.isMinor ? `${CORAL}22` : `${TEAL}88`,
                    color: g.isMinor ? CORAL : "#1A4E54",
                  }}
                >
                  {initials(g.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold truncate">
                      {g.fullName}
                    </span>
                    {g.isMinor && (
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: CORAL, color: "#fff" }}
                      >
                        minor
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] opacity-60">
                    {reservation?.roomNumber} · {reservation?.partyLabel}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-sm opacity-50">
              No matches.
            </div>
          )}
        </div>
      </div>

      <div
        className="my-3 rounded-xl p-3 text-[11px] flex items-start gap-2"
        style={{ backgroundColor: `${CORAL}10`, color: CORAL }}
      >
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          <strong>Demo hint:</strong> Tap <strong>Pedro Silva</strong> to see
          the guardian flow.
        </span>
      </div>
    </motion.div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

// ──────────────────────────────────────────────────────────────
// Screen 5 — Minor detected
// ──────────────────────────────────────────────────────────────

function MinorDetectedScreen({
  minor,
  onContinue,
}: {
  minor: Guest;
  onContinue: () => void;
}) {
  const guardian = minor.guardianId ? guestById(minor.guardianId) : null;
  const reservation = reservationByGuestId(minor.id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="h-full flex flex-col px-5 pt-4"
    >
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: `${CORAL}22`, color: CORAL }}
        >
          <Shield className="w-8 h-8" />
        </motion.div>

        <div
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-2xl font-black tracking-tight text-center leading-tight mb-2"
        >
          Guardian needed
        </div>
        <p className="text-sm opacity-70 text-center leading-relaxed mb-6">
          {minor.fullName} is {minor.ageYears}. An adult on the reservation needs to approve charges.
        </p>

        {guardian && (
          <div
            className="rounded-2xl p-4 border mx-auto w-full max-w-sm"
            style={{ backgroundColor: "#fff", borderColor: `${CORAL}33` }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: CORAL }}
            >
              Guardian
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: `${TEAL}aa`, color: "#1A4E54" }}
              >
                {initials(guardian.fullName)}
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {guardian.fullName}
                </div>
                <div className="text-[11px] opacity-60">
                  Reservation owner · {reservation?.roomNumber}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onContinue}
        className="w-full rounded-full py-3.5 text-sm font-semibold mb-5 mt-4"
        style={{ backgroundColor: INK, color: LIME }}
      >
        Ask guardian to approve
      </button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Screen 6 — CPF entry (Maria)
// ──────────────────────────────────────────────────────────────

function CPFEntryScreen({
  orderedBy,
  onVerified,
}: {
  orderedBy: Guest;
  onVerified: () => void;
}) {
  const guardianId = orderedBy.guardianId ?? orderedBy.id;
  const guardian = guestById(guardianId);
  const correctCPF = guardian?.cpf ?? "";

  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(0);

  useEffect(() => {
    if (!locked) return;
    const t = setInterval(() => {
      setLockSeconds((s) => {
        if (s <= 1) {
          setLocked(false);
          setAttempts(0);
          setError(null);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [locked]);

  function onChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 9);
    const p4 = digits.slice(9, 11);
    let out = p1;
    if (digits.length > 3) out += "." + p2;
    if (digits.length > 6) out += "." + p3;
    if (digits.length > 9) out += "-" + p4;
    setInput(out);
    setError(null);
  }

  function submit() {
    if (locked) return;
    if (input === correctCPF) {
      onVerified();
      return;
    }
    const next = attempts + 1;
    setAttempts(next);
    if (next >= 3) {
      setLocked(true);
      setLockSeconds(299);
      setError("Locked for 5:00");
    } else {
      setError(`CPF mismatch. ${3 - next} attempt${3 - next === 1 ? "" : "s"} remaining.`);
    }
    setInput("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col px-5 pt-4"
    >
      <div>
        <div
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-2xl font-black tracking-tight leading-tight"
        >
          {guardian?.fullName.split(" ")[0]}, enter your CPF
        </div>
        <div className="text-[11px] opacity-60 mt-1.5">
          To approve {orderedBy.fullName.split(" ")[0]}&apos;s order.
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">
          CPF
        </div>
        <input
          autoFocus
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="___.___.___-__"
          disabled={locked}
          className="w-full text-2xl font-mono tracking-wide px-4 py-4 rounded-2xl border-2 focus:outline-none disabled:opacity-50"
          style={{
            borderColor: error ? CORAL : "rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        />

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-xs font-semibold flex items-center gap-1.5"
              style={{ color: CORAL }}
            >
              <X className="w-3.5 h-3.5" />
              {locked ? (
                <span>
                  Locked — try again in{" "}
                  {Math.floor(lockSeconds / 60)}:
                  {String(lockSeconds % 60).padStart(2, "0")}
                </span>
              ) : (
                error
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo hint */}
        <div
          className="mt-5 rounded-xl p-3 text-[11px] flex items-start gap-2"
          style={{ backgroundColor: `${LIME}30`, color: INK }}
        >
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            <strong>Demo hint:</strong> correct CPF is{" "}
            <code className="font-mono">{correctCPF}</code>. Try 2-3 wrong ones
            first to see the rate-limit.
          </span>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={locked || input.replace(/\D/g, "").length !== 11}
        className="mt-auto mb-5 rounded-full py-3.5 text-sm font-semibold disabled:opacity-40 transition-opacity"
        style={{ backgroundColor: INK, color: LIME }}
      >
        Verify CPF
      </button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// ⭐ SPLIT-SCREEN guardian moment
// ──────────────────────────────────────────────────────────────

function SplitScreenGuardianMoment({
  orderId,
  totalCents,
  cartItems,
  selectedGuest,
  onApproved,
}: {
  orderId: string;
  totalCents: number;
  cartItems: (MenuItem & { quantity: number })[];
  selectedGuest: Guest | null;
  onApproved: () => void;
}) {
  const minor = selectedGuest;
  const guardian = minor?.guardianId ? guestById(minor.guardianId) : null;
  const reservation = minor ? reservationByGuestId(minor.id) : null;

  const [mariaNotified, setMariaNotified] = useState(false);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMariaNotified(true), 900);
    return () => clearTimeout(t);
  }, []);

  function approve() {
    setApproving(true);
    setTimeout(onApproved, 1200);
  }

  if (!minor || !guardian || !reservation) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start max-w-5xl mx-auto">
        {/* Pedro's phone — left, dimmed + waiting */}
        <div className="flex justify-center">
          <PhoneFrame
            label={`${minor.fullName.split(" ")[0]} · waiting`}
            accent={CORAL}
            dim={!approving}
          >
            <div className="h-full flex flex-col items-center justify-center px-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${CORAL}22`, color: CORAL }}
              >
                <Shield className="w-10 h-10" />
              </motion.div>
              <div
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-xl font-black tracking-tight mb-2"
              >
                Waiting for {guardian.fullName.split(" ")[0]}
              </div>
              <div className="text-xs opacity-60 leading-relaxed">
                Order on hold until your guardian approves.
              </div>
              <div className="mt-6 text-[10px] uppercase tracking-[0.25em] opacity-50">
                Order {orderId}
              </div>

              {approving && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: "#556B1E" }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approved — posting...
                </motion.div>
              )}
            </div>
          </PhoneFrame>
        </div>

        {/* Maria's phone — right, push notification */}
        <div className="flex justify-center">
          <PhoneFrame label={`${guardian.fullName.split(" ")[0]} · guardian`} accent={LIME}>
            <div className="h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/proposals/convento-arcadia/hero-drink.jpg"
                  alt="drink"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF7F1]" />

              {/* Lock screen time */}
              <div className="relative pt-10 pb-3 text-center text-black/70">
                <div className="text-[11px] uppercase tracking-[0.2em]">
                  Thursday, 21 April
                </div>
                <div
                  className="text-5xl font-light mt-0.5"
                  style={{ color: INK }}
                >
                  20:43
                </div>
              </div>

              {/* Push notification */}
              <AnimatePresence>
                {mariaNotified && (
                  <motion.div
                    initial={{ opacity: 0, y: -30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                    className="mx-3 mt-3 rounded-2xl bg-white/85 backdrop-blur-md border shadow-xl overflow-hidden"
                    style={{ borderColor: "rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-start gap-2.5 p-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: INK }}
                      >
                        <Image
                          src="/proposals/convento-arcadia/logo.webp"
                          alt="Convento"
                          width={32}
                          height={32}
                          className="w-5 h-5 object-contain brightness-0 invert"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] opacity-50 uppercase tracking-wider mb-0.5">
                          <span>Convento Arcádia</span>
                          <span>now</span>
                        </div>
                        <div className="text-[13px] font-semibold leading-snug mb-0.5">
                          Approval needed
                        </div>
                        <div className="text-[11px] opacity-75 leading-snug">
                          {minor.fullName} wants to charge{" "}
                          <strong>{formatBRL(totalCents)}</strong> to the room.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Order detail + approve */}
              <AnimatePresence>
                {mariaNotified && (
                  <motion.div
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 180, damping: 24 }}
                    className="absolute left-3 right-3 bottom-3 rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden"
                  >
                    <div className="p-4">
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                        style={{ color: CORAL }}
                      >
                        Guardian approval
                      </div>
                      <div
                        style={{ fontFamily: "var(--font-playfair)" }}
                        className="text-lg font-black tracking-tight leading-tight mb-3"
                      >
                        Approve {minor.fullName.split(" ")[0]}&apos;s order?
                      </div>

                      <div className="space-y-1 text-xs mb-3">
                        {cartItems.map((i) => (
                          <div
                            key={i.id}
                            className="flex justify-between"
                          >
                            <span className="opacity-70">
                              {i.quantity}× {i.nameBR}
                            </span>
                            <span>{formatBRL(i.priceCents * i.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-black/10 mb-4">
                        <span>Total</span>
                        <span>{formatBRL(totalCents)}</span>
                      </div>

                      <div className="text-[10px] opacity-50 mb-3 leading-relaxed">
                        Posts to Chalé 4 folio. Audit keeps both names: ordered by {minor.fullName.split(" ")[0]}, approved by you.
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="flex-1 rounded-full py-3 text-xs font-semibold border border-black/10"
                          disabled={approving}
                        >
                          Deny
                        </button>
                        <button
                          onClick={approve}
                          disabled={approving}
                          className="flex-[2] rounded-full py-3 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-60"
                          style={{ backgroundColor: INK, color: LIME }}
                        >
                          {approving ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                className="inline-block"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </motion.span>
                              Approving...
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Approve
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </PhoneFrame>
        </div>
      </div>

    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Screen 8 — Success
// ──────────────────────────────────────────────────────────────

function SuccessScreen({
  orderId,
  totalCents,
  orderedBy,
  onDone,
}: {
  orderId: string;
  totalCents: number;
  orderedBy: Guest;
  onDone: () => void;
}) {
  const guardianId = orderedBy.guardianId ?? orderedBy.id;
  const guardian = guestById(guardianId);
  const reservation = reservationByGuestId(orderedBy.id);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col px-5 pt-4"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: LIME, color: INK }}
        >
          <Check className="w-10 h-10" strokeWidth={3} />
        </motion.div>
        <div
          style={{ fontFamily: "var(--font-playfair)" }}
          className="text-3xl font-black tracking-tight text-center mb-2"
        >
          Charge approved
        </div>
        <div className="text-sm opacity-70 text-center leading-relaxed max-w-xs mb-5">
          Posted to {reservation?.roomNumber}. Settles at check-out.
        </div>

        <div
          className="rounded-2xl p-4 w-full max-w-sm space-y-2 text-xs"
          style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <Row label="Amount" value={formatBRL(totalCents)} bold />
          <Row label="Ordered by" value={orderedBy.fullName} />
          {guardian && guardian.id !== orderedBy.id && (
            <Row label="Approved by" value={guardian.fullName} />
          )}
          <Row label="Deli order ID" value={orderId} mono />
          <Row label="Cloudbeds posting" value={`CB-FOL-${orderId.slice(-5)}`} mono />
        </div>

      </div>

      <button
        onClick={onDone}
        className="rounded-full py-3.5 text-sm font-semibold mb-5 border border-black/10"
      >
        Reset demo
      </button>
    </motion.div>
  );
}

function Row({
  label,
  value,
  mono,
  bold,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="opacity-55">{label}</span>
      <span
        className={`${mono ? "font-mono text-[11px]" : ""} ${bold ? "font-bold text-sm" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
