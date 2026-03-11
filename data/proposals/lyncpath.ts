// ============================================================
// LyncPath Mock Data — Realistic Container Shipping Data
// ============================================================

export interface Milestone {
  id: number;
  name: string;
  stage: "Origin" | "Transit" | "Destination";
  planned: string | null;
  actual: string | null;
  status: "completed" | "current" | "upcoming" | "delayed" | "overdue";
  responsible: string;
  notes?: string;
}

export interface Shipment {
  id: string;
  bookingNumber: string;
  blNumber: string;
  carrier: string;
  carrierLogo: string;
  vessel: string;
  voyage: string;
  containerNumbers: string[];
  containerType: string;
  origin: { port: string; country: string; code: string };
  destination: { port: string; country: string; code: string };
  transshipment?: { port: string; country: string; code: string };
  shipper: string;
  consignee: string;
  commodity: string;
  weight: string;
  etd: string;
  eta: string;
  status: "In Transit" | "At Origin" | "At Destination" | "Delivered" | "Delayed" | "Customs Hold";
  progress: number;
  milestones: Milestone[];
  freeTimeDays: number;
  freeTimeUsed: number;
  ddExposure: number;
  lastUpdate: string;
  alerts: number;
}

export interface CarrierScore {
  name: string;
  logo: string;
  scheduleReliability: number;
  avgTransitDays: number;
  plannedTransitDays: number;
  onTimePercentage: number;
  delayCount: number;
  totalShipments: number;
  avgDwellTime: number;
  ddIncidents: number;
  trend: "up" | "down" | "stable";
  rating: number;
}

