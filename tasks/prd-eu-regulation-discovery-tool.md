# PRD: EU Regulation Discovery Tool - Proposal Demo System

## 1. Introduction/Overview

AutoFlux needs a compelling way to showcase capabilities to potential Upwork clients. Instead of writing text-based proposals, we'll **show** a working demo alongside a professional proposal page.

This first implementation is for **Orgonic-Art (Raphael, Germany)** who needs an EU Regulation Discovery Tool MVP for investor pitches. The proposal will be deployed at `autoflux.digital/proposals/orgonic-art-raphael`.

**The deliverable consists of two pages:**
1. **Proposal Page** - A stunning landing page that presents AutoFlux's approach, timeline, and pricing
2. **RegScope Demo** - A fully interactive frontend mockup of the actual product

## 2. Goals

1. **Win the Upwork contract** by demonstrating capability rather than just describing it
2. **Showcase AutoFlux's design and development quality** through the proposal page itself
3. **Provide a realistic product preview** that the client can show to investors
4. **Create a foundation** for a reusable proposal system for future clients
5. **Maintain brand consistency** with the existing AutoFlux design system

## 3. User Stories

### For the Client (Raphael)
- As a potential client, I want to see a live demo of what my product could look like so I can evaluate the developer's capabilities
- As a potential client, I want to understand the development approach and timeline so I can make an informed decision
- As a potential client, I want to show the demo to my investors so they can visualize the product concept

### For AutoFlux
- As the agency, I want to present proposals in a memorable, differentiated way so I win more contracts
- As the agency, I want the proposal system to be reusable so I can quickly create proposals for future clients

## 4. Functional Requirements

### 4.1 Proposal Page (`/proposals/orgonic-art-raphael`)

#### Header Section
1. The page must display the project title "EU Regulation Discovery Tool"
2. The page must show a badge/eyebrow "Proposal for Orgonic-Art"
3. The page must include key stats in a visually appealing format:
   - $450 fixed price
   - 5-7 days delivery
   - 90% JSS (Job Success Score)
   - 5+ years experience

#### Hero Section
4. The page must have a prominent "View Live Demo" CTA button linking to `/proposals/orgonic-art-raphael/demo`
5. The hero must clearly communicate the value proposition

#### Approach Section
6. The page must display 6 approach cards explaining the solution:
   - Smart Questionnaire (onboarding form)
   - AI Business Profiling (OpenAI GPT-5.2)
   - EUR-Lex Integration (REST API search)
   - AI Matching & Summary
   - Clean Dashboard
   - Simple Auth (Supabase)

#### Timeline Section
7. The page must show a timeline visualization:
   - Days 1-2: Foundation (Setup, questionnaire, basic auth)
   - Days 3-4: AI Integration (Business profiling, EUR-Lex API, matching)
   - Days 5-7: Dashboard & Polish (Results UI, testing, deployment)

#### Demo CTA Section
8. The page must include a prominent "View Live Demo" CTA section
9. The CTA must link to `/proposals/orgonic-art-raphael/demo`

#### Pricing Section
10. The page must display a pricing card showing:
    - $450 fixed price
    - ~15 hours estimated work
    - List of all deliverables included

#### Tech Stack Section
11. The page must show technology badges: Next.js 14, React, Tailwind CSS, Supabase, OpenAI GPT-5.2, EUR-Lex REST API, Vercel

#### Footer
12. The page must include AutoFlux branding and a CTA to book a call

### 4.2 RegScope Demo Page (`/proposals/orgonic-art-raphael/demo`)

#### Layout
13. The demo must have a sidebar navigation with:
    - RegScope logo
    - Nav items: Dashboard, New Scan, Regulations, Settings
    - Demo user info at bottom (demo@company.com)
14. The demo must show a "DEMO PREVIEW" badge to indicate it's not the final product

#### Screen 1: Dashboard (Initial State)
15. The dashboard must display a welcome message
16. The dashboard must show a "Start Your First Scan" CTA card
17. The dashboard must display placeholder stats (0 regulations found, 0 scans completed)

#### Screen 2: Questionnaire Form
18. The form must have a multi-step progress indicator (3 steps)
19. **Step 1 - Company Basics:**
    - Company name (text input)
    - Industry (dropdown with options: Technology, Healthcare, Finance, Manufacturing, Retail, Other)
    - Business description (textarea)
20. **Step 2 - Operations:**
    - Operating countries (multi-select: Germany, France, Netherlands, Spain, Italy, Poland, Other EU)
    - Products/Services offered (textarea)
    - Has employees? (yes/no toggle)
    - Sells online? (yes/no toggle)
