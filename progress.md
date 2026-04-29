# AutoFlux Landing — Progress Log

## Current Session: 2026-04-29

### Upwork Niche & ICP positioning — defined and saved

**Context:** Vladimir is onboarding with an agency that will help automate Upwork outreach. Their form asks for primary niche, secondary niches, ICP, compromise client profile, and red flags. Generic answers would route low-quality leads — needed precise positioning grounded in real shipped work.

**What was done:**
- Spawned 9 parallel research agents to inventory shipped/active client projects: GlobalHair, CPA tool, CheckPoint/ReelPilot, SmartFlip, Tyler, Trucks (NTS), Moppity Vineyards, Aleksander/TasteForge, TikTok Slideshow
- Synthesized common pattern across all projects: AI integration + full-stack builds for non-technical SMB operators drowning in fragmented tools, replacing 5–15 hours/week of manual coordination
- Wrote top priority niche (with Moppity/Vinsight as named example)
- Wrote 10 secondary niches (down from 15 after merging commerce, document/compliance, hospitality+booking clusters), each with named flagship project and detailed real-life example
- Wrote IDEAL CLIENT profile (post-revenue SMB, 5-100 ppl, $1.5K-$5K fixed, decision <14 days)
- Wrote COMPROMISE CLIENT profile
- Wrote RED FLAGS list — grounded in SmartFlip/Justin stall pattern (equity/rev-share offers, scope expansion before payment, no contract 27+ days, 1–3 AM message bursts) and CLAUDE.md hard stack exclusions

**Files saved:**
- `docs/upwork-niche-positioning.md` — canonical reference, copy-paste ready
- Memory: `niche-icp.md` + `MEMORY.md` updated with pointer

**Active decisions:**
- Top niche is HORIZONTAL (captures all 10+ verticals), secondaries are vertical-specific to catch keyword-matched jobs
- 10 niches, not 15 — merged commerce (marketplace+arbitrage+Shopify), document/compliance (CPA+immigration+regulation), and hospitality+booking
- Every named example uses real client name, real geography, real stack, real outcome — no aspirational claims
- Don't market Claude Code anywhere (internal tool, not public offering)
- "Real signal vs false signal" insight: low Upwork spend ≠ red flag. The real signal is "won't commit to milestone 1 in writing within 7–10 days." TasteForge $600 → shipped clean. SmartFlip $2,500 → stalled at no-contract.

**What comes next:**
- Move to Dawson Wells Gallery deal — meeting Thursday Apr 30. Hard red flag: requested WordPress (excluded stack). Need to either decline-and-refer or counter-propose modern stack (Next.js + Sanity / Webflow).

### Dawson Wells Gallery — design concept demo built (counter-propose strategy)

**Context:** Dawson Wells (gallery startup) booked a Cal meeting for Thursday Apr 30 via Upwork. Brief: modern gallery website with WordPress CMS, ~100 artworks across 5 categories (Photography, Paintings, Drawings, Ceramics, Prints), reference site `guidomauas.com`, "flexible on budget and timeline." Polite, formal, no online presence yet, just-launching gallery. Wants visitors driven to the physical gallery — inquiry-only, not e-commerce.

**Strategic call:** WordPress is on our hard exclusion list. Three options were on the table — decline + refer / counter-propose modern stack / take WP against principles. Picked **hybrid (counter-propose Next.js + Sanity)** because Dawson is otherwise a great client signal (booked the meeting, formal comms, "flexible budget", clean brief, decision-maker). Rather than email a stack pitch before the meeting, decided to **build a real demo first** — same playbook as Convento, SmartFlip, BuilderMatch.

**What got built (commits `74e9757`, `92ad906`, `e411651`):**
- Data file `data/proposals/dawson-wells-gallery.ts`: 17 mock artworks across all 5 categories with realistic titles / artists / mediums / dimensions, 4 news posts, full sitemap matching Dawson's brief (Home / Artworks / News / About / Mission & Vision / Company Overview / Contact), gallery info (mission, vision, hours, email)
- Proposal placeholder `/proposals/dawson-wells-gallery` — "Proposal in preparation" badge, links to demo
- Full demo `/proposals/dawson-wells-gallery/demo` with: Hero, Homepage preview (in browser frame), Artworks page (live category filter), Single piece detail, News list, Mission/Contact previews, Black sitemap section, 3-step CMS preview (Sanity-style), "How it's built" reasoning
- Aesthetic: white + near-black + Playfair Display serif headlines, generous whitespace, browser-frame mockups — referenced from `guidomauas.com`
- Mock images via `picsum.photos` with deterministic seeds (stable but varied)
- No price quoted anywhere in the demo

