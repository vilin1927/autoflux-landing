// Proposal data for eToll AI Assistant

export const proposalData = {
  client: {
    name: "eToll Zambia",
    contact: "Client",
    location: "Zambia",
  },
  project: {
    title: "AI-Powered Business Intelligence Assistant",
    subtitle: "Natural language insights for fleet management",
    description:
      "A branded AI assistant that helps fleet managers interact with their data through natural language—asking questions, generating reports, spotting trends, and surfacing insights they might otherwise miss.",
  },
  stats: [
    { value: "$4,500", label: "Fixed Price" },
    { value: "3-4", label: "Weeks Delivery" },
  ],
  approach: [
    {
      title: "Read-Only Data Connectors",
      description:
        "Lambda functions with IAM roles connecting to MySQL. No write permissions—literally can't modify data even if something breaks.",
      icon: "database",
    },
    {
      title: "Amazon Bedrock + Claude",
      description:
        "Since your team works in AWS, this makes handover easier. Production-ready AI with enterprise security.",
      icon: "brain",
    },
    {
      title: "Vector Knowledge Base",
      description:
        "Toll pricing, plaza locations, routes—all queryable. Your team can update without calling a developer.",
      icon: "book-open",
    },
    {
      title: "Query Logging & Analytics",
      description:
        "Every question logged with timestamp, user, data source. Dashboard to see gaps and improve over time.",
      icon: "chart-bar",
    },
    {
      title: "Graceful Escalation",
      description:
        "'Let me escalate this to customer service.' Clean, professional, and flags for knowledge base updates.",
      icon: "message-circle",
    },
    {
      title: "Branded AI Experience",
      description:
        "Custom name, personality, and UI. Guided prompts and suggested questions so users know what to ask.",
      icon: "sparkles",
    },
  ],
  timeline: [
    {
      phase: "Week 1-2",
      title: "Build Phase",
      tasks: [
        "AWS infrastructure setup",
        "Read-only MySQL connectors",
        "Bedrock + Claude integration",
        "Knowledge base population",
        "Query logging system",
      ],
    },
    {
      phase: "Week 3",
      title: "Integration",
      tasks: [
        "API endpoint integration",
        "Chat UI implementation",
        "Web search fallback",
        "Escalation handling",
        "Admin interface",
      ],
    },
    {
      phase: "Week 4",
      title: "Test & Deploy",
      tasks: [
        "Security validation",
        "UAT with your team",
        "Performance testing",
        "Documentation",
        "Handoff & training",
      ],
    },
  ],
  techStack: [
    { name: "Amazon Bedrock", category: "AI Platform" },
    { name: "Claude", category: "LLM" },
    { name: "AWS Lambda", category: "Compute" },
    { name: "Amazon RDS", category: "Database" },
    { name: "API Gateway", category: "API" },
    { name: "S3 / Vector Store", category: "Knowledge Base" },
    { name: "CloudWatch", category: "Monitoring" },
    { name: "React", category: "Frontend" },
  ],
  pricing: {
    amount: "$4,500",
    hours: "Flat rate",
    deliverables: [
      "Working AI system integrated with your AWS environment",
      "Read-only MySQL and API connectors",
      "Populated knowledge base (pricing, plazas, routes)",
      "Query logging with admin dashboard",
      "Branded AI chat interface",
      "Escalation handling system",
      "Admin interface for knowledge base updates",
      "Full documentation + team training session",
    ],
  },
};

