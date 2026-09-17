import Link from "next/link";
import {
  ExternalLink,
  Code2,
  Folder,
  Landmark,
  GraduationCap,
  Newspaper,
  ShoppingCart,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getFeaturedProjects } from "@/services/project.service";

// No real screenshots exist yet (see data/README.md) — a themed icon panel
// stands in for a thumbnail rather than a fake/stock project image.
const PROJECT_ICONS: Record<string, typeof Folder> = {
  "smart-somity": Landmark,
  "alahazrat-academy": GraduationCap,
  "press-council-application": Newspaper,
  "robyy-ecommerce": ShoppingCart,
  "adorsholipi-desktop": Monitor,
  "bodyguard-dynamic-website": ShieldCheck,
};

const HEADER_GRADIENTS = [
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-teal-500 via-cyan-500 to-sky-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-cyan-500 via-sky-500 to-blue-500",
  "from-emerald-500 via-green-500 to-teal-500",
  "from-teal-500 via-emerald-500 to-lime-500",
];

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <Section
      eyebrow="Selected work"
      title="Featured Projects"
      description="A closer look at the systems I've built end to end."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RevealGroup>
          {projects.map((project, index) => {
            const Icon = PROJECT_ICONS[project.id] ?? Folder;
            const primaryHref = project.liveUrl
              ? project.liveUrl
              : project.caseStudySlug
                ? `/case-studies/${project.caseStudySlug}`
                : `/projects#${project.slug}`;
            const primaryLabel = project.liveUrl
              ? "Live Demo"
              : project.caseStudySlug
                ? "Read case study"
                : "View details";

            return (
              <Card key={project.id} sparkle className="flex h-full flex-col overflow-hidden">
                <div
                  className={`-mx-6 -mt-6 mb-4 flex aspect-video items-center justify-center bg-linear-to-br ${
                    HEADER_GRADIENTS[index % HEADER_GRADIENTS.length]
                  }`}
                >
                  <Icon className="h-12 w-12 text-white/90" aria-hidden="true" />
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </CardContent>

                <CardFooter className="flex-wrap">
                  <Button asChild size="sm">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {primaryLabel}
                      </a>
                    ) : (
                      <Link href={primaryHref}>{primaryLabel}</Link>
                    )}
                  </Button>
                  {project.githubUrl && (
                    <Button asChild variant="secondary" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Code2 className="h-4 w-4" aria-hidden="true" />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </RevealGroup>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="secondary" size="lg">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </Section>
  );
}
