export interface SocialLink {
  platform: string;
  url: string;
}

export type Availability = "available" | "open" | "unavailable";

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  secondaryTagline: string;
  bio: string;
  philosophy?: string;
  location: string;
  availability: Availability;
  yearsExperience: number;
  email: string;
  phone?: string;
  socialLinks: SocialLink[];
  avatarUrl: string;
  resumeUrl?: string;
}
