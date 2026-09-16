import { Badge } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
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
        {experiences.map((experience) => (
          <li key={experience.id} className="relative">
            <span
              className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
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
      </ol>
    </Section>
  );
}
