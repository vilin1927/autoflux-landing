// BuilderMatch.ai — Proposal & Demo Data
// Two-sided marketplace connecting UK homeowners with tradespeople

// ============================================================
// DEMO DATA
// ============================================================

export interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  urgency: "low" | "medium" | "high";
  budget: string;
  description: string;
  postedAgo: string;
  customerName: string;
  customerRating: number;
  matchScore: number;
  status: "open" | "matched" | "quoted" | "booked" | "completed";
  unlocked: boolean;
}

export interface Tradesperson {
  id: string;
  name: string;
  trade: string;
  rating: number;
  reviews: number;
  completedJobs: number;
  responseTime: string;
  priceRange: string;
  profileComplete: number;
  verified: boolean;
  avatar: string;
  location: string;
  distance: string;
}

export interface Quote {
  id: string;
  tradespersonId: string;
  tradespersonName: string;
  trade: string;
  rating: number;
  reviews: number;
  completedJobs: number;
  type: "fixed" | "day_rate";
  amount: number;
  estimatedDays: number;
  message: string;
  responseTime: string;
  verified: boolean;
  avatar: string;
}

export interface AdminStats {
  totalCustomers: number;
  totalTradespeople: number;
  activeJobs: number;
  completedJobs: number;
  totalRevenue: number;
  leadsUnlocked: number;
  avgMatchScore: number;
  conversionRate: number;
}

// Dashboard KPIs for tradesperson view
export const tradespersonKPIs = {
  matchedJobs: 12,
  unlockedLeads: 7,
  activeQuotes: 4,
  monthlyEarnings: 3840,
  avgRating: 4.8,
  profileViews: 156,
};

// Jobs that appear in the matching feed
export const matchedJobs: Job[] = [
  {
    id: "j1",
    title: "Boiler Repair — Keeps Cutting Out",
    category: "Gas Engineer",
    location: "Coventry, CV1",
    urgency: "high",
    budget: "£150–£350",
    description:
      "Boiler keeps cutting out and hot water is lukewarm. Worcester Bosch combi, about 8 years old. Semi-detached house.",
    postedAgo: "12 min ago",
    customerName: "Sarah M.",
    customerRating: 4.9,
    matchScore: 96,
    status: "open",
    unlocked: false,
  },
  {
    id: "j2",
    title: "Full Bathroom Refit",
    category: "Plumber",
    location: "Leamington Spa, CV32",
    urgency: "low",
    budget: "£3,000–£5,000",
    description:
      "Complete bathroom renovation. Remove existing suite, new tiling, new bath with shower over, new vanity unit. Room is approx 2.5m x 2m.",
    postedAgo: "1 hour ago",
    customerName: "James T.",
    customerRating: 4.7,
    matchScore: 91,
    status: "open",
    unlocked: false,
  },
  {
    id: "j3",
    title: "Rewire 3-Bed Semi",
    category: "Electrician",
    location: "Rugby, CV21",
    urgency: "medium",
    budget: "£2,500–£4,000",
    description:
      "Full rewire needed. House built in 1960s, original wiring. 3 bedrooms, 1 bathroom, kitchen, living room. Need new consumer unit too.",
    postedAgo: "3 hours ago",
    customerName: "David K.",
    customerRating: 5.0,
    matchScore: 88,
    status: "matched",
    unlocked: true,
  },
  {
    id: "j4",
    title: "Kitchen Tap Replacement",
    category: "Plumber",
    location: "Warwick, CV34",
    urgency: "medium",
    budget: "£80–£150",
    description:
      "Need old mixer tap removed and new one fitted. Already bought the new tap. Might need isolating valves replaced too.",
    postedAgo: "5 hours ago",
    customerName: "Lisa R.",
    customerRating: 4.6,
    matchScore: 84,
    status: "open",
    unlocked: false,
  },
  {
    id: "j5",
    title: "External Wall Painting",
    category: "Painter & Decorator",
    location: "Kenilworth, CV8",
    urgency: "low",
    budget: "£400–£800",
    description:
      "Front and side walls of semi-detached need repainting. Some areas have flaking paint that needs scraping. Approx 40sqm total.",
    postedAgo: "1 day ago",
    customerName: "Mike P.",
    customerRating: 4.8,
    matchScore: 79,
    status: "quoted",
    unlocked: true,
  },
];

