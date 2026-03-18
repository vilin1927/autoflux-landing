// Proposal data for CheckPoint Group Inc / Toronto Watch Exchange (Dan Gold)
// WatchCash AI Brain — Knowledge Base & Team Assistant — March 2026

export const aiBrainProposalData = {
  client: {
    name: "Toronto Watch Exchange",
    contact: "Dan Gold",
    handle: "@torontowatchexchange",
    location: "Toronto, Canada",
  },
  project: {
    title: "WatchCash AI Brain",
    appName: "WatchCash Brain",
    subtitle:
      "Your business knowledge — searchable, instant, always available",
    description:
      "A private AI assistant trained on your recorded calls, scripts, SOPs, and mind maps. Your entire team asks it questions in plain English and gets accurate answers sourced from your actual business knowledge — not generic AI responses.",
  },
  pricing: {
    total: 1200,
    payment: [
      {
        name: "Project Start (50%)",
        amount: 600,
        note: "Upon agreement — I start building immediately",
      },
      {
        name: "Delivery (50%)",
        amount: 600,
        note: "When the system is live and working on your VPS",
      },
    ],
    monthly: [
      {
        name: "Gemini AI API",
        cost: "$5–8",
        note: "Powers the AI answers (Gemini 3.1 Flash — top-tier quality)",
      },
      {
        name: "Deepgram API",
        cost: "$0",
        note: "$200 free credits included — covers 775+ hours of transcription",
      },
      {
        name: "Embeddings (OpenAI)",
        cost: "<$1",
        note: "Text indexing — pennies per month",
      },
      {
        name: "Vector Database",
        cost: "$0",
        note: "Pinecone free tier — more than enough for your data",
      },
      {
        name: "Hosting",
        cost: "$0",
        note: "Runs on your existing VPS — no extra server needed",
      },
    ],
    totalMonthly: "~$5–10/mo",
    comparisonNote:
      "For comparison: ChatGPT Teams costs $25/user/month and doesn't know your business. This costs $5-10/mo total for unlimited users and knows everything about WatchCash.",
  },
  theProblem: [
    {
      title: "Knowledge is Trapped",
      description:
        "Your best insights are locked in recorded calls, scattered scripts, and documents only you know about. When a team member needs an answer, they wait for you.",
      icon: "lock",
    },
    {
      title: "Nothing is Searchable",
      description:
        "Audio recordings can't be searched. SOPs live in different places. Mind maps aren't connected to anything. Finding specific information takes forever.",
      icon: "search-x",
    },
    {
      title: "You're the Bottleneck",
      description:
        "Every question about process, pricing, or strategy goes through you. That doesn't scale when you're growing the team and closing deals.",
      icon: "user-x",
    },
    {
      title: "Generic AI Doesn't Help",
      description:
        "ChatGPT gives generic answers. It doesn't know your pricing, your SOPs, your watch authentication process, or what you said on last week's call.",
      icon: "bot-off",
    },
  ],
  whatYouGet: [
    {
      title: "Full Audio Transcription",
      description:
        "Every recorded call, Zoom meeting, and audio file — transcribed with Deepgram Nova-3 (industry-leading accuracy). Searchable forever.",
      icon: "headphones",
      highlight: true,
    },
    {
      title: "Document Ingestion",
      description:
        "Scripts, SOPs, mind maps, training materials, FAQs — everything chunked, indexed, and connected so the AI understands context across all your docs.",
      icon: "file-text",
      highlight: true,
    },
    {
      title: "AI Chat Interface",
      description:
        "Clean web app where you and your team ask questions in plain English. Get accurate answers with source references — which call, which document, which page.",
      icon: "message-square",
      highlight: false,
    },
    {
      title: "Upload Panel",
      description:
        "Add new calls, docs, and files anytime through a simple upload interface. The AI Brain grows with your business — no developer needed.",
      icon: "upload",
      highlight: false,
    },
    {
      title: "Multi-User Access",
      description:
        "You and your entire team use it. Everyone gets the same accurate answers. New hires get up to speed in days, not weeks.",
      icon: "users",
      highlight: false,
    },
    {
      title: "Source Citations",
      description:
        "Every answer includes exactly where the information came from — the specific call, document, or SOP. Verify anything in seconds.",
      icon: "quote",
      highlight: false,
    },
  ],
  howItWorks: [
    {
      step: "Ingest",
      title: "I Load Your Knowledge",
      description:
        "You send me your calls, Zoom recordings, scripts, SOPs, and mind maps. I transcribe everything and index it into the AI Brain.",
      icon: "database",
      color: "blue",
    },
    {
      step: "Index",
      title: "AI Understands It All",
      description:
        "Every piece of content is broken into smart chunks, embedded with AI, and stored in a vector database — searchable by meaning, not just keywords.",
      icon: "sparkles",
      color: "purple",
    },
    {
      step: "Ask",
      title: "Your Team Asks Questions",
      description:
        'Open the web app, type a question like "What\'s our process for Patek authentication?" — get an instant, accurate answer.',
      icon: "message-square",
      color: "green",
    },
    {
      step: "Grow",
      title: "Keep Adding Knowledge",
      description:
        "Upload new calls and docs anytime through the upload panel. The Brain gets smarter as your business grows.",
      icon: "trending-up",
      color: "orange",
    },
  ],
  exampleQuestions: [
    "What did Dan say about pricing strategy for AP Royal Oaks on the call last Tuesday?",
    "What's our SOP for authenticating a Patek Philippe?",
    "How do we handle returns on watches over $10K?",
    "What are the key talking points from the last team training?",
    "What did we decide about the new consignment process?",
    "Summarize the top 3 takeaways from last month's sales calls",
  ],
  whatINeedFromYou: [
    {
      title: "Recorded Calls & Zoom Meetings",
      description:
        "Any format works — MP3, MP4, WAV, Zoom cloud recordings, or even transcripts you already have. I handle all conversions.",
      format: "Audio/video files or existing transcripts",
      icon: "mic",
    },
    {
      title: "Scripts & SOPs",
      description:
        "Sales scripts, standard operating procedures, process docs. Google Docs, Word, PDF — anything text-based.",
      format: "Google Docs, PDF, Word, or plain text",
      icon: "file-text",
    },
    {
      title: "Mind Maps & Training Materials",
      description:
        "Any visual guides, flowcharts, mind maps, training decks, or FAQs your team uses. Export as PDF or images.",
      format: "PDF exports, images, or text versions",
      icon: "git-branch",
    },
    {
      title: "5 Minutes of Your Time",
      description:
        "Quick call to set up access to your VPS and walk through how your team will use it. That's it — I handle everything else.",
      format: "One short call",
      icon: "clock",
    },
  ],
  techStack: [
    { name: "Next.js", category: "Chat Interface" },
    { name: "FastAPI", category: "Backend API" },
    { name: "Gemini 3.1 Flash", category: "AI Answers" },
    { name: "Deepgram Nova-3", category: "Transcription" },
    { name: "Pinecone", category: "Vector Database" },
    { name: "OpenAI Embeddings", category: "Text Indexing" },
    { name: "PostgreSQL", category: "Database" },
    { name: "VPS (Linux)", category: "Hosting" },
  ],
  timeline: [
    {
      week: "Week 1",
      title: "Transcription & Ingestion",
      tasks: [
        "Transcribe all audio/video files",
        "Process all documents and SOPs",
        "Set up vector database with embeddings",
        "Build RAG chat backend",
      ],
    },
    {
      week: "Week 2",
      title: "Chat UI, Deploy & Handoff",
      tasks: [
        "Build chat interface + upload panel",
        "Multi-user authentication",
        "Deploy to your VPS",
        "Testing with your real data + team walkthrough",
      ],
    },
  ],
  phase2: [
    {
      title: "Slack / WhatsApp Integration",
      description:
        "Ask the AI Brain questions directly from Slack or WhatsApp — no need to open the web app.",
    },
    {
      title: "Auto-Ingest New Calls",
      description:
        "Automatically pull new Zoom recordings and transcribe them — the Brain stays current without manual uploads.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "See what questions your team asks most, identify knowledge gaps, and track usage across team members.",
    },
  ],
};

