"use client";

import { ArrowUp } from "lucide-react";

/**
 * Footer bottom-bar "Back to top" — always visible (unlike the floating
 * BackToTop, which appears only after scrolling).
 */
export function FooterBackToTop() {
  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group flex cursor-pointer items-center gap-3 rounded-control text-xs font-medium text-foreground-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      Back to top
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-elevated transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent group-hover:shadow-glow active:scale-95">
        <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </button>
  );
}
