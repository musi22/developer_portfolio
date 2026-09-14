import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/lib/validation";

describe("Contact Form Validation & Spam Shield", () => {
  it("passes for valid contact form submissions", () => {
    const validData = {
      name: "Jordan Lee",
      email: "jordan@anthropic.com",
      company: "Anthropic",
      message: "Interested in discussing an AI Systems Engineer position on our platform team.",
      website_url: "",
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails if name is shorter than 2 characters", () => {
    const invalidData = {
      name: "J",
      email: "jordan@anthropic.com",
      message: "Interested in discussing an AI Systems Engineer role.",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("fails for invalid email addresses", () => {
    const invalidData = {
      name: "Jordan Lee",
      email: "not-an-email",
      message: "Interested in discussing an AI Systems Engineer role.",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("fails if message is less than 10 characters", () => {
    const invalidData = {
      name: "Jordan Lee",
      email: "jordan@anthropic.com",
      message: "Hi there",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  it("rejects automated bot submissions via the honeypot field", () => {
    const botData = {
      name: "Bot Sender",
      email: "bot@spamcorp.com",
      message: "Check out our amazing SEO ranking services today!",
      website_url: "http://spamlink.com", // filled in by bots
    };

    const result = contactFormSchema.safeParse(botData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.website_url).toBeDefined();
    }
  });
});
