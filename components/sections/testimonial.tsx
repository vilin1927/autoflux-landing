import Link from "next/link";

export function Testimonial() {
  return (
    <section
      className="bg-[var(--primary)] text-white p-8 md:p-14 rounded-[var(--radius-xl)] mb-8 relative overflow-hidden"
    >
      {/* Decorative quote mark */}
      <div className="absolute top-4 left-8 text-[12rem] font-serif text-[var(--accent)] opacity-10 leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
          &ldquo;Vlad has been awesome to work with for our project. We needed a web scraper using DataForSEO, Apify, Lovable, and N8N. He&apos;s talented, responsive, hard working, and has great communication. He completed the project when we requested and always over delivers until the bugs are kinked out! This was our first project with him, but we will be using him for many more in the future.&rdquo;
        </p>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-xl">
            ED
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white">Eric Dahl</h4>
            <Link
              href="https://profitpaws.com/"
              target="_blank"
              className="text-white/70 text-sm hover:text-[var(--accent)] transition-colors"
            >
              Founder, ProfitPaws
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
