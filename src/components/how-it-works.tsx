import Image from "next/image";
import type { ReactNode } from "react";
import { Section, SectionHeading } from "./ui";
import { LottiePlayer } from "./lottie-player";

/* ---- Card 1: Analyze Your Design (Figma plugin) ---- */
const analyzeRows = [
  { icon: "/ic-picture.png", title: "Pictures in the drawing board", sub: "Picture" },
  { icon: "/ic-element.png", title: "Files in the drawing board", sub: "Frame" },
  { icon: "/ic-group.png", title: "Groups in the drawing board", sub: "Group" },
  { icon: "/ic-text.png", title: "Text in the drawing board", sub: "Font" },
];

function AnalyzeVisual() {
  return (
    <div className="divide-y divide-[rgba(153,153,153,0.1)]">
      {analyzeRows.map((r) => (
        <div key={r.sub} className="flex items-center gap-3 p-3">
          <Image
            src={r.icon}
            alt=""
            width={30}
            height={30}
            className={`h-[30px] w-[30px] shrink-0${
              r.icon === "/ic-group.png" ? " step-rotate" : ""
            }`}
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="truncate text-xs text-[#999]">{r.sub}</p>
            <p className="truncate text-base leading-none text-white">
              {r.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Card 2: Match with Motion Templates (Motion builder) ---- */
const matchRows = ["Title", "Popup", "Button"];

function MatchVisual() {
  return (
    <div className="flex items-start gap-3 px-10">
      <div className="flex h-[170px] flex-1 flex-col justify-between">
        {matchRows.map((l, i) => (
          <div key={l} className="flex items-center gap-2">
            <Image
              src="/ic-frame.png"
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-[26px] shrink-0"
            />
            <span className="shrink-0 text-sm font-semibold text-white">{l}</span>
            <span
              className="grow-dash -mr-3 ml-1 h-px min-w-[24px] flex-1"
              style={{
                animationDelay: `${i * 0.35}s`,
                marginRight: i === 0 ? "-32px" : undefined,
              }}
            />
          </div>
        ))}
      </div>
      <div className="relative z-10 ml-auto flex h-[170px] flex-col items-center justify-between">
        <div
          className="block-pulse h-6 w-[70px] rounded-xl"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="block-pulse h-[96px] w-[100px] rounded-xl"
          style={{ animationDelay: "0.35s" }}
        />
        <div
          className="block-pulse h-6 w-[100px] rounded-xl"
          style={{ animationDelay: "0.7s" }}
        />
      </div>
    </div>
  );
}

/* ---- Card 3: Preview and Export (Motion builder) ---- */
function ExportVisual() {
  return (
    <div className="flex h-full items-center justify-center">
      <LottiePlayer
        src="/lottie-export.json"
        loopDelay={2000}
        className="h-full w-full [&_svg]:!h-full [&_svg]:!w-full"
      />
    </div>
  );
}

const cards: {
  brand: string;
  brandIcon: string;
  step: string;
  title: string;
  desc: string;
  visual: ReactNode;
  align: "start" | "center";
}[] = [
  {
    brand: "Figma plugin",
    brandIcon: "/figma-logo.png",
    step: "Step 1.",
    title: "Analyze Your Design",
    desc: "Understand Figma layers, assets, text, and layout.",
    visual: <AnalyzeVisual />,
    align: "start",
  },
  {
    brand: "Motion builder",
    brandIcon: "/layers.png",
    step: "Step 2.",
    title: "Match with Motion Templates",
    desc: "Map design elements into main or overlay Lottie templates.",
    visual: <MatchVisual />,
    align: "center",
  },
  {
    brand: "Motion builder",
    brandIcon: "/layers.png",
    step: "Step 3.",
    title: "Preview and Export",
    desc: "Fine-tune, compress, preview, and export production-ready JSON.",
    visual: <ExportVisual />,
    align: "center",
  },
];

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How it works"
        title="How we turn your designs into motion"
        align="left"
        titleMaxWidthClass="max-w-[600px]"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="relative flex flex-col overflow-hidden rounded-[20px] border border-border bg-gradient-to-b from-[#141416] to-[#0c0c0e] p-5"
          >
            {/* header: brand (left) + step (right) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src={c.brandIcon}
                  alt=""
                  width={26}
                  height={26}
                  className="h-[26px] w-[26px] object-contain"
                />
                <span className="text-sm font-semibold text-white">
                  {c.brand}
                </span>
              </div>
              <span className="text-sm font-semibold text-white/70">
                {c.step}
              </span>
            </div>

            {/* visual mock — Figma Frame 47 (507:1005) */}
            <div
              className={`relative mt-6 flex min-h-[230px] flex-1 flex-col overflow-hidden rounded-[12px] ${
                c.align === "center" ? "justify-center" : "justify-start"
              }`}
            >
              {/* gradient border: #333 (top) → transparent (bottom) */}
              <div
                className="pointer-events-none absolute inset-0 z-20 rounded-[12px]"
                style={{
                  padding: "1px",
                  opacity: 0.3,
                  background:
                    "linear-gradient(180deg,#333333 0%,rgba(51,51,51,0) 100%)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              {/* soft fade at the bottom of the visual area */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[#101012] to-transparent" />
              {c.visual}
            </div>

            {/* title + description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
