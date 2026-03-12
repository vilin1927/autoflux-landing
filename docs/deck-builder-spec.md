# AI Deck Builder — Full Project Spec

## Client

- **Name**: Aleksander Johansen (AJ)
- **Company**: Tasteforge AI
- **Email**: aj@tasteforge.ai
- **Location**: Norway
- **Tools he uses**: Cursor, Claude, n8n, Slack, Figma
- **Upwork budget range**: $20–60/hr
- **Current spend across freelancers**: ~$29K (5 contracts)
  - 3 n8n contracts ($25–30/hr)
  - 1 React frontend dev ($60/hr, 156hrs, "Investor Ready demo")
  - 1 Langflow gig ($60/hr, 10hrs)

---

## Phase 1 — Demo (Current Scope)

**Price**: $600 fixed
**Timeline**: 5–7 days
**Status**: Offer accepted, work starting

### What We Promised (6 Deliverables)

#### 1. Template-Spec JSON Schema (6 slide types)
- Structured JSON config for each slide type
- Defines: heading char limits, font families & sizes, body text rules, image dimensions & positions, logo placement
- This is the single source of truth — the Apps Script and backend both read from this
- AJ provided exact specs (see Constraint Rules below)

#### 2. Wireframe Storyboard in Google Slides
- 6 wireframe-style slides in an actual Google Slides file
- Grey, boxy, placeholder look — shows structure before content fills in
- Visible constraints: placeholder boxes showing where text/images/logo go
- Character limits annotated on each text area
- Layout grid visible
- Slide types: Cover, Problem, Solution, Market, Traction, The Ask

#### 3. 2–3 Designed Slides
- Polished, investor-ready versions of 2–3 of the same templates
- Real typography (Montserrat + Inter), colors, branding from AJ's brand kit
- Shows the final output quality — what the generator produces
- Uses AJ's actual brand assets from the Google Drive folder

#### 4. Apps Script / Slides API — Constraint Engine
- Google Apps Script (or Slides API via Python) that:
  - Takes a storyboard JSON as input
  - Creates a new Google Slides deck
  - Builds each slide according to template spec
  - Enforces: fonts, sizes, character limits, image dimensions, logo position
  - If text exceeds char limit → truncate or flag
  - If image wrong size → resize/crop to spec
- Output: a real Google Slides file that looks perfect every time

#### 5. Python Backend
- NOT n8n — real Python codebase
- Takes business context as input (company name, problem, solution, market, traction, ask)
- Calls Claude API to generate storyboard content
- Enforces character limits in the prompt + validates output
- Pushes generated content to Google Slides via the constraint engine
- Tech: Python + FastAPI + Claude API + Google Slides API
- Source code delivered to AJ

#### 6. Variant Selection (2–3 per slide)
- For each slide, AI generates 2–3 content variants with different angles
- Example for "Problem" slide:
  - Variant A: "The Problem" — direct pain point description
  - Variant B: "Why This Matters Now" — urgency/timing angle
  - Variant C: "The $12B Pain Point" — market-size angle
- User picks the best variant, discards the rest
- Selected variants feed into the final deck generation

---

## Constraint Rules (FROM AJ — exact specs)

These are the REAL constraints AJ provided. Use these, not made-up values.

### Typography & Character Limits

| Element | Font | Size | Weight | Max Characters |
|---------|------|------|--------|----------------|
| Heading | Montserrat | 40px | Bold | 45 chars |
| Subtitle | Inter | 18px | Regular | 80 chars |
| Bullets | Inter | 20px | Regular | 90 chars each |
| Body | Inter | 16–18px | Regular | 280 chars |
| Mini-label/badge | Inter (or system) | 11–12px | Uppercase | 25 chars |

### Logo Rules
- **Position**: Top-left (default) — AJ said "unless you want top-right"
- **Height**: 48px
- **Margin**: 16px from edges

### Image Rules
- Not yet specified by AJ — use reasonable defaults:
  - Right-side images: 40–50% of slide width
  - Aspect ratio: 4:3 or 16:9 depending on slide type
  - Position: right-aligned for content slides, centered for full-image slides

---

## Slide Templates (6 types)