// Demo mock data for the AI Brain
export const aiBrainDemoData = {
  appName: "WatchCash Brain",
  tagline: "Your Business Knowledge, Instantly",
  user: {
    name: "Dan Gold",
    company: "Toronto Watch Exchange",
    initials: "DG",
  },
  stats: {
    documentsIndexed: 156,
    hoursTranscribed: 47,
    questionsAnswered: 892,
    teamMembers: 4,
  },
  sampleConversation: [
    {
      role: "user" as const,
      message: "What's our authentication process for Patek Philippe watches?",
    },
    {
      role: "assistant" as const,
      message:
        "Based on your SOPs and the training call from Feb 12, here's the Patek authentication process:\n\n1. **Serial number verification** — Check against Patek's registry (call their Geneva office)\n2. **Movement inspection** — Open caseback, verify Patek caliber markings\n3. **Dial markers** — Check print quality, lume consistency, applied vs printed indices\n4. **Papers & box** — Verify certificate of origin matches serial\n5. **Photo documentation** — 12-point photo set for records\n\nDan noted on the Feb 12 training call: \"If anything feels off at step 2, stop and send to our watchmaker before going further.\"",
      sources: [
        "SOP: Watch Authentication Process v3.pdf",
        "Call: Team Training — Feb 12, 2026 (timestamp: 14:32)",
      ],
    },
  ],
  recentQuestions: [
    "How do we price consignment vs outright purchase?",
    "What's the return policy for watches over $10K?",
    "Summarize Dan's pricing strategy from last week's call",
    "What are the top 5 watch brands we focus on?",
    "How do we handle international shipping insurance?",
  ],
};
