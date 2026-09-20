import { Hero } from "@/components/sections/hero";
import { FloatingSocial } from "@/components/sections/floating-social";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CaseStudiesTeaser } from "@/components/sections/case-studies-teaser";
import { TechStack } from "@/components/sections/tech-stack";
import { AiEngineering } from "@/components/sections/ai-engineering";
import { ArticlesTeaser } from "@/components/sections/articles-teaser";
import { ServicesTeaser } from "@/components/sections/services-teaser";
import { Achievements } from "@/components/sections/achievements";
import { GalleryMarquee } from "@/components/sections/gallery-marquee";

export default function Home() {
  return (
    <>
      <FloatingSocial />
      <Hero />
      <ExperienceTimeline />
      <FeaturedProjects />
      {/* <CaseStudiesTeaser /> */}
      <TechStack />
      <Achievements />
      <ServicesTeaser />
      {/* <AiEngineering /> */}
      <ArticlesTeaser />
      <GalleryMarquee />
    </>
  );
}
