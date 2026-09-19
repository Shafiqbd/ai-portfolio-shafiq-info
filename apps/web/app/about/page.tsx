import type { Metadata } from "next";
import { Target, Sparkles, ShieldCheck, Rocket, Calendar, FolderGit2, Briefcase, Layers } from "lucide-react";
import { Section } from "@/components/common/section";
import { PageBanner } from "@/components/common/page-banner";
import { RevealGroup } from "@/components/common/reveal";
import { StatsBanner } from "@/components/common/stats-banner";
import { TechStack } from "@/components/sections/tech-stack";
import { Education } from "@/components/sections/education";
import { Achievements } from "@/components/sections/achievements";
import { getProfile } from "@/services/profile.service";

export const metadata: Metadata = {
  title: "About",
  description: "The story, philosophy, and engineering focus behind Shafiq Info.",
};

const MINDSET_POINTS = [
  {
    icon: Target,
    title: "Product mindset",
    description:
      "Software exists to solve a real business problem — every feature decision is weighed against the problem it's meant to solve, not just what's technically interesting.",
  },
  {
    icon: Sparkles,
    title: "AI-native, not AI-decorated",
    description:
      "AI is treated as part of the engineering lifecycle — from spec to review — and as a grounded assistant for this site's visitors, not a bolt-on chatbot.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & reliability",
    description:
      "Type safety, sensible validation, and tests where they actually pay off — the goal is code that keeps working after it ships, not just code that works once.",
  },
  {
    icon: Rocket,
    title: "Where this is headed",
    description:
      "Continuing to go deeper on AI-powered product engineering — retrieval-augmented systems, agentic workflows, and applying that to the same kinds of real-world business systems (FinTech, ERP, accounting) already worked on.",
  },
];

const stats = [
    { icon: Calendar, value: `6+`, label: "Years Experience" },
    { icon: FolderGit2, value: `100+`, label: "Projects Delivered" },
    { icon: Briefcase, value: `50+`, label: "Organizations" },
    { icon: Layers, value: `20+`, label: "Technologies" },
  ];

export default async function AboutPage() {
  const [profile] = await Promise.all([getProfile()]);

  return (
    <>
      <PageBanner eyebrow="About" title={`Hi, I'm ${profile.name}.`}>
        <div className="mt-4 w-full">
          <StatsBanner stats={stats} />
        </div>
      </PageBanner>

      <Section>
        <div className="flex flex-col gap-6">
          <p className=" whitespace-pre-line text-foreground-muted">{profile.description}</p>
          {profile.tagline && (
            <blockquote
              className="max-w-2xl border-l-2 pl-4 italic text-foreground"
              style={{ borderImage: "var(--gradient-brand) 1" }}
            >
              &ldquo;{profile.tagline}&rdquo;
            </blockquote>
          )}
        </div>
      </Section>

      {/* <ExperienceTimeline /> */}

      <TechStack />
      <Achievements />
      <Education />

      <Section eyebrow="Why work with me" title="Mindset">
        <div className="flex flex-col gap-4">
          <RevealGroup>
            {MINDSET_POINTS.map((point) => (
              <div
                key={point.title}
                className="flex items-start gap-4 rounded-card border border-transparent p-5 transition-all duration-300 [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box] hover:shadow-glow hover:[background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand)_border-box]"
              >
                <span className="bg-gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-control text-white">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="text-sm text-foreground-muted">{point.description}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
