import { describe, expect, it } from "vitest";
import { getProfile } from "../profile.service";

describe("profile.service", () => {
  it("returns a typed profile with the required fields populated", async () => {
    const profile = await getProfile();
    expect(profile.name).toBeTruthy();
    expect(profile.tagline).toBeTruthy();
    expect(profile.email).toContain("@");
    expect(Array.isArray(profile.socialLinks)).toBe(true);
  });
});
