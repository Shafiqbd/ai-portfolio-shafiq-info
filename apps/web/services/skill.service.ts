import type { SkillCategory } from "@shafiq-info/types";
import skillsData from "@data/skills.json";

const skillCategories = skillsData as SkillCategory[];

export async function getSkillCategories(): Promise<SkillCategory[]> {
  return skillCategories;
}
