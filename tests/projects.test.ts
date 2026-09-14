import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug } from "@/content/data/projects";

describe("Case Studies Technical Data", () => {
  it("contains all 4 featured engineering projects", () => {
    expect(projects.length).toBe(4);
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toContain("enterprise-agent-trust-platform");
    expect(slugs).toContain("streamalpha");
    expect(slugs).toContain("revenueguard");
    expect(slugs).toContain("nexusagent");
  });

  it("ensures every project has required engineering fields and measured outcomes", () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(3);
      expect(project.problem.length).toBeGreaterThan(20);
      expect(project.whyItMatters.length).toBeGreaterThan(20);
      expect(project.architectureDescription.length).toBeGreaterThan(20);
      expect(project.keyEngineeringDecisions.length).toBeGreaterThanOrEqual(2);
      expect(project.reliabilitySecurityMechanisms.length).toBeGreaterThanOrEqual(3);
      expect(project.measuredResults.length).toBeGreaterThanOrEqual(2);
      expect(project.techStack.length).toBeGreaterThanOrEqual(4);
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/musi22\//);
    }
  });

  it("retrieves individual case study by slug accurately", () => {
    const trustPlatform = getProjectBySlug("enterprise-agent-trust-platform");
    expect(trustPlatform).toBeDefined();
    expect(trustPlatform?.shortTitle).toBe("Agent Trust Platform");
    expect(trustPlatform?.liveUrl).toBe("https://enterprise-ai-web-production.up.railway.app/");

    const streamAlpha = getProjectBySlug("streamalpha");
    expect(streamAlpha).toBeDefined();
    expect(streamAlpha?.repoUrl).toBe("https://github.com/musi22/StreamAlpha");
  });
});
