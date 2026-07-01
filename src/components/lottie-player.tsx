"use client";

import { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

export function LottiePlayer({
  src,
  className = "",
  loop = true,
  autoplay = true,
  loopDelay = 0,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  /** Pause (ms) to hold on the last frame before looping again. */
  loopDelay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // When a loop delay is set, drive looping manually so we can hold on the
    // final frame before replaying.
    const nativeLoop = loopDelay > 0 ? false : loop;

    const anim: AnimationItem = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: nativeLoop,
      autoplay,
      path: src,
    });

    const handleComplete = () => {
      if (cancelled || !loop || loopDelay <= 0) return;
      timer = setTimeout(() => {
        if (!cancelled) anim.goToAndPlay(0, true);
      }, loopDelay);
    };

    if (loopDelay > 0 && loop) {
      anim.addEventListener("complete", handleComplete);
    }

    if (cancelled) anim.destroy();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      anim.destroy();
    };
  }, [src, loop, autoplay, loopDelay]);

  return <div ref={containerRef} className={className} aria-hidden />;
}
