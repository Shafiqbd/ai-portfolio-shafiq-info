import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { getCaseStudies, getCaseStudyBySlug } from "@/services/case-study.service";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return { title: caseStudy.title, description: caseStudy.problem };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <Section eyebrow="Case Study" title={caseStudy.title}>
        <div className="flex flex-wrap gap-2">
          {caseStudy.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Section>

      <Section title="Problem">
        <p className="max-w-3xl text-foreground-muted">{caseStudy.problem}</p>
      </Section>

      <Section title="Context">
        <p className="max-w-3xl text-foreground-muted">{caseStudy.context}</p>
      </Section>

      {caseStudy.requirements.length > 0 && (
        <Section title="Requirements">
          <ul className="flex list-disc flex-col gap-2 pl-5 text-foreground-muted">
            {caseStudy.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Solution">
        <p className="max-w-3xl text-foreground-muted">{caseStudy.solution}</p>
      </Section>

      <Section title="Architecture">
        <p className="max-w-3xl text-foreground-muted">{caseStudy.architecture.description}</p>
      </Section>

      <Section title={`Role: ${caseStudy.role}`}>
        {caseStudy.features.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-3 font-semibold">Features</h3>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-foreground-muted">
              {caseStudy.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {caseStudy.challenges.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-3 font-semibold">Challenges</h3>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-foreground-muted">
              {caseStudy.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}

        {caseStudy.engineeringDecisions.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-3 font-semibold">Engineering Decisions</h3>
            <div className="flex flex-col gap-4">
              {caseStudy.engineeringDecisions.map((item) => (
                <div key={item.decision}>
                  <p className="font-medium">{item.decision}</p>
                  <p className="text-sm text-foreground-muted">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {caseStudy.impact && (
          <div className="mb-8">
            <h3 className="mb-3 font-semibold">Impact</h3>
            <p className="text-foreground-muted">{caseStudy.impact}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {caseStudy.liveUrl && (
            <Button asChild variant="secondary">
              <a href={caseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                Live demo
              </a>
            </Button>
          )}
          {caseStudy.githubUrl && (
            <Button asChild variant="ghost">
              <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
          <Button asChild variant="ghost">
            <Link href="/case-studies">Back to all case studies</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
