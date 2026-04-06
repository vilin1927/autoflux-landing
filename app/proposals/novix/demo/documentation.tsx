"use client";

import { motion } from "framer-motion";
import {
  Database,
  Server,
  DollarSign,
  Milestone,
  Search,
  Shield,
  LayoutTemplate,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

function QACard({
  icon: Icon,
  question,
  answer,
  details,
  recommendation,
  index,
}: {
  icon: React.ElementType;
  question: string;
  answer: string;
  details?: string[];
  recommendation?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden"
    >
      <div className="flex items-start gap-3 p-4 border-b border-slate-700/30">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-indigo-400" />
        </div>
        <p className="text-xs font-bold text-white leading-relaxed pt-1.5">
          {question}
        </p>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-xs text-slate-300 leading-relaxed">{answer}</p>

        {details && details.length > 0 && (
          <ul className="space-y-1.5">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        )}

        {recommendation && (
          <div className="flex items-start gap-2 bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-3">
            <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-indigo-300/90">{recommendation}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Documentation() {
  const questions = [
    {
      icon: Database,
      question:
        "Is the Supabase Free tier sufficient for our use case?",
      answer:
        "Yeah, Free tier covers this easily. You get 500 MB storage, 50K monthly users for auth, 1 GB file storage. Calendar data is tiny, a full year of events per user is maybe 50 KB. You won't hit these limits for a long time.",
      details: [
        "Auth handles Google, Microsoft, Apple, magic link, all included",
        "Row-Level Security works on Free tier, so multi-user data stays safe",
        "When you outgrow it, Pro is $25/month with zero-downtime upgrade",
      ],
      recommendation:
        "Start on Free. Keep an eye on the Supabase dashboard. Only upgrade when you actually need daily backups or hit 500 MB.",
    },
    {
      icon: Server,
      question:
        "Which hosting platform? Is SiteGround suitable for Next.js?",
      answer:
        "SiteGround is traditional shared hosting, it can't run Next.js properly. No support for server-side rendering, API routes, or anything modern JS needs. But you don't need an expensive platform either.",
      details: [
        "Hetzner Cloud CX22 (~$5/month) is solid. European servers, great performance, you get a full VPS with 2 vCPU, 4 GB RAM, 40 GB SSD",
        "Hostinger KVM 1 (~$6/month) is another good option. Simple setup, decent performance, they handle the infrastructure",
        "Both run Next.js with PM2 or Docker, full control over your server",
        "Way cheaper than platform services, and you own the environment",
      ],
      recommendation:
        "I'd go with Hetzner for this. Cheap, reliable, European data center (good for your Danish users). We set up a simple deploy pipeline from Azure DevOps and you're good.",
    },
    {
      icon: DollarSign,
      question:
        "Hourly or milestone-based pricing?",
      answer:
        "Milestones, for sure. You get a clear deliverable at each stage, you test it, you approve it, then we move on. No guessing how many hours something takes.",
      details: [
        "M1: Calendar engine + live preview. Core grid, all paper sizes, real-time config",
        "M2: Notes, events, customization. Add stuff to dates, recurring events, fonts, colors",
        "M3: PDF generation. pdf-lib rendering, 300 DPI, matches the preview",
        "M4: Polish, SEO, deploy. Responsive, server-rendered pages, production-ready",
      ],
      recommendation:
        "Each milestone has a review checkpoint. You test, you approve, then we continue. Simple.",
    },
    {
      icon: Milestone,
      question:
        "How do you see the milestone plan? I'll create Epics and user stories in Azure DevOps.",
      answer:
        "Each milestone maps to one Epic in Azure DevOps. Under each Epic we break it into Features and User Stories with acceptance criteria, so you can track exactly what's happening.",
      details: [
        "Epic 1: Calendar Engine. Features: config model, date logic, grid rendering, paper sizes",
        "Epic 2: Events System. Features: add/edit events, recurring, weekly, customization",
        "Epic 3: PDF Pipeline. Features: pdf-lib renderer, layout matching, export",
        "Epic 4: Ship It. Features: SEO, responsive, deploy",
        "Each Feature has 2-5 User Stories with clear acceptance criteria",
      ],
      recommendation:
        "I'll set up the board structure on day one. Full visibility into what's in progress, what's done, what's next.",
    },
    {
      icon: DollarSign,
      question: "Price estimation for the project?",
      answer:
        "For the MVP (yearly template, notes/events, PDF generation, SEO, deploy, no auth, no i18n): $1,800 fixed, split across 4 milestones.",
      details: [
        "M1: Calendar engine + live preview — $500",
        "M2: Notes, events, customization — $450",
        "M3: PDF generation (pdf-lib, 300 DPI) — $500",
        "M4: SEO, polish, deploy — $350",
        "Auth + user profiles (Phase 2): ~$400–500 separate",
        "i18n / multilanguage (Phase 2): ~$400–500 separate",
        "Each additional template after MVP: ~$300–400",
      ],
      recommendation:
        "Each milestone is a deliverable you review and approve before we continue. Fixed price, no hourly tracking. Happy to discuss on a quick call if you want to adjust the scope.",
    },
    {
      icon: LayoutTemplate,
      question:
        "How much time and cost for additional templates after the Yearly one?",
      answer:
        "The yearly template builds the whole engine: config model, grid system, PDF pipeline. Additional templates reuse 70-80% of that. Mostly it's new layout logic and grid math.",
      details: [
        "Monthly template: 3-5 days. New grid layout with weeks in rows",
        "Work Week template: 2-3 days. Simpler grid, optional weekends",
        "Daily template: 2-3 days. Single-day view with time slots",
        "Each template gets both preview and PDF automatically because of the shared rendering engine",
      ],
      recommendation:
        "Each new template is a small standalone milestone. You pick which ones matter most to your users, we build them one at a time.",
    },
    {
      icon: Search,
      question:
        "How will you handle SEO from the start?",
      answer:
        "Next.js App Router does the heavy lifting here. Pages are server-rendered by default, so search engines see real HTML, not an empty page loading JavaScript.",
      details: [
        "Server Components render HTML on the server, fast load times",
        "Proper semantic HTML with correct heading structure and meta tags",
        "Unique title, description, Open Graph per page via metadata API",
        "Auto-generated sitemap.xml and robots.txt",
        "Core Web Vitals optimized: lazy loading, image optimization, small JS bundle",
      ],
      recommendation:
        "SEO is built into the architecture from the start with Next.js. The calendar builder itself runs client-side, but all marketing and landing pages are server-rendered. No recoding needed later.",
    },
    {
      icon: Shield,
      question:
        "Can we keep auth out of the first version?",
      answer:
        "Yes, and honestly I'd recommend it. Get the core product right first: calendar builder + PDF. Then add accounts once you're happy with how it works.",
      details: [
        "Without auth the MVP is simpler: no login flows, no user tables, no sessions",
        "Saves roughly a week of development time",
        "Adding Supabase Auth later is clean, it drops in as a separate module without touching calendar code",
        "No technical downside. The architecture keeps auth completely independent",
        "For MVP we store configs in browser localStorage, then migrate to Supabase when auth comes in",
      ],
      recommendation:
        "Build MVP without auth or i18n. Test the calendar builder, validate the PDF output. Then we add user accounts as a separate milestone when the foundation is solid.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="mb-2">
        <h3 className="text-sm font-bold text-white mb-1">
          Your Questions, Answered
        </h3>
        <p className="text-xs text-slate-500">
          Straight answers to everything from your project doc.
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <QACard key={i} {...q} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl p-5 text-center"
      >
        <p className="text-sm font-bold text-white mb-1">
          Want to talk it through?
        </p>
        <p className="text-xs text-slate-400">
          Happy to jump on a quick call, walk through the approach, and get you a formal quote.
        </p>
      </motion.div>
    </motion.div>
  );
}
