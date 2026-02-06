# TECHNICAL REQUIREMENTS & ACCESS CHECKLIST
## GlobalHair Institute — What We Need From Peter to Start

---

## WHAT WE NEED FROM PETER (Day 1)

### Must-haves to begin:
1. **Meta Business Suite access** — Add us as a developer/partner to his Meta Business account. This gives us Meta Ads API (campaigns, spend, leads, ROAS) + Facebook + Instagram data. FREE, he already has this.
2. **Stripe API keys** — Secret key + publishable key from his Stripe dashboard (Settings → Developers → API keys). FREE, he already has Stripe.
3. **Supabase project** — Either we create one under his account or he gives us access to an existing one. FREE tier works for MVP, Pro is $25/month.
4. **Telegram bot token** — We create it via @BotFather in 30 seconds. He just needs to tell us who gets alerts. FREE.
5. **OpenAI or Anthropic API key** — For AI ad copy generation. His key, his billing. ~$5-20/month depending on usage.
6. **Domain/hosting access** — Where does he want this deployed? Vercel (free tier works), or his own server.

### Needed for expanded scope (can get during Week 1):
7. **Google Ads access** — He needs a Google Ads Manager Account (MCC). We apply for a developer token (Basic Access level = free, approval takes 1-3 days). He grants OAuth access to his ad account. FREE.
8. **TikTok Ads access** — Register on TikTok Developer Portal, create an app requesting Ads Management + Reporting scopes. Approval takes 2-3 days. He then authorizes his ad account via OAuth. FREE.

### For chatbot monitoring (requires discussion):
9. **WhatsApp** — Two options:
   - **Option A (recommended):** Meta Cloud API — FREE access, he just needs Facebook Business verification (may already have it since he runs Meta ads). Service messages (customer-initiated) are completely free. Marketing templates cost ~€0.07-0.10/message in Netherlands. Setup takes a few days for verification.
   - **Option B:** Third-party BSP like Wati or Respond.io — Starts ~$50/month but gives a ready-made inbox + analytics we can pull data from via their API.
   
