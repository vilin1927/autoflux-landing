// Convento Arcádia × Porto Oriente — Deli/Fudo ↔ Cloudbeds integration demo
// Mock data for the interactive demo at /proposals/convento-arcadia/demo
// Brand palette sampled from convento-arcadia.com (lime yellow CTA, coral, teal)

export type Nationality = "BR" | "FOREIGN";
export type GuestRole = "owner" | "guest" | "minor";

export interface Guest {
  id: string;
  cloudbedsGuestId: string;
  fullName: string;
  nationality: Nationality;
  cpf?: string;
  passport?: string;
  isMinor?: boolean;
  guardianId?: string;
  role: GuestRole;
  ageYears?: number;
}

export interface Reservation {
  id: string;
  cloudbedsReservationId: string;
  ownerGuestId: string;
  roomNumber: string;
  chaletType: string;
  checkIn: string;
  checkOut: string;
  status: "checked_in" | "arriving" | "checked_out";
  guestIds: string[];
  partyLabel: string;
}

export interface MenuItem {
  id: string;
  emoji: string;
  nameBR: string;
  description: string;
  priceCents: number;
  signature?: boolean;
}

export interface Charge {
  id: string;
  deliOrderId: string;
  cloudbedsPostingId: string;
  reservationId: string;
  roomNumber: string;
  orderedByGuestId: string;
  authorizedByGuestId: string;
  documentUsedMasked: string;
  amountCents: number;
  orderSummary: string;
  ipAddress: string;
  status: "posted" | "failed" | "pending";
  authorizedAt: string;
}

export interface UserStory {
  id: string;
  title: string;
  persona: string;
  narrative: string;
  acceptanceCriteria: string[];
  cloudbedsNote?: string;
  openQuestions?: string[];
  decisionsTaken?: string[];
}

// ─────────────────────────────────────────────────────────────
// Guests — the Silva family is the protagonist
// ─────────────────────────────────────────────────────────────

export const guests: Guest[] = [
  // RES-8891 — Silva family (the hero story)
  {
    id: "g_maria",
    cloudbedsGuestId: "CB-G-10001",
    fullName: "Maria Silva",
    nationality: "BR",
    cpf: "123.456.789-12",
    role: "owner",
    ageYears: 38,
  },
  {
    id: "g_joao",
    cloudbedsGuestId: "CB-G-10002",
    fullName: "João Silva",
    nationality: "BR",
    cpf: "987.654.321-45",
    role: "guest",
    ageYears: 41,
  },
  {
    id: "g_pedro",
    cloudbedsGuestId: "CB-G-10003",
    fullName: "Pedro Silva",
    nationality: "BR",
    cpf: "111.222.333-96",
    isMinor: true,
    guardianId: "g_maria",
    role: "minor",
    ageYears: 12,
  },
  // RES-8902 — German couple
  {
    id: "g_hans",
    cloudbedsGuestId: "CB-G-10004",
    fullName: "Hans Mueller",
    nationality: "FOREIGN",
    passport: "C01X84729",
    role: "owner",
    ageYears: 52,
  },
  {
    id: "g_greta",
    cloudbedsGuestId: "CB-G-10005",
    fullName: "Greta Mueller",
    nationality: "FOREIGN",
    passport: "C01X84730",
    role: "guest",
    ageYears: 49,
  },
  // RES-8877 — Solo kitesurfer
  {
    id: "g_carlos",
    cloudbedsGuestId: "CB-G-10006",
    fullName: "Carlos Oliveira",
    nationality: "BR",
    cpf: "234.567.890-23",
    role: "owner",
    ageYears: 29,
  },
  // RES-8915 — Costa family
  {
    id: "g_ana",
    cloudbedsGuestId: "CB-G-10007",
    fullName: "Ana Beatriz Costa",
    nationality: "BR",
    cpf: "345.678.901-34",
    role: "owner",
    ageYears: 36,
  },
  {
    id: "g_ricardo",
    cloudbedsGuestId: "CB-G-10008",
    fullName: "Ricardo Costa",
    nationality: "BR",
    cpf: "456.789.012-45",
    role: "guest",
    ageYears: 39,
  },
  {
    id: "g_sofia",
    cloudbedsGuestId: "CB-G-10009",
    fullName: "Sofia Costa",
    nationality: "BR",
    cpf: "567.890.123-56",
    isMinor: true,
    guardianId: "g_ana",
    role: "minor",
    ageYears: 8,
  },
  // RES-8920 — French traveller
  {
    id: "g_pierre",
    cloudbedsGuestId: "CB-G-10010",
    fullName: "Pierre Dubois",
    nationality: "FOREIGN",
    passport: "22EE44892",
    role: "owner",
    ageYears: 34,
  },
];

