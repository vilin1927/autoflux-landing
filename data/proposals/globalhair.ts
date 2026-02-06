// Proposal data for GlobalHair Institute CMO Dashboard
// Demo prepared for Peter De Harder - February 2026

export const proposalData = {
  client: {
    name: "GlobalHair Institute",
    contact: "Peter De Harder",
    role: "CMO",
    location: "Netherlands",
  },
  project: {
    title: "CMO Dashboard for Social Media & Ads Management",
    subtitle: "Unified analytics and AI-powered insights for marketing operations",
    description:
      "A comprehensive dashboard that consolidates Meta, TikTok, and Google Ads data with CRM pipeline tracking, AI-generated ad copy suggestions, and real-time Telegram alerts for the marketing team.",
  },
  stats: [
    { value: "2 weeks", label: "Delivery" },
    { value: "All-in-One", label: "Platform" },
  ],
  approach: [
    {
      title: "Multi-Platform Ad Integration",
      description:
        "Connect Meta Ads, TikTok Ads, and Google Ads APIs to pull campaign performance, spend, and conversion data into a single dashboard.",
      icon: "chart-bar",
    },
    {
      title: "CRM Pipeline Sync",
      description:
        "Real-time sync with your CRM to track leads from ad click to consultation booked. See which campaigns drive actual appointments.",
      icon: "users",
    },
    {
      title: "AI Ad Copy Generation",
      description:
        "GPT-powered suggestions for ad copy based on your best-performing campaigns. Test variations faster.",
      icon: "sparkles",
    },
    {
      title: "Telegram Bot Alerts",
      description:
        "Instant notifications for budget thresholds, performance anomalies, and new high-value leads.",
      icon: "message-circle",
    },
    {
      title: "Chatbot Monitoring",
      description:
        "Track chatbot conversations, response times, and qualification rates. Identify drop-off points.",
      icon: "bot",
    },
    {
      title: "Custom Reporting",
      description:
        "Automated weekly/monthly reports with key metrics, insights, and AI-generated recommendations.",
      icon: "file-text",
    },
  ],
  techStack: [
    { name: "Next.js 14", category: "Frontend" },
    { name: "Supabase", category: "Database" },
    { name: "Meta Marketing API", category: "Ads" },
    { name: "TikTok Ads API", category: "Ads" },
    { name: "Google Ads API", category: "Ads" },
    { name: "Stripe", category: "Payments" },
    { name: "Telegraf", category: "Bot" },
    { name: "OpenAI GPT", category: "AI" },
  ],
  author: {
    name: "Vladimir Ilin",
    company: "AutoFlux",
    website: "https://autoflux.digital",
    date: "February 2026",
  },
};

