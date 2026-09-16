import type { Profile } from "@shafiq-info/types";
import profileData from "@data/profile.json";

/**
 * Demo-data-backed for now — swaps to a NestJS API call in Phase 11 without
 * changing this function's signature or callers.
 */
export async function getProfile(): Promise<Profile> {
  return profileData as Profile;
}
