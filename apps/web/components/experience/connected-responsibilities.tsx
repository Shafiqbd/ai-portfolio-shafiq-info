"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/**
 * A dot with curved connectors fanning out to a vertical stack of pills —
 * one per responsibility. Curves are computed from real measured positions
 * (not guessed offsets) so they stay correct regardless of how much text is
 * in each pill or how many there are.
 */
export function ConnectedResponsibilities({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      const dot = dotRef.current;
      if (!container || !dot) return;

      const containerBox = container.getBoundingClientRect();
      const dotBox = dot.getBoundingClientRect();
      const startX = dotBox.left + dotBox.width / 2 - containerBox.left;
      const startY = dotBox.top + dotBox.height / 2 - containerBox.top;

      const next = pillRefs.current.map((pill) => {
        if (!pill) return "";
        const box = pill.getBoundingClientRect();
        const endX = box.left - containerBox.left;
        const endY = box.top + box.height / 2 - containerBox.top;
        const midY = (startY + endY) / 2;
        return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
      });
      setPaths(next);
    }

    measure();
    // Re-measure once more shortly after mount in case web fonts shift line
    // wrapping/heights after the first paint.
    const timer = window.setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative">
      <div ref={dotRef} className="bg-gradient-brand h-3 w-3 rounded-full shadow-glow" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {paths.map(
          (d, index) =>
            d && (
              <path
                key={index}
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />
            ),
        )}
      </svg>

      <ul className="mt-4 flex flex-col gap-3 pl-10">
        {items.map((item, index) => (
          <li
            key={item}
            ref={(el) => {
              pillRefs.current[index] = el;
            }}
            className="flex items-start gap-3 rounded-full border border-border bg-background-elevated px-4 py-2.5 shadow-sm"
          >
            <span className="bg-gradient-brand mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="text-sm text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
