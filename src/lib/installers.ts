export type DownloadItem = {
  id: "mac-arm" | "mac-intel" | "win";
  label: string;
  href: string;
};

// Where the installer binaries are hosted. In production point this at a
// GitHub Release, e.g.
//   NEXT_PUBLIC_DOWNLOAD_BASE=https://github.com/<owner>/<repo>/releases/download/v0.1.0
// Locally it falls back to the files in public/downloads.
const BASE = process.env.NEXT_PUBLIC_DOWNLOAD_BASE ?? "/downloads";

export const INSTALLERS: DownloadItem[] = [
  {
    id: "mac-arm",
    label: "macOS (Apple Silicon)",
    href: `${BASE}/MotionAutoBuilder-0.1.0-arm64.dmg`,
  },
  {
    id: "mac-intel",
    label: "macOS (Intel)",
    href: `${BASE}/MotionAutoBuilder-0.1.0-x64.dmg`,
  },
  {
    id: "win",
    label: "Windows",
    href: `${BASE}/MotionAutoBuilder-Setup-0.1.0.exe`,
  },
];

// Kick off downloads for every installer. Browsers only auto-start the first
// file and usually prompt for the rest, so we stagger the clicks slightly.
export function downloadAllInstallers() {
  if (typeof document === "undefined") return;
  INSTALLERS.forEach((item, i) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = item.href;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, i * 500);
  });
}

