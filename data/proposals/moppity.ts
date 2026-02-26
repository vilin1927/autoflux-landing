// Moppity Vineyards — Data Intelligence Demo
// Realistic mock data for wine business reporting system

export const demoData = {
  user: {
    name: "Jason Brown",
    company: "Moppity Vineyards",
    role: "Managing Director",
  },
  assistant: {
    name: "Moppity Intelligence",
    greeting:
      "G'day Jason. I'm your data assistant for Moppity Vineyards — connected to Vinsight, Xero, Access sales data, and your inventory sheets.\n\nEvery number I give you is pulled directly from computed views in the central database. No guesswork.\n\nTry asking me:\n• \"Which wines are at stockout risk?\"\n• \"What are my highest margin wines?\"\n• \"What if Hilltops grape price goes up 15%?\"",
  },
  suggestedQuestions: [
    {
      category: "Margin & Performance",
      questions: [
        "What are my highest margin wines?",
        "How is the Lock & Key range performing?",
        "Show me sales velocity this quarter",
      ],
    },
    {
      category: "Inventory & Production",
      questions: [
        "Which wines are at stockout risk?",
        "What are the bottling recommendations?",
        "Show inventory cover by channel",
      ],
    },
    {
      category: "Scenarios & What-Ifs",
      questions: [
        "What if Hilltops grape price goes up 15%?",
        "Model a 10% discount on Lock & Key wholesale",
        "Impact of shifting 20% wholesale to DTC?",
      ],
    },
  ],
};

export const kpis = {
  mtdRevenue: 187420,
  mtdCasesSold: 1243,
  avgGPMargin: 42.3,
  inventoryValue: 2140000,
  changes: {
    revenue: 8.2,
    cases: 5.7,
    margin: -1.4,
    inventory: 3.1,
  },
};

export interface SKU {
  id: string;
  name: string;
  range: string;
  variety: string;
  vintage: number;
  pricePerCase: number;
  casesInStock: number;
  monthlySalesVelocity: number;
  coverMonths: number;
  accountingCOGS: number;
  economicCOGS: number;
  gpAccounting: number;
  gpEconomic: number;
  channels: {
    cellarDoor: { stock: number; velocity: number; cover: number };
    wholesale: { stock: number; velocity: number; cover: number };
    export: { stock: number; velocity: number; cover: number };
    online: { stock: number; velocity: number; cover: number };
  };
}

