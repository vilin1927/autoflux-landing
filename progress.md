# AutoFlux Landing — Progress Log

## Current State (2026-03-19)

### Session: 2026-03-19 — SmartFlip Market Research

**What was researched:**
- Competitor landscape (Tactical Arbitrage, BuyBotPro, AMZScout, WorthPoint, Flipify, Flippr, FlipMine)
- eBay Browse API (endpoints, rate limits, image search, access requirements)
- Amazon PA-API 5.0 (deprecating April 2026, migrating to Creators API)
- Facebook Marketplace (NO official API — scraping only)
- Google Vision API vs Claude Vision (pricing, product recognition capabilities)
- Stripe $1 trial → subscription implementation (add_invoice_items approach)

**Key decisions:**
- Claude Vision is the better choice for SmartFlip product recognition (flexible, can extract brand/model/SKU from context, ~$0.004/image with Sonnet)
- Facebook Marketplace has NO API — must use scraping tools (Apify, Bright Data) or skip FB for MVP
- Amazon PA-API is being deprecated April 2026 — must plan for Creators API migration
- eBay Browse API is free but limited to 5,000 calls/day (can request increase to 100K)
- Stripe $1 trial is technically a subscription with add_invoice_items for $1 upfront charge during trial period

**What comes next:**
- Wait for Justin's answers to 5 clarifying questions
- When he responds: schedule call, prepare final proposal with pricing
- Use this research to inform technical scope and API cost estimates in proposal

### Session: 2026-03-19 — SmartFlip Monetization & Pricing Research

**What was researched:**
- Revenue sharing / profit pool models (Honeygain, Sweatcoin, X creator fund, YouTube model)
- Affiliate programs: eBay Partner Network (1-4%, API via Browse API), Amazon Associates (1-20%, PA-API deprecated April 2026 → Creators API), Walmart (1-4% via Impact)
- Marketplace listing fees: Poshmark (20%), Mercari (10%+3%), eBay (13.25%), OfferUp (free), Facebook (6%)
- Marketplace take rates: avg 10-30%, startups should start 5-10% to build liquidity
- Competitor pricing: FlipHero ($5/mo), Flipify ($5-10/mo per watchlist), Underpriced AI ($9-99/mo), Vendoo ($9-70/mo), List Perfectly ($29-249/mo), SellerAmp ($20-30/mo), WorthPoint ($29-47/mo)

**Key decision:** Justin's $49/mo is competitive — it sits in the mid-range, above basic deal finders ($5-10) but below full cross-listing platforms ($50-250). The value prop must clearly exceed what $9-30 tools offer.

**Profit pool sustainability analysis:** Must be funded from affiliate commissions + listing fees, NOT subscription revenue. At 2-3% affiliate commission avg and $49/mo subscription, profit pool should be capped at 10-20% of platform affiliate earnings, distributed proportional to user activity.

---

## Previous State (2026-03-13)

### What Exists
- **Homepage:** Fully built with 8 sections (Hero, TrustBar, Stats, HowItWorks, WhoWeServe, Testimonial, CaseStudies, Contact)
- **Case Studies:** Data-driven system with `/cases/[slug]` routes, content in `data/case-studies.ts`
- **Client Proposals:** 10+ proposal pages under `/proposals/[client]`, most with interactive demos
- **Admin:** Password-protected dashboard at `/admin` (lists 3 of 10+ proposals — out of sync)
- **Analytics:** Full PostHog integration (pageviews, CTAs, section visibility, carousel, booking funnel, video)
- **Booking:** Cal.com embed popup working (namespace "blueprint")
- **Design System:** CSS custom properties in globals.css, Tailwind v4, shadcn/ui components
- **Deployment:** Vercel (auto-deploy from GitHub main branch)

