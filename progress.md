# AutoFlux Landing — Progress Log

## Current Session: 2026-03-20

### SmartFlip Proposal Page — Subscription Split Fix (F-011 / F-015)

**What was done:**
- Fixed profit pool subscription split on proposal page (`/proposals/smartflip`)
- Old (WRONG): "Subscription revenue goes to operating costs, never into the pool" with 30% affiliate / 15% marketplace fees
- New (CORRECT): 40% of subscriptions go to Profit Pool, 20% referral commissions, 40% company
- Updated 7 locations in `app/proposals/smartflip/page.tsx`:
  1. Solutions array: marketplace desc changed to "Built-in marketplace to find flipping deals from people selling for quick cash"
  2. v1Features: Profit Pool line now shows 40/20/40 split
  3. v1Features: Marketplace line updated to match new language
  4. Profit Pool "Where the money comes from" card: removed "never into the pool", added subscriptions as largest source
  5. Profit Pool "How it's split" card: replaced 30%/15% with 40/20/40 breakdown
  6. "Example at scale" section: recalculated for 1,000 subs at $49/mo = $49K, showing $19,600 pool / $9,800 referral / $19,600 company
  7. Milestone 3 deliverables: updated marketplace and profit pool lines
- Fixed V1 price label from "$3,500" to "$2,800"
- Verified: no em dashes or arrows added, pricing unchanged ($2,800 = $1,000 + $1,000 + $800)
- TypeScript check: no errors in proposal page (pre-existing errors in demo/page.tsx remain)

### SmartFlip Demo Page — Major Earnings Rebuild + UX Improvements

**What was done:**
- Fixed subscription split in demo earnings view: removed "subscription revenue covers operating costs and is never put into the pool", replaced with correct 40% subscriptions to profit pool, 20% direct referral commission, 40% company
- Added search bar to Deal Finder view with real-time title filtering
- Made budget filter buttons bigger (matching category filter button sizing)
- Completely rebuilt Earnings page with 6 sections matching Justin's screenshot:
  1. Top row: Total Revenue ($4,850), Base Pool ($970), Growth Pool ($970)
  2. Your Estimated Monthly Payout + Monthly Cap Progress with animated bar
  3. Platform Revenue Sources horizontal bar chart (Marketplace, Subscription, Affiliate)
  4. How the Profit Pool Works - 3 numbered steps explaining 40/20/40 split
  5. Referral Program - 20% commission, referral list with earnings
  6. Earnings History - table with date, type, amount, paid/pending status
- Updated data types in smartflip.ts: ProfitPoolData and EarningsData interfaces expanded with basePool, growthPool, revenueSources, referrals, history, monthlyCap, etc.
- Updated marketplace subtitle: "Find flipping deals from people selling for quick cash"
- Fixed em dash in scan result condition ("Good - some wear")
- Dashboard sidebar earnings card updated to use new data fields (basePoolShare, growthPoolShare)
- TypeScript: zero errors after all changes

**What comes next:**
- Wait for Justin's feedback on demo
- Deploy when approved

---

## Previous Session: 2026-03-19

### SmartFlip (Justin Connell) — Full Proposal Ready to Send

**Status:** Proposal and demo built, audited, priced. Ready to send link + record Loom.

**What was built:**
1. Full proposal page at `/proposals/smartflip` with 11 sections: Problem, Solution, How It Works, 3 tangible milestones with app mockups, V1/V2 scope, Tech Stack, Profit Pool math, Pricing, Next Steps
2. Updated demo at `/proposals/smartflip/demo` with 5 tabs: Dashboard, Deal Finder, Smart Scan (SKU matching), Marketplace (5% fee), Earnings (profit pool + affiliate only)
3. All Justin's confirmed requirements mapped to milestones

