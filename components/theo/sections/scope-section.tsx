"use client";

import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const scopeItems = [
  {
    category: "Domain Manager",
    features: [
      { feature: "Add / edit / delete target sites", details: "Site name, URL, username, app password, template assignment" },
      { feature: "Test connection button", details: "Verify WP REST API access, show Active / Inactive status" },
    ],
  },
  {
    category: "Excel Import",
    features: [
      { feature: "Upload .xlsx with keywords", details: "Each row = post title, columns = WP categories" },
      { feature: "Two post types: Article + FAQ", details: "Article: full HTML + Mermaid. FAQ: HTML template + random 4–6 FAQs (Gutenberg details block)" },
    ],
  },
  {
    category: "Template Manager",
    features: [
      { feature: "HTML code editor", details: "Create, edit, delete templates. Per-domain assignment" },
      { feature: "Template list with saved versions", details: "Quick select when configuring domains" },
    ],
  },
  {
    category: "API Key Manager",
    features: [
      { feature: "Multiple Gemini API keys", details: "Add keys one per line. Bulk paste supported" },
      { feature: "Key status dashboard", details: "Active / Blocked / Re-activate date. Real-time health view" },
    ],
  },
  {
    category: "Post Generation & Publishing",
    features: [
      { feature: "AI content generation", details: "Gemini (primary) + DeepSeek, Claude, Mistral as alternatives" },
      { feature: "Article posts", details: "Full HTML article (~800 words) + 3 Mermaid flowchart diagrams" },
      { feature: "FAQ posts", details: "HTML template header + random 4–6 FAQ items with Gutenberg details/summary blocks" },
      { feature: "Disclaimer at bottom", details: "Admin-configurable disclaimer text (multi-language)" },
      { feature: "Internal category links", details: "Auto-insert hyperlinks to other posts in same category" },
      { feature: "Publish via WP REST API", details: "Application passwords, per-post status (Success / Failed with reason)" },
    ],
  },
  {
    category: "Emoji in Post Titles",
    features: [
      { feature: "Emoji prefix + suffix on titles", details: "Admin selects the emoji. Emoji excluded from URL slug" },
    ],
  },
  {
    category: "Rate Limiting & Reliability",
    features: [
      { feature: "Server-side global job queue", details: "No more client-side-only rate limiting. All requests coordinated server-side" },
      { feature: "Per-key RPM tracking", details: "Each key tracked individually. Never exceeds its rate limit" },
      { feature: "Staggered request distribution", details: "Spread across keys with delays — no bursts" },
      { feature: "Retry with exponential backoff + jitter", details: "On 429/503/empty responses. Limited retries before marking failed" },
      { feature: "Circuit breaker", details: "Auto-disable keys after repeated errors. Auto re-enable after cooldown" },
      { feature: "Failed post → manual review queue", details: "Posts that exhaust retries go to review state, not lost" },
    ],
  },
  {
    category: "Security",
    features: [
      { feature: "Encrypted API keys & app passwords", details: "Encrypted in database, never exposed in frontend" },
      { feature: "HTTPS for all external calls", details: "Gemini API, DeepSeek, WP REST — all over HTTPS" },
      { feature: "Admin-only access", details: "WordPress capability checks on all plugin pages" },
    ],
  },
];

export function ScopeSection() {
  return (
    <section
      id="scope"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 mb-4">
            Complete Feature List
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Full Scope
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything included in the $1,040 package — no hidden features, no surprises.
          </p>
        </motion.div>

        {/* Scope table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {scopeItems.map((category, catIndex) => (
                  <>
                    {/* Category header row */}
                    <tr key={`cat-${catIndex}`} className="bg-white/5">
                      <td
                        colSpan={2}
                        className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {category.features.map((item, index) => (
                      <tr
                        key={`${catIndex}-${index}`}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                            <span className="text-white">{item.feature}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {item.details}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">
            Scroll down to see how we&apos;ll build it, timeline, and next steps.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-gray-500 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