### Slide 1: Cover
- **Layout**: Centered
- **Elements**: Heading (company name), Subtitle (value proposition), Logo (top-left)
- **Heading**: Montserrat 40px Bold, max 45 chars
- **Subtitle**: Inter 18px, max 80 chars
- **Logo**: Top-left, 48px height, 16px margin
- **Example**: "NovaTech AI" / "Making enterprise AI accessible to everyone"

### Slide 2: Problem
- **Layout**: Left text + right image
- **Elements**: Heading, Body text, Image placeholder
- **Heading**: Montserrat 40px Bold, max 45 chars
- **Body**: Inter 16–18px, max 280 chars
- **Image**: Right 40% of slide
- **Has variants**: Yes (2–3 different angles)

### Slide 3: Solution
- **Layout**: Left text + right image
- **Elements**: Heading, Body text, Image/screenshot placeholder
- **Heading**: Montserrat 40px Bold, max 45 chars
- **Body**: Inter 16–18px, max 280 chars
- **Image**: Right 40–50% of slide

### Slide 4: Market Size
- **Layout**: Two-column (chart + data)
- **Elements**: Heading, Chart/visual area, Key metrics (TAM/SAM/SOM)
- **Heading**: Montserrat 40px Bold, max 45 chars
- **Body/metrics**: Inter 16–18px, max 280 chars
- **Chart area**: Left 50% of slide
- **Data points**: Right 50%, using bullet format (Inter 20px, 90 chars each)

### Slide 5: Traction
- **Layout**: Two-column or metric cards
- **Elements**: Heading, Key metrics, Mini-labels
- **Heading**: Montserrat 40px Bold, max 45 chars
- **Metrics**: Large numbers with mini-labels (11–12px uppercase, max 25 chars)
- **Body**: Inter 16–18px, max 280 chars

