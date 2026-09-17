import { Section } from "@/components/common/section";
import { getSkillCategories } from "@/services/skill.service";
import { TechStackTabs } from "./tech-stack-tabs";

export async function TechStack() {
  const categories = await getSkillCategories();
  const tabCategories = categories.filter((category) => category.category !== "All");
  if (tabCategories.length === 0) return null;

  return (
    <Section eyebrow="Toolbox" title="Tech Stack">
      <TechStackTabs categories={tabCategories} />
    </Section>
  );
}
