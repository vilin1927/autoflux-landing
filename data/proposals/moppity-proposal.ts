// Proposal data for Moppity Vineyards (Jason Brown)
// Data Intelligence Platform — March 2026

export const proposalData = {
  client: {
    name: "Moppity Vineyards",
    contact: "Jason Brown",
    role: "Managing Director",
    location: "Young, NSW, Australia",
  },
  project: {
    title: "Data Intelligence Platform",
    subtitle: "From 4 systems to one source of truth",
    description:
      "Connect Vinsight, Xero, Access, and Sheets into a unified data layer with real-time dashboards, margin analysis, and an AI assistant that answers questions about your business.",
  },
  pricing: {
    total: 2800,
    milestones: [
      {
        number: 1,
        name: "Data Foundation",
        price: 800,
        duration: "7 days",
        description: "All systems connected, data flowing, admin panel live",
      },
      {
        number: 2,
        name: "Business Intelligence",
        price: 1400,
        duration: "10-14 days",
        description: "Full dashboard with margins, inventory, velocity, scenarios",
      },
      {
        number: 3,
        name: "AI Layer + Handoff",
        price: 600,
        duration: "5-7 days",
        description: "Chat interface, documentation, 10 days free support",
      },
    ],
    totalDuration: "22-28 days",
  },
  painPoints: [
    {
      icon: "folder-open",
      title: "Data lives in 4 different systems",
      description:
        "Vinsight for production, Xero for accounting, Access for 5 years of sales, Sheets for manual tracking. Nothing talks to each other.",
      color: "red",
    },
    {
      icon: "calculator",
      title: "Simple questions take hours to answer",
      description:
        '"What\'s my margin on Lock & Key Shiraz?" requires opening 3 systems, exporting data, combining in Excel, and calculating manually.',
      color: "red",
    },
    {
      icon: "alert-triangle",
      title: "Numbers don't match between systems",
      description:
        "DWS says you have 120 cases, Vinsight says 108. Which is right? Nobody knows without manual reconciliation.",
      color: "red",
    },
    {
      icon: "coins",
      title: "Can't model scenarios without rebuilding spreadsheets",
      description:
        '"What if Hilltops grape prices go up 15%?" Every what-if question means hours of manual work.',
      color: "red",
    },
  ],
  solutions: [
    {
      icon: "database",
      title: "One central database",
      description:
        "All data flows into Postgres automatically. Vinsight, Xero, Access, Sheets — synced and normalized.",
      color: "green",
    },
    {
      icon: "gauge",
      title: "Answers in seconds, not hours",
      description:
        "Open the dashboard, see your margins. Click a SKU, see inventory by channel. No exports, no spreadsheets.",
      color: "green",
    },
    {
      icon: "check-circle",
      title: "Automatic reconciliation",
      description:
        "System compares DWS vs Vinsight every night. Discrepancies show up as alerts. No surprises.",
      color: "green",
    },
    {
      icon: "sparkles",
      title: "What-if scenarios in one click",
      description:
        'Slide grape prices up 15%, see margin impact across all SKUs instantly. "What if we shift 20% to DTC?" — answered.',
      color: "green",
    },
  ],
  dataFlow: {
    sources: [
      { name: "Vinsight", description: "Production, inventory, bulk wine", icon: "wine" },
      { name: "Xero", description: "Accounting, costs, invoices", icon: "receipt" },
      { name: "Access DB", description: "5 years sales history", icon: "database" },
      { name: "Sheets", description: "Manual tracking, notes", icon: "table" },
    ],
    outputs: [
      { name: "Contribution Margin", description: "GP by SKU, accounting vs economic" },
      { name: "Inventory Cover", description: "Months of stock by SKU/channel" },
      { name: "Sales Velocity", description: "Rolling 3/6/12 month trends" },
      { name: "Bottling Recs", description: "When and how much to bottle" },
      { name: "Scenario Modeling", description: "What-if price changes" },
    ],
  },
  milestones: [
    {
      number: 1,
      title: "Data Foundation",
      subtitle: "All systems connected, data flowing",
      duration: "7 days",
      price: 800,
      painSolved: "Data lives in 4 different systems",
      deliverables: [
        "Vinsight API connected — production, inventory, bulk wine data syncing",
        "Xero API connected — invoices, costs, chart of accounts syncing",
        "Access database connected — 5 years of sales history imported",
        "Google Sheets connected — manual tracking data syncing",
        "Central Postgres database running with normalized schema",
        "ETL pipelines with error handling and retry logic",
        "Schema documentation (what's where, how it connects)",
      ],
      whatYouSee: {
        title: "Admin Panel",
        description:
          "A live dashboard showing connection status for each system. Green checkmarks when synced, alerts if something fails. You can see exactly what data came in and when.",
        features: [
          "Connection status: Vinsight ✓ Xero ✓ Access ✓ Sheets ✓",
          "Last sync time for each source",
          "Row counts and data freshness indicators",
          "Error log if any sync fails",
        ],
      },
      definitionOfDone:
        "You open the admin panel, see all four sources showing green checkmarks, and can verify data is flowing by checking row counts against source systems.",
    },
    {
      number: 2,
      title: "Business Intelligence",
      subtitle: "Full dashboard with real answers",
      duration: "10-14 days",
      price: 1400,
      painSolved: "Simple questions take hours to answer",
      deliverables: [
        "SKU → Blend → Batch → Grape traceability model built",
        "Dual cost basis: Accounting COGS vs Economic COGS",
        "Contribution margin view by SKU and channel",
        "Inventory cover view (months of stock) by SKU and channel",
        "Sales velocity view — rolling 3/6/12 month by SKU",
        "Bottling recommendations based on cover targets + bulk stock",
        "DWS vs Vinsight reconciliation with discrepancy alerts",
        "Scenario modeling tool — adjust grape prices, see margin impact",
        "Power BI dashboard (or web dashboard) with all views",
      ],
      whatYouSee: {
        title: "Working Dashboard",
        description:
          "A real dashboard you can use immediately. Click a wine, see its margin. Filter by channel, see where you're selling. Toggle accounting vs economic view, see the difference.",
        features: [
          "Margin table: every SKU with price, COGS, GP%, ranked",
          "Inventory heatmap: red for low stock, green for healthy",
          "Velocity chart: which wines are trending up or down",
          "Scenario slider: drag grape price, watch margins update live",
          "Reconciliation alerts: DWS vs Vinsight mismatches flagged",
        ],
      },
      definitionOfDone:
        "You open the dashboard, click Lock & Key Shiraz, and see its margin, inventory by channel, and sales trend — all matching your source systems within 24 hours of data.",
    },
    {
      number: 3,
      title: "AI Layer + Handoff",
      subtitle: "Ask questions, get answers",
      duration: "5-7 days",
      price: 600,
      painSolved: "Can't get quick answers without digging through data",
      deliverables: [
        "AI chat interface embedded in dashboard",
        "Natural language queries against computed views",
        "Guardrails — AI only uses verified computed data, no guessing",
        "Sample prompts for common questions",
        "Full documentation — how to use, how it works, where data lives",
        "Video walkthrough of the system",
        "10 days free support after delivery",
      ],
      whatYouSee: {
        title: "AI Chat + Documentation",
        description:
          "Type 'Which wines need reordering?' and get a real answer with numbers. Ask 'What if Tumbarumba prices go up 10%?' and see the impact. All grounded in your actual data.",
        features: [
          "Chat interface: ask questions in plain English",
          "Grounded answers: every response shows the source view",
          "Follow-up suggestions: 'Want to see by channel?'",
          "Documentation portal: searchable how-to guides",
          "Support channel: 10 days of questions answered",
        ],
      },
      definitionOfDone:
        "You ask the AI 'What are my highest margin wines?' and it returns the correct ranked list matching the dashboard view. Documentation is complete. Support period begins.",
    },
  ],
  timeline: {
    total: "22-28 days",
    breakdown: [
      { days: "Day 1-7", focus: "Data Foundation", milestone: 1, description: "All 4 systems connected and syncing" },
      { days: "Day 8-14", focus: "Core Views + Dashboard", milestone: 2, description: "Margins, inventory, velocity live" },
      { days: "Day 15-21", focus: "Scenarios + Reconciliation", milestone: 2, description: "What-if tool, DWS reconciliation" },
      { days: "Day 22-28", focus: "AI Layer + Handoff", milestone: 3, description: "Chat interface, docs, support begins" },
    ],
  },
  support: {
    included: "10 days free support after final delivery",
    covers: [
      "Questions about how to use the system",
      "Bug fixes if something breaks",
      "Minor adjustments to views or dashboard",
      "Help interpreting data or results",
    ],
    notIncluded: [
      "New features (scoped separately)",
      "Additional data source integrations",
      "Major dashboard redesigns",
    ],
  },
  techStack: [
    { name: "Postgres", role: "Central database" },
    { name: "Python", role: "ETL pipelines" },
    { name: "Vinsight API", role: "Production/inventory data" },
    { name: "Xero API", role: "Accounting data" },
    { name: "Power BI / Web", role: "Dashboards" },
    { name: "Claude Sonnet 4.6", role: "AI queries ($3/M input, $15/M output tokens)" },
    { name: "Hetzner VPS", role: "Hosting (~$5/month)" },
  ],
  monthlyCosts: {
    note: "These are ongoing costs you'll pay directly to the service providers after the system is live:",
    items: [
      {
        name: "VPS Hosting",
        provider: "Hetzner / DigitalOcean",
        cost: "$10-20/month",
        description: "Cloud server to run the ETL pipelines and database",
      },
      {
        name: "Claude API",
        provider: "Anthropic",
        model: "Claude Sonnet 4.6",
        cost: "~$2-5/month",
        description: "AI queries against your data (pay per use)",
      },
      {
        name: "Domain (optional)",
        provider: "Any registrar",
        cost: "~$12/year",
        description: "If you want a custom URL like data.moppity.com.au",
      },
    ],
    total: "~$15-25/month ongoing",
  },
  nextSteps: [
    {
      step: 1,
      title: "Accept proposal",
      description: "Confirm scope and pricing works for you",
    },
    {
      step: 2,
      title: "Share access",
      description: "Vinsight, Xero, Access credentials (read-only) so I can start",
    },
    {
      step: 3,
      title: "I start building",
      description: "First milestone delivered in Week 1",
    },
  ],
};