### Slide 6: The Ask
- **Layout**: Centered
- **Elements**: Heading (funding ask), Subtitle (use of funds), Body (breakdown), Logo
- **Heading**: Montserrat 40px Bold, max 45 chars
- **Subtitle**: Inter 18px, max 80 chars
- **Body**: Inter 16–18px, max 280 chars
- **Logo**: Bottom-right (or top-left per AJ's default)

---

## Brand Assets (from AJ)

### Provided
- **Google Drive folder**: https://drive.google.com/drive/folders/1V4PvzlD10zbKp1F98sMCfn8SWlXUlwEn?usp=sharing
- Contains: brand kit, example slides (investor deck type)
- AJ said he intentionally didn't share ALL investor decks to avoid overwhelming us

### What we need to extract from the folder
- [ ] Logo files (PNG/SVG)
- [ ] Color palette (primary, secondary, accent colors)
- [ ] Any existing slide layouts to reference
- [ ] Font files if custom (though Montserrat + Inter are Google Fonts)
- [ ] Image style / photography guidelines if any

---

## Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Backend | Python + FastAPI | API layer, orchestration |
| AI | Claude API (Sonnet 4.5) | Content generation |
| Slide Generation | Google Slides API | Create/modify slides programmatically |
| Constraint Engine | Google Apps Script OR Python + Slides API | Enforce fonts/sizes/limits |
| Template Specs | JSON Schema | Define slide rules |
| Frontend (demo) | React + TypeScript (already built) | Interactive demo on autoflux.digital |

---

## Architecture Flow

```
User Input (business context)
        │
        ▼
┌─────────────────┐
│  Python Backend  │
│  (FastAPI)       │
│                  │
│  1. Parse input  │
│  2. Load template│
│     specs (JSON) │
│  3. Call Claude  │
│     API          │
│  4. Validate     │
│     char limits  │
│  5. Generate 2-3 │
│     variants     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Variant         │
│  Selection       │
│  (user picks)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Slides   │
│  API / Apps      │
│  Script          │
│                  │
│  1. Create deck  │
│  2. Apply fonts  │
│  3. Enforce      │
│     positions    │
│  4. Place logo   │
│  5. Set char     │
│     limits       │
└────────┬────────┘
         │
         ▼
   Google Slides
   File (output)
```

---

## Template-Spec JSON Example

This is what the JSON schema will look like for ONE slide:

```json
{
  "slideType": "cover",
  "name": "Cover Slide",
  "layout": "centered",
  "elements": {
    "heading": {
      "font": "Montserrat",
      "size": "40px",
      "weight": "Bold",
      "maxChars": 45,
      "position": { "x": "center", "y": "40%" },
      "color": "#1A1A2E"
    },
    "subtitle": {
      "font": "Inter",
      "size": "18px",
      "weight": "Regular",
      "maxChars": 80,
      "position": { "x": "center", "y": "55%" },
      "color": "#6B7280"
    },
    "logo": {
      "position": "top-left",
      "height": "48px",
      "margin": "16px"
    }
  }
}
```

Full schema will have 6 of these (one per slide type).

---

## What We Need to Clarify With AJ

### Before starting
- [x] Constraint specs — DONE (he provided exact fonts/sizes/chars)
- [x] Brand assets — DONE (Google Drive folder shared)
- [x] Email for Google access — DONE (aj@tasteforge.ai)
- [ ] Google Workspace access — need him to grant Slides API access or share a service account
- [ ] Color palette — extract from brand kit in the folder
- [ ] Logo file — extract from brand kit in the folder

### Nice to confirm
- [ ] Should wireframe storyboard be a separate Google Slides file or same deck as designed slides?
- [ ] Any specific slide types to add/remove from the 6? (Team, Product, Competitive Landscape?)
- [ ] Does he want the Python backend deployed somewhere or just source code?
- [ ] Preferred hosting for the backend later (his VPS, cloud, etc.?)

---

## Phase 2 — Full MVP (Future, post-demo)

AJ's full job description scope. Price TBD ($3,000–5,000 estimated). Discuss on call after demo delivery.

### Additional deliverables beyond demo
- React/TypeScript frontend app
  - Send business context form
  - Preview storyboard cards with variant selection
  - Editable text boxes (edits re-run generation)
  - Call webhook/API to generate deck
- Full n8n integration OR expanded Python backend
  - Flow A: Generate storyboard via LLM → build deck
  - Flow B: Update slide text from frontend → regenerate specific slides
- 6 complete Google Slides templates (not just wireframes)
  - Including 2–4 investor intro variants
- Documentation
- Acceptance tests
- Short video demo

---

## Phase 3 — Bigger Vision (AJ mentioned)

AJ hinted at a bigger vision beyond the MVP:

1. **Figma → Template Slides pipeline**
   - Export design tokens from Figma (using Tokens Studio or similar plugin)
   - Convert Figma designs into template specs automatically
   - "Convert design to template slides"

2. **Prompt → Content service**
   - "Enabled to convert... from prompt to content"
   - Could be a SaaS product, not just an internal tool

3. **3 projects in mind**
   - AJ said "With your speed, I have 3 projects in mind"
   - The deck builder is just project 1

---

## Timeline — Phase 1

| Day | Task |
|-----|------|
| Day 1 | Download brand assets from Drive, extract colors/logo. Build template-spec JSON for all 6 slides using AJ's exact constraints. |
| Day 2 | Build Apps Script / Slides API constraint engine. Test with sample data — create one slide, verify fonts/sizes/positions match spec. |
| Day 3 | Build Python backend — FastAPI endpoint that takes business context, calls Claude API, returns storyboard JSON with char limits enforced. |
| Day 4 | Add variant generation (2–3 per slide). Connect backend to Slides API — generate full wireframe storyboard deck. |
| Day 5 | Build 2–3 designed slides using real brand assets. Polish wireframe deck. Test end-to-end flow. |
| Day 6–7 | Buffer for fixes, testing, edge cases. Package source code. Deliver to AJ. |

---

## Key Decisions Made

1. **Python backend, not n8n** — AJ agreed after our recommendation. Real codebase > visual flows.
2. **Claude API for content generation** — cost-efficient, high quality, we already use it.
3. **Google Slides as output** — not PDF, not PowerPoint. Real Google Slides files that editors can tweak.
4. **Montserrat + Inter fonts** — AJ's choice. Both are Google Fonts, available in Slides.
5. **Top-left logo** — AJ's default preference.

---

## Links & References

- **Proposal page**: autoflux.digital/proposals/deck-builder
- **Interactive demo**: autoflux.digital/proposals/deck-builder/demo
- **AJ's brand assets**: https://drive.google.com/drive/folders/1V4PvzlD10zbKp1F98sMCfn8SWlXUlwEn?usp=sharing
- **AJ's Upwork job post**: "Build Google Slides template engine + Apps Script + n8n + React/TS integration for AI powered deck builder"
- **Figma token tools AJ mentioned**: Tokens Studio (tokens.studio)
