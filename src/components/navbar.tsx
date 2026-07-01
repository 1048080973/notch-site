import { DownloadLogo } from "./download-logo";

const leftLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#solutions" },
];

const rightLinks = [
  { label: "Blog", href: "#how" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="notch-link px-2.5">
      <span className="text-sm text-white/75 transition-colors hover:text-white">
        {label}
      </span>
    </a>
  );
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="notch-wrap group h-[68px] w-full">
        {/* Figma "Union" notch — single path that morphs wider on hover */}
        <svg
          className="notch-svg"
          viewBox="0 0 1441 80.7188"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <path
            className="notch-path"
            d="M0 25.7178H578.458C598.727 25.7178 618.24 33.4114 633.055 47.2441L645.853 59.1934C660.667 73.0254 680.181 80.7188 700.449 80.7188H739.551C759.819 80.7188 779.333 73.0254 794.147 59.1934L806.945 47.2441C821.76 33.4114 841.273 25.7178 861.542 25.7178H1440L1441 0H1L0 25.7178Z"
            fill="#09090b"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="notch-row">
          <div className="flex items-center gap-1">
            {leftLinks.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </div>

          <DownloadLogo />

          <div className="flex items-center gap-1">
            {rightLinks.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
