import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid work or personal email address." })
    .max(120, { message: "Email must not exceed 120 characters." }),
  company: z
    .string()
    .max(100, { message: "Company name must not exceed 100 characters." })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long to provide context." })
    .max(2000, { message: "Message must not exceed 2000 characters." }),
  // Honeypot field for anti-spam bots (should be left empty by legitimate humans)
  website_url: z
    .string()
    .max(0, { message: "Spam detected." })
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
