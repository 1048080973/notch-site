import Image from "next/image";
import { Button } from "./ui";
import { GlowButton } from "./glow-button";
import { GradualBlur } from "./gradual-blur";
import DotField from "./dot-field";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* base gradient: black top -> deep purple-black bottom (Figma: to-black / #18002d) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#100020]" />
      {/* purple glow pooling behind the render */}
      <div className="absolute inset-x-0 bottom-[-60px] h-[72%] bg-[radial-gradient(58%_52%_at_50%_88%,rgba(124,40,221,0.42),transparent_70%)]" />
      {/* subtle top vignette for nav legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* animated dot field floor beneath the cube, fading out toward the top */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[55%] [mask-image:linear-gradient(to_top,black_0%,black_25%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_25%,transparent_85%)]">
        <DotField
          dotRadius={2.5}
          dotSpacing={16}
          gradientFrom="rgba(168, 85, 247, 0.55)"
          gradientTo="rgba(180, 151, 207, 0.4)"
        />
      </div>
      {/* progressive blur over the bottom of the first screen */}
      <GradualBlur
        className="z-[6]"
        height={100}
        strength={10}
        divCount={40}
        opacity={1}
      />

      {/* bottom fade (Figma 499:36) — sits ABOVE the blur so the dark fade isn't
          washed out by the blur sampling lighter pixels from above. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] h-[100px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.92)_100%)]" />

      {/* the 3D chrome layered render (from Figma 479:146) —
          square image, ~56% of viewport width, top at ~57%, bleeds off bottom */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(56%-50px)] z-0 aspect-square w-[56vw] max-w-[840px] -translate-x-1/2">
        <Image
          src="/hero-cube.png"
          alt="MotionAutoBuilder Lottie motion automation engine"
          fill
          priority
          sizes="56vw"
          className="reveal select-none object-contain drop-shadow-[0_40px_120px_rgba(124,40,221,0.55)]"
        />
      </div>

      {/* text is vertically centered in the band ABOVE the cube, so its spacing
          to the cube stays consistent across viewport heights (no fixed px gap) */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(56%-50px)] translate-y-[20px] flex-col items-center justify-center px-5 pt-16 text-center">
        <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-3.5 text-sm backdrop-blur">
          <span className="rounded-full bg-[#7c28dd] px-2.5 py-0.5 text-xs font-semibold text-white">
            New
          </span>
          <span className="text-white/80">AI Matching · Auto Make Lottie</span>
        </span>

        <h1 className="reveal mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
          We Make Motion Work for You,{" "}
          <span className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_38%,rgba(6,2,20,1)_100%)] bg-clip-text text-transparent">
            Not Against You.
          </span>
        </h1>

        <p className="reveal mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/55 md:text-base">
          Auto make Lottie animations with AI matching — match design layers to
          motion templates, replace assets, and export faster.
        </p>

        <div className="reveal mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            href="https://1048080973.github.io/Lottie-inspector-se/"
            target="_blank"
          >
            Preview Lottie
          </Button>
          <GlowButton downloadAll>Download for free</GlowButton>
        </div>
      </div>
    </section>
  );
}
