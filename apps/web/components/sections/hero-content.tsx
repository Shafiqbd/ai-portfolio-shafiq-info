"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Button, Badge } from "@shafiq-info/ui";
import type { Profile } from "@shafiq-info/types";
import { OpenAskShafiqButton } from "@/components/ai/open-ask-shafiq-button";
import { AnimatedProfile } from "@/components/sections/animated-profile";

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

const imageReveal = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
} satisfies Variants;

export function HeroContent({
  profile,
  topTechnologies,
}: {
  profile: Profile;
  topTechnologies: string[];
}) {
  return (
    <div className="site-container mx-auto grid items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left"
      >
        <motion.p variants={item} className="font-mono text-sm text-foreground-muted">
          Hi, I&apos;m {profile.name}.
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          <span className="text-gradient-brand">{profile.tagline}</span>
        </motion.h1>

        <motion.p variants={item} className="max-w-xl text-balance text-foreground-muted">
          {profile.secondaryTagline}
        </motion.p>

        {topTechnologies.length > 0 && (
          <motion.p variants={item} className="font-mono text-sm text-foreground-muted">
            {topTechnologies.join(" · ")}
          </motion.p>
        )}

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
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

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-2 pt-2 lg:justify-start"
        >
          <Badge variant="accent">{AVAILABILITY_LABEL[profile.availability]}</Badge>
          <Badge>{profile.yearsExperience}+ Years Experience</Badge>
          <Badge>{profile.location}</Badge>
        </motion.div>
      </motion.div>

      <motion.div
        variants={imageReveal}
        initial="hidden"
        animate="show"
        className="order-first lg:order-last"
      >
        <AnimatedProfile
          name={profile.name}
          available={profile.availability !== "unavailable"}
          technologies={topTechnologies}
        />
      </motion.div>
    </div>
  );
}
