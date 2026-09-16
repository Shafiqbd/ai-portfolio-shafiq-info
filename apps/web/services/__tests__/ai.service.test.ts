import { describe, expect, it } from "vitest";
import { askShafiq } from "../ai.service";

describe("ai.service", () => {
  it("matches a known FAQ entry from a related question", async () => {
    const result = await askShafiq("Is Shafiq available for remote opportunities?");
    expect(result?.question).toBe("Is he available for remote opportunities?");
  });

  it("returns undefined for an unrelated question rather than hallucinating", async () => {
    const result = await askShafiq("What's the weather like today?");
    expect(result).toBeUndefined();
  });

  it("returns undefined for empty input", async () => {
    const result = await askShafiq("   ");
    expect(result).toBeUndefined();
  });
});