### Active Proposals (routes under /proposals/)
1. eToll — AI Assistant ($4,500)
2. Orgonic Art / Raphael — EU Regulation Discovery ($540)
3. Alamance Property — Distressed Property Detection
4. CheckPoint — Social media automation (TWX)
5. Moppity — Data intelligence platform
6. GlobalHair — Phase 2 Ad Control Hub ($1,200)
7. Deck Builder — AI pitch deck (Aleksander Johansen)
8. Image Resize — AI image resizing tool
9. Theo — Custom proposal
10. Global Bridge — Company registration for expats (UAE), document/deadline management ($1,600)
11. **LyncPath** — Logistics SaaS container shipment visibility (Upwork lead)

### Git
- **Branch:** main
- **Remote:** git@github.com:vilin1927/autoflux-landing.git
- **Latest commit:** d25cf66 — "Global Bridge: fix storage and VPS pricing"

### Known Issues / Gaps
- Admin dashboard only lists 3 proposals (eToll, Orgonic Art, Alamance) — should list all 10+
- Case study video placeholders — no real video content yet
- No SEO meta tags (OG, Twitter cards, structured data, sitemap)
- No next/image optimization — using raw img tags in some places
- Some preview/test PNG files in project root (desktop-full-page.png, video-test.png, etc.) — should be gitignored

---

### Active Proposals (routes under /proposals/) — updated
1. eToll — AI Assistant ($4,500)
2. Orgonic Art / Raphael — EU Regulation Discovery ($540)
3. Alamance Property — Distressed Property Detection
4. CheckPoint — Social media automation (TWX)
5. Moppity — Data intelligence platform
6. GlobalHair — Phase 2 Ad Control Hub ($1,200)
7. Deck Builder — AI pitch deck (Aleksander Johansen)
8. Image Resize — AI image resizing tool
9. Theo — Custom proposal
10. Global Bridge — Company registration for expats (UAE), document/deadline management ($1,600)
11. LyncPath — Logistics SaaS container shipment visibility (Upwork lead)
12. **SmartFlip (Justin)** — AI product flipping platform (deal finder + smart scan + marketplace + profit pool). Demo sent, awaiting response.

---

## Session Log

### 2026-03-19 — SmartFlip demo for Justin

**What was built:**
- Interactive demo at `/proposals/smartflip/demo` with 5 screens: Dashboard, Deal Finder, Smart Scan, Marketplace, Questions
- Landing page at `/proposals/smartflip` with features, MVP scope, tech stack, CTA
- Mock data: 10 deals, 3 scan results, 6 marketplace listings, profit pool stats
- Questions section explains hardcoded template vs real MVP backend work + 5 clarifying questions

**Files created:**
- `app/proposals/smartflip/page.tsx` — landing page
- `app/proposals/smartflip/demo/page.tsx` — interactive demo
- `data/proposals/smartflip.ts` — all mock data

**Message sent to Justin:**
- Demo link + 5 clarifying questions (marketplace priority, profit pool admin, payment flow, image recognition, onboarding)
- Timeline: 3-4 weeks for MVP
- Next step: Justin answers questions → call → final proposal with pricing

**Commit:** `09338f5` — Add SmartFlip demo for Justin

**Decision:** Sent demo within 30 minutes of receiving spec. Speed is a competitive advantage — shows we build fast, which is exactly what we're selling.

---

### 2026-03-13 — Global Bridge deal status check

**Current probability: ~40-45%**

**Positive signals:**
- Made it to top 3 out of 50+ proposals on Upwork
- Had Zoom call + they asked for OCR details = serious interest
- "Ruzel studied everything" — they reviewed proposal thoroughly
- They tested live sites (fluxx.ru, smart-lex.de) from Russia

**Red flags:**
- "Need time to get back" without timeline — comparison mode
- 3 people interviewing = 2 active competitors
- Last viewed Upwork 2 days ago — checking other bids
- $1,600 bid is at average ($1,721) — risk of undercut by $800-1,000 bid

**What's likely happening:**
Comparing 2-3 finalists. Ruzel (tech lead/decision-maker) reviewed all proposals. Either:
1. Waiting for internal budget approval
2. Negotiating with cheaper contractor first
3. Actually busy with operations

**Next action:**
Wait 3-4 days (until ~March 17), then soft follow-up:
"Ирина, добрый день! Если возникнут вопросы по предложению — всегда на связи. Удачи с решением!"

