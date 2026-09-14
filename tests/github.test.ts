import { describe, it, expect } from "vitest";
import { GITHUB_USER_FALLBACK, GITHUB_REPOS_FALLBACK } from "@/lib/github";

describe("GitHub Fallback Integration", () => {
  it("contains verified profile data for musi22", () => {
    expect(GITHUB_USER_FALLBACK.login).toBe("musi22");
    expect(GITHUB_USER_FALLBACK.name).toBe("Rashmi Shaw");
    expect(GITHUB_USER_FALLBACK.htmlUrl).toBe("https://github.com/musi22");
    expect(GITHUB_USER_FALLBACK.publicRepos).toBeGreaterThanOrEqual(10);
  });

  it("contains the 4 core featured engineering repositories", () => {
    const repoNames = GITHUB_REPOS_FALLBACK.map((r) => r.name);
    expect(repoNames).toContain("enterprise-agent-trust-platform");
    expect(repoNames).toContain("StreamAlpha");
    expect(repoNames).toContain("RevenueGuard");
    expect(repoNames).toContain("nexus_ai");
  });

  it("has valid repository URLs and topics for all fallback repos", () => {
    for (const repo of GITHUB_REPOS_FALLBACK) {
      expect(repo.htmlUrl).toMatch(/^https:\/\/github\.com\/musi22\//);
      expect(repo.topics).toBeInstanceOf(Array);
      expect(typeof repo.stargazersCount).toBe("number");
      expect(typeof repo.forksCount).toBe("number");
    }
  });
});
