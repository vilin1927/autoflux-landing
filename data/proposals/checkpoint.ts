// Proposal data for CheckPoint Group Inc / Toronto Watch Exchange (Dan Gold)
// AI Video Content Generator — February 2026

export const proposalData = {
  client: {
    name: "Toronto Watch Exchange",
    contact: "Dan Gold",
    handle: "@torontowatchexchange",
    location: "Toronto, Canada",
  },
  project: {
    title: "AI Video Content Generator",
    appName: "ReelPilot",
    subtitle:
      "HeyGen avatar videos with Claude scripting, branded overlays & auto-posting",
    description:
      "A custom-built system that writes watch-content scripts with Claude AI, renders talking-head videos through HeyGen, adds branded overlays with FFmpeg, and auto-posts to Instagram, TikTok, and X — with a dashboard for full control.",
  },
  pricing: {
    development: { min: 1200, max: 1500, label: "Development (one-time)" },
    monthly: [
      { name: "HeyGen API", cost: 99, note: "Video rendering (Creator plan)" },
      { name: "Claude API", cost: "~$2–5", note: "Script generation (Haiku 4.5)" },
      { name: "VPS Hosting", cost: "~$6", note: "Hetzner / DigitalOcean" },
    ],
  },
  currentContent: [
    {
      title: "Hot or Not",
      description:
        "Quick takes on whether a watch is worth the hype. High engagement, punchy format.",
      icon: "flame",
    },
    {
      title: "Market Updates",
      description:
        "Price movement breakdowns for Rolex, AP, Patek — what's up, what's down.",
      icon: "trending-up",
    },
    {
      title: "Watch Reviews",
      description:
        "In-depth looks at specific references. Specs, wrist presence, value proposition.",
      icon: "eye",
    },
    {
      title: "Talking Head",
      description:
        "Direct-to-camera commentary and opinions. Personality-driven content.",
      icon: "user",
    },
  ],
  positioningNote:
    "This isn't about replacing Dan on camera — it's about giving him a content machine that produces 5–10x more videos per week while he focuses on deals and clients. The AI avatar handles the volume; Dan brings the personality for key pieces.",
  whatWellBuild: [
    {
      title: "Claude Script Engine",
      description:
        "Claude Haiku 4.5 writes 30–60 second scripts in Dan's voice — punchy, opinionated, watch-nerd friendly. Topic in, teleprompter-ready script out.",
      icon: "pen-tool",
      highlight: true,
    },
    {
      title: "HeyGen Video Rendering",
      description:
        "Photo Avatar speaks the script with natural lip-sync and gestures. No filming, no editing, no studio time.",
      icon: "video",
      highlight: true,
    },
    {
      title: "FFmpeg Branded Overlays",
      description:
        "TWX logo, topic caption, follow CTA, and watch images composited onto each video automatically.",
      icon: "layers",
    },
    {
      title: "Auto-Post to 3 Platforms",
      description:
        "One click → Instagram Reels, TikTok, and X. Captions and hashtags adapted per platform.",
      icon: "send",
    },
    {
      title: "Approval Dashboard",
      description:
        "Review scripts, preview rendered videos, edit captions, approve or reject — before anything goes live.",
      icon: "layout-dashboard",
    },
    {
      title: "VPS Deployment",
      description:
        "Runs on your own server. No vendor lock-in, no surprise fees, full data ownership.",
      icon: "server",
    },
  ],
  howItWorks: [
    {
      step: "Topic",
      title: "Pick a Topic",
      description:
        "Choose a watch, trend, or hot take — or let Claude suggest one from market data.",
      icon: "pen-tool",
      color: "blue",
    },
    {
      step: "Script",
      title: "Claude Writes the Script",
      description:
        "Claude Haiku 4.5 generates a 30–60s teleprompter-ready script in your voice.",
      icon: "sparkles",
      color: "purple",
    },
    {
      step: "Render",
      title: "HeyGen Renders Video",
      description:
        "Photo Avatar speaks the script. FFmpeg adds logo, captions, and overlays.",
      icon: "video",
      color: "green",
    },
    {
      step: "Post",
      title: "Approve & Auto-Post",
      description:
        "Preview the final video, then one-click publish to Instagram, TikTok, and X.",
      icon: "send",
      color: "orange",
    },
  ],
  avatarOptions: {
    recommended: {
      name: "Photo Avatar",
      description:
        "Upload a few photos of Dan → HeyGen creates a realistic talking avatar. Best quality-to-effort ratio. Looks natural, fast to set up.",
      badge: "Recommended",
    },
    alternatives: [
      {
        name: "Digital Twin (Studio)",
        description:
          "Record a 2-minute calibration video → HeyGen builds a high-fidelity clone. Best quality but requires a studio session.",
      },
      {
        name: "Stock Avatar",
        description:
          "Use a HeyGen stock presenter. Zero setup but doesn't look like Dan. Good for testing the pipeline before committing.",
      },
    ],
    youtubeReference: "https://www.youtube.com/watch?v=MYUFRRfNPnA",
  },
  features: [
    {
      title: "AI Script Generation",
      items: [
        "Claude Haiku 4.5 for fast, cost-efficient scripts",
        "Brand voice system trained on Dan's style",
        "30–60 second format optimized for Reels/TikTok",
        "Topic suggestions from watch market trends",
      ],
    },
    {
      title: "Video Rendering",
      items: [
        "HeyGen Photo Avatar with natural lip-sync",
        "FFmpeg overlay pipeline (logo, captions, CTAs)",
        "9:16 vertical format for all platforms",
        "Batch rendering for content-ahead scheduling",
      ],
    },
    {
      title: "Multi-Platform Posting",
      items: [
        "Instagram Reels via Graph API",
        "TikTok via Content Posting API",
        "X (Twitter) via API v2 video upload",
        "Platform-specific captions and hashtags",
      ],
    },
    {
      title: "Dashboard & Control",
      items: [
        "Script preview and edit before rendering",
        "Video preview before posting",
        "Queue management with scheduling",
        "Post history with engagement metrics",
      ],
    },
  ],
  techStack: [
    { name: "Next.js", category: "Frontend" },
    { name: "Claude Haiku 4.5", category: "AI Scripting" },
    { name: "HeyGen API", category: "Video Rendering" },
    { name: "FFmpeg", category: "Overlays" },
    { name: "IG Graph API", category: "Posting" },
    { name: "TikTok API", category: "Posting" },
    { name: "X API v2", category: "Posting" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Cron", category: "Scheduling" },
    { name: "VPS (Linux)", category: "Hosting" },
  ],
  discoveryQuestions: [
    {
      category: "Avatar & Video Style",
      questions: [
        "Are you open to doing a quick photo session for the HeyGen Photo Avatar?",
        "Do you want the avatar to be you, or are you okay with a stock presenter for V1?",
        "Any specific background or setting you'd want (studio, office, watch display)?",
        "Should videos include watch images/b-roll overlays, or talking head only?",
      ],
    },
    {
      category: "Content & Scripting",
      questions: [
        "What are the top 5 watch brands/models you cover most?",
        "How do you want the tone — straight expert, or more casual/entertaining?",
        "Should the AI pull from any data sources for market prices (Chrono24, WatchCharts)?",
        "Do you have existing scripts or video transcripts we can train the voice on?",
      ],
    },
    {
      category: "Posting & Schedule",
      questions: [
        "How many videos per week do you want to target?",
        "Which platforms are priority — Instagram, TikTok, X, or all three equally?",
        "Do you want full autopilot or manual approval before each post?",
        "What time zones / posting windows work best for your audience?",
      ],
    },
    {
      category: "Phase 2 & Growth",
      questions: [
        "Would you want a 'Hot or Not' template with watch image + quick verdict?",
        "Interest in a 'Market Minute' format with price tickers and charts?",
        "Would voice cloning (so the avatar sounds like you) be valuable?",
        "Do you need engagement analytics (views, likes, shares) tracked in the dashboard?",
      ],
    },
  ],
  phase2: [
    {
      title: "Hot or Not Template",
      description:
        "Pre-built video template: watch image slides in, avatar gives a 15-second verdict, verdict graphic overlays. High engagement, fast to produce.",
    },
    {
      title: "Market Minute",
      description:
        "Automated weekly market update: pulls price data from WatchCharts/Chrono24, avatar narrates the top movers with ticker graphics.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track views, likes, comments, shares, and follower growth across all three platforms. See which topics and formats perform best.",
    },
    {
      title: "Voice Cloning",
      description:
        "Clone Dan's voice so the avatar sounds exactly like him. HeyGen supports this with a short voice sample. Major authenticity upgrade.",
    },
  ],
};

// Demo mock data
export const demoData = {
  appName: "ReelPilot",
  tagline: "AI Video Content Engine",
  user: {
    name: "Dan Gold",
    company: "Toronto Watch Exchange",
    initials: "DG",
    handle: "@torontowatchexchange",
  },
  stats: {
    videosGenerated: 34,
    videosPosted: 28,
    platformsActive: 3,
    avgRenderTime: "2m 14s",
  },
  sampleTopics: [
    "Rolex Submariner 124060 — still the king?",
    "AP Royal Oak vs Nautilus in 2026",
    "3 watches under $5K that hold value",
    "Why Tudor is the smart money play",
    "Hot or Not: Cartier Santos",
  ],
  generationSteps: [
    "Analyzing topic & market data...",
    "Writing script with Claude AI...",
    "Sending script to HeyGen...",
    "Rendering avatar video...",
    "Compositing branded overlays...",
    "Encoding final 9:16 video...",
  ],
  sampleScript: {
    topic: "Rolex Submariner 124060 — still the king?",
    duration: "45s",
    text: `Let's talk about the Rolex Submariner 124060.

Is it still the king of dive watches in 2026? Short answer — yes, but it's complicated.

At current market, you're looking at about fourteen-five to fifteen thousand. That's actually down from the peak, which means it's a better buy now than it was two years ago.

The 41mm case, the new-gen movement, the no-date clean dial — it's Rolex at its most iconic.

But here's the thing. Tudor Pelagos 39 does 90% of what this watch does at a third of the price.

So is the Sub still the king? For prestige and resale — absolutely. For pure value? The crown is slipping.

Follow for more watch market takes.`,
  },
  videoPreview: {
    resolution: "1080x1920",
    format: "9:16 Vertical",
    overlays: ["TWX Logo (top-left)", "Topic Caption (bottom)", "Follow CTA (end card)"],
  },
  scheduledVideos: [
    {
      id: 1,
      topic: "Rolex Submariner 124060 — still the king?",
      platforms: ["instagram", "tiktok", "x"] as const,
      scheduledFor: "Today, 2:00 PM EST",
      status: "approved" as const,
      duration: "0:45",
    },
    {
      id: 2,
      topic: "AP Royal Oak vs Nautilus in 2026",
      platforms: ["instagram", "tiktok"] as const,
      scheduledFor: "Today, 5:00 PM EST",
      status: "rendering" as const,
      duration: "0:52",
    },
    {
      id: 3,
      topic: "3 watches under $5K that hold value",
      platforms: ["instagram", "tiktok", "x"] as const,
      scheduledFor: "Tomorrow, 10:00 AM EST",
      status: "pending" as const,
      duration: "1:03",
    },
    {
      id: 4,
      topic: "Why Tudor is the smart money play",
      platforms: ["instagram", "x"] as const,
      scheduledFor: "Tomorrow, 3:00 PM EST",
      status: "draft" as const,
      duration: "0:38",
    },
    {
      id: 5,
      topic: "Hot or Not: Cartier Santos",
      platforms: ["tiktok"] as const,
      scheduledFor: "Wed, 12:00 PM EST",
      status: "pending" as const,
      duration: "0:30",
    },
  ],
  postHistory: [
    {
      id: 101,
      topic: "Omega Speedmaster — overrated or underrated?",
      platform: "instagram" as const,
      postedAt: "Yesterday, 2:00 PM",
      views: 14200,
      likes: 892,
      comments: 67,
      shares: 43,
    },
    {
      id: 102,
      topic: "Why the watch market is cooling off",
      platform: "tiktok" as const,
      postedAt: "Yesterday, 11:00 AM",
      views: 28400,
      likes: 1340,
      comments: 156,
      shares: 89,
    },
    {
      id: 103,
      topic: "Top 3 entry-level luxury watches",
      platform: "x" as const,
      postedAt: "2 days ago",
      views: 8900,
      likes: 412,
      comments: 38,
      shares: 71,
    },
  ],
};
