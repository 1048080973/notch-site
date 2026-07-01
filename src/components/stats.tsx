import { Section } from "./ui";

export function Stats() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* left visual */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[28px] border border-border">
          <div className="absolute inset-0 bg-[conic-gradient(from_150deg_at_45%_40%,#7c28dd,#3b82f6,#f59e0b,#7c28dd)] opacity-80" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-6 grid place-items-center rounded-2xl border border-white/15 bg-black/40 backdrop-blur">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Image
            </span>
          </div>
        </div>

        {/* right content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Visual asset management
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Keep every visual asset organized
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Collect images, videos, UI references, and AI results in one
            local-first library. With folders, tags, ratings, and source links,
            every asset stays easy to find and reuse.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 bg-[#0e0e10] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
          >
            Try Notch free
          </a>
        </div>
      </div>
    </Section>
  );
}