**Iteration 1 — Vladimir said "too much given away":**
- Locked sections 03, 04, 05, 06, 07, 09 with "Walked through on our call" cards
- Locked CMS steps 2 (Edit) and 3 (Publish) with locked panels
- Section nav marks locked items with dimmed text + small lock glyph
- Only fully visible: Hero, Homepage preview, CMS Step 1 (list view)

**Iteration 2 — Vladimir said "don't mention call, explain use cases instead":**
- Replaced "Walked through on our call" with "Part of the build" badge + checklist of plain-English use cases per section (4 bullets each)
- CMS step 2/3 locked panels also show use cases (drop image / crop / live preview / auto-save for edit; publish / schedule / draft / version history for publish)
- Updated CMS section subtitle: "click them to see what they cover" (no call language)
- All copy is human-direct, no AI slop ("Hit publish. The piece is live in five seconds. No plugins to fight.")

**Active decisions:**
- Counter-propose modern stack at the meeting, not WordPress — demo IS the pitch
- No price in the demo (anchor at meeting: $5,500 Next.js + Sanity / refer out if WP non-negotiable)
- Use cases sell the build — not the meeting reveal
- Mock images use picsum.photos (replace with real artwork later if deal closes)

**Files / commits:**
- `8a588c3` — Niche & ICP positioning doc
- `74e9757` — Dawson Wells Gallery proposal + interactive demo
- `92ad906` — Lock most sections + CMS steps 2/3
- `e411651` — Locked sections show use cases, not call language

**What comes next:**
- Walk through the demo before the meeting Apr 30
- Use the demo on screen during the call to drive the stack-conversion pitch
- If Dawson agrees to Next.js + Sanity → send full proposal at $5,500 fixed
- If Dawson insists on WordPress → refer out politely, keep relationship for future
- Replace picsum mock images with real artwork after deal closes

---

## Previous Session: 2026-04-22

### Convento Arcádia — Demo built, tone-polished, delivery message ready

**What shipped (commits `df08cce`, `de85ae3`):**
- 4 pages live: `/proposals/convento-arcadia` (placeholder), `/demo` (landing), `/demo/integration` (architecture), `/demo/guest` (mobile walkthrough)
- Mock data file `data/proposals/convento-arcadia.ts`: 10 guests (Silva family protagonist), 5 reservations, 30 seeded charges, 10 user stories each with `acceptanceCriteria` + `decisionsTaken` + `openQuestions`
- English-only copy (Olaf is German). Brand: lime `#D4E157`, coral `#E8553A`, teal `#A8D5DB`, cream `#FAF7F1`, ink `#1A1A1A`
- Split-screen guardian moment on guest flow (Pedro waiting / Maria approving, US-10)

**Tone passes (multiple iterations driven by Olaf-aware Vladimir feedback):**
1. First build had "MATCHES YOUR SPEC" badges + sales framing → stripped
2. Vladimir: "dont include sales language here dont push and dont show aggressively pros cons" → removed all theatrical framing, changed eyebrows to neutral "01/02/03..."
3. Vladimir: "exlcude ai slop language long captions and arrow" → removed every narrator subtitle, every `ArrowRight`/`ArrowLeft`, all unicode `→←↔`, killed FlowLegend + PipelineArrow unused components
4. Vladimir: "change all the language everywhere to simple english in my tone of voice" → "Integration architecture & scope" → "How it fits together", "Every charge, provable" → "Audit log", "What's here, what's not." → "What's in the demo", etc.
5. Visual bug fix: hero gradient on demo landing was fading text to cream mid-paragraph → `from-black/30 via-black/50 via-60% to-[#FAF7F1]` + `pb-24`
6. Guest flow banner clarifier added: "Illustrating how the flow works, not the final UI. Deli's existing app handles scenes 1–3; scenes 4–7 are the new authorisation logic layered on top." — prevents Olaf assuming we're rebuilding the Deli app

