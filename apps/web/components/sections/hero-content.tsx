"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Button, Badge } from "@shafiq-info/ui";
import type { Profile } from "@shafiq-info/types";
import { OpenAskShafiqButton } from "@/components/ai/open-ask-shafiq-button";

const AVAILABILITY_LABEL: Record<string, string> = {
  available: "Available for work",
  open: "Open to opportunities",
  unavailable: "Not currently available",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
} satisfies Variants;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
} satisfies Variants;

export function HeroContent({
  profile,
  topTechnologies,
}: {
  profile: Profile;
  topTechnologies: string[];
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-20 text-center sm:py-28"
    >
      <motion.p variants={item} className="font-mono text-sm text-foreground-muted">
        Hi, I&apos;m {profile.name.split(" ")[0]}.
      </motion.p>

      <motion.h1
        variants={item}
        className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        <span className="text-gradient-brand">{profile.tagline}</span>
      </motion.h1>

      <motion.p variants={item} className="max-w-2xl text-balance text-foreground-muted">
        {profile.secondaryTagline}
      </motion.p>

      {topTechnologies.length > 0 && (
        <motion.p variants={item} className="font-mono text-sm text-foreground-muted">
          {topTechnologies.join(" · ")}
        </motion.p>
      )}

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/projects">View My Work</Link>
        </Button>
        {profile.resumeUrl ? (
          <Button asChild variant="secondary" size="lg">
            <a href={profile.resumeUrl}>Download CV</a>
          </Button>
        ) : (
          <Button asChild variant="secondary" size="lg">
            <Link href="/resume">Download CV</Link>
          </Button>
        )}
        <OpenAskShafiqButton variant="ghost" size="lg">
          Ask Shafiq AI
        </OpenAskShafiqButton>
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Badge variant="accent">{AVAILABILITY_LABEL[profile.availability]}</Badge>
        <Badge>{profile.yearsExperience}+ Years Experience</Badge>
        <Badge>{profile.location}</Badge>
      </motion.div>
    </motion.div>
  );
}
