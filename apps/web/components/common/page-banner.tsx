import type { ReactNode } from "react";
import { cn } from "@shafiq-info/ui";

/**
 * Reusable top-of-page banner: gradient mesh backdrop + heading. Currently
 * wired into /about only; the plan is to roll this out to other pages next.
 */
export function PageBanner({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden border-b border-border", className)}>
      <div
        aria-hidden="true"
        className="animate-mesh-drift bg-mesh pointer-events-none absolute inset-0 opacity-70 blur-3xl"
      />
      <div className="site-container relative mx-auto flex flex-col items-center gap-5 px-6 py-10 text-center">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{eyebrow}</p>
        )}
        {title && (
          <h1 className="text-gradient-brand max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
        )}
        {description && (
          <p className="max-w-2xl text-balance text-foreground-muted">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
