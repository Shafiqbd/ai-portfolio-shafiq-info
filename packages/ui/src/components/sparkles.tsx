import { Sparkle } from "lucide-react";

const POSITIONS = [
  { top: "10%", left: "12%", size: 14, delay: "0s" },
  { top: "20%", left: "85%", size: 10, delay: "0.6s" },
  { top: "70%", left: "90%", size: 12, delay: "1.2s" },
  { top: "85%", left: "18%", size: 9, delay: "1.8s" },
  { top: "45%", left: "6%", size: 11, delay: "2.3s" },
];

/**
 * Decorative twinkling star particles, absolutely positioned over a
 * `relative` + `group` ancestor (e.g. Card with `sparkle`). Idle at low
 * opacity, brightens on the ancestor's hover via the `.group` convention.
 */
export function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {POSITIONS.map((pos, index) => (
        <Sparkle
          key={index}
          className="sparkle text-accent absolute"
          style={{
            top: pos.top,
            left: pos.left,
            width: pos.size,
            height: pos.size,
            // @ts-expect-error -- custom property read by the .sparkle animation
            "--sparkle-delay": pos.delay,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}
