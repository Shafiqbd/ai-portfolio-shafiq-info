import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const VARIANT_CLASSES = {
  primary: "bg-gradient-brand text-white shadow-glow hover:brightness-110 active:brightness-95",
  secondary:
    "border border-transparent text-foreground [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand)_border-box] hover:shadow-glow",
  ghost: "text-foreground-muted hover:text-foreground hover:bg-background-elevated",
} as const;

const SIZE_CLASSES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
  /** Render as the child element (e.g. a Next.js `<Link>`) instead of a `<button>`. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-all duration-200",
          "hover:-translate-y-0.5 active:translate-y-0",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