// Demo data for CMO Dashboard
export const demoData = {
  appName: "GHI Marketing Hub",
  tagline: "Your Marketing Command Center",
  assistant: {
    name: "Luna",
    greeting: "Hi! I'm Luna, your AI marketing assistant. I can help you analyze campaign performance, generate ad copy ideas, and spot trends across your marketing channels. What would you like to know?",
  },
  overview: {
    totalSpend: 12847.50,
    totalLeads: 342,
    costPerLead: 37.56,
    consultationsBooked: 89,
    conversionRate: 26.0,
  },
  platforms: {
    meta: {
      name: "Meta Ads",
      spend: 6420.00,
      impressions: 458000,
      clicks: 12400,
      leads: 186,
      cpl: 34.52,
      roas: 4.2,
    },
    tiktok: {
      name: "TikTok Ads",
      spend: 4127.50,
      impressions: 892000,
      clicks: 28400,
      leads: 124,
      cpl: 33.28,
      roas: 3.8,
    },
    google: {
      name: "Google Ads",
      spend: 2300.00,
      impressions: 125000,
      clicks: 4200,
      leads: 32,
      cpl: 71.88,
      roas: 2.1,
    },
  },
  topCampaigns: [
    {
      name: "FUE Transformation Stories",
      platform: "TikTok",
      spend: 1850.00,
      leads: 62,
      cpl: 29.84,
      status: "active",
    },
    {
      name: "Before/After Carousel",
      platform: "Meta",
      spend: 2100.00,
      leads: 58,
      cpl: 36.21,
      status: "active",
    },
    {
      name: "Free Consultation Offer",
      platform: "Meta",
      spend: 1680.00,
      leads: 45,
      cpl: 37.33,
      status: "active",
    },
    {
      name: "DHI Method Explainer",
      platform: "TikTok",
      spend: 1200.00,
      leads: 38,
      cpl: 31.58,
      status: "active",
    },
    {
      name: "Hair Loss Solutions Search",
      platform: "Google",
      spend: 980.00,
      leads: 18,
      cpl: 54.44,
      status: "paused",
    },
  ],
  recentLeads: [
    {
      name: "Thomas V.",
      source: "TikTok - FUE Stories",
      time: "12 min ago",
      status: "New",
      quality: "High",
    },
    {
      name: "Erik B.",
      source: "Meta - Before/After",
      time: "28 min ago",
      status: "Contacted",
      quality: "Medium",
    },
    {
      name: "Jan K.",
      source: "Google - Search",
      time: "1 hour ago",
      status: "Consultation Booked",
      quality: "High",
    },
    {
      name: "Marco L.",
      source: "Meta - Free Consult",
      time: "2 hours ago",
      status: "Qualified",
      quality: "High",
    },
  ],
  chatbotStats: {
    totalConversations: 892,
    avgResponseTime: "< 30 sec",
    qualificationRate: 68,
    handoffToHuman: 12,
    topQuestions: [
      "What is the cost of a hair transplant?",
      "How long is the recovery time?",
      "Do you offer financing options?",
      "What's the difference between FUE and DHI?",
    ],
  },
  suggestedQuestions: [
    {
      category: "Performance",
      questions: [
        "Which platform has the best ROI?",
        "Show me this week's top campaigns",
        "Compare Meta vs TikTok performance",
      ],
    },
    {
      category: "Leads",
      questions: [
        "How many consultations were booked today?",
        "Which campaign brings the highest quality leads?",
        "Show leads by source breakdown",
      ],
    },
    {
      category: "AI Insights",
      questions: [
        "Generate ad copy for a new campaign",
        "What should we optimize this week?",
        "Predict next month's lead volume",
      ],
    },
  ],
};

export const sampleConversations = {
  performance: {
    question: "Which platform has the best ROI?",
    thinking: ["Analyzing platform data...", "Calculating ROAS across channels...", "Comparing cost efficiency..."],
    response: {
      text: "Based on current data, **Meta Ads** delivers the best ROI with a **4.2x ROAS**, followed by TikTok at 3.8x. However, TikTok has a lower cost per lead (€33.28 vs €34.52).",
      data: {
        type: "platform_comparison",
        platforms: [
          { name: "Meta Ads", roas: 4.2, cpl: 34.52, leads: 186 },
          { name: "TikTok Ads", roas: 3.8, cpl: 33.28, leads: 124 },
          { name: "Google Ads", roas: 2.1, cpl: 71.88, leads: 32 },
        ],
      },
      followUp: "Would you like me to suggest budget reallocation based on these numbers?",
    },
  },
  adCopy: {
    question: "Generate ad copy for a new campaign",
    thinking: ["Analyzing top performers...", "Identifying winning hooks...", "Generating variations..."],
    response: {
      text: "Based on your best-performing campaigns, here are 3 ad copy variations:",
      data: {
        type: "ad_copy",
        variations: [
          {
            hook: "Stop hiding. Start living.",
            body: "Join 2,500+ men who transformed their confidence with GHI's precision hair restoration. Free AI consultation.",
            cta: "See Your Results →",
          },
          {
            hook: "Your hair. Your timeline.",
            body: "Natural results in just one session. FUE & DHI by Europe's leading specialists. 0% financing available.",
            cta: "Book Free Scan",
          },
          {
            hook: "They'll never know.",
            body: "Undetectable results. 98% satisfaction rate. See real transformations from real patients like you.",
            cta: "View Gallery",
          },
        ],
      },
      followUp: "Want me to create platform-specific versions for TikTok or Meta?",
    },
  },
  consultations: {
    question: "How many consultations were booked today?",
    thinking: ["Fetching today's bookings...", "Cross-referencing with CRM..."],
    response: {
      text: "Today you've had **7 consultations booked** — 4 from Meta, 2 from TikTok, and 1 from organic search.",
      data: {
        type: "consultations",
        today: 7,
        thisWeek: 34,
        bySource: [
          { source: "Meta Ads", count: 4 },
          { source: "TikTok Ads", count: 2 },
          { source: "Organic", count: 1 },
        ],
        trend: "+12% vs last week",
      },
      followUp: "Should I send you a Telegram alert when we hit 10 bookings today?",
    },
  },
};