21. **Step 3 - Compliance Focus:**
    - Specific compliance areas of concern (free text)
    - Data processing activities (checkboxes)
22. The form must have "Next", "Back", and "Analyze My Business" buttons
23. The form must have basic client-side validation (required fields)

#### Screen 3: Processing State
24. The processing screen must show an animated loading state
25. The processing screen must display progress steps:
    - "Analyzing business profile..."
    - "Searching EUR-Lex database..."
    - "Matching regulations to your business..."
    - "Generating compliance summaries..."
26. The processing must auto-advance to results after 3-4 seconds

#### Screen 4: Results Dashboard
27. The results must show a "Business Profile Summary" card with AI-style generated text based on form inputs
28. The results must display 5-7 "Potentially Relevant Regulations" cards, each showing:
    - Regulation title (e.g., "GDPR - Regulation (EU) 2016/679")
    - Relevance score (percentage)
    - Short summary (2-3 sentences)
    - "Why this may apply to you" explanation
    - "View on EUR-Lex" button (links to real EUR-Lex pages)
29. The regulations shown must be realistic based on form inputs:
    - GDPR (if processes personal data)
    - Digital Services Act (if online platform)
    - NIS2 Directive (if critical infrastructure)
    - AI Act (if uses AI)
    - DORA (if financial services)
    - Product Safety Regulation (if physical products)
    - ePrivacy Directive (if online marketing)
30. The results must include an "Export Report" button (visual only, shows toast notification)

#### Navigation & State
31. The sidebar nav items must switch between screens
32. The demo must maintain form state during the session
33. The demo must allow restarting the scan flow
34. On mobile devices, the demo must show a "Best viewed on desktop" message with a simplified view or redirect suggestion

### 4.3 Design Requirements

35. Both pages must use the existing AutoFlux design system:
    - Light cream background (`#F7F5F0`)
    - Navy primary (`#13112F`)
    - Lime accent (`#CFFF4D`)
    - Inter font
36. Both pages must use existing CSS variables from `globals.css`
37. Both pages must include Framer Motion animations consistent with the site
38. Both pages must be fully responsive (mobile-first)
39. The demo page may use a slightly different layout (sidebar) but must maintain color consistency

### 4.4 Technical Requirements

40. Pages must be built as Next.js App Router pages with TypeScript
41. The proposal page must be at `/app/proposals/orgonic-art-raphael/page.tsx`
42. The demo page must be at `/app/proposals/orgonic-art-raphael/demo/page.tsx`
43. Components specific to proposals should be in `/components/proposals/`
44. Demo state management must use React useState/useReducer (no external state library needed)
45. No external API calls - all data is mocked
46. Real EUR-Lex links must be used for authenticity

## 5. Non-Goals (Out of Scope)

1. **No backend functionality** - This is a frontend mockup only
2. **No actual AI integration** - All "AI responses" are pre-written mock data
3. **No real EUR-Lex API calls** - Regulations are hardcoded based on form selections
4. **No authentication** - The "password protected" hint is visual only
5. **No data persistence** - Form data is session-only
6. **No PDF export** - Export button is visual feedback only
7. **No reusable proposal template system** - Build for this client first, abstract later
8. **No admin panel** - No way to edit proposal content without code changes

## 6. Design Considerations

### Proposal Page Layout
```
┌─────────────────────────────────────────┐
│  [Eyebrow: Proposal for Orgonic-Art]    │
│  EU Regulation Discovery Tool           │
│  [Stats Row: $450 | 5-7 days | etc]     │
│  [View Live Demo Button]                │
├─────────────────────────────────────────┤
│  Our Approach (6 cards grid)            │
├─────────────────────────────────────────┤
│  Timeline (3 phases visualization)      │
├─────────────────────────────────────────┤
│  [Demo CTA Section - View Live Demo →]  │
├─────────────────────────────────────────┤
│  Tech Stack (badges)                    │
├─────────────────────────────────────────┤
│  Pricing Card                           │
├─────────────────────────────────────────┤
│  Footer (AutoFlux branding)             │
└─────────────────────────────────────────┘
```

### Demo Page Layout
```
┌────────┬────────────────────────────────┐
│        │  [DEMO PREVIEW Badge]          │
│  Logo  │                                │
│        │  ┌──────────────────────────┐  │
│ ────── │  │                          │  │
│ Dash   │  │   Main Content Area      │  │
│ Scan   │  │   (switches screens)     │  │
│ Regs   │  │                          │  │
│ Settin │  │                          │  │
│        │  └──────────────────────────┘  │
│ ────── │                                │
│ User   │                                │
└────────┴────────────────────────────────┘
```