**Delivery message drafted (not yet sent):**
- Opens with TL;DR: n8n possible + Cloudbeds folio caveat; suggested custom build ~2 weeks; n8n-only path also offered
- 11 blockers listed by US number (not all 20 open questions — rest are in the demo cards)
- NO price quoted. "Happy to jump on a call" close.

**Active decisions:**
- NO price in delivery message — let Olaf name first or force the call
- Pitch Fudo (Deli) not just Deli
- Cloudbeds folio constraint framed "as of April 2026" (forward-compatible)
- Open questions live inside user-story cards in the demo; email only names the 11 blockers

**What comes next:**
- Send delivery message + demo link to Olaf on Upwork
- Record Loom walkthrough (optional, decide after his first reply)
- On reply asking for price: give a range on the call only ("~$1k lean / $3–4k production")

---

## Previous Session: 2026-04-21

### Convento Arcádia (Sven Olaf Lorz) — Demo scoping + API verification

**Deal context:** Upwork job was anchored $600–1000 n8n integration (Deli ↔ Cloudbeds). After reading full 13-page spec "Integração entre Deli e Cloudbeds - EN.pdf", real scope is $2.5–3.5k: 10 user stories, LGPD, CPF/passport auth with rate-limit, minor/guardian flow (US-10), adult-not-owner (US-09), 24-month searchable audit, Fudo/Deli (fu.do) + Cloudbeds two-way sync.

**Demo architecture decision — Option C (two-page split):**
1. `/proposals/convento-arcadia/demo/integration` — ⭐ the main sell. Animated Cloudbeds → n8n → Deli pipeline, all US-01 through US-10 as clickable nodes, Cloudbeds folio constraint visualized, audit table with LGPD masking, "Escopo desta demo" card as price-proxy.
2. `/proposals/convento-arcadia/demo/guest` — optional Convento-branded mobile cinematic (Pedro/Maria split-screen guardian moment) framed as "camada de UX opcional sobre QR do Deli".

Proposal page: hardcoded "Proposta em preparação" banner in Convento brand.

**Verified API claims (2026-04-21):**
- **Cloudbeds folio constraint: CONFIRMED.** Source: integrations.cloudbeds.com/hc/en-us/articles/360006426054-Point-of-sale. Quote: "you will always post all transactions under the main guest name and the reservationID they have." Multi-folio is on roadmap but not shipped. Pitch as "as of April 2026" — forward-compatible framing.
- **subReservationID / roomID nuance:** For multi-room reservations, charges CAN target a specific room even though folio is the reservation owner's. Worth a line in the architecture page.
- **Deli = Fudo (fu.do).** Argentine/LatAm POS SaaS. Real API, real dev portal. Pitch as "Fudo (Deli)" not just "Deli."
- **NOT verified:** exact postCharge field schema, Fudo endpoint names, LGPD CPF retention specifics. Call follow-up items. Don't assert field names in the Loom.

