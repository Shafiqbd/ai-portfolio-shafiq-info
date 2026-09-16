import Link from "next/link";
import { Button, Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getCaseStudies } from "@/services/case-study.service";

export async function CaseStudiesTeaser() {
  const caseStudies = await getCaseStudies();
  if (caseStudies.length === 0) return null;

  return (
    <Section
      eyebrow="Deep dives"
      title="Case Studies"
      description="Problem, architecture, and the engineering decisions behind flagship work."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <RevealGroup>
          {caseStudies.slice(0, 2).map((caseStudy) => (
            <Link key={caseStudy.slug} href={`/case-studies/${caseStudy.slug}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.problem}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </RevealGroup>
      </div>
      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link href="/case-studies">All case studies</Link>
        </Button>
      </div>
    </Section>
  );
}
