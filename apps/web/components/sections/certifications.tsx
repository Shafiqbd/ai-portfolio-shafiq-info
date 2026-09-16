import { Award } from "lucide-react";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getCertifications } from "@/services/education.service";

export async function Certifications() {
  const certifications = await getCertifications();
  if (certifications.length === 0) return null;

  return (
    <Section eyebrow="Credentials" title="Certifications">
      <div className="flex flex-wrap gap-4">
        <RevealGroup className="flex">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-3 rounded-card border border-transparent px-4 py-3 transition-all duration-300 [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box] hover:shadow-glow hover:[background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand)_border-box]"
            >
              <Award className="h-5 w-5 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">{cert.name}</p>
                <p className="text-xs text-foreground-muted">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