// Demo data for AI Assistant
export const demoData = {
  appName: "Toli",
  tagline: "Your eToll AI Assistant",
  assistant: {
    name: "Toli",
    avatar: "/demos/etoll/toli-avatar.png",
    greeting: "Hello! I'm Toli, your intelligent assistant for eToll. I can help you analyze your fleet's toll expenses, spot trends, plan trips, and generate reports. What would you like to know?",
  },
  user: {
    company: "Copper Mining Corp",
    accountBalance: "K 526,153.00",
    totalVehicles: 617,
    clientAccounts: 1,
  },
  suggestedQuestions: [
    {
      category: "Spending",
      questions: [
        "What was my total spend this month?",
        "Compare this month's spending to last month",
        "Which day had the highest toll expenses?",
      ],
    },
    {
      category: "Vehicles",
      questions: [
        "Which vehicle uses the most tolls?",
        "Show me my top 5 highest spending vehicles",
        "Which vehicles have no activity in the last 30 days?",
      ],
    },
    {
      category: "Trip Planning",
      questions: [
        "How much will it cost to travel from Lusaka to Chingola?",
        "What toll plazas are between Ndola and Livingstone?",
        "Calculate trip costs for 3 heavy trucks to Solwezi",
      ],
    },
    {
      category: "Anomalies",
      questions: [
        "Show me suspicious transactions this week",
        "Are there any unusual spending patterns?",
        "Flag transactions outside normal operating hours",
      ],
    },
  ],
  tollPlazas: [
    { name: "Shimabala", code: "SHI", location: "Lusaka South" },
    { name: "Mumbwa", code: "MBW", location: "Central Province" },
    { name: "Kapiri Mposhi", code: "KPM", location: "Central Province" },
    { name: "Ndola", code: "NDL", location: "Copperbelt" },
    { name: "Kitwe", code: "KTW", location: "Copperbelt" },
    { name: "Chingola", code: "CHN", location: "Copperbelt" },
    { name: "Solwezi", code: "SLW", location: "North-Western" },
    { name: "Livingstone", code: "LIV", location: "Southern" },
  ],
  vehicleClasses: [
    { type: "Private", rate: 20 },
    { type: "Bus", rate: 40 },
    { type: "Light", rate: 50 },
    { type: "Heavy", rate: 250 },
    { type: "Abnormal Load", rate: 800 },
  ],
};