### Animation Guidelines
- Use `whileInView` for scroll-triggered animations
- Use `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}` pattern
- Processing screen should have staggered step reveals
- Cards should have hover lift effects

## 7. Technical Considerations

### File Structure
```
app/
└── proposals/
    └── orgonic-art-raphael/
        ├── page.tsx              # Proposal landing page
        └── demo/
            └── page.tsx          # RegScope demo app

components/
└── proposals/
    ├── ProposalHero.tsx
    ├── ApproachGrid.tsx
    ├── Timeline.tsx
    ├── PricingCard.tsx
    ├── TechStackBadges.tsx
    └── demo/
        ├── DemoLayout.tsx        # Sidebar + main area
        ├── DemoSidebar.tsx
        ├── DashboardScreen.tsx
        ├── QuestionnaireScreen.tsx
        ├── ProcessingScreen.tsx
        ├── ResultsScreen.tsx
        └── RegulationCard.tsx

data/
└── proposals/
    └── orgonic-art-raphael.ts    # All proposal + demo mock data
```

### EUR-Lex Real Links (for authenticity)
```typescript
const EUR_LEX_LINKS = {
  gdpr: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  dsa: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj",
  nis2: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
  aiAct: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  dora: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
  productSafety: "https://eur-lex.europa.eu/eli/reg/2023/988/oj",
  ePrivacy: "https://eur-lex.europa.eu/eli/dir/2002/58/oj",
};
```

### State Management for Demo
```typescript
type DemoScreen = 'dashboard' | 'questionnaire' | 'processing' | 'results';
type QuestionnaireStep = 1 | 2 | 3;

interface DemoState {
  currentScreen: DemoScreen;
  questionnaireStep: QuestionnaireStep;
  formData: {
    companyName: string;
    industry: string;
    description: string;
    countries: string[];
    products: string;
    hasEmployees: boolean;
    sellsOnline: boolean;
    complianceFocus: string;
    dataProcessing: string[];
  };
  results: Regulation[] | null;
}
```

## 8. Success Metrics

1. **Primary**: Win the Upwork contract from Orgonic-Art
2. **Secondary**: Client shares demo with investors before contract decision
3. **Qualitative**: Client feedback mentions the demo as a differentiator
4. **Technical**: Pages load in under 2 seconds, Lighthouse score > 90
5. **Future**: Template can be reused for next proposal in under 2 hours of customization

## 9. Resolved Decisions

1. **Demo Preview**: Use a prominent CTA button section (no iframe or screenshot)
2. **Mobile Demo**: Show "best viewed on desktop" message on mobile devices
3. **Analytics**: No PostHog tracking for this proposal
4. **Cal.com Integration**: No booking button - keep it simple

---

---

## Appendix A: Client Requirements Analysis

### What They Asked For (Scope Analysis)

| Requirement | Priority | Our Demo | Real MVP |
|-------------|----------|----------|----------|
| 1. Simple Onboarding Form | Must-have | ✅ Implemented | Same |
| 2. AI Business Profiling | Must-have | ❌ Mocked | OpenAI GPT-5.2 |
| 3. EUR-Lex Regulation Lookup | Must-have | ❌ Hardcoded | REST API + light scraping |
| 4. AI Matching + Summary | Must-have | ❌ Mocked | GPT-5.2 analysis |
| 5. Simple Dashboard | Must-have | ✅ Implemented | Same |
| 6. Basic Login | Nice-to-have | ❌ Visual only | Supabase Auth |
| 7. Tech Freedom | - | Next.js | Next.js + Supabase |

### Explicitly Out of Scope (Client Confirmed)
- ❌ Complex workflows
- ❌ Lawyer review system
- ❌ Notifications
- ❌ Versioning
- ❌ Billing
- ❌ Status tracking
- ❌ History

---

## Appendix B: EUR-Lex Integration (Real MVP)

### Available APIs

**1. CELLAR SPARQL Endpoint (Recommended)**
```
https://publications.europa.eu/webapi/rdf/sparql
```
- Official EU Publications Office API
- Structured data, no scraping needed
- Free, no API key
- Returns: CELEX numbers, titles, dates, document links

**2. EUR-Lex Search (Fallback)**
```
https://eur-lex.europa.eu/search.html?SUBDOM_INIT=ALL_ALL&DTS_SUBDOM=ALL_ALL&DTS_DOM=ALL&lang=en&type=advanced&qid=&text=[QUERY]
```
- Public search interface
- Can parse HTML results
- Free, no API key

### Implementation Approach

