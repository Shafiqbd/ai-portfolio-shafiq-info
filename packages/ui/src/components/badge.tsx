import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const VARIANT_CLASSES = {
  neutral: "border-border text-foreground-muted",
  accent: "border-accent/40 bg-accent/10 text-accent",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof VARIANT_CLASSES;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
