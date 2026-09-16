"use client";

import { motion } from "motion/react";
import { Badge } from "@shafiq-info/ui";

function getInitials(name: string) {
  const words = name.replace(/\./g, "").split(" ").filter(Boolean);
  const meaningful = words.filter((word) => word.length > 2);
  const source = meaningful.length >= 2 ? meaningful : words;
  return (source[0][0] + source[source.length - 1][0]).toUpperCase();
}

const ORBIT_POSITIONS = [
  { top: "0%", left: "-2%" },
  { top: "10%", right: "-4%" },
  { top: "50%", left: "-6%" },
  { bottom: "8%", right: "-4%" },
  { bottom: "-2%", left: "6%" },
];

export function AnimatedProfile({
  name,
  available,
  technologies,
}: {
  name: string;
  available: boolean;
  technologies: string[];
}) {
  const initials = getInitials(name);
  const badges = technologies.slice(0, ORBIT_POSITIONS.length);

  return (
    <div className="mx-auto w-full max-w-60 px-4 sm:max-w-sm sm:px-8">
      <div className="relative aspect-square w-full">
        {/* Ambient glow pulse */}
        <motion.div
          aria-hidden="true"
          className="bg-gradient-brand absolute inset-0 rounded-full opacity-30 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating gradient ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-3 rounded-full"
          style={{
            background: "var(--gradient-brand)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />

        {/* Avatar placeholder — swap for a real photo (next/image) once one exists */}
        <div className="bg-background-elevated absolute inset-6 flex items-center justify-center rounded-full border border-border shadow-glow">
          <span className="text-gradient-brand font-mono text-5xl font-bold sm:text-7xl">
            {initials}
          </span>
        </div>

        {available && (
          <motion.div
            className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background-elevated px-2.5 py-1 shadow-glow sm:px-3 sm:py-1.5"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="text-[10px] font-medium sm:text-xs">Available</span>
          </motion.div>
        )}

        {badges.map((tech, index) => (
          <motion.div
            key={tech}
            className="absolute"
            style={ORBIT_POSITIONS[index]}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          >
            <Badge
              variant="accent"
              className="shadow-glow px-1.5 py-0.5 text-[10px] sm:px-2.5 sm:py-0.5 sm:text-xs"
            >
              {tech}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
