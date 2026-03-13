# AutoFlux Landing — Progress Log

## Current State (2026-03-13)

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

## Session Log

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
