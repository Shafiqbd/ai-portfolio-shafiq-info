import type { ReactNode } from "react";
import { cn } from "@shafiq-info/ui";
import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  title,
  titleAs = "h2",
  description,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  /** Use "h1" for the section that carries a page's main heading (one per page). */
  titleAs?: "h1" | "h2";
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const Heading = titleAs;
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 py-16 sm:py-20", className)}>
      {(eyebrow || title || description) && (
        <Reveal className="mb-10 flex flex-col gap-2">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-wide text-accent">{eyebrow}</p>
          )}
          {title && (
            <Heading
              className={cn(
                "text-2xl font-semibold tracking-tight sm:text-3xl",
                titleAs === "h1" && "text-gradient-brand text-3xl sm:text-4xl",
              )}
            >
              {title}
            </Heading>
          )}
          {description && <p className="max-w-2xl text-foreground-muted">{description}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
