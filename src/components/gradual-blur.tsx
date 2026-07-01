import type { CSSProperties } from "react";

type GradualBlurProps = {
  /** Height of the blur band (CSS length, e.g. "240px" or number of px). */
  height?: number | string;
  /** Number of stacked blur layers — more = smoother. */
  divCount?: number;
  /** Base blur strength multiplier. */
  strength?: number;
  /** Exponential blur ramp (stronger toward the bottom). */
  exponential?: boolean;
  /** Overall opacity of the blur overlay (0–1). */
  opacity?: number;
  className?: string;
};

// Progressive blur: each layer applies a slightly stronger backdrop blur and is
// masked to a sliding band, so the blur ramps smoothly from clear (top) to
// strongest (bottom). Layers compound because each samples the ones beneath it.
export function GradualBlur({
  height = 240,
  divCount = 6,
  strength = 3,
  exponential = true,
  opacity = 1,
  className = "",
}: GradualBlurProps) {
  const increment = 100 / divCount;

  const layers = Array.from({ length: divCount }, (_, i) => {
    const progress = (i + 1) / divCount;
    const blur = exponential
      ? Math.pow(2, progress * 4) * 0.0625 * strength
      : 0.0625 * (progress * divCount + 1) * strength;

    // Each layer fades in at its start and stays opaque to the bottom; later
    // (stronger-blur) layers are painted on top, so the blur ramps up smoothly
    // toward the bottom edge with full coverage there.
    const start = increment * i;
    const full = increment * (i + 1);
    const mask = `linear-gradient(to bottom, transparent ${start}%, black ${full}%, black 100%)`;

    const style: CSSProperties = {
      position: "absolute",
      inset: 0,
      backdropFilter: `blur(${blur.toFixed(3)}px)`,
      WebkitBackdropFilter: `blur(${blur.toFixed(3)}px)`,
      maskImage: mask,
      WebkitMaskImage: mask,
    };

    return <div key={i} style={style} />;
  });

  return (
    <div
      className={`gradual-blur pointer-events-none absolute inset-x-0 bottom-0 ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        opacity,
      }}
      aria-hidden
    >
      <div className="gradual-blur-inner">{layers}</div>
    </div>
  );
}
