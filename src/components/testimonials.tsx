"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "./ui";

const MAX_TILT = 12; // degrees

// Wraps a card and tilts it in 3D toward the cursor on hover (reactbits
// "TiltedCard" style), easing back to flat when the pointer leaves.
function TiltCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const rotY = px * MAX_TILT * 2;
    const rotX = -py * MAX_TILT * 2;
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    el.style.setProperty("--tz", "1"); // engage layered depth on hover
  };

  const onLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.setProperty("--tz", "0");
  };

  return (
    <div
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="aspect-[368/450] shrink-0 [perspective:800px]"
    >
      {/* preserve-3d holder — NO overflow here, or translateZ would flatten */}
      <div
        ref={innerRef}
        className="relative h-full w-full transition-transform duration-150 ease-out [transform-style:preserve-3d] will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

const GAP = 20; // px, matches the flex gap

const testimonials = [
  {
    quote:
      "They understood our workflow instantly. The AI integrations removed so much manual work and saved significant time.",
    name: "Daniel Roy",
    role: "Manager, BrightStack",
    image: "/testimonial-1.webp",
  },
  {
    quote:
      "Very reliable and easy to work with. Their AI tools improved our daily tasks almost immediately and efficiently across all departments.",
    name: "Rhea D'Souza",
    role: "Founder, Studio Rhea",
    image: "/testimonial-2.webp",
  },
  {
    quote:
      "The marketing automation has been a real game changer. Our outreach is now faster, more consistent, and far more effective.",
    name: "Michael Evans",
    role: "Marketing Lead, Nova",
    image: "/testimonial-3.webp",
  },
  {
    quote:
      "Notch delivered AI solutions that fit our business perfectly. Great attention to detail that helped us streamline operations.",
    name: "Priya Sharma",
    role: "CEO, Loop Studio",
    image: "/testimonial-4.webp",
  },
  {
    quote:
      "Their AI automation saved us hours every week and helped us scale easily without extra effort or a big budget.",
    name: "Arjun Mehta",
    role: "Founder, VerseMedia",
    image: "/testimonial-5.webp",
  },
];

const BASE = testimonials.length;
// Three copies so there is always a full screen of cards on either side of the
// middle copy for the infinite-loop illusion.
const LOOPED = [0, 1, 2].flatMap((copy) =>
  testimonials.map((t) => ({ ...t, key: `${t.name}-${copy}` }))
);

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-white">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.04 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous testimonials" : "Next testimonials"}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card-soft text-white transition-colors hover:bg-white/10"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function Testimonials() {
  const [perView, setPerView] = useState(3);
  // Start in the middle copy so we can scroll both directions forever.
  const [index, setIndex] = useState(BASE);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Re-enable the transition on the frame after an instant (no-animation) jump.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const go = (dir: number) => {
    setAnimate(true);
    setIndex((i) => i + dir * perView);
  };

  const handleTransitionEnd = () => {
    if (index >= 2 * BASE) {
      setAnimate(false);
      setIndex(index - BASE);
    } else if (index < BASE) {
      setAnimate(false);
      setIndex(index + BASE);
    }
  };

  const cardWidth = `calc((100% - ${(perView - 1) * GAP}px) / ${perView})`;
  const trackShift = `calc(${-index} * ((100% - ${
    (perView - 1) * GAP
  }px) / ${perView} + ${GAP}px))`;

  return (
    <Section>
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Testimonial"
          align="left"
          title={
            <>
              Clients Who&apos;ve
              <br />
              Seen the Difference
            </>
          }
        />
        <div className="hidden shrink-0 items-center gap-2.5 pb-1 md:flex">
          <Arrow dir="prev" onClick={() => go(-1)} />
          <Arrow dir="next" onClick={() => go(1)} />
        </div>
      </div>

      <div className="mt-12 overflow-x-clip overflow-y-visible [overflow-clip-margin:18px]">
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${trackShift})`,
            transition: animate
              ? "transform 500ms cubic-bezier(0.22,1,0.36,1)"
              : "none",
          }}
        >
          {LOOPED.map((t) => (
            <TiltCard key={t.key} style={{ width: cardWidth }}>
              {/* clipped background: placeholder image + legibility gradients,
                  kept flat (translateZ 0) at the base of the 3D stack */}
              <div className="absolute inset-0 overflow-hidden rounded-[20px] border border-border">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* top row: name/role + stars — flat at rest, floats on hover */}
              <div
                className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-[15px] transition-transform duration-150 ease-out"
                style={{ transform: "translateZ(calc(var(--tz, 0) * 45px))" }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-white/60">{t.role}</p>
                </div>
                <Stars />
              </div>

              {/* bottom quote — flat at rest, floats slightly less on hover */}
              <blockquote
                className="absolute inset-x-0 bottom-0 p-[15px] text-[15px] font-medium leading-snug text-white transition-transform duration-150 ease-out"
                style={{ transform: "translateZ(calc(var(--tz, 0) * 28px))" }}
              >
                “{t.quote}”
              </blockquote>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
