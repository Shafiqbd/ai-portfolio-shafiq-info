import { GraduationCap } from "lucide-react";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getEducation } from "@/services/education.service";
import { Card, cn } from "@shafiq-info/ui";
import type { Education as EducationEntry } from "@shafiq-info/types";

function formatYears(startYear?: number, endYear?: number) {
  if (!startYear) return undefined;
  return `${startYear} – ${endYear ?? "Present"}`;
}

/**
 * Timeline card. Content stays left-aligned; only the year range moves —
 * it hugs the timeline-facing edge (right side on left-column cards, left
 * side on right-column cards), per the reference design.
 */
function EducationCard({ entry, dateSide }: { entry: EducationEntry; dateSide: "left" | "right" }) {
  const years = formatYears(entry.startYear, entry.endYear);
  return (
    <Card sparkle className="p-7">
      {years && (
        <p className={cn("font-mono text-sm font-medium text-accent", dateSide === "right" && "text-right")}>
          {years}
        </p>
      )}
      <p className="mt-3 text-sm font-semibold uppercase tracking-wider">{entry.degree}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-accent">{entry.field}</h3>
      <p className="mt-1.5 text-sm text-foreground-muted">{entry.institution}</p>
      <p className="mt-4 flex items-center gap-2.5 text-sm text-foreground-muted">
        <GraduationCap className="h-5 w-5" aria-hidden="true" />
        <span>
          CGPA {entry.cgpa} / {entry.outOf}
        </span>
      </p>
    </Card>
  );
}

export async function Education() {
  const education = await getEducation();
  if (education.length === 0) return null;

  return (
    <Section
      eyebrow="Background"
      title="Education"
      description="My academic journey that shaped my foundation."
    >
      {/* Mobile: single-column stacked timeline. */}
      <div className="relative flex flex-col gap-8 sm:hidden">
        <div
          aria-hidden="true"
          className="absolute left-1.25 top-1 h-[calc(100%-0.5rem)] w-px bg-border"
        />
        <RevealGroup>
          {education.map((entry, index) => (
            <div key={entry.institution} className="relative flex gap-4 pl-6">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-8 h-3 w-3 rounded-full",
                  index % 2 === 0 ? "bg-accent shadow-glow" : "border-2 border-accent bg-background",
                )}
              />
              <EducationCard entry={entry} dateSide="right" />
            </div>
          ))}
        </RevealGroup>
      </div>

      {/* Desktop: alternating timeline either side of a center spine. */}
      <div className="relative hidden sm:block">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1 h-[calc(100%-0.5rem)] w-px -translate-x-1/2 bg-border"
        />
        <div className="flex flex-col gap-16">
          <RevealGroup>
            {education.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={entry.institution}
                  className="grid grid-cols-[1fr_1.5rem_1fr] items-center gap-6"
                >
                  <div>{isLeft && <EducationCard entry={entry} dateSide="right" />}</div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 mx-auto h-4 w-4 rounded-full",
                      index % 2 === 0 ? "bg-accent shadow-glow" : "border-2 border-accent bg-background",
                    )}
                  />
                  <div>{!isLeft && <EducationCard entry={entry} dateSide="left" />}</div>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
