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
      <div className="relative">
        {/* Shared spine, aligned to each column's dot (header block height + half the dot). */}
        <div
          className="pointer-events-none absolute inset-x-0 top-21.5 hidden h-px bg-border md:block"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-14 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-16">
          <RevealGroup>
            {experiences.map((experience) => (
              <div key={experience.id} className="md:w-[calc(50%-1.25rem)] md:flex-none">
                <div className="flex h-20 flex-col justify-end gap-0.5">
                  <p className="font-semibold">{experience.company}</p>
                  <p className="font-mono text-xs text-foreground-muted">
                    {experience.role} · {formatDate(experience.startDate)} —{" "}
                    {formatDate(experience.endDate)}
                  </p>
                  {experience.location && (
                    <p className="text-xs text-foreground-muted">{experience.location}</p>
                  )}
                </div>

                <ConnectedResponsibilities items={experience.responsibilities} />
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
