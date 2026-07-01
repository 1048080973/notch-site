"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "./ui";

const slides = [
  {
    id: 1,
    src: "/cs-1.webp",
    caption:
      "From Figma to motion-ready assets in minutes. Less handoff, fewer layout fixes, faster creative output.",
  },
  {
    id: 2,
    src: "/cs-2.webp",
    caption:
      "Shorter delivery cycles for motion-heavy features. Less coordination, clearer previews, faster launch readiness.",
  },
  {
    id: 3,
    src: "/cs-3.webp",
    caption:
      "Automated Lottie assembly and asset replacement. More time for motion craft, less time on repetitive setup.",
  },
];

export function CaseStudy() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + count) % count);

  return (
    <Section>
      <SectionHeading
        eyebrow="Case study"
        title="How businesses use our AI to scale faster"
      />

      <div className="relative mx-auto mt-14 w-full max-w-[950px]">
        <div className="relative aspect-[19/8] overflow-hidden rounded-[12px]">
          {/* images crossfade (opacity) */}
          {slides.map((s, i) => (
            <Image
              key={s.id}
              src={s.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 950px"
              priority
              className="absolute inset-0 object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}

          {/* 5% black tint over the image */}
          <div className="pointer-events-none absolute inset-0 bg-black/5" />

          {/* caption legibility gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* overlay content: re-keyed per slide so it replays the in-animation */}
          <div key={index} className="caption-in absolute inset-0">
            <p className="absolute bottom-6 left-6 max-w-md text-lg font-semibold leading-snug text-white">
              {slides[index].caption}
            </p>
          </div>

          {/* navigation arrows (bottom-right) */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/80"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/80"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
