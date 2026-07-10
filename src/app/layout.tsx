import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://motionbuilder.top";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "MotionAutoBuilder — Auto Make Lottie with AI Matching",
    template: "%s · MotionAutoBuilder",
  },
  description:
    "MotionAutoBuilder helps you auto make Lottie animations with AI matching. Automatically create Lottie files, match design layers to motion templates, replace assets, and export polished UI motion for design teams.",
  applicationName: "MotionAutoBuilder",
  keywords: [
    "MotionAutoBuilder",
    "Lottie",
    "Lottie maker",
    "Lottie creator",
    "make Lottie",
    "create Lottie",
    "auto make Lottie",
    "automatic Lottie generation",
    "Lottie automation",
    "AI matching",
    "AI Lottie",
    "AI motion matching",
    "smart layer matching",
    "auto match templates",
    "Lottie template matching",
    "Lottie export",
    "Lottie inspector",
    "Lottie JSON",
    "motion design",
    "motion automation",
    "UI animation",
    "After Effects Lottie",
    "Figma motion",
    "Figma to Lottie",
    "design to Lottie",
    "asset replacement",
    "design team tools",
    "macOS",
    "Windows",
  ],
  authors: [{ name: "MotionAutoBuilder" }],
  creator: "MotionAutoBuilder",
  publisher: "MotionAutoBuilder",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MotionAutoBuilder",
    title: "MotionAutoBuilder — Auto Make Lottie with AI Matching",
    description:
      "Auto make Lottie animations with AI matching. Match layers to motion templates, replace assets, and export faster with less manual work.",
    images: [
      {
        url: "/hero-cube.png",
        width: 1200,
        height: 1200,
        alt: "MotionAutoBuilder — auto make Lottie with AI matching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MotionAutoBuilder — Auto Make Lottie with AI Matching",
    description:
      "Auto make Lottie with AI matching. Create, match templates, and export motion for design teams.",
    images: ["/hero-cube.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
