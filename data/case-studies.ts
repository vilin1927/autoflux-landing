import { CaseStudy, CaseCategory, CaseMedia } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    slug: "tiktok-slideshow-automation",
    title: "TikTok Slideshow Automation Platform",
    category: "Creative Automation",
    categorySlug: "creative",
    heroGradient: "linear-gradient(140deg, #764ba2 0%, #CFFF4D 100%)",
    eyebrow: "Creative Automation",
    description:
      "AI-powered creative production that scrapes viral TikTok slideshows, analyzes patterns with GPT, and generates multiple text/image variants—cutting campaign time by 75%.",
    cardDescription:
      "AI-powered creative production: scrapes viral TikTok slideshows, analyzes patterns with GPT, and generates multiple text/image variants.",
    challenge: [
      "E-commerce brand spending 60+ minutes per campaign manually researching viral slideshow trends",
      "Creative team bottlenecked—unable to scale ad production without hiring more designers",
      "Needed automated research, extraction, and variant generation while maintaining quality",
    ],
    solution: {
      intro:
        "AutoFlux built a fully automated TikTok creative production platform using n8n, OpenAI GPT-4, and custom computer vision logic:",
      steps: [
        {
          title: "Viral Content Scraping",
          details: [
            "Automatically scrapes TikTok for top-performing slideshow ads using TikTok API + Apify",
          ],
        },
        {
          title: "Pattern Analysis (GPT-4)",
          details: [
            "Winning text hooks and messaging patterns",
            "Image composition and visual themes",
            "Timing, pacing, and transitions",
          ],
        },
        {
          title: "Variant Generation",
          details: [
            "Creates 5-10 slideshow variants per viral template",
            "Generates multiple text overlays (different hooks, CTAs)",
            "Applies smart text placement rules using computer vision",
          ],
        },
        {
          title: "Asset Delivery",
          details: [
            "Automatically organizes and delivers variants to Google Drive",
          ],
        },
      ],
      techStack: [
        { name: "n8n", description: "workflow orchestration" },
        { name: "OpenAI GPT-4", description: "pattern analysis" },
        { name: "TikTok API" },
        { name: "Apify", description: "web scraping" },
        { name: "Google Drive API" },
        { name: "Custom CV Logic" },
      ],
    },
    results: {
      stats: [
        { value: "60 → 15 min", label: "Creative production time per campaign" },
        { value: "75%", label: "Time savings on creative workflow" },
        { value: "5-10x", label: "More variants per campaign for testing" },
        { value: "$0", label: "Additional designer costs" },
      ],
    },
    takeaways: [
      "AI + Automation = Scalable Creativity: By combining LLMs with workflow automation, creative production can scale without linear headcount growth.",
      "Spec-Driven Development: We documented exact text placement rules, scraping parameters, and output formats before building—no scope creep.",
      "Fast ROI: The system paid for itself within the first month through time savings and increased test velocity.",
    ],
    // Media will be added when videos are ready
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description:
        "Watch the platform in action: scraping → analysis → generation",
    },
    cta: {
      eyebrow: "Ready to automate your creative production?",
      headline: "Let's build your custom automation system",
      description:
        "Book a free blueprint call to see how we can automate your biggest bottlenecks.",
    },
    cardMetric: { number: "60 → 15 min", label: "Per campaign creative time" },
    tools: ["n8n", "OpenAI GPT", "TikTok API"],
  },
  {
    slug: "wellness-vet-lead-enrichment",
    title: "Multi-Source Lead Enrichment Pipeline",
    category: "Lead Gen",
    categorySlug: "lead-gen",
    heroGradient: "linear-gradient(140deg, #1E1B4B 0%, #3DD6D0 100%)",
    eyebrow: "Lead Gen",
    description:
      "Scrapes businesses from Google Maps + Yelp, normalizes data, enriches contacts with emails + firmographics, and outputs clean leads ready for outreach.",
    cardDescription:
      "Scrapes businesses from Google Maps + Yelp, normalizes data, enriches contacts with emails + firmographics, and outputs clean leads.",
    challenge: [
      "Sales team wasting hours on manual lead research across multiple platforms",
      "Inconsistent data quality leading to bounced emails and wasted outreach",
      "No centralized system to track and manage lead enrichment workflow",
    ],
    solution: {
      intro:
        "We built an end-to-end lead enrichment pipeline that sources, cleans, and enriches leads automatically:",
      steps: [
        {
          title: "Multi-Source Scraping",
          details: [
            "Pulls business data from Google Maps, Yelp, and industry directories",
          ],
        },
        {
          title: "Data Normalization",
          details: [
            "Standardizes company names, addresses, and phone formats",
            "De-duplicates across sources",
          ],
        },
        {
          title: "Contact Enrichment",
          details: [
            "Finds decision-maker emails via Snov.io and Hunter",
            "Adds firmographic data (size, revenue, industry)",
          ],
        },
        {
          title: "CRM Sync",
          details: [
            "Pushes verified leads directly to HubSpot with proper tagging",
          ],
        },
      ],
      techStack: [
        { name: "Apify", description: "web scraping" },
        { name: "Google Maps API" },
        { name: "Snov.io", description: "email finder" },
        { name: "HubSpot CRM" },
        { name: "n8n", description: "orchestration" },
      ],
    },
    results: {
      stats: [
        { value: "3,000+", label: "Enriched, verified contacts delivered" },
        { value: "85%", label: "Email deliverability rate" },
        { value: "10 hrs/week", label: "Saved on manual research" },
        { value: "2x", label: "Increase in qualified leads" },
      ],
    },
    takeaways: [
      "Multi-source scraping catches leads that single-source approaches miss.",
      "Data quality > data quantity: clean, enriched leads convert better.",
      "Automation frees up sales reps to focus on selling, not researching.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the full pipeline from scrape to CRM",
    },
    cta: {
      eyebrow: "Ready to supercharge your lead gen?",
      headline: "Let's build your lead enrichment machine",
      description:
        "Book a free blueprint call to map out your custom pipeline.",
    },
    cardMetric: {
      number: "3,000+",
      label: "Enriched, verified contacts delivered",
    },
    tools: ["Apify", "Google Maps", "Snov.io"],
  },
  {
    slug: "sales-call-analysis-automation",
    title: "AI-Powered Call Analysis & Coaching",
    category: "Sales Ops",
    categorySlug: "sales-ops",
    heroGradient: "linear-gradient(140deg, #FF6B35 0%, #F7C59F 100%)",
    eyebrow: "Sales Ops",
    description:
      "Watches Google Drive for call transcripts, generates LLM scorecards, writes to BigQuery, and syncs into GoHighLevel CRM for rep coaching.",
    cardDescription:
      "Watches Google Drive for call transcripts, generates LLM scorecards, writes to BigQuery, and syncs into GoHighLevel CRM.",
    challenge: [
      "Sales managers spending 45+ minutes per call manually reviewing recordings",
      "Inconsistent coaching feedback across team members",
      "No data-driven insights into what makes top performers successful",
    ],
    solution: {
      intro:
        "We built an automated call analysis system that scores every call and surfaces actionable insights:",
      steps: [
        {
          title: "Automatic Detection",
          details: [
            "Watches Google Drive for new call transcripts",
            "Triggers analysis pipeline automatically",
          ],
        },
        {
          title: "AI Scoring",
          details: [
            "GPT-4 analyzes calls against customized rubric",
            "Scores discovery, objection handling, closing techniques",
          ],
        },
        {
          title: "Data Storage",
          details: [
            "Writes structured scores to BigQuery",
            "Enables trend analysis and rep comparisons",
          ],
        },
        {
          title: "CRM Integration",
          details: [
            "Syncs scores to GoHighLevel contact records",
            "Tags calls needing manager review",
          ],
        },
      ],
      techStack: [
        { name: "OpenAI GPT-4", description: "analysis" },
        { name: "BigQuery", description: "data warehouse" },
        { name: "GoHighLevel CRM" },
        { name: "Google Drive API" },
        { name: "n8n", description: "orchestration" },
      ],
    },
    results: {
      stats: [
        { value: "45 → 5 min", label: "Call review time per recording" },
        { value: "100%", label: "Of calls now analyzed" },
        { value: "23%", label: "Improvement in close rates" },
        { value: "3x", label: "More coaching conversations" },
      ],
    },
    takeaways: [
      "AI can match human-level call analysis at 10x the speed.",
      "Consistent scoring rubrics drive consistent improvement.",
      "Data in BigQuery enables trend analysis impossible with manual review.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "Watch the analysis pipeline in action",
    },
    cta: {
      eyebrow: "Ready to level up your sales coaching?",
      headline: "Let's automate your call analysis",
      description:
        "Book a free blueprint call to design your coaching system.",
    },
    cardMetric: { number: "45 → 5 min", label: "Call review time per recording" },
    tools: ["OpenAI", "BigQuery", "GoHighLevel"],
  },
  {
    slug: "vet-clinic-competitor-intelligence",
    title: "Vet Clinic Competitor Intelligence Tool",
    category: "Competitive Intelligence",
    categorySlug: "intel",
    heroGradient: "linear-gradient(140deg, #7C3AED 0%, #A78BFA 100%)",
    eyebrow: "Competitive Intelligence",
    description:
      "Input: clinic website. Output: interactive map + dashboard showing competitors in 20-mile radius, review analysis, and ad presence.",
    cardDescription:
      "Input: clinic website. Output: interactive map + dashboard showing competitors in 20-mile radius, review analysis, and ad presence.",
    challenge: [
      "Vet clinics had no visibility into local competitive landscape",
      "Manual competitor research took hours and quickly became outdated",
      "No systematic way to track competitor reviews, ads, or service offerings",
    ],
    solution: {
      intro:
        "We built a one-click competitive intelligence tool that maps the entire competitive landscape:",
      steps: [
        {
          title: "Website Input",
          details: [
            "User enters their clinic website URL",
            "System extracts location and identifies service categories",
          ],
        },
        {
          title: "Competitor Discovery",
          details: [
            "Scrapes Google Maps for all vet clinics in 20-mile radius",
            "Identifies direct competitors based on services offered",
          ],
        },
        {
          title: "Data Enrichment",
          details: [
            "Pulls Google/Yelp reviews and sentiment analysis",
            "Checks for active Google Ads and Facebook ads",
            "Extracts pricing signals where available",
          ],
        },
        {
          title: "Interactive Dashboard",
          details: [
            "Map view with competitor locations and key metrics",
            "Sortable table with review scores, ad status, and insights",
          ],
        },
      ],
      techStack: [
        { name: "n8n", description: "workflow orchestration" },
        { name: "Lovable", description: "frontend dashboard" },
        { name: "Google Maps API" },
        { name: "Apify", description: "web scraping" },
        { name: "OpenAI", description: "sentiment analysis" },
      ],
    },
    results: {
      stats: [
        { value: "1-click", label: "Competitive landscape in seconds" },
        { value: "20-mile", label: "Radius coverage" },
        { value: "50+", label: "Data points per competitor" },
        { value: "Weekly", label: "Auto-refresh of data" },
      ],
    },
    takeaways: [
      "One-click tools drive adoption—remove friction and users actually use it.",
      "Combining map visualization with data tables gives both overview and detail.",
      "Auto-refresh keeps intelligence current without manual intervention.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the competitive mapping tool in action",
    },
    cta: {
      eyebrow: "Ready to see your competitive landscape?",
      headline: "Let's build your intelligence dashboard",
      description:
        "Book a free blueprint call to map out your custom solution.",
    },
    cardMetric: { number: "1-click", label: "Competitive landscape in seconds" },
    tools: ["n8n", "Lovable", "Google Maps"],
  },
  {
    slug: "lead-gen-automation-pipeline",
    title: "Spec-Driven Lead Gen Pipeline",
    category: "End-to-End Automation",
    categorySlug: "lead-gen",
    heroGradient: "linear-gradient(140deg, #0891B2 0%, #22D3EE 100%)",
    eyebrow: "End-to-End Automation",
    description:
      "Scrapes sites & Instagram, applies hard ICP filters + tier logic, enriches via Snov/Dropcontact, and creates contacts in HubSpot.",
    cardDescription:
      "Scrapes sites & Instagram, applies hard ICP filters + tier logic, enriches via Snov/Dropcontact, and creates contacts in HubSpot.",
    challenge: [
      "Sales team drowning in unqualified leads from multiple sources",
      "No consistent ICP filtering—reps wasting time on poor-fit prospects",
      "Manual enrichment and CRM entry creating bottlenecks",
    ],
    solution: {
      intro:
        "We built a spec-driven pipeline that automates the entire lead gen workflow from source to CRM:",
      steps: [
        {
          title: "Multi-Source Scraping",
          details: [
            "Scrapes target websites and Instagram profiles",
            "Pulls data from Google Sheets input specs",
          ],
        },
        {
          title: "ICP Filtering",
          details: [
            "Applies hard filters (industry, size, location)",
            "Implements tier logic for prioritization",
          ],
        },
        {
          title: "Contact Enrichment",
          details: [
            "Enriches via Snov.io and Dropcontact",
            "Validates emails before CRM entry",
          ],
        },
        {
          title: "CRM Integration",
          details: [
            "Creates contacts in HubSpot with proper tagging",
            "Assigns to appropriate sales reps based on tier",
          ],
        },
      ],
      techStack: [
        { name: "Apify", description: "web scraping" },
        { name: "Snov.io", description: "email enrichment" },
        { name: "Dropcontact", description: "data enrichment" },
        { name: "HubSpot CRM" },
        { name: "n8n", description: "orchestration" },
      ],
    },
    results: {
      stats: [
        { value: "Zero guesswork", label: "Sheet → scrape → tier → CRM" },
        { value: "95%", label: "ICP match rate" },
        { value: "8 hrs/week", label: "Saved on manual work" },
        { value: "3x", label: "Pipeline velocity increase" },
      ],
    },
    takeaways: [
      "Spec-driven development prevents scope creep and ensures consistent output.",
      "Hard ICP filters at the source save downstream time and improve conversion.",
      "Tiering logic helps reps prioritize the highest-value prospects.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "Watch the full pipeline from spec to CRM",
    },
    cta: {
      eyebrow: "Ready to automate your lead gen?",
      headline: "Let's build your custom pipeline",
      description:
        "Book a free blueprint call to design your lead gen system.",
    },
    cardMetric: { number: "Zero guesswork", label: "Sheet → scrape → tier → CRM" },
    tools: ["Apify", "Snov.io", "HubSpot"],
  },
  {
    slug: "automated-reporting-masterleads",
    title: "Automated Reporting from MongoDB",
    category: "Reporting & Analytics",
    categorySlug: "reporting",
    heroGradient: "linear-gradient(140deg, #EC4899 0%, #F9A8D4 100%)",
    eyebrow: "Reporting & Analytics",
    description:
      "Pulls communication data from MongoDB, aggregates by owner/channel/status, and sends Excel/CSV reports daily, weekly, monthly.",
    cardDescription:
      "Pulls communication data from MongoDB, aggregates by owner/channel/status, and sends Excel/CSV reports daily, weekly, monthly.",
    challenge: [
      "Team spending 4+ hours weekly compiling reports from MongoDB manually",
      "Reports often late or inconsistent due to human error",
      "No automated way to slice data by owner, channel, and status",
    ],
    solution: {
      intro:
        "We built an automated reporting system that generates and delivers reports on schedule:",
      steps: [
        {
          title: "Data Extraction",
          details: [
            "Connects to MongoDB and pulls communication records",
            "Handles large datasets efficiently with pagination",
          ],
        },
        {
          title: "Aggregation Logic",
          details: [
            "Groups by owner, channel, and status",
            "Calculates key metrics and trends",
          ],
        },
        {
          title: "Report Generation",
          details: [
            "Formats data into Excel/CSV with proper styling",
            "Creates daily, weekly, and monthly variants",
          ],
        },
        {
          title: "Automated Delivery",
          details: [
            "Emails reports to stakeholders on schedule",
            "Archives to Google Drive for historical access",
          ],
        },
      ],
      techStack: [
        { name: "MongoDB", description: "data source" },
        { name: "n8n", description: "orchestration" },
        { name: "Excel/CSV", description: "output format" },
        { name: "Gmail API", description: "delivery" },
        { name: "Google Drive", description: "archival" },
      ],
    },
    results: {
      stats: [
        { value: "100%", label: "Zero manual reporting work" },
        { value: "4 hrs/week", label: "Time saved" },
        { value: "3 cadences", label: "Daily, weekly, monthly" },
        { value: "Zero errors", label: "Consistent formatting" },
      ],
    },
    takeaways: [
      "Automated reporting eliminates human error and ensures consistency.",
      "Multiple cadences (daily/weekly/monthly) serve different stakeholder needs.",
      "Archival to Drive creates an audit trail without extra effort.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the automated reporting pipeline",
    },
    cta: {
      eyebrow: "Ready to automate your reporting?",
      headline: "Let's build your reporting system",
      description:
        "Book a free blueprint call to design your automated reports.",
    },
    cardMetric: { number: "100%", label: "Zero manual reporting work" },
    tools: ["MongoDB", "n8n", "Excel/CSV"],
  },
  {
    slug: "voice-ai-receptionist",
    title: "24/7 Voice AI Receptionist",
    category: "CX Automation",
    categorySlug: "cx",
    heroGradient: "linear-gradient(140deg, #4F46E5 0%, #818CF8 100%)",
    eyebrow: "CX Automation",
    description:
      "Answers calls 24/7, qualifies patients, books appointments directly into practice management software. Handles emergencies autonomously.",
    cardDescription:
      "Answers calls 24/7, qualifies patients, books appointments directly into practice management software. Handles emergencies autonomously.",
    challenge: [
      "Clinic missing 40% of calls—especially after hours and during busy periods",
      "Front desk overwhelmed with scheduling calls, reducing patient care time",
      "No consistent way to handle after-hours emergencies",
    ],
    solution: {
      intro:
        "We deployed a Voice AI receptionist that handles calls around the clock:",
      steps: [
        {
          title: "Call Answering",
          details: [
            "Vapi-powered voice AI answers every call instantly",
            "Natural conversation flow with context awareness",
          ],
        },
        {
          title: "Patient Qualification",
          details: [
            "Asks qualifying questions (new/existing, reason for visit)",
            "Routes emergencies to on-call staff immediately",
          ],
        },
        {
          title: "Appointment Booking",
          details: [
            "Checks real-time availability in practice management software",
            "Books appointments and sends confirmation SMS",
          ],
        },
        {
          title: "CRM Sync",
          details: [
            "Logs all calls and outcomes to GoHighLevel",
            "Tags leads for follow-up if appointment not booked",
          ],
        },
      ],
      techStack: [
        { name: "Vapi", description: "voice AI platform" },
        { name: "Twilio", description: "telephony" },
        { name: "GoHighLevel CRM" },
        { name: "Practice Management API" },
        { name: "n8n", description: "orchestration" },
      ],
    },
    results: {
      stats: [
        { value: "40% → 3%", label: "Missed call rate reduction" },
        { value: "24/7", label: "Coverage without staff" },
        { value: "85%", label: "Calls handled without human" },
        { value: "2x", label: "Appointment bookings" },
      ],
    },
    takeaways: [
      "Voice AI can match human-level call handling for routine inquiries.",
      "24/7 coverage captures opportunities that would otherwise be lost.",
      "Emergency routing ensures critical calls still reach humans immediately.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "Hear the Voice AI in action",
    },
    cta: {
      eyebrow: "Ready for 24/7 call coverage?",
      headline: "Let's deploy your Voice AI receptionist",
      description:
        "Book a free blueprint call to design your voice solution.",
    },
    cardMetric: { number: "40% → 3%", label: "Missed call rate reduction" },
    tools: ["Vapi", "Twilio", "GoHighLevel"],
  },
  {
    slug: "shopify-order-fulfillment",
    title: "Shopify Order-to-Fulfillment Automation",
    category: "E-commerce Ops",
    categorySlug: "ecommerce",
    heroGradient: "linear-gradient(140deg, #EAB308 0%, #FDE047 100%)",
    eyebrow: "E-commerce Ops",
    description:
      "Syncs Shopify orders with 3PL warehouse, auto-updates inventory levels, triggers restock alerts, and resolves 83% of \"where's my order\" tickets.",
    cardDescription:
      "Syncs Shopify orders with 3PL warehouse, auto-updates inventory levels, triggers restock alerts, and resolves 83% of \"where's my order\" tickets.",
    challenge: [
      "Manual order forwarding to 3PL causing delays and errors",
      "Inventory mismatches leading to overselling and stockouts",
      "Support team overwhelmed with 'where's my order' inquiries",
    ],
    solution: {
      intro:
        "We built an end-to-end fulfillment automation connecting Shopify, 3PL, and support:",
      steps: [
        {
          title: "Order Sync",
          details: [
            "Real-time order push from Shopify to ShipBob",
            "Automatic SKU mapping and validation",
          ],
        },
        {
          title: "Inventory Management",
          details: [
            "Bi-directional inventory sync every 15 minutes",
            "Automatic restock alerts when levels hit threshold",
          ],
        },
        {
          title: "Tracking Updates",
          details: [
            "Pulls tracking from 3PL and updates Shopify",
            "Sends branded shipping notifications to customers",
          ],
        },
        {
          title: "Support Automation",
          details: [
            "Gorgias integration answers WISMO tickets automatically",
            "Pulls real-time tracking and provides ETA",
          ],
        },
      ],
      techStack: [
        { name: "Shopify", description: "e-commerce platform" },
        { name: "ShipBob", description: "3PL warehouse" },
        { name: "Gorgias", description: "customer support" },
        { name: "n8n", description: "orchestration" },
        { name: "Slack", description: "restock alerts" },
      ],
    },
    results: {
      stats: [
        { value: "500+", label: "Orders/day with zero manual touch" },
        { value: "83%", label: "WISMO tickets auto-resolved" },
        { value: "99.5%", label: "Inventory accuracy" },
        { value: "2 hrs/day", label: "Saved on manual work" },
      ],
    },
    takeaways: [
      "Real-time sync eliminates the delays that cause customer complaints.",
      "Automating WISMO responses has massive ROI for e-commerce support teams.",
      "Inventory accuracy prevents both stockouts and overselling.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the fulfillment automation in action",
    },
    cta: {
      eyebrow: "Ready to automate your fulfillment?",
      headline: "Let's build your e-commerce automation",
      description:
        "Book a free blueprint call to map out your integration.",
    },
    cardMetric: { number: "500+", label: "Orders/day with zero manual touch" },
    tools: ["Shopify", "ShipBob", "Gorgias"],
  },
  {
    slug: "saas-onboarding-agent",
    title: "AI Onboarding Agent for B2B SaaS",
    category: "SaaS Growth",
    categorySlug: "saas",
    heroGradient: "linear-gradient(140deg, #0EA5E9 0%, #7DD3FC 100%)",
    eyebrow: "SaaS Growth",
    description:
      "Guides new users through setup via in-app chat, answers product questions from docs, triggers intervention emails for at-risk accounts.",
    cardDescription:
      "Guides new users through setup via in-app chat, answers product questions from docs, triggers intervention emails for at-risk accounts.",
    challenge: [
      "40% of trial users churning before completing onboarding",
      "Support team overwhelmed with basic 'how do I' questions",
      "No proactive intervention for users showing signs of struggle",
    ],
    solution: {
      intro:
        "We deployed an AI onboarding agent that guides users and identifies at-risk accounts:",
      steps: [
        {
          title: "In-App Chat Agent",
          details: [
            "Claude-powered chat widget embedded in the product",
            "Trained on full documentation and common workflows",
          ],
        },
        {
          title: "Guided Onboarding",
          details: [
            "Walks users through key setup steps conversationally",
            "Adapts to user's specific use case and goals",
          ],
        },
        {
          title: "Risk Detection",
          details: [
            "Monitors for signs of struggle (repeated questions, stalled progress)",
            "Triggers intervention emails and CS alerts",
          ],
        },
        {
          title: "Analytics & Sync",
          details: [
            "Logs all conversations to Segment",
            "Syncs user progress to Intercom for CS visibility",
          ],
        },
      ],
      techStack: [
        { name: "Claude API", description: "AI assistant" },
        { name: "Intercom", description: "chat & CS platform" },
        { name: "Segment", description: "analytics" },
        { name: "n8n", description: "orchestration" },
        { name: "Documentation RAG", description: "knowledge base" },
      ],
    },
    results: {
      stats: [
        { value: "40% → 68%", label: "Day-30 trial retention" },
        { value: "75%", label: "Questions answered without human" },
        { value: "3x", label: "Faster onboarding completion" },
        { value: "50%", label: "Reduction in support tickets" },
      ],
    },
    takeaways: [
      "Proactive onboarding beats reactive support for trial conversion.",
      "RAG on documentation enables accurate, context-aware answers.",
      "Risk detection allows human intervention only where it matters most.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the AI onboarding agent in action",
    },
    cta: {
      eyebrow: "Ready to improve your trial conversion?",
      headline: "Let's build your AI onboarding agent",
      description:
        "Book a free blueprint call to design your solution.",
    },
    cardMetric: { number: "40% → 68%", label: "Day-30 trial retention" },
    tools: ["Claude API", "Intercom", "Segment"],
  },
  {
    slug: "instagram-dm-qualification",
    title: "Instagram DM Lead Qualification Bot",
    category: "Lead Gen",
    categorySlug: "lead-gen",
    heroGradient: "linear-gradient(140deg, #84CC16 0%, #BEF264 100%)",
    eyebrow: "Lead Gen",
    description:
      "Monitors DMs 24/7, qualifies leads with natural conversation, books calls directly into Calendly, syncs qualified prospects to GoHighLevel.",
    cardDescription:
      "Monitors DMs 24/7, qualifies leads with natural conversation, books calls directly into Calendly, syncs qualified prospects to GoHighLevel.",
    challenge: [
      "Business owner missing DM leads while busy with client work",
      "Manual back-and-forth to qualify and book taking 15+ min per lead",
      "No systematic tracking of DM conversations and outcomes",
    ],
    solution: {
      intro:
        "We built an Instagram DM bot that qualifies and books leads automatically:",
      steps: [
        {
          title: "24/7 Monitoring",
          details: [
            "Listens for new DMs and story replies",
            "Responds within seconds, day or night",
          ],
        },
        {
          title: "Natural Qualification",
          details: [
            "GPT-powered conversation feels human and authentic",
            "Asks qualifying questions (budget, timeline, needs)",
          ],
        },
        {
          title: "Booking Integration",
          details: [
            "Sends Calendly link when lead is qualified",
            "Handles rescheduling and confirmations",
          ],
        },
        {
          title: "CRM Sync",
          details: [
            "Creates contact in GoHighLevel with conversation context",
            "Tags by qualification status and source",
          ],
        },
      ],
      techStack: [
        { name: "Instagram API", description: "messaging" },
        { name: "OpenAI GPT", description: "conversation" },
        { name: "Calendly", description: "booking" },
        { name: "GoHighLevel CRM" },
        { name: "n8n", description: "orchestration" },
      ],
    },
    results: {
      stats: [
        { value: "3x", label: "Booked calls from same DM volume" },
        { value: "24/7", label: "Response coverage" },
        { value: "< 30 sec", label: "Average response time" },
        { value: "15 min → 0", label: "Manual time per lead" },
      ],
    },
    takeaways: [
      "Speed-to-lead matters—instant responses dramatically improve booking rates.",
      "Natural conversation > scripted responses for social media leads.",
      "Automation doesn't mean impersonal—GPT makes it feel human.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the DM bot in action",
    },
    cta: {
      eyebrow: "Ready to automate your DM leads?",
      headline: "Let's build your Instagram bot",
      description:
        "Book a free blueprint call to design your qualification flow.",
    },
    cardMetric: { number: "3x", label: "Booked calls from same DM volume" },
    tools: ["Instagram API", "OpenAI GPT", "Calendly"],
  },
  {
    slug: "vibe-coding-mvp",
    title: "2-Week MVP Development with Claude Code",
    category: "Vibe Coding",
    categorySlug: "vibe-coding",
    heroGradient: "linear-gradient(140deg, #374151 0%, #6B7280 100%)",
    eyebrow: "Vibe Coding",
    description:
      "Rapidly prototyped and deployed a functional SaaS MVP—auth, dashboard, API integrations, billing—in 14 days using AI-assisted methodology.",
    cardDescription:
      "Rapidly prototyped and deployed a functional SaaS MVP—auth, dashboard, API integrations, billing—in 14 days using AI-assisted methodology.",
    challenge: [
      "Founder needed working MVP to validate idea and raise funding",
      "Traditional development timeline of 8-12 weeks was too slow",
      "Limited budget made hiring a full dev team impractical",
    ],
    solution: {
      intro:
        "We used AI-assisted 'vibe coding' to build a complete MVP in record time:",
      steps: [
        {
          title: "Architecture Design",
          details: [
            "Claude Code helped design scalable architecture",
            "Chose optimal tech stack (Next.js, Supabase, Stripe)",
          ],
        },
        {
          title: "Rapid Development",
          details: [
            "AI-assisted coding 3-5x faster than traditional development",
            "Cursor + Claude Code for real-time code generation",
          ],
        },
        {
          title: "Core Features",
          details: [
            "Auth system with magic links and OAuth",
            "Dashboard with real-time data visualization",
            "API integrations with 3 external services",
            "Stripe billing with subscription management",
          ],
        },
        {
          title: "Deployment & Polish",
          details: [
            "Deployed to Vercel with CI/CD pipeline",
            "Mobile-responsive design throughout",
          ],
        },
      ],
      techStack: [
        { name: "Claude Code", description: "AI coding assistant" },
        { name: "Cursor", description: "AI-enhanced IDE" },
        { name: "Next.js 14", description: "framework" },
        { name: "Supabase", description: "backend + auth" },
        { name: "Stripe", description: "billing" },
        { name: "Vercel", description: "deployment" },
      ],
    },
    results: {
      stats: [
        { value: "10 → 2 weeks", label: "MVP delivery time" },
        { value: "4x", label: "Faster than traditional development" },
        { value: "100%", label: "Core features delivered" },
        { value: "$0", label: "Saved on extended dev costs" },
      ],
    },
    takeaways: [
      "AI-assisted development doesn't sacrifice quality for speed.",
      "Vibe coding works best with clear specs and iterative feedback.",
      "MVPs should validate ideas, not be perfect—ship fast and learn.",
    ],
    videoPlaceholder: {
      icon: "video",
      title: "Case Video Coming Soon",
      description: "See the MVP development process",
    },
    cta: {
      eyebrow: "Need an MVP fast?",
      headline: "Let's build your product in weeks, not months",
      description:
        "Book a free blueprint call to scope your MVP.",
    },
    cardMetric: { number: "10 → 2 weeks", label: "MVP delivery time" },
    tools: ["Claude Code", "Cursor", "Supabase"],
  },
];

export const caseCategories: CaseCategory[] = [
  { slug: "all", label: "All" },
  { slug: "lead-gen", label: "Lead Gen" },
  { slug: "sales-ops", label: "Sales Ops" },
  { slug: "creative", label: "Creative" },
  { slug: "cx", label: "CX Automation" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "saas", label: "SaaS Growth" },
  { slug: "intel", label: "Competitive Intel" },
  { slug: "reporting", label: "Reporting" },
  { slug: "vibe-coding", label: "Vibe Coding" },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
