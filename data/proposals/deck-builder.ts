// Proposal data for Aleksander Johansen (AJ)
// AI-Powered Deck Builder — February 2026

export const proposalData = {
  client: {
    name: "AJ",
    contact: "Aleksander Johansen",
    location: "Norway",
  },
  project: {
    title: "AI-Powered Deck Builder",
    subtitle:
      "Google Slides template engine with constraint enforcement & AI content generation",
    description:
      "A system that takes your business context and automatically generates a polished investor pitch deck in Google Slides — with locked fonts, sizes, positions, character limits, and image placements. Every generated deck looks professional, every time.",
  },
  fixedPrice: {
    price: "$600",
    timeline: "5–7 days",
    label: "Fixed Price Project",
  },
  whatWeSuggest: [
    {
      title: "Python Backend (Not n8n)",
      description:
        "A real codebase you can version, test, and extend. No fragile visual flows that break silently — proper error handling, retry logic, and type safety out of the box.",
      icon: "code",
      highlight: true,
    },
    {
      title: "Template-Spec JSON Schema",
      description:
        "Each slide type defined as structured JSON — heading char limits, font rules, image positions, logo placement. Single source of truth the whole system reads from.",
      icon: "file-json",
      highlight: true,
    },
    {
      title: "Google Slides API Integration",
      description:
        "Apps Script / Slides API script that takes a storyboard JSON and builds the deck — enforcing every constraint automatically. No manual formatting needed.",
      icon: "zap",
    },
    {
      title: "LLM-Powered Content Generation",
      description:
        "Claude API generates storyboard content within template constraints. Headings that fit, body text that doesn't overflow, copy that actually sells.",
      icon: "sparkles",
    },
    {
      title: "Variant Selection",
      description:
        "2–3 content variants per slide — different angles for 'The Problem', different hooks for the cover. Pick the best one, discard the rest.",
      icon: "layout-dashboard",
    },
    {
      title: "Wireframe + Designed Output",
      description:
        "See your deck as a wireframe storyboard first (structure + constraints visible), then switch to the polished investor-ready version.",
      icon: "eye",
    },
  ],
  howItWorks: [
    {
      step: "Define",
      title: "Template Specs",
      description:
        "JSON schema defines 6 slide types with fonts, sizes, char limits, image positions, logo rules.",
      icon: "settings",
      color: "blue",
    },
    {
      step: "Input",
      title: "Business Context",
      description:
        "Company name, problem, solution, market size, traction, funding ask — plain text input.",
      icon: "send",
      color: "purple",
    },
    {
      step: "Generate",
      title: "AI Storyboard",
      description:
        "Claude generates content for each slide type, respecting character limits. 2–3 variants per slide.",
      icon: "sparkles",
      color: "green",
    },
    {
      step: "Build",
      title: "Google Slides Deck",
      description:
        "Slides API assembles the deck — enforcing fonts, sizes, positions, images. Pixel-perfect every time.",
      icon: "zap",
      color: "orange",
    },
  ],
  deliverables: [
    {
      title: "Template-Spec JSON Schema",
      description:
        "Structured config for 6 slide types (Cover, Problem, Solution, Market, Traction, Ask). Defines heading/body character limits, font families & sizes, image dimensions & positions, logo placement rules.",
      included: true,
    },
    {
      title: "Wireframe Storyboard in Google Slides",
      description:
        "6 wireframe-style slides with visible constraints — placeholder boxes, character limits annotated, layout grid. Shows the template structure before content fills in.",
      included: true,
    },
    {
      title: "2–3 Designed Slides",
      description:
        "Polished, investor-ready versions of the same templates. Real typography, colors, branding. Shows the final output quality your users will get.",
      included: true,
    },
    {
      title: "Apps Script / Slides API Constraint Engine",
      description:
        "Script that takes storyboard JSON and builds the deck — enforcing fonts, sizes, char limits, image dimensions, logo position. The engine that keeps every deck professional.",
      included: true,
    },
    {
      title: "Python Backend",
      description:
        "Takes business context, calls Claude API, generates storyboard content within template constraints, pushes to Google Slides. Proper codebase — testable, version-controlled, extendable.",
      included: true,
    },
    {
      title: "Variant Selection (2–3 per slide)",
      description:
        "Different content angles per slide — e.g., 'The Problem' vs 'Why This Matters Now' vs 'The $12B Pain Point'. You pick the winner.",
      included: true,
    },
  ],
  techStack: [
    { name: "Python", category: "Backend" },
    { name: "Claude API", category: "AI / LLM" },
    { name: "Google Slides API", category: "Deck Generation" },
    { name: "Google Apps Script", category: "Constraint Enforcement" },
    { name: "JSON Schema", category: "Template Specs" },
    { name: "FastAPI", category: "API Layer" },
  ],
  discoveryQuestions: [
    {
      category: "Templates & Design",
      questions: [
        "Do you have existing pitch deck designs / brand guidelines we should match?",
        "Beyond the 6 core slides — any other slide types needed? (Team, Product Screenshots, Competitive Landscape, Pricing)",
        "Should the wireframe storyboard be a separate Google Slides file or part of the same deck?",
        "Any specific fonts / colors / logo files you want enforced?",
      ],
    },
    {
      category: "Content & AI",
      questions: [
        "What business context inputs should the user provide? (Just text, or also structured fields like industry, stage, revenue?)",
        "How many content variants per slide? 2 or 3?",
        "Should the AI generate image suggestions / descriptions alongside text?",
        "Any specific tone — formal investor language, or more casual startup-pitch style?",
      ],
    },
    {
      category: "Technical & Integration",
      questions: [
        "Do you have a Google Workspace account we can use for Slides API access?",
        "Should generated decks be saved to a specific Google Drive folder?",
        "Do you need the Python backend deployed somewhere, or just the source code for now?",
        "Any existing n8n flows or webhooks this needs to connect to later?",
      ],
    },
    {
      category: "Scope & Next Steps",
      questions: [
        "Is this demo the proof-of-concept before the full MVP (React app, frontend editor, etc.)?",
        "Who's the end user — you building decks for clients, or your users self-serving?",
        "Timeline preference — fast delivery (5 days) or more polished (7 days)?",
      ],
    },
  ],
};
