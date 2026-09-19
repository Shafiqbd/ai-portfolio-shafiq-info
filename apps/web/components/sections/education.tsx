import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getEducation } from "@/services/education.service";
import { cn } from "@shafiq-info/ui";
import type { Education as EducationEntry } from "@shafiq-info/types";

function formatYears(startYear?: number, endYear?: number) {
  if (!startYear) return undefined;
  return `${startYear} — ${endYear ?? "Present"}`;
}

const CARD_CLASSES =
  "rounded-card border border-transparent p-5 transition-all duration-300 [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box] hover:shadow-glow hover:[background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand)_border-box]";

function EducationCard({ entry, align }: { entry: EducationEntry; align: "left" | "right" }) {
  const years = formatYears(entry.startYear, entry.endYear);
  return (
    <div className={cn(CARD_CLASSES, align === "right" && "sm:text-right")}>
      {years && <p className="font-mono text-xs font-medium text-accent">{years}</p>}
      <p className="mt-1 font-semibold">
        {entry.degree}
        {entry.field ? ` in ${entry.field}` : ""}
      </p>
      <p className="text-sm text-foreground-muted">{entry.institution}</p>
      {entry.cgpa && (
        <p className="mt-1 text-xs text-foreground-muted">
          CGPA {entry.cgpa}
          {entry.outOf ? ` / ${entry.outOf}` : ""}
        </p>
      )}
    </div>
  );
}

export async function Education() {
  const education = await getEducation();
  if (education.length === 0) return null;

  return (
    <Section eyebrow="Background" title="Education">
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
                  "absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full",
                  index === 0 ? "bg-accent shadow-glow" : "border-2 border-accent bg-background",
                )}
              />
              <EducationCard entry={entry} align="left" />
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
        <div className="flex flex-col gap-8">
          <RevealGroup>
            {education.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={entry.institution}
                  className="grid grid-cols-[1fr_1.5rem_1fr] items-center gap-6"
                >
                  <div>{isLeft && <EducationCard entry={entry} align="right" />}</div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 mx-auto h-3 w-3 rounded-full",
                      index === 0 ? "bg-accent shadow-glow" : "border-2 border-accent bg-background",
                    )}
                  />
                  <div>{!isLeft && <EducationCard entry={entry} align="left" />}</div>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
