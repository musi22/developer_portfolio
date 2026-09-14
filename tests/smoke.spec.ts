// Playwright Smoke Test for Rashmi Shaw's Engineering Portfolio
// Verifies core navigation, 3D/2D control core rendering, and case study page

import { test, expect } from "@playwright/test";

test.describe("AI Command Center Smoke Suite", () => {
  test("renders homepage, command navigation, proof strip, and hero copy", async ({ page }) => {
    await page.goto("/");

    // Verify Title & Hero Headline
    await expect(page).toHaveTitle(/Rashmi Shaw — AI Systems & Backend Engineer/i);
    const headline = page.getByRole("heading", { name: /I build AI systems that can be trusted in production/i });
    await expect(headline).toBeVisible();

    // Verify Proof Strip metrics
    await expect(page.getByText("500+")).toBeVisible();
    await expect(page.getByText("5K+")).toBeVisible();
    await expect(page.getByText("65%")).toBeVisible();
    await expect(page.getByText("100%")).toBeVisible();

    // Verify Navigation Links
    const workLink = page.getByRole("link", { name: "Work" });
    await expect(workLink).toBeVisible();
  });

  test("navigates into Enterprise Agent Trust Platform case study", async ({ page }) => {
    await page.goto("/work/enterprise-agent-trust-platform");

    // Verify Case Study Heading
    const heading = page.getByRole("heading", { name: /Enterprise Agent Trust Platform/i, level: 1 });
    await expect(heading).toBeVisible();

    // Verify Problem and Architecture sections exist
    await expect(page.getByText(/Problem Statement & Motivation/i)).toBeVisible();
    await expect(page.getByText(/System Architecture Design/i)).toBeVisible();

    // Verify outbound links
    const liveLink = page.getByRole("link", { name: /Launch Live Platform/i });
    await expect(liveLink).toHaveAttribute("href", "https://enterprise-ai-web-production.up.railway.app/");
  });
});