// ─────────────────────────────────────────────────────────────
// Reservations — 5 parties across 5 chalets, all "checked-in" today
// ─────────────────────────────────────────────────────────────

export const reservations: Reservation[] = [
  {
    id: "r_8891",
    cloudbedsReservationId: "RES-8891",
    ownerGuestId: "g_maria",
    roomNumber: "Chalé 4",
    chaletType: "Premium Family",
    checkIn: "2026-04-20",
    checkOut: "2026-04-25",
    status: "checked_in",
    guestIds: ["g_maria", "g_joao", "g_pedro"],
    partyLabel: "Silva family",
  },
  {
    id: "r_8902",
    cloudbedsReservationId: "RES-8902",
    ownerGuestId: "g_hans",
    roomNumber: "Chalé 1",
    chaletType: "Standard Double",
    checkIn: "2026-04-19",
    checkOut: "2026-04-23",
    status: "checked_in",
    guestIds: ["g_hans", "g_greta"],
    partyLabel: "Mueller couple",
  },
  {
    id: "r_8877",
    cloudbedsReservationId: "RES-8877",
    ownerGuestId: "g_carlos",
    roomNumber: "Chalé 7",
    chaletType: "Standard Double",
    checkIn: "2026-04-18",
    checkOut: "2026-04-22",
    status: "checked_in",
    guestIds: ["g_carlos"],
    partyLabel: "Solo kitesurfer",
  },
  {
    id: "r_8915",
    cloudbedsReservationId: "RES-8915",
    ownerGuestId: "g_ana",
    roomNumber: "Chalé 6",
    chaletType: "Premium Quadruple",
    checkIn: "2026-04-20",
    checkOut: "2026-04-26",
    status: "checked_in",
    guestIds: ["g_ana", "g_ricardo", "g_sofia"],
    partyLabel: "Costa family",
  },
  {
    id: "r_8920",
    cloudbedsReservationId: "RES-8920",
    ownerGuestId: "g_pierre",
    roomNumber: "Chalé 3",
    chaletType: "Standard Double",
    checkIn: "2026-04-21",
    checkOut: "2026-04-24",
    status: "arriving",
    guestIds: ["g_pierre"],
    partyLabel: "French traveller",
  },
];

// ─────────────────────────────────────────────────────────────
// Menu — Porto Oriente (Persian/Indian fusion per their real site)
// ─────────────────────────────────────────────────────────────

export const menuItems: MenuItem[] = [
  {
    id: "m_chana",
    emoji: "🌿",
    nameBR: "Chana Masala",
    description: "Signature dish · organic chickpeas · Persian spices",
    priceCents: 7800,
    signature: true,
  },
  {
    id: "m_kashmiri",
    emoji: "🍚",
    nameBR: "Kashmiri Rice",
    description: "Saffron, cardamom, almonds",
    priceCents: 5200,
  },
  {
    id: "m_kofta",
    emoji: "🧆",
    nameBR: "Kofta",
    description: "Slow-cooked meatballs in spiced tomato sauce",
    priceCents: 8900,
  },
  {
    id: "m_peixe",
    emoji: "🐟",
    nameBR: "Peixe grelhado do dia",
    description: "Catch of the day · grilled · local herbs",
    priceCents: 9500,
  },
  {
    id: "m_salada",
    emoji: "🥗",
    nameBR: "Salada orgânica do jardim",
    description: "From the garden · daily selection",
    priceCents: 4200,
  },
  {
    id: "m_vinho",
    emoji: "🍷",
    nameBR: "Taça de vinho tinto",
    description: "Selected glass · Brazilian wine",
    priceCents: 3800,
  },
  {
    id: "m_hibiscus",
    emoji: "🌺",
    nameBR: "Hibiscus Tonic",
    description: "Signature drink · hibiscus, ginger, tonic",
    priceCents: 2800,
    signature: true,
  },
  {
    id: "m_cupuacu",
    emoji: "🥭",
    nameBR: "Suco fresco de cupuaçu",
    description: "Fresh Amazonian fruit juice",
    priceCents: 1800,
  },
  {
    id: "m_sobremesa",
    emoji: "🍮",
    nameBR: "Sobremesa do dia",
    description: "Ask your waiter",
    priceCents: 3200,
  },
  {
    id: "m_acai",
    emoji: "🍇",
    nameBR: "Açaí na tigela",
    description: "Açaí bowl · granola, banana, honey",
    priceCents: 2400,
  },
];

