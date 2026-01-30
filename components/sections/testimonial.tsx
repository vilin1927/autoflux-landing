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
          &ldquo;Everyone on the team is expected to meet the same high
          standards and produce work of the highest caliber. AutoFlux delivered
          exactly that.&rdquo;
        </p>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-xl">
            MB
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white">Michael Ballack</h4>
            <p className="text-white/70 text-sm">VP of Marketing, Growth Company</p>
          </div>
        </div>
      </div>
    </section>
  );
}
