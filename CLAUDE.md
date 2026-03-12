# AutoFlux Landing — Marketing Site & Proposal Platform

## Project Overview
AutoFlux agency marketing website + client proposal delivery platform. Serves two purposes:
1. **Public landing page** at autoflux.digital — hero, trust bar, stats, how-it-works, case studies, contact/booking
2. **Client proposals** — password-protected proposal pages with interactive demos, sent to prospective clients

## Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, CSS custom properties design system, tw-animate-css
- **UI:** shadcn/ui (New York style), Radix primitives, Lucide icons
- **Components:** Framer Motion (animations), Embla Carousel, React Player
- **Analytics:** PostHog (pageviews, CTA clicks, section visibility, carousel nav, booking funnel)
- **Booking:** Cal.com embed (popup mode, namespace "blueprint")
- **Font:** Inter (Google Fonts via next/font)
- **Deployment:** VPS at 194.36.88.191 (Frankfurt), PM2 process `autoflux`

## Project Structure

```
landing-next/
├── CLAUDE.md              <- Project rules (this file)
├── features.json          <- Task board
├── progress.md            <- Session log
├── app/
│   ├── layout.tsx         <- Root layout (Inter font, PostHog + Cal providers)
│   ├── page.tsx           <- Homepage (8 sections)
│   ├── globals.css        <- Design system (CSS vars + Tailwind v4)
│   ├── admin/             <- Password-protected proposal dashboard
│   ├── cases/[slug]/      <- Dynamic case study pages
│   ├── proposals/         <- Client proposal pages (10+ clients)
│   │   ├── etoll/         <- eToll AI Assistant
│   │   ├── checkpoint/    <- CheckPoint social media automation
│   │   ├── moppity/       <- Moppity Vineyards data platform
│   │   ├── globalhair/    <- GlobalHair proposal
│   │   ├── deck-builder/  <- AI Deck Builder (Aleksander)
│   │   ├── alamance-property/
│   │   ├── orgonic-art-raphael/
│   │   ├── image-resize/
│   │   ├── theo/
│   │   └── global-bridge/
│   └── prd/               <- Public PRD pages
├── components/
│   ├── sections/          <- Homepage sections (hero, trust-bar, stats, how-it-works, etc.)
│   ├── layout/            <- Header, Footer, Mobile Nav
│   ├── ui/                <- Button, CalButton, TrackedButton, TrackedLink, GradientBackground
│   ├── animated/          <- Carousel3D, CountingNumber, FluxIllustration, MotionCarousel
│   ├── case-study/        <- CaseStudyCTA, ImageGallery, MediaShowcase, VideoPlayer
│   ├── theo/              <- Theo-specific proposal sections
│   └── tracking/          <- CaseStudyTracker (PostHog)
├── data/
│   ├── case-studies.ts    <- All case study content (exported as array)
│   └── proposals/         <- Proposal data files per client
├── providers/
│   ├── posthog-provider.tsx  <- PostHog init + analytics helper functions
│   └── cal-provider.tsx      <- Cal.com embed setup
├── hooks/
│   ├── use-track-section.ts  <- IntersectionObserver for section visibility tracking
│   └── use-media-query.ts    <- Responsive breakpoint hook
├── lib/utils.ts           <- cn() helper (clsx + tailwind-merge)
├── types/case-study.ts    <- CaseStudy, CaseMedia, CaseCategory interfaces
├── docs/                  <- Prompt templates (create-prd, create-proposal, etc.)
├── public/
│   ├── images/            <- Logos, case study images
│   ├── proposals/         <- Proposal-specific static assets
│   └── invoices/          <- Invoice HTML files
└── skills/                <- Claude Code skills (architecture, debugging, etc.)
```

## Homepage Sections (in order)
1. Header (nav + CTA)
2. Hero (headline + CTA)
3. TrustBar (social proof logos)
4. StatsSection (counting numbers)
5. HowItWorks (3-step process)
6. WhoWeServe (target audience cards)
7. Testimonial (client quote)
8. CaseStudies (filterable cards linking to /cases/[slug])
9. Contact (Cal.com booking embed)
10. Footer

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/cases/[slug]` | Individual case study (SSG via generateStaticParams) |
| `/admin` | Password-protected proposal dashboard |
| `/proposals/[client]` | Client proposal page |
| `/proposals/[client]/demo` | Interactive demo for client |
| `/proposals/[client]/proposal` | Alternate proposal view (Moppity) |
| `/prd/tiktok-slideshow` | Public PRD page |

## Design System
- CSS custom properties defined in `app/globals.css` (`:root` block)
- Primary: Navy (#1E1B4B), Accent: Lime/Chartreuse (#CFFF4D), Secondary: Teal
- Background: Cream (#F7F5F0), White, Light (#FAFAF8)
- Border radius tokens: --radius-sm (8px), --radius-md (12px), --radius-lg (20px), --radius-xl (28px)
- Shadow tokens: --shadow-sm through --shadow-xl
- Max content width: 1320px with px-4 md:px-8

## Deployment

```bash
# SSH to server
ssh root@194.36.88.191

# Deploy (on server)
cd /var/www/autoflux-landing && git pull origin main && npm install && npm run build && pm2 restart autoflux
```

- **Server:** 194.36.88.191 (EU-FR Frankfurt, 4 CPU, 8GB RAM, 100GB disk)
- **App location on VPS:** /var/www/autoflux-landing
- **PM2 process:** autoflux
- **Git remote:** git@github.com:vilin1927/autoflux-landing.git

## Environment Variables
- `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` — PostHog ingest URL (default: https://us.i.posthog.com)

## Rules

### Session Protocol
- Read features.json and progress.md before starting work
- Update progress.md after completing a task
- Each session: read state -> pick task -> implement -> test -> update progress.md

### Code Rules
- Use the existing design system (CSS custom properties in globals.css) — do not introduce new color values inline
- All interactive components must be "use client"
- Track all user interactions via the `analytics` object in `providers/posthog-provider.tsx`
- Use `cn()` from `lib/utils` for conditional class merging
- Case studies are data-driven — add content to `data/case-studies.ts`, not as hardcoded JSX
- Proposals are individual page routes under `app/proposals/[client]/`
- New proposals should follow the existing pattern: page.tsx (proposal) + demo/page.tsx (interactive demo)
- Cal.com buttons use data attributes: `data-cal-namespace="blueprint"` + `data-cal-link="autoflux/blueprint"`

### Deployment Rules
- Always `git commit` before deploying
- Deploy command runs on VPS: `git pull && npm install && npm run build && pm2 restart autoflux`
- Never overwrite .env.local on VPS

### What NOT to Do
- Do not add new npm dependencies without declaring them
- Do not modify the PostHog key or Cal.com configuration
- Do not change the admin password in admin/page.tsx
- Do not commit .env.local or .server-config

## Test Commands

```bash
# Dev server
npm run dev

# Production build (catches type errors)
npm run build

# Lint
npm run lint
```
