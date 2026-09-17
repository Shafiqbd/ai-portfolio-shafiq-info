import type { Award, Certification, Education } from "@shafiq-info/types";
import educationData from "@data/education.json";
import certificationsData from "@data/certifications.json";
import awardsData from "@data/awards.json";

const education = educationData as Education[];
const certifications = certificationsData as Certification[];
const awards = awardsData as Award[];

export async function getEducation(): Promise<Education[]> {
  return education;
}

export async function getCertifications(): Promise<Certification[]> {
  return certifications;
}

export async function getAwards(): Promise<Award[]> {
  return awards;
}
