// app/api/chat/route.js
export async function POST(request) {
  const { messages } = await request.json();

  const userMessage = messages[messages.length - 1]?.text || "";

  // For now, return a fake bot reply.
  // Later, we'll connect this to GPT.
  return Response.json({
    reply: `🍔 Sure! I'm adding "${userMessage}" to your order. Would you like fries with that?`,
  });
}
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    const reply = chatResponse.choices[0].message.content;

    return Response.json({ reply });
  } catch (error) {
    console.error("Error in GPT route:", error);
    return Response.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}