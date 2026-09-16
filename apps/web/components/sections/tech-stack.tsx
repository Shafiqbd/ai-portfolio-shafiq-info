import { Badge } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getSkillCategories } from "@/services/skill.service";

export async function TechStack() {
  const categories = await getSkillCategories();
  if (categories.length === 0) return null;

  return (
    <Section eyebrow="Toolbox" title="Tech Stack">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RevealGroup>
          {categories.map((category) => (
            <div key={category.category} className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill.name}>{skill.name}</Badge>
                ))}
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