**Pricing decision: $2,800 (down from $3,500)**
- M1 "Scan & Price": $1,000 (days 1-5)
- M2 "Find Deals": $1,000 (days 6-10)
- M3 "Sell & Earn": $800 (days 11-15)
- Rationale: Justin's max fixed-price ever was $500. His avg hourly is $18.67. At $2,800 we're ~$23/hr equivalent, closer to his anchor. Win probability ~65-70% vs ~45-50% at $3,500.
- Floor: $2,200. If he offers upfront: $2,500.

**Technical audit (March 2026):**
- eBay Browse API: ACTIVE, 5K/day limit (request increase during dev)
- Amazon PA-API 5.0: DYING April 30, 2026. Replacement (Creators API) requires Associates account with 10+ sales
- BLOCKER: Amazon integration depends on Justin having active Associates account. eBay is primary for MVP, Amazon added when account qualifies (included in price, no extra charge)
- eBay Partner Network: ACTIVE, 1-4% commissions
- Claude Vision: ACTIVE, ~$0.005/scan, best option for Smart Scan
- Stripe $1 trial: WORKING, need clear disclosures + one-click cancel for state law compliance
- Stripe Connect: ACTIVE for 5% marketplace fee
- Next.js 16.2 released March 18 — clean upgrade

**Must ask Justin on call:**
1. Do you have an active Amazon Associates account? (blocker for Amazon API)
2. Flat price or do you want to discuss further?

**Commits this session:**
- `6e03272` — Full proposal page (milestones, pricing, app previews)
- `38988f8` — Demo update (earnings tab, SKU matching, mobile support)
- `9ee1da6` — PWA clarification ($650, V1 is responsive)
- `5e3fc88` — Remove em dashes and arrows from text
- `8d54c48` — Remove specific time promises
- Current — Price update to $2,800, Amazon blocker noted in proposal

**Justin's additional requirements (from late-night conversation 2026-03-19):**
- Marketplace: FREE access for sellers (no membership), $49/mo only for AI tools. More inventory = better for paid flippers
- Deal Finder: scan Facebook Marketplace alongside eBay + Amazon. Real arbitrage: "found on FB for $10, sells for $20 on eBay"
- Custom search: users can search specific items/categories on top of auto-scan
- Profit pool dashboard: pie chart, analytics breakdown, $10K cap with progress bar, % calculator
- Affiliate: 20% referral commission for direct new member sales, rest splits business/pool
- Marketplace listings: show current price, profit margin, recently sold data, filter local/global
- Budget filter in deal finder (price range)
- V2 ideas: $97/mo Pro tier (post to eBay/Etsy/Shopify + sales tracking), smart coupon extractor, cashback feature
- ProductChimp and Keepa shared as reference competitors
- Justin HAS Amazon Associates account (no activity yet, will qualify once SmartFlip drives traffic)
- Ongoing API costs: ~$40-60/mo (AI, scraping, hosting) — discuss on call

**What comes next:**
- Schedule call (offered today 8-12:30 PM his time or weekend 8-1:30 PM)
- Close the deal at $2,800
- Start building

---

### Previous Research (2026-03-19)

**Competitor landscape:** Tactical Arbitrage ($59-129/mo, Amazon only), BuyBotPro ($40-130/mo), Underpriced AI ($9-99/mo), Flipify ($5-10/mo), WorthPoint ($29-47/mo). Nobody does the full loop: photo scan to identify to cross-platform pricing to profit calc. SmartFlip's differentiator.

**Profit pool model:** Funded from affiliate commissions (30% of eBay Partner Network earnings) + marketplace fees (15% of 5% transaction fees). Never from subscriptions. Self-correcting: if revenue drops, pool shrinks. At 1,000 subscribers, pool ~$2,625/mo, avg user payout $6-15/mo.

**$49/mo pricing:** Competitive. Above basic deal finders ($5-10), on par with Underpriced AI Plus ($49), below full platforms ($70-250). Justified by scan + deals + marketplace + profit pool combo.

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
