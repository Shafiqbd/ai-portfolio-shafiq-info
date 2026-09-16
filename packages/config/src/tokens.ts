/**
 * Canonical design-token values. Tailwind (in apps/web/app/globals.css) is the
 * source of truth for CSS custom properties — these constants mirror the same
 * hex values for non-Tailwind consumers (OG image generation, email templates)
 * so the palette can't drift between the two.
 */
export const colors = {
  dark: {
    background: "#0A0B0D",
    backgroundElevated: "#121417",
    foreground: "#F3F4F1",
    foregroundMuted: "#9AA0A6",
    border: "#22262B",
    accent: "#8B5CF6",
    accentForeground: "#FFFFFF",
  },
  light: {
    background: "#FAF9F6",
    backgroundElevated: "#FFFFFF",
    foreground: "#14151A",
    foregroundMuted: "#5B5F66",
    border: "#E4E1DA",
    accent: "#7C3AED",
    accentForeground: "#FFFFFF",
  },
} as const;

/** Brand gradient stops — indigo -> violet -> pink. Same order in both themes. */
export const gradientBrand = {
  dark: ["#6366F1", "#A855F7", "#EC4899"],
  light: ["#4F46E5", "#9333EA", "#DB2777"],
} as const;

export const radius = {
  card: "1rem",
  control: "0.5rem",
} as const;

export const fonts = {
  sans: "var(--font-geist-sans)",
  mono: "var(--font-geist-mono)",
} as const;
