// Proposal data for CheckPoint Group Inc (Dan Gold)
// Social Media Automation Engine — February 2026

export const proposalData = {
  client: {
    name: "CheckPoint Group Inc",
    contact: "Dan Gold",
    location: "Toronto, Canada",
  },
  project: {
    title: "AI Social Media Automation Engine",
    subtitle: "Claude-powered content generation & auto-posting for X and Threads",
    description:
      "A custom-built system that generates high-quality, on-brand content using Claude AI and automatically posts to your X (Twitter) and Instagram Threads accounts on schedule — with a dashboard for full control.",
  },
  whatWeSuggest: [
    {
      title: "Custom Web App (Not No-Code)",
      description:
        "Instead of chaining Zapier/IFTTT/Make.com, we build a standalone web app. Fewer moving parts = fewer breakpoints. You own the code, no monthly SaaS fees.",
      icon: "code",
      highlight: true,
    },
    {
      title: "Claude API (Not Claude.ai Projects)",
      description:
        "Claude.ai Projects is a consumer feature — great for chat, not for production automation. We use the API directly: full control over prompts, brand voice, rate limits, and costs.",
      icon: "cpu",
      highlight: true,
    },
    {
      title: "Direct API Integration",
      description:
        "Post directly via X API v2 and Threads API. No middleman, no Zapier webhook delays, no broken automations at 2 AM.",
      icon: "zap",
    },
    {
      title: "Approval Dashboard",
      description:
        "A clean web UI where you review AI-generated content before it goes live. Edit, approve, schedule, or regenerate — you stay in control.",
      icon: "layout-dashboard",
    },
    {
      title: "Brand Voice System",
      description:
        "Your tone, style, emojis, hashtags, and content pillars baked into the AI prompts. Every post sounds like you, not a robot.",
      icon: "mic",
    },
    {
      title: "VPS Deployment (Your Server)",
      description:
        "Deployed on a server you own. No vendor lock-in, no surprise price hikes, no data leaving your infrastructure.",
      icon: "server",
    },
  ],
  howItWorks: [
    {
      step: "Configure",
      title: "Brand Voice & Content Pillars",
      description: "Upload your brand guidelines, tone examples, past posts. Set content pillars and topics.",
      icon: "settings",
      color: "blue",
    },
    {
      step: "Generate",
      title: "Claude AI Creates Content",
      description: "Claude Sonnet 4.5 generates platform-optimized posts matching your brand voice.",
      icon: "sparkles",
      color: "purple",
    },
    {
      step: "Review",
      title: "Approve in Dashboard",
      description: "Preview posts as they'll appear on X and Threads. Edit, approve, or regenerate.",
      icon: "eye",
      color: "green",
    },
    {
      step: "Publish",
      title: "Auto-Post on Schedule",
      description: "Approved posts are queued and published at optimal times via X API & Threads API.",
      icon: "send",
      color: "orange",
    },
  ],
  features: [
    {
      title: "AI Content Generation",
      items: [
        "Claude Sonnet 4.5 for cost-efficient, high-quality output",
        "Platform-specific formatting (X character limits, Threads styling)",
        "Hashtag generation, emoji placement, CTA insertion",
        "Thread/carousel support for longer content",
      ],
    },
    {
      title: "Posting & Scheduling",
      items: [
        "Direct X API v2 integration (OAuth 2.0)",
        "Threads via Instagram Graph API / Meta Business Suite",
        "Cron-based scheduling with timezone support",
        "Queue management with retry on failure",
      ],
    },
    {
      title: "Dashboard & Control",
      items: [
        "Content calendar view (week/month)",
        "Post preview (see exactly what goes live)",
        "Bulk generation and approval workflows",
        "Post history with status tracking",
      ],
    },
    {
      title: "Safety & Reliability",
      items: [
        "Content moderation filters before posting",
        "Duplicate detection to avoid repeat posts",
        "Rate limit management for both APIs",
        "Error alerts and auto-retry logic",
      ],
    },
  ],
  techStack: [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "UI" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Claude API (Sonnet 4.5)", category: "AI" },
    { name: "X API v2", category: "Posting" },
    { name: "Threads API", category: "Posting" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Cron / Node Schedule", category: "Scheduling" },
    { name: "VPS (Linux)", category: "Hosting" },
  ],
  discoveryQuestions: [
    {
      category: "Content Strategy",
      questions: [
        "How many posts per day/week on each platform (X and Threads)?",
        "What content types? Text-only, text + images, threads/carousels?",
        "Do you have existing brand guidelines or tone examples we can feed the AI?",
        "What are your main content pillars / topics?",
      ],
    },
    {
      category: "Workflow & Approval",
      questions: [
        "Do you want full autopilot or manual approval before each post?",
        "Who on your team will be reviewing content?",
        "Do you need role-based access (e.g., creator vs. approver)?",
      ],
    },
    {
      category: "Technical Requirements",
      questions: [
        "Do you already have X API (Twitter Developer) access?",
        "Do you have Meta Business Suite / Instagram Graph API access for Threads?",
        "Any existing content sources to pull from? (RSS feeds, Google Sheets, Notion, CRM)",
        "Do you need image generation alongside text? (Flux, DALL-E, etc.)",
      ],
    },
    {
      category: "Scale & Future",
      questions: [
        "How many accounts do you manage? Just one X + one Threads, or multiple?",
        "Do you need engagement automation (auto-reply, like, repost)?",
        "Would you want analytics/reporting on post performance?",
      ],
    },
  ],
};

// Demo mock data
export const demoData = {
  appName: "PostPilot",
  tagline: "AI Social Media Engine",
  user: {
    name: "Dan Gold",
    email: "dan@checkpointgroup.com",
    company: "CheckPoint Group",
    initials: "DG",
  },
  brandVoice: {
    tone: "Professional yet approachable, thought-leader in tech/business",
    emojis: "Minimal, strategic placement",
    hashtags: ["#AI", "#Automation", "#GrowthHacking", "#TechLeadership", "#SocialMedia"],
    contentPillars: [
      "AI & Automation Trends",
      "Business Growth Strategies",
      "Tech Industry Insights",
      "Team & Company Culture",
    ],
  },
  stats: {
    postsScheduled: 12,
    postsPublished: 47,
    avgEngagement: "4.2%",
    contentGenerated: 156,
  },
  scheduledPosts: [
    {
      id: 1,
      platform: "x" as const,
      content: "The companies winning right now aren't the ones with the most employees — they're the ones with the smartest automations.\n\nWe just saved 23 hours/week by letting AI handle our content pipeline.\n\nHere's what we learned (thread) 🧵",
      scheduledFor: "Today, 2:00 PM EST",
      status: "approved" as const,
      type: "thread",
    },
    {
      id: 2,
      platform: "threads" as const,
      content: "Hot take: Most \"AI tools\" are just fancy wrappers around an API call.\n\nThe real magic? Building custom workflows that actually understand YOUR business.\n\nStop renting. Start owning your automation stack.",
      scheduledFor: "Today, 4:30 PM EST",
      status: "approved" as const,
      type: "single",
    },
    {
      id: 3,
      platform: "x" as const,
      content: "3 things I wish I knew before scaling our marketing team:\n\n1. Automate content creation, not creativity\n2. AI writes the first draft — humans add the soul\n3. Consistency beats virality every single time\n\nWhat would you add?",
      scheduledFor: "Tomorrow, 10:00 AM EST",
      status: "pending" as const,
      type: "single",
    },
    {
      id: 4,
      platform: "threads" as const,
      content: "We tested posting 2x/day vs 5x/day on Threads for 30 days.\n\nResults:\n→ 2x/day: Higher engagement per post\n→ 5x/day: 3x more total reach\n\nOur sweet spot? 3x/day with AI-generated content + manual curation.",
      scheduledFor: "Tomorrow, 1:00 PM EST",
      status: "pending" as const,
      type: "single",
    },
    {
      id: 5,
      platform: "x" as const,
      content: "The future of social media marketing isn't hiring more people.\n\nIt's this:\n→ AI generates 10 post variations\n→ You pick the best 3\n→ System auto-posts at peak times\n→ Analytics tell you what's working\n\nTotal time spent: 15 minutes/day.",
      scheduledFor: "Wed, 9:00 AM EST",
      status: "draft" as const,
      type: "single",
    },
  ],
  postHistory: [
    {
      id: 101,
      platform: "x" as const,
      content: "Just deployed an AI agent that handles our entire content calendar. From idea to published post in under 30 seconds...",
      postedAt: "Yesterday, 2:00 PM",
      likes: 142,
      reposts: 38,
      replies: 24,
      views: 12400,
    },
    {
      id: 102,
      platform: "threads" as const,
      content: "Stop using 10 different tools for social media. Build one system that does everything...",
      postedAt: "Yesterday, 11:00 AM",
      likes: 89,
      replies: 15,
      reposts: 12,
      views: 5600,
    },
    {
      id: 103,
      platform: "x" as const,
      content: "AI won't replace marketers. But marketers who use AI will replace those who don't...",
      postedAt: "2 days ago",
      likes: 267,
      reposts: 71,
      replies: 43,
      views: 28900,
    },
  ],
  generationSteps: [
    "Loading brand voice guidelines...",
    "Analyzing content pillars...",
    "Generating post with Claude AI...",
    "Optimizing for platform...",
    "Checking content safety...",
  ],
  sampleGeneratedPosts: {
    x: {
      single: "Every company will be an AI company within 5 years.\n\nBut here's what nobody talks about:\n\nThe winners won't be the ones who adopt AI first.\nThey'll be the ones who integrate it deepest.\n\nSurface-level automation = commoditized.\nCustom AI workflows = competitive moat.\n\nWhich are you building?",
      thread: [
        "I've spent the last 6 months building AI automations for businesses.\n\nHere are 7 lessons that changed how I think about scaling with AI:\n\n🧵👇",
        "1/ Start with the bottleneck, not the hype.\n\nDon't automate something because you can. Automate because it's blocking growth.\n\nOur biggest wins came from automating the boring stuff nobody wanted to do.",
        "2/ AI-generated content needs a human filter.\n\nNot because AI is bad — it's actually really good. But your audience can tell when something has soul vs when it's just... correct.\n\nThe workflow: AI drafts → human refines → system publishes.",
        "3/ Cost efficiency matters more than you think.\n\nWe switched from GPT-4 to Claude Sonnet and cut our API costs by 60% while maintaining quality.\n\nAlways benchmark. The most expensive model isn't always the best for your use case.",
      ],
    },
    threads: {
      single: "Built an AI that writes our social media posts.\n\nBut here's the thing — I still edit every single one.\n\nNot because the AI is bad. It's actually scary good.\n\nI edit because the best content has a human fingerprint. AI gives you speed. You add the spark.\n\nThat's the formula nobody talks about.",
    },
  },
};
