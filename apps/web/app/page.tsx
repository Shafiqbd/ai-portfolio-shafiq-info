import { Hero } from "@/components/sections/hero";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { TechStack } from "@/components/sections/tech-stack";
import { AiEngineering } from "@/components/sections/ai-engineering";
import { ServicesTeaser } from "@/components/sections/services-teaser";
import { Certifications } from "@/components/sections/certifications";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceTimeline />
      <FeaturedProjects />
      <TechStack />
      <AiEngineering />
      <ServicesTeaser />
      <Certifications />
      <Cta />
    </>
  );
}
