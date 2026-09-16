import { GraduationCap } from "lucide-react";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getEducation } from "@/services/education.service";

function formatYears(startYear?: number, endYear?: number) {
  if (!startYear) return undefined;
  return `${startYear} — ${endYear ?? "Present"}`;
}

export async function Education() {
  const education = await getEducation();
  if (education.length === 0) return null;

  return (
    <Section eyebrow="Background" title="Education">
      <div className="flex flex-col gap-4">
        <RevealGroup>
          {education.map((entry) => {
            const years = formatYears(entry.startYear, entry.endYear);
            return (
              <div key={entry.institution} className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-medium">
                    {entry.degree} in {entry.field}
                  </p>
                  <p className="text-sm text-foreground-muted">
                    {entry.institution}
                    {years ? ` · ${years}` : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
