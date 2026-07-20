import { buildSystemPrompt } from "@/lib/ai";

export const runtime = "edge";

function resolveProvider() {
  if (process.env.OPENAI_API_KEY) {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: "https://api.openai.com/v1",
      model: "gpt-4o-mini",
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      apiKey: process.env.GROQ_API_KEY,
      baseUrl: "https://api.groq.com/openai/v1",
      model: "llama-3.3-70b-versatile",
    };
  }
  if (process.env.XAI_API_KEY) {
    return {
      apiKey: process.env.XAI_API_KEY,
      baseUrl: "https://api.x.ai/v1",
      model: "grok-3-mini",
    };
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const provider = resolveProvider();

    if (!provider) {
      // Return a mock response when no API key is configured
      const mockResponse = `Hi! I'm ${process.env.NEXT_PUBLIC_OWNER_NAME || "the developer"}'s AI assistant.

To enable real AI responses, please set your **OPENAI_API_KEY**, **GROQ_API_KEY**, or **XAI_API_KEY** in the \`.env.local\` file.

For now, I can tell you that this portfolio showcases expertise in:
- 🤖 AI Engineering (LangChain, OpenAI API, RAG)
- ⚡ Backend Engineering (FastAPI, Node.js, PostgreSQL)
- ⚛️ Full-Stack Development (Next.js, React, TypeScript)

Feel free to explore the other apps in the desktop!`;

      const stream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          const words = mockResponse.split(" ");
          let i = 0;
          const interval = setInterval(() => {
            if (i >= words.length) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              clearInterval(interval);
              return;
            }
            const word = words[i] + " ";
            const chunk = JSON.stringify({
              choices: [{ delta: { content: word } }],
            });
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            i++;
          }, 40);
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const { apiKey, baseUrl, model } = provider;
    const systemPrompt = buildSystemPrompt();

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Pass through the SSE stream
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
