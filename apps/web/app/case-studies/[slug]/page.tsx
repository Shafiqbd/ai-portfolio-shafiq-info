import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Badge, Button, Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { Check } from "lucide-react";
import { Section } from "@/components/common/section";
import { JsonLd } from "@/components/common/json-ld";
import { PageBanner } from "@/components/common/page-banner";
import { StatsBanner } from "@/components/common/stats-banner";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getCaseStudies, getCaseStudyBySlug } from "@/services/case-study.service";

/**
 * coverImageUrl is a public web path; confirm the asset actually exists so a
 * missing file renders the branded placeholder instead of a broken image.
 * Works for both `pnpm dev` (cwd = apps/web) and repo-root runs.
 */
function coverExists(url?: string) {
  if (!url) return false;
  const relative = url.replace(/^\//, "");
  return ["apps/web/public", "public"].some((base) =>
    existsSync(path.join(process.cwd(), base, relative)),
  );
}

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-14 first:mt-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <span aria-hidden="true" className="bg-gradient-brand mt-2 block h-0.5 w-8 rounded-full" />
      <div className="mt-5">{children}</div>
    </div>
  );
}

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
  return { title: caseStudy.title, description: caseStudy.shortDescription };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const hasCover = coverExists(caseStudy.coverImageUrl);
  const isPublishedUrl = caseStudy.projectUrl && caseStudy.projectUrl !== "#";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Case Studies", path: "/case-studies" },
          { name: caseStudy.title, path: `/case-studies/${caseStudy.slug}` },
        ])}
      />
      <PageBanner
        eyebrow="Case Study"
        title={caseStudy.title}
        description={caseStudy.shortDescription}
      >
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="accent">{caseStudy.category}</Badge>
          <Badge>{caseStudy.role}</Badge>
          <Badge>{caseStudy.projectType}</Badge>
          <Badge>{caseStudy.duration}</Badge>
        </div>
        <div className="mt-6 w-full">
          <StatsBanner stats={caseStudy.metrics} />
        </div>
      </PageBanner>

      <Section>
        <SectionBlock title="Overview">
          {/* Body sections ship as HTML strings in data/case-studies.json
              (repo-authored, not user input) — rendered as-is, styled via
              .article-content. */}
          <div className="article-content" dangerouslySetInnerHTML={{ __html: caseStudy.overview }} />
        </SectionBlock>

        <SectionBlock title="The Challenge">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: caseStudy.challenge }} />
        </SectionBlock>

        <SectionBlock title="The Solution">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: caseStudy.solution }} />
        </SectionBlock>

        {caseStudy.keyFeatures.length > 0 && (
          <SectionBlock title="Key Features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {caseStudy.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}

        {caseStudy.engineeringHighlights.length > 0 && (
          <SectionBlock title="Engineering Highlights">
            <div className="grid gap-6 sm:grid-cols-2">
              {caseStudy.engineeringHighlights.map((highlight) => (
                <Card key={highlight.title}>
                  <CardHeader>
                    <CardTitle>{highlight.title}</CardTitle>
                    <CardDescription>{highlight.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </SectionBlock>
        )}

        {caseStudy.techStack.length > 0 && (
          <SectionBlock title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {caseStudy.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </SectionBlock>
        )}

        {caseStudy.learnings && (
          <SectionBlock title="What I Learned">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: caseStudy.learnings }} />
          </SectionBlock>
        )}

        {caseStudy.nextSteps.length > 0 && (
          <SectionBlock title="What's Next">
            <ol className="flex flex-col gap-3">
              {caseStudy.nextSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm text-foreground-muted">
                  <span className="font-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </SectionBlock>
        )}

        <div className="mt-14 flex flex-wrap gap-3">
          {isPublishedUrl && (
            <Button asChild>
              <a href={caseStudy.projectUrl} target="_blank" rel="noopener noreferrer">
                View live project
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