// Tradespeople for matching display
export const tradespeople: Tradesperson[] = [
  {
    id: "t1",
    name: "Gary Wilson",
    trade: "Gas Engineer",
    rating: 4.9,
    reviews: 47,
    completedJobs: 83,
    responseTime: "< 1 hour",
    priceRange: "£80–£350/job",
    profileComplete: 100,
    verified: true,
    avatar: "GW",
    location: "Coventry",
    distance: "2.3 miles",
  },
  {
    id: "t2",
    name: "Steve Barnes",
    trade: "Gas Engineer",
    rating: 4.7,
    reviews: 31,
    completedJobs: 56,
    responseTime: "< 2 hours",
    priceRange: "£70–£300/job",
    profileComplete: 92,
    verified: true,
    avatar: "SB",
    location: "Warwick",
    distance: "8.1 miles",
  },
  {
    id: "t3",
    name: "Paul Hughes",
    trade: "Gas Engineer",
    rating: 4.5,
    reviews: 18,
    completedJobs: 29,
    responseTime: "< 4 hours",
    priceRange: "£60–£280/job",
    profileComplete: 85,
    verified: true,
    avatar: "PH",
    location: "Leamington Spa",
    distance: "11.4 miles",
  },
];

// Quotes for the comparison view
export const quotes: Quote[] = [
  {
    id: "q1",
    tradespersonId: "t1",
    tradespersonName: "Gary Wilson",
    trade: "Gas Engineer",
    rating: 4.9,
    reviews: 47,
    completedJobs: 83,
    type: "fixed",
    amount: 220,
    estimatedDays: 1,
    message:
      "Sounds like it could be the diverter valve or a failing PCB. I can diagnose and fix same day in most cases. I carry common Worcester parts in my van. Gas Safe registered, fully insured.",
    responseTime: "Replied in 23 min",
    verified: true,
    avatar: "GW",
  },
  {
    id: "q2",
    tradespersonId: "t2",
    tradespersonName: "Steve Barnes",
    trade: "Gas Engineer",
    rating: 4.7,
    reviews: 31,
    completedJobs: 56,
    type: "fixed",
    amount: 180,
    estimatedDays: 1,
    message:
      "Happy to take a look. Most likely a thermostat or valve issue on a Worcester of that age. £180 includes diagnosis and repair if parts are standard. Any non-standard parts quoted separately.",
    responseTime: "Replied in 1 hour",
    verified: true,
    avatar: "SB",
  },
  {
    id: "q3",
    tradespersonId: "t3",
    tradespersonName: "Paul Hughes",
    trade: "Gas Engineer",
    rating: 4.5,
    reviews: 18,
    completedJobs: 29,
    type: "fixed",
    amount: 150,
    estimatedDays: 1,
    message:
      "Can come out and have a look. Diagnosis is £60, then parts and labour on top. Usually around £150 all in for this type of issue.",
    responseTime: "Replied in 3 hours",
    verified: true,
    avatar: "PH",
  },
];

// Admin panel stats
export const adminStats: AdminStats = {
  totalCustomers: 342,
  totalTradespeople: 189,
  activeJobs: 67,
  completedJobs: 1247,
  totalRevenue: 8940,
  leadsUnlocked: 2134,
  avgMatchScore: 87,
  conversionRate: 34,
};

// Recent admin activity
export const adminActivity = [
  {
    type: "signup",
    text: "New tradesperson: Mark Davies (Electrician, Birmingham)",
    time: "5 min ago",
  },
  {
    type: "job",
    text: "Job completed: Kitchen Refit — Sarah M. ↔ Gary Wilson",
    time: "22 min ago",
  },
  {
    type: "payment",
    text: "Lead unlocked: £7.50 — Steve Barnes (Boiler Repair job)",
    time: "38 min ago",
  },
  {
    type: "review",
    text: "New review: 5★ for Paul Hughes from David K.",
    time: "1 hour ago",
  },
  {
    type: "dispute",
    text: "Dispute opened: Job #1182 — customer reports no-show",
    time: "2 hours ago",
  },
  {
    type: "signup",
    text: "New customer: Emma Williams (Coventry)",
    time: "3 hours ago",
  },
];

// AI Job Wizard conversation flow
export const jobWizardConversation = [
  {
    role: "user" as const,
    text: "My boiler keeps cutting out and the hot water is lukewarm",
  },
  {
    role: "ai" as const,
    text: "Got it — sounds like a boiler issue. I've categorised this as **Gas Engineer — Boiler Repair/Service**.\n\nA few quick questions to help tradespeople give you accurate quotes:",
  },
  {
    role: "ai" as const,
    text: "1. What make and model is your boiler? (check the front panel)\n2. What type of property? (flat, terraced, semi, detached)\n3. When are you available for a tradesperson to visit?",
  },
  {
    role: "user" as const,
    text: "It's a Worcester Bosch combi, about 8 years old. Semi-detached. Any weekday morning works",
  },
  {
    role: "ai" as const,
    text: "Perfect. Here's your job summary:",
  },
];