export interface Alert {
  id: string;
  type: "delay" | "dd_risk" | "customs" | "milestone" | "carrier" | "system";
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  shipmentId: string;
  bookingNumber: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

export interface VendorUpdate {
  id: string;
  vendor: string;
  vendorType: "Trucker" | "Customs Broker" | "CFS" | "Warehouse";
  shipmentId: string;
  milestone: string;
  timestamp: string;
  status: "Completed" | "In Progress" | "Issue";
  notes: string;
  documents?: string[];
}

export interface EmailIngestion {
  id: string;
  sender: string;
  subject: string;
  receivedAt: string;
  type: "CRO" | "Booking Confirmation" | "Arrival Notice" | "D&D Invoice" | "Other";
  status: "Processed" | "Pending Review" | "Failed" | "Ignored";
  extractedFields?: Record<string, string>;
  confidence: number;
  shipmentId?: string;
}

// ============================================================
// Shipments
// ============================================================
export const shipments: Shipment[] = [
  {
    id: "SHP-2026-001",
    bookingNumber: "MAEU7234819",
    blNumber: "MAEU234819BL",
    carrier: "Maersk",
    carrierLogo: "🔵",
    vessel: "Maersk Edmonton",
    voyage: "ME2603W",
    containerNumbers: ["MSKU9834210", "MSKU9834211"],
    containerType: "40' HC",
    origin: { port: "Shanghai", country: "China", code: "CNSHA" },
    destination: { port: "Rotterdam", country: "Netherlands", code: "NLRTM" },
    shipper: "Shenzhen Electronics Co.",
    consignee: "TechImport Europe B.V.",
    commodity: "Consumer Electronics",
    weight: "22,450 kg",
    etd: "2026-03-05",
    eta: "2026-04-02",
    status: "In Transit",
    progress: 62,
    freeTimeDays: 14,
    freeTimeUsed: 0,
    ddExposure: 0,
    lastUpdate: "2026-03-11T08:30:00Z",
    alerts: 1,
    milestones: [
      { id: 1, name: "Empty Container Dispatch", stage: "Origin", planned: "2026-03-01", actual: "2026-03-01", status: "completed", responsible: "Maersk" },
      { id: 2, name: "Cargo Pick-up", stage: "Origin", planned: "2026-03-02", actual: "2026-03-02", status: "completed", responsible: "SinoTrans Trucking" },
      { id: 3, name: "Customs Export", stage: "Origin", planned: "2026-03-03", actual: "2026-03-03", status: "completed", responsible: "ChinaClear Customs" },
      { id: 4, name: "Gate In", stage: "Origin", planned: "2026-03-04", actual: "2026-03-04", status: "completed", responsible: "Shanghai Terminal" },
      { id: 5, name: "Loaded on Vessel", stage: "Origin", planned: "2026-03-05", actual: "2026-03-05", status: "completed", responsible: "Maersk" },
      { id: 6, name: "Vessel Departed", stage: "Origin", planned: "2026-03-05", actual: "2026-03-05", status: "completed", responsible: "Maersk" },
      { id: 7, name: "Transshipment Arrival", stage: "Transit", planned: "2026-03-14", actual: "2026-03-14", status: "completed", responsible: "Maersk", notes: "Port Klang, Malaysia" },
      { id: 8, name: "Transshipment Departure", stage: "Transit", planned: "2026-03-16", actual: null, status: "current", responsible: "Maersk" },
      { id: 9, name: "Vessel Arrived", stage: "Destination", planned: "2026-04-02", actual: null, status: "upcoming", responsible: "Maersk" },
      { id: 10, name: "Customs Import", stage: "Destination", planned: "2026-04-03", actual: null, status: "upcoming", responsible: "EuroClear B.V." },
      { id: 11, name: "Gate Out", stage: "Destination", planned: "2026-04-04", actual: null, status: "upcoming", responsible: "ECT Rotterdam" },
      { id: 12, name: "Delivered", stage: "Destination", planned: "2026-04-05", actual: null, status: "upcoming", responsible: "DHL Freight NL" },
      { id: 13, name: "Empty Return", stage: "Destination", planned: "2026-04-08", actual: null, status: "upcoming", responsible: "DHL Freight NL" },
    ],
  },
  {
    id: "SHP-2026-002",
    bookingNumber: "HLCU5567342",
    blNumber: "HLCU567342BL",
    carrier: "Hapag-Lloyd",
    carrierLogo: "🟠",
    vessel: "Berlin Express",
    voyage: "BE0312E",
    containerNumbers: ["HLXU2019384"],
    containerType: "20' GP",
    origin: { port: "Hamburg", country: "Germany", code: "DEHAM" },
    destination: { port: "New York", country: "United States", code: "USNYC" },
    shipper: "Deutsche Maschinenbau GmbH",
    consignee: "American Industrial Corp.",
    commodity: "Industrial Machinery Parts",
    weight: "18,200 kg",
    etd: "2026-02-28",
    eta: "2026-03-14",
    status: "Delayed",
    progress: 78,
    freeTimeDays: 7,
    freeTimeUsed: 0,
    ddExposure: 0,
    lastUpdate: "2026-03-11T06:15:00Z",
    alerts: 3,
    milestones: [
      { id: 1, name: "Empty Container Dispatch", stage: "Origin", planned: "2026-02-25", actual: "2026-02-25", status: "completed", responsible: "Hapag-Lloyd" },
      { id: 2, name: "Cargo Pick-up", stage: "Origin", planned: "2026-02-26", actual: "2026-02-26", status: "completed", responsible: "DB Schenker" },
      { id: 3, name: "Customs Export", stage: "Origin", planned: "2026-02-27", actual: "2026-02-27", status: "completed", responsible: "Kühne+Nagel" },
      { id: 4, name: "Gate In", stage: "Origin", planned: "2026-02-27", actual: "2026-02-28", status: "completed", responsible: "HHLA Terminal" },
      { id: 5, name: "Loaded on Vessel", stage: "Origin", planned: "2026-02-28", actual: "2026-02-28", status: "completed", responsible: "Hapag-Lloyd" },
      { id: 6, name: "Vessel Departed", stage: "Origin", planned: "2026-02-28", actual: "2026-03-01", status: "completed", responsible: "Hapag-Lloyd", notes: "Delayed 1 day — weather" },
      { id: 7, name: "Transshipment Arrival", stage: "Transit", planned: null, actual: null, status: "completed", responsible: "N/A", notes: "Direct service" },
      { id: 8, name: "Transshipment Departure", stage: "Transit", planned: null, actual: null, status: "completed", responsible: "N/A", notes: "Direct service" },
      { id: 9, name: "Vessel Arrived", stage: "Destination", planned: "2026-03-14", actual: null, status: "delayed", responsible: "Hapag-Lloyd", notes: "Revised ETA: Mar 16 — port congestion" },
      { id: 10, name: "Customs Import", stage: "Destination", planned: "2026-03-15", actual: null, status: "upcoming", responsible: "US Customs Broker Inc." },
      { id: 11, name: "Gate Out", stage: "Destination", planned: "2026-03-16", actual: null, status: "upcoming", responsible: "Maher Terminal" },
      { id: 12, name: "Delivered", stage: "Destination", planned: "2026-03-17", actual: null, status: "upcoming", responsible: "XPO Logistics" },
      { id: 13, name: "Empty Return", stage: "Destination", planned: "2026-03-20", actual: null, status: "upcoming", responsible: "XPO Logistics" },
    ],
  },
  {
    id: "SHP-2026-003",
    bookingNumber: "CMAU8891234",
    blNumber: "CMAU891234BL",
    carrier: "CMA CGM",
    carrierLogo: "🔴",
    vessel: "CMA CGM Jacques Saadé",
    voyage: "JS0309W",
    containerNumbers: ["CMAU7761923", "CMAU7761924", "CMAU7761925"],
    containerType: "40' GP",
    origin: { port: "Ningbo", country: "China", code: "CNNGB" },
    destination: { port: "Le Havre", country: "France", code: "FRLEH" },
    transshipment: { port: "Singapore", country: "Singapore", code: "SGSIN" },
    shipper: "Zhejiang Textile Manufacturing",
    consignee: "Carrefour Logistics SAS",
    commodity: "Textiles & Garments",
    weight: "45,600 kg",
    etd: "2026-03-09",
    eta: "2026-04-08",
    status: "At Origin",
    progress: 25,
    freeTimeDays: 14,
    freeTimeUsed: 0,
    ddExposure: 0,
    lastUpdate: "2026-03-11T10:00:00Z",
    alerts: 0,
    milestones: [
      { id: 1, name: "Empty Container Dispatch", stage: "Origin", planned: "2026-03-06", actual: "2026-03-06", status: "completed", responsible: "CMA CGM" },
      { id: 2, name: "Cargo Pick-up", stage: "Origin", planned: "2026-03-07", actual: "2026-03-07", status: "completed", responsible: "Sinotrans" },
      { id: 3, name: "Customs Export", stage: "Origin", planned: "2026-03-08", actual: "2026-03-08", status: "completed", responsible: "Ningbo Customs" },
      { id: 4, name: "Gate In", stage: "Origin", planned: "2026-03-09", actual: null, status: "current", responsible: "Ningbo Terminal" },
      { id: 5, name: "Loaded on Vessel", stage: "Origin", planned: "2026-03-10", actual: null, status: "upcoming", responsible: "CMA CGM" },
      { id: 6, name: "Vessel Departed", stage: "Origin", planned: "2026-03-10", actual: null, status: "upcoming", responsible: "CMA CGM" },
      { id: 7, name: "Transshipment Arrival", stage: "Transit", planned: "2026-03-17", actual: null, status: "upcoming", responsible: "CMA CGM" },
      { id: 8, name: "Transshipment Departure", stage: "Transit", planned: "2026-03-19", actual: null, status: "upcoming", responsible: "CMA CGM" },
      { id: 9, name: "Vessel Arrived", stage: "Destination", planned: "2026-04-08", actual: null, status: "upcoming", responsible: "CMA CGM" },
      { id: 10, name: "Customs Import", stage: "Destination", planned: "2026-04-09", actual: null, status: "upcoming", responsible: "Bolloré Logistics" },
      { id: 11, name: "Gate Out", stage: "Destination", planned: "2026-04-10", actual: null, status: "upcoming", responsible: "GPMH Terminal" },
      { id: 12, name: "Delivered", stage: "Destination", planned: "2026-04-11", actual: null, status: "upcoming", responsible: "Geodis France" },
      { id: 13, name: "Empty Return", stage: "Destination", planned: "2026-04-14", actual: null, status: "upcoming", responsible: "Geodis France" },
    ],
  },
  {
    id: "SHP-2026-004",
    bookingNumber: "MSCU3345678",
    blNumber: "MSCU345678BL",
    carrier: "MSC",
    carrierLogo: "🟡",
    vessel: "MSC Gülsün",
    voyage: "MG0302E",
    containerNumbers: ["MSCU4482910"],
    containerType: "40' Reefer",
    origin: { port: "Santos", country: "Brazil", code: "BRSSZ" },
    destination: { port: "Antwerp", country: "Belgium", code: "BEANR" },
    shipper: "Brasil Foods S.A.",
    consignee: "Fresh Import NV",
    commodity: "Frozen Poultry Products",
    weight: "26,800 kg",
    etd: "2026-02-20",
    eta: "2026-03-08",
    status: "Customs Hold",
    progress: 88,
    freeTimeDays: 7,
    freeTimeUsed: 5,
    ddExposure: 1250,
    lastUpdate: "2026-03-11T07:45:00Z",
    alerts: 4,
    milestones: [
      { id: 1, name: "Empty Container Dispatch", stage: "Origin", planned: "2026-02-17", actual: "2026-02-17", status: "completed", responsible: "MSC" },
      { id: 2, name: "Cargo Pick-up", stage: "Origin", planned: "2026-02-18", actual: "2026-02-18", status: "completed", responsible: "JSL Logistics" },
      { id: 3, name: "Customs Export", stage: "Origin", planned: "2026-02-19", actual: "2026-02-19", status: "completed", responsible: "Receita Federal" },
      { id: 4, name: "Gate In", stage: "Origin", planned: "2026-02-19", actual: "2026-02-20", status: "completed", responsible: "Santos Terminal" },
      { id: 5, name: "Loaded on Vessel", stage: "Origin", planned: "2026-02-20", actual: "2026-02-20", status: "completed", responsible: "MSC" },
      { id: 6, name: "Vessel Departed", stage: "Origin", planned: "2026-02-20", actual: "2026-02-21", status: "completed", responsible: "MSC" },
      { id: 7, name: "Transshipment Arrival", stage: "Transit", planned: null, actual: null, status: "completed", responsible: "N/A" },
      { id: 8, name: "Transshipment Departure", stage: "Transit", planned: null, actual: null, status: "completed", responsible: "N/A" },
      { id: 9, name: "Vessel Arrived", stage: "Destination", planned: "2026-03-08", actual: "2026-03-08", status: "completed", responsible: "MSC" },
      { id: 10, name: "Customs Import", stage: "Destination", planned: "2026-03-09", actual: null, status: "delayed", responsible: "Customs4Trade BVBA", notes: "Phytosanitary inspection — hold since Mar 9" },
      { id: 11, name: "Gate Out", stage: "Destination", planned: "2026-03-10", actual: null, status: "overdue", responsible: "PSA Antwerp" },
      { id: 12, name: "Delivered", stage: "Destination", planned: "2026-03-11", actual: null, status: "upcoming", responsible: "H.Essers" },
      { id: 13, name: "Empty Return", stage: "Destination", planned: "2026-03-14", actual: null, status: "upcoming", responsible: "H.Essers" },
    ],
  },
  {
    id: "SHP-2026-005",
    bookingNumber: "EGLV1123456",
    blNumber: "EGLV123456BL",
    carrier: "Evergreen",
    carrierLogo: "🟢",
    vessel: "Ever Given",
    voyage: "EG0225E",
    containerNumbers: ["EISU8827461", "EISU8827462"],
    containerType: "40' HC",
    origin: { port: "Kaohsiung", country: "Taiwan", code: "TWKHH" },
    destination: { port: "Los Angeles", country: "United States", code: "USLAX" },
    shipper: "TSMC Logistics Division",
    consignee: "WestCoast Semiconductor Inc.",
    commodity: "Semiconductor Equipment",
    weight: "15,300 kg",
    etd: "2026-02-10",
    eta: "2026-02-28",
    status: "Delivered",
    progress: 100,
    freeTimeDays: 10,
    freeTimeUsed: 3,
    ddExposure: 0,
    lastUpdate: "2026-03-05T14:00:00Z",
    alerts: 0,
    milestones: [
      { id: 1, name: "Empty Container Dispatch", stage: "Origin", planned: "2026-02-07", actual: "2026-02-07", status: "completed", responsible: "Evergreen" },
      { id: 2, name: "Cargo Pick-up", stage: "Origin", planned: "2026-02-08", actual: "2026-02-08", status: "completed", responsible: "Yang Ming Transport" },
      { id: 3, name: "Customs Export", stage: "Origin", planned: "2026-02-09", actual: "2026-02-09", status: "completed", responsible: "Taiwan Customs" },
      { id: 4, name: "Gate In", stage: "Origin", planned: "2026-02-09", actual: "2026-02-10", status: "completed", responsible: "KMCT Terminal" },
      { id: 5, name: "Loaded on Vessel", stage: "Origin", planned: "2026-02-10", actual: "2026-02-10", status: "completed", responsible: "Evergreen" },
      { id: 6, name: "Vessel Departed", stage: "Origin", planned: "2026-02-10", actual: "2026-02-10", status: "completed", responsible: "Evergreen" },
      { id: 7, name: "Transshipment Arrival", stage: "Transit", planned: null, actual: null, status: "completed", responsible: "N/A" },
      { id: 8, name: "Transshipment Departure", stage: "Transit", planned: null, actual: null, status: "completed", responsible: "N/A" },
      { id: 9, name: "Vessel Arrived", stage: "Destination", planned: "2026-02-28", actual: "2026-02-27", status: "completed", responsible: "Evergreen" },
      { id: 10, name: "Customs Import", stage: "Destination", planned: "2026-02-28", actual: "2026-02-28", status: "completed", responsible: "Flexport Customs" },
      { id: 11, name: "Gate Out", stage: "Destination", planned: "2026-03-01", actual: "2026-03-01", status: "completed", responsible: "TraPac Terminal" },
      { id: 12, name: "Delivered", stage: "Destination", planned: "2026-03-02", actual: "2026-03-02", status: "completed", responsible: "Werner Enterprises" },
      { id: 13, name: "Empty Return", stage: "Destination", planned: "2026-03-05", actual: "2026-03-05", status: "completed", responsible: "Werner Enterprises" },
    ],
  },
  {
    id: "SHP-2026-006",
    bookingNumber: "ONEY9987654",
    blNumber: "ONEY987654BL",
    carrier: "ONE",
    carrierLogo: "🩷",
    vessel: "ONE Continuity",
    voyage: "OC0310W",
    containerNumbers: ["TCLU9918273"],
    containerType: "20' GP",
    origin: { port: "Busan", country: "South Korea", code: "KRPUS" },
    destination: { port: "Felixstowe", country: "United Kingdom", code: "GBFXT" },
    transshipment: { port: "Colombo", country: "Sri Lanka", code: "LKCMB" },
    shipper: "Hyundai Auto Parts",
    consignee: "UK Motor Supplies Ltd",
    commodity: "Automotive Parts",
    weight: "12,100 kg",
    etd: "2026-03-10",
    eta: "2026-04-12",
    status: "At Origin",
    progress: 15,
    freeTimeDays: 14,
    freeTimeUsed: 0,
    ddExposure: 0,
    lastUpdate: "2026-03-11T04:00:00Z",
    alerts: 0,
    milestones: [
      { id: 1, name: "Empty Container Dispatch", stage: "Origin", planned: "2026-03-07", actual: "2026-03-07", status: "completed", responsible: "ONE" },
      { id: 2, name: "Cargo Pick-up", stage: "Origin", planned: "2026-03-08", actual: "2026-03-08", status: "completed", responsible: "CJ Logistics" },
      { id: 3, name: "Customs Export", stage: "Origin", planned: "2026-03-09", actual: null, status: "current", responsible: "Korean Customs" },
      { id: 4, name: "Gate In", stage: "Origin", planned: "2026-03-10", actual: null, status: "upcoming", responsible: "BPTS Terminal" },
      { id: 5, name: "Loaded on Vessel", stage: "Origin", planned: "2026-03-10", actual: null, status: "upcoming", responsible: "ONE" },
      { id: 6, name: "Vessel Departed", stage: "Origin", planned: "2026-03-10", actual: null, status: "upcoming", responsible: "ONE" },
      { id: 7, name: "Transshipment Arrival", stage: "Transit", planned: "2026-03-20", actual: null, status: "upcoming", responsible: "ONE" },
      { id: 8, name: "Transshipment Departure", stage: "Transit", planned: "2026-03-22", actual: null, status: "upcoming", responsible: "ONE" },
      { id: 9, name: "Vessel Arrived", stage: "Destination", planned: "2026-04-12", actual: null, status: "upcoming", responsible: "ONE" },
      { id: 10, name: "Customs Import", stage: "Destination", planned: "2026-04-13", actual: null, status: "upcoming", responsible: "HMRC Customs" },
      { id: 11, name: "Gate Out", stage: "Destination", planned: "2026-04-14", actual: null, status: "upcoming", responsible: "Felixstowe Port" },
      { id: 12, name: "Delivered", stage: "Destination", planned: "2026-04-15", actual: null, status: "upcoming", responsible: "Eddie Stobart" },
      { id: 13, name: "Empty Return", stage: "Destination", planned: "2026-04-18", actual: null, status: "upcoming", responsible: "Eddie Stobart" },
    ],
  },
];

// ============================================================
// Carrier Scorecards
// ============================================================
export const carrierScores: CarrierScore[] = [
  { name: "Maersk", logo: "🔵", scheduleReliability: 82, avgTransitDays: 28, plannedTransitDays: 27, onTimePercentage: 78, delayCount: 4, totalShipments: 18, avgDwellTime: 2.1, ddIncidents: 1, trend: "up", rating: 4.2 },
  { name: "Hapag-Lloyd", logo: "🟠", scheduleReliability: 75, avgTransitDays: 16, plannedTransitDays: 14, onTimePercentage: 71, delayCount: 5, totalShipments: 14, avgDwellTime: 2.8, ddIncidents: 2, trend: "down", rating: 3.6 },
  { name: "CMA CGM", logo: "🔴", scheduleReliability: 85, avgTransitDays: 30, plannedTransitDays: 29, onTimePercentage: 83, delayCount: 2, totalShipments: 12, avgDwellTime: 1.8, ddIncidents: 0, trend: "up", rating: 4.5 },
  { name: "MSC", logo: "🟡", scheduleReliability: 70, avgTransitDays: 18, plannedTransitDays: 16, onTimePercentage: 65, delayCount: 7, totalShipments: 22, avgDwellTime: 3.2, ddIncidents: 4, trend: "down", rating: 3.1 },
  { name: "Evergreen", logo: "🟢", scheduleReliability: 88, avgTransitDays: 18, plannedTransitDays: 18, onTimePercentage: 86, delayCount: 1, totalShipments: 8, avgDwellTime: 1.5, ddIncidents: 0, trend: "up", rating: 4.7 },
  { name: "ONE", logo: "🩷", scheduleReliability: 79, avgTransitDays: 33, plannedTransitDays: 32, onTimePercentage: 76, delayCount: 3, totalShipments: 10, avgDwellTime: 2.4, ddIncidents: 1, trend: "stable", rating: 3.9 },
];

// ============================================================
// Alerts
// ============================================================
export const alerts: Alert[] = [
  { id: "ALT-001", type: "dd_risk", severity: "critical", title: "D&D Risk — Antwerp", message: "Container MSCU4482910 has used 5 of 7 free days at Antwerp. Customs hold unresolved. Projected D&D: €1,250+", shipmentId: "SHP-2026-004", bookingNumber: "MSCU3345678", timestamp: "2026-03-11T07:00:00Z", read: false, actionRequired: true },
  { id: "ALT-002", type: "customs", severity: "critical", title: "Customs Hold — Phytosanitary", message: "Phytosanitary inspection ordered for frozen poultry shipment. Release date unknown. Contact Customs4Trade BVBA.", shipmentId: "SHP-2026-004", bookingNumber: "MSCU3345678", timestamp: "2026-03-09T14:30:00Z", read: true, actionRequired: true },
  { id: "ALT-003", type: "delay", severity: "warning", title: "Vessel Delay — Berlin Express", message: "Berlin Express ETA revised to Mar 16 (was Mar 14). Port congestion at New York/Newark.", shipmentId: "SHP-2026-002", bookingNumber: "HLCU5567342", timestamp: "2026-03-10T18:00:00Z", read: false, actionRequired: false },
  { id: "ALT-004", type: "delay", severity: "warning", title: "Departure Delay — Hamburg", message: "Berlin Express departed Hamburg 1 day late due to weather conditions.", shipmentId: "SHP-2026-002", bookingNumber: "HLCU5567342", timestamp: "2026-03-01T09:00:00Z", read: true, actionRequired: false },
  { id: "ALT-005", type: "dd_risk", severity: "warning", title: "D&D Warning — 48h", message: "Container MSCU4482910: 48 hours until D&D charges begin if not released.", shipmentId: "SHP-2026-004", bookingNumber: "MSCU3345678", timestamp: "2026-03-10T12:00:00Z", read: true, actionRequired: true },
  { id: "ALT-006", type: "milestone", severity: "info", title: "Transshipment Completed", message: "Containers MSKU9834210, MSKU9834211 completed transshipment at Port Klang.", shipmentId: "SHP-2026-001", bookingNumber: "MAEU7234819", timestamp: "2026-03-14T22:00:00Z", read: false, actionRequired: false },
  { id: "ALT-007", type: "carrier", severity: "info", title: "Vessel Schedule Update", message: "CMA CGM Jacques Saadé loading on schedule at Ningbo. No delays expected.", shipmentId: "SHP-2026-003", bookingNumber: "CMAU8891234", timestamp: "2026-03-11T06:00:00Z", read: true, actionRequired: false },
  { id: "ALT-008", type: "system", severity: "info", title: "CRO Processed", message: "Booking confirmation ONEY9987654 automatically processed from email. 12 fields extracted.", shipmentId: "SHP-2026-006", bookingNumber: "ONEY9987654", timestamp: "2026-03-08T10:00:00Z", read: true, actionRequired: false },
];

// ============================================================
// Vendor Updates
// ============================================================
export const vendorUpdates: VendorUpdate[] = [
  { id: "VU-001", vendor: "SinoTrans Trucking", vendorType: "Trucker", shipmentId: "SHP-2026-001", milestone: "Cargo Pick-up", timestamp: "2026-03-02T06:30:00Z", status: "Completed", notes: "Picked up 2x 40HC from Shenzhen warehouse. No damage.", documents: ["pickup_receipt.pdf"] },
  { id: "VU-002", vendor: "ChinaClear Customs", vendorType: "Customs Broker", shipmentId: "SHP-2026-001", milestone: "Customs Export", timestamp: "2026-03-03T14:00:00Z", status: "Completed", notes: "Export declaration cleared. HS codes verified.", documents: ["export_dec.pdf"] },
  { id: "VU-003", vendor: "DB Schenker", vendorType: "Trucker", shipmentId: "SHP-2026-002", milestone: "Cargo Pick-up", timestamp: "2026-02-26T08:00:00Z", status: "Completed", notes: "Heavy machinery parts — crane used for loading." },
  { id: "VU-004", vendor: "Customs4Trade BVBA", vendorType: "Customs Broker", shipmentId: "SHP-2026-004", milestone: "Customs Import", timestamp: "2026-03-11T08:00:00Z", status: "Issue", notes: "Phytosanitary hold. Inspector visit scheduled for Mar 12. Broker is escalating." },
  { id: "VU-005", vendor: "CJ Logistics", vendorType: "Trucker", shipmentId: "SHP-2026-006", milestone: "Cargo Pick-up", timestamp: "2026-03-08T07:15:00Z", status: "Completed", notes: "Loaded 1x 20GP from Hyundai facility. Sealed: KR-9182734." },
  { id: "VU-006", vendor: "Werner Enterprises", vendorType: "Trucker", shipmentId: "SHP-2026-005", milestone: "Delivered", timestamp: "2026-03-02T11:00:00Z", status: "Completed", notes: "Delivered to WestCoast Semi facility, San Jose. POD signed.", documents: ["pod_signed.pdf", "delivery_photos.zip"] },
];

// ============================================================
// Email Ingestion Log
// ============================================================
export const emailIngestions: EmailIngestion[] = [
  {
    id: "EM-001", sender: "bookings@maersk.com", subject: "Booking Confirmation — MAEU7234819",
    receivedAt: "2026-02-28T09:00:00Z", type: "CRO", status: "Processed", confidence: 97,
    shipmentId: "SHP-2026-001",
    extractedFields: { "Booking Number": "MAEU7234819", "Vessel": "Maersk Edmonton", "Voyage": "ME2603W", "POL": "Shanghai (CNSHA)", "POD": "Rotterdam (NLRTM)", "ETD": "2026-03-05", "ETA": "2026-04-02", "Container Type": "40' HC x2", "Free Time": "14 days" },
  },
  {
    id: "EM-002", sender: "operations@hapag-lloyd.com", subject: "RE: BKG HLCU5567342 — Cargo Release Order",
    receivedAt: "2026-02-24T14:30:00Z", type: "CRO", status: "Processed", confidence: 94,
    shipmentId: "SHP-2026-002",
    extractedFields: { "Booking Number": "HLCU5567342", "Vessel": "Berlin Express", "POL": "Hamburg (DEHAM)", "POD": "New York (USNYC)", "ETD": "2026-02-28", "ETA": "2026-03-14", "Container Type": "20' GP x1", "Free Time": "7 days" },
  },
  {
    id: "EM-003", sender: "docs@cmacgm.com", subject: "Fwd: Booking CMAU8891234 — 3x 40GP Ningbo-Le Havre",
    receivedAt: "2026-03-05T11:00:00Z", type: "Booking Confirmation", status: "Processed", confidence: 91,
    shipmentId: "SHP-2026-003",
    extractedFields: { "Booking Number": "CMAU8891234", "Vessel": "CMA CGM Jacques Saadé", "POL": "Ningbo (CNNGB)", "POD": "Le Havre (FRLEH)", "ETD": "2026-03-09", "ETA": "2026-04-08", "Container Type": "40' GP x3", "Free Time": "14 days", "Transshipment": "Singapore" },
  },
  {
    id: "EM-004", sender: "alerts@msc.com", subject: "Arrival Notice — MSCU3345678 — Antwerp",
    receivedAt: "2026-03-08T16:00:00Z", type: "Arrival Notice", status: "Processed", confidence: 98,
    shipmentId: "SHP-2026-004",
    extractedFields: { "Booking Number": "MSCU3345678", "Port": "Antwerp (BEANR)", "Arrival Date": "2026-03-08", "Free Time Starts": "2026-03-09", "Free Time Days": "7" },
  },
  {
    id: "EM-005", sender: "invoicing@psa-antwerp.be", subject: "D&D Invoice Ref DD-2026-00491",
    receivedAt: "2026-03-11T06:00:00Z", type: "D&D Invoice", status: "Pending Review", confidence: 72,
    extractedFields: { "Container": "MSCU4482910", "Charges": "€1,250", "Period": "Mar 9 - Mar 13 (projected)", "Terminal": "PSA Antwerp" },
  },
  {
    id: "EM-006", sender: "noreply@one-line.com", subject: "Booking ONEY9987654 Confirmed",
    receivedAt: "2026-03-07T10:00:00Z", type: "CRO", status: "Processed", confidence: 96,
    shipmentId: "SHP-2026-006",
    extractedFields: { "Booking Number": "ONEY9987654", "Vessel": "ONE Continuity", "POL": "Busan (KRPUS)", "POD": "Felixstowe (GBFXT)", "ETD": "2026-03-10", "ETA": "2026-04-12", "Container Type": "20' GP x1", "Free Time": "14 days", "Transshipment": "Colombo" },
  },
];

// ============================================================
// D&D Exposure Details
// ============================================================
export const ddExposureData = [
  { container: "MSCU4482910", shipmentId: "SHP-2026-004", port: "Antwerp", carrier: "MSC", freeTimeDays: 7, daysUsed: 5, daysRemaining: 2, dailyRate: 250, projectedCost: 1250, status: "at_risk" as const, gateInDate: "2026-03-08", projectedGateOut: "2026-03-13" },
  { container: "MSKU9834210", shipmentId: "SHP-2026-001", port: "Rotterdam", carrier: "Maersk", freeTimeDays: 14, daysUsed: 0, daysRemaining: 14, dailyRate: 200, projectedCost: 0, status: "safe" as const, gateInDate: null, projectedGateOut: "2026-04-04" },
  { container: "MSKU9834211", shipmentId: "SHP-2026-001", port: "Rotterdam", carrier: "Maersk", freeTimeDays: 14, daysUsed: 0, daysRemaining: 14, dailyRate: 200, projectedCost: 0, status: "safe" as const, gateInDate: null, projectedGateOut: "2026-04-04" },
  { container: "HLXU2019384", shipmentId: "SHP-2026-002", port: "New York", carrier: "Hapag-Lloyd", freeTimeDays: 7, daysUsed: 0, daysRemaining: 7, dailyRate: 300, projectedCost: 0, status: "watch" as const, gateInDate: null, projectedGateOut: "2026-03-16" },
];

export const dashboardKPIs = {
  activeShipments: 5,
  containersInTransit: 8,
  onTimeRate: 76,
  avgTransitDays: 24,
  delayedShipments: 2,
  customsHolds: 1,
  totalDDExposure: 1250,
  alertsUnread: 3,
  emailsProcessedThisWeek: 7,
  vendorUpdatesToday: 4,
  carriersTracked: 6,
  tradelanesActive: 5,
};
