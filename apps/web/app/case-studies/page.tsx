import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle, EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
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
          {caseStudies.map((caseStudy) => (
            <Link key={caseStudy.slug} href={`/case-studies/${caseStudy.slug}`}>
              <Card className="h-full transition-colors hover:border-accent">
                <CardHeader>
                  <CardTitle>{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.problem}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
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
