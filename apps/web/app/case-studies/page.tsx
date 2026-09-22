import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, CardDescription, CardHeader, CardTitle, EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getCaseStudies } from "@/services/case-study.service";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep dives into how flagship projects were designed, built, and shipped.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <Section
      eyebrow="Deep dives"
      title="Case Studies"
      titleAs="h1"
      description="Problem, architecture, and the engineering decisions behind a handful of flagship projects."
    >
      {caseStudies.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <RevealGroup>
            {caseStudies.map((caseStudy) => (
              <Link key={caseStudy.slug} href={`/case-studies/${caseStudy.slug}`}>
                <Card className="h-full">
                  <CardHeader>
                    <p className="font-mono text-xs uppercase tracking-wide text-accent">
                      {caseStudy.category}
                    </p>
                    <CardTitle>{caseStudy.title}</CardTitle>
                    <CardDescription>{caseStudy.shortDescription}</CardDescription>
                  </CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.techStack.slice(0, 5).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                    {caseStudy.techStack.length > 5 && (
                      <Badge>+{caseStudy.techStack.length - 5}</Badge>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </RevealGroup>
        </div>
      ) : (
        <EmptyState
          title="No case studies published yet"
          description="Full write-ups for flagship projects are in progress — check back soon."
        />
      )}
    </Section>
  );
}
