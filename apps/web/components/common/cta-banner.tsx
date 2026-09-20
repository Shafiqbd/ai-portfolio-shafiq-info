import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@shafiq-info/ui";

export interface CtaBannerProps {
  eyebrow?: string;
  /** Accepts a node so part of the heading can carry the brand gradient. */
  title?: ReactNode;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaNote?: string;
  /** Handwritten flourish lines, shown on xl+ screens. */
  scriptLines?: string[];
}

/**
 * "Let's Connect" banner — gradient-frame card with aurora glow, glass orb,
 * and a handwritten motto flourish on wide screens. The footer renders it
 * with the defaults; pass props to reuse it on other pages.
 */
export function CtaBanner({
  eyebrow = "Let's Connect",
  title = (
    <>
      Have an idea? <span className="text-gradient-brand">Let&apos;s build</span> something meaningful.
    </>
  ),
  description = "Open to new opportunities and meaningful collaborations in technology.",
  ctaHref = "/contact",
  ctaLabel = "Get in Touch",
  ctaNote = "Usually replies within 24 hours",
  scriptLines = ["Ideas", "Tech", "Real Impact"],
}: CtaBannerProps) {
  return (
    <div className="rounded-card bg-[linear-gradient(115deg,rgba(9,160,74,0.9),rgba(9,160,74,0.08)_40%,rgba(6,182,212,0.5)_100%)] p-px shadow-glow">
      <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-background-elevated">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full border border-foreground/10 bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.18),rgba(9,160,74,0.14)_48%,transparent_74%)] lg:block"
        />

        <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-sm text-foreground-muted">{description}</p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:items-center">
            <Button asChild size="lg" className="group rounded-xl px-7">
              <Link href={ctaHref}>
                <Send className="h-4 w-4" aria-hidden="true" />
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-xs text-foreground-muted">{ctaNote}</p>
          </div>

          <div
            aria-hidden="true"
            className="hidden shrink-0 -rotate-6 select-none flex-col items-end pr-2 font-script text-2xl leading-tight text-accent xl:flex"
          >
            {scriptLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <svg viewBox="0 0 120 12" className="mt-1 w-28 text-accent" fill="none">
              <path d="M2 8 C 30 2, 90 2, 118 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