export const generatedJobSummary = {
  title: "Boiler Repair — Keeps Cutting Out",
  category: "Gas Engineer",
  urgency: "High — affecting hot water",
  scope: "Diagnosis and repair of intermittent boiler shutdown. Possible thermostat, diverter valve, or PCB issue.",
  property: "Semi-detached house",
  boiler: "Worcester Bosch Combi (~8 years old)",
  availability: "Weekday mornings",
  estimatedBudget: "£150–£350",
};

// ============================================================
// PROPOSAL DATA
// ============================================================

export const proposalData = {
  client: {
    name: "Raj Kumar",
    company: "buildermatch.ai",
    location: "Coventry, UK",
  },
  project: {
    title: "BuilderMatch.ai",
    subtitle: "AI-Powered Trade & Services Marketplace",
    tagline:
      "A two-sided marketplace that connects UK homeowners with verified tradespeople — powered by AI that makes posting jobs, finding the right tradesperson, and getting fair quotes effortless.",
  },
  // Super clear feature breakdown — grouped by who uses it
  features: {
    forCustomers: [
      {
        name: "AI Job Wizard",
        icon: "MessageSquare",
        plain:
          "Customer describes their problem in plain English — like texting a friend. The AI figures out what trade they need, asks 2-3 smart follow-ups, and creates a proper job listing. No forms, no dropdowns. Takes 60 seconds.",
        example:
          '"My boiler keeps cutting out" → AI creates: Gas Engineer — Boiler Repair, urgency High, budget £150-£350.',
      },
      {
        name: "Smart Matching",
        icon: "Target",
        plain:
          "When a job is posted, the system instantly finds the best tradespeople based on their trade, location, rating, and availability. Customer doesn't search — the right people come to them.",
        example:
          "Post a plumbing job in Coventry → 3 verified plumbers within 10 miles get notified within minutes.",
      },
      {
        name: "Quote Comparison",
        icon: "BarChart3",
        plain:
          "Customer sees all quotes side by side — price, estimated time, tradesperson rating, and a plain-English summary. No guessing who's better value. AI highlights the key differences.",
        example:
          "3 quotes come in: £150, £180, £220. AI explains: cheapest is diagnosis-only, middle includes standard parts, highest includes same-day and carries spares.",
      },
      {
        name: "Booking & Payment",
        icon: "CreditCard",
        plain:
          "Customer picks a tradesperson and books them. They can pay securely through the platform (money held until job is done) or arrange payment directly — their choice. No forced fees.",
        example:
          "Select Gary Wilson → Confirm booking for Tuesday morning → Pay £220 via Stripe (held in escrow until job complete).",
      },
      {
        name: "Verified Reviews",
        icon: "Star",
        plain:
          "After the job is done, both sides leave reviews. Reviews are tied to real completed jobs — no fake reviews possible. Customers can rate quality, punctuality, and value.",
        example:
          "Job marked complete → Both parties prompted to review → '5★ — Fixed the boiler same day, very professional.'",
      },
    ],
    forTradespeople: [
      {
        name: "AI Onboarding",
        icon: "UserPlus",
        plain:
          "New tradesperson signs up and the AI walks them through registration like a conversation — not a 15-field form. It asks for their trades, service area, and qualifications. Uploads are verified automatically.",
        example:
          "AI: 'What trades do you cover?' → 'Gas and plumbing' → 'Upload your Gas Safe certificate' → AI extracts cert number and expiry date automatically.",
      },
      {
        name: "Job Alerts",
        icon: "Bell",
        plain:
          "When a matching job is posted nearby, the tradesperson gets an instant notification with a summary: what the job is, where it is, and the estimated budget. They see this for free.",
        example:
          "Push notification: 'New match (96%): Boiler Repair in CV1 — £150-£350. Tap to view.'",
      },
      {
        name: "Lead Unlock",
        icon: "Unlock",
        plain:
          "Tradesperson sees the job summary for free. To get the customer's full name, address, and phone number, they pay a small fee (£3-£15 depending on job type). They only pay for leads they actually want.",
        example:
          "See 'Boiler Repair, Coventry, CV1' for free → Pay £7.50 → Get 'Sarah Mitchell, 14 Oak Lane, CV1 3PQ, 07XXX XXXXXX'.",
      },
      {
        name: "Tradesperson Dashboard",
        icon: "LayoutDashboard",
        plain:
          "One screen showing everything: matched jobs, active quotes, booked jobs, earnings, and profile stats. Tradesperson sees their business at a glance.",
        example:
          "Dashboard shows: 12 matched jobs, 4 active quotes, £3,840 earned this month, 4.8★ average rating.",
      },
      {
        name: "Quick Quote",
        icon: "Send",
        plain:
          "Submit a quote in under a minute. Choose fixed price or day rate, add a short message, and send. The customer sees it instantly. AI can suggest pricing based on similar jobs.",
        example:
          "Fixed price: £220. Message: 'Can diagnose and fix same day, carry common Worcester parts.' → Send.",
      },
    ],
    platform: [
      {
        name: "In-App Messaging",
        icon: "MessageCircle",
        plain:
          "Once a lead is unlocked, customer and tradesperson can chat directly in the app. Supports text and image sharing. All messages are saved as a record.",
        example:
          "Tradesperson: 'Can you send a photo of the boiler model label?' → Customer shares photo → 'Great, I have the parts. See you Tuesday.'",
      },
      {
        name: "Admin Panel",
        icon: "Shield",
        plain:
          "You (Raj) get a control panel to manage everything: view all users, monitor jobs, handle disputes, see payments, and track platform health. No code needed.",
        example:
          "Admin sees: 342 customers, 189 tradespeople, 67 active jobs, £8,940 revenue, 1 open dispute.",
      },
      {
        name: "WhatsApp Notifications",
        icon: "Smartphone",
        plain:
          "Key notifications (new job match, quote received, booking confirmed) sent via WhatsApp so tradespeople don't need to check the app constantly. Replies sync back to in-app chat.",
        note: "Requires WhatsApp Business API approval — can launch with email/push first, add WhatsApp in Phase 2.",
      },
    ],
    phase2: [
      {
        name: "Customer Service Agent",
        plain:
          "AI chatbot that answers common questions 24/7. 'How do I post a job?', 'Where's my payment?', 'My tradesperson didn't show up.' Handles 60-70% of support without you lifting a finger.",
      },
      {
        name: "Growth Agent",
        plain:
          "AI that automatically recruits new tradespeople, sends re-engagement messages to inactive ones, and prompts reviews after job completion. Grows your marketplace on autopilot.",
      },
      {
        name: "Social Media Agent",
        plain:
          "Auto-generates and posts content to Facebook, Instagram, LinkedIn to attract both customers and tradespeople. 'Stop paying for bad leads' for tradespeople, 'Get 3 quotes in minutes' for customers.",
      },
      {
        name: "Dynamic Pricing Engine",
        plain:
          "AI learns from completed jobs to suggest accurate budget ranges. 'A boiler repair in Coventry typically costs £180-£280.' Gets smarter with more data.",
      },
    ],
  },
  milestones: [
    {
      number: 1,
      tag: "Foundation",
      title: "Auth, Profiles & AI Job Wizard",
      price: 1000,
      days: "10 days",
      deliverables: [
        "Email/password + Google sign-up for customers and tradespeople",
        "Phone OTP verification",
        "Tradesperson onboarding flow: trade categories, service area, document uploads",
        "Profile completeness scoring",
        "AI Job Wizard: plain-language job posting with smart follow-ups",
        "Structured job output: title, category, urgency, scope, budget range",
        "Customer and tradesperson dashboards (basic)",
        "Database schema and API foundation",
      ],
      scenario:
        "A homeowner signs up, types 'my boiler keeps cutting out', and in 60 seconds has a properly categorised job listing live on the platform. A gas engineer signs up, uploads their Gas Safe certificate, and their profile is ready to receive matches.",
    },
    {
      number: 2,
      tag: "Core Marketplace",
      title: "Matching, Lead Unlock & Quoting",
      price: 1200,
      days: "12 days",
      deliverables: [
        "AI matching engine: trade category + location + rating + profile completeness",
        "Job feed for tradespeople with match scores",
        "Lead unlock system: preview summary free, pay to see full details",
        "Stripe integration for lead unlock payments",
        "Quote submission: fixed price or day rate with message",
        "Quote comparison view for customers with AI summary",
        "Job status tracking: open → matched → quoted → booked → completed",
        "Booking flow: customer selects, tradesperson accepts/declines within 24hrs",
        "Push notifications for job matches, quotes, and bookings",
      ],
      scenario:
        "Gas engineer gets notified of the boiler job 2.3 miles away (96% match). Sees the summary for free. Pays £7.50 to unlock customer details. Sends a £220 fixed-price quote. Customer compares 3 quotes side by side, sees AI explanation of differences, and books Gary Wilson for Tuesday morning.",
    },
    {
      number: 3,
      tag: "Trust & Launch",
      title: "Messaging, Reviews & Admin",
      price: 800,
      days: "8 days",
      deliverables: [
        "In-app messaging: text + image sharing per job",
        "Review system: post-completion, multi-criteria, verified",
        "Admin panel: user management, job oversight, payment monitoring",
        "Dispute handling (manual via admin)",
        "Email notifications for key events",
        "Responsive mobile web (PWA-ready)",
        "Production deployment and go-live",
        "Bug fixes and launch support (1 week post-launch)",
      ],
      scenario:
        "Gary messages Sarah: 'Can you send a photo of the boiler label?' She shares a photo. He confirms the appointment. Job is completed. Both leave reviews. Raj sees everything in the admin panel — users, jobs, revenue, disputes — and the marketplace is live.",
    },
  ],
  pricing: {
    total: 3000,
    currency: "USD",
    timeline: "30 days (4-5 weeks)",
    paymentStructure: "Milestone-based: pay per milestone on delivery",
  },
  stack: [
    {
      name: "Next.js + React",
      description: "Frontend — fast, SEO-friendly, mobile-responsive",
      icon: "Globe",
    },
    {
      name: "Python FastAPI",
      description: "Backend API — handles matching, payments, AI agents",
      icon: "Server",
    },
    {
      name: "PostgreSQL",
      description: "Database — users, jobs, quotes, payments, reviews",
      icon: "Database",
    },
    {
      name: "Claude API",
      description: "AI engine — Job Wizard, quote summaries, onboarding",
      icon: "Brain",
    },
    {
      name: "Stripe",
      description: "Payments — lead unlock fees, optional escrow",
      icon: "CreditCard",
    },
    {
      name: "Supabase Auth",
      description: "Authentication — email, Google, phone OTP",
      icon: "Lock",
    },
  ],
  questions: [
    {
      number: 1,
      question: "Lead unlock pricing — who sets it?",
      context:
        "The spec says £3-£15 per lead depending on trade and job value. Do you want to set these manually at launch, or do you need a configurable pricing table in the admin panel?",
    },
    {
      number: 2,
      question: "WhatsApp Business API — do you have an approved account?",
      context:
        "WhatsApp Business API requires Meta Business verification (2-4 weeks to approve). I'd recommend launching with email + push notifications and adding WhatsApp in Phase 2. The messaging system works either way.",
    },
    {
      number: 3,
      question: "Geographic scope at launch?",
      context:
        "Launching nationwide UK vs a specific region (e.g., West Midlands) affects how many tradespeople you need to make the marketplace feel alive. A tight geographic launch means you need fewer tradespeople to create good matches. What's your plan?",
    },
    {
      number: 4,
      question: "How many trade categories at launch?",
      context:
        "The RFP mentions 200+ categories. For MVP I'd recommend starting with 10-15 high-demand trades (plumber, electrician, gas engineer, carpenter, painter, roofer) and expanding. Keeps onboarding simple and matching accurate.",
    },
    {
      number: 5,
      question: "Escrow payments — MVP or Phase 2?",
      context:
        "The spec says both platform escrow and direct payment are supported. For launch, I'd build the lead unlock payment as primary revenue and leave full job escrow for Phase 2. Lead unlock validates your business model faster. Escrow adds significant complexity (milestone tracking, dispute resolution, payout scheduling).",
    },
    {
      number: 6,
      question: "Tradesperson verification — manual or AI?",
      context:
        "The FRD mentions AI document extraction for Gas Safe, NICEIC certs. For MVP, would manual admin verification work (tradesperson uploads docs, you approve)? AI OCR for UK trade certifications needs training data you won't have at launch.",
    },
    {
      number: 7,
      question: "Growth Agent and Social Media Agent — Phase 1 or Phase 2?",
      context:
        "The Job Wizard and Onboarding Agent are core to the experience. But the Growth Agent (automated outreach) and Social Media Agent (content posting) work best once you have real users and data. My recommendation: ship with 2 agents, add 3 more after launch.",
    },
  ],
};
