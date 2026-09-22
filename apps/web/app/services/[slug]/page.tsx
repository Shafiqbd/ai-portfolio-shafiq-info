import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { JsonLd } from "@/components/common/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getServiceBySlug, getServices } from "@/services/service.service";
import { getProjects } from "@/services/project.service";
import { Briefcase, FolderGit2, Layers, Sparkles, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageBanner } from "@/components/common/page-banner";
import { StatsBanner } from "@/components/common/stats-banner";
import { ServiceMedia } from "@/components/services/service-media";

/** stats[].icon in data/services.json is a lucide name — resolve or fall back. */
const STAT_ICONS: Record<string, LucideIcon> = { FolderGit2, Briefcase, Layers, Star };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDescription };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedProjectIds?.length
    ? (await getProjects()).filter((project) => service.relatedProjectIds?.includes(project.id))
    : [];

  const stats = service.stats.map((stat) => ({
    icon: STAT_ICONS[stat.icon] ?? Sparkles,
    value: stat.value,
    label: stat.label,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <PageBanner eyebrow="Service" title={`${service.title}.`}>
        <div className="mt-4 w-full">
          <StatsBanner stats={stats} />
        </div>
        {/* Banner image / video, sitting at the bottom of the stats section. */}
        {service.media && (
          <div className="mt-10 w-full">
            <ServiceMedia service={service} />
          </div>
        )}
      </PageBanner>

      <Section>
        <div className="flex flex-col gap-6">
          {/* Body ships as an HTML string in data/services.json (repo-authored,
              not user input) — rendered as-is and styled via .article-content. */}
          <article className="article-content" dangerouslySetInnerHTML={{ __html: service.content }} />
          {service.tagline && (
            <blockquote
              className="max-w-2xl border-l-2 pl-4 italic text-foreground"
              style={{ borderImage: "var(--gradient-brand) 1" }}
            >
              &ldquo;{service.tagline}&rdquo;
            </blockquote>
          )}
        </div>
      </Section>

      {relatedProjects.length > 0 && (
        <Section title="Related work">
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Discuss a project</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/services">Back to all services</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
