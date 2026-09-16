import { Award } from "lucide-react";
import { Section } from "@/components/common/section";
import { getCertifications } from "@/services/education.service";

export async function Certifications() {
  const certifications = await getCertifications();
  if (certifications.length === 0) return null;

  return (
    <Section eyebrow="Credentials" title="Certifications">
      <div className="flex flex-wrap gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex items-center gap-3 rounded-card border border-border bg-background-elevated px-4 py-3"
          >
            <Award className="h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">{cert.name}</p>
              <p className="text-xs text-foreground-muted">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
