import type { Experience } from "@shafiq-info/types";
import experiencesData from "@data/experiences.json";

const experiences = experiencesData as Experience[];

export async function getExperiences(): Promise<Experience[]> {
  return experiences;
}
