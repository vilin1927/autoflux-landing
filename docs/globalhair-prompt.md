# CLAUDE CODE PROMPT — GlobalHair Institute Proposal Page

## Context for Claude Code

Build a proposal page at `/proposals/globalhair/proposal` on my Next.js website (autoflux.digital). This is a sales proposal for Peter De Harder, CMO of GlobalHair Institute — a premium hair transplant clinic operating in Netherlands and Turkey. Their treatments start at €4,950.

The page should feel like a premium consulting deck, not a generic freelancer proposal. It needs to sell the project through business value, not technical jargon.

## Brand & Design Direction

Match GlobalHair's brand from https://www.globalhair.institute/nl:
- Deep navy/dark teal background (#0a1628 range)
- Gold/amber accents (#c9a84c range)  
- Glass-morphism card effects (frosted glass, subtle borders)
- Premium, medical-luxury feel
- Typography: elegant serif for headings, clean sans-serif for body
- Subtle animations on scroll (fade-in sections, not flashy)
- Add "Prepared by Vladimir Ilin | AutoFlux" watermark at top and bottom

## Page Structure & Content

### Section 1: Hero
**Headline:** "Your Marketing Command Center"
**Subheadline:** "A unified dashboard that turns scattered data into revenue clarity — built specifically for GlobalHair Institute."

Show three key metrics in a row:
- "€4,950+" → "Revenue per treatment"
- "5+" → "Platforms you manage daily"
- "1" → "Dashboard to rule them all"

---

### Section 2: "We Did Our Homework" (show you understand his business)

Brief section that demonstrates research:

"GlobalHair Institute delivers premium hair transplant procedures across Netherlands and Turkey. With treatments starting at €4,950 and a growing digital presence, every marketing euro needs to work hard — and every lead needs to be captured.

You're running campaigns across Meta, TikTok, and Google. You have chatbots fielding inquiries on Instagram, Facebook, WhatsApp, and your website. Stripe processes payments. Your team creates content daily.

Right now, that means logging into 6+ platforms every morning just to understand yesterday's performance. That's not sustainable when you're scaling."

---

### Section 3: "The Problem" (pain points — this is the most important section)

Display as visual cards or blocks, each with an icon, title, and description:

**Pain Point 1: "Blind Spots in Your Ad Spend"**
You're investing thousands monthly across Meta, TikTok, and Google — but there's no single view showing which platform actually drives the most booked consultations, not just clicks. At €4,950 per treatment, misallocating even 20% of your budget means leaving tens of thousands on the table annually.

**Pain Point 2: "Leads Falling Through the Cracks"**
Inquiries come in through Instagram DMs, Facebook Messenger, WhatsApp, website chat, and ad forms. Without a unified pipeline, some of these leads go cold before anyone responds. In high-ticket medical services, a 30-minute delay in response time can cut conversion rates in half.

**Pain Point 3: "6 Tabs, 6 Logins, Every Morning"**
Meta Ads Manager. TikTok Ads. Google Ads. Stripe. WhatsApp Business. Instagram. You're spending the first hour of every day just gathering numbers before you can make a single decision. That's CMO time being spent on data collection instead of strategy.

**Pain Point 4: "No Real-Time Pulse on the Go"**
When you're between the Netherlands and Turkey offices, or in a consultation, you have zero visibility into what's happening with your campaigns. A new lead comes in, an ad budget runs out, a chatbot goes offline — you find out hours later.

**Pain Point 5: "Content Creation is a Bottleneck"**
Creating ad copy, scheduling social media posts, generating variations for A/B tests — it's manual, repetitive, and slow. Meanwhile, your competitors are posting 3x more frequently.

---

### Section 4: "The Solution" (map each solution directly to a pain point)

Title: "One Dashboard. Complete Clarity."

Present as a feature grid or paired layout — each solution explicitly references which pain point it solves:

**→ Multi-Platform Analytics Hub** (solves Pain Point 1 & 3)
Live data from Meta, TikTok, Google Ads, and Stripe in one unified view. See total ad spend, cost per lead, cost per consultation, and ROAS by platform — updated in real time. No more tab-switching.

**→ Smart CRM Pipeline** (solves Pain Point 2)
Every lead from every channel flows into one pipeline. Track each prospect from first inquiry → consultation booked → treatment completed → payment received. Set automated follow-up reminders so no lead goes cold.

**→ Telegram Command Center** (solves Pain Point 4)
A personal Telegram bot that sends you:
- Daily morning summary (spend, leads, revenue)
- Instant alerts when a new lead comes in
- Budget warnings when ad spend approaches limits
- Quick commands to check stats from your phone

**→ AI Ad Copy & Content Engine** (solves Pain Point 5)
Generate Meta and TikTok ad copy tailored to GlobalHair's voice. Create variations for A/B testing in seconds. Schedule social media posts from a content library. All powered by AI, approved by you.

**→ Invoice & Payment Tracking** (solves administrative overhead)
Generate branded PDF invoices, track payment status through Stripe integration, and see revenue metrics alongside marketing spend for true ROI visibility.

---

### Section 5: "How We'll Build It" (architecture — visual, not too technical)

Show a simple flow diagram or visual:

```
[Meta Ads API] ──→
[TikTok API]   ──→  [Supabase Backend]  ──→  [Dashboard UI]
[Google Ads]   ──→        ↕                    (Next.js)
[Stripe API]   ──→   [AI Engine]         ──→  [Telegram Bot]
[Chatbot Data] ──→   (Claude/OpenAI)
```

Brief technical note (keep it accessible):
"Built on your preferred stack — Next.js frontend, Node.js backend, Supabase (PostgreSQL) database, Telegraf.js for the Telegram bot, with secure API connections to all your marketing platforms. AI powered by both OpenAI and Claude. Deployed on your infrastructure, you own everything."

---

### Section 6: "Timeline & Milestones"

Present as a visual timeline showing parallel execution — NOT phases. This is one continuous build, no waiting.

Title: "Parallel Execution — Not Sequential Phases"
Subtitle: "We submit all API applications on Day 1 and build in parallel. No wasted time."

**Day 1: API Applications + Project Setup**
→ Submit TikTok Ads API application (approval: 2-3 days)
→ Apply for Google Ads developer token (approval: 1-3 days)
→ Set up Supabase backend, Meta API connection, Stripe keys
→ Configure WhatsApp Cloud API via Meta Business Manager

**Week 1-2: Core Dashboard Live**
✓ Dashboard UI with GlobalHair branding
✓ Meta Ads API integration (campaigns, spend, leads, ROAS)
✓ Stripe integration (revenue, invoices, payment tracking)
✓ CRM pipeline (lead stages, notes, follow-ups)
✓ AI ad copy generator
✓ Telegram bot (daily stats, lead alerts, budget warnings)
✓ Instagram + Facebook chat monitoring (via Meta Graph API)

*Milestone: Working dashboard with real Meta + Stripe data.*

**Week 3-4: Full Platform Integration**
✓ TikTok Ads API (approved by now, plug and play)
✓ Google Ads integration (approved by now, plug and play)
✓ WhatsApp Cloud API chatbot monitoring
✓ Cross-platform analytics & attribution
✓ Social media content scheduling
✓ Static ad creation (image creatives with text overlays, brand templates)
✓ Video ad generation (server-side via Remotion/FFmpeg — text-on-video, Ken Burns, auto-subtitles)
✓ Website uptime monitoring (health checks every 5 min + Telegram alerts)
✓ Landing page builder (template-based)
✓ Advanced Telegram commands
✓ Landing pages + ad creative tools

---

### Section 7: "Investment"

**Frame it as ROI, not cost:**

Opening line: "At €4,950 per treatment, this dashboard pays for itself the moment it helps you capture one additional consultation."

**Full Build: $2,500** (fixed price, 3-4 week delivery)
Complete marketing command center — all platforms connected, CRM, AI tools, Telegram bot, chatbot monitoring. Real data flowing from Day 1.

Payment structure:
- 50% upfront to start ($1,250)
- 50% on Week 2 milestone review ($1,250)

Then add a subtle ROI calculation card:
- "If this dashboard helps you identify that Meta converts 2x better than TikTok..."
- "...and you shift just €2,000/month of budget from low-performing to high-performing channels..."
- "...at your conversion rates, that's potentially 1-2 extra consultations per month"
- "= €4,950 - €9,900 additional monthly revenue"
- "**ROI: 2-4x in the first month alone**"

---

### Section 8: "Why AutoFlux"

Keep brief, 3 proof points:
- "Built ProfitPaws — a multi-source data dashboard pulling from Google Maps, DataForSEO, and ad platforms into a unified analytics view. Same architecture."
- "Experience with your exact stack: Next.js, Supabase, Meta Business API, Stripe, Telegraf.js, Claude/OpenAI."
- "You've already seen the personalized demo. That was built in hours — imagine what 2 weeks delivers."

---

### Section 9: CTA

**"Ready to See Everything in One Place?"**

Two buttons:
- "View Interactive Demo" → links to /proposals/globalhair/demo
- "Schedule a Call" → links to Upwork message or calendar

Footer: "Prepared by Vladimir Ilin | AutoFlux Digital — February 2026"

---

## Design Notes

- Each section should animate in on scroll (subtle fade + slide up)
- Pain point cards should have a subtle red/warning tint on hover
- Solution cards should have a green/gold positive tint on hover  
- The ROI calculation card should be visually prominent — maybe a gold-bordered highlight box
- Include a sticky "Back to Demo" button somewhere
- Mobile responsive
- Fast loading — no heavy images, use CSS effects for visual impact
- Add a table of contents / section navigation in the sidebar or top

## Important

Do NOT make it look like a generic template. This should feel like a custom consulting proposal that was crafted specifically for GlobalHair Institute. Use their name, their metrics, their industry context throughout.