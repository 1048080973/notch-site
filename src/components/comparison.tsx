import { Section, SectionHeading } from "./ui";

const traditional = [
  "Slow, manual processes",
  "Prone to human errors",
  "Requires more manpower",
  "Hard to scale without hiring",
  "Limited to working hours",
  "Based on guesswork or delays",
  "Repetitive tasks slow teams",
  "Multi-step, manual hand-offs",
  "Slower response times",
  "Manual follow-ups and tracking",
];

const notch = [
  "Tasks completed instantly",
  "High precision, consistent results",
  "Lower operational costs",
  "Scales effortlessly",
  "Works 24/7 nonstop",
  "Real-time insights and data-driven",
  "Automates busywork for higher output",
  "Smooth, automatic flow",
  "Instant replies through chat/voice agents",
  "Automated nurturing and reminders",
];

export function Comparison() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Comparison"
        title="Traditional way vs AI-powered automation"
      />

      <div className="relative mt-14">
        {/* header pill with the two labels and a white VS badge in the middle */}
        <div className="relative z-20 mx-auto flex w-fit items-stretch rounded-2xl border border-border bg-card text-[15px] font-medium">
          <div className="flex items-center gap-2 py-3 pl-5 pr-16 text-white">
            <span className="text-lg">⏳</span> Traditional way
          </div>
          <div className="flex items-center gap-2 py-3 pl-16 pr-5 text-white">
            <span className="text-lg">⚡</span> Notch automation
          </div>
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-sm font-bold text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            VS
          </span>
        </div>

        {/* two comparison cards */}
        <div className="relative mt-6 grid gap-6 md:grid-cols-2">
          {/* center vertical divider (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-4 bottom-4 hidden w-px -translate-x-1/2 bg-border md:block" />

          <div className="rounded-[22px] border border-border bg-gradient-to-br from-[#161618] to-[#0b0b0d] p-7 sm:p-9">
            <ul className="space-y-5">
              {traditional.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-[17px] text-white/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] border border-border bg-gradient-to-br from-[#161618] to-[#0b0b0d] p-7 sm:p-9">
            <ul className="space-y-5">
              {notch.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-[17px] text-white/90"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom dashed separator */}
        <div className="mt-14 border-t border-dashed border-white/10" />
      </div>
    </Section>
  );
}