// Sample conversation flows for the demo
export const sampleConversations = {
  spending: {
    question: "What was my total spend this month?",
    thinking: ["Querying transaction database...", "Calculating MTD totals...", "Comparing to previous period..."],
    response: {
      text: "Your total toll expenses for January 2025 are **K 35,410.00** across **66 transactions**.",
      data: {
        type: "spending_summary",
        mtdSpend: 35410,
        mtdTransactions: 66,
        changeFromLastMonth: -98.0,
        topPlazas: [
          { name: "Shimabala", amount: 12500, transactions: 25 },
          { name: "Kapiri Mposhi", amount: 9800, transactions: 18 },
          { name: "Ndola", amount: 7110, transactions: 15 },
          { name: "Mumbwa", amount: 6000, transactions: 8 },
        ],
      },
      followUp: "Would you like me to break this down by vehicle or compare it to previous months?",
    },
  },
  topVehicles: {
    question: "Which vehicle uses the most tolls?",
    thinking: ["Analyzing vehicle transaction history...", "Ranking by toll frequency and cost..."],
    response: {
      text: "Your highest toll-using vehicle is **AGC2405** with K 8,450 in expenses this month.",
      data: {
        type: "vehicle_ranking",
        vehicles: [
          { registration: "AGC2405", amount: 8450, trips: 34, class: "Heavy" },
          { registration: "ACM7280", amount: 6200, trips: 28, class: "Heavy" },
          { registration: "BAZ2140", amount: 5100, trips: 22, class: "Heavy" },
          { registration: "CAC551", amount: 4800, trips: 45, class: "Light" },
          { registration: "AGC2592", amount: 3900, trips: 18, class: "Heavy" },
        ],
      },
      followUp: "Want me to show the routes these vehicles typically take?",
    },
  },
  tripPlanning: {
    question: "How much will it cost to travel from Lusaka to Chingola?",
    thinking: ["Identifying route toll plazas...", "Calculating costs by vehicle class..."],
    clarification: {
      text: "I can calculate that for you. What types of vehicles will be making this trip?",
      options: ["Private vehicles", "Light trucks", "Heavy trucks", "Buses", "Mixed fleet"],
    },
    response: {
      text: "For **3 heavy trucks** traveling from Lusaka to Chingola:",
      data: {
        type: "trip_estimate",
        route: ["Shimabala", "Mumbwa", "Kapiri Mposhi", "Ndola", "Chingola"],
        plazaCount: 5,
        costPerVehicle: 1250,
        totalVehicles: 3,
        totalCost: 3750,
        breakdown: [
          { plaza: "Shimabala", costPerVehicle: 250 },
          { plaza: "Mumbwa", costPerVehicle: 250 },
          { plaza: "Kapiri Mposhi", costPerVehicle: 250 },
          { plaza: "Ndola", costPerVehicle: 250 },
          { plaza: "Chingola", costPerVehicle: 250 },
        ],
      },
      followUp: "Would you like me to export this estimate as a PDF?",
    },
  },
  anomalies: {
    question: "Show me suspicious transactions this week",
    thinking: ["Scanning transaction patterns...", "Applying anomaly detection rules...", "Flagging outliers..."],
    response: {
      text: "I found **3 transactions** that appear unusual this week:",
      data: {
        type: "anomalies",
        alerts: [
          {
            id: 1,
            vehicle: "BAZ2140",
            plaza: "Shimabala",
            time: "02:34 AM",
            date: "Jan 28, 2025",
            reason: "Transaction outside normal operating hours (usual: 6AM-8PM)",
            amount: 250,
          },
          {
            id: 2,
            vehicle: "AGC2405",
            plaza: "Ndola",
            time: "11:15 AM",
            date: "Jan 29, 2025",
            reason: "Duplicate transaction within 5 minutes",
            amount: 500,
          },
          {
            id: 3,
            vehicle: "Unknown",
            plaza: "Kitwe",
            time: "3:45 PM",
            date: "Jan 30, 2025",
            reason: "Unregistered vehicle using fleet card #0005267",
            amount: 250,
          },
        ],
      },
      followUp: "Would you like me to generate a detailed fraud report for these transactions?",
    },
  },
  escalation: {
    question: "What documents do I need for cross-border travel to Zimbabwe?",
    thinking: ["Searching knowledge base...", "Query not found in knowledge base..."],
    response: {
      text: "I don't have detailed cross-border documentation requirements in my knowledge base yet. Let me escalate this to customer service and get back to you with accurate information.",
      data: {
        type: "escalation",
        ticketId: "ESC-2025-0142",
        estimatedResponse: "Within 24 hours",
      },
      followUp: "Is there anything else I can help you with regarding your toll account?",
    },
  },
};

// Dashboard metrics for demo
export const dashboardMetrics = {
  mtdTransactions: 66,
  mtdExpense: 35410,
  todayTransactions: 66,
  todayExpense: 35410,
  changeFromLastMonth: {
    transactions: -98.28,
    expense: -98.0,
  },
  changeFromYesterday: {
    transactions: -32.65,
    expense: -30.96,
  },
  accountSummary: {
    balance: 526153,
    clientAccounts: 1,
    cardsIssued: 617,
  },
  topVehicles: [
    { registration: "AGC2405", usage: 1850 },
    { registration: "AGC2592", usage: 1620 },
    { registration: "ACM7280", usage: 1480 },
    { registration: "BAZ2140", usage: 1350 },
    { registration: "CAC551", usage: 1200 },
  ],
  topCards: [
    { cardNumber: "0005093574736", usage: 1950 },
    { cardNumber: "0005028497753", usage: 1780 },
    { cardNumber: "0005033052066", usage: 1650 },
    { cardNumber: "0005028497738", usage: 1520 },
    { cardNumber: "0005034436988", usage: 1380 },
  ],
};
