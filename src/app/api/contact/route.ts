import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
          message: "Validation failed. Please review your input fields.",
        },
        { status: 400 }
      );
    }

    const { name, email, company, message, website_url } = result.data;

    // Check honeypot field
    if (website_url && website_url.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Message dispatched to command center.",
      });
    }

    let emailDelivered = false;
    let deliveryMethod = "none";

    // 1. If RESEND_API_KEY is configured in Vercel, dispatch via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "shawrashmi7@gmail.com",
          replyTo: email,
          subject: `Portfolio Message from ${name}${company ? ` (${company})` : ""}`,
          text: `New message from ${name} (${email})\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0B0D10; color: #F4F4F5; border-radius: 12px; border: 1px solid #27272A;">
              <h2 style="color: #61F4DE; margin-top: 0; font-size: 20px;">Direct Dispatch Channel Inquiry</h2>
              <div style="background: #111418; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #1F242D;">
                <p style="margin: 4px 0;"><strong style="color: #989CA5;">Sender:</strong> ${name}</p>
                <p style="margin: 4px 0;"><strong style="color: #989CA5;">Email:</strong> <a href="mailto:${email}" style="color: #61F4DE;">${email}</a></p>
                <p style="margin: 4px 0;"><strong style="color: #989CA5;">Company:</strong> ${company || "Not specified"}</p>
              </div>
              <h3 style="color: #FFFFFF; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message Context</h3>
              <div style="background: #161B22; padding: 16px; border-radius: 8px; border: 1px solid #30363D; white-space: pre-wrap; font-family: monospace; font-size: 13px; line-height: 1.6;">${message}</div>
              <p style="font-size: 11px; color: #656A74; margin-top: 24px;">Dispatched from Rashmi Shaw Developer Portfolio</p>
            </div>
          `,
        });

        if (!error) {
          emailDelivered = true;
          deliveryMethod = "resend";
        } else {
          console.warn("[Resend Warning]:", error);
        }
      } catch (err) {
        console.error("[Resend Error]:", err);
      }
    }

    // 2. Automated fallback via FormSubmit directly to shawrashmi7@gmail.com
    if (!emailDelivered) {
      try {
        const formSubmitRes = await fetch("https://formsubmit.co/ajax/shawrashmi7@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://developerportfolio-one-beta.vercel.app",
            Referer: "https://developerportfolio-one-beta.vercel.app/",
          },
          body: JSON.stringify({
            name,
            email,
            company: company || "N/A",
            message,
            _subject: `New Portfolio Inquiry from ${name}`,
            _replyto: email,
            _template: "table",
          }),
        });

        const fsData = await formSubmitRes.json().catch(() => null);
        if (formSubmitRes.ok || fsData?.success === "true" || fsData?.success === true) {
          emailDelivered = true;
          deliveryMethod = "formsubmit";
        }
      } catch (err) {
        console.error("[FormSubmit Fallback Error]:", err);
      }
    }

    console.log(`[Contact Form] Dispatched from ${name} <${email}> via ${deliveryMethod}`);

    return NextResponse.json({
      success: true,
      delivered: emailDelivered,
      method: deliveryMethod,
      message: "Thank you. Your message has been received. Rashmi will respond promptly.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal error occurred while dispatching the message. Please email directly at shawrashmi7@gmail.com.",
      },
      { status: 500 }
    );
  }
}
