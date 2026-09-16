import { Badge } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getExperiences } from "@/services/experience.service";

function formatDate(value?: string) {
  if (!value) return "Present";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export async function ExperienceTimeline() {
  const experiences = await getExperiences();
  if (experiences.length === 0) return null;

  return (
    <Section
      eyebrow="Career"
      title="Experience"
      description="The path from software fundamentals to shipping production systems."
    >
      <ol className="flex flex-col gap-8 border-l border-border pl-6">
        <RevealGroup>
          {experiences.map((experience) => (
            <li key={experience.id} className="relative">
              <span
                className="absolute top-1.5 left-[-1.65rem] h-3 w-3 rounded-full bg-gradient-brand shadow-glow"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <Badge variant="accent" className="w-fit">
                  {experience.milestoneStage}
                </Badge>
                <h3 className="font-semibold">
                  {experience.role} · {experience.company}
                </h3>
                <p className="font-mono text-xs text-foreground-muted">
                  {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
                </p>
                <p className="text-sm text-foreground-muted">{experience.summary}</p>
              </div>
            </li>
          ))}
        </RevealGroup>
      </ol>
    </Section>
  );
}