**Pricing decision:** NO PRICE in the delivery message. Send demo + Loom + ask for call. Let Olaf name the number or force him into the call to get one. "Escopo desta demo" card on integration page acts as price-proxy (what's included/excluded) without a dollar figure.

**Brand (sampled from convento-arcadia.com screenshots):**
- Primary CTA: `#D4E157` lime yellow
- Accent: `#E8553A` coral (special offers block)
- Teal: `#A8D5DB` (footer, logo bg)
- Cream: `#FAF7F1`
- Ink: `#1A1A1A`
- Display: condensed wide serif; Body: Inter
- Logo: `/Users/elizavetapirozkova/Downloads/logo-mobile-240x70-1-2.webp`

**Defaults for build:** mock data (no Supabase), PT-only copy, split-screen guardian moment on /guest, port 3939 dev.

**What comes next:**
- Build Option C (both pages + proposal placeholder)
- Record Loom with Cloudbeds folio reveal + "as of April 2026" framing
- Send demo link, no price, ask for 20-min call

---

## Previous Session: 2026-04-02

### SmartFlip — V1 Scope Confirmed, Still No Contract

**Justin confirmed V1 scope swap (Apr 2, 12:46 AM his time):**
- Marketplace OUT of V1 — Justin agrees it's "a big beast" and better to launch last with all features in place
- V1 is now: Deal Finder + Heat Meter + Smart Scan + Profit Tracker + Sales Page + Affiliate + Subscriptions
- Sales Page with "Join Waitlist" goes first (Vladimir offered within couple days)

**Justin's late-night research (1:29-2:21 AM):**
- Found Karrot (local community marketplace, 10M+ users) — studying competitor models
- Asking about gamified referral mechanics (spin-to-win cash rewards like Temu/Karrot)
- Question: "would the company be fronting that out of pocket?" — answer is yes, it's a user acquisition loss leader
- This is V2/V3 territory, not V1

**Deal status:**
- V1 scope: CONFIRMED
- V1 price: $2,500 (milestones $1,000 / $1,000 / $500)
- Contract: STILL NOT SENT (now 9+ days since agreement)
- Win probability: ~40-45% (continuing to decay)
- Justin still in research/ideas mode — positive for engagement, negative for urgency
- Apr 7 soft deadline for follow-up still stands

**Vladimir's reply sent (Apr 2):**
- Confirmed marketplace makes more sense later when users are on platform
- Acknowledged Karrot — "clean local-first model, worth studying for V2 marketplace"
- Explained spin rewards = company-funded user acquisition, Temu burns billions on it
- Suggested simple referral bonus instead of gimmicky spin mechanics
- Closed with: "I'm ready to start on the sales page whenever you want to kick this off"
- Tone: short, confident, no pressure — ball is in Justin's court

**What comes next:**
- Wait for Justin to respond and send Upwork contract
- If no contract by Apr 7, one follow-up then move on

---

## Previous Session: 2026-04-01

### SmartFlip — Deal Negotiation Update

**Status:** Justin accepted V1 scope and pricing. Moving forward WITHOUT 10% rev share.

**Win probability: ~45-50%** (drops ~2-3% per day without contract)

**Key outcomes:**
- V1 price confirmed: **$2,500** ($1,000 / $1,000 / $500 milestones)
- **10% rev share is OFF the table.** Vladimir rejected it, Justin accepted. All work is flat rate only.
- V2 rough estimate shared with Justin: **$5,000 - $8,000** for all 16 features
- Justin confirmed V1 spec looks good and fair
- Created clean spec doc: `docs/smartflip-spec.md` with all V1 + V2 features organized

**Full negotiation timeline:**
- Mar 19: Demo sent to Justin, 5 screens (Dashboard, Deal Finder, Smart Scan, Marketplace, Questions)
- Mar 22-24: Back and forth on profit pool split (40/20/40), subscription pricing ($49/mo, $397/yr, $1 trial), competitor research (ResaleScan, Underpriced AI, ThriftFlip, Resale Wizard, Flipl)
- Mar 24: Justin proposed 10% rev share for lower upfront. Vladimir countered $2,700 + 10%. Justin countered $2,500 + 10% covers all future work. Vladimir said 10% on top of paid work, not instead. Justin said "okay"
- Mar 25: Justin's sister feedback — AI listing description for copy/paste. Agreed to start "next week"
- Mar 26: Competitor research shared. Justin wants 50% off for life pre-launch. Asked to kick off — Justin said "next week" (again)
- Mar 30: Justin's 1-3 AM brain dump — 20+ messages with new feature ideas from talking to real flippers. Key new requests: local deal priority (FB/Kijiji/Craigslist), AI Trend Heat Meter, condition tips, tax calculator, public success feed, 3 audience targeting, education sponsors, advanced affiliate, marketplace profiles/ratings/messaging
- Mar 31: Vladimir organized all notes into V1/V2 split, sent to Justin. Justin pushed back — said scope hasn't changed, 10% was always for ongoing build. Vladimir pushed back — "can't work on big scope for 10%". Miscommunication resolved. Justin asked for clean document.
- Mar 31 (evening): Vladimir firmly rejected 10% rev share. Reasons given: no control over business, no users yet, no timeline to acquire users, not a close partnership. Justin accepted.
- Apr 1: Created `docs/smartflip-spec.md` with complete V1 (10 categories) + V2 (16 features). Justin confirmed "looks good and fair". V2 estimate shared: $5-8k. Justin asked about marketplace trade.

**V1 scope change under discussion:**
- Justin proposed: drop Marketplace from V1, swap in AI Trend Heat Meter instead
- Justin wants Sales Page built first with "Join Waitlist" button so he can start marketing while app is built
- Marketplace moves to V2 (makes sense — needs users to be valuable, chicken-and-egg with zero users)
- Awaiting Justin's final confirmation on this swap
- If swap happens, V1 becomes: Deal Finder + Heat Meter + Smart Scan + Profit Tracker + Sales Page + Affiliate + Stripe (pure tool, no marketplace)

**V2 pricing breakdown (internal, not shared with Justin in detail):**
- Simple extensions (7 features): $650-950 — value tips, auto-negotiate, promoted listings, reservation hold, education, training, success feed
- Medium complexity (5 features): $1,400-1,975 — heat meter, pro images, "looking for" listings, tax calc, advertising
- Heavy builds (4 features): $2,875-4,125 — full marketplace, in-app payments, AI auto-listing (4 platforms), advanced affiliate
- Total: $5,000-7,000 realistic (shared as $5,000-8,000 with buffer)

**Deal terms (final):**
- V1: $2,500 flat, 3 milestones ($1,000 / $1,000 / $500)
- V2: flat rate, same structure, priced per feature/phase ($2,000-3,000 per phase)
- No rev share, no equity, no partnership — pure contractor
- Upwork contract still not sent by Justin (8+ days since "agreed")

**Positive signals:**
- Accepted dropping 10% without a fight
- Asking practical build questions (marketplace trade, sales page first)
- Confirmed spec "looks good and fair"
- Talked to real flippers, has distribution plan (500k YouTube influencer friend)
- 2+ weeks consistent engagement
- His sister is a flipper — personal investment in the product

**Red flags:**
- No Upwork contract sent — 8+ days since agreement
- His biggest Upwork job ever was $500 (this is 5x)
- Every time pushed for contract, responds with more ideas/questions
- Scope kept expanding before any money changed hands
- Sends 20 messages at 1-3 AM — impulsive communication style

**What comes next:**
- Justin confirms V1 scope (with or without marketplace swap)
- **Justin sends Upwork contract** (blocker — nothing starts without this)
- Build sales page with waitlist first
- Then build core app
- If no contract by ~Apr 7, follow up once then move on

**Active decisions:**
- Rejected 10% rev share because: no control over business, no users, no revenue, could take months/never to pay out
- Proposed marketplace-for-heat-meter swap because: marketplace with zero users is useless, heat meter works from day one and is Justin's stated #1 differentiator
- Sales page first strategy accepted: low effort (1-2 days), gives Justin something to market, builds momentum toward contract

---

## Previous Session: 2026-03-21

### SmartFlip Proposal Page -- Deal Sources, Affiliate, Costs Update (F-016)

**What was done:**
- Updated Deal Finder solution description: buy-side (FB Marketplace, Walmart clearance/rollback, SlickDeals, DealNews, thrift stores, eBay underpriced) and sell-side (eBay, Amazon via Keepa, Shopify)
- Updated v1Features: expanded Deal Finder sources, added Keepa for Amazon price history, added user profiles, changed affiliate to pluggable module starting with Amazon Associates Canada
- Updated tech stack: added Walmart API, Keepa API, SlickDeals + DealNews RSS; changed Amazon Creators API to "Amazon (via Keepa)"
- Updated API costs from ~$10-15/month to ~$75-95/month (Keepa is main additional cost)
- Updated Profit Pool "Where the money comes from" card: affiliate system is pluggable, starting with Amazon Associates Canada, eBay/Walmart added when available for Canada
- Updated V2 roadmap: Amazon integration note now mentions Keepa from day one, Creators API at no extra charge when Associates qualifies; added Sales Landing Page ($200)
- Updated M1 deliverables: added user profiles with name, email, phone, address, affiliate link, payout settings
- Updated M2 deliverables: deal finder lists all sources (Walmart clearance, SlickDeals, DealNews alongside eBay/Facebook); added Keepa integration line
- Updated M3 deliverables: added pluggable affiliate module starting with Amazon Associates Canada
- TypeScript check: zero errors
- Pricing unchanged: $2,800 = $1,000 + $1,000 + $800

**Files changed:**
- `app/proposals/smartflip/page.tsx` -- all updates

---

### BuilderMatch.ai — Proposal & Demo Build (for Raj Kumar)

**Client:** Raj Kumar, Coventry UK. Upwork job "AI Marketplace Development Specialist".
**Project:** BuilderMatch.ai — two-sided marketplace connecting UK homeowners with tradespeople. AI-enhanced matching, lead unlock monetization.
**Budget:** $4,000 posted, competing proposal at $5,000 (8-10 weeks). Our bid: $3,000 (4-5 weeks).
**Status:** Building proposal page + interactive demo. Strategy: demo first, questions embedded.

**Docs analyzed:**
- BuilderMatch_RFP.docx — full vision (massive scope, 5 AI agents, native apps, SEO pages)
- BuilderMatch MVP Spec v4.docx — cut to $5K, 8-10 weeks, still 5 agents
- FRD.pdf — another dev's proposal at $5K with 5 milestones

**What's being built:**
- Data file: `data/proposals/buildermatch.ts` ✅
- Proposal page: `app/proposals/buildermatch/page.tsx` (in progress)
- Demo page: `app/proposals/buildermatch/demo/page.tsx` (in progress)

**Key decisions:**
- Dark theme (like SmartFlip) for premium feel
- "Every Feature in Plain English" section — super clear, no jargon, with examples
- 3 milestones: $1,000 + $1,200 + $800 = $3,000 total
- 7 questions embedded at bottom of proposal
- Demo: 5 tabs (Job Wizard, Dashboard, Quotes, Lead Unlock, Admin)

---

### SmartFlip — API & Data Source Verification (for Justin build)

**Research completed:** Verified 5 APIs/data sources for SmartFlip MVP feasibility.

**Findings:**
1. **Walmart Affiliate API (walmart.io)** — ACTIVE. Supports Search, Catalog Product, Special Feeds (clearance, rollback, special buy). Old walmartlabs.com deprecated, migrated to walmart.io. Open for new registrations. Commission: up to 4% via Impact Radius.
2. **Slickdeals RSS** — ACTIVE. Frontpage feed at `slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1`. Also has a partner API (paid, they pay YOU) with deals, coupons, articles. 5,000+ deals/month.
3. **DealNews RSS** — ACTIVE. Main feed at `dealnews.com/?rss=1`. Category-specific feeds available. RSS page at dealnews.com/pages/rss.html.
4. **Keepa API** — ACTIVE. Starts at 19 EUR/mo (1 token/min basic). Full API plans: 49 EUR (20 tokens/min) to 4,499 EUR (4,000 tokens/min). Open to new devs. Token-based system, tokens expire after 60 min.
5. **Walmart Developer Portal** — ACTIVE. Open for new registrations. Separate from walmart.io (marketplace vs affiliate). Migrated to Global APIs by Jan 31, 2026.

**Decision:** All 5 data sources are confirmed real and active as of March 2026. No blockers for SmartFlip build.

**What comes next:**
- Use these confirmed APIs in SmartFlip architecture
- Walmart.io for clearance/rollback deal feeds
- Slickdeals + DealNews RSS for cross-platform deal aggregation
- Keepa for Amazon price history (start with 19 EUR basic plan)

---

## Previous Session: 2026-03-20

### SmartFlip Demo — UX Improvements Round 2 (F-010 / F-013)

**What was done:**
- Clickable source links on deals: `recentlySoldSource` text now shows ExternalLink icon and hover underline in both deal list and deal detail panel. Added "View source listing" link below the Buy button in deal detail.
- Location picker: Added MapPin + "Los Angeles, CA" dropdown-styled indicator in the sticky top bar (between MVP Demo badge and Proposal link). Added "Showing deals near: Los Angeles, CA (change)" indicator in Deal Finder view above condition/budget filters.
- Trending deals clickable: Dashboard trending deal rows are now `<button>` elements that navigate to Deal Finder tab via `onNavigate("deals")`.
- Seller ratings on marketplace: Each listing card shows seller name with star rating (e.g., "QuickSell_Sarah 4.8"). Added Flag "Report" link in footer of each listing card.
- TypeScript check: zero errors

**Files changed:**
- `app/proposals/smartflip/demo/page.tsx` - all four changes

**What comes next:**
- Wait for Justin's feedback
- Deploy when approved

---

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