---

### 2026-03-13 — Global Bridge proposal finalization

**Demo cleanup:**
- Removed "Интерактивное демо" button from proposal page
- Added "СТАРОЕ ДЕМО" amber banner to demo page (`/proposals/global-bridge/demo`)
- Banner says: "Это демо устарело. Актуальный функционал описан в коммерческом предложении."

**Storage decision:**
- Changed "Локальное / S3" to "Локальное (на VPS)" — no S3, files stored on VPS disk
- Rationale: 50 clients × 10 docs = ~500 PDFs (~1-2GB) — local storage is plenty

**VPS pricing updated to ranges:**
- Serverspace: ~$5/месяц → $5-10/месяц
- Fornex: €4.68/месяц → €5-10/месяц
- Aeza: €4.94/месяц → €5-10/месяц
- Summary: $5-10/месяц → $5-15/месяц
- Total monthly: ~$10-15/месяц → ~$10-20/месяц
- Rationale: realistic range for 2GB+ RAM VPS needed for Next.js + PostgreSQL + files

**Commits:**
- `556a8f5` — Global Bridge: remove demo link, add old demo badge
- `d25cf66` — Global Bridge: fix storage and VPS pricing

---

### 2026-03-12 — Global Bridge proposal overhaul
**Discovery:** Global Bridge is NOT a real estate agency — they do company registration for expats (Russian-speaking clients from CIS countries doing business in UAE)

**Updated proposal (`/proposals/global-bridge`):**
- Changed client role from "Real estate" to "Company registration for expats"
- Added TOP 5 hosting providers (Serverspace, Fornex, Aeza, YourServer, MVPS) with:
  - Country, locations, pros/cons, verdict for each
  - Serverspace marked as "ЛУЧШИЙ ВЫБОР" — UAE/Kazakhstan/Uzbekistan data centers
- Added new OCR section with:
  - 5 UAE document types: Trade License, Emirates ID, Residence Visa, Establishment Card, MOA
  - Arabic names (رخصة تجارية, etc.) and renewal periods
  - Fields extracted from each document type
  - How OCR works (5-step process using Claude API)
  - Accuracy (95%+) and cost (~$15-50 one-time for 50 clients × 10 docs)
- Added "ocr" to navigation sections

**Files changed:**
- `data/proposals/global-bridge-proposal.ts` — full data restructure
- `app/proposals/global-bridge/page.tsx` — hosting + OCR section rendering
- `docs/global-bridge-call-transcript-mar12.md` — full call transcript (requirements)

**Key requirements from call:**
- ~50 clients, ~10 documents per company
- Company health dashboard (green/orange/red)
- Email-only notifications for MVP (Resend free tier)
- PWA (add to home screen)
- 30% clients in Russia — hosting must be accessible from RF but NOT Russian company
- OCR to extract expiry dates from uploaded documents

### 2026-03-11 — LyncPath logistics demo
- Built full interactive demo at `/proposals/lyncpath/demo` for Upwork lead
- Product: end-to-end container shipment visibility SaaS
- Demo includes 8 views: Overview, Shipments (list + detail w/ 13-milestone tracker), D&D Exposure, Carrier Scorecard, Alerts, Email & OCR, Vendor Portal, Analytics
- 6 realistic shipments across Maersk, Hapag-Lloyd, CMA CGM, MSC, Evergreen, ONE
- Mock data in `data/proposals/lyncpath.ts`, single-page state-driven demo with framer-motion transitions
- Landing page at `/proposals/lyncpath` with features, how-it-works, CTA
- Deployed live: https://autoflux.digital/proposals/lyncpath/demo
- Also created standalone repo at `vilin1927/lyncpath-demo` (can be deleted, not needed)

### 2026-03-10 — Agentic infrastructure setup
- Created CLAUDE.md with project overview, stack, structure, rules
- Created features.json with 9 features (5 done, 1 in-progress, 3 not started)
- Created progress.md (this file)
- Updated .env.local.example (already existed with PostHog vars)
