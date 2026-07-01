"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { RollingText } from "./ui";
import { downloadAllInstallers, type DownloadItem } from "@/lib/installers";

function detectPlatform(): "mac-arm" | "mac-intel" | "win" | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/Win/i.test(ua)) return "win";
  if (/Mac/i.test(ua)) {
    // Browsers don't reliably expose CPU arch; Apple Silicon is the modern
    // default, so surface it first for Mac visitors.
    return "mac-arm";
  }
  return null;
}

export function GlowButton({
  href = "#",
  children,
  download = false,
  downloads,
  downloadAll = false,
}: {
  href?: string;
  children: string;
  download?: boolean;
  downloads?: DownloadItem[];
  downloadAll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<
    "mac-arm" | "mac-intel" | "win" | null
  >(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const x = e.clientX - cx;
        const y = e.clientY - cy;

        const angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
        const dx = Math.max(Math.abs(x) - r.width / 2, 0);
        const dy = Math.max(Math.abs(y) - r.height / 2, 0);
        const dist = Math.hypot(dx, dy);
        const range = 140;
        const proximity = Math.max(0, Math.min(100, (1 - dist / range) * 100));

        card.style.setProperty("--cursor-angle", `${angle}deg`);
        card.style.setProperty("--edge-proximity", String(proximity));
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Close the menu on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Order the download options so the visitor's detected platform is first.
  const orderedDownloads = useMemo(() => {
    if (!downloads) return [];
    if (!platform) return downloads;
    return [...downloads].sort((a, b) => {
      const aMatch = a.id === platform ? -1 : 0;
      const bMatch = b.id === platform ? -1 : 0;
      return aMatch - bMatch;
    });
  }, [downloads, platform]);

  const innerClass =
    "roll-btn border-glow-inner inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 active:scale-[0.98]";

  // Download-all mode: one click grabs every platform installer.
  if (downloadAll) {
    return (
      <div ref={ref} className="border-glow-card glow-pill">
        <span className="edge-light" aria-hidden />
        <button
          type="button"
          onClick={downloadAllInstallers}
          className={`${innerClass} cursor-pointer`}
        >
          <RollingText text={children} />
        </button>
      </div>
    );
  }

  // Menu mode: multiple platform-specific installers.
  if (downloads && downloads.length > 0) {
    return (
      <div ref={ref} className="border-glow-card glow-pill relative">
        <span className="edge-light" aria-hidden />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className={innerClass}
        >
          <RollingText text={children} />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-max min-w-[15rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e10]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            {orderedDownloads.map((item) => (
              <a
                key={item.id}
                href={item.href}
                download
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-4 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <span>{item.label}</span>
                {platform === item.id && (
                  <svg
                    aria-label="Recommended for your device"
                    className="h-4 w-4 shrink-0 text-[#a86bff]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10v11" />
                    <path d="M7 10 11 2a2 2 0 0 1 2 2v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 17 20H7" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="border-glow-card glow-pill">
      <span className="edge-light" aria-hidden />
      {download ? (
        <a href={href} download className={innerClass}>
          <RollingText text={children} />
        </a>
      ) : (
        <Link href={href} className={innerClass}>
          <RollingText text={children} />
        </Link>
      )}
    </div>
  );
}

