import { Badge } from "@shafiq-info/ui";
import { getProfile } from "@/services/profile.service";
import { getFeaturedProjects } from "@/services/project.service";

export default async function Home() {
  const [profile, featuredProjects] = await Promise.all([getProfile(), getFeaturedProjects()]);

  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-mono text-sm text-foreground-muted">
          Hi, I&apos;m {profile.name.split(" ")[0]}.
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.tagline}
        </h1>
        <p className="max-w-xl text-foreground-muted">{profile.secondaryTagline}</p>
      </div>

      {featuredProjects.length > 0 && (
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
            Featured
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {featuredProjects.map((project) => (
              <Badge key={project.id} variant="accent">
                {project.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