export const skus: SKU[] = [
  {
    id: "LK-SHZ-23",
    name: "Lock & Key Shiraz 2023",
    range: "Lock & Key",
    variety: "Shiraz",
    vintage: 2023,
    pricePerCase: 120,
    casesInStock: 2840,
    monthlySalesVelocity: 380,
    coverMonths: 7.5,
    accountingCOGS: 62,
    economicCOGS: 68,
    gpAccounting: 48.3,
    gpEconomic: 43.3,
    channels: {
      cellarDoor: { stock: 420, velocity: 85, cover: 4.9 },
      wholesale: { stock: 1650, velocity: 210, cover: 7.9 },
      export: { stock: 480, velocity: 55, cover: 8.7 },
      online: { stock: 290, velocity: 30, cover: 9.7 },
    },
  },
  {
    id: "LK-CHD-23",
    name: "Lock & Key Chardonnay 2023",
    range: "Lock & Key",
    variety: "Chardonnay",
    vintage: 2023,
    pricePerCase: 110,
    casesInStock: 1920,
    monthlySalesVelocity: 290,
    coverMonths: 6.6,
    accountingCOGS: 58,
    economicCOGS: 63,
    gpAccounting: 47.3,
    gpEconomic: 42.7,
    channels: {
      cellarDoor: { stock: 310, velocity: 65, cover: 4.8 },
      wholesale: { stock: 1100, velocity: 160, cover: 6.9 },
      export: { stock: 320, velocity: 40, cover: 8.0 },
      online: { stock: 190, velocity: 25, cover: 7.6 },
    },
  },
  {
    id: "LK-RIE-24",
    name: "Lock & Key Riesling 2024",
    range: "Lock & Key",
    variety: "Riesling",
    vintage: 2024,
    pricePerCase: 100,
    casesInStock: 3100,
    monthlySalesVelocity: 240,
    coverMonths: 12.9,
    accountingCOGS: 52,
    economicCOGS: 58,
    gpAccounting: 48.0,
    gpEconomic: 42.0,
    channels: {
      cellarDoor: { stock: 380, velocity: 50, cover: 7.6 },
      wholesale: { stock: 1800, velocity: 130, cover: 13.8 },
      export: { stock: 620, velocity: 35, cover: 17.7 },
      online: { stock: 300, velocity: 25, cover: 12.0 },
    },
  },
  {
    id: "ES-SHZ-22",
    name: "Estate Shiraz 2022",
    range: "Estate",
    variety: "Shiraz",
    vintage: 2022,
    pricePerCase: 180,
    casesInStock: 860,
    monthlySalesVelocity: 145,
    coverMonths: 5.9,
    accountingCOGS: 78,
    economicCOGS: 89,
    gpAccounting: 56.7,
    gpEconomic: 50.6,
    channels: {
      cellarDoor: { stock: 220, velocity: 45, cover: 4.9 },
      wholesale: { stock: 380, velocity: 65, cover: 5.8 },
      export: { stock: 160, velocity: 25, cover: 6.4 },
      online: { stock: 100, velocity: 10, cover: 10.0 },
    },
  },
  {
    id: "ES-CAB-22",
    name: "Estate Cabernet Sauvignon 2022",
    range: "Estate",
    variety: "Cabernet Sauvignon",
    vintage: 2022,
    pricePerCase: 170,
    casesInStock: 520,
    monthlySalesVelocity: 110,
    coverMonths: 4.7,
    accountingCOGS: 74,
    economicCOGS: 82,
    gpAccounting: 56.5,
    gpEconomic: 51.8,
    channels: {
      cellarDoor: { stock: 130, velocity: 30, cover: 4.3 },
      wholesale: { stock: 240, velocity: 50, cover: 4.8 },
      export: { stock: 100, velocity: 20, cover: 5.0 },
      online: { stock: 50, velocity: 10, cover: 5.0 },
    },
  },
  {
    id: "ES-CHD-23",
    name: "Estate Chardonnay 2023",
    range: "Estate",
    variety: "Chardonnay",
    vintage: 2023,
    pricePerCase: 160,
    casesInStock: 680,
    monthlySalesVelocity: 125,
    coverMonths: 5.4,
    accountingCOGS: 70,
    economicCOGS: 76,
    gpAccounting: 56.3,
    gpEconomic: 52.5,
    channels: {
      cellarDoor: { stock: 180, velocity: 40, cover: 4.5 },
      wholesale: { stock: 310, velocity: 55, cover: 5.6 },
      export: { stock: 120, velocity: 20, cover: 6.0 },
      online: { stock: 70, velocity: 10, cover: 7.0 },
    },
  },
  {
    id: "RS-SHZ-21",
    name: "Reserve Shiraz 2021",
    range: "Reserve",
    variety: "Shiraz",
    vintage: 2021,
    pricePerCase: 320,
    casesInStock: 280,
    monthlySalesVelocity: 35,
    coverMonths: 8.0,
    accountingCOGS: 118,
    economicCOGS: 138,
    gpAccounting: 63.1,
    gpEconomic: 56.9,
    channels: {
      cellarDoor: { stock: 90, velocity: 12, cover: 7.5 },
      wholesale: { stock: 110, velocity: 15, cover: 7.3 },
      export: { stock: 50, velocity: 5, cover: 10.0 },
      online: { stock: 30, velocity: 3, cover: 10.0 },
    },
  },
  {
    id: "RS-RIE-23",
    name: "Reserve Riesling 2023",
    range: "Reserve",
    variety: "Riesling",
    vintage: 2023,
    pricePerCase: 280,
    casesInStock: 340,
    monthlySalesVelocity: 40,
    coverMonths: 8.5,
    accountingCOGS: 105,
    economicCOGS: 120,
    gpAccounting: 62.5,
    gpEconomic: 57.1,
    channels: {
      cellarDoor: { stock: 100, velocity: 14, cover: 7.1 },
      wholesale: { stock: 140, velocity: 16, cover: 8.8 },
      export: { stock: 60, velocity: 6, cover: 10.0 },
      online: { stock: 40, velocity: 4, cover: 10.0 },
    },
  },
  {
    id: "TB-PNR-23",
    name: "Tumbarumba Pinot Noir 2023",
    range: "Estate",
    variety: "Pinot Noir",
    vintage: 2023,
    pricePerCase: 200,
    casesInStock: 190,
    monthlySalesVelocity: 85,
    coverMonths: 2.2,
    accountingCOGS: 92,
    economicCOGS: 104,
    gpAccounting: 54.0,
    gpEconomic: 48.0,
    channels: {
      cellarDoor: { stock: 60, velocity: 28, cover: 2.1 },
      wholesale: { stock: 80, velocity: 38, cover: 2.1 },
      export: { stock: 30, velocity: 12, cover: 2.5 },
      online: { stock: 20, velocity: 7, cover: 2.9 },
    },
  },
];

