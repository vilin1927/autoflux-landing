import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { CaseStudyTracker } from "@/components/tracking/case-study-tracker";
import { MediaShowcase } from "@/components/case-study/media-showcase";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found - AutoFlux",
    };
  }

  return {
    title: `${caseStudy.title} - AutoFlux Case Study`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-6">
      <CaseStudyTracker slug={caseStudy.slug} title={caseStudy.title} />
      <Header variant="case-study" />

      <main>
        {/* Hero */}
        <section
          className="rounded-[var(--radius-xl)] p-8 md:p-14 mb-8 text-white relative overflow-hidden"
          style={{ background: caseStudy.heroGradient }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full mb-6">
            {caseStudy.eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-3xl">
            {caseStudy.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            {caseStudy.description}
          </p>
        </section>

        {/* Challenge */}
        <section className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
            The Challenge
          </h2>
          <ul className="space-y-4">
            {caseStudy.challenge.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-[var(--text-muted)] leading-relaxed"
              >
                <span className="text-[var(--accent)] font-bold mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Solution */}
        <section className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
            The Solution
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            {caseStudy.solution.intro}
          </p>

          <div className="space-y-6 mb-8">
            {caseStudy.solution.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[var(--accent)] text-[var(--primary)] rounded-[var(--radius-sm)] flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[var(--text-dark)] mb-2">
                    {step.title}
                  </h3>
                  <ul className="space-y-1">
                    {step.details.map((detail, j) => (
                      <li key={j} className="text-[var(--text-muted)] text-sm">
                        → {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="pt-6 border-t border-[var(--border-light)]">
            <h3 className="font-bold text-[var(--text-dark)] mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.solution.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1.5 text-sm font-medium bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-sm)] text-[var(--text-body)]"
                >
                  {tech.name}
                  {tech.description && (
                    <span className="text-[var(--text-muted)]">
                      {" "}
                      ({tech.description})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
            Results
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {caseStudy.results.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-[var(--radius-md)] p-4 text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-[var(--primary)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="bg-[var(--primary)] text-white p-6 rounded-[var(--radius-lg)]">
            <p className="text-lg italic mb-4">
              &ldquo;{caseStudy.results.quote.text}&rdquo;
            </p>
            <footer className="text-sm text-white/80">
              — {caseStudy.results.quote.author}, {caseStudy.results.quote.role}
            </footer>
          </blockquote>
        </section>

        {/* Media Showcase - Video & Images */}
        <MediaShowcase
          media={caseStudy.media}
          videoPlaceholder={caseStudy.videoPlaceholder}
          caseStudySlug={caseStudy.slug}
          caseStudyTitle={caseStudy.title}
        />

        {/* Key Takeaways */}
        <section className="bg-[var(--bg-white)] border border-[var(--border-light)] rounded-[var(--radius-xl)] p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
            Key Takeaways
          </h2>
          <ul className="space-y-4">
            {caseStudy.takeaways.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-[var(--text-muted)] leading-relaxed"
              >
                <span className="text-[var(--accent)] font-bold mt-1">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white rounded-[var(--radius-xl)] p-8 md:p-14 text-center mb-8">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
            {caseStudy.cta.eyebrow}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            {caseStudy.cta.headline}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {caseStudy.cta.description}
          </p>
          <Button asChild variant="lime" className="animate-pulse-glow">
            <Link href="/#contact">Get Your Free Blueprint</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
