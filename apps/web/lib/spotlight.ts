import type { MouseEvent } from "react";

/** Writes the cursor position into CSS vars consumed by `.spotlight-effect`. */
export function handleSpotlightMove(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
}
