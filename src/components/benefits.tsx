import Image from "next/image";
import { Section, SectionHeading } from "./ui";

type Benefit = { title: string; desc: string; icon: string };

const benefits: Benefit[] = [
  { title: "Time saving.", desc: "Automate tasks instantly.", icon: "clock" },
  { title: "Cost Efficient.", desc: "Reduce manual workload.", icon: "coin" },
  { title: "Faster Workflows.", desc: "Speed up your operations.", icon: "bolt" },
  { title: "Better Insights.", desc: "Understand data quickly.", icon: "chart" },
  { title: "Higher Accuracy.", desc: "Minimize human errors.", icon: "target" },
  { title: "Easy Scaling.", desc: "Grow without extra effort.", icon: "grow" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    coin: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2.5-5 1.5-5 4a2.5 2.5 0 0 0 5 0M12 6v1.5M12 16.5V18" />
      </>
    ),
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    chart: <path d="M4 20V6M10 20V10M16 20V4M22 20H2" />,
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      </>
    ),
    grow: (
      <>
        <path d="M4 18 10 12l4 4 6-7" />
        <path d="M16 7h4v4" />
      </>
    ),
  };
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

// 1px gradient stroke — bright corner fading out. Angle points the highlight
// toward the arc center (top-left for right cards, top-right for left cards).
const gradientBorder =
  "rounded-[20px] p-px [background:linear-gradient(132deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.06)_31%)]";
const gradientBorderMirror =
  "rounded-[20px] p-px [background:linear-gradient(228deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.06)_31%)]";
const gradientBorderTop =
  "rounded-[20px] p-px [background:linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.06)_31%)]";

// Figma 507:1004 fill — subtle gray radial glow in the top-left corner.
const RADIAL_SVG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 208 140' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-4.3673 -7.4241 11.03 -6.4885 21.49 20.727)'><stop stop-color='rgba(33,33,33,0.3)' offset='0'/><stop stop-color='rgba(1,1,1,0)' offset='1'/></radialGradient></defs></svg>\")";

// Figma 516:1047 fill — dark gray glow rising from the top.
const centerFill: React.CSSProperties = {
  background:
    "linear-gradient(to top, rgba(1,1,1,0) 35.577%, #212121 114.44%), #000000",
};

function BenefitCard({
  b,
  side = "right",
  className = "w-[214px]",
}: {
  b: Benefit;
  side?: "left" | "right";
  className?: string;
}) {
  const border = side === "left" ? gradientBorderMirror : gradientBorder;
  return (
    <div className={`${border} ${className}`}>
      <div className="relative h-[140px] w-full overflow-hidden rounded-[19px] bg-black">
        {/* Figma radial fill (mirrored for left-side cards) */}
        <div
          aria-hidden
          className={`absolute inset-0 ${side === "left" ? "scale-x-[-1]" : ""}`}
          style={{ backgroundImage: RADIAL_SVG, backgroundSize: "100% 100%" }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <span className="inline-grid h-9 w-9 place-items-center rounded-[8px] bg-white/[0.06] text-white">
            <Icon name={b.icon} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-white">{b.title}</h3>
            <p className="mt-1 text-sm leading-snug text-muted">{b.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenterCard() {
  return (
    <div className={`${gradientBorderTop} w-[231px]`}>
      <div
        className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-[19px]"
        style={centerFill}
      >
        <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-white/[0.06]">
          <Image
            src="/layers.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Benefits"
        title="What makes our AI better for your business"
      />

      {/* arc / wing layout (desktop) */}
      <div className="mt-16 hidden items-end justify-center gap-4 lg:flex">
        <BenefitCard b={benefits[0]} side="left" />
        <div className="flex flex-col gap-3">
          <BenefitCard b={benefits[1]} side="left" />
          <BenefitCard b={benefits[2]} side="left" />
        </div>
        <CenterCard />
        <div className="flex flex-col gap-3">
          <BenefitCard b={benefits[3]} side="right" />
          <BenefitCard b={benefits[4]} side="right" />
        </div>
        <BenefitCard b={benefits[5]} side="right" />
      </div>

      {/* grid fallback (mobile / tablet) */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {benefits.map((b) => (
          <BenefitCard key={b.title} b={b} className="w-full" />
        ))}
      </div>
    </Section>
  );
}
