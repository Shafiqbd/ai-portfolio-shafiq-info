import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { TechStack } from "@/components/sections/tech-stack";
import { Education } from "@/components/sections/education";
import { getProfile } from "@/services/profile.service";

export const metadata: Metadata = {
  title: "About",
  description: "The story, philosophy, and engineering focus behind Shafiq Info.",
};

const MINDSET_POINTS = [
  {
    title: "Product mindset",
    description:
      "Software exists to solve a real business problem — every feature decision is weighed against the problem it's meant to solve, not just what's technically interesting.",
  },
  {
    title: "AI-native, not AI-decorated",
    description:
      "AI is treated as part of the engineering lifecycle — from spec to review — and as a grounded assistant for this site's visitors, not a bolt-on chatbot.",
  },
  {
    title: "Where this is headed",
    description:
      "Continuing to go deeper on AI-powered product engineering — retrieval-augmented systems, agentic workflows, and applying that to the same kinds of real-world business systems (FinTech, ERP, accounting) already worked on.",
  },
];

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      <Section eyebrow="About" title={`Hi, I'm ${profile.name}.`} titleAs="h1">
        <div className="flex flex-col gap-6">
          <p className="max-w-2xl text-foreground-muted">{profile.bio}</p>
          {profile.philosophy && (
            <blockquote
              className="max-w-2xl border-l-2 pl-4 italic text-foreground"
              style={{ borderImage: "var(--gradient-brand) 1" }}
            >
              &ldquo;{profile.philosophy}&rdquo;
            </blockquote>
          )}
        </div>
      </Section>

      <ExperienceTimeline />

      <TechStack />

      <Education />

      <Section eyebrow="How I think about the work" title="Mindset">
        <div className="grid gap-6 sm:grid-cols-3">
          <RevealGroup>
            {MINDSET_POINTS.map((point) => (
              <div key={point.title} className="flex flex-col gap-2">
                <h3 className="font-semibold">{point.title}</h3>
                <p className="text-sm text-foreground-muted">{point.description}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
