import { Button, Section } from "./ui";

export function Cta() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-b from-[#0b1026] via-[#070710] to-[#050505] px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,rgba(120,140,255,0.2),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Ready to automate your business with Notch?
          </h2>
          <p className="mt-5 max-w-md text-pretty text-muted">
            Book a free strategy call and we&apos;ll map out exactly where AI
            can save you time and money.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="#">Let&apos;s automate</Button>
            <Button href="#" variant="secondary">
              Need to talk first
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
