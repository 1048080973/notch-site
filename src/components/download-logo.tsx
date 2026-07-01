"use client";

import Image from "next/image";
import { downloadAllInstallers } from "@/lib/installers";

export function DownloadLogo() {
  return (
    <button
      type="button"
      onClick={downloadAllInstallers}
      aria-label="Download Notch for all platforms"
      className="icon-swap relative z-10 mx-1.5 grid h-8 w-8 shrink-0 cursor-pointer place-items-center"
    >
      <span className="icon-clip">
        <span className="icon-stack">
          <Image
            src="/layers.png"
            alt="Notch"
            width={26}
            height={26}
            priority
            className="h-[22px] w-[22px] object-contain"
          />
          <Image
            src="/layers-2.png"
            alt=""
            width={26}
            height={26}
            className="h-[22px] w-[22px] object-contain"
          />
        </span>
      </span>
    </button>
  );
}