export interface BlendComponent {
  batchId: string;
  grape: string;
  region: string;
  percentage: number;
  tonnes: number;
  accountingPricePerTonne: number;
  economicPricePerTonne: number;
  accountingCost: number;
  economicCost: number;
}

export interface Traceability {
  skuId: string;
  skuName: string;
  blendName: string;
  vintage: number;
  casesProduced: number;
  components: BlendComponent[];
  processingPerCase: number;
  packagingPerCase: number;
  totalAccountingCOGS: number;
  totalEconomicCOGS: number;
  pricePerCase: number;
}

export const traceabilityData: Record<string, Traceability> = {
  "ES-SHZ-22": {
    skuId: "ES-SHZ-22",
    skuName: "Estate Shiraz 2022",
    blendName: "Estate Shiraz Blend V22",
    vintage: 2022,
    casesProduced: 1800,
    components: [
      {
        batchId: "HS-22-01",
        grape: "Shiraz",
        region: "Hilltops",
        percentage: 85,
        tonnes: 12.0,
        accountingPricePerTonne: 1800,
        economicPricePerTonne: 2000,
        accountingCost: 21600,
        economicCost: 24000,
      },
      {
        batchId: "HC-22-03",
        grape: "Cabernet Sauvignon",
        region: "Hilltops",
        percentage: 10,
        tonnes: 1.5,
        accountingPricePerTonne: 1600,
        economicPricePerTonne: 1800,
        accountingCost: 2400,
        economicCost: 2700,
      },
      {
        batchId: "TS-22-01",
        grape: "Shiraz",
        region: "Tumbarumba",
        percentage: 5,
        tonnes: 0.8,
        accountingPricePerTonne: 2200,
        economicPricePerTonne: 2400,
        accountingCost: 1760,
        economicCost: 1920,
      },
    ],
    processingPerCase: 32,
    packagingPerCase: 13,
    totalAccountingCOGS: 78,
    totalEconomicCOGS: 89,
    pricePerCase: 180,
  },
  "RS-SHZ-21": {
    skuId: "RS-SHZ-21",
    skuName: "Reserve Shiraz 2021",
    blendName: "Reserve Shiraz Blend V21",
    vintage: 2021,
    casesProduced: 600,
    components: [
      {
        batchId: "HS-21-R1",
        grape: "Shiraz",
        region: "Hilltops",
        percentage: 80,
        tonnes: 4.8,
        accountingPricePerTonne: 2200,
        economicPricePerTonne: 2500,
        accountingCost: 10560,
        economicCost: 12000,
      },
      {
        batchId: "TS-21-R1",
        grape: "Shiraz",
        region: "Tumbarumba",
        percentage: 15,
        tonnes: 0.9,
        accountingPricePerTonne: 2800,
        economicPricePerTonne: 3000,
        accountingCost: 2520,
        economicCost: 2700,
      },
      {
        batchId: "HC-21-R2",
        grape: "Cabernet Sauvignon",
        region: "Hilltops",
        percentage: 5,
        tonnes: 0.3,
        accountingPricePerTonne: 2000,
        economicPricePerTonne: 2200,
        accountingCost: 600,
        economicCost: 660,
      },
    ],
    processingPerCase: 48,
    packagingPerCase: 18,
    totalAccountingCOGS: 118,
    totalEconomicCOGS: 138,
    pricePerCase: 320,
  },
  "TB-PNR-23": {
    skuId: "TB-PNR-23",
    skuName: "Tumbarumba Pinot Noir 2023",
    blendName: "Tumbarumba Pinot Noir V23",
    vintage: 2023,
    casesProduced: 450,
    components: [
      {
        batchId: "TP-23-01",
        grape: "Pinot Noir",
        region: "Tumbarumba",
        percentage: 100,
        tonnes: 5.4,
        accountingPricePerTonne: 2600,
        economicPricePerTonne: 2900,
        accountingCost: 14040,
        economicCost: 15660,
      },
    ],
    processingPerCase: 38,
    packagingPerCase: 14,
    totalAccountingCOGS: 92,
    totalEconomicCOGS: 104,
    pricePerCase: 200,
  },
  "LK-SHZ-23": {
    skuId: "LK-SHZ-23",
    skuName: "Lock & Key Shiraz 2023",
    blendName: "Lock & Key Shiraz Blend V23",
    vintage: 2023,
    casesProduced: 4200,
    components: [
      {
        batchId: "HS-23-04",
        grape: "Shiraz",
        region: "Hilltops",
        percentage: 95,
        tonnes: 28.0,
        accountingPricePerTonne: 1400,
        economicPricePerTonne: 1600,
        accountingCost: 39200,
        economicCost: 44800,
      },
      {
        batchId: "TC-23-02",
        grape: "Cabernet Sauvignon",
        region: "Tumbarumba",
        percentage: 5,
        tonnes: 1.5,
        accountingPricePerTonne: 1900,
        economicPricePerTonne: 2100,
        accountingCost: 2850,
        economicCost: 3150,
      },
    ],
    processingPerCase: 20,
    packagingPerCase: 8,
    totalAccountingCOGS: 62,
    totalEconomicCOGS: 68,
    pricePerCase: 120,
  },
};