```typescript
// Example: Search EUR-Lex via SPARQL
async function searchRegulations(keywords: string[], industry: string) {
  const query = `
    PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
    SELECT ?work ?title ?date WHERE {
      ?work cdm:resource_legal_in-force "true"^^xsd:boolean .
      ?work cdm:work_has_expression ?expr .
      ?expr cdm:expression_title ?title .
      ?work cdm:resource_legal_date_entry-into-force ?date .
      FILTER(CONTAINS(LCASE(?title), "${keywords[0].toLowerCase()}"))
    }
    LIMIT 20
  `;

  const response = await fetch('https://publications.europa.eu/webapi/rdf/sparql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `query=${encodeURIComponent(query)}&format=json`
  });

  return response.json();
}
```

### Memory/Resource Estimates

| Component | Memory | API Costs |
|-----------|--------|-----------|
| Next.js App | ~50-100MB | Free (Vercel hobby) |
| Supabase DB | <100MB | Free tier (500MB) |
| OpenAI GPT-5.2 | N/A | ~$0.01-0.05 per scan |
| EUR-Lex API | N/A | Free |
| **Total Monthly** | **<200MB** | **<$5 for 100 scans** |

---

## Appendix C: Authentication (Real MVP)

### Supabase Auth Setup

```typescript
// Simple email/password or magic link
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sign up
await supabase.auth.signUp({ email, password })

// Sign in
await supabase.auth.signInWithPassword({ email, password })

// Magic link (no password)
await supabase.auth.signInWithOtp({ email })
```

### Database Schema (Minimal)

```sql
-- Users handled by Supabase Auth automatically

-- Optional: Store scan history
CREATE TABLE scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  form_data JSONB,
  results JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Appendix D: Tech Stack Comparison

### Why This Stack (vs Alternatives)

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Next.js + Supabase** | Fast, type-safe, free tier, scales | Requires coding | ✅ Best for MVP |
| Bubble/Glide | No-code, fast | Limited AI integration, vendor lock-in | ❌ |
| n8n + Frontend | Good for workflows | Overkill for simple MVP, extra hosting | ❌ |
| Firebase | Similar to Supabase | Less generous free tier | ❌ |

### Final Stack Decision

```
Frontend:     Next.js 14 (App Router) + Tailwind CSS
Backend:      Supabase (Auth + Database + Edge Functions)
AI:           OpenAI GPT-5.2 API
Data Source:  EUR-Lex SPARQL API (free, no key)
Hosting:      Vercel (free tier)
```

### Why Vercel Works for This MVP

| Concern | Vercel Capability | Sufficient? |
|---------|-------------------|-------------|
| API Routes | Serverless functions (up to 10s execution) | ✅ Yes - API calls take 2-5s |
| External APIs | Can call OpenAI, EUR-Lex, Supabase | ✅ Yes |
| Free Tier Limits | 100GB bandwidth, 100hrs serverless/month | ✅ Yes for ~500 scans/month |
| Cold Starts | ~200-500ms | ✅ Acceptable for MVP |
| Edge Functions | Available if needed | ✅ Bonus |

**For this MVP scope**: Vercel free tier handles everything. If the client scales to thousands of users, they'd upgrade to Pro ($20/mo) or move heavy compute to Supabase Edge Functions.

**What runs where:**
- Next.js pages → Vercel Edge (fast, cached)
- API routes (`/api/profile`, `/api/search`) → Vercel Serverless
- Auth + Database → Supabase (separate infrastructure)
- OpenAI calls → From Vercel serverless → OpenAI API
- EUR-Lex queries → From Vercel serverless → EU SPARQL endpoint

---

## Appendix E: Mock Regulation Data

For the demo, use this mock data structure:

```typescript
const MOCK_REGULATIONS = [
  {
    id: "gdpr",
    title: "General Data Protection Regulation (GDPR)",
    reference: "Regulation (EU) 2016/679",
    relevanceScore: 95,
    summary: "Comprehensive data protection law governing how personal data of EU residents must be collected, processed, and stored.",
    whyApplies: "Your business processes personal data of EU customers and has employees, making GDPR compliance mandatory.",
    eurLexUrl: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    triggers: ["hasEmployees", "sellsOnline", "dataProcessing.customerData"]
  },
  {
    id: "dsa",
    title: "Digital Services Act (DSA)",
    reference: "Regulation (EU) 2022/2065",
    relevanceScore: 78,
    summary: "Regulates digital services and online platforms, establishing accountability for content moderation and user safety.",
    whyApplies: "As an online platform operating in the EU, you must comply with DSA transparency and content moderation requirements.",
    eurLexUrl: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj",
    triggers: ["sellsOnline", "industry.technology"]
  },
  // ... more regulations
];
```
