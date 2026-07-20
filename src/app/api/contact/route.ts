import { z } from "zod";
import { Resend } from "resend";
import { personal } from "@/content/data/personal";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email().max(200),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, email } = result.data;

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("Contact API: RESEND_API_KEY is not configured");
      return Response.json(
        { error: "Email delivery is not configured yet" },
        { status: 500 }
      );
    }

    // Resend sandbox mode (no verified domain) only allows delivery to the
    // address the Resend account was created with. Once a domain is
    // verified at resend.com/domains, this can point at personal.email instead.
    const deliverTo = process.env.CONTACT_EMAIL_TO || personal.email;

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: deliverTo,
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      text: `You have a new contact request from your portfolio.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`,
    });

    if (error) {
      console.error("Contact API: Resend error:", error);
      return Response.json({ error: "Failed to send message" }, { status: 502 });
    }

    return Response.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