10. **Instagram & Facebook chat** — Already covered by Meta Business Suite access (#1 above). We can read conversations via the Graph API.

---

## MERGED TIMELINE: 2 PHASES (NOT 3)

### PHASE 1: Weeks 1-2 — Core Dashboard ($2,500)
- Dashboard UI (Next.js + Supabase) with GlobalHair branding
- Meta Ads API — live campaigns, spend, leads, CPL, ROAS
- Stripe integration — revenue tracking, invoice generation
- CRM pipeline — lead stages, notes, follow-up reminders
- AI ad copy generator (Claude/OpenAI)
- Telegram bot — daily stats, new lead alerts, budget warnings
- Basic social media content scheduling

### PHASE 2: Weeks 3-4 — Full Platform + Chatbot ($TBD — scope with Peter)
- **TikTok Ads API** — submit app for approval in Week 1, integrate in Week 3 once approved
- **Google Ads API** — apply for developer token in Week 1, integrate in Week 3
- **Advanced analytics** — cross-platform attribution, cohort analysis, custom date ranges
- **Chatbot monitoring** — pull conversation data from Meta (IG + FB), WhatsApp Cloud API or BSP integration
- Social media auto-posting from content database
- Landing page builder (basic — template-based, not a full Webflow clone)
- Server-side video/static ad generation (Remotion/FFmpeg)

**Key insight:** We submit TikTok + Google API applications on Day 1 while building Phase 1. By the time Phase 1 is done, approvals are in, and we can immediately start Phase 2 integrations.

---

## API ACCESS SUMMARY TABLE

| Platform | Cost | Approval Time | What He Needs to Do |
|----------|------|---------------|---------------------|
| Meta Ads API | Free | Instant (he has Meta Business) | Add us as developer |
| Stripe API | Free | Instant | Share API keys |
| Google Ads API | Free | 1-3 days for dev token | Has Google Ads MCC, grant OAuth |
| TikTok Ads API | Free | 2-3 days | We register app, he authorizes |
| WhatsApp Cloud API | Free access, ~€0.07/msg for templates | 2-7 days (business verification) | Verify business in Meta Business Manager |
| Instagram/Facebook Chat | Free (via Meta Graph API) | Instant | Already covered by Meta access |
| Telegram Bot | Free | 30 seconds | Nothing — we create it |
| OpenAI/Claude API | ~$5-20/month | Instant | Create account, add payment |
| Supabase | Free tier or $25/month Pro | Instant | Create project |

---

## WHAT MAKES US OUTSTANDING (< 1000 chars for Peter)

Here's the thing most freelancers won't do: we submit TikTok and Google Ads API applications on Day 1, before writing a single line of code. While those approvals process (2-3 days), we build your entire core dashboard with Meta + Stripe data. By Week 2, you have a working product. By Week 3-4, TikTok and Google are plugged in — zero wasted time.

Most developers will tell you "TikTok takes weeks" or "Google Ads API is complicated." It's not. TikTok approval is 2-3 days. Google dev token is 1-3 days. The trick is parallelizing — start approvals immediately, build everything else while waiting.

Your WhatsApp monitoring works through Meta's own Cloud API (free access, same ecosystem as your existing Meta Ads). Instagram and Facebook chat data comes through the same Meta Business Suite integration we're already building for ads. One API connection = ads + chatbot data.

You get a fully integrated dashboard in 3-4 weeks, not a Phase 1 that sits there waiting for "future phases." Every platform connected, real data flowing, CRM catching every lead.

---

## PETER'S REQUIRED TECH STACK (verbatim from job description)

- **Next.js** — Frontend framework
- **Node.js** — Backend runtime
- **PostgreSQL (Supabase)** — Database
- **Meta Business API** — Ads + chatbot data
- **Stripe** — Payments & invoices
- **OpenAI** — AI generation
- **Telegraf.js** — Telegram bot framework (NOT generic bot API — he specifically wants Telegraf.js)
- **Claude** — AI generation (he wants BOTH OpenAI and Claude available)

⚠️ Claude Code must use these exact technologies. Don't substitute React for Next.js, don't use a different Telegram library, etc.

---

## FEATURES FROM JOB DESCRIPTION — COMPLETE CHECKLIST

Cross-reference this against what we build. Every item below is from Peter's original posting:

1. ✅ Dashboard pulling live data from **Meta, TikTok, and Stripe**
2. ✅ Tracks leads through a **full CRM pipeline**
3. ✅ Monitors an **AI chatbot across Instagram, Facebook, WhatsApp, and live chat**
4. ✅ Create ads with **AI-generated copy**
5. ✅ **Send invoices as PDFs** (Stripe integration + PDF generation)
6. ✅ **Monitor website uptime** — simple health check pinging globalhair.institute every 5 min, alert via Telegram if down. Use node-cron + axios, store uptime % in Supabase.
7. ✅ **Build landing pages** — template-based builder, not full Webflow clone
8. ✅ **Upload posts on social media** through a database of content (AI generated or own material)
9. ✅ **Telegram bot** — pull stats, get alerts, trigger actions
10. ✅ **Static ad creation** — generate ad creatives (images with text overlays). Use Canvas API or sharp/jimp for server-side image generation. Peter may have meant Figma-style, but we deliver functional ad image creation.
11. ✅ **Video ad generation** — server-side using Remotion or FFmpeg. Text-on-video templates, Ken Burns effect on product images, auto-subtitles.
12. ✅ **Google Ads integration** — implied by "Meta, TikTok, and Stripe" + his demo showing Google Ads data

---

## CALL TALKING POINT ON THIS

If Peter asks "can you really do all of this?":

"Here's my approach — I submit API applications for TikTok and Google on day one. Both take 2-3 days to approve. While those process, I build your entire core dashboard with Meta and Stripe data — that's where most of your spend and leads come from anyway. By end of Week 2, you have a working dashboard. Weeks 3-4, I plug in TikTok and Google the moment approvals land. Your WhatsApp and Instagram chat monitoring comes free through the same Meta API connection we're already using for ads. No waiting, no separate phases — just parallel execution."