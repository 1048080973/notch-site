import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

// Per-letter "rolling text" hover effect (replicates Framer's Rolling Text):
// every letter holds two stacked copies of itself; on hover each letter rolls
// up one line so the duplicate replaces it, staggered to form a wave.
export function RollingText({ text }: { text: string }) {
  return (
    <span className="roll-text" aria-label={text}>
      {Array.from(text).map((ch, i) => {
        const c = ch === " " ? "\u00A0" : ch;
        return (
          <span key={i} className="roll-letter" aria-hidden>
            <span className="roll-stack" style={{ "--i": i } as CSSProperties}>
              <span>{c}</span>
              <span>{c}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Z"
            fill="#050505"
          />
          <path d="M4 4l16 16" stroke="#050505" strokeWidth="2.4" />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-tight">Notch</span>
    </span>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card-soft px-3.5 py-1.5 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
};

export function Button({
  children,
  href = "#",
  variant = "primary",
  className = "",
  target,
  rel,
}: ButtonProps) {
  const base =
    "roll-btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]";
  const styles = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary:
      "border border-border-strong bg-white/5 text-white hover:bg-white/10",
    ghost: "text-muted hover:text-white",
  }[variant];

  const relValue =
    target === "_blank" ? rel ?? "noopener noreferrer" : rel;

  return (
    <Link
      href={href}
      target={target}
      rel={relValue}
      className={`${base} ${styles} ${className}`}
    >
      {typeof children === "string" ? (
        <RollingText text={children} />
      ) : (
        children
      )}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleMaxWidthClass = "max-w-3xl",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  titleMaxWidthClass?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-5 ${alignment}`}>
      <Badge>{eyebrow}</Badge>
      <h2
        className={`text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl ${titleMaxWidthClass}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-border bg-card p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-5 py-20 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
