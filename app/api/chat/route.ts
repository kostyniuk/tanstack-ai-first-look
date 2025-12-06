import { chat, toStreamResponse } from "@tanstack/ai";
import { gemini } from "@tanstack/ai-gemini";

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "GEMINI_API_KEY not configured",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { messages, conversationId } = await request.json();
  try {
    const stream = chat({
      adapter: gemini(),
      messages,
      model: 'gemini-2.5-flash',
      conversationId
    });

    return toStreamResponse(stream);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}