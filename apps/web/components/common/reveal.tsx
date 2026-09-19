"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a list of items, revealing each with a small staggered delay.
 * The delay is capped (`maxDelay`) so long lists (e.g. a 20+ item skill
 * grid) don't leave later items sitting invisible for seconds after they've
 * scrolled into view.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  maxDelay = 0.4,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  maxDelay?: number;
}) {
  return (
    <>
      {children.map((child, index) => (
        <Reveal key={index} delay={Math.min(index * stagger, maxDelay)} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