// ─────────────────────────────────────────────────────────────
// Seeded audit log — 30 charges over past 7 days
// ─────────────────────────────────────────────────────────────

function iso(daysAgo: number, hour: number, minute: number): string {
  const d = new Date("2026-04-21T12:00:00Z");
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const seededCharges: Charge[] = [
  // Today — spread across rooms
  {
    id: "c_001",
    deliOrderId: "DELI-20481",
    cloudbedsPostingId: "CB-FOL-20481",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_joao",
    authorizedByGuestId: "g_joao",
    documentUsedMasked: "***.***.***-45",
    amountCents: 11700,
    orderSummary: "1× Kofta, 1× Kashmiri Rice",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(0, 12, 48),
  },
  {
    id: "c_002",
    deliOrderId: "DELI-20479",
    cloudbedsPostingId: "CB-FOL-20479",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_greta",
    authorizedByGuestId: "g_greta",
    documentUsedMasked: "****4730",
    amountCents: 6600,
    orderSummary: "1× Salada orgânica, 1× Hibiscus Tonic",
    ipAddress: "172.58.104.88",
    status: "posted",
    authorizedAt: iso(0, 13, 12),
  },
  {
    id: "c_003",
    deliOrderId: "DELI-20477",
    cloudbedsPostingId: "CB-FOL-20477",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 9500,
    orderSummary: "1× Peixe grelhado",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(0, 13, 40),
  },
  {
    id: "c_004",
    deliOrderId: "DELI-20472",
    cloudbedsPostingId: "",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ricardo",
    authorizedByGuestId: "g_ricardo",
    documentUsedMasked: "***.***.***-45",
    amountCents: 14200,
    orderSummary: "2× Chana Masala, 2× Taça de vinho",
    ipAddress: "172.58.104.19",
    status: "failed",
    authorizedAt: iso(0, 14, 15),
  },
  // Yesterday
  {
    id: "c_005",
    deliOrderId: "DELI-20450",
    cloudbedsPostingId: "CB-FOL-20450",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_maria",
    authorizedByGuestId: "g_maria",
    documentUsedMasked: "***.***.***-12",
    amountCents: 8900,
    orderSummary: "1× Kofta",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(1, 19, 32),
  },
  {
    id: "c_006",
    deliOrderId: "DELI-20448",
    cloudbedsPostingId: "CB-FOL-20448",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_joao",
    authorizedByGuestId: "g_joao",
    documentUsedMasked: "***.***.***-45",
    amountCents: 6600,
    orderSummary: "1× Salada orgânica, 1× Suco de cupuaçu",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(1, 13, 5),
  },
  {
    id: "c_007",
    deliOrderId: "DELI-20446",
    cloudbedsPostingId: "CB-FOL-20446",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_hans",
    authorizedByGuestId: "g_hans",
    documentUsedMasked: "****4729",
    amountCents: 13400,
    orderSummary: "1× Peixe grelhado, 1× Taça de vinho tinto",
    ipAddress: "172.58.104.88",
    status: "posted",
    authorizedAt: iso(1, 20, 14),
  },
  {
    id: "c_008",
    deliOrderId: "DELI-20444",
    cloudbedsPostingId: "CB-FOL-20444",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ana",
    authorizedByGuestId: "g_ana",
    documentUsedMasked: "***.***.***-34",
    amountCents: 5200,
    orderSummary: "1× Kashmiri Rice, 1× Hibiscus Tonic",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(1, 12, 40),
  },
  {
    id: "c_009",
    deliOrderId: "DELI-20442",
    cloudbedsPostingId: "CB-FOL-20442",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 4200,
    orderSummary: "1× Salada orgânica",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(1, 14, 8),
  },
  // 2 days ago
  {
    id: "c_010",
    deliOrderId: "DELI-20412",
    cloudbedsPostingId: "CB-FOL-20412",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ricardo",
    authorizedByGuestId: "g_ricardo",
    documentUsedMasked: "***.***.***-45",
    amountCents: 9500,
    orderSummary: "1× Peixe grelhado",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(2, 20, 18),
  },
  {
    id: "c_011",
    deliOrderId: "DELI-20408",
    cloudbedsPostingId: "CB-FOL-20408",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_maria",
    authorizedByGuestId: "g_maria",
    documentUsedMasked: "***.***.***-12",
    amountCents: 11400,
    orderSummary: "1× Chana Masala, 1× Taça de vinho, 1× Sobremesa",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(2, 19, 45),
  },
  {
    id: "c_012",
    deliOrderId: "DELI-20404",
    cloudbedsPostingId: "CB-FOL-20404",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_greta",
    authorizedByGuestId: "g_greta",
    documentUsedMasked: "****4730",
    amountCents: 2800,
    orderSummary: "1× Hibiscus Tonic",
    ipAddress: "172.58.104.88",
    status: "posted",
    authorizedAt: iso(2, 17, 22),
  },
  {
    id: "c_013",
    deliOrderId: "DELI-20398",
    cloudbedsPostingId: "CB-FOL-20398",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 6200,
    orderSummary: "1× Chana Masala",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(2, 13, 50),
  },
  {
    id: "c_014",
    deliOrderId: "DELI-20392",
    cloudbedsPostingId: "CB-FOL-20392",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ana",
    authorizedByGuestId: "g_ana",
    documentUsedMasked: "***.***.***-34",
    amountCents: 7800,
    orderSummary: "1× Chana Masala",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(3, 19, 10),
  },
  {
    id: "c_015",
    deliOrderId: "DELI-20388",
    cloudbedsPostingId: "",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_hans",
    authorizedByGuestId: "g_hans",
    documentUsedMasked: "****4729",
    amountCents: 4800,
    orderSummary: "1× Kashmiri Rice",
    ipAddress: "172.58.104.88",
    status: "failed",
    authorizedAt: iso(3, 20, 2),
  },
  {
    id: "c_016",
    deliOrderId: "DELI-20380",
    cloudbedsPostingId: "CB-FOL-20380",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_joao",
    authorizedByGuestId: "g_joao",
    documentUsedMasked: "***.***.***-45",
    amountCents: 9200,
    orderSummary: "1× Kofta",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(3, 12, 55),
  },
  {
    id: "c_017",
    deliOrderId: "DELI-20372",
    cloudbedsPostingId: "CB-FOL-20372",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 2800,
    orderSummary: "1× Hibiscus Tonic",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(4, 18, 45),
  },
  {
    id: "c_018",
    deliOrderId: "DELI-20368",
    cloudbedsPostingId: "CB-FOL-20368",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ana",
    authorizedByGuestId: "g_ana",
    documentUsedMasked: "***.***.***-34",
    amountCents: 12700,
    orderSummary: "1× Peixe grelhado, 1× Taça de vinho",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(4, 20, 30),
  },
  {
    id: "c_019",
    deliOrderId: "DELI-20362",
    cloudbedsPostingId: "CB-FOL-20362",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_maria",
    authorizedByGuestId: "g_maria",
    documentUsedMasked: "***.***.***-12",
    amountCents: 15600,
    orderSummary: "2× Chana Masala",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(4, 13, 20),
  },
  {
    id: "c_020",
    deliOrderId: "DELI-20354",
    cloudbedsPostingId: "CB-FOL-20354",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_hans",
    authorizedByGuestId: "g_hans",
    documentUsedMasked: "****4729",
    amountCents: 5600,
    orderSummary: "1× Hibiscus Tonic, 1× Suco de cupuaçu",
    ipAddress: "172.58.104.88",
    status: "posted",
    authorizedAt: iso(5, 17, 50),
  },
  {
    id: "c_021",
    deliOrderId: "DELI-20348",
    cloudbedsPostingId: "CB-FOL-20348",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 8900,
    orderSummary: "1× Kofta",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(5, 20, 8),
  },
  {
    id: "c_022",
    deliOrderId: "DELI-20342",
    cloudbedsPostingId: "CB-FOL-20342",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ricardo",
    authorizedByGuestId: "g_ricardo",
    documentUsedMasked: "***.***.***-45",
    amountCents: 4200,
    orderSummary: "1× Salada orgânica",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(5, 13, 12),
  },
  {
    id: "c_023",
    deliOrderId: "DELI-20336",
    cloudbedsPostingId: "CB-FOL-20336",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_joao",
    authorizedByGuestId: "g_joao",
    documentUsedMasked: "***.***.***-45",
    amountCents: 10200,
    orderSummary: "1× Chana Masala, 1× Hibiscus Tonic",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(6, 20, 40),
  },
  {
    id: "c_024",
    deliOrderId: "DELI-20330",
    cloudbedsPostingId: "CB-FOL-20330",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_greta",
    authorizedByGuestId: "g_greta",
    documentUsedMasked: "****4730",
    amountCents: 7000,
    orderSummary: "1× Kashmiri Rice, 1× Taça de vinho",
    ipAddress: "172.58.104.88",
    status: "posted",
    authorizedAt: iso(6, 13, 25),
  },
  {
    id: "c_025",
    deliOrderId: "DELI-20324",
    cloudbedsPostingId: "CB-FOL-20324",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 3200,
    orderSummary: "1× Sobremesa do dia",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(6, 21, 5),
  },
  {
    id: "c_026",
    deliOrderId: "DELI-20318",
    cloudbedsPostingId: "CB-FOL-20318",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ana",
    authorizedByGuestId: "g_ana",
    documentUsedMasked: "***.***.***-34",
    amountCents: 14200,
    orderSummary: "2× Chana Masala, 1× Taça de vinho",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(7, 20, 50),
  },
  {
    id: "c_027",
    deliOrderId: "DELI-20312",
    cloudbedsPostingId: "CB-FOL-20312",
    reservationId: "r_8891",
    roomNumber: "Chalé 4",
    orderedByGuestId: "g_maria",
    authorizedByGuestId: "g_maria",
    documentUsedMasked: "***.***.***-12",
    amountCents: 2800,
    orderSummary: "1× Hibiscus Tonic",
    ipAddress: "172.58.104.22",
    status: "posted",
    authorizedAt: iso(7, 17, 40),
  },
  {
    id: "c_028",
    deliOrderId: "DELI-20306",
    cloudbedsPostingId: "CB-FOL-20306",
    reservationId: "r_8902",
    roomNumber: "Chalé 1",
    orderedByGuestId: "g_hans",
    authorizedByGuestId: "g_hans",
    documentUsedMasked: "****4729",
    amountCents: 8500,
    orderSummary: "1× Peixe grelhado",
    ipAddress: "172.58.104.88",
    status: "posted",
    authorizedAt: iso(7, 19, 20),
  },
  {
    id: "c_029",
    deliOrderId: "DELI-20298",
    cloudbedsPostingId: "CB-FOL-20298",
    reservationId: "r_8877",
    roomNumber: "Chalé 7",
    orderedByGuestId: "g_carlos",
    authorizedByGuestId: "g_carlos",
    documentUsedMasked: "***.***.***-23",
    amountCents: 4800,
    orderSummary: "1× Kashmiri Rice",
    ipAddress: "172.58.104.41",
    status: "posted",
    authorizedAt: iso(7, 13, 35),
  },
  {
    id: "c_030",
    deliOrderId: "DELI-20294",
    cloudbedsPostingId: "CB-FOL-20294",
    reservationId: "r_8915",
    roomNumber: "Chalé 6",
    orderedByGuestId: "g_ricardo",
    authorizedByGuestId: "g_ricardo",
    documentUsedMasked: "***.***.***-45",
    amountCents: 6200,
    orderSummary: "1× Chana Masala",
    ipAddress: "172.58.104.19",
    status: "posted",
    authorizedAt: iso(7, 14, 10),
  },
];

// ─────────────────────────────────────────────────────────────
// User Stories — all 10 from the spec
// ─────────────────────────────────────────────────────────────

export const userStories: UserStory[] = [
  {
    id: "US-01",
    title: "Automatic Reservation Sync",
    persona: "Restaurant Manager",
    narrative: "Reservations and guests from Cloudbeds sync automatically into Deli, so guests can be identified in the restaurant without manual registration.",
    acceptanceCriteria: [
      "New Cloudbeds reservations sync automatically: owner, all guests, room, reservation #, check-in/out.",
      "Updates propagate to Deli within 5 minutes.",
      "Removed guests disappear from Deli.",
      "Cancelled reservations block all room charges immediately.",
    ],
    decisionsTaken: [
      "Poll Cloudbeds getReservations every 5 min (not webhook): Cloudbeds webhooks are unreliable for guest changes. Polling is slower but deterministic.",
      "Track a syncedAt watermark per reservation, skip no-ops.",
      "On cancellation, soft-delete the Fudo customer (don't hard delete — preserves audit linkage).",
    ],
    openQuestions: [
      "Does the hotel accept walk-up reservations entered directly in Cloudbeds mid-day? If yes, a 5-min SLA means a walk-up guest could wait up to 5 min before dining — is that OK or do we need on-demand sync?",
      "What should happen if Cloudbeds is unreachable? Block new room charges, or let them through with a 'sync pending' flag and reconcile later?",
    ],
  },
  {
    id: "US-02",
    title: "Guest Selection in QR Flow",
    persona: "Hotel Guest",
    narrative: "I want to search for and select my name from the list when scanning the QR code, so my order is associated with my room.",
    acceptanceCriteria: [
      "List shows only checked-in or synced customers.",
      "Each entry shows name + room.",
      "Guests from different rooms are not mixed.",
      "Fast name autocomplete for quick selection.",
    ],
    decisionsTaken: [
      "List scoped to status=checked_in only, filtered server-side by the integration — not a privacy leak of all hotel guests.",
      "Autocomplete on typed input ≥ 2 chars to avoid dumping a 50-guest list to the phone.",
    ],
    openQuestions: [
      "Does Fudo's QR flow let us customise the customer-list source, or does Deli pull from its own DB? If the latter, the n8n sync has to write customers INTO Fudo — which means deletes + updates need to cascade carefully.",
      "What do we show if two guests share a first name (e.g., two Marias on the same reservation)? Show room + last name in the list, or ask for an initial?",
    ],
  },
  {
    id: "US-03",
    title: "Authentication by CPF or Passport",
    persona: "Restaurant Manager",
    narrative: "Require CPF or passport before allowing room charge, to prevent fraud or misuse.",
    acceptanceCriteria: [
      "Brazilians: CPF required. Foreigners: passport required.",
      "Value compared to Cloudbeds-imported data — match enables charge, mismatch blocks it.",
      "After 3 invalid attempts: 5-minute temporary block.",
      "Only immediate payment offered on mismatch.",
    ],
    decisionsTaken: [
      "CPF stored as SHA-256 hash + last 2 digits for display. Original never written to DB at rest.",
      "Rate limit backed by Postgres (attempts table with TTL), not in-memory — survives n8n/app restarts and can be audited.",
      "Lockout keyed by (guestId, ipHash) — prevents global lockout from a single attacker.",
    ],
    openQuestions: [
      "Cloudbeds sometimes receives CPF via booking channel (Booking.com passes it through, Airbnb doesn't). If a reservation has no CPF on file but the guest knows their own, do we accept it as 'self-declared' or block?",
      "Lockout duration — 5 min is reasonable for a fat-finger typo but short for an attacker. Keep 5 min, or escalate on repeated lockouts (10 min → 30 min → contact front desk)?",
    ],
  },
  {
    id: "US-04",
    title: "Explicit Charge Authorization",
    persona: "Hotel Guest",
    narrative: "Review the bill and explicitly authorize before it posts to my room.",
    acceptanceCriteria: [
      "Pre-post screen shows guest name, room, order summary, total.",
      "Must click 'I authorize this charge to be posted to my room'.",
      "Without confirmation, charge is never sent to Cloudbeds.",
      "Authorization timestamp recorded in audit.",
    ],
    decisionsTaken: [
      "Consent click stored with IP + user-agent + timestamp — these three together are enough to defeat a 'I didn't authorise that' dispute in Brazilian courts.",
      "Confirmation button disables for 1.5s after render to prevent accidental double-taps while scrolling.",
      "Authorisation expires after 5 min of inactivity — guest must re-confirm.",
    ],
    openQuestions: [
      "Should the consent text be legally reviewed by your counsel? The wording 'This confirmation replaces the manual signature on the restaurant bill' (from your spec) is good, but your legal team may want specific language.",
      "Is there a maximum single-charge amount above which you'd want a second factor? (e.g. R$500+ requires a 4-digit PIN) Protects against stolen phone scenarios.",
    ],
  },
  {
    id: "US-05",
    title: "Automatic Posting to Cloudbeds",
    persona: "Front Desk Staff",
    narrative: "Restaurant charges post automatically to the correct folio in Cloudbeds, no manual entry.",
    acceptanceCriteria: [
      "After authorization, charge sent to Cloudbeds within 1 minute.",
      "Posted to correct reservation / room.",
      "Description format: 'Restaurant Consumption | date/time | amount'.",
      "Order details included in note.",
      "On error: log, notify front desk, allow retry.",
    ],
    cloudbedsNote: "Posted to the reservation's primary folio (Cloudbeds API limitation — see architecture note).",
    decisionsTaken: [
      "Posts to the reservation's primary folio (the only option today per Cloudbeds API).",
      "subReservationID is sent when a family books 2+ chalets — preserves room-level attribution in Cloudbeds.",
      "Retry with exponential backoff: 30s, 2min, 10min, then surface to front desk for manual handling.",
    ],
    openQuestions: [
      "What happens if the reservation is checked out BEFORE the charge posts (e.g., Cloudbeds is down for 15 min, meanwhile guest checks out)? Do we: (a) post anyway and let bookkeeping handle, (b) block and require manual posting, or (c) refund-and-recharge flow?",
      "When Cloudbeds rejects a posting (e.g., folio closed), what's the front-desk notification channel — email, Slack, dashboard alert, or all three?",
    ],
  },
  {
    id: "US-06",
    title: "Audit Logging",
    persona: "Hotel Management",
    narrative: "Record every authentication and authorization event, so any disputed charge can be proven.",
    acceptanceCriteria: [
      "Every charge records: guest name, room, reservation #, document used, date/time, amount, order summary, IP, Deli order ID, Cloudbeds posting ID.",
      "Records retained ≥ 24 months.",
      "Searchable by name, room, date, reservation #.",
    ],
    decisionsTaken: [
      "Postgres audit_log with immutable writes (INSERT-only, no UPDATE/DELETE from app).",
      "Admin dashboard has a dedicated 'auditor' role — can search and export, can't edit.",
      "Retention beyond 24 months moved to cold storage (S3 + parquet), queryable but slower.",
    ],
    openQuestions: [
      "Do you want audit export for external counsel (CSV or signed PDF)? If yes, who has that permission — only you, front-desk managers, or legal?",
      "Do you need to prove a charge WAS NOT made (a 'this reservation had zero charges on date X' attestation), or only that recorded charges were authorised?",
    ],
  },
  {
    id: "US-07",
    title: "External Diners Unchanged",
    persona: "Walk-in Customer",
    narrative: "Non-hotel guests continue to use the restaurant normally — the integration doesn't affect them.",
    acceptanceCriteria: [
      "External customers don't need to select a room.",
      "No CPF/passport required for immediate payment.",
      "Existing Deli workflow untouched for walk-ins.",
    ],
    decisionsTaken: [
      "The integration only activates when the guest selects 'Charge to room' — walk-ins never see the auth flow.",
      "Integration has a feature flag per table — disable on specific tables if needed (e.g. private event).",
    ],
    openQuestions: [
      "Should walk-ins ever be able to opt INTO hotel-guest mode (e.g., a Cloudbeds guest who forgot to mention it)? Or is it strictly table-based?",
    ],
  },
  {
    id: "US-08",
    title: "Security & Data Protection (LGPD)",
    persona: "Hotel Management",
    narrative: "Protect guest personal data so the hotel complies with LGPD and reduces risk.",
    acceptanceCriteria: [
      "CPF and passport never fully displayed in UI (masked: ***.***.***-XX).",
      "Sensitive data stored encrypted at rest.",
      "API credentials hidden from end users.",
      "Only authorized roles can view audit logs.",
    ],
    decisionsTaken: [
      "CPF stored hashed (SHA-256) — NOT encrypted-decrypted. Comparison is hash-vs-hash. Means we can never 'reveal' the CPF to anyone, not even admins. Stronger compliance.",
      "Display mask is stored as a separate field ('***.***.***-12') — lets you see the last 2 digits for support without exposing the full number.",
      "API credentials stored in env vars + secrets manager, never in code or n8n UI.",
    ],
    openQuestions: [
      "Does your LGPD policy already exist, or do you need me to draft the data-processing notice the guest sees at the authorisation step?",
      "Data subject access requests (DSAR) — if a guest asks 'show me everything you have on me', do you handle that, or should the system export it? LGPD requires a response within 15 days.",
    ],
  },
  {
    id: "US-09",
    title: "Adult Guest Not Reservation Owner",
    persona: "Adult Guest",
    narrative: "Authenticate myself and charge my own consumption — I shouldn't need the reservation owner for every order.",
    acceptanceCriteria: [
      "Adult non-owner appears in customer search.",
      "After selecting name, system requests their own CPF/passport.",
      "Valid auth → charge allowed against the reservation's folio.",
      "Owner not required to re-authenticate.",
      "Audit log records: orderer name, owner name, room, time, amount.",
    ],
    decisionsTaken: [
      "Adult = 18+ derived from date-of-birth on Cloudbeds. No DOB on record → treated as adult if marked as guest-not-minor on the reservation.",
      "Audit preserves BOTH ordered_by and room_owner columns — important for bookkeeping disputes.",
    ],
    openQuestions: [
      "Some reservations list only the primary guest by name, with 'Spouse' or '+1' as the other. How should we handle charges for the unnamed +1 — register them at check-in, or block room-charging until front desk adds them?",
      "Consider: one adult runs up an unreasonable bill. Should the reservation owner get a real-time notification (push to Maria) even though they aren't authorising? Useful feature, not in spec.",
    ],
  },
  {
    id: "US-10",
    title: "Minor Requires Guardian Authorization",
    persona: "Reservation Owner",
    narrative: "Authorize charges made by a minor associated with my room, to retain control over expenses and prevent unauthorized charges.",
    acceptanceCriteria: [
      "Minor cannot authorize a charge alone.",
      "After minor selects their name, system displays the associated responsible adult + authorization request.",
      "System requests the adult's CPF/passport.",
      "Only after adult authentication may the charge post.",
      "Audit log records both minor (ordered_by) and adult (authorized_by).",
    ],
    decisionsTaken: [
      "Minor status = under 18 on DOB from Cloudbeds. Guardian = reservation owner by default, overridable per-guest.",
      "Order is held in a 'pending_guardian' state for up to 15 min; auto-void if no approval.",
      "Guardian receives the auth request on the SAME device by default (the minor hands them the phone). A future v2 can send push to the guardian's separate device.",
    ],
    openQuestions: [
      "Divorced or separated parents travelling together — the spec assumes 1 guardian per minor. What if there are 2 adults and Maria is unreachable but João is at dinner? Can João authorise? If yes, we need to model multiple guardians per minor.",
      "What's the business policy if a minor orders ONLY non-alcoholic items (açaí, juice)? Some hotels don't require guardian approval for low-value kid items. If you want this, what's the amount threshold?",
      "Guardian offline edge case — Maria is in the pool with no phone. Minor is hungry. Is there a 'front-desk manual override' path, or does the kid wait?",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function guestById(id: string): Guest | undefined {
  return guests.find((g) => g.id === id);
}

export function reservationByGuestId(guestId: string): Reservation | undefined {
  return reservations.find((r) => r.guestIds.includes(guestId));
}

export function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