export const alerts = [
  {
    id: 1,
    type: "stockout" as const,
    severity: "critical" as const,
    title: "Tumbarumba Pinot Noir — 2.2 months cover",
    description:
      "Below 3-month minimum. At current velocity (85 cases/mo), stockout by mid-April. Wholesale channel critical at 2.1 months.",
    sku: "TB-PNR-23",
  },
  {
    id: 2,
    type: "margin" as const,
    severity: "warning" as const,
    title: "Lock & Key margin compression — GP down 1.4pp MTD",
    description:
      "Driven by increased wholesale discount depth. Wholesale channel GP at 41.2% vs 44.8% target.",
    sku: "LK-SHZ-23",
  },
  {
    id: 3,
    type: "reconciliation" as const,
    severity: "info" as const,
    title: "Vinsight ↔ Xero reconciliation complete",
    description:
      "Feb batch: 47 line items matched, 0 discrepancies. Inventory value delta: $0. Last sync: 2h ago.",
    sku: null,
  },
  {
    id: 4,
    type: "production" as const,
    severity: "warning" as const,
    title: "Estate Cabernet — approaching bottling window",
    description:
      "Bulk stock: 2,400L remaining. Based on 4.7 months cover and 110 cases/mo velocity, recommend bottling 600 cases by mid-March.",
    sku: "ES-CAB-22",
  },
];

export const channelMix = [
  { channel: "Wholesale", revenue: 89200, pct: 47.6, cases: 605 },
  { channel: "Cellar Door", revenue: 52400, pct: 28.0, cases: 369 },
  { channel: "Export", revenue: 28600, pct: 15.3, cases: 178 },
  { channel: "Online DTC", revenue: 17220, pct: 9.2, cases: 91 },
];

export const velocityTrend = [
  { month: "Sep", cases: 1080 },
  { month: "Oct", cases: 1150 },
  { month: "Nov", cases: 1290 },
  { month: "Dec", cases: 1410 },
  { month: "Jan", cases: 1190 },
  { month: "Feb", cases: 1243 },
];

