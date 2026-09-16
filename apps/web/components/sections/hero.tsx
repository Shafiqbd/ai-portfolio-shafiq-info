import { getProfile } from "@/services/profile.service";
import { getSkillCategories } from "@/services/skill.service";
import { HeroContent } from "@/components/sections/hero-content";

export async function Hero() {
  const [profile, skillCategories] = await Promise.all([getProfile(), getSkillCategories()]);
  const topTechnologies = skillCategories
    .flatMap((category) => category.skills)
    .slice(0, 6)
    .map((skill) => skill.name);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="animate-mesh-drift bg-mesh pointer-events-none absolute inset-0 opacity-60 blur-3xl"
      />
      <HeroContent profile={profile} topTechnologies={topTechnologies} />
    </div>
  );
}
