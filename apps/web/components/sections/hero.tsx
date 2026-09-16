import Link from "next/link";
import { Button, Badge } from "@shafiq-info/ui";
import { getProfile } from "@/services/profile.service";
import { getSkillCategories } from "@/services/skill.service";

const AVAILABILITY_LABEL: Record<string, string> = {
  available: "Available for work",
  open: "Open to opportunities",
  unavailable: "Not currently available",
};

export async function Hero() {
  const [profile, skillCategories] = await Promise.all([getProfile(), getSkillCategories()]);
  const topTechnologies = skillCategories
    .flatMap((category) => category.skills)
    .slice(0, 6)
    .map((skill) => skill.name);

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-20 text-center sm:py-28">
      <p className="font-mono text-sm text-foreground-muted">
        Hi, I&apos;m {profile.name.split(" ")[0]}.
      </p>

      <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {profile.tagline}
      </h1>

      <p className="max-w-2xl text-balance text-foreground-muted">{profile.secondaryTagline}</p>

      {topTechnologies.length > 0 && (
        <p className="font-mono text-sm text-foreground-muted">{topTechnologies.join(" · ")}</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
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
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Badge variant="accent">{AVAILABILITY_LABEL[profile.availability]}</Badge>
        <Badge>{profile.yearsExperience}+ Years Experience</Badge>
        <Badge>{profile.location}</Badge>
      </div>
    </div>
  );
}
