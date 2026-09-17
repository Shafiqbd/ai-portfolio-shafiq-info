import { Badge } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { ConnectedResponsibilities } from "@/components/experience/connected-responsibilities";
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
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <RevealGroup>
          {experiences.map((experience) => (
            <div key={experience.id}>
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <Badge variant="accent" className="text-[15px] font-medium">
                  {experience.role}
                </Badge>
                <p className="font-mono text-xs text-foreground-muted">
                  {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
                </p>
              </div>

              <h3 className="text-lg font-semibold">
                {experience.company}
                {experience.address && (
                  <span className="font-normal text-foreground-muted"> , {experience.address}</span>
                )}
              </h3>

              {experience.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              )}

              <div className="mt-6 max-w-xl">
                <ConnectedResponsibilities items={experience.responsibilities} />
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
