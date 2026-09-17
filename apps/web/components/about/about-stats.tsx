import { Briefcase, Calendar, FolderGit2, Layers } from "lucide-react";
import { Card } from "@shafiq-info/ui";
import { RevealGroup } from "@/components/common/reveal";
import { getProfile } from "@/services/profile.service";
import { getProjects } from "@/services/project.service";
import { getExperiences } from "@/services/experience.service";
import { getSkillCategories } from "@/services/skill.service";

/**
 * Every number here is computed from real data — no invented "100+
 * projects" / "50+ clients" style marketing stats.
 */
export async function AboutStats() {
  const [profile, projects, experiences, skillCategories] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getSkillCategories(),
  ]);

  const allSkills = skillCategories.find((category) => category.category === "All")?.skills;
  const technologyCount = (allSkills ?? skillCategories.flatMap((c) => c.skills)).length;

  const stats = [
    { icon: Calendar, value: `${profile.yearsExperience}+`, label: "Years Experience" },
    { icon: FolderGit2, value: `${projects.length}`, label: "Projects Delivered" },
    { icon: Briefcase, value: `${experiences.length}`, label: "Organizations" },
    { icon: Layers, value: `${technologyCount}+`, label: "Technologies" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <RevealGroup>
        {stats.map((stat) => (
          <Card key={stat.label} sparkle className="p-5 text-center">
            <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" aria-hidden="true" />
            <p className="text-gradient-brand text-2xl font-bold sm:text-3xl">{stat.value}</p>
            <p className="text-xs text-foreground-muted">{stat.label}</p>
          </Card>
        ))}
      </RevealGroup>
    </div>
  );
}
