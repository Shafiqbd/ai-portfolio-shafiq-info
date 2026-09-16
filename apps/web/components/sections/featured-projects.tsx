import Link from "next/link";
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
          {projects.map((project) => (
            <Card key={project.id} className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </CardContent>
              <CardFooter>
                {project.caseStudySlug ? (
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/case-studies/${project.caseStudySlug}`}>Read case study</Link>
                  </Button>
                ) : (
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/projects#${project.slug}`}>View details</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
