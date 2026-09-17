import { Trophy, Award as AwardIcon } from "lucide-react";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getAwards, getCertifications } from "@/services/education.service";

const ITEM_CLASSES =
  "flex items-start gap-3 rounded-card border border-transparent p-4 transition-all duration-300 [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box] hover:shadow-glow hover:[background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand)_border-box]";

function meta(issuer: string, issuedDate?: string) {
  return issuedDate ? `${issuer} · ${issuedDate}` : issuer;
}

export async function Achievements() {
  const [awards, certifications] = await Promise.all([getAwards(), getCertifications()]);
  if (awards.length === 0 && certifications.length === 0) return null;

  return (
    <Section eyebrow="Excellence & Learning" title="Achievements & Certifications">
      <div className="grid gap-8 lg:grid-cols-2">
        {awards.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Trophy className="h-5 w-5 text-accent" aria-hidden="true" />
              Awards &amp; Recognition
            </h3>
            <div className="flex flex-col gap-3">
              <RevealGroup>
                {awards.map((award) => (
                  <div key={award.name} className={ITEM_CLASSES}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{award.name}</p>
                      <p className="text-sm text-foreground-muted">
                        {meta(award.issuer, award.issuedDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </RevealGroup>
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <AwardIcon className="h-5 w-5 text-accent" aria-hidden="true" />
              Certifications
            </h3>
            <div className="flex flex-col gap-3">
              <RevealGroup>
                {certifications.map((cert, index) => (
                  <div key={cert.name} className={ITEM_CLASSES}>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent text-xs font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-foreground-muted">
                        {meta(cert.issuer, cert.issuedDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </RevealGroup>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