// AI Chat conversations
export const sampleConversations = {
  margins: {
    thinking: [
      "Querying: contribution_margin view...",
      "Joining SKU prices with accounting COGS...",
      "Ranking by gross profit percentage...",
    ],
    response: {
      text: "Here are your wines ranked by contribution margin (accounting basis). Reserve wines lead on GP%, but Lock & Key drives the most absolute GP due to volume:",
      data: {
        type: "margin_table",
        rows: [
          { sku: "Reserve Shiraz 2021", price: 320, cogs: 118, gp: 202, gpPct: 63.1 },
          { sku: "Reserve Riesling 2023", price: 280, cogs: 105, gp: 175, gpPct: 62.5 },
          { sku: "Estate Shiraz 2022", price: 180, cogs: 78, gp: 102, gpPct: 56.7 },
          { sku: "Estate Cab Sauv 2022", price: 170, cogs: 74, gp: 96, gpPct: 56.5 },
          { sku: "Estate Chardonnay 2023", price: 160, cogs: 70, gp: 90, gpPct: 56.3 },
          { sku: "Tumbarumba Pinot 2023", price: 200, cogs: 92, gp: 108, gpPct: 54.0 },
          { sku: "Lock & Key Shiraz 2023", price: 120, cogs: 62, gp: 58, gpPct: 48.3 },
          { sku: "Lock & Key Chard 2023", price: 110, cogs: 58, gp: 52, gpPct: 47.3 },
          { sku: "Lock & Key Riesling 2024", price: 100, cogs: 52, gp: 48, gpPct: 48.0 },
        ],
      },
      followUp:
        "Want to see the economic COGS comparison? That'll show the impact of stated grape prices vs what was actually paid.",
    },
  },
  stockout: {
    thinking: [
      "Checking inventory_cover view (last refresh: 2h ago)...",
      "Filtering SKUs below 3-month cover target...",
      "Calculating estimated stockout dates from velocity...",
    ],
    response: {
      text: "Found **3 SKUs** below your 3-month minimum cover target. The Tumbarumba Pinot is critical — at current velocity it stocks out in 9 weeks:",
      data: {
        type: "stockout_alerts",
        items: [
          {
            sku: "Tumbarumba Pinot Noir 2023",
            cover: 2.2,
            velocity: 85,
            stock: 190,
            estStockout: "Mid-April 2026",
            worstChannel: "Wholesale (2.1 mo)",
          },
          {
            sku: "Estate Cabernet Sauv 2022",
            cover: 4.7,
            velocity: 110,
            stock: 520,
            estStockout: "Late June 2026",
            worstChannel: "Cellar Door (4.3 mo)",
          },
          {
            sku: "Estate Chardonnay 2023",
            cover: 5.4,
            velocity: 125,
            stock: 680,
            estStockout: "Late July 2026",
            worstChannel: "Cellar Door (4.5 mo)",
          },
        ],
      },
      followUp:
        "The Pinot Noir is sourced 100% from Tumbarumba — next vintage isn't available until May. I can generate bottling recommendations for the Estate wines from bulk stock.",
    },
  },
  scenario: {
    thinking: [
      "Loading current grape price assumptions...",
      "Identifying all batches sourced from Hilltops region...",
      "Recalculating economic COGS per case for 7 affected SKUs...",
      "Computing annual GP impact at current velocity...",
    ],
    response: {
      text: "A **15% increase** in Hilltops grape prices would impact **7 of your 9 SKUs**. Here's the margin shift on economic basis:",
      data: {
        type: "scenario_comparison",
        scenarioLabel: "Hilltops Grape +15%",
        rows: [
          { sku: "Lock & Key Shiraz", currentGP: 43.3, newGP: 38.9, delta: -4.4, annualImpact: -20064 },
          { sku: "Lock & Key Chard", currentGP: 42.7, newGP: 38.5, delta: -4.2, annualImpact: -14616 },
          { sku: "Lock & Key Riesling", currentGP: 42.0, newGP: 37.8, delta: -4.2, annualImpact: -12096 },
          { sku: "Estate Shiraz", currentGP: 50.6, newGP: 47.1, delta: -3.5, annualImpact: -6090 },
          { sku: "Estate Cab Sauv", currentGP: 51.8, newGP: 48.4, delta: -3.4, annualImpact: -4488 },
          { sku: "Estate Chardonnay", currentGP: 52.5, newGP: 49.2, delta: -3.3, annualImpact: -4950 },
          { sku: "Reserve Shiraz", currentGP: 56.9, newGP: 54.1, delta: -2.8, annualImpact: -1176 },
        ],
        totalAnnualImpact: -63480,
      },
      followUp:
        "Total annual GP impact: **-$63,480**. The Lock & Key range takes the biggest hit because of volume. Want me to model price increases needed to maintain current margins?",
    },
  },
  velocity: {
    thinking: [
      "Pulling rolling 3-month sales from Access DB...",
      "Calculating velocity by SKU...",
      "Comparing Q4 vs current quarter...",
    ],
    response: {
      text: "Here's the current sales velocity by SKU (cases/month), with quarter-over-quarter change. Lock & Key Shiraz and Estate Chardonnay are your growth stories:",
      data: {
        type: "velocity_chart",
        rows: [
          { sku: "LK Shiraz", velocity: 380, prevVelocity: 340, change: 11.8 },
          { sku: "LK Chard", velocity: 290, prevVelocity: 275, change: 5.5 },
          { sku: "LK Riesling", velocity: 240, prevVelocity: 250, change: -4.0 },
          { sku: "ES Shiraz", velocity: 145, prevVelocity: 135, change: 7.4 },
          { sku: "ES Cab Sauv", velocity: 110, prevVelocity: 115, change: -4.3 },
          { sku: "ES Chard", velocity: 125, prevVelocity: 105, change: 19.0 },
          { sku: "RS Shiraz", velocity: 35, prevVelocity: 32, change: 9.4 },
          { sku: "RS Riesling", velocity: 40, prevVelocity: 38, change: 5.3 },
          { sku: "TB Pinot", velocity: 85, prevVelocity: 70, change: 21.4 },
        ],
      },
      followUp:
        "The Tumbarumba Pinot velocity is up 21% — which is exactly why it's running low on stock. Estate Chardonnay up 19% too. Want me to check if inventory supports continued growth?",
    },
  },
};
