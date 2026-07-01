"use client";

import { useState } from "react";
import { Section, SectionHeading } from "./ui";

const faqs = [
  {
    q: "How can AI automation help my business?",
    a: "It removes repetitive busywork, speeds up your workflows, and surfaces insights from your data — so your team spends time on high-value work instead of manual tasks.",
  },
  {
    q: "Is AI automation difficult to integrate?",
    a: "Not with us. We map your existing tools and connect AI into your current systems with minimal disruption, handling the technical setup end to end.",
  },
  {
    q: "What industries can benefit from AI automation?",
    a: "Almost any — from agencies and SaaS to e-commerce, finance, and support teams. If you have repeatable processes, there's room to automate.",
  },
  {
    q: "Do I need technical knowledge to use AI automation?",
    a: "No. We build and maintain everything for you, and the dashboards we deliver are designed to be used by non-technical teams.",
  },
  {
    q: "What kind of support do you offer?",
    a: "From community and priority support on standard plans to a dedicated support lead on Elite — plus ongoing maintenance to keep everything running smoothly.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently asked questions"
            align="left"
          />
          <p className="mt-5 text-sm text-muted">
            Got a specific question?{" "}
            <a href="#contact" className="text-white underline underline-offset-4">
              Contact us
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-medium text-white/90">
                    {f.q}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
