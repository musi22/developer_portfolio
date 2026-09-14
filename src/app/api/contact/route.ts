import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

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
      // Silently return success to bot without processing
      return NextResponse.json({
        success: true,
        message: "Message dispatched to command center.",
      });
    }

    // In production without external keys, log safely and provide success response
    console.log(`[Contact Form Received] From: ${name} <${email}> | Company: ${company || "N/A"}`);
    console.log(`[Message Body]: ${message.slice(0, 100)}...`);

    return NextResponse.json({
      success: true,
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
