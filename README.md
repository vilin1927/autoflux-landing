# AutoFlux Landing Page

This repository contains the static landing page for **AutoFlux**, a profit-first AI automation agency specializing in lead gen, call analysis, and operations automation.

Built with vanilla HTML/CSS/JS for maximum compatibility and zero dependencies. Can be hosted anywhere (Railway, GitHub Pages, Netlify, Vercel, S3, etc.).

## 🎨 Design System

**AutoFlux Palette A (SaaS Blue)**
- Primary Blue: `#1A4FF6`
- Dark Navy: `#0F1C3F`
- Sky Accent: `#67C8FF`
- Cloud White: `#F5F7FA`

**Typography:** Inter (Google Fonts)

**Brand Voice:** Professional, modern, profit-focused—no corporate fluff.

## 📁 Project Structure

```
Landing/
├── index.html                                    # Main landing page
├── styles/
│   └── main.css                                  # Design system + animations + responsive
├── scripts/
│   └── main.js                                   # Scroll animations, counters, form handling
├── cases/                                        # Individual case study pages
│   ├── tiktok-slideshow-automation.html
│   ├── wellness-vet-lead-enrichment.html
│   ├── sales-call-analysis-automation.html
│   ├── vet-clinic-competitor-intelligence.html
│   ├── lead-gen-automation-pipeline.html
│   └── automated-reporting-masterleads.html
├── assets/
│   ├── images/                                   # Logo files (to be added)
│   └── videos/                                   # Case study videos (to be added)
├── CNAME                                         # Custom domain (if using GitHub Pages)
└── README.md
```

## ✨ Features

### Landing Page
- **Hero Section:** Profit-first positioning with animated metrics counter
- **How It Works:** 4-step process breakdown
- **Who We Serve:** 4 target audience segments with specific pain points
- **Case Studies Grid:** 6 real automation case studies with video placeholders
- **Contact Form:** Free automation blueprint call CTA

### Animations (Vanilla JS)
- Scroll-triggered fade-ins and slide-ups (Intersection Observer)
- Animated number counters (requestAnimationFrame)
- Parallax effects (subtle, performant)
- Interactive hover states on cards, badges, and buttons
- Smooth scroll navigation

### Case Studies (6 Pages)
1. **TikTok Slideshow Automation** - Creative production automation (60→15 min)
2. **Multi-Source Lead Enrichment** - 3,000+ verified contacts for wellness/vet directory
3. **AI-Powered Call Analysis** - LLM scorecards + BigQuery + GHL sync (45→5 min)
4. **Vet Clinic Competitor Intel** - 1-click competitive landscape dashboard
5. **Spec-Driven Lead Gen Pipeline** - Sheet → scrape → tier → enrich → CRM
6. **Automated Reporting** - MongoDB → aggregation → scheduled Excel/CSV delivery

Each case study includes:
- Challenge, solution, workflow steps, tech stack
- Results with metrics
- Client testimonial
- Video placeholder (ready for actual videos)

## 🚀 Local Development

Open `index.html` directly in a browser, or run a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deploying on Railway with autoflux.digital

1. Push this folder to GitHub (`vilin1927/autoflux-landing` or similar).
2. In Railway, create a **Static Site** project and connect it to that GitHub repo.
   - Build command: _leave blank_
   - Output/public directory: `/` (root)
3. Deploy; Railway will serve the site on a temporary `.railway.app` URL.
4. Project → Settings → Domains → **Add Custom Domain** → enter `autoflux.digital` (and optionally `www.autoflux.digital`).
5. Railway will show the DNS records required (usually a CNAME pointing to `<project>.up.railway.app`). Copy those values into Regway’s DNS panel. Remove any GitHub Pages A-records so the domain points exclusively to Railway.
6. Once DNS propagates, Railway automatically issues an SSL cert. Toggle “Force HTTPS” in the domain settings to ensure secure traffic.

> Note: the `CNAME` file in this repo is only used if you ever decide to host on GitHub Pages. Railway does not read it, so it’s safe to ignore or delete.

## Git & deployment workflow

```bash
git init
git add .
git commit -m "feat: bootstrap Autoflux landing page"
git branch -M main
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```

After pushing, Railway (or any other connected host) will pick up commits from `main` and redeploy automatically. If you ever move providers, just upload this folder to the new host or point it at the GitHub repo.
